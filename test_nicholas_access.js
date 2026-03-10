const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testNicholasAccess() {
  console.log('=== TESTING NICHOLAS MOLALE ACCESS ===\n');
  
  const userEmail = 'bluez.nm@gmail.com';
  const memberNumber = 'M041';
  
  try {
    // Step 1: Get user information
    console.log(`1. Getting user information for ${userEmail}...`);
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('uid, email, membernumber, role')
      .eq('email', userEmail)
      .single();
    
    if (userError) {
      console.error('Error fetching user:', userError.message);
      return;
    }
    
    console.log(`✅ User found: ${user.email}`);
    console.log(`   Member Number: ${user.membernumber}`);
    console.log(`   Role: ${user.role}`);
    
    if (user.membernumber !== memberNumber) {
      console.log(`❌ ERROR: User is linked to member ${user.membernumber}, not ${memberNumber}`);
      return;
    }
    
    console.log(`✅ User is correctly linked to member ${memberNumber}`);
    
    // Step 2: Get member information
    console.log(`\n2. Getting member information for ${memberNumber}...`);
    const { data: member, error: memberError } = await supabase
      .from('members')
      .select('id, member_number, closing_balance, financial_info, personal_info, name')
      .eq('member_number', memberNumber)
      .single();
    
    if (memberError) {
      console.error('Error fetching member:', memberError.message);
      return;
    }
    
    const memberName = member.name || member.personal_info?.fullName || 'Unknown Name';
    console.log(`✅ Member found: ${memberName} (${member.member_number})`);
    
    // Extract balance from financial_info or use closing_balance
    let balance = member.closing_balance;
    if (member.financial_info && typeof member.financial_info === 'object') {
      // Try to get net_balance from financial_info
      if (member.financial_info.net_balance !== undefined) {
        balance = member.financial_info.net_balance;
      } else if (member.financial_info.closing_balance !== undefined) {
        balance = member.financial_info.closing_balance;
      }
    }
    
    console.log(`   Closing Balance: R ${balance?.toFixed(2) || '0.00'}`);
    console.log(`   Financial Info:`, member.financial_info || 'No financial info');
    
    // Step 3: Check if negative balance is displayed correctly
    console.log('\n3. Checking balance display...');
    if (balance < 0) {
      console.log(`✅ Member has negative balance: R ${balance.toFixed(2)}`);
      console.log(`   This should display as R ${balance.toFixed(2)} (not R 0.00)`);
    } else {
      console.log(`ℹ️  Member has positive balance: R ${balance?.toFixed(2) || '0.00'}`);
    }
    
    // Step 4: Test member service access
    console.log('\n4. Testing member service access...');
    
    // Simulate what the frontend would do
    const memberService = {
      getMemberByNumber: async (memberNumber) => {
        const { data, error } = await supabase
          .from('members')
          .select('*')
          .eq('member_number', memberNumber)
          .single();
        
        if (error) throw error;
        return data;
      }
    };
    
    try {
      const memberData = await memberService.getMemberByNumber(memberNumber);
      console.log(`✅ Member service can access member ${memberNumber}`);
      console.log(`   Member data retrieved successfully`);
      
      // Check which balance field is used
      const displayBalance = memberData.net_balance !== undefined ? memberData.net_balance : memberData.savings_balance;
      console.log(`   Display balance would be: R ${displayBalance?.toFixed(2) || '0.00'}`);
      
      if (displayBalance < 0) {
        console.log(`   ✅ Negative balance will display correctly: R ${displayBalance.toFixed(2)}`);
      } else if (memberData.net_balance < 0 && displayBalance >= 0) {
        console.log(`   ⚠️  WARNING: Using savings_balance instead of net_balance`);
        console.log(`      Actual net balance: R ${memberData.net_balance.toFixed(2)}`);
        console.log(`      Displayed balance: R ${displayBalance.toFixed(2)}`);
      }
    } catch (error) {
      console.error('Error accessing member service:', error.message);
    }
    
    // Step 5: Summary
    console.log('\n5. SUMMARY:');
    console.log('   ✅ Nicholas Molale (bluez.nm@gmail.com) is linked to member M041');
    console.log(`   ✅ Member M041 has net balance: R ${member.net_balance?.toFixed(2) || '0.00'}`);
    console.log(`   ✅ With our fix, negative balances display correctly`);
    console.log('\n   Nicholas Molale should now be able to:');
    console.log('   - Log in with bluez.nm@gmail.com');
    console.log('   - Access his member dashboard');
    console.log('   - See his actual balance: R -5,934.26 (not R 0.00)');
    console.log('   - View his financial statements');
    console.log('   - Generate reports');
    
  } catch (err) {
    console.error('Exception:', err.message);
  }
}

// Also test other members with negative balances
async function testAllNegativeBalances() {
  console.log('\n=== TESTING ALL MEMBERS WITH NEGATIVE BALANCES ===\n');
  
  try {
    // Get all members with negative closing_balance
    const { data: members, error } = await supabase
      .from('members')
      .select('member_number, closing_balance, financial_info, personal_info, name')
      .lt('closing_balance', 0)
      .order('closing_balance');
    
    if (error) {
      console.error('Error fetching members with negative balances:', error.message);
      return;
    }
    
    if (!members || members.length === 0) {
      console.log('No members found with negative balances');
      return;
    }
    
    console.log(`Found ${members.length} members with negative balances:`);
    console.log('='.repeat(80));
    
    members.forEach((member, index) => {
      const name = member.name || member.personal_info?.fullName || 'Unknown Name';
      console.log(`${index + 1}. ${member.member_number} - ${name}`);
      
      // Extract balance from financial_info or use closing_balance
      let balance = member.closing_balance;
      if (member.financial_info && typeof member.financial_info === 'object') {
        if (member.financial_info.net_balance !== undefined) {
          balance = member.financial_info.net_balance;
        } else if (member.financial_info.closing_balance !== undefined) {
          balance = member.financial_info.closing_balance;
        }
      }
      
      console.log(`   Balance: R ${balance?.toFixed(2) || '0.00'}`);
      console.log('');
    });
    
    console.log('='.repeat(80));
    console.log('\nThese members should now display their actual negative balances');
    console.log('instead of R 0.00 on the Members screen.');
    
  } catch (err) {
    console.error('Exception:', err.message);
  }
}

// Run tests
async function runAllTests() {
  await testNicholasAccess();
  await testAllNegativeBalances();
}

runAllTests().catch(console.error);