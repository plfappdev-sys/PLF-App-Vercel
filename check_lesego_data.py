import pandas as pd
import numpy as np
import os
from supabase import create_client, Client
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

def check_lesego_bokaba_data():
    """Check Lesego Bokaba's data in database and Excel"""
    print("Checking Lesego Bokaba's data...")
    
    try:
        # Initialize Supabase client
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Get Lesego Bokaba from database
        response = supabase.table('members').select('*').eq('name', 'Lesego Bokaba').execute()
        
        if hasattr(response, 'data') and response.data:
            member = response.data[0]
            print(f"\nDatabase Record for Lesego Bokaba:")
            print(f"  Member Number: {member.get('member_number')}")
            print(f"  Name: {member.get('name')}")
            print(f"  Join Date: {member.get('join_date')}")
            
            financial_info = member.get('financial_info', {})
            if isinstance(financial_info, str):
                try:
                    financial_info = json.loads(financial_info)
                except:
                    financial_info = {}
            
            print(f"\nFinancial Info:")
            print(f"  Total Contributions: {financial_info.get('total_contributions', 0):,.2f}")
            print(f"  Current Balance: {financial_info.get('current_balance', 0):,.2f}")
            print(f"  Outstanding Amount: {financial_info.get('outstanding_amount', 0):,.2f}")
            
            if 'contributions_by_year' in financial_info:
                print(f"\nContributions by Year:")
                for year, amount in financial_info['contributions_by_year'].items():
                    print(f"  {year}: {amount:,.2f}")
            
            # Check if there's a user linked to this member
            user_response = supabase.table('users').select('*').eq('email', 'lesego@plf.com').execute()
            if hasattr(user_response, 'data') and user_response.data:
                user = user_response.data[0]
                print(f"\nUser Record:")
                print(f"  Email: {user.get('email')}")
                print(f"  Role: {user.get('role')}")
                print(f"  Member ID: {user.get('member_id')}")
        
        # Check Excel data for Lesego Bokaba
        print("\n\nChecking Excel data...")
        EXCEL_FILE = r"NewBusLogic\Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"
        
        # Check all financial year sheets
        sheets = ['2022-2023', '2023-2024', '2024-2025']
        excel_total = 0
        excel_breakdown = {}
        
        for sheet in sheets:
            try:
                df = pd.read_excel(EXCEL_FILE, sheet_name=sheet)
                
                # Find Lesego Bokaba
                for idx, row in df.iterrows():
                    member_name = str(row.iloc[0]).strip() if pd.notna(row.iloc[0]) else ""
                    if member_name == 'Lesego Bokaba':
                        # Get total contributions from Column G (index 6)
                        total_contrib = 0
                        try:
                            if pd.notna(row.iloc[6]):
                                total_contrib = float(row.iloc[6])
                        except:
                            pass
                        
                        excel_total += total_contrib
                        excel_breakdown[sheet] = total_contrib
                        print(f"  Found in {sheet}: {total_contrib:,.2f}")
                        break
            except Exception as e:
                print(f"  Error reading {sheet}: {e}")
        
        print(f"\nExcel Summary for Lesego Bokaba:")
        print(f"  Total Contributions: {excel_total:,.2f}")
        for year, amount in excel_breakdown.items():
            print(f"  {year}: {amount:,.2f}")
        
        # Check what the app might be calculating
        print("\n\nApp Display Analysis:")
        print("The app shows:")
        print("  - Balance due: R2600")
        print("  - Total Contributions: R2600")
        print("  - Outstanding: R2600")
        print("  - Planned contributions: 0")
        
        print("\nPossible Issues:")
        print("1. The app might be interpreting 'current_balance' as 'balance due'")
        print("2. 'Outstanding' might be calculated as: total_contributions - something")
        print("3. There might be transaction records affecting the calculations")
        
        # Check transactions for Lesego Bokaba
        print("\n\nChecking transaction records...")
        if 'id' in member:
            transactions_response = supabase.table('transactions').select('*').eq('member_id', member['id']).execute()
            if hasattr(transactions_response, 'data') and transactions_response.data:
                transactions = transactions_response.data
                print(f"  Found {len(transactions)} transactions")
                
                total_deposits = 0
                total_withdrawals = 0
                
                for tx in transactions:
                    amount = tx.get('amount', 0)
                    tx_type = tx.get('transaction_type', '')
                    
                    if tx_type.lower() in ['deposit', 'contribution']:
                        total_deposits += amount
                    elif tx_type.lower() in ['withdrawal', 'payment']:
                        total_withdrawals += amount
                    
                    print(f"    {tx.get('transaction_date')}: {tx_type} - {amount:,.2f}")
                
                print(f"\n  Transaction Summary:")
                print(f"    Total Deposits: {total_deposits:,.2f}")
                print(f"    Total Withdrawals: {total_withdrawals:,.2f}")
                print(f"    Net: {(total_deposits - total_withdrawals):,.2f}")
            else:
                print("  No transaction records found")
        
    except Exception as e:
        print(f"Error checking Lesego Bokaba data: {e}")

def check_app_calculation_logic():
    """Check how the app calculates balances"""
    print("\n" + "="*80)
    print("APP CALCULATION LOGIC ANALYSIS")
    print("="*80)
    
    print("\nBased on the app display, here's what seems to be happening:")
    print("1. 'Total Contributions' = total_contributions from financial_info")
    print("2. 'Balance due' = current_balance from financial_info")
    print("3. 'Outstanding' = outstanding_amount from financial_info")
    print("4. 'Planned contributions' = 0 (not implemented or no future contributions)")
    
    print("\nThe Problem:")
    print("- If current_balance = total_contributions = 2600")
    print("- And outstanding_amount = 2600")
    print("- Then the app shows everything as 'due' and 'outstanding'")
    
    print("\nPossible Solutions:")
    print("1. Update financial_info to have:")
    print("   - current_balance = 0 (if paid)")
    print("   - outstanding_amount = 0 (if paid)")
    print("   OR")
    print("2. Add transaction records showing payments were made")
    print("3. Update app logic to calculate differently")
    
    print("\nRecommendation:")
    print("Check if Lesego Bokaba has actually made payments. If yes:")
    print("1. Add transaction records for payments")
    print("2. Update financial_info to reflect actual current balance")
    print("3. Set outstanding_amount to 0")

if __name__ == "__main__":
    check_lesego_bokaba_data()
    check_app_calculation_logic()