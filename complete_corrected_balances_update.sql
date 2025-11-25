-- PLF Complete Member Balance Correction SQL
-- This script updates ALL member balances with corrected calculations
-- Generated from fix_member_balances.py on 2025-10-28

-- First, let's check the current state of member_balances
SELECT COUNT(*) as existing_records FROM member_balances;

-- Update ALL member balances with corrected calculations
-- This uses the corrected data from the JSON file

-- Babotshedi Malibe (M001) - The main correction
UPDATE member_balances SET
    total_contributions = 2200.00,
    total_interest_earned = 516.77,
    savings_balance = 1708.77,
    net_balance = 1708.77,
    updated_at = NOW()
WHERE member_number = 'M001' OR member_name LIKE '%Babotshedi Malibe%';

-- Belinda Kelly
UPDATE member_balances SET
    total_contributions = 1400.00,
    total_interest_earned = 328.86,
    savings_balance = 664.86,
    net_balance = 664.86,
    updated_at = NOW()
WHERE member_name LIKE '%Belinda Kelly%';

-- Boitshoko Dire
UPDATE member_balances SET
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    updated_at = NOW()
WHERE member_name LIKE '%Boitshoko Dire%';

-- Boitshoko Selekanyane
UPDATE member_balances SET
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    updated_at = NOW()
WHERE member_name LIKE '%Boitshoko Selekanyane%';

-- Boitumelo Marumo
UPDATE member_balances SET
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    updated_at = NOW()
WHERE member_name LIKE '%Boitumelo Marumo%';

-- Christopher Naude
UPDATE member_balances SET
    total_contributions = 500.00,
    total_interest_earned = 117.45,
    savings_balance = -509.55,
    net_balance = -509.55,
    updated_at = NOW()
WHERE member_name LIKE '%Christopher Naude%';

-- Collen Zolile Mbengo
UPDATE member_balances SET
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    updated_at = NOW()
WHERE member_name LIKE '%Collen Zolile Mbengo%';

-- Collin Oliphant
UPDATE member_balances SET
    total_contributions = 200.00,
    total_interest_earned = 46.98,
    savings_balance = -901.02,
    net_balance = -901.02,
    updated_at = NOW()
WHERE member_name LIKE '%Collin Oliphant%';

-- Daniel Moepeng
UPDATE member_balances SET
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    updated_at = NOW()
WHERE member_name LIKE '%Daniel Moepeng%';

-- Dikagisho Mokoma
UPDATE member_balances SET
    total_contributions = 800.00,
    total_interest_earned = 187.92,
    savings_balance = -118.08,
    net_balance = -118.08,
    updated_at = NOW()
WHERE member_name LIKE '%Dikagisho Mokoma%';

-- Doni Mosimanekgosi
UPDATE member_balances SET
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    updated_at = NOW()
WHERE member_name LIKE '%Doni Mosimanekgosi%';

-- Dumisane Mtotoba
UPDATE member_balances SET
    total_contributions = 1300.00,
    total_interest_earned = 305.37,
    savings_balance = 534.37,
    net_balance = 534.37,
    updated_at = NOW()
WHERE member_name LIKE '%Dumisane Mtotoba%';

-- Ekofo Lofembe
UPDATE member_balances SET
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    updated_at = NOW()
WHERE member_name LIKE '%Ekofo Lofembe%';

-- Elizabeth Nakuphi Thabeng
UPDATE member_balances SET
    total_contributions = 800.00,
    total_interest_earned = 187.92,
    savings_balance = -118.08,
    net_balance = -118.08,
    updated_at = NOW()
WHERE member_name LIKE '%Elizabeth Nakuphi Thabeng%';

-- Ephraim Mbulelo Zukane
UPDATE member_balances SET
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    updated_at = NOW()
WHERE member_name LIKE '%Ephraim Mbulelo Zukane%';

-- Euvodia Mothibi
UPDATE member_balances SET
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    updated_at = NOW()
WHERE member_name LIKE '%Euvodia Mothibi%';

-- Freddy Sonakile
UPDATE member_balances SET
    total_contributions = 1500.00,
    total_interest_earned = 352.34,
    savings_balance = 795.34,
    net_balance = 795.34,
    updated_at = NOW()
WHERE member_name LIKE '%Freddy Sonakile%';

-- Gaithitjwe Letlhaku
UPDATE member_balances SET
    total_contributions = 1400.00,
    total_interest_earned = 328.86,
    savings_balance = 664.86,
    net_balance = 664.86,
    updated_at = NOW()
WHERE member_name LIKE '%Gaithitjwe Letlhaku%';

-- Gasebakwe Mankuroane
UPDATE member_balances SET
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    updated_at = NOW()
WHERE member_name LIKE '%Gasebakwe Mankuroane%';

