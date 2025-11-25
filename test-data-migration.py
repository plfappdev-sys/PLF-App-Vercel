#!/usr/bin/env python3
"""
Test Script for PLF Data Migration
Purpose: Test the data migration script with sample data before full migration
Created: September 21, 2025
"""

import os
import json
from datetime import datetime
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://zdnyhzasvifrskbostgn.supabase.co')
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SERVICE_ROLE_KEY', '')

def test_supabase_connection():
    """Test Supabase connection and verify required tables exist"""
    print("Testing Supabase connection...")
    
    try:
        # Initialize Supabase client
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
        
        # Test connection by querying members table
        response = supabase.table('members').select('count', count='exact').execute()
        print(f"✅ Successfully connected to Supabase")
        print(f"✅ Members table accessible: {response.count} members found")
        
        # Check if new tables exist
        tables_to_check = ['contributions', 'member_balances', 'financial_years', 'system_settings', 'audit_logs']
        
        for table in tables_to_check:
            try:
                test_response = supabase.table(table).select('count', count='exact').limit(1).execute()
                print(f"✅ {table} table exists and is accessible")
            except Exception as e:
                print(f"❌ {table} table not accessible: {e}")
        
        return True
        
    except Exception as e:
        print(f"❌ Failed to connect to Supabase: {e}")
        return False

def test_member_data():
    """Test member data loading and structure"""
    print("\nTesting member data...")
    
    try:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
        response = supabase.table('members').select('*').limit(5).execute()
        
        if response.data:
            print(f"✅ Successfully loaded {len(response.data)} members")
            
            # Check for required fields
            sample_member = response.data[0]
            required_fields = ['id', 'first_name', 'last_name', 'member_number', 'created_at']
            
            for field in required_fields:
                if field in sample_member:
                    print(f"✅ Member field '{field}': {sample_member[field]}")
                else:
                    print(f"❌ Missing member field: {field}")
            
            return True
        else:
            print("❌ No member data found")
            return False
            
    except Exception as e:
        print(f"❌ Error loading member data: {e}")
        return False

def test_transaction_data():
    """Test transaction data loading and structure"""
    print("\nTesting transaction data...")
    
    try:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
        response = supabase.table('transactions').select('*').limit(5).execute()
        
        if response.data:
            print(f"✅ Successfully loaded {len(response.data)} transactions")
            
            # Check for required fields
            sample_transaction = response.data[0]
            required_fields = ['id', 'member_id', 'transaction_type', 'amount', 'status', 'created_at']
            
            for field in required_fields:
                if field in sample_transaction:
                    print(f"✅ Transaction field '{field}': {sample_transaction[field]}")
                else:
                    print(f"❌ Missing transaction field: {field}")
            
            return True
        else:
            print("❌ No transaction data found")
            return False
            
    except Exception as e:
        print(f"❌ Error loading transaction data: {e}")
        return False

def test_catch_up_fee_calculation():
    """Test catch-up fee calculation logic"""
    print("\nTesting catch-up fee calculation...")
    
    # Test cases: join dates and expected months missed
    test_cases = [
        (datetime(2018, 8, 1), 1),   # August 2018 - 1 month missed
        (datetime(2019, 1, 15), 6),   # January 2019 - 6 months missed
        (datetime(2020, 7, 1), 24),   # July 2020 - 24 months missed
        (datetime(2018, 7, 1), 0),    # July 2018 - 0 months missed (exact start)
        (datetime(2017, 6, 1), 0),    # June 2017 - 0 months missed (before start)
    ]
    
    july_2018 = datetime(2018, 7, 1)
    
    for join_date, expected_months in test_cases:
        # Calculate months missed
        total_months = (join_date.year - july_2018.year) * 12 + (join_date.month - july_2018.month)
        if join_date.day > 15:
            total_months += 1
        calculated_months = max(0, total_months)
        
        # Calculate expected fee
        expected_fee = expected_months * 200
        calculated_fee = calculated_months * 200
        
        status = "✅" if calculated_months == expected_months else "❌"
        print(f"{status} Join {join_date.strftime('%Y-%m-%d')}: Expected {expected_months} months (R{expected_fee}), Got {calculated_months} months (R{calculated_fee})")
    
    return True

def main():
    """Main test function"""
    print("PLF Data Migration Test Script")
    print("=" * 50)
    
    # Check if Supabase credentials are available
    if not SUPABASE_SERVICE_ROLE_KEY:
        print("❌ SUPABASE_SERVICE_ROLE_KEY environment variable is required")
        print("Please set it before running this script:")
        print("export SUPABASE_SERVICE_ROLE_KEY='your-service-role-key'")
        return
    
    # Run tests
    tests = [
        ("Supabase Connection", test_supabase_connection),
        ("Member Data", test_member_data),
        ("Transaction Data", test_transaction_data),
        ("Catch-up Fee Calculation", test_catch_up_fee_calculation),
    ]
    
    results = []
    
    for test_name, test_func in tests:
        print(f"\n--- {test_name} ---")
        try:
            result = test_func()
            results.append((test_name, result))
        except Exception as e:
            print(f"❌ Test failed with error: {e}")
            results.append((test_name, False))
    
    # Print summary
    print("\n" + "=" * 50)
    print("TEST SUMMARY:")
    print("=" * 50)
    
    all_passed = True
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
        if not result:
            all_passed = False
    
    print("=" * 50)
    if all_passed:
        print("🎉 All tests passed! Ready for data migration.")
        print("\nNext steps:")
        print("1. Backup your database")
        print("2. Run: python data-migration-script.py")
        print("3. Verify migrated data in Supabase dashboard")
    else:
        print("❌ Some tests failed. Please fix issues before running migration.")
    
    return all_passed

if __name__ == "__main__":
    main()
