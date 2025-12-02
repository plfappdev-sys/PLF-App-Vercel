// Simple test to check if the database has data and our calculation logic would work
const { createClient } = require('@supabase/supabase-js');

async function testFundStatistics() {
  console.log('Testing fund statistics calculation directly...\n');

  const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    // Test 1: Get all members to calculate total fund value
    console.log('1. Testing total fund value calculation...');
    const { data: members, error: membersError } = await supabase
      .from('members')
      .select('*');

    if (membersError) {
      console.log(`❌ Error fetching members: ${membersError.message}`);
      return;
    }

    console.log(`✅ Found ${members.length} members in database`);

    let totalFundValue = 0;
    let totalOutstanding = 0;
    const membersByStanding = {
      good: 0,
      owing_10: 0,
      owing_20: 0,
      owing_30: 0,
      owing_50: 0,
      owing_65: 0,
      owing_65_plus: 0
    };

    // Calculate statistics from members table
    members.forEach((member) => {
      // Calculate current balance from various fields
      const financialInfo = member?.financial_info || {};
      const currentBalance = typeof financialInfo?.current_balance === 'number'
        ? financialInfo.current_balance
        : (typeof financialInfo?.savings_balance === 'number'
          ? financialInfo.savings_balance
          : (typeof financialInfo?.total_contributions === 'number'
            ? financialInfo.total_contributions
            : 0));

      // Calculate outstanding amount - only use catch_up_fee since unpaid_contributions and penalties columns don't exist
      // Also check financial_info.outstanding_amount as fallback
      const outstandingAmount = (member.catch_up_fee || 0) + 
                               (financialInfo.outstanding_amount || 0);

      totalFundValue += currentBalance;
      totalOutstanding += outstandingAmount;

      // Categorize members based on outstanding percentage
      const expectedContributions = 16600; // 83 months * R200
      const outstandingPercentage = outstandingAmount > 0 ? (outstandingAmount / expectedContributions * 100) : 0;

      if (outstandingPercentage === 0) {
        membersByStanding.good++;
      } else if (outstandingPercentage <= 10) {
        membersByStanding.owing_10++;
      } else if (outstandingPercentage <= 20) {
        membersByStanding.owing_20++;
      } else if (outstandingPercentage <= 30) {
        membersByStanding.owing_30++;
      } else if (outstandingPercentage <= 50) {
        membersByStanding.owing_50++;
      } else if (outstandingPercentage <= 65) {
        membersByStanding.owing_65++;
      } else {
        membersByStanding.owing_65_plus++;
      }
    });

    console.log('\nFund Statistics Results:');
    console.log('=======================');
    console.log(`Total Members: ${members.length}`);
    console.log(`Total Fund Value: R ${totalFundValue.toFixed(2)}`);
    console.log(`Total Loans Outstanding: R ${totalOutstanding.toFixed(2)}`);
    
    console.log('\nMembers by Standing:');
    console.log(`  Good: ${membersByStanding.good}`);
    console.log(`  Owing 10%: ${membersByStanding.owing_10}`);
    console.log(`  Owing 20%: ${membersByStanding.owing_20}`);
    console.log(`  Owing 30%: ${membersByStanding.owing_30}`);
    console.log(`  Owing 50%: ${membersByStanding.owing_50}`);
    console.log(`  Owing 65%: ${membersByStanding.owing_65}`);
    console.log(`  Owing 65%+: ${membersByStanding.owing_65_plus}`);
    
    console.log('\nAnalysis:');
    if (totalFundValue === 0) {
      console.log('❌ PROBLEM: Total Fund Value is R 0.00');
      console.log('   This means the financial_info.current_balance field is 0 for all members');
      console.log('   OR the field doesn\'t exist in the database');
    } else {
      console.log(`✅ SUCCESS: Total Fund Value is R ${totalFundValue.toFixed(2)}`);
      console.log('   This should show correctly on the dashboard');
      console.log('   The calculation logic is working!');
    }

    // Test 2: Check if member_balances table exists and has data
    console.log('\n2. Checking member_balances table...');
    const { data: balances, error: balancesError } = await supabase
      .from('member_balances')
      .select('*');

    if (balancesError) {
      console.log(`❌ Error fetching member_balances: ${balancesError.message}`);
      console.log('   This table might not exist or have RLS issues');
    } else {
      console.log(`✅ Found ${balances.length} records in member_balances table`);
      if (balances.length === 0) {
        console.log('   This is why getFundStatistics() falls back to calculateFundStatisticsFromMembers()');
      }
    }

    // Test 3: Check a few sample members to see their data
    console.log('\n3. Checking sample member data...');
    if (members.length > 0) {
      const sampleMember = members[0];
      console.log(`Sample member (${sampleMember.member_number}):`);
      console.log(`  Name: ${sampleMember.name || 'Not available'}`);
      console.log(`  Catch-up fee: R ${sampleMember.catch_up_fee || 0}`);
      console.log(`  Financial info: ${JSON.stringify(sampleMember.financial_info || {}, null, 2)}`);
      
      // Check if unpaid_contributions and penalties columns exist
      console.log(`  Has unpaid_contributions column: ${'unpaid_contributions' in sampleMember}`);
      console.log(`  Has penalties column: ${'penalties' in sampleMember}`);
    }

  } catch (error) {
    console.error('❌ Exception in test:', error);
    console.error('Stack trace:', error.stack);
  }
}

// Run the test
testFundStatistics();
