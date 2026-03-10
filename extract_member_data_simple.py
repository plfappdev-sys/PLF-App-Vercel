#!/usr/bin/env python3
"""
Simple Member Data Extractor for PLF Contributions Data
Focuses on extracting member names and numbers from key sheets.
"""

import pandas as pd
import numpy as np
import os
import json

def extract_members_from_sheet(file_path, sheet_name):
    """Extract member data from a specific sheet."""
    
    print(f"\nExtracting from sheet: {sheet_name}")
    
    members = {}
    
    # Try different header rows
    for header_row in range(0, 5):
        try:
            df = pd.read_excel(file_path, sheet_name=sheet_name, header=header_row)
            
            # Look for columns that might contain member data
            for col_idx, col_name in enumerate(df.columns):
                col_str = str(col_name).lower()
                
                # Check if this column contains member numbers
                if 'member' in col_str:
                    print(f"  Found member column at header row {header_row}, column {col_idx}: {col_name}")
                    
                    # Look for name column
                    name_col_idx = None
                    for name_col_idx_candidate, name_col_name in enumerate(df.columns):
                        name_col_str = str(name_col_name).lower()
                        if 'name' in name_col_str and name_col_idx_candidate != col_idx:
                            name_col_idx = name_col_idx_candidate
                            print(f"  Found name column at column {name_col_idx}: {name_col_name}")
                            break
                    
                    # Extract member data
                    for idx, row in df.iterrows():
                        try:
                            member_num = str(row.iloc[col_idx]).strip()
                            
                            # Skip empty or invalid values
                            if pd.isna(member_num) or member_num == 'nan' or member_num == '':
                                continue
                            
                            # Clean member number
                            member_num = ''.join(c for c in member_num if c.isalnum())
                            
                            # Get member name
                            member_name = ""
                            if name_col_idx is not None:
                                member_name = str(row.iloc[name_col_idx]).strip()
                                if pd.isna(member_name) or member_name == 'nan':
                                    member_name = ""
                            
                            # Add to members dictionary
                            if member_num and member_num not in members:
                                members[member_num] = {
                                    'name': member_name,
                                    'sheet': sheet_name,
                                    'row': idx
                                }
                                
                        except Exception as e:
                            continue
                    
                    print(f"  Extracted {len(members)} members from this sheet")
                    return members
                    
        except Exception as e:
            continue
    
    print(f"  No member data found in this sheet")
    return members

def extract_financial_data(file_path, sheet_name, member_numbers):
    """Extract financial data for specific members from a sheet."""
    
    print(f"\nExtracting financial data from: {sheet_name}")
    
    financial_data = {}
    
    # Try to read the sheet
    try:
        # Try different header rows
        for header_row in range(0, 10):
            try:
                df = pd.read_excel(file_path, sheet_name=sheet_name, header=header_row)
                
                # Look for member number column
                member_col_idx = None
                for col_idx, col_name in enumerate(df.columns):
                    col_str = str(col_name).lower()
                    if 'member' in col_str:
                        member_col_idx = col_idx
                        break
                
                if member_col_idx is None:
                    continue
                
                print(f"  Using header row {header_row}, member column {member_col_idx}")
                
                # Extract data for each member
                for idx, row in df.iterrows():
                    try:
                        member_num = str(row.iloc[member_col_idx]).strip()
                        if pd.isna(member_num) or member_num == 'nan' or member_num == '':
                            continue
                        
                        # Clean member number
                        member_num = ''.join(c for c in member_num if c.isalnum())
                        
                        # Check if this is a member we're interested in
                        if member_num in member_numbers:
                            if member_num not in financial_data:
                                financial_data[member_num] = {}
                            
                            # Extract all numeric columns
                            for col_idx, col_name in enumerate(df.columns):
                                if col_idx == member_col_idx:
                                    continue
                                
                                value = row.iloc[col_idx]
                                if pd.notna(value):
                                    try:
                                        # Try to convert to float
                                        numeric_value = float(value)
                                        financial_data[member_num][str(col_name)] = numeric_value
                                    except (ValueError, TypeError):
                                        # Store as string if not numeric
                                        financial_data[member_num][str(col_name)] = str(value)
                    
                    except Exception as e:
                        continue
                
                print(f"  Extracted financial data for {len(financial_data)} members")
                return financial_data
                
            except Exception as e:
                continue
    
    except Exception as e:
        print(f"  Error reading sheet: {e}")
    
    return financial_data

