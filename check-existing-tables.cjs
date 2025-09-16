// Script to check what tables already exist in Supabase
const { supabase } = require('./supabase.config');

async function checkExistingTables() {
  console.log('🔍 Checking existing tables in Supabase database...');
  
  try {
    // Query to get all tables in the public schema
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .order('table_name');

    if (error) {
      console.error('❌ Error checking tables:', error.message);
      return;
    }

    console.log('\n📊 Existing tables in your Supabase database:');
    console.log('============================================');
    
    if (data.length === 0) {
      console.log('No tables found in the public schema.');
    } else {
      data.forEach((table, index) => {
        console.log(`${index + 1}. ${table.table_name}`);
      });
    }

    console.log('\n📋 Recommended next steps:');
    if (data.length > 0) {
      console.log('✅ Some tables already exist - use supabase-schema-safe.sql');
      console.log('   This will only create missing tables and indexes');
    } else {
      console.log('✅ No tables found - you can use either schema file');
      console.log('   supabase-schema.sql (clean setup)');
      console.log('   supabase-schema-safe.sql (safe for existing data)');
    }

    console.log('\n🚀 To proceed:');
    console.log('1. Go to Supabase Dashboard > SQL Editor');
    console.log('2. Copy/paste contents of supabase-schema-safe.sql');
    console.log('3. Click Run to create missing tables and indexes');
    console.log('4. Run: node test-supabase-tables.cjs to verify');

  } catch (error) {
    console.error('❌ Failed to check tables:', error.message);
  }
}

// Run the check
checkExistingTables().catch(console.error);
