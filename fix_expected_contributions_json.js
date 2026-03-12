const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with service role key
const supabase = createClient(
  'https://zdnyhzasvifrskbostgn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAyNDQ4NCwiZXhwIjoyMDczNjAwNDg0fQ.kOpqoycVNdJXC-fqqxwHPVof6e8JlJ60_J7WWF-1AHU'
);

async function fixExpectedContributionsInJson() {
  console.log('=== Fixing Expected Contributions in JSON Field ===\n');
  
  try {
    // 1. Get all members
    console.log('1. Fetching all members...');
    const { data: members, error: fetchError } = await supabase
      .from('members')
      .select('id, member_number, name, financial_info')
      .order('member_number');
    
    if (fetchError) {
      console.error('Error fetching members:', fetchError);
      return;
    }
    
    console.log(`Found ${members.length} members`);
    
    // 2. Process each member
    console.log('\n2. Processing members...');
    let updatedCount = 0;
    let errorCount = 0;
    
    for (const member of members) {
      try {
        // Parse current financial_info
        let financialInfo = {};
        if (member.financial_info) {
          if (typeof member.financial_info === 'string') {
            try {
              financialInfo = JSON.parse(member.financial_info);
            } catch (e) {
              console.warn(`Error parsing JSON for ${member.member_number}:`, e.message);
              financialInfo = {};
            }
          } else {
            financialInfo = member.financial_info;
          }
        }
        
        // Check current expected contribution
        const currentExpected = financialInfo.expected_contribution;
        
        // Update to 17400 if different
        if (currentExpected !== 17400) {
          // Update the financial_info JSON
          const updatedFinancialInfo = {
            ...financialInfo,
            expected_contribution: 17400,
            last_expected_contribution_update: new Date().toISOString(),
            expected_contribution_details: {
              total_months: 83,
              period1_months: 60, // R200 × 60 months = R12,000
              period2_months: 23, // R250 × 23 months = R5,750
              total: 17400,
              note: 'Uniform expected contribution for all members'
            }
          };
          
          // Update the member record
          const { error: updateError } = await supabase
            .from('members')
            .update({
              financial_info: updatedFinancialInfo,
              last_updated: new Date().toISOString()
            })
            .eq('id', member.id);
          
          if (updateError) {
            console.error(`Error updating ${member.member_number}:`, updateError.message);
            errorCount++;
          } else {
            console.log(`✓ Updated ${member.member_number}: ${member.name} from ${currentExpected || 'N/A'} to 17400`);
            updatedCount++;
          }
        } else {
          console.log(`✓ ${member.member_number}: ${member.name} already has 17400`);
        }
        
      } catch (error) {
        console.error(`Error processing ${member.member_number}:`, error.message);
        errorCount++;
      }
    }
    
    // 3. Verify the update
    console.log('\n3. Verifying updates...');
    const { data: verificationData, error: verificationError } = await supabase
      .from('members')
      .select('member_number, name, financial_info')
      .order('member_number')
      .limit(10);
    
    if (verificationError) {
      console.error('Error verifying updates:', verificationError);
    } else {
      console.log('\nSample of updated members:');
      verificationData.forEach(member => {
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
        console.log(`  ${member.member_number}: ${member.name} - Expected: ${finInfo.expected_contribution || 'N/A'}`);
      });
    }
    
    // 4. Check Lesego specifically
    console.log('\n4. Checking Lesego Bokaba...');
    const { data: lesegoData, error: lesegoError } = await supabase
      .from('members')
      .select('member_number, name, financial_info')
      .eq('member_number', 'M031')
      .single();
    
    if (lesegoError) {
      console.error('Error checking Lesego:', lesegoError);
    } else if (lesegoData) {
      let finInfo = {};
      if (lesegoData.financial_info) {
        if (typeof lesegoData.financial_info === 'string') {
          try {
            finInfo = JSON.parse(lesegoData.financial_info);
          } catch (e) {
            // Ignore parse errors
          }
        } else {
          finInfo = lesegoData.financial_info;
        }
      }
      console.log(`  ${lesegoData.member_number}: ${lesegoData.name} - Expected: ${finInfo.expected_contribution || 'N/A'}`);
    }
    
    // 5. Summary
    console.log('\n=== Summary ===');
    console.log(`Total members processed: ${members.length}`);
    console.log(`Successfully updated: ${updatedCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log(`All members should now have expected_contribution = 17400`);
    console.log('\n✅ Fix completed!');
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the fix
fixExpectedContributionsInJson();