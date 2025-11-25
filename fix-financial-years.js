const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Configuration
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://zdnyhzasvifrskbostgn.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY;

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function fixFinancialYears() {
  console.log('Setting up financial years...');
  
  try {
    // Get superuser ID
    const { data: superusers, error: superuserError } = await supabase
      .from('users')
      .select('id')
      .eq('role', 'superuser')
      .limit(1);
    
    if (superuserError || !superusers || superusers.length === 0) {
      console.error('Error getting superuser:', superuserError);
      console.log('Using default UUID instead...');
      // Use a default UUID
      const defaultUUID = '00000000-0000-0000-0000-000000000000';
      await setupFinancialYear(defaultUUID);
    } else {
      const superuser_id = superusers[0].id;
      console.log(`Using superuser ID: ${superuser_id}`);
      await setupFinancialYear(superuser_id);
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

async function setupFinancialYear(created_by) {
  try {
    // Clear existing financial years
    await supabase.from('financial_years').delete().neq('id', '');
    
    // Create current financial year (2024-2025)
    const current_year = {
      'year_name': '2024-2025',
      'start_date': '2024-07-01',
      'end_date': '2025-06-30',
      'savings_interest_rate': 5.5,
      'loan_interest_rate': 20.0,
      'is_current': true,
      'created_by': created_by,
      'created_at': new Date().toISOString(),
      'updated_at': new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('financial_years')
      .insert(current_year);
    
    if (error) {
      console.error('Error creating financial year:', error);
    } else {
      console.log('✅ Financial year 2024-2025 set up successfully');
    }
    
  } catch (error) {
    console.error('Error setting up financial year:', error);
  }
}

fixFinancialYears();
