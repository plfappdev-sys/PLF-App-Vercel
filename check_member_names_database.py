#!/usr/bin/env python3
"""
Check member names in database to diagnose "member null" issue
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

def check_member_names():
    """Check member names in database"""
    print("🔍 Checking member names in database...")
    print("="*60)
    
    try:
        # Get all members from database
        members_result = supabase.table('members').select('*').execute()
        
        print(f"📊 Found {len(members_result.data)} members in database")
        
        # Check first 10 members
        print("\n📋 Sample member data from database (first 10):")
        for i, member in enumerate(members_result.data[:10]):
            print(f"\nMember {i + 1}:")
            print(f"  ID: {member.get('id')}")
            print(f"  Member Number: {member.get('member_number')}")
            print(f"  Name column: '{member.get('name')}'")
            print(f"  personal_info: {member.get('personal_info')}")
            print(f"  Has name column: {bool(member.get('name'))}")
            print(f"  Has personal_info: {bool(member.get('personal_info'))}")
            
            # Check what type personal_info is
            personal_info = member.get('personal_info')
            if personal_info:
                print(f"  personal_info type: {type(personal_info)}")
                if isinstance(personal_info, dict):
                    print(f"  personal_info keys: {list(personal_info.keys())}")
                    print(f"  personal_info values: {personal_info}")
        
        # Check for members without names
        print("\n🔍 Members without names:")
        members_without_names = []
        members_without_personal_info = []
        
        for member in members_result.data:
            member_number = member.get('member_number')
            name = member.get('name')
            personal_info = member.get('personal_info')
            
            if not name or str(name).strip() == '':
                members_without_names.append(member_number)
            
            if not personal_info:
                members_without_personal_info.append(member_number)
        
        print(f"  Members without 'name' column value: {len(members_without_names)}")
        if members_without_names:
            print(f"  Member numbers without names: {members_without_names[:20]}")
        
        print(f"  Members without 'personal_info': {len(members_without_personal_info)}")
        if members_without_personal_info:
            print(f"  Member numbers without personal_info: {members_without_personal_info[:20]}")
        
        # Check database schema
        print("\n💡 Database schema analysis:")
        print("  1. 'name' column should contain member names")
        print("  2. 'personal_info' should be a JSON object with firstName, lastName, fullName")
        print("  3. Frontend expects either 'name' column or 'personal_info' JSON")
        
        # Check a specific member to see structure
        print("\n🔬 Detailed analysis of first member:")
        if members_result.data:
            first_member = members_result.data[0]
            print(f"  Raw data: {json.dumps(first_member, indent=2, default=str)}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error checking member names: {e}")
        return False

def fix_member_names():
    """Fix member names by updating the database"""
    print("\n" + "="*60)
    print("🔧 Fixing member names...")
    print("="*60)
    
    try:
        # Get all members
        members_result = supabase.table('members').select('*').execute()
        
        fixed_count = 0
        error_count = 0
        
        for member in members_result.data:
            try:
                member_id = member['id']
                member_number = member.get('member_number')
                current_name = member.get('name')
                
                # If name is empty or null, set it to member number
                if not current_name or str(current_name).strip() == '':
                    new_name = f"Member {member_number}"
                    
                    update_data = {
                        'name': new_name,
                        'last_updated': 'now()'
                    }
                    
                    supabase.table('members') \
                        .update(update_data) \
                        .eq('id', member_id) \
                        .execute()
                    
                    print(f"  ✅ Fixed member {member_number}: set name to '{new_name}'")
                    fixed_count += 1
                    
            except Exception as e:
                print(f"  ❌ Error fixing member {member.get('member_number', 'unknown')}: {e}")
                error_count += 1
        
        print(f"\n📊 Fix results:")
        print(f"  ✅ Fixed: {fixed_count} members")
        print(f"  ❌ Errors: {error_count}")
        
        return fixed_count > 0
        
    except Exception as e:
        print(f"❌ Error in fix_member_names: {e}")
        return False

if __name__ == "__main__":
    print("👤 MEMBER NAME DIAGNOSIS AND FIX")
    print("="*60)
    
    # First, check current state
    check_member_names()
    
    # Ask if we should fix
    print("\n" + "="*60)
    print("🚀 Would you like to fix member names?")
    print("This will set empty names to 'Member {number}'")
    print("="*60)
    
    # For now, let's just check - we'll fix if needed
    print("\n💡 To fix member names, run: python fix_member_names.py")
    print("   (Create a separate script for the fix)")