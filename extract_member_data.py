import pandas as pd
import json
import argparse
import sys
from datetime import datetime
from typing import Dict, List, Optional, Set

class MemberDataExtractor:
    def __init__(self):
        self.excel_file_path = "NewBusLogic/Peoples Liberator Fund Contributions 2025 AppUPDATED.xlsx"
        self.sheet_name = "2024-2025"
        
    def get_all_member_rows(self) -> Dict[int, str]:
        """Get all available member rows from the Excel sheet"""
        try:
            df = pd.read_excel(self.excel_file_path, sheet_name=self.sheet_name)
            
            # Look for rows that have member data (assuming Member column exists)
            member_rows = {}
            for idx, row in df.iterrows():
                if pd.notna(row.get('Member')) and str(row.get('Member')).startswith('Member'):
                    row_number = idx + 2  # Excel row numbers (1-based)
                    member_name = f"{row.get('Member')}"  # You might want to extract actual names
                    member_rows[row_number] = member_name
            
            return member_rows
            
        except Exception as e:
            print(f"❌ Error reading Excel file: {e}")
            return {}

    def extract_member_data(self, rows_to_extract: Optional[List[int]] = None, 
                          all_members: bool = False) -> Optional[Dict]:
        """Extract member data with flexible selection options"""
        
        try:
            # Read the Excel file
            print(f"📖 Reading Excel file: {self.excel_file_path}")
            df = pd.read_excel(self.excel_file_path, sheet_name=self.sheet_name)
            
            # Prepare the result structure
            result = {
                "extraction_info": {
                "source_file": "Peoples Liberator Fund Contributions 2025 AppUPDATED.xlsx",
                    "sheet_name": self.sheet_name,
                    "extraction_date": datetime.now().isoformat(),
                    "total_members_requested": 0,
                    "total_members_extracted": 0,
                    "financial_year": "2024-2025",
                    "selection_mode": "custom" if rows_to_extract else "all" if all_members else "interactive"
                },
                "members": {}
            }

            members_to_process = []
            
            if all_members:
                # Extract all members with member data
                all_member_rows = self.get_all_member_rows()
                members_to_process = list(all_member_rows.keys())
                result["extraction_info"]["total_members_requested"] = len(members_to_process)
                print(f"🔍 Found {len(members_to_process)} members in the Excel sheet")
                
            elif rows_to_extract:
                # Use specified rows
                members_to_process = rows_to_extract
                result["extraction_info"]["total_members_requested"] = len(rows_to_extract)
                
            else:
                # Interactive selection
                all_member_rows = self.get_all_member_rows()
                if not all_member_rows:
                    print("❌ No member data found in the Excel sheet")
                    return None
                
                print("\n📋 Available members:")
                for row_num, member_name in all_member_rows.items():
                    print(f"  Row {row_num}: {member_name}")
                
                print("\n💡 Selection options:")
                print("  - Enter specific row numbers (e.g., 25,26,56)")
                print("  - Enter a range (e.g., 25-30)")
                print("  - Enter 'all' to extract all members")
                print("  - Enter 'quit' to exit")
                
                while True:
                    selection = input("\n🎯 Enter your selection: ").strip()
                    
                    if selection.lower() == 'quit':
                        return None
                    elif selection.lower() == 'all':
                        members_to_process = list(all_member_rows.keys())
                        break
                    elif '-' in selection:
                        # Range selection
                        try:
                            start, end = map(int, selection.split('-'))
                            members_to_process = [row for row in all_member_rows.keys() if start <= row <= end]
                            if not members_to_process:
                                print("❌ No members found in that range")
                                continue
                            break
                        except ValueError:
                            print("❌ Invalid range format. Use format like '25-30'")
                    else:
                        # Specific row numbers
                        try:
                            selected_rows = [int(row.strip()) for row in selection.split(',')]
                            valid_rows = [row for row in selected_rows if row in all_member_rows]
                            if not valid_rows:
                                print("❌ No valid row numbers selected")
                                continue
                            members_to_process = valid_rows
                            break
                        except ValueError:
                            print("❌ Invalid input. Please enter numbers separated by commas")

                result["extraction_info"]["total_members_requested"] = len(members_to_process)

            # Extract data for each specified row
            for row_num in members_to_process:
                # Adjust for 0-based indexing (Excel rows start at 1, pandas at 0)
                pandas_row_index = row_num - 2
                
                if pandas_row_index < len(df) and pandas_row_index >= 0:
                    row_data = df.iloc[pandas_row_index]
                    
                    # Convert the row to a dictionary and clean the data
                    member_data = {}
                    for column in df.columns:
                        value = row_data[column]
                        
                        # Handle NaN values and convert to appropriate types
                        if pd.isna(value):
                            member_data[str(column)] = None
                        elif isinstance(value, (int, float)):
                            member_data[str(column)] = float(value)
                        elif isinstance(value, (pd.Timestamp, datetime)):
                            member_data[str(column)] = value.isoformat()
                        else:
                            member_data[str(column)] = str(value)
                    
                    # Try to get member name from data
                    member_name = f"Row_{row_num}"
                    if 'Member' in member_data and member_data['Member']:
                        member_name = member_data['Member']
                    
                    # Add to results
                    result["members"][member_name] = {
                        "row_number": row_num,
                        "data": member_data
                    }
                    result["extraction_info"]["total_members_extracted"] += 1
                    print(f"✅ Extracted data for {member_name} (row {row_num})")
                else:
                    print(f"❌ Row {row_num} not found in the Excel sheet")

            # Save to JSON file
            output_file = "selected_members_2024_2025.json"
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(result, f, indent=2, ensure_ascii=False)
            
            print(f"\n🎉 Successfully extracted data for {result['extraction_info']['total_members_extracted']} members")
            print(f"💾 Output saved to: {output_file}")
            
            return result
            
        except Exception as e:
            print(f"❌ Error processing Excel file: {e}")
            return None

    def run_interactive(self):
        """Run the extractor in interactive mode"""
        print("=" * 60)
        print("🧮 PLF Member Data Extractor")
        print("=" * 60)
        
        parser = argparse.ArgumentParser(description='Extract member data from Excel')
        parser.add_argument('--rows', type=str, help='Comma-separated row numbers to extract')
        parser.add_argument('--range', type=str, help='Range of rows to extract (e.g., 25-30)')
        parser.add_argument('--all', action='store_true', help='Extract all members')
        parser.add_argument('--output', type=str, help='Output filename')
        
        # Parse command line arguments
        args = parser.parse_args()
        
        rows_to_extract = None
        
        if args.rows:
            try:
                rows_to_extract = [int(row.strip()) for row in args.rows.split(',')]
                print(f"📋 Extracting specific rows: {rows_to_extract}")
                result = self.extract_member_data(rows_to_extract=rows_to_extract)
            except ValueError:
                print("❌ Invalid row numbers provided")
                return
                
        elif args.range:
            try:
                start, end = map(int, args.range.split('-'))
                rows_to_extract = list(range(start, end + 1))
                print(f"📋 Extracting range: {start}-{end}")
                result = self.extract_member_data(rows_to_extract=rows_to_extract)
            except ValueError:
                print("❌ Invalid range format")
                return
                
        elif args.all:
            print("📋 Extracting all members")
            result = self.extract_member_data(all_members=True)
            
        else:
            # Interactive mode
            result = self.extract_member_data()
            
        if args.output and result:
            # Save to custom output file
            with open(args.output, 'w', encoding='utf-8') as f:
                json.dump(result, f, indent=2, ensure_ascii=False)
            print(f"💾 Additional copy saved to: {args.output}")

def main():
    extractor = MemberDataExtractor()
    extractor.run_interactive()

if __name__ == "__main__":
    main()
