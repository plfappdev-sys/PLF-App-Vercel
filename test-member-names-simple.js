const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Configuration
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://zdnyhzasvifrskbostgn.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY || '';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function checkMemberNames() {
  console.log('🔍 Checking member names in database...');
  
  try {
    const { data: members, error } = await supabase
      .from('members')
      .select('member_number, name, personal_info')
      .limit(10);

    if (error) {
      console.error('Error:', error);
      return;
    }

    console.log('📊 First 10 members with names:');
    if (members && members.length > 0) {
      members.forEach((member, index) => {
        console.log(`${index + 1}. ${member.member_number} - Name: "${member.name || 'No Name'}" - Personal Info: ${JSON.stringify(member.personal_info)}`);
      });
    } else {
      console.log('No members found in database');
    }
  } catch (error) {
    console.error('Exception:', error);
  }
}

checkMemberNames();
