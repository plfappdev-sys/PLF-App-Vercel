// Test script to verify Lesego Bokaba (M031) membership status fix
const { SupabaseMemberService } = require('./src/services/supabaseMemberService.ts');

async function testLesegoStatus() {
  console.log('Testing Lesego Bokaba (M031) membership status fix...');
  
  try {
    // Get Lesego's member data
    const member = await SupabaseMemberService.getMemberByNumber('M031');
    
    if (!member) {
      console.error('ERROR: Could not find member M031');
      return;
    }
    
    console.log('\n=== Member Information ===');
    console.log(`Member Number: ${member.memberNumber}`);
    console.log(`Name: ${member.personalInfo.fullName}`);
    
    console.log('\n=== Financial Information ===');
    console.log(`Expected Contribution: R${member.financialInfo.expectedContribution}`);
    console.log(`Total Contributions: R${member.financialInfo.totalContributions}`);
    console.log(`Outstanding Amount: R${member.financialInfo.outstandingAmount}`);
    console.log(`Outstanding Percentage: ${member.financialInfo.percentageOutstanding.toFixed(2)}%`);
    
    console.log('\n=== Membership Status ===');
    console.log(`Status: ${member.membershipStatus.standingCategory}`);
    console.log(`Is Active: ${member.membershipStatus.isActive}`);
    
    // Determine what the status should be
    const outstandingPercentage = member.financialInfo.percentageOutstanding;
    let expectedStatus = 'good';
    
    if (outstandingPercentage === 0) {
      expectedStatus = 'good';
    } else if (outstandingPercentage <= 10) {
      expectedStatus = 'owing_10';
    } else if (outstandingPercentage <= 20) {
      expectedStatus = 'owing_20';
    } else if (outstandingPercentage <= 30) {
      expectedStatus = 'owing_30';
    } else if (outstandingPercentage <= 50) {
      expectedStatus = 'owing_50';
    } else if (outstandingPercentage <= 65) {
      expectedStatus = 'owing_65';
    } else {
      expectedStatus = 'owing_65_plus';
    }
    
    console.log('\n=== Verification ===');
    console.log(`Current Status: ${member.membershipStatus.standingCategory}`);
    console.log(`Expected Status: ${expectedStatus}`);
    
    if (member.membershipStatus.standingCategory === expectedStatus) {
      console.log('✅ STATUS IS CORRECT!');
      console.log(`Lesego Bokaba (M031) now shows "${member.membershipStatus.standingCategory}" instead of "good"`);
    } else {
      console.log('❌ STATUS IS INCORRECT!');
      console.log(`Expected: ${expectedStatus}, Got: ${member.membershipStatus.standingCategory}`);
    }
    
    // Also check if there are outstanding contributions
    if (member.financialInfo.outstandingAmount > 0) {
      console.log(`\n⚠️  Lesego has R${member.financialInfo.outstandingAmount} in outstanding contributions`);
      console.log(`This should NOT show as "good" standing`);
    } else {
      console.log('\n✅ Lesego has no outstanding contributions');
      console.log('"good" standing would be correct in this case');
    }
    
  } catch (error) {
    console.error('Error testing Lesego status:', error);
  }
}

// Run the test
testLesegoStatus();