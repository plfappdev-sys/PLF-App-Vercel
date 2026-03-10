// Script to fix database column issues for Lesego Bokaba (M031)
// Issues found:
// 1. total_contributions column is undefined (but data exists in financial_info JSON)
// 2. expected_contribution column shows R 2,400 (incorrect) but financial_info.expected_contribution shows R 16,600 (correct)

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixDatabaseColumns() {
  console.log('=== Fixing Database Columns for Lesego Bokaba (M031) ===\n');
  
  try {
    // 1. First, get the current member data
    console.log('1. Fetching current member data for M031...');
    const { data: member, error: fetchError } = await supabase
      .from('members')
      .select('*')
      .eq('member_number', 'M031')
      .single();
    
    if (fetchError) {
      console.error('❌ Error fetching member:', fetchError);
      return;
    }
    
    if (!member) {
      console.error('❌ Member M031 not found');
      return;
    }
    
    console.log('✅ Member found:', member.personal_info?.fullName || 'N/A');
    console.log('   Member ID:', member.id);
    console.log('   Current total_contributions column:', member.total_contributions);
    console.log('   Current expected_contribution column:', member.expected_contribution);
    console.log('   financial_info.total_contributions:', member.financial_info?.total_contributions);
    console.log('   financial_info.expected_contribution:', member.financial_info?.expected_contribution);
    
    // 2. Prepare update data
    const updateData = {};
    
    // Fix total_contributions from financial_info
    if (member.financial_info?.total_contributions !== undefined && member.total_contributions === undefined) {
      updateData.total_contributions = member.financial_info.total_contributions;
      console.log(`\n2. Will fix total_contributions: ${member.total_contributions} -> ${member.financial_info.total_contributions}`);
    }
    
    // Fix expected_contribution from financial_info
    if (member.financial_info?.expected_contribution !== undefined && 
        member.expected_contribution !== member.financial_info.expected_contribution) {
      updateData.expected_contribution = member.financial_info.expected_contribution;
      console.log(`3. Will fix expected_contribution: ${member.expected_contribution} -> ${member.financial_info.expected_contribution}`);
    }
    
    // 3. Apply updates if needed
    if (Object.keys(updateData).length === 0) {
      console.log('\n✅ No fixes needed - columns are already correct!');
      return;
    }
    
    console.log('\n4. Applying database updates...');
    const { data: updatedMember, error: updateError } = await supabase
      .from('members')
      .update(updateData)
      .eq('id', member.id)
      .select()
      .single();
    
    if (updateError) {
      console.error('❌ Error updating member:', updateError);
      return;
    }
    
    console.log('✅ Successfully updated member!');
    console.log('   Updated total_contributions:', updatedMember.total_contributions);
    console.log('   Updated expected_contribution:', updatedMember.expected_contribution);
    
    // 4. Verify the fix
    console.log('\n5. Verifying fix...');
    const { data: verifiedMember, error: verifyError } = await supabase
      .from('members')
      .select('*')
      .eq('member_number', 'M031')
      .single();
    
    if (verifyError) {
      console.error('❌ Error verifying update:', verifyError);
      return;
    }
    
    console.log('✅ Verification successful!');
    console.log('   total_contributions:', verifiedMember.total_contributions, '(should be 5300)');
    console.log('   expected_contribution:', verifiedMember.expected_contribution, '(should be 16600)');
    
    // Check if values are correct
    const issues = [];
    if (verifiedMember.total_contributions !== 5300) {
      issues.push(`total_contributions is ${verifiedMember.total_contributions}, expected 5300`);
    }
    if (verifiedMember.expected_contribution !== 16600) {
      issues.push(`expected_contribution is ${verifiedMember.expected_contribution}, expected 16600`);
    }
    
    if (issues.length === 0) {
      console.log('\n🎉 All database columns fixed successfully!');
    } else {
      console.log('\n❌ Issues remain:');
      issues.forEach(issue => console.log(`   - ${issue}`));
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the fix
fixDatabaseColumns().then(() => {
  console.log('\n=== Database fix complete ===');
  process.exit(0);
}).catch(error => {
  console.error('Fix failed:', error);
  process.exit(1);
});