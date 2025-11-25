#!/usr/bin/env python3
"""
Import Contributions from Excel File - Fixed Version
Purpose: Import actual contribution data from Excel into member_balances table using name matching
Created: November 25, 2025
"""

import pandas as pd
import os
from datetime import datetime
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://zdnyhzasvifrskbostgn.supabase.co')
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SERVICE_ROLE_KEY', '')

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

class ContributionImporterFixed:
    def __init__(self):
        self.excel_file = "NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025.xlsx"
        self.member_contributions = {}
        self.member_mapping = {}
        
    def load_excel_data(self):
        """Load contribution data from Excel file"""
        try:
            print(f"📖 Reading Excel file: {self.excel_file}")
            
            # Read the 2024-2025 sheet
            df = pd.read_excel(self.excel_file, sheet_name='2024-2025')
            
            print(f"✅ Loaded Excel data with {len(df)} rows")
            
            # Extract member names and contribution data
            for index, row in df.iterrows():
                try:
                    # Get member name from the 'Member' column
                    member_name = row.get('Member', '')
                    if pd.isna(member_name) or not member_name:
                        continue
                    
                    # Clean up the name for matching
                    clean_name = str(member_name).strip()
                    
                    # Find the actual contribution columns
                    total_contribution = 0
                    
                    # Look for columns that might contain total contributions
                    for col_name in ['Total Contribution for  4 Years (2018-24)', 
                                   'Total Contribution for Current Year',
                                   'Total Contribution for 12 Months']:
                        if col_name in df.columns and pd.notna(row.get(col_name)):
                            try:
                                contribution_value = float(row[col_name])
                                if contribution_value > 0:
                                    total_contribution += contribution_value
                                    print(f"💰 Found contribution for {clean_name}: {col_name} = R{contribution_value}")
                            except (ValueError, TypeError):
                                pass
                    
                    # If we found contributions, store them
                    if total_contribution > 0:
                        self.member_contributions[clean_name] = {
                            'total_contributions': total_contribution,
                            'member_name': clean_name
                        }
                        print(f"✅ Member {clean_name}: Total contributions = R{total_contribution}")
                        
                except Exception as e:
                    print(f"⚠️ Error processing row {index}: {e}")
                    continue
            
            print(f"📊 Successfully loaded contribution data for {len(self.member_contributions)} members")
            return True
            
        except Exception as e:
            print(f"❌ Error loading Excel file: {e}")
            return False
    
    def create_member_mapping(self):
        """Create mapping between Excel member names and database member records"""
        try:
            print("\n🔍 Creating member name mapping...")
            
            # Get all members from database
            response = supabase.table('members').select('id, member_number, name').execute()
            
            if not response.data:
                print("❌ No members found in database")
                return False
            
            # Create mapping by name
            for member in response.data:
                clean_db_name = str(member['name']).strip()
                self.member_mapping[clean_db_name] = {
                    'id': member['id'],
                    'member_number': member['member_number']
                }
            
            print(f"✅ Created mapping for {len(self.member_mapping)} database members")
            
            # Show some matches
            print("\n🔍 Sample member mappings:")
            for excel_name in list(self.member_contributions.keys())[:5]:
                # Try to find matching database member
                matched = False
                for db_name, db_data in self.member_mapping.items():
                    if excel_name.lower() in db_name.lower() or db_name.lower() in excel_name.lower():
                        print(f"   ✅ {excel_name} -> {db_name} (Member {db_data['member_number']})")
                        matched = True
                        break
                
                if not matched:
                    print(f"   ❌ {excel_name} -> No match found")
            
            return True
            
        except Exception as e:
            print(f"❌ Error creating member mapping: {e}")
            return False
    
    def update_member_balances(self):
        """Update member_balances table with contribution data"""
        try:
            print("\n📤 Updating member balances with contribution data...")
            
            success_count = 0
            error_count = 0
            
            for excel_name, contribution_data in self.member_contributions.items():
                try:
                    # Find matching database member
                    matched_member = None
                    for db_name, db_data in self.member_mapping.items():
                        if excel_name.lower() in db_name.lower() or db_name.lower() in excel_name.lower():
                            matched_member = db_data
                            break
                    
                    if not matched_member:
                        print(f"⚠️ No database match found for: {excel_name}")
                        error_count += 1
                        continue
                    
                    member_id = matched_member['id']
                    member_number = matched_member['member_number']
                    
                    # Now update the member_balances table
                    update_data = {
                        'total_contributions': contribution_data['total_contributions'],
                        'updated_at': datetime.now().isoformat()
                    }
                    
                    # Try to update existing balance record
                    balance_response = supabase.table('member_balances') \
                        .update(update_data) \
                        .eq('member_id', member_id) \
                        .execute()
                    
                    if balance_response.data:
                        print(f"✅ Updated contributions for {excel_name} (Member {member_number}): R{contribution_data['total_contributions']}")
                        success_count += 1
                    else:
                        print(f"⚠️ No balance record found for {excel_name} (Member {member_number})")
                        error_count += 1
                        
                except Exception as e:
                    print(f"❌ Error updating member {excel_name}: {e}")
                    error_count += 1
            
            print(f"\n📊 Update Results:")
            print(f"✅ Successful updates: {success_count}")
            print(f"❌ Errors: {error_count}")
            print(f"📈 Total processed: {success_count + error_count}")
            
            return success_count > 0
            
        except Exception as e:
            print(f"❌ Error updating member balances: {e}")
            return False
    
    def verify_contributions(self):
        """Verify that contributions were updated correctly"""
        try:
            print("\n🔍 Verifying updated contributions...")
            
            # Get sample of updated member balances
            response = supabase.table('member_balances') \
                .select('member_id, total_contributions, savings_balance') \
                .neq('total_contributions', 0) \
                .limit(10) \
                .execute()
            
            if response.data:
                print("✅ Sample of updated member contributions:")
                for balance in response.data:
                    # Get member name
                    member_response = supabase.table('members') \
                        .select('name, member_number') \
                        .eq('id', balance['member_id']) \
                        .execute()
                    
                    if member_response.data:
                        member = member_response.data[0]
                        print(f"   - {member['name']} ({member['member_number']}): Contributions R{balance['total_contributions']}, Savings R{balance['savings_balance']}")
            
            # Calculate total fund value
            total_response = supabase.table('member_balances') \
                .select('total_contributions') \
                .execute()
            
            if total_response.data:
                total_contributions = sum(balance['total_contributions'] or 0 for balance in total_response.data)
                print(f"\n💰 Total Fund Value (sum of contributions): R{total_contributions:,.2f}")
            
            return True
            
        except Exception as e:
            print(f"❌ Error verifying contributions: {e}")
            return False
    
    def run_import(self):
        """Run the complete import process"""
        print("=" * 70)
        print("🚀 IMPORT CONTRIBUTIONS FROM EXCEL - FIXED VERSION")
        print("=" * 70)
        
        # Step 1: Load Excel data
        print("\n📖 STEP 1: Loading Excel data...")
        if not self.load_excel_data():
            print("❌ Failed to load Excel data")
            return False
        
        # Step 2: Create member mapping
        print("\n🔍 STEP 2: Creating member mapping...")
        if not self.create_member_mapping():
            print("❌ Failed to create member mapping")
            return False
        
        # Step 3: Update member balances
        print("\n📤 STEP 3: Updating member balances...")
        if not self.update_member_balances():
            print("❌ Failed to update member balances")
            return False
        
        # Step 4: Verify updates
        print("\n🔍 STEP 4: Verifying updates...")
        if not self.verify_contributions():
            print("⚠️ Verification had issues")
        
        print("\n" + "=" * 70)
        print("🎉 CONTRIBUTION IMPORT COMPLETED")
        print("=" * 70)
        
        print("\n🚀 NEXT STEPS:")
        print("1. Refresh the dashboard in the app")
        print("2. Verify Total Fund Value shows actual contributions")
        print("3. Check that member balances have correct contribution data")
        
        return True

def main():
    """Main function"""
    # Check if Supabase credentials are available
    if not SUPABASE_SERVICE_ROLE_KEY:
        print("❌ Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required")
        print("💡 Please set it in your .env file:")
        print("   SUPABASE_SERVICE_ROLE_KEY='your-service-role-key'")
        return
    
    # Check if Excel file exists
    excel_file = "NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025.xlsx"
    if not os.path.exists(excel_file):
        print(f"❌ Error: Excel file not found at {excel_file}")
        print("💡 Please make sure the file exists in the NewBusLogic folder")
        return
    
    # Create importer instance
    importer = ContributionImporterFixed()
    
    # Run import
    success = importer.run_import()
    
    if success:
        print("\n✅ Contribution import completed successfully!")
    else:
        print("\n❌ Contribution import failed. Please check the errors above.")

if __name__ == "__main__":
    main()
