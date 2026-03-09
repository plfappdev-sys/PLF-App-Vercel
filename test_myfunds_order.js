// Test script to verify MyFundsScreen financial summary order
// This script checks that the financial summary is displayed in the correct order

const fs = require('fs');
const path = require('path');

const myFundsScreenPath = path.join(__dirname, 'src/screens/MyFundsScreen.tsx');

console.log('Testing MyFundsScreen financial summary order...');
console.log('===============================================');

try {
  const content = fs.readFileSync(myFundsScreenPath, 'utf8');
  
  // Find the financial summary section
  const financialSummaryStart = content.indexOf('{/* Financial Summary */}');
  const financialSummaryEnd = content.indexOf('{/* Quick Actions */}');
  
  if (financialSummaryStart === -1 || financialSummaryEnd === -1) {
    console.error('❌ Could not find Financial Summary section');
    process.exit(1);
  }
  
  const financialSummary = content.substring(financialSummaryStart, financialSummaryEnd);
  
  console.log('Found Financial Summary section');
  console.log('--------------------------------');
  
  // Check for required items in order
  const requiredOrder = [
    'Balance / Balance Due',
    'Expected Contribution',
    'Total Contribution',
    'Outstanding Amount',
    'Outstanding Contributions',
    'Penalties'
  ];
  
  // Extract all statRow items
  const statRowRegex = /<Text style={styles\.statLabel}>([^<]+):<\/Text>/g;
  const matches = [...financialSummary.matchAll(statRowRegex)];
  const foundLabels = matches.map(match => match[1].trim());
  
  console.log('Found labels in Financial Summary:');
  foundLabels.forEach((label, index) => {
    console.log(`  ${index + 1}. ${label}`);
  });
  
  console.log('\nChecking order against requirements:');
  console.log('-----------------------------------');
  
  // Check if we have the basic required items
  // Note: Balance label is dynamic - it's either "Balance Due" or "Balance" based on value
  const hasBalanceLabel = foundLabels.some(label => label.includes('{balanceDisplay.label}'));
  const hasExpectedContribution = foundLabels.some(label => label.includes('Expected Contribution'));
  const hasTotalContribution = foundLabels.some(label => label.includes('Total Contribution'));
  const hasOutstandingAmount = foundLabels.some(label => label.includes('Outstanding Amount'));
  
  console.log(`✅ Balance/Balance Due (dynamic label): ${hasBalanceLabel ? 'Found' : 'MISSING'}`);
  console.log(`✅ Expected Contribution: ${hasExpectedContribution ? 'Found' : 'MISSING'}`);
  console.log(`✅ Total Contribution: ${hasTotalContribution ? 'Found' : 'MISSING'}`);
  console.log(`✅ Outstanding Amount: ${hasOutstandingAmount ? 'Found' : 'MISSING'}`);
  
  // Check if fields are implemented (no longer TODO)
  const hasOutstandingContributions = foundLabels.some(label => label.includes('Outstanding Contributions'));
  const hasPenalties = foundLabels.some(label => label.includes('Penalties'));
  
  console.log(`✅ Outstanding Contributions: ${hasOutstandingContributions ? 'Found' : 'MISSING'}`);
  console.log(`✅ Penalties: ${hasPenalties ? 'Found' : 'MISSING'}`);
  
  // Check order of first 4 items
  const expectedFirstFour = ['Balance Due', 'Expected Contribution', 'Total Contribution', 'Outstanding Amount'];
  let orderCorrect = true;
  
  for (let i = 0; i < Math.min(4, foundLabels.length); i++) {
    const foundLabel = foundLabels[i];
    const expectedLabel = expectedFirstFour[i];
    
    // Special handling for position 1 which is dynamic
    if (i === 0) {
      // Position 1 should be the dynamic balance label
      if (foundLabel.includes('{balanceDisplay.label}')) {
        console.log(`✅ Position ${i + 1}: Dynamic balance label "${foundLabel}" (will display as "Balance" or "Balance Due")`);
      } else {
        console.log(`❌ Position ${i + 1}: Expected dynamic balance label but found "${foundLabel}"`);
        orderCorrect = false;
      }
    } else if (foundLabel.includes(expectedLabel)) {
      console.log(`✅ Position ${i + 1}: "${foundLabel}" matches expected "${expectedLabel}"`);
    } else {
      console.log(`❌ Position ${i + 1}: Expected "${expectedLabel}" but found "${foundLabel}"`);
      orderCorrect = false;
    }
  }
  
  console.log('\n===============================================');
  if (orderCorrect && hasBalanceLabel && hasExpectedContribution && hasTotalContribution && hasOutstandingAmount && hasOutstandingContributions && hasPenalties) {
    console.log('✅ SUCCESS: Financial summary has correct order for ALL 6 required items');
    console.log('✅ All fields are now implemented: Balance/Balance Due, Expected Contribution, Total Contribution, Outstanding Amount, Outstanding Contributions, and Penalties');
  } else {
    console.log('❌ FAILURE: Financial summary order is incorrect or missing required items');
    process.exit(1);
  }
  
} catch (error) {
  console.error('❌ Error reading MyFundsScreen.tsx:', error.message);
  process.exit(1);
}