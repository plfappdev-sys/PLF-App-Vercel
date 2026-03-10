// Test script to see what SupabaseMemberService.getMemberByNumber('M031') returns
// This will help identify if the service layer is correctly extracting database data

const { SupabaseMemberService } = require('../../src/services/supabaseMemberService');

async function testServiceOutput() {
  console.log('=== Testing SupabaseMemberService.getMemberByNumber("M031") ===\n');
  
  try {
    const member = await SupabaseMemberService.getMemberByNumber('M031');
    
    if (!member) {
      console.error('❌ Service returned null or undefined');
      return;
    }
    
    console.log('✅ Service returned member data');
    console.log('Member Number:', member.memberNumber);
    console.log('Name:', member.personalInfo?.fullName || 'N/A');
    
    console.log('\n=== FINANCIAL INFO ===');
    const financialInfo = member.financialInfo || {};
    console.log('1. Current Balance:', financialInfo.currentBalance);
    console.log('2. Expected Contribution:', financialInfo.expectedContribution);
    console.log('3. Total Contributions:', financialInfo.totalContributions);
    console.log('4. Outstanding Amount:', financialInfo.outstandingAmount);
    console.log('5. Outstanding Contributions:', financialInfo.outstandingContributions);
    console.log('6. Total Penalties:', financialInfo.totalPenalties);
    
    console.log('\n=== ADDITIONAL FIELDS (should be removed) ===');
    console.log('7. Planned Contributions:', financialInfo.plannedContributions);
    console.log('8. Total Interest Earned:', financialInfo.totalInterestEarned);
    console.log('9. Total Interest Charged:', financialInfo.totalInterestCharged);
    
    console.log('\n=== MEMBERSHIP STATUS ===');
    console.log('Standing Category:', member.membershipStatus?.standingCategory);
    console.log('Is Active:', member.membershipStatus?.isActive);
    
    console.log('\n=== DATA VALIDATION ===');
    console.log('Expected values from Excel:');
    console.log('1. Current Balance (Balance Due): R 6,220.825');
    console.log('2. Expected Contribution: R 16,600.00');
    console.log('3. Total Contributions: R 5,300.00');
    console.log('4. Outstanding Amount: R 4,650.82 (2,400 + 2,250.82)');
    console.log('5. Outstanding Contributions: R 2,400.00');
    console.log('6. Total Penalties: R 2,250.82');
    
    console.log('\n=== ISSUES FOUND ===');
    const issues = [];
    
    if (financialInfo.currentBalance !== 6220.824749612508 && financialInfo.currentBalance !== 6220.82) {
      issues.push(`Current Balance mismatch: ${financialInfo.currentBalance} (expected ~6220.82)`);
    }
    
    if (financialInfo.expectedContribution !== 16600) {
      issues.push(`Expected Contribution mismatch: ${financialInfo.expectedContribution} (expected 16600)`);
    }
    
    if (financialInfo.totalContributions !== 5300) {
      issues.push(`Total Contributions mismatch: ${financialInfo.totalContributions} (expected 5300)`);
    }
    
    if (Math.abs(financialInfo.outstandingAmount - 4650.82) > 0.01) {
      issues.push(`Outstanding Amount mismatch: ${financialInfo.outstandingAmount} (expected 4650.82)`);
    }
    
    if (financialInfo.outstandingContributions !== 2400) {
      issues.push(`Outstanding Contributions mismatch: ${financialInfo.outstandingContributions} (expected 2400)`);
    }
    
    if (Math.abs(financialInfo.totalPenalties - 2250.82) > 0.01) {
      issues.push(`Total Penalties mismatch: ${financialInfo.totalPenalties} (expected 2250.82)`);
    }
    
    if (member.membershipStatus?.standingCategory === 'good') {
      issues.push(`Standing Category should NOT be "good" (balance is positive = owes money)`);
    }
    
    if (issues.length === 0) {
      console.log('✅ All data matches expected values!');
      console.log('The issue is likely in the UI display (MyFundsScreen.tsx)');
    } else {
      console.log('❌ Issues found:');
      issues.forEach(issue => console.log(`  - ${issue}`));
      console.log('\nThe issue is in the service layer (supabaseMemberService.ts)');
    }
    
    console.log('\n=== RECOMMENDED NEXT STEPS ===');
    if (issues.length > 0) {
      console.log('1. Fix supabaseMemberService.ts to extract correct data');
      console.log('2. Then update MyFundsScreen.tsx to remove unwanted fields');
    } else {
      console.log('1. Update MyFundsScreen.tsx to remove unwanted fields');
      console.log('2. Ensure field order matches requirements (6 fields)');
    }
    
  } catch (error) {
    console.error('Error testing service:', error);
  }
}

// Run the test
testServiceOutput().then(() => {
  console.log('\n=== Test complete ===');
  process.exit(0);
}).catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
});