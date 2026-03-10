// Diagnostic script for member-user linking issues
console.log('=== Member-User Linking Diagnosis ===\n');

// Problem: Nicholas Molale (member 55) and Jonas Letlhaku (member 25)
// show "not linked" on MyFunds page but are linked on member side

console.log('Issue: Members show "not linked" on MyFunds page');
console.log('Affected members:');
console.log('1. Nicholas Molale - Member 55');
console.log('2. Jonas Letlhaku - Member 25\n');

console.log('Possible causes:');
console.log('1. Missing user_id in members table');
console.log('2. Incorrect user_id reference');
console.log('3. RLS (Row Level Security) policies blocking access');
console.log('4. Missing user records in auth.users');
console.log('5. Data inconsistency between members and users tables\n');

console.log('=== SQL Queries to Diagnose ===\n');

console.log('1. Check member 55 (Nicholas Molale):');
console.log(`
SELECT 
  m.member_number,
  m.full_name,
  m.user_id,
  m.created_at,
  m.updated_at
FROM members m
WHERE m.member_number = '55' OR m.id::text = '55';
`);

console.log('\n2. Check member 25 (Jonas Letlhaku):');
console.log(`
SELECT 
  m.member_number,
  m.full_name,
  m.user_id,
  m.created_at,
  m.updated_at
FROM members m
WHERE m.member_number = '25' OR m.id::text = '25';
`);

console.log('\n3. Check if user_id exists in auth.users:');
console.log(`
-- For member 55
SELECT 
  u.id as user_id,
  u.email,
  u.raw_user_meta_data,
  u.created_at
FROM auth.users u
WHERE u.id = (SELECT user_id FROM members WHERE member_number = '55' OR id::text = '55');

-- For member 25
SELECT 
  u.id as user_id,
  u.email,
  u.raw_user_meta_data,
  u.created_at
FROM auth.users u
WHERE u.id = (SELECT user_id FROM members WHERE member_number = '25' OR id::text = '25');
`);

console.log('\n4. Check all members with linking issues:');
console.log(`
SELECT 
  m.member_number,
  m.full_name,
  m.user_id,
  CASE 
    WHEN m.user_id IS NULL THEN 'No user_id'
    WHEN NOT EXISTS (SELECT 1 FROM auth.users u WHERE u.id = m.user_id) THEN 'User not found in auth.users'
    ELSE 'Linked correctly'
  END as link_status,
  m.created_at
FROM members m
WHERE m.user_id IS NULL 
   OR NOT EXISTS (SELECT 1 FROM auth.users u WHERE u.id = m.user_id)
ORDER BY m.member_number;
`);

console.log('\n5. Check RLS policies on members table:');
console.log(`
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'members'
ORDER BY policyname;
`);

console.log('\n=== Common Solutions ===\n');

console.log('Solution A: Fix missing user_id');
console.log(`
-- If user exists but member has no user_id
UPDATE members 
SET user_id = 'user-uuid-here'
WHERE member_number = '55' AND user_id IS NULL;
`);

console.log('\nSolution B: Create missing user accounts');
console.log(`
-- Use Supabase Auth admin to create user
-- Then link to member
UPDATE members 
SET user_id = 'new-user-uuid'
WHERE member_number = '55';
`);

console.log('\nSolution C: Check application code');
console.log('The MyFunds page might be checking:');
console.log('1. If user_id is NULL');
console.log('2. If user exists in auth.users');
console.log('3. If RLS allows access');
console.log('4. If user has correct role/permissions\n');

console.log('=== Quick Fix Script ===');
console.log('Create fix-missing-user-links.sql:');
console.log(`
-- Fix for missing member-user links
-- 1. First check current state
SELECT 'Current linking status:' as info;
SELECT 
  COUNT(*) as total_members,
  COUNT(user_id) as members_with_user_id,
  COUNT(*) - COUNT(user_id) as members_missing_user_id
FROM members;

-- 2. For testing, link a specific member to a test user
-- UPDATE members 
-- SET user_id = 'test-user-uuid'
-- WHERE member_number IN ('55', '25');

-- 3. Or create a view to see all linking issues
CREATE OR REPLACE VIEW member_linking_status AS
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
ORDER BY m.member_number;

SELECT * FROM member_linking_status WHERE status != 'Linked';
`);

console.log('\n=== Next Steps ===');
console.log('1. Run the SQL queries above in Supabase SQL Editor');
console.log('2. Identify if user_id is missing or incorrect');
console.log('3. Check if users exist in auth.users');
console.log('4. Fix the linking by updating user_id or creating users');
console.log('5. Test the MyFunds page again');