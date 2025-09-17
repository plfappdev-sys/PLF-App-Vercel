const { SupabaseAuthService } = require('./src/services/supabaseAuthService.ts');

async function testSuperuserLogin() {
  console.log('🧪 Testing superuser login functionality...\n');

  try {
    // Test 1: Check current session
    console.log('1. Checking current session...');
    const session = await SupabaseAuthService.getCurrentSession();
    console.log('Session:', session ? 'Active' : 'No session');
    
    // Test 2: Try to login with superuser
    console.log('\n2. Attempting login with superuser@plf.com...');
    const result = await SupabaseAuthService.signIn('superuser@plf.com', 'Superuser123!');
    
    if (result.error) {
      console.log('❌ Login failed:', result.error);
      return;
    }
    
    console.log('✅ Login successful!');
    console.log('User:', result.user);
    
    // Test 3: Check session after login
    console.log('\n3. Checking session after login...');
    const newSession = await SupabaseAuthService.getCurrentSession();
    console.log('Session after login:', newSession ? 'Active' : 'No session');
    
    if (newSession) {
      console.log('Session user:', newSession.user.email);
    }
    
    // Test 4: Get current user
    console.log('\n4. Getting current user...');
    const currentUser = await SupabaseAuthService.getCurrentUser();
    console.log('Current user:', currentUser);
    
    if (currentUser && currentUser.role === 'superuser') {
      console.log('🎉 Superuser login and session management working correctly!');
    } else {
      console.log('⚠️  User role may not be correct:', currentUser?.role);
    }
    
  } catch (error) {
    console.error('❌ Test failed with error:', error);
  }
}

testSuperuserLogin();
