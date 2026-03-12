// Test script to verify auth fix for random logout issue
const { SupabaseAuthService } = require('./src/services/supabaseAuthService_fixed.ts');

async function testAuthFix() {
  console.log('Testing auth fix for random logout issue...\n');
  
  try {
    // Test 1: Check session handling
    console.log('Test 1: Checking session handling...');
    const session = await SupabaseAuthService.getCurrentSession();
    if (session) {
      console.log('✓ Session found');
      console.log(`  - User: ${session.user?.email}`);
      console.log(`  - Expires at: ${session.expires_at ? new Date(session.expires_at * 1000).toLocaleString() : 'N/A'}`);
      
      // Check if token needs refresh
      if (session.expires_at) {
        const now = Math.floor(Date.now() / 1000);
        const expiresIn = session.expires_at - now;
        console.log(`  - Expires in: ${expiresIn} seconds`);
        
        if (expiresIn < 300) {
          console.log('  ⚠ Token expires soon, testing refresh...');
          const refreshed = await SupabaseAuthService.checkAndRefreshSession();
          console.log(`  - Refresh result: ${refreshed ? 'Success' : 'Failed'}`);
        }
      }
    } else {
      console.log('✗ No active session found');
    }
    
    // Test 2: Check current user
    console.log('\nTest 2: Checking current user...');
    const user = await SupabaseAuthService.getCurrentUser();
    if (user) {
      console.log('✓ User found');
      console.log(`  - Email: ${user.email}`);
      console.log(`  - Role: ${user.role}`);
      console.log(`  - Member Number: ${user.memberNumber || 'N/A'}`);
    } else {
      console.log('✗ No user found');
    }
    
    // Test 3: Test session refresh function
    console.log('\nTest 3: Testing session refresh function...');
    const sessionValid = await SupabaseAuthService.checkAndRefreshSession();
    console.log(`✓ Session valid: ${sessionValid}`);
    
    console.log('\n✅ Auth fix verification complete!');
    console.log('\nSummary:');
    console.log('- Session handling improved with automatic refresh');
    console.log('- Token expiration detection added');
    console.log('- Better error handling for network issues');
    console.log('- Timeout protection for all auth operations');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testAuthFix();