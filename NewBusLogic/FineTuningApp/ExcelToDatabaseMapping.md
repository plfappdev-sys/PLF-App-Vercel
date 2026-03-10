# Excel to Database Mapping for PLF Application
## Created: March 9, 2026
## Based on Excel Structure Analysis and LogicalTweeks.txt Requirements

## OVERVIEW
This document provides a detailed mapping between Excel spreadsheet columns and database table columns for the PLF application. The mapping is essential for completing the data import and ensuring the MyFundsScreen displays all required financial information in the correct order.

## EXCEL FILE INFORMATION
- **Primary File**: "Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"
- **Alternative Files**: "Peoples Liberator Fund Contributions 2025 App.xlsx", "Peoples Liberator Fund Contributions 2025 AppUPDATED.xlsx"
- **Key Sheet**: "2024-2025" (contains final totals for verification)
- **Total Sheets**: 21 sheets (financial years from 2018-2019 to 2024-2025)

## DATABASE SCHEMA (Current)
Based on `supabase-schema.sql`, the `members` table has the following relevant columns:

```sql
-- Current members table columns (relevant for financial data)
total_contributions DECIMAL(15, 2) DEFAULT 0,
current_balance DECIMAL(15, 2) DEFAULT 0,
current_interest_earned DECIMAL(15, 2) DEFAULT 0,
total_interest_earned DECIMAL(15, 2) DEFAULT 0,
current_interest_charged DECIMAL(15, 2) DEFAULT 0,
total_interest_charged DECIMAL(15, 2) DEFAULT 0,
```

## EXCEL COLUMNS FOUND (from 2019-2020 sheet analysis)

### 1. Member Information Columns
| Excel Column | Description | Database Mapping | Status |
|--------------|-------------|------------------|--------|
| Member | Member identification (e.g., "Member 1") | `member_number` + `personal_info->>'fullName'` | ✅ Mapped |
| Date Join | Membership start date | `join_date` | ✅ Mapped |
| Membership Fee | Initial membership fee | `financial_info->>'membershipFee'` | ✅ Mapped |

### 2. Financial Summary Columns (Critical for MyFundsScreen)
| Excel Column | Description | Required for MyFundsScreen | Database Mapping | Status |
|--------------|-------------|----------------------------|------------------|--------|
| Expected Contribution | Annual expected contribution (R2400.0) | ✅ Position 2 | `expected_contribution` (NEW COLUMN) | ❌ Missing |
| Total Contribution for 12 Months | Actual total contributions for the year | ✅ Position 3 | `total_contributions` | ✅ Existing |
| Total outstanding contribution for 12 Months | Outstanding contributions | ✅ Position 5 | `outstanding_contributions` (NEW COLUMN) | ❌ Missing |
| Penalty July 2019- June 2020 | Total penalties for the year | ✅ Position 6 | `total_penalties` (NEW COLUMN) | ❌ Missing |
| Closing Balance | Year-end balance | ✅ Position 1 (Balance/Balance Due) | `current_balance` | ✅ Existing |
| Balance Brought Forward | Previous year's closing balance | (Calculation component) | `balance_brought_forward` (NEW COLUMN) | ❌ Missing |
| Catch-Up Fee | Catch-up fee amount | (Calculation component) | `catch_up_fee` (NEW COLUMN) | ❌ Missing |

### 3. Additional Financial Columns
| Excel Column | Description | Database Mapping | Status |
|--------------|-------------|------------------|--------|
| Estimated 12 Months Contribution | Estimated annual contribution | `financial_info->>'estimatedAnnualContribution'` | ❌ Missing |
| Total Bank Charges @ 1,1% | Total bank charges | `total_bank_charges` (NEW COLUMN) | ❌ Missing |
| Total Interest Earned @ 5,5% | Total interest earned | `total_interest_earned` | ✅ Existing |
| Capped Penalties Current Financial Year | Capped penalty amounts | `capped_penalties` (NEW COLUMN) | ❌ Missing |
| Share Value | Share value amount | `share_value` (NEW COLUMN) | ❌ Missing |

