const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabaseUrl = process.env.SUPABASE_URL || process.env.PROJECT_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log('Missing Supabase environment variables');
  console.log('SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing');
  console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? 'Set' : 'Missing');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
  console.log('Checking database state...');
  
  // Check members count
  const { count: memberCount, error: memberError } = await supabase
    .from('members')
    .select('*', { count: 'exact', head: true });
    
  if (memberError) {
    console.log('Error fetching members:', memberError.message);
  } else {
    console.log('Total members in database:', memberCount);
  }
  
  // Check member_balances count
  const { count: balanceCount, error: balanceError } = await supabase
    .from('member_balances')
    .select('*', { count: 'exact', head: true });
    
  if (balanceError) {
    console.log('Error fetching member_balances:', balanceError.message);
  } else {
    console.log('Total member_balances records:', balanceCount);
  }
  
  // Check contributions count
  const { count: contributionCount, error: contributionError } = await supabase
    .from('contributions')
    .select('*', { count: 'exact', head: true });
    
  if (contributionError) {
    console.log('Error fetching contributions:', contributionError.message);
  } else {
    console.log('Total contributions records:', contributionCount);
  }
  
  // Check a few sample members
  const { data: sampleMembers, error: sampleError } = await supabase
    .from('members')
    .select('member_number, name, financial_info')
    .limit(5);
    
  if (sampleError) {
    console.log('Error fetching sample members:', sampleError.message);
  } else {
    console.log('\nSample members:');
    sampleMembers.forEach(member => {
      const financialInfo = member.financial_info || {};
      console.log(`${member.member_number}: ${member.name} - Balance: ${financialInfo.current_balance || 'N/A'}`);
    });
  }
  
  // Check total fund value
  const { data: allMembers, error: allError } = await supabase
    .from('members')
    .select('financial_info');
    
  if (allError) {
    console.log('Error fetching all members:', allError.message);
  } else {
    let totalBalance = 0;
    let totalContributions = 0;
    
    allMembers.forEach(member => {
      const financialInfo = member.financial_info || {};
      const balance = parseFloat(financialInfo.current_balance) || 0;
      const contributions = parseFloat(financialInfo.total_contributions) || 0;
      totalBalance += balance;
      totalContributions += contributions;
    });
    
    console.log('\nTotal Fund Statistics:');
    console.log('Total Balance (sum of all member balances):', totalBalance.toFixed(2));
    console.log('Total Contributions (sum of all member contributions):', totalContributions.toFixed(2));
  }
}

checkDatabase().catch(console.error);