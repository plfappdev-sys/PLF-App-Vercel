-- Fix for missing member-user links
-- For Nicholas Molale (member 55) and Jonas Letlhaku (member 25)

-- 1. First check current state
SELECT '=== Current Member-User Linking Status ===' as info;

SELECT 
  COUNT(*) as total_members,
  COUNT(user_id) as members_with_user_id,
  COUNT(*) - COUNT(user_id) as members_missing_user_id,
  ROUND(COUNT(user_id) * 100.0 / COUNT(*), 2) as percent_linked
FROM members;

-- 2. Check specific affected members
SELECT '=== Affected Members (55 and 25) ===' as info;

SELECT 
  m.member_number,
  m.full_name,
  m.user_id,
  CASE 
    WHEN m.user_id IS NULL THEN '❌ No user_id'
    WHEN NOT EXISTS (SELECT 1 FROM auth.users u WHERE u.id = m.user_id) THEN '❌ User not found in auth.users'
    ELSE '✅ Linked correctly'
  END as link_status,
  u.email as user_email,
  u.created_at as user_created
FROM members m
LEFT JOIN auth.users u ON m.user_id = u.id
WHERE m.member_number IN ('55', '25') 
   OR m.id::text IN ('55', '25')
ORDER BY m.member_number;

-- 3. Check all members with linking issues
SELECT '=== All Members with Linking Issues ===' as info;

SELECT 
  m.member_number,
  m.full_name,
  m.user_id,
  CASE 
    WHEN m.user_id IS NULL THEN 'No user_id'
    WHEN NOT EXISTS (SELECT 1 FROM auth.users u WHERE u.id = m.user_id) THEN 'User not found'
    ELSE 'Linked'
  END as status,
  u.email as user_email
FROM members m
LEFT JOIN auth.users u ON m.user_id = u.id
WHERE m.user_id IS NULL 
   OR NOT EXISTS (SELECT 1 FROM auth.users u WHERE u.id = m.user_id)
ORDER BY m.member_number
LIMIT 20;

-- 4. Check available users that could be linked
SELECT '=== Available Users for Linking ===' as info;

SELECT 
  u.id as user_id,
  u.email,
  u.raw_user_meta_data->>'full_name' as user_name,
  u.created_at,
  CASE 
    WHEN EXISTS (SELECT 1 FROM members m WHERE m.user_id = u.id) THEN 'Already linked'
    ELSE 'Available'
  END as availability
FROM auth.users u
WHERE u.email_confirmed_at IS NOT NULL
  AND u.banned_until IS NULL
ORDER BY u.created_at
LIMIT 10;

-- 5. SOLUTION: Link members to existing users (if we know which users)
-- Uncomment and modify the UPDATE statements below based on your findings

-- Option A: If you know the user emails for these members
/*
UPDATE members 
SET user_id = (
  SELECT id FROM auth.users 
  WHERE email = 'nicholas.molale@example.com' 
  LIMIT 1
)
WHERE member_number = '55' AND user_id IS NULL;

UPDATE members 
SET user_id = (
  SELECT id FROM auth.users 
  WHERE email = 'jonas.letlhaku@example.com' 
  LIMIT 1
)
WHERE member_number = '25' AND user_id IS NULL;
*/

-- Option B: Link to any available user (for testing)
-- WARNING: Only use for testing, not production
/*
UPDATE members 
SET user_id = (
  SELECT id FROM auth.users 
  WHERE email_confirmed_at IS NOT NULL 
    AND banned_until IS NULL
    AND NOT EXISTS (SELECT 1 FROM members m2 WHERE m2.user_id = auth.users.id)
  LIMIT 1
)
WHERE member_number IN ('55', '25') AND user_id IS NULL;
*/

-- Option C: Create a view to help manual linking
CREATE OR REPLACE VIEW member_linking_assistant AS
SELECT 
  m.member_number,
  m.full_name as member_name,
  m.user_id as current_user_id,
  CASE 
    WHEN m.user_id IS NULL THEN 'No link'
    WHEN NOT EXISTS (SELECT 1 FROM auth.users u WHERE u.id = m.user_id) THEN 'Broken link'
    ELSE 'Linked'
  END as link_status,
  u.email as linked_email,
  u.raw_user_meta_data->>'full_name' as linked_user_name,
  'UPDATE members SET user_id = ''' || u.id || ''' WHERE member_number = ''' || m.member_number || ''';' as fix_sql
FROM members m
LEFT JOIN auth.users u ON m.user_id = u.id
ORDER BY m.member_number;

SELECT '=== Member Linking Assistant View Created ===' as info;
SELECT 'Query: SELECT * FROM member_linking_assistant WHERE link_status != "Linked";' as usage;

-- 6. Check RLS policies that might block access
SELECT '=== RLS Policies on Members Table ===' as info;

SELECT 
  policyname,
  permissive,
  array_to_string(roles, ', ') as roles,
  cmd,
  qual as condition
FROM pg_policies 
WHERE tablename = 'members'
ORDER BY policyname;

-- 7. Temporary fix: Disable RLS if it's causing issues (for testing only)
-- WARNING: Only use for testing, re-enable after fixing
/*
ALTER TABLE members DISABLE ROW LEVEL SECURITY;
SELECT 'RLS disabled for testing' as warning;
*/

-- 8. Final check after potential fixes
SELECT '=== Final Status Check ===' as info;

SELECT 
  m.member_number,
  m.full_name,
  CASE 
    WHEN m.user_id IS NULL THEN '❌ Still not linked'
    WHEN NOT EXISTS (SELECT 1 FROM auth.users u WHERE u.id = m.user_id) THEN '❌ User not found'
    ELSE '✅ Fixed - Now linked'
  END as final_status
FROM members m
WHERE m.member_number IN ('55', '25') 
   OR m.id::text IN ('55', '25');

-- 9. Recommendations
SELECT '=== Recommendations ===' as info;
SELECT '1. Check the "All Members with Linking Issues" section above' as step;
SELECT '2. Use the member_linking_assistant view to see current status' as step;
SELECT '3. Find correct user IDs from auth.users table' as step;
SELECT '4. Run UPDATE statements to link members to users' as step;
SELECT '5. Test the MyFunds page after linking' as step;
SELECT '6. If RLS is blocking access, check policy conditions' as step;