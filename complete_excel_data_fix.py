import pandas as pd
import numpy as np
import os
from supabase import create_client, Client
from dotenv import load_dotenv
import json
from datetime import datetime

# Load environment variables
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

# Excel file path
EXCEL_FILE = r"NewBusLogic\Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"

def get_all_sheets_info():
    """Get information about all sheets in the Excel file"""
    print("Getting all sheet information...")
    
    try:
        xls = pd.ExcelFile(EXCEL_FILE)
        sheet_names = xls.sheet_names
        print(f"Total sheets: {len(sheet_names)}")
        
        sheet_info = {}
        for sheet in sheet_names:
            try:
                df = pd.read_excel(EXCEL_FILE, sheet_name=sheet, nrows=5)
                sheet_info[sheet] = {
                    'shape': df.shape,
                    'columns': list(df.columns),
                    'sample': df.head(2).to_dict('records')
                }
                print(f"\n{sheet}:")
                print(f"  Shape: {df.shape}")
                print(f"  First 2 columns: {list(df.columns)[:2]}")
            except Exception as e:
                print(f"  Error reading {sheet}: {e}")
                sheet_info[sheet] = {'error': str(e)}
        
        return sheet_info, sheet_names
        
    except Exception as e:
        print(f"Error reading Excel file: {e}")
        return {}, []

def find_financial_year_sheets(sheet_names):
    """Find sheets that contain financial year data"""
    print("\n\nFinding financial year sheets...")
    
    financial_year_patterns = [
        '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025',
        '2018-2019', '2019-2020', '2020-2021', '2021-2022', 
        '2022-2023', '2023-2024', '2024-2025'
    ]
    
    financial_sheets = []
    for sheet in sheet_names:
        sheet_lower = sheet.lower()
        for pattern in financial_year_patterns:
            if pattern in sheet_lower:
                financial_sheets.append(sheet)
                break
    
    print(f"Found {len(financial_sheets)} financial year sheets:")
    for sheet in financial_sheets:
        print(f"  - {sheet}")
    
    return financial_sheets

def extract_complete_member_data():
    """Extract complete member data from all relevant sheets"""
    print("\n\nExtracting complete member data...")
    
    xls = pd.ExcelFile(EXCEL_FILE)
    sheet_names = xls.sheet_names
    
    # Find financial year sheets
    financial_sheets = find_financial_year_sheets(sheet_names)
    
    all_members = {}
    
    for sheet in financial_sheets:
        try:
            print(f"\nProcessing {sheet}...")
            df = pd.read_excel(EXCEL_FILE, sheet_name=sheet)
            print(f"  Shape: {df.shape}")
            
            # Try to find member name column
            member_col = None
            for col in df.columns:
                if isinstance(col, str) and 'member' in col.lower():
                    member_col = col
                    break
            
            if member_col is None and len(df.columns) > 0:
                # Assume first column is member names
                member_col = df.columns[0]
            
            if member_col:
                print(f"  Using column '{member_col}' for member names")
                
                # Try to find total contributions column (Column G equivalent)
                total_contrib_col = None
                for col in df.columns:
                    if isinstance(col, str) and any(term in col.lower() for term in ['total', 'contribution', 'column g']):
                        total_contrib_col = col
                        break
                
                if total_contrib_col is None and len(df.columns) >= 7:
                    # Use column index 6 (Column G)
                    total_contrib_col = df.columns[6]
                
                if total_contrib_col:
                    print(f"  Using column '{total_contrib_col}' for total contributions")
                    
                    for idx, row in df.iterrows():
                        member_name = str(row[member_col]).strip() if pd.notna(row[member_col]) else ""
                        
                        if member_name and member_name not in ['', 'nan', 'NaN', 'None', 'Total', 'Grand Total']:
                            # Get total contributions
                            total_contributions = 0
                            try:
                                if pd.notna(row[total_contrib_col]):
                                    total_contributions = float(row[total_contrib_col])
                            except:
                                pass
                            
                            if member_name not in all_members:
                                all_members[member_name] = {
                                    'name': member_name,
                                    'contributions_by_year': {},
                                    'total_contributions': 0,
                                    'raw_data': {}
                                }
                            
                            # Store contributions for this year
                            all_members[member_name]['contributions_by_year'][sheet] = total_contributions
                            all_members[member_name]['total_contributions'] += total_contributions
                            
                            # Store raw data for debugging
                            all_members[member_name]['raw_data'][sheet] = {
                                'row_index': idx,
                                'contributions': total_contributions
                            }
            
            print(f"  Processed {len(df)} rows")
            
        except Exception as e:
            print(f"  Error processing {sheet}: {e}")
    
    print(f"\nTotal unique members found: {len(all_members)}")
    
    # Print summary
    print("\nMember contributions summary:")
    total_all_contributions = 0
    for member_name, data in list(all_members.items())[:20]:
        print(f"  {member_name[:30]:30} Total: {data['total_contributions']:10,.2f}")
        total_all_contributions += data['total_contributions']
    
    print(f"\nTotal contributions across all members: {total_all_contributions:,.2f}")
    
    return all_members

