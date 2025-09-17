const { createClient } = require('@supabase/supabase-js');
const { supabase } = require('./supabase.config');

async function createSuperuserAccount() {
  try {
    console.log('🚀 Creating superuser account...');
    
    // First, create the auth user
    console.log('\n1. Creating auth user in Supabase Auth...');
    
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'superuser@plf.com',
      password: 'Superuser123!', // Strong password
      options: {
        emailRedirectTo: 'http://localhost:8109' // Redirect after confirmation
      }
    });

    if (authError) {
      console.error('❌ Error creating auth user:', authError.message);
      
      if (authError.message.includes('already registered')) {
        console.log('ℹ️  User already exists in auth system');
      } else {
        return;
      }
    } else if (authData.user) {
      console.log('✅ Auth user created successfully:', authData.user.email);
      console.log('📧 Check email for verification link');
    }

    // Now create the user profile in the users table
    console.log('\n2. Creating user profile in users table...');
    
    if (authData && authData.user) {
      const userProfile = {
        uid: authData.user.id,
        email: 'superuser@plf.com',
        role: 'superuser',
        accountstatus: JSON.stringify({ isVerified: true, status: 'active' }),
        personalinfo: JSON.stringify({
          firstName: 'Super',
          lastName: 'User',
          fullName: 'Super User'
        })
      };

      const { error: insertError } = await supabase
        .from('users')
        .insert(userProfile);

      if (insertError) {
        console.error('❌ Error creating user profile:', insertError.message);
        
        // Try with different column names based on the table structure we saw
        if (insertError.message.includes('member_number')) {
          console.log('ℹ️  Trying without member_number column...');
          const userProfileAlt = {
            uid: authData.user.id,
            email: 'superuser@plf.com',
            role: 'superuser',
            accountstatus: JSON.stringify({ isVerified: true, status: 'active' }),
            personalinfo: JSON.stringify({
              firstName: 'Super',
              lastName: 'User',
              fullName: 'Super User'
            })
          };
          
          const { error: retryError } = await supabase
            .from('users')
            .insert(userProfileAlt);
            
          if (retryError) {
            console.error('❌ Retry error:', retryError.message);
          } else {
            console.log('✅ User profile created successfully!');
          }
        }
      } else {
        console.log('✅ User profile created successfully!');
      }
    } else {
      console.log('ℹ️  No auth user data available to create profile');
    }

    console.log('\n🎉 Superuser setup completed!');
    console.log('📋 Login credentials:');
    console.log('   Email: superuser@plf.com');
    console.log('   Password: Superuser123!');
    console.log('\n💡 You may need to verify the email address in Supabase Auth');

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

createSuperuserAccount();
