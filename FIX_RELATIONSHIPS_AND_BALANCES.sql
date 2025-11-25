-- FIX DATABASE RELATIONSHIPS AND BALANCE ISSUES
-- Created: October 22, 2025

-- 1. ADD MISSING FOREIGN KEY RELATIONSHIP BETWEEN TRANSACTIONS AND MEMBERS
-- First check if the column exists
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'transactions' AND column_name = 'member_id';

-- If it doesn't exist, add it
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS member_id VARCHAR(255);

-- Add foreign key constraint
ALTER TABLE transactions ADD CONSTRAINT fk_transactions_member_id 
FOREIGN KEY (member_id) REFERENCES members(member_number);

-- 2. FIX BALANCE DISPLAY ISSUES - CHECK CURRENT BALANCE DATA
SELECT member_number, total_balance, available_funds, share_value 
FROM member_balances 
LIMIT 10;

-- 3. CHECK IF MEMBERS ARE PROPERLY LINKED TO BALANCES
SELECT m.member_number, mb.total_balance, mb.available_funds
FROM members m
LEFT JOIN member_balances mb ON m.member_number = mb.member_number
LIMIT 10;

-- 4. VERIFY TRANSACTIONS TABLE STRUCTURE
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'transactions'
ORDER BY column_name;

-- 5. CHECK IF THERE ARE ANY TRANSACTIONS
SELECT COUNT(*) as transaction_count FROM transactions;

-- 6. CHECK IF MEMBERS ARE PROPERLY IMPORTED
SELECT COUNT(*) as member_count FROM members;
SELECT member_number, name FROM members LIMIT 5;

-- 7. CHECK IF BALANCES HAVE PROPER VALUES
SELECT COUNT(*) as balance_count FROM member_balances;
SELECT member_number, total_balance, available_funds, share_value 
FROM member_balances 
WHERE total_balance > 0 
LIMIT 5;
