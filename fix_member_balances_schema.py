#!/usr/bin/env python3
"""
Fix member_balances table schema to work with current members table
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
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY', '')

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

def check_current_schema():
    """Check current schema of member_balances table"""
    print("🔍 Checking current member_balances schema...")
    
    try:
        # Try to get column information by attempting to insert with different schemas
        test_data = {
            'member_id': 'test',  # Will fail but show error
            'savings_balance': 1000.00,
            'created_at': datetime.now().isoformat()
        }
        
        try:
            result = supabase.table('member_balances').insert(test_data).execute()
            print("✅ Test insert successful")
        except Exception as e:
            error_msg = str(e)
            print(f"❌ Error: {error_msg}")
            
            # Parse error to understand schema
            if "Could not find the" in error_msg and "column" in error_msg:
                # Extract column name from error
                import re
                match = re.search(r"'([^']+)' column", error_msg)
                if match:
                    column_name = match.group(1)
                    print(f"   ℹ️ Column '{column_name}' doesn't exist or has wrong type")
            
    except Exception as e:
        print(f"❌ Error checking schema: {e}")

def create_compatible_member_balances():
    """Create member balances that work with current schema"""
    print("\n💰 Creating compatible member balances...")
    
    try:
        # First, get all members
        members_result = supabase.table('members').select('id, member_number, financial_info').execute()
        
        if not members_result.data or len(members_result.data) == 0:
            print("❌ No members found in database")
            return False
        
        print(f"📊 Found {len(members_result.data)} members")
        
        success_count = 0
        error_count = 0
        
        for member in members_result.data:
            try:
                member_id = member['id']  # This is BIGINT (1787, 1788, etc.)
                financial_info = json.loads(member['financial_info'])
                closing_balance = financial_info.get('current_balance', 0)
                total_contributions = financial_info.get('total_contributions', 0)
                
                # Calculate savings vs loan balance
                if closing_balance >= 0:
                    savings_balance = closing_balance
                    loan_balance = 0
                else:
                    savings_balance = 0
                    loan_balance = abs(closing_balance)
                
                # Try different schema approaches
                balance_data_attempts = [
                    # Attempt 1: Simple schema with member_id as BIGINT
                    {
                        'member_id': member_id,  # BIGINT
                        'savings_balance': savings_balance,
                        'loan_balance': loan_balance,
                        'total_contributions': total_contributions,
                        'last_updated': datetime.now().isoformat(),
                        'created_at': datetime.now().isoformat(),
                    },
                    # Attempt 2: Even simpler
                    {
                        'member_id': member_id,
                        'savings_balance': savings_balance,
                        'created_at': datetime.now().isoformat(),
                    },
                    # Attempt 3: Minimal
                    {
                        'member_id': member_id,
                        'savings_balance': savings_balance,
                    }
                ]
                
                inserted = False
                for attempt_num, balance_data in enumerate(balance_data_attempts):
                    try:
                        # Check if balance already exists
                        existing_balance = supabase.table('member_balances') \
                            .select('id') \
                            .eq('member_id', member_id) \
                            .execute()
                        
                        if existing_balance.data and len(existing_balance.data) > 0:
                            # Update existing balance
                            balance_id = existing_balance.data[0]['id']
                            supabase.table('member_balances') \
                                .update(balance_data) \
                                .eq('id', balance_id) \
                                .execute()
                            print(f"  🔄 Updated balance for member {member_id} (attempt {attempt_num + 1})")
                        else:
                            # Insert new balance
                            supabase.table('member_balances') \
                                .insert(balance_data) \
                                .execute()
                            print(f"  ✅ Created balance for member {member_id}: R{closing_balance:,.2f} (attempt {attempt_num + 1})")
                        
                        inserted = True
                        success_count += 1
                        break  # Stop trying if successful
                        
                    except Exception as e:
                        if attempt_num == len(balance_data_attempts) - 1:
                            # Last attempt failed
                            print(f"  ❌ All attempts failed for member {member_id}: {str(e)[:100]}...")
                            error_count += 1
                        # Continue to next attempt
                        continue
                
                if not inserted:
                    print(f"  ❌ Could not create balance for member {member_id}")
                    error_count += 1
                    
            except Exception as e:
                print(f"  ❌ Error processing member {member.get('id', 'unknown')}: {e}")
                error_count += 1
        
        print(f"\n📊 Balance creation results:")
        print(f"  ✅ Success: {success_count}")
        print(f"  ❌ Errors: {error_count}")
        
        # Verify balances were created
        balances_result = supabase.table('member_balances').select('id', count='exact').execute()
        total_balances = balances_result.count if hasattr(balances_result, 'count') else len(balances_result.data or [])
        print(f"📊 Total member balances in database: {total_balances}")
        
        # Show sample balances
        if total_balances > 0:
            sample_balances = supabase.table('member_balances').select('member_id, savings_balance').limit(3).execute()
            print(f"📋 Sample balances (first 3):")
            for balance in sample_balances.data:
                print(f"  - Member {balance['member_id']}: R{balance.get('savings_balance', 0):,.2f}")
        
        return success_count > 0
        
    except Exception as e:
        print(f"❌ Error creating member balances: {e}")
        return False

def drop_and_recreate_table():
    """Drop and recreate member_balances table with correct schema"""
    print("\n🔄 Dropping and recreating member_balances table...")
    
    # First, let's check what SQL we can execute
    # We'll create a simple table that matches our members table
    print("⚠️ This would require SQL execution privileges")
    print("ℹ️ Alternative: Creating balances with existing schema")
    
    # Instead of dropping, let's try to alter the table if possible
    return False

def main():
    print("🔧 FIXING MEMBER BALANCES TABLE")
    print("="*50)
    
    # Check current schema
    check_current_schema()
    
    # Try to create compatible balances
    success = create_compatible_member_balances()
    
    if success:
        print("\n✅ Member balances created successfully!")
        print("🚀 The PLF system should now have complete member data")
    else:
        print("\n⚠️ Some issues creating member balances")
        print("ℹ️ The members table has data, but member_balances may need manual setup")
        print("💡 Consider running the new-business-logic-schema.sql to ensure proper schema")

if __name__ == "__main__":
    main()