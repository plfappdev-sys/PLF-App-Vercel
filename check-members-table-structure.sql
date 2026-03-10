-- Check the structure of the members table
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'members'
ORDER BY ordinal_position;

-- Check what columns exist for financial calculations
SELECT 'Existing financial columns:' as info;
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'members' 
  AND column_name LIKE '%balance%' 
  OR column_name LIKE '%contribution%'
  OR column_name LIKE '%penalty%'
  OR column_name LIKE '%outstanding%'
  OR column_name LIKE '%expected%'
ORDER BY column_name;

-- Check a sample member to see current data
SELECT 'Sample member data (M006 if exists):' as info;
SELECT * FROM members WHERE member_number = 'M006' LIMIT 1;

-- Check what calculation-related columns might exist
SELECT 'Checking for calculation columns:' as info;
SELECT 
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'members' AND column_name = 'closing_balance') THEN 'closing_balance exists' ELSE 'closing_balance missing' END as status,
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'members' AND column_name = 'total_outstanding') THEN 'total_outstanding exists' ELSE 'total_outstanding missing' END as status,
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'members' AND column_name = 'penalty_for_year') THEN 'penalty_for_year exists' ELSE 'penalty_for_year missing' END as status,
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'members' AND column_name = 'expected_contribution_total') THEN 'expected_contribution_total exists' ELSE 'expected_contribution_total missing' END as status;