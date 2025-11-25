-- FINAL CORRECTED COMPLETE DATABASE FIX
-- Created: October 22, 2025
-- This script fixes ALL remaining database issues

-- 1. FIRST, COMPLETELY CLEAR THE MEMBERS TABLE (including the duplicate constraint issue)
ALTER TABLE members DROP CONSTRAINT IF EXISTS members_member_number_key;
DELETE FROM members WHERE member_number IS NOT NULL;
ALTER TABLE members ADD CONSTRAINT members_member_number_key UNIQUE (member_number);

-- 2. ADD ALL MISSING COLUMNS TO MEMBER_BALANCES TABLE
ALTER TABLE member_balances ADD COLUMN IF NOT EXISTS id VARCHAR(255);
ALTER TABLE member_balances ADD COLUMN IF NOT EXISTS member_id VARCHAR(255);
ALTER TABLE member_balances ADD COLUMN IF NOT EXISTS available_funds DECIMAL(15,2) DEFAULT 0.00;
ALTER TABLE member_balances ADD COLUMN IF NOT EXISTS total_balance DECIMAL(15,2) DEFAULT 0.00;
ALTER TABLE member_balances ADD COLUMN IF NOT EXISTS created_at VARCHAR(255);
ALTER TABLE member_balances ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE member_balances ADD COLUMN IF NOT EXISTS last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 3. UPDATE TIMESTAMPS FOR ALL TABLES
UPDATE members SET updated_at = NOW() WHERE updated_at IS NULL;
UPDATE member_balances SET updated_at = NOW() WHERE updated_at IS NULL;
UPDATE member_balances SET last_updated = NOW() WHERE last_updated IS NULL;
UPDATE financial_years SET updated_at = NOW() WHERE updated_at IS NULL;
UPDATE system_settings SET updated_at = NOW() WHERE updated_at IS NULL;

-- 4. FIX FINANCIAL_YEARS CREATED_BY (CORRECTED - only update NULL values)
UPDATE financial_years 
SET created_by = (
    SELECT id FROM users WHERE role = 'superuser' LIMIT 1
) 
WHERE created_by IS NULL;

-- 5. VERIFY ALL FIXES
-- Check members table is empty
SELECT COUNT(*) as remaining_members FROM members;

-- Check member_balances table has ALL required columns
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'member_balances' 
ORDER BY column_name;

-- Check financial_years table has valid BigInt values
SELECT id, created_by FROM financial_years LIMIT 5;
