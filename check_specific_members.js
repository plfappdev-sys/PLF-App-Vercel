const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkSpecificMembers() {
  console.log('Checking specific member data...');
  
  // Check member 43 (Lesego)
  const { data: member43, error: error43 } = await supabase
    .from('members')
    .select('member_number, name, financial_info')
    .eq('member_number', '43')
    .single();
  
  console.log('Member 43 (Lesego):', member43);
  if (error43) console.error('Error fetching member 43:', error43);
  
  // Check member 66 (Oratile)
  const { data: member66, error: error66 } = await supabase
    .from('members')
    .select('member_number, name, financial_info')
    .eq('member_number', '66')
    .single();
  
  console.log('Member 66 (Oratile):', member66);
  if (error66) console.error('Error fetching member 66:', error66);
  
  // Check if there are any other members with similar patterns
  console.log('\nChecking for data patterns...');
  
  // Get all members to see distribution
  const { data: allMembers, error: allError } = await supabase
    .from('members')
    .select('member_number, name, financial_info')
    .order('member_number');
  
  if (allError) {
    console.error('Error fetching all members:', allError);
    return;
  }
  
  // Calculate total fund value
  let totalFundValue = 0;
  allMembers.forEach(member => {
    const financialInfo = member.financial_info || {};
    const currentBalance = financialInfo.current_balance || 0;
    totalFundValue += currentBalance;
  });
  
  console.log(`Total Fund Value from all members: R ${totalFundValue.toFixed(2)}`);
  
  // Check what percentage member 43 and 66 contribute
  const balance43 = member43?.financial_info?.current_balance || 0;
  const balance66 = member66?.financial_info?.current_balance || 0;
  
  console.log(`\nMember 43 balance: R ${balance43.toFixed(2)} (${(balance43/totalFundValue*100).toFixed(2)}% of total)`);
  console.log(`Member 66 balance: R ${balance66.toFixed(2)} (${(balance66/totalFundValue*100).toFixed(2)}% of total)`);
}

checkSpecificMembers().catch(console.error);
