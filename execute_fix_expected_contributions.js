const { supabase } = require('./supabase.config.js');
const fs = require('fs');
const path = require('path');

async function executeSQLFile(filePath) {
  try {
    const sql = fs.readFileSync(filePath, 'utf8');
    console.log('Executing SQL file:', filePath);
    
    // Split SQL into individual statements
    const statements = sql.split(';').filter(stmt => stmt.trim().length > 0);
    
    for (const statement of statements) {
      console.log('Executing:', statement.substring(0, 100) + '...');
      const { error } = await supabase.rpc('exec_sql', { sql: statement });
      
      if (error) {
        // Try direct query if RPC fails
        console.log('RPC failed, trying direct query...');
        const { error: directError } = await supabase.from('members').update({ 
          expected_contribution: 17400,
          expected_contribution_total: 17400 
        }).neq('member_number', '');
        
        if (directError) {
          console.error('Direct query error:', directError.message);
        } else {
          console.log('Direct query successful');
        }
      } else {
        console.log('Statement executed successfully');
      }
    }
    
    console.log('SQL execution completed');
  } catch (error) {
    console.error('Error executing SQL file:', error.message);
  }
}

// Alternative approach: Update all members directly
async function updateAllMembers() {
  try {
    console.log('Updating all members expected_contribution to 17400...');
    
    // First, get all members
    const { data: members, error: fetchError } = await supabase
      .from('members')
      .select('id, member_number, expected_contribution');
    
    if (fetchError) {
      console.error('Error fetching members:', fetchError.message);
      return;
    }
    
    console.log(`Found ${members.length} members to update`);
    
    // Update each member
    let updatedCount = 0;
    for (const member of members) {
      const { error } = await supabase
        .from('members')
        .update({ 
          expected_contribution: 17400,
          expected_contribution_total: 17400 
        })
        .eq('id', member.id);
      
      if (error) {
        console.error(`Error updating member ${member.member_number}:`, error.message);
      } else {
        updatedCount++;
      }
    }
    
    console.log(`Successfully updated ${updatedCount} members`);
    
    // Verify the update
    const { data: updatedMembers, error: verifyError } = await supabase
      .from('members')
      .select('member_number, expected_contribution')
      .limit(5);
    
    if (verifyError) {
      console.error('Error verifying update:', verifyError.message);
    } else {
      console.log('Sample updated members:');
      updatedMembers.forEach(m => {
        console.log(`${m.member_number}: Expected Contribution = ${m.expected_contribution}`);
      });
    }
    
  } catch (error) {
    console.error('Error in updateAllMembers:', error.message);
  }
}

// Run the update
updateAllMembers();