// Simple test for Supabase connection (CommonJS version)
const { supabase } = require('./supabase.config');

async function testSupabaseSimple() {
  console.log('🧪 Testing Supabase Connection (Simple)...');
  
  try {
    // Test 1: Check if supabase client is initialized
    console.log('\n1. Testing Supabase client initialization...');
    if (supabase && typeof supabase.from === 'function') {
      console.log('✅ Supabase client initialized successfully!');
    } else {
      console.log('❌ Supabase client initialization failed');
      return;
    }

    // Test 2: Try to get session
    console.log('\n2. Testing session retrieval...');
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.log('ℹ️ Session retrieval error (expected):', sessionError.message);
    } else {
      console.log('✅ Session retrieval successful');
      console.log('   Session:', session ? 'Exists' : 'No session');
    }

    // Test 3: Try a simple query (this will fail but test connection)
    console.log('\n3. Testing database connection...');
    const { error: queryError } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    if (queryError) {
      console.log('ℹ️ Database query error (expected - table not created yet):', queryError.message);
      console.log('   Error code:', queryError.code);
    } else {
      console.log('✅ Database query successful!');
    }

    console.log('\n🎉 Supabase connection test completed!');
    console.log('📋 Next steps:');
    console.log('   1. Go to Supabase Dashboard: https://zdnyhzasvifrskbostgn.supabase.co');
    console.log('   2. Enable Email authentication in Authentication > Providers');
    console.log('   3. Create database tables (SQL Editor)');
    console.log('   4. Test authentication functionality');
    
  } catch (error) {
    console.error('❌ Supabase test failed:', error.message);
  }
}

// Run the test
testSupabaseSimple().catch(console.error);
