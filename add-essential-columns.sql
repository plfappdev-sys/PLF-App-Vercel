-- Add essential missing columns to users table
-- This adds the absolutely required columns for authentication

-- Add uid column (user identifier, not primary key)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'uid'
    ) THEN
        ALTER TABLE users ADD COLUMN uid UUID DEFAULT gen_random_uuid();
        CREATE INDEX IF NOT EXISTS idx_users_uid ON users(uid);
        RAISE NOTICE 'Added uid column to users table';
    ELSE
        RAISE NOTICE 'uid column already exists in users table';
    END IF;
END $$;

-- Add email column (required for authentication)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'email'
    ) THEN
        ALTER TABLE users ADD COLUMN email TEXT UNIQUE NOT NULL;
        CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
        RAISE NOTICE 'Added email column to users table';
    ELSE
        RAISE NOTICE 'email column already exists in users table';
    END IF;
END $$;

-- Add role column (basic authorization)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'role'
    ) THEN
        ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT 'member';
        RAISE NOTICE 'Added role column to users table';
    ELSE
        RAISE NOTICE 'role column already exists in users table';
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
