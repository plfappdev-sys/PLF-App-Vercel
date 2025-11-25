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
  console.log('Setting up financial years with correct schema...');
  
  try {
    // Clear existing financial years
    console.log('Clearing existing financial years...');
    await supabase.from('financial_years').delete().neq('id', '');
    
    // Create financial year with the correct column names from the error message
    const current_year = {
      'year_name': '2024-2025',
      'year_start': '2024-07-01',
      'year_end': '2025-06-30',
      'savings_interest_rate': 0.055, // 5.5% as decimal
      'loan_interest_rate': 0.20,     // 20% as decimal
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
    } else {
      console.log('✅ Financial year created successfully');
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

setupFinancialYears();
