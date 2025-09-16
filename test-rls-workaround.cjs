// Test what we can do with the current RLS setup
const { supabase } = require('./supabase.config');

async function testRlsWorkaround() {
  console.log('🧪 Testing what we can do with current RLS setup...');
  
  try {
    // Test 1: Try to create a user through the auth system (bypasses RLS)
    console.log('\n1. Testing Supabase auth signup...');
    
    const testEmail = 'test' + Date.now() + '@example.com';
    const testPassword = 'TestPassword123!';
    
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
      });

      if (authError) {
        console.log('❌ Auth signup error:', authError.message);
      } else {
        console.log('✅ Auth signup successful:', authData.user?.email);
        
        // If auth works, try to insert user profile data
        if (authData.user) {
          console.log('\n2. Testing user profile insertion after auth...');
          const userProfile = {
            uid: authData.user.id,
            email: authData.user.email,
            role: 'member'
          };

          const { data: profileData, error: profileError } = await supabase
            .from('users')
            .insert(userProfile)
            .select()
            .single();

          if (profileError) {
            console.log('❌ Profile insert error:', profileError.message);
          } else {
            console.log('✅ Profile insert successful:', profileData);
          }
        }
      }
    } catch (authErr) {
      console.log('❌ Auth exception:', authErr.message);
    }

    // Test 2: Try to read existing data (should work with RLS if policies allow)
    console.log('\n3. Testing data reading...');
    const { data: readData, error: readError } = await supabase
      .from('users')
      .select('*')
      .limit(5);

    if (readError) {
      console.log('❌ Read error:', readError.message);
    } else {
      console.log('✅ Read successful. Rows:', readData.length);
      if (readData.length > 0) {
        console.log('   First row:', readData[0]);
      }
    }

  } catch (error) {
    console.error('❌ RLS workaround test failed:', error.message);
  }
}

// Run the test
testRlsWorkaround().catch(console.error);
