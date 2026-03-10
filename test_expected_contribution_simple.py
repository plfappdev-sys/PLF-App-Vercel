import os
from supabase import create_client
from dotenv import load_dotenv
import json

load_dotenv()
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def test_expected_contribution():
    print('Testing expected contribution in database...\n')
    
    # Test with a few member numbers
    test_members = ['M004', 'M005', 'M031', 'M047', 'M057']
    
    for member_number in test_members:
        print(f'\n=== Testing member {member_number} ===')
        
        try:
            # Get member data
            response = supabase.table('members').select('*').eq('member_number', member_number).single().execute()
            member = response.data
            
            if member:
                # Parse financial_info
                financial_info = member.get('financial_info', {})
                if isinstance(financial_info, str):
                    try:
                        financial_info = json.loads(financial_info)
                    except:
                        financial_info = {}
                
                name = member.get('name', 'Unknown')
                join_date = member.get('join_date', '2018-07-23')
                expected_contribution = financial_info.get('expected_contribution', 0)
                
                print(f'Name: {name}')
                print(f'Member Number: {member_number}')
                print(f'Join Date: {join_date}')
                print(f'Expected Contribution in DB: R{expected_contribution}')
                
                # Calculate expected contribution based on join date
                from datetime import datetime
                join_date_obj = datetime.fromisoformat(join_date.replace('Z', '+00:00'))
                today = datetime.now()
                months_diff = (today.year - join_date_obj.year) * 12 + (today.month - join_date_obj.month)
                calculated_expected = max(0, min(months_diff, 83)) * 200
                
                print(f'Months since join: {months_diff}')
                print(f'Calculated Expected Contribution: R{calculated_expected}')
                
                if expected_contribution != calculated_expected:
                    print(f'⚠️ WARNING: Expected contribution mismatch!')
                    print(f'   Database: R{expected_contribution}')
                    print(f'   Calculated: R{calculated_expected}')
                else:
                    print(f'✅ Expected contribution matches calculation')
            else:
                print(f'❌ Member {member_number} not found')
        except Exception as e:
            print(f'Error testing member {member_number}: {str(e)}')
    
    print('\n=== Testing complete ===')

if __name__ == '__main__':
    test_expected_contribution()