// Simple auth test with valid email format
const { supabase } = require('./supabase.config');

async function testAuthSimple() {
  console.log('🧪 Testing simple auth with valid email...');
  
  try {
    // Test with a simple valid email
    const testEmail = 'test.user@example.com';
    const testPassword = 'TestPassword123!';
    
    console.log('\n1. Testing Supabase auth signup...');
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
    });

    if (authError) {
      console.log('❌ Auth signup error:', authError.message);
      
      // Check if it's an email configuration issue
      if (authError.message.includes('email templates') || authError.message.includes('configuration')) {
        console.log('📋 You may need to configure email templates in Supabase Dashboard');
        console.log('   Go to: Authentication > Settings > Email Templates');
      }
    } else {
      console.log('✅ Auth signup successful:', authData.user?.email);
      
      // Test if we can get the session
      console.log('\n2. Testing session retrieval...');
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.log('❌ Session error:', sessionError.message);
      } else {
        console.log('✅ Session data:', sessionData.session ? 'Session exists' : 'No session');
      }
    }

    // Test sign in with the same credentials
    console.log('\n3. Testing sign in...');
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPassword,
    });

    if (signInError) {
      console.log('❌ Sign in error:', signInError.message);
    } else {
      console.log('✅ Sign in successful:', signInData.user?.email);
    }

  } catch (error) {
    console.error('❌ Auth test failed:', error.message);
  }
}

// Run the test
testAuthSimple().catch(console.error);
