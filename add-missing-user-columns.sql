-- Add missing columns to users table for complete Supabase integration
-- This adds all the columns referenced in the UserService and SupabaseAuthContext

-- Add accountStatus column (JSONB for flexible structure)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'accountStatus'
    ) THEN
        ALTER TABLE users ADD COLUMN accountStatus JSONB NOT NULL DEFAULT '{
            "isActive": true,
            "isVerified": false,
            "verificationDocuments": {
                "verificationStatus": "pending"
            }
        }'::jsonb;
        RAISE NOTICE 'Added accountStatus column to users table';
    ELSE
        RAISE NOTICE 'accountStatus column already exists in users table';
    END IF;
END $$;

-- Add memberNumber column (for existing member linking)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'memberNumber'
    ) THEN
        ALTER TABLE users ADD COLUMN memberNumber TEXT;
        CREATE INDEX IF NOT EXISTS idx_users_member_number ON users(memberNumber);
        RAISE NOTICE 'Added memberNumber column to users table';
    ELSE
        RAISE NOTICE 'memberNumber column already exists in users table';
    END IF;
END $$;

-- Add personalInfo column (JSONB for flexible structure)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'personalInfo'
    ) THEN
        ALTER TABLE users ADD COLUMN personalInfo JSONB NOT NULL DEFAULT '{
            "firstName": "",
            "lastName": "",
            "idNumber": "",
            "dateOfBirth": null,
            "phoneNumber": "",
            "address": {
                "street": "",
                "city": "",
                "province": "",
                "postalCode": ""
            }
        }'::jsonb;
        RAISE NOTICE 'Added personalInfo column to users table';
    ELSE
        RAISE NOTICE 'personalInfo column already exists in users table';
    END IF;
END $$;

-- Add updatedAt column (for tracking updates)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'updatedAt'
    ) THEN
        ALTER TABLE users ADD COLUMN updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        RAISE NOTICE 'Added updatedAt column to users table';
    ELSE
        RAISE NOTICE 'updatedAt column already exists in users table';
    END IF;
END $$;

-- Add createdBy column (for tracking who created the user)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'createdBy'
    ) THEN
        ALTER TABLE users ADD COLUMN createdBy TEXT DEFAULT 'system';
        RAISE NOTICE 'Added createdBy column to users table';
    ELSE
        RAISE NOTICE 'createdBy column already exists in users table';
    END IF;
END $$;

-- Add lastUpdatedBy column (for tracking who last updated the user)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'lastUpdatedBy'
    ) THEN
        ALTER TABLE users ADD COLUMN lastUpdatedBy TEXT;
        RAISE NOTICE 'Added lastUpdatedBy column to users table';
    ELSE
        RAISE NOTICE 'lastUpdatedBy column already exists in users table';
    END IF;
END $$;

-- Add approvedBy column (for tracking who approved the user)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'approvedBy'
    ) THEN
        ALTER TABLE users ADD COLUMN approvedBy TEXT;
        RAISE NOTICE 'Added approvedBy column to users table';
    ELSE
        RAISE NOTICE 'approvedBy column already exists in users table';
    END IF;
END $$;

-- Add approvalNotes column (for approval comments)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'approvalNotes'
    ) THEN
        ALTER TABLE users ADD COLUMN approvalNotes TEXT;
        RAISE NOTICE 'Added approvalNotes column to users table';
    ELSE
        RAISE NOTICE 'approvalNotes column already exists in users table';
    END IF;
END $$;

-- Show final table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;
