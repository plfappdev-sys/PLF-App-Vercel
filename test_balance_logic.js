// Test to understand current balance logic and implement new business logic
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testBalanceLogic() {
  console.log('=== TESTING BALANCE LOGIC FOR NEW BUSINESS RULES ===\n');
  
  console.log('NEW BUSINESS LOGIC:');
  console.log('1. Positive balance = "Balance Due" (member owes money)');
  console.log('2. Negative balance = "Balance" (member has overpaid, has credit)');
  console.log('3. Good standing = Members with negative balances (have overpaid)');
  console.log('4. Outstanding contributions = Members with positive balances (still owe money)\n');
  
  console.log('CURRENT LOGIC (to be changed):');
  console.log('1. Positive balance = "Current Balance" (shows as green)');
  console.log('2. Negative balance = "Outstanding Amount" (shows as red)');
  console.log('3. Good standing = Members with positive or zero balance');
  console.log('4. Owing categories = Based on percentage of R16,600 owed\n');
  
  try {
    // Get sample members to understand current data
    console.log('1. Fetching sample members with their balances...');
    const { data: members, error: membersError } = await supabase
      .from('members')
      .select('id, member_number, name, catch_up_fee, financial_info')
      .limit(10);
    
    if (membersError) {
      console.error('Error fetching members:', membersError.message);
      return;
    }
    
    console.log(`Found ${members.length} members\n`);
    
    // Get member balances
    console.log('2. Fetching member balances...');
    const { data: balances, error: balancesError } = await supabase
      .from('member_balances')
      .select('*');
    
    if (balancesError) {
      console.warn('Error fetching member balances:', balancesError.message);
    }
    
    // Create balance lookup
    const balanceLookup = {};
    if (balances && Array.isArray(balances)) {
      balances.forEach(balance => {
        balanceLookup[balance.member_id] = balance;
      });
    }
    
    // Analyze each member
    console.log('\n3. Analyzing member balances:');
    console.log('========================================');
    
    members.forEach(member => {
      const balanceData = balanceLookup[member.id];
      const financialInfo = member.financial_info || {};
      
      // Calculate current balance based on new business logic
      // net_balance = savings_balance - loan_balance
      // Positive net_balance = member owes money (Balance Due)
      // Negative net_balance = member has credit (Balance)
      
      let netBalance = 0;
      let savingsBalance = 0;
      let loanBalance = 0;
      
      if (balanceData) {
        savingsBalance = balanceData.savings_balance || 0;
        loanBalance = balanceData.loan_balance || 0;
        netBalance = balanceData.net_balance !== undefined && balanceData.net_balance !== null 
          ? balanceData.net_balance 
          : (savingsBalance - loanBalance);
      } else {
        // Fallback to financial_info
        savingsBalance = financialInfo.total_contributions || 0;
        loanBalance = 0; // Assume no loans if no balance data
        netBalance = financialInfo.current_balance || 0;
      }
      
      // Add catch-up fee to outstanding amount
      const catchUpFee = member.catch_up_fee || 0;
      const outstandingAmount = catchUpFee + (financialInfo.outstanding_amount || 0);
      
      // Determine status based on NEW business logic
      const isPositiveBalance = netBalance > 0;
      const isNegativeBalance = netBalance < 0;
      const isZeroBalance = netBalance === 0;
      
      // NEW: Good standing = negative balance (has overpaid)
      const isGoodStanding = isNegativeBalance;
      
      // NEW: Outstanding contributions = positive balance (owes money)
      const hasOutstandingContributions = isPositiveBalance;
      
      console.log(`Member: ${member.member_number} - ${member.name || 'No Name'}`);
      console.log(`  Savings Balance: R ${savingsBalance.toFixed(2)}`);
      console.log(`  Loan Balance: R ${loanBalance.toFixed(2)}`);
      console.log(`  Net Balance: R ${netBalance.toFixed(2)}`);
      console.log(`  Catch-up Fee: R ${catchUpFee.toFixed(2)}`);
      console.log(`  Outstanding Amount: R ${outstandingAmount.toFixed(2)}`);
      console.log(`  Balance Type: ${isPositiveBalance ? 'POSITIVE (owes money)' : isNegativeBalance ? 'NEGATIVE (has credit)' : 'ZERO'}`);
      console.log(`  NEW - Good Standing: ${isGoodStanding ? '✅ YES (has overpaid)' : '❌ NO (owes money)'}`);
      console.log(`  NEW - Outstanding Contributions: ${hasOutstandingContributions ? '✅ YES (owes money)' : '❌ NO (has credit or zero)'}`);
      console.log('----------------------------------------');
    });
    
    // Test specific examples mentioned in feedback
    console.log('\n4. Testing specific examples from feedback:');
    console.log('========================================');
    
    const testMembers = ['M001', 'M006', 'M031', 'M041']; // Jeff Matlou, Christopher Naude, Lesego Bokaba, Nicholas Molale
    
    for (const memberNumber of testMembers) {
      console.log(`\nTesting ${memberNumber}:`);
      
      // Get member
      const { data: member, error: memberError } = await supabase
        .from('members')
        .select('id, member_number, name, catch_up_fee, financial_info')
        .eq('member_number', memberNumber)
        .single();
      
      if (memberError) {
        console.log(`  ❌ Member ${memberNumber} not found`);
        continue;
      }
      
      // Get balance
      const { data: balance, error: balanceError } = await supabase
        .from('member_balances')
        .select('*')
        .eq('member_id', member.id)
        .single();
      
      let netBalance = 0;
      if (balance) {
        netBalance = balance.net_balance !== undefined && balance.net_balance !== null 
          ? balance.net_balance 
          : ((balance.savings_balance || 0) - (balance.loan_balance || 0));
      } else {
        const financialInfo = member.financial_info || {};
        netBalance = financialInfo.current_balance || 0;
      }
      
      // Apply NEW business logic
      const displayLabel = netBalance > 0 ? 'Balance Due' : 'Balance';
      const displayAmount = netBalance > 0 ? netBalance : Math.abs(netBalance);
      const isGoodStanding = netBalance < 0;
      
      console.log(`  Name: ${member.name || 'Unknown'}`);
      console.log(`  Net Balance: R ${netBalance.toFixed(2)}`);
      console.log(`  NEW Display: ${displayLabel}: R ${displayAmount.toFixed(2)}`);
      console.log(`  NEW Good Standing: ${isGoodStanding ? '✅ YES' : '❌ NO'}`);
      console.log(`  Interpretation: ${netBalance > 0 ? 'Owes money to PLF' : netBalance < 0 ? 'Has credit with PLF' : 'Zero balance'}`);
    }
    
    // Calculate fund statistics with new logic
    console.log('\n5. Calculating fund statistics with NEW logic:');
    console.log('========================================');
    
    // Get all members with balances
    const { data: allMembers, error: allMembersError } = await supabase
      .from('members')
      .select('id, member_number');
    
    if (allMembersError) {
      console.error('Error fetching all members:', allMembersError.message);
      return;
    }
    
    // Get all balances
    const { data: allBalances, error: allBalancesError } = await supabase
      .from('member_balances')
      .select('*');
    
    if (allBalancesError) {
      console.warn('Error fetching all balances:', allBalancesError.message);
    }
    
    // Create balance lookup for all members
    const allBalanceLookup = {};
    if (allBalances && Array.isArray(allBalances)) {
      allBalances.forEach(balance => {
        allBalanceLookup[balance.member_id] = balance;
      });
    }
    
    // Calculate statistics
    let totalMembers = allMembers.length;
    let totalFundContributions = 0; // Sum of all actual contributions received
    let totalOutstandingContributions = 0; // Sum of all positive balances (money owed)
    let membersWithCredit = 0; // Members with negative balances (overpaid)
    let membersOwingMoney = 0; // Members with positive balances
    
    for (const member of allMembers) {
      const balanceData = allBalanceLookup[member.id];
      
      let netBalance = 0;
      let savingsBalance = 0;
      
      if (balanceData) {
        savingsBalance = balanceData.savings_balance || 0;
        const loanBalance = balanceData.loan_balance || 0;
        netBalance = balanceData.net_balance !== undefined && balanceData.net_balance !== null 
          ? balanceData.net_balance 
          : (savingsBalance - loanBalance);
      }
      
      // Add to total contributions (actual money received)
      totalFundContributions += savingsBalance;
      
      // Add to outstanding if positive balance (owes money)
      if (netBalance > 0) {
        totalOutstandingContributions += netBalance;
        membersOwingMoney++;
      }
      
      // Count members with credit (negative balance)
      if (netBalance < 0) {
        membersWithCredit++;
      }
    }
    
    console.log(`Total Members: ${totalMembers}`);
    console.log(`Total Fund Contributions (actual received): R ${totalFundContributions.toFixed(2)}`);
    console.log(`Total Outstanding Contributions (money owed): R ${totalOutstandingContributions.toFixed(2)}`);
    console.log(`Members with credit (overpaid): ${membersWithCredit}`);
    console.log(`Members owing money: ${membersOwingMoney}`);
    console.log(`Members with zero balance: ${totalMembers - membersWithCredit - membersOwingMoney}`);
    
    console.log('\n✅ TEST COMPLETE: New business logic analysis done.');
    console.log('\nRECOMMENDED CHANGES:');
    console.log('1. DashboardScreen:');
    console.log('   - Change "Total Fund Value" to "Total Fund Contributions"');
    console.log('   - Display actual contributions received: R ' + totalFundContributions.toFixed(2));
    console.log('   - Change "Outstanding Loans" to "Total Outstanding Contributions"');
    console.log('   - Display money owed: R ' + totalOutstandingContributions.toFixed(2));
    console.log('\n2. MyFundsScreen:');
    console.log('   - Positive balance → Show as "Balance Due: R X.XX"');
    console.log('   - Negative balance → Show as "Balance: R X.XX" (absolute value)');
    console.log('   - Update standing logic: Good standing = negative balance');
    console.log('\n3. Standing categories:');
    console.log('   - Good standing = Members with negative balances (have credit)');
    console.log('   - Owing categories = Based on positive balance amounts');
    
  } catch (err) {
    console.error('Exception:', err.message);
  }
}

// Run the test
testBalanceLogic().catch(console.error);