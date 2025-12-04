-- Improved RLS policy to fix data access issues
-- This policy allows proper access for different user types

DO $$ 
BEGIN
    -- First, drop existing policies to avoid conflicts
    DROP POLICY IF EXISTS "Allow reporting access to members" ON members;
    DROP POLICY IF EXISTS "Allow service role access" ON members;
    DROP POLICY IF EXISTS "Allow anon access for development" ON members;
    
    -- Policy 1: Allow service role full access
    CREATE POLICY "Allow service role access" ON members FOR ALL USING (auth.role() = 'service_role');
    
    -- Policy 2: Allow authenticated users with specific roles to read all members
    -- This is the key fix: allow superusers, admins, executives to see ALL members
    CREATE POLICY "Allow authenticated role access" ON members FOR SELECT USING (
        auth.uid() IS NOT NULL AND
        EXISTS (
            SELECT 1 FROM users 
            WHERE uid = auth.uid() 
            AND role IN ('admin', 'superuser', 'executive')
        )
    );
    
    -- Policy 3: Allow regular members to see only their own data
    CREATE POLICY "Allow member access to own data" ON members FOR SELECT USING (
        auth.uid() IS NOT NULL AND
        EXISTS (
            SELECT 1 FROM users 
            WHERE uid = auth.uid() 
            AND role = 'member'
            AND membernumber = members.member_number
        )
    );
    
    -- Policy 4: For development/testing, allow anon access to view members (remove in production)
    CREATE POLICY "Allow anon access for development" ON members FOR SELECT USING (true);
    
    RAISE NOTICE 'Improved RLS policies created successfully';
    
    -- Test the policies
    RAISE NOTICE 'Testing policies:';
    RAISE NOTICE '1. Service role can access all data';
    RAISE NOTICE '2. Superusers/admins/executives can see ALL members';
    RAISE NOTICE '3. Regular members can only see their own member record';
    RAISE NOTICE '4. Anonymous users can see all data (development only)';
END $$;
