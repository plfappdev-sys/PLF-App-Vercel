#!/usr/bin/env python3
"""
Fix member names and numbers in database
This script will:
1. Assign member numbers (M001, M002, etc.) to all members
2. Update the 'name' column with names from personal_info
3. Fix personal_info JSON structure to match frontend expectations
"""

import os
import json
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://zdnyhzasvifrskbostgn.supabase.co')
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY', '')

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

def fix_member_names_and_numbers():
    """Fix member names and numbers in database"""
    print("🔧 Fixing member names and numbers...")
    print("="*60)
    
    try:
        # Get all members from database
        members_result = supabase.table('members').select('*').order('id').execute()
        
        if not members_result.data:
            print("❌ No members found in database")
            return False
        
        print(f"📊 Found {len(members_result.data)} members to fix")
        
        fixed_count = 0
        error_count = 0
        
        for i, member in enumerate(members_result.data):
            try:
                member_id = member['id']
                current_member_number = member.get('member_number')
                current_name = member.get('name')
                personal_info_str = member.get('personal_info')
                
                # Generate member number if not set (M001, M002, etc.)
                if not current_member_number or current_member_number == 'None':
                    new_member_number = f"M{i+1:03d}"
                else:
                    new_member_number = current_member_number
                
                # Extract name from personal_info
                new_name = None
                new_personal_info = None
                
                if personal_info_str and personal_info_str != 'None':
                    try:
                        # Parse personal_info JSON string
                        personal_info = json.loads(personal_info_str)
                        
                        # Extract name from personal_info
                        if isinstance(personal_info, dict):
                            # Check for different possible name fields
                            name_from_personal = personal_info.get('name') or \
                                                personal_info.get('fullName') or \
                                                personal_info.get('firstName')
                            
                            if name_from_personal:
                                new_name = name_from_personal
                                
                                # Create proper personal_info structure for frontend
                                new_personal_info = {
                                    'firstName': name_from_personal.split()[0] if ' ' in name_from_personal else name_from_personal,
                                    'lastName': name_from_personal.split()[-1] if ' ' in name_from_personal else '',
                                    'fullName': name_from_personal,
                                    'email': personal_info.get('email', f'member{new_member_number}@plf.com'),
                                    'phone': personal_info.get('phone', ''),
                                    'address': personal_info.get('address', '')
                                }
                    except json.JSONDecodeError:
                        # personal_info is not valid JSON, create new structure
                        print(f"  ⚠️ personal_info is not valid JSON for member {member_id}")
                        new_name = f"Member {new_member_number}"
                        new_personal_info = {
                            'firstName': f"Member",
                            'lastName': new_member_number,
                            'fullName': f"Member {new_member_number}",
                            'email': f'member{new_member_number}@plf.com',
                            'phone': '',
                            'address': ''
                        }
                
                # If we couldn't extract name from personal_info, create one
                if not new_name:
                    new_name = f"Member {new_member_number}"
                
                if not new_personal_info:
                    new_personal_info = {
                        'firstName': f"Member",
                        'lastName': new_member_number,
                        'fullName': f"Member {new_member_number}",
                        'email': f'member{new_member_number}@plf.com',
                        'phone': '',
                        'address': ''
                    }
                
                # Prepare update data
                update_data = {
                    'member_number': new_member_number,
                    'name': new_name,
                    'personal_info': json.dumps(new_personal_info),
                    'last_updated': 'now()'
                }
                
                # Update member in database
                supabase.table('members') \
                    .update(update_data) \
                    .eq('id', member_id) \
                    .execute()
                
                print(f"  ✅ Fixed member {member_id}: {new_member_number} - {new_name}")
                fixed_count += 1
                
            except Exception as e:
                print(f"  ❌ Error fixing member {member.get('id', 'unknown')}: {e}")
                error_count += 1
        
        print(f"\n📊 Fix results:")
        print(f"  ✅ Fixed: {fixed_count} members")
        print(f"  ❌ Errors: {error_count}")
        
        # Verify the fix
        print(f"\n🔍 Verifying fix...")
        verify_fix()
        
        return fixed_count > 0
        
    except Exception as e:
        print(f"❌ Error in fix_member_names_and_numbers: {e}")
        return False

