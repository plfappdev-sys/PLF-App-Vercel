#!/usr/bin/env python3
"""
Complete Excel Structure Analyzer for PLF Contributions Data
Analyzes all sheets in the Excel file to understand data structure and extract member information.
"""

import pandas as pd
import numpy as np
import os
from datetime import datetime
import json

def analyze_excel_file(file_path):
    """Analyze the Excel file structure and extract key information."""
    
    print(f"Analyzing Excel file: {file_path}")
    print("=" * 80)
    
    # Check if file exists
    if not os.path.exists(file_path):
        print(f"Error: File not found: {file_path}")
        return None
    
    # Get sheet names
    try:
        xl = pd.ExcelFile(file_path)
        sheet_names = xl.sheet_names
        print(f"Total sheets: {len(sheet_names)}")
        print(f"Sheet names: {sheet_names}")
        print()
    except Exception as e:
        print(f"Error reading Excel file: {e}")
        return None
    
    # Analyze each sheet
    sheet_data = {}
    all_members = {}
    financial_years = []
    
    for sheet_name in sheet_names:
        print(f"\n{'='*60}")
        print(f"Analyzing sheet: {sheet_name}")
        print(f"{'='*60}")
        
        try:
            # Read the sheet
            df = pd.read_excel(file_path, sheet_name=sheet_name, header=None)
            
            # Store basic info
            sheet_info = {
                'name': sheet_name,
                'rows': df.shape[0],
                'columns': df.shape[1],
                'data': df
            }
            
            # Try to find header row (look for column names)
            header_row = None
            for i in range(min(10, df.shape[0])):
                row_values = df.iloc[i].astype(str).tolist()
                # Check if this row contains common column headers
                if any('member' in str(val).lower() for val in row_values) or \
                   any('name' in str(val).lower() for val in row_values) or \
                   any('total' in str(val).lower() for val in row_values):
                    header_row = i
                    break
            
            if header_row is not None:
                print(f"  Header row found at row {header_row}")
                # Read with header
                df_with_header = pd.read_excel(file_path, sheet_name=sheet_name, header=header_row)
                sheet_info['header_row'] = header_row
                sheet_info['df_with_header'] = df_with_header
                
                # Print column names
                print(f"  Columns ({len(df_with_header.columns)}):")
                for idx, col in enumerate(df_with_header.columns):
                    print(f"    {idx}: {col}")
                
                # Try to identify member data
                identify_member_data(df_with_header, sheet_name, all_members)
                
                # Check if this is a financial year sheet
                if any(year_str in sheet_name.lower() for year_str in ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']):
                    financial_years.append(sheet_name)
                    analyze_financial_year_sheet(df_with_header, sheet_name)
            else:
                print(f"  No clear header row found")
                # Print first few rows to understand structure
                print(f"  First 5 rows:")
                for i in range(min(5, df.shape[0])):
                    print(f"    Row {i}: {df.iloc[i].tolist()[:10]}...")
            
            sheet_data[sheet_name] = sheet_info
            
        except Exception as e:
            print(f"  Error analyzing sheet {sheet_name}: {e}")
            sheet_data[sheet_name] = {'name': sheet_name, 'error': str(e)}
    
    # Summary
    print(f"\n{'='*80}")
    print("SUMMARY")
    print(f"{'='*80}")
    print(f"Total sheets analyzed: {len(sheet_data)}")
    print(f"Financial year sheets: {financial_years}")
    print(f"Total unique members found: {len(all_members)}")
    
    # Print member list
    if all_members:
        print(f"\nMember list ({len(all_members)} members):")
        for member_num, member_info in sorted(all_members.items()):
            print(f"  {member_num}: {member_info.get('name', 'Unknown')}")
    
    # Save member data to JSON for reference
    if all_members:
        output_file = "extracted_members_complete.json"
        with open(output_file, 'w') as f:
            json.dump(all_members, f, indent=2, default=str)
        print(f"\nMember data saved to: {output_file}")
    
    return {
        'sheet_data': sheet_data,
        'all_members': all_members,
        'financial_years': financial_years
    }

def identify_member_data(df, sheet_name, all_members):
    """Identify member data in a dataframe."""
    
    # Look for member number and name columns
    member_num_col = None
    name_col = None
    
    for idx, col in enumerate(df.columns):
        col_str = str(col).lower()
        if 'member' in col_str and ('no' in col_str or 'num' in col_str or '#' in col_str):
            member_num_col = idx
        elif 'name' in col_str:
            name_col = idx
    
    if member_num_col is not None and name_col is not None:
        print(f"  Found member data: Member# col={member_num_col}, Name col={name_col}")
        
        # Extract member data
        for idx, row in df.iterrows():
            try:
                member_num = str(row.iloc[member_num_col]).strip()
                member_name = str(row.iloc[name_col]).strip()
                
                # Skip empty rows
                if pd.isna(member_num) or member_num == 'nan' or member_num == '':
                    continue
                if pd.isna(member_name) or member_name == 'nan' or member_name == '':
                    continue
                
                # Clean member number (remove any non-alphanumeric)
                member_num = ''.join(c for c in member_num if c.isalnum())
                
                # Add to all_members dictionary
                if member_num not in all_members:
                    all_members[member_num] = {
                        'name': member_name,
                        'sheets_found': [sheet_name]
                    }
                elif sheet_name not in all_members[member_num]['sheets_found']:
                    all_members[member_num]['sheets_found'].append(sheet_name)
                    
            except Exception as e:
                # Skip rows with errors
                continue
        
        print(f"  Extracted {len([m for m in all_members.values() if sheet_name in m['sheets_found']])} members from this sheet")
    
    # Also look for total contributions column (Column G)
    for idx, col in enumerate(df.columns):
        col_str = str(col).lower()
        if 'total' in col_str and ('contribut' in col_str or 'amount' in col_str):
            print(f"  Found total contributions column at index {idx}: {col}")
            # Sample some values
            non_null_values = df.iloc[:, idx].dropna()
            if len(non_null_values) > 0:
                print(f"    Sample values: {non_null_values.iloc[:5].tolist()}")

def analyze_financial_year_sheet(df, sheet_name):
    """Analyze a financial year sheet for contribution data."""
    
    print(f"  Analyzing financial year sheet: {sheet_name}")
    
    # Look for month columns
    month_columns = []
    for idx, col in enumerate(df.columns):
        col_str = str(col).lower()
        # Common month names and abbreviations
        months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec',
                  'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 
                  'september', 'october', 'november', 'december']
        
        if any(month in col_str for month in months):
            month_columns.append((idx, col))
    
    if month_columns:
        print(f"  Found {len(month_columns)} month columns:")
        for idx, col in month_columns:
            print(f"    {idx}: {col}")
        
        # Check for numeric data in month columns
        for idx, col_name in month_columns[:3]:  # Check first 3 months
            col_data = df.iloc[:, idx]
            numeric_values = pd.to_numeric(col_data, errors='coerce')
            non_null_numeric = numeric_values.dropna()
            if len(non_null_numeric) > 0:
                print(f"    {col_name}: {len(non_null_numeric)} numeric values, sample: {non_null_numeric.iloc[:3].tolist()}")
    
    # Look for total column
    for idx, col in enumerate(df.columns):
        col_str = str(col).lower()
        if 'total' in col_str:
            print(f"  Found total column at index {idx}: {col}")
            # Check if it contains numeric data
            col_data = df.iloc[:, idx]
            numeric_values = pd.to_numeric(col_data, errors='coerce')
            non_null_numeric = numeric_values.dropna()
            if len(non_null_numeric) > 0:
                print(f"    Contains {len(non_null_numeric)} numeric values")
                print(f"    Sum: {non_null_numeric.sum():,.2f}")
                print(f"    Average: {non_null_numeric.mean():,.2f}")
                print(f"    Min: {non_null_numeric.min():,.2f}, Max: {non_null_numeric.max():,.2f}")
            break

