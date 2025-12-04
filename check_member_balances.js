const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkMemberBalances() {
  console.log('Checking member_balances table...');
  
  // Check if member_balances table exists and has data
  const { data: balances, error } = await supabase
    .from('member_balances')
    .select('*')
    .limit(10);
  
  if (error) {
    console.log('Error fetching member_balances:', error.message);
    console.log('Table may not exist or have RLS issues');
    return;
  }
  
  console.log(`Found ${balances.length} records in member_balances table`);
  
  if (balances.length > 0) {
    console.log('First few records:');
    balances.slice(0, 3).forEach((balance, i) => {
      console.log(`Record ${i+1}:`, {
        member_id: balance.member_id,
        savings_balance: balance.savings_balance,
        total_contributions: balance.total_contributions,
        net_balance: balance.net_balance
      });
    });
    
    // Calculate total from member_balances
    let totalFromBalances = 0;
    balances.forEach(balance => {
      const savings = balance.savings_balance || 0;
      totalFromBalances += savings;
    });
    
    console.log(`\nTotal from member_balances: R ${totalFromBalances.toFixed(2)}`);
  }
}

checkMemberBalances().catch(console.error);
