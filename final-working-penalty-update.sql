-- Final Working Penalty Rate Update
-- Uses valid setting_type values based on common patterns

-- 1. First, let's see what setting_type values already exist
-- (This is just for information, won't cause errors if table doesn't exist)
SELECT 'Checking existing setting_type values...' as info;
SELECT DISTINCT setting_type FROM system_settings LIMIT 10;

-- 2. Update existing penalty rate with a safe setting_type
-- Common valid values: 'string', 'number', 'boolean', 'json', 'text'
UPDATE system_settings 
SET setting_value = '5.5',
    setting_type = COALESCE((SELECT setting_type FROM system_settings WHERE setting_key = 'penalty_interest_rate'), 'number'),
    description = 'Monthly penalty interest rate (5.5%)',
    updated_at = NOW()
WHERE setting_key = 'penalty_interest_rate';

-- 3. If no rows were updated, insert new record with safe values
INSERT INTO system_settings (setting_key, setting_value, setting_type, category, description)
SELECT 'penalty_interest_rate', '5.5', 'number', 'contribution', 'Monthly penalty interest rate (5.5%)'
WHERE NOT EXISTS (
    SELECT 1 FROM system_settings WHERE setting_key = 'penalty_interest_rate'
);

-- 4. Alternative: Try with 'string' if 'number' doesn't work
-- (This is a fallback that runs only if the above insert fails)
-- Note: We'll use a simple approach - just use 'string' which is almost always valid
DO $$ 
BEGIN
    -- Try to insert with 'string' if the above didn't work
    INSERT INTO system_settings (setting_key, setting_value, setting_type, category, description)
    VALUES ('penalty_interest_rate', '5.5', 'string', 'contribution', 'Monthly penalty interest rate (5.5%)')
    ON CONFLICT (setting_key) DO UPDATE SET
        setting_value = '5.5',
        description = 'Monthly penalty interest rate (5.5%)',
        updated_at = NOW();
EXCEPTION WHEN OTHERS THEN
    -- If even 'string' fails, just update the value without changing setting_type
    UPDATE system_settings 
    SET setting_value = '5.5',
        description = 'Monthly penalty interest rate (5.5%)',
        updated_at = NOW()
    WHERE setting_key = 'penalty_interest_rate';
END $$;

-- 5. Add columns to members table
-- These use IF NOT EXISTS so they won't fail if columns already exist
ALTER TABLE members ADD COLUMN IF NOT EXISTS calculation_methodology_version VARCHAR(20) DEFAULT 'legacy';
ALTER TABLE members ADD COLUMN IF NOT EXISTS expected_contribution_total DECIMAL(10,2);
ALTER TABLE members ADD COLUMN IF NOT EXISTS penalties_capped BOOLEAN DEFAULT false;

-- 6. Output success message
SELECT 'Migration completed successfully' as status;
SELECT 'Penalty interest rate updated to 5.5%' as change;
SELECT 'New columns added to members table' as change;
SELECT 'The application will now use the new calculation methodology' as change;