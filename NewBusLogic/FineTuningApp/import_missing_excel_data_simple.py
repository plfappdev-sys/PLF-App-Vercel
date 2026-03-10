#!/usr/bin/env python3
"""
PLF Missing Excel Data Import Script - SIMPLE VERSION
=====================================================
This script extracts missing financial data from the Excel spreadsheet
and imports it into the Supabase database.

SIMPLE: Only updates columns that should already exist in the database
Based on IMPLEMENTATION_GUIDE.md, we added 8 columns:
1. expected_contribution
2. outstanding_contributions  
3. total_penalties
4. balance_brought_forward
5. total_bank_charges
6. share_value
7. capped_penalties
8. estimated_annual_contribution

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

class SimpleExcelDataImporter:
    def __init__(self):
        # Excel file configuration
        self.excel_file_path = "NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"
        self.target_sheet = "2024-2025"
        
        # Supabase configuration
        self.supabase_url = os.getenv("SUPABASE_URL")
        self.supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
        
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
        
        # SIMPLE COLUMN MAPPING: Only the 8 columns we added
        self.column_mapping = {
            # The 8 columns we added according to IMPLEMENTATION_GUIDE.md
            "Expected Contribution (Current Year)": "expected_contribution",
            "Total outstanding contribution for 12 Months": "outstanding_contributions",
            "Penalty July 2024- June 2025": "total_penalties",
            "Balance Brought Forward": "balance_brought_forward",
            "Total Bank Charges @ 1,1%": "total_bank_charges",
            "Share Value": "share_value",
            "Capped Penalties Current Financial Year": "capped_penalties",
            "Estimated 12 Months Contribution (Jul 2024-June 2025)": "estimated_annual_contribution",
            
            # For matching only
            "Member": "name"
        }
    
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
            for i, col in enumerate(df.columns[:15]):  # Show first 15 columns
                print(f"  {i+1}. {col}")
            
            if len(df.columns) > 15:
                print(f"  ... and {len(df.columns) - 15} more columns")
            
            # Find actual column names for our target data
            actual_column_names = {}
            for excel_col, db_col in self.column_mapping.items():
                if excel_col in df.columns:
                    actual_column_names[db_col] = excel_col
                    print(f"✅ Found '{excel_col}' -> maps to '{db_col}'")
                else:
                    # Try to find similar column names
                    found = False
                    for col in df.columns:
                        if excel_col.lower() in str(col).lower():
                            actual_column_names[db_col] = col
                            print(f"✅ Found similar '{col}' -> maps to '{db_col}'")
                            found = True
                            break
                    if not found:
                        print(f"⚠️  WARNING: Column '{excel_col}' not found in Excel")
                        actual_column_names[db_col] = None
            
            # Extract member data
            member_data = []
            member_name_col = actual_column_names.get("name")
            
            if not member_name_col:
                print("❌ ERROR: Could not find Member column in Excel")
                return {"members": [], "summary": {}}
            
            print(f"\n🔍 Extracting data using member column: '{member_name_col}'")
            
            for idx, row in df.iterrows():
                try:
                    member_name = str(row[member_name_col]).strip()
                    
                    # Skip rows without member names
                    if pd.isna(member_name) or member_name == "nan" or not member_name:
                        continue
                    
                    # Clean member name (remove extra spaces)
                    member_name = ' '.join(member_name.split())
                    
                    member_record = {
                        "excel_row": idx + 2,
                        "member_name": member_name,
                        "data": {}
                    }
                    
                    # Extract only the 8 target columns
                    for db_col, excel_col in actual_column_names.items():
                        if excel_col and db_col != "name":
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
                                        # Try to convert string to float
                                        try:
                                            member_record["data"][db_col] = float(str(value).replace(',', '').strip())
                                        except:
                                            member_record["data"][db_col] = str(value).strip()
                            except KeyError:
                                member_record["data"][db_col] = None
                    
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
    
    def get_member_id_from_name(self, member_name: str) -> Optional[str]:
        """Get member UUID from member name."""
        try:
            # First try exact match
            response = self.supabase_client.table("members")\
                .select("id, member_number, name")\
                .eq("name", member_name)\
                .execute()
            
            if response.data and len(response.data) > 0:
                print(f"  Found member (exact): {member_name} -> {response.data[0]['member_number']}")
                return response.data[0]["id"]
            
            # Try case-insensitive match
            response = self.supabase_client.table("members")\
                .select("id, member_number, name")\
                .ilike("name", f"%{member_name}%")\
                .execute()
            
            if response.data and len(response.data) > 0:
                print(f"  Found member (similar): {member_name} -> {response.data[0]['member_number']}")
                return response.data[0]["id"]
            
            print(f"  Member not found: {member_name}")
            return None
        except Exception as e:
            print(f"❌ Error fetching member {member_name}: {e}")
            return None
    
    def update_member_data(self, member_data: Dict) -> Dict:
        """Update a single member's data in the database."""
        member_name = member_data["member_name"]
        data = member_data["data"]
        
        # Get member ID
        member_id = self.get_member_id_from_name(member_name)
        
        if not member_id:
            print(f"⚠️  Member {member_name} not found in database, skipping...")
            return {"member_name": member_name, "status": "skipped", "reason": "not_found"}
        
        # Prepare update data (only non-null values)
        update_data = {}
        for key, value in data.items():
            if value is not None:
                update_data[key] = value
        
        if not update_data:
            return {"member_name": member_name, "status": "skipped", "reason": "no_data"}
        
        try:
            # Update member record - only the 8 columns we know exist
            response = self.supabase_client.table("members")\
                .update(update_data)\
                .eq("id", member_id)\
                .execute()
            
            if response.data:
                print(f"✅ Updated member {member_name} with {len(update_data)} fields: {list(update_data.keys())}")
                return {"member_name": member_name, "status": "updated", "fields": list(update_data.keys())}
            else:
                print(f"⚠️  No data returned for member {member_name}")
                return {"member_name": member_name, "status": "failed", "reason": "no_response"}
                
        except Exception as e:
            print(f"❌ Error updating member {member_name}: {e}")
            return {"member_name": member_name, "status": "failed", "reason": str(e)}
    
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
            print(f"  Processing {i+1}/{len(members)}: {member_data['member_name']}...")
            
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
    
    def save_extracted_data(self, extracted_data: Dict, filename: str = "extracted_simple_data.json"):
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
        print("🧮 PLF Missing Excel Data Importer - SIMPLE VERSION")
        print("=" * 60)
        print("⚠️  IMPORTANT: Only updates the 8 columns we added")
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
            print(f"  Member: {sample['member_name']}")
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
        results_file = "import_results_simple.json"
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
    
    parser = argparse.ArgumentParser(description='Import missing Excel data to PLF database (Simple Version)')
    parser.add_argument('--dry-run', action='store_true', help='Extract data but do not import')
    parser.add_argument('--import', dest='do_import', action='store_true', help='Actually import data to database')
    
    args = parser.parse_args()
    
    # Create importer
    importer = SimpleExcelDataImporter()
    
    # Run import
    importer.run(dry_run=args.dry_run and not args.do_import)

if __name__ == "__main__":
    main()