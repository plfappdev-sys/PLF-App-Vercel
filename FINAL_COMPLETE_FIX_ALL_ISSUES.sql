-- FINAL COMPLETE FIX FOR ALL REMAINING ISSUES
-- Created: October 22, 2025

-- 1. ADD MISSING 'share_value' COLUMN TO MEMBER_BALANCES TABLE
ALTER TABLE member_balances ADD COLUMN IF NOT EXISTS share_value DECIMAL(15,2) DEFAULT 0.00;

-- 2. FIX FINANCIAL_YEARS CREATED_BY (CORRECTED APPROACH)
-- First check what values exist
SELECT DISTINCT created_by FROM financial_years;

-- If there are empty string values, we need to handle them properly
-- Option 1: Set empty strings to NULL first
UPDATE financial_years SET created_by = NULL WHERE created_by = '';

-- Option 2: Then update NULL values with valid user ID
UPDATE financial_years 
SET created_by = (
    SELECT id FROM users WHERE role = 'superuser' LIMIT 1
) 
WHERE created_by IS NULL;

-- 3. VERIFY ALL FIXES
-- Check member_balances table has ALL required columns (should include share_value)
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'member_balances' 
ORDER BY column_name;

-- Check financial_years table has valid BigInt values (no empty strings)
SELECT id, created_by FROM financial_years LIMIT 5;
