-- First, check what columns exist in the users table
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;

-- Check if superuser@plf.com exists
SELECT id, email, raw_user_meta_data FROM auth.users WHERE email = 'superuser@plf.com';

-- If superuser doesn't exist, let's create it manually
-- First, check if we need to add the accountStatus column
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'accountstatus'
    ) THEN
        ALTER TABLE users ADD COLUMN accountstatus JSONB NOT NULL DEFAULT '{
            "isActive": true,
            "isVerified": true,
            "verificationDocuments": {
                "verificationStatus": "approved"
            }
        }'::jsonb;
        RAISE NOTICE 'Added accountstatus column to users table';
    ELSE
        RAISE NOTICE 'accountstatus column already exists in users table';
    END IF;
END $$;

-- Add other essential columns if missing
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'role'
    ) THEN
        ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'superuser';
        RAISE NOTICE 'Added role column to users table';
    ELSE
        RAISE NOTICE 'role column already exists in users table';
    END IF;
END $$;

-- Show current users (if any exist)
SELECT id, email, role, accountstatus FROM users LIMIT 10;
