-- Simple script to check members table structure
-- This will help us understand what columns actually exist

-- 1. First, list all columns in the members table
SELECT '=== Members Table Structure ===' as info;

SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'members'
ORDER BY ordinal_position;

-- 2. Check for name-related columns
SELECT '=== Name Columns in Members Table ===' as info;

SELECT column_name, data_type
FROM information_schema.columns 
WHERE table_name = 'members' 
  AND (column_name LIKE '%name%' OR column_name LIKE '%full%')
ORDER BY column_name;

-- 3. Check for user_id column specifically
SELECT '=== User ID Column Details ===' as info;

SELECT 
  column_name,
  data_type,
  character_maximum_length,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'members' AND column_name = 'user_id';

-- 4. Show sample data to understand the structure
SELECT '=== Sample Member Data (First 5 rows) ===' as info;

SELECT * FROM members LIMIT 5;

-- 5. Check specific members 55 and 25
SELECT '=== Checking Members 55 and 25 ===' as info;

-- First try by member_number
SELECT * FROM members WHERE member_number IN ('55', '25');

-- If not found, try by id
SELECT * FROM members WHERE id::text IN ('55', '25');

-- 6. Check what linking mechanism might be used
SELECT '=== Possible Linking Mechanisms ===' as info;

-- Check if there's an email column for linking
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'members' AND column_name = 'email') 
    THEN 'Email column exists for linking'
    ELSE 'No email column found'
  END as email_status;

-- Check if there's a phone column
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'members' AND column_name LIKE '%phone%') 
    THEN 'Phone column exists'
    ELSE 'No phone column found'
  END as phone_status;

-- 7. Simple test: Can we query the table at all?
SELECT '=== Basic Table Accessibility Test ===' as info;

SELECT 
  COUNT(*) as total_members,
  COUNT(DISTINCT member_number) as unique_member_numbers,
  MIN(created_at) as earliest_member,
  MAX(created_at) as latest_member
FROM members;

-- 8. Recommendations based on findings
SELECT '=== Next Steps ===' as info;
SELECT '1. Look at the table structure above to see available columns' as step;
SELECT '2. Check sample data to understand the data format' as step;
SELECT '3. Identify which column stores member names' as step;
SELECT '4. Check if user_id column exists and its data type' as step;
SELECT '5. Determine the correct linking mechanism' as step;