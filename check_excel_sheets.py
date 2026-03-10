import pandas as pd

EXCEL_FILE = r"NewBusLogic\Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"

print("Checking Excel file sheet names...")
try:
    xl = pd.ExcelFile(EXCEL_FILE)
    print(f"\nSheet names in '{EXCEL_FILE}':")
    print("-" * 50)
    for i, sheet in enumerate(xl.sheet_names):
        print(f"{i+1}. '{sheet}'")
    
    print(f"\nTotal sheets: {len(xl.sheet_names)}")
    
    # Also check the first few rows of each sheet to understand structure
    print("\n\nChecking first few rows of each sheet:")
    print("=" * 80)
    
    for sheet_name in xl.sheet_names:
        print(f"\nSheet: '{sheet_name}'")
        print("-" * 40)
        
        try:
            df = pd.read_excel(EXCEL_FILE, sheet_name=sheet_name, header=None, nrows=5)
            
            # Print column headers (first row)
            print("First row (potential headers):")
            for col_idx, value in enumerate(df.iloc[0]):
                if pd.notna(value):
                    print(f"  Column {col_idx} ({chr(65+col_idx)}): '{value}'")
            
            # Print second row (first data row)
            if len(df) > 1:
                print("\nSecond row (first data row):")
                for col_idx, value in enumerate(df.iloc[1]):
                    if pd.notna(value):
                        print(f"  Column {col_idx} ({chr(65+col_idx)}): '{value}'")
            
            print(f"Shape: {df.shape[0]} rows x {df.shape[1]} columns")
            
        except Exception as e:
            print(f"Error reading sheet: {e}")
    
except Exception as e:
    print(f"Error opening Excel file: {e}")
    import traceback
    traceback.print_exc()