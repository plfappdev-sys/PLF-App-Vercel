#!/usr/bin/env python3
"""
PLF Excel Data Extractor
Purpose: Extract member and contribution data from Excel file for migration
Created: September 21, 2025
"""

import pandas as pd
import json
from datetime import datetime, date
import re

class PLFExcelExtractor:
    def __init__(self, excel_file_path):
        self.excel_file = excel_file_path
        self.members_data = []
        self.contributions_data = []
        self.transactions_data = []
        
    def extract_member_data(self):
        """Extract member information from Excel sheets"""
        print("Extracting member data from Excel...")
        
        # Sheets that contain member information
        sheets_to_check = ['2019-2020 New', '2020-2021 New', '2021-2022 (A) New']
        seen_members = set()
        
        for sheet in sheets_to_check:
            try:
                df = pd.read_excel(self.excel_file, sheet_name=sheet)
                
                if 'Member' in df.columns:
                    for index, row in df.iterrows():
                        member_id = row.get('Member')
                        if pd.notna(member_id) and member_id not in seen_members:
                            seen_members.add(member_id)
                            
                            # Extract member details
                            join_date = self.parse_date(row.get('Date Join'))
                            membership_fee = self.parse_amount(row.get('Membership Fee') or row.get('Membership Fee (Once-Off)'))
                            catch_up_fee = self.parse_amount(row.get('Catch-up Fee') or row.get('Catch-up Fee '))
                            
                            member_data = {
                                'member_id': member_id,
                                'member_number': self.extract_member_number(member_id),
                                'join_date': join_date,
                                'membership_fee': membership_fee,
                                'catch_up_fee': catch_up_fee,
                                'source_sheet': sheet,
                                'row_index': index
                            }
                            
                            self.members_data.append(member_data)
                            
            except Exception as e:
                print(f"Error processing sheet {sheet}: {e}")
        
        print(f"Extracted {len(self.members_data)} unique members")
        return self.members_data
    
    def extract_contribution_data(self):
        """Extract contribution data from Excel sheets"""
        print("Extracting contribution data from Excel...")
        
        # Sheets that contain contribution data (financial years)
        financial_year_sheets = {
            '2019-2020 New': (datetime(2019, 7, 1), datetime(2020, 6, 30)),
            '2020-2021 New': (datetime(2020, 7, 1), datetime(2021, 6, 30)),
            '2021-2022 (A) New': (datetime(2021, 7, 1), datetime(2021, 10, 31))  # Partial year
        }
        
        for sheet, (start_date, end_date) in financial_year_sheets.items():
            try:
                df = pd.read_excel(self.excel_file, sheet_name=sheet)
                
                if 'Member' in df.columns:
                    for index, row in df.iterrows():
                        member_id = row.get('Member')
                        if pd.notna(member_id):
                            # Extract monthly contributions
                            self.extract_monthly_contributions(row, member_id, sheet, start_date.year)
                            
            except Exception as e:
                print(f"Error processing contributions from sheet {sheet}: {e}")
        
        print(f"Extracted {len(self.contributions_data)} contribution records")
        return self.contributions_data
    
    def extract_monthly_contributions(self, row, member_id, sheet_name, year):
        """Extract monthly contribution data from a row"""
        # Pattern to match monthly contribution columns
        date_pattern = re.compile(r'\d{4}-\d{2}-\d{2}')
        amount_pattern = re.compile(r'Amount Due')
        
        for col_name, value in row.items():
            if pd.notna(value) and isinstance(value, (int, float)) and value > 0:
                # Check if this is a date column (monthly contribution)
                if isinstance(col_name, datetime):
                    contribution_date = col_name
                    amount = value
                    
                    contribution_data = {
                        'member_id': member_id,
                        'contribution_date': contribution_date.isoformat(),
                        'amount': amount,
                        'contribution_type': 'monthly',
                        'financial_year': year,
                        'source_sheet': sheet_name,
                        'status': 'completed'
                    }
                    
                    self.contributions_data.append(contribution_data)
                    self.transactions_data.append({
                        'member_id': member_id,
                        'transaction_date': contribution_date.isoformat(),
                        'amount': amount,
                        'transaction_type': 'deposit',
                        'description': f'Monthly contribution - {contribution_date.strftime("%B %Y")}',
                        'status': 'completed'
                    })
                
                # Check for amount due columns
                elif isinstance(col_name, str) and amount_pattern.search(col_name):
                    # This might represent a monthly amount due
                    pass
    
    def parse_date(self, date_value):
        """Parse date values from various formats"""
        if pd.isna(date_value):
            return None
        
        if isinstance(date_value, datetime):
            return date_value.isoformat()
        
        if isinstance(date_value, date):
            return date_value.isoformat()
        
        if isinstance(date_value, str):
            try:
                # Try different date formats
                for fmt in ('%d/%m/%Y', '%Y-%m-%d', '%m/%d/%Y', '%d-%m-%Y'):
                    try:
                        dt = datetime.strptime(date_value, fmt)
                        return dt.isoformat()
                    except ValueError:
                        continue
            except:
                pass
        
        return None
    
    def parse_amount(self, amount_value):
        """Parse amount values, handling various formats"""
        if pd.isna(amount_value):
            return 0.0
        
        try:
            if isinstance(amount_value, (int, float)):
                return float(amount_value)
            
            if isinstance(amount_value, str):
                # Remove currency symbols and commas
                cleaned = amount_value.replace('R', '').replace('$', '').replace(',', '').strip()
                return float(cleaned)
                
        except (ValueError, TypeError):
            pass
        
        return 0.0
    
    def extract_member_number(self, member_id):
        """Extract numeric member number from member ID string"""
        if isinstance(member_id, str):
            # Extract numbers from strings like "Member 1", "M123", etc.
            numbers = re.findall(r'\d+', member_id)
            if numbers:
                return int(numbers[0])
        return None
    
    def save_extracted_data(self):
        """Save extracted data to JSON files for reference"""
        print("Saving extracted data to files...")
        
        # Save members data
        with open('extracted_members_detailed.json', 'w') as f:
            json.dump(self.members_data, f, indent=2, default=str)
        
        # Save contributions data
        with open('extracted_contributions.json', 'w') as f:
            json.dump(self.contributions_data, f, indent=2, default=str)
        
        # Save transactions data
        with open('extracted_transactions.json', 'w') as f:
            json.dump(self.transactions_data, f, indent=2, default=str)
        
        print("Data saved to extracted_*.json files")
    
    def run_extraction(self):
        """Run the complete data extraction process"""
        print("Starting PLF Excel Data Extraction...")
        print("=" * 50)
        
        # Extract data
        self.extract_member_data()
        self.extract_contribution_data()
        
        # Save results
        self.save_extracted_data()
        
        print("\n" + "=" * 50)
        print("Data extraction completed!")
        print(f"- Members: {len(self.members_data)}")
        print(f"- Contributions: {len(self.contributions_data)}")
        print(f"- Transactions: {len(self.transactions_data)}")
        print("\nNext steps:")
        print("1. Review extracted_*.json files")
        print("2. Create data migration script using this extracted data")
        print("3. Run migration to import data to Supabase")

def main():
    """Main function"""
    excel_file = 'NewBusLogic/Peoples Liberator Fund Contributions 2025 App.xlsx'
    
    # Create extractor instance
    extractor = PLFExcelExtractor(excel_file)
    
    # Run extraction
    extractor.run_extraction()

if __name__ == "__main__":
    main()
