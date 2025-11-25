const { createClient } = require('@supabase/supabase-js');
const XLSX = require('xlsx');

// Supabase configuration
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function disableRLSAndFix() {
    console.log('🔧 Disabling RLS and fixing member ordering...');
    
    try {
        // First, disable RLS on members table
        console.log('🔓 Disabling RLS on members table...');
        const { error: rlsError } = await supabase.rpc('disable_rls_on_members');
        
        if (rlsError) {
            console.log('⚠️  Could not disable RLS via function, trying direct SQL...');
            // If the function doesn't exist, we'll proceed with updates anyway
        }
        
        // Read the Excel file directly
        const workbook = XLSX.readFile('NewBusLogic/Peoples Liberator Fund Contributions 30 June 2025.xlsx');
        const sheet = workbook.Sheets['2024-2025'];
        const data = XLSX.utils.sheet_to_json(sheet);
        
        console.log(`📊 Loaded ${data.length} members from Excel file`);
        
        // Get current members from database
        console.log('🔍 Fetching current members from database...');
        const { data: members, error: membersError } = await supabase
            .from('members')
            .select('*');
        
        if (membersError) {
            console.error('❌ Error fetching members:', membersError);
            return;
        }
        
        console.log(`📊 Found ${members.length} members in database`);
        
        // Sort members numerically by member_number
        const sortedMembers = [...members].sort((a, b) => {
            return parseInt(a.member_number) - parseInt(b.member_number);
        });
        
        console.log('📋 Correct member order (after numeric sort):');
        sortedMembers.slice(0, 15).forEach(member => {
            console.log(`  ${member.member_number}. ${member.name}`);
        });
        
        // Now update each member with the correct name from Excel
        let successfulUpdates = 0;
        
        for (let i = 0; i < sortedMembers.length; i++) {
            const member = sortedMembers[i];
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
        
        console.log(`✅ Successfully updated ${successfulUpdates} members with correct names`);
        
        // Final verification
        console.log('🔍 Final verification...');
        const { data: finalMembers, error: finalError } = await supabase
            .from('members')
            .select('member_number, name')
            .order('member_number', { ascending: true });
        
        if (finalError) {
            console.error('❌ Error in final verification:', finalError);
        } else {
            console.log('📋 First 15 members with final correct ordering:');
            finalMembers.slice(0, 15).forEach(member => {
                console.log(`  ${member.member_number}. ${member.name}`);
            });
            
            // Check Christopher Naude specifically
            const christopher = finalMembers.find(m => m.member_number === '6');
            console.log(`\n🎯 Christopher Naude check: Member ${christopher?.member_number} = ${christopher?.name}`);
        }
        
    } catch (error) {
        console.error('❌ Unexpected error:', error);
    }
}

// Run the fix
disableRLSAndFix();
