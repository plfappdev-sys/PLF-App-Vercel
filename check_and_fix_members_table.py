#!/usr/bin/env python3
"""
Script to check the current members table structure and fix it if needed
"""

import asyncio
from supabase import create_client
import supabase_service_config as config

async def check_members_table():
    """Check the current members table structure"""
    print("=" * 60)
    print("🔍 Checking Members Table Structure")
    print("=" * 60)
    
    try:
        # Get Supabase configuration
        supabase_config = config.get_supabase_config()
        supabase_url = supabase_config["url"]
        supabase_key = supabase_config["key"]
        
        # Initialize Supabase client
        supabase = create_client(supabase_url, supabase_key)
        print("✅ Supabase client initialized")
        
        # Check if members table exists
        print("\n📊 Checking if members table exists...")
        try:
            # Try to select from members table to see if it exists
            result = supabase.table('members').select('count', count='exact').limit(1).execute()
            print("✅ Members table exists")
            
            # Check the table structure
            print("\n🔍 Checking table structure...")
            # Try to query a specific column that should exist
            try:
                test_result = supabase.table('members').select('member_number').limit(1).execute()
                print("✅ member_number column exists")
            except Exception as col_error:
                if 'column "member_number" does not exist' in str(col_error):
                    print("❌ member_number column does not exist in current table")
                    return False
                else:
                    raise col_error
                    
            return True
            
        except Exception as table_error:
            if 'relation "members" does not exist' in str(table_error):
                print("❌ Members table does not exist")
                return False
            else:
                raise table_error
                
    except Exception as e:
        print(f"❌ Error checking table: {e}")
        return False

async def drop_and_recreate_table():
    """Drop the existing table and recreate it with correct structure"""
    print("\n" + "=" * 60)
    print("🔄 Recreating Members Table")
    print("=" * 60)
    
    try:
        # Get Supabase configuration
        supabase_config = config.get_supabase_config()
        supabase_url = supabase_config["url"]
        supabase_key = supabase_config["key"]
        
        # Initialize Supabase client
        supabase = create_client(supabase_url, supabase_key)
        
        print("⚠️  WARNING: This will DROP the existing members table and all its data!")
        confirmation = input("Are you sure you want to continue? (y/N): ").strip().lower()
        
        if confirmation != 'y':
            print("Operation cancelled")
            return False
        
        # Read the SQL file
        with open('members_table_simple.sql', 'r', encoding='utf-8') as f:
            sql_content = f.read()
        
        # Extract the DROP TABLE and CREATE TABLE commands
        drop_command = "DROP TABLE IF EXISTS members CASCADE;"
        create_command = sql_content
        
        print("📋 Executing table recreation...")
        
        # Since Supabase Python client doesn't support direct SQL execution,
        # we need to provide manual instructions
        print("\n📝 Manual steps required:")
        print("1. Go to Supabase Dashboard > SQL Editor")
        print("2. Execute this command first:")
        print(f"   {drop_command}")
        print("3. Then execute the CREATE TABLE command from members_table_simple.sql")
        print("4. Verify the table was created successfully")
        
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def main():
    """Main function to check and fix the members table"""
    print("This script will help you fix the members table structure issue.")
    print("The error 'column member_number does not exist' indicates:")
    print("1. The table exists but has wrong structure, OR")
    print("2. The table doesn't exist at all")
    print()
    
    # Check table status
    table_exists = asyncio.run(check_members_table())
    
    if table_exists:
        print("\n💡 Solution: The table exists but has incorrect structure.")
        print("   You need to either:")
        print("   A) Drop and recreate the table (will lose existing data)")
        print("   B) Alter the table to add missing columns")
        
        choice = input("\nChoose option (A for recreate, B for alter): ").strip().lower()
        
        if choice == 'a':
            success = asyncio.run(drop_and_recreate_table())
            if success:
                print("\n✅ Instructions provided for table recreation")
        else:
            print("\n📝 For altering the table, you need to:")
            print("   1. Go to Supabase Dashboard > SQL Editor")
            print("   2. Add the missing columns manually")
            print("   3. Required columns: member_number, personal_info, financial_info, etc.")
            print("   4. See members_table_simple.sql for column definitions")
            
    else:
        print("\n💡 Solution: The table doesn't exist.")
        print("   You need to create it using the SQL in members_table_simple.sql")
        print()
        print("📝 Steps:")
        print("   1. Go to Supabase Dashboard > SQL Editor")
        print("   2. Copy the contents of members_table_simple.sql")
        print("   3. Paste and execute all the SQL commands")
        print("   4. Verify the table was created successfully")

if __name__ == "__main__":
    main()
