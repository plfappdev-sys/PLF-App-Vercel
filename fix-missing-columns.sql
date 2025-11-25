-- SQL Script to Add Missing Columns to Members Table
-- Created: October 22, 2025
-- Purpose: Add columns needed for Excel data import

-- Add name column (from Excel "Member")
ALTER TABLE members 
ADD COLUMN IF NOT EXISTS name VARCHAR(255);

-- Add membership_fee column
ALTER TABLE members 
ADD COLUMN IF NOT EXISTS membership_fee DECIMAL(10,2) DEFAULT 0.00;

-- Add closing_balance column (from Excel "Closing Balance")
ALTER TABLE members 
ADD COLUMN IF NOT EXISTS closing_balance DECIMAL(10,2) DEFAULT 0.00;

-- Add share_value column (from Excel "Share Value")
ALTER TABLE members 
ADD COLUMN IF NOT EXISTS share_value DECIMAL(10,2) DEFAULT 0.00;

-- Add date_joined column (from Excel "Date Join")
-- Note: Using 'date_joined' instead of 'join_date' which already exists
ALTER TABLE members 
ADD COLUMN IF NOT EXISTS date_joined DATE;

-- Update existing join_date to date_joined if needed
UPDATE members 
SET date_joined = join_date 
WHERE date_joined IS NULL AND join_date IS NOT NULL;

-- Verify the changes
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'members' 
    AND column_name IN ('name', 'membership_fee', 'closing_balance', 'share_value', 'date_joined')
ORDER BY column_name;
