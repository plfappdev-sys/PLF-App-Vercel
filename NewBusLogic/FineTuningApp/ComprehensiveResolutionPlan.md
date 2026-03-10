# Comprehensive Resolution Plan for Data Verification Issues
## Created: March 9, 2026
## Based on DataVerificationCheck.txt and Current Code Analysis

## ISSUES TO RESOLVE

### 1. DATA DISCREPANCY BETWEEN APP AND EXCEL FOR LESEGO BOKABA (M031)
**Current App Data (from DataVerificationCheck.txt):**
- Balance Due: R 6,220.825
- Expected Contribution: R 16,600.00
- Total Contribution: R 5,300.00
- Outstanding Amount: R 6,220.825
- Outstanding Contributions: R 0.00 (SHOULD BE R 2,400.00)
- Penalties: R 0.00 (SHOULD BE R 2,250.82)

**Excel Data Requirements:**
- Total Contribution = Column BL in 2024-2025 worksheet
- Outstanding Contributions = Expected Contribution - Total Contribution
- Penalties = Column M in 2024-2025 worksheet

### 2. REMOVE UNWANTED FIELDS FROM FINANCIAL SUMMARY
**Issue:** My Funds Screen shows unwanted fields that should be removed:
- Planned Contributions (position 7 in test output)
- Interest Earned (position 8 in test output) 
- Interest Charged (position 9 in test output)

**Requirement:** Financial Summary should show only 6 required fields:
1. Balance Due / Balance
2. Expected Contribution
3. Total Contribution
4. Outstanding Amount
5. Outstanding Contributions
6. Penalties

### 3. ACCOUNT STATUS SHOWING "GOOD STANDING" INCORRECTLY
**Issue:** Account shows "Good Standing" when there's a balance due of R 6,220.825
**Requirement:** Standing should reflect actual financial position based on new business logic

### 4. DASHBOARD DISCREPANCY BETWEEN USERS
**Issue:** Different fund contribution values shown for Oratile (superuser) vs Lesego (member)
- **Oratile Dashboard:**
  - Total Fund Contributions: R 924,648.98
  - Total Outstanding Contributions: R 924,648.98
- **Lesego Dashboard:**
  - Total Fund Contributions: R 242,440.00
  - Total Outstanding Contributions: R 924,648.957

**Requirement:** Both users should see the same fund statistics
- Total Fund Contributions = Sum of Total Contributions for all Members
- Total Outstanding Contributions = Sum of Outstanding Contributions for all members

## ROOT CAUSE ANALYSIS

### 1. Data Import Issues
- Excel data may not have been fully imported into database columns
- `outstanding_contributions` and `total_penalties` columns may have incorrect or missing data

### 2. Calculation Logic Issues
- `supabaseMemberService.ts` has been updated but may not be using correct data sources
- Dashboard discrepancy likely due to RLS (Row Level Security) policies or different calculation methods

### 3. UI Display Issues
- MyFundsScreen.tsx displays more fields than required
- Field ordering may not match requirements

## STEP-BY-STEP RESOLUTION PLAN

### PHASE 1: VERIFY AND FIX DATABASE DATA (DAY 1)

#### Step 1.1: Check Lesego Bokaba (M031) Database Data
- [ ] Query database to check current values for M031
- [ ] Verify `outstanding_contributions` and `total_penalties` columns exist and have data
- [ ] Check if Excel data was properly imported

#### Step 1.2: Fix Database Data if Needed
- [ ] Update M031 record with correct values from Excel:
  - `outstanding_contributions`: R 2,400.00
  - `total_penalties`: R 2,250.82
  - `total_contributions`: Should match Column BL from Excel
- [ ] Verify calculations: Outstanding Contributions = Expected Contribution - Total Contribution

#### Step 1.3: Verify All Member Data
- [ ] Check if other members have similar data issues
- [ ] Ensure Excel data import was complete for all members

### PHASE 2: UPDATE MY FUNDS SCREEN UI (DAY 1)

#### Step 2.1: Remove Unwanted Fields
- [ ] Remove "Planned Contributions" from MyFundsScreen.tsx
- [ ] Remove "Interest Earned" from MyFundsScreen.tsx
- [ ] Remove "Interest Charged" from MyFundsScreen.tsx

#### Step 2.2: Ensure Correct Field Order
- [ ] Verify Financial Summary shows exactly 6 fields in this order:
  1. Balance Due / Balance
  2. Expected Contribution
  3. Total Contribution
  4. Outstanding Amount
  5. Outstanding Contributions
  6. Penalties

#### Step 2.3: Update Standing Display Logic
- [ ] Ensure standing shows correct category based on new business logic
- [ ] Positive balance should NOT show "Good Standing"

### PHASE 3: FIX DASHBOARD DISCREPANCY (DAY 2)

#### Step 3.1: Analyze Dashboard Calculation
- [ ] Review `SupabaseMemberService.getFundStatistics()` method
- [ ] Check if different calculation paths exist for different user roles
- [ ] Investigate RLS policy impact on data visibility

#### Step 3.2: Fix Fund Statistics Calculation
- [ ] Ensure consistent calculation for all user roles
- [ ] Fix `calculateFundStatisticsFromMembers()` to use correct data sources
- [ ] Verify calculations match Excel totals

