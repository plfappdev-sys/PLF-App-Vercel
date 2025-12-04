const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';
const supabase = createClient(supabaseUrl, anonKey);

async function analyzeFundCalculation() {
  console.log('=== ANALYZING FUND VALUE CALCULATION ===\n');
  
  // 1. Get all members with their financial info
  console.log('1. Fetching all members with financial info...');
  const { data: members, error: membersError } = await supabase
    .from('members')
    .select('member_number, financial_info, catch_up_fee');
  
  if (membersError) {
    console.error('Error fetching members:', membersError);
    return;
  }
  
  console.log(`Total members in database: ${members.length}\n`);
  
  // 2. Check member_balances table
  console.log('2. Checking member_balances table...');
  const { data: balances, error: balancesError } = await supabase
    .from('member_balances')
    .select('*');
  
  if (balancesError) {
    console.log('member_balances table error or empty:', balancesError.message);
  } else {
    console.log(`member_balances records: ${balances?.length || 0}`);
  }
  
  // 3. Analyze current calculation (what getFundStatistics does)
  console.log('\n3. Analyzing CURRENT calculation logic:');
  console.log('   The current getFundStatistics() method calculates:');
  console.log('   - Uses savings_balance from member_balances if available');
  console.log('   - Otherwise uses current_balance from financial_info');
  console.log('   - Or falls back to total_contributions from financial_info\n');
  
  let currentMethodTotal = 0;
  let actualContributionsTotal = 0;
  let currentBalanceTotal = 0;
  let savingsBalanceTotal = 0;
  let totalContributionsTotal = 0;
  
  // Sample analysis of first 10 members
  console.log('4. Sample analysis of first 10 members:');
  console.log('Member# | Current Balance | Actual Contrib | Savings Balance | Total Contrib | Catch-up Fee');
  console.log('--------|-----------------|----------------|-----------------|---------------|-------------');
  
  for (let i = 0; i < Math.min(10, members.length); i++) {
    const member = members[i];
    const financialInfo = member.financial_info || {};
    
    const currentBalance = financialInfo.current_balance || 0;
    const actualContributions = financialInfo.actual_contributions || 0;
    const savingsBalance = financialInfo.savings_balance || 0;
    const totalContributions = financialInfo.total_contributions || 0;
    const catchUpFee = member.catch_up_fee || 0;
    
    console.log(
      `${member.member_number.padStart(7)} | ` +
      `R ${currentBalance.toFixed(2).padStart(14)} | ` +
      `R ${actualContributions.toFixed(2).padStart(14)} | ` +
      `R ${savingsBalance.toFixed(2).padStart(14)} | ` +
      `R ${totalContributions.toFixed(2).padStart(13)} | ` +
      `R ${catchUpFee.toFixed(2).padStart(11)}`
    );
    
    currentMethodTotal += currentBalance;
    actualContributionsTotal += actualContributions;
    currentBalanceTotal += currentBalance;
    savingsBalanceTotal += savingsBalance;
    totalContributionsTotal += totalContributions;
  }
  
  // 5. Calculate totals for all members
  console.log('\n5. Calculating totals for ALL 89 members:');
  
  for (const member of members) {
    const financialInfo = member.financial_info || {};
    currentMethodTotal += financialInfo.current_balance || 0;
    actualContributionsTotal += financialInfo.actual_contributions || 0;
    currentBalanceTotal += financialInfo.current_balance || 0;
    savingsBalanceTotal += financialInfo.savings_balance || 0;
    totalContributionsTotal += financialInfo.total_contributions || 0;
  }
  
  console.log(`   Current Method (current_balance): R ${currentMethodTotal.toFixed(2)}`);
  console.log(`   Actual Contributions:             R ${actualContributionsTotal.toFixed(2)}`);
  console.log(`   Current Balance:                  R ${currentBalanceTotal.toFixed(2)}`);
  console.log(`   Savings Balance:                  R ${savingsBalanceTotal.toFixed(2)}`);
  console.log(`   Total Contributions:              R ${totalContributionsTotal.toFixed(2)}`);
  
  // 6. Check what the app currently shows
  console.log('\n6. What the app currently shows:');
  console.log('   - Lesego sees: R 4,986,838.63');
  console.log('   - Oratile sees: R 619,169.20');
  console.log(`   - Our calculation of current_balance: R ${currentMethodTotal.toFixed(2)}`);
  
  // 7. Determine the correct calculation
  console.log('\n7. Determining the CORRECT calculation:');
  console.log('   According to user: "The value is supposed to be all the contributions made by members."');
  console.log('   This means: SUM of actual_contributions for all members');
  console.log(`   SUM(actual_contributions) = R ${actualContributionsTotal.toFixed(2)}`);
  
  // 8. Check if there's a discrepancy
  const discrepancy = Math.abs(currentMethodTotal - actualContributionsTotal);
  console.log(`\n8. Discrepancy analysis:`);
  console.log(`   Difference between current_balance and actual_contributions: R ${discrepancy.toFixed(2)}`);
  
  if (discrepancy > 100) { // More than R100 difference
    console.log(`   ❌ SIGNIFICANT DISCREPANCY FOUND!`);
    console.log(`   The current calculation is using current_balance instead of actual_contributions.`);
    console.log(`   This could include interest, fees, or other adjustments.`);
  } else {
    console.log(`   ✅ No significant discrepancy found.`);
  }
  
  // 9. Check database schema
  console.log('\n9. Checking database schema for contributions data:');
  console.log('   Looking for transaction/contribution records...');
  
  // Check if there's a contributions table
  const { data: contributions, error: contribError } = await supabase
    .from('contributions')
    .select('amount')
    .limit(5);
  
  if (contribError) {
    console.log('   No contributions table found or error:', contribError.message);
  } else {
    console.log(`   Contributions table found with ${contributions?.length || 0} records`);
  }
  
  // Check if there's a transactions table
  const { data: transactions, error: transError } = await supabase
    .from('transactions')
    .select('amount, type')
    .limit(5);
  
  if (transError) {
    console.log('   No transactions table found or error:', transError.message);
  } else {
    console.log(`   Transactions table found with ${transactions?.length || 0} records`);
  }
  
  // 10. Recommendations
  console.log('\n10. RECOMMENDATIONS:');
  console.log('    a) If actual_contributions is the correct metric:');
  console.log(`       - Update getFundStatistics() to sum actual_contributions`);
  console.log(`       - Expected total: R ${actualContributionsTotal.toFixed(2)}`);
  console.log('    b) If current_balance includes interest/fees and is correct:');
  console.log(`       - Current calculation is correct: R ${currentMethodTotal.toFixed(2)}`);
  console.log('    c) Need to verify business logic:');
  console.log('       - Does "Total Fund Value" mean total contributions made?');
  console.log('       - Or does it mean current balance (contributions + interest - fees)?');
  
  // 11. Create test to verify
  console.log('\n11. Creating verification test...');
  
  // Simulate the fix
  const shouldUseActualContributions = true; // Based on user requirement
  
  if (shouldUseActualContributions) {
    console.log(`   ✅ CORRECT TOTAL FUND VALUE: R ${actualContributionsTotal.toFixed(2)}`);
    console.log(`   (Sum of actual_contributions for all 89 members)`);
    
    // Check if this matches what users see
    if (Math.abs(actualContributionsTotal - 4986838.63) < 1) {
      console.log('   ✅ Matches Lesego\'s view (R 4,986,838.63)');
    } else {
      console.log(`   ❌ Does NOT match Lesego\'s view (R 4,986,838.63)`);
      console.log(`   Difference: R ${Math.abs(actualContributionsTotal - 4986838.63).toFixed(2)}`);
    }
  }
}

analyzeFundCalculation().catch(console.error);
