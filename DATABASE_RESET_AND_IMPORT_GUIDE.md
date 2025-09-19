# Database Reset and Member Import Guide

## Overview
This guide provides step-by-step instructions for completely resetting the PLF application database (removing all member data) and performing a fresh import from the JSON file.

## Prerequisites
- Access to Supabase SQL Editor: https://zdnyhzasvifrskbostgn.supabase.co/project/default/sql
- Service role key configured in `supabase_service_config.py`
- Python environment with `supabase` package installed

## Step 1: Database Cleanup

### Execute the Cleanup SQL Script
1. Open the Supabase SQL Editor: https://zdnyhzasvifrskbostgn.supabase.co/project/default/sql
2. Copy the entire contents of `delete_all_data_except_superusers.sql`
3. Paste into the SQL Editor and click "Run"
4. Review the output to ensure:
   - All member, transaction, loan, and interest data is deleted
   - Only superuser accounts remain in the users table
   - RLS is properly re-enabled after cleanup

### Expected Output
The script will show:
- Counts of records before deletion
- Success messages for each deletion step
- Verification that only superuser accounts remain
- Counts of records after deletion (should be 0 for all tables except users)

## Step 2: Test Import with Single Member

### Run the Test Import Script
```bash
# Test with the first available member
python test_single_member_import.py

# Or test with a specific member (e.g., member 6)
python test_single_member_import.py --member 6
```

### Verify the Test Import
1. The script will show which member is being imported
2. Confirm the import when prompted
3. Check for success message
4. Verify in the application that the test member appears correctly

## Step 3: Full Member Import

### Run the Full Import Script
```bash
python import_members_to_supabase.py
```

### Verify the Full Import
1. The script will show progress for each member
2. Check for success count (should be 6)
3. Verify all members appear correctly in the application
4. Test member validation during signup

## Available Members for Import

The JSON file contains 6 members ready for import:
- **Member 6**: Christopher Naude
- **Member 24**: Jeffrey Matlou  
- **Member 25**: Mpho Mahlangu
- **Member 54**: (Name from Excel data)
- **Member 55**: (Name from Excel data)
- **Member 66**: (Name from Excel data)

## Troubleshooting

### Common Issues

1. **RLS Policy Errors**: 
   - Ensure RLS is temporarily disabled during operations
   - Use service role key for admin operations

2. **Import Failures**:
   - Check that the members table exists with proper schema
   - Verify JSON file path is correct
   - Ensure service role key is configured

3. **Database Connection**:
   - Verify Supabase URL and key in configuration
   - Check network connectivity

### SQL Script Safety Features

The cleanup script includes:
- **Before/After counts** to verify deletion
- **RLS management** - temporarily disables and re-enables security
- **Superuser preservation** - only deletes non-superuser data
- **Transaction safety** - proper deletion order to avoid constraint violations

## Files Created

1. **`delete_all_data_except_superusers.sql`** - Comprehensive cleanup script
2. **`test_single_member_import.py`** - Single member test import script
3. **This guide** - Complete documentation

## Post-Import Verification

After successful import, verify:
1. ✅ All 6 members appear in the Members screen
2. ✅ Member validation works during signup
3. ✅ Financial data is correctly displayed
4. ✅ Standing categories are properly assigned
5. ✅ Superuser accounts still have access

## Rollback Procedure

If anything goes wrong:
1. The original `import_members_to_supabase.py` script can re-import data
2. Superuser accounts are preserved for administrative access
3. Database structure remains intact for re-import

## Support

If you encounter issues:
1. Check the script output for specific error messages
2. Verify Supabase service role key configuration
3. Ensure all prerequisite packages are installed
4. Review the Supabase SQL Editor for any constraint errors

## Version History
- **2025-09-19**: Initial version created for database reset and fresh import
- **Includes**: Comprehensive cleanup, test import, and full import capabilities
