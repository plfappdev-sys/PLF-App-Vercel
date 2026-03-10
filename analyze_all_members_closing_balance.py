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

def analyze_closing_balances():
    """Analyze closing balances from Excel and compare with database"""
    print("Analyzing closing balances for all members...")
    
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
        
        # Now compare with database
        print("\n=== COMPARING EXCEL WITH DATABASE ===")
        
        discrepancies = []
        matches = []
        not_found_in_excel = []
        
        for member in members:
            member_name = member.get('name', '').strip()
            if not member_name:
                continue
                
            # Find in Excel
            excel_balance = None
            for excel_name, balance in excel_closing_balances.items():
                if member_name.lower() in excel_name.lower() or excel_name.lower() in member_name.lower():
                    excel_balance = balance
                    break
            
            if excel_balance is None:
                not_found_in_excel.append(member_name)
                continue
            
            # Get current balance from database
            financial_info = member.get('financial_info', {})
            if isinstance(financial_info, str):
                try:
                    financial_info = json.loads(financial_info)
                except:
                    financial_info = {}
            
            current_balance = financial_info.get('current_balance', 0)
            total_contributions = financial_info.get('total_contributions', 0)
            
            # Check member_balances table
            member_id = member.get('id')
            member_number = member.get('member_number')
            
            savings_balance = 0
            if member_id:
                balance_response = supabase.table('member_balances').select('*').eq('member_id', member_id).execute()
                if hasattr(balance_response, 'data') and balance_response.data:
                    balance_data = balance_response.data[0]
                    savings_balance = balance_data.get('savings_balance', 0)
                    net_balance = balance_data.get('net_balance', 0)
            
            # Check for discrepancies
            discrepancy_found = False
            discrepancy_reasons = []
            
            # Rule 1: Positive closing balance in Excel means member owes money
            # Rule 2: Negative closing balance in Excel means member has overpaid
            # Rule 3: Zero balance means up to date
            
            if excel_balance > 0:
                # Member owes money - should show as "Balance due"
                expected_current_balance = excel_balance
                if abs(current_balance - expected_current_balance) > 0.01:
                    discrepancy_found = True
                    discrepancy_reasons.append(f"current_balance mismatch: DB={current_balance}, Excel={expected_current_balance}")
            elif excel_balance < 0:
                # Member has overpaid - should show as negative balance (credit)
                expected_current_balance = 0  # Nothing due
                if abs(current_balance - expected_current_balance) > 0.01:
                    discrepancy_found = True
                    discrepancy_reasons.append(f"current_balance should be 0 for overpaid member: DB={current_balance}")
            else:
                # Zero balance - up to date
                expected_current_balance = 0
                if abs(current_balance - expected_current_balance) > 0.01:
                    discrepancy_found = True
                    discrepancy_reasons.append(f"current_balance should be 0: DB={current_balance}")
            
            # Check savings_balance vs total_contributions
            if abs(savings_balance - total_contributions) > 0.01:
                discrepancy_found = True
                discrepancy_reasons.append(f"savings_balance mismatch: {savings_balance} vs total_contributions: {total_contributions}")
            
            if discrepancy_found:
                discrepancies.append({
                    'member_name': member_name,
                    'member_number': member_number,
                    'excel_closing_balance': excel_balance,
                    'db_current_balance': current_balance,
                    'db_total_contributions': total_contributions,
                    'db_savings_balance': savings_balance,
                    'reasons': discrepancy_reasons
                })
            else:
                matches.append({
                    'member_name': member_name,
                    'member_number': member_number,
                    'excel_closing_balance': excel_balance,
                    'db_current_balance': current_balance
                })
        
        # Print summary
        print(f"\n=== SUMMARY ===")
        print(f"Total members in database: {len(members)}")
        print(f"Members found in Excel: {len(matches) + len(discrepancies)}")
        print(f"Members not found in Excel: {len(not_found_in_excel)}")
        print(f"Members with matching data: {len(matches)}")
        print(f"Members with discrepancies: {len(discrepancies)}")
        
        if discrepancies:
            print(f"\n=== DISCREPANCIES FOUND ===")
            for i, disc in enumerate(discrepancies[:20]):  # Show first 20
                print(f"\n{i+1}. {disc['member_name']} ({disc['member_number']})")
                print(f"   Excel Closing Balance: {disc['excel_closing_balance']:,.2f}")
                print(f"   DB Current Balance: {disc['db_current_balance']:,.2f}")
                print(f"   DB Total Contributions: {disc['db_total_contributions']:,.2f}")
                print(f"   DB Savings Balance: {disc['db_savings_balance']:,.2f}")
                for reason in disc['reasons']:
                    print(f"   - {reason}")
            
            if len(discrepancies) > 20:
                print(f"\n... and {len(discrepancies) - 20} more discrepancies")
        
        # Show some matches
        if matches:
            print(f"\n=== SAMPLE OF MATCHING MEMBERS ===")
            for i, match in enumerate(matches[:10]):
                print(f"{i+1}. {match['member_name']} ({match['member_number']}): Excel={match['excel_closing_balance']:,.2f}, DB={match['db_current_balance']:,.2f}")
        
        # Show some not found
        if not_found_in_excel:
            print(f"\n=== SAMPLE OF MEMBERS NOT FOUND IN EXCEL ===")
            for i, name in enumerate(not_found_in_excel[:10]):
                print(f"{i+1}. {name}")
        
        # Generate recommendations
        print(f"\n=== RECOMMENDATIONS ===")
        print("1. For members with positive Excel closing balance:")
        print("   - Set current_balance = Excel closing balance (money owed)")
        print("   - Set outstanding_amount = Excel closing balance")
        print("   - savings_balance should reflect actual contributions received")
        
        print("\n2. For members with negative Excel closing balance (overpaid):")
        print("   - Set current_balance = 0 (nothing due)")
        print("   - Set outstanding_amount = 0")
        print("   - savings_balance should be higher than total_contributions")
        
        print("\n3. For members with zero Excel closing balance:")
        print("   - Set current_balance = 0 (up to date)")
        print("   - Set outstanding_amount = 0")
        
        return discrepancies
        
    except Exception as e:
        print(f"Error analyzing closing balances: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    analyze_closing_balances()