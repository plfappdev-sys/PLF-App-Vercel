import pandas as pd
import json
from datetime import datetime

def extract_member_data():
    # Path to the Excel file
    excel_file_path = r"C:\Projects\Test\September\V5\Resources\PLFDocs\Peoples Liberator Fund Contributions 2025 App.xlsx"
    
    # Sheet name containing the data
    sheet_name = "2024-2025"
    
    # Specific rows to extract with their corresponding names
    members_to_extract = {
        25: "Jeffrey Matlou",
        26: "Jonas Letlhaku", 
        56: "Nicholas Molale",
        55: "Naomi Mokhine",
        7: "Christopher Naude",
        67: "Refilwe Lentswe"
    }
    
    try:
        # Read the Excel file
        print(f"Reading Excel file: {excel_file_path}")
        df = pd.read_excel(excel_file_path, sheet_name=sheet_name)
        
        # Prepare the result structure
        result = {
            "extraction_info": {
                "source_file": "Peoples Liberator Fund Contributions 2025 App.xlsx",
                "sheet_name": sheet_name,
                "extraction_date": datetime.now().isoformat(),
                "total_members_requested": len(members_to_extract),
                "total_members_extracted": 0,
                "financial_year": "2024-2025"
            },
            "members": {}
        }
        
        # Extract data for each specified row
        for row_num, member_name in members_to_extract.items():
            # Adjust for 0-based indexing (Excel rows start at 1, pandas at 0)
            pandas_row_index = row_num - 2  # Excel row 1 = pandas index -1, so row 25 = index 23
            
            if pandas_row_index < len(df):
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
                
                # Add to results
                result["members"][member_name] = {
                    "row_number": row_num,
                    "data": member_data
                }
                result["extraction_info"]["total_members_extracted"] += 1
                print(f"✓ Extracted data for {member_name} (row {row_num})")
            else:
                print(f"✗ Row {row_num} not found in the Excel sheet")
        
        # Save to JSON file
        output_file = "selected_members_2024_2025.json"
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(result, f, indent=2, ensure_ascii=False)
        
        print(f"\n✅ Successfully extracted data for {result['extraction_info']['total_members_extracted']} members")
        print(f"📁 Output saved to: {output_file}")
        
        return result
        
    except Exception as e:
        print(f"❌ Error reading Excel file: {e}")
        return None

if __name__ == "__main__":
    extract_member_data()
