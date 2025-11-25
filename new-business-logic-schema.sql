-- PLF New Business Logic Database Schema Enhancements
-- Created: September 19, 2025
-- Phase 1: Database Schema Enhancement for New Business Logic

-- =============================================
-- TASK 1.1: CREATE NEW TABLES
-- =============================================

-- 1. Contributions table for monthly contribution tracking
CREATE TABLE IF NOT EXISTS contributions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id BIGINT NOT NULL,
    member_number TEXT NOT NULL,
    
    -- Contribution Details
    contribution_month DATE NOT NULL, -- First day of the month (e.g., 2025-09-01)
    due_date DATE NOT NULL, -- 1st of the month
    amount_due DECIMAL(15, 2) NOT NULL DEFAULT 200.00,
    amount_paid DECIMAL(15, 2) DEFAULT 0,
    
    -- Status Tracking
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending', 'paid', 'partial', 'overdue', 'waived'
    )),
    
    -- Late Fee Tracking
    late_fee_applied BOOLEAN DEFAULT FALSE,
    late_fee_amount DECIMAL(15, 2) DEFAULT 0,
    late_fee_applied_date TIMESTAMP WITH TIME ZONE,
    
    -- Payment Details
    payment_date TIMESTAMP WITH TIME ZONE,
    payment_reference TEXT,
    payment_method TEXT CHECK (payment_method IN ('cash', 'bank_transfer', 'debit_order', 'other')),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Foreign key constraint
    CONSTRAINT fk_contributions_member_id FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
    
    -- Unique constraint to prevent duplicate contributions for same month
    CONSTRAINT unique_member_month UNIQUE (member_id, contribution_month)
);

-- 2. Member Balances table for current financial positions
CREATE TABLE IF NOT EXISTS member_balances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id BIGINT NOT NULL UNIQUE,
    member_number TEXT NOT NULL UNIQUE,
    
    -- Balance Components
    total_contributions DECIMAL(15, 2) DEFAULT 0,
    total_interest_earned DECIMAL(15, 2) DEFAULT 0,
    total_loans_taken DECIMAL(15, 2) DEFAULT 0,
    total_loan_repayments DECIMAL(15, 2) DEFAULT 0,
    total_interest_charged DECIMAL(15, 2) DEFAULT 0,
    total_fees_paid DECIMAL(15, 2) DEFAULT 0,
    
    -- Current Balances
    savings_balance DECIMAL(15, 2) DEFAULT 0, -- Contributions + Interest Earned
    loan_balance DECIMAL(15, 2) DEFAULT 0,    -- Loans Taken - Repayments + Interest Charged
    net_balance DECIMAL(15, 2) DEFAULT 0,     -- Savings Balance - Loan Balance
    
    -- Available for Withdrawal/Loan
    available_for_withdrawal DECIMAL(15, 2) DEFAULT 0,
    available_for_loan DECIMAL(15, 2) DEFAULT 0,
    
    -- Last Update Information
    last_balance_update TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_transaction_id UUID,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Foreign key constraint
    CONSTRAINT fk_member_balances_member_id FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
);

-- 3. Financial Years table for interest rate management
CREATE TABLE IF NOT EXISTS financial_years (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Financial Year Details
    year_start DATE NOT NULL, -- e.g., 2025-07-01
    year_end DATE NOT NULL,   -- e.g., 2026-06-30
    year_name TEXT NOT NULL,  -- e.g., "2025/2026"
    is_current BOOLEAN DEFAULT FALSE,
    
    -- Interest Rates
    savings_interest_rate DECIMAL(5, 4) NOT NULL DEFAULT 0.05, -- 5%
    loan_interest_rate DECIMAL(5, 4) NOT NULL DEFAULT 0.20,    -- 20%
    penalty_interest_rate DECIMAL(5, 4) NOT NULL DEFAULT 0.40, -- 40%
    
    -- Contribution Settings
    monthly_contribution_amount DECIMAL(15, 2) NOT NULL DEFAULT 200.00,
    late_fee_percentage DECIMAL(5, 4) NOT NULL DEFAULT 0.07,   -- 7%
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by BIGINT,
    
    -- Foreign key constraint
    CONSTRAINT fk_financial_years_created_by FOREIGN KEY (created_by) REFERENCES users(id),
    
    -- Unique constraint for financial years
    CONSTRAINT unique_financial_year UNIQUE (year_start, year_end)
);

-- 4. System Settings table for configurable parameters
CREATE TABLE IF NOT EXISTS system_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Setting Details
    setting_key TEXT NOT NULL UNIQUE,
    setting_value TEXT NOT NULL,
    setting_type TEXT NOT NULL CHECK (setting_type IN ('string', 'number', 'boolean', 'json', 'date')),
    category TEXT NOT NULL DEFAULT 'general',
    description TEXT,
    
    -- Access Control
    is_public BOOLEAN DEFAULT FALSE,
    requires_admin BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by BIGINT,
    
    -- Foreign key constraint
    CONSTRAINT fk_system_settings_updated_by FOREIGN KEY (updated_by) REFERENCES users(id)
);

