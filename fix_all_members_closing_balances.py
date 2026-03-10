import pandas as pd
import numpy as np
import os
from supabase import create_client, Client
from dotenv import load_dotenv
import json
from datetime import datetime

# Load environment variables
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

def fix_all_members_closing_balances():
    """Fix all members' closing balances based on Excel data"""
    print("Fixing all members' closing balances based on Excel data...")
    
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
        
        # Read Excel file - use the most recent sheet (2024-2025)
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
        
        print(f"Header row found at index {header_row}")
        headers = df.iloc[header_row].tolist()
        print(f"Column I header: '{headers[8]}' (index 8)")
        
        # Create a mapping of member names to their closing balances
        excel_closing_balances = {}
        
        print("\n=== EXTRACTING CLOSING BALANCES FROM EXCEL ===")
        for idx, row in df.iterrows():
            if idx <= header_row:
                continue  # Skip header rows
                
            member_name = str(row.iloc[0]).strip() if pd.notna(row.iloc[0]) else ""
            if not member_name:
                continue
                
            # Get closing balance from Column I (index 8)
            if len(row) > 8 and pd.notna(row.iloc[8]):
                closing_balance = float(row.iloc[8])
                excel_closing_balances[member_name] = closing_balance
        
        print(f"Extracted {len(excel_closing_balances)} closing balances from Excel")
        
        # Track fixes
        fixes_applied = []
        errors = []
        
        print("\n=== APPLYING FIXES ===")
        
        for member in members:
            member_name = member.get('name', '').strip()
            member_id = member.get('id')
            member_number = member.get('member_number')
            
            if not member_name:
                continue
                
            # Find in Excel
            excel_balance = None
            excel_member_name = None
            
            for excel_name, balance in excel_closing_balances.items():
                if member_name.lower() in excel_name.lower() or excel_name.lower() in member_name.lower():
                    excel_balance = balance
                    excel_member_name = excel_name
                    break
            
            if excel_balance is None:
                print(f"⚠️  {member_name} ({member_number}) not found in Excel")
                errors.append(f"{member_name} ({member_number}) not found in Excel")
                continue
            
            # Get current financial info
            financial_info = member.get('financial_info', {})
            if isinstance(financial_info, str):
                try:
                    financial_info = json.loads(financial_info)
                except:
                    financial_info = {}
            
            current_balance = financial_info.get('current_balance', 0)
            total_contributions = financial_info.get('total_contributions', 0)
            outstanding_amount = financial_info.get('outstanding_amount', 0)
            
            # Determine what the new values should be
            new_current_balance = 0
            new_outstanding_amount = 0
            
            if excel_balance > 0:
                # Member owes money
                new_current_balance = excel_balance
                new_outstanding_amount = excel_balance
                status = "OWES MONEY"
            elif excel_balance < 0:
                # Member has overpaid (credit)
                new_current_balance = 0  # Nothing due
                new_outstanding_amount = 0
                status = "OVERPAID (CREDIT)"
            else:
                # Zero balance - up to date
                new_current_balance = 0
                new_outstanding_amount = 0
                status = "UP TO DATE"
            
            # Update financial_info
            updated_financial_info = financial_info.copy()
            updated_financial_info.update({
                "data_source": "Excel Verification 2025 - Corrected",
                "last_updated": datetime.now().isoformat(),
                "current_balance": new_current_balance,
                "outstanding_amount": new_outstanding_amount,
                "total_contributions": total_contributions  # Keep existing total contributions
            })
            
            # Update members table
            try:
                update_response = supabase.table('members').update({
                    'financial_info': updated_financial_info,
                    'updated_at': datetime.now().isoformat(),
                    'closing_balance': excel_balance
                }).eq('id', member_id).execute()
                
                if hasattr(update_response, 'error') and update_response.error:
                    print(f"❌ Error updating {member_name}: {update_response.error}")
                    errors.append(f"{member_name}: {update_response.error}")
                    continue
                
                # Update member_balances table
                # For positive balances: savings_balance should be lower than total_contributions
                # For negative balances: savings_balance should be higher than total_contributions
                
                # Get current member_balances
                balance_response = supabase.table('member_balances').select('*').eq('member_id', member_id).execute()
                
                if hasattr(balance_response, 'data') and balance_response.data:
                    balance_data = balance_response.data[0]
                    
                    # Update savings_balance to match Excel closing balance
                    # This represents the actual balance in the account
                    new_savings_balance = excel_balance if excel_balance > 0 else 0
                    new_net_balance = excel_balance
                    
                    balance_update_response = supabase.table('member_balances').update({
                        'savings_balance': new_savings_balance,
                        'net_balance': new_net_balance,
                        'total_contributions': total_contributions,
                        'updated_at': datetime.now().isoformat(),
                        'last_balance_update': datetime.now().isoformat()
                    }).eq('member_id', member_id).execute()
                    
                    if hasattr(balance_update_response, 'error') and balance_update_response.error:
                        print(f"❌ Error updating member_balances for {member_name}: {balance_update_response.error}")
                        errors.append(f"{member_name} member_balances: {balance_update_response.error}")
                
                print(f"✅ {member_name} ({member_number}): {status}")
                print(f"   Excel: {excel_balance:,.2f}, Old Current: {current_balance:,.2f}, New Current: {new_current_balance:,.2f}")
                
                fixes_applied.append({
                    'member_name': member_name,
                    'member_number': member_number,
                    'excel_balance': excel_balance,
                    'old_current_balance': current_balance,
                    'new_current_balance': new_current_balance,
                    'status': status
                })
                
            except Exception as e:
                print(f"❌ Error processing {member_name}: {e}")
                errors.append(f"{member_name}: {e}")
        
        # Print summary
        print(f"\n=== FIX SUMMARY ===")
        print(f"Total members processed: {len(members)}")
        print(f"Fixes successfully applied: {len(fixes_applied)}")
        print(f"Errors: {len(errors)}")
        
        if fixes_applied:
            print(f"\n=== SAMPLE OF FIXES APPLIED ===")
            for i, fix in enumerate(fixes_applied[:10]):
                print(f"{i+1}. {fix['member_name']} ({fix['member_number']})")
                print(f"   Excel Balance: {fix['excel_balance']:,.2f}")
                print(f"   Old Current Balance: {fix['old_current_balance']:,.2f}")
                print(f"   New Current Balance: {fix['new_current_balance']:,.2f}")
                print(f"   Status: {fix['status']}")
            
            if len(fixes_applied) > 10:
                print(f"\n... and {len(fixes_applied) - 10} more fixes applied")
        
        if errors:
            print(f"\n=== ERRORS ===")
            for i, error in enumerate(errors[:10]):
                print(f"{i+1}. {error}")
            
            if len(errors) > 10:
                print(f"\n... and {len(errors) - 10} more errors")
        
        # Generate SQL script for manual execution
        print(f"\n=== GENERATING SQL SCRIPT FOR MANUAL VERIFICATION ===")
        generate_sql_script(fixes_applied, excel_closing_balances)
        
        return fixes_applied, errors
        
    except Exception as e:
        print(f"Error fixing closing balances: {e}")
        import traceback
        traceback.print_exc()

