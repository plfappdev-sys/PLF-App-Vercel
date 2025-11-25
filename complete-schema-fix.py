#!/usr/bin/env python3
"""
Script to check ALL required columns and create complete SQL fix
"""

import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration
SUPABASE_URL = os.getenv('PROJECT_URL', 'https://zdnyhzasvifrskbostgn.supabase.co')
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SERVICE_ROLE_KEY', '')

def check_all_required_columns():
    """Check ALL required columns and generate complete SQL fix"""
    print("Checking ALL required columns for data import...")
    
    try:
        # Initialize Supabase client
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
        
        # Get current members table structure
        print("\n=== CURRENT MEMBERS TABLE STRUCTURE ===")
        try:
            response = supabase.table('members').select('*').limit(1).execute()
            if response.data:
                current_columns = list(response.data[0].keys())
                print("Current columns:")
                for col in sorted(current_columns):
                    print(f"  - {col}")
            else:
                print("No members found in table")
                current_columns = []
        except Exception as e:
            print(f"Error reading members table: {e}")
            current_columns = []
        
        # Required columns based on the data replacement script
        required_columns = [
            'id', 'created_at', 'member_number', 'name', 'status',
            'membership_fee', 'closing_balance', 'share_value', 'date_joined',
            'monthly_contribution', 'catch_up_fee', 'updated_at'
        ]
        
        print(f"\n=== REQUIRED COLUMNS FOR DATA IMPORT ===")
        missing_columns = []
        for col in required_columns:
            if col in current_columns:
                print(f"✓ {col}: EXISTS")
            else:
                print(f"✗ {col}: MISSING")
                missing_columns.append(col)
        
        # Generate SQL to add missing columns
        if missing_columns:
            print(f"\n=== GENERATING SQL TO ADD {len(missing_columns)} MISSING COLUMNS ===")
            sql_commands = []
            
            for col in missing_columns:
                if col == 'updated_at':
                    sql_commands.append("ALTER TABLE members ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();")
                elif col == 'status':
                    sql_commands.append("ALTER TABLE members ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'active';")
                elif col == 'name':
                    sql_commands.append("ALTER TABLE members ADD COLUMN IF NOT EXISTS name VARCHAR(255);")
                elif col in ['membership_fee', 'closing_balance', 'share_value', 'monthly_contribution', 'catch_up_fee']:
                    sql_commands.append(f"ALTER TABLE members ADD COLUMN IF NOT EXISTS {col} DECIMAL(15,2) DEFAULT 0.00;")
                elif col == 'date_joined':
                    sql_commands.append("ALTER TABLE members ADD COLUMN IF NOT EXISTS date_joined DATE;")
                else:
                    sql_commands.append(f"ALTER TABLE members ADD COLUMN IF NOT EXISTS {col} VARCHAR(255);")
            
            # Add update statement for updated_at
            sql_commands.append("UPDATE members SET updated_at = NOW() WHERE updated_at IS NULL;")
            
            # Write SQL file
            sql_content = "-- Complete SQL Script to Add ALL Missing Columns\n"
            sql_content += "-- Generated: October 22, 2025\n\n"
            for cmd in sql_commands:
                sql_content += cmd + "\n"
            
            sql_content += "\n-- Verify all columns were added\n"
            sql_content += "SELECT column_name FROM information_schema.columns \n"
            sql_content += "WHERE table_name = 'members' \n"
            sql_content += "ORDER BY column_name;\n"
            
            with open('complete-schema-fix.sql', 'w') as f:
                f.write(sql_content)
            
            print(f"✅ Generated 'complete-schema-fix.sql' with {len(sql_commands)} commands")
            print(f"Missing columns to be added: {', '.join(missing_columns)}")
        else:
            print("✅ All required columns exist!")
            
        return True
        
    except Exception as e:
        print(f"Error checking columns: {e}")
        return False

if __name__ == "__main__":
    print("Complete Database Schema Check and Fix Generator")
    print("=" * 60)
    check_all_required_columns()
