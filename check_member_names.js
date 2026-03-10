const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkMemberNames() {
  try {
    // Check if members have names
    const { data, error } = await supabase
      .from('members')
      .select('id, member_number, name')
      .limit(10);
    
    if (error) {
      console.log('❌ Error fetching members:', error.message);
      return;
    }
    
    console.log('📋 Checking member names in database:');
    data.forEach(member => {
      console.log(`  Member Number: ${member.member_number}, Name: "${member.name}"`);
    });
    
    // Count members with names
    const withNames = data.filter(m => m.name && m.name.trim() !== '').length;
    console.log(`\n📊 Members with names: ${withNames}/${data.length}`);
    
  } catch (err) {
    console.log('❌ Exception:', err.message);
  }
}

checkMemberNames();