import pandas as pd
import numpy as np
import os
from supabase import create_client, Client
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

# Excel file path
EXCEL_FILE = r"NewBusLogic\Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"

def analyze_excel_structure():
    """Analyze the structure of the Excel file"""
    print("Analyzing Excel file structure...")
    
    try:
        # Read sheet names
        xls = pd.ExcelFile(EXCEL_FILE)
        sheet_names = xls.sheet_names
        print(f"Excel sheets: {sheet_names}")
        
        # Financial year sheets (based on requirements)
        financial_year_sheets = [
            '2018-2019', '2019-2020', '2020-2021', 
            '2021-2022', '2022-2023', '2023-2024', '2024-2025'
        ]
        
        print("\nAnalyzing financial year sheets:")
        for sheet in financial_year_sheets:
            if sheet in sheet_names:
                try:
                    df = pd.read_excel(EXCEL_FILE, sheet_name=sheet, nrows=5)
                    print(f"\n{sheet}:")
                    print(f"  Columns: {list(df.columns)}")
                    print(f"  Shape: {df.shape}")
                    print(f"  First few rows:")
                    print(df.head(3).to_string())
                except Exception as e:
                    print(f"  Error reading {sheet}: {e}")
            else:
                print(f"\n{sheet}: NOT FOUND in Excel file")
        
        # Check for Column G (which should be total contributions)
        print("\n\nChecking for Column G (total contributions column):")
        for sheet in financial_year_sheets:
            if sheet in sheet_names:
                try:
                    df = pd.read_excel(EXCEL_FILE, sheet_name=sheet)
                    if len(df.columns) >= 7:  # Column G is index 6 (0-based)
                        col_g_name = df.columns[6]
                        print(f"{sheet}: Column G is '{col_g_name}'")
                        # Check if it contains numeric data
                        if df.iloc[:, 6].dtype in ['float64', 'int64']:
                            total = df.iloc[:, 6].sum()
                            print(f"  Total in Column G: {total:,.2f}")
                        else:
                            print(f"  Column G data type: {df.iloc[:, 6].dtype}")
                    else:
                        print(f"{sheet}: Less than 7 columns, cannot check Column G")
                except Exception as e:
                    print(f"  Error analyzing {sheet}: {e}")
        
        return sheet_names, financial_year_sheets
        
    except Exception as e:
        print(f"Error reading Excel file: {e}")
        return [], []

def extract_member_data_from_excel():
    """Extract member data from all financial year sheets"""
    print("\n\nExtracting member data from Excel...")
    
    financial_year_sheets = [
        '2018-2019', '2019-2020', '2020-2021', 
        '2021-2022', '2022-2023', '2023-2024', '2024-2025'
    ]
    
    all_members = {}
    
    for sheet in financial_year_sheets:
        try:
            df = pd.read_excel(EXCEL_FILE, sheet_name=sheet)
            print(f"\nProcessing {sheet}...")
            print(f"  Shape: {df.shape}")
            
            # Assuming member names are in column A (index 0)
            # and total contributions are in column G (index 6)
            if len(df.columns) >= 7:
                for idx, row in df.iterrows():
                    member_name = str(row.iloc[0]).strip() if pd.notna(row.iloc[0]) else ""
                    if member_name and member_name not in ['', 'nan', 'NaN', 'None']:
                        # Get total contributions from column G
                        total_contributions = row.iloc[6] if pd.notna(row.iloc[6]) else 0
                        
                        if member_name not in all_members:
                            all_members[member_name] = {
                                'name': member_name,
                                'contributions_by_year': {},
                                'total_contributions': 0
                            }
                        
                        # Store contributions for this year
                        all_members[member_name]['contributions_by_year'][sheet] = float(total_contributions)
                        all_members[member_name]['total_contributions'] += float(total_contributions)
            
            print(f"  Processed {len(df)} rows")
            
        except Exception as e:
            print(f"  Error processing {sheet}: {e}")
    
    print(f"\nTotal unique members found in Excel: {len(all_members)}")
    
    # Print sample members
    print("\nSample members from Excel:")
    sample_count = 0
    for member_name, data in list(all_members.items())[:10]:
        print(f"  {member_name}: Total contributions = {data['total_contributions']:,.2f}")
        sample_count += 1
    
    return all_members

