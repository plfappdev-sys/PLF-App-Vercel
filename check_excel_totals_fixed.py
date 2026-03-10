import pandas as pd
import os

def check_excel_totals_fixed():
    excel_path = r"NewBusLogic\Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"
    
    print(f"Checking Excel file: {excel_path}")
    print("=" * 80)
    
    # Check if file exists
    if not os.path.exists(excel_path):
        print(f"ERROR: File not found: {excel_path}")
        return
    
    try:
        # Read the Excel file
        xls = pd.ExcelFile(excel_path)
        print(f"Available sheets: {xls.sheet_names}")
        
        # Try to read the '2024-2025' sheet
        sheet_name = '2024-2025'
        if sheet_name in xls.sheet_names:
            print(f"\nReading sheet: {sheet_name}")
            df = pd.read_excel(excel_path, sheet_name=sheet_name)
            
            print(f"DataFrame shape: {df.shape}")
            print(f"Columns: {list(df.columns)}")
            
            # Exclude the last row (row 68) which contains totals
            df_members = df.iloc[:-1]  # All rows except the last one
            print(f"\nExcluding last row (row 68) which contains totals")
            print(f"Members data shape (rows 1-67): {df_members.shape}")
            
            # Find columns BL and BK
            # Excel columns: A=1, B=2, ..., Z=26, AA=27, AB=28, ..., BK=63, BL=64
            # In pandas, columns are 0-indexed, so BK would be column 62, BL would be column 63
            
            print("\nChecking specific column positions (BK=63, BL=64 in Excel, 62 and 63 in 0-index):")
            
            if len(df_members.columns) > 63:
                col_bl = df_members.columns[63]  # Column BL (64th column)
                print(f"Column BL (index 63): {col_bl}")
                print(f"  First 5 values: {df_members[col_bl].head().tolist()}")
                print(f"  Last 5 values: {df_members[col_bl].tail().tolist()}")
                print(f"  Sum (rows 1-67): R {df_members[col_bl].sum():,.2f}")
                print(f"  Count: {df_members[col_bl].count()}")
                
                # Check what's in row 68 (the total row)
                total_row_bl = df.iloc[-1][col_bl] if len(df) > 0 else 0
                print(f"  Row 68 (total row): R {total_row_bl:,.2f}")
            
            if len(df_members.columns) > 62:
                col_bk = df_members.columns[62]  # Column BK (63rd column)
                print(f"\nColumn BK (index 62): {col_bk}")
                print(f"  First 5 values: {df_members[col_bk].head().tolist()}")
                print(f"  Last 5 values: {df_members[col_bk].tail().tolist()}")
                print(f"  Sum (rows 1-67): R {df_members[col_bk].sum():,.2f}")
                print(f"  Count: {df_members[col_bk].count()}")
                
                # Check what's in row 68 (the total row)
                total_row_bk = df.iloc[-1][col_bk] if len(df) > 0 else 0
                print(f"  Row 68 (total row): R {total_row_bk:,.2f}")
            
            # Calculate total of BL + BK if both exist
            if len(df_members.columns) > 63 and len(df_members.columns) > 62:
                total_bl = df_members[df_members.columns[63]].sum()
                total_bk = df_members[df_members.columns[62]].sum()
                total_combined = total_bl + total_bk
                
                print("\n" + "=" * 80)
                print("SUMMARY (Rows 1-67 only, excluding row 68 totals):")
                print(f"Total Column BL (2018-2019 contributions): R {total_bl:,.2f}")
                print(f"Total Column BK (Current Year contributions): R {total_bk:,.2f}")
                print(f"TOTAL CONTRIBUTIONS (BL + BK): R {total_combined:,.2f}")
                print("=" * 80)
                
                # Also check what the current application shows
                print("\nCOMPARISON WITH APPLICATION:")
                print(f"Application currently shows: R 242,440.00")
                print(f"Excel Column BL total (rows 1-67): R {total_bl:,.2f}")
                print(f"Difference: R {total_bl - 242440:,.2f}")
                
                if abs(total_bl - 242440) < 0.01:
                    print("✓ Column BL matches application value (R 242,440.00)")
                else:
                    print(f"✗ Column BL does NOT match application value")
                    print(f"  Expected: R 242,440.00")
                    print(f"  Actual: R {total_bl:,.2f}")
                    print(f"  Difference: R {total_bl - 242440:,.2f}")
                
                print(f"\nTotal Contributions should be BL + BK = R {total_combined:,.2f}")
                
                # Check what the user mentioned about Excel showing 525,338.89
                print("\n" + "=" * 80)
                print("USER'S OBSERVATION CHECK:")
                print(f"User mentioned Excel shows: R 525,338.89 for Column BL")
                print(f"Our calculation shows: R {total_bl:,.2f}")
                print(f"Difference: R {total_bl - 525338.89:,.2f}")
                
                # Let's also check if row 68 has the value 525,338.89
                if len(df) > 0:
                    row_68_bl = df.iloc[-1][df.columns[63]]
                    print(f"\nRow 68 (total row) Column BL value: R {row_68_bl:,.2f}")
                    if abs(row_68_bl - 525338.89) < 0.01:
                        print("✓ Row 68 matches user's observation of R 525,338.89")
                    else:
                        print(f"✗ Row 68 does NOT match user's observation")
                        print(f"  Expected: R 525,338.89")
                        print(f"  Actual: R {row_68_bl:,.2f}")
                
        else:
            print(f"\nERROR: Sheet '{sheet_name}' not found in Excel file.")
            print(f"Available sheets: {xls.sheet_names}")
            
    except Exception as e:
        print(f"ERROR reading Excel file: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    check_excel_totals_fixed()