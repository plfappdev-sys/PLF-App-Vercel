const { createClient } = require('@supabase/supabase-js');
const { supabase } = require('./supabase.config');

async function debugUserRole() {
  try {
    console.log('🔍 Debugging user role for oratile@tyriie.co.za...');
    
    // 1. Check users table directly
    console.log('\n1. Checking users table...');
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'oratile@tyriie.co.za')
      .single();

    if (userError) {
      console.error('❌ Error checking user:', userError.message);
    } else if (userData) {
      console.log('✅ User in users table:', {
        uid: userData.uid,
        email: userData.email,
        role: userData.role,
        created_at: userData.created_at
      });
    }

    // 2. Check auth state
    console.log('\n2. Checking auth state...');
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('❌ Session error:', sessionError.message);
    } else if (session?.user) {
      console.log('✅ Auth session user:', {
        id: session.user.id,
        email: session.user.email,
        role: 'N/A (from auth)'
      });
    }

    // 3. Try to get user via auth service
    console.log('\n3. Getting current user via auth service...');
    const { data: { user }, error: userAuthError } = await supabase.auth.getUser();
    
    if (userAuthError) {
      console.error('❌ Auth user error:', userAuthError.message);
    } else if (user) {
      console.log('✅ Auth get user:', {
        id: user.id,
        email: user.email,
        role: 'N/A (from auth)'
      });

      // 4. Check user profile with role
      console.log('\n4. Getting user profile with role...');
      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('role')
        .eq('uid', user.id)
        .single();

      if (profileError) {
        console.error('❌ Profile error:', profileError.message);
      } else if (userProfile) {
        console.log('✅ User profile role:', userProfile.role);
      }
    }

    // 5. Check all users for comparison
    console.log('\n5. Listing all users for comparison...');
    const { data: allUsers, error: allUsersError } = await supabase
      .from('users')
      .select('email, role, created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    if (allUsersError) {
      console.error('❌ All users error:', allUsersError.message);
    } else if (allUsers) {
      console.log('📋 Recent users:');
      allUsers.forEach((u, i) => {
        console.log(`   ${i + 1}. ${u.email} - ${u.role} - ${u.created_at}`);
      });
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

debugUserRole();
