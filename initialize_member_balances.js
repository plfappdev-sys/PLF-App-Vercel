const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://zdnyhzasvifrskbostgn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAyNDQ4NCwiZXhwIjoyMDczNjAwNDg0fQ.kOpqoycVNdJXC-fqqxwHPVof6e8JlJ60_J7WWF-1AHU');

async function initializeMemberBalances() {
  console.log('Initializing member_balances table for all members...');
  
  // Get all members
  const { data: members, error } = await supabase
    .from('members')
    .select('*');

  if (error) {
    console.error('Error fetching members:', error);
    return;
  }

  console.log(`Found ${members.length} members to initialize...`);
  
  let initializedCount = 0;
  
  for (const member of members) {
    // Use closing_balance as the initial savings balance
    const initialBalance = member.closing_balance || 0;
    
    // Initialize member balance record
    const { data: balanceData, error: balanceError } = await supabase
      .from('member_balances')
      .upsert({
        member_id: member.id,
        member_number: member.member_number,
        total_contributions: initialBalance,
        savings_balance: initialBalance,
        net_balance: initialBalance,
        available_for_withdrawal: Math.max(0, initialBalance),
        available_for_loan: Math.max(0, initialBalance * 3),
        last_balance_update: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select();
    
    if (balanceError) {
      console.error('Error initializing balance for member:', member.member_number, balanceError);
    } else {
      initializedCount++;
      console.log('Initialized balance for member:', member.member_number, 'Balance:', initialBalance);
    }
  }
  
  console.log(`✅ Successfully initialized ${initializedCount} member balances!`);
}

initializeMemberBalances().catch(console.error);
