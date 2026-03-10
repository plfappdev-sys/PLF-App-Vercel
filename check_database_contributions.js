const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function checkDatabaseContributions() {
  console.log('Checking database contributions...');
  
  // Get Supabase URL and key from environment
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    return;
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    // Get all members with their financial info
    const { data: members, error } = await supabase
      .from('members')
      .select('member_number, name, financial_info, outstanding_contributions, total_penalties');
    
    if (error) {
      console.error('Error fetching members:', error);
      return;
    }
    
    console.log(`\nFound ${members.length} members in database`);
    
    // Calculate totals
    let totalContributions = 0;
    let totalOutstandingContributions = 0;
    let totalPenalties = 0;
    
    console.log('\nFirst 10 members:');
    for (let i = 0; i < Math.min(10, members.length); i++) {
      const member = members[i];
      let financialInfo;
      
      if (typeof member.financial_info === 'string') {
        try {
          financialInfo = JSON.parse(member.financial_info);
        } catch (e) {
          financialInfo = {};
        }
      } else {
        financialInfo = member.financial_info || {};
      }
      
      const contributions = financialInfo.total_contributions || 0;
      const outstanding = member.outstanding_contributions || 0;
      const penalties = member.total_penalties || 0;
      
      console.log(`${member.member_number}: ${member.name || 'No name'} - Contributions: R ${contributions.toFixed(2)}, Outstanding: R ${outstanding.toFixed(2)}, Penalties: R ${penalties.toFixed(2)}`);
      
      totalContributions += contributions;
      totalOutstandingContributions += outstanding;
      totalPenalties += penalties;
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('DATABASE TOTALS:');
    console.log(`Total Contributions (from financial_info.total_contributions): R ${totalContributions.toFixed(2)}`);
    console.log(`Total Outstanding Contributions: R ${totalOutstandingContributions.toFixed(2)}`);
    console.log(`Total Penalties: R ${totalPenalties.toFixed(2)}`);
    console.log(`Total Outstanding (contributions + penalties): R ${(totalOutstandingContributions + totalPenalties).toFixed(2)}`);
    
    // Compare with Excel
    console.log('\n' + '='.repeat(80));
    console.log('COMPARISON WITH EXCEL:');
    console.log(`Excel Column BL (rows 1-66): R 525,338.89`);
    console.log(`Database total contributions: R ${totalContributions.toFixed(2)}`);
    console.log(`Difference: R ${(totalContributions - 525338.89).toFixed(2)}`);
    
    if (Math.abs(totalContributions - 525338.89) < 0.01) {
      console.log('✓ Database matches Excel!');
    } else {
      console.log('✗ Database does NOT match Excel');
    }
    
    console.log(`\nExcel Column BK (rows 1-66): R 54,750.00`);
    console.log(`Excel Total (BL + BK): R 580,088.89`);
    
    // Check what the application currently shows
    console.log('\n' + '='.repeat(80));
    console.log('APPLICATION CURRENTLY SHOWS:');
    console.log(`Total Fund Contributions: R 242,440.00`);
    console.log(`Difference from Excel: R ${(242440 - 525338.89).toFixed(2)}`);
    
    // Let's also check member_balances table
    console.log('\n' + '='.repeat(80));
    console.log('Checking member_balances table...');
    
    const { data: balances, error: balancesError } = await supabase
      .from('member_balances')
      .select('member_id, savings_balance, net_balance');
    
    if (balancesError) {
      console.error('Error fetching balances:', balancesError);
    } else {
      console.log(`Found ${balances.length} balance records`);
      
      let totalSavingsBalance = 0;
      let totalNetBalance = 0;
      
      balances.forEach(balance => {
        totalSavingsBalance += balance.savings_balance || 0;
        totalNetBalance += balance.net_balance || 0;
      });
      
      console.log(`Total savings_balance: R ${totalSavingsBalance.toFixed(2)}`);
      console.log(`Total net_balance: R ${totalNetBalance.toFixed(2)}`);
      
      // This might explain the R 242,440.00 if it's using savings_balance instead of contributions
      console.log(`\nNote: If application is using savings_balance instead of contributions,`);
      console.log(`it would show approximately R ${totalSavingsBalance.toFixed(2)}`);
    }
    
  } catch (error) {
    console.error('Exception:', error);
  }
}

checkDatabaseContributions();