// Diagnostic script to check Chris Naude's balance calculation
console.log('=== Chris Naude (M006) Balance Diagnosis ===\n');

// From the document "NewLOGICAL CALCULATION 2026-01-29.docx":
// Christopher Naude (M006) example:
// - Join Date: 2018-05-31
// - Current Date: 2025-06-29  
// - Balance Brought Forward: R23,667.52
// - Actual Contributions: R5,600.00
// - Expected Contribution Total: R19,150.00 (R200 × 72 + R250 × 19)
// - Total Outstanding: R13,550.00 (19,150 - 5,600)
// - Penalty for the year: R25,897.59
// - Closing Balance: R51,965.10

const documentData = {
  memberNumber: 'M006',
  name: 'Christopher Naude',
  joinDate: '2018-05-31',
  currentDate: '2025-06-29',
  balanceBroughtForward: 23667.52,
  actualContributions: 5600.00,
  expectedContributionTotal: 19150.00,
  totalOutstanding: 13550.00,
  penaltyForYear: 25897.59,
  closingBalance: 51965.10
};

console.log('Document Data:');
console.log('---------------');
console.log(`Member: ${documentData.name} (${documentData.memberNumber})`);
console.log(`Join Date: ${documentData.joinDate}`);
console.log(`Current Date: ${documentData.currentDate}`);
console.log(`Balance Brought Forward: R${documentData.balanceBroughtForward.toFixed(2)}`);
console.log(`Actual Contributions: R${documentData.actualContributions.toFixed(2)}`);
console.log(`Expected Contribution Total: R${documentData.expectedContributionTotal.toFixed(2)}`);
console.log(`Total Outstanding: R${documentData.totalOutstanding.toFixed(2)}`);
console.log(`Penalty for the year: R${documentData.penaltyForYear.toFixed(2)}`);
console.log(`Closing Balance: R${documentData.closingBalance.toFixed(2)}`);

// Calculate based on the new methodology
console.log('\nNew Methodology Calculation:');
console.log('---------------------------');

// 1. Calculate months at each rate
function calculateMonthsAtRate(joinDate, currentDate, rateStartDate, rateEndDate) {
  const join = new Date(joinDate);
  const current = new Date(currentDate);
  const start = new Date(rateStartDate);
  const end = new Date(rateEndDate);
  
  // Ensure dates are within range
  const effectiveStart = join > start ? join : start;
  const effectiveEnd = current < end ? current : end;
  
  if (effectiveStart > effectiveEnd) return 0;
  
  // Calculate months difference (inclusive)
  const months = (effectiveEnd.getFullYear() - effectiveStart.getFullYear()) * 12 +
                 (effectiveEnd.getMonth() - effectiveStart.getMonth()) + 1;
  
  return Math.max(0, months);
}

const rate200Start = '2018-06-01';
const rate200End = '2024-06-30';
const rate250Start = '2024-07-01';

const monthsAt200 = calculateMonthsAtRate(
  documentData.joinDate, 
  documentData.currentDate, 
  rate200Start, 
  rate200End
);

const monthsAt250 = calculateMonthsAtRate(
  documentData.joinDate, 
  documentData.currentDate, 
  rate250Start, 
  documentData.currentDate
);

console.log(`Months at R200 rate: ${monthsAt200}`);
console.log(`Months at R250 rate: ${monthsAt250}`);

// 2. Calculate expected contribution total
const calculatedExpectedTotal = (monthsAt200 * 200) + (monthsAt250 * 250);
console.log(`Calculated Expected Total: R${calculatedExpectedTotal.toFixed(2)}`);
console.log(`Document Expected Total: R${documentData.expectedContributionTotal.toFixed(2)}`);
console.log(`Match: ${calculatedExpectedTotal === documentData.expectedContributionTotal ? '✓' : '✗'}`);

// 3. Calculate total outstanding
const calculatedOutstanding = calculatedExpectedTotal - documentData.actualContributions;
console.log(`\nCalculated Outstanding: R${calculatedOutstanding.toFixed(2)}`);
console.log(`Document Outstanding: R${documentData.totalOutstanding.toFixed(2)}`);
console.log(`Match: ${calculatedOutstanding === documentData.totalOutstanding ? '✓' : '✗'}`);

// 4. Calculate penalty (5.5% monthly on balance brought forward + current month)
// The document shows R25,897.59 penalty for the year
// Let's try to understand how this was calculated
console.log('\nPenalty Calculation Analysis:');
console.log('----------------------------');

// Try to reverse engineer the penalty calculation
const monthlyPenaltyRate = 0.055; // 5.5%

// Option 1: Penalty on total outstanding for 12 months?
const penaltyOption1 = calculatedOutstanding * monthlyPenaltyRate * 12;
console.log(`Option 1 (Outstanding × 5.5% × 12): R${penaltyOption1.toFixed(2)}`);

// Option 2: Penalty on (balance brought forward + actual contributions)
const penaltyOption2 = (documentData.balanceBroughtForward + documentData.actualContributions) * monthlyPenaltyRate * 12;
console.log(`Option 2 ((Balance + Contributions) × 5.5% × 12): R${penaltyOption2.toFixed(2)}`);

// Option 3: Document's penalty
console.log(`Document Penalty: R${documentData.penaltyForYear.toFixed(2)}`);

// 5. Calculate closing balance
const calculatedClosingBalance = documentData.balanceBroughtForward + calculatedOutstanding + documentData.penaltyForYear;
console.log(`\nCalculated Closing Balance: R${calculatedClosingBalance.toFixed(2)}`);
console.log(`Document Closing Balance: R${documentData.closingBalance.toFixed(2)}`);
console.log(`Match: ${calculatedClosingBalance === documentData.closingBalance ? '✓' : '✗'}`);

// 6. Check what the Vercel app might be showing
console.log('\n=== Possible Issues ===');
console.log('1. Date calculation might be off by 1 month');
console.log('2. Penalty calculation might use different formula');
console.log('3. Actual contributions in database might differ');
console.log('4. Balance brought forward might be different');
console.log('5. The application might still be using old 7% rate');

// 7. Recommendations
console.log('\n=== Recommendations ===');
console.log('1. Check the actual data in Supabase for M006:');
console.log('   - Run: SELECT * FROM members WHERE member_number = \'M006\';');
console.log('2. Check the penalty rate setting:');
console.log('   - Run: SELECT * FROM system_settings WHERE setting_key = \'penalty_interest_rate\';');
console.log('3. Verify the calculation service is using 5.5%:');
console.log('   - Check src/services/ContributionService.ts');
console.log('   - Check src/services/NewCalculationService.ts');
console.log('4. Test the calculation directly:');
console.log('   - Run the new calculation service with M006 data');

console.log('\n=== Next Steps ===');
console.log('1. Get the actual data from Supabase for M006');
console.log('2. Compare with document values');
console.log('3. Identify where the discrepancy comes from');
console.log('4. Fix the calculation in the service');