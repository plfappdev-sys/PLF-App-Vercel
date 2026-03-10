const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function testBalanceDisplay() {
  console.log('Testing balance display for negative balances...\n');
  
  try {
    // Get all members with their balances
    const { data: members, error } = await supabase
      .from('members')
      .select('*');
    
    if (error) {
      console.error('Error fetching members:', error.message);
      return;
    }
    
    // Get all member balances
    const { data: balances, error: balancesError } = await supabase
      .from('member_balances')
      .select('*');
    
    if (balancesError) {
      console.warn('Error fetching member balances:', balancesError.message);
    }
    
    // Create a lookup for balances by member_id
    const balanceLookup = {};
    if (balances && Array.isArray(balances)) {
      balances.forEach(balance => {
        balanceLookup[balance.member_id] = balance;
      });
    }
    
    console.log(`Found ${members.length} members in database\n`);
    
    // Check Nicholas Molale specifically
    const nicholas = members.find(m => m.member_number === 'M041');
    if (nicholas) {
      console.log('=== NICHOLAS MOLALE (M041) ===');
      console.log('Name:', nicholas.name);
      console.log('Closing Balance in members table:', nicholas.closing_balance);
      console.log('Financial Info current_balance:', nicholas.financial_info?.current_balance);
      
      const balanceData = balanceLookup[nicholas.id];
      console.log('Balance Data from member_balances:');
      console.log('  Net Balance:', balanceData?.net_balance);
      console.log('  Savings Balance:', balanceData?.savings_balance);
      console.log('  Loan Balance:', balanceData?.loan_balance);
      
      // Simulate what the service does
      const currentBalance = balanceData ? 
        (balanceData.net_balance !== undefined && balanceData.net_balance !== null ? 
          balanceData.net_balance : balanceData.savings_balance || 0) : 
        (nicholas.financial_info && nicholas.financial_info.current_balance !== undefined ? 
          nicholas.financial_info.current_balance : 0);
      
      console.log('\nService would return currentBalance:', currentBalance);
      
      // Format as the frontend would
      const formatCurrency = (amount) => {
        const safeAmount = amount || 0;
        return `R ${safeAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
      };
      
      console.log('Formatted for display:', formatCurrency(currentBalance));
      console.log('Expected: R -5,934.26\n');
    }
    
    // Find all members with negative balances
    console.log('=== ALL MEMBERS WITH NEGATIVE BALANCES ===');
    let negativeCount = 0;
    
    members.forEach(member => {
      const balance = balanceLookup[member.id];
      const memberBalance = balance ? 
        (balance.net_balance !== undefined && balance.net_balance !== null ? 
          balance.net_balance : balance.savings_balance || 0) : 
        (member.financial_info && member.financial_info.current_balance !== undefined ? 
          member.financial_info.current_balance : 0);
      
      if (memberBalance < 0) {
        negativeCount++;
        const name = member.name || member.personal_info?.fullName || `Member ${member.member_number}`;
        console.log(`${member.member_number} - ${name}: R ${memberBalance.toFixed(2)}`);
      }
    });
    
    console.log(`\nTotal members with negative balances: ${negativeCount}`);
    
    // Check Jeff Matlou (M001) as mentioned in the issue
    const jeff = members.find(m => m.member_number === 'M001');
    if (jeff) {
      console.log('\n=== JEFF MATLOU (M001) ===');
      console.log('Name:', jeff.name);
      
      const balanceData = balanceLookup[jeff.id];
      console.log('Balance Data from member_balances:');
      console.log('  Net Balance:', balanceData?.net_balance);
      console.log('  Savings Balance:', balanceData?.savings_balance);
      console.log('  Loan Balance:', balanceData?.loan_balance);
      
      const currentBalance = balanceData ? 
        (balanceData.net_balance !== undefined && balanceData.net_balance !== null ? 
          balanceData.net_balance : balanceData.savings_balance || 0) : 
        (jeff.financial_info && jeff.financial_info.current_balance !== undefined ? 
          jeff.financial_info.current_balance : 0);
      
      console.log('Service would return currentBalance:', currentBalance);
      
      const formatCurrency = (amount) => {
        const safeAmount = amount || 0;
        return `R ${safeAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
      };
      
      console.log('Formatted for display:', formatCurrency(currentBalance));
    }
    
  } catch (err) {
    console.error('Exception:', err.message);
  }
}

testBalanceDisplay();