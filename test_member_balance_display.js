// Test to check what MembersScreen actually displays
const { SupabaseMemberService } = require('./src/services/supabaseMemberService.ts');

async function testMemberBalanceDisplay() {
  console.log('Testing member balance display...\n');
  
  // Simulate what MembersScreen.loadMembers() does
  const allMembers = await SupabaseMemberService.getAllMembers();
  
  // Find specific members
  const testMembers = [
    { name: 'Jeff Matlou', number: 'M017' },
    { name: 'Nicholas Molale', number: 'M041' },
    { name: 'Matshediso Ellen Tyobeka', number: 'M033' },
    { name: 'Freddy Sonakile', number: 'M012' }
  ];
  
  console.log('Checking negative balance members:');
  console.log('==================================\n');
  
  for (const testMember of testMembers) {
    const member = allMembers.find(m => m.memberNumber === testMember.number);
    if (member) {
      console.log(`${testMember.name} (${testMember.number}):`);
      console.log(`  Raw currentBalance from service:`, member.financialInfo.currentBalance);
      console.log(`  Type:`, typeof member.financialInfo.currentBalance);
      console.log(`  Is negative?`, member.financialInfo.currentBalance < 0);
      
      // Simulate the formatCurrency function
      const formatCurrency = (amount) => {
        const safeAmount = amount || 0;
        return `R ${safeAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
      };
      
      console.log(`  Formatted:`, formatCurrency(member.financialInfo.currentBalance));
      console.log(`  Standing category:`, member.membershipStatus.standingCategory);
      console.log('');
    } else {
      console.log(`${testMember.name} (${testMember.number}): NOT FOUND\n`);
    }
  }
  
  // Also check a few members with positive balances
  console.log('\nChecking some positive balance members:');
  console.log('=======================================\n');
  
  const positiveMembers = allMembers.filter(m => m.financialInfo.currentBalance > 0).slice(0, 3);
  for (const member of positiveMembers) {
    console.log(`${member.personalInfo?.fullName || 'Unknown'} (${member.memberNumber}):`);
    console.log(`  Balance: R ${member.financialInfo.currentBalance.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`);
    console.log(`  Standing:`, member.membershipStatus.standingCategory);
    console.log('');
  }
  
  // Summary
  console.log('\n=== SUMMARY ===');
  console.log(`Total members: ${allMembers.length}`);
  console.log(`Members with negative balances: ${allMembers.filter(m => m.financialInfo.currentBalance < 0).length}`);
  console.log(`Members with zero balance: ${allMembers.filter(m => m.financialInfo.currentBalance === 0).length}`);
  console.log(`Members with positive balances: ${allMembers.filter(m => m.financialInfo.currentBalance > 0).length}`);
}

testMemberBalanceDisplay().catch(console.error);