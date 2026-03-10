
-- Database Migration for New Calculation Methodology
-- Created: 2026-02-12T12:53:01.187Z

-- 1. Update penalty interest rate in system settings
INSERT INTO system_settings (key, value, description, created_at, updated_at)
VALUES 
  ('penalty_interest_rate', '5.5', 'Monthly penalty interest rate (5.5%)', NOW(), NOW())
ON CONFLICT (key) DO UPDATE SET 
  value = EXCLUDED.value,
  description = EXCLUDED.description,
  updated_at = NOW();

-- 2. Add new columns to members table for new calculation methodology
ALTER TABLE members 
ADD COLUMN IF NOT EXISTS expected_contribution_total DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS months_at_200_rate INTEGER,
ADD COLUMN IF NOT EXISTS months_at_250_rate INTEGER,
ADD COLUMN IF NOT EXISTS estimated_12_months_contribution DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS total_12_months_contribution DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS total_outstanding DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS penalty_for_year DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS penalties_capped BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS calculation_methodology_version VARCHAR(20) DEFAULT 'legacy';

-- 3. Update existing members with new calculation methodology
-- This would be done by the application, not in SQL
-- The NewCalculationService will populate these fields

-- 4. Create index for performance
CREATE INDEX IF NOT EXISTS idx_members_calculation_version ON members(calculation_methodology_version);

-- 5. Update contribution service configuration
INSERT INTO service_configurations (service_name, config_key, config_value, description)
VALUES 
  ('ContributionService', 'penalty_rate', '5.5', 'Monthly penalty interest rate (5.5%)'),
  ('ContributionService', 'calculation_methodology', 'new_2026', 'New calculation methodology from 2026-01-29'),
  ('ContributionService', 'rate_200_start_date', '2018-06-01', 'Start date for R200 monthly rate'),
  ('ContributionService', 'rate_200_end_date', '2024-06-30', 'End date for R200 monthly rate'),
  ('ContributionService', 'rate_250_start_date', '2024-07-01', 'Start date for R250 monthly rate'),
  ('ContributionService', 'penalty_cap_start_date', '2018-01-01', 'Start date for penalty capping'),
  ('ContributionService', 'penalty_cap_end_date', '2024-11-30', 'End date for penalty capping')
ON CONFLICT (service_name, config_key) DO UPDATE SET 
  config_value = EXCLUDED.config_value,
  description = EXCLUDED.description,
  updated_at = NOW();

-- 6. Create audit log entry
INSERT INTO audit_logs (action, entity_type, entity_id, details, performed_by, performed_at)
VALUES (
  'SYSTEM_UPDATE',
  'CALCULATION_METHODOLOGY',
  'ALL',
  '{"action": "Updated calculation methodology to new 2026 version", "changes": ["5.5% penalty rate", "R200 × 72 + R250 × 19 expected contributions", "Penalty capping 2018-2024 Nov"]}',
  'system',
  NOW()
);

COMMIT;

-- Migration completed successfully
SELECT 'Migration completed successfully' as status;
