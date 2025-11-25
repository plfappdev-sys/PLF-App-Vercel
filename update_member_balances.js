const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://zdnyhzasvifrskbostgn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAyNDQ4NCwiZXhwIjoyMDczNjAwNDg0fQ.kOpqoycVNdJXC-fqqxwHPVof6e8JlJ60_J7WWF-1AHU');

async function updateMemberBalances() {
  console.log('Updating member_balances table with correct values...');
  
  // Get all members with their current balances
  const { data: members, error } = await supabase
    .from('members')
    .select('*');

  if (error) {
    console.error('Error fetching members:', error);
    return;
  }

  console.log(`Found ${members.length} members to check...`);
  
  let updatedCount = 0;
  
  for (const member of members) {
    // Get current member balance record
    const { data: currentBalance, error: balanceError } = await supabase
      .from('member_balances')
      .select('*')
      .eq('member_id', member.id)
      .single();
    
    if (balanceError) {
      console.error('Error getting balance for member:', member.member_number, balanceError);
      continue;
    }
    
    // Use closing_balance as the savings balance
    const correctBalance = member.closing_balance || 0;
    
    // Check if update is needed
    if (currentBalance.savings_balance !== correctBalance) {
      console.log('Updating member:', member.member_number, 'from', currentBalance.savings_balance, 'to', correctBalance);
      
      // Update member balance record
      const { data: updatedBalance, error: updateError } = await supabase
        .from('member_balances')
        .update({
          total_contributions: correctBalance,
          savings_balance: correctBalance,
          net_balance: correctBalance,
          available_for_withdrawal: Math.max(0, correctBalance),
          available_for_loan: Math.max(0, correctBalance * 3),
          last_balance_update: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('member_id', member.id)
        .select();
      
      if (updateError) {
        console.error('Error updating balance for member:', member.member_number, updateError);
      } else {
        updatedCount++;
      }
    }
  }
  
  console.log(`✅ Successfully updated ${updatedCount} member balances!`);
}

updateMemberBalances().catch(console.error);
