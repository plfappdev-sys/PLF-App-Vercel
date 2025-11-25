#!/usr/bin/env python3
"""
PLF Excel Data Migration Script
Purpose: Migrate historical data from Excel to Supabase
Created: September 21, 2025
"""

import os
import json
from datetime import datetime
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration - Use correct environment variable names
SUPABASE_URL = os.getenv('PROJECT_URL', 'https://zdnyhzasvifrskbostgn.supabase.co')
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SERVICE_ROLE_KEY', '')

class PLFExcelDataMigrator:
    def __init__(self):
        self.supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
        self.members_data = []
        self.contributions_data = []
        self.transactions_data = []
        
    def load_extracted_data(self):
        """Load data extracted from Excel files"""
        print("Loading extracted data from JSON files...")
        
        try:
            # Load members data
            with open('extracted_members_detailed.json', 'r') as f:
                self.members_data = json.load(f)
            
            # Load contributions data
            with open('extracted_contributions.json', 'r') as f:
                self.contributions_data = json.load(f)
            
            # Load transactions data
            with open('extracted_transactions.json', 'r') as f:
                self.transactions_data = json.load(f)
                
            print(f"Loaded {len(self.members_data)} members, {len(self.contributions_data)} contributions, {len(self.transactions_data)} transactions")
            return True
            
        except Exception as e:
            print(f"Error loading extracted data: {e}")
            return False
    
    def migrate_members(self):
        """Migrate member data to Supabase"""
        print("Migrating member data to Supabase...")
        
        success_count = 0
        error_count = 0
        
        for member in self.members_data:
            try:
                # Prepare member data for Supabase - using JSONB structure
                member_data = {
                    'member_number': str(member['member_number']),
                    'join_date': member['join_date'],
                    'catch_up_fee': self.calculate_catch_up_fee(member),
                    'monthly_contribution': 200.00,  # Default R200 monthly contribution
                    'personal_info': {
                        'first_name': f"Member{member['member_number']}",
                        'last_name': f"LastName{member['member_number']}",
                        'full_name': f"Member{member['member_number']} LastName{member['member_number']}"
                    },
                    'financial_info': {
                        'membership_fee': float(member['membership_fee']),
                        'total_contributions': 0.0,
                        'total_interest_earned': 0.0
                    },
                    'membership_status': {
                        'status': 'active',
                        'is_active': True,
                        'join_date': member['join_date']
                    }
                }
                
                # Insert into Supabase
                response = self.supabase.table('members').insert(member_data).execute()
                
                if response.data:
                    success_count += 1
                    print(f"✅ Migrated member {member['member_number']}")
                else:
                    error_count += 1
                    print(f"❌ Failed to migrate member {member['member_number']}")
                    
            except Exception as e:
                error_count += 1
                print(f"❌ Error migrating member {member.get('member_number', 'unknown')}: {e}")
        
        print(f"Member migration: {success_count} successful, {error_count} failed")
        return success_count > 0
    
    def calculate_catch_up_fee(self, member):
        """Calculate catch-up fee for members who joined after July 2018"""
        if not member.get('join_date'):
            return 0.0
        
        try:
            join_date = datetime.fromisoformat(member['join_date'].replace('Z', '+00:00'))
            july_2018 = datetime(2018, 7, 1)
            
            if join_date > july_2018:
                # Calculate months from July 2018 to join date
                months_missed = (join_date.year - july_2018.year) * 12 + (join_date.month - july_2018.month)
                
                # If join date is after the 15th, count that month as missed
                if join_date.day > 15:
                    months_missed += 1
                
                # Calculate catch-up fee: R200 per missed month
                catch_up_fee = max(0, months_missed) * 200
                print(f"Member {member['member_number']}: {months_missed} months missed, catch-up fee: R{catch_up_fee}")
                return catch_up_fee
                
        except Exception as e:
            print(f"Error calculating catch-up fee for member {member['member_number']}: {e}")
        
        return 0.0
    
    def migrate_contributions(self):
        """Migrate contribution data to Supabase"""
        print("Migrating contribution data to Supabase...")
        
        success_count = 0
        error_count = 0
        
        for contribution in self.contributions_data:
            try:
                # Prepare contribution data for Supabase
                contribution_date = datetime.fromisoformat(contribution['contribution_date'].replace('Z', '+00:00'))
                
                contribution_data = {
                    'member_id': self.get_member_id_by_number(contribution['member_id']),
                    'contribution_month': contribution_date.strftime('%Y-%m-01'),
                    'due_date': contribution_date.strftime('%Y-%m-01'),
                    'amount_due': 200.00,
                    'amount_paid': float(contribution['amount']),
                    'status': 'paid' if float(contribution['amount']) >= 200.00 else 'partial',
                    'created_at': datetime.now().isoformat(),
                    'updated_at': datetime.now().isoformat()
                }
                
                # Insert into Supabase
                response = self.supabase.table('contributions').insert(contribution_data).execute()
                
                if response.data:
                    success_count += 1
                else:
                    error_count += 1
                    
            except Exception as e:
                error_count += 1
                print(f"❌ Error migrating contribution: {e}")
        
        print(f"Contribution migration: {success_count} successful, {error_count} failed")
        return success_count > 0
    
    def migrate_transactions(self):
        """Migrate transaction data to Supabase"""
        print("Migrating transaction data to Supabase...")
        
        success_count = 0
        error_count = 0
        
        for transaction in self.transactions_data:
            try:
                # Prepare transaction data for Supabase
                transaction_data = {
                    'member_id': self.get_member_id_by_number(transaction['member_id']),
                    'transaction_type': transaction['transaction_type'],
                    'amount': float(transaction['amount']),
                    'description': transaction['description'],
                    'status': transaction['status'],
                    'created_at': datetime.now().isoformat(),
                    'updated_at': datetime.now().isoformat()
                }
                
                # Insert into Supabase
                response = self.supabase.table('transactions').insert(transaction_data).execute()
                
                if response.data:
                    success_count += 1
                else:
                    error_count += 1
                    
            except Exception as e:
                error_count += 1
                print(f"❌ Error migrating transaction: {e}")
        
        print(f"Transaction migration: {success_count} successful, {error_count} failed")
        return success_count > 0
    
    def get_member_id_by_number(self, member_identifier):
        """Get Supabase member ID by member number or identifier"""
        try:
            if isinstance(member_identifier, str) and 'Member' in member_identifier:
                # Extract number from "Member X" format
                import re
                numbers = re.findall(r'\d+', member_identifier)
                if numbers:
                    member_number = str(numbers[0])
                else:
                    return None
            else:
                member_number = str(member_identifier)
            
            # Query the database to get the actual member ID
            response = self.supabase.table('members')\
                .select('id')\
                .eq('member_number', member_number)\
                .execute()
            
            if response.data and len(response.data) > 0:
                return response.data[0]['id']
            else:
                print(f"❌ Member with number {member_number} not found in database")
                return None
                
        except Exception as e:
            print(f"❌ Error getting member ID: {e}")
            return None
    
    def calculate_initial_balances(self):
        """Calculate initial balances for all members based on transactions"""
        print("Calculating initial member balances...")
        
        try:
            # Get all members from Supabase
            response = self.supabase.table('members').select('id, member_number').execute()
            members = response.data
            
            for member in members:
                try:
                    # Get all transactions for this member
                    transactions_response = self.supabase.table('transactions')\
                        .select('transaction_type, amount')\
                        .eq('member_id', member['id'])\
                        .execute()
                    
                    transactions = transactions_response.data
                    
                    # Calculate balances
                    total_deposits = sum(t['amount'] for t in transactions if t['transaction_type'] == 'deposit')
                    total_withdrawals = sum(t['amount'] for t in transactions if t['transaction_type'] == 'withdrawal')
                    
                    # For now, we'll assume no loans in initial migration
                    net_balance = total_deposits - total_withdrawals
                    
                    # Create member balance record
                    balance_data = {
                        'member_id': member['id'],
                        'savings_balance': max(0, total_deposits - total_withdrawals),
                        'loan_balance': 0.0,
                        'net_balance': net_balance,
                        'available_funds': max(0, total_deposits - total_withdrawals),
                        'last_updated': datetime.now().isoformat(),
                        'created_at': datetime.now().isoformat(),
                        'updated_at': datetime.now().isoformat()
                    }
                    
                    # Insert into Supabase
                    self.supabase.table('member_balances').insert(balance_data).execute()
                    
                    print(f"✅ Calculated balance for member {member['member_number']}: R{net_balance}")
                    
                except Exception as e:
                    print(f"❌ Error calculating balance for member {member['member_number']}: {e}")
            
            return True
            
        except Exception as e:
            print(f"❌ Error calculating initial balances: {e}")
            return False
    
    def run_migration(self):
        """Run the complete data migration process"""
        print("Starting PLF Excel Data Migration...")
        print("=" * 50)
        
        # Check if Supabase credentials are available
        if not SUPABASE_SERVICE_ROLE_KEY:
            print("❌ SUPABASE_SERVICE_ROLE_KEY environment variable is required")
            return False
        
        # Load extracted data
        if not self.load_extracted_data():
            print("❌ Failed to load extracted data. Please run excel-data-extractor.py first.")
            return False
        
        # Step 1: Migrate members
        print("\n1. Migrating members...")
        if not self.migrate_members():
            print("❌ Member migration failed")
            return False
        
        # Step 2: Migrate contributions
        print("\n2. Migrating contributions...")
        if not self.migrate_contributions():
            print("⚠️ Contribution migration had issues (some may have failed)")
        
        # Step 3: Migrate transactions
        print("\n3. Migrating transactions...")
        if not self.migrate_transactions():
            print("⚠️ Transaction migration had issues (some may have failed)")
        
        # Step 4: Calculate initial balances
        print("\n4. Calculating initial balances...")
        if not self.calculate_initial_balances():
            print("⚠️ Balance calculation had issues")
        
        print("\n" + "=" * 50)
        print("✅ Data migration completed!")
        print("Please verify the data in the following tables:")
        print("- members (with catch-up fees and monthly contributions)")
        print("- contributions (historical contributions)")
        print("- transactions (payment history)")
        print("- member_balances (initial balances)")
        
        return True

def main():
    """Main function"""
    # Create migrator instance
    migrator = PLFExcelDataMigrator()
    
    # Run migration
    success = migrator.run_migration()
    
    if success:
        print("\n🎉 Migration completed successfully!")
        print("\nNext steps:")
        print("1. Verify data in Supabase dashboard")
        print("2. Test the application with real historical data")
        print("3. Monitor Edge Functions execution with real data")
    else:
        print("\n❌ Migration failed. Please check the errors above.")

if __name__ == "__main__":
    main()
