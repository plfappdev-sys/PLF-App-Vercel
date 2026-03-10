import os
from supabase import create_client, Client
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

def fix_lesego_data():
    """Fix Lesego Bokaba's data in database"""
    print("Fixing Lesego Bokaba's data...")
    
    try:
        # Initialize Supabase client
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Get Lesego Bokaba from database
        response = supabase.table('members').select('*').eq('member_number', 'M031').execute()
        
        if hasattr(response, 'data') and response.data:
            member = response.data[0]
            member_id = member['id']
            
            print(f"\n=== CURRENT DATA FOR LESEGO BOKABA (M031) ===")
            print(f"Member ID: {member_id}")
            print(f"outstanding_contributions: {member.get('outstanding_contributions')}")
            print(f"total_penalties: {member.get('total_penalties')}")
            
            # Calculate correct outstanding amount
            outstanding_contributions = member.get('outstanding_contributions', 0) or 0
            total_penalties = member.get('total_penalties', 0) or 0
            correct_outstanding_amount = outstanding_contributions + total_penalties
            
            print(f"\n=== CALCULATIONS ===")
            print(f"outstanding_contributions: {outstanding_contributions}")
            print(f"total_penalties: {total_penalties}")
            print(f"Correct outstanding_amount: {correct_outstanding_amount}")
            
            # Parse current financial_info
            financial_info = member.get('financial_info', {})
            if isinstance(financial_info, str):
                try:
                    financial_info = json.loads(financial_info)
                except:
                    financial_info = {}
            
            print(f"\n=== CURRENT financial_info ===")
            print(f"current_balance: {financial_info.get('current_balance')}")
            print(f"outstanding_amount: {financial_info.get('outstanding_amount')}")
            print(f"expected_contribution: {financial_info.get('expected_contribution')}")
            
            # Update financial_info with correct values
            updated_financial_info = financial_info.copy()
            updated_financial_info['outstanding_amount'] = correct_outstanding_amount
            
            # Fix expected contribution (should be 81 months * R200 = R16,200)
            # But Excel shows annual expected contribution of R2,400
            # Let's keep the annual expected contribution of R2,400
            # The total expected contribution of R16,600 seems to be for entire period
            
            print(f"\n=== UPDATING DATABASE ===")
            
            # Update the member record
            update_data = {
                'financial_info': updated_financial_info,
                # Also update direct columns if they exist
                'outstanding_amount': correct_outstanding_amount
            }
            
            update_response = supabase.table('members').update(update_data).eq('id', member_id).execute()
            
            if hasattr(update_response, 'data'):
                print("✅ Successfully updated member record")
                
                # Also update member_balances table if net_balance is positive
                # Positive net_balance means member owes money, should not be "good" standing
                balance_response = supabase.table('member_balances').select('*').eq('member_id', member_id).execute()
                
                if hasattr(balance_response, 'data') and balance_response.data:
                    balance = balance_response.data[0]
                    net_balance = balance.get('net_balance', 0)
                    
                    print(f"\n=== MEMBER_BALANCES ===")
                    print(f"Current net_balance: {net_balance}")
                    
                    if net_balance > 0:
                        print("⚠️  WARNING: net_balance is positive ({net_balance}), member owes money")
                        print("   This should NOT show as 'Good Standing' in the app")
                        
                        # The standing calculation is done in supabaseMemberService.ts
                        # It calculates standing based on net_balance
                        # Positive net_balance = owing money = not "good" standing
                        
            else:
                print("❌ Failed to update member record")
                
            # Test the fix by fetching updated data
            print(f"\n=== VERIFYING FIX ===")
            verify_response = supabase.table('members').select('*').eq('member_number', 'M031').execute()
            
            if hasattr(verify_response, 'data') and verify_response.data:
                updated_member = verify_response.data[0]
                updated_financial_info = updated_member.get('financial_info', {})
                if isinstance(updated_financial_info, str):
                    try:
                        updated_financial_info = json.loads(updated_financial_info)
                    except:
                        updated_financial_info = {}
                
                print(f"Updated outstanding_amount in financial_info: {updated_financial_info.get('outstanding_amount')}")
                print(f"Updated outstanding_amount column: {updated_member.get('outstanding_amount')}")
                
                # Check if values match
                expected_outstanding = outstanding_contributions + total_penalties
                actual_outstanding = updated_financial_info.get('outstanding_amount', 0)
                
                if abs(actual_outstanding - expected_outstanding) < 0.01:
                    print(f"✅ SUCCESS: outstanding_amount correctly set to {actual_outstanding}")
                else:
                    print(f"❌ FAILURE: outstanding_amount is {actual_outstanding}, expected {expected_outstanding}")
            
        else:
            print("Lesego Bokaba not found in database")
            
    except Exception as e:
        print(f"Error fixing Lesego Bokaba data: {e}")

def check_all_issues():
    """Check all the issues identified"""
    print("\n" + "="*80)
    print("ISSUE ANALYSIS")
    print("="*80)
    
    print("\n1. OUTSTANDING CONTRIBUTIONS AND PENALTIES SHOWING R 0.00")
    print("   - Database shows: outstanding_contributions = 2400.0")
    print("   - Database shows: total_penalties = 2250.82")
    print("   - These values ARE in the database, so why is app showing 0?")
    print("   - REASON: supabaseMemberService.ts uses memberData.outstanding_contributions")
    print("   - This should work if columns exist and have data")
    
    print("\n2. ACCOUNT STATUS SHOWING 'GOOD STANDING' INCORRECTLY")
    print("   - net_balance = 6220.82 (positive)")
    print("   - According to supabaseMemberService.ts line 324-345:")
    print("     - Positive net_balance = member owes money")
    print("     - Should NOT be 'good' standing")
    print("   - REASON: standingCategory in membership_status JSON is hardcoded to 'good'")
    print("   - FIX: Need to update membership_status based on net_balance")
    
    print("\n3. DASHBOARD DISCREPANCY")
    print("   - Oratile (superuser): Total Fund Contributions = R 924,648.98")
    print("   - Lesego (member): Total Fund Contributions = R 242,440.00")
    print("   - REASON: RLS policies or different calculation methods")
    print("   - Check getFundStatistics() method for role-based filtering")
    
    print("\n4. REMOVE UNWANTED FIELDS FROM MY FUNDS SCREEN")
    print("   - Need to remove 'Planned Contributions', 'Interest Earned', 'Interest Charged'")
    print("   - These are in MyFundsScreen.tsx positions 7-9")
    
    print("\n" + "="*80)
    print("RECOMMENDED FIXES")
    print("="*80)
    
    print("\n1. Update supabaseMemberService.ts to:")
    print("   - Use outstanding_contributions and total_penalties from database")
    print("   - Calculate standing based on net_balance (not hardcoded 'good')")
    
    print("\n2. Update MyFundsScreen.tsx to:")
    print("   - Remove unwanted fields (positions 7-9)")
    
    print("\n3. Check getFundStatistics() for:")
    print("   - Role-based data filtering")
    print("   - Consistent calculations for all users")

if __name__ == "__main__":
    fix_lesego_data()
    check_all_issues()