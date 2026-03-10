const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Simulate the logic from supabaseMemberService.ts
async function testMemberFix() {
  console.log('Testing member balance fix for Jeff Matlou (M017)...\n');
  
  // Get member data
  const { data: member, error: memberError } = await supabase
    .from('members')
    .select('*')
    .eq('member_number', 'M017')
    .single();
    
  if (memberError) {
    console.error('Error fetching member:', memberError);
    return;
  }
  
  console.log('Member found:', member.name);
  
  // Get balance data
  const { data: balanceData, error: balanceError } = await supabase
    .from('member_balances')
    .select('*')
    .eq('member_id', member.id)
    .single();
    
  if (balanceError) {
    console.log('No balance data found:', balanceError.message);
  } else {
    console.log('Balance data found');
    console.log('  savings_balance:', balanceData.savings_balance);
    console.log('  net_balance:', balanceData.net_balance);
    console.log('  loan_balance:', balanceData.loan_balance);
  }
  
  // Simulate the fixed logic from getAllMembers()
  const financialInfoData = member.financial_info || {};
  const outstandingAmount = (member.catch_up_fee || 0) + (financialInfoData.outstanding_amount || 0);
  
  // FIXED LOGIC: Use net_balance for currentBalance when available, otherwise use savings_balance
  const currentBalance = balanceData ? 
    (balanceData.net_balance !== undefined && balanceData.net_balance !== null ? 
      balanceData.net_balance : balanceData.savings_balance || 0) : 
    (member.financial_info && member.financial_info.current_balance !== undefined ? 
      member.financial_info.current_balance : 0);
  
  console.log('\n--- Calculated Values ---');
  console.log('Outstanding amount:', outstandingAmount);
  console.log('Current Balance (calculated):', currentBalance);
  console.log('Expected (from DB net_balance):', balanceData?.net_balance);
  console.log('Expected (from DB savings_balance):', balanceData?.savings_balance);
  
  // Test formatCurrency
  const formatCurrency = (amount) => {
    const safeAmount = amount || 0;
    return `R ${safeAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
  };
  
  console.log('\n--- FormatCurrency Test ---');
  console.log('Formatted current balance:', formatCurrency(currentBalance));
  console.log('Formatted -11699.64:', formatCurrency(-11699.64));
  
  // Also test Nicholas Molale
  console.log('\n\nTesting Nicholas Molale...');
  const { data: nicholas, error: nicholasError } = await supabase
    .from('members')
    .select('*')
    .or('name.ilike.%Nicholas Molale%')
    .single();
    
  if (nicholasError) {
    console.log('Nicholas Molale not found or error:', nicholasError.message);
  } else {
    console.log('Found:', nicholas.name);
    
    const { data: nicholasBalance, error: nicholasBalanceError } = await supabase
      .from('member_balances')
      .select('*')
      .eq('member_id', nicholas.id)
      .single();
      
    if (nicholasBalanceError) {
      console.log('No balance data for Nicholas');
    } else {
      const nicholasCurrentBalance = nicholasBalance ? 
        (nicholasBalance.net_balance !== undefined && nicholasBalance.net_balance !== null ? 
          nicholasBalance.net_balance : nicholasBalance.savings_balance || 0) : 
        (nicholas.financial_info && nicholas.financial_info.current_balance !== undefined ? 
          nicholas.financial_info.current_balance : 0);
      
      console.log('Nicholas net_balance:', nicholasBalance.net_balance);
      console.log('Nicholas currentBalance (calculated):', nicholasCurrentBalance);
      console.log('Formatted:', formatCurrency(nicholasCurrentBalance));
    }
  }
}

testMemberFix().catch(console.error);