def main():
    """Main function to extract member data."""
    
    # Excel file path
    excel_file = "NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"
    
    if not os.path.exists(excel_file):
        print(f"Error: File not found: {excel_file}")
        return
    
    print("=" * 80)
    print("PLF MEMBER DATA EXTRACTION")
    print("=" * 80)
    
    # Get sheet names
    try:
        xl = pd.ExcelFile(excel_file)
        sheet_names = xl.sheet_names
        print(f"Total sheets: {len(sheet_names)}")
    except Exception as e:
        print(f"Error reading Excel file: {e}")
        return
    
    # Focus on key sheets likely to contain member data
    key_sheets = [
        'Recon',
        ' 2018-2019',
        '2019-2020 New',
        '2020-2021 New',
        '2021-2022 (A) New',
        '2021-2022 (B)',
        '2022-2023',
        '2023-2024',
        '2024-2025',
        'Dashboard',
        'Sheet4'  # This sheet had member data in the analysis
    ]
    
    # Extract members from key sheets
    all_members = {}
    
    for sheet_name in key_sheets:
        if sheet_name in sheet_names:
            members = extract_members_from_sheet(excel_file, sheet_name)
            # Merge members
            for member_num, member_info in members.items():
                if member_num not in all_members:
                    all_members[member_num] = member_info
                elif not all_members[member_num]['name'] and member_info['name']:
                    all_members[member_num]['name'] = member_info['name']
    
    print(f"\n{'='*80}")
    print(f"TOTAL MEMBERS FOUND: {len(all_members)}")
    print(f"{'='*80}")
    
    # Display members
    if all_members:
        print("\nMember List:")
        for i, (member_num, member_info) in enumerate(sorted(all_members.items()), 1):
            print(f"{i:3}. {member_num}: {member_info['name']} (from {member_info['sheet']})")
    
    # Save member data
    if all_members:
        output_file = "extracted_members_simple.json"
        with open(output_file, 'w') as f:
            json.dump(all_members, f, indent=2, default=str)
        print(f"\nMember data saved to: {output_file}")
    
    # Extract financial data for a sample of members
    if all_members:
        print(f"\n{'='*80}")
        print("EXTRACTING FINANCIAL DATA")
        print(f"{'='*80}")
        
        # Take first 5 members as sample
        sample_members = list(all_members.keys())[:5]
        print(f"Extracting financial data for sample members: {sample_members}")
        
        # Extract from financial year sheets
        financial_year_sheets = [
            ' 2018-2019',
            '2019-2020 New',
            '2020-2021 New',
            '2021-2022 (A) New',
            '2021-2022 (B)',
            '2022-2023',
            '2023-2024',
            '2024-2025'
        ]
        
        all_financial_data = {}
        
        for sheet_name in financial_year_sheets:
            if sheet_name in sheet_names:
                financial_data = extract_financial_data(excel_file, sheet_name, sample_members)
                
                # Merge financial data
                for member_num, data in financial_data.items():
                    if member_num not in all_financial_data:
                        all_financial_data[member_num] = {}
                    all_financial_data[member_num][sheet_name] = data
        
        # Save financial data
        if all_financial_data:
            output_file = "sample_financial_data.json"
            with open(output_file, 'w') as f:
                json.dump(all_financial_data, f, indent=2, default=str)
            print(f"\nSample financial data saved to: {output_file}")
            
            # Display summary
            print("\nFinancial Data Summary:")
            for member_num, sheet_data in all_financial_data.items():
                print(f"\n{member_num} ({all_members.get(member_num, {}).get('name', 'Unknown')}):")
                for sheet_name, data in sheet_data.items():
                    print(f"  {sheet_name}: {len(data)} data points")
                    # Show a few key values
                    for key, value in list(data.items())[:3]:
                        print(f"    {key}: {value}")
    
    print(f"\n{'='*80}")
    print("EXTRACTION COMPLETE")
    print(f"{'='*80}")

if __name__ == "__main__":
    main()