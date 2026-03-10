// Script to fix ONLY the expected_contribution column for Lesego Bokaba (M031)
// The total_contributions column doesn't exist in schema, so we can't fix it

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixExpectedContributionOnly() {
  console.log('=== Fixing Expected Contribution Column for Lesego Bokaba (M031) ===\n');
  
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
    console.log('   Current expected_contribution column:', member.expected_contribution);
    console.log('   financial_info.expected_contribution:', member.financial_info?.expected_contribution);
    
    // 2. Check if expected_contribution column exists and needs fixing
    if (member.expected_contribution === member.financial_info?.expected_contribution) {
      console.log('\n✅ No fix needed - expected_contribution is already correct!');
      return;
    }
    
    // 3. Try to update just the expected_contribution column
    console.log(`\n2. Will fix expected_contribution: ${member.expected_contribution} -> ${member.financial_info?.expected_contribution}`);
    
    const updateData = {
      expected_contribution: member.financial_info?.expected_contribution
    };
    
    console.log('\n3. Applying database update...');
    const { data: updatedMember, error: updateError } = await supabase
      .from('members')
      .update(updateData)
      .eq('id', member.id)
      .select()
      .single();
    
    if (updateError) {
      console.error('❌ Error updating member:', updateError);
      console.log('\n⚠️  The expected_contribution column may not exist in schema either.');
      console.log('   This means the service layer must extract data from financial_info JSON field.');
      return;
    }
    
    console.log('✅ Successfully updated member!');
    console.log('   Updated expected_contribution:', updatedMember.expected_contribution);
    
    // 4. Verify the fix
    console.log('\n4. Verifying fix...');
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
    console.log('   expected_contribution:', verifiedMember.expected_contribution, '(should be 16600)');
    
    if (verifiedMember.expected_contribution === 16600) {
      console.log('\n🎉 Expected contribution column fixed successfully!');
    } else {
      console.log(`\n❌ Issue remains: expected_contribution is ${verifiedMember.expected_contribution}, expected 16600`);
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the fix
fixExpectedContributionOnly().then(() => {
  console.log('\n=== Database fix complete ===');
  console.log('\n=== IMPORTANT NOTE ===');
  console.log('The total_contributions column does not exist in the database schema.');
  console.log('The service layer (supabaseMemberService.ts) MUST extract data from the financial_info JSON field.');
  console.log('This is likely the root cause of the display issues in MyFundsScreen.');
  process.exit(0);
}).catch(error => {
  console.error('Fix failed:', error);
  process.exit(1);
});