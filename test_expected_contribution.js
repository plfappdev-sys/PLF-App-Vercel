const { SupabaseMemberService } = require('./src/services/supabaseMemberService');

async function testExpectedContribution() {
  console.log('Testing expected contribution implementation...\n');
  
  // Test with a few member numbers
  const testMembers = ['M004', 'M005', 'M031', 'M047', 'M057'];
  
  for (const memberNumber of testMembers) {
    console.log(`\n=== Testing member ${memberNumber} ===`);
    
    try {
      const member = await SupabaseMemberService.getMemberByNumber(memberNumber);
      
      if (member) {
        console.log(`Name: ${member.personalInfo.fullName}`);
        console.log(`Member Number: ${member.memberNumber}`);
        console.log(`Current Balance: R${member.financialInfo.currentBalance}`);
        console.log(`Total Contributions: R${member.financialInfo.totalContributions}`);
        console.log(`Expected Contribution: R${member.financialInfo.expectedContribution || 0}`);
        console.log(`Outstanding Amount: R${member.financialInfo.outstandingAmount}`);
        console.log(`Standing: ${member.membershipStatus.standingCategory}`);
        
        // Calculate expected contribution based on join date
        const joinDate = new Date(member.personalInfo.joinDate || '2018-07-23');
        const today = new Date();
        const monthsDiff = (today.getFullYear() - joinDate.getFullYear()) * 12 + 
                          (today.getMonth() - joinDate.getMonth());
        const expectedContribution = Math.max(0, Math.min(monthsDiff, 83)) * 200;
        
        console.log(`Join Date: ${joinDate.toISOString().split('T')[0]}`);
        console.log(`Months since join: ${monthsDiff}`);
        console.log(`Calculated Expected Contribution: R${expectedContribution}`);
        
        if (member.financialInfo.expectedContribution !== expectedContribution) {
          console.log(`⚠️ WARNING: Expected contribution mismatch!`);
          console.log(`   Database: R${member.financialInfo.expectedContribution || 0}`);
          console.log(`   Calculated: R${expectedContribution}`);
        } else {
          console.log(`✅ Expected contribution matches calculation`);
        }
      } else {
        console.log(`❌ Member ${memberNumber} not found`);
      }
    } catch (error) {
      console.error(`Error testing member ${memberNumber}:`, error.message);
    }
  }
  
  console.log('\n=== Testing complete ===');
}

// Run the test
testExpectedContribution().catch(console.error);