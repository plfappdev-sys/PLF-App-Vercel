const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function verifyCompleteDataImport() {
    console.log('🔍 VERIFYING COMPLETE DATA IMPORT STATUS\n');
    
    try {
        // 1. Check member names
        console.log('📊 1. MEMBER NAMES VERIFICATION:');
        const { data: members, error: membersError } = await supabase
            .from('members')
            .select('member_number, name')
            .order('member_number', { ascending: true });
        
        if (membersError) {
            console.error('❌ Error fetching members:', membersError);
            return;
        }
        
        console.log(`   Total members: ${members.length}`);
        
        // Check if names are real or "Member X"
        const realNames = members.filter(m => m.name && !m.name.startsWith('Member '));
        const memberNames = members.filter(m => m.name && m.name.startsWith('Member '));
        const nullNames = members.filter(m => !m.name);
        
        console.log(`   ✅ Real names: ${realNames.length}`);
        console.log(`   ⚠️  "Member X" names: ${memberNames.length}`);
        console.log(`   ❌ Null names: ${nullNames.length}`);
        
        // Show first 5 real names
        console.log('   Sample real names:');
        realNames.slice(0, 5).forEach(m => {
            console.log(`     ${m.member_number}. ${m.name}`);
        });
        
        // 2. Check financial data tables
        console.log('\n💰 2. FINANCIAL DATA TABLES:');
        
        // Check contributions table
        const { data: contributions, error: contributionsError } = await supabase
            .from('contributions')
            .select('*')
            .limit(5);
        
        if (contributionsError) {
            console.log('   ❌ contributions table: Error or empty');
        } else {
            console.log(`   ✅ contributions table: ${contributions.length} records found`);
        }
        
        // Check member_balances table
        const { data: balances, error: balancesError } = await supabase
            .from('member_balances')
            .select('*')
            .limit(5);
        
        if (balancesError) {
            console.log('   ❌ member_balances table: Error or empty');
        } else {
            console.log(`   ✅ member_balances table: ${balances.length} records found`);
        }
        
        // Check transactions table
        const { data: transactions, error: transactionsError } = await supabase
            .from('transactions')
            .select('*')
            .limit(5);
        
        if (transactionsError) {
            console.log('   ❌ transactions table: Error or empty');
        } else {
            console.log(`   ✅ transactions table: ${transactions.length} records found`);
        }
        
        // 3. Check Excel data columns in database
        console.log('\n📋 3. EXCEL COLUMNS IN DATABASE:');
        
        // Check if members have financial columns
        const { data: sampleMember, error: sampleError } = await supabase
            .from('members')
            .select('*')
            .limit(1)
            .single();
        
        if (sampleError) {
            console.log('   ❌ Cannot check member columns');
        } else {
            const financialColumns = [
                'closing_balance', 'share_value', 'date_joined', 
                'membership_fee', 'catch_up_fee', 'monthly_contribution'
            ];
            
            console.log('   Financial columns in members table:');
            financialColumns.forEach(col => {
                const hasColumn = sampleMember[col] !== undefined;
                const hasValue = sampleMember[col] !== null && sampleMember[col] !== undefined;
                console.log(`     ${hasColumn ? '✅' : '❌'} ${col}: ${hasValue ? 'Has value' : 'No value'}`);
            });
        }
        
        // 4. Check Christopher Naude specifically
        console.log('\n🎯 4. CHRISTOPHER NAUDE VERIFICATION:');
        const christopher = members.find(m => parseInt(m.member_number) === 6);
        if (christopher) {
            console.log(`   ✅ Member 6: ${christopher.name}`);
            if (christopher.name === 'Christopher Naude') {
                console.log('   ✅ CORRECT: Christopher Naude is at position 6');
            } else {
                console.log(`   ❌ INCORRECT: Expected "Christopher Naude" but got "${christopher.name}"`);
            }
        } else {
            console.log('   ❌ Member 6 not found');
        }
        
        // 5. Summary
        console.log('\n📈 5. IMPORT STATUS SUMMARY:');
        
        const totalMembers = members.length;
        const membersWithRealNames = realNames.length;
        const membersWithFinancialData = balances ? balances.length : 0;
        
        console.log(`   Total members: ${totalMembers}`);
        console.log(`   Members with real names: ${membersWithRealNames}/${totalMembers} (${Math.round(membersWithRealNames/totalMembers*100)}%)`);
        console.log(`   Members with financial data: ${membersWithFinancialData}/${totalMembers} (${Math.round(membersWithFinancialData/totalMembers*100)}%)`);
        
        if (membersWithRealNames === totalMembers && membersWithFinancialData === totalMembers) {
            console.log('\n🎉 ✅ COMPLETE DATA IMPORT: All data has been successfully imported!');
        } else if (membersWithRealNames === totalMembers) {
            console.log('\n⚠️  PARTIAL IMPORT: Member names are correct, but financial data may be incomplete');
        } else {
            console.log('\n❌ INCOMPLETE IMPORT: Both member names and financial data need attention');
        }
        
    } catch (error) {
        console.error('❌ Error during verification:', error);
    }
}

// Run the verification
verifyCompleteDataImport();
