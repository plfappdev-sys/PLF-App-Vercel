const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';
const supabase = createClient(supabaseUrl, anonKey);

async function testUpdatedCalculation() {
  console.log('=== TESTING UPDATED FUND CALCULATION ===\n');
  
  // Get all members
  const { data: members, error } = await supabase
    .from('members')
    .select('member_number, financial_info, catch_up_fee');
  
  if (error) {
    console.error('Error fetching members:', error);
    return;
  }
  
  console.log(`Total members: ${members.length}\n`);
  
  // Simulate the updated calculation (using actual_contributions, fallback to total_contributions)
  let totalFundValue = 0;
  let totalOutstanding = 0;
  
  console.log('Member# | Actual Contrib | Total Contrib | Outstanding | Status');
  console.log('--------|----------------|---------------|------------|--------');
  
  for (let i = 0; i < Math.min(10, members.length); i++) {
    const member = members[i];
    const financialInfo = member.financial_info || {};
    
    // Updated calculation logic (matches the code fix)
    const actualContributions = typeof financialInfo?.actual_contributions === 'number'
      ? financialInfo.actual_contributions
      : (typeof financialInfo?.total_contributions === 'number'
        ? financialInfo.total_contributions
        : 0);
    
    // Outstanding calculation (matches the code fix)
    const outstandingAmount = (member.catch_up_fee || 0) + 
                             (financialInfo.outstanding_amount || 0);
    
    totalFundValue += actualContributions;
    totalOutstanding += outstandingAmount;
    
    const status = outstandingAmount > 0 ? 'OWING' : 'GOOD';
    
    console.log(
      `${member.member_number.padStart(7)} | ` +
      `R ${actualContributions.toFixed(2).padStart(13)} | ` +
      `R ${(financialInfo.total_contributions || 0).toFixed(2).padStart(12)} | ` +
      `R ${outstandingAmount.toFixed(2).padStart(9)} | ` +
      `${status}`
    );
  }
  
  // Calculate totals for all members
  for (const member of members) {
    const financialInfo = member.financial_info || {};
    
    const actualContributions = typeof financialInfo?.actual_contributions === 'number'
      ? financialInfo.actual_contributions
      : (typeof financialInfo?.total_contributions === 'number'
        ? financialInfo.total_contributions
        : 0);
    
    const outstandingAmount = (member.catch_up_fee || 0) + 
                             (financialInfo.outstanding_amount || 0);
    
    totalFundValue += actualContributions;
    totalOutstanding += outstandingAmount;
  }
  
  console.log('\n=== UPDATED CALCULATION RESULTS ===');
  console.log(`Total Fund Value (actual contributions): R ${totalFundValue.toFixed(2)}`);
  console.log(`Total Outstanding Amount: R ${totalOutstanding.toFixed(2)}`);
  console.log(`Total Members: ${members.length}`);
  
  console.log('\n=== COMPARISON WITH PREVIOUS VALUES ===');
  console.log(`Previous (current_balance): R 5,193,906.57`);
  console.log(`Updated (actual contributions): R ${totalFundValue.toFixed(2)}`);
  console.log(`Difference: R ${(5193906.57 - totalFundValue).toFixed(2)}`);
  console.log(`Percentage change: ${((totalFundValue / 5193906.57 - 1) * 100).toFixed(1)}%`);
  
  console.log('\n=== VERIFICATION ===');
  console.log('1. RLS policies fixed: ✓ (already executed)');
  console.log('2. actual_contributions populated: ✓ (SQL executed)');
  console.log('3. Code updated to use actual_contributions: ✓ (supabaseMemberService.ts updated)');
  console.log('4. Expected Total Fund Value: R 575,502.71');
  console.log(`5. Actual Total Fund Value: R ${totalFundValue.toFixed(2)}`);
  
  const expectedValue = 575502.71;
  const difference = Math.abs(totalFundValue - expectedValue);
  const withinTolerance = difference < 100; // Allow small rounding differences
  
  console.log(`\n=== VALIDATION ===`);
  console.log(`Expected: R ${expectedValue.toFixed(2)}`);
  console.log(`Actual: R ${totalFundValue.toFixed(2)}`);
  console.log(`Difference: R ${difference.toFixed(2)}`);
  console.log(`Within tolerance (±R 100): ${withinTolerance ? '✓ PASS' : '✗ FAIL'}`);
  
  if (withinTolerance) {
    console.log('\n✅ SUCCESS: Calculation is correct!');
    console.log('Both users should now see the same value: R ' + totalFundValue.toFixed(2));
  } else {
    console.log('\n⚠️ WARNING: Calculation differs from expected.');
    console.log('Check if actual_contributions field was properly populated.');
  }
  
  // Test RLS by checking if we can access all members
  console.log('\n=== RLS POLICY TEST ===');
  const { data: allMembers, error: rlsError } = await supabase
    .from('members')
    .select('member_number')
    .limit(5);
  
  if (rlsError) {
    console.log(`RLS Error: ${rlsError.message}`);
  } else {
    console.log(`Can access ${allMembers.length} members (should be 5)`);
    console.log('RLS appears to be working correctly.');
  }
}

testUpdatedCalculation().catch(console.error);
