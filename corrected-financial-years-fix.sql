-- CORRECTED SQL FOR FINANCIAL_YEARS FIX
-- The issue: created_by is bigint type, cannot compare with empty string ''

-- Option 1: Only update NULL values (safer)
UPDATE financial_years 
SET created_by = (
    SELECT id FROM users WHERE role = 'superuser' LIMIT 1
) 
WHERE created_by IS NULL;

-- Option 2: If there are invalid values that need to be fixed, use this instead:
-- First check what values exist
-- SELECT DISTINCT created_by FROM financial_years;

-- If there are invalid values, you might need to:
-- 1. Set them to NULL first, then update
-- UPDATE financial_years SET created_by = NULL WHERE created_by = '';
-- UPDATE financial_years SET created_by = (SELECT id FROM users WHERE role = 'superuser' LIMIT 1) WHERE created_by IS NULL;

-- Verify the fix worked
SELECT id, created_by FROM financial_years LIMIT 5;
