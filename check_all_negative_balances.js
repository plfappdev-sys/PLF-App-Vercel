const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAllNegativeBalances() {
  console.log('Checking all members with negative balances...\n');
  
  // Get all member balances
  const { data: balances, error } = await supabase
    .from('member_balances')
    .select('*');
    
  if (error) {
    console.error('Error fetching balances:', error);
    return;
  }
  
  // Filter for negative net_balance
  const negativeBalances = balances.filter(b => b.net_balance < 0);
  
  console.log(`Found ${negativeBalances.length} members with negative balances out of ${balances.length} total members with balance records\n`);
  
  if (negativeBalances.length > 0) {
    console.log('Members with negative balances:');
    console.log('================================');
    
    for (const balance of negativeBalances) {
      // Get member details
      const { data: member, error: memberError } = await supabase
        .from('members')
        .select('*')
        .eq('id', balance.member_id)
        .single();
        
      if (memberError) {
        console.log(`Error fetching member ${balance.member_id}:`, memberError.message);
        continue;
      }
      
      const formatCurrency = (amount) => {
        const safeAmount = amount || 0;
        return `R ${safeAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
      };
      
      console.log(`Member: ${member.name} (${member.member_number})`);
      console.log(`  Net Balance: ${formatCurrency(balance.net_balance)}`);
      console.log(`  Savings Balance: ${formatCurrency(balance.savings_balance)}`);
      console.log(`  Loan Balance: ${formatCurrency(balance.loan_balance)}`);
      console.log(`  Total Contributions: ${formatCurrency(balance.total_contributions)}`);
      console.log('');
    }
  } else {
    console.log('No members found with negative balances.');
  }
  
  // Also check for any members with negative current_balance in financial_info
  console.log('\n\nChecking members table financial_info for negative balances...');
  const { data: members, error: membersError } = await supabase
    .from('members')
    .select('*');
    
  if (membersError) {
    console.error('Error fetching members:', membersError);
    return;
  }
  
  const membersWithNegativeFinancialInfo = [];
  
  for (const member of members) {
    if (member.financial_info && typeof member.financial_info === 'object') {
      const financialInfo = member.financial_info;
      if (financialInfo.current_balance < 0) {
        membersWithNegativeFinancialInfo.push({
          member,
          current_balance: financialInfo.current_balance
        });
      }
    }
  }
  
  if (membersWithNegativeFinancialInfo.length > 0) {
    console.log(`\nFound ${membersWithNegativeFinancialInfo.length} members with negative current_balance in financial_info:`);
    membersWithNegativeFinancialInfo.forEach(item => {
      console.log(`  ${item.member.name} (${item.member.member_number}): R ${item.current_balance.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`);
    });
  } else {
    console.log('\nNo members found with negative current_balance in financial_info.');
  }
}

checkAllNegativeBalances().catch(console.error);