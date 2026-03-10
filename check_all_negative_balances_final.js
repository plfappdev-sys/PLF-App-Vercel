// Check ALL negative balance members
const { SupabaseMemberService } = require('./src/services/supabaseMemberService.ts');

async function checkAllNegativeBalances() {
  console.log('Checking ALL negative balance members...\n');
  
  const allMembers = await SupabaseMemberService.getAllMembers();
  
  // Find all members with negative balances
  const negativeMembers = allMembers.filter(m => m.financialInfo.currentBalance < 0);
  
  console.log(`Found ${negativeMembers.length} members with negative balances:\n`);
  
  // Sort by most negative first
  negativeMembers.sort((a, b) => a.financialInfo.currentBalance - b.financialInfo.currentBalance);
  
  for (const member of negativeMembers) {
    const name = member.personalInfo?.fullName || `Member ${member.memberNumber}`;
    const balance = member.financialInfo.currentBalance;
    const formatted = `R ${balance.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
    
    console.log(`${member.memberNumber}: ${name}`);
    console.log(`  Balance: ${formatted} (raw: ${balance})`);
    console.log(`  Standing: ${member.membershipStatus.standingCategory}`);
    console.log('');
  }
  
  // Also check specific members mentioned by user
  console.log('\n=== SPECIFIC MEMBERS MENTIONED ===\n');
  
  const specificMembers = [
    { number: 'M017', name: 'Jeff Matlou' },
    { number: 'M041', name: 'Nicholas Molale' },
    { number: 'M012', name: 'Freddy Sonakile' },
    { number: 'M033', name: 'Matshediso Ellen Tyobeka' }
  ];
  
  for (const spec of specificMembers) {
    const member = allMembers.find(m => m.memberNumber === spec.number);
    if (member) {
      const balance = member.financialInfo.currentBalance;
      const formatted = `R ${balance.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
      const isNegative = balance < 0;
      
      console.log(`${spec.number}: ${spec.name}`);
      console.log(`  Balance: ${formatted}`);
      console.log(`  Is negative: ${isNegative}`);
      console.log(`  Would show as 0? ${balance === 0 || balance === null || balance === undefined ? 'YES' : 'NO'}`);
      console.log('');
    } else {
      console.log(`${spec.number}: ${spec.name} - NOT FOUND\n`);
    }
  }
  
  // Summary
  console.log('\n=== SUMMARY ===');
  console.log(`Total members: ${allMembers.length}`);
  console.log(`Members with negative balances: ${negativeMembers.length}`);
  console.log(`Members with zero balance: ${allMembers.filter(m => m.financialInfo.currentBalance === 0).length}`);
  console.log(`Members with positive balances: ${allMembers.filter(m => m.financialInfo.currentBalance > 0).length}`);
  
  // Check if any negative balances would be incorrectly displayed as 0
  const problematicMembers = negativeMembers.filter(m => 
    m.financialInfo.currentBalance === null || 
    m.financialInfo.currentBalance === undefined ||
    isNaN(m.financialInfo.currentBalance)
  );
  
  if (problematicMembers.length > 0) {
    console.log(`\n⚠️ WARNING: ${problematicMembers.length} negative balance members have null/undefined/NaN values!`);
  } else {
    console.log('\n✅ All negative balance members have valid numeric values.');
  }
}

checkAllNegativeBalances().catch(console.error);