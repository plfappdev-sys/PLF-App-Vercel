// Script to update expected contributions for ALL members based on join dates
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateAllExpectedContributions() {
  console.log('Updating expected contributions for ALL members...\n');
  
  try {
    // Get all members
    const { data: members, error } = await supabase
      .from('members')
      .select('*');
    
    if (error) {
      console.log(`❌ Error fetching members: ${error.message}`);
      return;
    }
    
    if (!members || members.length === 0) {
      console.log('❌ No members found in database');
      return;
    }
    
    console.log(`Found ${members.length} members in database\n`);
    
    let updatedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    
    // Process each member
    for (const member of members) {
      try {
        console.log(`Processing ${member.member_number} - ${member.name}`);
        
        // Parse financial_info
        let financialInfo = {};
        if (member.financial_info) {
          try {
            financialInfo = typeof member.financial_info === 'string' 
              ? JSON.parse(member.financial_info) 
              : member.financial_info;
          } catch (e) {
            console.log(`  Warning: Could not parse financial_info`);
          }
        }
        
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
          
          // Check if update is needed
          if (financialInfo.expected_contribution !== expectedContribution) {
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
              .eq('member_number', member.member_number);
            
            if (updateError) {
              console.log(`  ❌ Error updating: ${updateError.message}`);
              errorCount++;
            } else {
              console.log(`  ✅ Updated expected contribution: R${expectedContribution} (${cappedMonths} months)`);
              updatedCount++;
            }
          } else {
            console.log(`  ⏭️ Already up to date: R${expectedContribution}`);
            skippedCount++;
          }
        } else {
          console.log(`  ⚠️ No join date found, skipping`);
          skippedCount++;
        }
      } catch (memberError) {
        console.error(`  ❌ Error processing member ${member.member_number}:`, memberError.message);
        errorCount++;
      }
    }
    
    // Summary
    console.log('\n=== Update Summary ===');
    console.log(`Total members processed: ${members.length}`);
    console.log(`Successfully updated: ${updatedCount}`);
    console.log(`Already up to date: ${skippedCount}`);
    console.log(`Errors: ${errorCount}`);
    
  } catch (error) {
    console.error('Error in updateAllExpectedContributions:', error.message);
  }
}

// Run the update
updateAllExpectedContributions().catch(console.error);