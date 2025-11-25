const { supabase } = require('./supabase.config.js');

async function checkMembersColumns() {
  console.log('🔍 Checking members table columns for user reference...');
  
  try {
    // Get the first member to see all columns
    const { data: members, error } = await supabase
      .from('members')
      .select('*')
      .limit(1);

    if (error) {
      console.log('❌ Error querying members table:', error.message);
      return;
    } else {
      console.log('✅ Members table query successful');
      
      if (members && members.length > 0) {
        console.log('\n📊 Members table columns:');
        const firstMember = members[0];
        
        // Show all keys
        Object.keys(firstMember).forEach(key => {
          console.log(`   - ${key}`);
        });
        
        // Check for any user-related columns
        const userColumns = Object.keys(firstMember).filter(key => 
          key.toLowerCase().includes('user') || 
          key.toLowerCase().includes('uid') ||
          key.toLowerCase().includes('auth')
        );
        
        console.log('\n🔍 User-related columns found:');
        if (userColumns.length > 0) {
          userColumns.forEach(col => {
            console.log(`   - ${col}: ${typeof firstMember[col]} = ${JSON.stringify(firstMember[col])}`);
          });
        } else {
          console.log('   ❌ No user-related columns found in members table');
        }
      } else {
        console.log('📭 No members found in the table');
      }
    }

  } catch (error) {
    console.error('❌ Members columns check failed:', error.message);
  }
}

// Run the check
checkMembersColumns().catch(console.error);
