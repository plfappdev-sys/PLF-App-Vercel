const { createClient } = require('@supabase/supabase-js');
// Using service role key to bypass RLS
const supabase = createClient('https://zdnyhzasvifrskbostgn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAyNDQ4NCwiZXhwIjoyMDczNjAwNDg0fQ.8vJ8vQYQJ8vQYQJ8vQYQJ8vQYQJ8vQYQJ8vQYQJ8vQYQ');

async function fixAllMembers() {
  console.log('Fixing all member closing balances with service role...');
  
  // Get all members
  const { data: members, error } = await supabase
    .from('members')
    .select('*');

  if (error) {
    console.error('Error fetching members:', error);
    return;
  }

  console.log(`Found ${members.length} members`);
  
  let updatedCount = 0;
  
  for (const member of members) {
    const currentBalance = member.financial_info?.current_balance;
    const closingBalance = member.closing_balance;
    
    if (currentBalance !== undefined && currentBalance !== null && closingBalance !== currentBalance) {
      console.log(`Updating ${member.name}: closing_balance from ${closingBalance} to ${currentBalance}`);
      
      const { error: updateError } = await supabase
        .from('members')
        .update({ closing_balance: currentBalance })
        .eq('id', member.id);
      
      if (updateError) {
        console.error(`Error updating ${member.name}:`, updateError);
      } else {
        updatedCount++;
      }
    }
  }
  
  console.log(`Successfully updated ${updatedCount} members`);
}

fixAllMembers().catch(console.error);
