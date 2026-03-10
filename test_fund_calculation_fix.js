// Test script to verify fund calculation fix
const { SupabaseMemberService } = require('./src/services/supabaseMemberService.ts');

async function testFundCalculation() {
  console.log("🔍 Testing fund calculation after fix...");
  console.log("="*60);
  
  try {
    // Get fund statistics
    const fundStats = await SupabaseMemberService.getFundStatistics();
    
    console.log("📊 Fund Statistics:");
    console.log(`  Total Members: ${fundStats.totalMembers}`);
    console.log(`  Total Fund Value: R${fundStats.totalFundValue.toLocaleString('en-ZA', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`);
    console.log(`  Total Loans Outstanding: R${fundStats.totalLoansOutstanding.toLocaleString('en-ZA', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`);
    
    console.log("\n📈 Members by Standing:");
    console.log(`  Good Standing: ${fundStats.membersByStanding.good}`);
    console.log(`  Owing ≤10%: ${fundStats.membersByStanding.owing_10}`);
    console.log(`  Owing ≤20%: ${fundStats.membersByStanding.owing_20}`);
    console.log(`  Owing ≤30%: ${fundStats.membersByStanding.owing_30}`);
    console.log(`  Owing ≤50%: ${fundStats.membersByStanding.owing_50}`);
    console.log(`  Owing ≤65%: ${fundStats.membersByStanding.owing_65}`);
    console.log(`  Owing >65%: ${fundStats.membersByStanding.owing_65_plus}`);
    
    // Verify the calculation
    console.log("\n✅ VERIFICATION:");
    console.log(`  Expected net value: R898,730.94`);
    console.log(`  Actual value: R${fundStats.totalFundValue.toFixed(2)}`);
    
    if (Math.abs(fundStats.totalFundValue - 898730.94) < 0.01) {
      console.log("  ✅ PASS: Fund value matches expected net value!");
    } else {
      console.log("  ❌ FAIL: Fund value does not match expected net value");
      console.log(`  Difference: R${(fundStats.totalFundValue - 898730.94).toFixed(2)}`);
    }
    
    // Check if we're showing savings only or net value
    console.log("\n🔍 CALCULATION TYPE CHECK:");
    console.log("  If showing savings only: R924,648.98");
    console.log("  If showing net value: R898,730.94");
    console.log(`  Current calculation: R${fundStats.totalFundValue.toFixed(2)}`);
    
    if (fundStats.totalFundValue > 920000) {
      console.log("  ⚠️ WARNING: Still showing savings only (bug not fixed)");
    } else if (fundStats.totalFundValue > 898000 && fundStats.totalFundValue < 899000) {
      console.log("  ✅ CORRECT: Showing net value (bug fixed!)");
    }
    
  } catch (error) {
    console.error("❌ Error testing fund calculation:", error);
  }
}

// Run the test
testFundCalculation().then(() => {
  console.log("\n" + "="*60);
  console.log("🚀 TEST COMPLETE");
  console.log("="*60);
  console.log("If the test shows R898,730.94, the fix is working correctly!");
  console.log("Refresh the dashboard to see the correct fund value.");
});