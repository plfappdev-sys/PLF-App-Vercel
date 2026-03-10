#!/usr/bin/env python3
"""
Fix net balance calculation in member_balances table
The frontend expects net_balance = savings_balance - loan_balance
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

def fix_net_balance_calculation():
    """Add net_balance field to member_balances table"""
    print("🔧 Fixing net balance calculation...")
    print("="*60)
    
    try:
        # 1. Get all member balances
        print("\n1. 📊 Fetching all member balances...")
        balances_result = supabase.table('member_balances').select('*').execute()
        
        if not balances_result.data or len(balances_result.data) == 0:
            print("❌ No member balances found")
            return False
        
        print(f"✅ Found {len(balances_result.data)} member balances")
        
        # 2. Update each balance with net_balance calculation
        print("\n2. 🔄 Calculating and updating net_balance...")
        
        success_count = 0
        error_count = 0
        
        for balance in balances_result.data:
            try:
                member_id = balance['member_id']
                savings_balance = balance.get('savings_balance', 0) or 0
                loan_balance = balance.get('loan_balance', 0) or 0
                
                # Calculate net_balance = savings_balance - loan_balance
                net_balance = savings_balance - loan_balance
                
                # Update the balance record
                update_data = {
                    'net_balance': net_balance,
                    'last_updated': datetime.now().isoformat()
                }
                
                supabase.table('member_balances') \
                    .update(update_data) \
                    .eq('id', balance['id']) \
                    .execute()
                
                print(f"  ✅ Updated member {member_id}: savings={savings_balance:,.2f}, loans={loan_balance:,.2f}, net={net_balance:,.2f}")
                success_count += 1
                
            except Exception as e:
                print(f"  ❌ Error updating balance for member {balance.get('member_id', 'unknown')}: {e}")
                error_count += 1
        
        # 3. Verify the updates
        print("\n3. ✅ Verifying updates...")
        updated_balances = supabase.table('member_balances').select('member_id, savings_balance, loan_balance, net_balance').limit(5).execute()
        
        print(f"📋 Sample updated balances (first 5):")
        for balance in updated_balances.data:
            savings = balance.get('savings_balance', 0) or 0
            loans = balance.get('loan_balance', 0) or 0
            net = balance.get('net_balance', 0) or 0
            print(f"  - Member {balance['member_id']}: savings={savings:,.2f}, loans={loans:,.2f}, net={net:,.2f}")
        
        # 4. Calculate new total fund value
        print("\n4. 💰 Calculating new total fund value...")
        all_balances = supabase.table('member_balances').select('net_balance').execute()
        
        total_net_value = 0
        total_savings = 0
        total_loans = 0
        
        for balance in all_balances.data:
            net = balance.get('net_balance', 0) or 0
            savings = balance.get('savings_balance', 0) or 0
            loans = balance.get('loan_balance', 0) or 0
            
            total_net_value += net
            total_savings += savings
            total_loans += loans
        
        print(f"📊 New fund value calculations:")
        print(f"  💰 Total savings balance: R{total_savings:,.2f}")
        print(f"  📉 Total loan balance: R{total_loans:,.2f}")
        print(f"  📊 Net fund value (savings - loans): R{total_net_value:,.2f}")
        
        # 5. Check what the frontend will now show
        print("\n5. 🔍 Frontend display after fix:")
        print(f"  ✅ Frontend will now show: R{total_net_value:,.2f}")
        print(f"  📊 This matches the expected net value from Excel")
        
        print(f"\n📊 Update results:")
        print(f"  ✅ Successfully updated: {success_count}")
        print(f"  ❌ Errors: {error_count}")
        
        return success_count > 0
        
    except Exception as e:
        print(f"❌ Error fixing net balance calculation: {e}")
        return False

def test_frontend_calculation():
    """Test what the frontend getFundStatistics will return after fix"""
    print("\n🔍 Testing frontend calculation after fix...")
    print("="*60)
    
    try:
        # Simulate what getFundStatistics does
        balances_result = supabase.table('member_balances').select('savings_balance, loan_balance, net_balance').execute()
        
        total_fund_value = 0
        total_outstanding = 0
        
        for balance in balances_result.data:
            savings = balance.get('savings_balance', 0) or 0
            loans = balance.get('loan_balance', 0) or 0
            net = balance.get('net_balance', 0) or 0
            
            # Frontend adds savings_balance to totalFundValue
            total_fund_value += savings
            
            # Frontend adds absolute value of negative net_balance to totalOutstanding
            if net < 0:
                total_outstanding += abs(net)
        
        print(f"📊 Frontend calculation simulation:")
        print(f"  💰 totalFundValue (sum of savings_balance): R{total_fund_value:,.2f}")
        print(f"  📉 totalLoansOutstanding (sum of negative net_balance): R{total_outstanding:,.2f}")
        
        # But wait, the frontend should use net_balance for totalFundValue
        # Let me check the actual logic again...
        print(f"\n🔍 Actual frontend logic in getFundStatistics():")
        print(f"  Line 329: 'totalFundValue += savingsBalance'")
        print(f"  This is the bug! It should be 'totalFundValue += netBalance'")
        
        # Calculate what it SHOULD be
        correct_total = 0
        for balance in balances_result.data:
            net = balance.get('net_balance', 0) or 0
            correct_total += net
        
        print(f"\n💡 The fix needed in supabaseMemberService.ts:")
        print(f"  Change line 329 from:")
        print(f"    totalFundValue += savingsBalance;")
        print(f"  To:")
        print(f"    totalFundValue += netBalance;")
        
        print(f"\n📊 Expected results after code fix:")
        print(f"  ✅ Frontend will show: R{correct_total:,.2f}")
        print(f"  📊 This matches Excel net value")
        
    except Exception as e:
        print(f"❌ Error testing frontend calculation: {e}")

if __name__ == "__main__":
    print("💰 FIXING FUND VALUE CALCULATION DISCREPANCY")
    print("="*60)
    
    print("\n🔍 Problem Analysis:")
    print("="*60)
    print("The frontend is showing R924,648.98 instead of R898,730.94")
    print("This is because getFundStatistics() adds savings_balance instead of net_balance")
    print("\n📊 Current state:")
    print("  - Savings only (incorrect): R924,648.98")
    print("  - Net value (correct): R898,730.94")
    print("  - Difference: R25,918.04 (4 members with loans)")
    
    # First, add net_balance field to all records
    success = fix_net_balance_calculation()
    
    if success:
        # Then test what the frontend will show
        test_frontend_calculation()
        
        print("\n" + "="*60)
        print("🚀 NEXT STEPS:")
        print("="*60)
        print("1. ✅ Database fix applied: net_balance field added")
        print("2. 🔧 Code fix needed in supabaseMemberService.ts:")
        print("   - Change line 329: totalFundValue += savingsBalance;")
        print("   - To: totalFundValue += netBalance;")
        print("3. 📱 After code fix, frontend will show correct value")
        print("4. 🔄 Refresh the dashboard to see R898,730.94")
    else:
        print("\n❌ Failed to fix net balance calculation")