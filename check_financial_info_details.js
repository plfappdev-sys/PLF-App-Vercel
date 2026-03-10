const { createClient } = require('@supabase/supabase-js');

async function checkFinancialInfoDetails() {
  console.log('Checking financial_info details in database...');
  
  const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAyNDQ4NCwiZXhwIjoyMDczNjAwNDg0fQ.kOpqoycVNdJXC-fqqxwHPVof6e8JlJ60_J7WWF-1AHU';
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    // Get all members with their financial info
    const { data: members, error } = await supabase
      .from('members')
      .select('member_number, name, financial_info');
    
    if (error) {
      console.error('Error fetching members:', error);
      return;
    }
    
    console.log(`\nFound ${members.length} members in database`);
    
    // Check what's actually in financial_info
    console.log('\nAnalyzing financial_info structure for first 5 members:');
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
      
      console.log(`\n${member.member_number}: ${member.name || 'No name'}`);
      console.log('financial_info keys:', Object.keys(financialInfo));
      console.log('financial_info values:', financialInfo);
      
      if (financialInfo.total_contributions !== undefined) {
        console.log(`total_contributions: R ${financialInfo.total_contributions}`);
      } else {
        console.log('total_contributions: NOT FOUND');
      }
    }
    
    // Now check all members for total_contributions
    console.log('\n' + '='.repeat(80));
    console.log('Checking all members for total_contributions field:');
    
    let membersWithContributions = 0;
    let membersWithoutContributions = 0;
    let totalContributions = 0;
    
    for (const member of members) {
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
      
      if (financialInfo.total_contributions !== undefined && financialInfo.total_contributions !== null) {
        membersWithContributions++;
        totalContributions += parseFloat(financialInfo.total_contributions);
      } else {
        membersWithoutContributions++;
      }
    }
    
    console.log(`Members WITH total_contributions: ${membersWithContributions}`);
    console.log(`Members WITHOUT total_contributions: ${membersWithoutContributions}`);
    console.log(`Total contributions sum: R ${totalContributions.toFixed(2)}`);
    
    // Check if there are other fields that might contain the Excel data
    console.log('\n' + '='.repeat(80));
    console.log('Looking for other potential contribution fields:');
    
    const sampleMember = members[0];
    let sampleFinancialInfo;
    
    if (typeof sampleMember.financial_info === 'string') {
      try {
        sampleFinancialInfo = JSON.parse(sampleMember.financial_info);
      } catch (e) {
        sampleFinancialInfo = {};
      }
    } else {
      sampleFinancialInfo = sampleMember.financial_info || {};
    }
    
    console.log('All keys in financial_info:', Object.keys(sampleFinancialInfo));
    
    // Check for Excel column names
    const excelColumnNames = ['total_contribution', 'contributions', 'total', 'bl', 'bk', 'column_bl', 'column_bk'];
    let foundExcelFields = [];
    
    for (const key of Object.keys(sampleFinancialInfo)) {
      const lowerKey = key.toLowerCase();
      for (const excelName of excelColumnNames) {
        if (lowerKey.includes(excelName)) {
          foundExcelFields.push(key);
          break;
        }
      }
    }
    
    if (foundExcelFields.length > 0) {
      console.log('Potential Excel data fields found:', foundExcelFields);
    } else {
      console.log('No obvious Excel data fields found in financial_info');
    }
    
  } catch (error) {
    console.error('Exception:', error);
  }
}

checkFinancialInfoDetails();