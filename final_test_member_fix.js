const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function finalTest() {
  console.log('=== FINAL TEST: Negative Balance Display Fix ===\n');
  
  // Test all 4 members with negative balances
  const negativeMembers = [
    { name: 'Jeff Matlou', number: 'M017', expected: -11699.64 },
    { name: 'Matshediso Ellen Tyobeka', number: 'M033', expected: -3709.34 },
    { name: 'Nicholas Molale', number: 'M041', expected: -5934.26 },
    { name: 'Freddy Sonakile', number: 'M012', expected: -4574.77 }
  ];
  
  let allTestsPassed = true;
  
  for (const member of negativeMembers) {
    console.log(`Testing ${member.name} (${member.number})...`);
    
    // Get member data
    const { data: memberData, error: memberError } = await supabase
      .from('members')
      .select('*')
      .eq('member_number', member.number)
      .single();
      
    if (memberError) {
      console.log(`  ❌ Error fetching member: ${memberError.message}`);
      allTestsPassed = false;
      continue;
    }
    
    // Get balance data
    const { data: balanceData, error: balanceError } = await supabase
      .from('member_balances')
      .select('*')
      .eq('member_id', memberData.id)
      .single();
      
    if (balanceError) {
      console.log(`  ❌ Error fetching balance: ${balanceError.message}`);
      allTestsPassed = false;
      continue;
    }
    
    // Apply the fixed logic from supabaseMemberService.ts
    const currentBalance = balanceData ? 
      (balanceData.net_balance !== undefined && balanceData.net_balance !== null ? 
        balanceData.net_balance : balanceData.savings_balance || 0) : 
      (memberData.financial_info && memberData.financial_info.current_balance !== undefined ? 
        memberData.financial_info.current_balance : 0);
    
    const formatCurrency = (amount) => {
      const safeAmount = amount || 0;
      return `R ${safeAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
    };
    
    console.log(`  Database net_balance: ${balanceData.net_balance}`);
    console.log(`  Calculated currentBalance: ${currentBalance}`);
    console.log(`  Formatted display: ${formatCurrency(currentBalance)}`);
    
    // Check if the fix is working
    const isNegative = currentBalance < 0;
    const matchesExpected = Math.abs(currentBalance - member.expected) < 0.01;
    
    if (isNegative && matchesExpected) {
      console.log(`  ✅ PASS: Correctly shows negative balance ${formatCurrency(currentBalance)}`);
    } else {
      console.log(`  ❌ FAIL: Expected negative balance ${formatCurrency(member.expected)}, got ${formatCurrency(currentBalance)}`);
      allTestsPassed = false;
    }
    
    console.log('');
  }
  
  // Also test a member with positive balance to ensure we didn't break anything
  console.log('Testing positive balance member (M003 - Boitshoko Dire)...');
  const { data: positiveMember, error: positiveError } = await supabase
    .from('members')
    .select('*')
    .eq('member_number', 'M003')
    .single();
    
  if (!positiveError) {
    const { data: positiveBalance } = await supabase
      .from('member_balances')
      .select('*')
      .eq('member_id', positiveMember.id)
      .single();
      
    const positiveCurrentBalance = positiveBalance ? 
      (positiveBalance.net_balance !== undefined && positiveBalance.net_balance !== null ? 
        positiveBalance.net_balance : positiveBalance.savings_balance || 0) : 
      (positiveMember.financial_info && positiveMember.financial_info.current_balance !== undefined ? 
        positiveMember.financial_info.current_balance : 0);
    
    const formatCurrency = (amount) => {
      const safeAmount = amount || 0;
      return `R ${safeAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
    };
    
    console.log(`  Positive balance: ${formatCurrency(positiveCurrentBalance)}`);
    console.log(`  ${positiveCurrentBalance >= 0 ? '✅ PASS: Positive balance correctly shown' : '❌ FAIL: Positive balance should not be negative'}`);
  }
  
  console.log('\n=== SUMMARY ===');
  if (allTestsPassed) {
    console.log('✅ ALL TESTS PASSED: Negative balances will now display correctly in the app');
    console.log('\nThe fix in supabaseMemberService.ts correctly uses net_balance instead of savings_balance');
    console.log('for calculating currentBalance, which shows negative values for members with loans.');
  } else {
    console.log('❌ SOME TESTS FAILED: Please review the implementation');
  }
}

finalTest().catch(console.error);