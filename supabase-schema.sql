-- PLF App Database Schema for Supabase
-- Created: September 16, 2025

-- Enable UUID extension for primary keys
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (for authentication and user profiles)
CREATE TABLE users (
    uid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'admin', 'executive', 'superuser')),
    
    -- Personal Information
    personal_info JSONB DEFAULT '{}'::jsonb,
    
    -- Account Status
    account_status JSONB DEFAULT '{
        "isActive": true,
        "isVerified": false,
        "verificationDocuments": {
            "verificationStatus": "pending"
        }
    }'::jsonb,
    
    -- Membership Information
    membership_info JSONB DEFAULT '{}'::jsonb,
    member_number TEXT UNIQUE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    
    -- Indexes for performance
    CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users(uid)
);

-- Members table (extended member information)
CREATE TABLE members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE,
    member_number TEXT UNIQUE NOT NULL,
    
    -- Personal Details
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    id_number TEXT,
    date_of_birth DATE,
    gender TEXT CHECK (gender IN ('male', 'female', 'other')),
    contact_number TEXT,
    
    -- Address Information
    physical_address JSONB DEFAULT '{}'::jsonb,
    postal_address JSONB DEFAULT '{}'::jsonb,
    
    -- Employment Information
    employment_info JSONB DEFAULT '{}'::jsonb,
    
    -- Banking Details
    banking_details JSONB DEFAULT '{}'::jsonb,
    
    -- Next of Kin
    next_of_kin JSONB DEFAULT '{}'::jsonb,
    
    -- Financial Information
    total_contributions DECIMAL(15, 2) DEFAULT 0,
    total_loans DECIMAL(15, 2) DEFAULT 0,
    total_repayments DECIMAL(15, 2) DEFAULT 0,
    current_balance DECIMAL(15, 2) DEFAULT 0,
    
    -- Interest Tracking
    current_interest_earned DECIMAL(15, 2) DEFAULT 0,
    total_interest_earned DECIMAL(15, 2) DEFAULT 0,
    current_interest_charged DECIMAL(15, 2) DEFAULT 0,
    total_interest_charged DECIMAL(15, 2) DEFAULT 0,
    last_interest_calculation TIMESTAMP WITH TIME ZONE,
    interest_rate DECIMAL(5, 4) DEFAULT 0.05,
    
    -- Status
    membership_status TEXT DEFAULT 'active' CHECK (membership_status IN ('active', 'inactive', 'suspended')),
    financial_standing TEXT DEFAULT 'good' CHECK (financial_standing IN ('good', 'owing', 'delinquent')),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Foreign key constraint
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(uid) ON DELETE CASCADE
);

-- Transactions table (for all financial transactions)
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID NOT NULL,
    transaction_type TEXT NOT NULL CHECK (transaction_type IN (
        'deposit', 'withdrawal', 'loan_disbursement', 'loan_repayment',
        'interest_earned', 'interest_charged', 'fee', 'adjustment'
    )),
    
    -- Transaction Details
    amount DECIMAL(15, 2) NOT NULL,
    description TEXT,
    reference_number TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed', 'failed')),
    
    -- Deposit Specific
    proof_of_payment_url TEXT,
    deposit_approved_by UUID,
    deposit_approved_at TIMESTAMP WITH TIME ZONE,
    deposit_rejection_reason TEXT,
    
    -- Loan Specific
    loan_id UUID,
    interest_details JSONB DEFAULT '{}'::jsonb,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Foreign keys
    CONSTRAINT fk_member_id FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
    CONSTRAINT fk_deposit_approved_by FOREIGN KEY (deposit_approved_by) REFERENCES users(uid)
);

