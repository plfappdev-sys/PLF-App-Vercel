#!/usr/bin/env python3
"""
Simple Excel Import for PLF Database
Purpose: Import member data from Excel without requiring complex user creation
"""

import pandas as pd
import os
import sys
from datetime import datetime, date
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://zdnyhzasvifrskbostgn.supabase.co')
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY', '')

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

class SimpleExcelImporter:
    def __init__(self):
        self.excel_file = "NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"
        self.target_sheet = "2024-2025"
        self.members_data = []
        
    def check_excel_file(self):
        """Check if Excel file exists and is accessible"""
        if not os.path.exists(self.excel_file):
            print(f"❌ Error: Excel file not found at {self.excel_file}")
            return False
        
        try:
            excel_file = pd.ExcelFile(self.excel_file)
            sheet_names = excel_file.sheet_names
            
            if self.target_sheet not in sheet_names:
                print(f"❌ Target sheet '{self.target_sheet}' not found")
                return False
            
            print(f"✅ Excel file loaded successfully")
            print(f"📊 Total sheets: {len(sheet_names)}")
            print(f"✅ Target sheet '{self.target_sheet}' found")
            return True
            
        except Exception as e:
            print(f"❌ Error reading Excel file: {e}")
            return False
    
    def extract_member_data(self):
        """Extract member data from Excel sheet"""
        try:
            print(f"\n📖 Extracting member data from '{self.target_sheet}' sheet...")
            
            # Read the target sheet
            df = pd.read_excel(self.excel_file, sheet_name=self.target_sheet)
            
            print(f"✅ Loaded {len(df)} rows from Excel")
            print(f"📊 Columns found: {len(df.columns)}")
            
            # Find key columns
            member_col = 'Member'
            date_join_col = 'Date Join'
            closing_balance_col = 'Closing Balance'
            total_contributions_col = 'Total Contribution for Current Year'
            
            # Extract member data
            self.members_data = []
            
            for index, row in df.iterrows():
                try:
                    # Get member name
                    member_value = row.get(member_col)
                    if pd.isna(member_value):
                        continue
                    
                    member_name = str(member_value).strip()
                    
                    # Generate member number (M001, M002, etc.)
                    member_number = f"M{index+1:03d}"
                    
                    # Get join date
                    join_date = None
                    if date_join_col and pd.notna(row.get(date_join_col)):
                        join_date_value = row.get(date_join_col)
                        if isinstance(join_date_value, (datetime, date)):
                            join_date = join_date_value
                        elif isinstance(join_date_value, str):
                            try:
                                # Try to parse date string
                                join_date = datetime.strptime(join_date_value, '%d/%m/%Y')
                            except:
                                join_date = datetime.now()
                    else:
                        join_date = datetime.now()
                    
                    # Get financial data
                    closing_balance = 0
                    if closing_balance_col and pd.notna(row.get(closing_balance_col)):
                        try:
                            closing_balance = float(row.get(closing_balance_col))
                        except:
                            closing_balance = 0
                    
                    total_contributions = 0
                    if total_contributions_col and pd.notna(row.get(total_contributions_col)):
                        try:
                            total_contributions = float(row.get(total_contributions_col))
                        except:
                            total_contributions = 0
                    
                    # Create member data object
                    member_data = {
                        'member_number': member_number,
                        'name': member_name,
                        'join_date': join_date.isoformat() if isinstance(join_date, (datetime, date)) else datetime.now().isoformat(),
                        'closing_balance': closing_balance,
                        'total_contributions': total_contributions,
                        'email': f"member{member_number}@plf.com",
                        'phone': '',
                        'address': '',
                        'membership_status': 'active',
                    }
                    
                    self.members_data.append(member_data)
                    
                    if len(self.members_data) <= 5:
                        print(f"  Sample member {member_number}: {member_name}, Balance: R{closing_balance:,.2f}")
                    
                except Exception as e:
                    print(f"⚠️ Error processing row {index}: {e}")
                    continue
            
            print(f"\n✅ Extracted data for {len(self.members_data)} members")
            return True
            
        except Exception as e:
            print(f"❌ Error extracting member data: {e}")
            import traceback
            traceback.print_exc()
            return False
    
    def import_members_directly(self):
        """Import members directly to database without user accounts"""
        try:
            print(f"\n📤 Importing {len(self.members_data)} members directly to database...")
            
            imported_count = 0
            error_count = 0
            
            for member in self.members_data:
                try:
                    member_number = member['member_number']
                    
                    # Prepare member data for database
                    db_member_data = {
                        'member_number': member_number,
                        'name': member['name'],
                        'join_date': member['join_date'],
                        'membership_status': member['membership_status'],
                        'email': member['email'],
                        'phone': member['phone'],
                        'address': member['address'],
                        'created_at': datetime.now().isoformat(),
                    }
                    
                    # Check if member already exists
                    existing_member = supabase.table('members') \
                        .select('id, member_number') \
                        .eq('member_number', member_number) \
                        .execute()
                    
                    if existing_member.data and len(existing_member.data) > 0:
                        # Update existing member
                        member_id = existing_member.data[0]['id']
                        supabase.table('members') \
                            .update(db_member_data) \
                            .eq('id', member_id) \
                            .execute()
                        
                        member['member_id'] = member_id
                        print(f"  🔄 Updated member: {member['name']} ({member_number})")
                    else:
                        # Insert new member
                        response = supabase.table('members') \
                            .insert(db_member_data) \
                            .execute()
                        
                        if response.data and len(response.data) > 0:
                            member['member_id'] = response.data[0]['id']
                            imported_count += 1
                            print(f"  ✅ Imported member: {member['name']} ({member_number})")
                        else:
                            print(f"  ❌ Failed to import member {member_number}")
                            error_count += 1
                            
                except Exception as e:
                    print(f"  ❌ Error importing member {member.get('member_number', 'unknown')}: {e}")
                    error_count += 1
            
            print(f"\n📊 Member import results:")
            print(f"  ✅ Imported: {imported_count}")
            print(f"  🔄 Updated: {len(self.members_data) - imported_count - error_count}")
            print(f"  ❌ Errors: {error_count}")
            
            return imported_count > 0
            
        except Exception as e:
            print(f"❌ Error importing member data: {e}")
            return False
    
    def setup_member_balances_simple(self):
        """Set up member balances based on financial data"""
        try:
            print(f"\n💰 Setting up member balances...")
            
            success_count = 0
            error_count = 0
            
            for member in self.members_data:
                try:
                    member_id = member.get('member_id')
                    if not member_id:
                        continue
                    
                    closing_balance = member['closing_balance']
                    total_contributions = member['total_contributions']
                    
                    # Calculate outstanding amount (negative closing balance means outstanding)
                    outstanding_amount = abs(closing_balance) if closing_balance < 0 else 0
                    
                    # Prepare balance data
                    balance_data = {
                        'member_id': member_id,
                        'savings_balance': max(closing_balance, 0),  # Positive balance
                        'loan_balance': abs(closing_balance) if closing_balance < 0 else 0,
                        'total_contributions': total_contributions,
                        'actual_contributions': total_contributions,
                        'planned_contributions': 0,
                        'outstanding_amount': outstanding_amount,
                        'interest_earned': 0,
                        'interest_charged': 0,
                        'last_updated': datetime.now().isoformat(),
                        'created_at': datetime.now().isoformat(),
                    }
                    
                    # Check if balance already exists
                    existing_balance = supabase.table('member_balances') \
                        .select('id') \
                        .eq('member_id', member_id) \
                        .execute()
                    
                    if existing_balance.data and len(existing_balance.data) > 0:
                        # Update existing balance
                        balance_id = existing_balance.data[0]['id']
                        supabase.table('member_balances') \
                            .update(balance_data) \
                            .eq('id', balance_id) \
                            .execute()
                    else:
                        # Insert new balance
                        supabase.table('member_balances') \
                            .insert(balance_data) \
                            .execute()
                    
                    success_count += 1
                    print(f"  ✅ Balance set for member {member['member_number']}: R{closing_balance:,.2f}")
                    
                except Exception as e:
                    print(f"  ❌ Error setting balance for member {member.get('member_number', 'unknown')}: {e}")
                    error_count += 1
            
            print(f"\n📊 Balance setup results:")
            print(f"  ✅ Success: {success_count}")
            print(f"  ❌ Errors: {error_count}")
            
            return success_count > 0
            
        except Exception as e:
            print(f"❌ Error setting up member balances: {e}")
            return False
    
    def verify_import(self):
        """Verify the import was successful"""
        try:
            print(f"\n🔍 Verifying import results...")
            
            # Check total members
            members_response = supabase.table('members') \
                .select('id', count='exact') \
                .execute()
            
            total_members = members_response.count if hasattr(members_response, 'count') else len(members_response.data or [])
            print(f"📊 Total members in database: {total_members}")
            
            # Check member balances
            balances_response = supabase.table('member_balances') \
                .select('id', count='exact') \
                .execute()
            
            total_balances = balances_response.count if hasattr(balances_response, 'count') else len(balances_response.data or [])
            print(f"📊 Total member balances: {total_balances}")
            
            # Calculate total fund value
            if total_balances > 0:
                balances_data = supabase.table('member_balances') \
                    .select('savings_balance') \
                    .execute()
                
                total_savings = sum(balance.get('savings_balance', 0) for balance in (balances_data.data or []))
                total_contributions_data = supabase.table('member_balances') \
                    .select('total_contributions') \
                    .execute()
                
                total_contributions = sum(balance.get('total_contributions', 0) for balance in (total_contributions_data.data or []))
                
                print(f"💰 Total Savings Balance: R{total_savings:,.2f}")
                print(f"💰 Total Contributions: R{total_contributions:,.2f}")
            
            # Show sample of imported members
            print(f"\n📋 Sample of imported members (first 5):")
            sample_members = supabase.table('members') \
                .select('member_number, name, join_date') \
                .limit(5) \
                .execute()
            
            if sample_members.data:
                for member in sample_members.data:
                    print(f"  - {member['name']} (Member {member['member_number']}) - Joined: {member['join_date'][:10]}")
            
            print(f"\n✅ Verification complete!")
            return True
            
        except Exception as e:
            print(f"❌ Error verifying import: {e}")
            return False
    
    def run_import(self):
        """Run the complete import process"""
        print("=" * 70)
        print("🚀 SIMPLE EXCEL DATA IMPORT")
        print("=" * 70)
        
        # Step 1: Check Excel file
        print("\n📋 STEP 1: Checking Excel file...")
        if not self.check_excel_file():
            print("❌ Failed to check Excel file")
            return False
        
        # Step 2: Extract member data
        print("\n📖 STEP 2: Extracting member data...")
        if not self.extract_member_data():
            print("❌ Failed to extract member data")
            return False
        
        # Step 3: Import member data directly
        print("\n📤 STEP 3: Importing member data directly...")
        if not self.import_members_directly():
            print("❌ Failed to import member data")
            return False
        
        # Step 4: Setup member balances
        print("\n💰 STEP 4: Setting up member balances...")
        if not self.setup_member_balances_simple():
            print("⚠️ Balance setup had issues, but continuing...")
        
        # Step 5: Verify import
        print("\n🔍 STEP 5: Verifying import...")
        if not self.verify_import():
            print("⚠️ Verification had issues")
        
        print("\n" + "=" * 70)
        print("🎉 IMPORT COMPLETED SUCCESSFULLY!")
        print("=" * 70)
        
        print("\n📊 IMPORT SUMMARY:")
        print(f"  • Total members imported: {len(self.members_data)}")
        print(f"  • Total fund value: R{sum(m['closing_balance'] for m in self.members_data):,.2f}")
        
        print("\n🚀 NEXT STEPS:")
        print("1. Superuser accounts should still work")
        print("2. Member login will need to be set up separately")
        print("3. Check dashboard shows correct fund value")
        print("4. Verify member balances are accurate")
        
        return True

def main():
    """Main function"""
    # Check if Supabase credentials are available
    if not SUPABASE_SERVICE_ROLE_KEY:
        print("❌ Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required")
        print("💡 Please set it in your .env file:")
        print("   SUPABASE_SERVICE_ROLE_KEY='your-service-role-key'")
        return
    
    # Create importer instance
    importer = SimpleExcelImporter()
    
    # Run import
    success = importer.run_import()
    
    if success:
        print("\n✅ Simple data import completed successfully!")
    else:
        print("\n❌ Simple data import failed. Please check the errors above.")

if __name__ == "__main__":
    main()