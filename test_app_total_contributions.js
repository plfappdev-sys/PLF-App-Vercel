// Test script to verify total contributions are showing correctly in the app
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function testAppTotalContributions() {
    console.log("Testing app total contributions display...\n");
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Test 1: Check specific members
    console.log("=== TEST 1: CHECK SPECIFIC MEMBERS ===");
    
    const testMembers = [
        { name: "Lesego Bokaba", number: "M031", expected: 5300 },
        { name: "Christopher Naude", number: "M004", expected: 2500 },
        { name: "Jeff Matlou", number: "M017", expected: 18100 },
        { name: "Nicholas Molale", number: "M041", expected: 14400 },
        { name: "Matshediso Ellen Tyobeka", number: "M033", expected: 13900 }
    ];
    
    for (const member of testMembers) {
        const { data, error } = await supabase
            .from('members')
            .select('name, member_number, financial_info')
            .eq('member_number', member.number)
            .single();
        
        if (error) {
            console.log(`❌ Error fetching ${member.name}: ${error.message}`);
            continue;
        }
        
        let financialInfo = data.financial_info;
        if (typeof financialInfo === 'string') {
            try {
                financialInfo = JSON.parse(financialInfo);
            } catch (e) {
                console.log(`❌ Error parsing financial_info for ${member.name}`);
                continue;
            }
        }
        
        const totalContributions = financialInfo?.total_contributions || 0;
        const match = Math.abs(totalContributions - member.expected) < 0.01;
        
        console.log(`${match ? '✅' : '❌'} ${member.name} (${member.number}):`);
        console.log(`   Expected: R${member.expected.toFixed(2)}`);
        console.log(`   Actual: R${totalContributions.toFixed(2)}`);
        console.log(`   Match: ${match ? 'YES' : 'NO'}\n`);
    }
    
    // Test 2: Check member_balances table
    console.log("=== TEST 2: CHECK MEMBER_BALANCES TABLE ===");
    
    const { data: balancesData, error: balancesError } = await supabase
        .from('member_balances')
        .select('member_number, total_contributions')
        .order('total_contributions', { ascending: false })
        .limit(5);
    
    if (balancesError) {
        console.log(`❌ Error fetching member_balances: ${balancesError.message}`);
    } else {
        console.log("Top 5 contributors from member_balances:");
        balancesData.forEach((balance, index) => {
            console.log(`${index + 1}. ${balance.member_number}: R${balance.total_contributions.toFixed(2)}`);
        });
        console.log();
    }
    
    // Test 3: Check data consistency
    console.log("=== TEST 3: CHECK DATA CONSISTENCY ===");
    
    const { data: allMembers, error: allMembersError } = await supabase
        .from('members')
        .select('id, name, member_number, financial_info');
    
    if (allMembersError) {
        console.log(`❌ Error fetching all members: ${allMembersError.message}`);
    } else {
        let consistentCount = 0;
        let inconsistentCount = 0;
        
        for (const member of allMembers) {
            let financialInfo = member.financial_info;
            if (typeof financialInfo === 'string') {
                try {
                    financialInfo = JSON.parse(financialInfo);
                } catch (e) {
                    inconsistentCount++;
                    continue;
                }
            }
            
            const memberTotal = financialInfo?.total_contributions || 0;
            
            // Get member_balance
            const { data: balanceData } = await supabase
                .from('member_balances')
                .select('total_contributions')
                .eq('member_id', member.id)
                .single();
            
            if (balanceData) {
                const balanceTotal = balanceData.total_contributions || 0;
                const isConsistent = Math.abs(memberTotal - balanceTotal) < 0.01;
                
                if (isConsistent) {
                    consistentCount++;
                } else {
                    inconsistentCount++;
                    console.log(`⚠️  Inconsistent: ${member.name} (${member.member_number})`);
                    console.log(`   Members table: R${memberTotal.toFixed(2)}`);
                    console.log(`   Member_balances: R${balanceTotal.toFixed(2)}\n`);
                }
            }
        }
        
        console.log(`Consistency check: ${consistentCount} consistent, ${inconsistentCount} inconsistent`);
        console.log(`${inconsistentCount === 0 ? '✅' : '❌'} All data is ${inconsistentCount === 0 ? 'consistent' : 'INCONSISTENT'}\n`);
    }
    
    // Test 4: Check what the app should show
    console.log("=== TEST 4: APP DISPLAY VERIFICATION ===");
    console.log("The app should now show in 'My Funds Screen':");
    console.log("1. 'Total Contributions' = Sum of all contributions from join date");
    console.log("2. Accurate historical contribution data");
    console.log("3. Correct member financial profiles");
    console.log("4. Consistent data across all views");
    
    // Test 5: Quick statistics
    console.log("\n=== TEST 5: QUICK STATISTICS ===");
    
    const { data: statsData, error: statsError } = await supabase
        .from('members')
        .select('financial_info');
    
    if (!statsError && statsData) {
        let totalAllContributions = 0;
        let memberCount = 0;
        
        for (const member of statsData) {
            let financialInfo = member.financial_info;
            if (typeof financialInfo === 'string') {
                try {
                    financialInfo = JSON.parse(financialInfo);
                } catch (e) {
                    continue;
                }
            }
            
            const contributions = financialInfo?.total_contributions || 0;
            totalAllContributions += contributions;
            memberCount++;
        }
        
        const average = memberCount > 0 ? totalAllContributions / memberCount : 0;
        
        console.log(`Total members with contributions: ${memberCount}`);
        console.log(`Total contributions across all members: R${totalAllContributions.toFixed(2)}`);
        console.log(`Average contributions per member: R${average.toFixed(2)}`);
    }
    
    console.log("\n=== TEST COMPLETE ===");
    console.log("Run the app and check 'My Funds Screen' to verify total contributions are showing correctly.");
}

// Run the test
testAppTotalContributions().catch(console.error);