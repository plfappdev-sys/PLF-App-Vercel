const { SupabaseMemberService } = require('./src/services/supabaseMemberService');

async function testMemberService() {
  console.log('🔍 Testing updated member service...');
  
  try {
    // Test getting all members
    const members = await SupabaseMemberService.getAllMembers();
    
    console.log(`✅ Found ${members.length} members using member service:`);
    console.log('\nFirst 10 members with names:');
    
    members.slice(0, 10).forEach((member, index) => {
      const name = member.personalInfo?.fullName || 
                  (member.personalInfo?.firstName && member.personalInfo?.lastName 
                   ? `${member.personalInfo.firstName} ${member.personalInfo.lastName}`
                   : 'Unknown Name');
      console.log(`${index + 1}. ${member.memberNumber} - ${name}`);
    });

    // Test getting a specific member
    console.log('\n🔍 Testing specific member lookup:');
    const testMember = await SupabaseMemberService.getMemberByNumber('M001');
    if (testMember) {
      console.log(`✅ M001 details:`);
      console.log(`   Name: ${testMember.personalInfo?.fullName || 'Unknown'}`);
      console.log(`   First Name: ${testMember.personalInfo?.firstName || 'Unknown'}`);
      console.log(`   Last Name: ${testMember.personalInfo?.lastName || 'Unknown'}`);
      console.log(`   Personal Info object:`, testMember.personalInfo);
    } else {
      console.log('❌ M001 not found');
    }
    
  } catch (error) {
    console.error('❌ Error testing member service:', error);
  }
}

// Run the test
testMemberService().catch(console.error);
