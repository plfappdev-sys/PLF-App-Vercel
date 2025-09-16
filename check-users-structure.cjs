// Check users table structure and add missing columns
const { supabase } = require('./supabase.config');

async function checkUsersStructure() {
  console.log('🔍 Checking users table structure...');
  
  try {
    // Get current table structure
    const { data: columns, error } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable, column_default')
      .eq('table_name', 'users')
      .eq('table_schema', 'public')
      .order('ordinal_position');

    if (error) {
      console.error('❌ Error fetching table structure:', error.message);
      return;
    }

    console.log('\n📊 Current users table structure:');
    columns.forEach(col => {
      console.log(`   ${col.column_name.padEnd(20)} ${col.data_type.padEnd(15)} ${col.is_nullable} ${col.column_default || ''}`);
    });

    // Check for missing columns
    const requiredColumns = ['memberNumber', 'membership_info', 'created_by'];
    const existingColumns = columns.map(col => col.column_name);
    const missingColumns = requiredColumns.filter(col => !existingColumns.includes(col));

    if (missingColumns.length > 0) {
      console.log('\n❌ Missing columns:', missingColumns);
      console.log('💡 Run the add-missing-columns.sql script in Supabase SQL Editor');
    } else {
      console.log('\n✅ All required columns are present!');
    }

    // Test member number verification again
    console.log('\n🧪 Testing member number verification...');
    try {
      const { data: memberCheck, error: memberError } = await supabase
        .from('users')
        .select('memberNumber')
        .eq('memberNumber', 'TEST123')
        .single();

      if (memberError) {
        if (memberError.code === 'PGRST116') { // No rows found
          console.log('✅ Member number TEST123: Available');
        } else {
          console.log('❌ Member number check error:', memberError.message);
        }
      } else {
        console.log('✅ Member number TEST123: Taken');
      }
    } catch (testError) {
      console.log('❌ Member number test failed:', testError.message);
    }

  } catch (error) {
    console.error('❌ Error checking table structure:', error.message);
  }
}

// Run the check
checkUsersStructure().catch(console.error);
