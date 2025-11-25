-- SQL Script to Fix All Remaining Database Schema Issues
-- Created: October 22, 2025

-- 1. Add missing 'status' column to members table
ALTER TABLE members 
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'active';

-- 2. Update existing members to have 'active' status
UPDATE members 
SET status = 'active' 
WHERE status IS NULL;

-- 3. Check if financial_years table has any records that might cause UUID issues
-- If there are existing records with empty created_by, update them
UPDATE financial_years 
SET created_by = (
    SELECT id FROM users WHERE role = 'superuser' LIMIT 1
) 
WHERE created_by IS NULL OR created_by = '';

-- 4. Verify all changes
-- Check members table
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'members' 
    AND column_name IN ('name', 'status', 'membership_fee', 'closing_balance', 'share_value', 'date_joined')
ORDER BY column_name;

-- Check financial_years table
SELECT COUNT(*) as total_financial_years FROM financial_years;
SELECT created_by FROM financial_years LIMIT 1;
