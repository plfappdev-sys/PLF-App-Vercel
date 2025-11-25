#!/usr/bin/env python3
"""
PLF Complete Data Replacement Script
Purpose: Replace all database data with updated data from Excel file
Created: October 22, 2025
"""

import os
import json
import pandas as pd
from datetime import datetime, timedelta
import math
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://zdnyhzasvifrskbostgn.supabase.co')
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SERVICE_ROLE_KEY', '')

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

class PLFDataReplacement:
    def __init__(self):
        self.excel_file = "NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025.xlsx"
        self.members_data = []
        self.contributions_data = []
        self.member_balances_data = []
        
    def verify_excel_file(self):
        """Verify the Excel file exists and has the expected structure"""
        print("Verifying Excel file...")
        if not os.path.exists(self.excel_file):
            print(f"Error: Excel file not found at {self.excel_file}")
            return False
            
        try:
            # Load workbook to check structure
            import openpyxl
            workbook = openpyxl.load_workbook(self.excel_file)
            sheet_names = workbook.sheetnames
            print(f"Excel file verified. Sheets found: {sheet_names}")
            workbook.close()
            return True
        except Exception as e:
            print(f"Error verifying Excel file: {e}")
            return False
    
    def clear_existing_data(self):
        """Clear all existing data except superusers"""
        print("Clearing existing data (except superusers)...")
        
        try:
            # Get superuser IDs to preserve
            superusers_response = supabase.table('users').select('id').eq('role', 'superuser').execute()
            superuser_ids = [user['id'] for user in superusers_response.data]
            print(f"Preserving {len(superuser_ids)} superusers")
            
            # Clear all tables except users (we'll preserve superusers)
            tables_to_clear = [
                'members', 'transactions', 'loans', 'interest_accruals',
                'contributions', 'member_balances', 'audit_logs'
            ]
            
            for table in tables_to_clear:
                try:
                    if table == 'members':
                        # For members, delete all except those linked to superusers
                        response = supabase.table(table).delete().not_.eq('user_id', superuser_ids[0] if superuser_ids else '').execute()
                    else:
                        # For other tables, delete all records using a different approach
                        # Try to delete all records by selecting first and then deleting
                        records = supabase.table(table).select('id').execute()
                        if records.data:
                            for record in records.data:
                                try:
                                    supabase.table(table).delete().eq('id', record['id']).execute()
                                except Exception as e:
                                    print(f"Warning: Could not delete record {record['id']} from {table}: {e}")
                    print(f"Cleared {table} table")
                except Exception as e:
                    print(f"Error clearing {table}: {e}")
            
            # Clear non-superuser users
            if superuser_ids:
                response = supabase.table('users').delete().not_.in_('id', superuser_ids).execute()
                print(f"Cleared non-superuser users")
            
            print("Data clearing completed successfully")
            return True
            
        except Exception as e:
            print(f"Error clearing data: {e}")
            return False
    
    def extract_member_data_from_excel(self):
        """Extract member data from Excel file"""
        print("Extracting member data from Excel...")
        
        try:
            # Read the most recent financial year sheet (2024-2025)
            df = pd.read_excel(self.excel_file, sheet_name='2024-2025')
            
            # Extract member information
            members = []
            for index, row in df.iterrows():
                if pd.notna(row.get('Member')) and str(row.get('Member')).strip() != '':
                    member_data = {
                        'member_number': f"M{index+1:03d}",
                        'name': str(row.get('Member')).strip(),
                        'date_joined': self.parse_date(row.get('Date Join')),
                        'membership_fee': float(row.get('Membership Fee (Once-Off)', 0) or 0),
                        'expected_contribution': float(row.get('Expected Contribution (Current Year)', 200) or 200),
                        'catch_up_fee': 0.0,  # Will be calculated separately
                        'closing_balance': float(row.get('Closing Balance', 0) or 0),
                        'share_value': float(row.get('Share Value', 0) or 0),
                        'status': 'active',
                        'created_at': datetime.now().isoformat(),
                        'updated_at': datetime.now().isoformat()
                    }
                    members.append(member_data)
            
            self.members_data = members
            print(f"Extracted {len(self.members_data)} members from Excel")
            return True
            
        except Exception as e:
            print(f"Error extracting member data: {e}")
            return False
    
    def parse_date(self, date_value):
        """Parse date from various formats"""
        if pd.isna(date_value):
            return datetime.now().date().isoformat()
        
        try:
            if isinstance(date_value, datetime):
                return date_value.date().isoformat()
            elif isinstance(date_value, str):
                # Try to parse common date formats
                for fmt in ['%d/%m/%Y', '%Y-%m-%d', '%m/%d/%Y']:
                    try:
                        return datetime.strptime(date_value, fmt).date().isoformat()
                    except ValueError:
                        continue
            return datetime.now().date().isoformat()
        except:
            return datetime.now().date().isoformat()
    
    def import_members_to_database(self):
        """Import extracted member data to database"""
        print("Importing members to database...")
        
        try:
            # Get superuser ID to link members
            superusers_response = supabase.table('users').select('id').eq('role', 'superuser').execute()
            superuser_id = superusers_response.data[0]['id'] if superusers_response.data else None
            
            imported_count = 0
            for member_data in self.members_data:
                try:
                    # Create member record - using only columns that exist in the database
                    member_record = {
                        'member_number': member_data['member_number'],
                        'name': member_data['name'],
                        'membership_fee': member_data['membership_fee'],
                        'monthly_contribution': member_data['expected_contribution'],
                        'catch_up_fee': member_data['catch_up_fee'],
                        'status': member_data['status'],
                        'user_id': superuser_id,  # Link to superuser for now
                        'created_at': member_data['created_at'],
                        'updated_at': member_data['updated_at']
                    }
                    
                    response = supabase.table('members').insert(member_record).execute()
                    imported_count += 1
                    print(f"Imported member: {member_data['name']} ({member_data['member_number']})")
                    
                except Exception as e:
                    print(f"Error importing member {member_data['name']}: {e}")
            
            print(f"Successfully imported {imported_count} members")
            return True
            
        except Exception as e:
            print(f"Error importing members: {e}")
            return False
    
    def create_initial_balances(self):
        """Create initial member balances based on Excel data"""
        print("Creating initial member balances...")
        
        try:
            # Get all members from database
            members_response = supabase.table('members').select('*').execute()
            members = members_response.data
            
            for member in members:
                try:
                    # Find matching member in Excel data
                    excel_member = next((m for m in self.members_data if m['name'] == member['name']), None)
                    
                    if excel_member:
                        balance_data = {
                            'member_id': member['id'],
                            'savings_balance': excel_member['closing_balance'],
                            'loan_balance': 0.0,
                            'net_balance': excel_member['closing_balance'],
                            'available_funds': excel_member['closing_balance'],
                            'share_value': excel_member['share_value'],
                            'last_updated': datetime.now().isoformat(),
                            'created_at': datetime.now().isoformat(),
                            'updated_at': datetime.now().isoformat()
                        }
                        
                        response = supabase.table('member_balances').insert(balance_data).execute()
                        print(f"Created balance for {member['name']}: R{excel_member['closing_balance']}")
                    
                except Exception as e:
                    print(f"Error creating balance for {member['name']}: {e}")
            
            print("Initial balances created successfully")
            return True
            
        except Exception as e:
            print(f"Error creating initial balances: {e}")
            return False
    
    def setup_financial_years(self):
        """Set up financial years for the new data"""
        print("Setting up financial years...")
        
        try:
            # Get superuser ID for created_by field
            superusers_response = supabase.table('users').select('id').eq('role', 'superuser').execute()
            superuser_id = None
            
            # Safely get superuser ID
            if superusers_response.data and len(superusers_response.data) > 0:
                superuser_id = superusers_response.data[0]['id']
            
            if not superuser_id:
                print("Warning: No superuser found, using default UUID")
                # Use a default UUID if no superuser exists
                superuser_id = '00000000-0000-0000-0000-000000000000'
            
            # Clear existing financial years
            supabase.table('financial_years').delete().neq('id', '').execute()
            
            # Create current financial year (2024-2025)
            current_year = {
                'year_name': '2024-2025',
                'start_date': '2024-07-01',
                'end_date': '2025-06-30',
                'savings_interest_rate': 5.5,  # Default rate
                'loan_interest_rate': 20.0,    # Default rate
                'is_current': True,
                'created_by': superuser_id,  # Add the required created_by field
                'created_at': datetime.now().isoformat(),
                'updated_at': datetime.now().isoformat()
            }
            
            response = supabase.table('financial_years').insert(current_year).execute()
            print("Financial year 2024-2025 set up successfully")
            
            return True
            
        except Exception as e:
            print(f"Error setting up financial years: {e}")
            return False
    
    def setup_system_settings(self):
        """Set up system settings for the new business logic"""
        print("Setting up system settings...")
        
        try:
            # Clear existing settings
            supabase.table('system_settings').delete().neq('id', '').execute()
            
            # Create default system settings
            settings = [
                {
                    'setting_key': 'monthly_contribution_amount',
                    'setting_value': '200',
                    'description': 'Default monthly contribution amount',
                    'created_at': datetime.now().isoformat(),
                    'updated_at': datetime.now().isoformat()
                },
                {
                    'setting_key': 'late_fee_percentage',
                    'setting_value': '7',
                    'description': 'Late fee percentage applied after due date',
                    'created_at': datetime.now().isoformat(),
                    'updated_at': datetime.now().isoformat()
                },
                {
                    'setting_key': 'grace_period_days',
                    'setting_value': '7',
                    'description': 'Grace period in days before late fees apply',
                    'created_at': datetime.now().isoformat(),
                    'updated_at': datetime.now().isoformat()
                },
                {
                    'setting_key': 'penalty_interest_rate',
                    'setting_value': '40',
                    'description': 'Penalty interest rate for overdue loans',
                    'created_at': datetime.now().isoformat(),
                    'updated_at': datetime.now().isoformat()
                }
            ]
            
            for setting in settings:
                supabase.table('system_settings').insert(setting).execute()
            
            print("System settings configured successfully")
            return True
            
        except Exception as e:
            print(f"Error setting up system settings: {e}")
            return False
    
    def run_replacement(self):
        """Run the complete data replacement process"""
        print("Starting PLF Complete Data Replacement...")
        print("=" * 60)
        
        # Step 1: Verify Excel file
        if not self.verify_excel_file():
            print("Excel file verification failed. Exiting.")
            return False
        
        # Step 2: Clear existing data
        if not self.clear_existing_data():
            print("Data clearing failed. Exiting.")
            return False
        
        # Step 3: Extract member data from Excel
        if not self.extract_member_data_from_excel():
            print("Member data extraction failed. Exiting.")
            return False
        
        # Step 4: Import members to database
        if not self.import_members_to_database():
            print("Member import failed. Exiting.")
            return False
        
        # Step 5: Create initial balances
        if not self.create_initial_balances():
            print("Initial balance creation failed. Exiting.")
            return False
        
        # Step 6: Set up financial years
        if not self.setup_financial_years():
            print("Financial year setup failed. Exiting.")
            return False
        
        # Step 7: Set up system settings
        if not self.setup_system_settings():
            print("System settings setup failed. Exiting.")
            return False
        
        print("\n" + "=" * 60)
        print("DATA REPLACEMENT COMPLETED SUCCESSFULLY!")
        print("=" * 60)
        print("Summary:")
        print(f"- Members imported: {len(self.members_data)}")
        print("- Initial balances created")
        print("- Financial years configured")
        print("- System settings updated")
        print("\nNext steps:")
        print("1. Verify the data in the application")
        print("2. Test member login and dashboard functionality")
        print("3. Test contribution tracking and reporting")
        
        return True

def main():
    """Main function"""
    # Check if Supabase credentials are available
    if not SUPABASE_SERVICE_ROLE_KEY:
        print("Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required")
        print("Please set it before running this script:")
        print("export SUPABASE_SERVICE_ROLE_KEY='your-service-role-key'")
        return
    
    # Create replacement instance
    replacer = PLFDataReplacement()
    
    # Run replacement
    success = replacer.run_replacement()
    
    if success:
        print("\n🎉 Data replacement completed successfully!")
        print("The database now contains the updated data from the Excel file.")
    else:
        print("\n❌ Data replacement failed. Please check the errors above.")

if __name__ == "__main__":
    main()
