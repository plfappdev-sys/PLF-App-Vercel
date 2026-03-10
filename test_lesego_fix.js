const { SupabaseMemberService } = require('./src/services/supabaseMemberService.ts');

async function testLesegoFix() {
  console.log('Testing Lesego Bokaba (M031) fix...\n');
  
  try {
    // Get member data
    const member = await SupabaseMemberService.getMemberByNumber('M031');
    
    if (!member) {
      console.error('❌ Lesego Bokaba not found');
      return;
    }
    
    console.log('=== MEMBER DATA ===');
    console.log(`Member Number: ${member.memberNumber}`);
    console.log(`Name: ${member.personalInfo.fullName}`);
    
    console.log('\n=== FINANCIAL INFO ===');
    console.log(`Current Balance: R ${member.financialInfo.currentBalance.toFixed(2)}`);
    console.log(`Outstanding Amount: R ${member.financialInfo.outstandingAmount.toFixed(2)}`);
    console.log(`Outstanding Contributions: R ${member.financialInfo.outstandingContributions.toFixed(2)}`);
    console.log(`Total Penalties: R ${member.financialInfo.totalPenalties.toFixed(2)}`);
    
    console.log('\n=== CALCULATION CHECK ===');
    const calculatedOutstanding = member.financialInfo.outstandingContributions + member.financialInfo.totalPenalties;
    console.log(`Calculated Outstanding (contributions + penalties): R ${calculatedOutstanding.toFixed(2)}`);
    console.log(`Database Outstanding: R ${member.financialInfo.outstandingAmount.toFixed(2)}`);
    
    if (Math.abs(calculatedOutstanding - member.financialInfo.outstandingAmount) < 0.01) {
      console.log('✅ Outstanding amount calculation is CORRECT');
    } else {
      console.log('❌ Outstanding amount calculation is WRONG');
    }
    
    console.log('\n=== MEMBERSHIP STATUS ===');
    console.log(`Standing Category: ${member.membershipStatus.standingCategory}`);
    console.log(`Is Active: ${member.membershipStatus.isActive}`);
    
    // Check if standing is correct based on net balance
    // Lesego has net_balance = 6220.82 (positive) = owes money
    // Should NOT be 'good' standing
    if (member.financialInfo.currentBalance > 0) {
      console.log('\n=== STANDING VALIDATION ===');
      console.log(`Current Balance is POSITIVE (R ${member.financialInfo.currentBalance.toFixed(2)})`);
      console.log('Member OWES money, should NOT be "good" standing');
      
      if (member.membershipStatus.standingCategory === 'good') {
        console.log('❌ ERROR: Standing is "good" but member owes money!');
      } else {
        console.log(`✅ CORRECT: Standing is "${member.membershipStatus.standingCategory}" (not "good")`);
        
        // Calculate expected standing category
        const outstandingPercentage = member.financialInfo.currentBalance / 16600 * 100;
        console.log(`Outstanding Percentage: ${outstandingPercentage.toFixed(2)}%`);
        
        let expectedCategory = 'good';
        if (outstandingPercentage <= 10) {
          expectedCategory = 'owing_10';
        } else if (outstandingPercentage <= 20) {
          expectedCategory = 'owing_20';
        } else if (outstandingPercentage <= 30) {
          expectedCategory = 'owing_30';
        } else if (outstandingPercentage <= 50) {
          expectedCategory = 'owing_50';
        } else if (outstandingPercentage <= 65) {
          expectedCategory = 'owing_65';
        } else {
          expectedCategory = 'owing_65_plus';
        }
        
        console.log(`Expected Category: ${expectedCategory}`);
        console.log(`Actual Category: ${member.membershipStatus.standingCategory}`);
        
        if (member.membershipStatus.standingCategory === expectedCategory) {
          console.log('✅ Standing category is CORRECT');
        } else {
          console.log('❌ Standing category is WRONG');
        }
      }
    } else if (member.financialInfo.currentBalance < 0) {
      console.log('\n=== STANDING VALIDATION ===');
      console.log(`Current Balance is NEGATIVE (R ${member.financialInfo.currentBalance.toFixed(2)})`);
      console.log('Member has CREDIT, should be "good" standing');
      
      if (member.membershipStatus.standingCategory === 'good') {
        console.log('✅ CORRECT: Standing is "good" (member has credit)');
      } else {
        console.log(`❌ ERROR: Standing is "${member.membershipStatus.standingCategory}" but should be "good"`);
      }
    } else {
      console.log('\n=== STANDING VALIDATION ===');
      console.log('Current Balance is ZERO');
      console.log('Member has no balance, should be "good" standing');
      
      if (member.membershipStatus.standingCategory === 'good') {
        console.log('✅ CORRECT: Standing is "good" (zero balance)');
      } else {
        console.log(`❌ ERROR: Standing is "${member.membershipStatus.standingCategory}" but should be "good"`);
      }
    }
    
    console.log('\n=== DATABASE VALUES ===');
    console.log('Expected values from Excel analysis:');
    console.log('- Outstanding Contributions: R 2,400.00');
    console.log('- Total Penalties: R 2,250.82');
    console.log('- Total Outstanding: R 4,650.82');
    console.log('- Current Balance (net_balance): R 6,220.82');
    console.log('- Standing: NOT "good" (member owes money)');
    
  } catch (error) {
    console.error('Error testing Lesego fix:', error);
  }
}

// Run the test
testLesegoFix().then(() => {
  console.log('\n=== TEST COMPLETE ===');
}).catch(error => {
  console.error('Test failed:', error);
});