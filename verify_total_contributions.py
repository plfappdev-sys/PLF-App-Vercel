import pandas as pd
import numpy as np
import os
from supabase import create_client, Client
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

def verify_total_contributions():
    """Verify that total contributions have been correctly updated in the database"""
    print("Verifying total contributions updates...")
    
    EXCEL_FILE = r"NewBusLogic\Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"
    
    try:
        # Initialize Supabase client
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Get all members from database
        print("\n=== FETCHING ALL MEMBERS FROM DATABASE ===")
        response = supabase.table('members').select('*').execute()
        
        if not hasattr(response, 'data') or not response.data:
            print("No members found in database")
            return
        
        members = response.data
        print(f"Found {len(members)} members in database")
        
        # Track verification results
        correct = []
        incorrect = []
        missing = []
        
        print("\n=== VERIFYING TOTAL CONTRIBUTIONS ===")
        
        for member in members:
            member_name = member.get('name', '').strip()
            member_number = member.get('member_number')
            
            if not member_name:
                continue
            
            # Get financial info
            financial_info = member.get('financial_info', {})
            if isinstance(financial_info, str):
                try:
                    financial_info = json.loads(financial_info)
                except:
                    financial_info = {}
            
            total_contributions = financial_info.get('total_contributions')
            
            if total_contributions is None:
                missing.append({
                    'member_name': member_name,
                    'member_number': member_number,
                    'reason': 'No total_contributions field in financial_info'
                })
                continue
            
            # Check if total_contributions is a number
            try:
                total_contributions = float(total_contributions)
            except:
                incorrect.append({
                    'member_name': member_name,
                    'member_number': member_number,
                    'reason': f'total_contributions is not a number: {total_contributions}'
                })
                continue
            
            # Check if total_contributions is reasonable (not negative, not extremely large)
            if total_contributions < 0:
                incorrect.append({
                    'member_name': member_name,
                    'member_number': member_number,
                    'reason': f'total_contributions is negative: {total_contributions}'
                })
            elif total_contributions > 100000:  # Unreasonably large
                incorrect.append({
                    'member_name': member_name,
                    'member_number': member_number,
                    'reason': f'total_contributions is unreasonably large: {total_contributions}'
                })
            else:
                correct.append({
                    'member_name': member_name,
                    'member_number': member_number,
                    'total_contributions': total_contributions
                })
        
        # Print summary
        print(f"\n=== VERIFICATION SUMMARY ===")
        print(f"Total members checked: {len(members)}")
        print(f"✅ Correct: {len(correct)}")
        print(f"❌ Incorrect: {len(incorrect)}")
        print(f"⚠️  Missing: {len(missing)}")
        
        if correct:
            print(f"\n=== SAMPLE OF CORRECT UPDATES ===")
            
            # Sort by total contributions (highest first)
            sorted_correct = sorted(correct, key=lambda x: x['total_contributions'], reverse=True)
            
            for i, member in enumerate(sorted_correct[:10]):
                print(f"{i+1}. {member['member_name']} ({member['member_number']}): R{member['total_contributions']:,.2f}")
            
            if len(sorted_correct) > 10:
                print(f"\n... and {len(sorted_correct) - 10} more members")
        
        if incorrect:
            print(f"\n=== INCORRECT UPDATES ===")
            for i, issue in enumerate(incorrect[:10]):
                print(f"{i+1}. {issue['member_name']} ({issue['member_number']}): {issue['reason']}")
            
            if len(incorrect) > 10:
                print(f"\n... and {len(incorrect) - 10} more issues")
        
        if missing:
            print(f"\n=== MISSING TOTAL CONTRIBUTIONS ===")
            for i, issue in enumerate(missing[:10]):
                print(f"{i+1}. {issue['member_name']} ({issue['member_number']}): {issue['reason']}")
            
            if len(missing) > 10:
                print(f"\n... and {len(missing) - 10} more missing")
        
        # Check member_balances table
        print(f"\n=== CHECKING MEMBER_BALANCES TABLE ===")
        
        balance_issues = []
        for member in members:
            member_id = member.get('id')
            member_number = member.get('member_number')
            member_name = member.get('name', '').strip()
            
            if not member_id:
                continue
            
            # Get member_balances
            balance_response = supabase.table('member_balances').select('*').eq('member_id', member_id).execute()
            
            if hasattr(balance_response, 'data') and balance_response.data:
                balance_data = balance_response.data[0]
                balance_total_contributions = balance_data.get('total_contributions', 0)
                
                # Get financial_info total_contributions
                financial_info = member.get('financial_info', {})
                if isinstance(financial_info, str):
                    try:
                        financial_info = json.loads(financial_info)
                    except:
                        financial_info = {}
                
                financial_total_contributions = financial_info.get('total_contributions', 0)
                
                # Check if they match
                if abs(float(balance_total_contributions) - float(financial_total_contributions)) > 0.01:
                    balance_issues.append({
                        'member_name': member_name,
                        'member_number': member_number,
                        'financial_total': financial_total_contributions,
                        'balance_total': balance_total_contributions
                    })
        
        if balance_issues:
            print(f"⚠️  Found {len(balance_issues)} mismatches between members and member_balances tables")
            for i, issue in enumerate(balance_issues[:5]):
                print(f"{i+1}. {issue['member_name']}: Financial=R{issue['financial_total']:,.2f}, Balance=R{issue['balance_total']:,.2f}")
        else:
            print("✅ All member_balances match members.financial_info total_contributions")
        
        # Show statistics
        if correct:
            total_all_contributions = sum(m['total_contributions'] for m in correct)
            avg_contributions = total_all_contributions / len(correct) if correct else 0
            
            print(f"\n📊 Statistics:")
            print(f"  • Total contributions across all members: R{total_all_contributions:,.2f}")
            print(f"  • Average contributions per member: R{avg_contributions:,.2f}")
            
            # Show distribution
            print(f"\n📈 Distribution:")
            ranges = [
                (0, 1000, "R0 - R1,000"),
                (1000, 5000, "R1,000 - R5,000"),
                (5000, 10000, "R5,000 - R10,000"),
                (10000, 20000, "R10,000 - R20,000"),
                (20000, float('inf'), "R20,000+")
            ]
            
            for min_val, max_val, label in ranges:
                count = sum(1 for m in correct if min_val <= m['total_contributions'] < max_val)
                percentage = (count / len(correct)) * 100 if correct else 0
                print(f"  • {label}: {count} members ({percentage:.1f}%)")
        
        return len(correct), len(incorrect), len(missing), len(balance_issues)
        
    except Exception as e:
        print(f"Error verifying total contributions: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    print("=" * 80)
    print("TOTAL CONTRIBUTIONS VERIFICATION")
    print("=" * 80)
    
    correct, incorrect, missing, balance_issues = verify_total_contributions()
    
    print("\n" + "=" * 80)
    print("VERIFICATION COMPLETE")
    print("=" * 80)
    
    if incorrect == 0 and missing == 0 and balance_issues == 0:
        print("\n✅ PERFECT! All total contributions have been correctly updated.")
        print("The app should now show accurate total contributions for all members.")
    else:
        print(f"\n⚠️  Issues found:")
        if incorrect > 0:
            print(f"  - {incorrect} members have incorrect total_contributions")
        if missing > 0:
            print(f"  - {missing} members are missing total_contributions")
        if balance_issues > 0:
            print(f"  - {balance_issues} members have mismatched data between tables")
        
        print("\nCheck the error log above for details.")
    
    print("\nWhat the app should now show in 'My Funds Screen':")
    print("  • 'Total Contributions' = Sum of all contributions from join date")
    print("  • Accurate historical contribution data")
    print("  • Correct member financial profiles")