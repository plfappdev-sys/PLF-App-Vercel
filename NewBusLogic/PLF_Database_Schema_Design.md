# PLF Supabase Database Schema Design

## Overview
This document outlines the comprehensive database schema for the People's Liberator Fund (PLF) Supabase integration, based on analysis of the Excel data and business requirements.

## Core Tables Structure

### 1. **users** (Authentication & User Management)
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    uid UUID REFERENCES auth.users(id),
    role TEXT DEFAULT 'member' CHECK (role IN ('superuser', 'admin', 'executive', 'member')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. **members** (Member Profile & Fund Information)
```sql
CREATE TABLE members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    member_number TEXT UNIQUE NOT NULL, -- e.g., "Member 1", "Member 2"
    name TEXT,
    email TEXT,
    phone TEXT,
    id_number TEXT,
    address JSONB, -- {street, city, postal_code, country}
    
    -- Fund Membership Details
    date_joined DATE,
    start_date DATE, -- Fund start date (usually 01/07/2018)
    membership_fee DECIMAL(10,2) DEFAULT 0.00,
    monthly_contribution DECIMAL(10,2) DEFAULT 200.00,
    catch_up_fee DECIMAL(10,2) DEFAULT 0.00,
    
    -- Current Status
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'terminated')),
    termination_date DATE,
    termination_reason TEXT,
    
    -- Banking Details
    bank_name TEXT,
    account_number TEXT,
    branch_code TEXT,
    account_holder TEXT,
    
    -- Employment Information
    employer TEXT,
    position TEXT,
    salary_date DATE,
    employment_date DATE,
    work_address JSONB,
    work_contact TEXT,
    
    -- Next of Kin
    next_of_kin_name TEXT,
    next_of_kin_contact TEXT,
    next_of_kin_relationship TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. **contributions** (Monthly Contributions & Payments)
```sql
CREATE TABLE contributions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID REFERENCES members(id) NOT NULL,
    
    -- Contribution Period
    financial_year TEXT NOT NULL, -- e.g., "2024-2025"
    contribution_month DATE NOT NULL, -- First day of month
    
    -- Amounts
    expected_amount DECIMAL(10,2) NOT NULL DEFAULT 200.00,
    actual_amount DECIMAL(10,2) DEFAULT 0.00,
    outstanding_amount DECIMAL(10,2) GENERATED ALWAYS AS (expected_amount - actual_amount) STORED,
    
    -- Payment Details
    payment_date DATE,
    payment_method TEXT, -- 'bank_transfer', 'cash', 'debit_order'
    payment_reference TEXT,
    
    -- Fees and Penalties
    bank_charges DECIMAL(10,2) DEFAULT 0.00,
    late_fee DECIMAL(10,2) DEFAULT 0.00,
    penalty_amount DECIMAL(10,2) DEFAULT 0.00,
    
    -- Status
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'partial', 'overdue')),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. **transactions** (All Financial Transactions)
```sql
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID REFERENCES members(id),
    
    -- Transaction Details
    transaction_date DATE NOT NULL,
    transaction_type TEXT NOT NULL CHECK (transaction_type IN (
        'contribution', 'loan_disbursement', 'loan_repayment', 
        'interest_earned', 'interest_charged', 'late_fee', 
        'bank_charges', 'penalty', 'membership_fee', 'catch_up_fee'
    )),
    
    -- Amounts
    amount DECIMAL(10,2) NOT NULL,
    fee DECIMAL(10,2) DEFAULT 0.00,
    
    -- References
    reference_id UUID, -- Links to contributions, loans, etc.
    reference_type TEXT, -- 'contribution', 'loan', 'interest_accrual'
    
    -- Transaction Details
    description TEXT,
    payment_method TEXT,
    payment_reference TEXT,
    
    -- Grouping (from Excel data)
    group_name TEXT, -- For categorizing transactions
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 5. **loans** (Loan Applications & Management)
```sql
CREATE TABLE loans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID REFERENCES members(id) NOT NULL,
    
    -- Loan Details
    loan_amount DECIMAL(10,2) NOT NULL,
    loan_term_months INTEGER NOT NULL DEFAULT 3,
    interest_rate DECIMAL(5,4) NOT NULL DEFAULT 0.20, -- 20% per annum
    
    -- Dates
    application_date DATE NOT NULL DEFAULT CURRENT_DATE,
    approval_date DATE,
    disbursement_date DATE,
    due_date DATE,
    
    -- Status
    status TEXT DEFAULT 'pending' CHECK (status IN (
        'pending', 'approved', 'disbursed', 'active', 
        'completed', 'overdue', 'defaulted', 'rejected'
    )),
    
    -- Calculated Amounts
    total_interest DECIMAL(10,2),
    total_amount_due DECIMAL(10,2),
    amount_paid DECIMAL(10,2) DEFAULT 0.00,
    outstanding_balance DECIMAL(10,2),
    
    -- Penalty Information
    penalty_start_date DATE, -- When penalty interest starts (after 3 months)
    penalty_rate DECIMAL(5,4) DEFAULT 0.40, -- 40% per annum (20% + 20% penalty)
    
    -- Application Details
    purpose TEXT,
    employment_info JSONB,
    banking_details JSONB,
    next_of_kin JSONB,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 6. **interest_accruals** (Interest Calculations & Tracking)
