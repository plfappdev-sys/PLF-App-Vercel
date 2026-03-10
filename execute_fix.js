const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function executeFix() {
  console.log('Executing Lesego Bokaba balance fix...');
  
  try {
    // First, let's check the current state
    console.log('\n=== CURRENT STATE ===');
    const { data: currentData, error: currentError } = await supabase
      .from('members')
      .select('member_number, name, financial_info, catch_up_fee, closing_balance')
      .eq('member_number', 'M031');
    
    if (currentError) {
      console.error('Error fetching current data:', currentError);
    } else if (currentData && currentData.length > 0) {
      const member = currentData[0];
      console.log('Current member data:');
      console.log('Member Number:', member.member_number);
      console.log('Name:', member.name);
      console.log('Catch Up Fee:', member.catch_up_fee);
      console.log('Closing Balance:', member.closing_balance);
      console.log('Financial Info:', JSON.stringify(member.financial_info, null, 2));
    }
    
    // Check member_balances
    const { data: balanceData, error: balanceError } = await supabase
      .from('member_balances')
      .select('*')
      .eq('member_number', 'M031');
    
    if (balanceError) {
      console.error('Error fetching balance data:', balanceError);
    } else if (balanceData && balanceData.length > 0) {
      console.log('\nCurrent member_balances:');
      const balance = balanceData[0];
      console.log('Savings Balance:', balance.savings_balance);
      console.log('Net Balance:', balance.net_balance);
      console.log('Total Contributions:', balance.total_contributions);
    }
    
    // Now execute the updates
    console.log('\n=== EXECUTING UPDATES ===');
    
    // Update members table
    const financialInfo = {
      "data_source": "Excel Verification 2025 - Corrected",
      "last_updated": new Date().toISOString(),
      "current_balance": 0,
      "outstanding_amount": 0,
      "total_contributions": 2600.0,
      "contributions_by_year": {
        "2022-2023": 2600.0,
        "2023-2024": 0.0,
        "2024-2025": 0.0
      }
    };
    
    const { error: updateError } = await supabase
      .from('members')
      .update({
        financial_info: financialInfo,
        updated_at: new Date().toISOString(),
        closing_balance: 0
      })
      .eq('member_number', 'M031')
      .eq('name', 'Lesego Bokaba');
    
    if (updateError) {
      console.error('Error updating members table:', updateError);
    } else {
      console.log('✓ Members table updated successfully');
    }
    
    // Update member_balances table
    const { error: balanceUpdateError } = await supabase
      .from('member_balances')
      .update({
        savings_balance: 2600.0,
        net_balance: 2600.0,
        total_contributions: 2600.0,
        updated_at: new Date().toISOString(),
        last_balance_update: new Date().toISOString()
      })
      .eq('member_number', 'M031');
    
    if (balanceUpdateError) {
      console.error('Error updating member_balances table:', balanceUpdateError);
    } else {
      console.log('✓ Member_balances table updated successfully');
    }
    
    // Verify the fix
    console.log('\n=== VERIFICATION ===');
    const { data: verifyData, error: verifyError } = await supabase
      .from('members')
      .select('member_number, name, financial_info, catch_up_fee, closing_balance')
      .eq('member_number', 'M031');
    
    if (verifyError) {
      console.error('Error verifying fix:', verifyError);
    } else if (verifyData && verifyData.length > 0) {
      const member = verifyData[0];
      console.log('Updated member data:');
      console.log('Member Number:', member.member_number);
      console.log('Name:', member.name);
      console.log('Catch Up Fee:', member.catch_up_fee);
      console.log('Closing Balance:', member.closing_balance);
      console.log('Financial Info:', JSON.stringify(member.financial_info, null, 2));
      
      // Check what the app would show
      const finInfo = member.financial_info || {};
      console.log('\n=== WHAT THE APP SHOULD NOW SHOW ===');
      console.log('Balance due (current_balance):', finInfo.current_balance || 0);
      console.log('Total Contributions (total_contributions):', finInfo.total_contributions || 0);
      console.log('Outstanding (catch_up_fee + outstanding_amount):', 
        (member.catch_up_fee || 0) + (finInfo.outstanding_amount || 0));
      console.log('Planned contributions: 0');
    }
    
    console.log('\n=== FIX COMPLETED ===');
    console.log('Lesego Bokaba (M031) has been updated:');
    console.log('- current_balance set to 0 (nothing due)');
    console.log('- outstanding_amount set to 0 (nothing owed)');
    console.log('- total_contributions remains 2600 (historical record)');
    console.log('- member_balances.savings_balance set to 2600');
    console.log('- member_balances.net_balance set to 2600');
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

executeFix();