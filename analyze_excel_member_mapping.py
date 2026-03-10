import pandas as pd
import os
from supabase import create_client
from dotenv import load_dotenv
import json

load_dotenv()
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def analyze_excel_member_data():
    """Analyze Excel member data and try to map to database members"""
    excel_path = r"C:\Projects\Test\September\V5\PLF-App-Clean\NewBusLogic\Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"
    
    print(f'Reading Excel file: {excel_path}')
    
    # Read all sheets to understand the data
    try:
        # Get sheet names
        xls = pd.ExcelFile(excel_path)
        sheet_names = xls.sheet_names
        print(f'Sheet names: {sheet_names}')
        
        # Read the 2024-2025 sheet
        df_2024 = pd.read_excel(excel_path, sheet_name='2024-2025')
        print(f'\n=== 2024-2025 Sheet Analysis ===')
        print(f'Shape: {df_2024.shape}')
        print(f'Columns: {list(df_2024.columns)}')
        
        # Show member names
        print(f'\nFirst 20 member names from Excel:')
        for i, name in enumerate(df_2024.iloc[:20, 0]):
            print(f'{i+1}. {name}')
        
        # Get all members from database
        response = supabase.table('members').select('member_number, name, join_date').execute()
        db_members = response.data
        print(f'\n=== Database Members ===')
        print(f'Total members in DB: {len(db_members)}')
        
        # Show first 20 database members
        print(f'\nFirst 20 database members:')
        for i, member in enumerate(db_members[:20]):
            print(f'{i+1}. {member["member_number"]} - {member["name"]}')
        
        # Try to find matches
        print(f'\n=== Trying to Match Members ===')
        matches = []
        no_matches = []
        
        for excel_name in df_2024.iloc[:50, 0]:  # Check first 50 Excel names
            if pd.isna(excel_name):
                continue
                
            excel_name_str = str(excel_name).strip()
            found = False
            
            for db_member in db_members:
                db_name = db_member['name'].strip() if db_member['name'] else ''
                
                # Simple matching - check if names are similar
                if excel_name_str.lower() == db_name.lower():
                    matches.append({
                        'excel_name': excel_name_str,
                        'db_name': db_name,
                        'member_number': db_member['member_number'],
                        'join_date': db_member['join_date']
                    })
                    found = True
                    break
                # Check for partial matches
                elif excel_name_str.lower() in db_name.lower() or db_name.lower() in excel_name_str.lower():
                    matches.append({
                        'excel_name': excel_name_str,
                        'db_name': db_name,
                        'member_number': db_member['member_number'],
                        'join_date': db_member['join_date'],
                        'partial_match': True
                    })
                    found = True
                    break
            
            if not found:
                no_matches.append(excel_name_str)
        
        print(f'\nFound {len(matches)} matches:')
        for match in matches[:20]:
            partial = ' (partial)' if match.get('partial_match') else ''
            print(f"Excel: {match['excel_name']} -> DB: {match['member_number']} - {match['db_name']}{partial}")
        
        print(f'\n{len(no_matches)} names not matched:')
        for name in no_matches[:20]:
            print(f'  {name}')
        
        # Check other sheets
        print(f'\n=== Checking Other Sheets ===')
        for sheet_name in ['2018-2019', '2019-2020', '2020-2021', '2021-2022', '2022-2023', '2023-2024']:
            if sheet_name in sheet_names:
                try:
                    df_sheet = pd.read_excel(excel_path, sheet_name=sheet_name)
                    print(f'{sheet_name}: {df_sheet.shape[0]} rows, {df_sheet.shape[1]} columns')
                    
                    # Check if it has member names
                    if df_sheet.shape[1] > 0:
                        first_col_name = df_sheet.columns[0]
                        print(f'  First column: {first_col_name}')
                        
                        # Show sample member names
                        sample_names = []
                        for name in df_sheet.iloc[:5, 0]:
                            if pd.notna(name):
                                sample_names.append(str(name).strip())
                        if sample_names:
                            print(f'  Sample names: {sample_names}')
                except Exception as e:
                    print(f'{sheet_name}: Error - {str(e)}')
        
        return matches, no_matches
        
    except Exception as e:
        print(f'Error analyzing Excel file: {str(e)}')
        return [], []

def create_member_mapping():
    """Create a mapping file between Excel names and database member numbers"""
    print('\n=== Creating Member Mapping ===')
    
    # Get all database members
    response = supabase.table('members').select('member_number, name').execute()
    db_members = response.data
    
    # Read Excel names
    excel_path = r"C:\Projects\Test\September\V5\PLF-App-Clean\NewBusLogic\Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"
    df_2024 = pd.read_excel(excel_path, sheet_name='2024-2025')
    
    mapping = []
    
    for idx, row in df_2024.iterrows():
        excel_name = row.iloc[0] if pd.notna(row.iloc[0]) else None
        join_date = row.iloc[1] if len(row) > 1 and pd.notna(row.iloc[1]) else None
        
        if excel_name:
            excel_name_str = str(excel_name).strip()
            
            # Try to find matching database member
            best_match = None
            best_score = 0
            
            for db_member in db_members:
                db_name = db_member['name'].strip() if db_member['name'] else ''
                
                # Calculate similarity score
                score = 0
                
                # Exact match
                if excel_name_str.lower() == db_name.lower():
                    score = 100
                # Contains match
                elif excel_name_str.lower() in db_name.lower() or db_name.lower() in excel_name_str.lower():
                    score = 50
                # Word overlap
                else:
                    excel_words = set(excel_name_str.lower().split())
                    db_words = set(db_name.lower().split())
                    overlap = len(excel_words.intersection(db_words))
                    if overlap > 0:
                        score = overlap * 10
                
                if score > best_score:
                    best_score = score
                    best_match = db_member
            
            mapping.append({
                'excel_name': excel_name_str,
                'join_date': join_date,
                'matched_member_number': best_match['member_number'] if best_match else None,
                'matched_db_name': best_match['name'] if best_match else None,
                'match_score': best_score
            })
    
    # Save mapping to file
    mapping_df = pd.DataFrame(mapping)
    mapping_file = 'excel_to_db_member_mapping.csv'
    mapping_df.to_csv(mapping_file, index=False)
    print(f'Saved mapping to {mapping_file}')
    
    # Show statistics
    matched = mapping_df[mapping_df['match_score'] >= 50]
    partial = mapping_df[(mapping_df['match_score'] > 0) & (mapping_df['match_score'] < 50)]
    unmatched = mapping_df[mapping_df['match_score'] == 0]
    
    print(f'\nMapping Statistics:')
    print(f'Total Excel members: {len(mapping_df)}')
    print(f'Good matches (score >= 50): {len(matched)}')
    print(f'Partial matches: {len(partial)}')
    print(f'Unmatched: {len(unmatched)}')
    
    # Show some examples
    print(f'\nSample good matches:')
    for _, row in matched.head(10).iterrows():
        print(f"Excel: {row['excel_name']} -> DB: {row['matched_member_number']} - {row['matched_db_name']} (score: {row['match_score']})")
    
    if len(unmatched) > 0:
        print(f'\nSample unmatched:')
        for _, row in unmatched.head(10).iterrows():
            print(f"Excel: {row['excel_name']}")
    
    return mapping_df

if __name__ == '__main__':
    print('=== Excel Member Mapping Analysis ===\n')
    
    # First analyze the data
    matches, no_matches = analyze_excel_member_data()
    
    # Ask if user wants to create mapping
    choice = input('\nCreate member mapping file? (yes/no): ').strip().lower()
    if choice == 'yes':
        create_member_mapping()
    else:
        print('Skipping mapping creation.')