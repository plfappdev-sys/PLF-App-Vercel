# Manual RLS Disable Guide for Supabase

## Problem
The Supabase users table has Row Level Security (RLS) enabled, which prevents user creation with the error:
```
"new row violates row-level security policy for table \"users\""
```

## Solution
Disable RLS on the users table temporarily for development.

## Steps to Disable RLS

### Option 1: Through Supabase Dashboard (Recommended)

1. **Go to Supabase Dashboard**
   - Visit: https://zdnyhzasvifrskbostgn.supabase.co/project/default/sql

2. **Run the SQL Command**
   ```sql
   ALTER TABLE users DISABLE ROW LEVEL SECURITY;
   ```

3. **Verify RLS is Disabled**
   ```sql
   SELECT tablename, rowsecurity 
   FROM pg_tables 
   WHERE schemaname = 'public' AND tablename = 'users';
   ```

### Option 2: Using Service Role Key (Advanced)

If you have the service role key, you can create a separate config:

```javascript
// Create a new file: supabase-service.js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseServiceKey = 'your-service-role-key-here'; // Get from Supabase Dashboard > Settings > API

const supabaseService = createClient(supabaseUrl, supabaseServiceKey);

// Then use this client for admin operations
```

### Option 3: Create Proper RLS Policies (Production)

For production, create proper RLS policies instead of disabling RLS:

```sql
-- Enable RLS but create proper policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow users to insert their own profiles
CREATE POLICY "Users can insert their own profile" 
ON users FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Allow users to read their own data
CREATE POLICY "Users can read own data" 
ON users FOR SELECT 
USING (auth.uid() = id);
```

## Verification

After disabling RLS, test user creation:

1. Run the app
2. Try to sign up a new user
3. The "new row violates row-level security policy" error should be resolved

## Important Notes

- ⚠️ **Disabling RLS is for development only**
- 🔒 **For production, use proper RLS policies**
- 📋 **Re-enable RLS when moving to production**
- 🔑 **Use service role key for admin operations in production**

## Production Ready Solution

For production, you should:
1. Keep RLS enabled
2. Use proper RLS policies
3. Use the service role key for user creation operations
4. Implement proper authentication workflows
