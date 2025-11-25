const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixMemberNames() {
  console.log('🔧 Fixing member names...');
  
  try {
    // Get all members with personal_info
    const { data: members, error: membersError } = await supabase
      .from('members')
      .select('id, member_number, name, personal_info');
    
    if (membersError) {
      console.error('❌ Error fetching members:', membersError);
      return;
    }
    
    console.log(`📊 Found ${members.length} members to process`);
    
    let updatedCount = 0;
    let errorCount = 0;
    
    // Update each member's name from personal_info
    for (const member of members) {
      if (member.personal_info && member.personal_info.fullName) {
        const fullName = member.personal_info.fullName;
        
        // Update the member's name field
        const { error: updateError } = await supabase
          .from('members')
          .update({ name: fullName })
          .eq('id', member.id);
        
        if (updateError) {
          console.error(`❌ Error updating member ${member.member_number}:`, updateError);
          errorCount++;
        } else {
          console.log(`✅ Updated ${member.member_number}: "${fullName}"`);
          updatedCount++;
        }
      } else {
        console.log(`⚠️  No fullName in personal_info for member ${member.member_number}`);
      }
    }
    
    console.log('\n📊 SUMMARY:');
    console.log(`✅ Successfully updated: ${updatedCount} members`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📋 Total processed: ${members.length}`);
    
    // Verify the fix
    console.log('\n🔍 Verifying fix...');
    const { data: updatedMembers, error: verifyError } = await supabase
      .from('members')
      .select('member_number, name')
      .limit(10);
    
    if (verifyError) {
      console.error('❌ Error verifying fix:', verifyError);
    } else {
      console.log('📋 First 10 members after fix:');
      updatedMembers.forEach((member, index) => {
        console.log(`${index + 1}. ${member.member_number} - Name: "${member.name}"`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error during member name fix:', error);
  }
}

fixMemberNames();
