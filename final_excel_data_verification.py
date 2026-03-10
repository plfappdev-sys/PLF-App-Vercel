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

def analyze_correct_excel_columns():
    """Analyze the correct columns in Excel (Column G = Total Contribution for 12 Months)"""
    print("Analyzing Excel file for Column G (Total Contribution for 12 Months)...")
    
    # Focus on the main financial year sheets
    target_sheets = ['2022-2023', '2023-2024', '2024-2025']
    
    all_members = {}
    sheet_totals = {}
    
    for sheet in target_sheets:
        try:
            print(f"\nProcessing {sheet}...")
            df = pd.read_excel(EXCEL_FILE, sheet_name=sheet)
            print(f"  Shape: {df.shape}")
            print(f"  Columns: {list(df.columns)[:10]}...")  # First 10 columns
            
            # Find Column G (index 6) - should be "Total Contribution for 12 Months"
            if len(df.columns) >= 7:
                column_g_name = df.columns[6]
                print(f"  Column G (index 6): '{column_g_name}'")
                
                # Also look for member name column (usually column A, index 0)
                member_col_name = df.columns[0]
                print(f"  Member column (index 0): '{member_col_name}'")
                
                # Process each row
                for idx, row in df.iterrows():
                    member_name = str(row.iloc[0]).strip() if pd.notna(row.iloc[0]) else ""
                    
                    # Skip empty names and totals
                    if member_name and member_name not in ['', 'nan', 'NaN', 'None', 'Total', 'Grand Total', 'AVG']:
                        # Get total contributions from Column G
                        total_contrib = 0
                        try:
                            if pd.notna(row.iloc[6]):
                                total_contrib = float(row.iloc[6])
                        except:
                            pass
                        
                        if member_name not in all_members:
                            all_members[member_name] = {
                                'name': member_name,
                                'contributions_by_year': {},
                                'total_contributions': 0
                            }
                        
                        # Store contributions for this year
                        all_members[member_name]['contributions_by_year'][sheet] = total_contrib
                        all_members[member_name]['total_contributions'] += total_contrib
                
                # Calculate sheet total
                sheet_total = df.iloc[:, 6].sum()
                sheet_totals[sheet] = sheet_total
                print(f"  Total for {sheet}: {sheet_total:,.2f}")
                print(f"  Members processed: {len([m for m in all_members.values() if sheet in m['contributions_by_year']])}")
            
        except Exception as e:
            print(f"  Error processing {sheet}: {e}")
    
    print(f"\nTotal unique members across all sheets: {len(all_members)}")
    
    # Print summary
    print("\nMember contributions summary (first 20):")
    for member_name, data in list(all_members.items())[:20]:
        print(f"  {member_name[:30]:30} Total: {data['total_contributions']:10,.2f}")
    
    total_all_contributions = sum(m['total_contributions'] for m in all_members.values())
    print(f"\nTotal contributions across all members: {total_all_contributions:,.2f}")
    
    return all_members, sheet_totals

def verify_database_against_excel(excel_members):
    """Verify database against Excel data and create correction script"""
    print("\n\nVerifying database against Excel data...")
    
    try:
        # Initialize Supabase client
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Get all members from database
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
        
        # Compare and create correction script
        corrections_needed = []
        members_missing_in_db = []
        members_missing_in_excel = []
        
        print("\nChecking for corrections needed:")
        
        # Check Excel members in database
        for excel_name, excel_data in excel_members.items():
            if excel_name in db_member_map:
                db_member = db_member_map[excel_name]
                db_financial_info = db_member.get('financial_info', {})
                
                if isinstance(db_financial_info, str):
                    try:
                        db_financial_info = json.loads(db_financial_info)
                    except:
                        db_financial_info = {}
                
                db_total = db_financial_info.get('total_contributions', 0)
                excel_total = excel_data['total_contributions']
                
                # Check if correction is needed (difference > 1.00)
                if abs(db_total - excel_total) > 1.00:
                    corrections_needed.append({
                        'id': db_member['id'],
                        'member_number': db_member.get('member_number', ''),
                        'name': excel_name,
                        'current_total': db_total,
                        'excel_total': excel_total,
                        'difference': excel_total - db_total,
                        'contributions_by_year': excel_data['contributions_by_year']
                    })
                    
                    print(f"  {excel_name}: DB={db_total:,.2f}, Excel={excel_total:,.2f}, Diff={excel_total - db_total:,.2f}")
            else:
                members_missing_in_db.append(excel_name)
        
        # Check database members in Excel
        for db_name in db_member_map.keys():
            if db_name not in excel_members:
                members_missing_in_excel.append(db_name)
        
        print(f"\nSummary:")
        print(f"  Corrections needed: {len(corrections_needed)}")
        print(f"  Members in Excel but not in DB: {len(members_missing_in_db)}")
        print(f"  Members in DB but not in Excel: {len(members_missing_in_excel)}")
        
        # Create correction SQL
        if corrections_needed:
            create_correction_sql(corrections_needed)
        
        # Create missing members SQL
        if members_missing_in_db:
            create_missing_members_sql(members_missing_in_db, excel_members, db_member_map)
        
        return corrections_needed, members_missing_in_db, members_missing_in_excel
        
    except Exception as e:
        print(f"Error verifying database: {e}")
        return [], [], []

