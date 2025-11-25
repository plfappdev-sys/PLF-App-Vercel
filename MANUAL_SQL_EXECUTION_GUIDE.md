# MANUAL SQL EXECUTION GUIDE

## Problem Summary
The data replacement is failing because:
1. **Members table still has old data** - unique constraint violations
2. **Financial years failing** - superuser query returning empty string

## Solution: Manual SQL Execution

### Step 1: Execute These SQL Commands in Supabase SQL Editor

Copy and paste these commands **ONE BY ONE** into the Supabase SQL Editor and execute them:

```sql
-- 1. DROP FOREIGN KEY CONSTRAINT
ALTER TABLE transactions DROP CONSTRAINT IF EXISTS fk_transactions_member_id;

-- 2. DROP UNIQUE CONSTRAINT ON MEMBERS
ALTER TABLE members DROP CONSTRAINT IF EXISTS members_member_number_key;

-- 3. CLEAR ALL DATA FROM ALL TABLES
DELETE FROM transactions WHERE id IS NOT NULL;
DELETE FROM loans WHERE id IS NOT NULL;
DELETE FROM interest_accruals WHERE id IS NOT NULL;
DELETE FROM contributions WHERE id IS NOT NULL;
DELETE FROM member_balances WHERE id IS NOT NULL;
DELETE FROM audit_logs WHERE id IS NOT NULL;
DELETE FROM financial_years WHERE id IS NOT NULL;
DELETE FROM system_settings WHERE id IS NOT NULL;

-- 4. CLEAR MEMBERS TABLE (except superuser-linked members)
DELETE FROM members WHERE user_id NOT IN (
    SELECT id FROM users WHERE role = 'superuser'
);

-- 5. RE-ADD UNIQUE CONSTRAINT
ALTER TABLE members ADD CONSTRAINT members_member_number_key UNIQUE (member_number);

-- 6. FIX MEMBER_BALANCES TABLE
ALTER TABLE member_balances ALTER COLUMN member_number DROP NOT NULL;
ALTER TABLE member_balances ADD COLUMN IF NOT EXISTS share_value DECIMAL(15,2) DEFAULT 0.00;

-- 7. ENSURE MEMBER_ID COLUMN EXISTS
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS member_id VARCHAR(255);

-- 8. RE-CREATE FOREIGN KEY
ALTER TABLE transactions 
ADD CONSTRAINT fk_transactions_member_id 
FOREIGN KEY (member_id) 
REFERENCES members(member_number);
```

### Step 2: Verify Tables Are Empty

After executing the above commands, run this verification query:

```sql
-- Check all tables are empty
SELECT 'members' as table_name, COUNT(*) as count FROM members
UNION ALL SELECT 'transactions', COUNT(*) FROM transactions
UNION ALL SELECT 'loans', COUNT(*) FROM loans
UNION ALL SELECT 'contributions', COUNT(*) FROM contributions
UNION ALL SELECT 'member_balances', COUNT(*) FROM member_balances
UNION ALL SELECT 'financial_years', COUNT(*) FROM financial_years
UNION ALL SELECT 'system_settings', COUNT(*) FROM system_settings;
```

**Expected Result**: All counts should be 0 except possibly members (which might have superuser-linked members).

### Step 3: Run Data Replacement Script

After confirming the tables are empty, run:

```bash
python complete-data-replacement.py
```

### Step 4: Check Application

After the script completes successfully, check the application to verify:
- ✅ Members show proper balances (not 0)
- ✅ Financial years are configured
- ✅ System settings are populated

## Why This Works

1. **Manual SQL execution** ensures commands run correctly without RPC issues
2. **Proper dependency order** drops constraints before clearing data
3. **Complete data clearing** removes all old member data
4. **Constraint recreation** ensures database integrity

## Troubleshooting

If you still see issues:
1. **Check if members table is truly empty** - run `SELECT COUNT(*) FROM members;`
2. **Verify superusers exist** - run `SELECT * FROM users WHERE role = 'superuser';`
3. **Check foreign key constraint** - run the verification query in the SQL file

This manual approach bypasses any RPC/API issues and ensures the database is properly prepared for the data replacement.
