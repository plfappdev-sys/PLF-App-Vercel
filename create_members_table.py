#!/usr/bin/env python3
"""
Script to create the simplified members table in Supabase
This matches the structure expected by the import script
"""

import asyncio
from supabase import create_client
import supabase_service_config as config

async def create_members_table():
    """Create the simplified members table structure"""
    print("=" * 60)
    print("🏗️  Creating Simplified Members Table")
    print("=" * 60)
    
    try:
        # Get Supabase configuration
        supabase_config = config.get_supabase_config()
        supabase_url = supabase_config["url"]
        supabase_key = supabase_config["key"]
        
        # Initialize Supabase client
        supabase = create_client(supabase_url, supabase_key)
        print("✅ Supabase client initialized with service role key")
        
        # Read the SQL file
        with open('members_table_simple.sql', 'r', encoding='utf-8') as f:
            sql_commands = f.read()
        
        print("📋 Executing SQL commands to create members table...")
        
        # Execute the SQL commands
        # Note: Supabase Python client doesn't have direct SQL execution
        # We'll need to use the REST API or run this manually in Supabase SQL editor
        
        print("⚠️  Manual step required:")
        print("   1. Go to Supabase Dashboard > SQL Editor")
        print("   2. Copy the contents of 'members_table_simple.sql'")
        print("   3. Paste and execute the SQL commands")
        print("   4. Or use the Supabase CLI to run the SQL file")
        
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        print("\n💡 Alternative approach:")
        print("   1. Open 'members_table_simple.sql'")
        print("   2. Copy all the SQL commands")
        print("   3. Go to Supabase Dashboard > SQL Editor")
        print("   4. Paste and execute the commands")
        return False

def main():
    """Main function to create the members table"""
    success = asyncio.run(create_members_table())
    
    if success:
        print("\n" + "=" * 60)
        print("✅ Table creation instructions provided!")
        print("\n📝 After creating the table, you can:")
        print("   1. Run: python import_members_to_supabase.py")
        print("   2. Test member validation in the app")
    else:
        print("\n❌ Failed to create table. Please follow manual instructions.")

if __name__ == "__main__":
    main()
