const { supabase } = require('./src/config/supabase.ts');

async function checkMemberNames() {
  console.log('🔍 Checking member names in database...');
  
  const { data: members, error } = await supabase
    .from('members')
    .select('member_number, name, personal_info')
    .limit(10);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('📊 First 10 members with names:');
  members.forEach((member, index) => {
    console.log(`${index + 1}. ${member.member_number} - Name: "${member.name || 'No Name'}" - Personal Info: ${JSON.stringify(member.personal_info)}`);
  });
}

checkMemberNames();
