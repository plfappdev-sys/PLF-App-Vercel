-- Database Migration for New Calculation Methodology - Fixed Version
-- Created: 2026-02-12T12:59:31.000Z
-- This version focuses on essential changes only

-- 1. First, check if system_settings table exists and create it if needed
DO $$ 
BEGIN
    -- Check if system_settings table exists
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'system_settings') THEN
        -- Create system_settings table
        CREATE TABLE system_settings (
            id SERIAL PRIMARY KEY,
            setting_key VARCHAR(100) UNIQUE NOT NULL,
            setting_value TEXT,
            description TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Create index
        CREATE INDEX idx_system_settings_key ON system_settings(setting_key);
        
        RAISE NOTICE 'Created system_settings table';
    END IF;
END $$;

-- 2. Update or insert penalty interest rate
INSERT INTO system_settings (setting_key, setting_value, description, created_at, updated_at)
VALUES 
  ('penalty_interest_rate', '5.5', 'Monthly penalty interest rate (5.5%)', NOW(), NOW())
ON CONFLICT (setting_key) DO UPDATE SET 
  setting_value = EXCLUDED.setting_value,
  description = EXCLUDED.description,
  updated_at = NOW();

-- 3. Add new columns to members table for new calculation methodology
DO $$ 
BEGIN
    -- Check if members table exists
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'members') THEN
        -- Add columns if they don't exist
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'members' AND column_name = 'expected_contribution_total') THEN
            ALTER TABLE members ADD COLUMN expected_contribution_total DECIMAL(10,2);
        END IF;
        
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'members' AND column_name = 'months_at_200_rate') THEN
            ALTER TABLE members ADD COLUMN months_at_200_rate INTEGER;
        END IF;
        
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'members' AND column_name = 'months_at_250_rate') THEN
            ALTER TABLE members ADD COLUMN months_at_250_rate INTEGER;
        END IF;
        
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'members' AND column_name = 'estimated_12_months_contribution') THEN
            ALTER TABLE members ADD COLUMN estimated_12_months_contribution DECIMAL(10,2);
        END IF;
        
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'members' AND column_name = 'total_12_months_contribution') THEN
            ALTER TABLE members ADD COLUMN total_12_months_contribution DECIMAL(10,2);
        END IF;
        
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'members' AND column_name = 'total_outstanding') THEN
            ALTER TABLE members ADD COLUMN total_outstanding DECIMAL(10,2);
        END IF;
        
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'members' AND column_name = 'penalty_for_year') THEN
            ALTER TABLE members ADD COLUMN penalty_for_year DECIMAL(10,2);
        END IF;
        
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'members' AND column_name = 'penalties_capped') THEN
            ALTER TABLE members ADD COLUMN penalties_capped BOOLEAN DEFAULT false;
        END IF;
        
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'members' AND column_name = 'calculation_methodology_version') THEN
            ALTER TABLE members ADD COLUMN calculation_methodology_version VARCHAR(20) DEFAULT 'legacy';
        END IF;
        
        RAISE NOTICE 'Added new columns to members table';
    ELSE
        RAISE NOTICE 'Members table does not exist, skipping column additions';
    END IF;
END $$;

-- 4. Create index for performance if it doesn't exist
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'members') THEN
        IF NOT EXISTS (SELECT FROM pg_indexes WHERE tablename = 'members' AND indexname = 'idx_members_calculation_version') THEN
            CREATE INDEX idx_members_calculation_version ON members(calculation_methodology_version);
            RAISE NOTICE 'Created index idx_members_calculation_version';
        END IF;
    END IF;
END $$;

-- 5. Create or update configuration in a simple settings table
-- First ensure we have the basic configuration
INSERT INTO system_settings (setting_key, setting_value, description, created_at, updated_at)
VALUES 
  ('contribution_penalty_rate', '5.5', 'Monthly penalty interest rate (5.5%)', NOW(), NOW()),
  ('calculation_methodology', 'new_2026', 'New calculation methodology from 2026-01-29', NOW(), NOW()),
  ('rate_200_start_date', '2018-06-01', 'Start date for R200 monthly rate', NOW(), NOW()),
  ('rate_200_end_date', '2024-06-30', 'End date for R200 monthly rate', NOW(), NOW()),
  ('rate_250_start_date', '2024-07-01', 'Start date for R250 monthly rate', NOW(), NOW()),
  ('penalty_cap_start_date', '2018-01-01', 'Start date for penalty capping', NOW(), NOW()),
  ('penalty_cap_end_date', '2024-11-30', 'End date for penalty capping', NOW(), NOW())
ON CONFLICT (setting_key) DO UPDATE SET 
  setting_value = EXCLUDED.setting_value,
  description = EXCLUDED.description,
  updated_at = NOW();

-- 6. Create audit_logs table if it doesn't exist and add entry
DO $$ 
BEGIN
    -- Check if audit_logs table exists
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'audit_logs') THEN
        -- Create audit_logs table
        CREATE TABLE audit_logs (
            id SERIAL PRIMARY KEY,
            action VARCHAR(100) NOT NULL,
            entity_type VARCHAR(100),
            entity_id VARCHAR(100),
            details JSONB,
            performed_by VARCHAR(100),
            performed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Create index
        CREATE INDEX idx_audit_logs_performed_at ON audit_logs(performed_at);
        
        RAISE NOTICE 'Created audit_logs table';
    END IF;
    
    -- Insert audit log entry
    INSERT INTO audit_logs (action, entity_type, entity_id, details, performed_by, performed_at)
    VALUES (
      'SYSTEM_UPDATE',
      'CALCULATION_METHODOLOGY',
      'ALL',
      '{"action": "Updated calculation methodology to new 2026 version", "changes": ["5.5% penalty rate", "R200 × 72 + R250 × 19 expected contributions", "Penalty capping 2018-2024 Nov"]}',
      'system',
      NOW()
    );
    
    RAISE NOTICE 'Added audit log entry';
END $$;

-- 7. Output success message
SELECT 'Migration completed successfully' as status;

-- Show what was changed
SELECT 'Summary of changes:' as message;
SELECT '1. Created/updated system_settings table with new penalty rate (5.5%)' as change;
SELECT '2. Added new columns to members table for new calculation methodology' as change;
SELECT '3. Created/updated configuration settings' as change;
SELECT '4. Created audit log entry' as change;
SELECT '5. The application will now use the new calculation methodology' as change;