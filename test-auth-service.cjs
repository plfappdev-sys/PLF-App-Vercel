// Simple test for SupabaseAuthService (CommonJS version)
const { SupabaseAuthService } = require('./src/services/supabaseAuthService');

async function testAuthService() {
  console.log('🧪 Testing Supabase Authentication Service...');
  
  try {
    // Test 1: Test session retrieval
    console.log('\n1. Testing session retrieval...');
    const session = await SupabaseAuthService.getCurrentSession();
    console.log('✅ Session retrieval test completed');
    console.log('   Session:', session ? 'Exists' : 'No session');

    // Test 2: Test current user retrieval
    console.log('\n2. Testing current user retrieval...');
    const currentUser = await SupabaseAuthService.getCurrentUser();
    console.log('✅ Current user retrieval test completed');
    console.log('   Current user:', currentUser ? 'Exists' : 'No user');

    // Test 3: Test member number verification
    console.log('\n3. Testing member number verification...');
    const isAvailable = await SupabaseAuthService.verifyMemberNumber('TEST123');
    console.log('✅ Member number verification test completed');
    console.log('   Result:', isAvailable ? 'Available' : 'Taken');

    console.log('\n🎉 All Supabase authentication service tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Supabase auth test failed:', error.message);
  }
}

// Run the test
testAuthService().catch(console.error);