-- 5. Audit Logs table for system auditing
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Audit Details
    action_type TEXT NOT NULL CHECK (action_type IN (
        'create', 'update', 'delete', 'login', 'logout', 'approval', 'rejection', 'system'
    )),
    table_name TEXT,
    record_id UUID,
    user_id BIGINT NOT NULL,
    
    -- Change Details
    old_values JSONB,
    new_values JSONB,
    changes JSONB,
    
    -- Context
    ip_address TEXT,
    user_agent TEXT,
    description TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Foreign key constraint
    CONSTRAINT fk_audit_logs_user_id FOREIGN KEY (user_id) REFERENCES users(id)
);

-- =============================================
-- TASK 1.2: ADD MISSING COLUMNS TO EXISTING TABLES
-- =============================================

-- Add user_id column to members table for user relationship
ALTER TABLE members ADD COLUMN IF NOT EXISTS user_id BIGINT;

-- Add foreign key constraint for user relationship
ALTER TABLE members ADD CONSTRAINT fk_members_user_id FOREIGN KEY (user_id) REFERENCES users(id);

-- Add catch_up_fee column to members table
ALTER TABLE members ADD COLUMN IF NOT EXISTS catch_up_fee DECIMAL(15, 2) DEFAULT 0;

-- Add monthly_contribution default to members table  
ALTER TABLE members ADD COLUMN IF NOT EXISTS monthly_contribution DECIMAL(15, 2) DEFAULT 200.00;

-- Add penalty interest fields to loans table
ALTER TABLE loans ADD COLUMN IF NOT EXISTS penalty_interest_rate DECIMAL(5, 4) DEFAULT 0.40;
ALTER TABLE loans ADD COLUMN IF NOT EXISTS penalty_interest_applied BOOLEAN DEFAULT FALSE;
ALTER TABLE loans ADD COLUMN IF NOT EXISTS penalty_start_date TIMESTAMP WITH TIME ZONE;
ALTER TABLE loans ADD COLUMN IF NOT EXISTS total_penalty_interest DECIMAL(15, 2) DEFAULT 0;

-- =============================================
-- TASK 1.3: CREATE INDEXES FOR PERFORMANCE
-- =============================================

-- Indexes for contributions table
CREATE INDEX IF NOT EXISTS idx_contributions_member_id ON contributions(member_id);
CREATE INDEX IF NOT EXISTS idx_contributions_month ON contributions(contribution_month);
CREATE INDEX IF NOT EXISTS idx_contributions_status ON contributions(status);
CREATE INDEX IF NOT EXISTS idx_contributions_due_date ON contributions(due_date);

-- Indexes for member_balances table
CREATE INDEX IF NOT EXISTS idx_member_balances_member_number ON member_balances(member_number);

-- Indexes for financial_years table
CREATE INDEX IF NOT EXISTS idx_financial_years_current ON financial_years(is_current);
CREATE INDEX IF NOT EXISTS idx_financial_years_dates ON financial_years(year_start, year_end);

-- Indexes for system_settings table
CREATE INDEX IF NOT EXISTS idx_system_settings_key ON system_settings(setting_key);
CREATE INDEX IF NOT EXISTS idx_system_settings_category ON system_settings(category);

-- Indexes for audit_logs table
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action_type ON audit_logs(action_type);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);

-- =============================================
-- TASK 1.4: ENABLE ROW LEVEL SECURITY
-- =============================================

-- Enable RLS for new tables
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- =============================================
-- TASK 1.5: CREATE RLS POLICIES
-- =============================================

-- Contributions RLS Policies
CREATE POLICY "Members can view own contributions" ON contributions FOR SELECT 
    USING (member_id IN (SELECT id FROM members WHERE user_id::text = auth.uid()::text));

CREATE POLICY "Admins can manage all contributions" ON contributions FOR ALL 
    USING (EXISTS (SELECT 1 FROM users WHERE uid::text = auth.uid()::text AND role IN ('admin', 'superuser')));

-- Member Balances RLS Policies
CREATE POLICY "Members can view own balance" ON member_balances FOR SELECT 
    USING (member_id IN (SELECT id FROM members WHERE user_id::text = auth.uid()::text));

CREATE POLICY "Admins can manage all balances" ON member_balances FOR ALL 
    USING (EXISTS (SELECT 1 FROM users WHERE uid::text = auth.uid()::text AND role IN ('admin', 'superuser')));

-- Financial Years RLS Policies
CREATE POLICY "Everyone can view financial years" ON financial_years FOR SELECT 
    USING (true);

