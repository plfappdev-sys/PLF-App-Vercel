const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function cleanDatabase() {
  console.log('🧹 Starting database cleanup...');
  
  try {
    // Step 1: Get superuser IDs
    console.log('📋 Getting superuser IDs...');
    const { data: superusers, error: superuserError } = await supabase
      .from('users')
      .select('id, email')
      .in('email', ['oratile@tyriie.co.za', 'superuser@plf.com']);
    
    if (superuserError) {
      console.error('❌ Error getting superusers:', superuserError);
      return;
    }
    
    console.log('✅ Found superusers:', superusers.map(u => u.email));
    const superuserIds = superusers.map(u => u.id);
    
    // Step 2: Get members linked to superusers
    console.log('📋 Getting members linked to superusers...');
    const { data: superuserMembers, error: memberError } = await supabase
      .from('members')
      .select('id')
      .in('user_id', superuserIds);
    
    if (memberError) {
      console.error('❌ Error getting superuser members:', memberError);
      return;
    }
    
    const superuserMemberIds = superuserMembers.map(m => m.id);
    console.log(`✅ Found ${superuserMemberIds.length} members linked to superusers`);
    
    // Step 3: Delete all members NOT linked to superusers
    console.log('🗑️  Deleting non-superuser members...');
    if (superuserMemberIds.length > 0) {
      const { error: deleteMembersError } = await supabase
        .from('members')
        .delete()
        .not('id', 'in', `(${superuserMemberIds.join(',')})`);
      
      if (deleteMembersError) {
        console.error('❌ Error deleting members:', deleteMembersError);
      } else {
        console.log('✅ Non-superuser members deleted');
      }
    } else {
      // If no superuser members found, delete all members
      const { error: deleteAllMembersError } = await supabase
        .from('members')
        .delete()
        .neq('id', '0'); // Delete all members
        
      if (deleteAllMembersError) {
        console.error('❌ Error deleting all members:', deleteAllMembersError);
      } else {
        console.log('✅ All members deleted');
      }
    }
    
    // Step 4: Delete all other data
    console.log('🗑️  Deleting other data...');
    
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
    
    // Delete contributions
    const { error: contributionsError } = await supabase
      .from('contributions')
      .delete()
      .neq('id', '0');
    
    if (contributionsError) {
      console.error('❌ Error deleting contributions:', contributionsError);
    } else {
      console.log('✅ Contributions deleted');
    }
    
    // Delete member_balances
    const { error: balancesError } = await supabase
      .from('member_balances')
      .delete()
      .neq('id', '0');
    
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
    
    // Delete audit_logs
    const { error: auditError } = await supabase
      .from('audit_logs')
      .delete()
      .neq('id', '0');
    
    if (auditError) {
      console.error('❌ Error deleting audit_logs:', auditError);
    } else {
      console.log('✅ Audit logs deleted');
    }
    
    console.log('🎉 Database cleanup completed!');
    
    // Step 5: Verify cleanup
    console.log('🔍 Verifying cleanup...');
    
    const { data: remainingMembers, error: verifyMembersError } = await supabase
      .from('members')
      .select('id, name, user_id');
    
    if (verifyMembersError) {
      console.error('❌ Error verifying members:', verifyMembersError);
    } else {
      console.log(`📊 Remaining members: ${remainingMembers?.length || 0}`);
      if (remainingMembers && remainingMembers.length > 0) {
        console.log('📋 Remaining members:', remainingMembers);
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
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  }
}

cleanDatabase();
