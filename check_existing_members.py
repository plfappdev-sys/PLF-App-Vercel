#!/usr/bin/env python3
"""
Check existing members in database
"""

import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://zdnyhzasvifrskbostgn.supabase.co')
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY', '')

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

def check_existing_members():
    print("🔍 Checking existing members in database...")
    
    try:
        # Check members table
        result = supabase.table('members').select('member_number, personal_info').execute()
        
        if result.data and len(result.data) > 0:
            print(f"📊 Found {len(result.data)} existing members:")
            for member in result.data:
                member_number = member['member_number']
                personal_info = member['personal_info']
                if isinstance(personal_info, str):
                    try:
                        import json
                        personal_info = json.loads(personal_info)
                    except:
                        pass
                
                name = personal_info.get('name', 'Unknown') if isinstance(personal_info, dict) else 'Unknown'
                print(f"  - {name} (Member {member_number})")
        else:
            print("📊 No existing members found in database")
            
    except Exception as e:
        print(f"❌ Error checking existing members: {e}")

if __name__ == "__main__":
    check_existing_members()