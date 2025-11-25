-- PLF Member Balance Correction SQL
-- This script updates all member balances with corrected calculations
-- Generated from fix_member_balances.py on 2025-10-28

-- First, let's check if the member_balances table exists and has data
SELECT COUNT(*) as existing_records FROM member_balances;

-- Update Babotshedi Malibe (M001) - The main correction
-- Incorrect Excel balance: R32,191.61
-- Corrected balance: R1,708.77
UPDATE member_balances SET
    total_contributions = 2200.00,
    total_interest_earned = 516.77,
    savings_balance = 1708.77,
    net_balance = 1708.77,
    updated_at = NOW()
WHERE member_number = 'M001' OR member_name LIKE '%Babotshedi Malibe%';

-- Update other members with significant corrections
UPDATE member_balances SET
    total_contributions = 1400.00,
    total_interest_earned = 328.86,
    savings_balance = 664.86,
    net_balance = 664.86,
    updated_at = NOW()
WHERE member_name LIKE '%Belinda Kelly%';

UPDATE member_balances SET
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    updated_at = NOW()
WHERE member_name LIKE '%Boitshoko Dire%';

UPDATE member_balances SET
    total_contributions = 500.00,
    total_interest_earned = 117.45,
    savings_balance = -509.55,
    net_balance = -509.55,
    updated_at = NOW()
WHERE member_name LIKE '%Christopher Naude%';

UPDATE member_balances SET
    total_contributions = 200.00,
    total_interest_earned = 46.98,
    savings_balance = -901.02,
    net_balance = -901.02,
    updated_at = NOW()
WHERE member_name LIKE '%Collin Oliphant%';

-- For members who need to be inserted (if they don't exist in member_balances)
-- This is a sample insert - you'll need to map to actual member IDs
INSERT INTO member_balances (
    member_id, member_number, member_name,
    total_contributions, total_interest_earned,
    savings_balance, net_balance,
    created_at, updated_at
) VALUES 
    (1, 'M001', 'Babotshedi Malibe', 2200.00, 516.77, 1708.77, 1708.77, NOW(), NOW()),
    (2, 'M002', 'Belinda Kelly', 1400.00, 328.86, 664.86, 664.86, NOW(), NOW()),
    (3, 'M003', 'Boitshoko Dire', 13280.00, 3119.43, 16167.03, 16167.03, NOW(), NOW())
ON CONFLICT (member_id) DO UPDATE SET
    total_contributions = EXCLUDED.total_contributions,
    total_interest_earned = EXCLUDED.total_interest_earned,
    savings_balance = EXCLUDED.savings_balance,
    net_balance = EXCLUDED.net_balance,
    updated_at = NOW();

-- Verify the updates
SELECT member_name, total_contributions, total_interest_earned, savings_balance, net_balance
FROM member_balances
WHERE member_name IN ('Babotshedi Malibe', 'Belinda Kelly', 'Boitshoko Dire', 'Christopher Naude', 'Collin Oliphant')
ORDER BY member_name;

-- Count members with negative balances (indicating outstanding payments)
SELECT COUNT(*) as members_with_negative_balance
FROM member_balances
WHERE net_balance < 0;

-- Count members with positive balances
SELECT COUNT(*) as members_with_positive_balance
FROM member_balances
WHERE net_balance >= 0;

-- Total fund value
SELECT SUM(savings_balance) as total_fund_value
FROM member_balances
WHERE savings_balance > 0;
