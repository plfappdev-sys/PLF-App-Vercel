// Simple test for Supabase authentication
const { supabase } = require('./supabase.config');

async function testSimpleAuth() {
  console.log('🧪 Testing Supabase Authentication (Simple)...');
  
  try {
    // Test 1: Try to sign up a test user
    console.log('\n1. Testing user signup...');
    const testEmail = 'test.user@example.com';
    const testPassword = 'TestPassword123!';
    
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
    });

    if (signUpError) {
      console.log('❌ Signup error:', signUpError.message);
    } else {
      console.log('✅ Signup successful:', signUpData.user?.email);
    }

    // Test 2: Try to sign in
    console.log('\n2. Testing user signin...');
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPassword,
    });

    if (signInError) {
      console.log('❌ Signin error:', signInError.message);
    } else {
      console.log('✅ Signin successful:', signInData.user?.email);
    }

    // Test 3: Check current session
    console.log('\n3. Testing session retrieval...');
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.log('❌ Session error:', sessionError.message);
    } else {
      console.log('✅ Session retrieval successful');
      console.log('   Session exists:', !!session);
    }

    // Test 4: Check current user
    console.log('\n4. Testing current user retrieval...');
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.log('❌ User error:', userError.message);
    } else {
      console.log('✅ User retrieval successful');
      console.log('   User exists:', !!user);
      if (user) {
        console.log('   User email:', user.email);
      }
    }

    console.log('\n🎉 Supabase authentication test completed!');
    
  } catch (error) {
    console.error('❌ Authentication test failed:', error.message);
  }
}

// Run the test
testSimpleAuth().catch(console.error);
