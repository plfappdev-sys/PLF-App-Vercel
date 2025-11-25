const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkMemberFunds() {
  console.log('Checking member data for Lesego Bokaba...\n');
  
  // First, let's find Lesego Bokaba in the members table
  const { data: members, error } = await supabase
    .from('members')
    .select('*')
    .ilike('name', '%Lesego%Bokaba%');

  if (error) {
    console.error('Error fetching member:', error);
    return;
  }

  if (members && members.length > 0) {
    const member = members[0];
    console.log('Found Lesego Bokaba:');
    console.log('Member ID:', member.id);
    console.log('Member Number:', member.member_number);
    console.log('Name:', member.name);
    console.log('Closing Balance:', member.closing_balance);
    console.log('Monthly Contribution:', member.monthly_contribution);
    console.log('Catch Up Fee:', member.catch_up_fee);
    console.log('Membership Fee:', member.membership_fee);
    console.log('Share Value:', member.share_value);
    console.log('Join Date:', member.join_date);
    console.log('Status:', member.status);
    
    // Check if there are any transactions for this member
    const { data: transactions, error: txError } = await supabase
      .from('transactions')
      .select('*')
      .eq('member_id', member.id);

    if (txError) {
      console.error('Error fetching transactions:', txError);
    } else {
      console.log(`\nFound ${transactions ? transactions.length : 0} transactions for this member`);
      if (transactions && transactions.length > 0) {
        transactions.forEach(tx => {
          console.log(`- ${tx.transaction_type}: ${tx.amount} (${tx.transaction_date})`);
        });
      }
    }
  } else {
    console.log('Lesego Bokaba not found in members table');
    
    // Let's check all members to see what's in the database
    const { data: allMembers, error: allError } = await supabase
      .from('members')
      .select('member_number, name, closing_balance, monthly_contribution')
      .limit(10);

    if (allError) {
      console.error('Error fetching all members:', allError);
    } else {
      console.log('\nFirst 10 members in database:');
      allMembers.forEach(m => {
        console.log(`- ${m.member_number}: ${m.name} (Closing Balance: ${m.closing_balance}, Monthly: ${m.monthly_contribution})`);
      });
    }
  }
}

checkMemberFunds().catch(console.error);
