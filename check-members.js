// Script to check what members exist in the database
const { supabase } = require('./supabase.config');

async function checkMembers() {
  console.log('🔍 Checking members in database...');
  
  try {
    // Check if members table exists and has data
    const { data: members, error } = await supabase
      .from('members')
      .select('member_number, personal_info')
      .order('member_number');

    if (error) {
      console.error('❌ Error accessing members table:', error.message);
      console.log('\n💡 Possible solutions:');
      console.log('1. Run the schema SQL in Supabase SQL Editor');
      console.log('2. Check if the members table exists');
      console.log('3. Import member data using import_members_to_supabase.py');
      return;
    }

    if (!members || members.length === 0) {
      console.log('❌ No members found in the database');
      console.log('\n💡 You need to import members:');
      console.log('1. Run: python import_members_to_supabase.py');
      console.log('2. Or manually add members to the database');
      return;
    }

    console.log(`✅ Found ${members.length} members in database:`);
    console.log('\nAvailable Members:');
    members.forEach((member, index) => {
      const name = member.personal_info?.fullName || 'Unknown Name';
      console.log(`${index + 1}. ${member.member_number} - ${name}`);
    });

    console.log('\n📋 To generate reports, use these member numbers:');
    console.log('   Example: Select one of the available member numbers above');
    console.log('   in the Reports screen to generate a Member Statement');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

// Run the check
checkMembers().catch(console.error);
