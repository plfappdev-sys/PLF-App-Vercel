const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://zdnyhzasvifrskbostgn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAyNDQ4NCwiZXhwIjoyMDczNjAwNDg0fQ.kOpqoycVNdJXC-fqqxwHPVof6e8JlJ60_J7WWF-1AHU'
);

async function debugGetCurrentUser() {
  try {
    // First get the current session to get the user ID
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('Session error:', sessionError);
      return;
    }
    
    if (!session || !session.user) {
      console.log('No active session');
      return;
    }
    
    const userId = session.user.id;
    console.log('User ID from session:', userId);
    
    // Now get the user profile from the users table using the exact same query as getCurrentUser()
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('role, membernumber, created_at')
      .eq('uid', userId)
      .single();
    
    if (profileError) {
      console.error('Profile error:', profileError);
      return;
    }
    
    console.log('User profile from database query:', userProfile);
    console.log('User role from query:', userProfile.role);
    
    // Also test the getUser() method
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.error('Get user error:', userError);
      return;
    }
    
    console.log('User from auth.getUser():', user);
    
  } catch (error) {
    console.error('Debug error:', error);
  }
}

debugGetCurrentUser();
