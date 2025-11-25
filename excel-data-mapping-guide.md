# PLF Excel Data Migration Mapping Guide

## Excel File Analysis Summary

**File:** `Peoples Liberator Fund Contributions 2025 App.xlsx`
**Total Sheets:** 21 sheets
**Key Contribution Sheets:** 
- 2018-2019 B STATEMENT (transaction-level data)
- 2018-2019 (member summary data)
- 2019-2020 New (member summary data)
- 2020-2021 New (member summary data)
- 2021-2022 (A) New (member summary data)
- 2021-2022 (B) (member summary data)
- 2022-2023 (member summary data)
- 2022 Mar-Jun (member summary data)
- 2023-2024 (member summary data)
- 2024-2025 (member summary data)

## Database Schema Overview

### Members Table (Target)
```sql
CREATE TABLE members (
    id UUID PRIMARY KEY,
    member_number TEXT UNIQUE NOT NULL,
    personal_info JSONB,        -- Contains name, contact info
    financial_info JSONB,       -- Contains balances, contributions
    membership_status JSONB,    -- Contains status, standing
    interest_settings JSONB,
    contribution_history JSONB, -- Array of contribution objects
    loan_history JSONB,
    interest_history JSONB,
    user_id UUID,
    join_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ,
    last_updated TIMESTAMPTZ
);
```

### Contributions Table (Target)
```sql
CREATE TABLE contributions (
    id UUID PRIMARY KEY,
    member_id BIGINT NOT NULL,
    member_number TEXT NOT NULL,
    contribution_month DATE NOT NULL,
    due_date DATE NOT NULL,
    amount_due DECIMAL(15, 2),
    amount_paid DECIMAL(15, 2),
    status TEXT,
    late_fee_applied BOOLEAN,
    late_fee_amount DECIMAL(15, 2),
    payment_date TIMESTAMPTZ,
    payment_reference TEXT,
    payment_method TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);
```

## Excel to Database Mapping

### 1. Member Information Mapping

**Excel Columns (from 2019-2020 New sheet):**
- `Member` → `members.member_number` + `personal_info->>'fullName'`
- `Date Join` → `members.join_date`
- `Membership Fee` → `financial_info->>'membershipFee'`
- `Expected Contribution` → `financial_info->>'expectedContribution'`
- `Balance Brought Forward` → `financial_info->>'balanceBroughtForward'`
- `Catch-Up Fee` → `financial_info->>'catchUpFee'`
- `Closing Balance` → `financial_info->>'currentBalance'`
- `Share Value` → `financial_info->>'shareValue'`

### 2. Contribution Data Mapping

**Monthly Contribution Columns (Excel pattern):**
For each month (e.g., 2019-07-01, 2019-08-01, etc.):
- `Bank Charges @ 0,99%` → Bank charges for the month
- `Amount Due` → Monthly contribution amount due
- `Penalty` → Penalty applied for the month

**This maps to:** `contributions` table records for each month

### 3. Financial Summary Mapping

**Excel Summary Columns:**
- `Total Bank Charges @ 1,1%` → `financial_info->>'totalBankCharges'`
- `Total Interest Earned @ 5,5%` → `financial_info->>'totalInterestEarned'`
- `Penalty July 2019- June 2020` → `financial_info->>'totalPenalties'`
- `Total Contribution for Current Year` → `financial_info->>'annualContributions'`

## Migration Strategy

### Phase 1: Member Data Extraction
1. Extract unique members from all sheets
2. Create member records with basic information
3. Map financial summary data to financial_info JSONB

### Phase 2: Contribution History Extraction
1. For each financial year sheet, extract monthly contribution data
2. Create contribution records for each month with amounts
3. Link contributions to member records

### Phase 3: Transaction Data (2018-2019 B STATEMENT)
1. Extract individual transaction records
2. Map to contribution payments or create new contribution records
3. Handle bank charges and fees

## Data Transformation Rules

### Member Number Normalization
- Excel: "Member 1", "Member 2", etc.
- Database: Should use consistent member numbering system
- Suggestion: Extract numbers and prefix with "PLF-" → "PLF-001", "PLF-002"

### Date Handling
- Excel dates may be in various formats (DD/MM/YYYY, MM/DD/YYYY, datetime objects)
- Standardize to ISO format: YYYY-MM-DD

### Currency and Amounts
- All financial amounts should be converted to DECIMAL(15,2)
- Handle null/empty values as 0.00

### Status Mapping
- Excel standing categories → membership_status JSONB values
- "good standing" → "good"
- "owing < 10%" → "slight_delay"
- "owing > 65%" → "significant_delay"

## Implementation Plan

1. **Create member mapping script** - Extract and normalize member data
2. **Create contribution extraction script** - Process monthly contribution data
3. **Create transaction processor** - Handle 2018-2019 transaction records
4. **Data validation** - Verify data integrity after migration
5. **Update procedures** - Create stored procedures for ongoing data maintenance

## Risk Assessment

1. **Data Quality**: Excel sheets may have inconsistent formatting
2. **Member Matching**: Need consistent member identification across sheets
3. **Date Handling**: Multiple date formats may cause parsing issues
4. **Currency Conversion**: Ensure proper decimal handling
5. **Performance**: Large datasets may require batch processing

## Next Steps

1. Create Python script for member data extraction
2. Develop contribution data migration script
3. Implement data validation checks
4. Test with sample data before full migration
5. Document any data quality issues encountered
