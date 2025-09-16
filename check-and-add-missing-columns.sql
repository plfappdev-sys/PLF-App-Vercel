-- First, check the current structure of the users table
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;

-- Now add only the missing columns
-- Add accountStatus column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'accountstatus'
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

-- Add personalInfo column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'personalinfo'
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

-- Add updatedAt column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'updatedat'
    ) THEN
        ALTER TABLE users ADD COLUMN updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        RAISE NOTICE 'Added updatedAt column to users table';
    ELSE
        RAISE NOTICE 'updatedAt column already exists in users table';
    END IF;
END $$;

-- Add createdBy column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'createdby'
    ) THEN
        ALTER TABLE users ADD COLUMN createdBy TEXT DEFAULT 'system';
        RAISE NOTICE 'Added createdBy column to users table';
    ELSE
        RAISE NOTICE 'createdBy column already exists in users table';
    END IF;
END $$;

-- Add lastUpdatedBy column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'lastupdatedby'
    ) THEN
        ALTER TABLE users ADD COLUMN lastUpdatedBy TEXT;
        RAISE NOTICE 'Added lastUpdatedBy column to users table';
    ELSE
        RAISE NOTICE 'lastUpdatedBy column already exists in users table';
    END IF;
END $$;

-- Add approvedBy column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'approvedby'
    ) THEN
        ALTER TABLE users ADD COLUMN approvedBy TEXT;
        RAISE NOTICE 'Added approvedBy column to users table';
    ELSE
        RAISE NOTICE 'approvedBy column already exists in users table';
    END IF;
END $$;

-- Add approvalNotes column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'approvalnotes'
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
