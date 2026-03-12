const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://zdnyhzasvifrskbostgn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAyNDQ4NCwiZXhwIjoyMDczNjAwNDg0fQ.kOpqoycVNdJXC-fqqxwHPVof6e8JlJ60_J7WWF-1AHU'
);

async function testLesegoExpectedContribution() {
  console.log('Testing Lesego Bokaba (M031) expected contribution...');
  
  try {
    // Get Lesego Bokaba's member data
    const { data: memberData, error } = await supabase
      .from('members')
      .select('*')
      .eq('member_number', 'M031')
      .single();
    
    if (error) {
      console.error('Error fetching member:', error);
      return;
    }
    
    console.log('Member found:', memberData.name);
    
    // Parse financial_info JSON
    let financialInfo = {};
    if (memberData.financial_info) {
      if (typeof memberData.financial_info === 'string') {
        try {
          financialInfo = JSON.parse(memberData.financial_info);
        } catch (e) {
          console.warn('Error parsing financial_info JSON:', e);
        }
      } else {
        financialInfo = memberData.financial_info;
      }
    }
    
    console.log('Expected contribution from database:', financialInfo.expected_contribution);
    console.log('Expected contribution type:', typeof financialInfo.expected_contribution);
    console.log('Full financial_info:', JSON.stringify(financialInfo, null, 2));
    
    // Also check a few other members to verify uniform 17400
    console.log('\nChecking a few other members for uniform 17400...');
    
    const { data: sampleMembers, error: sampleError } = await supabase
      .from('members')
      .select('member_number, name, financial_info')
      .in('member_number', ['M001', 'M004', 'M006', 'M010', 'M031'])
      .order('member_number');
    
    if (sampleError) {
      console.error('Error fetching sample members:', sampleError);
      return;
    }
    
    sampleMembers.forEach(member => {
      let finInfo = {};
      if (member.financial_info) {
        if (typeof member.financial_info === 'string') {
          try {
            finInfo = JSON.parse(member.financial_info);
          } catch (e) {
            // Ignore parse errors
          }
        } else {
          finInfo = member.financial_info;
        }
      }
      console.log(`${member.member_number}: ${member.name} - Expected: ${finInfo.expected_contribution || 'N/A'}`);
    });
    
  } catch (error) {
    console.error('Exception in test:', error);
  }
}

testLesegoExpectedContribution();