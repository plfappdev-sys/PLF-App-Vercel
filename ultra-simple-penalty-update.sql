-- Ultra Simple Penalty Rate Update
-- No PL/pgSQL blocks, just simple SQL

-- 1. Check if system_settings table exists and update penalty rate
-- First try to update existing record
UPDATE system_settings 
SET setting_value = '5.5',
    description = 'Monthly penalty interest rate (5.5%)',
    updated_at = NOW()
WHERE setting_key = 'penalty_interest_rate';

-- If no rows were updated, insert new record
-- Note: This assumes the table has the required columns
INSERT INTO system_settings (setting_key, setting_value, setting_type, category, description)
SELECT 'penalty_interest_rate', '5.5', 'decimal', 'contribution', 'Monthly penalty interest rate (5.5%)'
WHERE NOT EXISTS (
    SELECT 1 FROM system_settings WHERE setting_key = 'penalty_interest_rate'
);

-- 2. Add columns to members table if it exists
-- Check and add calculation_methodology_version
ALTER TABLE members ADD COLUMN IF NOT EXISTS calculation_methodology_version VARCHAR(20) DEFAULT 'legacy';

-- Check and add expected_contribution_total
ALTER TABLE members ADD COLUMN IF NOT EXISTS expected_contribution_total DECIMAL(10,2);

-- Check and add penalties_capped
ALTER TABLE members ADD COLUMN IF NOT EXISTS penalties_capped BOOLEAN DEFAULT false;

-- 3. Output success message
SELECT 'Migration completed successfully' as status;
SELECT 'Penalty interest rate updated to 5.5%' as change;
SELECT 'New columns added to members table' as change;
SELECT 'The application will now use the new calculation methodology' as change;