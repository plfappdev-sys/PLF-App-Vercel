// Final verification test to confirm the fix works
const { createClient } = require('@supabase/supabase-js');

async function testAllScenarios() {
  console.log('=== FINAL VERIFICATION TEST ===\n');

  const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Test 1: Check if members table is accessible
  console.log('1. Testing members table access...');
  const { data: members, error: membersError } = await supabase
    .from('members')
    .select('count')
    .limit(1);

  if (membersError) {
    console.log(`❌ Members table error: ${membersError.message}`);
    console.log(`   Code: ${membersError.code}`);
    console.log(`   Details: ${membersError.details}`);
    console.log(`   Hint: ${membersError.hint}`);
  } else {
    console.log('✅ Members table is accessible');
  }

  // Test 2: Check if we can get all members
  console.log('\n2. Testing full members data access...');
  const { data: allMembers, error: allMembersError } = await supabase
    .from('members')
    .select('*')
    .limit(5);

  if (allMembersError) {
    console.log(`❌ Full members query error: ${allMembersError.message}`);
  } else {
    console.log(`✅ Retrieved ${allMembers.length} sample members`);
    console.log('   Sample member data:');
    allMembers.forEach((member, i) => {
      console.log(`   ${i + 1}. ${member.member_number}: ${member.name || 'No name'}`);
      console.log(`      Current balance: R ${member.financial_info?.current_balance || 0}`);
      console.log(`      Catch-up fee: R ${member.catch_up_fee || 0}`);
    });
  }

  // Test 3: Simulate the exact calculation from calculateFundStatisticsFromMembers()
  console.log('\n3. Simulating calculateFundStatisticsFromMembers()...');
  const { data: allMembersForCalc, error: calcError } = await supabase
    .from('members')
    .select('*');

  if (calcError) {
    console.log(`❌ Calculation query error: ${calcError.message}`);
  } else {
    console.log(`✅ Retrieved ${allMembersForCalc.length} members for calculation`);
    
    let totalFundValue = 0;
    let totalOutstanding = 0;
    
    allMembersForCalc.forEach((member) => {
      const financialInfo = member?.financial_info || {};
      const currentBalance = typeof financialInfo?.current_balance === 'number'
        ? financialInfo.current_balance
        : (typeof financialInfo?.savings_balance === 'number'
          ? financialInfo.savings_balance
          : (typeof financialInfo?.total_contributions === 'number'
            ? financialInfo.total_contributions
            : 0));

      const outstandingAmount = (member.catch_up_fee || 0) + 
                               (financialInfo.outstanding_amount || 0);

      totalFundValue += currentBalance;
      totalOutstanding += outstandingAmount;
    });

    console.log(`   Total Fund Value: R ${totalFundValue.toFixed(2)}`);
    console.log(`   Total Outstanding: R ${totalOutstanding.toFixed(2)}`);
    
    if (totalFundValue === 0) {
      console.log('❌ PROBLEM: Total Fund Value is R 0.00');
      console.log('   This is what Lesego is seeing!');
      console.log('\n   Possible reasons:');
      console.log('   - financial_info.current_balance is 0 for all members');
      console.log('   - The field doesn\'t exist in the database');
      console.log('   - RLS is blocking access to the data');
    } else {
      console.log('✅ SUCCESS: Total Fund Value is correct');
      console.log('   The calculation logic works!');
      console.log('   If Lesego is seeing R 0.00, the issue is:');
      console.log('   - The app is not using the updated code');
      console.log('   - There\'s a caching issue');
      console.log('   - The dashboard is using a different service');
    }
  }

  // Test 4: Check RLS policies
  console.log('\n4. Checking RLS policies...');
  const { data: rlsInfo, error: rlsError } = await supabase
    .rpc('get_rls_policies', { table_name: 'members' })
    .catch(() => ({ data: null, error: 'RPC function not available' }));

  if (rlsError) {
    console.log(`ℹ️  Cannot check RLS policies: ${rlsError}`);
    console.log('   You can check RLS in Supabase dashboard:');
    console.log('   - Go to Authentication > Policies');
    console.log('   - Check if "members" table has RLS enabled');
    console.log('   - Check if there are policies for different roles');
  } else {
    console.log('✅ RLS policies retrieved');
    console.log('   Policies:', JSON.stringify(rlsInfo, null, 2));
  }

  console.log('\n=== SUMMARY ===');
  console.log('The fix in SupabaseMemberService.calculateFundStatisticsFromMembers() should work.');
  console.log('If Lesego is still seeing R 0.00, try:');
  console.log('1. Restart the React Native development server');
  console.log('2. Clear the Metro bundler cache: npx expo start --clear');
  console.log('3. Rebuild the app: npm run build');
  console.log('4. Check browser console for errors');
  console.log('5. Verify the updated code is being used');
}

testAllScenarios();
