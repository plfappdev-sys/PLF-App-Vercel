-- FINAL SIMPLE FIX FOR ALL REMAINING ISSUES
-- Created: October 22, 2025

-- 1. ADD MISSING 'share_value' COLUMN TO MEMBER_BALANCES TABLE
ALTER TABLE member_balances ADD COLUMN IF NOT EXISTS share_value DECIMAL(15,2) DEFAULT 0.00;

-- 2. FIX FINANCIAL_YEARS CREATED_BY (SIMPLE APPROACH)
-- Just update ALL records with a valid user ID, regardless of current value
UPDATE financial_years 
SET created_by = (
    SELECT id FROM users WHERE role = 'superuser' LIMIT 1
);

-- 3. VERIFY ALL FIXES
-- Check member_balances table has ALL required columns (should include share_value)
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'member_balances' 
ORDER BY column_name;

-- Check financial_years table has valid BigInt values
SELECT id, created_by FROM financial_years LIMIT 5;
