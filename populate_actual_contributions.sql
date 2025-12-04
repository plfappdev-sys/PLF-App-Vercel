-- SQL to populate actual_contributions field in members table
-- This copies total_contributions to actual_contributions where empty

UPDATE members 
SET financial_info = jsonb_set(
  financial_info,
  '{actual_contributions}',
  to_jsonb(COALESCE(
    (financial_info->>'total_contributions')::numeric,
    0
  ))
)
WHERE financial_info->>'actual_contributions' IS NULL 
   OR (financial_info->>'actual_contributions')::numeric = 0;

-- Verify the update
SELECT 
  COUNT(*) as total_members,
  COUNT(CASE WHEN (financial_info->>'actual_contributions')::numeric > 0 THEN 1 END) as members_with_actual_contributions,
  SUM((financial_info->>'actual_contributions')::numeric) as total_actual_contributions,
  SUM((financial_info->>'total_contributions')::numeric) as total_total_contributions
FROM members;
