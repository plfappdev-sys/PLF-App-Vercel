-- Add ALL missing columns to users table
-- This script adds all required columns for the PLF application

-- Check and add account_status column
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'account_status'
    ) THEN
        ALTER TABLE users ADD COLUMN account_status JSONB DEFAULT '{"isActive": true, "isVerified": false}'::jsonb;
        RAISE NOTICE 'Added account_status column to users table';
    ELSE
        RAISE NOTICE 'account_status column already exists in users table';
    END IF;
END $$;

-- Check and add personal_info column
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'personal_info'
    ) THEN
        ALTER TABLE users ADD COLUMN personal_info JSONB DEFAULT '{}'::jsonb;
        RAISE NOTICE 'Added personal_info column to users table';
    ELSE
        RAISE NOTICE 'personal_info column already exists in users table';
    END IF;
END $$;

-- Check and add memberNumber column
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'memberNumber'
    ) THEN
        ALTER TABLE users ADD COLUMN memberNumber TEXT UNIQUE;
        CREATE INDEX IF NOT EXISTS idx_users_member_number ON users(memberNumber);
        RAISE NOTICE 'Added memberNumber column to users table';
    ELSE
        RAISE NOTICE 'memberNumber column already exists in users table';
    END IF;
END $$;

-- Check and add membership_info column
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'membership_info'
    ) THEN
        ALTER TABLE users ADD COLUMN membership_info JSONB DEFAULT '{}'::jsonb;
        RAISE NOTICE 'Added membership_info column to users table';
    ELSE
        RAISE NOTICE 'membership_info column already exists in users table';
    END IF;
END $$;

-- Check and add created_by column
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'created_by'
    ) THEN
        ALTER TABLE users ADD COLUMN created_by UUID;
        RAISE NOTICE 'Added created_by column to users table';
    ELSE
        RAISE NOTICE 'created_by column already exists in users table';
    END IF;
END $$;

-- Check and add updated_at column if missing
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'updated_at'
    ) THEN
        ALTER TABLE users ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();
        RAISE NOTICE 'Added updated_at column to users table';
    ELSE
        RAISE NOTICE 'updated_at column already exists in users table';
    END IF;
END $$;

-- Show final users table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;
