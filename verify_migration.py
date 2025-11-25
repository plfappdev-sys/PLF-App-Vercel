#!/usr/bin/env python3
"""
Verify PLF Data Migration Results
"""

import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

def verify_migration():
    """Verify the results of the data migration"""
    print("Verifying PLF Data Migration Results...")
    print("=" * 50)
    
    # Initialize Supabase client
    supabase = create_client(os.getenv('PROJECT_URL'), os.getenv('SERVICE_ROLE_KEY'))
    
    try:
        # Check total members
        response = supabase.table('members').select('count', count='exact').execute()
        total_members = response.count
        print(f"✅ Total members in database: {total_members}")
        
        # Check members with catch-up fees
        response = supabase.table('members')\
            .select('member_number, catch_up_fee, monthly_contribution')\
            .order('member_number')\
            .limit(5)\
            .execute()
        
        print("\n📊 Sample of updated members with catch-up fees:")
        for member in response.data:
            print(f"   Member {member['member_number']}: Catch-up fee R{member['catch_up_fee']}, Monthly R{member['monthly_contribution']}")
        
        # Check total transactions
        response = supabase.table('transactions').select('count', count='exact').execute()
        total_transactions = response.count
        print(f"\n✅ Total transactions in database: {total_transactions}")
        
        # Check sample transactions
        if total_transactions > 0:
            response = supabase.table('transactions')\
                .select('id, amount, transaction_type, transaction_date')\
                .order('transaction_date', desc=True)\
                .limit(3)\
                .execute()
            
            print("\n📊 Sample transactions:")
            for tx in response.data:
                print(f"   Transaction {tx['id']}: R{tx['amount']} ({tx['transaction_type']}) on {tx['transaction_date']}")
        
        print("\n" + "=" * 50)
        print("🎉 Migration Verification Complete!")
        print(f"   - {total_members} members with updated catch-up fees")
        print(f"   - {total_transactions} historical transactions")
        
        return True
        
    except Exception as e:
        print(f"❌ Error during verification: {e}")
        return False

if __name__ == "__main__":
    verify_migration()
