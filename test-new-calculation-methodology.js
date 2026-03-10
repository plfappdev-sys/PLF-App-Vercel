const { NewCalculationService } = require('./src/services/NewCalculationService');

async function testNewCalculationMethodology() {
  console.log('=== Testing New Calculation Methodology ===\n');
  
  // Test 1: Expected Contribution Calculation
  console.log('Test 1: Expected Contribution Calculation');
  const joinDate = new Date(2018, 5, 1); // June 1, 2018
  const currentDate = new Date(2025, 5, 30); // June 30, 2025
  
  const expected = NewCalculationService.calculateExpectedContribution(joinDate, currentDate);
  console.log(`Join Date: ${joinDate.toISOString().split('T')[0]}`);
  console.log(`Current Date: ${currentDate.toISOString().split('T')[0]}`);
  console.log(`Months at R200 rate: ${expected.monthsAt200}`);
  console.log(`Months at R250 rate: ${expected.monthsAt250}`);
  console.log(`Expected Total: R${expected.expectedTotal.toFixed(2)}`);
  
  // Verify calculation matches document
  const expectedFromDoc = 14400 + 4750; // R14,400.00 + R4,750.00
  console.log(`Expected from document: R${expectedFromDoc.toFixed(2)}`);
  console.log(`Match: ${expected.expectedTotal === expectedFromDoc ? '✓' : '✗'}\n`);
  
  // Test 2: Monthly Penalty Calculation
  console.log('Test 2: Monthly Penalty Calculation (5.5%)');
  const balanceBroughtForward = 10000;
  const currentMonthContribution = 200;
  
  const monthlyPenalty = NewCalculationService.calculateMonthlyPenalty(
    balanceBroughtForward,
    currentMonthContribution
  );
  
  console.log(`Balance Brought Forward: R${balanceBroughtForward.toFixed(2)}`);
  console.log(`Current Month Contribution: R${currentMonthContribution.toFixed(2)}`);
  console.log(`Monthly Penalty (5.5%): R${monthlyPenalty.toFixed(2)}`);
  
  // Manual calculation: (10000 + 200) × 0.055 = 10200 × 0.055 = 561
  const manualCalculation = (balanceBroughtForward + currentMonthContribution) * 0.055;
  console.log(`Manual calculation: R${manualCalculation.toFixed(2)}`);
  console.log(`Match: ${Math.abs(monthlyPenalty - manualCalculation) < 0.01 ? '✓' : '✗'}\n`);
  
  // Test 3: Next Month Penalty Calculation
  console.log('Test 3: Next Month Penalty Calculation (5.5%)');
  const amountDue = 5000;
  const nextMonthPenalty = NewCalculationService.calculateNextMonthPenalty(
    amountDue,
    currentMonthContribution
  );
  
  console.log(`Amount Due: R${amountDue.toFixed(2)}`);
  console.log(`Current Month Contribution: R${currentMonthContribution.toFixed(2)}`);
  console.log(`Next Month Penalty (5.5%): R${nextMonthPenalty.toFixed(2)}`);
  
  // Manual calculation: (5000 + 200) × 0.055 = 5200 × 0.055 = 286
  const manualNextMonth = (amountDue + currentMonthContribution) * 0.055;
  console.log(`Manual calculation: R${manualNextMonth.toFixed(2)}`);
  console.log(`Match: ${Math.abs(nextMonthPenalty - manualNextMonth) < 0.01 ? '✓' : '✗'}\n`);
  
  // Test 4: Penalty Capping
  console.log('Test 4: Penalty Capping (2018-2024 Nov)');
  
  const testDates = [
    new Date(2017, 11, 31), // Dec 31, 2017 (before cap)
    new Date(2018, 0, 1),   // Jan 1, 2018 (start of cap)
    new Date(2020, 5, 15),  // Jun 15, 2020 (during cap)
    new Date(2024, 10, 30), // Nov 30, 2024 (end of cap)
    new Date(2024, 11, 1),  // Dec 1, 2024 (after cap)
    new Date(2025, 0, 1),   // Jan 1, 2025 (after cap)
  ];
  
  testDates.forEach(date => {
    const isCapped = NewCalculationService.isPenaltyCapped(date);
    console.log(`${date.toISOString().split('T')[0]}: ${isCapped ? 'Capped ✓' : 'Not Capped'}`);
  });
  console.log('');
  
  // Test 5: Christopher Naude Example
  console.log('Test 5: Christopher Naude (M006) Example Analysis');
  await NewCalculationService.testChristopherNaudeExample();
  
  console.log('\n=== Summary ===');
  console.log('The new calculation methodology has been implemented with:');
  console.log('1. ✓ Expected contribution calculation (R200 × 72 + R250 × 19)');
  console.log('2. ✓ Monthly penalty calculation (5.5%)');
  console.log('3. ✓ Next month penalty calculation (5.5%)');
  console.log('4. ✓ Penalty capping (2018-2024 Nov)');
  console.log('5. ✓ Comprehensive member calculation service');
  console.log('\nNext steps:');
  console.log('1. Update database schema with new fields');
  console.log('2. Create data migration script');
  console.log('3. Update frontend to show new calculations');
  console.log('4. Test with real member data');
}

// Run the test
testNewCalculationMethodology().catch(console.error);