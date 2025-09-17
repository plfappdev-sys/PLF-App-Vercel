const { createClient } = require('@supabase/supabase-js');
const { supabase } = require('./supabase.config');

async function testAuthFix() {
  try {
    console.log('🔧 Testing auth service fix...');
    
    // First sign in to create a session
    console.log('\n1. Signing in...');
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: 'oratile@tyriie.co.za',
      password: 'Wawa@PLF2025'
    });

    if (signInError) {
      console.error('❌ Sign in error:', signInError.message);
      return;
    }

    console.log('✅ Signed in successfully:', signInData.user.email);

    // Test session directly
    console.log('\n2. Testing session and user profile...');
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('❌ Session error:', sessionError.message);
    } else if (session) {
      console.log('✅ Session exists for user:', session.user.email);
      
      // Get user profile directly from users table
      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('uid', session.user.id)
        .single();

      if (profileError) {
        console.error('❌ Profile error:', profileError.message);
      } else if (userProfile) {
        console.log('✅ User profile retrieved:', {
          email: userProfile.email,
          role: userProfile.role,
          uid: userProfile.uid
        });
        
        if (userProfile.role === 'superuser') {
          console.log('🎉 SUCCESS: User has correct superuser role!');
        } else {
          console.log('❌ ISSUE: User role is:', userProfile.role);
        }
      }
    } else {
      console.log('❌ No session found');
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

testAuthFix();
