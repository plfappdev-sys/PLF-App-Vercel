-- SQL Script to Add Missing Name Column to Members Table
-- Created: October 22, 2025
-- Purpose: Add name column needed for Excel data import

-- Add name column (from Excel "Member")
ALTER TABLE members 
ADD COLUMN IF NOT EXISTS name VARCHAR(255);

-- Verify the column was added
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'members' 
    AND column_name = 'name';
