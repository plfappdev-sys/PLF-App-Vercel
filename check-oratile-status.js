const { createClient } = require('@supabase/supabase-js');
const { supabase } = require('./supabase.config');

async function checkOratileStatus() {
  try {
    console.log('🔍 Checking oratile@tyriie.co.za status...');
    
    // Check users table for oratile
    console.log('\n1. Checking users table for oratile@tyriie.co.za...');
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'oratile@tyriie.co.za')
      .single();

    if (userError) {
      console.error('❌ Error checking user:', userError.message);
      return;
    }

    if (userData) {
      console.log('✅ User found in users table:', {
        uid: userData.uid,
        email: userData.email,
        role: userData.role,
        created_at: userData.created_at
      });
      
      if (userData.role !== 'superuser') {
        console.log('⚠️  Role is not superuser. Updating to superuser...');
        
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
    } else {
      console.log('❌ User not found in users table');
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

checkOratileStatus();
