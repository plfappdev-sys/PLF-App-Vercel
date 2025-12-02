// Test script to check user permissions and RLS policies
import { createClient } from '@supabase/supabase-js';

// Supabase project configuration
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';

// Create Supabase client with anon key (simulating regular user access)
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testUserPermissions() {
  console.log('Testing user permissions and RLS policies...\n');

  // Test 1: Check if we can access all members as anonymous user
  console.log('1. Testing access to all members (anonymous user):');
  try {
    const { data: members, error } = await supabase
      .from('members')
      .select('id, member_number, name, financial_info')
      .limit(5);

    if (error) {
      console.log(`   ❌ Error: ${error.message}`);
      console.log(`   Code: ${error.code}`);
      console.log(`   Details: ${error.details}`);
      console.log(`   Hint: ${error.hint}`);
    } else {
      console.log(`   ✅ Success! Found ${members?.length || 0} member records`);
      if (members && members.length > 0) {
        console.log(`   Sample member: ${members[0].member_number} - ${members[0].name}`);
        if (members[0].financial_info) {
          const balance = members[0].financial_info.current_balance || 0;
          console.log(`   Balance: R ${balance.toFixed(2)}`);
        }
      }
    }
  } catch (error) {
    console.log(`   ❌ Exception: ${error.message}`);
  }

  // Test 2: Calculate total fund value as anonymous user
  console.log('\n2. Calculating total fund value (anonymous user):');
  try {
    const { data: allMembers, error } = await supabase
      .from('members')
      .select('financial_info');

    if (error) {
      console.log(`   ❌ Error: ${error.message}`);
    } else {
      let totalFundValue = 0;
      let membersCount = allMembers?.length || 0;
      
      allMembers.forEach(member => {
        if (member.financial_info) {
          const financialInfo = member.financial_info;
          const currentBalance = financialInfo.current_balance || 0;
          totalFundValue += currentBalance;
        }
      });
      
      console.log(`   ✅ Total Members Found: ${membersCount}`);
      console.log(`   ✅ Total Fund Value: R ${totalFundValue.toFixed(2)}`);
      
      if (totalFundValue === 0) {
        console.log(`   ⚠️ WARNING: Total Fund Value is R 0.00 for anonymous user`);
        console.log(`   This suggests RLS policies are restricting access`);
      } else {
        console.log(`   ✅ SUCCESS: Non-zero total fund value found for anonymous user`);
      }
    }
  } catch (error) {
    console.log(`   ❌ Exception: ${error.message}`);
  }

  // Test 3: Check RLS policies by trying to insert a record
  console.log('\n3. Testing RLS by attempting to insert (should fail for anonymous):');
  try {
    const { error } = await supabase
      .from('members')
      .insert({
        member_number: 9999,
        name: 'Test User'
      });

    if (error) {
      console.log(`   ✅ Expected error (RLS working): ${error.message}`);
    } else {
      console.log(`   ⚠️ WARNING: Insert succeeded - RLS might be disabled`);
    }
  } catch (error) {
    console.log(`   ❌ Exception: ${error.message}`);
  }

  // Test 4: Check if we can see member_balances table
  console.log('\n4. Testing access to member_balances table:');
  try {
    const { data: balances, error } = await supabase
      .from('member_balances')
      .select('*')
      .limit(5);

    if (error) {
      console.log(`   ❌ Error: ${error.message}`);
      if (error.code === '42501') {
        console.log(`   ⚠️ This is a permission error - RLS is blocking access`);
      }
    } else {
      console.log(`   ✅ Success! Found ${balances?.length || 0} balance records`);
      if (balances && balances.length > 0) {
        console.log(`   Sample balance: Member ID ${balances[0].member_id}`);
      }
    }
  } catch (error) {
    console.log(`   ❌ Exception: ${error.message}`);
  }

  console.log('\n=== Test Complete ===');
  console.log('\nAnalysis:');
  console.log('1. If anonymous user can see all members and their balances, RLS might be disabled');
  console.log('2. If anonymous user sees 0 members or 0 balance, RLS is working');
  console.log('3. Lesego (regular user) might have different permissions than anonymous');
  console.log('4. The issue might be in the SupabaseMemberService.getFundStatistics() method');
}

// Run the test
testUserPermissions();
