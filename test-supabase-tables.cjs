// Test script to verify Supabase tables after schema creation
const { supabase } = require('./supabase.config');

async function testSupabaseTables() {
  console.log('🧪 Testing Supabase Tables Access...');
  
  try {
    // Test 1: Check if users table exists
    console.log('\n1. Testing users table access...');
    const { error: usersError } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    if (usersError) {
      console.log('❌ Users table error:', usersError.message);
      console.log('   Please run the schema SQL in Supabase SQL Editor first');
      return;
    }
    console.log('✅ Users table accessible');

    // Test 2: Check if members table exists
    console.log('\n2. Testing members table access...');
    const { error: membersError } = await supabase
      .from('members')
      .select('count')
      .limit(1);

    if (membersError) {
      console.log('❌ Members table error:', membersError.message);
    } else {
      console.log('✅ Members table accessible');
    }

    // Test 3: Check if transactions table exists
    console.log('\n3. Testing transactions table access...');
    const { error: transactionsError } = await supabase
      .from('transactions')
      .select('count')
      .limit(1);

    if (transactionsError) {
      console.log('❌ Transactions table error:', transactionsError.message);
    } else {
      console.log('✅ Transactions table accessible');
    }

    // Test 4: Check if loans table exists
    console.log('\n4. Testing loans table access...');
    const { error: loansError } = await supabase
      .from('loans')
      .select('count')
      .limit(1);

    if (loansError) {
      console.log('❌ Loans table error:', loansError.message);
    } else {
      console.log('✅ Loans table accessible');
    }

    console.log('\n📋 Next steps after running the schema:');
    console.log('   1. Go to Supabase Dashboard > SQL Editor');
    console.log('   2. Copy and paste the contents of supabase-schema.sql');
    console.log('   3. Run the SQL to create all tables');
    console.log('   4. Run this test again to verify table access');
    console.log('   5. Create a test user in Authentication > Users');
    console.log('   6. Test authentication functionality');

  } catch (error) {
    console.error('❌ Supabase tables test failed:', error.message);
  }
}

// Run the test
testSupabaseTables().catch(console.error);