### 4. Monthly Contribution Columns (July 2019 - June 2020)
For each month (12 months):
- `YYYY-MM-01 00:00:00` - Month column
- `Bank Charges @ 0,99%` - Bank charges for the month
- `Amount Due` - Monthly contribution amount due  
- `Penalty` - Penalty applied for the month

**Database Mapping**: These should map to a `contributions` table with monthly records.

## MYFUNDSSCREEN REQUIREMENTS MAPPING

### Required Display Order (from LogicalTweeks.txt):
1. **Balance / Balance Due** → `current_balance` (✅ Existing)
2. **Expected Contribution** → `expected_contribution` (❌ Missing - needs import)
3. **Total Contribution** → `total_contributions` (✅ Existing)
4. **Outstanding Amount** → `outstanding_amount` (❌ Missing - needs import)
   - *Note: Outstanding Amount = Outstanding Contributions + Penalties*
5. **Outstanding Contributions** → `outstanding_contributions` (❌ Missing - needs import)
6. **Penalties** → `total_penalties` (❌ Missing - needs import)

### Calculation Formulas (from LogicalTweeks.txt):
1. **Expected Contribution** - Already worked out (R2400.0 annually)
2. **Actual Contributions** = What members actually paid → `total_contributions`
3. **Balance brought forward** = closing balance from the previous year → `balance_brought_forward`
4. **Estimated 12 months contribution** = column C + column D
5. **Total contribution for 12 months** = column BK (O+S+W+AA+AE+AI+AQ+AM+AU+AY+BC+BG) → `total_contributions`
6. **Closing Balance** = Total outstanding (H) + Penalty for the year (L) + Balance Brought Forward (E) → `current_balance`
7. **Penalty for the year (L)** = R+V+Z+AD+AH+AL+AP+AT+AX+BB+BF+BJ → `total_penalties`
8. **Capped penalties** = Penalties capped from 2018 until 2024 Nov → `capped_penalties`
9. **Penalties**: 5.5% monthly interest for late payments (balance brought forward + current month contribution x 5.5%). Penalty for late payment in the next month is amount due + current month contribution x 5.5%)
10. **Total fund contributions** = all contribution made by members → Sum of all `total_contributions`

## DATABASE SCHEMA UPDATES REQUIRED

### New Columns Needed in `members` Table:

```sql
-- Add these columns to the members table
ALTER TABLE members ADD COLUMN IF NOT EXISTS expected_contribution DECIMAL(15, 2) DEFAULT 2400.00;
ALTER TABLE members ADD COLUMN IF NOT EXISTS outstanding_amount DECIMAL(15, 2) DEFAULT 0;
ALTER TABLE members ADD COLUMN IF NOT EXISTS outstanding_contributions DECIMAL(15, 2) DEFAULT 0;
ALTER TABLE members ADD COLUMN IF NOT EXISTS total_penalties DECIMAL(15, 2) DEFAULT 0;
ALTER TABLE members ADD COLUMN IF NOT EXISTS balance_brought_forward DECIMAL(15, 2) DEFAULT 0;
ALTER TABLE members ADD COLUMN IF NOT EXISTS catch_up_fee DECIMAL(15, 2) DEFAULT 0;
ALTER TABLE members ADD COLUMN IF NOT EXISTS total_bank_charges DECIMAL(15, 2) DEFAULT 0;
ALTER TABLE members ADD COLUMN IF NOT EXISTS share_value DECIMAL(15, 2) DEFAULT 0;
ALTER TABLE members ADD COLUMN IF NOT EXISTS capped_penalties DECIMAL(15, 2) DEFAULT 0;
ALTER TABLE members ADD COLUMN IF NOT EXISTS estimated_annual_contribution DECIMAL(15, 2) DEFAULT 0;
```

### JSONB Field Updates (Alternative Approach):
If using JSONB fields instead of separate columns:

