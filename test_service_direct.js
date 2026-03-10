// Test the actual service method
const { SupabaseMemberService } = require('./src/services/supabaseMemberService.ts');

async function testServiceDirect() {
  console.log('Testing SupabaseMemberService.getAllMembers() directly...\n');
  
  try {
    const members = await SupabaseMemberService.getAllMembers();
    console.log(`Service returned ${members.length} members\n`);
    
    // Find Nicholas Molale
    const nicholas = members.find(m => m.memberNumber === 'M041');
    if (nicholas) {
      console.log('=== NICHOLAS MOLALE (M041) from Service ===');
      console.log('Name:', nicholas.personalInfo?.fullName);
      console.log('Current Balance:', nicholas.financialInfo?.currentBalance);
      console.log('Financial Info:', JSON.stringify(nicholas.financialInfo, null, 2));
      
      // Check the formatCurrency function
      const formatCurrency = (amount) => {
        const safeAmount = amount || 0;
        return `R ${safeAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
      };
      
      console.log('\nFormatCurrency test:');
      console.log('Input:', nicholas.financialInfo?.currentBalance);
      console.log('Output:', formatCurrency(nicholas.financialInfo?.currentBalance));
      console.log('Expected: R -5,934.26');
    }
    
    // Find Jeff Matlou (M017)
    const jeff = members.find(m => m.memberNumber === 'M017');
    if (jeff) {
      console.log('\n=== JEFF MATLOU (M017) from Service ===');
      console.log('Name:', jeff.personalInfo?.fullName);
      console.log('Current Balance:', jeff.financialInfo?.currentBalance);
      console.log('FormatCurrency output:', formatCurrency(jeff.financialInfo?.currentBalance));
    }
    
    // Check all members with negative balances
    console.log('\n=== ALL MEMBERS WITH NEGATIVE BALANCES ===');
    const negativeMembers = members.filter(m => m.financialInfo?.currentBalance < 0);
    console.log(`Found ${negativeMembers.length} members with negative balances:`);
    
    negativeMembers.forEach(member => {
      console.log(`${member.memberNumber} - ${member.personalInfo?.fullName}: R ${member.financialInfo?.currentBalance?.toFixed(2)}`);
    });
    
  } catch (err) {
    console.error('Error:', err.message);
    console.error('Stack:', err.stack);
  }
}

// Since we can't directly import TypeScript, let me create a simpler test
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function testServiceLogic() {
  console.log('\n\nTesting service logic directly...\n');
  
  try {
    // Get all members
    const { data: members, error } = await supabase
      .from('members')
      .select('*');
    
    if (error) {
      console.error('Error:', error.message);
      return;
    }
    
    // Get all balances
    const { data: balances, error: balancesError } = await supabase
      .from('member_balances')
      .select('*');
    
    // Create lookup
    const balanceLookup = {};
    if (balances && Array.isArray(balances)) {
      balances.forEach(balance => {
        balanceLookup[balance.member_id] = balance;
      });
    }
    
    // Test the exact logic from getAllMembers()
    console.log('Testing the exact service logic for negative values:');
    
    members.forEach(member => {
      if (member.member_number === 'M041' || member.member_number === 'M017') {
        const balanceData = balanceLookup[member.id];
        
        // This is the exact logic from the service
        const currentBalance = balanceData ? 
          (balanceData.net_balance !== undefined && balanceData.net_balance !== null ? 
            balanceData.net_balance : balanceData.savings_balance || 0) : 
          (member.financial_info && member.financial_info.current_balance !== undefined ? 
            member.financial_info.current_balance : 0);
        
        console.log(`\n${member.member_number} - ${member.name}:`);
        console.log('  balanceData?.net_balance:', balanceData?.net_balance);
        console.log('  balanceData?.savings_balance:', balanceData?.savings_balance);
        console.log('  member.financial_info?.current_balance:', member.financial_info?.current_balance);
        console.log('  Service returns currentBalance:', currentBalance);
        
        // Test the formatCurrency function
        const formatCurrency = (amount) => {
          const safeAmount = amount || 0;
          return `R ${safeAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
        };
        
        console.log('  formatCurrency output:', formatCurrency(currentBalance));
        
        // Check if amount || 0 is the problem
        console.log('  Testing "amount || 0":');
        console.log('    amount =', currentBalance);
        console.log('    amount || 0 =', currentBalance || 0);
        console.log('    Is amount falsy?', !currentBalance);
        console.log('    Is amount 0?', currentBalance === 0);
        console.log('    Is amount < 0?', currentBalance < 0);
      }
    });
    
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testServiceLogic();