import os
from supabase import create_client
from dotenv import load_dotenv
import json

load_dotenv()
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Check member_balances table structure
print('Checking member_balances table structure...')
try:
    response = supabase.table('member_balances').select('*').limit(1).execute()
    if hasattr(response, 'data') and response.data:
        print('Sample member_balance record:')
        print(json.dumps(response.data[0], indent=2, default=str))
    else:
        print('No data in member_balances table')
except Exception as e:
    print(f'Error: {e}')

# Check a few members to see their join dates
print('\n\nChecking sample members for join dates...')
members_response = supabase.table('members').select('name, member_number, join_date, financial_info').limit(5).execute()
if hasattr(members_response, 'data'):
    for member in members_response.data:
        print(f"{member['name']} ({member['member_number']}): join_date={member.get('join_date')}")
        financial_info = member.get('financial_info', {})
        if isinstance(financial_info, str):
            try:
                financial_info = json.loads(financial_info)
            except:
                pass
        print(f"  financial_info keys: {list(financial_info.keys()) if isinstance(financial_info, dict) else 'Not a dict'}")