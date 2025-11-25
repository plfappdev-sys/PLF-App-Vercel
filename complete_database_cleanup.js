const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function completeCleanup() {
  console.log('🧹 COMPLETE DATABASE CLEANUP STARTING...');
  
  try {
    // Step 1: Delete ALL members (no exceptions)
    console.log('🗑️  DELETING ALL MEMBERS...');
    const { error: deleteMembersError } = await supabase
      .from('members')
      .delete()
      .neq('id', '0'); // Delete all members
    
    if (deleteMembersError) {
      console.error('❌ Error deleting all members:', deleteMembersError);
    } else {
      console.log('✅ ALL members deleted');
    }
    
    // Step 2: Delete all other data
    console.log('🗑️  DELETING ALL OTHER DATA...');
    
    // Delete transactions
    const { error: transactionsError } = await supabase
      .from('transactions')
      .delete()
      .neq('id', '0');
    
    if (transactionsError) {
      console.error('❌ Error deleting transactions:', transactionsError);
    } else {
      console.log('✅ Transactions deleted');
    }
    
    // Delete contributions (using different approach for UUID tables)
    const { error: contributionsError } = await supabase
      .from('contributions')
      .delete()
      .neq('member_id', '00000000-0000-0000-0000-000000000000');
    
    if (contributionsError) {
      console.error('❌ Error deleting contributions:', contributionsError);
    } else {
      console.log('✅ Contributions deleted');
    }
    
    // Delete member_balances (using different approach for UUID tables)
    const { error: balancesError } = await supabase
      .from('member_balances')
      .delete()
      .neq('member_id', '00000000-0000-0000-0000-000000000000');
    
    if (balancesError) {
      console.error('❌ Error deleting member_balances:', balancesError);
    } else {
      console.log('✅ Member balances deleted');
    }
    
    // Delete loans
    const { error: loansError } = await supabase
      .from('loans')
      .delete()
      .neq('id', '0');
    
    if (loansError) {
      console.error('❌ Error deleting loans:', loansError);
    } else {
      console.log('✅ Loans deleted');
    }
    
    // Delete interest_accruals
    const { error: interestError } = await supabase
      .from('interest_accruals')
      .delete()
      .neq('id', '0');
    
    if (interestError) {
      console.error('❌ Error deleting interest_accruals:', interestError);
    } else {
      console.log('✅ Interest accruals deleted');
    }
    
    // Delete audit_logs (using different approach for UUID tables)
    const { error: auditError } = await supabase
      .from('audit_logs')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');
    
    if (auditError) {
      console.error('❌ Error deleting audit_logs:', auditError);
    } else {
      console.log('✅ Audit logs deleted');
    }
    
    console.log('🎉 COMPLETE DATABASE CLEANUP FINISHED!');
    
    // Step 3: Verify cleanup
    console.log('🔍 VERIFYING CLEANUP...');
    
    const { data: remainingMembers, error: verifyMembersError } = await supabase
      .from('members')
      .select('id, name, user_id');
    
    if (verifyMembersError) {
      console.error('❌ Error verifying members:', verifyMembersError);
    } else {
      console.log(`📊 Remaining members: ${remainingMembers?.length || 0}`);
      if (remainingMembers && remainingMembers.length > 0) {
        console.log('❌ ERROR: Members still exist:', remainingMembers);
      } else {
        console.log('✅ SUCCESS: No members remaining');
      }
    }
    
    const { data: remainingUsers, error: verifyUsersError } = await supabase
      .from('users')
      .select('id, email, role');
    
    if (verifyUsersError) {
      console.error('❌ Error verifying users:', verifyUsersError);
    } else {
      console.log(`📊 Remaining users: ${remainingUsers?.length || 0}`);
      if (remainingUsers && remainingUsers.length > 0) {
        console.log('📋 Remaining users:', remainingUsers.map(u => ({ email: u.email, role: u.role })));
      }
    }
    
    // Verify other tables are empty
    const { data: remainingContributions, error: verifyContributionsError } = await supabase
      .from('contributions')
      .select('id');
    
    if (verifyContributionsError) {
      console.error('❌ Error verifying contributions:', verifyContributionsError);
    } else {
      console.log(`📊 Remaining contributions: ${remainingContributions?.length || 0}`);
    }
    
    const { data: remainingBalances, error: verifyBalancesError } = await supabase
      .from('member_balances')
      .select('id');
    
    if (verifyBalancesError) {
      console.error('❌ Error verifying member_balances:', verifyBalancesError);
    } else {
      console.log(`📊 Remaining member_balances: ${remainingBalances?.length || 0}`);
    }
    
  } catch (error) {
    console.error('❌ Error during complete cleanup:', error);
  }
}

completeCleanup();
