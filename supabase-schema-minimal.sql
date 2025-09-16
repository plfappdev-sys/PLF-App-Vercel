-- Minimal schema to create missing tables without foreign key constraints
-- This will create the users table first, then other tables

-- Create users table (without foreign key constraints initially)
CREATE TABLE IF NOT EXISTS users (
    uid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'admin', 'executive', 'superuser')),
    personal_info JSONB DEFAULT '{}'::jsonb,
    account_status JSONB DEFAULT '{"isActive": true, "isVerified": false}'::jsonb,
    membership_info JSONB DEFAULT '{}'::jsonb,
    member_number TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID
);

-- Create interest_accruals table (without foreign key initially)
CREATE TABLE IF NOT EXISTS interest_accruals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID NOT NULL,
    calculation_date DATE NOT NULL,
    interest_type TEXT NOT NULL CHECK (interest_type IN ('earned', 'charged')),
    principal_amount DECIMAL(15, 2) NOT NULL,
    interest_rate DECIMAL(5, 4) NOT NULL,
    daily_interest DECIMAL(15, 6) NOT NULL,
    accrued_interest DECIMAL(15, 2) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    is_capitalized BOOLEAN DEFAULT FALSE,
    capitalization_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Now add foreign key constraints if they don't exist
DO $$ 
BEGIN
    -- Add foreign key to members table if it exists
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'members') THEN
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.table_constraints 
            WHERE constraint_name = 'fk_user_id' AND table_name = 'members'
        ) THEN
            ALTER TABLE members ADD CONSTRAINT fk_user_id 
            FOREIGN KEY (user_id) REFERENCES users(uid) ON DELETE CASCADE;
        END IF;
    END IF;

    -- Add foreign key to interest_accruals table
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'interest_accruals') THEN
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.table_constraints 
            WHERE constraint_name = 'fk_interest_member_id' AND table_name = 'interest_accruals'
        ) THEN
            ALTER TABLE interest_accruals ADD CONSTRAINT fk_interest_member_id 
            FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE;
        END IF;
    END IF;
END $$;

-- Create basic indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_member_number ON users(member_number);
CREATE INDEX IF NOT EXISTS idx_interest_accruals_member_id ON interest_accruals(member_id);
CREATE INDEX IF NOT EXISTS idx_interest_accruals_date ON interest_accruals(calculation_date);

-- Show table status
SELECT 
    table_name,
    EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = t.table_name) as table_exists
FROM (VALUES 
    ('users'), 
    ('members'), 
    ('transactions'), 
    ('loans'), 
    ('interest_accruals')
) AS t(table_name);
