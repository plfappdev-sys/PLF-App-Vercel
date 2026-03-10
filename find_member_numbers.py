#!/usr/bin/env python3
"""
Find member numbers in Excel
"""

import pandas as pd
import os

def find_member_numbers():
    excel_file = "NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"
    target_sheet = "2024-2025"
    
    print(f"Searching for member numbers in: {excel_file}")
    print(f"Target sheet: {target_sheet}")
    print("=" * 60)
    
    if not os.path.exists(excel_file):
        print(f"Error: File not found")
        return
    
    try:
        # Read the target sheet
        df = pd.read_excel(excel_file, sheet_name=target_sheet)
        
        print(f"Total rows: {len(df)}")
        print(f"Total columns: {len(df.columns)}")
        
        # Look for columns that might contain member numbers
        print("\nSearching for columns that might contain member numbers:")
        potential_member_number_cols = []
        
        for col in df.columns:
            col_str = str(col).lower()
            if any(keyword in col_str for keyword in ['member', 'no', 'number', 'id', 'code']):
                potential_member_number_cols.append(col)
                print(f"  Found: '{col}'")
        
        if not potential_member_number_cols:
            print("  No obvious member number columns found")
            print("\nAll columns:")
            for i, col in enumerate(df.columns):
                print(f"  {i+1:2d}. {col}")
        else:
            print(f"\nChecking potential member number columns:")
            for col in potential_member_number_cols:
                print(f"\nColumn: '{col}'")
                # Show first 10 non-null values
                non_null_values = df[col].dropna().head(10)
                if len(non_null_values) > 0:
                    for i, val in enumerate(non_null_values):
                        print(f"  Row {i+1}: '{val}' (type: {type(val)})")
                else:
                    print("  All values are null")
        
        # Check if there's a pattern we can use to generate member numbers
        print("\n\nChecking if we can generate member numbers:")
        print("First 10 member names:")
        for i in range(min(10, len(df))):
            member_name = df.iloc[i]['Member']
            print(f"  {i+1}. {member_name}")
        
        # Look for total contributions column
        print("\n\nLooking for financial data columns:")
        financial_cols = []
        for col in df.columns:
            col_str = str(col).lower()
            if any(keyword in col_str for keyword in ['total', 'contribution', 'balance', 'interest', 'penalty']):
                financial_cols.append(col)
        
        print(f"Found {len(financial_cols)} financial columns")
        print("First 10 financial columns:")
        for col in financial_cols[:10]:
            print(f"  - {col}")
        
        # Check the "Total Contribution for  7 Years (2018-24)" column
        if 'Total Contribution for  7 Years (2018-24)' in df.columns:
            print("\n\nChecking 'Total Contribution for  7 Years (2018-24)' column:")
            for i in range(min(5, len(df))):
                member_name = df.iloc[i]['Member']
                total_contrib = df.iloc[i]['Total Contribution for  7 Years (2018-24)']
                print(f"  {member_name}: R{total_contrib:,.2f}")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    find_member_numbers()