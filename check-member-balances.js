const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.PROJECT_URL || 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseKey = process.env.SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkMemberBalances() {
    console.log('🔍 Checking member_balances table...\n');
    
    try {
        // Get all member balances
        const { data: balances, error } = await supabase
            .from('member_balances')
            .select('*')
            .order('member_id', { ascending: true });
        
        if (error) {
            console.error('❌ Error fetching member balances:', error);
            return;
        }
        
        console.log(`✅ Found ${balances.length} member balances:\n`);
        
        // Get member names for better display
        const { data: members, error: membersError } = await supabase
            .from('members')
            .select('id, name, member_number');
        
        if (membersError) {
            console.error('❌ Error fetching members:', membersError);
            return;
        }
        
        // Create member lookup
        const memberLookup = {};
        members.forEach(member => {
            memberLookup[member.id] = member;
        });
        
        // Display balances
        balances.forEach(balance => {
            const member = memberLookup[balance.member_id];
            const memberName = member ? member.name : `Member ${balance.member_id}`;
            const memberNumber = member ? member.member_number : 'Unknown';
            
            console.log(`${memberNumber} - ${memberName}:`);
            console.log(`  Savings Balance: R${balance.savings_balance.toFixed(2)}`);
            console.log(`  Net Balance: R${balance.net_balance.toFixed(2)}`);
            console.log(`  Share Value: R${balance.share_value.toFixed(2)}`);
            console.log('');
        });
        
        // Calculate total fund value
        const totalFundValue = balances.reduce((sum, balance) => sum + balance.savings_balance, 0);
        console.log(`💰 TOTAL FUND VALUE: R${totalFundValue.toFixed(2)}`);
        console.log(`👥 MEMBERS WITH BALANCES: ${balances.length}`);
        
    } catch (error) {
        console.error('❌ Unexpected error:', error);
    }
}

checkMemberBalances();
