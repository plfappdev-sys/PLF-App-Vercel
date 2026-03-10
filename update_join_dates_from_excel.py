import os
import pandas as pd
from supabase import create_client
from dotenv import load_dotenv
import json
from datetime import datetime

load_dotenv()
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def load_member_mapping():
    """Load member mapping from CSV file"""
    mapping_file = 'excel_to_db_member_mapping.csv'
    if os.path.exists(mapping_file):
        df = pd.read_csv(mapping_file)
        print(f'Loaded mapping from {mapping_file}: {len(df)} entries')
        return df
    else:
        print(f'Mapping file {mapping_file} not found')
        return None

def read_excel_join_dates():
    """Read join dates from Excel file"""
    excel_path = r"C:\Projects\Test\September\V5\PLF-App-Clean\NewBusLogic\Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"
    
    print(f'Reading Excel file: {excel_path}')
    
    # Read the 2024-2025 sheet
    try:
        df = pd.read_excel(excel_path, sheet_name='2024-2025')
        print(f'Successfully read sheet "2024-2025"')
        print(f'Sheet shape: {df.shape}')
        
        # Create a dictionary of member names to join dates
        excel_data = {}
        for idx, row in df.iterrows():
            if len(row) >= 2:
                member_name = str(row.iloc[0]).strip() if pd.notna(row.iloc[0]) else None
                join_date = row.iloc[1] if pd.notna(row.iloc[1]) else None
                
                if member_name:
                    excel_data[member_name] = join_date
        
        print(f'Found {len(excel_data)} members in Excel with join dates')
        return excel_data
    except Exception as e:
        print(f'Error reading Excel file: {str(e)}')
        return None

def check_join_date_discrepancies():
    """Check join dates between Excel and database using mapping"""
    print('=== Checking join date discrepancies between Excel and Database ===\n')
    
    # Load mapping
    mapping_df = load_member_mapping()
    if mapping_df is None:
        return
    
    # Read Excel data
    excel_data = read_excel_join_dates()
    if excel_data is None:
        return
    
    # Get all members from database
    try:
        response = supabase.table('members').select('member_number, name, join_date').execute()
        db_members = response.data
        print(f'Found {len(db_members)} members in database')
    except Exception as e:
        print(f'Error fetching members from database: {str(e)}')
        return
    
    # Create mapping dictionary
    mapping_dict = {}
    for _, row in mapping_df.iterrows():
        excel_name = row['excel_name']
        member_number = row['matched_member_number']
        if pd.notna(member_number):
            mapping_dict[excel_name] = member_number
    
    # Check discrepancies
    discrepancies = []
    for member in db_members:
        member_number = member['member_number']
        db_join_date = member['join_date']
        name = member['name']
        
        # Find Excel name for this member number
        excel_name = None
        for excel_n, mem_num in mapping_dict.items():
            if mem_num == member_number:
                excel_name = excel_n
                break
        
        if excel_name and excel_name in excel_data:
            excel_join_date = excel_data[excel_name]
            
            # Convert Excel date to string for comparison
            if isinstance(excel_join_date, pd.Timestamp):
                excel_join_date_str = excel_join_date.strftime('%Y-%m-%d')
            elif pd.isna(excel_join_date):
                excel_join_date_str = None
            else:
                # Try to parse date string (format: dd/mm/yyyy)
                try:
                    # Handle different date formats
                    date_str = str(excel_join_date)
                    if '/' in date_str:
                        day, month, year = date_str.split('/')
                        excel_join_date_str = f'{year}-{month.zfill(2)}-{day.zfill(2)}'
                    else:
                        excel_join_date_str = date_str
                except:
                    excel_join_date_str = str(excel_join_date)
            
            # Convert DB date to string for comparison
            if db_join_date:
                # Parse the ISO format date
                try:
                    db_date = datetime.fromisoformat(db_join_date.replace('Z', '+00:00'))
                    db_join_date_str = db_date.strftime('%Y-%m-%d')
                except:
                    db_join_date_str = str(db_join_date)
            else:
                db_join_date_str = None
            
            # Check if dates match
            if excel_join_date_str != db_join_date_str:
                discrepancies.append({
                    'member_number': member_number,
                    'name': name,
                    'excel_name': excel_name,
                    'excel_join_date': excel_join_date_str,
                    'db_join_date': db_join_date_str,
                    'match': False
                })
            else:
                discrepancies.append({
                    'member_number': member_number,
                    'name': name,
                    'excel_name': excel_name,
                    'excel_join_date': excel_join_date_str,
                    'db_join_date': db_join_date_str,
                    'match': True
                })
        else:
            discrepancies.append({
                'member_number': member_number,
                'name': name,
                'excel_name': 'NOT FOUND IN EXCEL' if not excel_name else excel_name,
                'excel_join_date': 'NOT FOUND',
                'db_join_date': db_join_date,
                'match': False
            })
    
    # Print results
    print(f'\n=== Join Date Comparison Results ===')
    print(f'Total members checked: {len(discrepancies)}')
    
    mismatches = [d for d in discrepancies if not d['match']]
    matches = [d for d in discrepancies if d['match']]
    
    print(f'Matches: {len(matches)}')
    print(f'Mismatches: {len(mismatches)}')
    
    if mismatches:
        print('\n=== Mismatches Found ===')
        for mismatch in mismatches[:20]:  # Show first 20 mismatches
            print(f"Member: {mismatch['member_number']} - {mismatch['name']}")
            print(f"  Excel name: {mismatch['excel_name']}")
            print(f"  Excel join date: {mismatch['excel_join_date']}")
            print(f"  DB join date: {mismatch['db_join_date']}")
            print()
        
        if len(mismatches) > 20:
            print(f'... and {len(mismatches) - 20} more mismatches')
    
    # Show some matches as well
    if matches:
        print('\n=== Sample Matches ===')
        for match in matches[:5]:
            print(f"Member: {match['member_number']} - {match['name']}")
            print(f"  Excel/DB: {match['excel_join_date']}")
            print()
    
    return discrepancies

