-- Database Migration Script for PLF Application
-- Add missing columns to members table for Excel data import
-- Created: March 9, 2026
-- Based on ExcelToDatabaseMapping.md analysis

-- ============================================
-- IMPORTANT: Backup your database before running this script
-- ============================================

-- Enable safe mode to prevent accidental data loss
SET client_min_messages TO WARNING;

-- Start transaction for safety
BEGIN;

-- ============================================
-- 1. ADD MISSING COLUMNS TO MEMBERS TABLE
-- ============================================

-- High Priority Columns (Required for MyFundsScreen)
ALTER TABLE members ADD COLUMN IF NOT EXISTS expected_contribution DECIMAL(15, 2) DEFAULT 2400.00;
COMMENT ON COLUMN members.expected_contribution IS 'Annual expected contribution (R2400.0) from Excel - Position 2 in MyFundsScreen';

ALTER TABLE members ADD COLUMN IF NOT EXISTS outstanding_amount DECIMAL(15, 2) DEFAULT 0;
COMMENT ON COLUMN members.outstanding_amount IS 'Outstanding Amount = Outstanding Contributions + Penalties - Position 4 in MyFundsScreen';

ALTER TABLE members ADD COLUMN IF NOT EXISTS outstanding_contributions DECIMAL(15, 2) DEFAULT 0;
COMMENT ON COLUMN members.outstanding_contributions IS 'Total outstanding contributions from Excel - Position 5 in MyFundsScreen';

ALTER TABLE members ADD COLUMN IF NOT EXISTS total_penalties DECIMAL(15, 2) DEFAULT 0;
COMMENT ON COLUMN members.total_penalties IS 'Total penalties for the year from Excel - Position 6 in MyFundsScreen';

-- Medium Priority Columns (Required for calculations)
ALTER TABLE members ADD COLUMN IF NOT EXISTS balance_brought_forward DECIMAL(15, 2) DEFAULT 0;
COMMENT ON COLUMN members.balance_brought_forward IS 'Previous year''s closing balance from Excel - Needed for closing balance calculation';

ALTER TABLE members ADD COLUMN IF NOT EXISTS catch_up_fee DECIMAL(15, 2) DEFAULT 0;
COMMENT ON COLUMN members.catch_up_fee IS 'Catch-up fee amount from Excel - Part of balance brought forward calculation';

-- Low Priority Columns (Additional Excel data)
ALTER TABLE members ADD COLUMN IF NOT EXISTS total_bank_charges DECIMAL(15, 2) DEFAULT 0;
COMMENT ON COLUMN members.total_bank_charges IS 'Total bank charges @ 1.1% from Excel';

ALTER TABLE members ADD COLUMN IF NOT EXISTS share_value DECIMAL(15, 2) DEFAULT 0;
COMMENT ON COLUMN members.share_value IS 'Share value amount from Excel';

ALTER TABLE members ADD COLUMN IF NOT EXISTS capped_penalties DECIMAL(15, 2) DEFAULT 0;
COMMENT ON COLUMN members.capped_penalties IS 'Capped penalties from 2018 until 2024 Nov from Excel';

ALTER TABLE members ADD COLUMN IF NOT EXISTS estimated_annual_contribution DECIMAL(15, 2) DEFAULT 0;
COMMENT ON COLUMN members.estimated_annual_contribution IS 'Estimated 12 months contribution from Excel (column C + column D)';

-- ============================================
-- 2. UPDATE EXISTING COLUMNS (if needed)
-- ============================================

-- Ensure existing columns have correct comments
COMMENT ON COLUMN members.total_contributions IS 'Total contribution for 12 months from Excel - Position 3 in MyFundsScreen';
COMMENT ON COLUMN members.current_balance IS 'Closing balance from Excel - Position 1 (Balance/Balance Due) in MyFundsScreen';
COMMENT ON COLUMN members.total_interest_earned IS 'Total interest earned @ 5.5% from Excel';
COMMENT ON COLUMN members.total_interest_charged IS 'Penalty for the year from Excel (maps to Penalty July 2019- June 2020)';

