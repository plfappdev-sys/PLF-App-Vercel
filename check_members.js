const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkMembers() {
    console.log('🔍 Checking current member data...');
    
    try {
        const { data, error } = await supabase
            .from('members')
            .select('member_number, name')
            .order('member_number', { ascending: true })
            .limit(20);
        
        if (error) {
            console.error('❌ Error fetching members:', error);
            return;
        }
        
        console.log('📋 First 20 members:');
        data.forEach(member => {
            console.log(`  ${member.member_number}. ${member.name}`);
        });
        
        // Check Christopher Naude specifically
        const christopher = data.find(m => m.member_number === '6');
        console.log(`\n🎯 Christopher Naude check: Member ${christopher?.member_number} = ${christopher?.name}`);
        
    } catch (error) {
        console.error('❌ Unexpected error:', error);
    }
}

// Run the check
checkMembers();
