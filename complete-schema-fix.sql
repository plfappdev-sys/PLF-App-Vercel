-- Complete SQL Script to Add ALL Missing Columns
-- Generated: October 22, 2025

ALTER TABLE members ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
UPDATE members SET updated_at = NOW() WHERE updated_at IS NULL;

-- Verify all columns were added
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'members' 
ORDER BY column_name;
