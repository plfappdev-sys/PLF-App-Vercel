const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkUserRecords() {
  console.log('Checking user records in database...');
  
  // Check if Lesego exists in users table
  const { data: lesegoData, error: lesegoError } = await supabase
    .from('users')
    .select('*')
    .or('email.ilike.%lesego%,email.ilike.%lesego%')
    .limit(5);
  
  console.log('Lesego user records:', lesegoData);
  if (lesegoError) console.error('Error fetching Lesego:', lesegoError);
  
  // Check if Oratile exists in users table
  const { data: oratileData, error: oratileError } = await supabase
    .from('users')
    .select('*')
    .or('email.ilike.%oratile%,email.ilike.%oratile%')
    .limit(5);
  
  console.log('Oratile user records:', oratileData);
  if (oratileError) console.error('Error fetching Oratile:', oratileError);
  
  // Check all users with their roles
  const { data: allUsers, error: allUsersError } = await supabase
    .from('users')
    .select('email, role, membernumber, created_at')
    .order('created_at', { ascending: false })
    .limit(10);
  
  console.log('\nRecent users in database:');
  allUsers?.forEach(user => {
    console.log(`- ${user.email}: role=${user.role}, member=${user.membernumber || 'none'}`);
  });
  
  // Check RLS policies
  console.log('\nChecking RLS policies...');
  console.log('Note: RLS policies need to be checked via SQL directly');
}

checkUserRecords().catch(console.error);
