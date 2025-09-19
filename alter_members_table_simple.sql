-- Simple SQL script to alter existing members table
-- This version doesn't use DO blocks for better compatibility

-- First, check the current table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'members' 
ORDER BY ordinal_position;

-- Add missing columns (run these one by one if needed)

-- 1. Add member_number column
ALTER TABLE members ADD COLUMN IF NOT EXISTS member_number TEXT UNIQUE;

-- 2. Add personal_info JSONB column  
ALTER TABLE members ADD COLUMN IF NOT EXISTS personal_info JSONB DEFAULT '{}'::jsonb;

-- 3. Add financial_info JSONB column
ALTER TABLE members ADD COLUMN IF NOT EXISTS financial_info JSONB DEFAULT '{
    "total_contributions": 0,
    "current_balance": 0,
    "outstanding_amount": 0,
    "percentage_outstanding": 0,
    "balance_brought_forward": 0,
    "planned_contributions": 0,
    "actual_contributions": 0,
    "current_interest_earned": 0,
    "total_interest_earned": 0,
    "current_interest_charged": 0,
    "total_interest_charged": 0,
    "interest_rate": 5.5
}'::jsonb;

-- 4. Add membership_status JSONB column
ALTER TABLE members ADD COLUMN IF NOT EXISTS membership_status JSONB DEFAULT '{
    "isActive": true,
    "standingCategory": "good"
}'::jsonb;

-- 5. Add interest_settings JSONB column
ALTER TABLE members ADD COLUMN IF NOT EXISTS interest_settings JSONB DEFAULT '{
    "calculationMethod": "daily",
    "compounding": true,
    "taxDeduction": 0
}'::jsonb;

-- 6. Add contribution_history JSONB column
ALTER TABLE members ADD COLUMN IF NOT EXISTS contribution_history JSONB DEFAULT '[]'::jsonb;

-- 7. Add loan_history JSONB column
ALTER TABLE members ADD COLUMN IF NOT EXISTS loan_history JSONB DEFAULT '[]'::jsonb;

-- 8. Add interest_history JSONB column
ALTER TABLE members ADD COLUMN IF NOT EXISTS interest_history JSONB DEFAULT '[]'::jsonb;

-- 9. Add join_date timestamp column (THIS IS THE MISSING COLUMN)
ALTER TABLE members ADD COLUMN IF NOT EXISTS join_date TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 10. Add last_updated timestamp column
ALTER TABLE members ADD COLUMN IF NOT EXISTS last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Verify all columns were added
SELECT 'Table alteration completed successfully' as status;

-- Check the final table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'members' 
ORDER BY ordinal_position;
