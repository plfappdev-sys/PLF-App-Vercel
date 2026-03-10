const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkMembersTable() {
  try {
    // First, let's get all columns by selecting *
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .limit(5);
    
    if (error) {
      console.log('❌ Error fetching members:', error.message);
      
      // Try to get just member_number
      const { data: simpleData, error: simpleError } = await supabase
        .from('members')
        .select('member_number')
        .limit(10);
      
      if (simpleError) {
        console.log('❌ Error fetching member_number:', simpleError.message);
        return;
      }
      
      console.log('📋 Members table columns found: member_number');
      console.log('Sample members:');
      simpleData.forEach(member => {
        console.log(`  Member Number: ${member.member_number}`);
      });
      
      console.log(`\nTotal members in database: ${simpleData.length}`);
      return;
    }
    
    console.log('📋 Members table structure:');
    if (data && data.length > 0) {
      const firstMember = data[0];
      console.log('Columns found:');
      Object.keys(firstMember).forEach(key => {
        console.log(`  - ${key}: ${typeof firstMember[key]}`);
      });
      
      console.log('\nSample members:');
      data.forEach(member => {
        console.log(`  Member Number: ${member.member_number}`);
      });
      
      console.log(`\nTotal members in database (sample): ${data.length}`);
    } else {
      console.log('No members found in database');
    }
  } catch (err) {
    console.log('❌ Exception:', err.message);
  }
}

checkMembersTable();