```sql
-- Update financial_info JSONB field to include missing data
UPDATE members 
SET financial_info = financial_info || '{
  "expectedContribution": 2400.00,
  "outstandingAmount": 0,
  "outstandingContributions": 0,
  "totalPenalties": 0,
  "balanceBroughtForward": 0,
  "catchUpFee": 0,
  "totalBankCharges": 0,
  "shareValue": 0,
  "cappedPenalties": 0,
  "estimatedAnnualContribution": 0
}'::jsonb;
```

## DATA IMPORT STRATEGY

### Phase 1: Schema Updates
1. Add missing columns to `members` table
2. Update RLS policies for new columns
3. Create indexes for performance

### Phase 2: Data Extraction from Excel
1. Extract data from "2024-2025" sheet (final totals)
2. Map Excel columns to database columns using the mapping above
3. Handle data type conversions (dates, currencies, etc.)

### Phase 3: Data Import
1. Create Python script to import missing Excel data
2. Validate data integrity after import
3. Update member records with imported data

### Phase 4: Calculation Verification
1. Verify calculations match Excel formulas
2. Test with sample members (Member 1-5 from Excel)
3. Ensure MyFundsScreen displays correct values

## PRIORITY ORDER FOR IMPLEMENTATION

### High Priority (Required for MyFundsScreen):
1. `expected_contribution` - Position 2 in display
2. `outstanding_contributions` - Position 5 in display  
3. `total_penalties` - Position 6 in display
4. `outstanding_amount` - Position 4 in display (calculated as outstanding_contributions + total_penalties)

### Medium Priority (Required for calculations):
5. `balance_brought_forward` - Needed for closing balance calculation
6. `catch_up_fee` - Part of balance brought forward calculation

### Low Priority (Additional data):
7. `total_bank_charges` - For complete financial reporting
8. `share_value` - Member share value
9. `capped_penalties` - Historical penalty information
10. `estimated_annual_contribution` - Estimated vs actual comparison

## VALIDATION CHECKLIST

### Data Import Validation:
- [ ] Expected Contribution values match Excel (R2400.0 for all members)
- [ ] Total Contribution values match Excel "Total Contribution for 12 Months"
- [ ] Outstanding Contributions match Excel "Total outstanding contribution for 12 Months"
- [ ] Penalties match Excel "Penalty July 2019- June 2020" (or equivalent for 2024-2025)
- [ ] Closing Balance matches Excel "Closing Balance"
- [ ] Balance Brought Forward matches Excel "Balance Brought Forward"
- [ ] Catch-Up Fee matches Excel "Catch-Up Fee"

### Calculation Validation:
- [ ] Outstanding Amount = Outstanding Contributions + Penalties
- [ ] Closing Balance calculation matches Excel formula
- [ ] Penalty calculations follow 5.5% monthly interest rule
- [ ] Capped penalties logic is correctly implemented

### Display Validation:
- [ ] MyFundsScreen shows all 6 items in correct order
- [ ] Balance/Balance Due label changes based on value
- [ ] All values are formatted as currency (R)
- [ ] Data updates correctly when member data changes

## NEXT STEPS

1. **Create database migration script** to add missing columns
2. **Update Excel import script** to extract and map missing columns
3. **Run data import** for all members
4. **Update MyFundsScreen** to use new data columns
5. **Test thoroughly** with sample members from Excel

## RISKS AND MITIGATION

### Data Integrity Risks:
- **Risk**: Excel data may have inconsistencies or errors
- **Mitigation**: Validate data against multiple sheets, create data quality checks

### Performance Risks:
- **Risk**: Adding many columns may impact query performance
- **Mitigation**: Add appropriate indexes, consider JSONB approach for less frequently accessed data

### Compatibility Risks:
- **Risk**: Changes may break existing functionality
- **Mitigation**: Test thoroughly, use feature flags if needed, maintain backward compatibility

## CONCLUSION

The Excel to database mapping reveals that while some critical data is already imported (total_contributions, current_balance, interest calculations), several key columns required for the MyFundsScreen display are missing. The highest priority is importing Expected Contribution, Outstanding Contributions, and Penalties data to complete the financial summary display as specified in LogicalTweeks.txt.