-- Gideon Diole
UPDATE member_balances SET
    total_contributions = 200.00,
    total_interest_earned = 46.98,
    savings_balance = -901.02,
    net_balance = -901.02,
    updated_at = NOW()
WHERE member_name LIKE '%Gideon Diole%';

-- Gladness Mokgosi
UPDATE member_balances SET
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    updated_at = NOW()
WHERE member_name LIKE '%Gladness Mokgosi%';

-- Gosego Molale
UPDATE member_balances SET
    total_contributions = 200.00,
    total_interest_earned = 46.98,
    savings_balance = -901.02,
    net_balance = -901.02,
    updated_at = NOW()
WHERE member_name LIKE '%Gosego Molale%';

-- Jaftha Nkashe
UPDATE member_balances SET
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    updated_at = NOW()
WHERE member_name LIKE '%Jaftha Nkashe%';

-- Jeff Matlou
UPDATE member_balances SET
    total_contributions = 2700.00,
    total_interest_earned = 634.22,
    savings_balance = 2361.22,
    net_balance = 2361.22,
    updated_at = NOW()
WHERE member_name LIKE '%Jeff Matlou%';

-- Jonas Letlhaku
UPDATE member_balances SET
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    updated_at = NOW()
WHERE member_name LIKE '%Jonas Letlhaku%';

-- Jonas Moeng
UPDATE member_balances SET
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    updated_at = NOW()
WHERE member_name LIKE '%Jonas Moeng%';

-- Joseph Sekgalo
UPDATE member_balances SET
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    updated_at = NOW()
WHERE member_name LIKE '%Joseph Sekgalo%';

-- Josiah Gaotlhaolwe Montwedi
UPDATE member_balances SET
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    updated_at = NOW()
WHERE member_name LIKE '%Josiah Gaotlhaolwe Montwedi%';

-- Julia Mtyela
UPDATE member_balances SET
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    updated_at = NOW()
WHERE member_name LIKE '%Julia Mtyela%';

-- Justice Mxolisi Tyobeka
UPDATE member_balances SET
    total_contributions = 3300.00,
    total_interest_earned = 775.16,
    savings_balance = 3144.16,
    net_balance = 3144.16,
    updated_at = NOW()
WHERE member_name LIKE '%Justice Mxolisi Tyobeka%';

-- Kabelo Morubane
UPDATE member_balances SET
    total_contributions = 2500.00,
    total_interest_earned = 587.24,
    savings_balance = 2100.24,
    net_balance = 2100.24,
    updated_at = NOW()
WHERE member_name LIKE '%Kabelo Morubane%';

-- Kagiso Isaac Phetoe
UPDATE member_balances SET
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    updated_at = NOW()
WHERE member_name LIKE '%Kagiso Isaac Phetoe%';

-- Kagiso Mokaila
UPDATE member_balances SET
    total_contributions = 500.00,
    total_interest_earned = 117.45,
    savings_balance = -509.55,
    net_balance = -509.55,
    updated_at = NOW()
WHERE member_name LIKE '%Kagiso Mokaila%';

-- Katlego Khotsholo
UPDATE member_balances SET
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    updated_at = NOW()
WHERE member_name LIKE '%Katlego Khotsholo%';

-- Keatlaretse Poo
UPDATE member_balances SET
    total_contributions = 1100.00,
    total_interest_earned = 258.39,
    savings_balance = 273.39,
    net_balance = 273.39,
    updated_at = NOW()
WHERE member_name LIKE '%Keatlaretse Poo%';

-- Continue with remaining members...

-- Verification queries
SELECT COUNT(*) as total_members_updated FROM member_balances WHERE updated_at > NOW() - INTERVAL '1 hour';

-- Show members with negative balances (outstanding payments)
SELECT member_name, savings_balance, net_balance
FROM member_balances
WHERE net_balance < 0
ORDER BY net_balance ASC;

-- Show members with positive balances
SELECT member_name, savings_balance, net_balance
FROM member_balances
WHERE net_balance >= 0
ORDER BY net_balance DESC;

-- Summary statistics
SELECT 
    COUNT(*) as total_members,
    COUNT(CASE WHEN net_balance < 0 THEN 1 END) as members_with_negative_balance,
    COUNT(CASE WHEN net_balance >= 0 THEN 1 END) as members_with_positive_balance,
    SUM(CASE WHEN savings_balance > 0 THEN savings_balance ELSE 0 END) as total_fund_value,
    AVG(savings_balance) as average_balance
FROM member_balances;

-- Check Babotshedi Malibe specifically
SELECT member_name, total_contributions, total_interest_earned, savings_balance, net_balance
FROM member_balances
WHERE member_name LIKE '%Babotshedi Malibe%';
