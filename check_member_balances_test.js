const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkMembers() {
  console.log('Checking members Jeff Matlou and Nicholas Molale...');
  
  // First, let's search for these members by name
  const { data: members, error } = await supabase
    .from('members')
    .select('*')
    .or('name.ilike.%Jeff Matlou%,name.ilike.%Nicholas Molale%');
    
  if (error) {
    console.error('Error fetching members:', error);
    return;
  }
  
  console.log(`Found ${members?.length || 0} members`);
  
  if (members && members.length > 0) {
    members.forEach(member => {
      console.log('\n--- Member ---');
      console.log('Member Number:', member.member_number);
      console.log('Name:', member.name);
      console.log('Financial Info:', JSON.stringify(member.financial_info, null, 2));
      console.log('Catch Up Fee:', member.catch_up_fee);
      console.log('---');
    });
  } else {
    console.log('No members found with those names. Trying to find all members...');
    
    const { data: allMembers, error: allError } = await supabase
      .from('members')
      .select('*')
      .limit(10);
      
    if (allError) {
      console.error('Error fetching all members:', allError);
      return;
    }
    
    console.log('\nFirst 10 members:');
    allMembers?.forEach(member => {
      console.log(`${member.member_number}: ${member.name} - Balance: ${member.financial_info?.current_balance}`);
    });
  }
}

checkMembers().catch(console.error);