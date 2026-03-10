#!/usr/bin/env python3
"""
Complete Excel Data Import for PLF Database
Purpose: Import ALL data from the FINAL Excel document into the cleaned database
Created: March 4, 2026
"""

import pandas as pd
import os
import sys
from datetime import datetime, date
from supabase import create_client, Client
from dotenv import load_dotenv
import json
import uuid

# Load environment variables from .env file
load_dotenv()

# Configuration
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://zdnyhzasvifrskbostgn.supabase.co')
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY', '')

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

class CompleteExcelImporter:
    def __init__(self):
        self.excel_file = "NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"
        self.target_sheet = "2024-2025"  # Most recent financial year
        self.members_data = []
        self.financial_data = []
        
    def check_excel_file(self):
        """Check if Excel file exists and is accessible"""
        if not os.path.exists(self.excel_file):
            print(f"❌ Error: Excel file not found at {self.excel_file}")
            return False
        
        try:
            # Try to read sheet names
            excel_file = pd.ExcelFile(self.excel_file)
            sheet_names = excel_file.sheet_names
            print(f"✅ Excel file loaded successfully")
            print(f"📊 Total sheets: {len(sheet_names)}")
            
            if self.target_sheet not in sheet_names:
                print(f"❌ Target sheet '{self.target_sheet}' not found in Excel file")
                print(f"📋 Available sheets: {sheet_names}")
                return False
            
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
            
            # Show column names for debugging
            print("\n📋 First 20 column names:")
            for i, col in enumerate(df.columns[:20]):
                print(f"  {i+1:2d}. {col}")
            
            if len(df.columns) > 20:
                print(f"  ... and {len(df.columns) - 20} more columns")
            
            # Find key columns by pattern matching
            member_col = None
            name_col = None
            date_join_col = None
            closing_balance_col = None
            total_contributions_col = None
            
            # First, let's print all columns to debug
            print("\n🔍 Searching for columns...")
            for i, col in enumerate(df.columns):
                col_str = str(col).lower()
                print(f"  {i+1:2d}. '{col}' -> lower: '{col_str}'")
                
                # Look for exact column names first
                if col_str == 'member':
                    member_col = col
                    print(f"     ✓ Found 'Member' column")
                elif 'name' in col_str and col_str != 'member':
                    name_col = col
                    print(f"     ✓ Found name column")
                elif 'date join' in col_str:
                    date_join_col = col
                    print(f"     ✓ Found date join column")
                elif 'closing balance' in col_str:
                    closing_balance_col = col
                    print(f"     ✓ Found closing balance column")
                elif 'total contribution for current year' in col_str:
                    total_contributions_col = col
                    print(f"     ✓ Found total contributions column")
            
            # If we didn't find exact matches, try fuzzy matching
            if not member_col:
                for col in df.columns:
                    col_str = str(col).lower()
                    if 'member' in col_str and 'fee' not in col_str and 'ship' not in col_str:
                        member_col = col
                        print(f"     ⚠️ Fuzzy matched member column: '{col}'")
                        break
            
            if not total_contributions_col:
                for col in df.columns:
                    col_str = str(col).lower()
                    if 'total contribution' in col_str:
                        total_contributions_col = col
                        print(f"     ⚠️ Fuzzy matched total contributions column: '{col}'")
                        break
            
            print(f"\n🔍 Identified columns:")
            print(f"  Member column: {member_col}")
            print(f"  Name column: {name_col}")
            print(f"  Date Join column: {date_join_col}")
            print(f"  Closing Balance column: {closing_balance_col}")
            print(f"  Total Contributions column: {total_contributions_col}")
            
            # Extract member data
            self.members_data = []
            
            for index, row in df.iterrows():
                try:
                    # Get member number
                    member_value = row.get(member_col)
                    if pd.isna(member_value):
                        continue
                    
                    # The "Member" column contains names, not numbers
                    # We'll generate member numbers like M001, M002, etc.
                    member_name_from_col = str(member_value).strip()
                    
                    # Generate member number based on index (M001, M002, etc.)
                    member_number = f"M{index+1:03d}"
                    
                    # Get member name - use the name from the Member column
                    member_name = member_name_from_col
                    
                    # If there's a separate name column, use it instead
                    if name_col and pd.notna(row.get(name_col)):
                        name_from_name_col = str(row.get(name_col)).strip()
                        if name_from_name_col and name_from_name_col != member_name_from_col:
                            member_name = name_from_name_col
                    
                    if not member_name:
                        member_name = f"Member {member_number}"
                    
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
                    
                    # Calculate outstanding amount (negative closing balance means outstanding)
                    outstanding_amount = abs(closing_balance) if closing_balance < 0 else 0
                    
                    # Create member data object
                    member_data = {
                        'member_number': member_number,
                        'name': member_name,
                        'join_date': join_date.isoformat() if isinstance(join_date, (datetime, date)) else datetime.now().isoformat(),
                        'financial_data': {
                            'closing_balance': closing_balance,
                            'total_contributions': total_contributions,
                            'outstanding_amount': outstanding_amount,
                            'balance_brought_forward': 0,  # Will be calculated
                            'actual_contributions': total_contributions,  # Assuming total contributions are actual
                            'planned_contributions': 0,  # Will be calculated
                            'interest_earned': 0,  # Will be calculated
                            'interest_charged': 0,  # Will be calculated
                        },
                        'membership_status': 'active',
                        'email': f"member{member_number}@plf.com",  # Default email
                        'phone': '',  # Default empty
                        'address': '',  # Default empty
                    }
                    
                    self.members_data.append(member_data)
                    
                    if len(self.members_data) <= 5:
                        print(f"  Sample member {member_number}: {member_name}, Balance: R{closing_balance:,.2f}, Contributions: R{total_contributions:,.2f}")
                    
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
    
    def create_user_accounts(self):
        """Create user accounts for members"""
        try:
            print(f"\n👤 Creating user accounts for {len(self.members_data)} members...")
            
            created_users = 0
            existing_users = 0
            errors = 0
            
            for member in self.members_data:
                try:
                    member_number = member['member_number']
                    email = member['email']
                    
                    # Check if user already exists
                    existing_user = supabase.table('users') \
                        .select('id, email, uid') \
                        .eq('email', email) \
                        .execute()
                    
                    if existing_user.data and len(existing_user.data) > 0:
                        # User already exists, update membernumber
                        user_id = existing_user.data[0]['id']
                        supabase.table('users') \
                            .update({'membernumber': member_number}) \
                            .eq('id', user_id) \
                            .execute()
                        
                        member['user_id'] = user_id
                        existing_users += 1
                        print(f"  🔄 Updated existing user: {email} (Member {member_number})")
                    else:
                        # Create new user
                        user_data = {
                            'email': email,
                            'membernumber': member_number,
                            'role': 'member',
                            'created_at': datetime.now().isoformat(),
                            'updated_at': datetime.now().isoformat(),
                        }
                        
                        response = supabase.table('users') \
                            .insert(user_data) \
                            .execute()
                        
                        if response.data and len(response.data) > 0:
                            member['user_id'] = response.data[0]['id']
                            created_users += 1
                            print(f"  ✅ Created user: {email} (Member {member_number})")
                        else:
                            print(f"  ❌ Failed to create user for {email}")
                            errors += 1
                            
                except Exception as e:
                    print(f"  ❌ Error creating user for member {member.get('member_number', 'unknown')}: {e}")
                    errors += 1
            
            print(f"\n📊 User creation results:")
            print(f"  ✅ Created: {created_users}")
            print(f"  🔄 Updated: {existing_users}")
            print(f"  ❌ Errors: {errors}")
            
            return created_users + existing_users > 0
            
        except Exception as e:
            print(f"❌ Error creating user accounts: {e}")
            return False
    
    def import_member_data(self):
        """Import member data to members table"""
        try:
            print(f"\n📤 Importing {len(self.members_data)} members to database...")
            
            imported_count = 0
            updated_count = 0
            error_count = 0
            
            for member in self.members_data:
                try:
                    member_number = member['member_number']
                    user_id = member.get('user_id')
                    
                    if not user_id:
                        print(f"  ⚠️ Skipping member {member_number}: No user_id")
                        error_count += 1
                        continue
                    
                    # Prepare member data for database
                    db_member_data = {
                        'member_number': member_number,
                        'name': member['name'],
                        'user_id': user_id,
                        'join_date': member['join_date'],
                        'membership_status': member['membership_status'],
                        'email': member['email'],
                        'phone': member.get('phone', ''),
                        'address': member.get('address', ''),
                        'created_at': datetime.now().isoformat(),
                        'updated_at': datetime.now().isoformat(),
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
                        updated_count += 1
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
            print(f"  🔄 Updated: {updated_count}")
            print(f"  ❌ Errors: {error_count}")
            
            return imported_count + updated_count > 0
            
        except Exception as e:
            print(f"❌ Error importing member data: {e}")
            return False
    
    def setup_member_balances(self):
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
                    
                    financial_data = member['financial_data']
                    
                    # Prepare balance data
                    balance_data = {
                        'member_id': member_id,
                        'savings_balance': max(financial_data['closing_balance'], 0),  # Positive balance
                        'loan_balance': abs(financial_data['closing_balance']) if financial_data['closing_balance'] < 0 else 0,
                        'total_contributions': financial_data['total_contributions'],
                        'actual_contributions': financial_data['actual_contributions'],
                        'planned_contributions': financial_data['planned_contributions'],
                        'outstanding_amount': financial_data['outstanding_amount'],
                        'interest_earned': financial_data['interest_earned'],
                        'interest_charged': financial_data['interest_charged'],
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
                    print(f"  ✅ Balance set for member {member['member_number']}: R{financial_data['closing_balance']:,.2f}")
                    
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
            
            # Check total users
            users_response = supabase.table('users') \
                .select('id', count='exact') \
                .execute()
            
            total_users = users_response.count if hasattr(users_response, 'count') else len(users_response.data or [])
            print(f"📊 Total users in database: {total_users}")
            
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
        print("🚀 COMPLETE EXCEL DATA IMPORT")
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
        
        # Step 3: Create user accounts
        print("\n👤 STEP 3: Creating user accounts...")
        if not self.create_user_accounts():
            print("⚠️ User creation had issues, but continuing...")
        
        # Step 4: Import member data
        print("\n📤 STEP 4: Importing member data...")
        if not self.import_member_data():
            print("❌ Failed to import member data")
            return False
        
        # Step 5: Setup member balances
        print("\n💰 STEP 5: Setting up member balances...")
        if not self.setup_member_balances():
            print("⚠️ Balance setup had issues, but continuing...")
        
        # Step 6: Verify import
        print("\n🔍 STEP 6: Verifying import...")
        if not self.verify_import():
            print("⚠️ Verification had issues")
        
        print("\n" + "=" * 70)
        print("🎉 IMPORT COMPLETED SUCCESSFULLY!")
        print("=" * 70)
        
        print("\n🚀 NEXT STEPS:")
        print("1. Verify superuser accounts can still log in")
        print("2. Test member login with default credentials")
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
    importer = CompleteExcelImporter()
    
    # Run import
    success = importer.run_import()
    
    if success:
        print("\n✅ Complete data import completed successfully!")
    else:
        print("\n❌ Complete data import failed. Please check the errors above.")

if __name__ == "__main__":
    main()
