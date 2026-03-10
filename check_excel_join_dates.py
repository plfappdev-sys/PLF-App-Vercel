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

def read_excel_join_dates():
    """Read join dates from Excel file"""
    excel_path = r"C:\Projects\Test\September\V5\PLF-App-Clean\NewBusLogic\Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"
    
    print(f'Reading Excel file: {excel_path}')
    
    # Read the 2024-2025 sheet (as mentioned in the instructions)
    try:
        df = pd.read_excel(excel_path, sheet_name='2024-2025')
        print(f'Successfully read sheet "2024-2025"')
        print(f'Sheet shape: {df.shape}')
        print(f'Columns: {list(df.columns)}')
        
        # Display first few rows to understand structure
        print('\nFirst 10 rows of the sheet:')
        print(df.head(10))
        
        # Check for join dates - column B according to instructions
        if len(df.columns) >= 2:
            print(f'\nColumn B (index 1) name: {df.columns[1]}')
            print(f'\nSample values from column B:')
            print(df.iloc[:10, 1])
        
        return df
    except Exception as e:
        print(f'Error reading Excel file: {str(e)}')
        return None

def check_join_date_discrepancies():
    """Check join dates between Excel and database"""
    print('=== Checking join date discrepancies between Excel and Database ===\n')
    
    # Read Excel data
    df = read_excel_join_dates()
    if df is None:
        return
    
    # Get all members from database
    try:
        response = supabase.table('members').select('member_number, name, join_date, financial_info').execute()
        db_members = response.data
        print(f'Found {len(db_members)} members in database')
    except Exception as e:
        print(f'Error fetching members from database: {str(e)}')
        return
    
    # Create a mapping of member numbers to Excel data
    # Assuming member numbers are in column A (index 0)
    excel_member_map = {}
    for idx, row in df.iterrows():
        if len(row) >= 2:
            member_number = str(row.iloc[0]).strip() if pd.notna(row.iloc[0]) else None
            join_date = row.iloc[1] if pd.notna(row.iloc[1]) else None
            
            if member_number and isinstance(member_number, str) and member_number.startswith('M'):
                excel_member_map[member_number] = join_date
    
    print(f'\nFound {len(excel_member_map)} members in Excel sheet')
    
    # Check discrepancies
    discrepancies = []
    for member in db_members:
        member_number = member['member_number']
        db_join_date = member['join_date']
        name = member['name']
        
        if member_number in excel_member_map:
            excel_join_date = excel_member_map[member_number]
            
            # Convert Excel date to string for comparison
            if isinstance(excel_join_date, pd.Timestamp):
                excel_join_date_str = excel_join_date.strftime('%Y-%m-%d')
            elif pd.isna(excel_join_date):
                excel_join_date_str = None
            else:
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
                    'excel_join_date': excel_join_date_str,
                    'db_join_date': db_join_date_str,
                    'match': False
                })
            else:
                discrepancies.append({
                    'member_number': member_number,
                    'name': name,
                    'excel_join_date': excel_join_date_str,
                    'db_join_date': db_join_date_str,
                    'match': True
                })
        else:
            discrepancies.append({
                'member_number': member_number,
                'name': name,
                'excel_join_date': 'NOT FOUND IN EXCEL',
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
            print(f"  Excel: {mismatch['excel_join_date']}")
            print(f"  DB:    {mismatch['db_join_date']}")
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

def update_member_join_dates_from_excel():
    """Update member join dates in database from Excel"""
    print('=== Updating member join dates from Excel ===\n')
    
    # Read Excel data
    df = read_excel_join_dates()
    if df is None:
        return
    
    # Create mapping of member numbers to Excel join dates
    excel_member_map = {}
    for idx, row in df.iterrows():
        if len(row) >= 2:
            member_number = str(row.iloc[0]).strip() if pd.notna(row.iloc[0]) else None
            join_date = row.iloc[1] if pd.notna(row.iloc[1]) else None
            
            if member_number and isinstance(member_number, str) and member_number.startswith('M'):
                # Convert Excel date to ISO format
                if isinstance(join_date, pd.Timestamp):
                    # Excel dates might be datetime objects
                    join_date_iso = join_date.strftime('%Y-%m-%dT%H:%M:%S+00:00')
                elif pd.isna(join_date):
                    join_date_iso = None
                else:
                    # Try to parse as date string
                    try:
                        dt = pd.to_datetime(join_date)
                        join_date_iso = dt.strftime('%Y-%m-%dT%H:%M:%S+00:00')
                    except:
                        join_date_iso = str(join_date)
                
                excel_member_map[member_number] = join_date_iso
    
    print(f'Found {len(excel_member_map)} members in Excel with join dates')
    
    # Update database
    updated_count = 0
    error_count = 0
    
    for member_number, join_date in list(excel_member_map.items())[:50]:  # Limit to first 50 for testing
        if join_date:
            try:
                # Update the member's join_date
                response = supabase.table('members').update({
                    'join_date': join_date
                }).eq('member_number', member_number).execute()
                
                if response.data:
                    print(f'✓ Updated {member_number}: {join_date}')
                    updated_count += 1
                else:
                    print(f'✗ Member {member_number} not found in database')
                    error_count += 1
                    
            except Exception as e:
                print(f'✗ Error updating {member_number}: {str(e)}')
                error_count += 1
    
    print(f'\n=== Update Summary ===')
    print(f'Successfully updated: {updated_count}')
    print(f'Errors: {error_count}')

if __name__ == '__main__':
    print('=== Excel Join Date Checker ===\n')
    
    # First check discrepancies
    check_join_date_discrepancies()
    
    # Ask user if they want to update
    print('\n=== Options ===')
    print('1. Check discrepancies only (already done)')
    print('2. Update join dates from Excel')
    
    choice = input('\nEnter choice (1 or 2): ').strip()
    
    if choice == '2':
        confirm = input('Are you sure you want to update join dates from Excel? (yes/no): ').strip().lower()
        if confirm == 'yes':
            update_member_join_dates_from_excel()
        else:
            print('Update cancelled.')
    else:
        print('Exiting without updates.')