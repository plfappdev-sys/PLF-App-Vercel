-- Disable RLS on users table for development
-- This is a temporary solution to allow user creation during development
-- In production, proper RLS policies should be implemented

ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'users';
