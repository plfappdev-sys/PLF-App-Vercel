const { createClient } = require('@supabase/supabase-js');
const XLSX = require('xlsx');

// Supabase configuration
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function updateMemberNamesFromExcel() {
    console.log('🚀 Updating member names directly from Excel file...');
    
    try {
        // Read the Excel file directly
        const workbook = XLSX.readFile('NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025.xlsx');
        const sheet = workbook.Sheets['2024-2025'];
        const data = XLSX.utils.sheet_to_json(sheet);
        
        console.log(`📊 Loaded ${data.length} members from Excel file`);
        
        // Show first 10 real names from Excel
        console.log('📋 First 10 real member names from Excel:');
        for (let i = 0; i < Math.min(10, data.length); i++) {
            const memberName = data[i]['Member'];
            console.log(`  ${i+1}. ${memberName}`);
        }
        
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
        
        // Update each member with real name from Excel
        let successfulUpdates = 0;
        
        for (let i = 0; i < members.length; i++) {
            const member = members[i];
            if (i < data.length) {
                const realName = data[i]['Member'];
                
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
updateMemberNamesFromExcel();
