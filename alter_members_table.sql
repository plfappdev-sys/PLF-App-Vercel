-- SQL script to alter existing members table to add missing columns
-- Use this if you have an existing members table but it's missing required columns

-- First, check if the table exists and what columns it has
-- You can run this in Supabase SQL Editor to see current structure:
-- SELECT column_name, data_type, is_nullable 
-- FROM information_schema.columns 
-- WHERE table_name = 'members' 
-- ORDER BY ordinal_position;

-- Add member_number column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'members' AND column_name = 'member_number'
    ) THEN
        ALTER TABLE members ADD COLUMN member_number TEXT UNIQUE;
        RAISE NOTICE 'Added member_number column';
    ELSE
        RAISE NOTICE 'member_number column already exists';
    END IF;
END $$;

-- Add personal_info JSONB column
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'members' AND column_name = 'personal_info'
    ) THEN
        ALTER TABLE members ADD COLUMN personal_info JSONB DEFAULT '{}'::jsonb;
        RAISE NOTICE 'Added personal_info column';
    ELSE
        RAISE NOTICE 'personal_info column already exists';
    END IF;
END $$;

-- Add financial_info JSONB column
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'members' AND column_name = 'financial_info'
    ) THEN
        ALTER TABLE members ADD COLUMN financial_info JSONB DEFAULT '{
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
        RAISE NOTICE 'Added financial_info column';
    ELSE
        RAISE NOTICE 'financial_info column already exists';
    END IF;
END $$;

-- Add membership_status JSONB column
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'members' AND column_name = 'membership_status'
    ) THEN
        ALTER TABLE members ADD COLUMN membership_status JSONB DEFAULT '{
            "isActive": true,
            "standingCategory": "good"
        }'::jsonb;
        RAISE NOTICE 'Added membership_status column';
    ELSE
        RAISE NOTICE 'membership_status column already exists';
    END IF;
END $$;

-- Add interest_settings JSONB column
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'members' AND column_name = 'interest_settings'
    ) THEN
        ALTER TABLE members ADD COLUMN interest_settings JSONB DEFAULT '{
            "calculationMethod": "daily",
            "compounding": true,
            "taxDeduction": 0
        }'::jsonb;
        RAISE NOTICE 'Added interest_settings column';
    ELSE
        RAISE NOTICE 'interest_settings column already exists';
    END IF;
END $$;

-- Add contribution_history JSONB column
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'members' AND column_name = 'contribution_history'
    ) THEN
        ALTER TABLE members ADD COLUMN contribution_history JSONB DEFAULT '[]'::jsonb;
        RAISE NOTICE 'Added contribution_history column';
    ELSE
        RAISE NOTICE 'contribution_history column already exists';
    END IF;
END $$;

-- Add loan_history JSONB column
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'members' AND column_name = 'loan_history'
    ) THEN
        ALTER TABLE members ADD COLUMN loan_history JSONB DEFAULT '[]'::jsonb;
        RAISE NOTICE 'Added loan_history column';
    ELSE
        RAISE NOTICE 'loan_history column already exists';
    END IF;
END $$;

-- Add interest_history JSONB column
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'members' AND column_name = 'interest_history'
    ) THEN
        ALTER TABLE members ADD COLUMN interest_history JSONB DEFAULT '[]'::jsonb;
        RAISE NOTICE 'Added interest_history column';
    ELSE
        RAISE NOTICE 'interest_history column already exists';
    END IF;
END $$;

-- Add join_date timestamp column
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'members' AND column_name = 'join_date'
    ) THEN
        ALTER TABLE members ADD COLUMN join_date TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        RAISE NOTICE 'Added join_date column';
    ELSE
        RAISE NOTICE 'join_date column already exists';
    END IF;
END $$;

-- Add last_updated timestamp column
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'members' AND column_name = 'last_updated'
    ) THEN
        ALTER TABLE members ADD COLUMN last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        RAISE NOTICE 'Added last_updated column';
    ELSE
        RAISE NOTICE 'last_updated column already exists';
    END IF;
END $$;

-- Verify the changes
SELECT 'Table alteration completed successfully' as status;

-- Check the final table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'members' 
ORDER BY ordinal_position;
