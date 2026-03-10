#!/usr/bin/env python3
"""
Analyze fund value discrepancy between database calculation and frontend display
"""

import os
import json
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://zdnyhzasvifrskbostgn.supabase.co')
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY', '')

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

def analyze_fund_value_discrepancy():
    """Analyze why fund value might be different in frontend"""
    print("🔍 Analyzing fund value discrepancy...")
    print("="*60)
    
    try:
        # 1. Get all members and calculate total from financial_info
        print("\n1. 📊 Calculating total fund value from members table...")
        members_result = supabase.table('members').select('id, member_number, financial_info').execute()
        
        total_from_members = 0
        member_count = 0
        negative_balances = []
        positive_balances = []
        
        for member in members_result.data:
            try:
                financial_info = json.loads(member['financial_info'])
                balance = financial_info.get('current_balance', 0)
                total_from_members += balance
                member_count += 1
                
                if balance < 0:
                    negative_balances.append({
                        'member_id': member['id'],
                        'balance': balance
                    })
                else:
                    positive_balances.append({
                        'member_id': member['id'],
                        'balance': balance
                    })
                    
            except Exception as e:
                print(f"  ❌ Error processing member {member.get('id', 'unknown')}: {e}")
        
        print(f"   ✅ Total members: {member_count}")
        print(f"   💰 Total fund value from members: R{total_from_members:,.2f}")
        print(f"   📈 Members with positive balances: {len(positive_balances)}")
        print(f"   📉 Members with negative balances: {len(negative_balances)}")
        
        # 2. Check member_balances table
        print("\n2. 💰 Checking member_balances table...")
        balances_result = supabase.table('member_balances').select('member_id, savings_balance, loan_balance').execute()
        
        total_savings = 0
        total_loans = 0
        balance_count = 0
        
        for balance in balances_result.data:
            savings = balance.get('savings_balance', 0) or 0
            loans = balance.get('loan_balance', 0) or 0
            total_savings += savings
            total_loans += loans
            balance_count += 1
        
        net_from_balances = total_savings - total_loans
        
        print(f"   ✅ Total member balances: {balance_count}")
        print(f"   💰 Total savings balance: R{total_savings:,.2f}")
        print(f"   📉 Total loan balance: R{total_loans:,.2f}")
        print(f"   📊 Net from balances (savings - loans): R{net_from_balances:,.2f}")
        
        # 3. Check if frontend might be calculating differently
        print("\n3. 🔍 Possible frontend calculation differences...")
        
        # Option A: Frontend might only show savings (excluding loans)
        print(f"   📊 If frontend shows only savings: R{total_savings:,.2f}")
        
        # Option B: Frontend might show absolute value of loans as positive
        print(f"   📊 If frontend shows loans as positive: R{total_savings + total_loans:,.2f}")
        
        # Option C: Check for members with missing balances
        print(f"   📊 Members vs balances: {member_count} members, {balance_count} balances")
        if member_count != balance_count:
            print(f"   ⚠️ Mismatch: {member_count - balance_count} members missing balances")
        
        # 4. Check specific members with negative balances
        print("\n4. 📉 Analyzing members with negative balances...")
        if negative_balances:
            print(f"   Found {len(negative_balances)} members with negative balances:")
            total_negative = sum(b['balance'] for b in negative_balances)
            print(f"   Total negative amount: R{total_negative:,.2f}")
            
            # Show top 5 negative balances
            negative_balances_sorted = sorted(negative_balances, key=lambda x: x['balance'])
            print(f"   Top 5 negative balances:")
            for i, member in enumerate(negative_balances_sorted[:5]):
                print(f"     {i+1}. Member {member['member_id']}: R{member['balance']:,.2f}")
        
        # 5. Check Excel import consistency
        print("\n5. 📋 Excel import consistency check...")
        
        # Get sample of members to verify Excel data was imported correctly
        sample_members = supabase.table('members').select('id, personal_info, financial_info').limit(5).execute()
        
        print(f"   Sample members verification:")
        for member in sample_members.data:
            try:
                personal_info = json.loads(member['personal_info'])
                financial_info = json.loads(member['financial_info'])
                name = personal_info.get('name', 'Unknown')
                balance = financial_info.get('current_balance', 0)
                print(f"     - {name}: R{balance:,.2f}")
            except:
                print(f"     - Member {member.get('id', 'Unknown')}: Error reading data")
        
        # 6. Summary of possible discrepancies
        print("\n" + "="*60)
        print("📊 DISCREPANCY ANALYSIS SUMMARY")
        print("="*60)
        
        print(f"\nDatabase calculations:")
        print(f"  A. Total from members table: R{total_from_members:,.2f}")
        print(f"  B. Net from balances (savings - loans): R{net_from_balances:,.2f}")
        print(f"  C. Savings only (excluding loans): R{total_savings:,.2f}")
        print(f"  D. Savings + loans (absolute): R{total_savings + total_loans:,.2f}")
        
        print(f"\n🔍 Possible frontend display scenarios:")
        print(f"  1. If showing net value (A or B): R{total_from_members:,.2f}")
        print(f"  2. If showing savings only (C): R{total_savings:,.2f}")
        print(f"  3. If showing total assets (D): R{total_savings + total_loans:,.2f}")
        
        print(f"\n📉 Negative balances impact:")
        print(f"  Total negative amount: R{sum(b['balance'] for b in negative_balances):,.2f}")
        print(f"  This reduces net fund value by this amount")
        
        print(f"\n💡 Recommendation:")
        print(f"  Check frontend calculation logic - it might be:")
        print(f"  - Excluding loan balances (showing only savings)")
        print(f"  - Showing absolute value of loans")
        print(f"  - Missing some member balances")
        
        # 7. Create SQL to verify calculations
        print("\n" + "="*60)
        print("🔧 SQL Queries to investigate further:")
        print("="*60)
        
        print(f"""
-- 1. Get total from members table
SELECT SUM((financial_info->>'current_balance')::numeric) as total_fund_value 
FROM members;

-- 2. Get savings vs loans from member_balances
SELECT 
  SUM(savings_balance) as total_savings,
  SUM(loan_balance) as total_loans,
  SUM(savings_balance) - SUM(loan_balance) as net_value
FROM member_balances;

-- 3. Check members with negative balances
SELECT id, member_number, 
  (personal_info->>'name') as name,
  (financial_info->>'current_balance')::numeric as balance
FROM members 
WHERE (financial_info->>'current_balance')::numeric < 0
ORDER BY (financial_info->>'current_balance')::numeric ASC;

-- 4. Check if all members have balances
SELECT 
  (SELECT COUNT(*) FROM members) as total_members,
  (SELECT COUNT(*) FROM member_balances) as total_balances,
  (SELECT COUNT(*) FROM members) - (SELECT COUNT(*) FROM member_balances) as missing_balances;
        """)
        
    except Exception as e:
        print(f"❌ Error analyzing fund value: {e}")

