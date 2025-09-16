// Check what's actually in the users table
const { supabase } = require('./supabase.config');

async function checkTableContent() {
  console.log('🔍 Checking users table content...');
  
  try {
    // Try to select all columns with a wildcard
    console.log('\n1. Trying to select all columns...');
    const { data: allData, error: allError } = await supabase
      .from('users')
      .select('*')
      .limit(5);

    if (allError) {
      console.log('❌ Select all error:', allError.message);
      
      // Try to see if we can get any data at all
      console.log('\n2. Trying to count rows...');
      const { count, error: countError } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      if (countError) {
        console.log('❌ Count error:', countError.message);
        
        // Try a different approach - maybe the table has different column names
        console.log('\n3. Trying to inspect table structure...');
        console.log('💡 The users table exists but may have different column names');
        console.log('📋 Please run this SQL in Supabase SQL Editor:');
        console.log('   SELECT column_name, data_type FROM information_schema.columns');
        console.log('   WHERE table_name = \'users\' AND table_schema = \'public\';');
        console.log('   ORDER BY ordinal_position;');
        
      } else {
        console.log('✅ Table has', count, 'rows');
      }
      
      return;
    } else {
      console.log('✅ Select all successful');
      console.log('   Data:', allData);
      
      // Show column names from the first row
      if (allData && allData.length > 0) {
        console.log('\n📊 Available columns:');
        Object.keys(allData[0]).forEach(col => {
          console.log(`   ${col}`);
        });
      }
    }

  } catch (error) {
    console.error('❌ Table content check failed:', error.message);
    console.log('💡 This suggests the users table schema is different than expected');
    console.log('📋 Please check the actual table structure in Supabase Dashboard');
  }
}

// Run the check
checkTableContent().catch(console.error);
