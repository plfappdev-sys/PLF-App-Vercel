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

def verify_fix_completion():
    """Verify that the fix has been successfully applied"""
    print("Verifying fix completion...")
    
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
        
        # Read Excel file
        print("\n=== READING EXCEL FILE (2024-2025 SHEET) ===")
        df = pd.read_excel(EXCEL_FILE, sheet_name='2024-2025', header=None)
        
        # Find header row
        header_row = None
        for i in range(min(10, len(df))):
            if pd.notna(df.iloc[i, 0]) and 'Member' in str(df.iloc[i, 0]):
                header_row = i
                break
        
        if header_row is None:
            print("Could not find header row in Excel")
            return
        
        # Create a mapping of member names to their closing balances
        excel_closing_balances = {}
        
        for idx, row in df.iterrows():
            if idx <= header_row:
                continue
                
            member_name = str(row.iloc[0]).strip() if pd.notna(row.iloc[0]) else ""
            if not member_name:
                continue
                
            # Get closing balance from Column I (index 8)
            if len(row) > 8 and pd.notna(row.iloc[8]):
                closing_balance = float(row.iloc[8])
                excel_closing_balances[member_name] = closing_balance
        
        print(f"Extracted {len(excel_closing_balances)} closing balances from Excel")
        
        # Track verification results
        correct = []
        incorrect = []
        
        print("\n=== VERIFYING FIX ===")
        
        for member in members:
            member_name = member.get('name', '').strip()
            member_number = member.get('member_number')
            
            if not member_name:
                continue
                
            # Find in Excel
            excel_balance = None
            for excel_name, balance in excel_closing_balances.items():
                if member_name.lower() in excel_name.lower() or excel_name.lower() in member_name.lower():
                    excel_balance = balance
                    break
            
            if excel_balance is None:
                incorrect.append({
                    'member_name': member_name,
                    'member_number': member_number,
                    'reason': 'Not found in Excel'
                })
                continue
            
            # Get current financial info
            financial_info = member.get('financial_info', {})
            if isinstance(financial_info, str):
                try:
                    financial_info = json.loads(financial_info)
                except:
                    financial_info = {}
            
            current_balance = financial_info.get('current_balance', 0)
            outstanding_amount = financial_info.get('outstanding_amount', 0)
            
            # Check if fix is correct
            is_correct = False
            
            if excel_balance > 0:
                # Should have positive current_balance
                if abs(current_balance - excel_balance) < 0.01 and abs(outstanding_amount - excel_balance) < 0.01:
                    is_correct = True
            elif excel_balance < 0:
                # Should have 0 current_balance
                if abs(current_balance) < 0.01 and abs(outstanding_amount) < 0.01:
                    is_correct = True
            else:
                # Should have 0 current_balance
                if abs(current_balance) < 0.01 and abs(outstanding_amount) < 0.01:
                    is_correct = True
            
            if is_correct:
                correct.append({
                    'member_name': member_name,
                    'member_number': member_number,
                    'excel_balance': excel_balance,
                    'current_balance': current_balance,
                    'outstanding_amount': outstanding_amount
                })
            else:
                incorrect.append({
                    'member_name': member_name,
                    'member_number': member_number,
                    'excel_balance': excel_balance,
                    'current_balance': current_balance,
                    'outstanding_amount': outstanding_amount,
                    'reason': f'Balance mismatch: Excel={excel_balance}, Current={current_balance}, Outstanding={outstanding_amount}'
                })
        
        # Print summary
        print(f"\n=== VERIFICATION SUMMARY ===")
        print(f"Total members checked: {len(members)}")
        print(f"✅ Correctly fixed: {len(correct)}")
        print(f"❌ Incorrect: {len(incorrect)}")
        
        if len(correct) == len(members):
            print("\n🎉 SUCCESS: ALL MEMBERS HAVE BEEN CORRECTLY FIXED!")
        else:
            print(f"\n⚠️  WARNING: {len(incorrect)} members still have issues")
        
        # Show sample of correct fixes
        if correct:
            print(f"\n=== SAMPLE OF CORRECT FIXES ===")
            for i, fix in enumerate(correct[:5]):
                if fix['excel_balance'] > 0:
                    print(f"{i+1}. {fix['member_name']} ({fix['member_number']}): Excel=R{fix['excel_balance']:,.2f}, Current=R{fix['current_balance']:,.2f} ✓")
                else:
                    print(f"{i+1}. {fix['member_name']} ({fix['member_number']}): Excel=R{fix['excel_balance']:,.2f} (credit), Current=R{fix['current_balance']:,.2f} ✓")
        
        # Show incorrect fixes if any
        if incorrect:
            print(f"\n=== INCORRECT FIXES ===")
            for i, issue in enumerate(incorrect[:10]):
                print(f"{i+1}. {issue['member_name']} ({issue['member_number']}): {issue['reason']}")
            
            if len(incorrect) > 10:
                print(f"\n... and {len(incorrect) - 10} more issues")
        
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
                savings_balance = balance_data.get('savings_balance', 0)
                net_balance = balance_data.get('net_balance', 0)
                
                # Find Excel balance
                excel_balance = None
                for excel_name, balance in excel_closing_balances.items():
                    if member_name.lower() in excel_name.lower() or excel_name.lower() in member_name.lower():
                        excel_balance = balance
                        break
                
                if excel_balance is not None:
                    # Check if net_balance matches Excel
                    if abs(net_balance - excel_balance) > 0.01:
                        balance_issues.append({
                            'member_name': member_name,
                            'member_number': member_number,
                            'excel_balance': excel_balance,
                            'net_balance': net_balance,
                            'savings_balance': savings_balance
                        })
        
        if balance_issues:
            print(f"⚠️  Found {len(balance_issues)} issues in member_balances table")
            for i, issue in enumerate(balance_issues[:5]):
                print(f"{i+1}. {issue['member_name']}: Excel=R{issue['excel_balance']:,.2f}, Net=R{issue['net_balance']:,.2f}, Savings=R{issue['savings_balance']:,.2f}")
        else:
            print("✅ All member_balances match Excel closing balances")
        
        return len(correct), len(incorrect), len(balance_issues)
        
    except Exception as e:
        print(f"Error verifying fix: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    print("=" * 80)
    print("FIX VERIFICATION")
    print("=" * 80)
    
    correct, incorrect, balance_issues = verify_fix_completion()
    
    print("\n" + "=" * 80)
    print("VERIFICATION COMPLETE")
    print("=" * 80)
    
    if incorrect == 0 and balance_issues == 0:
        print("\n✅ PERFECT! All fixes have been successfully applied.")
        print("The app should now show correct balances for all members.")
    else:
        print(f"\n⚠️  Issues found:")
        if incorrect > 0:
            print(f"  - {incorrect} members have incorrect current_balance")
        if balance_issues > 0:
            print(f"  - {balance_issues} members have incorrect member_balances")
        
        print("\nRun the fix script again if needed:")
        print("python fix_all_members_closing_balances.py")