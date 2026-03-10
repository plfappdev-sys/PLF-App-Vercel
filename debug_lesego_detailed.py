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

def debug_lesego_detailed():
    """Debug Lesego Bokaba's data in detail"""
    print("Debugging Lesego Bokaba's data in detail...")
    
    try:
        # Initialize Supabase client
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Get Lesego Bokaba from database with ALL columns
        response = supabase.table('members').select('*').eq('name', 'Lesego Bokaba').execute()
        
        if hasattr(response, 'data') and response.data:
            member = response.data[0]
            print(f"\n=== FULL DATABASE RECORD FOR LESEGO BOKABA ===")
            
            # Print all columns
            for key, value in member.items():
                print(f"{key}: {value}")
            
            print(f"\n=== FINANCIAL INFO PARSED ===")
            financial_info = member.get('financial_info', {})
            if isinstance(financial_info, str):
                try:
                    financial_info = json.loads(financial_info)
                except:
                    financial_info = {}
            
            print(f"Financial Info (parsed):")
            for key, value in financial_info.items():
                print(f"  {key}: {value}")
            
            print(f"\n=== CHECKING CATCH_UP_FEE ===")
            catch_up_fee = member.get('catch_up_fee', 0)
            print(f"catch_up_fee column value: {catch_up_fee}")
            
            print(f"\n=== CHECKING MEMBER_BALANCES TABLE ===")
            if 'id' in member:
                balances_response = supabase.table('member_balances').select('*').eq('member_id', member['id']).execute()
                if hasattr(balances_response, 'data') and balances_response.data:
                    balance = balances_response.data[0]
                    print(f"Member Balances Record:")
                    for key, value in balance.items():
                        print(f"  {key}: {value}")
                else:
                    print("  No record in member_balances table")
            
            print(f"\n=== APP CALCULATION SIMULATION ===")
            # Simulate what the app does
            outstanding_amount = (member.get('catch_up_fee', 0) or 0) + (financial_info.get('outstanding_amount', 0) or 0)
            print(f"App would calculate outstanding as: catch_up_fee + financial_info.outstanding_amount")
            print(f"  catch_up_fee: {member.get('catch_up_fee', 0)}")
            print(f"  financial_info.outstanding_amount: {financial_info.get('outstanding_amount', 0)}")
            print(f"  TOTAL OUTSTANDING (app calculation): {outstanding_amount}")
            
            print(f"\n=== WHAT THE APP SHOWS ===")
            print("Based on screenshots:")
            print("  - Balance due: R2600 (this is current_balance)")
            print("  - Total Contributions: R2600 (this is total_contributions)")
            print("  - Outstanding: R2600 (this should be catch_up_fee + outstanding_amount)")
            print("  - Planned contributions: 0")
            
            print(f"\n=== THE PROBLEM ===")
            print("The app shows Outstanding: R2600, but database has:")
            print(f"  - catch_up_fee: {member.get('catch_up_fee', 0)}")
            print(f"  - financial_info.outstanding_amount: {financial_info.get('outstanding_amount', 0)}")
            print(f"  - Sum: {(member.get('catch_up_fee', 0) or 0) + (financial_info.get('outstanding_amount', 0) or 0)}")
            print("\nSo either:")
            print("1. The app is calculating differently than we think")
            print("2. There's another field being used")
            print("3. The app logic has a bug")
            
            # Check if there are other numeric fields
            print(f"\n=== CHECKING OTHER NUMERIC FIELDS ===")
            numeric_fields = []
            for key, value in member.items():
                if isinstance(value, (int, float)) and value != 0:
                    numeric_fields.append((key, value))
            
            if numeric_fields:
                print("Other numeric fields with non-zero values:")
                for key, value in numeric_fields:
                    print(f"  {key}: {value}")
            else:
                print("No other numeric fields with non-zero values")
        
    except Exception as e:
        print(f"Error debugging Lesego Bokaba data: {e}")

def check_app_screens_logic():
    """Check how the app screens might be calculating values"""
    print("\n" + "="*80)
    print("APP SCREENS LOGIC ANALYSIS")
    print("="*80)
    
    print("\nLooking at the member service code, here's what happens:")
    print("1. getMemberByNumber() fetches member data")
    print("2. It calculates outstandingAmount = catch_up_fee + financial_info.outstanding_amount")
    print("3. It uses current_balance from financial_info for 'Balance due'")
    print("4. It uses total_contributions from financial_info for 'Total Contributions'")
    
    print("\nPossible issues found:")
    print("1. The 'Balance due' might be showing current_balance instead of outstandingAmount")
    print("2. Or the app might have different logic in the UI screens")
    print("3. Or there might be transaction data affecting calculations")
    
    print("\nRecommendation:")
    print("1. Check if Lesego Bokaba has catch_up_fee > 0")
    print("2. Check if the app UI is using the right fields")
    print("3. Consider updating the financial_info to have:")
    print("   - current_balance = 0 (if contributions were paid)")
    print("   - outstanding_amount = 0 (if nothing is owed)")
    print("   - total_contributions = 2600 (correct from Excel)")

if __name__ == "__main__":
    debug_lesego_detailed()
    check_app_screens_logic()