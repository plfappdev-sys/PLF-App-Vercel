// Script to link a user account to a member number
const { supabase } = require('./supabase.config');

async function linkUserToMember() {
  console.log('🔗 Linking user to member...');
  
  try {
    // Get available users
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('uid, email, membernumber')
      .order('email');

    if (usersError) {
      console.error('❌ Error fetching users:', usersError.message);
      return;
    }

    if (!users || users.length === 0) {
      console.log('❌ No users found');
      return;
    }

    // Get available members
    const { data: members, error: membersError } = await supabase
      .from('members')
      .select('member_number, personal_info')
      .order('member_number');

    if (membersError) {
      console.error('❌ Error fetching members:', membersError.message);
      return;
    }

    console.log('\n👥 Available Users:');
    users.forEach((user, index) => {
      const status = user.membernumber ? `(Linked to: ${user.membernumber})` : '(Not linked)';
      console.log(`${index + 1}. ${user.email} ${status}`);
    });

    console.log('\n👤 Available Members:');
    members.forEach((member, index) => {
      const name = member.personal_info?.fullName || 'Unknown Name';
      console.log(`${index + 1}. ${member.member_number} - ${name}`);
    });

    console.log('\n📝 Instructions:');
    console.log('1. Choose a user email from the list above');
    console.log('2. Choose a member number to link to that user');
    console.log('3. This will allow the user to generate reports for that member');
    console.log('\n💡 Example: Link "oratile@tyriie.co.za" to member "66"');

    // For demonstration, let's link oratile@tyriie.co.za to member 66
    const userEmail = 'oratile@tyriie.co.za';
    const memberNumber = '66';

    const userToLink = users.find(u => u.email === userEmail);
    if (!userToLink) {
      console.log(`❌ User ${userEmail} not found`);
      return;
    }

    const memberExists = members.find(m => m.member_number === memberNumber);
    if (!memberExists) {
      console.log(`❌ Member ${memberNumber} not found`);
      return;
    }

    console.log(`\n🔗 Linking ${userEmail} to member ${memberNumber}...`);

    const { error: updateError } = await supabase
      .from('users')
      .update({ 
        membernumber: memberNumber
      })
      .eq('email', userEmail);

    if (updateError) {
      console.error('❌ Error linking user to member:', updateError.message);
      return;
    }

    console.log('✅ Successfully linked user to member!');
    console.log(`   ${userEmail} is now linked to member ${memberNumber}`);
    console.log('\n📋 You can now generate Member Statement reports for this member');

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

// Run the linking process
linkUserToMember().catch(console.error);
