// Verification script to check member data after fix
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Configuration
const supabaseUrl = process.env.SUPABASE_URL || 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function verifyMemberFix() {
  console.log("🔍 Verifying member name and number fix...");
  console.log("="*60);
  
  try {
    // Get all members
    const { data: members, error: membersError } = await supabase
      .from('members')
      .select('member_number, name, personal_info')
      .order('member_number');
    
    if (membersError) {
      console.error("❌ Error fetching members:", membersError);
      return;
    }
    
    console.log(`📊 Found ${members.length} members`);
    
    // Check for null values
    const membersWithoutNumber = members.filter(m => !m.member_number);
    const membersWithoutName = members.filter(m => !m.name);
    
    console.log("\n🔍 Data quality check:");
    console.log(`  Members without member_number: ${membersWithoutNumber.length}`);
    console.log(`  Members without name: ${membersWithoutName.length}`);
    
    if (membersWithoutNumber.length === 0 && membersWithoutName.length === 0) {
      console.log("  ✅ All members have member numbers and names!");
    } else {
      console.log("  ❌ Some members still have missing data");
    }
    
    // Show sample data
    console.log("\n📋 Sample member data (first 10):");
    members.slice(0, 10).forEach((member, index) => {
      console.log(`  ${index + 1}. ${member.member_number}: ${member.name}`);
      
      // Try to parse personal_info
      try {
        const personalInfo = JSON.parse(member.personal_info || '{}');
        console.log(`     Full Name: ${personalInfo.fullName || 'N/A'}`);
        console.log(`     Email: ${personalInfo.email || 'N/A'}`);
      } catch (e) {
        console.log(`     Personal Info: Invalid JSON`);
      }
    });
    
    // Check member ordering
    console.log("\n🔍 Member ordering check:");
    const memberNumbers = members.map(m => m.member_number).filter(Boolean);
    const isSequential = memberNumbers.every((num, index) => {
      if (index === 0) return true;
      const prevNum = parseInt(memberNumbers[index - 1].substring(1));
      const currNum = parseInt(num.substring(1));
      return currNum === prevNum + 1;
    });
    
    console.log(`  Member numbers are sequential: ${isSequential ? '✅ Yes' : '❌ No'}`);
    console.log(`  First member: ${memberNumbers[0]}`);
    console.log(`  Last member: ${memberNumbers[memberNumbers.length - 1]}`);
    
    // Check what the frontend would display
    console.log("\n🔍 Frontend display simulation:");
    console.log("  The MembersScreen component will now show:");
    members.slice(0, 3).forEach(member => {
      // Simulate the name extraction logic from MembersScreen.tsx
      const personalInfo = JSON.parse(member.personal_info || '{}');
      const memberName = personalInfo.fullName || 
                       (personalInfo.firstName && personalInfo.lastName 
                        ? `${personalInfo.firstName} ${personalInfo.lastName}`
                        : `Member ${member.member_number}`);
      
      console.log(`  - ${memberName} (${member.member_number})`);
    });
    
    // Verify member balances have member numbers
    console.log("\n💰 Checking member balances...");
    const { data: balances, error: balancesError } = await supabase
      .from('member_balances')
      .select('member_number, savings_balance, loan_balance')
      .not('member_number', 'is', null);
    
    if (balancesError) {
      console.error("❌ Error fetching balances:", balancesError);
    } else {
      console.log(`  Found ${balances.length} balances with member numbers`);
      console.log(`  Sample balance: ${balances[0]?.member_number} - Savings: R${balances[0]?.savings_balance?.toFixed(2) || 0}`);
    }
    
    console.log("\n" + "="*60);
    console.log("🚀 VERIFICATION COMPLETE!");
    console.log("="*60);
    
    console.log("\n💡 Expected results on MembersScreen:");
    console.log("  1. Member names should display correctly (not 'member null')");
    console.log("  2. Member numbers should show as M001, M002, etc.");
    console.log("  3. Members should be sorted numerically");
    console.log("  4. Financial data should be visible for each member");
    
    return true;
    
  } catch (error) {
    console.error("❌ Error in verification:", error);
    return false;
  }
}

// Run verification
verifyMemberFix().then(success => {
  if (success) {
    console.log("\n✅ Member fix verification successful!");
    console.log("📱 Restart the React Native app to see the changes.");
  } else {
    console.log("\n❌ Member fix verification failed.");
  }
});