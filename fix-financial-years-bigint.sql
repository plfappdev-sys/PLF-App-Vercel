-- SQL Script to Fix Financial Years Table - BigInt Issue
-- Created: October 22, 2025

-- The issue: created_by is bigint type, not UUID
-- We need to use a valid user ID (bigint) instead of UUID

-- Option 1: Use the first superuser ID
UPDATE financial_years 
SET created_by = (
    SELECT id FROM users WHERE role = 'superuser' LIMIT 1
) 
WHERE created_by IS NULL;

-- Option 2: If no superuser exists, use the first user ID
-- UPDATE financial_years 
-- SET created_by = (
--     SELECT id FROM users LIMIT 1
-- ) 
-- WHERE created_by IS NULL;

-- Verify the fix
SELECT id, created_by FROM financial_years LIMIT 5;
