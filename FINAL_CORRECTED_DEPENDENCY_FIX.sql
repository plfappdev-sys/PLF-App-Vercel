-- FINAL CORRECTED SOLUTION WITH PROPER DEPENDENCY ORDER
-- Created: October 22, 2025

-- 1. FIRST DROP THE FOREIGN KEY CONSTRAINT (to break the dependency)
ALTER TABLE transactions DROP CONSTRAINT IF EXISTS fk_transactions_member_id;

-- 2. THEN DROP THE UNIQUE CONSTRAINT ON MEMBERS (now no dependency)
ALTER TABLE members DROP CONSTRAINT IF EXISTS members_member_number_key;

-- 3. CLEAR THE MEMBERS TABLE (remove duplicate members)
DELETE FROM members WHERE member_number IS NOT NULL;

-- 4. RE-ADD THE UNIQUE CONSTRAINT ON MEMBERS
ALTER TABLE members ADD CONSTRAINT members_member_number_key UNIQUE (member_number);

-- 5. FIX MEMBER_BALANCES TABLE ISSUES
ALTER TABLE member_balances ALTER COLUMN member_number DROP NOT NULL;
ALTER TABLE member_balances ADD COLUMN IF NOT EXISTS share_value DECIMAL(15,2) DEFAULT 0.00;

-- 6. FIX FINANCIAL_YEARS CREATED_BY ISSUE
UPDATE financial_years 
SET created_by = (
    SELECT id FROM users WHERE role = 'superuser' LIMIT 1
);

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

-- Check member_balances table structure
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'member_balances' 
ORDER BY column_name;

-- Check financial_years has valid values
SELECT id, created_by FROM financial_years LIMIT 5;
