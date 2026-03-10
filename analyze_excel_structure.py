import pandas as pd
import os

# Path to the Excel file
excel_path = r"NewBusLogic\Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"

print(f"Analyzing Excel file: {excel_path}")
print("=" * 80)

try:
    # Read the Excel file
    # First, let's see what sheets are available
    xl = pd.ExcelFile(excel_path)
    print(f"Available sheets: {xl.sheet_names}")
    
    # Read the first sheet (usually the main data)
    df = xl.parse(xl.sheet_names[0])
    
    print(f"\nSheet: {xl.sheet_names[0]}")
    print(f"Shape: {df.shape}")
    print(f"Columns: {list(df.columns)}")
    
    # Show first few rows
    print("\nFirst 5 rows:")
    print(df.head())
    
    # Show column names with indices
    print("\nColumn names with indices:")
    for i, col in enumerate(df.columns):
        print(f"Column {i}: {col}")
    
    # Check for specific columns mentioned in requirements
    # Column G: "Total Contribution for 12 Months"
    # Column H: "Outstanding Contributions"
    # Column L: "Penalties"
    
    print("\nLooking for specific columns mentioned in requirements:")
    print("- Column G (7th column, index 6): Should be 'Total Contribution for 12 Months'")
    print("- Column H (8th column, index 7): Should be 'Outstanding Contributions'")
    print("- Column L (12th column, index 11): Should be 'Penalties'")
    
    # Try to find these columns
    column_g = None
    column_h = None
    column_l = None
    
    for i, col in enumerate(df.columns):
        col_str = str(col).lower()
        if 'total' in col_str and 'contribution' in col_str and ('12' in col_str or 'twelve' in col_str):
            column_g = (i, col)
        elif 'outstanding' in col_str and 'contribution' in col_str:
            column_h = (i, col)
        elif 'penalty' in col_str or 'penalties' in col_str:
            column_l = (i, col)
    
    print("\nFound columns:")
    if column_g:
        print(f"Column G (Total Contribution for 12 Months): Index {column_g[0]}, Name: '{column_g[1]}'")
    else:
        print("Column G not found with expected name")
        
    if column_h:
        print(f"Column H (Outstanding Contributions): Index {column_h[0]}, Name: '{column_h[1]}'")
    else:
        print("Column H not found with expected name")
        
    if column_l:
        print(f"Column L (Penalties): Index {column_l[0]}, Name: '{column_l[1]}'")
    else:
        print("Column L not found with expected name")
    
    # Show sample data for these columns
    if column_g:
        print(f"\nSample data for '{column_g[1]}' (first 10 non-null values):")
        print(df[column_g[1]].dropna().head(10).tolist())
    
    if column_h:
        print(f"\nSample data for '{column_h[1]}' (first 10 non-null values):")
        print(df[column_h[1]].dropna().head(10).tolist())
    
    if column_l:
        print(f"\nSample data for '{column_l[1]}' (first 10 non-null values):")
        print(df[column_l[1]].dropna().head(10).tolist())
    
    # Calculate totals
    print("\nCalculating totals from Excel data:")
    if column_g:
        total_contributions = df[column_g[1]].sum()
        print(f"Total Contributions (Column G sum): {total_contributions}")
    
    if column_h:
        total_outstanding = df[column_h[1]].sum()
        print(f"Total Outstanding Contributions (Column H sum): {total_outstanding}")
    
    if column_l:
        total_penalties = df[column_l[1]].sum()
        print(f"Total Penalties (Column L sum): {total_penalties}")
    
    if column_h and column_l:
        total_outstanding_with_penalties = total_outstanding + total_penalties
        print(f"Total Outstanding + Penalties: {total_outstanding_with_penalties}")
    
    # Check for member number column
    print("\nLooking for member number column:")
    for i, col in enumerate(df.columns):
        col_str = str(col).lower()
        if 'member' in col_str and ('number' in col_str or 'no' in col_str or '#' in col_str):
            print(f"Possible member number column: Index {i}, Name: '{col}'")
            print(f"Sample values: {df[col].head(10).tolist()}")
    
except Exception as e:
    print(f"Error analyzing Excel file: {e}")
    import traceback
    traceback.print_exc()