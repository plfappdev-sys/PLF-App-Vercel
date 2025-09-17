const { createClient } = require('@supabase/supabase-js');

// Supabase project configuration - you'll need to replace these with your service role key
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
// Replace with your service role key from Supabase Dashboard → Settings → API
const supabaseServiceKey = 'YOUR_SERVICE_ROLE_KEY_HERE';

async function adminResetSuperuser() {
  try {
    if (supabaseServiceKey === 'YOUR_SERVICE_ROLE_KEY_HERE') {
      console.log('❌ Please replace the service role key in this script');
      console.log('💡 Get it from Supabase Dashboard → Settings → API');
      console.log('🔒 Service role key has full admin privileges - keep it secure!');
      return;
    }

    console.log('🔑 Admin resetting superuser password...');
    
    // Create admin client with service role key
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    
    // First, let's check if the user exists
    const { data: authUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (listError) {
      console.error('Error listing users:', listError.message);
      return;
    }
    
    const superuser = authUsers.users.find(user => user.email === 'superuser@plf.com');
    
    if (!superuser) {
      console.log('❌ Superuser not found in auth system');
      return;
    }
    
    console.log('Superuser status:', {
      email: superuser.email,
      email_confirmed_at: superuser.email_confirmed_at,
      last_sign_in_at: superuser.last_sign_in_at,
      created_at: superuser.created_at
    });
    
    // If email is not confirmed, verify it
    if (!superuser.email_confirmed_at) {
      console.log('📧 Superuser email not verified - verifying now...');
      const { error: verifyError } = await supabaseAdmin.auth.admin.updateUserById(
        superuser.id,
        { email_confirm: true }
      );
      
      if (verifyError) {
        console.error('Error verifying email:', verifyError.message);
      } else {
        console.log('✅ Email verified successfully');
      }
    }
    
    // Reset the password
    console.log('\n🔄 Resetting password...');
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      superuser.id,
      { password: 'Superuser123!' }
    );
    
    if (error) {
      console.error('Error resetting password:', error.message);
      return;
    }
    
    console.log('✅ Password reset successfully!');
    console.log('📋 New credentials:');
    console.log('   Email: superuser@plf.com');
    console.log('   Password: Superuser123!');
    console.log('\n💡 You can now try logging in with these credentials');
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

adminResetSuperuser();