```sql
CREATE TABLE interest_accruals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID REFERENCES members(id) NOT NULL,
    
    -- Accrual Period
    accrual_date DATE NOT NULL,
    financial_year TEXT NOT NULL,
    
    -- Interest Types
    accrual_type TEXT NOT NULL CHECK (accrual_type IN (
        'savings_interest', 'loan_interest', 'penalty_interest'
    )),
    
    -- Calculation Details
    principal_amount DECIMAL(10,2) NOT NULL,
    interest_rate DECIMAL(5,4) NOT NULL,
    days_calculated INTEGER NOT NULL,
    interest_amount DECIMAL(10,2) NOT NULL,
    
    -- References
    reference_id UUID, -- Links to loans, contributions, etc.
    reference_type TEXT,
    
    -- Calculation Metadata
    calculation_method TEXT DEFAULT 'daily_compound',
    source_resolution TEXT, -- e.g., "PLF-AGM/2023/007"
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 7. **member_balances** (Current Financial Position)
```sql
CREATE TABLE member_balances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID REFERENCES members(id) NOT NULL UNIQUE,
    
    -- Current Balances
    total_contributions DECIMAL(10,2) DEFAULT 0.00,
    total_interest_earned DECIMAL(10,2) DEFAULT 0.00,
    total_fees_paid DECIMAL(10,2) DEFAULT 0.00,
    total_penalties DECIMAL(10,2) DEFAULT 0.00,
    
    -- Outstanding Amounts
    outstanding_contributions DECIMAL(10,2) DEFAULT 0.00,
    outstanding_loans DECIMAL(10,2) DEFAULT 0.00,
    outstanding_fees DECIMAL(10,2) DEFAULT 0.00,
    
    -- Calculated Values
    share_value DECIMAL(10,2) DEFAULT 0.00,
    net_balance DECIMAL(10,2) DEFAULT 0.00,
    
    -- Last Calculation
    last_calculated_date DATE DEFAULT CURRENT_DATE,
    
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 8. **financial_years** (Fund Financial Year Management)
```sql
CREATE TABLE financial_years (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    year_name TEXT UNIQUE NOT NULL, -- e.g., "2024-2025"
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    
    -- Interest Rates for the Year
    savings_interest_rate DECIMAL(5,4),
    loan_interest_rate DECIMAL(5,4) DEFAULT 0.20,
    late_fee_rate DECIMAL(5,4) DEFAULT 0.07,
    
    -- Status
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed')),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 9. **system_settings** (Configurable System Parameters)
```sql
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key TEXT UNIQUE NOT NULL,
    setting_value TEXT NOT NULL,
    setting_type TEXT DEFAULT 'string' CHECK (setting_type IN ('string', 'number', 'boolean', 'json')),
    description TEXT,
    
    -- Metadata
    category TEXT, -- 'interest_rates', 'fees', 'general'
    is_configurable BOOLEAN DEFAULT true,
    
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES users(id)
);
```

### 10. **audit_logs** (System Audit Trail)
```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    
    -- Action Details
    action TEXT NOT NULL, -- 'create', 'update', 'delete', 'calculate'
    table_name TEXT NOT NULL,
    record_id UUID,
    
    -- Changes
    old_values JSONB,
    new_values JSONB,
    
    -- Context
    ip_address INET,
    user_agent TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Indexes for Performance

```sql
-- Member lookups
CREATE INDEX idx_members_member_number ON members(member_number);
CREATE INDEX idx_members_user_id ON members(user_id);
CREATE INDEX idx_members_status ON members(status);

-- Contribution queries
CREATE INDEX idx_contributions_member_id ON contributions(member_id);
CREATE INDEX idx_contributions_financial_year ON contributions(financial_year);
CREATE INDEX idx_contributions_month ON contributions(contribution_month);
CREATE INDEX idx_contributions_status ON contributions(status);

-- Transaction queries
CREATE INDEX idx_transactions_member_id ON transactions(member_id);
CREATE INDEX idx_transactions_date ON transactions(transaction_date);
CREATE INDEX idx_transactions_type ON transactions(transaction_type);

-- Loan queries
CREATE INDEX idx_loans_member_id ON loans(member_id);
CREATE INDEX idx_loans_status ON loans(status);
CREATE INDEX idx_loans_due_date ON loans(due_date);

-- Interest calculations
CREATE INDEX idx_interest_accruals_member_id ON interest_accruals(member_id);
CREATE INDEX idx_interest_accruals_date ON interest_accruals(accrual_date);
CREATE INDEX idx_interest_accruals_type ON interest_accruals(accrual_type);
```

## Row Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE interest_accruals ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_balances ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = uid);

-- Members can only see their own data
CREATE POLICY "Members can view own data" ON members
    FOR SELECT USING (
        user_id IN (SELECT id FROM users WHERE uid = auth.uid())
    );

-- Superusers and admins can see all data
CREATE POLICY "Superusers can view all data" ON members
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE uid = auth.uid() 
            AND role IN ('superuser', 'admin')
        )
    );
```

## Data Migration Strategy

### Phase 1: Core Tables
1. Create users and members tables
2. Import member data from Excel
3. Set up authentication links

### Phase 2: Historical Data
1. Import contribution data by financial year
2. Import transaction history
3. Calculate and import member balances

### Phase 3: Advanced Features
1. Set up interest calculation system
2. Import loan data
3. Configure system settings

This schema provides a robust foundation for the PLF app with proper normalization, audit trails, and security policies.

