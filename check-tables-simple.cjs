// Simple script to check if our specific tables exist
const { supabase } = require('./supabase.config');

async function checkTablesSimple() {
  console.log('🔍 Checking if PLF app tables exist...');
  
  const tablesToCheck = ['users', 'members', 'transactions', 'loans', 'interest_accruals'];
  
  for (const tableName of tablesToCheck) {
    try {
      // Try to select from the table - if it exists, this will work
      const { error } = await supabase
        .from(tableName)
        .select('count')
        .limit(1);

      if (error) {
        if (error.code === '42P01') { // Table doesn't exist
          console.log(`❌ ${tableName}: Does NOT exist`);
        } else {
          console.log(`❌ ${tableName}: Error (${error.code}) - ${error.message}`);
        }
      } else {
        console.log(`✅ ${tableName}: EXISTS`);
      }
    } catch (error) {
      console.log(`❌ ${tableName}: Failed to check - ${error.message}`);
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n📋 Based on the error you received:');
  console.log('   "ERROR: 42P07: relation \\"members\\" already exists"');
  console.log('   This means some tables were already created');
  console.log('\n🚀 Recommended solution:');
  console.log('   1. Use the safe schema: supabase-schema-safe.sql');
  console.log('   2. This will only create missing tables');
  console.log('   3. It will skip tables that already exist');
  console.log('   4. It will add missing indexes and security policies');
  console.log('\n💡 To proceed:');
  console.log('   - Go to Supabase Dashboard > SQL Editor');
  console.log('   - Copy/paste contents of supabase-schema-safe.sql');
  console.log('   - Click Run');
  console.log('   - This will complete your database setup safely');
}

// Run the check
checkTablesSimple().catch(console.error);
