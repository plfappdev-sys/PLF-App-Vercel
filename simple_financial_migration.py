#!/usr/bin/env python3
"""
PLF Simple Financial Data Migration Script
Purpose: Import basic financial data from 2024-2025 Excel sheet first
Created: November 24, 2025
"""

import os
import json
from datetime import datetime
import pandas as pd
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://zdnyhzasvifrskbostgn.supabase.co')
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SERVICE_ROLE_KEY', '')

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

class PLFSimpleFinancialMigration:
    def __init__(self):
        self.members_data = {}
        self.migration_stats = {
            'contributions_created': 0,
            'transactions_created': 0,
            'balances_updated': 0,
            'errors': 0
        }
        
    def load_member_data(self):
        """Load existing member data from Supabase"""
        try:
            print("Loading member data from Supabase...")
            response = supabase.table('members').select('*').execute()
            members = response.data
            
            # Create member lookup by name
            for member in members:
                self.members_data[member['name'].strip()] = member
            
            print(f"Loaded {len(self.members_data)} members from database")
            return True
        except Exception as e:
            print(f"❌ Error loading member data: {e}")
            return False
    
    def extract_financial_data_2024_2025(self):
        """Extract financial data from 2024-2025 sheet"""
        try:
            print("Extracting financial data from 2024-2025 sheet...")
            file_path = 'NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025.xlsx'
            df = pd.read_excel(file_path, sheet_name='2024-2025')
            
            financial_data = []
            
            for index, row in df.iterrows():
                try:
                    member_name = row['Member']
                    if pd.isna(member_name):
                        continue
                    
                    member_name = str(member_name).strip()
                    
                    # Extract key financial data
                    closing_balance = row.get('Closing Balance', 0)
                    if pd.isna(closing_balance):
                        closing_balance = 0
                    
                    total_contribution = row.get('Total Contribution for 12 Months', 0)
                    if pd.isna(total_contribution):
                        total_contribution = 0
                    
                    outstanding_contribution = row.get('Total outstanding contribution for 12 Months', 0)
                    if pd.isna(outstanding_contribution):
                        outstanding_contribution = 0
                    
                    financial_data.append({
                        'member_name': member_name,
                        'closing_balance': float(closing_balance),
                        'total_contribution': float(total_contribution),
                        'outstanding_contribution': float(outstanding_contribution)
                    })
                    
                except Exception as e:
                    print(f"⚠️  Error processing row {index}: {e}")
                    continue
            
            print(f"Extracted financial data for {len(financial_data)} members")
            return financial_data
            
        except Exception as e:
            print(f"❌ Error extracting financial data: {e}")
            return []
    
    def create_member_balances(self, financial_data):
        """Create member balance records"""
        print("Creating member balance records...")
        
        for record in financial_data:
            try:
                member_name = record['member_name']
                if member_name not in self.members_data:
                    print(f"⚠️  Member not found: {member_name}")
                    continue
                
                member = self.members_data[member_name]
                
                balance_data = {
                    'member_id': member['id'],
                    'savings_balance': record['closing_balance'],
                    'loan_balance': 0.00,
                    'net_balance': record['closing_balance'],
                    'available_funds': record['closing_balance'],
                    'created_at': datetime.now().isoformat(),
                    'updated_at': datetime.now().isoformat()
                }
                
                # Insert member balance
                supabase.table('member_balances').upsert(balance_data, on_conflict='member_id').execute()
                self.migration_stats['balances_updated'] += 1
                
                print(f"✅ Updated balance for {member_name}: R{record['closing_balance']}")
                
            except Exception as e:
                print(f"❌ Error creating balance for {member_name}: {e}")
                self.migration_stats['errors'] += 1
    
    def create_contribution_records(self, financial_data):
        """Create contribution records for 2024-2025"""
        print("Creating contribution records for 2024-2025...")
        
        for record in financial_data:
            try:
                member_name = record['member_name']
                if member_name not in self.members_data:
                    continue
                
                member = self.members_data[member_name]
                
                # Create a summary contribution record for 2024-2025
                if record['total_contribution'] > 0:
                    contribution_data = {
                        'member_id': member['id'],
                        'contribution_month': '2024-07-01',  # Start of financial year
                        'due_date': '2024-07-01',
                        'amount_due': record['total_contribution'] + record['outstanding_contribution'],
                        'amount_paid': record['total_contribution'],
                        'status': 'paid' if record['outstanding_contribution'] == 0 else 'partial',
                        'created_at': datetime.now().isoformat(),
                        'updated_at': datetime.now().isoformat()
                    }
                    
                    # Insert contribution
                    supabase.table('contributions').insert(contribution_data).execute()
                    self.migration_stats['contributions_created'] += 1
                    
            except Exception as e:
                print(f"❌ Error creating contribution for {member_name}: {e}")
                self.migration_stats['errors'] += 1
    
    def create_transaction_records(self, financial_data):
        """Create transaction records for contributions"""
        print("Creating transaction records...")
        
        for record in financial_data:
            try:
                member_name = record['member_name']
                if member_name not in self.members_data:
                    continue
                
                member = self.members_data[member_name]
                
                if record['total_contribution'] > 0:
                    transaction_data = {
                        'member_id': member['id'],
                        'transaction_date': '2024-07-01',
                        'amount': record['total_contribution'],
                        'transaction_type': 'deposit',
                        'description': '2024-2025 Financial Year Contribution',
                        'created_at': datetime.now().isoformat(),
                        'updated_at': datetime.now().isoformat()
                    }
                    
                    # Insert transaction
                    supabase.table('transactions').insert(transaction_data).execute()
                    self.migration_stats['transactions_created'] += 1
                    
            except Exception as e:
                print(f"❌ Error creating transaction for {member_name}: {e}")
                self.migration_stats['errors'] += 1
    
    def run_migration(self):
        """Run the simple financial data migration"""
        print("Starting PLF Simple Financial Data Migration...")
        print("=" * 60)
        
        # Load member data
        if not self.load_member_data():
            print("Failed to load member data. Exiting.")
            return False
        
        # Extract financial data from 2024-2025 sheet
        financial_data = self.extract_financial_data_2024_2025()
        if not financial_data:
            print("No financial data extracted. Exiting.")
            return False
        
        print(f"\n📊 FINANCIAL DATA EXTRACTED:")
        print(f"  Members with financial data: {len(financial_data)}")
        
        # Calculate totals
        total_balance = sum(record['closing_balance'] for record in financial_data)
        total_contributions = sum(record['total_contribution'] for record in financial_data)
        total_outstanding = sum(record['outstanding_contribution'] for record in financial_data)
        
        print(f"  Total closing balance: R{total_balance:,.2f}")
        print(f"  Total contributions: R{total_contributions:,.2f}")
        print(f"  Total outstanding: R{total_outstanding:,.2f}")
        print()
        
        # Create database records
        self.create_member_balances(financial_data)
        self.create_contribution_records(financial_data)
        self.create_transaction_records(financial_data)
        
        # Print migration summary
        print("\n" + "=" * 60)
        print("🎉 MIGRATION COMPLETED!")
        print("=" * 60)
        print(f"📊 MIGRATION STATISTICS:")
        print(f"  ✅ Balances updated: {self.migration_stats['balances_updated']}")
        print(f"  ✅ Contributions created: {self.migration_stats['contributions_created']}")
        print(f"  ✅ Transactions created: {self.migration_stats['transactions_created']}")
        print(f"  ❌ Errors encountered: {self.migration_stats['errors']}")
        print()
        print("📋 NEXT STEPS:")
        print("  1. Verify data in Supabase dashboard")
        print("  2. Test Edge Functions with real data")
        print("  3. Monitor automated processing")
        print("  4. Update implementation notes")
        
        return True

def main():
    """Main function"""
    # Check if Supabase credentials are available
    if not SUPABASE_SERVICE_ROLE_KEY:
        print("Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required")
        print("Please set it before running this script:")
        print("export SUPABASE_SERVICE_ROLE_KEY='your-service-role-key'")
        return
    
    # Create migration instance
    migration = PLFSimpleFinancialMigration()
    
    # Run migration
    success = migration.run_migration()
    
    if success:
        print("\nSimple financial data migration completed successfully!")
    else:
        print("\nSimple financial data migration failed. Please check the errors above.")

if __name__ == "__main__":
    main()