def extract_member_financial_data(file_path, sheet_names=None):
    """Extract detailed financial data for all members."""
    
    print(f"\n{'='*80}")
    print("EXTRACTING DETAILED FINANCIAL DATA")
    print(f"{'='*80}")
    
    if sheet_names is None:
        xl = pd.ExcelFile(file_path)
        sheet_names = xl.sheet_names
    
    member_financial_data = {}
    
    for sheet_name in sheet_names:
        print(f"\nProcessing sheet: {sheet_name}")
        
        try:
            # Try to read with different header rows
            for header_row in range(5):
                try:
                    df = pd.read_excel(file_path, sheet_name=sheet_name, header=header_row)
                    
                    # Look for member number and name columns
                    member_num_col = None
                    name_col = None
                    
                    for idx, col in enumerate(df.columns):
                        col_str = str(col).lower()
                        if 'member' in col_str and ('no' in col_str or 'num' in col_str or '#' in col_str):
                            member_num_col = idx
                        elif 'name' in col_str:
                            name_col = idx
                    
                    if member_num_col is not None and name_col is not None:
                        print(f"  Found member data at header row {header_row}")
                        
                        # Extract financial data
                        for idx, row in df.iterrows():
                            try:
                                member_num = str(row.iloc[member_num_col]).strip()
                                member_name = str(row.iloc[name_col]).strip()
                                
                                # Skip empty rows
                                if pd.isna(member_num) or member_num == 'nan' or member_num == '':
                                    continue
                                if pd.isna(member_name) or member_name == 'nan' or member_name == '':
                                    continue
                                
                                # Clean member number
                                member_num = ''.join(c for c in member_num if c.isalnum())
                                
                                # Initialize member data if not exists
                                if member_num not in member_financial_data:
                                    member_financial_data[member_num] = {
                                        'name': member_name,
                                        'sheets': {}
                                    }
                                
                                # Store sheet data
                                if sheet_name not in member_financial_data[member_num]['sheets']:
                                    member_financial_data[member_num]['sheets'][sheet_name] = {}
                                
                                # Extract all numeric columns as financial data
                                for col_idx, col_name in enumerate(df.columns):
                                    if col_idx == member_num_col or col_idx == name_col:
                                        continue
                                    
                                    value = row.iloc[col_idx]
                                    if pd.notna(value):
                                        try:
                                            # Try to convert to float
                                            numeric_value = float(value)
                                            member_financial_data[member_num]['sheets'][sheet_name][str(col_name)] = numeric_value
                                        except (ValueError, TypeError):
                                            # Store as string if not numeric
                                            member_financial_data[member_num]['sheets'][sheet_name][str(col_name)] = str(value)
                                
                            except Exception as e:
                                continue
                        
                        break  # Found correct header row, break loop
                    
                except Exception as e:
                    continue  # Try next header row
            
        except Exception as e:
            print(f"  Error processing sheet {sheet_name}: {e}")
    
    print(f"\nExtracted financial data for {len(member_financial_data)} members")
    
    # Save to JSON
    output_file = "member_financial_data_complete.json"
    with open(output_file, 'w') as f:
        # Convert to serializable format
        serializable_data = {}
        for member_num, data in member_financial_data.items():
            serializable_data[member_num] = data
    
    json.dump(serializable_data, f, indent=2, default=str)
    print(f"Financial data saved to: {output_file}")
    
    return member_financial_data

def main():
    """Main function to analyze Excel file."""
    
    # Excel file path
    excel_file = "NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"
    
    # Analyze file structure
    analysis_result = analyze_excel_file(excel_file)
    
    if analysis_result:
        # Extract detailed financial data
        financial_years = analysis_result.get('financial_years', [])
        if financial_years:
            print(f"\nExtracting detailed data from financial year sheets...")
            extract_member_financial_data(excel_file, financial_years)
        else:
            # Try to extract from all sheets
            print(f"\nExtracting detailed data from all sheets...")
            extract_member_financial_data(excel_file)
    
    print(f"\n{'='*80}")
    print("ANALYSIS COMPLETE")
    print(f"{'='*80}")

if __name__ == "__main__":
    main()