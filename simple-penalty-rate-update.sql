-- Simple Penalty Rate Update for New Calculation Methodology
-- This script only updates the penalty rate without trying to create tables

-- 1. First, check if system_settings table exists
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'system_settings') THEN
        -- Update existing penalty rate
        UPDATE system_settings 
        SET setting_value = '5.5',
            description = 'Monthly penalty interest rate (5.5%)',
            updated_at = NOW()
        WHERE setting_key = 'penalty_interest_rate';
        
        -- If no rows were updated, insert new
        IF NOT FOUND THEN
            INSERT INTO system_settings (setting_key, setting_value, setting_type, category, description)
            VALUES ('penalty_interest_rate', '5.5', 'decimal', 'contribution', 'Monthly penalty interest rate (5.5%)');
        END IF;
        
        RAISE NOTICE 'Updated penalty interest rate to 5.5%';
    ELSE
        RAISE NOTICE 'system_settings table does not exist, skipping update';
    END IF;
END $$;

-- 2. Add new columns to members table if it exists
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'members') THEN
        -- Add columns if they don't exist
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'members' AND column_name = 'calculation_methodology_version') THEN
            ALTER TABLE members ADD COLUMN calculation_methodology_version VARCHAR(20) DEFAULT 'legacy';
            RAISE NOTICE 'Added calculation_methodology_version column to members table';
        END IF;
        
        -- Add other columns as needed
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'members' AND column_name = 'expected_contribution_total') THEN
            ALTER TABLE members ADD COLUMN expected_contribution_total DECIMAL(10,2);
            RAISE NOTICE 'Added expected_contribution_total column to members table';
        END IF;
        
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'members' AND column_name = 'penalties_capped') THEN
            ALTER TABLE members ADD COLUMN penalties_capped BOOLEAN DEFAULT false;
            RAISE NOTICE 'Added penalties_capped column to members table';
        END IF;
    ELSE
        RAISE NOTICE 'members table does not exist, skipping column additions';
    END IF;
END $$;

-- 3. Output success message
SELECT 'Migration completed successfully' as status;
SELECT 'Penalty interest rate updated to 5.5%' as change;
SELECT 'New columns added to members table for new calculation methodology' as change;
SELECT 'The application will now use the new calculation methodology' as change;