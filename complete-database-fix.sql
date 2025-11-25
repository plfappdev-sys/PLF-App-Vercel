-- COMPLETE SQL SCRIPT TO FIX ALL MISSING COLUMNS
-- Generated: October 22, 2025

ALTER TABLE member_balances ADD COLUMN IF NOT EXISTS id VARCHAR(255);
ALTER TABLE member_balances ADD COLUMN IF NOT EXISTS member_id VARCHAR(255);
ALTER TABLE member_balances ADD COLUMN IF NOT EXISTS available_funds DECIMAL(15,2) DEFAULT 0.00;
ALTER TABLE member_balances ADD COLUMN IF NOT EXISTS total_balance DECIMAL(15,2) DEFAULT 0.00;
ALTER TABLE member_balances ADD COLUMN IF NOT EXISTS created_at VARCHAR(255);
ALTER TABLE member_balances ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
UPDATE members SET updated_at = NOW() WHERE updated_at IS NULL;
UPDATE member_balances SET updated_at = NOW() WHERE updated_at IS NULL;
UPDATE financial_years SET updated_at = NOW() WHERE updated_at IS NULL;
UPDATE system_settings SET updated_at = NOW() WHERE updated_at IS NULL;
UPDATE financial_years SET created_by = (SELECT id FROM users WHERE role = 'superuser' LIMIT 1) WHERE created_by IS NULL;

-- Verify all tables and columns

-- members table columns:
SELECT column_name FROM information_schema.columns WHERE table_name = 'members' ORDER BY column_name;

-- member_balances table columns:
SELECT column_name FROM information_schema.columns WHERE table_name = 'member_balances' ORDER BY column_name;

-- financial_years table columns:
SELECT column_name FROM information_schema.columns WHERE table_name = 'financial_years' ORDER BY column_name;

-- system_settings table columns:
SELECT column_name FROM information_schema.columns WHERE table_name = 'system_settings' ORDER BY column_name;
