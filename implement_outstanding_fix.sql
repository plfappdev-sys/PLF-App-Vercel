-- IMPLEMENT OUTSTANDING AMOUNT FIX
-- Add outstanding_amount column and update values
-- Created: November 25, 2025

-- Add outstanding_amount column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'members' AND column_name = 'outstanding_amount'
    ) THEN
        ALTER TABLE members ADD COLUMN outstanding_amount DECIMAL(10,2) DEFAULT 0;
        RAISE NOTICE 'Added outstanding_amount column to members table';
    ELSE
        RAISE NOTICE 'outstanding_amount column already exists';
    END IF;
END $$;

-- Update outstanding amounts for all members
-- For now, use catch-up fee as outstanding amount
-- In future, this should include unpaid contributions
UPDATE members 
SET outstanding_amount = COALESCE(catch_up_fee, 0);

-- Verify the update worked
SELECT COUNT(*) as members_updated FROM members WHERE outstanding_amount IS NOT NULL;

-- Show Christopher Naude's updated data
SELECT 
    name, 
    member_number, 
    join_date,
    monthly_contribution,
    catch_up_fee,
    outstanding_amount,
    CASE 
        WHEN outstanding_amount > 0 THEN '✅ HAS OUTSTANDING' 
        ELSE '✅ NO OUTSTANDING' 
    END as status
FROM members 
WHERE name = 'Christopher Naude';

-- Show sample members with outstanding amounts
SELECT 
    name, 
    member_number, 
    monthly_contribution,
    catch_up_fee,
    outstanding_amount
FROM members 
WHERE outstanding_amount > 0
ORDER BY member_number::int
LIMIT 10;

-- Show member ordering test (numeric vs string)
SELECT 
    member_number,
    name
FROM members 
ORDER BY member_number::int ASC
LIMIT 15;
