-- Reset password for Jonas Letlhaku to "Password123"
-- First, we need to find his user account

-- 1. Check if we can find Jonas Letlhaku in auth.users
SELECT '=== Searching for Jonas Letlhaku in auth.users ===' as info;

SELECT 
  id,
  email,
  raw_user_meta_data->>'full_name' as full_name,
  raw_user_meta_data->>'member_number' as member_number,
  email_confirmed_at,
  last_sign_in_at,
  created_at
FROM auth.users 
WHERE 
  email ILIKE '%jonas%' OR 
  email ILIKE '%letlhaku%' OR
  raw_user_meta_data->>'full_name' ILIKE '%jonas%' OR
  raw_user_meta_data->>'full_name' ILIKE '%letlhaku%'
ORDER BY created_at DESC;

-- 2. Check if there's a member record for Jonas Letlhaku
SELECT '=== Checking members table for Jonas Letlhaku ===' as info;

-- First, let's see what name columns exist in members table
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'members' 
  AND column_name LIKE '%name%'
ORDER BY column_name;

-- Try to find by common name patterns
SELECT 
  id,
  member_number,
  -- Try different possible name columns
  COALESCE(
    (SELECT column_name FROM information_schema.columns WHERE table_name = 'members' AND column_name = 'name'),
    (SELECT column_name FROM information_schema.columns WHERE table_name = 'members' AND column_name = 'full_name'),
    (SELECT column_name FROM information_schema.columns WHERE table_name = 'members' AND column_name = 'first_name'),
    'unknown'
  ) as name_column_used
FROM members 
WHERE 
  -- This is a placeholder - we need to know the actual column name
  -- We'll check a few rows to see the structure
  member_number IN ('25', '55') OR
  id::text IN ('25', '55')
LIMIT 5;

-- 3. Show sample of members to understand name storage
SELECT '=== Sample of members (first 10) to understand structure ===' as info;

SELECT * FROM members LIMIT 10;

-- 4. If we find the user, we can reset the password
-- Note: In Supabase, password reset is typically done through:
-- 1. Admin API
-- 2. Auth UI
-- 3. SQL function (if available)

-- Check if there's a password reset function
SELECT '=== Password Reset Options ===' as info;

SELECT 
  routine_name,
  routine_type
FROM information_schema.routines 
WHERE routine_name LIKE '%password%' 
  AND routine_schema = 'auth'
ORDER BY routine_name;

-- 5. Alternative: Update password directly (if you have the right permissions)
-- WARNING: This requires special permissions and knowledge of password hashing
/*
SELECT '=== Direct Password Update (Advanced) ===' as warning;
SELECT 'This requires knowledge of Supabase password hashing algorithm' as note;
SELECT 'Use Supabase Admin API or Dashboard instead for safety' as recommendation;
*/

-- 6. Recommended approach: Use Supabase Dashboard
SELECT '=== Recommended Approach ===' as info;
SELECT '1. Go to Supabase Dashboard: https://app.supabase.com' as step;
SELECT '2. Select your project' as step;
SELECT '3. Go to Authentication → Users' as step;
SELECT '4. Find Jonas Letlhaku by email or name' as step;
SELECT '5. Click "..." menu next to the user' as step;
SELECT '6. Select "Update password"' as step;
SELECT '7. Enter new password: Password123' as step;
SELECT '8. Save changes' as step;

-- 7. If using Admin API (programmatic approach)
SELECT '=== Admin API Approach ===' as info;
SELECT 'Use Supabase Admin API to update user password:' as step;
SELECT 'PUT /auth/v1/admin/users/{user_id}' as api_endpoint;
SELECT 'Body: { "password": "Password123" }' as request_body;
SELECT 'Headers: { "Authorization": "Bearer {service_role_key}" }' as headers;

-- 8. Create a simple Node.js script for password reset
SELECT '=== Node.js Script Example ===' as info;
SELECT 'Create file reset-password.js:' as step;
SELECT '
const { createClient } = require(''@supabase/supabase-js'');
const supabaseUrl = ''YOUR_SUPABASE_URL'';
const supabaseServiceKey = ''YOUR_SERVICE_ROLE_KEY'';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function resetPassword() {
  try {
    // First find the user
    const { data: users, error: findError } = await supabase.auth.admin.listUsers();
    if (findError) throw findError;
    
    const jonas = users.users.find(u => 
      u.email?.includes(''jonas'') || 
      u.user_metadata?.full_name?.includes(''Jonas'')
    );
    
    if (!jonas) {
      console.log(''User not found'');
      return;
    }
    
    console.log(`Found user: ${jonas.email} (${jonas.id})`);
    
    // Reset password
    const { data, error } = await supabase.auth.admin.updateUserById(
      jonas.id,
      { password: ''Password123'' }
    );
    
    if (error) throw error;
    
    console.log(''Password reset successfully!'');
    console.log(`New password: Password123`);
    
  } catch (error) {
    console.error(''Error:'', error.message);
  }
}

resetPassword();
' as script_content;

-- 9. Final check: Verify the user exists
SELECT '=== Quick User Existence Check ===' as info;

SELECT 
  COUNT(*) as total_users,
  COUNT(CASE WHEN email ILIKE '%jonas%' THEN 1 END) as users_with_jonas_in_email,
  COUNT(CASE WHEN raw_user_meta_data->>'full_name' ILIKE '%jonas%' THEN 1 END) as users_with_jonas_in_name
FROM auth.users;