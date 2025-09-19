-- Simplified members table structure for the import script
-- This matches the JSON structure expected by the import script

CREATE TABLE IF NOT EXISTS members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_number TEXT UNIQUE NOT NULL,
    
    -- Personal information as JSONB
    personal_info JSONB NOT NULL DEFAULT '{}'::jsonb,
    
    -- Financial information as JSONB  
    financial_info JSONB NOT NULL DEFAULT '{
        "total_contributions": 0,
        "current_balance": 0,
        "outstanding_amount": 0,
        "percentage_outstanding": 0,
        "balance_brought_forward": 0,
        "planned_contributions": 0,
        "actual_contributions": 0,
        "current_interest_earned": 0,
        "total_interest_earned": 0,
        "current_interest_charged": 0,
        "total_interest_charged": 0,
        "interest_rate": 5.5
    }'::jsonb,
    
    -- Membership status as JSONB
    membership_status JSONB NOT NULL DEFAULT '{
        "isActive": true,
        "standingCategory": "good"
    }'::jsonb,
    
    -- Interest settings as JSONB
    interest_settings JSONB NOT NULL DEFAULT '{
        "calculationMethod": "daily",
        "compounding": true,
        "taxDeduction": 0
    }'::jsonb,
    
    -- Contribution history (array of contributions)
    contribution_history JSONB DEFAULT '[]'::jsonb,
    
    -- Loan history (array of loans)
    loan_history JSONB DEFAULT '[]'::jsonb,
    
    -- Interest history (array of interest accruals)
    interest_history JSONB DEFAULT '[]'::jsonb,
    
    -- User reference (can be null initially)
    user_id UUID,
    
    -- Join date and timestamps
    join_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Foreign key constraint (optional)
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(uid) ON DELETE SET NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_members_member_number ON members(member_number);
CREATE INDEX IF NOT EXISTS idx_members_user_id ON members(user_id);
CREATE INDEX IF NOT EXISTS idx_members_standing ON members((membership_status->>'standingCategory'));

-- Enable Row Level Security
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies
CREATE POLICY "Members can view own data" ON members FOR SELECT 
    USING (user_id = auth.uid() OR auth.uid() IS NULL);

CREATE POLICY "Admins can manage all members" ON members FOR ALL 
    USING (EXISTS (
        SELECT 1 FROM users 
        WHERE uid = auth.uid() AND role IN ('admin', 'superuser')
    ));

-- Grant permissions
GRANT ALL ON members TO authenticated;
GRANT ALL ON members TO service_role;
