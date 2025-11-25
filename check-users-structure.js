const { supabase } = require('./supabase.config.js');

async function checkUsersStructure() {
  console.log('🔍 Checking users table structure for foreign key constraints...');
  
  try {
    // Try to get the first user to see the structure
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .limit(1);

    if (error) {
      console.log('❌ Error querying users table:', error.message);
      return;
    } else {
      console.log('✅ Users table query successful');
      
      if (users && users.length > 0) {
        console.log('\n📊 First user record structure:');
        const firstUser = users[0];
        
        // Show all keys and their types
        Object.keys(firstUser).forEach(key => {
          const value = firstUser[key];
          const type = typeof value;
          console.log(`   ${key}: ${type} = ${JSON.stringify(value)}`);
        });
        
        // Check the uid type specifically
        console.log(`\n🔍 UID field type: ${typeof firstUser.uid}`);
        if (firstUser.uid) {
          console.log(`   UID value: ${firstUser.uid}`);
          console.log(`   Is UUID: ${/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(firstUser.uid)}`);
        }
      } else {
        console.log('📭 No users found in the table');
      }
    }

    // Check if uid has unique constraint
    console.log('\n🔍 Checking unique constraints on users table...');
    
    // Try to insert a duplicate to see if unique constraint exists
    try {
      const testUid = users && users.length > 0 ? users[0].uid : 'test-duplicate-001';
      const { error: dupError } = await supabase
        .from('users')
        .insert({ uid: testUid, email: 'duplicate@test.com' });

      if (dupError && dupError.message.includes('duplicate')) {
        console.log('✅ UID has unique constraint (good for foreign keys)');
      } else if (dupError) {
        console.log('❌ UID may not have proper unique constraint:', dupError.message);
      } else {
        console.log('⚠️  UID constraint test inconclusive - no error on duplicate insert');
      }
    } catch (testError) {
      console.log('❌ UID constraint test failed:', testError.message);
    }

  } catch (error) {
    console.error('❌ Users structure check failed:', error.message);
  }
}

// Run the check
checkUsersStructure().catch(console.error);
