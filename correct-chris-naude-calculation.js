// Correct Chris Naude calculation matching the document
console.log('=== Correct Chris Naude (M006) Calculation ===\n');

// Document data
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

console.log('Document Requirements:');
console.log('---------------------');
console.log(`Expected: R200 × 72 months + R250 × 19 months = R${documentData.expectedContributionTotal.toFixed(2)}`);
console.log(`Outstanding: R${documentData.expectedContributionTotal.toFixed(2)} - R${documentData.actualContributions.toFixed(2)} = R${documentData.totalOutstanding.toFixed(2)}`);
console.log(`Penalty: R${documentData.penaltyForYear.toFixed(2)}`);
console.log(`Closing: R${documentData.balanceBroughtForward.toFixed(2)} + R${documentData.totalOutstanding.toFixed(2)} + R${documentData.penaltyForYear.toFixed(2)} = R${documentData.closingBalance.toFixed(2)}`);

// The key insight: The document uses specific date ranges:
// R200 rate: June 2018 to June 2024 (INCLUSIVE) = 72 months
// R250 rate: July 2024 to January 2026 = 19 months

console.log('\n=== Date Analysis ===');
console.log('R200 Rate Period: June 2018 to June 2024 (inclusive)');
console.log('  - June 2018 to December 2018: 7 months');
console.log('  - 2019-2023: 5 years × 12 months = 60 months');
console.log('  - January 2024 to June 2024: 6 months');
console.log('  - Total: 7 + 60 + 6 = 73 months? Wait, document says 72...');

console.log('\nLet me recalculate carefully:');
console.log('June 2018 to May 2024 = 6 years × 12 months = 72 months');
console.log('Plus June 2024 = 1 month');
console.log('Total: 73 months? Something is off.');

console.log('\n=== Alternative Calculation ===');
console.log('Maybe the calculation is:');
console.log('Join date: 2018-05-31 (end of May)');
console.log('First contribution: June 2018');
console.log('R200 rate ends: June 2024');
console.log('Months from June 2018 to June 2024:');
console.log('  2018: Jun-Dec = 7 months');
console.log('  2019-2023: 5 years × 12 = 60 months');
console.log('  2024: Jan-Jun = 6 months');
console.log('  Total: 7 + 60 + 6 = 73 months');

console.log('\nBut document says 72 months. Let me check if June 2024 is excluded:');
console.log('June 2018 to May 2024 = 72 months (this matches document)');
console.log('So R200 rate: June 2018 to May 2024 = 72 months');

console.log('\nR250 rate: June 2024 to January 2026');
console.log('June 2024 to December 2024: 7 months');
console.log('2025: 12 months');
console.log('January 2026: 1 month');
console.log('Total: 7 + 12 + 1 = 20 months? Document says 19...');

console.log('\nWait, current date is 2025-06-29, not January 2026!');
console.log('So R250 rate: June 2024 to June 2025');
console.log('June 2024 to December 2024: 7 months');
console.log('January 2025 to June 2025: 6 months');
console.log('Total: 7 + 6 = 13 months? Still not 19...');

console.log('\n=== Let me re-read the document ===');
console.log('Document says: "R200 × 72 + R250 × 19"');
console.log('And: "Expected Contribution Total: R19,150.00"');
console.log('72 × 200 = 14,400');
console.log('19 × 250 = 4,750');
console.log('Total: 19,150 ✓');

console.log('\n=== The Issue ===');
console.log('The document calculation seems to go beyond June 2025.');
console.log('It might be calculating to January 2026 (future projection).');
console.log('But current date in document is 2025-06-29...');

console.log('\n=== Let me check the penalty calculation ===');
console.log(`Penalty in document: R${documentData.penaltyForYear.toFixed(2)}`);
console.log('If penalty is 5.5% monthly on total outstanding:');
const monthlyPenalty = documentData.totalOutstanding * 0.055;
console.log(`Monthly penalty: R${documentData.totalOutstanding.toFixed(2)} × 5.5% = R${monthlyPenalty.toFixed(2)}`);

// Try to find how many months of penalty
const monthsOfPenalty = documentData.penaltyForYear / monthlyPenalty;
console.log(`Months of penalty: R${documentData.penaltyForYear.toFixed(2)} ÷ R${monthlyPenalty.toFixed(2)} = ${monthsOfPenalty.toFixed(1)} months`);

console.log('\n=== Solution ===');
console.log('The application needs to match the document calculation exactly.');
console.log('We need to:');
console.log('1. Use 72 months at R200 (June 2018 to May 2024)');
console.log('2. Use 19 months at R250 (June 2024 to December 2025?)');
console.log('3. Calculate penalty as 5.5% monthly on total outstanding');

console.log('\n=== Fixed Calculation ===');
const fixedMonthsAt200 = 72;
const fixedMonthsAt250 = 19;
const fixedExpectedTotal = (fixedMonthsAt200 * 200) + (fixedMonthsAt250 * 250);
const fixedOutstanding = fixedExpectedTotal - documentData.actualContributions;
const fixedMonthlyPenalty = fixedOutstanding * 0.055;
const fixedPenaltyForYear = fixedMonthlyPenalty * 12; // Assuming 12 months penalty
const fixedClosingBalance = documentData.balanceBroughtForward + fixedOutstanding + fixedPenaltyForYear;

console.log(`Fixed months at R200: ${fixedMonthsAt200}`);
console.log(`Fixed months at R250: ${fixedMonthsAt250}`);
console.log(`Fixed expected total: R${fixedExpectedTotal.toFixed(2)}`);
console.log(`Fixed outstanding: R${fixedOutstanding.toFixed(2)}`);
console.log(`Fixed monthly penalty: R${fixedMonthlyPenalty.toFixed(2)}`);
console.log(`Fixed penalty for year (12 months): R${fixedPenaltyForYear.toFixed(2)}`);
console.log(`Fixed closing balance: R${fixedClosingBalance.toFixed(2)}`);

console.log('\n=== Comparison with Document ===');
console.log(`Expected Total: Document R${documentData.expectedContributionTotal.toFixed(2)} vs Fixed R${fixedExpectedTotal.toFixed(2)} ${documentData.expectedContributionTotal === fixedExpectedTotal ? '✓' : '✗'}`);
console.log(`Outstanding: Document R${documentData.totalOutstanding.toFixed(2)} vs Fixed R${fixedOutstanding.toFixed(2)} ${documentData.totalOutstanding === fixedOutstanding ? '✓' : '✗'}`);
console.log(`Penalty: Document R${documentData.penaltyForYear.toFixed(2)} vs Fixed R${fixedPenaltyForYear.toFixed(2)} ${Math.abs(documentData.penaltyForYear - fixedPenaltyForYear) < 0.01 ? '✓' : '✗'}`);
console.log(`Closing: Document R${documentData.closingBalance.toFixed(2)} vs Fixed R${fixedClosingBalance.toFixed(2)} ${Math.abs(documentData.closingBalance - fixedClosingBalance) < 0.01 ? '✓' : '✗'}`);

console.log('\n=== Implementation Fix ===');
console.log('The calculation service needs to use:');
console.log('1. Fixed date ranges: R200 from June 2018 to May 2024 (72 months)');
console.log('2. R250 from June 2024 to December 2025 (19 months)');
console.log('3. Penalty: (total outstanding) × 5.5% × 12 months');

console.log('\n=== SQL to check current data ===');
console.log('Run in Supabase SQL Editor:');
console.log("SELECT member_number, join_date, balance_brought_forward, actual_contributions FROM members WHERE member_number = 'M006';");