def generate_sql_script(fixes_applied, excel_closing_balances):
    """Generate SQL script for manual verification"""
    sql_file = "fix_all_members_closing_balances.sql"
    
    with open(sql_file, 'w') as f:
        f.write("-- SQL Script to fix all members' closing balances based on Excel data\n")
        f.write("-- Generated: " + datetime.now().isoformat() + "\n")
        f.write("-- Total members to fix: " + str(len(fixes_applied)) + "\n\n")
        
        f.write("-- ============================================\n")
        f.write("-- UPDATE MEMBERS TABLE\n")
        f.write("-- ============================================\n\n")
        
        for fix in fixes_applied:
            member_name = fix['member_name'].replace("'", "''")
            member_number = fix['member_number']
            excel_balance = fix['excel_balance']
            new_current_balance = fix['new_current_balance']
            
            # Create updated financial_info JSON
            financial_info = {
                "data_source": "Excel Verification 2025 - Corrected",
                "last_updated": datetime.now().isoformat(),
                "current_balance": new_current_balance,
                "outstanding_amount": new_current_balance if excel_balance > 0 else 0,
                "total_contributions": 0  # This should be updated based on actual contributions
            }
            
            financial_info_json = json.dumps(financial_info).replace("'", "''")
            
            f.write(f"-- {member_name} ({member_number})\n")
            f.write(f"UPDATE members \n")
            f.write(f"SET financial_info = '{financial_info_json}',\n")
            f.write(f"    closing_balance = {excel_balance},\n")
            f.write(f"    updated_at = NOW()\n")
            f.write(f"WHERE member_number = '{member_number}' AND name LIKE '%{member_name.split()[0]}%';\n\n")
        
        f.write("-- ============================================\n")
        f.write("-- UPDATE MEMBER_BALANCES TABLE\n")
        f.write("-- ============================================\n\n")
        
        for fix in fixes_applied:
            member_number = fix['member_number']
            excel_balance = fix['excel_balance']
            
            f.write(f"-- {fix['member_name']} ({member_number})\n")
            f.write(f"UPDATE member_balances \n")
            f.write(f"SET savings_balance = {excel_balance if excel_balance > 0 else 0},\n")
            f.write(f"    net_balance = {excel_balance},\n")
            f.write(f"    updated_at = NOW(),\n")
            f.write(f"    last_balance_update = NOW()\n")
            f.write(f"WHERE member_number = '{member_number}';\n\n")
        
        f.write("-- ============================================\n")
        f.write("-- VERIFICATION QUERIES\n")
        f.write("-- ============================================\n\n")
        f.write("-- Check a few members to verify the fix\n")
        f.write("SELECT member_number, name, closing_balance, financial_info->>'current_balance' as current_balance FROM members LIMIT 10;\n\n")
        f.write("SELECT mb.member_number, m.name, mb.savings_balance, mb.net_balance FROM member_balances mb JOIN members m ON mb.member_number = m.member_number LIMIT 10;\n")
    
    print(f"SQL script generated: {sql_file}")
    print("You can review and execute this script manually if needed.")

