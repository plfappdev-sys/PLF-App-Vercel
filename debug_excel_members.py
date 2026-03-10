#!/usr/bin/env python3
"""
Debug Excel Member Data
"""

import pandas as pd
import os

def debug_excel_members():
    excel_file = "NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"
    target_sheet = "2024-2025"
    
    print(f"Debugging Excel file: {excel_file}")
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
        
        # Show the Member column values
        print("\nFirst 20 rows of 'Member' column:")
        if 'Member' in df.columns:
            for i in range(min(20, len(df))):
                member_value = df.iloc[i]['Member']
                print(f"Row {i+1}: '{member_value}' (type: {type(member_value)})")
        else:
            print("'Member' column not found!")
            print("Available columns:")
            for col in df.columns:
                print(f"  - {col}")
        
        # Show sample rows with all data
        print("\n\nFirst 5 complete rows:")
        for i in range(min(5, len(df))):
            print(f"\nRow {i+1}:")
            row = df.iloc[i]
            for col in ['Member', 'Date Join', 'Closing Balance', 'Total Contribution for Current Year']:
                if col in df.columns:
                    print(f"  {col}: {row[col]}")
        
        # Check for member numbers
        print("\n\nChecking for member numbers in 'Member' column:")
        member_numbers = []
        for i in range(len(df)):
            member_value = df.iloc[i]['Member']
            if pd.isna(member_value):
                continue
            
            member_str = str(member_value).strip()
            print(f"Row {i+1}: '{member_str}'")
            
            # Try to extract member number
            if 'Member' in member_str:
                member_num = member_str.replace('Member', '').strip()
                if member_num.isdigit():
                    member_numbers.append(member_num)
                    print(f"  -> Extracted member number: {member_num}")
            elif member_str.isdigit():
                member_numbers.append(member_str)
                print(f"  -> Direct member number: {member_str}")
        
        print(f"\nTotal valid member numbers found: {len(member_numbers)}")
        if member_numbers:
            print(f"Sample member numbers: {member_numbers[:10]}")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    debug_excel_members()