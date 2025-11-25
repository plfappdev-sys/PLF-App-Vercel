#!/usr/bin/env python3
"""
PLF Complete Financial Data Migration Script
Purpose: Import historical contributions, transactions, and balances from all Excel sheets
Created: November 24, 2025
"""

import os
import json
from datetime import datetime, timedelta
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

class PLFFinancialDataMigration:
    def __init__(self):
        self.members_data = {}
        self.excel_data = {}
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
    
    def analyze_excel_structure(self):
        """Analyze all Excel sheets to understand data structure"""
        try:
            print("Analyzing Excel file structure...")
            file_path = 'NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025.xlsx'
            excel_file = pd.ExcelFile(file_path)
            sheet_names = excel_file.sheet_names
            
            print(f"Found {len(sheet_names)} sheets in Excel file")
            
            # Identify financial year sheets
            financial_sheets = []
            transaction_sheets = []
            summary_sheets = []
            
            for sheet_name in sheet_names:
                df = pd.read_excel(file_path, sheet_name=sheet_name)
                
                # Check sheet type based on columns
                columns = [str(col).lower() for col in df.columns]
                
                if any('transaction' in col for col in columns):
                    transaction_sheets.append(sheet_name)
                    print(f"  📊 Transaction sheet: {sheet_name} ({len(df)} rows)")
                
                elif any(year in sheet_name for year in ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']):
                    if any('contribution' in col for col in columns) or any('balance' in col for col in columns):
                        financial_sheets.append(sheet_name)
                        print(f"  💰 Financial sheet: {sheet_name} ({len(df)} rows)")
                
                else:
                    summary_sheets.append(sheet_name)
                    print(f"  📈 Summary sheet: {sheet_name} ({len(df)} rows)")
            
            return {
                'financial_sheets': financial_sheets,
                'transaction_sheets': transaction_sheets,
                'summary_sheets': summary_sheets
            }
            
        except Exception as e:
            print(f"❌ Error analyzing Excel structure: {e}")
            return None
    
    def extract_transaction_data(self, sheet_name):
        """Extract transaction data from transaction sheets"""
        try:
            file_path = 'NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025.xlsx'
            df = pd.read_excel(file_path, sheet_name=sheet_name)
            
            transactions = []
            
            for index, row in df.iterrows():
                try:
                    # Look for transaction date, amount, and member columns
                    transaction_date = None
                    amount = None
                    member_name = None
                    
                    # Try to find date column
                    for col in df.columns:
                        if 'date' in str(col).lower():
                            if pd.notna(row[col]):
                                transaction_date = row[col]
                                break
                    
                    # Try to find amount column
                    for col in df.columns:
                        if 'amount' in str(col).lower():
                            if pd.notna(row[col]):
                                amount = float(row[col])
                                break
                    
                    # Try to find member column
                    for col in df.columns:
                        if 'member' in str(col).lower():
                            if pd.notna(row[col]):
                                member_name = str(row[col]).strip()
                                break
                    
                    if transaction_date and amount and member_name:
                        transactions.append({
                            'transaction_date': transaction_date,
                            'amount': amount,
                            'member_name': member_name,
                            'sheet': sheet_name
                        })
                        
                except Exception as e:
                    print(f"⚠️  Error processing row {index} in {sheet_name}: {e}")
                    continue
            
            print(f"  Extracted {len(transactions)} transactions from {sheet_name}")
            return transactions
            
        except Exception as e:
            print(f"❌ Error extracting transactions from {sheet_name}: {e}")
            return []
    
    def extract_contribution_data(self, sheet_name):
        """Extract contribution data from financial year sheets"""
        try:
            file_path = 'NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025.xlsx'
            df = pd.read_excel(file_path, sheet_name=sheet_name)
            
            contributions = []
            
            for index, row in df.iterrows():
                try:
                    # Get member name
                    member_name = None
                    for col in df.columns:
                        if 'member' in str(col).lower() and col != 'Date Join':
                            if pd.notna(row[col]):
                                member_name = str(row[col]).strip()
                                break
                    
                    if not member_name:
                        continue
                    
                    # Extract monthly contributions
                    monthly_contributions = {}
                    
                    for col in df.columns:
                        col_str = str(col).lower()
                        # Look for month columns (e.g., "July 2021", "August 2021", etc.)
                        if any(month in col_str for month in ['january', 'february', 'march', 'april', 'may', 'june', 
                                                             'july', 'august', 'september', 'october', 'november', 'december']):
                            if pd.notna(row[col]) and isinstance(row[col], (int, float)):
                                monthly_contributions[col] = float(row[col])
                    
                    if monthly_contributions:
                        contributions.append({
                            'member_name': member_name,
                            'monthly_contributions': monthly_contributions,
                            'financial_year': sheet_name,
                            'total_contribution': sum(monthly_contributions.values())
                        })
                        
                except Exception as e:
                    print(f"⚠️  Error processing row {index} in {sheet_name}: {e}")
                    continue
            
            print(f"  Extracted {len(contributions)} contribution records from {sheet_name}")
            return contributions
            
        except Exception as e:
            print(f"❌ Error extracting contributions from {sheet_name}: {e}")
            return []
    
    def extract_balance_data(self, sheet_name):
        """Extract balance data from financial year sheets"""
        try:
            file_path = 'NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025.xlsx'
            df = pd.read_excel(file_path, sheet_name=sheet_name)
            
            balances = []
            
            for index, row in df.iterrows():
                try:
                    # Get member name
                    member_name = None
                    for col in df.columns:
                        if 'member' in str(col).lower() and col != 'Date Join':
                            if pd.notna(row[col]):
                                member_name = str(row[col]).strip()
                                break
                    
                    if not member_name:
                        continue
                    
                    # Extract balance data
                    balance_data = {}
                    
                    for col in df.columns:
                        col_str = str(col).lower()
                        if 'balance' in col_str and pd.notna(row[col]) and isinstance(row[col], (int, float)):
                            balance_data[col] = float(row[col])
                    
                    if balance_data:
                        balances.append({
                            'member_name': member_name,
                            'balance_data': balance_data,
                            'financial_year': sheet_name
                        })
                        
                except Exception as e:
                    print(f"⚠️  Error processing row {index} in {sheet_name}: {e}")
                    continue
            
            print(f"  Extracted {len(balances)} balance records from {sheet_name}")
            return balances
            
        except Exception as e:
            print(f"❌ Error extracting balances from {sheet_name}: {e}")
            return []
    
    def create_contributions(self, contribution_data):
        """Create contribution records in database"""
        print("Creating contribution records...")
        
        for record in contribution_data:
            try:
                member_name = record['member_name']
                if member_name not in self.members_data:
                    print(f"⚠️  Member not found: {member_name}")
                    continue
                
                member = self.members_data[member_name]
                
                # Create contribution for each month
                for month_col, amount in record['monthly_contributions'].items():
                    if amount > 0:
                        try:
                            # Parse month and year from column name
                            month_year = self.parse_month_year(month_col, record['financial_year'])
                            
                            if month_year:
                                contribution_data = {
                                    'member_id': member['id'],
                                    'contribution_month': month_year,
                                    'due_date': month_year,
                                    'amount_due': 200.00,  # Standard monthly contribution
                                    'amount_paid': amount,
                                    'status': 'paid' if amount >= 200.00 else 'partial',
                                    'created_at': datetime.now().isoformat(),
                                    'updated_at': datetime.now().isoformat()
                                }
                                
                                # Insert contribution
                                supabase.table('contributions').insert(contribution_data).execute()
                                self.migration_stats['contributions_created'] += 1
                                
                        except Exception as e:
                            print(f"❌ Error creating contribution for {member_name}: {e}")
                            self.migration_stats['errors'] += 1
                            
            except Exception as e:
                print(f"❌ Error processing contribution record: {e}")
                self.migration_stats['errors'] += 1
    
    def create_transactions(self, transaction_data):
        """Create transaction records in database"""
        print("Creating transaction records...")
        
        for transaction in transaction_data:
            try:
                member_name = transaction['member_name']
                if member_name not in self.members_data:
                    print(f"⚠️  Member not found: {member_name}")
                    continue
                
                member = self.members_data[member_name]
                
                transaction_record = {
                    'member_id': member['id'],
                    'transaction_date': transaction['transaction_date'].isoformat() if hasattr(transaction['transaction_date'], 'isoformat') else str(transaction['transaction_date']),
                    'amount': transaction['amount'],
                    'transaction_type': 'deposit' if transaction['amount'] > 0 else 'withdrawal',
                    'description': f'Contribution from {transaction["sheet"]}',
                    'created_at': datetime.now().isoformat(),
                    'updated_at': datetime.now().isoformat()
                }
                
                # Insert transaction
                supabase.table('transactions').insert(transaction_record).execute()
                self.migration_stats['transactions_created'] += 1
                
            except Exception as e:
                print(f"❌ Error creating transaction for {member_name}: {e}")
                self.migration_stats['errors'] += 1
    
    def update_member_balances(self, balance_data):
        """Update member balances based on extracted data"""
        print("Updating member balances...")
        
        for balance_record in balance_data:
            try:
                member_name = balance_record['member_name']
                if member_name not in self.members_data:
                    print(f"⚠️  Member not found: {member_name}")
                    continue
                
                member = self.members_data[member_name]
                
                # Calculate total balance from balance data
                total_balance = sum(balance_record['balance_data'].values())
                
                if total_balance > 0:
                    balance_update = {
                        'member_id': member['id'],
                        'savings_balance': total_balance,
                        'loan_balance': 0.00,
                        'net_balance': total_balance,
                        'available_funds': total_balance,
                        'created_at': datetime.now().isoformat(),
                        'updated_at': datetime.now().isoformat()
                    }
                    
                    # Insert or update member balance
                    supabase.table('member_balances').upsert(balance_update, on_conflict='member_id').execute()
                    self.migration_stats['balances_updated'] += 1
                    
            except Exception as e:
                print(f"❌ Error updating balance for {member_name}: {e}")
                self.migration_stats['errors'] += 1
    
    def parse_month_year(self, month_col, financial_year):
        """Parse month and year from column name"""
        try:
            # Extract month from column name
            month_map = {
                'january': 1, 'february': 2, 'march': 3, 'april': 4, 'may': 5, 'june': 6,
                'july': 7, 'august': 8, 'september': 9, 'october': 10, 'november': 11, 'december': 12
            }
            
            col_lower = str(month_col).lower()
            for month_name, month_num in month_map.items():
                if month_name in col_lower:
                    # Extract year from financial year sheet name
                    year_match = None
                    if '-' in financial_year:
                        years = financial_year.split('-')
                        if len(years) >= 2:
                            year_match = years[0].strip()
                    
                    if not year_match:
                        # Try to extract year from column name
                        for word in col_lower.split():
                            if word.isdigit() and len(word) == 4:
                                year_match = word
                                break
                    
                    if year_match:
                        year = int(year_match)
                        return f"{year}-{month_num:02d}-01"
            
            return None
            
        except Exception as e:
            print(f"❌ Error parsing month/year from {month_col}: {e}")
            return None
    
    def run_migration(self):
        """Run the complete financial data migration"""
        print("Starting PLF Complete Financial Data Migration...")
        print("=" * 60)
        
        # Load member data
        if not self.load_member_data():
            print("Failed to load member data. Exiting.")
            return False
        
        # Analyze Excel structure
        sheet_analysis = self.analyze_excel_structure()
        if not sheet_analysis:
            print("Failed to analyze Excel structure. Exiting.")
            return False
        
        print("\n📊 MIGRATION PLAN:")
        print(f"  Financial sheets: {len(sheet_analysis['financial_sheets'])}")
        print(f"  Transaction sheets: {len(sheet_analysis['transaction_sheets'])}")
        print(f"  Summary sheets: {len(sheet_analysis['summary_sheets'])}")
        print()
        
        # Process transaction sheets first
        all_transactions = []
        for sheet_name in sheet_analysis['transaction_sheets']:
            print(f"Processing transaction sheet: {sheet_name}")
            transactions = self.extract_transaction_data(sheet_name)
            all_transactions.extend(transactions)
        
        # Process financial year sheets
        all_contributions = []
        all_balances = []
        for sheet_name in sheet_analysis['financial_sheets']:
            print(f"Processing financial sheet: {sheet_name}")
            
            # Extract contributions
            contributions = self.extract_contribution_data(sheet_name)
            all_contributions.extend(contributions)
            
            # Extract balances
            balances = self.extract_balance_data(sheet_name)
            all_balances.extend(balances)
        
        print(f"\n📈 EXTRACTION SUMMARY:")
        print(f"  Transactions extracted: {len(all_transactions)}")
        print(f"  Contribution records extracted: {len(all_contributions)}")
        print(f"  Balance records extracted: {len(all_balances)}")
        print()
        
        # Create database records
        if all_transactions:
            self.create_transactions(all_transactions)
        
        if all_contributions:
            self.create_contributions(all_contributions)
        
        if all_balances:
            self.update_member_balances(all_balances)
        
        # Print migration summary
        print("\n" + "=" * 60)
        print("🎉 MIGRATION COMPLETED!")
        print("=" * 60)
        print(f"📊 MIGRATION STATISTICS:")
        print(f"  ✅ Contributions created: {self.migration_stats['contributions_created']}")
        print(f"  ✅ Transactions created: {self.migration_stats['transactions_created']}")
        print(f"  ✅ Balances updated: {self.migration_stats['balances_updated']}")
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
    migration = PLFFinancialDataMigration()
    
    # Run migration
    success = migration.run_migration()
    
    if success:
        print("\nFinancial data migration completed successfully!")
    else:
        print("\nFinancial data migration failed. Please check the errors above.")