if __name__ == "__main__":
    print("=" * 80)
    print("COMPREHENSIVE MEMBER CLOSING BALANCE FIX")
    print("=" * 80)
    
    print("\nThis script will fix ALL members' closing balances based on Excel data.")
    print("Rules:")
    print("1. Positive Excel closing balance → Member owes money (shown as 'Balance due')")
    print("2. Negative Excel closing balance → Member has overpaid (shown as 0 balance due)")
    print("3. Zero Excel closing balance → Member is up to date")
    print("\nPress Enter to continue or Ctrl+C to cancel...")
    
    try:
        input()
    except KeyboardInterrupt:
        print("\nOperation cancelled.")
        exit(0)
    
    fixes_applied, errors = fix_all_members_closing_balances()
    
    print("\n" + "=" * 80)
    print("FIX COMPLETED")
    print("=" * 80)
    
    if fixes_applied:
        print(f"\n✅ Successfully applied fixes to {len(fixes_applied)} members.")
        print("\nWhat the app should now show:")
        print("- Members with positive Excel balances: 'Balance due' = Excel closing balance")
        print("- Members with negative Excel balances: 'Balance due' = 0 (they have credit)")
        print("- Members with zero Excel balances: 'Balance due' = 0 (up to date)")
        
        # Show examples
        print("\nExamples:")
        for fix in fixes_applied[:3]:
            if fix['excel_balance'] > 0:
                print(f"  • {fix['member_name']}: Balance due = R{fix['excel_balance']:,.2f}")
            elif fix['excel_balance'] < 0:
                print(f"  • {fix['member_name']}: Balance due = 0 (has credit of R{abs(fix['excel_balance']):,.2f})")
            else:
                print(f"  • {fix['member_name']}: Balance due = 0 (up to date)")
    
    if errors:
        print(f"\n⚠️  There were {len(errors)} errors. Check the error log above.")
    
    print("\nNext steps:")
    print("1. Review the generated SQL script: fix_all_members_closing_balances.sql")
    print("2. Test the app to verify balances are showing correctly")
    print("3. Check a few members manually to confirm the fix")