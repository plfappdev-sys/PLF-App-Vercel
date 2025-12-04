const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  console.log('Testing database query...');
  
  // Get all members with their financial info
  const { data: members, error } = await supabase
    .from('members')
    .select('member_number, financial_info, name');
  
  if (error) {
    console.error('Error:', error);
    return;
  }
  
  console.log(`Found ${members.length} members`);
  
  // Calculate total fund value
  let totalFundValue = 0;
  let memberCount = 0;
  
  members.forEach(member => {
    const financialInfo = member.financial_info || {};
    const currentBalance = financialInfo.current_balance || 0;
    totalFundValue += currentBalance;
    memberCount++;
    
    // Log first few members
    if (memberCount <= 5) {
      console.log(`Member ${member.member_number}: ${member.name || 'No name'} - Balance: R ${currentBalance.toFixed(2)}`);
    }
  });
  
  console.log(`\nTotal Fund Value: R ${totalFundValue.toFixed(2)}`);
  console.log(`Average per member: R ${(totalFundValue / memberCount).toFixed(2)}`);
  
  // Now let's see if we can find a pattern
  // Sort members by balance
  const sortedMembers = members
    .map(m => ({
      member_number: m.member_number,
      name: m.name || 'No name',
      balance: (m.financial_info || {}).current_balance || 0
    }))
    .sort((a, b) => b.balance - a.balance);
  
  console.log('\nTop 5 members by balance:');
  sortedMembers.slice(0, 5).forEach(m => {
    console.log(`${m.member_number}: ${m.name} - R ${m.balance.toFixed(2)}`);
  });
  
  console.log('\nBottom 5 members by balance:');
  sortedMembers.slice(-5).forEach(m => {
    console.log(`${m.member_number}: ${m.name} - R ${m.balance.toFixed(2)}`);
  });
  
  // Let's also check the sum of the bottom members to see if it matches Oratile's number
  const bottomSum = sortedMembers.slice(-44).reduce((sum, m) => sum + m.balance, 0); // About half the members
  console.log(`\nSum of bottom 44 members: R ${bottomSum.toFixed(2)}`);
  
  // Check if any members have exactly 0 balance
  const zeroBalanceMembers = sortedMembers.filter(m => m.balance === 0);
  console.log(`\nMembers with zero balance: ${zeroBalanceMembers.length}`);
  
  // Check if any members have negative balance
  const negativeBalanceMembers = sortedMembers.filter(m => m.balance < 0);
  console.log(`Members with negative balance: ${negativeBalanceMembers.length}`);
  
  // Calculate what 12.4% of total would be (Oratile's number is 12.4% of total)
  const oratilePercentage = 619169.20 / totalFundValue * 100;
  console.log(`\nOratile's value (R 619,169.20) is ${oratilePercentage.toFixed(2)}% of total`);
  
  // Try to find a subset that matches Oratile's number
  // Maybe Oratile is only seeing members with certain status or certain financial year?
  console.log('\nLooking for patterns...');
  
  // Group by first digit of member number
  const byFirstDigit = {};
  sortedMembers.forEach(m => {
    const firstDigit = m.member_number.charAt(0);
    if (!byFirstDigit[firstDigit]) {
      byFirstDigit[firstDigit] = { count: 0, total: 0 };
    }
    byFirstDigit[firstDigit].count++;
    byFirstDigit[firstDigit].total += m.balance;
  });
  
  console.log('\nBalance by first digit of member number:');
  Object.keys(byFirstDigit).sort().forEach(digit => {
    const data = byFirstDigit[digit];
    console.log(`Digit ${digit}: ${data.count} members, total R ${data.total.toFixed(2)}`);
  });
}

test().catch(console.error);
