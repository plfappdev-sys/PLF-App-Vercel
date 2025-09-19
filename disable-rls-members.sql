-- Temporarily disable RLS on members table for development
-- WARNING: This should only be used for development/testing

-- Check current RLS status
SELECT 
    table_name, 
    row_security 
FROM information_schema.tables 
WHERE table_name = 'members';

-- Disable RLS on members table
ALTER TABLE members DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT 
    table_name, 
    row_security 
FROM information_schema.tables 
WHERE table_name = 'members';

-- Test access without RLS
SELECT count(*) FROM members;

-- IMPORTANT: Re-enable RLS after testing
-- ALTER TABLE members ENABLE ROW LEVEL SECURITY;
