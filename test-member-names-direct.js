const { supabase } = require('./src/config/supabase');

async function testMemberNamesDirect() {
  console.log('🔍 Testing member names directly from database...');
  
  try {
    // Get first 10 members with their names
    const { data: members, error } = await supabase
      .from('members')
      .select('member_number, name, personal_info')
      .limit(10)
      .order('member_number');

    if (error) {
      console.error('❌ Error:', error);
      return;
    }

    console.log('📊 First 10 members from database:');
    members.forEach((member, index) => {
      console.log(`${index + 1}. ${member.member_number} - Name: "${member.name || 'No Name'}" - Personal Info: ${JSON.stringify(member.personal_info)}`);
    });

    // Test the member service logic manually
    console.log('\n🔍 Testing member service logic manually:');
    members.forEach((member, index) => {
      // This is the same logic we implemented in the member service
      const personalInfo = member.name ? {
        firstName: member.name.split(' ')[0] || '',
        lastName: member.name.split(' ').slice(1).join(' ') || '',
        fullName: member.name
      } : member.personal_info;

      console.log(`${index + 1}. ${member.member_number} - Processed Name: "${personalInfo?.fullName || 'Unknown Name'}"`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testMemberNamesDirect().catch(console.error);