def create_correction_sql(corrections):
    """Create SQL to correct member contributions"""
    print("\nCreating correction SQL...")
    
    sql_statements = []
    
    for correction in corrections:
        member_id = correction['id']
        excel_total = correction['excel_total']
        contributions_by_year = correction['contributions_by_year']
        
        # Get current financial info and update it
        financial_info = {
            'total_contributions': excel_total,
            'contributions_by_year': contributions_by_year,
            'current_balance': excel_total,  # Assuming current balance should match total contributions
            'outstanding_amount': 0,
            'last_updated': datetime.now().isoformat(),
            'data_source': 'Excel Verification 2025'
        }
        
        sql = f"""
UPDATE members 
SET financial_info = '{json.dumps(financial_info).replace("'", "''")}',
    updated_at = NOW()
WHERE id = '{member_id}';
"""
        sql_statements.append(sql)
    
    # Save to file
    if sql_statements:
        sql_file = 'member_contributions_corrections.sql'
        with open(sql_file, 'w') as f:
            f.write("-- SQL to correct member contributions from Excel data\n")
            f.write("-- Generated: " + datetime.now().isoformat() + "\n\n")
            for sql in sql_statements:
                f.write(sql + "\n\n")
        
        print(f"Correction SQL saved to: {sql_file}")
        print(f"Total corrections: {len(sql_statements)}")
    
    return sql_statements

def create_missing_members_sql(missing_members, excel_members, db_member_map):
    """Create SQL to insert missing members"""
    print("\nCreating SQL for missing members...")
    
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
    
    # Generate SQL for missing members
    new_member_counter = 1
    for member_name in missing_members:
        if member_name in excel_members:
            excel_data = excel_members[member_name]
            member_number = f"M{max_member_number + new_member_counter:03d}"
            
            financial_info = {
                'total_contributions': excel_data['total_contributions'],
                'contributions_by_year': excel_data['contributions_by_year'],
                'current_balance': excel_data['total_contributions'],
                'outstanding_amount': 0,
                'last_updated': datetime.now().isoformat(),
                'data_source': 'Excel Import 2025'
            }
            
            # Estimate join date
            join_date = '2018-07-01'  # Default
            
            sql = f"""
INSERT INTO members (member_number, name, join_date, financial_info, created_at, updated_at)
VALUES (
  '{member_number}',
  '{member_name.replace("'", "''")}',
  '{join_date}',
  '{json.dumps(financial_info)}',
  NOW(),
  NOW()
);
"""
            sql_statements.append(sql)
            new_member_counter += 1
    
    # Save to file
    if sql_statements:
        sql_file = 'missing_members_insert.sql'
        with open(sql_file, 'w') as f:
            f.write("-- SQL to insert missing members from Excel\n")
            f.write("-- Generated: " + datetime.now().isoformat() + "\n\n")
            for sql in sql_statements:
                f.write(sql + "\n\n")
        
        print(f"Missing members SQL saved to: {sql_file}")
        print(f"Total missing members: {len(sql_statements)}")
    
    return sql_statements

