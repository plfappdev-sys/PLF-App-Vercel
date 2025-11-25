const { supabase } = require('./supabase.config.js');

async function checkMemberUserRelationship() {
  console.log('🔍 Checking how members and users are related...');
  
  try {
    // Check if there's any existing relationship between members and users
    console.log('\n📊 Checking for any existing member-user relationship columns...');
    
    // Look at both tables to see if there's a common linking mechanism
    const { data: members, error: membersError } = await supabase
      .from('members')
      .select('member_number, personal_info')
      .limit(5);

    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('uid, email, membernumber, personalinfo')
      .limit(5);

    if (membersError) {
      console.log('❌ Error querying members:', membersError.message);
    } else if (members && members.length > 0) {
      console.log('✅ Sample members:');
      members.forEach(member => {
        console.log(`   - Member #${member.member_number}: ${JSON.stringify(member.personal_info)}`);
      });
    }

    if (usersError) {
      console.log('❌ Error querying users:', usersError.message);
    } else if (users && users.length > 0) {
      console.log('\n✅ Sample users:');
      users.forEach(user => {
        console.log(`   - User ${user.uid} (${user.email}):`);
        console.log(`     membernumber: ${JSON.stringify(user.membernumber)}`);
        console.log(`     personalinfo: ${JSON.stringify(user.personalinfo)}`);
      });
    }

    // Check if there's a pattern where users have member numbers
    console.log('\n🔍 Analyzing potential linking patterns...');
    if (users && users.length > 0) {
      const usersWithMemberNumbers = users.filter(user => user.membernumber);
      console.log(`   Users with member numbers: ${usersWithMemberNumbers.length}/${users.length}`);
      
      if (usersWithMemberNumbers.length > 0) {
        console.log('   Sample user member numbers:');
        usersWithMemberNumbers.slice(0, 3).forEach(user => {
          console.log(`     - ${user.uid}: ${JSON.stringify(user.membernumber)}`);
        });
      }
    }

  } catch (error) {
    console.error('❌ Member-user relationship check failed:', error.message);
  }
}

// Run the check
checkMemberUserRelationship().catch(console.error);
