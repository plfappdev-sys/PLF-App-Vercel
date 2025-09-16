// Test to verify the schema is complete and ready for authentication
const { supabase } = require('./supabase.config');

async function testSchemaComplete() {
  console.log('🧪 Testing if schema is complete and ready for authentication...');
  
  try {
    // Test 1: Verify all required columns exist and are accessible
    console.log('\n1. Testing column accessibility...');
    const requiredColumns = ['id', 'uid', 'email', 'role', 'created_at'];
    let allColumnsAccessible = true;
    
    for (const column of requiredColumns) {
      try {
        const { data, error } = await supabase
          .from('users')
          .select(column)
          .limit(1);

        if (error) {
          console.log(`   ❌ ${column}: ${error.message}`);
          allColumnsAccessible = false;
        } else {
          console.log(`   ✅ ${column}: Accessible`);
        }
      } catch (err) {
        console.log(`   ❌ ${column}: ${err.message}`);
        allColumnsAccessible = false;
      }
    }

    // Test 2: Verify table structure by checking information schema
    console.log('\n2. Testing table structure...');
    const { data: tableInfo, error: tableError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable, column_default')
      .eq('table_name', 'users')
      .order('ordinal_position');

    if (tableError) {
      console.log('❌ Table info error:', tableError.message);
    } else {
      console.log('✅ Table structure retrieved successfully');
      console.log('   Columns found:');
      tableInfo.forEach(col => {
        console.log(`   - ${col.column_name} (${col.data_type}) ${col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'}`);
      });
    }

    // Test 3: Verify we can at least read from the table (RLS allows reading)
    console.log('\n3. Testing read operations...');
    const { data: readData, error: readError } = await supabase
      .from('users')
      .select('*')
      .limit(5);

    if (readError) {
      console.log('❌ Read error:', readError.message);
    } else {
      console.log('✅ Read successful. Rows:', readData.length);
      if (readData.length > 0) {
        console.log('   Sample data:', readData[0]);
      }
    }

    // Summary
    console.log('\n📋 SCHEMA STATUS SUMMARY:');
    if (allColumnsAccessible) {
      console.log('✅ ALL REQUIRED COLUMNS ARE ACCESSIBLE');
      console.log('✅ DATABASE SCHEMA IS COMPLETE');
      console.log('✅ READY FOR AUTHENTICATION INTEGRATION');
      console.log('\nNext steps:');
      console.log('1. Update App.js to use SupabaseAuthProvider');
      console.log('2. Test authentication with real user signup/login');
      console.log('3. Verify user data is properly stored in users table');
    } else {
      console.log('❌ SOME COLUMNS ARE NOT ACCESSIBLE');
      console.log('📋 Check RLS policies or column constraints');
    }

  } catch (error) {
    console.error('❌ Schema test failed:', error.message);
  }
}

// Run the test
testSchemaComplete().catch(console.error);
