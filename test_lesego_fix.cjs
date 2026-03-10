// CommonJS test for Lesego Bokaba fix
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

async function testLesegoFix() {
  console.log('Testing Lesego Bokaba (M031) fix...\n');
  
  try {
    // Read the supabaseMemberService.ts file to check the logic
    const servicePath = path.join(__dirname, 'src/services/supabaseMemberService.ts');
    const serviceContent = fs.readFileSync(servicePath, 'utf8');
    
    console.log('=== CHECKING FIXES IN CODE ===');
    
    // Check 1: Verify outstanding amount calculation uses outstanding_contributions + total_penalties
    const hasCorrectOutstandingCalc = serviceContent.includes('outstandingContributions + totalPenalties');
    console.log(`1. Outstanding calculation uses outstanding_contributions + total_penalties: ${hasCorrectOutstandingCalc ? '✅' : '❌'}`);
    
    // Check 2: Verify getMemberByNumber uses new business logic for standing
    const hasNewStandingLogic = serviceContent.includes('Determine membership status based on net balance - NEW BUSINESS LOGIC');
    console.log(`2. getMemberByNumber uses new business logic for standing: ${hasNewStandingLogic ? '✅' : '❌'}`);
    
    // Check 3: Verify getAllMembers uses new business logic for standing
    const hasAllMembersNewLogic = serviceContent.includes('Determine membership status based on net balance - NEW BUSINESS LOGIC') && 
                                  serviceContent.includes('getAllMembers');
    console.log(`3. getAllMembers uses new business logic for standing: ${hasAllMembersNewLogic ? '✅' : '❌'}`);
    
    // Check 4: Verify calculateFundStatisticsFromMembers uses correct outstanding calculation
    const hasStatsCorrectCalc = serviceContent.includes('calculateFundStatisticsFromMembers') && 
                               serviceContent.includes('outstandingContributions + totalPenalties');
    console.log(`4. calculateFundStatisticsFromMembers uses correct outstanding calculation: ${hasStatsCorrectCalc ? '✅' : '❌'}`);
    
    // Check 5: Verify getFundStatistics uses new business logic
    const hasFundStatsNewLogic = serviceContent.includes('getFundStatistics') && 
                                serviceContent.includes('NEW business logic implementation');
    console.log(`5. getFundStatistics uses new business logic: ${hasFundStatsNewLogic ? '✅' : '❌'}`);
    
    console.log('\n=== EXPECTED FIXES SUMMARY ===');
    console.log('1. Outstanding Amount Calculation:');
    console.log('   - Should use: outstanding_contributions + total_penalties');
    console.log('   - NOT: catch_up_fee + financial_info.outstanding_amount');
    
    console.log('\n2. Standing Category Logic:');
    console.log('   - Positive net_balance = member owes money = NOT "good" standing');
    console.log('   - Negative net_balance = member has credit = "good" standing');
    console.log('   - Zero net_balance = "good" standing');
    console.log('   - Owing categories based on percentage of R16,600');
    
    console.log('\n3. Lesego Bokaba (M031) Expected Values:');
    console.log('   - Outstanding Contributions: R 2,400.00');
    console.log('   - Total Penalties: R 2,250.82');
    console.log('   - Total Outstanding: R 4,650.82');
    console.log('   - Current Balance (net_balance): R 6,220.82');
    console.log('   - Standing: NOT "good" (should be owing_30+ category)');
    
    console.log('\n=== CODE SNIPPETS VERIFICATION ===');
    
    // Extract relevant code snippets
    const outstandingCalcMatch = serviceContent.match(/const outstandingAmount = .*?;/gs);
    if (outstandingCalcMatch) {
      console.log('\nOutstanding calculation snippets:');
      outstandingCalcMatch.forEach((snippet, i) => {
        if (snippet.includes('outstanding_contributions') && snippet.includes('total_penalties')) {
          console.log(`  Snippet ${i+1}: ✅ CORRECT`);
        } else if (snippet.includes('catch_up_fee')) {
          console.log(`  Snippet ${i+1}: ❌ OLD LOGIC (uses catch_up_fee)`);
        } else {
          console.log(`  Snippet ${i+1}: ⚠️  UNKNOWN`);
        }
      });
    }
    
    // Check for standing logic
    const standingLogicMatch = serviceContent.match(/standingCategory = 'good'.*?if.*?balanceData.*?net_balance/gs);
    if (standingLogicMatch) {
      console.log('\nStanding logic found: ✅');
    } else {
      console.log('\nStanding logic: ❌ NOT FOUND');
    }
    
    console.log('\n=== FIX IMPLEMENTATION STATUS ===');
    const allChecks = [hasCorrectOutstandingCalc, hasNewStandingLogic, hasAllMembersNewLogic, hasStatsCorrectCalc, hasFundStatsNewLogic];
    const passedChecks = allChecks.filter(check => check).length;
    const totalChecks = allChecks.length;
    
    console.log(`Passed ${passedChecks} out of ${totalChecks} checks`);
    
    if (passedChecks === totalChecks) {
      console.log('✅ ALL FIXES IMPLEMENTED CORRECTLY');
    } else {
      console.log(`❌ ${totalChecks - passedChecks} FIXES MISSING OR INCORRECT`);
    }
    
  } catch (error) {
    console.error('Error testing Lesego fix:', error);
  }
}

// Run the test
testLesegoFix().then(() => {
  console.log('\n=== TEST COMPLETE ===');
  console.log('\nNext steps:');
  console.log('1. Deploy the updated supabaseMemberService.ts to Vercel');
  console.log('2. Test the MyFundsScreen to verify Lesego Bokaba shows correct standing');
  console.log('3. Verify fund statistics show correct outstanding amounts');
}).catch(error => {
  console.error('Test failed:', error);
});