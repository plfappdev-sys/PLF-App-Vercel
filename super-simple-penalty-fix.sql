-- Super Simple Penalty Fix
-- Just updates the value, doesn't try to insert or change setting_type

-- 1. Update the penalty interest rate if it exists
UPDATE system_settings 
SET setting_value = '5.5',
    description = 'Monthly penalty interest rate (5.5%)',
    updated_at = NOW()
WHERE setting_key = 'penalty_interest_rate';

-- 2. If the update didn't affect any rows, the setting doesn't exist
-- In that case, we'll just note it and move on
SELECT 
  CASE 
    WHEN (SELECT COUNT(*) FROM system_settings WHERE setting_key = 'penalty_interest_rate') > 0 
    THEN 'Penalty rate updated to 5.5%'
    ELSE 'Penalty rate setting does not exist, using default 5.5% in application'
  END as status;

-- 3. Add columns to members table if they don't exist
-- These won't fail even if columns already exist
ALTER TABLE members ADD COLUMN IF NOT EXISTS calculation_methodology_version VARCHAR(20) DEFAULT 'legacy';
ALTER TABLE members ADD COLUMN IF NOT EXISTS expected_contribution_total DECIMAL(10,2);
ALTER TABLE members ADD COLUMN IF NOT EXISTS penalties_capped BOOLEAN DEFAULT false;

-- 4. Output final message
SELECT 'Migration steps completed' as result;
SELECT '1. Penalty rate updated to 5.5% (if setting exists)' as step;
SELECT '2. New columns added to members table' as step;
SELECT '3. Application ready for new calculation methodology' as step;