const { createClient } = require('@supabase/supabase-js');

// Use the same values from src/config/supabase.ts
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkAllTables() {
  console.log('Checking all tables in database...\n');
  
  try {
    // Try to get information about all tables by querying information_schema
    // Note: This might not work with Supabase's RLS, so we'll try a different approach
    
    console.log('1. Checking for member_balances table:');
    const { data: balancesData, error: balancesError } = await supabase
      .from('member_balances')
      .select('*')
      .limit(1);
    
    if (balancesError) {
      console.log('  member_balances table error:', balancesError.message);
    } else if (balancesData && balancesData.length > 0) {
      console.log('  member_balances table exists with', balancesData.length, 'rows (sample)');
      console.log('  Columns:', Object.keys(balancesData[0]));
    } else {
      console.log('  member_balances table exists but is empty or no rows returned');
    }
    
    console.log('\n2. Checking for contributions table:');
    const { data: contributionsData, error: contributionsError } = await supabase
      .from('contributions')
      .select('*')
      .limit(1);
    
    if (contributionsError) {
      console.log('  contributions table error:', contributionsError.message);
    } else if (contributionsData && contributionsData.length > 0) {
      console.log('  contributions table exists with', contributionsData.length, 'rows (sample)');
      console.log('  Columns:', Object.keys(contributionsData[0]));
    } else {
      console.log('  contributions table exists but is empty or no rows returned');
    }
    
    console.log('\n3. Checking for transactions table:');
    const { data: transactionsData, error: transactionsError } = await supabase
      .from('transactions')
      .select('*')
      .limit(1);
    
    if (transactionsError) {
      console.log('  transactions table error:', transactionsError.message);
    } else if (transactionsData && transactionsData.length > 0) {
      console.log('  transactions table exists with', transactionsData.length, 'rows (sample)');
      console.log('  Columns:', Object.keys(transactionsData[0]));
    } else {
      console.log('  transactions table exists but is empty or no rows returned');
    }
    
    console.log('\n4. Checking for financial_years table:');
    const { data: financialYearsData, error: financialYearsError } = await supabase
      .from('financial_years')
      .select('*')
      .limit(1);
    
    if (financialYearsError) {
      console.log('  financial_years table error:', financialYearsError.message);
    } else if (financialYearsData && financialYearsData.length > 0) {
      console.log('  financial_years table exists with', financialYearsData.length, 'rows (sample)');
      console.log('  Columns:', Object.keys(financialYearsData[0]));
    } else {
      console.log('  financial_years table exists but is empty or no rows returned');
    }
    
    console.log('\n5. Checking for settings table:');
    const { data: settingsData, error: settingsError } = await supabase
      .from('settings')
      .select('*')
      .limit(1);
    
    if (settingsError) {
      console.log('  settings table error:', settingsError.message);
    } else if (settingsData && settingsData.length > 0) {
      console.log('  settings table exists with', settingsData.length, 'rows (sample)');
      console.log('  Columns:', Object.keys(settingsData[0]));
    } else {
      console.log('  settings table exists but is empty or no rows returned');
    }
    
    console.log('\n6. Checking for users table:');
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (usersError) {
      console.log('  users table error:', usersError.message);
    } else if (usersData && usersData.length > 0) {
      console.log('  users table exists with', usersData.length, 'rows (sample)');
      console.log('  Columns:', Object.keys(usersData[0]));
    } else {
      console.log('  users table exists but is empty or no rows returned');
    }
    
    console.log('\n7. Checking for profiles table:');
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);
    
    if (profilesError) {
      console.log('  profiles table error:', profilesError.message);
    } else if (profilesData && profilesData.length > 0) {
      console.log('  profiles table exists with', profilesData.length, 'rows (sample)');
      console.log('  Columns:', Object.keys(profilesData[0]));
    } else {
      console.log('  profiles table exists but is empty or no rows returned');
    }
    
    // Try to get table list from information_schema (might not work due to RLS)
    console.log('\n8. Trying to get list of all tables from information_schema:');
    try {
      const { data: tablesData, error: tablesError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .limit(10);
      
      if (tablesError) {
        console.log('  Cannot access information_schema due to RLS:', tablesError.message);
      } else if (tablesData) {
        console.log('  Tables in public schema:');
        tablesData.forEach(table => {
          console.log('    -', table.table_name);
        });
      }
    } catch (error) {
      console.log('  Error accessing information_schema:', error.message);
    }
    
    // Check if there's any data in member_balances that might contain the Excel data
    console.log('\n9. Checking member_balances for any financial data:');
    const { data: allBalances, error: allBalancesError } = await supabase
      .from('member_balances')
      .select('*')
      .limit(5);
    
    if (allBalancesError) {
      console.log('  Error fetching member_balances:', allBalancesError.message);
    } else if (allBalances && allBalances.length > 0) {
      console.log('  Found', allBalances.length, 'rows in member_balances:');
      allBalances.forEach((balance, index) => {
        console.log(`  Row ${index + 1}:`, balance);
      });
    } else {
      console.log('  No data found in member_balances table');
    }
    
    // Check if financial_info in members table has any non-zero data
    console.log('\n10. Checking members table for any non-zero financial_info:');
    const { data: membersWithFinancialInfo, error: membersFinError } = await supabase
      .from('members')
      .select('member_number, name, financial_info')
      .not('financial_info', 'is', null)
      .limit(5);
    
    if (membersFinError) {
      console.log('  Error fetching members with financial_info:', membersFinError.message);
    } else if (membersWithFinancialInfo && membersWithFinancialInfo.length > 0) {
      console.log('  Found', membersWithFinancialInfo.length, 'members with financial_info:');
      membersWithFinancialInfo.forEach((member, index) => {
        console.log(`  ${member.member_number} - ${member.name}:`, member.financial_info);
      });
    } else {
      console.log('  No members found with non-null financial_info');
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

checkAllTables().then(() => {
  console.log('\n\nTable check completed.');
  process.exit(0);
}).catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});