-- ============================================
-- 3. CREATE INDEXES FOR PERFORMANCE
-- ============================================

-- Indexes for frequently queried columns
CREATE INDEX IF NOT EXISTS idx_members_expected_contribution ON members(expected_contribution);
CREATE INDEX IF NOT EXISTS idx_members_outstanding_amount ON members(outstanding_amount);
CREATE INDEX IF NOT EXISTS idx_members_outstanding_contributions ON members(outstanding_contributions);
CREATE INDEX IF NOT EXISTS idx_members_total_penalties ON members(total_penalties);
CREATE INDEX IF NOT EXISTS idx_members_balance_brought_forward ON members(balance_brought_forward);

-- ============================================
-- 4. UPDATE RLS POLICIES (if RLS is enabled)
-- ============================================

-- Note: RLS policies should allow members to view their own data
-- and admins to manage all data. These policies should already exist
-- from the base schema. If not, you may need to add them.

-- Example RLS policy update (if needed):
-- DROP POLICY IF EXISTS "Members can view own financial data" ON members;
-- CREATE POLICY "Members can view own financial data" ON members
--   FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- 5. VALIDATION QUERIES
-- ============================================

-- Check that columns were added successfully
DO $$
DECLARE
    column_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO column_count
    FROM information_schema.columns 
    WHERE table_name = 'members' 
    AND table_schema = 'public'
    AND column_name IN (
        'expected_contribution',
        'outstanding_amount',
        'outstanding_contributions',
        'total_penalties',
        'balance_brought_forward',
        'catch_up_fee',
        'total_bank_charges',
        'share_value',
        'capped_penalties',
        'estimated_annual_contribution'
    );
    
    IF column_count = 10 THEN
        RAISE NOTICE '✅ All 10 new columns were successfully added to members table';
    ELSE
        RAISE WARNING '⚠️ Only % out of 10 new columns were added. Check for errors.', column_count;
    END IF;
END $$;

-- Show the updated table structure
RAISE NOTICE '============================================';
RAISE NOTICE 'Updated members table structure:';
RAISE NOTICE '============================================';

-- ============================================
-- 6. COMMIT TRANSACTION
-- ============================================

COMMIT;

RAISE NOTICE '✅ Migration completed successfully!';
RAISE NOTICE '';
RAISE NOTICE 'Next steps:';
RAISE NOTICE '1. Run the Excel data import script to populate the new columns';
RAISE NOTICE '2. Update MyFundsScreen to use the new data columns';
RAISE NOTICE '3. Test the implementation with sample data';

-- ============================================
-- 7. ROLLBACK INSTRUCTIONS (for safety)
-- ============================================

-- To rollback this migration (if needed), run:
/*
BEGIN;
ALTER TABLE members DROP COLUMN IF EXISTS expected_contribution;
ALTER TABLE members DROP COLUMN IF EXISTS outstanding_amount;
ALTER TABLE members DROP COLUMN IF EXISTS outstanding_contributions;
ALTER TABLE members DROP COLUMN IF EXISTS total_penalties;
ALTER TABLE members DROP COLUMN IF EXISTS balance_brought_forward;
ALTER TABLE members DROP COLUMN IF EXISTS catch_up_fee;
ALTER TABLE members DROP COLUMN IF EXISTS total_bank_charges;
ALTER TABLE members DROP COLUMN IF EXISTS share_value;
ALTER TABLE members DROP COLUMN IF EXISTS capped_penalties;
ALTER TABLE members DROP COLUMN IF EXISTS estimated_annual_contribution;
DROP INDEX IF EXISTS idx_members_expected_contribution;
DROP INDEX IF EXISTS idx_members_outstanding_amount;
DROP INDEX IF EXISTS idx_members_outstanding_contributions;
DROP INDEX IF EXISTS idx_members_total_penalties;
DROP INDEX IF EXISTS idx_members_balance_brought_forward;
COMMIT;
*/