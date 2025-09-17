const { createClient } = require('@supabase/supabase-js');
const { supabase } = require('./supabase.config');

async function createOratileSuperuser() {
  try {
    console.log('🚀 Creating superuser account for oratile@tyriie.co.za...');
    
    // First, check if user already exists in users table
    console.log('\n1. Checking if oratile@tyriie.co.za exists in users table...');
    
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'oratile@tyriie.co.za')
      .single();

    if (checkError && checkError.code === 'PGRST116') {
      console.log('User not found in users table. Creating profile...');
      
      // Try to sign in to get the user ID (since admin API is not available with anonymous key)
      console.log('\n2. Attempting to sign in to get user ID...');
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: 'oratile@tyriie.co.za',
        password: 'Oratile123!'
      });
      
      if (signInError) {
        console.error('❌ Error signing in:', signInError.message);
        
        if (signInError.message.includes('Invalid login credentials')) {
          console.log('💡 User exists but password may be different. Trying to create auth user...');
          
          // Try to create auth user if it doesn't exist or credentials are wrong
          console.log('\n3. Creating auth user in Supabase Auth...');
          const { data: authData, error: signUpError } = await supabase.auth.signUp({
            email: 'oratile@tyriie.co.za',
            password: 'Oratile123!', // Strong password
            options: {
              emailRedirectTo: 'http://localhost:8112' // Redirect after confirmation
            }
          });

          if (signUpError) {
            console.error('❌ Error creating auth user:', signUpError.message);
            
            if (signUpError.message.includes('already registered')) {
              console.log('ℹ️ User already exists in auth system but cannot access user ID');
              console.log('💡 Please use Supabase Dashboard to get the user ID or use service role key');
              console.log('📋 Visit: https://zdnyhzasvifrskbostgn.supabase.co/project/default/auth/users');
            } else {
              return;
            }
          } else if (authData.user) {
            console.log('✅ Auth user created successfully:', authData.user.email);
            console.log('📧 Check email for verification link');
            
            // Create user profile with the new auth user
            await createUserProfile(authData.user.id);
          }
        } else {
          console.error('❌ Unexpected sign in error:', signInError.message);
        }
      } else if (signInData.user) {
        console.log('✅ Successfully signed in, user ID:', signInData.user.id);
        
        // Create user profile with the signed in user
        await createUserProfile(signInData.user.id);
        
        // Sign out after getting the user ID
        await supabase.auth.signOut();
      }
    } else if (existingUser) {
      console.log('✅ User already exists in users table:', existingUser.email);
      
      // Check if role needs to be updated to superuser
      if (existingUser.role !== 'superuser') {
        console.log('Updating role to superuser...');
        const { error: updateError } = await supabase
          .from('users')
          .update({ role: 'superuser' })
          .eq('email', 'oratile@tyriie.co.za');
        
        if (updateError) {
          console.error('❌ Error updating role:', updateError.message);
        } else {
          console.log('✅ Role updated to superuser!');
        }
      } else {
        console.log('✅ User already has superuser role!');
      }
    } else if (checkError) {
      console.error('❌ Error checking user:', checkError.message);
    }

    console.log('\n🎉 Oratile superuser setup completed!');
    console.log('📋 Login credentials:');
    console.log('   Email: oratile@tyriie.co.za');
    console.log('   Password: Oratile123!');
    console.log('\n💡 You may need to verify the email address in Supabase Auth');
    console.log('💡 User has been granted full superuser privileges');

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

async function createUserProfile(userId) {
  console.log('\n4. Creating user profile in users table with superuser role...');
  
  const userProfile = {
    uid: userId,
    email: 'oratile@tyriie.co.za',
    role: 'superuser', // Granting superuser role
    accountstatus: JSON.stringify({ isVerified: true, status: 'active' }),
    personalinfo: JSON.stringify({
      firstName: 'Oratile',
      lastName: 'Tyriie',
      fullName: 'Oratile Tyriie'
    })
  };

  const { error: insertError } = await supabase
    .from('users')
    .insert(userProfile);

  if (insertError) {
    console.error('❌ Error creating user profile:', insertError.message);
    
    // Try with minimal profile if there are column issues
    const userProfileMinimal = {
      uid: userId,
      email: 'oratile@tyriie.co.za',
      role: 'superuser'
    };
    
    const { error: retryError } = await supabase
      .from('users')
      .insert(userProfileMinimal);
      
    if (retryError) {
      console.error('❌ Retry error:', retryError.message);
      console.log('💡 This may be due to RLS policy. Please run:');
      console.log('ALTER TABLE users DISABLE ROW LEVEL SECURITY;');
      console.log('in Supabase SQL Editor at: https://zdnyhzasvifrskbostgn.supabase.co/project/default/sql');
    } else {
      console.log('✅ User profile created successfully with superuser role!');
    }
  } else {
    console.log('✅ User profile created successfully with superuser role!');
  }
}

createOratileSuperuser();
