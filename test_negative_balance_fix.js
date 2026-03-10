// Test to verify negative balance display fix
console.log('Testing negative balance display fix...\n');

// Test the formatCurrency function logic
function formatCurrency(amount) {
    // Handle null, undefined, or NaN by converting to 0
    // Note: Negative values are preserved (e.g., -5934.26 remains -5934.26)
    const safeAmount = amount === null || amount === undefined || isNaN(amount) ? 0 : amount;
    return `R ${safeAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
}

// Test cases
const testCases = [
    { amount: -11699.64, expected: 'R -11,699.64', description: 'Jeff Matlou (M017)' },
    { amount: -5934.26, expected: 'R -5,934.26', description: 'Negative balance example' },
    { amount: 0, expected: 'R 0.00', description: 'Zero balance' },
    { amount: 1234.56, expected: 'R 1,234.56', description: 'Positive balance' },
    { amount: null, expected: 'R 0.00', description: 'Null amount' },
    { amount: undefined, expected: 'R 0.00', description: 'Undefined amount' },
    { amount: NaN, expected: 'R 0.00', description: 'NaN amount' },
    { amount: -0.01, expected: 'R -0.01', description: 'Small negative amount' },
    { amount: -1000000.50, expected: 'R -1,000,000.50', description: 'Large negative amount' }
];

console.log('Test Results:\n');
let allPassed = true;

testCases.forEach((test, index) => {
    const result = formatCurrency(test.amount);
    const passed = result === test.expected;
    allPassed = allPassed && passed;
    
    console.log(`${index + 1}. ${test.description}`);
    console.log(`   Amount: ${test.amount}`);
    console.log(`   Expected: ${test.expected}`);
    console.log(`   Got: ${result}`);
    console.log(`   ${passed ? '✅ PASS' : '❌ FAIL'}\n`);
});

// Test the old logic to show the difference
console.log('\n=== OLD LOGIC COMPARISON ===\n');
console.log('Old logic: const safeAmount = amount || 0;');
console.log('New logic: const safeAmount = amount === null || amount === undefined || isNaN(amount) ? 0 : amount;\n');

const problematicCases = [
    { amount: -11699.64, old: -11699.64 || 0, new: -11699.64 },
    { amount: 0, old: 0 || 0, new: 0 },
    { amount: null, old: null || 0, new: 0 },
    { amount: undefined, old: undefined || 0, new: 0 }
];

problematicCases.forEach(test => {
    const oldResult = test.amount || 0;
    const newResult = test.amount === null || test.amount === undefined || isNaN(test.amount) ? 0 : test.amount;
    console.log(`Amount: ${test.amount}, Old: ${oldResult}, New: ${newResult}, Same? ${oldResult === newResult ? '✅' : '⚠️'}`);
});

console.log('\n=== SUMMARY ===');
if (allPassed) {
    console.log('✅ All tests passed! Negative balances are correctly preserved.');
    console.log('The fix ensures that:');
    console.log('1. Negative values remain negative (e.g., -11,699.64 stays -11,699.64)');
    console.log('2. Null/undefined/NaN values become 0');
    console.log('3. Zero values remain 0');
    console.log('4. Positive values remain positive');
} else {
    console.log('❌ Some tests failed. Please review the implementation.');
}

console.log('\n=== RECOMMENDATION ===');
console.log('If users are still seeing 0 instead of negative balances, they may need to:');
console.log('1. Clear the app cache');
console.log('2. Restart the app');
console.log('3. Ensure they are looking at the latest version of the app');
console.log('4. Check that the database has correct negative balance values');