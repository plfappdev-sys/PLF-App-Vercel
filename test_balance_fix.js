// Test script to verify balance display fix
const { SupabaseMemberService } = require('./src/services/supabaseMemberService');

async function testBalanceFix() {
  console.log('Testing balance display fix...\n');
  
  // Test specific members mentioned in the issue
  const testMembers = ['M001', 'M002', 'M003', 'M004', 'M005', 'M006', 'M007', 'M008', 'M009', 'M010'];
  
  for (const memberNumber of testMembers) {
    try {
      const member = await SupabaseMemberService.getMemberByNumber(memberNumber);
      
      if (member) {
        console.log(`Member: ${member.memberNumber}`);
        console.log(`Name: ${member.personalInfo?.fullName || 'Unknown'}`);
        console.log(`Current Balance: ${member.financialInfo.currentBalance}`);
        console.log(`Outstanding Amount: ${member.financialInfo.outstandingAmount}`);
        console.log(`Standing Category: ${member.membershipStatus.standingCategory}`);
        
        // Test the new balance display logic
        const balance = member.financialInfo.currentBalance;
        let label, amount, color;
        
        if (balance > 0) {
          label = 'Balance Due';
          amount = balance;
          color = 'Red';
        } else if (balance < 0) {
          label = 'Balance';
          amount = Math.abs(balance);
          color = 'Green';
        } else {
          label = 'Balance';
          amount = 0;
          color = 'Gray';
        }
        
        console.log(`Balance Display: ${label}: R ${amount.toFixed(2)} (${color})`);
        console.log('---\n');
      } else {
        console.log(`Member ${memberNumber} not found\n`);
      }
    } catch (error) {
      console.error(`Error fetching member ${memberNumber}:`, error.message);
    }
  }
  
  // Test fund statistics
  console.log('\nTesting fund statistics...');
  try {
    const stats = await SupabaseMemberService.getFundStatistics();
    console.log(`Total Members: ${stats.totalMembers}`);
    console.log(`Total Fund Contributions: R ${stats.totalFundValue.toFixed(2)}`);
    console.log(`Total Outstanding Contributions: R ${stats.totalLoansOutstanding.toFixed(2)}`);
    console.log('Members by standing:');
    console.log(`  Good Standing: ${stats.membersByStanding.good}`);
    console.log(`  Owing 10%: ${stats.membersByStanding.owing_10}`);
    console.log(`  Owing 20%: ${stats.membersByStanding.owing_20}`);
    console.log(`  Owing 30%: ${stats.membersByStanding.owing_30}`);
    console.log(`  Owing 50%: ${stats.membersByStanding.owing_50}`);
    console.log(`  Owing 65%: ${stats.membersByStanding.owing_65}`);
    console.log(`  Owing 65%+: ${stats.membersByStanding.owing_65_plus}`);
  } catch (error) {
    console.error('Error fetching fund statistics:', error.message);
  }
}

// Run the test
testBalanceFix().catch(console.error);