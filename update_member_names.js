const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase configuration
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function updateMemberNames() {
    console.log('🚀 Updating member names with real names...');
    
    try {
        // Get current members from database
        console.log('🔍 Fetching current members from database...');
        const { data: members, error: membersError } = await supabase
            .from('members')
            .select('*')
            .order('member_number');
        
        if (membersError) {
            console.error('❌ Error fetching members:', membersError);
            return;
        }
        
        console.log(`📊 Found ${members.length} members in database`);
        
        // Read the Excel data from the JSON file that was used for import
        const excelDataPath = path.join(__dirname, 'selected_members_2024_2025.json');
        if (!fs.existsSync(excelDataPath)) {
            console.error('❌ Excel data file not found:', excelDataPath);
            return;
        }
        
        const excelData = JSON.parse(fs.readFileSync(excelDataPath, 'utf8'));
        const memberData = excelData.members;
        const memberKeys = Object.keys(memberData);
        
        console.log(`📊 Loaded ${memberKeys.length} members from Excel data`);
        
        // Update each member with real name
        let successfulUpdates = 0;
        
        for (let i = 0; i < members.length; i++) {
            const member = members[i];
            const memberKey = `Member ${member.member_number}`;
            
            if (memberData[memberKey]) {
                const realName = memberData[memberKey].data.Member;
                
                console.log(`  Updating member ${member.member_number}: "${member.name}" -> "${realName}"`);
                
                // Update the member name
                const { data: updatedMember, error: updateError } = await supabase
                    .from('members')
                    .update({ name: realName })
                    .eq('id', member.id);
                
                if (updateError) {
                    console.error(`❌ Error updating member ${member.member_number}:`, updateError);
                } else {
                    successfulUpdates++;
                }
            } else {
                console.log(`⚠️  No data found for member ${member.member_number}`);
            }
        }
        
        console.log(`✅ Successfully updated ${successfulUpdates} members with real names`);
        
        // Verify the updates
        console.log('🔍 Verifying updates...');
        const { data: updatedMembers, error: verifyError } = await supabase
            .from('members')
            .select('member_number, name')
            .order('member_number')
            .limit(10);
        
        if (verifyError) {
            console.error('❌ Error verifying updates:', verifyError);
        } else {
            console.log('📋 First 10 updated members:');
            updatedMembers.forEach(member => {
                console.log(`  ${member.member_number}. ${member.name}`);
            });
        }
        
    } catch (error) {
        console.error('❌ Unexpected error:', error);
    }
}

// Run the update
updateMemberNames();
