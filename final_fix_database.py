import pandas as pd
import json
from supabase import create_client, Client
import re

def clean_name(name):
    """Clean member name for matching"""
    if pd.isna(name):
        return ""
    name_str = str(name).strip()
    # Remove extra spaces
    name_str = re.sub(r'\s+', ' ', name_str)
    return name_str.lower()

def final_fix_database():
    print("FINAL FIX: Updating database with correct Excel contributions...")
    
    # Read Excel file
    excel_path = "NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"
    print(f"Reading Excel file: {excel_path}")
    
    try:
        # Read the 2024-2025 sheet
        df = pd.read_excel(excel_path, sheet_name='2024-2025')
        print(f"Excel sheet loaded. Shape: {df.shape}")
        
        # Get column names
        column_bl = 'Total Contribution for  7 Years (2018-24)'
        column_bk = 'Total Contribution for Current Year'
        column_member = 'Member'
        
        print(f"\nColumn BL: {column_bl}")
        print(f"Column BK: {column_bk}")
        print(f"Member column: {column_member}")
        
        # Connect to Supabase
        supabase_url = "https://zdnyhzasvifrskbostgn.supabase.co"
        supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAyNDQ4NCwiZXhwIjoyMDczNjAwNDg0fQ.kOpqoycVNdJXC-fqqxwHPVof6e8JlJ60_J7WWF-1AHU"
        
        supabase: Client = create_client(supabase_url, supabase_key)
        
        # Get all members from database
        print("\nFetching members from database...")
        response = supabase.table('members').select('id, member_number, name, financial_info').execute()
        members = response.data
        print(f"Found {len(members)} members in database")
        
        # Create a mapping of cleaned name to member
        member_map = {}
        for member in members:
            name = member['name']
            if name:
                cleaned_name = clean_name(name)
                member_map[cleaned_name] = member
        
        # Process Excel data (only rows 1-66, exclude totals row 67 and empty row 68)
        print("\nProcessing Excel data (rows 1-66)...")
        updates_needed = 0
        excel_total_bl = 0
        excel_total_bk = 0
        excel_total = 0
        members_processed = 0
        
        for index, row in df.iterrows():
            # Stop at row 66 (0-indexed, so index 65)
            if index >= 66:
                break
                
            member_name = row[column_member]
            if pd.isna(member_name):
                continue
                
            # Get Excel values
            bl_value = float(row[column_bl]) if pd.notna(row[column_bl]) else 0.0
            bk_value = float(row[column_bk]) if pd.notna(row[column_bk]) else 0.0
            total_value = bl_value + bk_value
            
            excel_total_bl += bl_value
            excel_total_bk += bk_value
            excel_total += total_value
            members_processed += 1
            
            # Find matching member in database
            cleaned_excel_name = clean_name(member_name)
            
            if cleaned_excel_name in member_map:
                member = member_map[cleaned_excel_name]
                
                # Get current financial_info
                financial_info = member['financial_info']
                if isinstance(financial_info, str):
                    try:
                        financial_info = json.loads(financial_info)
                    except:
                        financial_info = {}
                elif financial_info is None:
                    financial_info = {}
                
                # Check if update is needed
                current_total = financial_info.get('total_contributions', 0)
                if abs(current_total - total_value) > 0.01:
                    # Update needed
                    financial_info['total_contributions'] = total_value
                    financial_info['data_source'] = 'Excel Column BL + BK Final Correction'
                    financial_info['last_updated'] = pd.Timestamp.now().isoformat()
                    
                    # Also update contributions_by_year if it exists
                    if 'contributions_by_year' not in financial_info:
                        financial_info['contributions_by_year'] = {}
                    
                    # Update in database
                    try:
                        supabase.table('members').update({
                            'financial_info': financial_info
                        }).eq('id', member['id']).execute()
                        
                        print(f"✓ Updated {member['member_number']}: {member['name']}")
                        print(f"  Old: R {current_total:.2f}, New: R {total_value:.2f}")
                        updates_needed += 1
                    except Exception as e:
                        print(f"✗ Error updating {member['member_number']}: {e}")
                else:
                    print(f"✓ {member['member_number']}: {member['name']} already correct (R {current_total:.2f})")
            else:
                print(f"✗ Member not found in database: {member_name}")
        
        print("\n" + "="*80)
        print("SUMMARY:")
        print(f"Excel rows processed: {members_processed}")
        print(f"Excel Column BL total (rows 1-66): R {excel_total_bl:.2f}")
        print(f"Excel Column BK total (rows 1-66): R {excel_total_bk:.2f}")
        print(f"Excel Total (BL + BK) (rows 1-66): R {excel_total:.2f}")
        print(f"Members updated: {updates_needed}")
        
        # Verify the fix
        print("\n" + "="*80)
        print("VERIFYING FIX...")
        
        response = supabase.table('members').select('financial_info').execute()
        members = response.data
        
        db_total = 0
        for member in members:
            financial_info = member['financial_info']
            if isinstance(financial_info, str):
                try:
                    financial_info = json.loads(financial_info)
                except:
                    financial_info = {}
            elif financial_info is None:
                financial_info = {}
            
            db_total += financial_info.get('total_contributions', 0)
        
        print(f"Database total after update: R {db_total:.2f}")
        print(f"Expected total (Excel rows 1-66): R {excel_total:.2f}")
        
        if abs(db_total - excel_total) < 0.01:
            print("✓ SUCCESS: Database now matches Excel!")
        else:
            print(f"✗ ERROR: Database still doesn't match Excel")
            print(f"  Difference: R {db_total - excel_total:.2f}")
        
        # Show what the application should now display
        print("\n" + "="*80)
        print("APPLICATION SHOULD NOW SHOW:")
        print(f"Total Fund Contributions: R {excel_total:,.2f}")
        print(f"(Previously showing: R 242,440.00)")
        print(f"Difference: R {excel_total - 242440:,.2f}")
        
    except Exception as e:
        print(f"ERROR: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    final_fix_database()