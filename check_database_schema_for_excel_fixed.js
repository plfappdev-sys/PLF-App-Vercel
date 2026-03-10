const { createClient } = require('@supabase/supabase-js');

// Use the same values from src/config/supabase.ts
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkDatabaseSchema() {
  console.log('Checking database schema for Excel data columns...\n');
  
  try {
    // 1. Check members table structure
    console.log('1. Checking members table columns:');
    const { data: membersColumns, error: membersError } = await supabase
      .from('members')
      .select('*')
      .limit(1);
    
    if (membersError) {
      console.error('Error fetching members:', membersError);
    } else if (membersColumns && membersColumns.length > 0) {
      const firstMember = membersColumns[0];
      console.log('Columns in members table:');
      Object.keys(firstMember).forEach((key, index) => {
        console.log(`  ${index + 1}. ${key}: ${typeof firstMember[key]} (sample: ${JSON.stringify(firstMember[key])?.substring(0, 50)}...)`);
      });
      
      // Check for specific columns we need
      const requiredColumns = [
        'total_contribution_12_months',
        'outstanding_contributions', 
        'penalties',
        'expected_contribution',
        'actual_contribution',
        'catch_up_fee',
        'financial_info',
        'name'
      ];
      
      console.log('\nChecking for required columns:');
      requiredColumns.forEach(col => {
        const exists = firstMember.hasOwnProperty(col);
        console.log(`  ${col}: ${exists ? '✓ EXISTS' : '✗ MISSING'}`);
      });
      
      // Check financial_info structure
      if (firstMember.financial_info) {
        console.log('\nfinancial_info structure:');
        const finInfo = firstMember.financial_info;
        Object.keys(finInfo).forEach(key => {
          console.log(`  - ${key}: ${typeof finInfo[key]} (${JSON.stringify(finInfo[key])?.substring(0, 50)}...)`);
        });
      }
    }
    
    // 2. Check member_balances table structure
    console.log('\n\n2. Checking member_balances table columns:');
    const { data: balancesColumns, error: balancesError } = await supabase
      .from('member_balances')
      .select('*')
      .limit(1);
    
    if (balancesError) {
      console.error('Error fetching member_balances:', balancesError);
    } else if (balancesColumns && balancesColumns.length > 0) {
      const firstBalance = balancesColumns[0];
      console.log('Columns in member_balances table:');
      Object.keys(firstBalance).forEach((key, index) => {
        console.log(`  ${index + 1}. ${key}: ${typeof firstBalance[key]} (sample: ${JSON.stringify(firstBalance[key])?.substring(0, 50)}...)`);
      });
    }
    
    // 3. Get sample data to see actual values
    console.log('\n\n3. Sample member data (first 5 members):');
    const { data: sampleMembers, error: sampleError } = await supabase
      .from('members')
      .select('member_number, name, catch_up_fee, financial_info')
      .limit(5);
    
    if (sampleError) {
      console.error('Error fetching sample members:', sampleError);
    } else if (sampleMembers) {
      sampleMembers.forEach((member, index) => {
        console.log(`\nMember ${index + 1}: ${member.member_number} - ${member.name}`);
        console.log(`  catch_up_fee: ${member.catch_up_fee}`);
        if (member.financial_info) {
          console.log(`  financial_info:`);
          Object.keys(member.financial_info).forEach(key => {
            console.log(`    ${key}: ${member.financial_info[key]}`);
          });
        }
      });
    }
    
    // 4. Check if we have the Excel data columns
    console.log('\n\n4. Looking for Excel-specific data:');
    
    // Get a count of members
    const { count: memberCount, error: countError } = await supabase
      .from('members')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('Error counting members:', countError);
    } else {
      console.log(`Total members in database: ${memberCount}`);
    }
    
    // Check for any member with non-zero catch_up_fee (might indicate penalties/outstanding)
    const { data: membersWithFees, error: feesError } = await supabase
      .from('members')
      .select('member_number, name, catch_up_fee')
      .gt('catch_up_fee', 0)
      .limit(5);
    
    if (feesError) {
      console.error('Error fetching members with fees:', feesError);
    } else if (membersWithFees && membersWithFees.length > 0) {
      console.log(`\nMembers with catch_up_fee > 0 (first ${membersWithFees.length}):`);
      membersWithFees.forEach(member => {
        console.log(`  ${member.member_number} - ${member.name}: R ${member.catch_up_fee}`);
      });
    } else {
      console.log('\nNo members found with catch_up_fee > 0');
    }
    
    // 5. Check for any existing columns that might match Excel data
    console.log('\n\n5. Searching for columns that might contain Excel data:');
    
    // Get all column names from members table
    const { data: allMembers, error: allError } = await supabase
      .from('members')
      .select('*')
      .limit(1);
    
    if (allError) {
      console.error('Error getting column names:', allError);
    } else if (allMembers && allMembers.length > 0) {
      const columnNames = Object.keys(allMembers[0]);
      console.log('All column names in members table:');
      columnNames.forEach((col, index) => {
        console.log(`  ${index + 1}. ${col}`);
      });
      
      // Look for columns that might contain Excel data
      const excelRelatedKeywords = [
        'contribution', 'outstanding', 'penalty', 'total', 'actual', 
        'expected', 'month', 'year', 'balance', 'fee'
      ];
      
      console.log('\nColumns that might be related to Excel data:');
      columnNames.forEach(col => {
        const lowerCol = col.toLowerCase();
        excelRelatedKeywords.forEach(keyword => {
          if (lowerCol.includes(keyword)) {
            console.log(`  ${col} (contains "${keyword}")`);
          }
        });
      });
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

checkDatabaseSchema().then(() => {
  console.log('\n\nDatabase schema check completed.');
  process.exit(0);
}).catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});