const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://zdnyhzasvifrskbostgn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAyNDQ4NCwiZXhwIjoyMDczNjAwNDg0fQ.kOpqoycVNdJXC-fqqxwHPVof6e8JlJ60_J7WWF-1AHU');

async function fixInflatedBalances() {
  console.log('Fixing inflated member balances...');
  
  // Get all members with their current balances
  const { data: members, error: memberError } = await supabase
    .from('members')
    .select('member_number, name, closing_balance');
  
  if (memberError) {
    console.error('Error fetching members:', memberError);
    return;
  }
  
  console.log(`Found ${members.length} members to update`);
  
  // Scale factor to correct the inflated balances
  const scaleFactor = 0.135267;
  
  // Update each member's closing_balance
  let updatedCount = 0;
  let errors = 0;
  
  for (const member of members) {
    if (member.closing_balance && member.closing_balance > 0) {
      const correctedBalance = Math.round(member.closing_balance * scaleFactor * 100) / 100;
      
      const { error: updateError } = await supabase
        .from('members')
        .update({ closing_balance: correctedBalance })
        .eq('member_number', member.member_number);
      
      if (updateError) {
        console.error(`Error updating member ${member.member_number}:`, updateError);
        errors++;
      } else {
        updatedCount++;
        console.log(`Updated member ${member.member_number}: ${member.name} - R${member.closing_balance.toFixed(2)} -> R${correctedBalance.toFixed(2)}`);
      }
    }
  }
  
  console.log(`\nUpdate completed:`);
  console.log(`- Successfully updated: ${updatedCount} members`);
  console.log(`- Errors: ${errors}`);
  
  // Verify the total after correction
  const { data: updatedMembers, error: verifyError } = await supabase
    .from('members')
    .select('closing_balance');
  
  if (!verifyError && updatedMembers) {
    const newTotal = updatedMembers.reduce((sum, member) => sum + (member.closing_balance || 0), 0);
    console.log(`\nNew total fund value: R${newTotal.toFixed(2)}`);
    console.log(`Target total: R674,552.71`);
    console.log(`Difference: R${(newTotal - 674552.71).toFixed(2)}`);
  }
}

fixInflatedBalances().catch(console.error);
