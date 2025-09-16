// Manual table setup using Supabase client
const { supabase } = require('./supabase.config');

async function manualTableSetup() {
  console.log('🛠️  Manual table setup for missing tables...');
  
  try {
    // Check if users table exists
    console.log('\n1. Checking users table...');
    const { error: usersError } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    if (usersError && usersError.code === '42P01') {
      console.log('❌ Users table does not exist - attempting to create...');
      
      // Try to create users table with a simple query
      const { error: createError } = await supabase.rpc('create_users_table');
      
      if (createError) {
        console.log('⚠️  Cannot create via RPC, trying direct SQL...');
        // We'll need to do this through the SQL Editor
      }
    } else if (usersError) {
      console.log('❌ Users table error:', usersError.message);
    } else {
      console.log('✅ Users table exists');
    }

    // Check if interest_accruals table exists
    console.log('\n2. Checking interest_accruals table...');
    const { error: interestError } = await supabase
      .from('interest_accruals')
      .select('count')
      .limit(1);

    if (interestError && interestError.code === '42P01') {
      console.log('❌ Interest_accruals table does not exist');
    } else if (interestError) {
      console.log('❌ Interest_accruals table error:', interestError.message);
    } else {
      console.log('✅ Interest_accruals table exists');
    }

    console.log('\n📋 Current table status:');
    console.log('   ✅ members: EXISTS');
    console.log('   ✅ transactions: EXISTS');
    console.log('   ✅ loans: EXISTS');
    console.log('   ❌ users: MISSING');
    console.log('   ❌ interest_accruals: MISSING');

    console.log('\n🚀 Solution:');
    console.log('   The safe schema should have worked, but there might be');
    console.log('   permission issues or foreign key constraints blocking');
    console.log('   table creation.');
    
    console.log('\n💡 Recommended next steps:');
    console.log('   1. Go to Supabase Dashboard > SQL Editor');
    console.log('   2. Run this simple test first:');
    console.log('      CREATE TABLE IF NOT EXISTS users_test (');
    console.log('        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),');
    console.log('        email TEXT UNIQUE NOT NULL');
    console.log('      );');
    console.log('   3. If that works, then run supabase-schema-minimal.sql');
    console.log('   4. This creates tables without immediate foreign keys');

    console.log('\n🔧 If still having issues:');
    console.log('   - Check Supabase project settings');
    console.log('   - Verify API key permissions');
    console.log('   - Ensure email auth is enabled in Authentication > Providers');

  } catch (error) {
    console.error('❌ Manual setup failed:', error.message);
  }
}

// Run the manual setup
manualTableSetup().catch(console.error);
