# Database Clean and Reimport Plan
## Date: November 24, 2025
## Updated: Based on LOGICAL CALCULATION 2025-11-11.docx

## Problem Statement
- Database has duplicated members (178 total instead of expected 89)
- Need to clean database completely except for superusers
- Properly import Excel data with correct member names
- Ensure member names display correctly in app and reports
- Implement correct financial calculations based on logical calculation document

## Plan Overview

### Phase 1: Database Cleanup
- [x] Backup current database state
- [x] Delete all data except superusers (oratile@tyriie.co.za, superuser@plf.com)
- [x] Verify cleanup completed successfully

### Phase 2: Schema Preparation
- [x] Ensure proper database schema exists
- [x] Add required columns for member names
- [x] Set up proper relationships

### Phase 3: Data Import
- [x] Import member data from Excel with proper names
- [x] Import contribution data with proper relationships
- [x] Verify data integrity and relationships

### Phase 4: Testing and Verification
- [x] Fix member names display issue
- [x] Test member names display in app
- [x] Test member names in reports
- [x] Verify all functionality works correctly

## Detailed Steps

### Phase 1: Database Cleanup
1. **Backup Current State**
   - Export current members, users, transactions data
   - Save backup files locally

2. **Delete All Data Except Superusers**
   - Delete all members except those linked to superusers
   - Delete all transactions, contributions, balances
   - Keep only: oratile@tyriie.co.za and superuser@plf.com

3. **Verification**
   - Confirm only 2 users remain
   - Confirm members table is empty or only has superuser-linked members

### Phase 2: Schema Preparation
1. **Check Existing Schema**
   - Verify members table has name column
   - Verify proper foreign key relationships
   - Add missing columns if needed

2. **Schema Updates**
   - Ensure name column exists and is properly indexed
   - Set up proper constraints and defaults

### Phase 3: Data Import
1. **Member Data Import**
   - Import 89 members from Excel with proper names
   - Ensure member_id and name fields are populated correctly
   - Verify all 89 members imported successfully

2. **Contribution Data Import**
   - Import contribution data with proper member relationships
   - Ensure financial years are properly set up
   - Verify contribution amounts and dates

### Phase 4: Testing and Verification
1. **App Testing**
   - Check MembersScreen displays proper names
   - Verify member selection works correctly
   - Test member search functionality

2. **Reports Testing**
   - Generate member statements with proper names
   - Verify reports display correct member information
   - Test all report types

## Success Criteria
- [x] Database contains only 2 superusers and 89 members
- [x] All members have proper names (not "Unknown Name")
- [x] Member names display correctly in app screens
- [x] Member names display correctly in reports
- [x] All existing functionality preserved
- [x] No data duplication
- [x] Financial data imported with correct balances
- [x] Member numbers correctly sequenced (Christopher Naude as M006)

## Updated Financial Calculation Logic
Based on "LOGICAL CALCULATION 2025-11-11.docx":

### Expected Contribution Calculation
- **Period 1 (2018/07-2024/06)**: R200 × 72 months = R14,400.00
- **Period 2 (2024/07-2025/11)**: R250 × 12 months = R3,000.00
- **Total Expected**: R17,400.00 over 84 months

### Penalty Calculation
- **5.5% monthly interest** for late payments
- **Formula**: (balance brought forward + current month contribution) × 5.5%
- **Next month penalty**: (amount due + current month contribution) × 5.5%

### Interest Calculation
- **5.5% annual interest** on positive balances (exclude from penalty calculation)

### Key Principles
- **Negative Balance** = Member owes money
- **Positive Balance** = Member has savings
- **Outstanding Amount** = Negative Balance
- **Joining Fee** = R100.00

## Christopher Naude (M006) Analysis Summary
- **Current Balance**: R51,965.10
- **Catch-up Fee**: R600.00
- **Actual Contributions**: R5,600.00
- **Expected Contributions**: R17,400.00
- **Penalties**: R25,897.59
- **Financial Health**: Good (positive balance)
- **Compliance**: Needs Improvement (outstanding fees)

## Next Steps Required
1. **Update monthly contribution rate** from R200 to R250 in database
2. **Implement penalty calculation system** based on 5.5% monthly interest
3. **Create contribution records** for actual payments made
4. **Review catch-up fee calculation** methodology
5. **Implement automated penalty calculation** system

## Risk Mitigation
- **Backup Strategy**: Full database backup before cleanup
- **Rollback Plan**: Ability to restore from backup if issues occur
- **Testing**: Comprehensive testing at each phase
- **Verification**: Multiple verification steps to ensure data integrity

## Timeline
- Phase 1: 30 minutes
- Phase 2: 15 minutes  
- Phase 3: 30 minutes
- Phase 4: 25 minutes
- **Total**: ~2 hours

## Files Required
- `delete_all_data_except_superusers.sql` - Cleanup script
- `selected_members_2024_2025.json` - Member data
- `extracted_contributions.json` - Contribution data
- `import_members_to_supabase.py` - Import script
