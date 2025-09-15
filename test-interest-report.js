// Simple test script to verify interest reporting functionality
const { InterestReportService } = require('./src/services/InterestReportService');
const MockMemberService = require('./src/services/MockMemberService').default;

async function testInterestReporting() {
  console.log('🧪 Testing Interest Reporting Functionality...\n');
  
  try {
    // Get mock members
    const members = await MockMemberService.getAllMembers();
    console.log(`✅ Retrieved ${members.length} mock members`);
    
    // Test individual member interest report
    if (members.length > 0) {
      const member = members[0];
      const startDate = new Date('2025-01-01');
      const endDate = new Date('2025-09-15');
      
      const memberReport = InterestReportService.generateMemberInterestReport(
        member,
        startDate,
        endDate
      );
      
      console.log('✅ Individual Member Interest Report:');
      console.log(`   Member: ${memberReport.memberNumber}`);
      console.log(`   Period: ${memberReport.period.days} days`);
      console.log(`   Interest Earned: R ${memberReport.actualInterestEarned.toFixed(2)}`);
      console.log(`   Interest Charged: R ${memberReport.actualInterestCharged.toFixed(2)}`);
      console.log(`   Net Interest: R ${memberReport.netActualInterest.toFixed(2)}`);
    }
    
    // Test fund-wide interest summary
    const fundSummary = InterestReportService.generateFundInterestSummary(
      members,
      new Date('2025-01-01'),
      new Date('2025-09-15')
    );
    
    console.log('\n✅ Fund Interest Summary:');
    console.log(`   Total Members: ${fundSummary.totalMembers}`);
    console.log(`   Members with Savings: ${fundSummary.membersWithSavings}`);
    console.log(`   Members with Loans: ${fundSummary.membersWithLoans}`);
    console.log(`   Total Interest Earned: R ${fundSummary.totalActualInterestEarned.toFixed(2)}`);
    console.log(`   Total Interest Charged: R ${fundSummary.totalActualInterestCharged.toFixed(2)}`);
    console.log(`   Net Interest: R ${fundSummary.netActualInterest.toFixed(2)}`);
    
    // Test interest forecast
    if (members.length > 0) {
      const member = members[0];
      const forecast = InterestReportService.generateInterestForecast(
        member,
        10000, // R10,000 principal
        0.08,   // 8% annual rate
        12,     // 12 months
        'months'
      );
      
      console.log('\n✅ Interest Forecast:');
      console.log(`   Original Principal: R ${forecast.originalPrincipal.toFixed(2)}`);
      console.log(`   Annual Rate: ${(forecast.annualInterestRate * 100).toFixed(2)}%`);
      console.log(`   Total Interest: R ${forecast.totalInterest.toFixed(2)}`);
      console.log(`   Final Amount: R ${forecast.finalAmount.toFixed(2)}`);
    }
    
    console.log('\n🎉 All interest reporting tests completed successfully!');
    console.log('\n📊 The interest reporting system includes:');
    console.log('   • Individual member interest reports');
    console.log('   • Fund-wide interest summaries');
    console.log('   • Interest forecasting');
    console.log('   • PDF report generation');
    console.log('   • Integration with reporting dashboard');
    
  } catch (error) {
    console.error('❌ Error testing interest reporting:', error);
    process.exit(1);
  }
}

// Run the test
testInterestReporting();
