#!/usr/bin/env python3
"""
PLF Missing Excel Data Import Script
====================================
This script extracts missing financial data from the Excel spreadsheet
and imports it into the Supabase database.

Target Excel columns (based on ExcelToDatabaseMapping.md):
1. Expected Contribution
2. Outstanding Amount
3. Outstanding Contributions
4. Penalties
5. Balance Brought Forward
6. Catch-Up Fee
7. Total Bank Charges
8. Share Value
9. Capped Penalties
10. Estimated Annual Contribution

Created: March 9, 2026
"""

import pandas as pd
import json
import os
import sys
from datetime import datetime
from typing import Dict, List, Optional, Any
import supabase
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class MissingExcelDataImporter:
    def __init__(self):
        # Excel file configuration - UPDATED TO USE CORRECT FILE
        self.excel_file_path = "NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"
        self.target_sheet = "2024-2025"  # Final totals sheet
        
        # Supabase configuration
        self.supabase_url = os.getenv("SUPABASE_URL")
        self.supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")  # Use service role for data import
        
        if not self.supabase_url or not self.supabase_key:
            print("❌ ERROR: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env file")
            sys.exit(1)
        
        # Initialize Supabase client
        try:
            self.supabase_client = supabase.create_client(self.supabase_url, self.supabase_key)
            print("✅ Connected to Supabase")
        except Exception as e:
            print(f"❌ Failed to connect to Supabase: {e}")
            sys.exit(1)
        
        # Column mapping: Excel column name -> Database column name
        self.column_mapping = {
            # High Priority (MyFundsScreen)
            "Expected Contribution": "expected_contribution",
            "Total outstanding contribution for 12 Months": "outstanding_contributions",
            "Penalty July 2024- June 2025": "total_penalties",  # Adjust year as needed
            "Closing Balance": "current_balance",  # Already exists, but we'll verify
            
            # Medium Priority (Calculations)
            "Balance Brought Forward (*I\nIncl. Catch up Fee)": "balance_brought_forward",
            "Catch-Up Fee": "catch_up_fee",
            
            # Low Priority (Additional data)
            "Total Bank Charges @ 1,1%": "total_bank_charges",
            "Share Value": "share_value",
            "Capped Penalties Current Financial Year": "capped_penalties",
            "Estimated 12 Months Contribution (Jul 2024-June 2025)": "estimated_annual_contribution",
            
            # Already imported but we need for mapping
            "Total Contribution for 12 Months": "total_contributions",
            "Member": "member_number"
        }
        
        # Alternative column names (in case Excel has variations)
        self.alternative_column_names = {
            "Expected Contribution": ["Expected Contribution", "ExpectedContribution", "Expected"],
            "Total outstanding contribution for 12 Months": ["Total outstanding contribution for 12 Months", "Outstanding Contributions", "Outstanding"],
            "Penalty July 2024- June 2025": ["Penalty July 2024- June 2025", "Penalty", "Total Penalties", "Penalties"],
            "Balance Brought Forward": ["Balance Brought Forward (*I\nIncl. Catch up Fee)", "Balance Brought Forward", "BalanceBF", "Brought Forward"],
            "Catch-Up Fee": ["Catch-Up Fee", "CatchUpFee", "Catch Up Fee"],
            "Total Bank Charges": ["Total Bank Charges @ 1,1%", "Bank Charges", "Total Bank Charges"],
            "Share Value": ["Share Value", "ShareValue"],
            "Capped Penalties": ["Capped Penalties Current Financial Year", "Capped Penalties", "Capped"],
            "Estimated Annual Contribution": ["Estimated 12 Months Contribution (Jul 2024-June 2025)", "Estimated Contribution", "Estimated"]
        }
    
    def find_column_name(self, df: pd.DataFrame, target_names: List[str]) -> Optional[str]:
        """Find the actual column name in the DataFrame from a list of possible names."""
        for col in df.columns:
            col_str = str(col).strip()
            for target in target_names:
                if target.lower() in col_str.lower():
                    return col
        return None
    
    def extract_excel_data(self) -> Dict[str, List[Dict]]:
        """Extract missing data from Excel file."""
        print(f"📖 Reading Excel file: {self.excel_file_path}")
        print(f"📄 Target sheet: {self.target_sheet}")
        
        try:
            # Read the Excel file
            df = pd.read_excel(self.excel_file_path, sheet_name=self.target_sheet)
            print(f"✅ Loaded Excel sheet with {len(df)} rows and {len(df.columns)} columns")
            
            # Display available columns for debugging
            print("\n📋 Available columns in Excel:")
            for i, col in enumerate(df.columns[:20]):  # Show first 20 columns
                print(f"  {i+1}. {col}")
            
            if len(df.columns) > 20:
                print(f"  ... and {len(df.columns) - 20} more columns")
            
            # Find actual column names for our target data
            actual_column_names = {}
            for excel_col, db_col in self.column_mapping.items():
                if excel_col in self.alternative_column_names:
                    found_col = self.find_column_name(df, self.alternative_column_names[excel_col])
                    if found_col:
                        actual_column_names[db_col] = found_col
                        print(f"✅ Found '{excel_col}' as '{found_col}' -> maps to '{db_col}'")
                    else:
                        print(f"⚠️  WARNING: Could not find column for '{excel_col}'")
                        actual_column_names[db_col] = None
                else:
                    if excel_col in df.columns:
                        actual_column_names[db_col] = excel_col
                        print(f"✅ Found '{excel_col}' -> maps to '{db_col}'")
                    else:
                        print(f"⚠️  WARNING: Column '{excel_col}' not found in Excel")
                        actual_column_names[db_col] = None
            
            # Extract member data
            member_data = []
            member_number_col = actual_column_names.get("member_number")
            
            if not member_number_col:
                print("❌ ERROR: Could not find Member column in Excel")
                return {"members": [], "summary": {}}
            
            print(f"\n🔍 Extracting data using member column: '{member_number_col}'")
            
            for idx, row in df.iterrows():
                try:
                    member_number = str(row[member_number_col]).strip()
                    
                    # Skip rows without member numbers
                    if pd.isna(member_number) or member_number == "nan" or not member_number:
                        continue
                    
                    # Clean member number (remove "Member " prefix if present)
                    if member_number.lower().startswith("member "):
                        member_number = member_number[7:].strip()
                    
                    member_record = {
                        "excel_row": idx + 2,  # Excel rows are 1-indexed
                        "member_number": member_number,
                        "data": {}
                    }
                    
                    # Extract all mapped columns
                    for db_col, excel_col in actual_column_names.items():
                        if excel_col and db_col != "member_number":
                            try:
                                value = row[excel_col]
                                
                                # Handle NaN values
                                if pd.isna(value):
                                    member_record["data"][db_col] = None
                                else:
                                    # Convert to appropriate type
                                    if isinstance(value, (int, float)):
                                        member_record["data"][db_col] = float(value)
                                    else:
                                        member_record["data"][db_col] = str(value).strip()
                            except KeyError:
                                member_record["data"][db_col] = None
                    
                    # Calculate outstanding_amount if we have the components
                    if (member_record["data"].get("outstanding_contributions") is not None and 
                        member_record["data"].get("total_penalties") is not None):
                        try:
                            outstanding = float(member_record["data"]["outstanding_contributions"] or 0)
                            penalties = float(member_record["data"]["total_penalties"] or 0)
                            member_record["data"]["outstanding_amount"] = outstanding + penalties
                        except (ValueError, TypeError):
                            member_record["data"]["outstanding_amount"] = None
                    
                    member_data.append(member_record)
                    
                    if len(member_data) % 10 == 0:
                        print(f"  Extracted {len(member_data)} members...")
                        
                except Exception as e:
                    print(f"⚠️  Error processing row {idx + 2}: {e}")
                    continue
            
            print(f"\n✅ Successfully extracted data for {len(member_data)} members")
            
            # Create summary
            summary = {
                "extraction_date": datetime.now().isoformat(),
                "excel_file": self.excel_file_path,
                "sheet_name": self.target_sheet,
                "total_members_extracted": len(member_data),
                "columns_found": {k: v for k, v in actual_column_names.items() if v},
                "columns_missing": [k for k, v in actual_column_names.items() if not v]
            }
            
            return {
                "members": member_data,
                "summary": summary
            }
            
        except Exception as e:
            print(f"❌ Error reading Excel file: {e}")
            return {"members": [], "summary": {"error": str(e)}}
    
    def get_member_id_from_number(self, member_number: str) -> Optional[str]:
        """Get member UUID from member number."""
        try:
            response = self.supabase_client.table("members")\
                .select("id, member_number")\
                .eq("member_number", member_number)\
                .execute()
            
            if response.data and len(response.data) > 0:
                return response.data[0]["id"]
            return None
        except Exception as e:
            print(f"❌ Error fetching member {member_number}: {e}")
            return None
    
    def update_member_data(self, member_data: Dict) -> Dict:
        """Update a single member's data in the database."""
        member_number = member_data["member_number"]
        data = member_data["data"]
        
        # Get member ID
        member_id = self.get_member_id_from_number(member_number)
        
        if not member_id:
            print(f"⚠️  Member {member_number} not found in database, skipping...")
            return {"member_number": member_number, "status": "skipped", "reason": "not_found"}
        
        # Prepare update data (only non-null values)
        update_data = {}
        for key, value in data.items():
            if value is not None:
                update_data[key] = value
        
        if not update_data:
            return {"member_number": member_number, "status": "skipped", "reason": "no_data"}
        
        try:
            # Update member record
            response = self.supabase_client.table("members")\
                .update(update_data)\
                .eq("id", member_id)\
                .execute()
            
            if response.data:
                print(f"✅ Updated member {member_number} with {len(update_data)} fields")
                return {"member_number": member_number, "status": "updated", "fields": list(update_data.keys())}
            else:
                print(f"⚠️  No data returned for member {member_number}")
                return {"member_number": member_number, "status": "failed", "reason": "no_response"}
                
        except Exception as e:
            print(f"❌ Error updating member {member_number}: {e}")
            return {"member_number": member_number, "status": "failed", "reason": str(e)}
    
    def import_to_database(self, extracted_data: Dict) -> Dict:
        """Import extracted data to Supabase database."""
        members = extracted_data.get("members", [])
        
        if not members:
            print("❌ No member data to import")
            return {"total": 0, "updated": 0, "skipped": 0, "failed": 0, "details": []}
        
        print(f"\n🚀 Starting database import for {len(members)} members...")
        
        results = {
            "total": len(members),
            "updated": 0,
            "skipped": 0,
            "failed": 0,
            "details": []
        }
        
        for i, member_data in enumerate(members):
            print(f"  Processing {i+1}/{len(members)}: {member_data['member_number']}...")
            
            result = self.update_member_data(member_data)
            results["details"].append(result)
            
            if result["status"] == "updated":
                results["updated"] += 1
            elif result["status"] == "skipped":
                results["skipped"] += 1
            elif result["status"] == "failed":
                results["failed"] += 1
        
        print(f"\n📊 Import Results:")
        print(f"  ✅ Updated: {results['updated']}")
        print(f"  ⚠️  Skipped: {results['skipped']}")
        print(f"  ❌ Failed: {results['failed']}")
        print(f"  📋 Total: {results['total']}")
        
        return results
    
    def save_extracted_data(self, extracted_data: Dict, filename: str = "extracted_missing_data.json"):
        """Save extracted data to JSON file for backup."""
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(extracted_data, f, indent=2, ensure_ascii=False)
            print(f"💾 Extracted data saved to: {filename}")
        except Exception as e:
            print(f"⚠️  Could not save extracted data: {e}")
    
    def run(self, dry_run: bool = False):
        """Run the complete import process."""
        print("=" * 60)
        print("🧮 PLF Missing Excel Data Importer")
        print("=" * 60)
        
        # Step 1: Extract data from Excel
        print("\n📥 STEP 1: Extracting data from Excel...")
        extracted_data = self.extract_excel_data()
        
        if not extracted_data["members"]:
            print("❌ No data extracted, exiting...")
            return
        
        # Save extracted data
        self.save_extracted_data(extracted_data)
        
        # Display summary
        summary = extracted_data["summary"]
        print(f"\n📊 Extraction Summary:")
        print(f"  Members extracted: {summary.get('total_members_extracted', 0)}")
        print(f"  Columns found: {len(summary.get('columns_found', {}))}")
        
        missing_cols = summary.get('columns_missing', [])
        if missing_cols:
            print(f"  ⚠️  Columns missing: {', '.join(missing_cols)}")
        
        # Show sample data
        if extracted_data["members"]:
            print(f"\n📋 Sample data (first member):")
            sample = extracted_data["members"][0]
            print(f"  Member: {sample['member_number']}")
            for key, value in sample['data'].items():
                if value is not None:
                    print(f"    {key}: {value}")
        
        if dry_run:
            print("\n🔍 DRY RUN: Would import data for", len(extracted_data["members"]), "members")
            print("   To actually import, run with --import flag")
            return
        
        # Step 2: Import to database
        print("\n📤 STEP 2: Importing to database...")
        import_results = self.import_to_database(extracted_data)
        
        # Step 3: Final summary
        print("\n" + "=" * 60)
        print("🎉 IMPORT COMPLETE")
        print("=" * 60)
        
        print(f"\n📈 Final Results:")
        print(f"  ✅ Successfully updated: {import_results['updated']} members")
        print(f"  ⚠️  Skipped (not found): {import_results['skipped']} members")
        print(f"  ❌ Failed: {import_results['failed']} members")
        
        # Save results
        results_file = "import_results.json"
        try:
            with open(results_file, 'w', encoding='utf-8') as f:
                json.dump({
                    "import_date": datetime.now().isoformat(),
                    "extraction_summary": extracted_data["summary"],
                    "import_results": import_results
                }, f, indent=2, ensure_ascii=False)
            print(f"💾 Results saved to: {results_file}")
        except Exception as e:
            print(f"⚠️  Could not save results: {e}")
        
        print("\n✅ Process completed!")

def main():
    import argparse
    
    parser = argparse.ArgumentParser(description='Import missing Excel data to PLF database')
    parser.add_argument('--dry-run', action='store_true', help='Extract data but do not import')
    parser.add_argument('--import', dest='do_import', action='store_true', help='Actually import data to database')
    parser.add_argument('--excel-file', type=str, help='Path to Excel file (default: NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx)')
    parser.add_argument('--sheet', type=str, help='Sheet name (default: 2024-2025)')
    
    args = parser.parse_args()
    
    # Create importer
    importer = MissingExcel