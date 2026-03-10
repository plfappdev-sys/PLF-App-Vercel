import pandas as pd

def debug_excel_structure():
    print("Debugging Excel file structure...")
    
    excel_path = "NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"
    
    try:
        # Read the 2024-2025 sheet
        df = pd.read_excel(excel_path, sheet_name='2024-2025')
        print(f"Excel sheet loaded. Shape: {df.shape}")
        print(f"Columns: {list(df.columns)}")
        
        print("\nFirst 10 rows of data:")
        for i in range(min(10, len(df))):
            row = df.iloc[i]
            print(f"\nRow {i}:")
            for col in df.columns[:5]:  # First 5 columns
                print(f"  {col}: {row[col]}")
        
        # Find the actual member names column
        print("\n" + "="*80)
        print("Looking for member names...")
        
        for col in df.columns:
            col_str = str(col).lower()
            if 'member' in col_str:
                print(f"\nColumn '{col}' (type: {df[col].dtype}):")
                unique_values = df[col].dropna().unique()
                print(f"  First 10 unique values: {unique_values[:10]}")
                print(f"  Total unique values: {len(unique_values)}")
        
        # Find Column BL and BK
        print("\n" + "="*80)
        print("Looking for contribution columns...")
        
        for col in df.columns:
            col_str = str(col).lower()
            if 'total contribution' in col_str:
                print(f"\nColumn '{col}' (type: {df[col].dtype}):")
                print(f"  Sum: {df[col].sum()}")
                print(f"  Non-null count: {df[col].count()}")
                print(f"  First 5 values: {df[col].head().tolist()}")
        
        # Check if there's a member number column
        print("\n" + "="*80)
        print("Looking for member numbers...")
        
        for col in df.columns:
            col_str = str(col).lower()
            if 'no' in col_str or 'number' in col_str or '#' in col_str:
                print(f"\nColumn '{col}' (type: {df[col].dtype}):")
                print(f"  First 10 values: {df[col].head(10).tolist()}")
        
    except Exception as e:
        print(f"ERROR: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    debug_excel_structure()