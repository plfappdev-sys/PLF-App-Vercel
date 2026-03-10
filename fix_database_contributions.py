import pandas as pd
import json
from supabase import create_client, Client
import os

def fix_database_contributions():
    print("Fixing database contributions to match Excel data...")
    
    # Read Excel file
    excel_path = "NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"
    print(f"Reading Excel file: {excel_path}")
    
    try:
        # Read the 2024-2025 sheet
        df = pd.read_excel(excel_path, sheet_name='2024-2025')
        print(f"Excel sheet loaded. Shape: {df.shape}")
        
        # Find Column BL and BK
        # Column BL: Total Contribution for 7 Years (2018-24)
        # Column BK: Total Contribution for Current Year
        column_bl = None
        column_bk = None
        member_column = None
        
        for col in df.columns:
            col_str = str(col).lower()
            if 'total contribution for  7 years' in col_str or 'bl' in col_str:
                column_bl = col
                print(f"Found Column BL: {col}")
            elif 'total contribution for current year' in col_str or 'bk' in col_str:
                column_bk = col
                print(f"Found Column BK: {col}")
            elif 'member' in col_str:
                member_column = col
                print(f"Found Member column: {col}")
        
        if not column_bl or not column_bk or not member_column:
            print("ERROR: Could not find required columns in Excel")
            return
        
        # Connect to Supabase
        supabase_url = "https://zdnyhzasvifrskbostgn.supabase.co"
        supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAyNDQ4NCwiZXhwIjoyMDczNjAwNDg0fQ.kOpqoycVNdJXC-fqqxwHPVof6e8JlJ60_J7WWF-1AHU"
        
        supabase: Client = create_client(supabase_url, supabase_key)
        
        # Get all members from database
        print("\nFetching members from database...")
        response = supabase.table('members').select('id, member_number, name, financial_info').execute()
        members = response.data
        print(f"Found {len(members)} members in database")
        
        # Create a mapping of name to member
        member_map = {}
        for member in members:
            name = member['name'].strip().lower() if member['name'] else ''
            member_map[name] = member
        
        # Process Excel data
        print("\nProcessing Excel data...")
        updates_needed = 0
        excel_total_bl = 0
        excel_total_bk = 0
        excel_total = 0
        
        for index, row in df.iterrows():
            member_name = str(row[member_column]).strip()
            if not member_name or member_name.lower() == 'nan':
                continue
            
            # Get Excel values
            bl_value = float(row[column_bl]) if pd.notna(row[column_bl]) else 0.0
            bk_value = float(row[column_bk]) if pd.notna(row[column_bk]) else 0.0
            total_value = bl_value + bk_value
            
            excel_total_bl += bl_value
            excel_total_bk += bk_value
            excel_total += total_value
            
            # Find matching member in database
            member_lower = member_name.lower()
            if member_lower in member_map:
                member = member_map[member_lower]
                
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
                    financial_info['data_source'] = 'Excel Column BL + BK Correction'
                    financial_info['last_updated'] = pd.Timestamp.now().isoformat()
                    
                    # Update in database
                    try:
                        supabase.table('members').update({
                            'financial_info': financial_info
                        }).eq('id', member['id']).execute()
                        
                        print(f"Updated {member['member_number']}: {member_name}")
                        print(f"  Old: R {current_total:.2f}, New: R {total_value:.2f}")
                        updates_needed += 1
                    except Exception as e:
                        print(f"Error updating {member['member_number']}: {e}")
            else:
                print(f"Member not found in database: {member_name}")
        
        print("\n" + "="*80)
        print("SUMMARY:")
        print(f"Excel Column BL total: R {excel_total_bl:.2f}")
        print(f"Excel Column BK total: R {excel_total_bk:.2f}")
        print(f"Excel Total (BL + BK): R {excel_total:.2f}")
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
        print(f"Expected total (Excel): R {excel_total:.2f}")
        
        if abs(db_total - excel_total) < 0.01:
            print("✓ SUCCESS: Database now matches Excel!")
        else:
            print(f"✗ ERROR: Database still doesn't match Excel")
            print(f"  Difference: R {db_total - excel_total:.2f}")
        
    except Exception as e:
        print(f"ERROR: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    fix_database_contributions()