#!/usr/bin/env python3
"""
Script to check current database schema and identify missing columns
"""

import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://zdnyhzasvifrskbostgn.supabase.co')
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SERVICE_ROLE_KEY', '')

def check_database_schema():
    """Check the current database schema and identify missing columns"""
    print("Checking database schema...")
    
    try:
        # Initialize Supabase client
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
        
        # Check members table structure
        print("\n=== MEMBERS TABLE STRUCTURE ===")
        try:
            response = supabase.table('members').select('*').limit(1).execute()
            if response.data:
                print("Columns in members table:")
                for key in response.data[0].keys():
                    print(f"  - {key}")
            else:
                print("No members found in table")
        except Exception as e:
            print(f"Error reading members table: {e}")
        
        # Check if specific columns exist by trying to query them
        print("\n=== CHECKING FOR SPECIFIC COLUMNS ===")
        columns_to_check = [
            'date_joined', 'membership_fee', 'monthly_contribution', 
            'catch_up_fee', 'closing_balance', 'share_value'
        ]
        
        for column in columns_to_check:
            try:
                # Try to query the column
                response = supabase.table('members').select(column).limit(1).execute()
                print(f"✓ {column}: EXISTS")
            except Exception as e:
                if "Could not find" in str(e):
                    print(f"✗ {column}: MISSING")
                else:
                    print(f"✗ {column}: ERROR - {e}")
        
        # Check Excel file structure for comparison
        print("\n=== EXCEL FILE STRUCTURE (2024-2025 sheet) ===")
        import pandas as pd
        excel_file = "NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025.xlsx"
        
        try:
            df = pd.read_excel(excel_file, sheet_name='2024-2025', nrows=1)
            print("Columns in Excel file:")
            for col in df.columns:
                print(f"  - {col}")
        except Exception as e:
            print(f"Error reading Excel file: {e}")
            
        return True
        
    except Exception as e:
        print(f"Error checking database schema: {e}")
        return False

if __name__ == "__main__":
    print("Database Schema Analysis")
    print("=" * 50)
    check_database_schema()
