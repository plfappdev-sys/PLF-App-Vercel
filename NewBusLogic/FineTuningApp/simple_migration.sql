-- Simple Migration Script for Adding Missing Excel Columns to Members Table
-- ======================================================================
-- This script adds the missing Excel columns needed for MyFundsScreen functionality.
-- Execute this script in the Supabase SQL Editor (https://app.supabase.com/project/_/sql)

-- Step 1: Add missing columns to members table
ALTER TABLE members ADD COLUMN IF NOT EXISTS expected_contribution DECIMAL(15, 2) DEFAULT 0;
COMMENT ON COLUMN members.expected_contribution IS 'Annual expected contribution (R2400.0) from Excel - Position 2 in Excel';

ALTER TABLE members ADD COLUMN IF NOT EXISTS outstanding_amount DECIMAL(15, 2) DEFAULT 0;
COMMENT ON COLUMN members.outstanding_amount IS 'Outstanding Amount = Outstanding Contributions + Penalties from Excel - Position 3 in Excel';

ALTER TABLE members ADD COLUMN IF NOT EXISTS outstanding_contributions DECIMAL(15, 2) DEFAULT 0;
COMMENT ON COLUMN members.outstanding_contributions IS 'Total outstanding contributions from Excel - Position 4 in Excel';

ALTER TABLE members ADD COLUMN IF NOT EXISTS total_penalties DECIMAL(15, 2) DEFAULT 0;
COMMENT ON COLUMN members.total_penalties IS 'Total penalties for the year from Excel - Position 6 in Excel';

ALTER TABLE members ADD COLUMN IF NOT EXISTS balance_brought_forward DECIMAL(15, 2) DEFAULT 0;
COMMENT ON COLUMN members.balance_brought_forward IS 'Previous year''s closing balance from Excel - Position 7 in Excel';

ALTER TABLE members ADD COLUMN IF NOT EXISTS total_bank_charges DECIMAL(15, 2) DEFAULT 0;
COMMENT ON COLUMN members.total_bank_charges IS 'Total bank charges @ 1.1% from Excel';

ALTER TABLE members ADD COLUMN IF NOT EXISTS capped_penalties DECIMAL(15, 2) DEFAULT 0;
COMMENT ON COLUMN members.capped_penalties IS 'Capped penalties from 2018 until 2024 Nov from Excel';

ALTER TABLE members ADD COLUMN IF NOT EXISTS estimated_annual_contribution DECIMAL(15, 2) DEFAULT 0;
COMMENT ON COLUMN members.estimated_annual_contribution IS 'Estimated 12 months contribution from Excel';

-- Step 2: Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_members_expected_contribution ON members(expected_contribution);
CREATE INDEX IF NOT EXISTS idx_members_outstanding_amount ON members(outstanding_amount);
CREATE INDEX IF NOT EXISTS idx_members_outstanding_contributions ON members(outstanding_contributions);
CREATE INDEX IF NOT EXISTS idx_members_total_penalties ON members(total_penalties);
CREATE INDEX IF NOT EXISTS idx_members_balance_brought_forward ON members(balance_brought_forward);

-- Step 3: Verify the columns were added
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'members'
    AND column_name IN (
        'expected_contribution',
        'outstanding_amount',
        'outstanding_contributions',
        'total_penalties',
        'balance_brought_forward',
        'total_bank_charges',
        'capped_penalties',
        'estimated_annual_contribution'
    )
ORDER BY column_name;

-- Step 4: Display summary
SELECT 
    'Migration Summary' as summary,
    COUNT(*) as columns_added,
    STRING_AGG(column_name, ', ') as added_columns
FROM information_schema.columns
WHERE table_name = 'members'
    AND column_name IN (
        'expected_contribution',
        'outstanding_amount',
        'outstanding_contributions',
        'total_penalties',
        'balance_brought_forward',
        'total_bank_charges',
        'capped_penalties',
        'estimated_annual_contribution'
    );