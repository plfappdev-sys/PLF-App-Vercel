const { createClient } = require('@supabase/supabase-js');

// Use the same values from src/config/supabase.ts
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to parse JSON strings
function parseJsonField(field) {
  if (!field) return {};
  if (typeof field === 'string') {
    try {
      return JSON.parse(field);
    } catch (error) {
      console.warn('Error parsing JSON field:', error);
      return {};
    }
  }
  return field;
}

async function testBalanceFix() {
  console.log('Testing balance fix for Jeff Matlou (M017) and Nicholas Molale (M041)...\n');
  
  const testMembers = ['M017', 'M041'];
  
  for (const memberNumber of testMembers) {
    console.log(`\n=== Testing ${memberNumber} ===`);
    
    try {
      // Get member data
      const { data: memberData, error } = await supabase
        .from('members')
        .select('*')
        .eq('member_number', memberNumber)
        .single();
      
      if (error) {
        console.error(`Error fetching ${memberNumber}:`, error);
        continue;
      }
      
      console.log(`Member found: ${memberData.name || 'No name'}`);
      
      // Test the current logic (without JSON parsing)
      console.log('\n1. CURRENT LOGIC (without JSON parsing):');
      const financialInfoRaw = memberData.financial_info || {};
      console.log(`   Type of financial_info: ${typeof financialInfoRaw}`);
      console.log(`   financial_info value: ${JSON.stringify(financialInfoRaw).substring(0, 100)}...`);
      
      // Try to access current_balance directly
      console.log(`   financial_info.current_balance: ${financialInfoRaw.current_balance}`);
      console.log(`   Is undefined? ${financialInfoRaw.current_balance === undefined}`);
      
      // Test with JSON parsing
      console.log('\n2. WITH JSON PARSING:');
      const financialInfoParsed = parseJsonField(memberData.financial_info);
      console.log(`   Type after parsing: ${typeof financialInfoParsed}`);
      console.log(`   Parsed financial_info.current_balance: ${financialInfoParsed.current_balance}`);
      console.log(`   Is negative? ${financialInfoParsed.current_balance < 0}`);
      
      // Show what the app should display
      console.log('\n3. WHAT THE APP SHOULD SHOW:');
      const balance = financialInfoParsed.current_balance || 0;
      
      if (balance > 0) {
        console.log(`   Balance Due: R ${balance.toLocaleString('en-ZA', { minimumFractionDigits: 2 })} (RED)`);
      } else if (balance < 0) {
        console.log(`   Balance: R ${Math.abs(balance).toLocaleString('en-ZA', { minimumFractionDigits: 2 })} (GREEN - member has credit)`);
      } else {
        console.log(`   Balance: R 0.00 (GRAY)`);
      }
      
      // Check other JSON fields
      console.log('\n4. OTHER JSON FIELDS:');
      const personalInfo = parseJsonField(memberData.personal_info);
      console.log(`   personal_info:`, personalInfo);
      
      const membershipStatus = parseJsonField(memberData.membership_status);
      console.log(`   membership_status:`, membershipStatus);
      
    } catch (error) {
      console.error(`Error testing ${memberNumber}:`, error);
    }
  }
  
  console.log('\n\n=== SUMMARY ===');
  console.log('The issue is that financial_info is stored as a JSON string in the database.');
  console.log('The current code tries to access it as an object directly, which fails.');
  console.log('Solution: Add JSON parsing logic to parse these fields before accessing them.');
}

testBalanceFix().then(() => {
  console.log('\n\nTest completed.');
  process.exit(0);
}).catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});