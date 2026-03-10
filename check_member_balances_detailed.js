const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkMemberDetails() {
  console.log('Checking detailed member information for Jeff Matlou (M017)...');
  
  // First get the member to get their ID
  const { data: member, error: memberError } = await supabase
    .from('members')
    .select('*')
    .eq('member_number', 'M017')
    .single();
    
  if (memberError) {
    console.error('Error fetching member:', memberError);
    return;
  }
  
  console.log('\n--- Member Details ---');
  console.log('ID:', member.id);
  console.log('Member Number:', member.member_number);
  console.log('Name:', member.name);
  console.log('Financial Info:', JSON.stringify(member.financial_info, null, 2));
  console.log('Catch Up Fee:', member.catch_up_fee);
  
  // Now check member_balances table
  console.log('\n--- Checking member_balances table ---');
  const { data: balance, error: balanceError } = await supabase
    .from('member_balances')
    .select('*')
    .eq('member_id', member.id)
    .single();
    
  if (balanceError) {
    console.log('No balance record found in member_balances table:', balanceError.message);
  } else {
    console.log('Balance record:', JSON.stringify(balance, null, 2));
  }
  
  // Also check what the service would return
  console.log('\n--- What the service would return ---');
  const financialInfo = member.financial_info ? {
    totalContributions: member.financial_info.total_contributions || 0,
    currentBalance: member.financial_info.current_balance || 0,
    outstandingAmount: member.financial_info.outstanding_amount || 0,
    percentageOutstanding: member.financial_info.percentage_outstanding || 0,
    balanceBroughtForward: member.financial_info.balance_brought_forward || 0,
    plannedContributions: member.financial_info.planned_contributions || 0,
    actualContributions: member.financial_info.actual_contributions || 0,
    currentInterestEarned: member.financial_info.current_interest_earned || 0,
    totalInterestEarned: member.financial_info.total_interest_earned || 0,
    currentInterestCharged: member.financial_info.current_interest_charged || 0,
    totalInterestCharged: member.financial_info.total_interest_charged || 0,
    lastInterestCalculation: member.financial_info.last_interest_calculation ? new Date(member.financial_info.last_interest_calculation) : new Date(),
    interestRate: member.financial_info.interest_rate || 0
  } : {
    totalContributions: 0,
    currentBalance: 0,
    outstandingAmount: 0,
    percentageOutstanding: 0,
    balanceBroughtForward: 0,
    plannedContributions: 0,
    actualContributions: 0,
    currentInterestEarned: 0,
    totalInterestEarned: 0,
    currentInterestCharged: 0,
    totalInterestCharged: 0,
    lastInterestCalculation: new Date(),
    interestRate: 0
  };
  
  console.log('Financial Info (converted):', JSON.stringify(financialInfo, null, 2));
  console.log('Current Balance from DB:', member.financial_info?.current_balance);
  console.log('Current Balance after conversion:', financialInfo.currentBalance);
  
  // Test the formatCurrency function
  console.log('\n--- Testing formatCurrency function ---');
  const formatCurrency = (amount) => {
    const safeAmount = amount || 0;
    return `R ${safeAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
  };
  
  console.log('formatCurrency(-11699.64):', formatCurrency(-11699.64));
  console.log('formatCurrency(0):', formatCurrency(0));
  console.log('formatCurrency(1000):', formatCurrency(1000));
}

checkMemberDetails().catch(console.error);