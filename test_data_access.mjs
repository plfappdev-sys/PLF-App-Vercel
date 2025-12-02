// Test script to check user data access differences using ES modules
import { createClient } from '@supabase/supabase-js';

// Supabase project configuration
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testUserDataAccess() {
  console.log('Testing user data access...\n');

  // Test 1: Check if we can access member_balances table
  console.log('1. Testing access to member_balances table:');
  try {
    const { data: balances, error } = await supabase
      .from('member_balances')
      .select('*')
      .limit(5);

    if (error) {
      console.log(`   ❌ Error: ${error.message}`);
      console.log(`   Code: ${error.code}`);
      console.log(`   Details: ${error.details}`);
    } else {
      console.log(`   ✅ Success! Found ${balances?.length || 0} balance records`);
      if (balances && balances.length > 0) {
        console.log(`   Sample balance: Member ID ${balances[0].member_id}, Savings: R ${balances[0].savings_balance}`);
      }
    }
  } catch (error) {
    console.log(`   ❌ Exception: ${error.message}`);
  }

  // Test 2: Check if we can access members table
  console.log('\n2. Testing access to members table:');
  try {
    const { data: members, error } = await supabase
      .from('members')
      .select('id, member_number, name')
      .limit(5);

    if (error) {
      console.log(`   ❌ Error: ${error.message}`);
      console.log(`   Code: ${error.code}`);
    } else {
      console.log(`   ✅ Success! Found ${members?.length || 0} member records`);
      if (members && members.length > 0) {
        console.log(`   Sample member: ${members[0].member_number} - ${members[0].name}`);
      }
    }
  } catch (error) {
    console.log(`   ❌ Exception: ${error.message}`);
  }

  // Test 3: Check total fund value calculation
  console.log('\n3. Testing total fund value calculation:');
  try {
    const { data: balances, error } = await supabase
      .from('member_balances')
      .select('savings_balance');

    if (error) {
      console.log(`   ❌ Error fetching balances: ${error.message}`);
    } else if (!balances || balances.length === 0) {
      console.log(`   ⚠️ No balance data found`);
    } else {
      const totalFundValue = balances.reduce((sum, balance) => {
        const savings = balance.savings_balance || 0;
        return sum + (typeof savings === 'number' ? savings : 0);
      }, 0);
      console.log(`   ✅ Total Fund Value: R ${totalFundValue.toFixed(2)}`);
      console.log(`   Based on ${balances.length} member balance records`);
    }
  } catch (error) {
    console.log(`   ❌ Exception: ${error.message}`);
  }

  // Test 4: Check current session/user
  console.log('\n4. Testing current session:');
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.log(`   ❌ Error getting session: ${error.message}`);
    } else if (!session) {
      console.log(`   ⚠️ No active session (not logged in)`);
    } else {
      console.log(`   ✅ Active session found`);
      console.log(`   User ID: ${session.user.id}`);
      console.log(`   User Email: ${session.user.email}`);
      console.log(`   Expires at: ${new Date(session.expires_at * 1000).toLocaleString()}`);
    }
  } catch (error) {
    console.log(`   ❌ Exception: ${error.message}`);
  }

  console.log('\n=== Test Complete ===');
}

// Run the test
testUserDataAccess();
