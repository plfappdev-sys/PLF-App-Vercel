#!/usr/bin/env python3
"""
Create simple member balances with only existing columns
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

def create_simple_member_balances():
    print("💰 Creating simple member balances...")
    
    try:
        # First, get all members
        members_result = supabase.table('members').select('id, financial_info').execute()
        
        if not members_result.data or len(members_result.data) == 0:
            print("❌ No members found in database")
            return False
        
        print(f"📊 Found {len(members_result.data)} members")
        
        success_count = 0
        error_count = 0
        
        for member in members_result.data:
            try:
                member_id = member['id']
                financial_info = json.loads(member['financial_info'])
                closing_balance = financial_info.get('current_balance', 0)
                total_contributions = financial_info.get('total_contributions', 0)
                
                # Calculate outstanding amount
                outstanding_amount = abs(closing_balance) if closing_balance < 0 else 0
                
                # Prepare SIMPLE balance data with only basic columns
                # Based on the error, we know 'interest_charged' doesn't exist
                # Let's try with minimal columns
                balance_data = {
                    'member_id': member_id,
                    'savings_balance': max(closing_balance, 0),  # Positive balance
                    'loan_balance': abs(closing_balance) if closing_balance < 0 else 0,
                    'total_contributions': total_contributions,
                    'outstanding_amount': outstanding_amount,
                    'last_updated': datetime.now().isoformat(),
                    'created_at': datetime.now().isoformat(),
                }
                
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
                    print(f"  🔄 Updated balance for member {member_id}")
                else:
                    # Insert new balance
                    supabase.table('member_balances') \
                        .insert(balance_data) \
                        .execute()
                    print(f"  ✅ Created balance for member {member_id}: R{closing_balance:,.2f}")
                
                success_count += 1
                
            except Exception as e:
                print(f"  ❌ Error creating balance for member {member.get('id', 'unknown')}: {e}")
                error_count += 1
        
        print(f"\n📊 Balance creation results:")
        print(f"  ✅ Success: {success_count}")
        print(f"  ❌ Errors: {error_count}")
        
        # Verify balances were created
        balances_result = supabase.table('member_balances').select('id', count='exact').execute()
        total_balances = balances_result.count if hasattr(balances_result, 'count') else len(balances_result.data or [])
        print(f"📊 Total member balances in database: {total_balances}")
        
        return success_count > 0
        
    except Exception as e:
        print(f"❌ Error creating member balances: {e}")
        return False

if __name__ == "__main__":
    create_simple_member_balances()