#### Step 3.3: Test Dashboard Consistency
- [ ] Test with superuser account (oratile@tyriie.co.za)
- [ ] Test with member account (lesego@plf.com)
- [ ] Verify both show same fund statistics

### PHASE 4: COMPREHENSIVE TESTING AND VALIDATION (DAY 2)

#### Step 4.1: Test All Fixes
- [ ] Test My Funds Screen shows correct 6 fields
- [ ] Test Outstanding Contributions and Penalties show correct values for M031
- [ ] Test Standing shows correct category (not "Good Standing" when owing)
- [ ] Test Dashboard shows consistent values for all users

#### Step 4.2: Data Validation Against Excel
- [ ] Verify all member data matches Excel
- [ ] Check calculations for accuracy
- [ ] Document any remaining discrepancies

#### Step 4.3: Update Documentation
- [ ] Update TryingNewLogicForPLF.txt with progress
- [ ] Update NewBusinessLogicImplementationNotes.txt with fixes
- [ ] Create summary of issues resolved

## TECHNICAL IMPLEMENTATION DETAILS

### 1. Database Schema Verification
Need to verify these columns exist in `members` table:
- `outstanding_contributions` (decimal/numeric) - should be R 2,400.00 for M031
- `total_penalties` (decimal/numeric) - should be R 2,250.82 for M031
- `total_contributions` (decimal/numeric) - should match Excel Column BL
- `expected_contribution` (decimal/numeric) - should be R 16,600.00

### 2. MyFundsScreen.tsx Updates Required
Remove these sections from Financial Summary:
```jsx
{/* Planned Contributions (keep for reference but not in required order) */}
<View style={styles.statRow}>
  <Text style={styles.statLabel}>Planned Contributions:</Text>
  <Text style={styles.statValue}>
    {formatCurrency(memberData.financialInfo.plannedContributions)}
  </Text>
</View>

{/* Interest Information */}
<Divider style={styles.divider} />
<View style={styles.statRow}>
  <Text style={styles.statLabel}>Interest Earned:</Text>
  <Text style={[styles.statValue, { color: PLFTheme.colors.success }]}>
    {formatCurrency(memberData.financialInfo.totalInterestEarned || 0)}
  </Text>
</View>
<View style={styles.statRow}>
  <Text style={styles.statLabel}>Interest Charged:</Text>
  <Text style={[styles.statValue, { color: PLFTheme.colors.error }]}>
    {formatCurrency(memberData.financialInfo.totalInterestCharged || 0)}
  </Text>
</View>
```

### 3. Dashboard Fix Strategy
Potential issues to investigate:
1. **RLS Policies**: Superuser may bypass RLS and see all data, while member may be restricted
2. **Different Calculation Methods**: `getFundStatistics()` may use different data sources based on availability
3. **Caching Issues**: Different users may see cached data

## TESTING STRATEGY

### Test Cases for M031 (Lesego Bokaba)
1. **Test 1**: Verify Outstanding Contributions = R 2,400.00
2. **Test 2**: Verify Penalties = R 2,250.82
3. **Test 3**: Verify Outstanding Amount = R 4,650.82 (2,400 + 2,250.82)
4. **Test 4**: Verify Standing is NOT "Good Standing"
5. **Test 5**: Verify only 6 fields shown in Financial Summary

### Test Cases for Dashboard
1. **Test 1**: Superuser sees correct fund statistics
2. **Test 2**: Member sees same fund statistics as superuser
3. **Test 3**: Calculations match Excel totals
4. **Test 4**: No caching or RLS issues

## RISK MITIGATION

### Data Safety
- Backup database before making changes
- Test changes in development environment first
- Have rollback plan for each change

### Testing Strategy
- Test each fix independently
- Verify no regression in existing functionality
- Test with multiple user roles

### Communication
- Document all changes made
- Update implementation notes
- Notify stakeholders of progress

## SUCCESS CRITERIA

1. ✅ My Funds Screen shows only 6 required fields (no Planned Contributions, Interest Earned, Interest Charged)
2. ✅ Outstanding Contributions shows R 2,400.00 for M031
3. ✅ Penalties shows R 2,250.82 for M031
4. ✅ Standing shows correct category (not "Good Standing" when balance is due)
5. ✅ Dashboard shows consistent fund statistics for all user roles
6. ✅ All data matches Excel spreadsheet values

## IMMEDIATE NEXT STEPS

1. **Start with Phase 1, Step 1.1**: Check Lesego Bokaba (M031) database data
2. **Create test script** to verify current state
3. **Execute fixes** based on findings
4. **Test thoroughly** after each change

## ESTIMATED TIMELINE
- **Phase 1**: 3-4 hours
- **Phase 2**: 2-3 hours
- **Phase 3**: 3-4 hours
- **Phase 4**: 2-3 hours

**Total**: 10-14 hours over 2 days

## DEPENDENCIES
- Access to Supabase database
- Excel file for data verification
- Test accounts (oratile superuser, lesego member)

## DOCUMENTATION UPDATES REQUIRED
- TryingNewLogicForPLF.txt
- NewBusinessLogicImplementationNotes.txt
- ErrorTroubleshooting.txt
- This resolution plan (update with progress)