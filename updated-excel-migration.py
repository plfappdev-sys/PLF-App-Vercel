#!/usr/bin/env python3
"""
PLF Updated Excel Data Migration Script
Purpose: Migrate historical data from updated Excel to Supabase
Created: September 21, 2025
"""

import os
import json
import pandas as pd
from datetime import datetime
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration - Use correct environment variable names
SUPABASE_URL = os.getenv('PROJECT_URL', 'https://zdnyhzasvifrskbostgn.supabase.co')
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SERVICE_ROLE_KEY', '')

class PLFUpdatedExcelMigrator:
    def __init__(self):
        self.supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
        self.excel_data = {}
        
    def load_excel_data(self):
        """Load data from the updated Excel file"""
        print("Loading data from updated Excel file...")
        
        try:
            # Load the updated Excel file
            excel_file = 'NewBusLogic/Peoples Liberator Fund Contributions 2025 AppUPDATED.xlsx'
            self.excel_data = pd.read_excel(excel_file, sheet_name=None)
            
            print("Available sheets loaded:")
            for sheet_name in self.excel_data.keys():
                print(f"  - {sheet_name}")
            
            return True
            
        except Exception as e:
            print(f"Error loading Excel data: {e}")
            return False
    
    def extract_members_from_catch_up_sheet(self):
        """Extract member data from the Catch up Fee sheet"""
        print("Extracting member data from Catch up Fee sheet...")
        
        try:
            catch_up_sheet = self.excel_data.get('Catch up Fee')
            if catch_up_sheet is None:
                print("❌ Catch up Fee sheet not found")
                return []
            
            # Clean the data - remove rows with NaN values in Member column
            catch_up_sheet = catch_up_sheet.dropna(subset=['Member'])
            
            members = []
            for index, row in catch_up_sheet.iterrows():
                try:
                    # Handle NaN values in catch-up fee
                    catch_up_fee = row['Catch up fee']
                    if pd.isna(catch_up_fee):
                        catch_up_fee = 0.0
                    
                    member_data = {
                        'member_number': int(row['Member'].replace('Member ', '').strip()),
                        'join_date': self.parse_date(row['Date Join']),
                        'catch_up_fee': float(catch_up_fee),
                        'monthly_contribution': float(row['Monthly Contr']),
                        'start_date': self.parse_date(row['Start Date'])
                    }
                    members.append(member_data)
                except Exception as e:
                    print(f"❌ Error processing row {index}: {e}")
            
            print(f"✅ Extracted {len(members)} members from Catch up Fee sheet")
            return members
            
        except Exception as e:
            print(f"❌ Error extracting members: {e}")
            return []
    
    def parse_date(self, date_value):
        """Parse date values from various formats"""
        if pd.isna(date_value):
            return None
        
        try:
            # Handle different date formats
            if isinstance(date_value, str):
                # Try different date formats
                for fmt in ['%d/%m/%Y', '%Y-%m-%d', '%m/%d/%Y']:
                    try:
                        return datetime.strptime(date_value, fmt).isoformat()
                    except ValueError:
                        continue
                return None
            elif isinstance(date_value, datetime):
                return date_value.isoformat()
            else:
                return None
        except Exception:
            return None
    
    def migrate_members(self):
        """Update existing members with catch-up fee data"""
        print("Updating existing members with catch-up fee data...")
        
        # Extract members from Catch up Fee sheet
        members = self.extract_members_from_catch_up_sheet()
        
        if not members:
            print("❌ No members found to update")
            return False
        
        success_count = 0
        error_count = 0
        
        for member in members:
            try:
                # Update existing member with catch-up fee data
                update_data = {
                    'catch_up_fee': member['catch_up_fee'],
                    'monthly_contribution': member['monthly_contribution']
                }
                
                # Update the existing member record
                response = self.supabase.table('members')\
                    .update(update_data)\
                    .eq('member_number', str(member['member_number']))\
                    .execute()
                
                if response.data:
                    success_count += 1
                    print(f"✅ Updated member {member['member_number']} with catch-up fee: R{member['catch_up_fee']}")
                else:
                    error_count += 1
                    print(f"⚠️ Member {member['member_number']} not found or already updated")
                    
            except Exception as e:
                error_count += 1
                print(f"❌ Error updating member {member.get('member_number', 'unknown')}: {e}")
        
        print(f"Member updates: {success_count} successful, {error_count} failed")
        return success_count > 0
    
    def extract_transactions_from_statements(self):
        """Extract transaction data from statement sheets"""
        print("Extracting transaction data from statement sheets...")
        
        transactions = []
        statement_sheets = ['2018-2019 B STATEMENT', '2022 Mar-Jun']
        
        for sheet_name in statement_sheets:
            try:
                sheet_data = self.excel_data.get(sheet_name)
                if sheet_data is None:
                    print(f"⚠️ Sheet {sheet_name} not found")
                    continue
                
                # Clean the data
                sheet_data = sheet_data.dropna(subset=['TransactionDate', 'Amount'])
                
                for index, row in sheet_data.iterrows():
                    try:
                        # Extract member number from Member column if available
                        member_identifier = None
                        if 'Member' in row and pd.notna(row['Member']):
                            # Try to extract member number from various formats
                            member_str = str(row['Member'])
                            if 'Member' in member_str:
                                try:
                                    member_identifier = int(member_str.replace('Member', '').strip())
                                except:
                                    member_identifier = member_str
                            else:
                                member_identifier = member_str
                        
                        transaction_data = {
                            'transaction_date': self.parse_date(row['TransactionDate']),
                            'amount': self.parse_amount(row['Amount']),
                            'fee': self.parse_amount(row.get('Fee', 0)),
                            'member_identifier': member_identifier,
                            'reference': str(row.get('Reference', '')),
                            'bank_charge': self.parse_amount(row.get('Bank Charge', 0)),
                            'source_sheet': sheet_name
                        }
                        
                        if transaction_data['amount'] is not None:
                            transactions.append(transaction_data)
                            
                    except Exception as e:
                        print(f"❌ Error processing transaction row {index} in {sheet_name}: {e}")
                
                print(f"✅ Extracted {len([t for t in transactions if t['source_sheet'] == sheet_name])} transactions from {sheet_name}")
                
            except Exception as e:
                print(f"❌ Error processing sheet {sheet_name}: {e}")
        
        print(f"Total transactions extracted: {len(transactions)}")
        return transactions
    
    def parse_amount(self, amount_value):
        """Parse amount values from various formats"""
        if pd.isna(amount_value):
            return 0.0
        
        try:
            if isinstance(amount_value, (int, float)):
                return float(amount_value)
            elif isinstance(amount_value, str):
                # Handle R currency format and commas
                cleaned = amount_value.replace('R', '').replace(',', '').replace(' ', '').strip()
                return float(cleaned)
            else:
                return 0.0
        except Exception:
            return 0.0
    
    def migrate_transactions(self):
        """Migrate transaction data to Supabase"""
        print("Migrating transaction data to Supabase...")
        
        transactions = self.extract_transactions_from_statements()
        
        if not transactions:
            print("❌ No transactions found to migrate")
            return False
        
        success_count = 0
        error_count = 0
        
        for transaction in transactions:
            try:
                # Get member ID if we have a member identifier
                member_id = None
                if transaction['member_identifier']:
                    member_id = self.get_member_id_by_identifier(transaction['member_identifier'])
                
                if not member_id:
                    # Skip transactions without member association for now
                    continue
                
                transaction_data = {
                    'member_id': member_id,
                    'transaction_type': 'deposit',  # Assume deposits for now
                    'amount': transaction['amount'],
                    'description': f"Historical transaction from {transaction['source_sheet']}",
                    'status': 'completed',
                    'transaction_date': transaction['transaction_date'],
                    'reference': transaction['reference']
                }
                
                # Insert into Supabase
                response = self.supabase.table('transactions').insert(transaction_data).execute()
                
                if response.data:
                    success_count += 1
                else:
                    error_count += 1
                    
            except Exception as e:
                error_count += 1
                print(f"❌ Error migrating transaction: {e}")
        
        print(f"Transaction migration: {success_count} successful, {error_count} failed")
        return success_count > 0
    
    def get_member_id_by_identifier(self, identifier):
        """Get Supabase member ID by various identifier formats"""
        try:
            if isinstance(identifier, int):
                member_number = str(identifier)
            elif isinstance(identifier, str) and identifier.isdigit():
                member_number = identifier
            else:
                # Try to extract number from string
                import re
                numbers = re.findall(r'\d+', str(identifier))
                if numbers:
                    member_number = numbers[0]
                else:
                    return None
            
            # Query the database to get the actual member ID
            response = self.supabase.table('members')\
                .select('id')\
                .eq('member_number', member_number)\
                .execute()
            
            if response.data and len(response.data) > 0:
                return response.data[0]['id']
            else:
                print(f"❌ Member with identifier {identifier} not found in database")
                return None
                
        except Exception as e:
            print(f"❌ Error getting member ID for {identifier}: {e}")
            return None
    
    def run_migration(self):
        """Run the complete data migration process"""
        print("Starting PLF Updated Excel Data Migration...")
        print("=" * 60)
        
        # Check if Supabase credentials are available
        if not SUPABASE_SERVICE_ROLE_KEY:
            print("❌ SUPABASE_SERVICE_ROLE_KEY environment variable is required")
            return False
        
        # Load Excel data
        if not self.load_excel_data():
            print("❌ Failed to load Excel data")
            return False
        
        # Step 1: Update existing members with catch-up fees
        print("\n1. Updating members with catch-up fees...")
        if not self.migrate_members():
            print("❌ Member update failed")
            return False
        
        # Step 2: Migrate transactions
        print("\n2. Migrating transactions...")
        if not self.migrate_transactions():
            print("⚠️ Transaction migration had issues (some may have failed)")
        
        print("\n" + "=" * 60)
        print("✅ Data migration completed!")
        print("Please verify the data in the following tables:")
        print("- members (updated with accurate catch-up fees from Catch up Fee sheet)")
        print("- transactions (historical payment data)")
        
        return True

def main():
    """Main function"""
    # Create migrator instance
    migrator = PLFUpdatedExcelMigrator()
    
    # Run migration
    success = migrator.run_migration()
    
    if success:
        print("\n🎉 Migration completed successfully!")
        print("\nNext steps:")
        print("1. Verify data in Supabase dashboard")
        print("2. Test the application with updated historical data")
        print("3. Monitor Edge Functions execution with real data")
    else:
        print("\n❌ Migration failed. Please check the errors above.")

if __name__ == "__main__":
    main()
