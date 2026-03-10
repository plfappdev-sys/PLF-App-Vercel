import os
import pandas as pd
from supabase import create_client
from dotenv import load_dotenv
import json
from datetime import datetime
import re

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

def clean_date_string(date_str):
    """Clean date string by removing extra spaces and normalizing format"""
    if pd.isna(date_str):
        return None
    
    # Convert to string
    date_str = str(date_str)
    
    # Remove extra spaces
    date_str = date_str.strip()
    
    # Replace multiple spaces with single space
    date_str = re.sub(r'\s+', ' ', date_str)
    
    # Fix dates with spaces between parts (e.g., "2018-10- 14" -> "2018-10-14")
    date_str = re.sub(r'(\d{4})-(\d{1,2})-\s*(\d{1,2})', r'\1-\2-\3', date_str)
    date_str = re.sub(r'(\d{4})-\s*(\d{1,2})-(\d{1,2})', r'\1-\2-\3', date_str)
    date_str = re.sub(r'(\d{4})-\s*(\d{1,2})-\s*(\d{1,2})', r'\1-\2-\3', date_str)
    
    # Fix dates with spaces in day part (e.g., "2018-07-  3" -> "2018-07-03")
    date_str = re.sub(r'-(\s*\d{1,2})$', lambda m: '-' + m.group(1).strip().zfill(2), date_str)
    
    # Handle dd/mm/yyyy format
    if '/' in date_str:
        parts = date_str.split('/')
        if len(parts) == 3:
            day, month, year = parts
            # Ensure 4-digit year
            if len(year) == 2:
                year = '20' + year
            # Pad day and month with zeros
            day = day.strip().zfill(2)
            month = month.strip().zfill(2)
            return f'{year}-{month}-{day}'
    
    # Handle yyyy-mm-dd format with spaces
    if '-' in date_str:
        parts = date_str.split('-')
        if len(parts) == 3:
            year, month, day = parts
            year = year.strip()
            month = month.strip().zfill(2)
            day = day.strip().zfill(2)
            return f'{year}-{month}-{day}'
    
    return date_str

def update_member_join_dates_fixed():
    """Update member join dates in database from Excel with fixed date parsing"""
    print('=== Updating member join dates from Excel (Fixed) ===\n')
    
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
            
            # Clean and parse the date
            try:
                # Handle different date formats
                if isinstance(excel_join_date, pd.Timestamp):
                    # Excel Timestamp object
                    join_date_iso = excel_join_date.strftime('%Y-%m-%dT%H:%M:%S+00:00')
                else:
                    # String date - clean it first
                    date_str = str(excel_join_date)
                    cleaned_date = clean_date_string(date_str)
                    
                    # Try to parse the cleaned date
                    try:
                        # Try parsing as ISO format
                        dt = pd.to_datetime(cleaned_date)
                    except:
                        # Try with dayfirst=True for dd/mm/yyyy format
                        dt = pd.to_datetime(cleaned_date, dayfirst=True, errors='coerce')
                    
                    if pd.isna(dt):
                        print(f'✗ Cannot parse date for {member_number} - {excel_name}: {date_str} (cleaned: {cleaned_date})')
                        error_count += 1
                        continue
                    
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

def verify_updated_join_dates():
    """Verify that join dates have been updated correctly"""
    print('=== Verifying Updated Join Dates ===\n')
    
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
    
    # Get all members from database
    try:
        response = supabase.table('members').select('member_number, name, join_date').execute()
        db_members = response.data
        print(f'Found {len(db_members)} members in database')
    except Exception as e:
        print(f'Error fetching members from database: {str(e)}')
        return
    
    # Check each member
    verified_count = 0
    mismatch_count = 0
    
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
            
            if pd.isna(excel_join_date):
                # No join date in Excel
                if db_join_date:
                    print(f'⚠ {member_number} - {name}: Has DB date but no Excel date')
                continue
            
            # Clean Excel date for comparison
            if isinstance(excel_join_date, pd.Timestamp):
                excel_date_str = excel_join_date.strftime('%Y-%m-%d')
            else:
                cleaned_date = clean_date_string(str(excel_join_date))
                try:
                    dt = pd.to_datetime(cleaned_date, errors='coerce')
                    if pd.isna(dt):
                        excel_date_str = 'INVALID'
                    else:
                        excel_date_str = dt.strftime('%Y-%m-%d')
                except:
                    excel_date_str = 'INVALID'
            
            # Get DB date string
            if db_join_date:
                try:
                    db_date = datetime.fromisoformat(db_join_date.replace('Z', '+00:00'))
                    db_date_str = db_date.strftime('%Y-%m-%d')
                except:
                    db_date_str = 'INVALID'
            else:
                db_date_str = None
            
            # Compare
            if excel_date_str != 'INVALID' and db_date_str == excel_date_str:
                verified_count += 1
            else:
                mismatch_count += 1
                print(f'❌ {member_number} - {name}')
                print(f'   Excel: {excel_date_str} (raw: {excel_join_date})')
                print(f'   DB:    {db_date_str}')
    
    print(f'\n=== Verification Summary ===')
    print(f'Verified matches: {verified_count}')
    print(f'Mismatches: {mismatch_count}')
    print(f'Total checked: {verified_count + mismatch_count}')

if __name__ == '__main__':
    print('=== Excel Join Date Fix Tool ===\n')
    
    print('1. Update join dates (fixed parsing)')
    print('2. Verify updated join dates')
    print('3. Run both update and verification')
    
    choice = input('\nEnter choice (1-3): ').strip()
    
    if choice == '1':
        confirm = input('Are you sure you want to update join dates from Excel? (yes/no): ').strip().lower()
        if confirm == 'yes':
            update_member_join_dates_fixed()
        else:
            print('Update cancelled.')
    elif choice == '2':
        verify_updated_join_dates()
    elif choice == '3':
        print('\n=== Updating Join Dates ===')
        update_member_join_dates_fixed()
        print('\n=== Verifying Updates ===')
        verify_updated_join_dates()
    else:
        print('Invalid choice. Exiting.')