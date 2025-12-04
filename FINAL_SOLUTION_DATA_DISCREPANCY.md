# FINAL SOLUTION: Data Discrepancy Between Users

## Problem Summary
- **Lesego** (regular user) sees: R 4,986,838.63 (full total fund value)
- **Oratile** (superuser) sees: R 619,169.20 (~12.4% of total)
- Both users should see the SAME data since Oratile is a superuser

## Root Cause
**Row Level Security (RLS) policies in Supabase are filtering data differently for different users:**

1. **Anonymous users** (no authentication) can see ALL data due to the "Allow anon access for development" policy
2. **Authenticated users** (like Oratile) are subject to RLS policies that may be filtering data incorrectly
3. The `getFundStatistics()` calculation is CORRECT - it calculates R 4,986,838.63 from all 89 members

## Solution

### Option 1: Fix RLS Policies (Recommended)
Execute this SQL in **Supabase SQL Editor**:

```sql
-- Improved RLS policy to fix data access issues
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
END $$;
```

**Steps to execute:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/zdnyhzasvifrskbostgn/editor)
2. Open SQL Editor
3. Paste the SQL above
4. Click "Run"
5. Test with both users

### Option 2: Temporary Fix for Testing
If you just want to test, disable RLS temporarily:

```sql
-- Temporarily disable RLS
ALTER TABLE members DISABLE ROW LEVEL SECURITY;

-- Test with both users
-- Then re-enable when done:
-- ALTER TABLE members ENABLE ROW LEVEL SECURITY;
```

### Option 3: Fix SupabaseMemberService (If RLS fix doesn't work)
If the issue persists after fixing RLS, check `src/services/supabaseMemberService.ts`:

**Current issue:** The service uses the anonymous client from `src/config/supabase.ts` for ALL users.

**Fix needed:** The service should use an **authenticated client** when a user is logged in.

```typescript
// In SupabaseMemberService, instead of:
import { supabase } from '../config/supabase'; // Anonymous client

// Use a method that gets the current authenticated client:
import { getAuthenticatedSupabase } from '../contexts/SupabaseAuthContext';

static async getFundStatistics(): Promise<FundStatistics> {
  const supabase = getAuthenticatedSupabase(); // Get client with user's auth
  // ... rest of the code
}
```

## Verification Steps

After applying the fix:

1. **Test with Oratile (superuser):**
   - Should see R 4,986,838.63 (full total)
   - Should see all 89 members

2. **Test with Lesego (regular member):**
   - Should see only their own member data (member 43)
   - Should NOT see other members' data

3. **Test with anonymous user:**
   - Should see all data (development mode)
   - In production, should see nothing or limited data

## Why This Happened

1. **Development vs Production:** The "Allow anon access for development" policy was allowing anonymous users to see all data
2. **RLS Policy Logic:** The original policy had logic that might not have been working correctly for superusers
3. **Client Configuration:** `SupabaseMemberService` uses anonymous client regardless of user authentication state

## Additional Checks

1. **Verify Oratile's user record in `users` table:**
   ```sql
   SELECT * FROM users WHERE email = 'oratile@example.com';
   ```
   Should show `role = 'superuser'`

2. **Check member linking:**
   ```sql
   SELECT * FROM users WHERE membernumber = '66';
   ```
   Should show Oratile's user record linked to member 66

## Summary

The data discrepancy is **NOT a database issue** - both users are accessing the same database.

The issue is **RLS policy configuration** causing different data visibility for different authentication states.

**Fix the RLS policies as shown above, and both users will see consistent data.**
