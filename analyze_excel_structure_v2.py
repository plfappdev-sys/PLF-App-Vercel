import pandas as pd
import os

# Path to the Excel file
excel_path = r"NewBusLogic\Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"

print(f"Analyzing Excel file: {excel_path}")
print("=" * 80)

try:
    # Read the Excel file
    xl = pd.ExcelFile(excel_path)
    print(f"Available sheets: {xl.sheet_names}")
    
    # Look for sheets that might contain the data we need
    # Based on the requirements, we need columns G, H, L
    # Let's check each sheet for these columns
    
    target_sheets = []
    
    for sheet_name in xl.sheet_names:
        print(f"\n{'='*60}")
        print(f"Analyzing sheet: {sheet_name}")
        
        try:
            df = xl.parse(sheet_name, nrows=5)  # Just read first few rows to check structure
            
            # Check if sheet has enough columns
            if len(df.columns) >= 12:  # Need at least column L (index 11)
                print(f"  Columns: {list(df.columns)}")
                print(f"  Shape: {df.shape}")
                
                # Look for column names that might match our requirements
                column_g = None
                column_h = None
                column_l = None
                
                for i, col in enumerate(df.columns):
                    col_str = str(col).lower()
                    
                    # Check for Column G: "Total Contribution for 12 Months"
                    if 'total' in col_str and 'contribution' in col_str and ('12' in col_str or 'twelve' in col_str or 'month' in col_str):
                        column_g = (i, col)
                    
                    # Check for Column H: "Outstanding Contributions"
                    if 'outstanding' in col_str and 'contribution' in col_str:
                        column_h = (i, col)
                    
                    # Check for Column L: "Penalties"
                    if 'penalty' in col_str or 'penalties' in col_str:
                        column_l = (i, col)
                
                if column_g or column_h or column_l:
                    print(f"  Found relevant columns in sheet '{sheet_name}':")
                    if column_g:
                        print(f"    Column G (index {column_g[0]}): {column_g[1]}")
                    if column_h:
                        print(f"    Column H (index {column_h[0]}): {column_h[1]}")
                    if column_l:
                        print(f"    Column L (index {column_l[0]}): {column_l[1]}")
                    
                    target_sheets.append((sheet_name, column_g, column_h, column_l))
            else:
                print(f"  Sheet has only {len(df.columns)} columns, skipping...")
                
        except Exception as e:
            print(f"  Error reading sheet {sheet_name}: {e}")
    
    print(f"\n{'='*80}")
    print("SUMMARY OF FINDINGS:")
    
    if target_sheets:
        print(f"Found {len(target_sheets)} sheet(s) with relevant columns:")
        for sheet_name, col_g, col_h, col_l in target_sheets:
            print(f"\nSheet: {sheet_name}")
            if col_g:
                print(f"  Column G (Total Contribution for 12 Months): {col_g[1]}")
            if col_h:
                print(f"  Column H (Outstanding Contributions): {col_h[1]}")
            if col_l:
                print(f"  Column L (Penalties): {col_l[1]}")
        
        # Let's examine the most promising sheet in detail
        print(f"\n{'='*80}")
        print("DETAILED ANALYSIS OF FIRST TARGET SHEET:")
        
        sheet_name = target_sheets[0][0]
        print(f"Analyzing sheet: {sheet_name}")
        
        # Read the entire sheet
        df_full = xl.parse(sheet_name)
        print(f"Full shape: {df_full.shape}")
        
        # Show all columns with indices
        print("\nAll columns with indices:")
        for i, col in enumerate(df_full.columns):
            print(f"  Column {i} ({chr(65+i)}): {col}")
        
        # Find the specific columns again
        col_g_info = target_sheets[0][1]
        col_h_info = target_sheets[0][2]
        col_l_info = target_sheets[0][3]
        
        # Calculate totals
        print("\nCalculating totals:")
        
        if col_g_info:
            col_g_name = col_g_info[1]
            if col_g_name in df_full.columns:
                total_contributions = df_full[col_g_name].sum()
                print(f"Total Contributions (Column G '{col_g_name}' sum): {total_contributions}")
                print(f"Sample values: {df_full[col_g_name].dropna().head(10).tolist()}")
        
        if col_h_info:
            col_h_name = col_h_info[1]
            if col_h_name in df_full.columns:
                total_outstanding = df_full[col_h_name].sum()
                print(f"Total Outstanding Contributions (Column H '{col_h_name}' sum): {total_outstanding}")
                print(f"Sample values: {df_full[col_h_name].dropna().head(10).tolist()}")
        
        if col_l_info:
            col_l_name = col_l_info[1]
            if col_l_name in df_full.columns:
                total_penalties = df_full[col_l_name].sum()
                print(f"Total Penalties (Column L '{col_l_name}' sum): {total_penalties}")
                print(f"Sample values: {df_full[col_l_name].dropna().head(10).tolist()}")
        
        if col_h_info and col_l_info:
            if col_h_name in df_full.columns and col_l_name in df_full.columns:
                total_outstanding_with_penalties = total_outstanding + total_penalties
                print(f"Total Outstanding + Penalties: {total_outstanding_with_penalties}")
        
        # Look for member number column
        print("\nLooking for member identifier column:")
        for i, col in enumerate(df_full.columns):
            col_str = str(col).lower()
            if 'member' in col_str or 'name' in col_str or 'surname' in col_str:
                print(f"  Column {i} ({chr(65+i)}): {col}")
                print(f"    Sample values: {df_full[col].head(10).tolist()}")
        
        # Show first few rows of data
        print("\nFirst 5 rows of data:")
        print(df_full.head())
        
    else:
        print("No sheets found with the required columns G, H, L.")
        print("\nChecking all sheets for any financial data:")
        
        for sheet_name in xl.sheet_names:
            try:
                df = xl.parse(sheet_name, nrows=3)
                print(f"\nSheet: {sheet_name}")
                print(f"  Columns: {list(df.columns)}")
            except:
                pass
    
except Exception as e:
    print(f"Error analyzing Excel file: {e}")
    import traceback
    traceback.print_exc()