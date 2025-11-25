#!/usr/bin/env python3
"""
Script to check all required tables and columns for the data replacement
"""

import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration
SUPABASE_URL = os.getenv('PROJECT_URL', 'https://zdnyhzasvifrskbostgn.supabase.co')
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SERVICE_ROLE_KEY', '')

def check_all_tables():
    """Check all required tables and columns"""
    print("Checking all required tables and columns...")
    
    try:
        # Initialize Supabase client
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
        
        # Tables that should exist
        required_tables = [
            'members', 'users', 'financial_years', 'system_settings',
            'member_balances', 'contributions', 'transactions', 'loans',
            'interest_accruals', 'audit_logs'
        ]
        
        print("\n=== CHECKING REQUIRED TABLES ===")
        for table in required_tables:
            try:
                response = supabase.table(table).select('*').limit(1).execute()
                print(f"✓ {table}: EXISTS")
            except Exception as e:
                if "Could not find" in str(e):
                    print(f"✗ {table}: MISSING")
                else:
                    print(f"✗ {table}: ERROR - {e}")
        
        # Check members table columns specifically
        print("\n=== CHECKING MEMBERS TABLE COLUMNS ===")
        try:
            response = supabase.table('members').select('*').limit(1).execute()
            if response.data:
                print("Current members table columns:")
                for key in response.data[0].keys():
                    print(f"  - {key}")
                
                # Check for specific required columns
                required_columns = ['name', 'status', 'membership_fee', 'closing_balance', 'share_value', 'date_joined']
                print(f"\nChecking required columns:")
                for col in required_columns:
                    if col in response.data[0]:
                        print(f"✓ {col}: EXISTS")
                    else:
                        print(f"✗ {col}: MISSING")
            else:
                print("No members found in table")
        except Exception as e:
            print(f"Error reading members table: {e}")
        
        # Check financial_years table structure
        print("\n=== CHECKING FINANCIAL_YEARS TABLE ===")
        try:
            response = supabase.table('financial_years').select('*').limit(1).execute()
            if response.data:
                print("Financial years table columns:")
                for key in response.data[0].keys():
                    print(f"  - {key}")
            else:
                print("No financial years found (table may be empty)")
        except Exception as e:
            print(f"Error reading financial_years table: {e}")
            
        return True
        
    except Exception as e:
        print(f"Error checking tables: {e}")
        return False

if __name__ == "__main__":
    print("Comprehensive Database Schema Check")
    print("=" * 50)
    check_all_tables()
