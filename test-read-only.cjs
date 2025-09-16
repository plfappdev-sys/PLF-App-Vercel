// Test reading from users table to verify structure
const { supabase } = require('./supabase.config');

async function testReadOnly() {
  console.log('🧪 Testing read-only access to users table...');
  
  try {
    // Try to select all columns to see current structure
    console.log('\n1. Testing select all columns...');
    const { data: allData, error: allError } = await supabase
      .from('users')
      .select('*')
      .limit(5);

    if (allError) {
      console.log('❌ Select all error:', allError.message);
    } else {
      console.log('✅ Select all successful');
      if (allData && allData.length > 0) {
        console.log('   Data:', allData);
        console.log('   Columns:', Object.keys(allData[0]));
      } else {
        console.log('   Table is empty');
      }
    }

    // Try to count rows
    console.log('\n2. Testing row count...');
    const { count, error: countError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.log('❌ Count error:', countError.message);
    } else {
      console.log('✅ Row count:', count);
    }

    // Test specific column access
    console.log('\n3. Testing specific column access...');
    const testColumns = ['id', 'uid', 'email', 'role', 'created_at'];
    
    for (const column of testColumns) {
      try {
        const { data: colData, error: colError } = await supabase
          .from('users')
          .select(column)
          .limit(1);

        if (colError) {
          console.log(`   ❌ ${column}: ${colError.message}`);
        } else {
          console.log(`   ✅ ${column}: Accessible`);
        }
      } catch (err) {
        console.log(`   ❌ ${column}: ${err.message}`);
      }
    }

  } catch (error) {
    console.error('❌ Read-only test failed:', error.message);
  }
}

// Run the test
testReadOnly().catch(console.error);
