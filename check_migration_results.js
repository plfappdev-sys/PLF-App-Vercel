const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkMigrationResults() {
    console.log('🔍 CHECKING MIGRATION RESULTS');
    console.log('==================================================\n');
    
    try {
        // Check members table for catch_up_fee and monthly_contribution
        console.log('📊 1. MEMBERS TABLE VERIFICATION:');
        const { data: members, error: membersError } = await supabase
            .from('members')
            .select('id, member_number, name, catch_up_fee, monthly_contribution')
            .limit(10);
        
        if (membersError) {
            console.log('❌ Error checking members:', membersError);
            return;
        }
        
        console.log('Sample members with financial data:');
        members.forEach(m => {
            console.log(`  ${m.member_number}. ${m.name}: catch_up_fee=R${m.catch_up_fee}, monthly_contribution=R${m.monthly_contribution}`);
        });
        
        // Check contributions table
        console.log('\n💰 2. CONTRIBUTIONS TABLE:');
        const { data: contributions, error: contributionsError } = await supabase
            .from('contributions')
            .select('*');
        
        if (contributionsError) {
            console.log('  ❌ Error:', contributionsError.message);
        } else {
            console.log(`  ✅ Records: ${contributions ? contributions.length : 0}`);
            if (contributions && contributions.length > 0) {
                console.log('  Sample contributions:');
                contributions.slice(0, 3).forEach(c => {
                    console.log(`    Member ${c.member_id}: ${c.contribution_month} - R${c.amount_paid}/${c.amount_due} (${c.status})`);
                });
            }
        }
        
        // Check member_balances table
        console.log('\n💳 3. MEMBER_BALANCES TABLE:');
        const { data: balances, error: balancesError } = await supabase
            .from('member_balances')
            .select('*');
        
        if (balancesError) {
            console.log('  ❌ Error:', balancesError.message);
        } else {
            console.log(`  ✅ Records: ${balances ? balances.length : 0}`);
            if (balances && balances.length > 0) {
                console.log('  Sample balances:');
                balances.slice(0, 3).forEach(b => {
                    console.log(`    Member ${b.member_id}: Savings R${b.savings_balance}, Loans R${b.loan_balance}, Net R${b.net_balance}`);
                });
            }
        }
        
        // Check transactions table
        console.log('\n💸 4. TRANSACTIONS TABLE:');
        const { data: transactions, error: transactionsError } = await supabase
            .from('transactions')
            .select('*', { count: 'exact' });
        
        if (transactionsError) {
            console.log('  ❌ Error:', transactionsError.message);
        } else {
            console.log(`  ✅ Records: ${transactions ? transactions.length : 0}`);
        }
        
        // Summary
        console.log('\n📈 5. MIGRATION SUMMARY:');
        const totalMembers = members ? members.length : 0;
        const membersWithCatchUpFees = members ? members.filter(m => m.catch_up_fee > 0).length : 0;
        const membersWithMonthlyContributions = members ? members.filter(m => m.monthly_contribution > 0).length : 0;
        
        console.log(`   Total members: ${totalMembers}`);
        console.log(`   Members with catch-up fees: ${membersWithCatchUpFees}/${totalMembers}`);
        console.log(`   Members with monthly contributions: ${membersWithMonthlyContributions}/${totalMembers}`);
        console.log(`   Contributions records: ${contributions ? contributions.length : 0}`);
        console.log(`   Member balances records: ${balances ? balances.length : 0}`);
        
        if (membersWithCatchUpFees === totalMembers && membersWithMonthlyContributions === totalMembers) {
            console.log('\n🎉 ✅ CATCH-UP FEE MIGRATION: SUCCESSFUL');
        } else {
            console.log('\n⚠️  CATCH-UP FEE MIGRATION: PARTIAL');
        }
        
        if (contributions && contributions.length > 0 && balances && balances.length > 0) {
            console.log('🎉 ✅ FINANCIAL DATA MIGRATION: SUCCESSFUL');
        } else {
            console.log('⚠️  FINANCIAL DATA MIGRATION: INCOMPLETE (No transaction data available)');
        }
        
    } catch (error) {
        console.error('❌ Error during verification:', error);
    }
}

checkMigrationResults();
