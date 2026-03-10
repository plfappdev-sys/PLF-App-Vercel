# Implementation Plan for ChangesForApp.txt Requirements

## Overview
Based on the requirements in `ChangesForApp.txt`, we need to make the following changes to the app:

### 1. Dashboard Screen - Fund Overview
- **Total members** - Already displays correctly
- **Total Fund Contributions** - Should display actual contributions received from members (Column G in Excel: "Total Contribution for 12 Months")
- **Total Outstanding** - Show total outstanding contributions + penalties
  - **Total Outstanding Contributions** = Total (Outstanding Contributions + Penalties)
  - **Outstanding Contributions** = Column H in Excel
  - **Penalties** = Column L in Excel

### 2. Statements
- Members should only view their own statements (already implemented, but need to verify)

### 3. My Funds Screen - Financial Summary
Display the following:
- **Balance** (already shows)
- **Expected Contribution** (new)
- **Actual Contribution** (new)

## Step-by-Step Implementation Plan

### Phase 1: Analyze Current Database Structure
1. Check what data has already been imported from Excel to Supabase
2. Identify which columns correspond to Excel columns G, H, L
3. Verify if we need to import additional data or if it's already in the database

### Phase 2: Update DashboardScreen.tsx
1. Modify the `getFundStatistics` function in `supabaseMemberService.ts` to:
   - Calculate **Total Fund Contributions** (sum of Column G values for all members)
   - Calculate **Total Outstanding Contributions** (sum of Column H values for all members)
   - Calculate **Total Penalties** (sum of Column L values for all members)
   - Calculate **Total Outstanding** = Total Outstanding Contributions + Total Penalties

2. Update DashboardScreen UI to display:
   - "Total Fund Contributions" instead of "Total Fund Value"
   - "Total Outstanding Contributions" with breakdown
   - Remove or rename "Outstanding Loans" section

### Phase 3: Update MyFundsScreen.tsx
1. Add new fields to display:
   - **Expected Contribution** (from Excel data)
   - **Actual Contribution** (from Excel data)
   
2. Update the member data fetching to include these new fields

### Phase 4: Verify Statement Access Control
1. Ensure statements are properly filtered by member ID
2. Test that members can only see their own statements

### Phase 5: Data Integration
1. Determine if Excel data needs to be imported to Supabase
2. If data is already imported, map Excel columns to database columns:
   - Column G → `total_contribution_12_months` or similar
   - Column H → `outstanding_contributions` or similar  
   - Column L → `penalties` or similar

### Phase 6: Testing
1. Test DashboardScreen with actual data
2. Test MyFundsScreen with member-specific data
3. Verify calculations match Excel totals
4. Test statement access controls

### Phase 7: Deployment
1. Commit changes
2. Push to GitHub
3. Deploy to Vercel

## Technical Details

### Excel File Analysis Findings:
- File: `Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx`
- Relevant sheet: `2024-2025` (July 2024 - June 2025)
- Column mappings (based on 2024-2025 sheet):
  - **Column G (index 7)**: "Total Contribution for 12 Months"
  - **Column H (index 8)**: "Total outstanding contribution for 12 Months"
  - **Column L (index 12)**: "Penalty July 2024- June 2025"
- Member identifier: "Member" column (Column A)

### Database Considerations:
1. Check if `members` table has columns for:
   - `total_contribution_12_months`
   - `outstanding_contributions`
   - `penalties`
   - `expected_contribution`
   - `actual_contribution`

2. If columns don't exist, we may need to:
   - Add columns to the `members` table
   - Import data from Excel
   - Or calculate dynamically from existing data

### Implementation Priority:
1. **HIGH**: DashboardScreen updates (most visible to users)
2. **HIGH**: MyFundsScreen updates (member financial summary)
3. **MEDIUM**: Data import/update if needed
4. **LOW**: Statement verification (likely already working)

## Next Steps
1. Examine current `supabaseMemberService.ts` to understand existing data structure
2. Check database schema for existing columns
3. Begin implementing Phase 2 (DashboardScreen updates)