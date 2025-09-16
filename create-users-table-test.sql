-- Simple test to create just the users table
CREATE TABLE IF NOT EXISTS users_test (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert a test record
INSERT INTO users_test (email) 
VALUES ('test@example.com')
ON CONFLICT (email) DO NOTHING;

-- Check if table was created
SELECT 'Users_test table created successfully' as status;

-- Show all tables to see what exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
