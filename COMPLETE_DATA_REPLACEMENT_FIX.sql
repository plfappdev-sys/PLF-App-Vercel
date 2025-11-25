-- COMPLETE DATA REPLACEMENT FIX
-- Execute these commands in Supabase SQL Editor FIRST
-- Created: October 22, 2025

-- 1. FIRST DROP THE FOREIGN KEY CONSTRAINT (to break the dependency)
ALTER TABLE transactions DROP CONSTRAINT IF EXISTS fk_transactions_member_id;

-- 2. THEN DROP THE UNIQUE CONSTRAINT ON MEMBERS (now no dependency)
ALTER TABLE members DROP CONSTRAINT IF EXISTS members_member_number_key;

-- 3. CLEAR ALL DATA FROM ALL TABLES (except superusers)
DELETE FROM transactions WHERE id IS NOT NULL;
DELETE FROM loans WHERE id IS NOT NULL;
DELETE FROM interest_accruals WHERE id IS NOT NULL;
DELETE FROM contributions WHERE id IS NOT NULL;
DELETE FROM member_balances WHERE id IS NOT NULL;
DELETE FROM audit_logs WHERE id IS NOT NULL;
DELETE FROM financial_years WHERE id IS NOT NULL;
DELETE FROM system_settings WHERE id IS NOT NULL;

-- 4. CLEAR MEMBERS TABLE (except those linked to superusers)
DELETE FROM members WHERE user_id NOT IN (
    SELECT id FROM users WHERE role = 'superuser'
);

-- 5. RE-ADD THE UNIQUE CONSTRAINT ON MEMBERS
ALTER TABLE members ADD CONSTRAINT members_member_number_key UNIQUE (member_number);

-- 6. FIX MEMBER_BALANCES TABLE ISSUES
ALTER TABLE member_balances ALTER COLUMN member_number DROP NOT NULL;
ALTER TABLE member_balances ADD COLUMN IF NOT EXISTS share_value DECIMAL(15,2) DEFAULT 0.00;

-- 7. ENSURE MEMBER_ID COLUMN EXISTS IN TRANSACTIONS
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS member_id VARCHAR(255);

-- 8. RE-CREATE THE FOREIGN KEY CONSTRAINT (after members are properly set up)
ALTER TABLE transactions 
ADD CONSTRAINT fk_transactions_member_id 
FOREIGN KEY (member_id) 
REFERENCES members(member_number);

-- 9. VERIFICATION QUERIES
-- Check members table is empty (ready for import)
SELECT COUNT(*) as remaining_members FROM members;

-- Check foreign key relationship was recreated
SELECT 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_name = 'transactions';

-- Check all tables are empty
SELECT 'members' as table_name, COUNT(*) as count FROM members
UNION ALL SELECT 'transactions', COUNT(*) FROM transactions
UNION ALL SELECT 'loans', COUNT(*) FROM loans
UNION ALL SELECT 'contributions', COUNT(*) FROM contributions
UNION ALL SELECT 'member_balances', COUNT(*) FROM member_balances
UNION ALL SELECT 'financial_years', COUNT(*) FROM financial_years
UNION ALL SELECT 'system_settings', COUNT(*) FROM system_settings;
