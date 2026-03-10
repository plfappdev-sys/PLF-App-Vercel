const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? 'Set' : 'Missing');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function cleanDatabase() {
  console.log('🧹 Starting database cleanup (preserving superusers only)...');
  console.log('📋 Supabase URL:', supabaseUrl);
  
  try {
    // Step 1: Get all superusers (role = 'superuser')
    console.log('\n📋 Getting all superusers...');
    const { data: superusers, error: superuserError } = await supabase
      .from('users')
      .select('id, uid, email, role, membernumber')
      .eq('role', 'superuser');
    
    if (superuserError) {
      console.error('❌ Error getting superusers:', superuserError);
      return;
    }
    
    console.log(`✅ Found ${superusers.length} superusers:`);
    superusers.forEach(user => {
      console.log(`   - ${user.email} (ID: ${user.id}, UID: ${user.uid})`);
    });
    
    const superuserIds = superusers.map(u => u.id);
    const superuserUids = superusers.map(u => u.uid);
    
    if (superuserIds.length === 0) {
      console.error('❌ No superusers found! Aborting cleanup to prevent data loss.');
      return;
    }
    
    // Step 2: Get members linked to superusers
    console.log('\n📋 Getting members linked to superusers...');
    const { data: superuserMembers, error: memberError } = await supabase
      .from('members')
      .select('id, user_id, member_number, name')
      .in('user_id', superuserIds);
    
    if (memberError) {
      console.error('❌ Error getting superuser members:', memberError);
    } else {
      const superuserMemberIds = superuserMembers.map(m => m.id);
      console.log(`✅ Found ${superuserMemberIds.length} members linked to superusers`);
      if (superuserMembers.length > 0) {
        superuserMembers.forEach(member => {
          console.log(`   - ${member.name} (Member #${member.member_number}, ID: ${member.id})`);
        });
      }
    }
    
    // Step 3: Delete data in correct order (maintaining referential integrity)
    console.log('\n🗑️  Starting data deletion...');
    
    // First, delete from tables that have no dependencies or are leaf nodes
    const tablesToClean = [
      { name: 'audit_logs', dependsOn: [] },
      { name: 'interest_accruals', dependsOn: ['members'] },
      { name: 'transactions', dependsOn: ['members', 'loans'] },
      { name: 'loans', dependsOn: ['members'] },
      { name: 'contributions', dependsOn: ['members'] },
      { name: 'member_balances', dependsOn: ['members'] },
      { name: 'members', dependsOn: ['users'] },
    ];
    
    for (const table of tablesToClean) {
      console.log(`\n🗑️  Cleaning ${table.name}...`);
      
      try {
        // For members table, we need to preserve members linked to superusers
        if (table.name === 'members') {
          const superuserMemberIds = superuserMembers?.map(m => m.id) || [];
          if (superuserMemberIds.length > 0) {
            // Delete all members NOT linked to superusers
            const { error: deleteError } = await supabase
              .from('members')
              .delete()
              .not('id', 'in', `(${superuserMemberIds.join(',')})`);
            
            if (deleteError) {
              console.error(`❌ Error deleting non-superuser ${table.name}:`, deleteError.message);
            } else {
              console.log(`✅ Non-superuser ${table.name} deleted`);
            }
          } else {
            // Delete all members (none are linked to superusers)
            const { error: deleteError } = await supabase
              .from('members')
              .delete()
              .neq('id', 0); // Delete all
            
            if (deleteError) {
              console.error(`❌ Error deleting all ${table.name}:`, deleteError.message);
            } else {
              console.log(`✅ All ${table.name} deleted`);
            }
          }
        } else {
          // For other tables, delete all records
          const { error: deleteError } = await supabase
            .from(table.name)
            .delete()
            .neq('id', 0); // Delete all
          
          if (deleteError) {
            console.error(`❌ Error deleting ${table.name}:`, deleteError.message);
          } else {
            console.log(`✅ ${table.name} deleted`);
          }
        }
      } catch (error) {
        console.error(`❌ Error cleaning ${table.name}:`, error.message);
      }
    }
    
    // Step 4: Delete non-superuser users
    console.log('\n🗑️  Cleaning users table (keeping superusers only)...');
    if (superuserIds.length > 0) {
      const { error: deleteUsersError } = await supabase
        .from('users')
        .delete()
        .not('id', 'in', `(${superuserIds.join(',')})`);
      
      if (deleteUsersError) {
        console.error('❌ Error deleting non-superuser users:', deleteUsersError.message);
      } else {
        console.log('✅ Non-superuser users deleted');
      }
    }
    
    // Step 5: Preserve system tables (financial_years, system_settings)
    console.log('\n📋 Preserving system tables...');
    console.log('✅ financial_years table preserved (keeping default data)');
    console.log('✅ system_settings table preserved (keeping default data)');
    
    console.log('\n🎉 Database cleanup completed!');
    
    // Step 6: Verify cleanup
    console.log('\n🔍 Verifying cleanup results...');
    
    const { data: remainingUsers, error: verifyUsersError } = await supabase
      .from('users')
      .select('id, email, role')
      .order('id');
    
    if (verifyUsersError) {
      console.error('❌ Error verifying users:', verifyUsersError.message);
    } else {
      console.log(`📊 Remaining users: ${remainingUsers?.length || 0}`);
      if (remainingUsers && remainingUsers.length > 0) {
        console.log('📋 Remaining users:');
        remainingUsers.forEach(user => {
          console.log(`   - ${user.email} (${user.role})`);
        });
      }
    }
    
    const { data: remainingMembers, error: verifyMembersError } = await supabase
      .from('members')
      .select('id, name, member_number, user_id')
      .order('id');
    
    if (verifyMembersError) {
      console.error('❌ Error verifying members:', verifyMembersError.message);
    } else {
      console.log(`📊 Remaining members: ${remainingMembers?.length || 0}`);
      if (remainingMembers && remainingMembers.length > 0) {
        console.log('📋 Remaining members:');
        remainingMembers.forEach(member => {
          console.log(`   - ${member.name} (Member #${member.member_number})`);
        });
      }
    }
    
    // Check other tables
    const tablesToVerify = ['transactions', 'loans', 'contributions', 'member_balances', 'interest_accruals', 'audit_logs'];
    for (const tableName of tablesToVerify) {
      const { data, error } = await supabase
        .from(tableName)
        .select('id')
        .limit(1);
      
      if (error) {
        console.error(`❌ Error verifying ${tableName}:`, error.message);
      } else {
        console.log(`📊 ${tableName}: ${data?.length || 0} records remaining`);
      }
    }
    
    console.log('\n✅ Cleanup verification complete!');
    console.log('\n📋 NEXT STEPS:');
    console.log('   1. Verify superuser accounts can still log in');
    console.log('   2. Import updated data from Excel document');
    console.log('   3. Test system functionality');
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  }
}

// Run cleanup
cleanDatabase();