def update_database_with_excel_data(excel_members):
    """Update database with Excel data"""
    print("\n\nUpdating database with Excel data...")
    
    try:
        # Initialize Supabase client
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Get all existing members
        response = supabase.table('members').select('id, member_number, name, financial_info').execute()
        
        if hasattr(response, 'data'):
            db_members = response.data
        else:
            db_members = []
        
        print(f"Found {len(db_members)} members in database")
        
        # Create mapping of names to database members
        db_member_map = {}
        for member in db_members:
            name = member.get('name', '').strip()
            if name:
                db_member_map[name] = member
        
        # Update existing members
        updates_made = 0
        new_members_created = 0
        
        for excel_name, excel_data in excel_members.items():
            if excel_name in db_member_map:
                # Update existing member
                db_member = db_member_map[excel_name]
                member_id = db_member['id']
                
                # Get current financial info
                current_financial_info = db_member.get('financial_info', {})
                if isinstance(current_financial_info, str):
                    try:
                        current_financial_info = json.loads(current_financial_info)
                    except:
                        current_financial_info = {}
                
                # Update total contributions
                current_financial_info['total_contributions'] = excel_data['total_contributions']
                current_financial_info['contributions_by_year'] = excel_data['contributions_by_year']
                current_financial_info['last_updated'] = datetime.now().isoformat()
                current_financial_info['data_source'] = 'Excel Import 2025'
                
                # Update member in database
                update_response = supabase.table('members').update({
                    'financial_info': current_financial_info
                }).eq('id', member_id).execute()
                
                if hasattr(update_response, 'data'):
                    updates_made += 1
                    if updates_made % 10 == 0:
                        print(f"  Updated {updates_made} members...")
            
            else:
                # Create new member (we'll need to generate member number)
                print(f"  New member found: {excel_name}")
                new_members_created += 1
        
        print(f"\nUpdate summary:")
        print(f"  Members updated: {updates_made}")
        print(f"  New members to create: {new_members_created}")
        
        # Generate SQL for new members
        if new_members_created > 0:
            print(f"\nGenerating SQL for {new_members_created} new members...")
            generate_new_members_sql(excel_members, db_member_map)
        
        return updates_made, new_members_created
        
    except Exception as e:
        print(f"Error updating database: {e}")
        return 0, 0

def generate_new_members_sql(excel_members, db_member_map):
    """Generate SQL to insert new members"""
    print("\nGenerating SQL for new members...")
    
    sql_statements = []
    
    # Find the highest member number
    max_member_number = 0
    for member in db_member_map.values():
        member_number = member.get('member_number', '')
        if member_number and member_number.startswith('M'):
            try:
                num = int(member_number[1:])
                if num > max_member_number:
                    max_member_number = num
            except:
                pass
    
    print(f"Highest member number found: M{max_member_number:03d}")
    
    # Generate SQL for new members
    new_member_counter = 1
    for excel_name, excel_data in excel_members.items():
        if excel_name not in db_member_map:
            member_number = f"M{max_member_number + new_member_counter:03d}"
            
            financial_info = {
                'total_contributions': excel_data['total_contributions'],
                'contributions_by_year': excel_data['contributions_by_year'],
                'current_balance': 0,
                'outstanding_amount': 0,
                'last_updated': datetime.now().isoformat(),
                'data_source': 'Excel Import 2025'
            }
            
            # Estimate join date (use first financial year they appear in)
            join_date = '2018-07-01'  # Default
            if excel_data['contributions_by_year']:
                first_year = min(excel_data['contributions_by_year'].keys())
                if '2018' in first_year:
                    join_date = '2018-07-01'
                elif '2019' in first_year:
                    join_date = '2019-07-01'
                elif '2020' in first_year:
                    join_date = '2020-07-01'
                else:
                    join_date = '2021-07-01'
            
            sql = f"""
INSERT INTO members (member_number, name, join_date, financial_info, created_at, updated_at)
VALUES (
  '{member_number}',
  '{excel_name.replace("'", "''")}',
  '{join_date}',
  '{json.dumps(financial_info)}',
  NOW(),
  NOW()
);
"""
            sql_statements.append(sql)
            new_member_counter += 1
    
    # Save SQL to file
    if sql_statements:
        sql_file = 'new_members_insert.sql'
        with open(sql_file, 'w') as f:
            f.write("-- SQL to insert new members from Excel\n")
            f.write("-- Generated: " + datetime.now().isoformat() + "\n\n")
            for sql in sql_statements:
                f.write(sql + "\n")
        
        print(f"SQL saved to: {sql_file}")
        print(f"Total new members: {len(sql_statements)}")
    
    return sql_statements

