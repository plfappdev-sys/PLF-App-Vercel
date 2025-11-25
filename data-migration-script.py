#!/usr/bin/env python3
"""
PLF Data Migration Script
Purpose: Migrate historical data to new business logic schema
Created: September 21, 2025
"""

import os
import json
from datetime import datetime, timedelta
import math
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://zdnyhzasvifrskbostgn.supabase.co')
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SERVICE_ROLE_KEY', '')

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

class PLFDataMigrator:
    def __init__(self):
        self.members_data = []
        self.transactions_data = []
        self.contributions_data = []
        self.member_balances_data = []
        
    def load_member_data(self):
        """Load existing member data from Supabase"""
        try:
            print("Loading member data from Supabase...")
            response = supabase.table('members').select('*').execute()
            self.members_data = response.data
            print(f"Loaded {len(self.members_data)} members")
            return True
        except Exception as e:
            print(f"Error loading member data: {e}")
            return False
    
    def load_transaction_data(self):
        """Load existing transaction data from Supabase"""
        try:
            print("Loading transaction data from Supabase...")
            response = supabase.table('transactions').select('*').execute()
            self.transactions_data = response.data
            print(f"Loaded {len(self.transactions_data)} transactions")
            return True
        except Exception as e:
            print(f"Error loading transaction data: {e}")
            return False
    
    def calculate_catch_up_fees(self):
        """Calculate catch-up fees for members who joined after July 2018"""
        print("Calculating catch-up fees...")
        july_2018 = datetime(2018, 7, 1)
        
        for member in self.members_data:
            if 'created_at' in member and member['created_at']:
                try:
                    # Parse the date and make it timezone-aware for comparison
                    join_date_str = member['created_at'].replace('Z', '+00:00')
                    join_date = datetime.fromisoformat(join_date_str)
                    
                    # Make both dates timezone-aware for comparison
                    july_2018_aware = july_2018.replace(tzinfo=join_date.tzinfo)
                    
                    if join_date > july_2018_aware:
                        # Calculate months from July 2018 to join date
                        months_missed = self.calculate_months_missed(join_date)
                        
                        # Calculate catch-up fee: R200 per missed month
                        catch_up_fee = months_missed * 200
                        
                        # Update member record
                        try:
                            supabase.table('members').update({
                                'catch_up_fee': catch_up_fee,
                                'monthly_contribution': 200.00
                            }).eq('id', member['id']).execute()
                            
                            print(f"Member {member['id']}: {months_missed} months missed, catch-up fee: R{catch_up_fee}")
                            
                        except Exception as e:
                            print(f"Error updating member {member['id']}: {e}")
                except Exception as e:
                    print(f"Error processing member {member['id']} date: {e}")
    
    def calculate_months_missed(self, join_date):
        """Calculate number of months missed from July 2018 to join date"""
        july_2018 = datetime(2018, 7, 1)
        
        # Calculate total months difference
        total_months = (join_date.year - july_2018.year) * 12 + (join_date.month - july_2018.month)
        
        # If join date is after the 15th, count that month as missed
        if join_date.day > 15:
            total_months += 1
            
        return max(0, total_months)
    
    def create_historical_contributions(self):
        """Create historical contributions from existing transaction data"""
        print("Creating historical contributions...")
        
        # Group transactions by member and month
        member_monthly_deposits = {}
        
        for transaction in self.transactions_data:
            if (transaction.get('transaction_type') == 'deposit' and 
                transaction.get('status') == 'completed' and
                transaction.get('member_id')):
                
                try:
                    transaction_date = datetime.fromisoformat(transaction['created_at'].replace('Z', '+00:00'))
                    month_key = f"{transaction['member_id']}-{transaction_date.year}-{transaction_date.month:02d}"
                    
                    if month_key not in member_monthly_deposits:
                        member_monthly_deposits[month_key] = {
                            'member_id': transaction['member_id'],
                            'year': transaction_date.year,
                            'month': transaction_date.month,
                            'total_amount': 0,
                            'transaction_count': 0
                        }
                    
                    member_monthly_deposits[month_key]['total_amount'] += float(transaction.get('amount', 0))
                    member_monthly_deposits[month_key]['transaction_count'] += 1
                    
                except Exception as e:
                    print(f"Error processing transaction {transaction['id']}: {e}")
        
        # Create contributions from monthly deposits
        for key, monthly_data in member_monthly_deposits.items():
            try:
                contribution_data = {
                    'member_id': monthly_data['member_id'],
                    'contribution_month': f"{monthly_data['year']}-{monthly_data['month']:02d}-01",
                    'due_date': f"{monthly_data['year']}-{monthly_data['month']:02d}-01",
                    'amount_due': 200.00,
                    'amount_paid': min(monthly_data['total_amount'], 200.00),
                    'status': 'paid' if monthly_data['total_amount'] >= 200.00 else 'partial',
                    'created_at': datetime.now().isoformat(),
                    'updated_at': datetime.now().isoformat()
                }
                
                # Insert contribution
                supabase.table('contributions').insert(contribution_data).execute()
                print(f"Created contribution for member {monthly_data['member_id']} - {monthly_data['year']}-{monthly_data['month']:02d}: R{monthly_data['total_amount']}")
                
            except Exception as e:
                print(f"Error creating contribution for {key}: {e}")
    
    def calculate_initial_balances(self):
        """Calculate initial balances for all members"""
        print("Calculating initial member balances...")
        
        for member in self.members_data:
            try:
                # Get all transactions for this member
                member_transactions = [t for t in self.transactions_data if t.get('member_id') == member['id']]
                
                # Calculate total deposits and withdrawals
                total_deposits = sum(float(t.get('amount', 0)) for t in member_transactions 
                                   if t.get('transaction_type') == 'deposit' and t.get('status') == 'completed')
                
                total_withdrawals = sum(float(t.get('amount', 0)) for t in member_transactions 
                                      if t.get('transaction_type') == 'withdrawal' and t.get('status') == 'completed')
                
                # Get total loan amount (simplified calculation)
                total_loans = sum(float(t.get('amount', 0)) for t in member_transactions 
                                if t.get('transaction_type') == 'loan_disbursement' and t.get('status') == 'completed')
                
                # Calculate net balance
                net_balance = total_deposits - total_withdrawals - total_loans
                
                # Create member balance record
                balance_data = {
                    'member_id': member['id'],
                    'savings_balance': max(0, total_deposits - total_withdrawals),
                    'loan_balance': total_loans,
                    'net_balance': net_balance,
                    'available_funds': max(0, total_deposits - total_withdrawals),
                    'last_updated': datetime.now().isoformat(),
                    'created_at': datetime.now().isoformat(),
                    'updated_at': datetime.now().isoformat()
                }
                
                # Insert member balance
                supabase.table('member_balances').insert(balance_data).execute()
                
                print(f"Member {member['id']}: Savings R{balance_data['savings_balance']}, Loans R{balance_data['loan_balance']}, Net R{balance_data['net_balance']}")
                
            except Exception as e:
                print(f"Error calculating balance for member {member['id']}: {e}")
    
    def run_migration(self):
        """Run the complete data migration process"""
        print("Starting PLF Data Migration...")
        print("=" * 50)
        
        # Load existing data
        if not self.load_member_data():
            print("Failed to load member data. Exiting.")
            return False
            
        if not self.load_transaction_data():
            print("Failed to load transaction data. Exiting.")
            return False
        
        # Step 1: Calculate and apply catch-up fees
        print("\n1. Calculating catch-up fees...")
        self.calculate_catch_up_fees()
        
        # Step 2: Create historical contributions
        print("\n2. Creating historical contributions...")
        self.create_historical_contributions()
        
        # Step 3: Calculate initial balances
        print("\n3. Calculating initial balances...")
        self.calculate_initial_balances()
        
        print("\n" + "=" * 50)
        print("Data migration completed successfully!")
        print("Please verify the data in the following tables:")
        print("- members (catch_up_fee, monthly_contribution)")
        print("- contributions (historical contributions)")
        print("- member_balances (initial balances)")
        
        return True

def main():
    """Main function"""
    # Check if Supabase credentials are available
    if not SUPABASE_SERVICE_ROLE_KEY:
        print("Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required")
        print("Please set it before running this script:")
        print("export SUPABASE_SERVICE_ROLE_KEY='your-service-role-key'")
        return
    
    # Create migrator instance
    migrator = PLFDataMigrator()
    
    # Run migration
    success = migrator.run_migration()
    
    if success:
        print("\nMigration completed successfully!")
    else:
        print("\nMigration failed. Please check the errors above.")

if __name__ == "__main__":
    main()
