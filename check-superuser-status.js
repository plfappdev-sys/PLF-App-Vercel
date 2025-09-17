const { createClient } = require('@supabase/supabase-js');
const { supabase } = require('./supabase.config');

async function checkSuperuserStatus() {
  try {
    console.log('🔍 Checking superuser status...');
    
    // 1. Check if superuser@plf.com exists in auth system
    console.log('\n1. Checking Supabase Auth for superuser@plf.com...');
    
    // Try to sign in to check if auth user exists
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'superuser@plf.com',
      password: 'testpassword' // This will fail but we just want to see if user exists
    });

    if (authError) {
      if (authError.message.includes('Invalid login credentials')) {
        console.log('❌ Auth user superuser@plf.com does not exist in Supabase Auth');
        console.log('💡 Please create the user in Supabase Auth first:');
        console.log('   - Go to Supabase Dashboard → Authentication → Users');
        console.log('   - Click "Add User"');
        console.log('   - Email: superuser@plf.com');
        console.log('   - Password: (choose a secure password)');
      } else {
        console.log('ℹ️  Auth check error:', authError.message);
      }
    } else {
      console.log('✅ Auth user superuser@plf.com exists');
    }

    // 2. Check if user exists in users table
    console.log('\n2. Checking users table for superuser@plf.com...');
    
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('uid, email, role, created_at')
      .eq('email', 'superuser@plf.com')
      .maybeSingle(); // Use maybeSingle to avoid throwing error if not found

    if (userError) {
      console.log('❌ Error checking users table:', userError.message);
      
      if (userError.code === '42P01') {
        console.log('💡 The users table does not exist yet');
        console.log('   Run the SQL schema setup from SUPABASE_SETUP_GUIDE.md');
      }
    } else if (userData) {
      console.log('✅ User exists in users table:', userData);
      
      if (userData.role !== 'superuser') {
        console.log('⚠️  User role is:', userData.role, '(should be superuser)');
        console.log('💡 Update the role in Supabase Dashboard:');
        console.log('   - Go to Supabase Dashboard → Table Editor → users');
        console.log('   - Find the user and change role to "superuser"');
      } else {
        console.log('✅ User has correct superuser role');
      }
    } else {
      console.log('❌ User not found in users table');
      console.log('💡 The user profile needs to be created in the users table');
    }

    // 3. Check users table structure
    console.log('\n3. Checking users table structure...');
    
    // Try a simple query to see table structure
    const { data: sampleData, error: sampleError } = await supabase
      .from('users')
      .select('*')
      .limit(1);

    if (sampleError) {
      console.log('❌ Cannot query users table:', sampleError.message);
    } else if (sampleData && sampleData.length > 0) {
      console.log('✅ Users table exists with columns:', Object.keys(sampleData[0]));
    } else {
      console.log('ℹ️  Users table exists but is empty');
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

checkSuperuserStatus();
