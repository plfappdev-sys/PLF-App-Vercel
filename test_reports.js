const { SupabaseMemberService } = require('./src/services/supabaseMemberService');
const { SupabaseReportService } = require('./src/services/supabaseReportService');

async function testReports() {
  console.log('Testing Reports System...');
  
  try {
    // Test 1: Get all members
    console.log('\n1. Testing getAllMembers()...');
    const members = await SupabaseMemberService.getAllMembers();
    console.log('Total members found:', members.length);
    
    if (members.length > 0) {
      console.log('First 3 members:');
      members.slice(0, 3).forEach(m => {
        console.log(`  - ${m.memberNumber}: ${m.personalInfo?.fullName || 'No name'}`);
      });
    }
    
    // Test 2: Get fund statistics
    console.log('\n2. Testing getFundStatistics()...');
    const stats = await SupabaseMemberService.getFundStatistics();
    console.log('Fund Statistics:', JSON.stringify(stats, null, 2));
    
    // Test 3: Test member statement report
    console.log('\n3. Testing member statement report...');
    if (members.length > 0) {
      const testMember = members[0];
      console.log('Testing with member:', testMember.memberNumber);
      try {
        const report = await SupabaseReportService.generateMemberStatementReport(testMember.memberNumber, 'test-user');
        console.log('Report generated successfully:', report.title);
      } catch (error) {
        console.error('Error generating report:', error.message);
      }
    }
    
    // Test 4: Test fund status report
    console.log('\n4. Testing fund status report...');
    try {
      const report = await SupabaseReportService.generateFundStatusReport('test-user');
      console.log('Fund status report generated successfully:', report.title);
    } catch (error) {
      console.error('Error generating fund status report:', error.message);
    }
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testReports();
