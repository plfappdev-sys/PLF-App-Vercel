const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';
const supabase = createClient(supabaseUrl, anonKey);

async function checkAndFixActualContributions() {
  console.log('=== CHECKING AND FIXING actual_contributions FIELD ===\n');
  
  // First, check current state
  const { data: members, error } = await supabase
    .from('members')
    .select('member_number, financial_info');
  
  if (error) {
    console.error('Error fetching members:', error);
    return;
  }
  
  console.log(`Total members: ${members.length}\n`);
  
  let membersWithActualContributions = 0;
  let membersWithZeroActualContributions = 0;
  let membersWithTotalContributions = 0;
  let totalActualContributions = 0;
  let totalTotalContributions = 0;
  
  console.log('Member# | Actual Contrib | Total Contrib | Needs Fix?');
  console.log('--------|----------------|---------------|-----------');
  
  for (let i = 0; i < Math.min(10, members.length); i++) {
    const member = members[i];
    const financialInfo = member.financial_info || {};
    
    const actualContributions = financialInfo.actual_contributions || 0;
    const totalContributions = financialInfo.total_contributions || 0;
    
    if (actualContributions > 0) membersWithActualContributions++;
    if (actualContributions === 0) membersWithZeroActualContributions++;
    if (totalContributions > 0) membersWithTotalContributions++;
    
    totalActualContributions += actualContributions;
    totalTotalContributions += totalContributions;
    
    const needsFix = actualContributions === 0 && totalContributions > 0;
    
    console.log(
      `${member.member_number.padStart(7)} | ` +
      `R ${actualContributions.toFixed(2).padStart(13)} | ` +
      `R ${totalContributions.toFixed(2).padStart(12)} | ` +
      `${needsFix ? 'YES' : 'NO'}`
    );
  }
  
  // Calculate for all members
  for (const member of members) {
    const financialInfo = member.financial_info || {};
    const actualContributions = financialInfo.actual_contributions || 0;
    const totalContributions = financialInfo.total_contributions || 0;
    
    if (actualContributions > 0) membersWithActualContributions++;
    if (actualContributions === 0) membersWithZeroActualContributions++;
    if (totalContributions > 0) membersWithTotalContributions++;
    
    totalActualContributions += actualContributions;
    totalTotalContributions += totalContributions;
  }
  
  console.log('\n=== CURRENT STATE ===');
  console.log(`Members with actual_contributions > 0: ${membersWithActualContributions}`);
  console.log(`Members with actual_contributions = 0: ${membersWithZeroActualContributions}`);
  console.log(`Members with total_contributions > 0: ${membersWithTotalContributions}`);
  console.log(`Total actual_contributions: R ${totalActualContributions.toFixed(2)}`);
  console.log(`Total total_contributions: R ${totalTotalContributions.toFixed(2)}`);
  console.log(`Difference: R ${(totalTotalContributions - totalActualContributions).toFixed(2)}`);
  
  const needsFixCount = membersWithZeroActualContributions;
  console.log(`\nMembers needing fix: ${needsFixCount} (${((needsFixCount / members.length) * 100).toFixed(1)}%)`);
  
  if (needsFixCount > 0) {
    console.log('\n=== EXECUTING FIX ===');
    console.log('Copying total_contributions to actual_contributions where empty...');
    
    // Create the SQL to fix the issue
    const fixSql = `
      UPDATE members 
      SET financial_info = jsonb_set(
        financial_info,
        '{actual_contributions}',
        to_jsonb(COALESCE(
          (financial_info->>'total_contributions')::numeric,
          0
        ))
      )
      WHERE financial_info->>'actual_contributions' IS NULL 
         OR (financial_info->>'actual_contributions')::numeric = 0;
    `;
    
    console.log('SQL to execute:');
    console.log(fixSql);
    
    console.log('\n⚠️  IMPORTANT: This SQL needs to be executed in Supabase SQL Editor.');
    console.log('Go to: https://supabase.com/dashboard/project/zdnyhzasvifrskbostgn/sql');
    console.log('Paste the SQL above and run it.');
    
    // Alternative: Use service role key to execute directly
    console.log('\n=== ALTERNATIVE: DIRECT FIX ===');
    console.log('Using service role key to update directly...');
    
    // Note: We would need service role key for this, but we can't expose it here
    console.log('Service role key required for direct update.');
    console.log('Please execute the SQL manually in Supabase SQL Editor.');
    
  } else {
    console.log('\n✅ No fix needed - all actual_contributions are populated.');
  }
  
  console.log('\n=== EXPECTED AFTER FIX ===');
  console.log(`Expected total_contributions: R ${totalTotalContributions.toFixed(2)}`);
  console.log(`Expected actual_contributions after fix: R ${totalTotalContributions.toFixed(2)}`);
  console.log(`Expected Total Fund Value: R ${totalTotalContributions.toFixed(2)}`);
  
  console.log('\n=== VERIFICATION STEPS ===');
  console.log('1. Execute the SQL in Supabase SQL Editor');
  console.log('2. Run this script again to verify');
  console.log('3. Test the app with both users');
  console.log('4. Both should see: R ' + totalTotalContributions.toFixed(2));
}

checkAndFixActualContributions().catch(console.error);
