// Script to check financial data of members in the database
const { supabase } = require('./supabase.config');

async function checkFinancialData() {
  console.log('💰 Checking financial data in database...');
  
  try {
    // Check a few sample members to see their financial data
    const sampleMembers = [6, 24, 25, 54, 55, 66, 1, 10, 50]; // Mix of members with and without financial data
    
    for (const memberNumber of sampleMembers) {
      const { data: member, error } = await supabase
        .from('members')
        .select('member_number, personal_info, financial_info, membership_status')
        .eq('member_number', memberNumber.toString())
        .single();

      if (error) {
        console.log(`❌ Error fetching member ${memberNumber}:`, error.message);
        continue;
      }

      console.log(`\n📊 Member ${memberNumber}:`);
      console.log(`   Name: ${member.personal_info?.fullName || 'Unknown Name'}`);
      console.log(`   Current Balance: R ${member.financial_info?.current_balance || 0}`);
      console.log(`   Total Contributions: R ${member.financial_info?.total_contributions || 0}`);
      console.log(`   Outstanding Amount: R ${member.financial_info?.outstanding_amount || 0}`);
      console.log(`   Standing: ${member.membership_status?.standingCategory || 'unknown'}`);
    }

    // Also check total fund statistics
    console.log('\n📈 Checking fund statistics...');
    const { data: members, error: statsError } = await supabase
      .from('members')
      .select('financial_info');

    if (statsError) {
      console.log('❌ Error fetching fund statistics:', statsError.message);
      return;
    }

    let totalFundValue = 0;
    let totalContributions = 0;
    let membersWithFinancialData = 0;

    members.forEach(member => {
      const balance = member.financial_info?.current_balance || 0;
      const contributions = member.financial_info?.total_contributions || 0;
      
      totalFundValue += balance;
      totalContributions += contributions;
      
      if (balance > 0 || contributions > 0) {
        membersWithFinancialData++;
      }
    });

    console.log(`   Total Fund Value: R ${totalFundValue}`);
    console.log(`   Total Contributions: R ${totalContributions}`);
    console.log(`   Members with financial data: ${membersWithFinancialData}/${members.length}`);
    console.log(`   Members without financial data: ${members.length - membersWithFinancialData}/${members.length}`);

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

// Run the check
checkFinancialData().catch(console.error);
