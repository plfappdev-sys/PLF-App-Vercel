const { createClient } = require('@supabase/supabase-js');

// Use the same values from src/config/supabase.ts
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkExcelDataInDB() {
  console.log('Checking if Excel data exists in database...\n');
  
  try {
    // Get all members with their financial data
    console.log('Fetching all members with financial data...');
    const { data: members, error } = await supabase
      .from('members')
      .select(`
        member_number,
        name,
        expected_contribution_total,
        penalties_capped,
        catch_up_fee,
        closing_balance,
        monthly_contribution,
        financial_info
      `)
      .order('member_number');
    
    if (error) {
      console.error('Error fetching members:', error);
      return;
    }
    
    if (!members || members.length === 0) {
      console.log('No members found in database');
      return;
    }
    
    console.log(`Found ${members.length} members in database\n`);
    
    // Calculate totals
    let totalExpectedContributions = 0;
    let totalPenalties = 0;
    let totalCatchUpFees = 0;
    let totalClosingBalance = 0;
    let totalActualContributions = 0;
    let totalOutstandingAmount = 0;
    
    console.log('First 10 members with financial data:');
    console.log('='.repeat(120));
    console.log('Member# | Name                          | Expected | Penalties | CatchUp | Closing | Actual | Outstanding');
    console.log('='.repeat(120));
    
    members.slice(0, 10).forEach(member => {
      const expected = member.expected_contribution_total || 0;
      const penalties = member.penalties_capped || 0;
      const catchUp = member.catch_up_fee || 0;
      const closing = member.closing_balance || 0;
      
      // Extract from financial_info
      const finInfo = member.financial_info || {};
      const actual = finInfo.actual_contributions || finInfo.total_contributions || 0;
      const outstanding = finInfo.outstanding_amount || 0;
      
      totalExpectedContributions += expected;
      totalPenalties += penalties;
      totalCatchUpFees += catchUp;
      totalClosingBalance += closing;
      totalActualContributions += actual;
      totalOutstandingAmount += outstanding;
      
      console.log(
        `${member.member_number.padEnd(7)} | ${(member.name || '').padEnd(30).substring(0, 30)} | ` +
        `${expected.toString().padStart(8)} | ${penalties.toString().padStart(9)} | ` +
        `${catchUp.toString().padStart(7)} | ${closing.toString().padStart(7)} | ` +
        `${actual.toString().padStart(6)} | ${outstanding.toString().padStart(10)}`
      );
    });
    
    if (members.length > 10) {
      console.log(`... and ${members.length - 10} more members`);
    }
    
    console.log('='.repeat(120));
    console.log('\nTOTALS:');
    console.log(`Total Expected Contributions: R ${totalExpectedContributions.toFixed(2)}`);
    console.log(`Total Penalties: R ${totalPenalties.toFixed(2)}`);
    console.log(`Total Catch-up Fees: R ${totalCatchUpFees.toFixed(2)}`);
    console.log(`Total Closing Balance: R ${totalClosingBalance.toFixed(2)}`);
    console.log(`Total Actual Contributions: R ${totalActualContributions.toFixed(2)}`);
    console.log(`Total Outstanding Amount: R ${totalOutstandingAmount.toFixed(2)}`);
    
    // Calculate what we need for the app
    console.log('\nCALCULATIONS FOR APP:');
    console.log(`1. Total Fund Contributions (Column G): R ${totalActualContributions.toFixed(2)}`);
    console.log(`2. Total Outstanding Contributions (Column H): R ${totalOutstandingAmount.toFixed(2)}`);
    console.log(`3. Total Penalties (Column L): R ${totalPenalties.toFixed(2)}`);
    console.log(`4. Total Outstanding + Penalties: R ${(totalOutstandingAmount + totalPenalties).toFixed(2)}`);
    
    // Check if we have the specific members mentioned in the requirements
    console.log('\n\nCHECKING SPECIFIC MEMBERS MENTIONED IN REQUIREMENTS:');
    const specificMembers = ['M017', 'M041']; // Jeff Matlou and Nicholas Molale
    
    for (const memberNumber of specificMembers) {
      const member = members.find(m => m.member_number === memberNumber);
      if (member) {
        console.log(`\n${member.member_number} - ${member.name}:`);
        console.log(`  Expected Contribution Total: R ${member.expected_contribution_total || 0}`);
        console.log(`  Penalties Capped: R ${member.penalties_capped || 0}`);
        console.log(`  Catch-up Fee: R ${member.catch_up_fee || 0}`);
        console.log(`  Closing Balance: R ${member.closing_balance || 0}`);
        
        const finInfo = member.financial_info || {};
        console.log(`  Financial Info:`);
        console.log(`    Actual Contributions: R ${finInfo.actual_contributions || finInfo.total_contributions || 0}`);
        console.log(`    Outstanding Amount: R ${finInfo.outstanding_amount || 0}`);
        console.log(`    Current Balance: R ${finInfo.current_balance || 0}`);
        console.log(`    Percentage Outstanding: ${finInfo.percentage_outstanding || 0}%`);
      } else {
        console.log(`\n${memberNumber}: NOT FOUND in database`);
      }
    }
    
    // Check for members with negative balances
    console.log('\n\nMEMBERS WITH NEGATIVE BALANCES (Good Standing):');
    const membersWithNegativeBalances = members.filter(member => {
      const finInfo = member.financial_info || {};
      const currentBalance = finInfo.current_balance || 0;
      return currentBalance < 0;
    });
    
    console.log(`Found ${membersWithNegativeBalances.length} members with negative balances:`);
    membersWithNegativeBalances.forEach(member => {
      const finInfo = member.financial_info || {};
      console.log(`  ${member.member_number} - ${member.name}: R ${finInfo.current_balance || 0}`);
    });
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

checkExcelDataInDB().then(() => {
  console.log('\n\nExcel data check completed.');
  process.exit(0);
}).catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});