const { createClient } = require('@supabase/supabase-js');

// Use the same values from src/config/supabase.ts
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testMemberDataDirect() {
  console.log('Testing member data directly from database...\n');
  
  try {
    // Get all members with ALL their data
    console.log('1. Getting all members with all columns:');
    const { data: allMembers, error: allError } = await supabase
      .from('members')
      .select('*')
      .order('member_number');
    
    if (allError) {
      console.error('Error fetching all members:', allError);
      return;
    }
    
    if (!allMembers || allMembers.length === 0) {
      console.log('No members found in database');
      return;
    }
    
    console.log(`Found ${allMembers.length} members in database\n`);
    
    // Check specific members mentioned in the issue
    console.log('2. Checking specific members mentioned in the issue:');
    const specificMembers = ['M017', 'M041'];
    
    for (const memberNumber of specificMembers) {
      const member = allMembers.find(m => m.member_number === memberNumber);
      if (member) {
        console.log(`\n=== ${member.member_number} - ${member.name || 'No name'} ===`);
        console.log('All columns and values:');
        console.log(JSON.stringify(member, null, 2));
        
        // Check financial_info specifically
        if (member.financial_info) {
          console.log('\nFinancial Info:');
          console.log(JSON.stringify(member.financial_info, null, 2));
          
          // Check if current_balance exists and its value
          if (member.financial_info.current_balance !== undefined) {
            console.log(`\ncurrent_balance value: ${member.financial_info.current_balance}`);
            console.log(`Type: ${typeof member.financial_info.current_balance}`);
            console.log(`Is negative? ${member.financial_info.current_balance < 0}`);
          }
        }
        
        // Check other financial columns
        console.log('\nOther financial columns:');
        console.log(`expected_contribution_total: ${member.expected_contribution_total}`);
        console.log(`penalties_capped: ${member.penalties_capped}`);
        console.log(`catch_up_fee: ${member.catch_up_fee}`);
        console.log(`closing_balance: ${member.closing_balance}`);
      } else {
        console.log(`\n${memberNumber}: NOT FOUND in database`);
      }
    }
    
    // Check for any members with non-zero financial data
    console.log('\n\n3. Checking for members with non-zero financial data:');
    const membersWithFinancialData = allMembers.filter(member => {
      // Check financial_info.current_balance
      const finInfo = member.financial_info || {};
      const currentBalance = finInfo.current_balance || 0;
      
      // Check other financial columns
      const expectedTotal = member.expected_contribution_total || 0;
      const penalties = member.penalties_capped || 0;
      const catchUpFee = member.catch_up_fee || 0;
      const closingBalance = member.closing_balance || 0;
      
      return currentBalance !== 0 || expectedTotal !== 0 || penalties !== 0 || catchUpFee !== 0 || closingBalance !== 0;
    });
    
    console.log(`Found ${membersWithFinancialData.length} members with non-zero financial data:`);
    
    if (membersWithFinancialData.length > 0) {
      membersWithFinancialData.forEach(member => {
        const finInfo = member.financial_info || {};
        console.log(`\n${member.member_number} - ${member.name || 'No name'}:`);
        console.log(`  current_balance: ${finInfo.current_balance || 0}`);
        console.log(`  expected_contribution_total: ${member.expected_contribution_total || 0}`);
        console.log(`  penalties_capped: ${member.penalties_capped || 0}`);
        console.log(`  catch_up_fee: ${member.catch_up_fee || 0}`);
        console.log(`  closing_balance: ${member.closing_balance || 0}`);
      });
    } else {
      console.log('No members found with non-zero financial data');
    }
    
    // Check the structure of a few members to understand the data
    console.log('\n\n4. Sample member structure (first 3 members):');
    allMembers.slice(0, 3).forEach((member, index) => {
      console.log(`\nSample ${index + 1}: ${member.member_number} - ${member.name || 'No name'}`);
      console.log('Available columns:');
      Object.keys(member).forEach(key => {
        const value = member[key];
        if (value !== null && value !== undefined) {
          if (typeof value === 'object') {
            console.log(`  ${key}: ${JSON.stringify(value).substring(0, 100)}...`);
          } else {
            console.log(`  ${key}: ${value}`);
          }
        }
      });
    });
    
    // Check if there's any data in member_balances table
    console.log('\n\n5. Checking member_balances table:');
    const { data: balances, error: balancesError } = await supabase
      .from('member_balances')
      .select('*')
      .limit(5);
    
    if (balancesError) {
      console.log('Error fetching member_balances:', balancesError.message);
    } else if (balances && balances.length > 0) {
      console.log(`Found ${balances.length} rows in member_balances table:`);
      balances.forEach((balance, index) => {
        console.log(`\nRow ${index + 1}:`);
        console.log(JSON.stringify(balance, null, 2));
      });
    } else {
      console.log('member_balances table is empty or has no data');
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

testMemberDataDirect().then(() => {
  console.log('\n\nMember data test completed.');
  process.exit(0);
}).catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});