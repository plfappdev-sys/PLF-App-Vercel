// Test the logic to understand what's happening
console.log('Testing the logic for negative values:\n');

// Test cases
const testCases = [
  { value: -5934.26, description: 'Nicholas Molale balance' },
  { value: -11699.64, description: 'Jeff Matlou balance' },
  { value: 0, description: 'Zero balance' },
  { value: 1000, description: 'Positive balance' },
  { value: undefined, description: 'Undefined' },
  { value: null, description: 'Null' },
  { value: false, description: 'False' },
  { value: '', description: 'Empty string' }
];

testCases.forEach(test => {
  const result = test.value || 0;
  console.log(`${test.description}:`);
  console.log(`  Input: ${test.value} (type: ${typeof test.value})`);
  console.log(`  test.value || 0 = ${result}`);
  console.log(`  Is test.value truthy? ${!!test.value}`);
  console.log('');
});

// Test the actual logic from the code
console.log('\nTesting the actual logic from MembersScreen.tsx:');
const financialInfo = {
  currentBalance: -5934.26,
  outstandingAmount: 5934.26
};

const currentBalance = financialInfo.currentBalance || 0;
console.log(`financialInfo.currentBalance = ${financialInfo.currentBalance}`);
console.log(`financialInfo.currentBalance || 0 = ${currentBalance}`);
console.log(`Should be -5934.26, actual: ${currentBalance}`);

// Test with undefined financialInfo
console.log('\nTesting with undefined financialInfo:');
const member1 = { financialInfo: undefined };
const financialInfo1 = member1.financialInfo ? {
  currentBalance: member1.financialInfo.currentBalance || 0
} : { 
  currentBalance: 0 
};
console.log(`Result: ${financialInfo1.currentBalance}`);

// Test with financialInfo that has negative balance
console.log('\nTesting with financialInfo that has negative balance:');
const member2 = { financialInfo: { currentBalance: -5934.26 } };
const financialInfo2 = member2.financialInfo ? {
  currentBalance: member2.financialInfo.currentBalance || 0
} : { 
  currentBalance: 0 
};
console.log(`Result: ${financialInfo2.currentBalance}`);
console.log(`Should be -5934.26, actual: ${financialInfo2.currentBalance}`);

// The issue might be that financialInfo is an empty object {}
console.log('\nTesting with empty financialInfo object:');
const member3 = { financialInfo: {} };
const financialInfo3 = member3.financialInfo ? {
  currentBalance: member3.financialInfo.currentBalance || 0
} : { 
  currentBalance: 0 
};
console.log(`Result: ${financialInfo3.currentBalance}`);
console.log(`Should be 0, actual: ${financialInfo3.currentBalance}`);

// What if financialInfo.currentBalance is 0 (not undefined)?
console.log('\nTesting with financialInfo.currentBalance = 0:');
const member4 = { financialInfo: { currentBalance: 0 } };
const financialInfo4 = member4.financialInfo ? {
  currentBalance: member4.financialInfo.currentBalance || 0
} : { 
  currentBalance: 0 
};
console.log(`Result: ${financialInfo4.currentBalance}`);
console.log(`Should be 0, actual: ${financialInfo4.currentBalance}`);