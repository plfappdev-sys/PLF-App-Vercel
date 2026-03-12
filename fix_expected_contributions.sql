-- Fix Expected Contributions for all members
-- Set expected_contribution to 17400 for all members
UPDATE members 
SET expected_contribution = 17400
WHERE expected_contribution IS NOT NULL;

-- Also update expected_contribution_total to match
UPDATE members 
SET expected_contribution_total = 17400
WHERE expected_contribution_total IS NOT NULL;

-- For members with NULL expected_contribution, set to 17400
UPDATE members 
SET expected_contribution = 17400
WHERE expected_contribution IS NULL;

UPDATE members 
SET expected_contribution_total = 17400
WHERE expected_contribution_total IS NULL;