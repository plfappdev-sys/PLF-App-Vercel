-- Fix RLS policy to allow authenticated users to read members for reporting
-- This policy allows users with specific roles to view all members for reporting purposes

DO $$ 
BEGIN
    -- Add policy to allow authenticated users with specific roles to read all members
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'members' AND policyname = 'Allow reporting access to members') THEN
        CREATE POLICY "Allow reporting access to members" ON members FOR SELECT USING (
            EXISTS (
                SELECT 1 FROM users 
                WHERE uid = auth.uid() 
                AND role IN ('admin', 'superuser', 'executive', 'member')
            )
        );
    END IF;
    
    -- Also allow service role and anon access for development (remove in production)
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'members' AND policyname = 'Allow service role access') THEN
        CREATE POLICY "Allow service role access" ON members FOR ALL USING (auth.role() = 'service_role');
    END IF;
    
    -- For development/testing, allow anon access to view members (remove in production)
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'members' AND policyname = 'Allow anon access for development') THEN
        CREATE POLICY "Allow anon access for development" ON members FOR SELECT USING (true);
    END IF;
    
    RAISE NOTICE 'RLS policies updated successfully';
END $$;
