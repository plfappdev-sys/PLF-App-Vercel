// Simple test script to check expected contribution calculation
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function testExpectedContribution() {
  console.log('Testing expected contribution calculation...\n');
  
  // Test with a few member numbers
  const testMembers = ['M004', 'M005', 'M031', 'M047', 'M057'];
  
  for (const memberNumber of testMembers) {
    console.log(`\n=== Testing member ${memberNumber} ===`);
    
    try {
      // Get member data
      const { data: member, error } = await supabase
        .from('members')
        .select('*')
        .eq('member_number', memberNumber)
        .single();
      
      if (error) {
        console.log(`❌ Error fetching member: ${error.message}`);
        continue;
      }
      
      if (member) {
        console.log(`Name: ${member.name}`);
        console.log(`Member Number: ${member.member_number}`);
        console.log(`Join Date: ${member.join_date}`);
        
        // Parse financial_info
        let financialInfo = {};
        if (member.financial_info) {
          try {
            financialInfo = typeof member.financial_info === 'string' 
              ? JSON.parse(member.financial_info) 
              : member.financial_info;
          } catch (e) {
            console.log(`Warning: Could not parse financial_info`);
          }
        }
        
        console.log(`Current Expected Contribution in DB: R${financialInfo.expected_contribution || 0}`);
        
        // Calculate expected contribution based on join date
        if (member.join_date) {
          const joinDate = new Date(member.join_date);
          const today = new Date();
          
          // Calculate months difference
          const monthsDiff = (today.getFullYear() - joinDate.getFullYear()) * 12 + 
                            (today.getMonth() - joinDate.getMonth());
          
          // Cap at 83 months (maximum expected contribution period)
          const cappedMonths = Math.max(0, Math.min(monthsDiff, 83));
          
          // Calculate expected contribution (R200 per month)
          const expectedContribution = cappedMonths * 200;
          
          console.log(`Join Date: ${joinDate.toISOString().split('T')[0]}`);
          console.log(`Months since join: ${monthsDiff}`);
          console.log(`Capped months (max 83): ${cappedMonths}`);
          console.log(`Calculated Expected Contribution: R${expectedContribution}`);
          
          if (financialInfo.expected_contribution !== expectedContribution) {
            console.log(`⚠️ WARNING: Expected contribution mismatch!`);
            console.log(`   Database: R${financialInfo.expected_contribution || 0}`);
            console.log(`   Calculated: R${expectedContribution}`);
            
            // Update the expected contribution in the database
            const updatedFinancialInfo = {
              ...financialInfo,
              expected_contribution: expectedContribution,
              expected_contribution_details: {
                total_months: cappedMonths,
                period1_months: Math.min(cappedMonths, 60), // First 5 years
                period2_months: Math.max(0, cappedMonths - 60) // After 5 years
              },
              last_expected_contribution_update: new Date().toISOString()
            };
            
            const { error: updateError } = await supabase
              .from('members')
              .update({
                financial_info: updatedFinancialInfo,
                last_updated: new Date().toISOString()
              })
              .eq('member_number', memberNumber);
            
            if (updateError) {
              console.log(`❌ Error updating expected contribution: ${updateError.message}`);
            } else {
              console.log(`✅ Updated expected contribution to R${expectedContribution}`);
            }
          } else {
            console.log(`✅ Expected contribution matches calculation`);
          }
        } else {
          console.log(`⚠️ No join date found for member`);
        }
      } else {
        console.log(`❌ Member ${memberNumber} not found`);
      }
    } catch (error) {
      console.error(`Error testing member ${memberNumber}:`, error.message);
    }
  }
  
  console.log('\n=== Testing complete ===');
}

// Run the test
testExpectedContribution().catch(console.error);