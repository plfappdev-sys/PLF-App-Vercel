import pandas as pd
import numpy as np
import os

def analyze_excel_column_i():
    """Analyze Column I in the Excel file to understand what it represents"""
    print("Analyzing Excel Column I...")
    
    EXCEL_FILE = r"NewBusLogic\Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"
    
    try:
        # Read the Excel file
        print(f"Reading Excel file: {EXCEL_FILE}")
        
        # Check all sheets
        sheets = ['2022-2023', '2023-2024', '2024-2025']
        
        for sheet in sheets:
            print(f"\n=== Sheet: {sheet} ===")
            
            try:
                df = pd.read_excel(EXCEL_FILE, sheet_name=sheet, header=None)
                print(f"Sheet dimensions: {df.shape}")
                
                # Print column headers (first few rows)
                print("\nFirst 5 rows (to understand structure):")
                for i in range(min(5, len(df))):
                    print(f"Row {i}: {df.iloc[i].tolist()[:15]}...")  # First 15 columns
                
                # Find Lesego Bokaba
                print("\nLooking for Lesego Bokaba...")
                for idx, row in df.iterrows():
                    member_name = str(row.iloc[0]).strip() if pd.notna(row.iloc[0]) else ""
                    if 'Lesego' in member_name or 'Bokaba' in member_name:
                        print(f"Found at row {idx}: {member_name}")
                        
                        # Print all columns for Lesego
                        print(f"All columns for Lesego Bokaba in {sheet}:")
                        for col_idx, value in enumerate(row):
                            if pd.notna(value):
                                print(f"  Column {col_idx} ({chr(65+col_idx)}): {value}")
                        
                        # Specifically check Column I (index 8)
                        if len(row) > 8:
                            col_i_value = row.iloc[8]
                            print(f"\nColumn I (index 8) value: {col_i_value}")
                            print(f"Column I type: {type(col_i_value)}")
                        
                        break
                
                # Check what Column I header might be
                print(f"\nColumn I (index 8) header check:")
                # Look for header row (usually row with column names)
                for i in range(min(10, len(df))):
                    if pd.notna(df.iloc[i, 8]):
                        print(f"Row {i}, Column I: {df.iloc[i, 8]}")
                
            except Exception as e:
                print(f"Error reading sheet {sheet}: {e}")
        
        # Also check if there's a summary sheet
        print("\n=== Checking for Summary Sheet ===")
        try:
            xls = pd.ExcelFile(EXCEL_FILE)
            print(f"All sheets in file: {xls.sheet_names}")
            
            # Look for summary or total sheets
            for sheet_name in xls.sheet_names:
                if 'total' in sheet_name.lower() or 'summary' in sheet_name.lower():
                    print(f"\nAnalyzing summary sheet: {sheet_name}")
                    df_summary = pd.read_excel(EXCEL_FILE, sheet_name=sheet_name)
                    print(f"Summary sheet columns: {df_summary.columns.tolist()}")
                    break
                    
        except Exception as e:
            print(f"Error checking summary sheets: {e}")
            
    except Exception as e:
        print(f"Error analyzing Excel file: {e}")

def check_multiple_members():
    """Check multiple members to understand Column I pattern"""
    print("\n" + "="*80)
    print("CHECKING MULTIPLE MEMBERS IN COLUMN I")
    print("="*80)
    
    EXCEL_FILE = r"NewBusLogic\Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"
    
    try:
        # Check 2024-2025 sheet (most recent)
        df = pd.read_excel(EXCEL_FILE, sheet_name='2024-2025', header=None)
        
        # Find header row
        header_row = None
        for i in range(min(10, len(df))):
            if pd.notna(df.iloc[i, 0]) and 'Name' in str(df.iloc[i, 0]):
                header_row = i
                break
        
        if header_row is not None:
            print(f"Header found at row {header_row}")
            headers = df.iloc[header_row].tolist()
            print(f"Headers: {headers[:15]}...")  # First 15 columns
            
            # Check what Column I header is
            if len(headers) > 8:
                print(f"\nColumn I header: '{headers[8]}'")
        
        # Check several members
        members_to_check = [
            'Lesego Bokaba',
            'Nicholas Molale',
            'Christopher Naude',
            'Jonas Mothupi'
        ]
        
        for member_name in members_to_check:
            print(f"\n--- Checking {member_name} ---")
            for idx, row in df.iterrows():
                current_name = str(row.iloc[0]).strip() if pd.notna(row.iloc[0]) else ""
                if member_name.lower() in current_name.lower():
                    print(f"Found at row {idx}")
                    
                    # Get Column I value
                    if len(row) > 8:
                        col_i_value = row.iloc[8]
                        print(f"Column I value: {col_i_value}")
                        
                        # Also check other relevant columns
                        print(f"Column G (Total Contributions): {row.iloc[6] if len(row) > 6 else 'N/A'}")
                        print(f"Column H: {row.iloc[7] if len(row) > 7 else 'N/A'}")
                    
                    break
            else:
                print(f"Not found in this sheet")
                
    except Exception as e:
        print(f"Error checking multiple members: {e}")

if __name__ == "__main__":
    analyze_excel_column_i()
    check_multiple_members()