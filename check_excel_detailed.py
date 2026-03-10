import pandas as pd
import os

def check_excel_detailed():
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
        
        # Try to read the '2024-2025' sheet
        sheet_name = '2024-2025'
        if sheet_name in xls.sheet_names:
            print(f"\nReading sheet: {sheet_name}")
            df = pd.read_excel(excel_path, sheet_name=sheet_name)
            
            print(f"DataFrame shape: {df.shape}")
            
            # Get column names
            col_bl = df.columns[63]  # Column BL
            col_bk = df.columns[62]  # Column BK
            col_member = df.columns[0]  # Member column
            
            print(f"\nColumn BL: {col_bl}")
            print(f"Column BK: {col_bk}")
            print(f"Member column: {col_member}")
            
            # Let's examine the data more carefully
            print("\n" + "=" * 80)
            print("EXAMINING DATA ROWS:")
            
            # Check first few rows
            print("\nFirst 5 rows:")
            for i in range(min(5, len(df))):
                member_val = df.iloc[i][col_member]
                bk_val = df.iloc[i][col_bk]
                bl_val = df.iloc[i][col_bl]
                print(f"Row {i+1}: Member={member_val}, BK={bk_val}, BL={bl_val}")
            
            # Check last few rows
            print("\nLast 10 rows:")
            for i in range(max(0, len(df)-10), len(df)):
                member_val = df.iloc[i][col_member]
                bk_val = df.iloc[i][col_bk]
                bl_val = df.iloc[i][col_bl]
                print(f"Row {i+1}: Member={member_val}, BK={bk_val}, BL={bl_val}")
            
            # Let's check if there are any rows with unusually large BL values
            print("\n" + "=" * 80)
            print("CHECKING FOR UNUSUALLY LARGE VALUES IN COLUMN BL:")
            
            # Calculate average and look for outliers
            bl_values = df[col_bl].dropna()
            if len(bl_values) > 0:
                avg_bl = bl_values.mean()
                std_bl = bl_values.std()
                print(f"Average BL value: R {avg_bl:,.2f}")
                print(f"Standard deviation: R {std_bl:,.2f}")
                
                # Look for values more than 3 standard deviations from mean
                threshold = avg_bl + 3 * std_bl
                print(f"\nValues above R {threshold:,.2f} (3 std dev above mean):")
                outliers = df[df[col_bl] > threshold]
                for idx, row in outliers.iterrows():
                    print(f"Row {idx+1}: Member={row[col_member]}, BL={row[col_bl]:,.2f}")
            
            # Let's try different exclusion strategies
            print("\n" + "=" * 80)
            print("DIFFERENT CALCULATION STRATEGIES:")
            
            # Strategy 1: Exclude last row only
            df_exclude_last = df.iloc[:-1]
            total_bl_1 = df_exclude_last[col_bl].sum()
            total_bk_1 = df_exclude_last[col_bk].sum()
            print(f"\n1. Exclude last row only (row 68):")
            print(f"   BL total (rows 1-67): R {total_bl_1:,.2f}")
            print(f"   BK total (rows 1-67): R {total_bk_1:,.2f}")
            print(f"   Combined: R {total_bl_1 + total_bk_1:,.2f}")
            
            # Strategy 2: Exclude last 2 rows
            df_exclude_last2 = df.iloc[:-2]
            total_bl_2 = df_exclude_last2[col_bl].sum()
            total_bk_2 = df_exclude_last2[col_bk].sum()
            print(f"\n2. Exclude last 2 rows (rows 67-68):")
            print(f"   BL total (rows 1-66): R {total_bl_2:,.2f}")
            print(f"   BK total (rows 1-66): R {total_bk_2:,.2f}")
            print(f"   Combined: R {total_bl_2 + total_bk_2:,.2f}")
            
            # Strategy 3: Exclude rows where BL > 100,000 (likely totals)
            df_exclude_large = df[df[col_bl] <= 100000]
            total_bl_3 = df_exclude_large[col_bl].sum()
            total_bk_3 = df_exclude_large[col_bk].sum()
            print(f"\n3. Exclude rows where BL > R 100,000:")
            print(f"   BL total: R {total_bl_3:,.2f}")
            print(f"   BK total: R {total_bk_3:,.2f}")
            print(f"   Combined: R {total_bl_3 + total_bk_3:,.2f}")
            print(f"   Rows excluded: {len(df) - len(df_exclude_large)}")
            
            # Strategy 4: Check what the user sees in Excel
            print("\n" + "=" * 80)
            print("USER'S OBSERVATION ANALYSIS:")
            print(f"User says Excel shows: R 525,338.89 for Column BL")
            
            # Let's see if any row has exactly this value
            exact_match = df[df[col_bl] == 525338.89]
            if len(exact_match) > 0:
                print(f"Found exact match in row(s):")
                for idx, row in exact_match.iterrows():
                    print(f"  Row {idx+1}: Member={row[col_member]}")
            else:
                print(f"No exact match found for R 525,338.89")
                # Check for close matches
                close_matches = df[abs(df[col_bl] - 525338.89) < 0.01]
                if len(close_matches) > 0:
                    print(f"Found close match(es):")
                    for idx, row in close_matches.iterrows():
                        print(f"  Row {idx+1}: Member={row[col_member]}, BL={row[col_bl]:,.2f}")
            
            # Strategy 5: Maybe the Excel formula shows 525,338.89 as the sum?
            # Let's check if 525,338.89 is half of our total
            half_total = total_bl_1 / 2
            print(f"\nHalf of our BL total (R {total_bl_1:,.2f} / 2) = R {half_total:,.2f}")
            if abs(half_total - 525338.89) < 0.01:
                print("✓ Half of our total matches user's observation!")
                print("  This suggests we might be double-counting something")
            
        else:
            print(f"\nERROR: Sheet '{sheet_name}' not found in Excel file.")
            
    except Exception as e:
        print(f"ERROR reading Excel file: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    check_excel_detailed()