# Member Data Extraction Guide

## Enhanced Member Data Extraction Tool

This guide covers the enhanced `extract_member_data.py` script that allows selective extraction of member data from the Excel spreadsheet.

## Features

### 1. Multiple Extraction Modes
- **Interactive Mode**: Run without arguments for interactive selection
- **Specific Rows**: Extract specific row numbers using `--rows`
- **Range Extraction**: Extract a range of rows using `--range`
- **All Members**: Extract all available members using `--all`

### 2. Flexible Output
- Default output: `selected_members_2024_2025.json`
- Custom output filename support with `--output`
- Comprehensive extraction metadata included

### 3. Error Handling
- Robust error handling for invalid inputs
- Validation of row numbers against available data
- Graceful failure with informative error messages

## Usage Examples

### Interactive Mode (Recommended for beginners)
```bash
python extract_member_data.py
```

### Extract Specific Rows
```bash
# Extract rows 7, 25, 26, 55, 56, 67
python extract_member_data.py --rows 7,25,26,55,56,67

# Extract with custom output file
python extract_member_data.py --rows 7,25,26 --output my_members.json
```

### Extract Range of Rows
```bash
# Extract rows 25-30
python extract_member_data.py --range 25-30

# Extract rows 50-60 with custom output
python extract_member_data.py --range 50-60 --output range_members.json
```

### Extract All Members
```bash
# Extract all available members
python extract_member_data.py --all

# Extract all with custom output
python extract_member_data.py --all --output all_members.json
```

## Interactive Mode Options

When running in interactive mode, you can choose from:

1. **Specific row numbers**: Enter comma-separated numbers (e.g., `25,26,56`)
2. **Range selection**: Enter a range (e.g., `25-30`)
3. **All members**: Enter `all` to extract everything
4. **Exit**: Enter `quit` to exit

## Output Format

The extracted data is saved in JSON format with the following structure:

```json
{
  "extraction_info": {
    "source_file": "Peoples Liberator Fund Contributions 2025 App.xlsx",
    "sheet_name": "2024-2025",
    "extraction_date": "2025-09-18T02:00:00.000000",
    "total_members_requested": 6,
    "total_members_extracted": 6,
    "financial_year": "2024-2025",
    "selection_mode": "custom"
  },
  "members": {
    "Member 24": {
      "row_number": 25,
      "data": {
        "Member": "Member 24",
        "Date Join": "27/08/2018",
        "Expected Contribution (Current Year)": 2400.0,
        // ... all Excel columns with data
      }
    }
    // ... more members
  }
}
```

## Data Source

**Excel File**: `C:\Projects\Test\September\V5\Resources\PLFDocs\Peoples Liberator Fund Contributions 2025 App.xlsx`

**Sheet**: `2024-2025`

## Error Handling

The script handles various error scenarios:

- **File not found**: Checks if Excel file exists
- **Invalid row numbers**: Validates that requested rows contain member data
- **Data conversion**: Handles NaN values and type conversions properly
- **Network issues**: Graceful handling of file access problems

## Integration with Signup Process

The extracted member data can be used to:
1. Pre-fill existing member information during signup
2. Validate member numbers against imported data
3. Link new user accounts with existing member records
4. Preserve financial history and standing

## Next Steps

1. **Database Import**: Use the JSON output to populate Supabase database
2. **Signup Integration**: Modify signup screen to validate against imported data
3. **Batch Processing**: Schedule regular data extraction and updates
4. **Data Transformation**: Map Excel columns to application schema

## Troubleshooting

### Common Issues

1. **Excel file not found**: Ensure the file exists at the specified path
2. **Permission denied**: Check file permissions and antivirus settings
3. **Invalid row numbers**: Use interactive mode to see available rows first
4. **Memory issues**: For large extractions, use specific rows instead of all

### Getting Help

Check the `ErrorTroubleshootingSteps.txt` file for specific error codes and solutions related to data extraction.

## Version History

- **v1.0** (2025-09-16): Initial extraction script with hardcoded rows
- **v2.0** (2025-09-18): Enhanced with interactive selection, range support, and error handling

## Future Enhancements

- [ ] GUI interface for member selection
- [ ] Real-time data validation during extraction
- [ ] Support for multiple Excel sheets
- [ ] Automated database synchronization
- [ ] Email notifications for extraction completion
