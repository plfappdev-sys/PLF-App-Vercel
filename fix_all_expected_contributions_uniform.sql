-- Fix all expected contributions to uniform 17400 for all members
-- This script sets the expected_contribution to 17400 for ALL members
-- regardless of join date or other factors

-- First, check current expected contributions
SELECT 
    member_number,
    name,
    expected_contribution,
    join_date,
    monthly_contribution_rate
FROM members 
WHERE expected_contribution != 17400
ORDER BY member_number;

-- Update all members to have expected_contribution = 17400
UPDATE members 
SET expected_contribution = 17400
WHERE expected_contribution != 17400 OR expected_contribution IS NULL;

-- Verify the update
SELECT 
    COUNT(*) as total_members,
    COUNT(CASE WHEN expected_contribution = 17400 THEN 1 END) as correct_expected,
    COUNT(CASE WHEN expected_contribution != 17400 THEN 1 END) as incorrect_expected,
    COUNT(CASE WHEN expected_contribution IS NULL THEN 1 END) as null_expected
FROM members;

-- Show a sample of updated members
SELECT 
    member_number,
    name,
    expected_contribution,
    join_date
FROM members 
ORDER BY member_number
LIMIT 10;