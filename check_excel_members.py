import pandas as pd
import json

try:
    # Read the Excel file
    excel_file = 'NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx'
    df = pd.read_excel(excel_file, sheet_name='2024-2025')
    
    print('Excel file loaded successfully')
    print(f'Shape: {df.shape}')
    
    # Look for member-related columns
    member_cols = [col for col in df.columns if 'member' in str(col).lower()]
    print(f'\nMember-related columns: {member_cols}')
    
    # Show first few rows of member data
    if member_cols:
        member_col = member_cols[0]
        print(f'\nFirst 10 values from column "{member_col}":')
        for i, val in enumerate(df[member_col].head(10)):
            print(f'  {i+1}. {val}')
    
    # Also check for any columns that might contain member numbers
    print('\nAll columns in Excel:')
    for i, col in enumerate(df.columns):
        print(f'  {i+1}. {col}')
        
except Exception as e:
    print(f'Error: {e}')