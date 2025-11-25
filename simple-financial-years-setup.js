const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URL = process.env.PROJECT_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Error: Missing environment variables');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function setupFinancialYears() {
  console.log('Setting up financial years with minimal schema...');
  
  try {
    // First, let's check what columns actually exist in the financial_years table
    const { data: existingYears, error: checkError } = await supabase
      .from('financial_years')
      .select('*')
      .limit(1);
    
    if (checkError) {
      console.log('Error checking financial_years table:', checkError);
      console.log('Table might not exist or have different structure');
    } else {
      console.log('Existing financial_years columns:', Object.keys(existingYears[0] || {}));
    }
    
    // Clear existing financial years
    console.log('Clearing existing financial years...');
    await supabase.from('financial_years').delete().neq('id', '');
    
    // Create a simple financial year with only the basic fields that exist
    const current_year = {
      'year_name': '2024-2025',
      'start_date': '2024-07-01',
      'end_date': '2025-06-30',
      'savings_interest_rate': 5.5,
      'loan_interest_rate': 20.0,
      'is_current': true,
      'created_at': new Date().toISOString(),
      'updated_at': new Date().toISOString()
    };
    
    console.log('Creating financial year with data:', current_year);
    
    const { data, error } = await supabase
      .from('financial_years')
      .insert(current_year);
    
    if (error) {
      console.error('Error creating financial year:', error);
      
      // If that failed, try with even fewer fields
      console.log('Trying with minimal fields...');
      const minimal_year = {
        'year_name': '2024-2025',
        'is_current': true
      };
      
      const { data: minimalData, error: minimalError } = await supabase
        .from('financial_years')
        .insert(minimal_year);
      
      if (minimalError) {
        console.error('Error creating financial year with minimal fields:', minimalError);
      } else {
        console.log('✅ Financial year created successfully with minimal fields');
      }
    } else {
      console.log('✅ Financial year created successfully');
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

setupFinancialYears();
