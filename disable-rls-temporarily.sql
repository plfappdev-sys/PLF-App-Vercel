-- Temporarily disable RLS on users table for testing
-- WARNING: This should only be used for development/testing

-- Check current RLS status
SELECT 
    table_name, 
    row_security 
FROM information_schema.tables 
WHERE table_name = 'users';

-- Disable RLS on users table
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT 
    table_name, 
    row_security 
FROM information_schema.tables 
WHERE table_name = 'users';

-- Test insert without RLS
INSERT INTO users (email, role, uid) 
VALUES ('test@example.com', 'member', '12345678-1234-5678-9abc-def012345678')
RETURNING *;

-- Show all users to verify insert worked
SELECT * FROM users;

-- IMPORTANT: Re-enable RLS after testing
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;
