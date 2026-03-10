#!/usr/bin/env python3
"""
Check member_balances table schema
"""

import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://zdnyhzasvifrskbostgn.supabase.co')
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY', '')

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

def check_member_balances_schema():
    print("🔍 Checking member_balances table schema...")
    
    try:
        # Try to get a sample row to see what columns exist
        result = supabase.table('member_balances').select('*').limit(1).execute()
        
        if result.data and len(result.data) > 0:
            print("📊 Existing columns in member_balances table:")
            for key in result.data[0].keys():
                print(f"  - {key}")
        else:
            print("📊 No data in member_balances table, checking schema...")
            # Try to insert a test row to see what columns are required
            try:
                test_data = {
                    'member_id': '00000000-0000-0000-0000-000000000000',
                    'savings_balance': 0,
                    'loan_balance': 0,
                    'total_contributions': 0,
                    'outstanding_amount': 0,
                    'interest_earned': 0,
                    'interest_charged': 0,
                    'last_updated': '2024-01-01T00:00:00Z',
                    'created_at': '2024-01-01T00:00:00Z'
                }
                test_result = supabase.table('member_balances').insert(test_data).execute()
                print("✅ Test insert successful")
                print("📊 Columns that were accepted:")
                for key in test_data.keys():
                    print(f"  - {key}")
                
                # Clean up test data
                if test_result.data and len(test_result.data) > 0:
                    test_id = test_result.data[0]['id']
                    supabase.table('member_balances').delete().eq('id', test_id).execute()
                    print("✅ Test data cleaned up")
                    
            except Exception as e:
                print(f"❌ Error testing schema: {e}")
                
    except Exception as e:
        print(f"❌ Error checking member_balances schema: {e}")

if __name__ == "__main__":
    check_member_balances_schema()