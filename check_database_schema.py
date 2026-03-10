#!/usr/bin/env python3
"""
Check database schema
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

def check_schema():
    print("🔍 Checking database schema...")
    
    # Check members table
    print("\n📋 Checking 'members' table...")
    try:
        # Try to get one row to see columns
        result = supabase.table('members').select('*').limit(1).execute()
        if result.data and len(result.data) > 0:
            print("✅ 'members' table exists")
            print("📊 Columns in 'members' table:")
            for key in result.data[0].keys():
                print(f"  - {key}")
        else:
            print("⚠️ 'members' table exists but has no data")
            
            # Try to get column info by attempting to insert minimal data
            test_data = {
                'member_number': 'TEST001',
                'name': 'Test Member',
                'join_date': '2024-01-01',
                'membership_status': 'active',
                'email': 'test@example.com',
            }
            
            try:
                insert_result = supabase.table('members').insert(test_data).execute()
                print("✅ Successfully inserted test data")
                
                # Now get the inserted row
                get_result = supabase.table('members').select('*').eq('member_number', 'TEST001').execute()
                if get_result.data:
                    print("📊 Columns in 'members' table:")
                    for key in get_result.data[0].keys():
                        print(f"  - {key}")
                    
                    # Clean up test data
                    supabase.table('members').delete().eq('member_number', 'TEST001').execute()
                    print("✅ Cleaned up test data")
            except Exception as e:
                print(f"❌ Error inserting test data: {e}")
                
    except Exception as e:
        print(f"❌ Error checking 'members' table: {e}")
    
    # Check users table
    print("\n📋 Checking 'users' table...")
    try:
        result = supabase.table('users').select('*').limit(1).execute()
        if result.data and len(result.data) > 0:
            print("✅ 'users' table exists")
            print("📊 Columns in 'users' table:")
            for key in result.data[0].keys():
                print(f"  - {key}")
        else:
            print("⚠️ 'users' table exists but has no data")
    except Exception as e:
        print(f"❌ Error checking 'users' table: {e}")
    
    # Check member_balances table
    print("\n📋 Checking 'member_balances' table...")
    try:
        result = supabase.table('member_balances').select('*').limit(1).execute()
        if result.data and len(result.data) > 0:
            print("✅ 'member_balances' table exists")
            print("📊 Columns in 'member_balances' table:")
            for key in result.data[0].keys():
                print(f"  - {key}")
        else:
            print("⚠️ 'member_balances' table exists but has no data")
    except Exception as e:
        print(f"❌ Error checking 'member_balances' table: {e}")
    
    # Check all tables
    print("\n📋 Checking all tables...")
    try:
        # Try to get information about tables
        # Note: This is a simple approach - Supabase doesn't have a direct way to list tables
        # We'll try to query common tables
        tables_to_check = ['members', 'users', 'member_balances', 'transactions', 'loans', 'financial_years', 'settings']
        
        for table in tables_to_check:
            try:
                result = supabase.table(table).select('id').limit(1).execute()
                print(f"✅ Table '{table}' exists")
            except Exception as e:
                if 'relation' in str(e).lower() or 'does not exist' in str(e).lower():
                    print(f"❌ Table '{table}' does not exist")
                else:
                    print(f"⚠️ Error checking table '{table}': {e}")
    except Exception as e:
        print(f"❌ Error checking tables: {e}")

if __name__ == "__main__":
    check_schema()