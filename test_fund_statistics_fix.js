// Test script to verify the fund statistics fix
const { SupabaseMemberService } = require('./src/services/supabaseMemberService');

async function testFundStatisticsFix() {
  console.log('Testing updated getFundStatistics() method...\n');
  
  try {
    const stats = await SupabaseMemberService.getFundStatistics();
    
    console.log('Fund Statistics Results:');
    console.log('=======================');
    console.log(`Total Members: ${stats.totalMembers}`);
    console.log(`Total Fund Value: R ${stats.totalFundValue.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`);
    console.log(`Total Loans Outstanding: R ${stats.totalLoansOutstanding.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`);
    console.log('\nMembers by Standing:');
    console.log(`  Good: ${stats.membersByStanding.good}`);
    console.log(`  Owing 10%: ${stats.membersByStanding.owing_10}`);
    console.log(`  Owing 20%: ${stats.membersByStanding.owing_20}`);
    console.log(`  Owing 30%: ${stats.membersByStanding.owing_30}`);
    console.log(`  Owing 50%: ${stats.membersByStanding.owing_50}`);
    console.log(`  Owing 65%: ${stats.membersByStanding.owing_65}`);
    console.log(`  Owing 65%+: ${stats.membersByStanding.owing_65_plus}`);
    
    // Check if we're getting a non-zero value
    if (stats.totalFundValue > 0) {
      console.log('\n✅ SUCCESS: Fund statistics now returns non-zero value!');
      console.log(`   The dashboard should now show R ${stats.totalFundValue.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`);
    } else {
      console.log('\n⚠️ WARNING: Fund statistics still returns zero');
      console.log('   This might mean the members table financial_info fields are also empty');
    }
    
  } catch (error) {
    console.error('❌ ERROR testing fund statistics:', error.message);
  }
}

// Run the test
testFundStatisticsFix();
