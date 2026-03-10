// Script to check Lesego Bokaba (M031) database data
// Phase 1, Step 1.1 of Comprehensive Resolution Plan

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkM031Data() {
  console.log('=== Checking Lesego Bokaba (M031) Database Data ===\n');
  
  try {
    // 1. Get member data for M031
    console.log('1. Fetching member data for M031...');
    const { data: memberData, error: memberError } = await supabase
      .from('members')
      .select('*')
      .eq('member_number', 'M031')
      .single();

    if (memberError) {
      console.error('Error fetching member data:', memberError);
      return;
    }

    if (!memberData) {
      console.error('Member M031 not found in database');
      return;
    }

    console.log('✅ Member found:', memberData.name || 'No name in database');
    console.log('   Member ID:', memberData.id);
    console.log('   Member Number:', memberData.member_number);
    console.log('   Created:', memberData.created_at);
    console.log('   Updated:', memberData.last_updated);

    // 2. Check key financial columns
    console.log('\n2. Checking financial columns...');
    
    const outstandingContributions = memberData.outstanding_contributions;
    const totalPenalties = memberData.total_penalties;
    const totalContributions = memberData.total_contributions;
    const expectedContribution = memberData.expected_contribution;
    const catchUpFee = memberData.catch_up_fee;
    
    console.log('   outstanding_contributions:', outstandingContributions, 
                typeof outstandingContributions === 'number' ? '(number)' : `(${typeof outstandingContributions})`);
    console.log('   total_penalties:', totalPenalties,
                typeof totalPenalties === 'number' ? '(number)' : `(${typeof totalPenalties})`);
    console.log('   total_contributions:', totalContributions,
                typeof totalContributions === 'number' ? '(number)' : `(${typeof totalContributions})`);
    console.log('   expected_contribution:', expectedContribution,
                typeof expectedContribution === 'number' ? '(number)' : `(${typeof expectedContribution})`);
    console.log('   catch_up_fee:', catchUpFee,
                typeof catchUpFee === 'number' ? '(number)' : `(${typeof catchUpFee})`);

    // 3. Check financial_info JSON field
    console.log('\n3. Checking financial_info JSON field...');
    let financialInfo = {};
    try {
      if (memberData.financial_info) {
        if (typeof memberData.financial_info === 'string') {
          financialInfo = JSON.parse(memberData.financial_info);
        } else {
          financialInfo = memberData.financial_info;
        }
      }
      console.log('   financial_info keys:', Object.keys(financialInfo));
      console.log('   current_balance:', financialInfo.current_balance);
      console.log('   total_contributions:', financialInfo.total_contributions);
      console.log('   outstanding_amount:', financialInfo.outstanding_amount);
      console.log('   expected_contribution:', financialInfo.expected_contribution);
    } catch (e) {
      console.log('   Error parsing financial_info:', e.message);
    }

    // 4. Check member_balances table
    console.log('\n4. Checking member_balances table...');
    const { data: balanceData, error: balanceError } = await supabase
      .from('member_balances')
      .select('*')
      .eq('member_id', memberData.id)
      .single();

    if (balanceError) {
      console.log('   No balance data found:', balanceError.message);
    } else {
      console.log('   Balance data found:');
      console.log('   savings_balance:', balanceData.savings_balance);
      console.log('   loan_balance:', balanceData.loan_balance);
      console.log('   net_balance:', balanceData.net_balance);
      console.log('   total_contributions:', balanceData.total_contributions);
      console.log('   total_interest_earned:', balanceData.total_interest_earned);
    }

    // 5. Calculate expected values
    console.log('\n5. Expected values (from DataVerificationCheck.txt):');
    console.log('   Expected Contribution: R 16,600.00');
    console.log('   Total Contribution (Excel Column BL): Should match Excel');
    console.log('   Outstanding Contributions: R 2,400.00 (Expected - Total)');
    console.log('   Penalties (Excel Column M): R 2,250.82');
    console.log('   Outstanding Amount: R 4,650.82 (2,400 + 2,250.82)');
    console.log('   Balance Due: R 6,220.825');

    // 6. Check if data matches expectations
    console.log('\n6. Data validation:');
    
    const hasOutstandingContributions = typeof outstandingContributions === 'number' && outstandingContributions > 0;
    const hasTotalPenalties = typeof totalPenalties === 'number' && totalPenalties > 0;
    
    console.log('   outstanding_contributions has value:', hasOutstandingContributions ? '✅' : '❌');
    console.log('   total_penalties has value:', hasTotalPenalties ? '✅' : '❌');
    
    if (hasOutstandingContributions) {
      console.log(`   outstanding_contributions value: R ${outstandingContributions.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`);
    }
    
    if (hasTotalPenalties) {
      console.log(`   total_penalties value: R ${totalPenalties.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`);
    }

    // 7. Check database schema
    console.log('\n7. Checking database schema for members table...');
    const { data: schemaData, error: schemaError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable')
      .eq('table_name', 'members')
      .in('column_name', ['outstanding_contributions', 'total_penalties', 'total_contributions', 'expected_contribution', 'catch_up_fee'])
      .order('column_name');

    if (schemaError) {
      console.log('   Error checking schema:', schemaError.message);
    } else {
      console.log('   Schema check:');
      schemaData.forEach(col => {
        console.log(`   - ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`);
      });
    }

    // 8. Summary
    console.log('\n=== SUMMARY ===');
    console.log('Issues found:');
    
    if (!hasOutstandingContributions) {
      console.log('❌ outstanding_contributions is missing or zero (should be R 2,400.00)');
    }
    
    if (!hasTotalPenalties) {
      console.log('❌ total_penalties is missing or zero (should be R 2,250.82)');
    }
    
    if (hasOutstandingContributions && hasTotalPenalties) {
      const calculatedOutstanding = outstandingContributions + totalPenalties;
      console.log(`✅ Outstanding amount calculated: R ${calculatedOutstanding.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`);
      console.log(`   (Expected: R 4,650.82)`);
    }
    
    console.log('\nNext steps:');
    console.log('1. If data is missing, need to update database from Excel');
    console.log('2. If columns don\'t exist, need to add them to schema');
    console.log('3. Test MyFundsScreen to verify display');

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the check
checkM031Data().then(() => {
  console.log('\n=== Check complete ===');
  process.exit(0);
}).catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});