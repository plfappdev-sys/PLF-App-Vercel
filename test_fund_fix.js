// Test script to verify fund statistics fix
const { SupabaseMemberService } = require('./src/services/supabaseMemberService');

async function testFundStatistics() {
  console.log('Testing fund statistics...');
  
  try {
    const stats = await SupabaseMemberService.getFundStatistics();
    
    console.log('Fund Statistics:');
    console.log(`Total Members: ${stats.totalMembers}`);
    console.log(`Total Fund Value: R ${stats.totalFundValue.toFixed(2)}`);
    console.log(`Total Loans Outstanding: R ${stats.totalLoansOutstanding.toFixed(2)}`);
    console.log(`Total Contributions This Month: R ${stats.totalContributionsThisMonth.toFixed(2)}`);
    
    console.log('\nMembers by Standing:');
    console.log(`Good: ${stats.membersByStanding.good}`);
    console.log(`Owing 10%: ${stats.membersByStanding.owing_10}`);
    console.log(`Owing 20%: ${stats.membersByStanding.owing_20}`);
    console.log(`Owing 30%: ${stats.membersByStanding.owing_30}`);
    console.log(`Owing 50%: ${stats.membersByStanding.owing_50}`);
    console.log(`Owing 65%: ${stats.membersByStanding.owing_65}`);
    console.log(`Owing 65%+: ${stats.membersByStanding.owing_65_plus}`);
    
    // Check if total fund value is not zero
    if (stats.totalFundValue === 0) {
      console.warn('\n⚠️ WARNING: Total Fund Value is R 0.00 - this might indicate a data issue');
    } else {
      console.log('\n✅ Total Fund Value is non-zero, which is good!');
    }
    
  } catch (error) {
    console.error('Error testing fund statistics:', error);
  }
}

// Run the test
testFundStatistics();
