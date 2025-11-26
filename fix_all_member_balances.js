const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://zdnyhzasvifrskbostgn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAyNDQ4NCwiZXhwIjoyMDczNjAwNDg0fQ.kOpqoycVNdJXC-fqqxwHPVof6e8JlJ60_J7WWF-1AHU');

async function fixAllMemberBalances() {
  console.log('Fixing all member_balance records...');
  
  // Get all member_balance records
  const { data: allBalances, error: allError } = await supabase
    .from('member_balances')
    .select('*');
  
  if (allError) {
    console.error('Error fetching balances:', allError);
    return;
  }
  
  console.log(`Found ${allBalances.length} member_balance records`);
  
  let updatedCount = 0;
  let errors = 0;
  
  // Update each balance record
  for (const balance of allBalances) {
    try {
      // Get the corresponding member record
      const { data: member, error: memberError } = await supabase
        .from('members')
        .select('member_number, closing_balance')
        .eq('id', balance.member_id);
      
      if (memberError || !member || member.length === 0) {
        console.log(`No member found for balance record ${balance.id}`);
        errors++;
        continue;
      }
      
      const memberData = member[0];
      
      // Update the balance record with correct values
      const { error: updateError } = await supabase
        .from('member_balances')
        .update({
          member_number: memberData.member_number,
          savings_balance: memberData.closing_balance,
          net_balance: memberData.closing_balance,
          available_funds: memberData.closing_balance,
          total_balance: memberData.closing_balance
        })
        .eq('id', balance.id);
      
      if (updateError) {
        console.error(`Error updating balance ${balance.id}:`, updateError);
        errors++;
      } else {
        updatedCount++;
        console.log(`Updated member ${memberData.member_number}: R${memberData.closing_balance.toFixed(2)}`);
      }
    } catch (error) {
      console.error(`Error processing balance ${balance.id}:`, error);
      errors++;
    }
  }
  
  console.log(`\nUpdate completed:`);
  console.log(`- Successfully updated: ${updatedCount} records`);
  console.log(`- Errors: ${errors}`);
  
  // Verify the total after correction
  const { data: updatedBalances, error: verifyError } = await supabase
    .from('member_balances')
    .select('total_balance');
  
  if (!verifyError && updatedBalances) {
    const newTotal = updatedBalances.reduce((sum, balance) => sum + (balance.total_balance || 0), 0);
    console.log(`\nTotal from member_balances: R${newTotal.toFixed(2)}`);
    console.log(`Target total: R619,169.20`);
    console.log(`Difference: R${(newTotal - 619169.20).toFixed(2)}`);
  }
}

fixAllMemberBalances().catch(console.error);
