-- CORRECTED FOREIGN KEY FIX
-- Created: October 22, 2025

-- 1. FIRST, ADD THE MEMBER_ID COLUMN TO TRANSACTIONS
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS member_id VARCHAR(255);

-- 2. THEN ADD THE FOREIGN KEY CONSTRAINT (CORRECTED SYNTAX)
ALTER TABLE transactions 
ADD CONSTRAINT fk_transactions_member_id 
FOREIGN KEY (member_id) 
REFERENCES members(member_number);

-- 3. VERIFY THE FIX WORKED
-- Check if the column was added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'transactions' AND column_name = 'member_id';

-- Check if the foreign key constraint was created
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
