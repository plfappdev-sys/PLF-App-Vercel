const { createClient } = require('@supabase/supabase-js');

// Use the same configuration as in supabase.config.js
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkDatabase() {
  console.log('=== Checking Database Status ===');
  
  // Check transactions table
  const { data: transactions, error: txError } = await supabase
    .from('transactions')
    .select('*')
    .limit(5);
  
  console.log('\nTransactions table:');
  if (txError) {
    console.log('Error:', txError.message);
  } else {
    console.log('Count:', transactions.length);
    console.log('Sample data:', JSON.stringify(transactions, null, 2));
  }
  
  // Check members table
  const { data: members, error: memberError } = await supabase
    .from('members')
    .select('*')
    .limit(5);
  
  console.log('\nMembers table:');
  if (memberError) {
    console.log('Error:', memberError.message);
  } else {
    console.log('Count:', members.length);
    console.log('Sample data:', JSON.stringify(members, null, 2));
  }
  
  // Check users table
  const { data: users, error: userError } = await supabase
    .from('users')
    .select('*')
    .limit(5);
  
  console.log('\nUsers table:');
  if (userError) {
    console.log('Error:', userError.message);
  } else {
    console.log('Count:', users.length);
    console.log('Sample data:', JSON.stringify(users, null, 2));
  }
  
  // Check table structure
  console.log('\n=== Checking Table Relationships ===');
  
  // Test a query that joins tables
  const { data: joinedData, error: joinError } = await supabase
    .from('transactions')
    .select('*, members:member_id (member_number, first_name, last_name)')
    .limit(3);
  
  console.log('\nJoin test (transactions with members):');
  if (joinError) {
    console.log('Error:', joinError.message);
  } else {
    console.log('Join successful, data:', JSON.stringify(joinedData, null, 2));
  }
}

checkDatabase().catch(console.error);
