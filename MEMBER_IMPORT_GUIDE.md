# Member Data Import Guide

This guide explains how to import member data from Excel files into the PLF App Supabase database.

## Overview

The system allows you to:
1. Extract member data from Excel files
2. Transform the data to match the app's database schema
3. Import selected members into Supabase
4. Validate member numbers during user signup
5. Link existing members to user accounts

## Prerequisites

1. **Python 3.8+** installed on your system
2. **Supabase service role key** (get from Supabase Dashboard > Settings > API)
3. **Excel file** with member data (see format requirements below)

## File Structure

```
/
├── extract_member_data.py          # Excel to JSON extraction
├── test_member_transformation.py   # Test data transformation
├── import_members_to_supabase.py   # Database import script
├── supabase_service_config.py      # Service key configuration
├── selected_members_2024_2025.json # Extracted member data
└── transformed_members_sample.json # Sample transformed data
```

## Step 1: Configure Supabase Service Key

1. Open `supabase_service_config.py`
2. Replace `"your-service-role-key-here"` with your actual Supabase service role key
3. Get the service role key from: Supabase Dashboard > Settings > API > service_role

```python
SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## Step 2: Prepare Members Table

**Before importing data, you need to ensure the members table has the correct structure:**

### Option A: Create New Table (Recommended)
1. Go to Supabase Dashboard > SQL Editor
2. Copy the contents of `members_table_simple.sql`
3. Paste and execute all the SQL commands
4. Verify the table was created successfully

### Option B: Alter Existing Table (If table exists but has wrong structure)
1. Go to Supabase Dashboard > SQL Editor  
2. Copy the contents of `alter_members_table.sql`
3. Paste and execute all the SQL commands
4. This will add missing columns without dropping existing data

### Option C: Use Helper Scripts
```bash
# Check table status and get instructions
python check_and_fix_members_table.py

# Or use the table creation helper
python create_members_table.py
```

## Step 2: Extract Data from Excel (Optional)

If you need to extract data from a new Excel file:

```bash
python extract_member_data.py --file "path/to/your/excel/file.xlsx"
```

This will create a JSON file with the extracted member data.

## Step 3: Test Data Transformation

Before importing to the database, test the transformation:

```bash
python test_member_transformation.py
```

This will:
- Load the JSON data
- Transform it to match the database schema
- Show sample transformed data
- Save a sample to `transformed_members_sample.json`

## Step 4: Import to Supabase

Once you've verified the transformation:

```bash
python import_members_to_supabase.py
```

The script will:
1. Load and transform the data
2. Ask for confirmation before proceeding
3. Import members to Supabase
4. Show success/error counts

## Member Data Schema

The import script transforms Excel data to this structure:

```typescript
interface Member {
  memberNumber: string;           // Unique member number
  personalInfo: {
    firstName: string;
    lastName: string;
    fullName: string;
  };
  financialInfo: {
    totalContributions: number;
    currentBalance: number;
    outstandingAmount: number;
    percentageOutstanding: number;
    balanceBroughtForward: number;
    plannedContributions: number;
    actualContributions: number;
    currentInterestEarned: number;
    totalInterestEarned: number;
    currentInterestCharged: number;
    totalInterestCharged: number;
    lastInterestCalculation: Date;
    interestRate: number;
  };
  membershipStatus: {
    isActive: boolean;
    standingCategory: string; // 'good', 'owing_10', etc.
  };
  interestSettings: {
    calculationMethod: string;
    compounding: boolean;
    taxDeduction: number;
  };
}
```

## Standing Categories

Members are categorized based on outstanding amount percentage:

| Percentage | Category       | Description               |
|------------|----------------|---------------------------|
| 0%         | good           | No outstanding amount     |
| 1-10%      | owing_10       | Minimal outstanding       |
| 11-20%     | owing_20       | Small outstanding         |
| 21-30%     | owing_30       | Moderate outstanding      |
| 31-50%     | owing_50       | Significant outstanding   |
| 51-65%     | owing_65       | High outstanding          |
| 66%+       | owing_65_plus  | Very high outstanding     |

## Signup Integration

The app includes member validation during signup:

1. **MemberNumberValidation Component**: Validates member numbers in real-time
2. **Auto-linking**: Links validated members to user accounts
3. **Duplicate prevention**: Prevents multiple accounts per member number

### Usage in Signup Screen

```typescript
import { MemberNumberValidation } from '../components/MemberNumberValidation';

// In your signup component
<MemberNumberValidation
  onMemberValidated={(memberData) => {
    // Pre-fill form with member data
    setFormData(prev => ({
      ...prev,
      firstName: memberData.personalInfo?.firstName,
      lastName: memberData.personalInfo?.lastName,
      memberNumber: memberData.memberNumber
    }));
  }}
  onMemberNotFound={() => {
    // Handle case where member number doesn't exist
    Alert.alert('Member not found', 'Please check your member number');
  }}
/>
```

## Error Handling

Common errors and solutions:

### 1. Service Role Key Error
**Error**: "Invalid Supabase service role key"
**Solution**: Update `supabase_service_config.py` with correct service key

### 2. Database Permission Error
**Error**: "permission denied for table members"
**Solution**: Ensure RLS allows service role access or temporarily disable RLS

### 3. Member Number Format Error
**Error**: "Skipping invalid member number"
**Solution**: Check Excel file for properly formatted member numbers

### 4. Connection Error
**Error**: "Failed to initialize Supabase client"
**Solution**: Check internet connection and Supabase URL

## Testing

### Test Transformation Only
```bash
python test_member_transformation.py
```

### Test with Anonymous Key (No DB writes)
```bash
python import_members_to_supabase.py --test
```

### Test Specific File
```bash
python import_members_to_supabase.py --file "custom_members.json"
```

## Security Considerations

1. **Service Role Key**: Keep this secure - it has full database access
2. **RLS**: Consider Row Level Security for production
3. **Validation**: Always validate member numbers before linking
4. **Audit**: Keep logs of all imports and links

## Troubleshooting

Check `ErrorTroubleshootingSteps.txt` for common issues and solutions.

## Support

If you encounter issues:
1. Check the transformation test output
2. Verify Supabase service key permissions
3. Ensure the members table exists with correct schema
4. Check network connectivity to Supabase

## Next Steps

After successful import:
1. Test member validation in the signup screen
2. Verify member data appears in the app
3. Test financial calculations with imported data
4. Set up automated interest calculations
