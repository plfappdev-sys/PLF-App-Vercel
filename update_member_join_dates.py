#!/usr/bin/env python3
"""
PLF Member Join Dates Update Script
Purpose: Update member join dates from Excel Column B and recalculate catch-up fees
Created: November 24, 2025
"""

import os
import json
from datetime import datetime, timedelta
import pandas as pd
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://zdnyhzasvifrskbostgn.supabase.co')
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SERVICE_ROLE_KEY', '')

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

class PLFJoinDateUpdater:
    def __init__(self):
        self.members_data = []
        self.excel_data = {}
        
    def load_excel_data(self):
        """Load join dates from Excel file"""
        try:
            print("Loading join dates from Excel file...")
            file_path = 'NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025.xlsx'
            df = pd.read_excel(file_path, sheet_name='2024-2025')
            
            print(f"Excel file loaded: {len(df)} rows, {len(df.columns)} columns")
            
            # Map member names to join dates
            for index, row in df.iterrows():
                member_name = row['Member']
                join_date_str = row['Date Join']
                
                if pd.notna(member_name) and pd.notna(join_date_str):
                    # Clean up member name for matching
                    clean_name = str(member_name).strip()
                    
                    # Parse join date
                    try:
                        if isinstance(join_date_str, str):
                            # Handle different date formats
                            if '/' in join_date_str:
                                # Handle DD/MM/YYYY format
                                parts = join_date_str.split('/')
                                if len(parts) == 3:
                                    day, month, year = parts
                                    join_date = datetime(int(year), int(month), int(day))
                                else:
                                    print(f"⚠️  Invalid date format for {clean_name}: {join_date_str}")
                                    continue
                            else:
                                print(f"⚠️  Unsupported date format for {clean_name}: {join_date_str}")
                                continue
                        else:
                            # Handle Excel date numbers
                            join_date = join_date_str
                        
                        self.excel_data[clean_name] = join_date
                        
                    except Exception as e:
                        print(f"⚠️  Error parsing date for {clean_name}: {join_date_str} - {e}")
            
            print(f"Loaded {len(self.excel_data)} join dates from Excel")
            return True
            
        except Exception as e:
            print(f"❌ Error loading Excel file: {e}")
            return False
    
    def load_member_data(self):
        """Load existing member data from Supabase"""
        try:
            print("Loading member data from Supabase...")
            response = supabase.table('members').select('*').execute()
            self.members_data = response.data
            print(f"Loaded {len(self.members_data)} members from database")
            return True
        except Exception as e:
            print(f"❌ Error loading member data: {e}")
            return False
    
    def update_join_dates(self):
        """Update member join dates in database"""
        print("Updating member join dates...")
        
        updated_count = 0
        not_found_count = 0
        
        for member in self.members_data:
            member_name = member['name'].strip()
            
            if member_name in self.excel_data:
                join_date = self.excel_data[member_name]
                
                try:
                    # Update member record with join date
                    supabase.table('members').update({
                        'date_joined': join_date.isoformat() if isinstance(join_date, datetime) else str(join_date)
                    }).eq('id', member['id']).execute()
                    
                    print(f"✅ Updated {member['member_number']}. {member_name}: {join_date}")
                    updated_count += 1
                    
                except Exception as e:
                    print(f"❌ Error updating {member_name}: {e}")
            else:
                print(f"⚠️  Join date not found for: {member_name}")
                not_found_count += 1
        
        print(f"\n📊 UPDATE SUMMARY:")
        print(f"  ✅ Updated: {updated_count} members")
        print(f"  ⚠️  Not found: {not_found_count} members")
        
        return updated_count
    
    def recalculate_catch_up_fees(self):
        """Recalculate catch-up fees based on actual join dates"""
        print("\nRecalculating catch-up fees based on actual join dates...")
        
        # PLF inception date (July 2018)
        inception_date = datetime(2018, 7, 1)
        monthly_contribution = 200.00
        
        for member in self.members_data:
            try:
                # Get updated join date
                join_date_str = member.get('date_joined')
                
                if join_date_str:
                    # Parse join date
                    if isinstance(join_date_str, str):
                        try:
                            # Handle ISO format
                            if 'T' in join_date_str:
                                join_date = datetime.fromisoformat(join_date_str.replace('Z', '+00:00'))
                            else:
                                # Handle other formats
                                parts = join_date_str.split('-')
                                if len(parts) == 3:
                                    year, month, day = parts
                                    join_date = datetime(int(year), int(month), int(day))
                                else:
                                    print(f"⚠️  Invalid date format for {member['name']}: {join_date_str}")
                                    continue
                        except:
                            print(f"⚠️  Could not parse date for {member['name']}: {join_date_str}")
                            continue
                    
                    # Calculate months missed from July 2018 to join date
                    months_missed = self.calculate_months_missed(join_date, inception_date)
                    
                    # Calculate catch-up fee: R200 per missed month
                    catch_up_fee = months_missed * monthly_contribution
                    
                    # Update member record
                    try:
                        supabase.table('members').update({
                            'catch_up_fee': catch_up_fee
                        }).eq('id', member['id']).execute()
                        
                        print(f"💰 {member['member_number']}. {member['name']}: Joined {join_date.strftime('%Y-%m-%d')}, {months_missed} months missed, catch-up fee: R{catch_up_fee}")
                        
                    except Exception as e:
                        print(f"❌ Error updating catch-up fee for {member['name']}: {e}")
                else:
                    print(f"⚠️  No join date for {member['name']}, using default catch-up fee")
                    
            except Exception as e:
                print(f"❌ Error processing member {member['id']}: {e}")
    
    def calculate_months_missed(self, join_date, inception_date):
        """Calculate number of months missed from inception date to join date"""
        # Calculate total months difference
        total_months = (join_date.year - inception_date.year) * 12 + (join_date.month - inception_date.month)
        
        # If join date is after the 15th, count that month as missed
        if join_date.day > 15:
            total_months += 1
            
        return max(0, total_months)
    
    def run_update(self):
        """Run the join date update process"""
        print("Starting PLF Member Join Dates Update...")
        print("=" * 50)
        print("PLF CONSTITUTION RULES:")
        print("- Stokvel inception: July 2018")
        print("- Monthly contribution: R200")
        print("- Catch-up fee: R200 × months missed from July 2018 to join date")
        print("=" * 50)
        
        # Load data
        if not self.load_excel_data():
            print("Failed to load Excel data. Exiting.")
            return False
        
        if not self.load_member_data():
            print("Failed to load member data. Exiting.")
            return False
        
        # Update join dates
        updated_count = self.update_join_dates()
        
        if updated_count > 0:
            # Reload member data to get updated join dates
            self.load_member_data()
            
            # Recalculate catch-up fees
            self.recalculate_catch_up_fees()
        
        print("\n" + "=" * 50)
        print("Join date update completed!")
        print("Please verify the data in the members table:")
        print("- date_joined (updated from Excel Column B)")
        print("- catch_up_fee (recalculated based on actual join dates)")
        
        return True

def main():
    """Main function"""
    # Check if Supabase credentials are available
    if not SUPABASE_SERVICE_ROLE_KEY:
        print("Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required")
        print("Please set it before running this script:")
        print("export SUPABASE_SERVICE_ROLE_KEY='your-service-role-key'")
        return
    
    # Create updater instance
    updater = PLFJoinDateUpdater()
    
    # Run update
    success = updater.run_update()
    
    if success:
        print("\nJoin date update completed successfully!")
    else:
        print("\nJoin date update failed. Please check the errors above.")

if __name__ == "__main__":
    main()
