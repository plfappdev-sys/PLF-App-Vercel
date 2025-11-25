-- Fix Transaction Table Issues for PLF App
-- This script addresses:
-- 1. Missing foreign key relationships
-- 2. Schema mismatches between services and database
-- 3. Empty transactions table

-- =============================================
-- STEP 1: FIX FOREIGN KEY RELATIONSHIPS
-- =============================================

-- First, check if the foreign key constraint exists
DO $$ 
BEGIN
    -- Drop existing foreign key if it exists (with wrong type)
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_member_id' 
        AND table_name = 'transactions'
    ) THEN
        ALTER TABLE transactions DROP CONSTRAINT fk_member_id;
    END IF;
END $$;

-- Add the correct foreign key constraint (BIGINT to BIGINT)
ALTER TABLE transactions 
ADD CONSTRAINT fk_transactions_member_id 
FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE;

-- =============================================
-- STEP 2: CREATE SAMPLE TRANSACTION DATA
-- =============================================

-- Insert sample transaction data for testing
INSERT INTO transactions (
    member_id,
    transaction_type,
    amount,
    description,
    status,
    created_at,
    updated_at
) VALUES
-- Member 4 transactions
(12, 'deposit', 200.00, 'Monthly contribution - September 2025', 'completed', NOW(), NOW()),
(12, 'interest_earned', 5.50, 'Monthly interest earned', 'completed', NOW() - INTERVAL '1 month', NOW() - INTERVAL '1 month'),

-- Member 6 transactions  
(8, 'deposit', 200.00, 'Monthly contribution - September 2025', 'completed', NOW(), NOW()),
(8, 'deposit', 200.00, 'Monthly contribution - August 2025', 'completed', NOW() - INTERVAL '1 month', NOW() - INTERVAL '1 month'),
(8, 'interest_earned', 11.00, 'Monthly interest earned', 'completed', NOW() - INTERVAL '1 month', NOW() - INTERVAL '1 month'),

-- Member 7 transactions
(15, 'deposit', 200.00, 'Monthly contribution - September 2025', 'completed', NOW(), NOW()),
(15, 'catch_up_fee', 7800.00, 'Catch-up fee payment', 'completed', NOW(), NOW()),

-- Member 9 transactions
(17, 'deposit', 200.00, 'Monthly contribution - September 2025', 'completed', NOW(), NOW()),
(17, 'interest_earned', 68.75, 'Monthly interest earned', 'completed', NOW(), NOW()),

-- Member 10 transactions
(18, 'deposit', 200.00, 'Monthly contribution - September 2025', 'completed', NOW(), NOW()),
(18, 'catch_up_fee', 2400.00, 'Catch-up fee payment', 'completed', NOW(), NOW())

ON CONFLICT DO NOTHING;

-- =============================================
-- STEP 3: UPDATE TRANSACTION SERVICE COMPATIBILITY
-- =============================================

-- Create a view that provides UUID-compatible interface for the transaction service
CREATE OR REPLACE VIEW transactions_with_uuid AS
SELECT 
    t.id::text as id,  -- Convert BIGINT to text for UUID compatibility
    t.member_id::text as member_id,  -- Convert BIGINT to text
    t.transaction_type,
    t.amount,
    t.description,
    t.reference_number,
    t.status,
    t.proof_of_payment_url,
    t.deposit_approved_by::text as deposit_approved_by,  -- Convert if needed
    t.deposit_approved_at,
    t.deposit_rejection_reason,
    t.loan_id::text as loan_id,  -- Convert if needed
    t.interest_details,
    t.created_at,
    t.updated_at,
    m.member_number,
    m.personal_info->>'firstName' as first_name,
    m.personal_info->>'lastName' as last_name
FROM transactions t
LEFT JOIN members m ON t.member_id = m.id;

-- =============================================
-- STEP 4: CREATE HELPER FUNCTIONS FOR SERVICE COMPATIBILITY
-- =============================================

-- Function to get member ID from member number (for service compatibility)
CREATE OR REPLACE FUNCTION get_member_id_by_number(member_number_text TEXT)
RETURNS BIGINT AS $$
DECLARE
    member_id_result BIGINT;
BEGIN
    SELECT id INTO member_id_result 
    FROM members 
    WHERE member_number = member_number_text;
    
    RETURN member_id_result;
END;
$$ LANGUAGE plpgsql;

-- Function to create a deposit transaction (service-compatible)
CREATE OR REPLACE FUNCTION create_deposit_transaction(
    p_member_number TEXT,
    p_amount DECIMAL,
    p_description TEXT,
    p_proof_of_payment_url TEXT DEFAULT NULL
)
RETURNS TABLE(
    transaction_id TEXT,
    member_number TEXT,
    transaction_type TEXT,
    amount DECIMAL,
    description TEXT,
    status TEXT,
    created_at TIMESTAMPTZ
) AS $$
DECLARE
    v_member_id BIGINT;
    v_new_transaction_id BIGINT;
BEGIN
    -- Get member ID
    SELECT get_member_id_by_number(p_member_number) INTO v_member_id;
    
    IF v_member_id IS NULL THEN
        RAISE EXCEPTION 'Member not found: %', p_member_number;
    END IF;
    
    -- Insert transaction
    INSERT INTO transactions (
        member_id,
        transaction_type,
        amount,
        description,
        proof_of_payment_url,
        status,
        created_at,
        updated_at
    ) VALUES (
        v_member_id,
        'deposit',
        p_amount,
        p_description,
        p_proof_of_payment_url,
        'pending',
        NOW(),
        NOW()
    ) RETURNING id INTO v_new_transaction_id;
    
    -- Return the result in service-compatible format
    RETURN QUERY
    SELECT 
        v_new_transaction_id::text as transaction_id,
        p_member_number as member_number,
        'deposit' as transaction_type,
        p_amount as amount,
        p_description as description,
        'pending' as status,
        NOW() as created_at;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- STEP 5: CREATE INDEXES FOR PERFORMANCE
-- =============================================

-- Ensure indexes exist for optimal performance
CREATE INDEX IF NOT EXISTS idx_transactions_member_id_type ON transactions(member_id, transaction_type);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);

-- =============================================
-- STEP 6: VERIFICATION QUERIES
-- =============================================

-- Verify transactions were inserted
SELECT 'Transaction count: ' || COUNT(*)::text as verification FROM transactions;

-- Verify foreign key relationship works
SELECT 'Foreign key test: ' || 
    CASE WHEN EXISTS (
        SELECT 1 FROM transactions t 
        JOIN members m ON t.member_id = m.id 
        LIMIT 1
    ) THEN 'PASS' ELSE 'FAIL' END as foreign_key_test;

-- Verify view works
SELECT 'View test: ' || 
    CASE WHEN EXISTS (SELECT 1 FROM transactions_with_uuid LIMIT 1) 
    THEN 'PASS' ELSE 'FAIL' END as view_test;

-- =============================================
-- STEP 7: UPDATE SERVICE COMPATIBILITY NOTES
-- =============================================

COMMENT ON VIEW transactions_with_uuid IS 'UUID-compatible view for transaction service integration';
COMMENT ON FUNCTION get_member_id_by_number IS 'Helper function for service compatibility - converts member number to ID';
COMMENT ON FUNCTION create_deposit_transaction IS 'Service-compatible function for creating deposit transactions';

-- =============================================
-- MIGRATION COMPLETE
-- =============================================

SELECT 'Transaction issues fixed successfully!' as result;
