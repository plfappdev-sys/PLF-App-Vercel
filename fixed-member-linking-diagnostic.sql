-- Fixed Member-User Linking Diagnostic
-- Handles type mismatch between bigint user_id and uuid auth.users.id

-- 1. First check current state
SELECT '=== Current Member-User Linking Status ===' as info;

SELECT 
  COUNT(*) as total_members,
  COUNT(user_id) as members_with_user_id,
  COUNT(*) - COUNT(user_id) as members_missing_user_id,
  ROUND(COUNT(user_id) * 100.0 / COUNT(*), 2) as percent_linked
FROM members;

-- 2. Check the data type of user_id column
SELECT '=== Checking Column Types ===' as info;

SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'members' AND column_name = 'user_id';

-- 3. Check specific affected members (using text comparison)
SELECT '=== Affected Members (55 and 25) ===' as info;

SELECT 
  m.member_number,
  m.full_name,
  m.user_id,
  CASE 
    WHEN m.user_id IS NULL THEN '❌ No user_id'
    WHEN m.user_id::text NOT IN (SELECT id::text FROM auth.users) THEN '❌ User not found in auth.users'
    ELSE '✅ Linked correctly'
  END as link_status
FROM members m
WHERE m.member_number IN ('55', '25') 
   OR m.id::text IN ('55', '25')
ORDER BY m.member_number;

-- 4. Check all members with linking issues (using text comparison)
SELECT '=== All Members with Linking Issues ===' as info;

SELECT 
  m.member_number,
  m.full_name,
  m.user_id,
  CASE 
    WHEN m.user_id IS NULL THEN 'No user_id'
    WHEN m.user_id::text NOT IN (SELECT id::text FROM auth.users) THEN 'User not found'
    ELSE 'Linked'
  END as status
FROM members m
WHERE m.user_id IS NULL 
   OR m.user_id::text NOT IN (SELECT id::text FROM auth.users)
ORDER BY m.member_number
LIMIT 20;

-- 5. Check available users that could be linked
SELECT '=== Available Users for Linking ===' as info;

SELECT 
  u.id::text as user_id,
  u.email,
  u.raw_user_meta_data->>'full_name' as user_name,
  u.created_at,
  CASE 
    WHEN u.id::text IN (SELECT user_id::text FROM members WHERE user_id IS NOT NULL) THEN 'Already linked'
    ELSE 'Available'
  END as availability
FROM auth.users u
WHERE u.email_confirmed_at IS NOT NULL
  AND u.banned_until IS NULL
ORDER BY u.created_at
LIMIT 10;

-- 6. Create a view to help manual linking (with type casting)
CREATE OR REPLACE VIEW member_linking_assistant AS
SELECT 
  m.member_number,
  m.full_name as member_name,
  m.user_id::text as current_user_id,
  CASE 
    WHEN m.user_id IS NULL THEN 'No link'
    WHEN m.user_id::text NOT IN (SELECT id::text FROM auth.users) THEN 'Broken link'
    ELSE 'Linked'
  END as link_status,
  u.email as linked_email,
  u.raw_user_meta_data->>'full_name' as linked_user_name
FROM members m
LEFT JOIN auth.users u ON m.user_id::text = u.id::text
ORDER BY m.member_number;

SELECT '=== Member Linking Assistant View Created ===' as info;
SELECT 'Query: SELECT * FROM member_linking_assistant WHERE link_status != "Linked";' as usage;

-- 7. Check what the actual linking should be
-- If user_id is bigint but should reference auth.users.id (uuid),
-- we need to find the correct mapping

SELECT '=== Possible Solutions ===' as info;

-- Solution 1: If user_id stores numeric IDs that correspond to something else
SELECT 'Option 1: Check if user_id stores something other than auth.users.id' as solution;

-- Solution 2: Create a mapping table if needed
SELECT 'Option 2: Create a mapping between member user_id and auth.users' as solution;

-- Solution 3: Change user_id column type to uuid
SELECT 'Option 3: Alter table to change user_id to uuid type:' as solution;
SELECT 'ALTER TABLE members ALTER COLUMN user_id TYPE uuid USING user_id::text::uuid;' as sql_command;
SELECT 'WARNING: This will fail if user_id values are not valid UUIDs' as warning;

-- 8. Check application code to understand the linking logic
SELECT '=== Application Logic Check ===' as info;
SELECT 'Check how the application links members to users:' as step;
SELECT '1. Does it use email matching?' as step;
SELECT '2. Does it use member_number in user metadata?' as step;
SELECT '3. Is there a separate linking table?' as step;

-- 9. Simple test: Try to find users by email pattern
SELECT '=== Testing Email Pattern Matching ===' as info;

SELECT 
  m.member_number,
  m.full_name,
  LOWER(REPLACE(m.full_name, ' ', '.')) || '@example.com' as suggested_email,
  u.id as potential_user_id,
  u.email as user_email
FROM members m
LEFT JOIN auth.users u ON LOWER(u.email) LIKE '%' || LOWER(REPLACE(SPLIT_PART(m.full_name, ' ', 1), ' ', '')) || '%'
WHERE m.member_number IN ('55', '25')
   OR m.id::text IN ('55', '25');

-- 10. Final recommendations
SELECT '=== Recommendations ===' as info;
SELECT '1. First check the linking status above' as step;
SELECT '2. If user_id is bigint but auth.users.id is uuid, need mapping' as step;
SELECT '3. Check application code for linking logic' as step;
SELECT '4. Consider altering column type if values are valid UUIDs' as step;
SELECT '5. Or create a mapping table between member IDs and user UUIDs' as step;