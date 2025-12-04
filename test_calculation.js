const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testCalculation() {
  console.log('Testing calculateFundStatisticsFromMembers logic...');
  
  // Simulate what calculateFundStatisticsFromMembers does
  const { data: members, error } = await supabase
    .from('members')
    .select('*');
  
  if (error) {
    console.error('Error fetching members:', error);
    return;
  }
  
  console.log(`Total members fetched: ${members.length}`);
  
  let totalFundValue = 0;
  let totalOutstanding = 0;
  const membersByStanding = {
    good: 0,
    owing_10: 0,
    owing_20: 0,
    owing_30: 0,
    owing_50: 0,
    owing_65: 0,
    owing_65_plus: 0
  };
  
  // Calculate statistics from members table
  members.forEach((member) => {
    // Calculate current balance from various fields
    const financialInfo = member?.financial_info || {};
    const currentBalance = typeof financialInfo?.current_balance === 'number'
      ? financialInfo.current_balance
      : (typeof financialInfo?.savings_balance === 'number'
        ? financialInfo.savings_balance
        : (typeof financialInfo?.total_contributions === 'number'
          ? financialInfo.total_contributions
          : 0));

    // Calculate outstanding amount
    const outstandingAmount = (member.catch_up_fee || 0) + 
                             (financialInfo.outstanding_amount || 0);

    totalFundValue += currentBalance;
    totalOutstanding += outstandingAmount;

    // Categorize members based on outstanding percentage
    const expectedContributions = 16600; // 83 months * R200
    const outstandingPercentage = outstandingAmount > 0 ? (outstandingAmount / expectedContributions * 100) : 0;

    if (outstandingPercentage === 0) {
      membersByStanding.good++;
    } else if (outstandingPercentage <= 10) {
      membersByStanding.owing_10++;
    } else if (outstandingPercentage <= 20) {
      membersByStanding.owing_20++;
    } else if (outstandingPercentage <= 30) {
      membersByStanding.owing_30++;
    } else if (outstandingPercentage <= 50) {
      membersByStanding.owing_50++;
    } else if (outstandingPercentage <= 65) {
      membersByStanding.owing_65++;
    } else {
      membersByStanding.owing_65_plus++;
    }
  });
  
  console.log(`\nCalculated Statistics:`);
  console.log(`Total Fund Value: R ${totalFundValue.toFixed(2)}`);
  console.log(`Total Outstanding: R ${totalOutstanding.toFixed(2)}`);
  console.log(`Members by Standing:`, membersByStanding);
  
  // Check if this matches what Oratile sees (R 619,169.20)
  console.log(`\nOratile sees: R 619,169.20`);
  console.log(`Our calculation: R ${totalFundValue.toFixed(2)}`);
  console.log(`Difference: R ${Math.abs(totalFundValue - 619169.20).toFixed(2)}`);
  console.log(`Percentage of total: ${(totalFundValue / 4986838.63 * 100).toFixed(2)}%`);
  
  // Check if we're getting partial data
  if (totalFundValue < 4986838.63) {
    console.log(`\n⚠️ WARNING: We're only seeing ${members.length} members`);
    console.log(`Expected total: R 4,986,838.63`);
    console.log(`Actual total: R ${totalFundValue.toFixed(2)}`);
    console.log(`Missing: R ${(4986838.63 - totalFundValue).toFixed(2)}`);
    
    // Check first few member numbers to see pattern
    console.log(`\nFirst 10 member numbers:`);
    members.slice(0, 10).forEach(member => {
      console.log(`  Member ${member.member_number}: R ${member.financial_info?.current_balance?.toFixed(2) || '0.00'}`);
    });
  }
}

testCalculation().catch(console.error);
