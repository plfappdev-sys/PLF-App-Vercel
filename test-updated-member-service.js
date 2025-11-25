const { SupabaseMemberService } = require('./src/services/supabaseMemberService');

async function testUpdatedMemberService() {
    console.log('🧪 Testing Updated Member Service...\n');
    
    try {
        // Test 1: Get fund statistics
        console.log('📊 Testing getFundStatistics()...');
        const stats = await SupabaseMemberService.getFundStatistics();
        console.log('✅ Fund Statistics:');
        console.log(`   Total Members: ${stats.totalMembers}`);
        console.log(`   Total Fund Value: R${stats.totalFundValue.toFixed(2)}`);
        console.log(`   Total Loans Outstanding: R${stats.totalLoansOutstanding.toFixed(2)}`);
        console.log('');
        
        // Test 2: Get a specific member
        console.log('👤 Testing getMemberByNumber() for M001...');
        const member = await SupabaseMemberService.getMemberByNumber('M001');
        if (member) {
            console.log('✅ Member Data:');
            console.log(`   Member Number: ${member.memberNumber}`);
            console.log(`   Name: ${member.personalInfo?.fullName || 'N/A'}`);
            console.log(`   Current Balance: R${member.financialInfo.currentBalance.toFixed(2)}`);
            console.log(`   Total Contributions: R${member.financialInfo.totalContributions.toFixed(2)}`);
        } else {
            console.log('❌ Member not found');
        }
        console.log('');
        
        // Test 3: Get all members (first 5)
        console.log('👥 Testing getAllMembers() (first 5)...');
        const allMembers = await SupabaseMemberService.getAllMembers();
        console.log(`✅ Found ${allMembers.length} members`);
        
        if (allMembers.length > 0) {
            console.log('First 5 members:');
            allMembers.slice(0, 5).forEach((member, index) => {
                console.log(`   ${index + 1}. ${member.memberNumber} - ${member.personalInfo?.fullName || 'N/A'}: R${member.financialInfo.currentBalance.toFixed(2)}`);
            });
        }
        
        console.log('\n🎉 All tests completed successfully!');
        
    } catch (error) {
        console.error('❌ Error testing member service:', error);
    }
}

testUpdatedMemberService();
