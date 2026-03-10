import os
from supabase import create_client
from dotenv import load_dotenv
import json

load_dotenv()
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def check_member_join_dates():
    print('Checking member join dates in database...\n')
    
    # Test with a few member numbers
    test_members = ['M004', 'M005', 'M031', 'M047', 'M057']
    
    for member_number in test_members:
        print(f'\n=== Checking member {member_number} ===')
        
        try:
            # Get member data
            response = supabase.table('members').select('*').eq('member_number', member_number).single().execute()
            member = response.data
            
            if member:
                name = member.get('name', 'Unknown')
                join_date = member.get('join_date')
                financial_info = member.get('financial_info', {})
                
                if isinstance(financial_info, str):
                    try:
                        financial_info = json.loads(financial_info)
                    except:
                        financial_info = {}
                
                print(f'Name: {name}')
                print(f'Member Number: {member_number}')
                print(f'Join Date in DB: {join_date}')
                print(f'Financial Info: {json.dumps(financial_info, indent=2)}')
                
                # Check if there's a join_date in financial_info
                if 'join_date' in financial_info:
                    print(f'Join Date in financial_info: {financial_info["join_date"]}')
                
                # Check expected contribution
                expected_contribution = financial_info.get('expected_contribution', 0)
                print(f'Expected Contribution: R{expected_contribution}')
                
            else:
                print(f'❌ Member {member_number} not found')
        except Exception as e:
            print(f'Error checking member {member_number}: {str(e)}')
    
    print('\n=== Checking complete ===')

if __name__ == '__main__':
    check_member_join_dates()