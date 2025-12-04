const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';
const supabase = createClient(supabaseUrl, anonKey);

async function testFixedCalculation() {
  console.log('=== TESTING FIXED FUND CALCULATION ===\n');
  
  // Get all members
  const { data: members, error } = await supabase
    .from('members')
    .select('member_number, financial_info');
  
  if (error) {
    console.error('Error fetching members:', error);
    return;
  }
  
  console.log(`Total members: ${members.length}\n`);
  
  // Simulate current calculation (using current_balance)
  let currentMethodTotal = 0;
  
  // Simulate fixed calculation (using actual_contributions, fallback to total_contributions)
  let fixedMethodTotal = 0;
  
  // Simulate with populated actual_contributions (copy from total_contributions)
  let populatedMethodTotal = 0;
  
  console.log('Member# | Current Balance | Total Contrib | Fixed (Actual) | Fixed (Populated)');
  console.log('--------|-----------------|---------------|----------------|-------------------');
  
  for (let i = 0; i < Math.min(5, members.length); i++) {
    const member = members[i];
    const financialInfo = member.financial_info || {};
    
    const currentBalance = financialInfo.current_balance || 0;
    const totalContributions = financialInfo.total_contributions || 0;
    const actualContributions = financialInfo.actual_contributions || 0;
    
    // Current method
    currentMethodTotal += currentBalance;
    
    // Fixed method (using actual_contributions if available, otherwise total_contributions)
    const fixedValue = actualContributions > 0 ? actualContributions : totalContributions;
    fixedMethodTotal += fixedValue;
    
    // Populated method (simulate after data fix)
    const populatedValue = totalContributions; // After fix, actual_contributions = total_contributions
    populatedMethodTotal += populatedValue;
    
    console.log(
      `${member.member_number.padStart(7)} | ` +
      `R ${currentBalance.toFixed(2).padStart(14)} | ` +
      `R ${totalContributions.toFixed(2).padStart(12)} | ` +
      `R ${fixedValue.toFixed(2).padStart(13)} | ` +
      `R ${populatedValue.toFixed(2).padStart(16)}`
    );
  }
  
  // Calculate totals for all members
  for (const member of members) {
    const financialInfo = member.financial_info || {};
    
    const currentBalance = financialInfo.current_balance || 0;
    const totalContributions = financialInfo.total_contributions || 0;
    const actualContributions = financialInfo.actual_contributions || 0;
    
    currentMethodTotal += currentBalance;
    
    const fixedValue = actualContributions > 0 ? actualContributions : totalContributions;
    fixedMethodTotal += fixedValue;
    
    const populatedValue = totalContributions;
    populatedMethodTotal += populatedValue;
  }
  
  console.log('\n=== CALCULATION RESULTS ===');
  console.log(`Current Method (current_balance):          R ${currentMethodTotal.toFixed(2)}`);
  console.log(`Fixed Method (actual/total_contributions): R ${fixedMethodTotal.toFixed(2)}`);
  console.log(`After Data Population (total_contributions): R ${populatedMethodTotal.toFixed(2)}`);
  
  console.log('\n=== BUSINESS REQUIREMENT ===');
  console.log('User says: "The value is supposed to be all the contributions made by members."');
  console.log('Expected: Sum of actual contributions made');
  
  console.log('\n=== RECOMMENDATION ===');
  console.log('1. Execute SQL to populate actual_contributions field');
  console.log('2. Update getFundStatistics() to use actual_contributions');
  console.log('3. Expected Total Fund Value: R ' + populatedMethodTotal.toFixed(2));
  
  console.log('\n=== COMPARISON WITH CURRENT APP ===');
  console.log(`Lesego currently sees:    R 4,986,838.63`);
  console.log(`Oratile currently sees:   R 619,169.20 (RLS issue)`);
  console.log(`After fix should see:     R ${populatedMethodTotal.toFixed(2)}`);
  
  const discrepancy = Math.abs(currentMethodTotal - populatedMethodTotal);
  console.log(`\nDiscrepancy between current and fixed: R ${discrepancy.toFixed(2)}`);
  console.log(`This is the interest/fees that will be excluded.`);
  
  // Check if this is reasonable
  const interestPercentage = (discrepancy / populatedMethodTotal * 100).toFixed(1);
  console.log(`Interest represents approximately ${interestPercentage}% of contributions`);
  
  console.log('\n=== IMPLEMENTATION STEPS ===');
  console.log('1. Fix RLS policies (execute fix_rls_policy_improved.sql)');
  console.log('2. Populate actual_contributions field (SQL provided)');
  console.log('3. Update supabaseMemberService.ts calculation');
  console.log('4. Test with both users');
  console.log('5. Verify all users see R ' + populatedMethodTotal.toFixed(2));
}

testFixedCalculation().catch(console.error);
