-- Database Cleanup Script for PLF App
-- Deletes all data except superuser accounts
-- Run this in Supabase SQL Editor: https://zdnyhzasvifrskbostgn.supabase.co/project/default/sql

-- WARNING: This will permanently delete all member, transaction, loan, and interest data
-- Only superuser accounts in the users table will be preserved

-- Step 1: Check current data counts
SELECT 'Before deletion - counting records' as status;
SELECT 'users' as table_name, COUNT(*) as record_count FROM users
UNION ALL
SELECT 'members', COUNT(*) FROM members
UNION ALL
SELECT 'transactions', COUNT(*) FROM transactions
UNION ALL
SELECT 'loans', COUNT(*) FROM loans
UNION ALL
SELECT 'interest_accruals', COUNT(*) FROM interest_accruals;

-- Step 2: Temporarily disable RLS on all tables
SELECT 'Disabling RLS on tables...' as status;
ALTER TABLE members DISABLE ROW LEVEL SECURITY;
ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE loans DISABLE ROW LEVEL SECURITY;
ALTER TABLE interest_accruals DISABLE ROW LEVEL SECURITY;

-- Step 3: Delete data in proper order to respect foreign key constraints
SELECT 'Deleting data from related tables...' as status;

-- Delete from interest_accruals first (likely has foreign keys to other tables)
DELETE FROM interest_accruals;

-- Delete from transactions
DELETE FROM transactions;

-- Delete from loans  
DELETE FROM loans;

-- Delete from members (this will cascade to any related data if foreign keys are set up)
DELETE FROM members;

-- Step 4: Verify only superuser accounts remain in users table
SELECT 'Verifying superuser accounts remain...' as status;
SELECT uid, email, role, created_at 
FROM users 
WHERE role = 'superuser'
ORDER BY created_at;

-- Step 5: Re-enable RLS on all tables
SELECT 'Re-enabling RLS on tables...' as status;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE interest_accruals ENABLE ROW LEVEL SECURITY;

-- Step 6: Verify data deletion
SELECT 'After deletion - counting records' as status;
SELECT 'users' as table_name, COUNT(*) as record_count FROM users
UNION ALL
SELECT 'members', COUNT(*) FROM members
UNION ALL
SELECT 'transactions', COUNT(*) FROM transactions
UNION ALL
SELECT 'loans', COUNT(*) FROM loans
UNION ALL
SELECT 'interest_accruals', COUNT(*) FROM interest_accruals;

-- Step 7: Final verification
SELECT 'Cleanup completed successfully!' as status;
SELECT 'Superuser accounts preserved:' as note;
SELECT uid, email, role FROM users WHERE role = 'superuser';

-- Optional: If you want to see all remaining users (should only be superusers)
-- SELECT uid, email, role, created_at FROM users ORDER BY role, created_at;
