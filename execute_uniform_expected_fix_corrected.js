const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client with service role key for admin access
const supabaseUrl = process.env.SUPABASE_URL || process.env.PROJECT_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase environment variables');
  console.error('Make sure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env file');
  console.error('Available env vars:', Object.keys(process.env).filter(k => k.includes('SUPABASE') || k.includes('SERVICE')));
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixUniformExpectedContributions() {
  console.log('=== Fixing All Expected Contributions to Uniform 17400 ===\n');
  
  try {
    // First, check current expected contributions
    console.log('1. Checking current expected contributions...');
    const { data: membersWithWrongExpected, error: checkError } = await supabase
      .from('members')
      .select('member_number, name, expected_contribution, join_date, monthly_contribution_rate')
      .or('expected_contribution.neq.17400,expected_contribution.is.null')
      .order('member_number');

    if (checkError) {
      console.error('Error checking members:', checkError);
      return;
    }

    console.log(`Found ${membersWithWrongExpected?.length || 0} members with incorrect expected contribution`);
    
    if (membersWithWrongExpected && membersWithWrongExpected.length > 0) {
      console.log('\nMembers with incorrect expected contribution:');
      membersWithWrongExpected.forEach(member => {
        console.log(`  ${member.member_number}: ${member.name} - Expected: ${member.expected_contribution || 'NULL'}`);
      });
    }

    // Update all members to have expected_contribution = 17400
    console.log('\n2. Updating all members to expected_contribution = 17400...');
    const { data: updateData, error: updateError } = await supabase
      .from('members')
      .update({ expected_contribution: 17400 })
      .or('expected_contribution.neq.17400,expected_contribution.is.null')
      .select('count');

    if (updateError) {
      console.error('Error updating members:', updateError);
      return;
    }

    console.log(`Updated ${updateData?.length || 0} members`);

    // Verify the update
    console.log('\n3. Verifying the update...');
    const { data: verificationData, error: verificationError } = await supabase
      .from('members')
      .select('expected_contribution');

    if (verificationError) {
      console.error('Error verifying update:', verificationError);
      return;
    }

    const totalMembers = verificationData?.length || 0;
    const correctExpected = verificationData?.filter(m => m.expected_contribution === 17400).length || 0;
    const incorrectExpected = verificationData?.filter(m => m.expected_contribution !== 17400).length || 0;
    const nullExpected = verificationData?.filter(m => m.expected_contribution === null).length || 0;

    console.log(`Total members: ${totalMembers}`);
    console.log(`Members with correct expected (17400): ${correctExpected}`);
    console.log(`Members with incorrect expected: ${incorrectExpected}`);
    console.log(`Members with null expected: ${nullExpected}`);

    // Show a sample of updated members
    console.log('\n4. Sample of updated members:');
    const { data: sampleData, error: sampleError } = await supabase
      .from('members')
      .select('member_number, name, expected_contribution, join_date')
      .order('member_number')
      .limit(10);

    if (sampleError) {
      console.error('Error getting sample:', sampleError);
      return;
    }

    sampleData?.forEach(member => {
      console.log(`  ${member.member_number}: ${member.name} - Expected: ${member.expected_contribution}`);
    });

    // Check Lesego specifically
    console.log('\n5. Checking Lesego Bokaba specifically...');
    const { data: lesegoData, error: lesegoError } = await supabase
      .from('members')
      .select('member_number, name, expected_contribution, join_date')
      .ilike('name', '%lesego%')
      .limit(5);

    if (lesegoError) {
      console.error('Error checking Lesego:', lesegoError);
    } else if (lesegoData && lesegoData.length > 0) {
      lesegoData.forEach(member => {
        console.log(`  ${member.member_number}: ${member.name} - Expected: ${member.expected_contribution}`);
      });
    } else {
      console.log('  No member found with name containing "Lesego"');
    }

    console.log('\n✅ Fix completed successfully!');
    console.log('\n=== Summary ===');
    console.log(`• All members now have expected_contribution = 17400`);
    console.log(`• ${correctExpected}/${totalMembers} members verified with correct value`);
    console.log(`• Lesego Bokaba should now show 17400 as expected contribution`);
    console.log('\nPlease log in again to see the updated expected contribution.');

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the fix
fixUniformExpectedContributions();