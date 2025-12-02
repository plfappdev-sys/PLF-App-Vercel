// Test to simulate what happens when the React Native app calls getFundStatistics()
// This will help us debug why Lesego sees R 0.00

const { createClient } = require('@supabase/supabase-js');

// Simulate the getFundStatistics() logic from SupabaseMemberService
async function simulateGetFundStatistics() {
  console.log('Simulating getFundStatistics() call...\n');

  const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  console.log('DEBUG: getFundStatistics() called');
  try {
    // Try to get data from member_balances table first
    console.log('DEBUG: Fetching member_balances table...');
    const { data: balances, error: balancesError } = await supabase
      .from('member_balances')
      .select('*');

    if (balancesError) {
      console.warn('Error fetching member balances for statistics:', balancesError.message);
      console.log('DEBUG: Falling back to getFundStatisticsFallback()');
      return simulateGetFundStatisticsFallback(supabase);
    }

    // Handle case where balances data is null, undefined, or empty array
    if (!balances || !Array.isArray(balances) || balances.length === 0) {
      console.warn('No member balances data found, trying to calculate from members table');
      console.log('DEBUG: member_balances table is empty, calling calculateFundStatisticsFromMembers()');
      // Instead of falling back immediately, try to calculate from members table
      return simulateCalculateFundStatisticsFromMembers(supabase);
    }

    // ... rest of the logic would continue here
    // But we know member_balances is empty, so it should call calculateFundStatisticsFromMembers()
    
  } catch (error) {
    console.error('Exception in getFundStatistics:', error);
    console.error('Stack trace:', error.stack);
    return getDefaultFundStatistics();
  }
}

async function simulateCalculateFundStatisticsFromMembers(supabase) {
  console.log('\nDEBUG: Inside calculateFundStatisticsFromMembers()');
  try {
    // Get all members with their financial info
    const { data: members, error } = await supabase
      .from('members')
      .select('*');

    if (error) {
      console.error('Error fetching members for statistics calculation:', error);
      return getDefaultFundStatistics();
    }

    // Handle case where members data is null or undefined
    if (!members || !Array.isArray(members)) {
      console.warn('No members data found for statistics calculation');
      return getDefaultFundStatistics();
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
      // Use savings_balance if available in financial_info, otherwise use total_contributions
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

    // Return calculated statistics
    const result = {
      totalMembers: members.length,
      totalFundValue: Math.max(0, totalFundValue),
      totalLoansOutstanding: Math.max(0, totalOutstanding),
      totalContributionsThisMonth: 0,
      membersByStanding
    };

    console.log('\n✅ calculateFundStatisticsFromMembers() Result:');
    console.log('=============================================');
    console.log(`Total Members: ${result.totalMembers}`);
    console.log(`Total Fund Value: R ${result.totalFundValue.toFixed(2)}`);
    console.log(`Total Loans Outstanding: R ${result.totalLoansOutstanding.toFixed(2)}`);
    
    console.log('\nMembers by Standing:');
    console.log(`  Good: ${result.membersByStanding.good}`);
    console.log(`  Owing 10%: ${result.membersByStanding.owing_10}`);
    console.log(`  Owing 20%: ${result.membersByStanding.owing_20}`);
    console.log(`  Owing 30%: ${result.membersByStanding.owing_30}`);
    console.log(`  Owing 50%: ${result.membersByStanding.owing_50}`);
    console.log(`  Owing 65%: ${result.membersByStanding.owing_65}`);
    console.log(`  Owing 65%+: ${result.membersByStanding.owing_65_plus}`);

    return result;
  } catch (error) {
    console.error('Exception in calculateFundStatisticsFromMembers:', error);
    console.error('Stack trace:', error.stack);
    return getDefaultFundStatistics();
  }
}

async function simulateGetFundStatisticsFallback(supabase) {
  console.log('\nDEBUG: Inside getFundStatisticsFallback()');
  // This would be called if there's an error fetching member_balances
  // But we know member_balances is empty, not an error, so this shouldn't be called
  return getDefaultFundStatistics();
}

function getDefaultFundStatistics() {
  console.log('\n⚠️  Returning default fund statistics (all zeros)');
  return {
    totalMembers: 0,
    totalFundValue: 0,
    totalLoansOutstanding: 0,
    totalContributionsThisMonth: 0,
    membersByStanding: {
      good: 0,
      owing_10: 0,
      owing_20: 0,
      owing_30: 0,
      owing_50: 0,
      owing_65: 0,
      owing_65_plus: 0
    }
  };
}

// Run the simulation
simulateGetFundStatistics().then(result => {
  console.log('\n\n=== FINAL RESULT ===');
  console.log(`Total Fund Value: R ${result.totalFundValue.toFixed(2)}`);
  
  if (result.totalFundValue === 0) {
    console.log('\n❌ PROBLEM: The method is returning R 0.00');
    console.log('   This is what Lesego is seeing on the dashboard!');
    console.log('\nPossible reasons:');
    console.log('1. The method is hitting an exception and returning default statistics');
    console.log('2. There\'s a TypeScript compilation issue');
    console.log('3. The app is using a different Supabase client (authenticated vs anonymous)');
    console.log('4. RLS policies are blocking access for authenticated users');
  } else {
    console.log('\n✅ SUCCESS: The method should return correct values');
    console.log('   If Lesego is seeing R 0.00, the issue might be:');
    console.log('   - The app is not using the updated code');
    console.log('   - There\'s a caching issue');
    console.log('   - The dashboard is using a different service');
  }
});
