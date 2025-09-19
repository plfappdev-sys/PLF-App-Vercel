import json
import asyncio
from supabase import create_client, Client
from datetime import datetime
from typing import Dict, List, Optional
import os
import supabase_service_config as config

class SingleMemberTestImporter:
    def __init__(self, use_service_key=True):
        try:
            if use_service_key:
                # Use service role key for admin operations
                supabase_config = config.get_supabase_config()
                self.supabase_url = supabase_config["url"]
                self.supabase_key = supabase_config["key"]
            else:
                # Fallback to anon key from existing config (for testing)
                from supabase.config import supabaseUrl, supabaseAnonKey
                self.supabase_url = supabaseUrl
                self.supabase_key = supabaseAnonKey
            
            # Initialize Supabase client
            self.supabase: Client = create_client(self.supabase_url, self.supabase_key)
            print("✅ Supabase client initialized successfully")
            print(f"🔑 Using key: {'Service Role' if use_service_key else 'Anonymous'}")
            
        except Exception as e:
            print(f"❌ Failed to initialize Supabase client: {e}")
            print("💡 Trying with anonymous key instead...")
            self.fallback_to_anon_key()
    
    def fallback_to_anon_key(self):
        """Fallback to anonymous key if service key fails"""
        try:
            # Try to import from existing supabase.config.js
            import subprocess
            import sys
            
            # Install supabase client if not available
            try:
                import supabase
            except ImportError:
                print("📦 Installing supabase client...")
                subprocess.check_call([sys.executable, "-m", "pip", "install", "supabase"])
                import supabase
            
            # Use anonymous key from existing configuration
            self.supabase_url = "https://zdnyhzasvifrskbostgn.supabase.co"
            self.supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM"
            
            self.supabase: Client = create_client(self.supabase_url, self.supabase_key)
            print("✅ Supabase client initialized with anonymous key")
            print("⚠️  Note: Some operations may require service role key for admin access")
            
        except Exception as e:
            print(f"❌ Failed to initialize with anonymous key: {e}")
            raise
    
    def load_member_data(self, json_file_path: str) -> Optional[Dict]:
        """Load member data from JSON file"""
        try:
            with open(json_file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                print(f"✅ Loaded member data from {json_file_path}")
                print(f"📊 Total members available: {data['extraction_info']['total_members_extracted']}")
                return data
        except Exception as e:
            print(f"❌ Error loading JSON file: {e}")
            return None
    
    def get_single_member_for_testing(self, excel_data: Dict, member_number: str = None) -> List[Dict]:
        """Get a single member for testing - defaults to first member if none specified"""
        transformed_members = []
        members_list = list(excel_data['members'].items())
        
        if not members_list:
            print("❌ No members found in JSON data")
            return []
        
        # Use specified member number or first member
        if member_number:
            member_key = f"Member {member_number}"
            if member_key not in excel_data['members']:
                print(f"❌ Member {member_number} not found in data")
                print(f"💡 Available members: {list(excel_data['members'].keys())}")
                return []
            member_name, member_data = member_key, excel_data['members'][member_key]
        else:
            # Use first member
            member_name, member_data = members_list[0]
        
        try:
            # Extract basic member information
            excel_row = member_data['data']
            member_number = excel_row.get('Member', '').replace('Member ', '').strip()
            
            if not member_number.isdigit():
                print(f"⚠️  Skipping invalid member number: {member_number}")
                return []
            
            # Transform financial data (same as original importer)
            financial_info = {
                'total_contributions': float(excel_row.get('Total Contribution for  4 Years (2018-24)', 0) or 0),
                'current_balance': float(excel_row.get('Closing Balance', 0) or 0),
                'outstanding_amount': abs(float(excel_row.get('Closing Balance', 0) or 0)) if float(excel_row.get('Closing Balance', 0) or 0) < 0 else 0,
                'balance_brought_forward': float(excel_row.get('Balance Brought Forward ', 0) or 0),
                'planned_contributions': float(excel_row.get('Expected Contribution (Current Year)', 0) or 0),
                'actual_contributions': float(excel_row.get('Total Contribution for Current Year', 0) or 0),
                'current_interest_earned': float(excel_row.get('Total Interest Earned @ 5,5%', 0) or 0),
                'total_interest_earned': float(excel_row.get('Total Interest Earned @ 5,5%', 0) or 0),
                'current_interest_charged': 0,
                'total_interest_charged': 0,
                'last_interest_calculation': datetime.now().isoformat(),
                'interest_rate': 5.5
            }
            
            # Calculate percentage outstanding
            if financial_info['total_contributions'] > 0:
                financial_info['percentage_outstanding'] = (
                    financial_info['outstanding_amount'] / financial_info['total_contributions'] * 100
                )
            else:
                financial_info['percentage_outstanding'] = 0
            
            # Determine standing category
            percentage = financial_info['percentage_outstanding']
            if percentage == 0:
                standing_category = 'good'
            elif percentage <= 10:
                standing_category = 'owing_10'
            elif percentage <= 20:
                standing_category = 'owing_20'
            elif percentage <= 30:
                standing_category = 'owing_30'
            elif percentage <= 50:
                standing_category = 'owing_50'
            elif percentage <= 65:
                standing_category = 'owing_65'
            else:
                standing_category = 'owing_65_plus'
            
            # Create member object for Supabase
            member = {
                'member_number': member_number,
                'personal_info': {
                    'firstName': member_name.split(' ')[0] if ' ' in member_name else member_name,
                    'lastName': member_name.split(' ')[1] if ' ' in member_name and len(member_name.split(' ')) > 1 else '',
                    'fullName': member_name
                },
                'financial_info': financial_info,
                'membership_status': {
                    'isActive': True,
                    'standingCategory': standing_category
                },
                'interest_settings': {
                    'calculationMethod': 'daily',
                    'compounding': True,
                    'taxDeduction': 0
                },
                'join_date': self.parse_date(excel_row.get('Date Join', '')),
                'last_updated': datetime.now().isoformat(),
                'created_at': datetime.now().isoformat()
            }
            
            transformed_members.append(member)
            print(f"✅ Transformed data for test member {member_number} ({member_name})")
            
        except Exception as e:
            print(f"❌ Error transforming data for {member_name}: {e}")
        
        return transformed_members
    
    def parse_date(self, date_str: str) -> str:
        """Parse various date formats from Excel"""
        if not date_str:
            return datetime.now().isoformat()
        
        try:
            if isinstance(date_str, str):
                if '/' in date_str:
                    parts = date_str.split('/')
                    if len(parts) == 3:
                        day, month, year = parts
                        if len(year) == 2:
                            year = f"20{year}"
                        return datetime(int(year), int(month), int(day)).isoformat()
                return datetime.fromisoformat(date_str.replace('Z', '+00:00')).isoformat()
        except:
            pass
        
        return datetime.now().isoformat()
    
    async def import_to_supabase(self, members: List[Dict]):
        """Import transformed member data to Supabase"""
        success_count = 0
        error_count = 0
        
        for member in members:
            try:
                # Check if member already exists
                existing_member = self.supabase.table('members') \
                    .select('*') \
                    .eq('member_number', member['member_number']) \
                    .execute()
                
                if existing_member.data and len(existing_member.data) > 0:
                    # Update existing member
                    response = self.supabase.table('members') \
                        .update({
                            'personal_info': member['personal_info'],
                            'financial_info': member['financial_info'],
                            'membership_status': member['membership_status'],
                            'interest_settings': member['interest_settings'],
                            'last_updated': member['last_updated']
                        }) \
                        .eq('member_number', member['member_number']) \
                        .execute()
                    
                    print(f"🔄 Updated existing member {member['member_number']}")
                else:
                    # Insert new member
                    response = self.supabase.table('members') \
                        .insert(member) \
                        .execute()
                    
                    print(f"✅ Imported new test member {member['member_number']}")
                
                success_count += 1
                
            except Exception as e:
                print(f"❌ Error importing member {member.get('member_number', 'unknown')}: {e}")
                error_count += 1
        
        return success_count, error_count
    
    def run_test_import(self, json_file_path: str, test_member_number: str = None):
        """Run a test import with a single member"""
        print("=" * 60)
        print("🧪 Single Member Test Import")
        print("=" * 60)
        
        # Load data from JSON
        member_data = self.load_member_data(json_file_path)
        if not member_data:
            return
        
        # Get single member for testing
        print(f"\n🔍 Selecting test member...")
        if test_member_number:
            print(f"   Using specified member: {test_member_number}")
        else:
            print(f"   Using first available member")
        
        test_member = self.get_single_member_for_testing(member_data, test_member_number)
        
        if not test_member:
            print("❌ No valid test member found")
            return
        
        print(f"📊 Ready to import 1 test member")
        print(f"   Member Number: {test_member[0]['member_number']}")
        print(f"   Name: {test_member[0]['personal_info']['fullName']}")
        print(f"   Standing: {test_member[0]['membership_status']['standingCategory']}")
        
        # Confirm before proceeding
        confirmation = input("\n⚠️  Proceed with test import? (y/N): ").strip().lower()
        if confirmation != 'y':
            print("Test import cancelled")
            return
        
        # Import to Supabase
        print("\n📤 Importing test member to Supabase...")
        success_count, error_count = asyncio.run(self.import_to_supabase(test_member))
        
        # Print results
        print("\n" + "=" * 60)
        print("📊 Test Import Results:")
        print(f"✅ Successful: {success_count}")
        print(f"❌ Errors: {error_count}")
        
        if success_count > 0:
            print(f"\n🎉 Test import successful!")
            print(f"💡 You can now verify the member data in your application")
            print(f"💡 Run the full import when ready using: python import_members_to_supabase.py")
        else:
            print(f"\n❌ Test import failed")
            print(f"💡 Check the error above and ensure:")
            print(f"   - Database cleanup was completed")
            print(f"   - Supabase service role key is correct")
            print(f"   - members table exists with proper schema")

def main():
    # Default JSON file path
    json_file_path = "selected_members_2024_2025.json"
    
    # Allow custom file path and member number
    import argparse
    parser = argparse.ArgumentParser(description='Test import a single member to Supabase')
    parser.add_argument('--file', type=str, default=json_file_path, help='Path to JSON file with member data')
    parser.add_argument('--member', type=str, help='Specific member number to test (e.g., "6")')
    args = parser.parse_args()
    
    try:
        importer = SingleMemberTestImporter()
        importer.run_test_import(args.file, args.member)
    except Exception as e:
        print(f"❌ Failed to initialize test importer: {e}")
        print("💡 Make sure to:")
        print("   1. Install supabase client: pip install supabase")
        print("   2. Set correct SUPABASE_URL and SUPABASE_KEY")
        print("   3. Use service role key for admin operations")

if __name__ == "__main__":
    main()
