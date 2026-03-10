-- Fix for Lesego Bokaba (M031) balance discrepancy
-- Generated: 2026-03-08

-- Issue: The app shows incorrect balances for Lesego Bokaba
-- Database shows:
--   - financial_info.current_balance: 2600.00
--   - financial_info.total_contributions: 2600.00  
--   - financial_info.outstanding_amount: 0
--   - catch_up_fee: 0
--   - member_balances.savings_balance: 6220.82 (incorrect)
--   - member_balances.net_balance: 6220.82 (incorrect)

-- The app shows:
--   - Balance due: R2600 (should be 0 if paid)
--   - Total Contributions: R2600 (correct)
--   - Outstanding: R2600 (should be 0)
--   - Planned contributions: 0

-- Solution: Update both tables to reflect correct state
-- Assumption: Lesego Bokaba has paid her contributions, so:
--   - current_balance should be 0 (nothing due)
--   - outstanding_amount should be 0 (nothing owed)
--   - total_contributions should remain 2600 (historical record)
--   - member_balances should reflect actual paid amount

-- Step 1: Update members table financial_info
UPDATE members 
SET financial_info = '{
  "data_source": "Excel Verification 2025 - Corrected",
  "last_updated": "2026-03-08T16:30:00.000000",
  "current_balance": 0,
  "outstanding_amount": 0,
  "total_contributions": 2600.0,
  "contributions_by_year": {
    "2022-2023": 2600.0,
    "2023-2024": 0.0,
    "2024-2025": 0.0
  }
}',
    updated_at = NOW(),
    closing_balance = 0
WHERE member_number = 'M031' AND name = 'Lesego Bokaba';

-- Step 2: Update member_balances table to reflect actual paid amount
-- Assuming the actual paid amount is 2600 (from Excel)
UPDATE member_balances 
SET 
  savings_balance = 2600.0,
  net_balance = 2600.0,
  total_contributions = 2600.0,
  updated_at = NOW(),
  last_balance_update = NOW()
WHERE member_number = 'M031';

-- Step 3: Verify the fix
SELECT 
  m.member_number,
  m.name,
  m.financial_info->>'current_balance' as current_balance,
  m.financial_info->>'outstanding_amount' as outstanding_amount,
  m.financial_info->>'total_contributions' as total_contributions,
  mb.savings_balance,
  mb.net_balance
FROM members m
LEFT JOIN member_balances mb ON m.member_number = mb.member_number
WHERE m.member_number = 'M031';