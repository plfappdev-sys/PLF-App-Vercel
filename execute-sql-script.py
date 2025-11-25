#!/usr/bin/env python3
"""
Script to execute SQL commands to add missing columns
"""

import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration - using PROJECT_URL from .env file
SUPABASE_URL = os.getenv('PROJECT_URL', 'https://zdnyhzasvifrskbostgn.supabase.co')
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SERVICE_ROLE_KEY', '')

def execute_sql_script():
    """Execute the SQL script to add missing columns"""
    print("Executing SQL script to add missing columns...")
    
    try:
        # Initialize Supabase client
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
        
        # Read SQL file
        with open('fix-missing-columns.sql', 'r') as f:
            sql_commands = f.read()
        
        # Execute SQL commands
        commands = [cmd.strip() for cmd in sql_commands.split(';') if cmd.strip()]
        
        for cmd in commands:
            if cmd.startswith('SELECT'):
                # For SELECT queries, use query method
                result = supabase.query(cmd).execute()
                print(f'Query result: {result.data}')
            else:
                # For other commands, use execute method
                result = supabase.execute(cmd)
                print(f'Executed: {cmd[:50]}...')
        
        print('SQL script executed successfully')
        return True
        
    except Exception as e:
        print(f'Error executing SQL: {e}')
        return False

if __name__ == "__main__":
    execute_sql_script()
