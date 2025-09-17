const { createClient } = require('@supabase/supabase-js');
const { supabase } = require('./supabase.config');

async function manualCreateOratileProfile() {
  try {
    console.log('🚀 Manually creating user profile for oratile@tyriie.co.za...');
    
    const userId = '183ec6b5-296e-404f-991e-e968306c487c'; // Provided User ID
    
    const userProfile = {
      uid: userId,
      email: 'oratile@tyriie.co.za',
      role: 'superuser',
      accountstatus: JSON.stringify({ isVerified: true, status: 'active' }),
      personalinfo: JSON.stringify({
        firstName: 'Oratile',
        lastName: 'Tyriie',
        fullName: 'Oratile Tyriie'
      })
    };

    console.log('\n1. Attempting to create user profile...');
    const { data, error } = await supabase
      .from('users')
      .insert(userProfile);

    if (error) {
      console.error('❌ Error creating user profile:', error.message);
      
      // Try with minimal profile
      console.log('\n2. Trying with minimal profile...');
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
        console.log('💡 This is likely due to RLS policy. Please run:');
        console.log('ALTER TABLE users DISABLE ROW LEVEL SECURITY;');
        console.log('in Supabase SQL Editor at: https://zdnyhzasvifrskbostgn.supabase.co/project/default/sql');
      } else {
        console.log('✅ User profile created successfully with superuser role!');
      }
    } else {
      console.log('✅ User profile created successfully with superuser role!');
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

manualCreateOratileProfile();