def fix_existing_member_contributions():
    """Create a script to fix existing member contributions"""
    print("\n\nCreating fix script for existing members...")
    
    try:
        # Initialize Supabase client
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Get all members
        response = supabase.table('members').select('id, member_number, name, financial_info').execute()
        
        if hasattr(response, 'data'):
            db_members = response.data
        else:
            db_members = []
        
        print(f"Found {len(db_members)} members to check")
        
        # Create update script
        update_script = []
        
        for member in db_members:
            member_id = member['id']
            member_name = member.get('name', '').strip()
            financial_info = member.get('financial_info', {})
            
            if isinstance(financial_info, str):
                try:
                    financial_info = json.loads(financial_info)
                except:
                    financial_info = {}
            
            current_total = financial_info.get('total_contributions', 0)
            
            # Check if total_contributions is 0 but we have current_balance
            current_balance = financial_info.get('current_balance', 0)
            
            if current_total == 0 and current_balance > 0:
                # This member needs fixing
                print(f"  Member {member_name}: total_contributions=0, current_balance={current_balance}")
                
                # Create update
                update = {
                    'id': member_id,
                    'name': member_name,
                    'current_total': current_total,
                    'current_balance': current_balance,
                    'suggested_fix': f"Update total_contributions to at least {current_balance}"
                }
                update_script.append(update)
        
        # Save fix script
        if update_script:
            fix_file = 'member_contributions_fix.json'
            with open(fix_file, 'w') as f:
                json.dump(update_script, f, indent=2)
            
            print(f"\nFix script saved to: {fix_file}")
            print(f"Members needing fix: {len(update_script)}")
        
        return update_script
        
    except Exception as e:
        print(f"Error creating fix script: {e}")
        return []

def main():
    print("=" * 80)
    print("COMPLETE EXCEL DATA FIX IMPLEMENTATION")
    print("=" * 80)
    
    # Step 1: Analyze Excel structure
    sheet_info, sheet_names = get_all_sheets_info()
    
    # Step 2: Extract complete member data
    excel_members = extract_complete_member_data()
    
    # Step 3: Update database with Excel data
    updates_made, new_members_created = update_database_with_excel_data(excel_members)
    
    # Step 4: Create fix script for existing members
    fix_script = fix_existing_member_contributions()
    
    # Step 5: Generate summary report
    print("\n" + "=" * 80)
    print("IMPLEMENTATION SUMMARY")
    print("=" * 80)
    
    print(f"\n1. Excel Analysis:")
    print(f"   - Total sheets analyzed: {len(sheet_names)}")
    print(f"   - Unique members found: {len(excel_members)}")
    
    total_contributions = sum(m['total_contributions'] for m in excel_members.values())
    print(f"   - Total contributions in Excel: {total_contributions:,.2f}")
    
    print(f"\n2. Database Updates:")
    print(f"   - Members updated: {updates_made}")
    print(f"   - New members to create: {new_members_created}")
    
    print(f"\n3. Fix Script Generated:")
    print(f"   - Members needing contribution fixes: {len(fix_script)}")
    
    print(f"\n4. Next Steps:")
    print(f"   1. Run 'new_members_insert.sql' to add missing members")
    print(f"   2. Review 'member_contributions_fix.json' for manual fixes")
    print(f"   3. Verify app screens show correct data")
    
    # Save comprehensive report
    report_file = 'complete_data_fix_report.txt'
    with open(report_file, 'w') as f:
        f.write("COMPLETE EXCEL DATA FIX IMPLEMENTATION REPORT\n")
        f.write("=" * 60 + "\n\n")
        f.write(f"Report Date: {datetime.now().isoformat()}\n")
        f.write(f"Excel File: {EXCEL_FILE}\n\n")
        
        f.write("1. EXCEL ANALYSIS\n")
        f.write(f"   Total sheets: {len(sheet_names)}\n")
        f.write(f"   Unique members: {len(excel_members)}\n")
        f.write(f"   Total contributions: {total_contributions:,.2f}\n\n")
        
        f.write("2. DATABASE UPDATES\n")
        f.write(f"   Members updated: {updates_made}\n")
        f.write(f"   New members to create: {new_members_created}\n\n")
        
        f.write("3. FIXES NEEDED\n")
        f.write(f"   Members needing contribution fixes: {len(fix_script)}\n\n")
        
        f.write("4. NEXT STEPS\n")
        f.write("   1. Run 'new_members_insert.sql' to add missing members\n")
        f.write("   2. Review 'member_contributions_fix.json' for manual fixes\n")
        f.write("   3. Verify app screens show correct data\n")
        f.write("   4. Update implementation documentation\n")
    
    print(f"\nComprehensive report saved to: {report_file}")
    print("\n" + "=" * 80)
    print("IMPLEMENTATION COMPLETE")
    print("=" * 80)

if __name__ == "__main__":
    main()
