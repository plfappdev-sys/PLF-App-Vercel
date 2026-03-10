const { createClient } = require('@supabase/supabase-js');

// Use the same values from src/config/supabase.ts
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkNegativeBalances() {
  console.log('Checking for members with negative balances...\n');
  
  try {
    // Get all members with financial_info
    console.log('Fetching all members with financial_info...');
    const { data: members, error } = await supabase
      .from('members')
      .select(`
        member_number,
        name,
        financial_info,
        expected_contribution_total,
        penalties_capped,
        catch_up_fee,
        closing_balance
      `)
      .order('member_number');
    
    if (error) {
      console.error('Error fetching members:', error);
      return;
    }
    
    if (!members || members.length === 0) {
      console.log('No members found in database');
      return;
    }
    
    console.log(`Found ${members.length} members in database\n`);
    
    // Find members with negative current_balance
    const membersWithNegativeBalances = [];
    const membersWithPositiveBalances = [];
    const membersWithZeroBalances = [];
    
    members.forEach(member => {
      const finInfo = member.financial_info || {};
      const currentBalance = finInfo.current_balance || 0;
      
      if (currentBalance < 0) {
        membersWithNegativeBalances.push({
          member_number: member.member_number,
          name: member.name,
          current_balance: currentBalance,
          financial_info: finInfo
        });
      } else if (currentBalance > 0) {
        membersWithPositiveBalances.push({
          member_number: member.member_number,
          name: member.name,
          current_balance: currentBalance,
          financial_info: finInfo
        });
      } else {
        membersWithZeroBalances.push({
          member_number: member.member_number,
          name: member.name,
          current_balance: currentBalance,
          financial_info: finInfo
        });
      }
    });
    
    console.log(`Members with NEGATIVE balances (Good Standing - have credit): ${membersWithNegativeBalances.length}`);
    console.log(`Members with POSITIVE balances (Owe money): ${membersWithPositiveBalances.length}`);
    console.log(`Members with ZERO balances: ${membersWithZeroBalances.length}\n`);
    
    if (membersWithNegativeBalances.length > 0) {
      console.log('DETAILS OF MEMBERS WITH NEGATIVE BALANCES (Good Standing):');
      console.log('='.repeat(100));
      membersWithNegativeBalances.forEach(member => {
        console.log(`${member.member_number} - ${member.name}:`);
        console.log(`  Current Balance: R ${member.current_balance.toFixed(2)} (NEGATIVE - Member has credit)`);
        console.log(`  Total Contributions: R ${(member.financial_info.total_contributions || 0).toFixed(2)}`);
        console.log(`  Actual Contributions: R ${(member.financial_info.actual_contributions || 0).toFixed(2)}`);
        console.log(`  Outstanding Amount: R ${(member.financial_info.outstanding_amount || 0).toFixed(2)}`);
        console.log(`  Percentage Outstanding: ${member.financial_info.percentage_outstanding || 0}%`);
        console.log('');
      });
      console.log('='.repeat(100));
    } else {
      console.log('No members found with negative balances.');
    }
    
    // Check the specific members mentioned in the requirements
    console.log('\n\nCHECKING SPECIFIC MEMBERS MENTIONED IN REQUIREMENTS:');
    const specificMembers = ['M017', 'M041']; // Jeff Matlou and Nicholas Molale
    
    for (const memberNumber of specificMembers) {
      const member = members.find(m => m.member_number === memberNumber);
      if (member) {
        const finInfo = member.financial_info || {};
        const currentBalance = finInfo.current_balance || 0;
        
        console.log(`\n${member.member_number} - ${member.name}:`);
        console.log(`  Current Balance in database: R ${currentBalance.toFixed(2)}`);
        console.log(`  Expected Contribution Total: R ${member.expected_contribution_total || 0}`);
        console.log(`  Penalties Capped: R ${member.penalties_capped || 0}`);
        console.log(`  Catch-up Fee: R ${member.catch_up_fee || 0}`);
        console.log(`  Closing Balance: R ${member.closing_balance || 0}`);
        
        // Check what the app should show
        if (currentBalance < 0) {
          console.log(`  STATUS: NEGATIVE BALANCE (Good Standing)`);
          console.log(`  App should show: "Balance: R ${Math.abs(currentBalance).toFixed(2)}" in GREEN`);
        } else if (currentBalance > 0) {
          console.log(`  STATUS: POSITIVE BALANCE (Owes money)`);
          console.log(`  App should show: "Balance Due: R ${currentBalance.toFixed(2)}" in RED`);
        } else {
          console.log(`  STATUS: ZERO BALANCE`);
          console.log(`  App should show: "Balance: R 0.00" in GRAY`);
        }
      } else {
        console.log(`\n${memberNumber}: NOT FOUND in database`);
      }
    }
    
    // Check a few members with positive balances to understand the pattern
    console.log('\n\nSAMPLE OF MEMBERS WITH POSITIVE BALANCES (Owes money):');
    console.log('='.repeat(100));
    membersWithPositiveBalances.slice(0, 5).forEach(member => {
      console.log(`${member.member_number} - ${member.name}:`);
      console.log(`  Current Balance: R ${member.current_balance.toFixed(2)} (POSITIVE - Member owes money)`);
      console.log(`  Total Contributions: R ${(member.financial_info.total_contributions || 0).toFixed(2)}`);
      console.log(`  Actual Contributions: R ${(member.financial_info.actual_contributions || 0).toFixed(2)}`);
      console.log(`  Outstanding Amount: R ${(member.financial_info.outstanding_amount || 0).toFixed(2)}`);
      console.log(`  Percentage Outstanding: ${member.financial_info.percentage_outstanding || 0}%`);
      console.log('');
    });
    console.log('='.repeat(100));
    
    // Summary of what needs to be fixed
    console.log('\n\nSUMMARY OF ISSUE:');
    console.log('='.repeat(100));
    console.log('The user reports that "member screen is showing all members with negative balance show as 0 on the app."');
    console.log('');
    console.log('From our analysis:');
    console.log(`1. We found ${membersWithNegativeBalances.length} members with negative balances in the database.`);
    console.log(`2. We found ${membersWithPositiveBalances.length} members with positive balances in the database.`);
    console.log(`3. We found ${membersWithZeroBalances.length} members with zero balances in the database.`);
    console.log('');
    console.log('The issue is likely in the frontend display logic where:');
    console.log('- Negative balances (members with credit) should show as "Balance: R X.XX" in GREEN');
    console.log('- Positive balances (members who owe money) should show as "Balance Due: R X.XX" in RED');
    console.log('- Zero balances should show as "Balance: R 0.00" in GRAY');
    console.log('');
    console.log('The specific examples mentioned:');
    console.log('- Jeff Matlou (M017) and Nicholas Molale (M041) might have negative balances');
    console.log('  that are currently showing as 0 on the app instead of their actual negative values.');
    console.log('='.repeat(100));
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

checkNegativeBalances().then(() => {
  console.log('\n\nNegative balance check completed.');
  process.exit(0);
}).catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});