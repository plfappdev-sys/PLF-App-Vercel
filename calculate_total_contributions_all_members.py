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

def calculate_total_contributions_all_members():
    """Calculate total contributions for all members by summing contributions from all financial years"""
    print("Calculating total contributions for all members...")
    
    EXCEL_FILE = r"NewBusLogic\Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"
    
    try:
        # Initialize Supabase client
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Get all members from database
        print("\n=== FETCHING ALL MEMBERS FROM DATABASE ===")
        response = supabase.table('members').select('*').execute()
        
        if not hasattr(response, 'data') or not response.data:
            print("No members found in database")
            return
        
        members = response.data
        print(f"Found {len(members)} members in database")
        
        # Define sheet names and their corresponding contribution columns
        # Based on the user's specification:
        # 2018-2019    = column H (index 7)
        # 2019-2020    = column H (index 7)
        # 2020-2021    = column H (index 7)
        # 2021-2022 a = column H (index 7)
        # 2021-2022 b = column G (index 6)
        # 2022-2023    = column G (index 6)
        # 2023-2024   = column G (index 6)
        # 2024-2025  = column G (index 6)
        
        sheet_config = {
            '2018-2019': {'column_index': 7, 'column_name': 'H'},
            '2019-2020': {'column_index': 7, 'column_name': 'H'},
            '2020-2021': {'column_index': 7, 'column_name': 'H'},
            '2021-2022 (A) New': {'column_index': 7, 'column_name': 'H'},
            '2021-2022 (B)': {'column_index': 6, 'column_name': 'G'},
            '2022-2023': {'column_index': 6, 'column_name': 'G'},
            '2023-2024': {'column_index': 6, 'column_name': 'G'},
            '2024-2025': {'column_index': 6, 'column_name': 'G'}
        }
        
        # Track results
        results = []
        errors = []
        
        print("\n=== CALCULATING TOTAL CONTRIBUTIONS ===")
        
        for member in members:
            member_name = member.get('name', '').strip()
            member_id = member.get('id')
            member_number = member.get('member_number')
            
            if not member_name:
                continue
            
            print(f"\n--- Processing {member_name} ({member_number}) ---")
            
            total_contributions = 0
            contributions_by_year = {}
            
            try:
                # Process each sheet
                for sheet_name, config in sheet_config.items():
                    try:
                        # Read the sheet
                        df = pd.read_excel(EXCEL_FILE, sheet_name=sheet_name, header=None)
                        
                        # Find header row
                        header_row = None
                        for i in range(min(10, len(df))):
                            if pd.notna(df.iloc[i, 0]) and 'Member' in str(df.iloc[i, 0]):
                                header_row = i
                                break
                        
                        if header_row is None:
                            print(f"  ⚠️  Could not find header in {sheet_name}")
                            continue
                        
                        # Find the member in this sheet
                        member_found = False
                        for idx, row in df.iterrows():
                            if idx <= header_row:
                                continue
                                
                            current_name = str(row.iloc[0]).strip() if pd.notna(row.iloc[0]) else ""
                            if not current_name:
                                continue
                            
                            # Check if this is our member
                            if member_name.lower() in current_name.lower() or current_name.lower() in member_name.lower():
                                member_found = True
                                
                                # Get contribution from the specified column
                                col_index = config['column_index']
                                if len(row) > col_index and pd.notna(row.iloc[col_index]):
                                    contribution = float(row.iloc[col_index])
                                    total_contributions += contribution
                                    contributions_by_year[sheet_name] = contribution
                                    
                                    print(f"  ✅ {sheet_name}: Column {config['column_name']} = R{contribution:,.2f}")
                                else:
                                    print(f"  ⚠️  {sheet_name}: No contribution data in column {config['column_name']}")
                                
                                break
                        
                        if not member_found:
                            print(f"  ⚠️  {sheet_name}: Member not found")
                    
                    except Exception as e:
                        print(f"  ❌ Error reading {sheet_name}: {e}")
                        errors.append(f"{member_name} - {sheet_name}: {e}")
                
                # Print summary for this member
                print(f"  📊 Total Contributions: R{total_contributions:,.2f}")
                print(f"  📈 Breakdown: {contributions_by_year}")
                
                # Update database
                try:
                    # Get current financial info
                    financial_info = member.get('financial_info', {})
                    if isinstance(financial_info, str):
                        try:
                            financial_info = json.loads(financial_info)
                        except:
                            financial_info = {}
                    
                    # Update financial_info with total contributions
                    updated_financial_info = financial_info.copy()
                    updated_financial_info.update({
                        "total_contributions": total_contributions,
                        "contributions_by_year": contributions_by_year,
                        "last_contributions_update": datetime.now().isoformat(),
                        "data_source": "Excel Total Contributions Calculation"
                    })
                    
                    # Update members table
                    update_response = supabase.table('members').update({
                        'financial_info': updated_financial_info,
                        'updated_at': datetime.now().isoformat()
                    }).eq('id', member_id).execute()
                    
                    if hasattr(update_response, 'error') and update_response.error:
                        print(f"  ❌ Error updating database: {update_response.error}")
                        errors.append(f"{member_name} database update: {update_response.error}")
                    else:
                        print(f"  ✅ Database updated successfully")
                        
                        # Also update member_balances table
                        balance_response = supabase.table('member_balances').select('*').eq('member_id', member_id).execute()
                        
                        if hasattr(balance_response, 'data') and balance_response.data:
                            balance_update_response = supabase.table('member_balances').update({
                                'total_contributions': total_contributions,
                                'updated_at': datetime.now().isoformat()
                            }).eq('member_id', member_id).execute()
                            
                            if hasattr(balance_update_response, 'error') and balance_update_response.error:
                                print(f"  ⚠️  Error updating member_balances: {balance_update_response.error}")
                
                except Exception as e:
                    print(f"  ❌ Error updating database: {e}")
                    errors.append(f"{member_name} database update: {e}")
                
                # Add to results
                results.append({
                    'member_name': member_name,
                    'member_number': member_number,
                    'total_contributions': total_contributions,
                    'contributions_by_year': contributions_by_year
                })
                
            except Exception as e:
                print(f"  ❌ Error processing {member_name}: {e}")
                errors.append(f"{member_name}: {e}")
        
        # Print summary
        print(f"\n=== CALCULATION SUMMARY ===")
        print(f"Total members processed: {len(members)}")
        print(f"Successfully calculated: {len(results)}")
        print(f"Errors: {len(errors)}")
        
        if results:
            print(f"\n=== SAMPLE RESULTS ===")
            
            # Sort by total contributions (highest first)
            sorted_results = sorted(results, key=lambda x: x['total_contributions'], reverse=True)
            
            for i, result in enumerate(sorted_results[:10]):
                print(f"{i+1}. {result['member_name']} ({result['member_number']})")
                print(f"   Total Contributions: R{result['total_contributions']:,.2f}")
                print(f"   Years: {len(result['contributions_by_year'])} financial years")
                
                # Show top 3 contribution years
                top_years = sorted(result['contributions_by_year'].items(), key=lambda x: x[1], reverse=True)[:3]
                for year, amount in top_years:
                    print(f"   - {year}: R{amount:,.2f}")
            
            if len(sorted_results) > 10:
                print(f"\n... and {len(sorted_results) - 10} more members")
        
        if errors:
            print(f"\n=== ERRORS ===")
            for i, error in enumerate(errors[:10]):
                print(f"{i+1}. {error}")
            
            if len(errors) > 10:
                print(f"\n... and {len(errors) - 10} more errors")
        
        # Generate SQL script for manual verification
        print(f"\n=== GENERATING SQL SCRIPT ===")
        generate_contributions_sql_script(results)
        
        return results, errors
        
    except Exception as e:
        print(f"Error calculating total contributions: {e}")
        import traceback
        traceback.print_exc()

