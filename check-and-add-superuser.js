const { createClient } = require('@supabase/supabase-js');
const { supabase } = require('./supabase.config');

async function checkAndAddSuperuser() {
  try {
    console.log('Checking if superuser@plf.com exists in users table...');
    
    // Check if user exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'superuser@plf.com')
      .single();

    if (checkError && checkError.code === 'PGRST116') {
      console.log('Superuser not found in users table. Creating...');
      
      // Get the auth user ID first
      const { data: authUser, error: authError } = await supabase.auth.admin.getUserByEmail('superuser@plf.com');
      
      if (authError) {
        console.error('Error getting auth user:', authError);
        return;
      }

      if (authUser && authUser.user) {
        // Create user profile
        const userProfile = {
          uid: authUser.user.id,
          email: 'superuser@plf.com',
          role: 'superuser',
        };

        const { error: insertError } = await supabase
          .from('users')
          .insert(userProfile);

        if (insertError) {
          console.error('Error creating superuser profile:', insertError);
          
          // Try without member_number if column doesn't exist
          if (insertError.code === 'PGRST204' && insertError.message?.includes('member_number')) {
            delete userProfile.member_number;
            const { error: retryError } = await supabase
              .from('users')
              .insert(userProfile);
            
            if (retryError) {
              console.error('Retry error:', retryError);
            } else {
              console.log('✅ Superuser profile created successfully!');
            }
          }
        } else {
          console.log('✅ Superuser profile created successfully!');
        }
      } else {
        console.log('Auth user not found. Please create the superuser account in Supabase Auth first.');
      }
    } else if (existingUser) {
      console.log('✅ Superuser already exists in users table:', existingUser);
      
      // Check if role needs to be updated
      if (existingUser.role !== 'superuser') {
        console.log('Updating role to superuser...');
        const { error: updateError } = await supabase
          .from('users')
          .update({ role: 'superuser' })
          .eq('email', 'superuser@plf.com');
        
        if (updateError) {
          console.error('Error updating role:', updateError);
        } else {
          console.log('✅ Role updated to superuser!');
        }
      }
    } else if (checkError) {
      console.error('Error checking user:', checkError);
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

checkAndAddSuperuser();
