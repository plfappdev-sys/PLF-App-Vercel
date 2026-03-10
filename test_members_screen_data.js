const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Simulate what the MembersScreen would see
async function testMembersScreenData() {
  console.log('Testing data that would be shown in MembersScreen...\n');
  
  // Get all members using the service logic
  const { data: members, error } = await supabase
    .from('members')
    .select('*');
    
  if (error) {
    console.error('Error fetching members:', error);
    return;
  }
  
  console.log(`Found ${members?.length || 0} members\n`);
  
  // Get all balances
  const { data: balances, error: balancesError } = await supabase
    .from('member_balances')
    .select('*');
    
  const balanceLookup = {};
  if (balances && Array.isArray(balances)) {
    balances.forEach(balance => {
      balanceLookup[balance.member_id] = balance;
    });
  }
  
  // Show first 10 members with their calculated balances
  const sampleMembers = members.slice(0, 10);
  
  sampleMembers.forEach(member => {
    const balanceData = balanceLookup[member.id];
    const financialInfoData = member.financial_info || {};
    
    // Use the fixed logic
    const currentBalance = balanceData ? 
      (balanceData.net_balance !== undefined && balanceData.net_balance !== null ? 
        balanceData.net_balance : balanceData.savings_balance || 0) : 
      (member.financial_info && member.financial_info.current_balance !== undefined ? 
        member.financial_info.current_balance : 0);
    
    const formatCurrency = (amount) => {
      const safeAmount = amount || 0;
      return `R ${safeAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
    };
    
    console.log(`${member.member_number}: ${member.name}`);
    console.log(`  Current Balance: ${formatCurrency(currentBalance)}`);
    console.log(`  DB net_balance: ${balanceData?.net_balance || 'N/A'}`);
    console.log(`  DB savings_balance: ${balanceData?.savings_balance || 'N/A'}`);
    console.log(`  DB loan_balance: ${balanceData?.loan_balance || 'N/A'}`);
    console.log('');
  });
  
  // Specifically check Jeff Matlou
  console.log('\n--- Specific Check: Jeff Matlou (M017) ---');
  const jeff = members.find(m => m.member_number === 'M017');
  if (jeff) {
    const balanceData = balanceLookup[jeff.id];
    const currentBalance = balanceData ? 
      (balanceData.net_balance !== undefined && balanceData.net_balance !== null ? 
        balanceData.net_balance : balanceData.savings_balance || 0) : 
      (jeff.financial_info && jeff.financial_info.current_balance !== undefined ? 
        jeff.financial_info.current_balance : 0);
    
    const formatCurrency = (amount) => {
      const safeAmount = amount || 0;
      return `R ${safeAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
    };
    
    console.log(`Member: ${jeff.name} (${jeff.member_number})`);
    console.log(`Displayed Balance: ${formatCurrency(currentBalance)}`);
    console.log(`Should show: R -11,699.64 (negative balance)`);
    console.log(`Correctly shows negative? ${currentBalance < 0 ? 'YES ✓' : 'NO ✗'}`);
  }
}

testMembersScreenData().catch(console.error);