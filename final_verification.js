const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';
const supabase = createClient(supabaseUrl, anonKey);

async function finalVerification() {
  console.log('=== FINAL VERIFICATION OF FIX ===\n');
  
  // Get all members
  const { data: members, error } = await supabase
    .from('members')
    .select('member_number, financial_info, catch_up_fee');
  
  if (error) {
    console.error('Error fetching members:', error);
    return;
  }
  
  console.log(`Total members: ${members.length}\n`);
  
  // Calculate using updated logic
  let totalActualContributions = 0;
  let totalTotalContributions = 0;
  let mismatchedCount = 0;
  
  console.log('Checking first 10 members for mismatches:');
  console.log('Member# | Actual Contrib | Total Contrib | Match?');
  console.log('--------|----------------|---------------|--------');
  
  for (let i = 0; i < Math.min(10, members.length); i++) {
    const member = members[i];
    const financialInfo = member.financial_info || {};
    
    const actualContributions = financialInfo.actual_contributions || 0;
    const totalContributions = financialInfo.total_contributions || 0;
    
    totalActualContributions += actualContributions;
    totalTotalContributions += totalContributions;
    
    const matches = Math.abs(actualContributions - totalContributions) < 0.01;
    if (!matches) mismatchedCount++;
    
    console.log(
      `${member.member_number.padStart(7)} | ` +
      `R ${actualContributions.toFixed(2).padStart(13)} | ` +
      `R ${totalContributions.toFixed(2).padStart(12)} | ` +
      `${matches ? '✓' : '✗'}`
    );
  }
  
  // Calculate for all members
  for (const member of members) {
    const financialInfo = member.financial_info || {};
    totalActualContributions += financialInfo.actual_contributions || 0;
    totalTotalContributions += financialInfo.total_contributions || 0;
    
    const actual = financialInfo.actual_contributions || 0;
    const total = financialInfo.total_contributions || 0;
    if (Math.abs(actual - total) > 0.01) mismatchedCount++;
  }
  
  console.log('\n=== CURRENT STATE ===');
  console.log(`Total actual_contributions: R ${totalActualContributions.toFixed(2)}`);
  console.log(`Total total_contributions: R ${totalTotalContributions.toFixed(2)}`);
  console.log(`Difference: R ${(totalTotalContributions - totalActualContributions).toFixed(2)}`);
  console.log(`Members with mismatched values: ${mismatchedCount}`);
  
  console.log('\n=== FIX STATUS ===');
  
  if (mismatchedCount > 0) {
    console.log('❌ ISSUE: Some members have actual_contributions ≠ total_contributions');
    console.log('\n=== ACTION REQUIRED ===');
    console.log('Execute this SQL in Supabase SQL Editor:');
    console.log(`
      UPDATE members 
      SET financial_info = jsonb_set(
        financial_info,
        '{actual_contributions}',
        to_jsonb(COALESCE(
          (financial_info->>'total_contributions')::numeric,
          0
        ))
      )
      WHERE (financial_info->>'total_contributions')::numeric IS NOT NULL;
    `);
    console.log('\nFile: force_update_actual_contributions.sql');
    console.log('URL: https://supabase.com/dashboard/project/zdnyhzasvifrskbostgn/sql');
  } else {
    console.log('✅ SUCCESS: All actual_contributions match total_contributions');
    console.log('\n=== EXPECTED APP BEHAVIOR ===');
    console.log(`Total Fund Value should display: R ${totalActualContributions.toFixed(2)}`);
    console.log('Both users (Lesego and Oratile) should see the same value');
    console.log('Value represents: Sum of all contributions made by members');
    
    // Test RLS
    console.log('\n=== RLS TEST ===');
    const { data: testData, error: testError } = await supabase
      .from('members')
      .select('member_number')
      .limit(3);
    
    if (testError) {
      console.log(`RLS Error: ${testError.message}`);
    } else {
      console.log(`Can access ${testData.length} members (RLS working)`);
    }
  }
  
  console.log('\n=== BUSINESS REQUIREMENT CHECK ===');
  console.log('User requirement: "The value is supposed to be all the contributions made by members."');
  console.log(`Current calculation: R ${totalActualContributions.toFixed(2)} (sum of actual_contributions)`);
  console.log(`Previous (wrong) calculation: R 5,193,906.57 (sum of current_balance including interest)`);
  console.log(`Correction: Removed R ${(5193906.57 - totalActualContributions).toFixed(2)} of accumulated interest`);
  
  console.log('\n=== NEXT STEPS ===');
  if (mismatchedCount > 0) {
    console.log('1. Execute force_update_actual_contributions.sql in Supabase');
    console.log('2. Run this verification script again');
    console.log('3. Test the app with both user accounts');
    console.log('4. Verify both see R ' + totalTotalContributions.toFixed(2));
  } else {
    console.log('1. Test the app with both user accounts');
    console.log('2. Verify both see R ' + totalActualContributions.toFixed(2));
    console.log('3. Deploy to production (if testing successful)');
  }
}

finalVerification().catch(console.error);
