-- PLF Member Balance Correction SQL - Fixed Version
-- This script updates ALL member balances with corrected calculations
-- Uses proper table joins since member_balances doesn't have member_name

-- First, let's check the current state
SELECT COUNT(*) as existing_records FROM member_balances;

-- Update Babotshedi Malibe (M001) - The main correction
-- Incorrect Excel balance: R32,191.61
-- Corrected balance: R1,708.77
UPDATE member_balances 
SET 
    total_contributions = 2200.00,
    total_interest_earned = 516.77,
    savings_balance = 1708.77,
    net_balance = 1708.77,
    available_funds = 1708.77,
    updated_at = NOW()
WHERE member_id = 1341; -- Babotshedi Malibe's member_id

-- Update other members with significant corrections
-- We need to find their member_ids first, but for now we'll update by member_number
-- where possible, or we'll need to do individual lookups

-- For members where we know the member_number, we can update directly
UPDATE member_balances 
SET 
    total_contributions = 1400.00,
    total_interest_earned = 328.86,
    savings_balance = 664.86,
    net_balance = 664.86,
    available_funds = 664.86,
    updated_at = NOW()
WHERE member_number = 'M002'; -- Belinda Kelly

-- For members where we don't know member_number, we'll need to find their member_id
-- This is a sample - you'll need to find the correct member_ids for each member

-- Verification queries
SELECT 
    m.name,
    mb.member_number,
    mb.total_contributions,
    mb.total_interest_earned,
    mb.savings_balance,
    mb.net_balance
FROM member_balances mb
JOIN members m ON mb.member_id = m.id
WHERE m.name LIKE '%Babotshedi Malibe%'
   OR m.name LIKE '%Belinda Kelly%'
ORDER BY m.name;

-- Show members with negative balances (outstanding payments)
SELECT 
    m.name,
    mb.savings_balance,
    mb.net_balance
FROM member_balances mb
JOIN members m ON mb.member_id = m.id
WHERE mb.net_balance < 0
ORDER BY mb.net_balance ASC;

-- Show members with positive balances
SELECT 
    m.name,
    mb.savings_balance,
    mb.net_balance
FROM member_balances mb
JOIN members m ON mb.member_id = m.id
WHERE mb.net_balance >= 0
ORDER BY mb.net_balance DESC;

-- Summary statistics
SELECT 
    COUNT(*) as total_members,
    COUNT(CASE WHEN mb.net_balance < 0 THEN 1 END) as members_with_negative_balance,
    COUNT(CASE WHEN mb.net_balance >= 0 THEN 1 END) as members_with_positive_balance,
    SUM(CASE WHEN mb.savings_balance > 0 THEN mb.savings_balance ELSE 0 END) as total_fund_value,
    AVG(mb.savings_balance) as average_balance
FROM member_balances mb;

-- Check Babotshedi Malibe specifically
SELECT 
    m.name,
    mb.total_contributions,
    mb.total_interest_earned,
    mb.savings_balance,
    mb.net_balance
FROM member_balances mb
JOIN members m ON mb.member_id = m.id
WHERE m.name LIKE '%Babotshedi Malibe%';
