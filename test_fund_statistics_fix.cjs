// Test script to check if getFundStatistics() works correctly
const { SupabaseMemberService } = require('./src/services/supabaseMemberService');

async function testFundStatistics() {
  console.log('Testing getFundStatistics() method...\n');

  try {
    const statistics = await SupabaseMemberService.getFundStatistics();
    
    console.log('Fund Statistics Results:');
    console.log('=======================');
    console.log(`Total Members: ${statistics.totalMembers}`);
    console.log(`Total Fund Value: R ${statistics.totalFundValue.toFixed(2)}`);
    console.log(`Total Loans Outstanding: R ${statistics.totalLoansOutstanding.toFixed(2)}`);
    console.log(`Total Contributions This Month: R ${statistics.totalContributionsThisMonth.toFixed(2)}`);
    
    console.log('\nMembers by Standing:');
    console.log(`  Good: ${statistics.membersByStanding.good}`);
    console.log(`  Owing 10%: ${statistics.membersByStanding.owing_10}`);
    console.log(`  Owing 20%: ${statistics.membersByStanding.owing_20}`);
    console.log(`  Owing 30%: ${statistics.membersByStanding.owing_30}`);
    console.log(`  Owing 50%: ${statistics.membersByStanding.owing_50}`);
    console.log(`  Owing 65%: ${statistics.membersByStanding.owing_65}`);
    console.log(`  Owing 65%+: ${statistics.membersByStanding.owing_65_plus}`);
    
    console.log('\nAnalysis:');
    if (statistics.totalFundValue === 0) {
      console.log('❌ PROBLEM: Total Fund Value is R 0.00');
      console.log('   This is what Lesego is seeing on the dashboard');
      console.log('   The method is returning zero values');
    } else {
      console.log(`✅ SUCCESS: Total Fund Value is R ${statistics.totalFundValue.toFixed(2)}`);
      console.log('   This should show correctly on the dashboard');
      console.log('   The fix is working!');
    }
    
    // Also test with our direct calculation for comparison
    console.log('\nDirect Calculation for Comparison:');
    console.log('==================================');
    
    const { createClient } = require('@supabase/supabase-js');
    const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    const { data: members, error } = await supabase
      .from('members')
      .select('financial_info');
    
    if (error) {
      console.log(`❌ Error fetching members: ${error.message}`);
    } else {
      let totalFundValue = 0;
      members.forEach(member => {
        if (member.financial_info) {
          const financialInfo = member.financial_info;
          const currentBalance = financialInfo.current_balance || 0;
          totalFundValue += currentBalance;
        }
      });
      
      console.log(`Direct calculation from database: R ${totalFundValue.toFixed(2)}`);
      console.log(`Service method result: R ${statistics.totalFundValue.toFixed(2)}`);
      
      if (Math.abs(totalFundValue - statistics.totalFundValue) < 0.01) {
        console.log('✅ Values match! The service is calculating correctly.');
      } else {
        console.log(`❌ Values don't match! Service: ${statistics.totalFundValue}, Direct: ${totalFundValue}`);
        console.log('   There might be an issue with the calculation logic.');
      }
    }
    
  } catch (error) {
    console.error('❌ Exception in test:', error);
    console.error('Stack trace:', error.stack);
  }
}

// Run the test
testFundStatistics();
