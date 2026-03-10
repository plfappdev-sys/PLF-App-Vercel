const { createClient } = require('@supabase/supabase-js');

async function testFinalVerification() {
    console.log("TESTING FINAL VERIFICATION...");
    console.log("=".repeat(80));
    
    const supabaseUrl = "https://zdnyhzasvifrskbostgn.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAyNDQ4NCwiZXhwIjoyMDczNjAwNDg0fQ.kOpqoycVNdJXC-fqqxwHPVof6e8JlJ60_J7WWF-1AHU";
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    try {
        // Get all members with their financial_info
        const { data: members, error } = await supabase
            .from('members')
            .select('member_number, name, financial_info');
        
        if (error) {
            console.error("Error fetching members:", error);
            return;
        }
        
        console.log(`Found ${members.length} members in database`);
        
        // Calculate total contributions
        let totalContributions = 0;
        let memberCount = 0;
        
        console.log("\nINDIVIDUAL MEMBER CONTRIBUTIONS:");
        console.log("-".repeat(80));
        
        for (const member of members) {
            let financialInfo = member.financial_info;
            
            if (typeof financialInfo === 'string') {
                try {
                    financialInfo = JSON.parse(financialInfo);
                } catch (e) {
                    financialInfo = {};
                }
            } else if (!financialInfo) {
                financialInfo = {};
            }
            
            const contributions = financialInfo.total_contributions || 0;
            totalContributions += contributions;
            memberCount++;
            
            console.log(`${member.member_number}: ${member.name} - R ${contributions.toFixed(2)}`);
        }
        
        console.log("\n" + "=".repeat(80));
        console.log("FINAL RESULTS:");
        console.log("-".repeat(80));
        console.log(`Total Members: ${memberCount}`);
        console.log(`Total Fund Contributions: R ${totalContributions.toFixed(2)}`);
        console.log(`Formatted: R ${totalContributions.toLocaleString('en-ZA', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`);
        
        // Compare with expected values
        const expectedTotal = 580088.89;
        const previousTotal = 242440.00;
        
        console.log("\n" + "=".repeat(80));
        console.log("COMPARISON:");
        console.log("-".repeat(80));
        console.log(`Previous Database Total: R ${previousTotal.toFixed(2)}`);
        console.log(`Current Database Total:  R ${totalContributions.toFixed(2)}`);
        console.log(`Expected Excel Total:    R ${expectedTotal.toFixed(2)}`);
        
        if (Math.abs(totalContributions - expectedTotal) < 0.01) {
            console.log("\n✅ SUCCESS: Database matches Excel!");
            console.log(`   The application should now show: R ${totalContributions.toLocaleString('en-ZA', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`);
        } else {
            console.log("\n❌ ERROR: Database doesn't match Excel!");
            console.log(`   Difference: R ${(totalContributions - expectedTotal).toFixed(2)}`);
        }
        
        // Check individual members
        console.log("\n" + "=".repeat(80));
        console.log("SAMPLE MEMBER VERIFICATION:");
        console.log("-".repeat(80));
        
        // Check a few key members
        const sampleMembers = [
            { name: "Christopher Naude", expected: 5600.00 },
            { name: "Lesego Bokaba", expected: 13430.00 },
            { name: "Nicholas Molale", expected: 23160.00 }
        ];
        
        for (const sample of sampleMembers) {
            const member = members.find(m => m.name === sample.name);
            if (member) {
                let financialInfo = member.financial_info;
                if (typeof financialInfo === 'string') {
                    try {
                        financialInfo = JSON.parse(financialInfo);
                    } catch (e) {
                        financialInfo = {};
                    }
                }
                
                const actual = financialInfo.total_contributions || 0;
                const match = Math.abs(actual - sample.expected) < 0.01;
                
                console.log(`${match ? '✅' : '❌'} ${member.member_number}: ${member.name}`);
                console.log(`   Expected: R ${sample.expected.toFixed(2)}`);
                console.log(`   Actual:   R ${actual.toFixed(2)}`);
                console.log(`   Match: ${match ? 'YES' : 'NO'}`);
            } else {
                console.log(`❌ Member not found: ${sample.name}`);
            }
        }
        
    } catch (error) {
        console.error("Error in test:", error);
    }
}

testFinalVerification();