def generate_contributions_sql_script(results):
    """Generate SQL script for manual verification"""
    sql_file = "update_total_contributions.sql"
    
    with open(sql_file, 'w') as f:
        f.write("-- SQL Script to update total contributions for all members\n")
        f.write("-- Generated: " + datetime.now().isoformat() + "\n")
        f.write("-- Total members: " + str(len(results)) + "\n\n")
        
        f.write("-- ============================================\n")
        f.write("-- UPDATE MEMBERS TABLE - TOTAL CONTRIBUTIONS\n")
        f.write("-- ============================================\n\n")
        
        for result in results:
            member_name = result['member_name'].replace("'", "''")
            member_number = result['member_number']
            total_contributions = result['total_contributions']
            contributions_by_year = result['contributions_by_year']
            
            # Create updated financial_info JSON
            financial_info = {
                "total_contributions": total_contributions,
                "contributions_by_year": contributions_by_year,
                "last_contributions_update": datetime.now().isoformat(),
                "data_source": "Excel Total Contributions Calculation"
            }
            
            financial_info_json = json.dumps(financial_info).replace("'", "''")
            
            f.write(f"-- {member_name} ({member_number}) - Total: R{total_contributions:,.2f}\n")
            f.write(f"UPDATE members \n")
            f.write(f"SET financial_info = '{financial_info_json}',\n")
            f.write(f"    updated_at = NOW()\n")
            f.write(f"WHERE member_number = '{member_number}';\n\n")
        
        f.write("-- ============================================\n")
        f.write("-- UPDATE MEMBER_BALANCES TABLE\n")
        f.write("-- ============================================\n\n")
        
        for result in results:
            member_number = result['member_number']
            total_contributions = result['total_contributions']
            
            f.write(f"-- {result['member_name']} ({member_number})\n")
            f.write(f"UPDATE member_balances \n")
            f.write(f"SET total_contributions = {total_contributions},\n")
            f.write(f"    updated_at = NOW()\n")
            f.write(f"WHERE member_number = '{member_number}';\n\n")
        
        f.write("-- ============================================\n")
        f.write("-- VERIFICATION QUERIES\n")
        f.write("-- ============================================\n\n")
        f.write("-- Check total contributions for all members\n")
        f.write("SELECT member_number, name, financial_info->>'total_contributions' as total_contributions FROM members ORDER BY CAST(financial_info->>'total_contributions' AS DECIMAL) DESC LIMIT 20;\n\n")
        f.write("-- Check member_balances\n")
        f.write("SELECT mb.member_number, m.name, mb.total_contributions FROM member_balances mb JOIN members m ON mb.member_number = m.member_number ORDER BY mb.total_contributions DESC LIMIT 20;\n\n")
        f.write("-- Check specific members\n")
        f.write("SELECT member_number, name, financial_info FROM members WHERE member_number IN ('M031', 'M004', 'M041', 'M033');\n")
    
    print(f"SQL script generated: {sql_file}")
    print("You can review and execute this script manually if needed.")

