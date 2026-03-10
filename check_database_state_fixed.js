const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log('Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
  console.log('Checking database state...');
  
  // Check members count
  const { count: membersCount, error: membersError } = await supabase
    .from('members')
    .select('*', { count: 'exact', head: true });
  
  if (membersError) {
    console.log('Error fetching members:', membersError);
  } else {
    console.log(`Total members in database: ${membersCount}`);
  }
  
  // Check a few sample members
  const { data: sampleMembers, error: sampleError } = await supabase
    .from('members')
    .select('member_number, name, join_date, financial_info')
    .limit(10);
  
  if (sampleError) {
    console.log('Error fetching sample members:', sampleError);
  } else {
    console.log('\nSample members:');
    sampleMembers.forEach(member => {
      console.log(`- ${member.member_number}: ${member.name} (joined: ${member.join_date})`);
      if (member.financial_info) {
        console.log(`  Financial info: ${JSON.stringify(member.financial_info).substring(0, 100)}...`);
      } else {
        console.log('  Financial info: EMPTY');
      }
    });
  }
  
  // Check if financial_info is populated
  const { data: membersWithFinancialInfo, error: financialError } = await supabase
    .from('members')
    .select('member_number, name')
    .not('financial_info', 'is', null)
    .limit(5);
  
  if (financialError) {
    console.log('Error checking financial info:', financialError);
  } else {
    console.log(`\nMembers with financial info: ${membersWithFinancialInfo.length}`);
    if (membersWithFinancialInfo.length > 0) {
      console.log('First few with financial info:');
      membersWithFinancialInfo.forEach(member => {
        console.log(`- ${member.member_number}: ${member.name}`);
      });
    }
  }
  
  // Check for specific known members
  const knownMembers = ['M001', 'M002', 'M003', 'M004', 'M005', 'M006'];
  console.log('\nChecking for specific known members:');
  
  for (const memberNum of knownMembers) {
    const { data: member, error } = await supabase
      .from('members')
      .select('member_number, name, join_date')
      .eq('member_number', memberNum)
      .single();
    
    if (error) {
      console.log(`  ${memberNum}: NOT FOUND`);
    } else {
      console.log(`  ${memberNum}: FOUND - ${member.name} (joined: ${member.join_date})`);
    }
  }
}

checkDatabase().catch(console.error);