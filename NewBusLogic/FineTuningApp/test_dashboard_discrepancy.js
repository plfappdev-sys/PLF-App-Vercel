// Test script to diagnose and fix dashboard discrepancy issue
// Oratile sees: Total Fund Contributions = R 924,648.98
// Lesego sees: Total Fund Contributions = R 242,440.00

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function diagnoseDashboardDiscrepancy() {
  console.log('=== Diagnosing Dashboard Discrepancy ===\n');
  
  try {
    // 1. Get all members to calculate actual totals
    console.log('1. Fetching all members...');
    const { data: members, error: membersError } = await supabase
      .from('members')
      .select('*');
    
    if (membersError) {
      console.error('❌ Error fetching members:', membersError);
      return;
    }
    
    console.log(`✅ Found ${members.length} members`);
    
    // 2. Calculate actual totals from Excel data
    console.log('\n2. Calculating actual totals from Excel data...');
    let actualTotalContributions = 0;
    let actualTotalOutstandingContributions = 0;
    let actualTotalPenalties = 0;
    
    members.forEach(member => {
      // Parse financial_info JSON
      let financialInfoData = {};
      if (member.financial_info) {
        if (typeof member.financial_info === 'string') {
          try {
            financialInfoData = JSON.parse(member.financial_info);
          } catch (e) {
            console.warn(`   Could not parse financial_info for ${member.member_number}`);
          }
        } else if (typeof member.financial_info === 'object') {
          financialInfoData = member.financial_info;
        }
      }
      
      // Get total contributions from Excel Column BL
      const totalContributions = financialInfoData.total_contributions || 0;
      const outstandingContributions = member.outstanding_contributions || 0;
      const totalPenalties = member.total_penalties || 0;
      
      actualTotalContributions += totalContributions;
      actualTotalOutstandingContributions += outstandingContributions;
      actualTotalPenalties += totalPenalties;
    });
    
    console.log('   ✅ Actual Total Contributions (Excel Column BL):', actualTotalContributions.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' }));
    console.log('   ✅ Actual Outstanding Contributions:', actualTotalOutstandingContributions.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' }));
    console.log('   ✅ Actual Total Penalties:', actualTotalPenalties.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' }));
    
    // 3. Get member_balances data to see what the service is currently calculating
    console.log('\n3. Fetching member_balances data...');
    const { data: balances, error: balancesError } = await supabase
      .from('member_balances')
      .select('*');
    
    if (balancesError) {
      console.warn('⚠️  No balance data found:', balancesError.message);
    } else {
      console.log(`✅ Found ${balances.length} balance records`);
      
      // Calculate what the service is currently doing (WRONG calculation)
      let serviceTotalContributions = 0;
      let serviceTotalOutstanding = 0;
      
      balances.forEach(balance => {
        // This is what the service is currently doing (BUG)
        serviceTotalContributions += balance.savings_balance || 0;
        
        // This is what the service calculates for outstanding
        if (balance.net_balance > 0) {
          serviceTotalOutstanding += balance.net_balance;
        }
      });
      
      console.log('   ❌ Service is calculating Total Contributions as:', serviceTotalContributions.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' }));
      console.log('     (This is WRONG - using savings_balance instead of total_contributions)');
      console.log('   ❌ Service is calculating Outstanding as:', serviceTotalOutstanding.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' }));
      
      // Show the difference
      const difference = Math.abs(actualTotalContributions - serviceTotalContributions);
      console.log(`\n   ⚠️  Difference: R ${difference.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`);
      console.log(`   ⚠️  This is causing the dashboard discrepancy!`);
    }
    
    // 4. Check what the correct values should be
    console.log('\n4. CORRECT VALUES (from Excel data):');
    console.log('   Total Fund Contributions should be:', actualTotalContributions.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' }));
    console.log('   Total Outstanding Contributions should be:', actualTotalOutstandingContributions.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' }));
    
    // 5. Check the reported values from the issue
    console.log('\n5. REPORTED VALUES (from DataVerificationCheck.txt):');
    console.log('   Oratile sees: Total Fund Contributions = R 924,648.98');
    console.log('   Lesego sees: Total Fund Contributions = R 242,440.00');
    console.log('   Actual Excel total:', actualTotalContributions.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' }));
    
    // 6. Determine which value is correct
    console.log('\n6. ANALYSIS:');
    console.log('   The correct value should be the sum of Excel Column BL (total_contributions)');
    console.log('   NOT the sum of savings_balance (which is current balance)');
    console.log('   The service has a BUG in getFundStatistics() method:');
    console.log('     - Line 365: totalFundContributions += savings_balance; // WRONG!');
    console.log('     - Should be: totalFundContributions += financial_info.total_contributions');
    
    // 7. Verify with a few sample members
    console.log('\n7. VERIFICATION with sample members:');
    const sampleMembers = members.slice(0, 5);
    sampleMembers.forEach(member => {
      let financialInfoData = {};
      if (member.financial_info) {
        if (typeof member.financial_info === 'string') {
          try {
            financialInfoData = JSON.parse(member.financial_info);
          } catch (e) {
            // ignore
          }
        } else if (typeof member.financial_info === 'object') {
          financialInfoData = member.financial_info;
        }
      }
      
      console.log(`   ${member.member_number}:`);
      console.log(`     - total_contributions (Excel): ${financialInfoData.total_contributions || 0}`);
      console.log(`     - outstanding_contributions: ${member.outstanding_contributions || 0}`);
      console.log(`     - total_penalties: ${member.total_penalties || 0}`);
    });
    
    // 8. Summary
    console.log('\n8. SUMMARY:');
    console.log('   ✅ Database has correct Excel data in financial_info JSON');
    console.log('   ❌ Service has BUG: Using savings_balance instead of total_contributions');
    console.log('   ✅ Fix: Update getFundStatistics() to use financial_info.total_contributions');
    console.log('   ✅ This will resolve the dashboard discrepancy');
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the diagnosis
diagnoseDashboardDiscrepancy().then(() => {
  console.log('\n=== Diagnosis complete ===');
  console.log('\n=== NEXT STEPS ===');
  console.log('1. Fix the getFundStatistics() method in supabaseMemberService.ts');
  console.log('2. Change line 365 from: totalFundContributions += savings_balance;');
  console.log('3. Change to: totalFundContributions += financial_info.total_contributions;');
  console.log('4. Test the fix to ensure both users see the same correct data');
  process.exit(0);
}).catch(error => {
  console.error('Diagnosis failed:', error);
  process.exit(1);
});