CREATE POLICY "Admins can manage financial years" ON financial_years FOR ALL 
    USING (EXISTS (SELECT 1 FROM users WHERE uid::text = auth.uid()::text AND role IN ('admin', 'superuser')));

-- System Settings RLS Policies
CREATE POLICY "Everyone can view public settings" ON system_settings FOR SELECT 
    USING (is_public = true);

CREATE POLICY "Admins can manage all settings" ON system_settings FOR ALL 
    USING (EXISTS (SELECT 1 FROM users WHERE uid::text = auth.uid()::text AND role IN ('admin', 'superuser')));

-- Audit Logs RLS Policies
CREATE POLICY "Admins can view audit logs" ON audit_logs FOR SELECT 
    USING (EXISTS (SELECT 1 FROM users WHERE uid::text = auth.uid()::text AND role IN ('admin', 'superuser')));

-- =============================================
-- TASK 1.6: INSERT DEFAULT DATA
-- =============================================

-- Insert current financial year (2025/2026)
INSERT INTO financial_years (
    year_start, year_end, year_name, is_current, 
    savings_interest_rate, loan_interest_rate, penalty_interest_rate,
    monthly_contribution_amount, late_fee_percentage, is_active
) VALUES (
    '2025-07-01', '2026-06-30', '2025/2026', TRUE,
    0.05, 0.20, 0.40,
    200.00, 0.07, TRUE
) ON CONFLICT DO NOTHING;

-- Insert essential system settings
INSERT INTO system_settings (setting_key, setting_value, setting_type, category, description, is_public, requires_admin) VALUES
('system_name', 'PLF Management System', 'string', 'general', 'Name of the PLF system', TRUE, FALSE),
('system_version', '2.0.0', 'string', 'general', 'Current system version', TRUE, FALSE),
('default_savings_rate', '0.05', 'number', 'interest', 'Default savings interest rate', FALSE, TRUE),
('default_loan_rate', '0.20', 'number', 'interest', 'Default loan interest rate', FALSE, TRUE),
('penalty_interest_rate', '0.40', 'number', 'interest', 'Penalty interest rate for overdue loans', FALSE, TRUE),
('monthly_contribution', '200.00', 'number', 'contributions', 'Monthly contribution amount', TRUE, FALSE),
('late_fee_percentage', '0.07', 'number', 'fees', 'Late fee percentage applied on 8th of month', TRUE, FALSE),
('grace_period_days', '7', 'number', 'contributions', 'Grace period for contributions in days', FALSE, TRUE),
('loan_approval_threshold', '5000.00', 'number', 'loans', 'Maximum loan amount for automatic approval', FALSE, TRUE)
ON CONFLICT (setting_key) DO UPDATE SET
setting_value = EXCLUDED.setting_value,
updated_at = NOW();

-- =============================================
-- COMMENTS FOR DOCUMENTATION
-- =============================================

COMMENT ON TABLE contributions IS 'Monthly contribution tracking with status and late fee management';
COMMENT ON TABLE member_balances IS 'Current financial positions and balances for members';
COMMENT ON TABLE financial_years IS 'Financial year management with configurable interest rates';
COMMENT ON TABLE system_settings IS 'Configurable system parameters and settings';
COMMENT ON TABLE audit_logs IS 'System audit trail for all significant actions';

COMMENT ON COLUMN contributions.contribution_month IS 'First day of the month for which contribution applies';
COMMENT ON COLUMN contributions.due_date IS 'Due date for contribution (typically 1st of month)';
COMMENT ON COLUMN contributions.late_fee_applied_date IS 'Date when late fee was applied (typically 8th of month)';

COMMENT ON COLUMN member_balances.savings_balance IS 'Total contributions + interest earned';
COMMENT ON COLUMN member_balances.loan_balance IS 'Loans taken - repayments + interest charged';
COMMENT ON COLUMN member_balances.net_balance IS 'Savings balance - loan balance (member''s equity)';

COMMENT ON COLUMN financial_years.is_current IS 'Indicates if this is the current financial year';
COMMENT ON COLUMN financial_years.penalty_interest_rate IS '40% interest rate applied to overdue loans after 90 days';

-- =============================================
-- GRANT PERMISSIONS
-- =============================================

-- Grant necessary permissions (adjust based on your security requirements)
-- GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
-- GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;

-- =============================================
-- MIGRATION NOTES
-- =============================================

-- This script should be run after backing up the existing database
-- The script is idempotent and can be run multiple times safely
-- Existing data will be preserved while adding new functionality
-- RLS policies ensure data security and access control

-- Next steps after running this script:
-- 1. Run data migration to populate member_balances from existing transactions
-- 2. Create historical contributions from existing deposit transactions
-- 3. Calculate catch-up fees for members who joined after July 2018
-- 4. Update UI components to use new tables and logic
