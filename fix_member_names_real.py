import pandas as pd
from supabase import create_client
import os
import json

# Supabase configuration - using the same as in supabase.config.js
SUPABASE_URL = 'https://zdnyhzasvifrskbostgn.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM'

def update_member_names_with_real_names():
    print('🚀 Updating member names with real names from Excel file...')
    
    # Initialize Supabase client
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    # Read the Excel file
    df = pd.read_excel('NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025.xlsx', sheet_name='2024-2025')
    
    print(f'📊 Loaded {len(df)} members from Excel file')
    print('📋 First 10 real member names from Excel:')
    for i in range(min(10, len(df))):
        member_name = df.iloc[i]['Member']
        print(f'  {i+1}. {member_name}')
    
    # Get current members from database
    print('🔍 Fetching current members from database...')
    result = supabase.table('members').select('*').execute()
    current_members = result.data
    
    print(f'📊 Found {len(current_members)} members in database')
    
    # Update each member with real name
    updates = []
    for i, member in enumerate(current_members):
        if i < len(df):
            real_name = df.iloc[i]['Member']
            member_number = member['member_number']
            
            update_data = {
                'id': member['id'],
                'name': real_name
            }
            updates.append(update_data)
            
            if i < 5:  # Show first 5 for verification
                print(f'  Updating member {member_number}: "{member["name"]}" -> "{real_name}"')
    
    print(f'📤 Updating {len(updates)} members with real names...')
    
    # Update members in batches
    batch_size = 50
    successful_updates = 0
    
    for i in range(0, len(updates), batch_size):
        batch = updates[i:i+batch_size]
        try:
            for update in batch:
                result = supabase.table('members').update({'name': update['name']}).eq('id', update['id']).execute()
                if result.data:
                    successful_updates += 1
        except Exception as e:
            print(f'❌ Error updating batch: {e}')
    
    print(f'✅ Successfully updated {successful_updates} members with real names')
    
    # Verify the updates
    print('🔍 Verifying updates...')
    result = supabase.table('members').select('member_number, name').order('member_number').execute()
    updated_members = result.data
    
    print('📋 First 10 updated members:')
    for member in updated_members[:10]:
        print(f'  {member["member_number"]}. {member["name"]}')

if __name__ == '__main__':
    update_member_names_with_real_names()