def update_member_join_dates_from_excel():
    """Update member join dates in database from Excel"""
    print('=== Updating member join dates from Excel ===\n')
    
    # Load mapping
    mapping_df = load_member_mapping()
    if mapping_df is None:
        return
    
    # Read Excel data
    excel_data = read_excel_join_dates()
    if excel_data is None:
        return
    
    # Create mapping dictionary
    mapping_dict = {}
    for _, row in mapping_df.iterrows():
        excel_name = row['excel_name']
        member_number = row['matched_member_number']
        if pd.notna(member_number):
            mapping_dict[excel_name] = member_number
    
    # Update database
    updated_count = 0
    error_count = 0
    skipped_count = 0
    
    for excel_name, member_number in mapping_dict.items():
        if excel_name in excel_data:
            excel_join_date = excel_data[excel_name]
            
            if pd.isna(excel_join_date):
                print(f'⚠ Skipping {member_number} - {excel_name}: No join date in Excel')
                skipped_count += 1
                continue
            
            # Convert Excel date to ISO format
            try:
                if isinstance(excel_join_date, pd.Timestamp):
                    # Excel Timestamp object
                    join_date_iso = excel_join_date.strftime('%Y-%m-%dT%H:%M:%S+00:00')
                else:
                    # String date (format: dd/mm/yyyy)
                    date_str = str(excel_join_date)
                    if '/' in date_str:
                        day, month, year = date_str.split('/')
                        # Create ISO format date
                        join_date_iso = f'{year}-{month.zfill(2)}-{day.zfill(2)}T00:00:00+00:00'
                    else:
                        # Try to parse as date
                        dt = pd.to_datetime(date_str, dayfirst=True)
                        join_date_iso = dt.strftime('%Y-%m-%dT%H:%M:%S+00:00')
                
                # Update the member's join_date
                response = supabase.table('members').update({
                    'join_date': join_date_iso
                }).eq('member_number', member_number).execute()
                
                if response.data:
                    print(f'✓ Updated {member_number} - {excel_name}: {join_date_iso}')
                    updated_count += 1
                else:
                    print(f'✗ Member {member_number} not found in database')
                    error_count += 1
                    
            except Exception as e:
                print(f'✗ Error updating {member_number} - {excel_name}: {str(e)}')
                error_count += 1
        else:
            print(f'✗ {excel_name} not found in Excel data')
            error_count += 1
    
    print(f'\n=== Update Summary ===')
    print(f'Successfully updated: {updated_count}')
    print(f'Skipped (no date): {skipped_count}')
    print(f'Errors: {error_count}')

