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

def check_lesego_detailed():
    """Check Lesego Bokaba's data in detail"""
    print("Checking Lesego Bokaba's detailed data...")
    
    try:
        # Initialize Supabase client
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Get Lesego Bokaba from database
        response = supabase.table('members').select('*').eq('member_number', 'M031').execute()
        
        if hasattr(response, 'data') and response.data:
            member = response.data[0]
            print(f"\n=== DATABASE RECORD FOR LESEGO BOKABA (M031) ===")
            print(f"Member ID: {member.get('id')}")
            print(f"Member Number: {member.get('member_number')}")
            print(f"Name: {member.get('name')}")
            print(f"Join Date: {member.get('join_date')}")
            
            # Check all columns
            print(f"\n=== COLUMN VALUES ===")
            for key, value in member.items():
                if key not in ['id', 'created_at', 'updated_at', 'last_updated']:
                    print(f"  {key}: {value}")
            
            # Parse financial_info
            financial_info = member.get('financial_info', {})
            if isinstance(financial_info, str):
                try:
                    financial_info = json.loads(financial_info)
                except:
                    financial_info = {}
            
            print(f"\n=== FINANCIAL_INFO JSON ===")
            for key, value in financial_info.items():
                print(f"  {key}: {value}")
            
            # Check member_balances table
            print(f"\n=== MEMBER_BALANCES TABLE ===")
            balance_response = supabase.table('member_balances').select('*').eq('member_id', member['id']).execute()
            
            if hasattr(balance_response, 'data') and balance_response.data:
                balance = balance_response.data[0]
                for key, value in balance.items():
                    print(f"  {key}: {value}")
            else:
                print("  No record in member_balances table")
            
            # Check Excel data more thoroughly
            print(f"\n=== EXCEL DATA ANALYSIS ===")
            EXCEL_FILE = r"NewBusLogic\Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"
            
            # Try to find Lesego in all sheets
            sheets = pd.ExcelFile(EXCEL_FILE).sheet_names
            print(f"Available sheets: {sheets}")
            
            # Check specific sheets mentioned in database
            for sheet in ['2022-2023', '2023-2024', '2024-2025']:
                if sheet in sheets:
                    try:
                        df = pd.read_excel(EXCEL_FILE, sheet_name=sheet)
                        print(f"\n--- Sheet: {sheet} ---")
                        print(f"Columns: {df.columns.tolist()}")
                        
                        # Find Lesego Bokaba
                        for idx, row in df.iterrows():
                            member_name = str(row.iloc[0]).strip() if pd.notna(row.iloc[0]) else ""
                            if 'Lesego' in member_name or 'Bokaba' in member_name:
                                print(f"Found at row {idx}: {member_name}")
                                # Print all column values
                                for col_idx, col_name in enumerate(df.columns):
                                    value = row.iloc[col_idx]
                                    if pd.notna(value):
                                        print(f"  {col_name}: {value}")
                                break
                    except Exception as e:
                        print(f"Error reading {sheet}: {e}")
            
            # Calculate expected contribution based on join date
            print(f"\n=== EXPECTED CONTRIBUTION CALCULATION ===")
            join_date = member.get('join_date')
            if join_date:
                from datetime import datetime
                join_date_obj = datetime.fromisoformat(join_date.replace('Z', '+00:00'))
                print(f"Join Date: {join_date_obj}")
                
                # Calculate months from join date to June 2025
                end_date = datetime(2025, 6, 30)
                months = (end_date.year - join_date_obj.year) * 12 + (end_date.month - join_date_obj.month)
                if end_date.day < join_date_obj.day:
                    months -= 1
                
                print(f"Months from join to June 2025: {months}")
                expected_contribution = months * 200
                print(f"Expected Contribution (R200/month): R {expected_contribution:,.2f}")
                
                # Check if this matches what's in financial_info
                db_expected = financial_info.get('expected_contribution', 0)
                print(f"Database Expected Contribution: R {db_expected:,.2f}")
                
                if abs(db_expected - expected_contribution) > 1:
                    print(f"⚠️ DISCREPANCY: Database shows R {db_expected:,.2f} but calculation shows R {expected_contribution:,.2f}")
            
        else:
            print("Lesego Bokaba not found in database")
            
    except Exception as e:
        print(f"Error checking Lesego Bokaba data: {e}")

if __name__ == "__main__":
    check_lesego_detailed()