if __name__ == "__main__":
    print("=" * 80)
    print("TOTAL CONTRIBUTIONS CALCULATION FOR ALL MEMBERS")
    print("=" * 80)
    
    print("\nThis script will calculate total contributions for ALL members by summing")
    print("contributions from all financial years in the Excel file.")
    print("\nColumn mapping by sheet:")
    print("- 2018-2019, 2019-2020, 2020-2021, 2021-2022 (A): Column H")
    print("- 2021-2022 (B), 2022-2023, 2023-2024, 2024-2025: Column G")
    print("\nPress Enter to continue or Ctrl+C to cancel...")
    
    try:
        input()
    except KeyboardInterrupt:
        print("\nOperation cancelled.")
        exit(0)
    
    results, errors = calculate_total_contributions_all_members()
    
    print("\n" + "=" * 80)
    print("CALCULATION COMPLETE")
    print("=" * 80)
    
    if results:
        print(f"\n✅ Successfully calculated total contributions for {len(results)} members.")
        
        # Show statistics
        total_all_contributions = sum(r['total_contributions'] for r in results)
        avg_contributions = total_all_contributions / len(results) if results else 0
        
        print(f"\n📊 Statistics:")
        print(f"  • Total contributions across all members: R{total_all_contributions:,.2f}")
        print(f"  • Average contributions per member: R{avg_contributions:,.2f}")
        
        # Show top contributors
        sorted_results = sorted(results, key=lambda x: x['total_contributions'], reverse=True)
        
        print(f"\n🏆 Top 5 Contributors:")
        for i, result in enumerate(sorted_results[:5]):
            print(f"  {i+1}. {result['member_name']}: R{result['total_contributions']:,.2f}")
        
        print(f"\n📈 What the app should now show:")
        print("  • 'Total Contributions' = Sum of all contributions from join date")
        print("  • Accurate historical contribution data")
        print("  • Correct member financial profiles")
    
    if errors:
        print(f"\n⚠️  There were {len(errors)} errors. Check the error log above.")
    
    print("\nNext steps:")
    print("1. Review the generated SQL script: update_total_contributions.sql")
    print("2. Test the app to verify total contributions are showing correctly")
    print("3. Check a few members manually to confirm the calculations")