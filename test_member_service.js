// Test the member service to ensure it reads the correct expected contribution
const { SupabaseMemberService } = require('./src/services/supabaseMemberService');

async function testMemberService() {
  console.log('Testing SupabaseMemberService with updated expected contributions...\n');
  
  try {
    // Test Lesego Bokaba (M031)
    console.log('1. Testing Lesego Bokaba (M031)...');
    const lesego = await SupabaseMemberService.getMemberByNumber('M031');
    
    if (lesego) {
      console.log(`Member found: ${lesego.personalInfo.fullName}`);
      console.log(`Expected contribution from service: ${lesego.financialInfo.expectedContribution}`);
      console.log(`Total contributions: ${lesego.financialInfo.totalContributions}`);
      
      // Calculate outstanding amount
      const expected = lesego.financialInfo.expectedContribution;
      const total = lesego.financialInfo.totalContributions;
      const outstanding = Math.max(0, expected - total);
      console.log(`Outstanding amount (Expected - Total): ${outstanding}`);
      console.log(`Outstanding percentage: ${lesego.financialInfo.percentageOutstanding}%`);
      console.log(`Membership status: ${lesego.membershipStatus.standingCategory}`);
    } else {
      console.log('Lesego Bokaba not found');
    }
    
    // Test a few other members
    console.log('\n2. Testing a few other members...');
    const testMembers = ['M001', 'M004', 'M006', 'M010'];
    
    for (const memberNumber of testMembers) {
      const member = await SupabaseMemberService.getMemberByNumber(memberNumber);
      if (member) {
        console.log(`${memberNumber}: ${member.personalInfo.fullName}`);
        console.log(`  Expected: ${member.financialInfo.expectedContribution}`);
        console.log(`  Total: ${member.financialInfo.totalContributions}`);
        console.log(`  Outstanding: ${member.financialInfo.outstandingAmount}`);
        console.log(`  Status: ${member.membershipStatus.standingCategory}`);
      }
    }
    
    // Test fund statistics
    console.log('\n3. Testing fund statistics...');
    const fundStats = await SupabaseMemberService.getFundStatistics();
    console.log(`Total members: ${fundStats.totalMembers}`);
    console.log(`Total fund value: R${fundStats.totalFundValue}`);
    console.log(`Total loans outstanding: R${fundStats.totalLoansOutstanding}`);
    console.log('Members by standing:');
    console.log(`  Good: ${fundStats.membersByStanding.good}`);
    console.log(`  Owing 10%: ${fundStats.membersByStanding.owing_10}`);
    console.log(`  Owing 20%: ${fundStats.membersByStanding.owing_20}`);
    console.log(`  Owing 30%: ${fundStats.membersByStanding.owing_30}`);
    console.log(`  Owing 50%: ${fundStats.membersByStanding.owing_50}`);
    console.log(`  Owing 65%: ${fundStats.membersByStanding.owing_65}`);
    console.log(`  Owing 65%+: ${fundStats.membersByStanding.owing_65_plus}`);
    
  } catch (error) {
    console.error('Error testing member service:', error);
  }
}

// Run the test
testMemberService();