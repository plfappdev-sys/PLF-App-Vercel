-- COMPLETE DATABASE FIX FOR DATA REPLACEMENT
-- Created: October 22, 2025

-- 1. FIRST, COMPLETELY CLEAR THE MEMBERS TABLE (including the duplicate constraint issue)
-- Drop the unique constraint temporarily
ALTER TABLE members DROP CONSTRAINT IF EXISTS members_member_number_key;

-- Clear all members (this should work now without constraint issues)
DELETE FROM members WHERE member_number IS NOT NULL;

-- Re-add the unique constraint
ALTER TABLE members ADD CONSTRAINT members_member_number_key UNIQUE (member_number);

-- 2. FIX MEMBER_BALANCES TABLE - REMOVE NOT NULL CONSTRAINT ON MEMBER_NUMBER
ALTER TABLE member_balances ALTER COLUMN member_number DROP NOT NULL;

-- 3. ADD MISSING 'share_value' COLUMN TO MEMBER_BALANCES TABLE
ALTER TABLE member_balances ADD COLUMN IF NOT EXISTS share_value DECIMAL(15,2) DEFAULT 0.00;

-- 4. FIX FINANCIAL_YEARS CREATED_BY (SIMPLE APPROACH)
-- Just update ALL records with a valid user ID, regardless of current value
UPDATE financial_years 
SET created_by = (
    SELECT id FROM users WHERE role = 'superuser' LIMIT 1
);

-- 5. VERIFY ALL FIXES
-- Check members table is empty
SELECT COUNT(*) as remaining_members FROM members;

-- Check member_balances table has ALL required columns (should include share_value)
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'member_balances' 
ORDER BY column_name;

-- Check financial_years table has valid BigInt values
SELECT id, created_by FROM financial_years LIMIT 5;

-- Check member_balances member_number constraint
SELECT column_name, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'member_balances' AND column_name = 'member_number';
