const { SupabaseMemberService } = require('./src/services/supabaseMemberService.ts');

async function testNegativeBalanceFix() {
  console.log('Testing negative balance display fix...\n');
  
  // Test specific members mentioned in the issue
  const testMembers = ['M017', 'M041']; // Jeff Matlou and Nicholas Molale
  
  for (const memberNumber of testMembers) {
    console.log(`\n=== Testing member ${memberNumber} ===`);
    
    try {
      const member = await SupabaseMemberService.getMemberByNumber(memberNumber);
      
      if (!member) {
        console.log(`Member ${memberNumber} not found`);
        continue;
      }
      
      console.log(`Member Name: ${member.personalInfo?.fullName || 'Unknown'}`);
      console.log(`Current Balance: R${member.financialInfo?.currentBalance || 0}`);
      console.log(`Outstanding Amount: R${member.financialInfo?.outstandingAmount || 0}`);
      console.log(`Percentage Outstanding: ${member.financialInfo?.percentageOutstanding || 0}%`);
      
      // Check if balance is negative
      const balance = member.financialInfo?.currentBalance || 0;
      if (balance < 0) {
        console.log(`✓ Negative balance detected: R${balance}`);
        console.log('  This should show as "Balance" with green color (member has credit)');
      } else if (balance > 0) {
        console.log(`✓ Positive balance detected: R${balance}`);
        console.log('  This should show as "Balance Due" with red color (member owes money)');
      } else {
        console.log(`✓ Zero balance detected: R${balance}`);
        console.log('  This should show as "Balance" with gray color');
      }
      
      // Check membership status
      console.log(`Membership Status: ${member.membershipStatus?.standingCategory || 'unknown'}`);
      
    } catch (error) {
      console.error(`Error testing member ${memberNumber}:`, error.message);
    }
  }
  
  // Test getAllMembers to see all negative balances
  console.log('\n=== Testing getAllMembers for negative balances ===');
  
  try {
    const allMembers = await SupabaseMemberService.getAllMembers();
    console.log(`Total members: ${allMembers.length}`);
    
    const negativeBalanceMembers = allMembers.filter(member => 
      (member.financialInfo?.currentBalance || 0) < 0
    );
    
    console.log(`Members with negative balances: ${negativeBalanceMembers.length}`);
    
    if (negativeBalanceMembers.length > 0) {
      console.log('\nMembers with negative balances (should show as green "Balance"):');
      negativeBalanceMembers.forEach(member => {
        console.log(`  ${member.memberNumber}: ${member.personalInfo?.fullName || 'Unknown'} - R${member.financialInfo?.currentBalance || 0}`);
      });
    }
    
    const positiveBalanceMembers = allMembers.filter(member => 
      (member.financialInfo?.currentBalance || 0) > 0
    );
    
    console.log(`\nMembers with positive balances: ${positiveBalanceMembers.length}`);
    
    if (positiveBalanceMembers.length > 0) {
      console.log('\nMembers with positive balances (should show as red "Balance Due"):');
      positiveBalanceMembers.slice(0, 5).forEach(member => {
        console.log(`  ${member.memberNumber}: ${member.personalInfo?.fullName || 'Unknown'} - R${member.financialInfo?.currentBalance || 0}`);
      });
      if (positiveBalanceMembers.length > 5) {
        console.log(`  ... and ${positiveBalanceMembers.length - 5} more`);
      }
    }
    
  } catch (error) {
    console.error('Error testing getAllMembers:', error.message);
  }
  
  console.log('\n=== Test Complete ===');
  console.log('\nSummary:');
  console.log('- Negative balances should now show as actual negative values');
  console.log('- In the UI, negative balances should display as "Balance" with green color');
  console.log('- Positive balances should display as "Balance Due" with red color');
  console.log('- Zero balances should display as "Balance" with gray color');
}

// Run the test
testNegativeBalanceFix().catch(console.error);