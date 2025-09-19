#!/usr/bin/env python3
"""
Test script to verify member data transformation without database access
This allows testing the data transformation logic before attempting database import
"""

import json
from datetime import datetime
from typing import Dict, List

def load_member_data(json_file_path: str) -> Dict:
    """Load member data from JSON file"""
    try:
        with open(json_file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            print(f"✅ Loaded member data from {json_file_path}")
            print(f"📊 Total members: {data['extraction_info']['total_members_extracted']}")
            return data
    except Exception as e:
        print(f"❌ Error loading JSON file: {e}")
        return {}

def transform_member_data(excel_data: Dict) -> List[Dict]:
    """Transform Excel data to match Supabase member schema"""
    transformed_members = []
    
    for member_name, member_data in excel_data['members'].items():
        try:
            # Extract basic member information
            excel_row = member_data['data']
            member_number = excel_row.get('Member', '').replace('Member ', '').strip()
            
            if not member_number.isdigit():
                print(f"⚠️  Skipping invalid member number: {member_number}")
                continue
            
            # Transform financial data
            financial_info = {
                'total_contributions': float(excel_row.get('Total Contribution for  4 Years (2018-24)', 0) or 0),
                'current_balance': float(excel_row.get('Closing Balance', 0) or 0),
                'outstanding_amount': abs(float(excel_row.get('Closing Balance', 0) or 0)) if float(excel_row.get('Closing Balance', 0) or 0) < 0 else 0,
                'balance_brought_forward': float(excel_row.get('Balance Brought Forward ', 0) or 0),
                'planned_contributions': float(excel_row.get('Expected Contribution (Current Year)', 0) or 0),
                'actual_contributions': float(excel_row.get('Total Contribution for Current Year', 0) or 0),
                'current_interest_earned': float(excel_row.get('Total Interest Earned @ 5,5%', 0) or 0),
                'total_interest_earned': float(excel_row.get('Total Interest Earned @ 5,5%', 0) or 0),
                'current_interest_charged': 0,
                'total_interest_charged': 0,
                'last_interest_calculation': datetime.now().isoformat(),
                'interest_rate': 5.5
            }
            
            # Calculate percentage outstanding
            if financial_info['total_contributions'] > 0:
                financial_info['percentage_outstanding'] = (
                    financial_info['outstanding_amount'] / financial_info['total_contributions'] * 100
                )
            else:
                financial_info['percentage_outstanding'] = 0
            
            # Determine standing category
            percentage = financial_info['percentage_outstanding']
            if percentage == 0:
                standing_category = 'good'
            elif percentage <= 10:
                standing_category = 'owing_10'
            elif percentage <= 20:
                standing_category = 'owing_20'
            elif percentage <= 30:
                standing_category = 'owing_30'
            elif percentage <= 50:
                standing_category = 'owing_50'
            elif percentage <= 65:
                standing_category = 'owing_65'
            else:
                standing_category = 'owing_65_plus'
            
            # Create member object
            member = {
                'member_number': member_number,
                'personal_info': {
                    'firstName': member_name.split(' ')[0] if ' ' in member_name else member_name,
                    'lastName': member_name.split(' ')[1] if ' ' in member_name and len(member_name.split(' ')) > 1 else '',
                    'fullName': member_name
                },
                'financial_info': financial_info,
                'membership_status': {
                    'isActive': True,
                    'standingCategory': standing_category
                },
                'interest_settings': {
                    'calculationMethod': 'daily',
                    'compounding': True,
                    'taxDeduction': 0
                },
                'join_date': datetime.now().isoformat(),
                'last_updated': datetime.now().isoformat(),
                'created_at': datetime.now().isoformat()
            }
            
            transformed_members.append(member)
            print(f"✅ Transformed data for member {member_number} ({member_name})")
            print(f"   - Balance: R{financial_info['current_balance']:,.2f}")
            print(f"   - Outstanding: R{financial_info['outstanding_amount']:,.2f}")
            print(f"   - Standing: {standing_category}")
            
        except Exception as e:
            print(f"❌ Error transforming data for {member_name}: {e}")
            continue
    
    return transformed_members

def main():
    """Test the member data transformation"""
    print("=" * 60)
    print("🧪 Member Data Transformation Test")
    print("=" * 60)
    
    # Test with the extracted JSON file
    json_file = "selected_members_2024_2025.json"
    
    # Load data
    member_data = load_member_data(json_file)
    if not member_data:
        return
    
    # Transform data
    print("\n🔄 Testing data transformation...")
    transformed_members = transform_member_data(member_data)
    
    if not transformed_members:
        print("❌ No valid members transformed")
        return
    
    print(f"\n🎉 Successfully transformed {len(transformed_members)} members")
    
    # Show sample of transformed data
    print(f"\n📋 Sample transformed member:")
    sample_member = transformed_members[0]
    print(f"Member Number: {sample_member['member_number']}")
    print(f"Full Name: {sample_member['personal_info']['fullName']}")
    print(f"Balance: R{sample_member['financial_info']['current_balance']:,.2f}")
    print(f"Outstanding: R{sample_member['financial_info']['outstanding_amount']:,.2f}")
    print(f"Standing: {sample_member['membership_status']['standingCategory']}")
    print(f"Total Contributions: R{sample_member['financial_info']['total_contributions']:,.2f}")
    
    # Save transformed data for inspection
    output_file = "transformed_members_sample.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(transformed_members, f, indent=2, ensure_ascii=False)
    
    print(f"\n💾 Sample saved to: {output_file}")
    print("\n✅ Transformation test completed successfully!")
    print("📝 Next steps:")
    print("   1. Check the transformed data in the output file")
    print("   2. Update supabase_service_config.py with your service role key")
    print("   3. Run: python import_members_to_supabase.py")

if __name__ == "__main__":
    main()
