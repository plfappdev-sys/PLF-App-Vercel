-- First, check what values are allowed for setting_type
SELECT 
  conname as constraint_name,
  pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'system_settings'::regclass 
  AND contype = 'c';

-- Also check existing values in the table
SELECT DISTINCT setting_type FROM system_settings;

-- Check the table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'system_settings'
ORDER BY ordinal_position;