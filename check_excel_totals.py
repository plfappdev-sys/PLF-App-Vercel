import pandas as pd
import os

def check_excel_totals():
    excel_path = r"NewBusLogic\Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"
    
    print(f"Checking Excel file: {excel_path}")
    print("=" * 80)
    
    # Check if file exists
    if not os.path.exists(excel_path):
        print(f"ERROR: File not found: {excel_path}")
        return
    
    try:
        # Read the Excel file
        # First, let's see what sheets are available
        xls = pd.ExcelFile(excel_path)
        print(f"Available sheets: {xls.sheet_names}")
        
        # Try to read the '2024-2025' sheet
        sheet_name = '2024-2025'
        if sheet_name in xls.sheet_names:
            print(f"\nReading sheet: {sheet_name}")
            df = pd.read_excel(excel_path, sheet_name=sheet_name)
            
            print(f"DataFrame shape: {df.shape}")
            print(f"Columns: {list(df.columns)}")
            
            # Find columns BL and BK
            # Excel columns: A=1, B=2, ..., Z=26, AA=27, AB=28, ..., BK=63, BL=64
            # In pandas, columns are 0-indexed, so BK would be column 62, BL would be column 63
            
            # Let's find columns by name pattern
            print("\nSearching for columns containing 'Total contributions' or similar...")
            
            # Look for column names that might contain contribution totals
            for i, col in enumerate(df.columns):
                if isinstance(col, str):
                    col_lower = col.lower()
                    if 'total' in col_lower and ('contribution' in col_lower or 'contrib' in col_lower):
                        print(f"Column {i} ({col}): Found potential contributions column")
                        # Show some sample values
                        print(f"  Sample values: {df[col].head().tolist()}")
                        print(f"  Sum: {df[col].sum():,.2f}")
                        print(f"  Count non-null: {df[col].count()}")
            
            # Also check specific column positions
            print("\nChecking specific column positions (BK=63, BL=64 in Excel, 62 and 63 in 0-index):")
            if len(df.columns) > 63:
                col_bl = df.columns[63]  # Column BL (64th column)
                print(f"Column BL (index 63): {col_bl}")
                print(f"  Values: {df[col_bl].head().tolist()}")
                print(f"  Sum: {df[col_bl].sum():,.2f}")
                print(f"  Count: {df[col_bl].count()}")
            
            if len(df.columns) > 62:
                col_bk = df.columns[62]  # Column BK (63rd column)
                print(f"Column BK (index 62): {col_bk}")
                print(f"  Values: {df[col_bk].head().tolist()}")
                print(f"  Sum: {df[col_bk].sum():,.2f}")
                print(f"  Count: {df[col_bk].count()}")
            
            # Calculate total of BL + BK if both exist
            if len(df.columns) > 63 and len(df.columns) > 62:
                total_bl = df[df.columns[63]].sum()
                total_bk = df[df.columns[62]].sum()
                total_combined = total_bl + total_bk
                
                print("\n" + "=" * 80)
                print("SUMMARY:")
                print(f"Total Column BL (2018-2019 contributions): R {total_bl:,.2f}")
                print(f"Total Column BK (Current Year contributions): R {total_bk:,.2f}")
                print(f"TOTAL CONTRIBUTIONS (BL + BK): R {total_combined:,.2f}")
                print("=" * 80)
                
                # Also check what the current application shows
                print("\nCOMPARISON WITH APPLICATION:")
                print(f"Application currently shows: R 242,440.00")
                print(f"Excel Column BL total: R {total_bl:,.2f}")
                print(f"Difference: R {total_bl - 242440:,.2f}")
                
                if abs(total_bl - 242440) < 0.01:
                    print("✓ Column BL matches application value (R 242,440.00)")
                else:
                    print(f"✗ Column BL does NOT match application value")
                    print(f"  Expected: R 242,440.00")
                    print(f"  Actual: R {total_bl:,.2f}")
                    print(f"  Difference: R {total_bl - 242440:,.2f}")
                
                print(f"\nTotal Contributions should be BL + BK = R {total_combined:,.2f}")
                
        else:
            print(f"\nERROR: Sheet '{sheet_name}' not found in Excel file.")
            print(f"Available sheets: {xls.sheet_names}")
            
    except Exception as e:
        print(f"ERROR reading Excel file: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    check_excel_totals()