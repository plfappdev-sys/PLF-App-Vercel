#!/usr/bin/env python3
"""
Christopher Naude (M006) Financial Analysis
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

class ChristopherNaudeAnalysis:
    def __init__(self):
        self.member_data = {}
        self.excel_data = {}
        self.analysis_results = {}
        
    def get_member_data(self):
        """Get Christopher Naude's data from database"""
        try:
            print("📊 Retrieving Christopher Naude data from database...")
            
            # Get member info
            response = supabase.table('members').select('*').eq('name', 'Christopher Naude').execute()
            if response.data:
                self.member_data = response.data[0]
                print(f"✅ Found member: {self.member_data['name']} (M{self.member_data['member_number']:03d})")
            else:
                print("❌ Christopher Naude not found in database")
                return False
            
            # Get member balance
            balance_response = supabase.table('member_balances').select('*').eq('member_id', self.member_data['id']).execute()
            if balance_response.data:
                self.member_data['balance'] = balance_response.data[0]
                print(f"✅ Balance found: R{self.member_data['balance']['savings_balance']:.2f}")
            
            # Get contributions
            contributions_response = supabase.table('contributions').select('*').eq('member_id', self.member_data['id']).execute()
            if contributions_response.data:
                self.member_data['contributions'] = contributions_response.data
                print(f"✅ Contributions found: {len(self.member_data['contributions'])} records")
            
            # Get transactions
            transactions_response = supabase.table('transactions').select('*').eq('member_id', self.member_data['id']).execute()
            if transactions_response.data:
                self.member_data['transactions'] = transactions_response.data
                print(f"✅ Transactions found: {len(self.member_data['transactions'])} records")
            
            return True
            
        except Exception as e:
            print(f"❌ Error retrieving member data: {e}")
            return False
    
    def extract_excel_data(self):
        """Extract Christopher Naude's data from Excel file"""
        try:
            print("\n📊 Extracting data from Excel file...")
            file_path = 'NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025.xlsx'
            
            # Read 2024-2025 sheet
            df_2024_2025 = pd.read_excel(file_path, sheet_name='2024-2025')
            
            # Find Christopher Naude in the data
            christopher_row = df_2024_2025[df_2024_2025['Member'] == 'Christopher Naude']
            
            if not christopher_row.empty:
                self.excel_data = christopher_row.iloc[0].to_dict()
                print("✅ Found Christopher Naude in Excel data")
                
                # Extract key financial columns
                key_columns = [
                    'Member', 'Date Join', 'Membership Fee (Once-Off)', 
                    'Expected Contribution (Current Year)', 'Balance Brought Forward ',
                    'Estimated 12 Months Contribution (Jul 2023-June 2024)',
                    'Total Contribution for 12 Months', 
                    'Total outstanding contribution for 12 Months ',
                    'Closing Balance', 'Total Bank Charges @ 1,1%'
                ]
                
                print("📈 Key financial data extracted:")
                for col in key_columns:
                    if col in self.excel_data and pd.notna(self.excel_data[col]):
                        print(f"   {col}: {self.excel_data[col]}")
                
            else:
                print("❌ Christopher Naude not found in Excel data")
                return False
            
            return True
            
        except Exception as e:
            print(f"❌ Error extracting Excel data: {e}")
            return False
    
    def analyze_catch_up_fee(self):
        """Analyze catch-up fee calculation"""
        print("\n💰 CATCH-UP FEE ANALYSIS")
        print("=" * 50)
        
        if 'catch_up_fee' in self.member_data:
            catch_up_fee = self.member_data['catch_up_fee']
            monthly_contribution = self.member_data['monthly_contribution']
            
            print(f"Current catch-up fee: R{catch_up_fee}")
            print(f"Monthly contribution: R{monthly_contribution}")
            
            # Calculate expected catch-up fee based on business logic
            # Assuming R200 monthly contribution and some months missed
            if catch_up_fee == 600:
                print("📊 Catch-up fee calculation breakdown:")
                print("   - Standard monthly contribution: R200")
                print("   - Catch-up fee of R600 suggests 3 months missed")
                print("   - Calculation: 3 months × R200 = R600")
            else:
                print("⚠️  Unexpected catch-up fee amount")
        
    def analyze_balance_calculation(self):
        """Analyze how the balance was calculated"""
        print("\n💳 BALANCE CALCULATION ANALYSIS")
        print("=" * 50)
        
        if 'balance' in self.member_data and self.excel_data:
            current_balance = self.member_data['balance']['savings_balance']
            excel_balance = self.excel_data.get('Closing Balance', 0)
            
            print(f"Current database balance: R{current_balance:.2f}")
            print(f"Excel closing balance: R{excel_balance:.2f}")
            
            # Analyze components
            balance_brought_forward = self.excel_data.get('Balance Brought Forward ', 0)
            total_contributions = self.excel_data.get('Total Contribution for 12 Months', 0)
            bank_charges = self.excel_data.get('Total Bank Charges @ 1,1%', 0)
            
            print("\n📊 Balance components:")
            print(f"   Balance brought forward: R{balance_brought_forward:.2f}")
            print(f"   Total contributions: R{total_contributions:.2f}")
            print(f"   Bank charges: R{bank_charges:.2f}")
            
            # Calculate expected balance
            expected_balance = balance_brought_forward + total_contributions - bank_charges
            print(f"   Expected balance: R{expected_balance:.2f}")
            print(f"   Actual balance: R{current_balance:.2f}")
            
            if abs(expected_balance - current_balance) < 0.01:
                print("✅ Balance calculation verified")
            else:
                print(f"⚠️  Balance discrepancy: R{abs(expected_balance - current_balance):.2f}")
    
    def analyze_contribution_history(self):
        """Analyze contribution history and patterns"""
        print("\n📈 CONTRIBUTION HISTORY ANALYSIS")
        print("=" * 50)
        
        if self.excel_data:
            expected_contribution = self.excel_data.get('Expected Contribution (Current Year)', 0)
            total_contribution = self.excel_data.get('Total Contribution for 12 Months', 0)
            outstanding_contribution = self.excel_data.get('Total outstanding contribution for 12 Months ', 0)
            
            print(f"Expected annual contribution: R{expected_contribution:.2f}")
            print(f"Total contributions made: R{total_contribution:.2f}")
            print(f"Outstanding contributions: R{outstanding_contribution:.2f}")
            
            # Calculate contribution rate
            if expected_contribution > 0:
                contribution_rate = (total_contribution / expected_contribution) * 100
                print(f"Contribution rate: {contribution_rate:.1f}%")
            
            # Monthly breakdown
            monthly_rate = expected_contribution / 12 if expected_contribution > 0 else 0
            print(f"Expected monthly contribution: R{monthly_rate:.2f}")
    
    def generate_comprehensive_report(self):
        """Generate comprehensive financial report"""
        print("\n" + "=" * 60)
        print("🎯 CHRISTOPHER NAUDE (M006) - COMPREHENSIVE FINANCIAL ANALYSIS")
        print("=" * 60)
        
        # Basic Information
        print("\n👤 MEMBER PROFILE")
        print("-" * 30)
        print(f"Name: {self.member_data.get('name', 'N/A')}")
        print(f"Member Number: M{self.member_data.get('member_number', 0):03d}")
        print(f"Member ID: {self.member_data.get('id', 'N/A')}")
        
        # Financial Summary
        print("\n💰 FINANCIAL SUMMARY")
        print("-" * 30)
        balance = self.member_data.get('balance', {}).get('savings_balance', 0)
        print(f"Current Savings Balance: R{balance:.2f}")
        print(f"Catch-up Fee: R{self.member_data.get('catch_up_fee', 0)}")
        print(f"Monthly Contribution: R{self.member_data.get('monthly_contribution', 0)}")
        
        # Excel Data Analysis
        if self.excel_data:
            print("\n📊 EXCEL DATA ANALYSIS")
            print("-" * 30)
            print(f"Date Joined: {self.excel_data.get('Date Join', 'N/A')}")
            print(f"Membership Fee: R{self.excel_data.get('Membership Fee (Once-Off)', 0)}")
            print(f"Balance Brought Forward: R{self.excel_data.get('Balance Brought Forward ', 0)}")
            print(f"Total Contributions (12 months): R{self.excel_data.get('Total Contribution for 12 Months', 0)}")
            print(f"Outstanding Contributions: R{self.excel_data.get('Total outstanding contribution for 12 Months ', 0)}")
            print(f"Closing Balance: R{self.excel_data.get('Closing Balance', 0)}")
            print(f"Bank Charges: R{self.excel_data.get('Total Bank Charges @ 1,1%', 0)}")
        
        # Calculations Summary
        print("\n🧮 CALCULATIONS SUMMARY")
        print("-" * 30)
        self.analyze_catch_up_fee()
        self.analyze_balance_calculation()
        self.analyze_contribution_history()
        
        # Recommendations
        print("\n💡 RECOMMENDATIONS")
        print("-" * 30)
        if self.member_data.get('catch_up_fee', 0) > 0:
            print("⚠️  Member has outstanding catch-up fees")
            print("   - Consider payment plan options")
            print("   - Review contribution history for patterns")
        
        balance = self.member_data.get('balance', {}).get('savings_balance', 0)
        if balance > 0:
            print("✅ Member has positive savings balance")
            print("   - Eligible for loans and withdrawals")
            print("   - Consider investment opportunities")
        
        print("\n" + "=" * 60)
        print("📋 ANALYSIS COMPLETED")
        print("=" * 60)
    
    def run_analysis(self):
        """Run the complete analysis"""
        print("Starting Christopher Naude Financial Analysis...")
        
        # Get data from database
        if not self.get_member_data():
            return False
        
        # Extract data from Excel
        if not self.extract_excel_data():
            return False
        
        # Generate comprehensive report
        self.generate_comprehensive_report()
        
        return True

def main():
    """Main function"""
    # Check if Supabase credentials are available
    if not SUPABASE_SERVICE_ROLE_KEY:
        print("Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required")
        return
    
    # Create analysis instance
    analysis = ChristopherNaudeAnalysis()
    
    # Run analysis
    success = analysis.run_analysis()
    
    if success:
        print("\nChristopher Naude analysis completed successfully!")
    else:
        print("\nChristopher Naude analysis failed. Please check the errors above.")

if __name__ == "__main__":
    main()