-- Loans table
CREATE TABLE loans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID NOT NULL,
    loan_type TEXT NOT NULL CHECK (loan_type IN ('emergency', 'education', 'business', 'home', 'vehicle')),
    
    -- Loan Details
    loan_amount DECIMAL(15, 2) NOT NULL,
    approved_amount DECIMAL(15, 2),
    interest_rate DECIMAL(5, 4) NOT NULL,
    loan_term INTEGER NOT NULL, -- in months
    monthly_repayment DECIMAL(15, 2),
    total_repayable DECIMAL(15, 2),
    
    -- Application Details
    application_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    purpose TEXT,
    employment_status TEXT,
    monthly_income DECIMAL(15, 2),
    
    -- Guarantors
    guarantors JSONB DEFAULT '[]'::jsonb,
    
    -- Approval Process
    status TEXT DEFAULT 'pending' CHECK (status IN (
        'pending', 'approved', 'rejected', 'disbursed', 'active', 'completed', 'defaulted'
    )),
    approved_by UUID,
    approved_at TIMESTAMP WITH TIME ZONE,
    approval_conditions TEXT,
    rejection_reason TEXT,
    
    -- Disbursement
    disbursement_date TIMESTAMP WITH TIME ZONE,
    disbursement_method TEXT,
    
    -- Repayment
    next_payment_date TIMESTAMP WITH TIME ZONE,
    total_paid DECIMAL(15, 2) DEFAULT 0,
    remaining_balance DECIMAL(15, 2),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Foreign keys
    CONSTRAINT fk_member_id FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
    CONSTRAINT fk_approved_by FOREIGN KEY (approved_by) REFERENCES users(uid)
);

-- Interest Accrual table (for audit trail)
CREATE TABLE interest_accruals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID NOT NULL,
    calculation_date DATE NOT NULL,
    interest_type TEXT NOT NULL CHECK (interest_type IN ('earned', 'charged')),
    
    -- Calculation Details
    principal_amount DECIMAL(15, 2) NOT NULL,
    interest_rate DECIMAL(5, 4) NOT NULL,
    daily_interest DECIMAL(15, 6) NOT NULL,
    accrued_interest DECIMAL(15, 2) NOT NULL,
    
    -- Period
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    
    -- Status
    is_capitalized BOOLEAN DEFAULT FALSE,
    capitalization_date TIMESTAMP WITH TIME ZONE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Foreign key
    CONSTRAINT fk_member_id FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_member_number ON users(member_number);
CREATE INDEX idx_members_user_id ON members(user_id);
CREATE INDEX idx_members_member_number ON members(member_number);
CREATE INDEX idx_transactions_member_id ON transactions(member_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_loans_member_id ON loans(member_id);
CREATE INDEX idx_loans_status ON loans(status);
CREATE INDEX idx_interest_accruals_member_id ON interest_accruals(member_id);
CREATE INDEX idx_interest_accruals_date ON interest_accruals(calculation_date);

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE interest_accruals ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (basic examples - customize as needed)
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = uid);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = uid);

CREATE POLICY "Members can view own data" ON members FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all members" ON members FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE uid = auth.uid() AND role IN ('admin', 'superuser'))
);

-- Insert default superuser (you'll need to create this user in Auth first, then update the UID)
-- INSERT INTO users (uid, email, role, personal_info, member_number, created_by)
-- VALUES (
--     'replace-with-actual-superuser-uid-from-auth', 
--     'superuser@plf.com', 
--     'superuser', 
--     '{"firstName": "Super", "lastName": "User"}'::jsonb,
--     'SUPER001',
--     'replace-with-actual-superuser-uid-from-auth'
-- );

-- Comments for documentation
COMMENT ON TABLE users IS 'User authentication and basic profile information';
COMMENT ON TABLE members IS 'Extended member information and financial data';
COMMENT ON TABLE transactions IS 'All financial transactions including deposits, withdrawals, and loan payments';
COMMENT ON TABLE loans IS 'Loan applications and management';
COMMENT ON TABLE interest_accruals IS 'Daily interest calculation audit trail';

-- Grant necessary permissions (adjust based on your security requirements)
-- GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
-- GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
