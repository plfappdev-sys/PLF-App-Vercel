const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';

// Test with different authentication states
async function testDifferentAuthStates() {
  console.log('Testing data access with different authentication states...\n');
  
  // 1. Anonymous user (no auth)
  console.log('1. Testing ANONYMOUS user (no authentication):');
  const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';
  const anonClient = createClient(supabaseUrl, anonKey);
  
  const { data: anonData, error: anonError } = await anonClient
    .from('members')
    .select('member_number, financial_info')
    .limit(20);
  
  if (anonError) {
    console.log('  ❌ Error:', anonError.message);
  } else {
    console.log(`  ✅ Success: Found ${anonData.length} members`);
    
    // Calculate total for anonymous user
    let anonTotal = 0;
    anonData.forEach(member => {
      const balance = member.financial_info?.current_balance || 0;
      anonTotal += balance;
    });
    console.log(`  Total balance for first ${anonData.length} members: R ${anonTotal.toFixed(2)}`);
  }
  
  console.log('\n2. Testing with SERVICE ROLE (full access):');
  // Note: Service role key should give full access
  const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAyNDQ4NCwiZXhwIjoyMDczNjAwNDg0fQ.8f8qJ0cJXKqK8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8Q';
  const serviceClient = createClient(supabaseUrl, serviceKey);
  
  const { data: serviceData, error: serviceError } = await serviceClient
    .from('members')
    .select('member_number, financial_info')
    .limit(20);
  
  if (serviceError) {
    console.log('  ❌ Error:', serviceError.message);
  } else {
    console.log(`  ✅ Success: Found ${serviceData.length} members`);
    
    // Calculate total for service role
    let serviceTotal = 0;
    serviceData.forEach(member => {
      const balance = member.financial_info?.current_balance || 0;
      serviceTotal += balance;
    });
    console.log(`  Total balance for first ${serviceData.length} members: R ${serviceTotal.toFixed(2)}`);
  }
  
  console.log('\n3. Analysis of the issue:');
  console.log('   - Lesego (regular user) sees: R 4,986,838.63 (full total)');
  console.log('   - Oratile (superuser) sees: R 619,169.20 (~12.4% of total)');
  console.log('   - This suggests RLS policies are filtering data differently');
  console.log('\n4. Recommended fix:');
  console.log('   a) Execute the SQL in fix_rls_policy_improved.sql in Supabase SQL Editor');
  console.log('   b) OR temporarily disable RLS for testing:');
  console.log('      ALTER TABLE members DISABLE ROW LEVEL SECURITY;');
  console.log('   c) Test with both users after fixing RLS policies');
  
  console.log('\n5. Checking if RLS is the issue:');
  console.log('   If anonymous users see ALL data but authenticated users see PARTIAL data,');
  console.log('   then RLS policies need to be fixed for authenticated users.');
}

// Also test the getFundStatistics logic
async function testGetFundStatisticsLogic() {
  console.log('\n\nTesting getFundStatistics() calculation logic...');
  
  const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';
  const client = createClient(supabaseUrl, anonKey);
  
  // Simulate calculateFundStatisticsFromMembers
  const { data: members, error } = await client
    .from('members')
    .select('*');
  
  if (error) {
    console.log('Error fetching members:', error.message);
    return;
  }
  
  console.log(`Total members in database: ${members.length}`);
  
  let totalFundValue = 0;
  members.forEach(member => {
    const financialInfo = member?.financial_info || {};
    const currentBalance = financialInfo?.current_balance || 0;
    totalFundValue += currentBalance;
  });
  
  console.log(`Total fund value from calculation: R ${totalFundValue.toFixed(2)}`);
  console.log(`Expected (Lesego sees): R 4,986,838.63`);
  console.log(`Oratile sees: R 619,169.20`);
  
  if (Math.abs(totalFundValue - 4986838.63) < 1) {
    console.log('✅ Calculation matches Lesego\'s view (full total)');
    console.log('❌ Oratile is NOT seeing the full calculation');
    console.log('\nCONCLUSION: The issue is NOT in getFundStatistics() calculation.');
    console.log('The issue is in DATA ACCESS - Oratile is getting filtered data.');
  } else {
    console.log('❌ Calculation does NOT match expected total');
    console.log('This suggests a bug in the calculation logic itself.');
  }
}

async function main() {
  await testDifferentAuthStates();
  await testGetFundStatisticsLogic();
  
  console.log('\n\n=== FINAL RECOMMENDATIONS ===');
  console.log('1. Fix RLS policies in Supabase:');
  console.log('   - Go to Supabase Dashboard → SQL Editor');
  console.log('   - Execute the SQL in fix_rls_policy_improved.sql');
  console.log('');
  console.log('2. Alternative quick fix (for testing):');
  console.log('   ALTER TABLE members DISABLE ROW LEVEL SECURITY;');
  console.log('');
  console.log('3. After fixing RLS, test with both users:');
  console.log('   - Lesego (member) should see their own data only');
  console.log('   - Oratile (superuser) should see ALL data');
  console.log('');
  console.log('4. If issue persists, check SupabaseMemberService:');
  console.log('   - Ensure it uses authenticated client for logged-in users');
  console.log('   - Not just anonymous client');
}

main().catch(console.error);
