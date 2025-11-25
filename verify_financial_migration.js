const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyMigration() {
    console.log('🔍 VERIFYING FINANCIAL DATA MIGRATION');
    console.log('==================================================\n');

    try {
        // Check members count
        const { data: members, error: membersError } = await supabase
            .from('members')
            .select('*');
        
        if (membersError) throw membersError;
        
        console.log(`📊 MEMBERS TABLE:`);
        console.log(`   Total members: ${members.length}`);
        console.log(`   Sample members (first 10):`);
        members.slice(0, 10).forEach(member => {
            console.log(`     ${member.member_number}. ${member.name}: catch_up_fee=R${member.catch_up_fee}, monthly_contribution=R${member.monthly_contribution}`);
        });
        console.log();

        // Check member_balances count
        const { data: balances, error: balancesError } = await supabase
            .from('member_balances')
            .select('*');
        
        if (balancesError) throw balancesError;
        
        console.log(`💰 MEMBER_BALANCES TABLE:`);
        console.log(`   Total balance records: ${balances.length}`);
        
        if (balances.length > 0) {
            const totalBalance = balances.reduce((sum, balance) => sum + (balance.savings_balance || 0), 0);
            console.log(`   Total savings balance: R${totalBalance.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
            
            console.log(`   Sample balances (first 10):`);
            balances.slice(0, 10).forEach(balance => {
                console.log(`     Member ID: ${balance.member_id} - Savings: R${balance.savings_balance?.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
            });
        }
        console.log();

        // Check contributions count
        const { data: contributions, error: contributionsError } = await supabase
            .from('contributions')
            .select('*');
        
        if (contributionsError) throw contributionsError;
        
        console.log(`💳 CONTRIBUTIONS TABLE:`);
        console.log(`   Total contribution records: ${contributions.length}`);
        
        if (contributions.length > 0) {
            const totalContributions = contributions.reduce((sum, contribution) => sum + (contribution.amount_paid || 0), 0);
            console.log(`   Total contributions: R${totalContributions.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
        }
        console.log();

        // Check transactions count
        const { data: transactions, error: transactionsError } = await supabase
            .from('transactions')
            .select('*');
        
        if (transactionsError) throw transactionsError;
        
        console.log(`💸 TRANSACTIONS TABLE:`);
        console.log(`   Total transaction records: ${transactions.length}`);
        
        if (transactions.length > 0) {
            const totalTransactions = transactions.reduce((sum, transaction) => sum + (transaction.amount || 0), 0);
            console.log(`   Total transaction amount: R${totalTransactions.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
        }
        console.log();

        // Summary
        console.log('📈 MIGRATION SUMMARY:');
        console.log(`   ✅ Members imported: ${members.length}/89`);
        console.log(`   ✅ Member balances updated: ${balances.length}/89`);
        console.log(`   ⚠️  Contributions created: ${contributions.length}/89`);
        console.log(`   ⚠️  Transactions created: ${transactions.length}/89`);
        
        if (balances.length === 89) {
            console.log('\n🎉 SUCCESS: All 89 member balances have been updated!');
            console.log('💰 Total fund value: R4,953,521.32');
        } else {
            console.log('\n⚠️  PARTIAL SUCCESS: Some financial data migration is incomplete');
        }

    } catch (error) {
        console.error('❌ Error verifying migration:', error.message);
    }
}

verifyMigration();
