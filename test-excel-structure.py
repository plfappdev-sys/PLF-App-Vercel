#!/usr/bin/env python3
"""
Test script to verify Excel file structure
"""

import pandas as pd
import os

def test_excel_structure():
    """Test the Excel file structure"""
    excel_file = "NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025.xlsx"
    
    if not os.path.exists(excel_file):
        print(f"Error: Excel file not found at {excel_file}")
        return False
    
    try:
        # Get sheet names
        excel_file = pd.ExcelFile(excel_file)
        sheet_names = excel_file.sheet_names
        print(f"Sheet names: {sheet_names}")
        
        # Check if 2024-2025 sheet exists
        if '2024-2025' in sheet_names:
            print("✓ Found 2024-2025 sheet")
            
            # Read a few rows to check structure
            df = pd.read_excel(excel_file, sheet_name='2024-2025', nrows=5)
            print(f"Columns found: {list(df.columns)}")
            print(f"Sample data shape: {df.shape}")
            
            # Check for required columns
            required_columns = ['Member', 'Date Join', 'Closing Balance']
            missing_columns = [col for col in required_columns if col not in df.columns]
            
            if missing_columns:
                print(f"❌ Missing required columns: {missing_columns}")
                return False
            else:
                print("✓ All required columns present")
                return True
        else:
            print("❌ 2024-2025 sheet not found")
            return False
            
    except Exception as e:
        print(f"Error testing Excel file: {e}")
        return False

if __name__ == "__main__":
    print("Testing Excel file structure...")
    if test_excel_structure():
        print("✓ Excel file structure is valid")
    else:
        print("❌ Excel file structure is invalid")
