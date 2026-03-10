# ANALYSIS: Service Layer Issue in supabaseMemberService.ts

## PROBLEM IDENTIFIED
The `supabaseMemberService.ts` has a bug in the `getMemberByNumber()` method:

### Incorrect Code (lines 77-78):
```typescript
const financialInfo = balanceData ? {
  totalContributions: balanceData.savings_balance || 0,  // ❌ WRONG!
  // ...
} : // ...
```

### What's Wrong:
1. **`balanceData.savings_balance`** = **6220.82** (CURRENT balance, not total contributions)
2. **`financialInfoData.total_contributions`** = **5300** (CORRECT total contributions from Excel)

### Correct Approach:
The service should ALWAYS extract `totalContributions` from `financialInfoData.total_contributions` (JSON field), NOT from `balanceData.savings_balance`.

## ROOT CAUSE
The database schema is missing the `total_contributions` column, so the service MUST extract from the `financial_info` JSON field. However, the code incorrectly uses `savings_balance` when `balanceData` exists.

## IMPACT
For Lesego Bokaba (M031):
- **Current (wrong)**: Total Contributions = R 6,220.82 (savings_balance)
- **Correct**: Total Contributions = R 5,300.00 (financial_info.total_contributions)

This 17.4% error (R 920.82 difference) explains why the MyFundsScreen shows incorrect data!

## FIX REQUIRED
Update `supabaseMemberService.ts` to:
1. Always extract `totalContributions` from `financialInfoData.total_contributions`
2. Never use `balanceData.savings_balance` for total contributions
3. Use `balanceData.savings_balance` only for current balance (which it already does correctly)

## ADDITIONAL ISSUES FOUND
1. **Line 77**: `totalContributions: balanceData.savings_balance || 0` → Should be `financialInfoData.total_contributions || 0`
2. **Line 91**: Already correct: `totalContributions: financialInfoData.total_contributions || 0`
3. **Line 77**: `actualContributions: 0` → Should be `financialInfoData.total_contributions || 0` (or use actual contributions if available)
4. **Line 91**: `actualContributions: financialInfoData.actual_contributions || 0` → Already correct

## RECOMMENDED FIX
Update the `getMemberByNumber()` method to consistently extract data from `financialInfoData` for:
- `totalContributions`
- `expectedContribution` 
- `actualContributions`

Only use `balanceData` for:
- `currentBalance` (net_balance or savings_balance)
- `totalInterestEarned` (if available)