def check_all_sheets_for_data():
    """Check all sheets in the Excel file to understand data structure"""
    print('=== Checking All Excel Sheets ===\n')
    
    excel_path = r"C:\Projects\Test\September\V5\PLF-App-Clean\NewBusLogic\Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"
    
    try:
        xls = pd.ExcelFile(excel_path)
        sheet_names = xls.sheet_names
        
        # Sheets mentioned in the instructions
        target_sheets = ['2018-2019', '2019-2020', '2020-2021', '2021-2022', '2022-2023', '2023-2024', '2024-2025']
        
        for sheet_name in target_sheets:
            if sheet_name in sheet_names:
                try:
                    df = pd.read_excel(excel_path, sheet_name=sheet_name)
                    print(f'{sheet_name}: {df.shape[0]} rows, {df.shape[1]} columns')
                    
                    # Check for total contributions column (Column G according to instructions)
                    if df.shape[1] >= 7:
                        col_g_name = df.columns[6] if len(df.columns) > 6 else 'N/A'
                        print(f'  Column G (index 6): {col_g_name}')
                        
                        # Show sample values
                        sample_values = []
                        for val in df.iloc[:5, 6]:
                            if pd.notna(val):
                                sample_values.append(val)
                        if sample_values:
                            print(f'  Sample values: {sample_values[:3]}')
                    
                    # Check for member names column
                    if df.shape[1] >= 1:
                        col_a_name = df.columns[0]
                        print(f'  Column A (index 0): {col_a_name}')
                        
                        # Count unique members
                        unique_members = df.iloc[:, 0].dropna().nunique()
                        print(f'  Unique members: {unique_members}')
                        
                except Exception as e:
                    print(f'{sheet_name}: Error - {str(e)}')
            else:
                print(f'{sheet_name}: Sheet not found')
        
        # Also check for "Total Contribution for  7 Years (2018-24)" column in 2024-2025 sheet
        print(f'\n=== Checking 2024-2025 Sheet for Total Contributions ===')
        df_2024 = pd.read_excel(excel_path, sheet_name='2024-2025')
        
        # Find the column for total contributions for 7 years
        total_contrib_col = None
        for col in df_2024.columns:
            if 'Total Contribution for  7 Years' in str(col):
                total_contrib_col = col
                break
        
        if total_contrib_col:
            print(f'Found total contributions column: {total_contrib_col}')
            
            # Calculate total of all members
            total_sum = df_2024[total_contrib_col].sum()
            print(f'Total contributions for all members (7 years): R{total_sum:,.2f}')
            
            # Show sample values
            print(f'\nSample member contributions:')
            for i in range(min(5, len(df_2024))):
                member_name = df_2024.iloc[i, 0]
                contrib = df_2024.iloc[i][total_contrib_col]
                if pd.notna(member_name) and pd.notna(contrib):
                    print(f'  {member_name}: R{contrib:,.2f}')
        else:
            print('Total contributions column not found')
            
    except Exception as e:
        print(f'Error checking sheets: {str(e)}')

if __name__ == '__main__':
    print('=== Excel Join Date Update Tool ===\n')
    
    print('1. Check join date discrepancies')
    print('2. Update join dates from Excel')
    print('3. Check all Excel sheets for data')
    print('4. Run all checks and updates')
    
    choice = input('\nEnter choice (1-4): ').strip()
    
    if choice == '1':
        check_join_date_discrepancies()
    elif choice == '2':
        confirm = input('Are you sure you want to update join dates from Excel? (yes/no): ').strip().lower()
        if confirm == 'yes':
            update_member_join_dates_from_excel()
        else:
            print('Update cancelled.')
    elif choice == '3':
        check_all_sheets_for_data()
    elif choice == '4':
        print('\n=== Running All Checks ===')
        check_join_date_discrepancies()
        print('\n=== Checking Excel Sheets ===')
        check_all_sheets_for_data()
        
        confirm = input('\nDo you want to update join dates from Excel? (yes/no): ').strip().lower()
        if confirm == 'yes':
            update_member_join_dates_from_excel()
    else:
        print('Invalid choice. Exiting.')