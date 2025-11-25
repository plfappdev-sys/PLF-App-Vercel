const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Configuration
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://zdnyhzasvifrskbostgn.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY;

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function executeSQLFix() {
  console.log('Executing SQL fix commands...');
  
  try {
    // 1. FIRST DROP THE FOREIGN KEY CONSTRAINT (to break the dependency)
    console.log('1. Dropping foreign key constraint...');
    await supabase.rpc('exec_sql', { sql: 'ALTER TABLE transactions DROP CONSTRAINT IF EXISTS fk_transactions_member_id;' });
    
    // 2. THEN DROP THE UNIQUE CONSTRAINT ON MEMBERS (now no dependency)
    console.log('2. Dropping unique constraint on members...');
    await supabase.rpc('exec_sql', { sql: 'ALTER TABLE members DROP CONSTRAINT IF EXISTS members_member_number_key;' });
    
    // 3. CLEAR ALL DATA FROM ALL TABLES (except superusers)
    console.log('3. Clearing all data from tables...');
    await supabase.rpc('exec_sql', { sql: 'DELETE FROM transactions WHERE id IS NOT NULL;' });
    await supabase.rpc('exec_sql', { sql: 'DELETE FROM loans WHERE id IS NOT NULL;' });
    await supabase.rpc('exec_sql', { sql: 'DELETE FROM interest_accruals WHERE id IS NOT NULL;' });
    await supabase.rpc('exec_sql', { sql: 'DELETE FROM contributions WHERE id IS NOT NULL;' });
    await supabase.rpc('exec_sql', { sql: 'DELETE FROM member_balances WHERE id IS NOT NULL;' });
    await supabase.rpc('exec_sql', { sql: 'DELETE FROM audit_logs WHERE id IS NOT NULL;' });
    await supabase.rpc('exec_sql', { sql: 'DELETE FROM financial_years WHERE id IS NOT NULL;' });
    await supabase.rpc('exec_sql', { sql: 'DELETE FROM system_settings WHERE id IS NOT NULL;' });
    
    // 4. CLEAR MEMBERS TABLE (except those linked to superusers)
    console.log('4. Clearing members table...');
    await supabase.rpc('exec_sql', { sql: `DELETE FROM members WHERE user_id NOT IN (SELECT id FROM users WHERE role = 'superuser');` });
    
    // 5. RE-ADD THE UNIQUE CONSTRAINT ON MEMBERS
    console.log('5. Re-adding unique constraint on members...');
    await supabase.rpc('exec_sql', { sql: 'ALTER TABLE members ADD CONSTRAINT members_member_number_key UNIQUE (member_number);' });
    
    // 6. FIX MEMBER_BALANCES TABLE ISSUES
    console.log('6. Fixing member_balances table...');
    await supabase.rpc('exec_sql', { sql: 'ALTER TABLE member_balances ALTER COLUMN member_number DROP NOT NULL;' });
    await supabase.rpc('exec_sql', { sql: 'ALTER TABLE member_balances ADD COLUMN IF NOT EXISTS share_value DECIMAL(15,2) DEFAULT 0.00;' });
    
    // 7. ENSURE MEMBER_ID COLUMN EXISTS IN TRANSACTIONS
    console.log('7. Ensuring member_id column exists in transactions...');
    await supabase.rpc('exec_sql', { sql: 'ALTER TABLE transactions ADD COLUMN IF NOT EXISTS member_id VARCHAR(255);' });
    
    // 8. RE-CREATE THE FOREIGN KEY CONSTRAINT (after members are properly set up)
    console.log('8. Re-creating foreign key constraint...');
    await supabase.rpc('exec_sql', { sql: 'ALTER TABLE transactions ADD CONSTRAINT fk_transactions_member_id FOREIGN KEY (member_id) REFERENCES members(member_number);' });
    
    console.log('✅ SQL fix completed successfully!');
    console.log('Now run: python complete-data-replacement.py');
    
  } catch (error) {
    console.error('❌ Error executing SQL fix:', error);
  }
}

executeSQLFix();
