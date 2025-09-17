const { createClient } = require('@supabase/supabase-js');
const { supabase } = require('./supabase.config');

async function resetSuperuserPassword() {
  try {
    console.log('🔑 Resetting superuser password...');
    
    // First, let's check if the user exists and needs email verification
    const { data: authUsers, error: listError } = await supabase.auth.admin.listUsers();
    
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
    
    // If email is not confirmed, we need to verify it
    if (!superuser.email_confirmed_at) {
      console.log('📧 Superuser email not verified yet');
      console.log('💡 Please verify the email in Supabase Dashboard → Authentication → Users');
      return;
    }
    
    // Reset the password
    console.log('\n🔄 Resetting password...');
    const { data, error } = await supabase.auth.admin.updateUserById(
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
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

resetSuperuserPassword();
