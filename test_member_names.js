// Test script to check member name data
const { SupabaseMemberService } = require('./src/services/supabaseMemberService.ts');

async function testMemberNames() {
  console.log("🔍 Testing member name data...");
  console.log("="*60);
  
  try {
    // Get all members
    const members = await SupabaseMemberService.getAllMembers();
    
    console.log(`📊 Found ${members.length} members`);
    
    // Check first 5 members for name data
    console.log("\n📋 Sample member data (first 5):");
    members.slice(0, 5).forEach((member, index) => {
      console.log(`\nMember ${index + 1}:`);
      console.log(`  Member Number: ${member.memberNumber}`);
      console.log(`  Full Name: ${member.personalInfo?.fullName || 'NOT FOUND'}`);
      console.log(`  First Name: ${member.personalInfo?.firstName || 'NOT FOUND'}`);
      console.log(`  Last Name: ${member.personalInfo?.lastName || 'NOT FOUND'}`);
      console.log(`  Has personalInfo: ${!!member.personalInfo}`);
      console.log(`  personalInfo type: ${typeof member.personalInfo}`);
      
      // Check if personalInfo is an object
      if (member.personalInfo && typeof member.personalInfo === 'object') {
        console.log(`  personalInfo keys: ${Object.keys(member.personalInfo).join(', ')}`);
      }
    });
    
    // Check for members with null/undefined names
    console.log("\n🔍 Members with name issues:");
    const membersWithNameIssues = members.filter(member => 
      !member.personalInfo?.fullName && 
      !member.personalInfo?.firstName && 
      !member.personalInfo?.lastName
    );
    
    console.log(`  Found ${membersWithNameIssues.length} members with name issues`);
    
    if (membersWithNameIssues.length > 0) {
      console.log("\n📝 Members needing name fixes:");
      membersWithNameIssues.slice(0, 10).forEach(member => {
        console.log(`  - ${member.memberNumber}: No name data found`);
      });
    }
    
    // Check database structure
    console.log("\n💡 Possible issues:");
    console.log("  1. Database 'name' column might be empty");
    console.log("  2. 'personal_info' JSON field might be empty or malformed");
    console.log("  3. Member data import might not have included names");
    
  } catch (error) {
    console.error("❌ Error testing member names:", error);
  }
}

// Run the test
testMemberNames().then(() => {
  console.log("\n" + "="*60);
  console.log("🚀 TEST COMPLETE");
  console.log("="*60);
});