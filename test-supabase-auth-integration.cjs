// Test Supabase authentication integration
const { supabase } = require('./supabase.config');
const { SupabaseAuthService } = require('./src/services/supabaseAuthService');

async function testSupabaseAuthIntegration() {
  console.log('🧪 Testing Supabase Authentication Integration...');
  
  try {
    // Test 1: Check session
    console.log('\n1. Testing session retrieval...');
    const session = await SupabaseAuthService.getCurrentSession();
    console.log('✅ Session retrieval:', session ? 'Session exists' : 'No session');

    // Test 2: Check current user
    console.log('\n2. Testing current user retrieval...');
    const currentUser = await SupabaseAuthService.getCurrentUser();
    console.log('✅ Current user:', currentUser ? 'User exists' : 'No user');

    // Test 3: Test member number verification
    console.log('\n3. Testing member number verification...');
    const isAvailable = await SupabaseAuthService.verifyMemberNumber('TEST123');
    console.log('✅ Member number verification:', isAvailable ? 'Available' : 'Taken');

    console.log('\n🎉 Supabase authentication integration test completed!');
    console.log('📋 Next steps:');
    console.log('   1. Update App.js to use SupabaseAuthProvider instead of AuthProvider');
    console.log('   2. Test login functionality with real users');
    console.log('   3. Update screens to use the new auth context');
    console.log('   4. Test on React Native/Expo devices');

    console.log('\n💡 To test authentication:');
    console.log('   - Create a test user in Supabase Dashboard > Authentication > Users');
    console.log('   - Or use the signup functionality in the app');
    console.log('   - Test with: node test-supabase-simple.cjs');

  } catch (error) {
    console.error('❌ Supabase auth integration test failed:', error.message);
    console.log('📋 This might be expected if:');
    console.log('   - No users exist in the database yet');
    console.log('   - Authentication is not fully configured');
    console.log('   - You need to create test users first');
  }
}

// Run the test
testSupabaseAuthIntegration().catch(console.error);