def verify_fix():
    """Verify the fix was successful"""
    try:
        # Get updated members
        members_result = supabase.table('members').select('member_number, name, personal_info').limit(10).execute()
        
        print(f"\n📋 Sample of fixed members (first 10):")
        for member in members_result.data:
            member_number = member.get('member_number', 'N/A')
            name = member.get('name', 'N/A')
            
            # Try to parse personal_info to show structure
            personal_info_str = member.get('personal_info', '{}')
            try:
                personal_info = json.loads(personal_info_str)
                full_name = personal_info.get('fullName', 'N/A')
            except:
                full_name = 'Invalid JSON'
            
            print(f"  - {member_number}: {name} (Full: {full_name})")
        
        # Check for any remaining NULL values
        null_member_numbers = supabase.table('members') \
            .select('id') \
            .is_('member_number', 'null') \
            .execute()
        
        null_names = supabase.table('members') \
            .select('id') \
            .is_('name', 'null') \
            .execute()
        
        print(f"\n🔍 Remaining issues:")
        print(f"  Members without member_number: {len(null_member_numbers.data)}")
        print(f"  Members without name: {len(null_names.data)}")
        
        if len(null_member_numbers.data) == 0 and len(null_names.data) == 0:
            print(f"\n✅ All members have member numbers and names!")
        else:
            print(f"\n⚠️ Some members still have missing data")
        
        return True
        
    except Exception as e:
        print(f"❌ Error verifying fix: {e}")
        return False

def update_member_balances_with_numbers():
    """Update member_balances table to link with member numbers"""
    print(f"\n💰 Updating member balances with member numbers...")
    
    try:
        # Get all members with their IDs and member numbers
        members_result = supabase.table('members').select('id, member_number').execute()
        
        member_id_to_number = {member['id']: member['member_number'] for member in members_result.data}
        
        # Get all member balances
        balances_result = supabase.table('member_balances').select('*').execute()
        
        updated_count = 0
        error_count = 0
        
        for balance in balances_result.data:
            try:
                balance_id = balance['id']
                member_id = balance.get('member_id')
                
                if member_id and member_id in member_id_to_number:
                    member_number = member_id_to_number[member_id]
                    
                    # Update balance with member number
                    supabase.table('member_balances') \
                        .update({'member_number': member_number}) \
                        .eq('id', balance_id) \
                        .execute()
                    
                    updated_count += 1
                    print(f"  ✅ Updated balance {balance_id} with member number {member_number}")
                    
            except Exception as e:
                print(f"  ❌ Error updating balance {balance.get('id', 'unknown')}: {e}")
                error_count += 1
        
        print(f"\n📊 Balance update results:")
        print(f"  ✅ Updated: {updated_count} balances")
        print(f"  ❌ Errors: {error_count}")
        
        return updated_count > 0
        
    except Exception as e:
        print(f"❌ Error updating member balances: {e}")
        return False

if __name__ == "__main__":
    print("👤 MEMBER NAME AND NUMBER FIX")
    print("="*60)
    print("This script will:")
    print("1. Assign member numbers (M001, M002, etc.) to all members")
    print("2. Update 'name' column with names from personal_info")
    print("3. Fix personal_info JSON structure")
    print("4. Update member_balances with member numbers")
    print("="*60)
    
    # Run the fix
    fix_member_names_and_numbers()
    
    # Update member balances
    update_member_balances_with_numbers()
    
    print("\n" + "="*60)
    print("🚀 FIX COMPLETED!")
    print("="*60)
    print("\n💡 Next steps:")
    print("1. Restart the React Native app")
    print("2. Check the MembersScreen - should now show names and member numbers")
    print("3. Verify member ordering (should be M001, M002, etc.)")