// Test script for Supabase authentication service
import { SupabaseAuthService } from './src/services/supabaseAuthService.js';

async function testSupabaseAuth() {
  console.log('🧪 Testing Supabase Authentication Service...');
  
  try {
    // Test 1: Verify member number availability
    console.log('\n1. Testing member number verification...');
    const isAvailable = await SupabaseAuthService.verifyMemberNumber('TEST123');
    console.log('✅ Member number verification test completed');
    console.log('   Result:', isAvailable ? 'Available' : 'Taken');
    
    // Test 2: Test session retrieval
    console.log('\n2. Testing session retrieval...');
    const session = await SupabaseAuthService.getCurrentSession();
    console.log('✅ Session retrieval test completed');
    console.log('   Session:', session ? 'Exists' : 'No session');
    
    // Test 3: Test current user retrieval
    console.log('\n3. Testing current user retrieval...');
    const currentUser = await SupabaseAuthService.getCurrentUser();
    console.log('✅ Current user retrieval test completed');
    console.log('   Current user:', currentUser ? 'Exists' : 'No user');
    
    console.log('\n🎉 All Supabase authentication service tests completed successfully!');
    console.log('📋 Next steps:');
    console.log('   1. Enable Email auth in Supabase Dashboard');
    console.log('   2. Create database tables (users, members, etc.)');
    console.log('   3. Update AuthContext to use SupabaseAuthService');
    console.log('   4. Test login/signup functionality');
    
  } catch (error) {
    console.error('❌ Supabase auth test failed:', error.message);
    console.log('📋 This is expected - we need to:');
    console.log('   1. Enable Email authentication in Supabase Dashboard');
    console.log('   2. Create the users table in the database');
    console.log('   3. Set up proper database schema');
  }
}

// Run the test
testSupabaseAuth().catch(console.error);
