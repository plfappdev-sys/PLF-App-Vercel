// Use service role to bypass RLS
const { createClient } = require('@supabase/supabase-js');

// Get service role key from environment or config
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAyNDQ4NCwiZXhwIjoyMDczNjAwNDg0fQ.kOpqoycVNdJXC-fqqxwHPVof6e8JlJ60_J7WWF-1AHU';

// Create client with service role
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixExpectedContributions() {
  try {
    console.log('Fixing expected contributions for all members...');
    
    // Update all members at once
    const { data, error } = await supabase
      .from('members')
      .update({ 
        expected_contribution: 17400,
        expected_contribution_total: 17400 
      })
      .neq('member_number', '');
    
    if (error) {
      console.error('Error updating members:', error.message);
      
      // Try alternative approach - update in batches
      console.log('Trying batch update...');
      await updateInBatches();
    } else {
      console.log('Successfully updated all members');
      
      // Verify the update
      await verifyUpdate();
    }
    
  } catch (error) {
    console.error('Error in fixExpectedContributions:', error.message);
  }
}

async function updateInBatches() {
  try {
    // Get all member IDs
    const { data: members, error: fetchError } = await supabase
      .from('members')
      .select('id, member_number')
      .order('member_number');
    
    if (fetchError) {
      console.error('Error fetching members:', fetchError.message);
      return;
    }
    
    console.log(`Found ${members.length} members to update`);
    
    // Update in batches of 10
    const batchSize = 10;
    let updatedCount = 0;
    
    for (let i = 0; i < members.length; i += batchSize) {
      const batch = members.slice(i, i + batchSize);
      const batchIds = batch.map(m => m.id);
      
      const { error } = await supabase
        .from('members')
        .update({ 
          expected_contribution: 17400,
          expected_contribution_total: 17400 
        })
        .in('id', batchIds);
      
      if (error) {
        console.error(`Error updating batch ${i/batchSize + 1}:`, error.message);
      } else {
        updatedCount += batch.length;
        console.log(`Updated batch ${i/batchSize + 1}: ${batch.length} members`);
      }
    }
    
    console.log(`Successfully updated ${updatedCount} members`);
    
    // Verify the update
    await verifyUpdate();
    
  } catch (error) {
    console.error('Error in updateInBatches:', error.message);
  }
}

async function verifyUpdate() {
  try {
    console.log('\nVerifying update...');
    
    const { data: sampleMembers, error } = await supabase
      .from('members')
      .select('member_number, name, expected_contribution, expected_contribution_total')
      .order('member_number')
      .limit(10);
    
    if (error) {
      console.error('Error verifying update:', error.message);
    } else {
      console.log('Sample members after update:');
      sampleMembers.forEach(m => {
        console.log(`${m.member_number} (${m.name}): Expected=${m.expected_contribution}, Total=${m.expected_contribution_total}`);
      });
      
      // Check M031 specifically
      const { data: m031, error: m031Error } = await supabase
        .from('members')
        .select('member_number, name, expected_contribution, outstanding_contributions, total_penalties, closing_balance')
        .eq('member_number', 'M031')
        .single();
      
      if (!m031Error && m031) {
        console.log('\nM031 (Lesego Bokaba) details:');
        console.log('Expected Contribution:', m031.expected_contribution);
        console.log('Outstanding Contributions:', m031.outstanding_contributions);
        console.log('Total Penalties:', m031.total_penalties);
        console.log('Closing Balance:', m031.closing_balance);
        
        // Calculate what outstanding should be if total contribution is 5300
        const totalContribution = 5300; // From Excel
        const expectedOutstanding = 17400 - totalContribution; // 12100
        console.log('\nBased on Excel data (Total Contribution = 5300):');
        console.log('Expected Outstanding Contributions should be:', expectedOutstanding);
        console.log('Current Outstanding Contributions:', m031.outstanding_contributions);
        console.log('Difference:', expectedOutstanding - m031.outstanding_contributions);
      }
    }
    
  } catch (error) {
    console.error('Error in verifyUpdate:', error.message);
  }
}

// Run the fix
fixExpectedContributions();