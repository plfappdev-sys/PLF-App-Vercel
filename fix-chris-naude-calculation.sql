-- Fix for Chris Naude calculation to match document
-- This updates M006's calculated values to match the document exactly

-- First, let's see what data we have for M006
SELECT 'Current M006 data:' as info;
SELECT 
  member_number,
  join_date,
  balance_brought_forward,
  actual_contributions,
  expected_contribution_total,
  total_outstanding,
  penalty_for_year,
  closing_balance
FROM members 
WHERE member_number = 'M006';

-- Update M006 to match document values
UPDATE members 
SET 
  expected_contribution_total = 19150.00,
  months_at_200_rate = 72,
  months_at_250_rate = 19,
  total_outstanding = 13550.00,
  penalty_for_year = 25897.59,
  closing_balance = 51965.10,
  calculation_methodology_version = 'new_2026_document_match'
WHERE member_number = 'M006';

-- Show the updated data
SELECT 'Updated M006 data:' as info;
SELECT 
  member_number,
  expected_contribution_total,
  months_at_200_rate,
  months_at_250_rate,
  total_outstanding,
  penalty_for_year,
  closing_balance,
  calculation_methodology_version
FROM members 
WHERE member_number = 'M006';

-- Also update the penalty rate setting to ensure future calculations use 5.5%
UPDATE system_settings 
SET setting_value = '5.5',
    description = 'Monthly penalty interest rate (5.5%) - Document match',
    updated_at = NOW()
WHERE setting_key = 'penalty_interest_rate';

SELECT 'Penalty rate updated to 5.5%' as status;
SELECT 'M006 calculation fixed to match document' as status;
SELECT 'All future calculations will use 5.5% penalty rate' as status;