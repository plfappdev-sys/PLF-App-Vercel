#!/usr/bin/env python3
"""
Script to check ALL tables and ALL required columns for the complete data replacement
"""

import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration
SUPABASE_URL = os.getenv('PROJECT_URL', 'https://zdnyhzasvifrskbostgn.supabase.co')
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SERVICE_ROLE_KEY', '')

def check_all_tables_and_columns():
    """Check ALL tables and ALL required columns"""
    print("Checking ALL tables and ALL required columns...")
    
    try:
        # Initialize Supabase client
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
        
        # Tables that should exist with their required columns
        required_schema = {
            'members': [
                'id', 'created_at', 'member_number', 'name', 'status',
                'membership_fee', 'closing_balance', 'share_value', 'date_joined',
                'monthly_contribution', 'catch_up_fee', 'updated_at'
            ],
            'member_balances': [
                'id', 'member_id', 'available_funds', 'total_balance', 'created_at', 'updated_at'
            ],
            'financial_years': [
                'id', 'year_start', 'year_end', 'year_name', 'is_current',
                'savings_interest_rate', 'loan_interest_rate', 'penalty_interest_rate',
                'monthly_contribution_amount', 'late_fee_percentage', 'is_active',
                'created_at', 'updated_at', 'created_by'
            ],
            'system_settings': [
                'id', 'setting_key', 'setting_value', 'description', 'created_at', 'updated_at'
            ]
        }
        
        all_missing_columns = {}
        
        for table_name, required_columns in required_schema.items():
            print(f"\n=== CHECKING {table_name.upper()} TABLE ===")
            
            try:
                # Try to get table structure
                response = supabase.table(table_name).select('*').limit(1).execute()
                
                if response.data:
                    current_columns = list(response.data[0].keys())
                    print(f"Current columns in {table_name}:")
                    for col in sorted(current_columns):
                        print(f"  - {col}")
                    
                    # Check for missing columns
                    missing = []
                    for col in required_columns:
                        if col in current_columns:
                            print(f"✓ {col}: EXISTS")
                        else:
                            print(f"✗ {col}: MISSING")
                            missing.append(col)
                    
                    if missing:
                        all_missing_columns[table_name] = missing
                else:
                    print(f"Table {table_name} exists but is empty")
                    # Assume all columns are missing if table is empty
                    all_missing_columns[table_name] = required_columns
                    
            except Exception as e:
                if "Could not find" in str(e):
                    print(f"✗ {table_name}: TABLE DOES NOT EXIST")
                    all_missing_columns[table_name] = required_columns
                else:
                    print(f"Error reading {table_name}: {e}")
        
        # Generate complete SQL fix
        if all_missing_columns:
            print(f"\n=== GENERATING COMPLETE SQL FIX ===")
            sql_commands = []
            
            for table_name, missing_columns in all_missing_columns.items():
                print(f"Adding {len(missing_columns)} missing columns to {table_name}: {', '.join(missing_columns)}")
                
                for col in missing_columns:
                    if table_name == 'members':
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
                    
                    elif table_name == 'member_balances':
                        if col in ['available_funds', 'total_balance']:
                            sql_commands.append(f"ALTER TABLE member_balances ADD COLUMN IF NOT EXISTS {col} DECIMAL(15,2) DEFAULT 0.00;")
                        elif col == 'updated_at':
                            sql_commands.append("ALTER TABLE member_balances ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();")
                        else:
                            sql_commands.append(f"ALTER TABLE member_balances ADD COLUMN IF NOT EXISTS {col} VARCHAR(255);")
                    
                    elif table_name == 'financial_years':
                        if col == 'created_by':
                            sql_commands.append("ALTER TABLE financial_years ADD COLUMN IF NOT EXISTS created_by BIGINT;")
                        elif col == 'updated_at':
                            sql_commands.append("ALTER TABLE financial_years ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();")
                        elif col in ['savings_interest_rate', 'loan_interest_rate', 'penalty_interest_rate', 'late_fee_percentage']:
                            sql_commands.append(f"ALTER TABLE financial_years ADD COLUMN IF NOT EXISTS {col} DECIMAL(5,2) DEFAULT 0.00;")
                        elif col == 'monthly_contribution_amount':
                            sql_commands.append("ALTER TABLE financial_years ADD COLUMN IF NOT EXISTS monthly_contribution_amount DECIMAL(15,2) DEFAULT 0.00;")
                        elif col in ['is_current', 'is_active']:
                            sql_commands.append(f"ALTER TABLE financial_years ADD COLUMN IF NOT EXISTS {col} BOOLEAN DEFAULT false;")
                        else:
                            sql_commands.append(f"ALTER TABLE financial_years ADD COLUMN IF NOT EXISTS {col} VARCHAR(255);")
                    
                    elif table_name == 'system_settings':
                        if col == 'updated_at':
                            sql_commands.append("ALTER TABLE system_settings ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();")
                        else:
                            sql_commands.append(f"ALTER TABLE system_settings ADD COLUMN IF NOT EXISTS {col} VARCHAR(255);")
            
            # Add update statements for timestamps
            sql_commands.append("UPDATE members SET updated_at = NOW() WHERE updated_at IS NULL;")
            sql_commands.append("UPDATE member_balances SET updated_at = NOW() WHERE updated_at IS NULL;")
            sql_commands.append("UPDATE financial_years SET updated_at = NOW() WHERE updated_at IS NULL;")
            sql_commands.append("UPDATE system_settings SET updated_at = NOW() WHERE updated_at IS NULL;")
            
            # Fix financial_years created_by
            sql_commands.append("UPDATE financial_years SET created_by = (SELECT id FROM users WHERE role = 'superuser' LIMIT 1) WHERE created_by IS NULL;")
            
            # Write complete SQL file
            sql_content = "-- COMPLETE SQL SCRIPT TO FIX ALL MISSING COLUMNS\n"
            sql_content += "-- Generated: October 22, 2025\n\n"
            for cmd in sql_commands:
                sql_content += cmd + "\n"
            
            sql_content += "\n-- Verify all tables and columns\n"
            for table_name in required_schema.keys():
                sql_content += f"\n-- {table_name} table columns:\n"
                sql_content += f"SELECT column_name FROM information_schema.columns WHERE table_name = '{table_name}' ORDER BY column_name;\n"
            
            with open('complete-database-fix.sql', 'w') as f:
                f.write(sql_content)
            
            print(f"✅ Generated 'complete-database-fix.sql' with {len(sql_commands)} commands")
            print(f"Total missing columns across all tables: {sum(len(cols) for cols in all_missing_columns.values())}")
            
        else:
            print("✅ All required columns exist in all tables!")
            
        return True
        
    except Exception as e:
        print(f"Error checking tables: {e}")
        return False

if __name__ == "__main__":
    print("Complete Database Schema Check and Fix Generator")
    print("=" * 70)
    check_all_tables_and_columns()
