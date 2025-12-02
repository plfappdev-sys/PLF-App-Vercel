// Test script to check member table columns
import { createClient } from '@supabase/supabase-js';

// Supabase project configuration
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testMemberColumns() {
  console.log('Testing member table columns...\n');

  // Test 1: Get first member to see what fields exist
  console.log('1. Getting first member to check structure:');
  try {
    const { data: member, error } = await supabase
      .from('members')
      .select('*')
      .limit(1);

    if (error) {
      console.log(`   ❌ Error: ${error.message}`);
    } else if (!member || member.length === 0) {
      console.log(`   ⚠️ No members found`);
    } else {
      const firstMember = member[0];
      console.log(`   ✅ Found member: ${firstMember.member_number} - ${firstMember.name}`);
      console.log(`   Available columns:`);
      
      const columns = Object.keys(firstMember);
      columns.forEach(col => {
        const value = firstMember[col];
        console.log(`     - ${col}: ${typeof value === 'object' ? JSON.stringify(value).substring(0, 100) + '...' : value}`);
      });
      
      // Check specifically for financial_info
      if (firstMember.financial_info) {
        console.log(`\n   Financial Info structure:`);
        console.log(JSON.stringify(firstMember.financial_info, null, 2));
        
        // Calculate current balance
        const financialInfo = firstMember.financial_info;
        const currentBalance = financialInfo.current_balance || 
                              financialInfo.savings_balance || 
                              financialInfo.total_contributions || 0;
        console.log(`   Current Balance: R ${currentBalance.toFixed(2)}`);
      } else {
        console.log(`\n   ⚠️ No financial_info field found`);
      }
    }
  } catch (error) {
    console.log(`   ❌ Exception: ${error.message}`);
  }

  // Test 2: Calculate total fund value from all members
  console.log('\n2. Calculating total fund value from all members:');
  try {
    const { data: allMembers, error } = await supabase
      .from('members')
      .select('financial_info');

    if (error) {
      console.log(`   ❌ Error: ${error.message}`);
    } else {
      let totalFundValue = 0;
      let membersCount = allMembers?.length || 0;
      let membersWithFinancialInfo = 0;
      let membersWithoutFinancialInfo = 0;
      
      allMembers.forEach(member => {
        if (member.financial_info) {
          membersWithFinancialInfo++;
          const financialInfo = member.financial_info;
          const currentBalance = financialInfo.current_balance || 
                                financialInfo.savings_balance || 
                                financialInfo.total_contributions || 0;
          totalFundValue += currentBalance;
        } else {
          membersWithoutFinancialInfo++;
        }
      });
      
      console.log(`   ✅ Total Members: ${membersCount}`);
      console.log(`   ✅ Members with financial_info: ${membersWithFinancialInfo}`);
      console.log(`   ✅ Members without financial_info: ${membersWithoutFinancialInfo}`);
      console.log(`   ✅ Total Fund Value: R ${totalFundValue.toFixed(2)}`);
      
      if (totalFundValue === 0) {
        console.log(`   ⚠️ WARNING: Total Fund Value is R 0.00`);
        console.log(`   This explains why Lesego sees R 0.00 on the dashboard`);
        console.log(`   The financial_info fields may be empty or contain zero values`);
      } else {
        console.log(`   ✅ SUCCESS: Non-zero total fund value found!`);
        console.log(`   The dashboard should show R ${totalFundValue.toFixed(2)}`);
      }
    }
  } catch (error) {
    console.log(`   ❌ Exception: ${error.message}`);
  }

  console.log('\n=== Test Complete ===');
}

// Run the test
testMemberColumns();
