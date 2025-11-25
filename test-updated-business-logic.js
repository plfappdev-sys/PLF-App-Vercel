const { UpdatedContributionService } = require('./src/services/UpdatedContributionService');
const { InterestCalculationService } = require('./src/services/InterestCalculationService');
const { PLF_INTEREST_RATES } = require('./src/services/InterestConstants');

// Test the updated business logic with Christopher Naude (M006) example
async function testUpdatedBusinessLogic() {
  console.log('🧪 Testing Updated PLF Business Logic');
  console.log('=====================================\n');

  // Test 1: Contribution Periods
  console.log('1. Contribution Periods:');
  const periods = UpdatedContributionService.getContributionPeriods();
  periods.forEach((period, index) => {
    console.log(`   Period ${index + 1}: ${period.startDate.toISOString().split('T')[0]} to ${period.endDate.toISOString().split('T')[0]}`);
    console.log(`   Rate: R${period.monthlyRate}/month, Months: ${period.months}, Total: R${period.totalExpected.toLocaleString()}`);
  });

  const totalExpected = UpdatedContributionService.calculateTotalExpected();
  console.log(`   Total Expected Contribution: R${totalExpected.toLocaleString()}`);
  console.log();

  // Test 2: Christopher Naude (M006) Example
  console.log('2. Christopher Naude (M006) Analysis:');
  const memberNumber = 'M006';
  const actualContributions = 5600; // R5,600.00
  const balanceBroughtForward = 23667.52; // R23,667.52
  const monthsOverdue = 12; // Assuming 12 months overdue

  const summary = UpdatedContributionService.generateMemberContributionSummary(
    memberNumber,
    actualContributions,
    balanceBroughtForward,
    monthsOverdue
  );

  console.log(`   Member: ${summary.memberNumber}`);
  console.log(`   Total Expected: R${summary.totalExpected.toLocaleString()}`);
  console.log(`   Actual Contributions: R${summary.totalActual.toLocaleString()}`);
  console.log(`   Outstanding: R${summary.outstanding.toLocaleString()}`);
  console.log(`   Penalties: R${summary.penalties.toLocaleString()}`);
  console.log(`   Balance Brought Forward: R${summary.balanceBroughtForward.toLocaleString()}`);
  console.log(`   Current Balance: R${summary.currentBalance.toLocaleString()}`);
  console.log();

  // Test 3: Penalty Calculations
  console.log('3. Penalty Calculations (5.5% monthly):');
  
  // Test first month penalty
  const firstMonthPenalty = UpdatedContributionService.calculatePenalties(
    balanceBroughtForward,
    summary.outstanding,
    1
  );
  console.log(`   First Month Penalty: R${firstMonthPenalty.toLocaleString()}`);

  // Test next month penalty
  const nextMonthPenalty = UpdatedContributionService.calculateNextMonthPenalty(
    summary.outstanding,
    summary.outstanding
  );
  console.log(`   Next Month Penalty: R${nextMonthPenalty.toLocaleString()}`);

  // Test compound penalty for 12 months
  const compoundPenalty = UpdatedContributionService.calculatePenalties(
    balanceBroughtForward,
    summary.outstanding,
    12
  );
  console.log(`   12-Month Compound Penalty: R${compoundPenalty.toLocaleString()}`);
  console.log();

  // Test 4: Member Standing
  console.log('4. Member Standing:');
  const standing = UpdatedContributionService.calculateMemberStanding(
    summary.currentBalance,
    summary.outstanding
  );
  console.log(`   Standing: ${standing}`);
  console.log();

  // Test 5: Savings Interest (5.5% annual)
  console.log('5. Savings Interest (5.5% annual):');
  const savingsInterest = UpdatedContributionService.calculateSavingsInterest(
    Math.max(0, summary.currentBalance),
    365
  );
  console.log(`   Annual Interest on Positive Balance: R${savingsInterest.toLocaleString()}`);
  console.log();

  // Test 6: Complete Report
  console.log('6. Complete Contribution Report:');
  const report = UpdatedContributionService.generateContributionReport(
    memberNumber,
    actualContributions,
    balanceBroughtForward,
    monthsOverdue
  );
  
  console.log(`   Net Balance: R${report.netBalance.toLocaleString()}`);
  console.log(`   Joining Fee: R${report.joiningFee.toLocaleString()}`);
  console.log(`   Report Date: ${report.reportDate.toISOString().split('T')[0]}`);
  console.log(`   Final Standing: ${report.standing}`);
  console.log();

  // Test 7: Interest Calculation Service Updates
  console.log('7. Interest Calculation Service Tests:');
  
  // Test late penalty calculation
  const latePenalty = InterestCalculationService.calculateLatePenalty(
    balanceBroughtForward,
    summary.outstanding
  );
  console.log(`   Late Penalty: R${latePenalty.toLocaleString()}`);

  // Test next month penalty
  const nextMonthPenalty2 = InterestCalculationService.calculateNextMonthPenalty(
    summary.outstanding,
    summary.outstanding
  );
  console.log(`   Next Month Penalty: R${nextMonthPenalty2.toLocaleString()}`);

  // Test monthly penalty
  const monthlyPenalty = InterestCalculationService.calculateMonthlyPenalty(
    summary.outstanding,
    12
  );
  console.log(`   12-Month Penalty: R${monthlyPenalty.toLocaleString()}`);
  console.log();

  // Test 8: Constants Verification
  console.log('8. Interest Constants:');
  console.log(`   Savings Interest Rate: ${(PLF_INTEREST_RATES.SAVINGS_INTEREST_RATE * 100).toFixed(1)}% p.a.`);
  console.log(`   Late Penalty Rate: ${(PLF_INTEREST_RATES.LATE_PENALTY_RATE * 100).toFixed(1)}% monthly`);
  console.log(`   Contribution Rate 2018-2024: R${PLF_INTEREST_RATES.CONTRIBUTION_RATE_2018_2024}/month`);
  console.log(`   Contribution Rate 2024-2025: R${PLF_INTEREST_RATES.CONTRIBUTION_RATE_2024_2025}/month`);
  console.log(`   Joining Fee: R${PLF_INTEREST_RATES.JOINING_FEE}`);

  console.log('\n✅ Updated business logic implementation complete!');
  console.log('📊 The system now uses:');
  console.log('   - R200 × 72 months + R250 × 12 months = R17,400 total expected');
  console.log('   - 5.5% monthly penalty on outstanding amounts');
  console.log('   - 5.5% annual interest on positive balances');
  console.log('   - Proper balance brought forward calculations');
}

// Run the test
testUpdatedBusinessLogic().catch(console.error);
