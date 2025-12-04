-- Force update ALL actual_contributions to match total_contributions
-- This ensures consistency across all members

UPDATE members 
SET financial_info = jsonb_set(
  financial_info,
  '{actual_contributions}',
  to_jsonb(COALESCE(
    (financial_info->>'total_contributions')::numeric,
    0
  ))
)
WHERE (financial_info->>'total_contributions')::numeric IS NOT NULL;

-- Alternative: Update all records regardless of current value
-- UPDATE members 
-- SET financial_info = jsonb_set(
--   financial_info,
--   '{actual_contributions}',
--   to_jsonb(COALESCE(
--     (financial_info->>'total_contributions')::numeric,
--     0
--   ))
-- );

-- Verify the update
SELECT 
  COUNT(*) as total_members,
  COUNT(CASE WHEN (financial_info->>'actual_contributions')::numeric > 0 THEN 1 END) as members_with_actual_contributions,
  SUM((financial_info->>'actual_contributions')::numeric) as total_actual_contributions,
  SUM((financial_info->>'total_contributions')::numeric) as total_total_contributions,
  SUM(ABS((financial_info->>'actual_contributions')::numeric - (financial_info->>'total_contributions')::numeric)) as total_difference
FROM members;
