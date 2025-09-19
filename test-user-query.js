const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://zdnyhzasvifrskbostgn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAyNDQ4NCwiZXhwIjoyMDczNjAwNDg0fQ.kOpqoycVNdJXC-fqqxwHPVof6e8JlJ60_J7WWF-1AHU'
);

async function testUserQuery() {
  try {
    // First, let's check what users exist
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('uid, email, role, membernumber')
      .order('created_at', { ascending: false });

    if (usersError) {
      console.error('Users query error:', usersError);
      return;
    }

    console.log('All users in database:');
    console.log(JSON.stringify(users, null, 2));

    // Now let's specifically check the oratile@tyriie.co.za user
    const { data: oratileUser, error: oratileError } = await supabase
      .from('users')
      .select('uid, email, role, membernumber')
      .eq('email', 'oratile@tyriie.co.za')
      .single();

    if (oratileError) {
      console.error('Oratile user query error:', oratileError);
      return;
    }

    console.log('\nOratile user details:');
    console.log(JSON.stringify(oratileUser, null, 2));

  } catch (error) {
    console.error('Test error:', error);
  }
}

testUserQuery();
