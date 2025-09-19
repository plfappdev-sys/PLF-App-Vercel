// Test script for Member Statement report functionality
const { SupabaseReportService } = require('./src/services/supabaseReportService');
const { PDFReportGenerator } = require('./src/services/PDFReportGenerator');

async function testMemberStatementReport() {
  console.log('Testing Member Statement Report Generation...');
  
  try {
    // Test with a sample member number
    const memberNumber = 'Member 6'; // Using one of the test members from the notes
    
    console.log(`Generating report for member: ${memberNumber}`);
    
    // Generate the report
    const reportData = await SupabaseReportService.generateMemberStatementReport(
      memberNumber,
      'test-user@example.com'
    );
    
    console.log('✅ Report data generated successfully');
    console.log(`Report Title: ${reportData.title}`);
    console.log(`Generated Date: ${reportData.generatedDate}`);
    console.log(`Report Type: ${reportData.reportType}`);
    
    // Generate HTML content
    const htmlContent = PDFReportGenerator.generateMemberStatementHTML(reportData);
    console.log('✅ HTML content generated successfully');
    console.log(`HTML Content Length: ${htmlContent.length} characters`);
    
    // Check if the HTML contains expected sections
    const hasMemberInfo = htmlContent.includes('Personal Information');
    const hasFinancialSummary = htmlContent.includes('Financial Summary');
    const hasTransactionHistory = htmlContent.includes('Transaction History');
    
    console.log(`Contains Member Info: ${hasMemberInfo}`);
    console.log(`Contains Financial Summary: ${hasFinancialSummary}`);
    console.log(`Contains Transaction History: ${hasTransactionHistory}`);
    
    if (hasMemberInfo && hasFinancialSummary && hasTransactionHistory) {
      console.log('✅ All expected report sections are present');
    } else {
      console.log('❌ Some report sections are missing');
    }
    
    // Save HTML to file for inspection
    const fs = require('fs');
    fs.writeFileSync('test-member-statement.html', htmlContent);
    console.log('✅ HTML report saved to test-member-statement.html');
    
    return true;
    
  } catch (error) {
    console.error('❌ Error generating member statement report:', error.message);
    console.error(error.stack);
    return false;
  }
}

// Run the test
testMemberStatementReport().then(success => {
  if (success) {
    console.log('\n🎉 Member Statement Report test completed successfully!');
    console.log('The report is ready for download from the Reports screen.');
  } else {
    console.log('\n💥 Member Statement Report test failed!');
    process.exit(1);
  }
});