def run_verification_test():
    """Run a verification test after corrections"""
    print("\n\nRunning verification test...")
    
    try:
        # Initialize Supabase client
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Get sample members to verify
        response = supabase.table('members').select('member_number, name, financial_info').limit(10).execute()
        
        if hasattr(response, 'data'):
            sample_members = response.data
            
            print("\nSample members after corrections:")
            for member in sample_members:
                name = member.get('name', '')
                financial_info = member.get('financial_info', {})
                
                if isinstance(financial_info, str):
                    try:
                        financial_info = json.loads(financial_info)
                    except:
                        financial_info = {}
                
                total_contributions = financial_info.get('total_contributions', 0)
                print(f"  {name}: {total_contributions:,.2f}")
        
        # Get total members count
        count_response = supabase.table('members').select('*', { 'count': 'exact', 'head': True }).execute()
        if hasattr(count_response, 'count'):
            print(f"\nTotal members in database: {count_response.count}")
        
    except Exception as e:
        print(f"Error running verification test: {e}")

def main():
    print("=" * 80)
    print("FINAL EXCEL DATA VERIFICATION AND CORRECTION")
    print("=" * 80)
    
    # Step 1: Analyze Excel with correct columns
    excel_members, sheet_totals = analyze_correct_excel_columns()
    
    # Step 2: Verify database against Excel
    corrections, missing_in_db, missing_in_excel = verify_database_against_excel(excel_members)
    
    # Step 3: Run verification test
    run_verification_test()
    
    # Step 4: Generate summary report
    print("\n" + "=" * 80)
    print("VERIFICATION SUMMARY")
    print("=" * 80)
    
    total_excel_contributions = sum(m['total_contributions'] for m in excel_members.values())
    
    print(f"\n1. Excel Analysis:")
    print(f"   - Unique members in Excel: {len(excel_members)}")
    print(f"   - Total contributions in Excel: {total_excel_contributions:,.2f}")
    for sheet, total in sheet_totals.items():
        print(f"   - {sheet}: {total:,.2f}")
    
    print(f"\n2. Database Verification:")
    print(f"   - Corrections needed: {len(corrections)}")
    print(f"   - Members missing in database: {len(missing_in_db)}")
    print(f"   - Members missing in Excel: {len(missing_in_excel)}")
    
    print(f"\n3. Generated Files:")
    print(f"   - member_contributions_corrections.sql (if corrections needed)")
    print(f"   - missing_members_insert.sql (if members missing)")
    
    print(f"\n4. Next Steps:")
    print(f"   1. Review generated SQL files")
    print(f"   2. Execute SQL files in Supabase SQL editor")
    print(f"   3. Verify app screens show correct data")
    print(f"   4. Update implementation documentation")
    
    # Save comprehensive report
    report_file = 'final_verification_report.txt'
    with open(report_file, 'w') as f:
        f.write("FINAL EXCEL DATA VERIFICATION REPORT\n")
        f.write("=" * 60 + "\n\n")
        f.write(f"Report Date: {datetime.now().isoformat()}\n")
        f.write(f"Excel File: {EXCEL_FILE}\n\n")
        
        f.write("1. EXCEL ANALYSIS\n")
        f.write(f"   Unique members: {len(excel_members)}\n")
        f.write(f"   Total contributions: {total_excel_contributions:,.2f}\n")
        for sheet, total in sheet_totals.items():
            f.write(f"   {sheet}: {total:,.2f}\n")
        
        f.write("\n2. DATABASE VERIFICATION\n")
        f.write(f"   Corrections needed: {len(corrections)}\n")
        f.write(f"   Members missing in database: {len(missing_in_db)}\n")
        f.write(f"   Members missing in Excel: {len(missing_in_excel)}\n")
        
        if corrections:
            f.write("\n3. CORRECTIONS NEEDED (first 10):\n")
            for corr in corrections[:10]:
                f.write(f"   {corr['name']}: DB={corr['current_total']:,.2f}, Excel={corr['excel_total']:,.2f}, Diff={corr['difference']:,.2f}\n")
        
        f.write("\n4. NEXT STEPS\n")
        f.write("   1. Execute generated SQL files\n")
        f.write("   2. Verify app data displays correctly\n")
        f.write("   3. Update implementation documentation\n")
    
    print(f"\nReport saved to: {report_file}")
    print("\n" + "=" * 80)
    print("VERIFICATION COMPLETE")
    print("=" * 80)

if __name__ == "__main__":
    main()