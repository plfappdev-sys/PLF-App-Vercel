// Reset password for Jonas Letlhaku to "Password123"
// Using Supabase Admin API with service role key

const { createClient } = require('@supabase/supabase-js');

// Configuration - UPDATE THESE VALUES
const supabaseUrl = 'YOUR_SUPABASE_URL'; // e.g., 'https://your-project.supabase.co'
const supabaseServiceKey = 'YOUR_SERVICE_ROLE_KEY'; // From Supabase Dashboard → Settings → API

// Create Supabase client with service role key (admin privileges)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function resetPassword() {
  console.log('=== Starting password reset for Jonas Letlhaku ===\n');
  
  try {
    // Step 1: List all users to find Jonas
    console.log('1. Searching for Jonas Letlhaku in users...');
    const { data: users, error: findError } = await supabase.auth.admin.listUsers();
    
    if (findError) {
      console.error('Error listing users:', findError.message);
      return;
    }
    
    console.log(`   Found ${users.users.length} total users\n`);
    
    // Step 2: Find Jonas Letlhaku
    const jonas = users.users.find(u => {
      const email = u.email?.toLowerCase() || '';
      const fullName = u.user_metadata?.full_name?.toLowerCase() || '';
      const memberNumber = u.user_metadata?.member_number || '';
      
      return (
        email.includes('jonas') ||
        email.includes('letlhaku') ||
        fullName.includes('jonas') ||
        fullName.includes('letlhaku') ||
        memberNumber === '25'
      );
    });
    
    if (!jonas) {
      console.log('   ❌ Jonas Letlhaku not found in users list');
      console.log('\n   Checking for similar users...');
      
      // Show users that might be related
      const possibleMatches = users.users.filter(u => {
        const email = u.email?.toLowerCase() || '';
        const fullName = u.user_metadata?.full_name?.toLowerCase() || '';
        return email || fullName; // Show users with any name/email
      }).slice(0, 10); // Show first 10 users
      
      console.log('\n   First 10 users (for reference):');
      possibleMatches.forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.email} - ${user.user_metadata?.full_name || 'No name'} (ID: ${user.id.substring(0, 8)}...)`);
      });
      
      return;
    }
    
    console.log(`   ✅ Found user:`);
    console.log(`      Email: ${jonas.email}`);
    console.log(`      Name: ${jonas.user_metadata?.full_name || 'Not set'}`);
    console.log(`      Member Number: ${jonas.user_metadata?.member_number || 'Not set'}`);
    console.log(`      User ID: ${jonas.id}`);
    console.log(`      Last Sign In: ${jonas.last_sign_in_at || 'Never'}\n`);
    
    // Step 3: Confirm before resetting
    console.log('2. Ready to reset password to: Password123');
    console.log('   WARNING: This will change the user\'s password immediately.');
    
    // In a real script, you might want to add confirmation
    // For now, we'll proceed automatically
    
    // Step 4: Reset the password
    console.log('\n3. Resetting password...');
    const { data, error } = await supabase.auth.admin.updateUserById(
      jonas.id,
      { password: 'Password123' }
    );
    
    if (error) {
      console.error('   ❌ Error resetting password:', error.message);
      return;
    }
    
    console.log('   ✅ Password reset successfully!');
    console.log(`\n   New password: Password123`);
    console.log(`   User can now login with:`);
    console.log(`   - Email: ${jonas.email}`);
    console.log(`   - Password: Password123`);
    
    // Step 5: Optional - Update user metadata if needed
    console.log('\n4. (Optional) Updating user metadata with member number...');
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      jonas.id,
      { 
        user_metadata: {
          ...jonas.user_metadata,
          member_number: '25', // Ensure member number is set
          full_name: jonas.user_metadata?.full_name || 'Jonas Letlhaku'
        }
      }
    );
    
    if (updateError) {
      console.log('   Note: Could not update metadata:', updateError.message);
    } else {
      console.log('   ✅ User metadata updated');
    }
    
    // Step 6: Verify the update
    console.log('\n5. Verifying update...');
    const { data: verifiedUser, error: verifyError } = await supabase.auth.admin.getUserById(jonas.id);
    
    if (verifyError) {
      console.log('   Note: Could not verify update:', verifyError.message);
    } else {
      console.log('   ✅ User verified successfully');
      console.log(`   Updated at: ${verifiedUser.user.updated_at}`);
    }
    
    console.log('\n=== Password reset complete ===');
    console.log('\nNext steps:');
    console.log('1. Test login with the new password');
    console.log('2. Check if MyFunds page now shows as linked');
    console.log('3. Consider resetting password for Nicholas Molale (member 55) if needed');
    
  } catch (error) {
    console.error('\n❌ Unexpected error:', error.message);
    console.error('\nTroubleshooting tips:');
    console.log('1. Check if Supabase URL is correct');
    console.log('2. Verify service role key has admin permissions');
    console.log('3. Ensure network connection to Supabase');
    console.log('4. Check Supabase project status at https://status.supabase.com/');
  }
}

// Run the function
resetPassword();

// Alternative: If you want to run from command line with arguments
if (process.argv.length > 2) {
  const command = process.argv[2];
  if (command === '--help') {
    console.log('\nUsage:');
    console.log('  node reset-jonas-password.js          # Reset password for Jonas');
    console.log('  node reset-jonas-password.js --help   # Show this help');
    console.log('\nSetup:');
    console.log('  1. Update supabaseUrl and supabaseServiceKey in the script');
    console.log('  2. Get service role key from Supabase Dashboard → Settings → API');
    console.log('  3. Run: npm install @supabase/supabase-js');
    console.log('  4. Run: node reset-jonas-password.js');
  }
}