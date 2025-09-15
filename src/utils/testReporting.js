// Test script to verify reporting functionality
const { ReportService } = require('../services/ReportService');
const { PDFReportGenerator } = require('../services/PDFReportGenerator');
const { downloadHTMLReport, downloadCSVReport, generateReportFilename } = require('./fileDownload');

// Test function to verify reporting functionality
const testReportingFunctionality = async () => {
  console.log('Testing reporting functionality...');
  
  try {
    // Test 1: Generate Fund Status Report
    console.log('1. Testing Fund Status Report...');
    const fundStatusReport = await ReportService.generateFundStatusReport('Test User');
    console.log('✓ Fund Status Report generated successfully');
    
    // Test 2: Generate HTML PDF
    console.log('2. Testing HTML PDF generation...');
    const htmlContent = PDFReportGenerator.generateFundStatusHTML(fundStatusReport);
    console.log('✓ HTML PDF generated successfully');
    
    // Test 3: Test filename generation
    console.log('3. Testing filename generation...');
    const filename = generateReportFilename('fund_status', '.html');
    console.log(`✓ Filename generated: ${filename}`);
    
    // Test 4: Test CSV export
    console.log('4. Testing CSV export...');
    const csvContent = ReportService.exportToCSV(fundStatusReport);
    console.log('✓ CSV export successful');
    
    // Test 5: Test Member Statement Report
    console.log('5. Testing Member Statement Report...');
    const memberStatement = await ReportService.generateMemberStatementReport('MEMBER001', 'Test User');
    console.log('✓ Member Statement Report generated successfully');
    
    // Test 6: Test Transaction Report
    console.log('6. Testing Transaction Report...');
    const startDate = new Date('2025-01-01');
    const endDate = new Date('2025-09-13');
    const transactionReport = await ReportService.generateTransactionReport(startDate, endDate, undefined, 'Test User');
    console.log('✓ Transaction Report generated successfully');
    
    // Test 7: Test Standing Analysis Report
    console.log('7. Testing Standing Analysis Report...');
    const standingAnalysis = await ReportService.generateStandingAnalysisReport('Test User');
    console.log('✓ Standing Analysis Report generated successfully');
    
    console.log('\n🎉 All reporting tests passed successfully!');
    console.log('\nAvailable reports:');
    console.log('- Fund Status Report');
    console.log('- Member Statement Report'); 
    console.log('- Transaction Report');
    console.log('- Standing Analysis Report');
    console.log('\nExport formats:');
    console.log('- HTML/PDF');
    console.log('- CSV');
    
    return true;
    
  } catch (error) {
    console.error('❌ Reporting test failed:', error);
    return false;
  }
};

// Run the test if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
  testReportingFunctionality().then(success => {
    if (success) {
      console.log('\n✅ Reporting functionality is working correctly!');
    } else {
      console.log('\n❌ Reporting functionality has issues.');
    }
  });
}
