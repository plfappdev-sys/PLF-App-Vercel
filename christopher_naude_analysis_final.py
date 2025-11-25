#!/usr/bin/env python3
"""
Christopher Naude (M006) Financial Analysis - Final Version
Purpose: Detailed analysis of contributions, fees, balances and calculations
Created: November 24, 2025
"""

import os
import json
import pandas as pd
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://zdnyhzasvifrskbostgn.supabase.co')
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SERVICE_ROLE_KEY', '')

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

def analyze_christopher_naude():
    print("🎯 CHRISTOPHER NAUDE (M006) - COMPREHENSIVE FINANCIAL ANALYSIS")
    print("=" * 70)
    
    try:
        # Get Christopher Naude data from database
        print("\n📊 RETRIEVING DATABASE DATA...")
        response = supabase.table('members').select('*').eq('name', 'Christopher Naude').execute()
        
        if not response.data:
            print("❌ Christopher Naude not found in database")
            return
        
        member = response.data[0]
        print(f"✅ Found: {member['name']} (Member {member['member_number']})")
        print(f"   Member ID: {member['id']}")
        print(f"   Catch-up fee: R{member['catch_up_fee']}")
        print(f"   Monthly contribution: R{member['monthly_contribution']}")
        
        # Get balance
        balance_response = supabase.table('member_balances').select('*').eq('member_id', member['id']).execute()
        if balance_response.data:
            balance = balance_response.data[0]
            print(f"   Savings balance: R{balance['savings_balance']:.2f}")
        
        # Get contributions
        contributions_response = supabase.table('contributions').select('*').eq('member_id', member['id']).execute()
        print(f"   Contributions: {len(contributions_response.data) if contributions_response.data else 0} records")
        
        # Get transactions
        transactions_response = supabase.table('transactions').select('*').eq('member_id', member['id']).execute()
        print(f"   Transactions: {len(transactions_response.data) if transactions_response.data else 0} records")
        
        # Extract data from Excel
        print("\n📊 EXTRACTING EXCEL DATA...")
        try:
            file_path = 'NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025.xlsx'
            df_2024_2025 = pd.read_excel(file_path, sheet_name='2024-2025')
            
            # Find Christopher Naude in the data
            christopher_row = df_2024_2025[df_2024_2025['Member'] == 'Christopher Naude']
            
            if not christopher_row.empty:
                excel_data = christopher_row.iloc[0].to_dict()
                print("✅ Found Christopher Naude in Excel data")
                
                # Display key financial data
                print("\n💰 FINANCIAL DATA FROM EXCEL:")
                print("-" * 40)
                
                key_fields = {
                    'Date Join': 'Date Joined',
                    'Membership Fee (Once-Off)': 'Membership Fee',
                    'Expected Contribution (Current Year)': 'Expected Annual Contribution',
                    'Balance Brought Forward ': 'Balance Brought Forward',
                    'Estimated 12 Months Contribution (Jul 2023-June 2024)': 'Estimated 12-Month Contribution',
                    'Total Contribution for 12 Months': 'Total Contributions Made',
                    'Total outstanding contribution for 12 Months ': 'Outstanding Contributions',
                    'Closing Balance': 'Closing Balance',
                    'Total Bank Charges @ 1,1%': 'Bank Charges'
                }
                
                for excel_field, display_name in key_fields.items():
                    if excel_field in excel_data and pd.notna(excel_data[excel_field]):
                        value = excel_data[excel_field]
                        if isinstance(value, (int, float)):
                            print(f"   {display_name}: R{value:.2f}")
                        else:
                            print(f"   {display_name}: {value}")
                
            else:
                print("❌ Christopher Naude not found in Excel data")
                return
                
        except Exception as e:
            print(f"❌ Error reading Excel file: {e}")
            return
        
        # Analysis and Calculations
        print("\n🧮 FINANCIAL ANALYSIS & CALCULATIONS")
        print("-" * 40)
        
        # Catch-up Fee Analysis
        print("\n💰 CATCH-UP FEE ANALYSIS:")
        catch_up_fee = member['catch_up_fee']
        monthly_contribution = member['monthly_contribution']
        
        print(f"   Current catch-up fee: R{catch_up_fee}")
        print(f"   Monthly contribution: R{monthly_contribution}")
        
        if catch_up_fee == 600:
            print("   📊 Calculation breakdown:")
            print("      - Standard monthly contribution: R200")
            print("      - Catch-up fee of R600 suggests 3 months missed")
            print("      - Calculation: 3 months × R200 = R600")
        
        # Balance Analysis
        if balance_response.data:
            print("\n💳 BALANCE ANALYSIS:")
            current_balance = balance['savings_balance']
            excel_balance = excel_data.get('Closing Balance', 0)
            
            print(f"   Current database balance: R{current_balance:.2f}")
            print(f"   Excel closing balance: R{excel_balance:.2f}")
            
            # Verify balance calculation
            balance_brought_forward = excel_data.get('Balance Brought Forward ', 0)
            total_contributions = excel_data.get('Total Contribution for 12 Months', 0)
            bank_charges = excel_data.get('Total Bank Charges @ 1,1%', 0)
            
            expected_balance = balance_brought_forward + total_contributions - bank_charges
            print(f"   Expected balance: R{expected_balance:.2f}")
            
            if abs(expected_balance - current_balance) < 0.01:
                print("   ✅ Balance calculation verified")
            else:
                print(f"   ⚠️  Balance discrepancy: R{abs(expected_balance - current_balance):.2f}")
        
        # Contribution Analysis
        print("\n📈 CONTRIBUTION ANALYSIS:")
        expected_contribution = excel_data.get('Expected Contribution (Current Year)', 0)
        total_contribution = excel_data.get('Total Contribution for 12 Months', 0)
        outstanding_contribution = excel_data.get('Total outstanding contribution for 12 Months ', 0)
        
        print(f"   Expected annual contribution: R{expected_contribution:.2f}")
        print(f"   Total contributions made: R{total_contribution:.2f}")
        print(f"   Outstanding contributions: R{outstanding_contribution:.2f}")
        
        if expected_contribution > 0:
            contribution_rate = (total_contribution / expected_contribution) * 100
            print(f"   Contribution rate: {contribution_rate:.1f}%")
        
        monthly_rate = expected_contribution / 12 if expected_contribution > 0 else 0
        print(f"   Expected monthly contribution: R{monthly_rate:.2f}")
        
        # Recommendations
        print("\n💡 RECOMMENDATIONS & INSIGHTS")
        print("-" * 40)
        
        if member['catch_up_fee'] > 0:
            print("⚠️  Member has outstanding catch-up fees")
            print("   - Consider payment plan options")
            print("   - Review contribution history for patterns")
        
        if balance_response.data and balance['savings_balance'] > 0:
            print("✅ Member has positive savings balance")
            print("   - Eligible for loans and withdrawals")
            print("   - Consider investment opportunities")
        
        # Summary
        print("\n📋 SUMMARY")
        print("-" * 40)
        print(f"Member Status: Christopher Naude (M{member['member_number']})")
        print(f"Financial Health: {'Good' if balance_response.data and balance['savings_balance'] > 10000 else 'Needs Attention'}")
        print(f"Compliance: {'Needs Improvement' if member['catch_up_fee'] > 0 else 'Compliant'}")
        
        print("\n" + "=" * 70)
        print("📊 ANALYSIS COMPLETED SUCCESSFULLY")
        print("=" * 70)
        
    except Exception as e:
        print(f"❌ Error during analysis: {e}")

if __name__ == "__main__":
    analyze_christopher_naude()
