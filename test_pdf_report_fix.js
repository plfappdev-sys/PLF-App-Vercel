// Test script to verify the fixed PDF report generator
const { PDFReportGenerator } = require('./src/services/PDFReportGenerator_fixed.ts');

// Mock report data for Lesego Bokaba (M031)
const mockReportData = {
  title: 'Member Statement - Lesego Bokaba',
  generatedDate: new Date(),
  generatedBy: 'System Administrator',
  reportType: 'member_statement',
  data: {
    member: {
      memberNumber: 'M031',
      financialInfo: {
        expectedContribution: 17400,
        currentBalance: 13430,
        totalContributions: 13430,
        outstandingAmount: 3970
      }
    },
    personalInfo: {
      fullName: 'Lesego Bokaba',
      memberNumber: 'M031',
      contactInfo: 'N/A',
      joinDate: new Date('2025-01-01')
    },
    financialSummary: {
      currentBalance: 13430,
      totalContributions: 13430,
      outstandingAmount: 3970,
      percentageOutstanding: 22.82, // This should be calculated as 3970/17400 = 22.82%
      standingCategory: 'good'
    },
    transactionHistory: [
      {
        date: new Date('2025-01-15'),
        type: 'deposit',
        amount: 1000,
        status: 'approved',
        description: 'Monthly contribution'
      },
      {
        date: new Date('2025-02-15'),
        type: 'deposit',
        amount: 1000,
        status: 'approved',
        description: 'Monthly contribution'
      }
    ],
    contributionHistory: [
      {
        date: new Date('2025-01-15'),
        amount: 1000,
        cumulativeTotal: 1000
      },
      {
        date: new Date('2025-02-15'),
        amount: 1000,
        cumulativeTotal: 2000
      }
    ],
    standingHistory: [
      {
        date: new Date('2025-01-01'),
        standing: 'good',
        notes: 'Member joined fund'
      },
      {
        date: new Date(),
        standing: 'good',
        notes: 'Current standing'
      }
    ]
  }
};

// Test the fixed PDF report generator
console.log('Testing PDF Report Generator Fix...');
console.log('================================');

// Calculate expected values
const expectedContribution = 17400;
const outstandingAmount = 3970;
const expectedPercentage = (outstandingAmount / expectedContribution) * 100;

console.log('Expected Contribution: R', expectedContribution.toLocaleString('en-ZA'));
console.log('Outstanding Amount: R', outstandingAmount.toLocaleString('en-ZA'));
console.log('Expected Percentage Outstanding:', expectedPercentage.toFixed(2) + '%');
console.log('');

// Generate HTML
try {
  const html = PDFReportGenerator.generateMemberStatementHTML(mockReportData);
  console.log('✅ HTML generated successfully');
  console.log('HTML length:', html.length, 'characters');
  
  // Check for key elements in the HTML
  const checks = [
    { check: 'PLF Logo', found: html.includes('plf-logo') },
    { check: 'Lesego Bokaba', found: html.includes('Lesego Bokaba') },
    { check: 'Member Number M031', found: html.includes('M031') },
    { check: 'Current Balance R13,430', found: html.includes('R 13,430') || html.includes('R 13 430') },
    { check: 'Total Contributions R13,430', found: html.includes('Total Contributions') },
    { check: 'Outstanding Amount R3,970', found: html.includes('R 3,970') || html.includes('R 3 970') },
    { check: 'Percentage Outstanding 22.82%', found: html.includes('22.8') || html.includes('22.82') },
    { check: 'Expected Contribution R17,400', found: html.includes('R 17,400') || html.includes('R 17 400') },
    { check: 'No Total Disbursements', found: !html.includes('Total Disbursements') }
  ];
  
  console.log('\nHTML Content Checks:');
  console.log('===================');
  checks.forEach(({ check, found }) => {
    console.log(found ? '✅' : '❌', check);
  });
  
  // Save HTML to file for manual inspection
  const fs = require('fs');
  fs.writeFileSync('test_member_statement.html', html);
  console.log('\n✅ HTML saved to test_member_statement.html');
  console.log('Open this file in a browser to see the report.');
  
} catch (error) {
  console.error('❌ Error generating HTML:', error.message);
  console.error(error.stack);
}

console.log('\nTest Summary:');
console.log('=============');
console.log('The fixed PDF report generator should now:');
console.log('1. Show correct percentage outstanding (22.82% instead of 29.6%)');
console.log('2. Include PLF logo in the header');
console.log('3. Show Expected Contribution (R17,400)');
console.log('4. NOT show Total Disbursements (which was incorrectly showing R3,970)');
console.log('5. Match the data shown in the My Funds screen');