def check_frontend_calculation_logic():
    """Try to understand how frontend calculates fund value"""
    print("\n🔍 Checking frontend calculation logic...")
    
    # Based on common PLF system patterns, frontend might:
    # 1. Sum only positive balances (savings)
    # 2. Subtract loans from savings
    # 3. Use a different table or view
    
    # Let's check if there's a fund_statistics table or view
    try:
        # Try to access common fund calculation endpoints
        tables_to_check = ['fund_statistics', 'fund_totals', 'system_statistics']
        
        for table in tables_to_check:
            try:
                result = supabase.table(table).select('*').limit(1).execute()
                print(f"  ✅ Found {table} table")
                if result.data:
                    print(f"     Sample data: {result.data[0]}")
            except:
                pass  # Table doesn't exist
                
    except Exception as e:
        print(f"  ℹ️ No special fund calculation tables found: {e}")

if __name__ == "__main__":
    print("💰 FUND VALUE DISCREPANCY INVESTIGATION")
    print("="*60)
    
    analyze_fund_value_discrepancy()
    check_frontend_calculation_logic()
    
    print("\n" + "="*60)
    print("🚀 NEXT STEPS:")
    print("="*60)
    print("1. Check the screenshot to see what value is displayed")
    print("2. Compare with the calculations above")
    print("3. Check frontend code for fund calculation logic")
    print("4. Verify Excel import included all correct balances")
    print("\n💡 The most likely scenarios:")
    print("   - Frontend showing only savings (excluding loans)")
    print("   - Frontend showing absolute value of loans")
    print("   - Some members missing from calculation")