def compare_with_database(excel_members):
    """Compare Excel data with database"""
    print("\n\nComparing Excel data with database...")
    
    try:
        # Initialize Supabase client
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Get all members from database
        response = supabase.table('members').select('member_number, name, financial_info').execute()
        
        if hasattr(response, 'data'):
            db_members = response.data
        else:
            db_members = []
        
        print(f"Database members count: {len(db_members)}")
        
        # Create mapping of names to database members
        db_member_map = {}
        for member in db_members:
            name = member.get('name', '').strip()
            if name:
                db_member_map[name] = member
        
        # Compare
        matches = 0
        missing_in_db = []
        missing_in_excel = []
        
        print("\nComparison results:")
        
        # Check Excel members in database
        for excel_name, excel_data in excel_members.items():
            if excel_name in db_member_map:
                matches += 1
                db_member = db_member_map[excel_name]
                db_financial_info = db_member.get('financial_info', {})
                
                if isinstance(db_financial_info, str):
                    try:
                        db_financial_info = json.loads(db_financial_info)
                    except:
                        db_financial_info = {}
                
                db_total = db_financial_info.get('total_contributions', 0)
                excel_total = excel_data['total_contributions']
                
                if abs(db_total - excel_total) > 0.01:
                    print(f"  MISMATCH: {excel_name}")
                    print(f"    Excel total: {excel_total:,.2f}")
                    print(f"    DB total: {db_total:,.2f}")
                    print(f"    Difference: {excel_total - db_total:,.2f}")
            else:
                missing_in_db.append(excel_name)
        
        # Check database members in Excel
        for db_name in db_member_map.keys():
            if db_name not in excel_members:
                missing_in_excel.append(db_name)
        
        print(f"\nSummary:")
        print(f"  Total Excel members: {len(excel_members)}")
        print(f"  Total DB members: {len(db_member_map)}")
        print(f"  Matches: {matches}")
        print(f"  Members in Excel but not in DB: {len(missing_in_db)}")
        print(f"  Members in DB but not in Excel: {len(missing_in_excel)}")
        
        if missing_in_db:
            print(f"\nFirst 10 members in Excel but not in DB:")
            for name in missing_in_db[:10]:
                print(f"  - {name}")
        
        if missing_in_excel:
            print(f"\nFirst 10 members in DB but not in Excel:")
            for name in missing_in_excel[:10]:
                print(f"  - {name}")
        
        return matches, missing_in_db, missing_in_excel
        
    except Exception as e:
        print(f"Error comparing with database: {e}")
        return 0, [], []

def calculate_total_fund_contributions():
    """Calculate total fund contributions from Excel (Column G totals)"""
    print("\n\nCalculating total fund contributions from Excel...")
    
    financial_year_sheets = [
        '2018-2019', '2019-2020', '2020-2021', 
        '2021-2022', '2022-2023', '2023-2024', '2024-2025'
    ]
    
    total_fund = 0
    year_totals = {}
    
    for sheet in financial_year_sheets:
        try:
            df = pd.read_excel(EXCEL_FILE, sheet_name=sheet)
            if len(df.columns) >= 7:
                col_g = df.iloc[:, 6]
                # Filter out non-numeric values
                numeric_values = pd.to_numeric(col_g, errors='coerce')
                year_total = numeric_values.sum()
                year_totals[sheet] = year_total
                total_fund += year_total
                print(f"  {sheet}: {year_total:,.2f}")
        except Exception as e:
            print(f"  Error calculating for {sheet}: {e}")
            year_totals[sheet] = 0
    
    print(f"\nTotal Fund Contributions (sum of Column G across all years): {total_fund:,.2f}")
    
    return total_fund, year_totals

def main():
    print("=" * 80)
    print("EXCEL DATA IMPORT VERIFICATION")
    print("=" * 80)
    
    # Step 1: Analyze Excel structure
    sheet_names, financial_year_sheets = analyze_excel_structure()
    
    # Step 2: Extract member data from Excel
    excel_members = extract_member_data_from_excel()
    
    # Step 3: Calculate total fund contributions
    total_fund, year_totals = calculate_total_fund_contributions()
    
    # Step 4: Compare with database
    matches, missing_in_db, missing_in_excel = compare_with_database(excel_members)
    
    # Step 5: Generate summary report
    print("\n" + "=" * 80)
    print("VERIFICATION SUMMARY")
    print("=" * 80)
    
    print(f"\n1. Excel File Analysis:")
    print(f"   - Total sheets: {len(sheet_names)}")
    print(f"   - Financial year sheets found: {len([s for s in financial_year_sheets if s in sheet_names])}/7")
    
    print(f"\n2. Member Data:")
    print(f"   - Unique members in Excel: {len(excel_members)}")
    print(f"   - Total fund contributions: {total_fund:,.2f}")
    
    print(f"\n3. Database Comparison:")
    print(f"   - Members matched: {matches}")
    print(f"   - Members missing in database: {len(missing_in_db)}")
    print(f"   - Members missing in Excel: {len(missing_in_excel)}")
    
    print(f"\n4. Recommendations:")
    if len(missing_in_db) > 0:
        print(f"   - Import {len(missing_in_db)} missing members from Excel to database")
    if len(missing_in_excel) > 0:
        print(f"   - Verify {len(missing_in_excel)} database members not found in Excel")
    
    # Save results to file
    with open('excel_verification_report.txt', 'w') as f:
        f.write("EXCEL DATA IMPORT VERIFICATION REPORT\n")
        f.write("=" * 60 + "\n\n")
        f.write(f"Excel File: {EXCEL_FILE}\n")
        f.write(f"Analysis Date: {pd.Timestamp.now()}\n\n")
        
        f.write("1. EXCEL STRUCTURE\n")
        f.write(f"   Total sheets: {len(sheet_names)}\n")
        f.write(f"   Financial year sheets: {[s for s in financial_year_sheets if s in sheet_names]}\n\n")
        
        f.write("2. MEMBER DATA\n")
        f.write(f"   Unique members in Excel: {len(excel_members)}\n")
        f.write(f"   Total fund contributions: {total_fund:,.2f}\n\n")
        
        f.write("3. DATABASE COMPARISON\n")
        f.write(f"   Members matched: {matches}\n")
        f.write(f"   Members missing in database: {len(missing_in_db)}\n")
        f.write(f"   Members missing in Excel: {len(missing_in_excel)}\n\n")
        
        f.write("4. YEARLY TOTALS\n")
        for year, total in year_totals.items():
            f.write(f"   {year}: {total:,.2f}\n")
    
    print(f"\nReport saved to: excel_verification_report.txt")

if __name__ == "__main__":
    main()