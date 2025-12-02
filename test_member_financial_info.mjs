// Test script to check member financial_info data
import { createClient } from '@supabase/supabase-js';

// Supabase project configuration
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testMemberFinancialInfo() {
  console.log('Testing member financial_info data...\n');

  // Test 1: Check members table structure and financial_info
  console.log('1. Checking members table structure:');
  try {
    const { data: members, error } = await supabase
      .from('members')
      .select('id, member_number, name, financial_info, catch_up_fee, penalties')
      .limit(10);

    if (error) {
      console.log(`   ❌ Error: ${error.message}`);
    } else {
      console.log(`   ✅ Found ${members?.length || 0} member records`);
      
      let totalCurrentBalance = 0;
      let membersWithFinancialInfo = 0;
      let membersWithoutFinancialInfo = 0;
      
      members.forEach((member, index) => {
        console.log(`\n   Member ${index + 1}: ${member.member_number} - ${member.name}`);
        
        if (member.financial_info) {
          membersWithFinancialInfo++;
          const financialInfo = member.financial_info;
          const currentBalance = financialInfo.current_balance || financialInfo.savings_balance || financialInfo.total_contributions || 0;
          totalCurrentBalance += currentBalance;
          
          console.log(`     Financial Info:`, JSON.stringify(financialInfo, null, 2));
          console.log(`     Current Balance: R ${currentBalance.toFixed(2)}`);
        } else {
          membersWithoutFinancialInfo++;
          console.log(`     No financial_info field`);
        }
        
        // Check catch_up_fee, penalties
        const outstandingAmount = (member.catch_up_fee || 0) + (member.penalties || 0);
        console.log(`     Outstanding (catch_up_fee + penalties): R ${outstandingAmount.toFixed(2)}`);
      });
      
      console.log(`\n   Summary:`);
      console.log(`     Members with financial_info: ${membersWithFinancialInfo}`);
      console.log(`     Members without financial_info: ${membersWithoutFinancialInfo}`);
      console.log(`     Total Current Balance (from financial_info): R ${totalCurrentBalance.toFixed(2)}`);
    }
  } catch (error) {
    console.log(`   ❌ Exception: ${error.message}`);
  }

  // Test 2: Calculate total fund value from all members
  console.log('\n2. Calculating total fund value from all members:');
  try {
    const { data: allMembers, error } = await supabase
      .from('members')
      .select('financial_info, catch_up_fee, penalties');

    if (error) {
      console.log(`   ❌ Error: ${error.message}`);
    } else {
      let totalFundValue = 0;
      let totalOutstanding = 0;
      let membersCount = allMembers?.length || 0;
      
      allMembers.forEach(member => {
        // Calculate current balance from various fields
        const financialInfo = member?.financial_info || {};
        const currentBalance = financialInfo.current_balance || 
                              financialInfo.savings_balance || 
                              financialInfo.total_contributions || 0;
        
        // Calculate outstanding amount
        const outstandingAmount = (member.catch_up_fee || 0) + (member.penalties || 0);
        
        totalFundValue += currentBalance;
        totalOutstanding += outstandingAmount;
      });
      
      console.log(`   ✅ Total Members: ${membersCount}`);
      console.log(`   ✅ Total Fund Value: R ${totalFundValue.toFixed(2)}`);
      console.log(`   ✅ Total Outstanding: R ${totalOutstanding.toFixed(2)}`);
      
      if (totalFundValue === 0) {
        console.log(`   ⚠️ WARNING: Total Fund Value is R 0.00`);
        console.log(`   This explains why Lesego sees R 0.00 on the dashboard`);
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
testMemberFinancialInfo();
