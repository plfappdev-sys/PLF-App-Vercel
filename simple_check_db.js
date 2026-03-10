const { createClient } = require('@supabase/supabase-js');

async function checkDatabase() {
  console.log('Checking database contributions...');
  
  // Use the environment variables from .env
  const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAyNDQ4NCwiZXhwIjoyMDczNjAwNDg0fQ.kOpqoycVNdJXC-fqqxwHPVof6e8JlJ60_J7WWF-1AHU';
  
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
    
    console.log('\nFirst 5 members:');
    for (let i = 0; i < Math.min(5, members.length); i++) {
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
      
      console.log(`${member.member_number}: ${member.name || 'No name'} - Contributions: R ${contributions.toFixed(2)}`);
      
      totalContributions += contributions;
      totalOutstandingContributions += outstanding;
      totalPenalties += penalties;
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('DATABASE TOTALS:');
    console.log(`Total Contributions (from financial_info.total_contributions): R ${totalContributions.toFixed(2)}`);
    console.log(`Total Outstanding Contributions: R ${totalOutstandingContributions.toFixed(2)}`);
    console.log(`Total Penalties: R ${totalPenalties.toFixed(2)}`);
    
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
    
    // Check if database has R 242,440.00
    console.log(`\nIs database showing R 242,440.00? ${Math.abs(totalContributions - 242440) < 0.01 ? 'YES' : 'NO'}`);
    
  } catch (error) {
    console.error('Exception:', error);
  }
}

checkDatabase();