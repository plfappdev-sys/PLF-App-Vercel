// Test inserting a simple record to understand the table structure
const { supabase } = require('./supabase.config');

async function testInsertSimple() {
  console.log('🧪 Testing simple insert to understand table structure...');
  
  try {
    // Try different column combinations to see what works
    const testCases = [
      { email: 'test1@example.com', role: 'member' },
      { uid: 'test-uid-1', email: 'test2@example.com' },
      { email: 'test3@example.com' }
    ];

    for (let i = 0; i < testCases.length; i++) {
      const testData = testCases[i];
      console.log(`\n${i + 1}. Testing:`, Object.keys(testData).join(', '));
      
      try {
        const { data, error } = await supabase
          .from('users')
          .insert(testData)
          .select()
          .single();

        if (error) {
          console.log('   ❌ Error:', error.message);
          
          // If it's a column error, try to understand which column
          if (error.message.includes('column')) {
            const columnMatch = error.message.match(/column "([^"]+)"/);
            if (columnMatch) {
              console.log('   💡 Missing column:', columnMatch[1]);
            }
          }
        } else {
          console.log('   ✅ Success! Inserted:', data);
          break; // Stop if one works
        }
      } catch (err) {
        console.log('   ❌ Exception:', err.message);
      }
    }

    // If all failed, try to get the table structure by selecting *
    console.log('\n5. Checking table structure via select *...');
    const { data: structureData, error: structureError } = await supabase
      .from('users')
      .select('*')
      .limit(1);

    if (structureError) {
      console.log('   ❌ Structure error:', structureError.message);
    } else if (structureData && structureData.length > 0) {
      console.log('   ✅ Table structure:');
      const firstRow = structureData[0];
      Object.keys(firstRow).forEach(key => {
        console.log(`      ${key}: ${typeof firstRow[key]}`);
      });
    } else {
      console.log('   ℹ️  Table is empty, no structure info available');
    }

    console.log('\n💡 Based on the errors, the table schema might be different');
    console.log('📋 Recommended next steps:');
    console.log('   1. Check the actual table structure in Supabase Dashboard');
    console.log('   2. Run: SELECT * FROM information_schema.columns WHERE table_name = \'users\';');
    console.log('   3. Update the add-missing-columns.sql script with correct column names');
    console.log('   4. Run the updated script in Supabase SQL Editor');

  } catch (error) {
    console.error('❌ Simple insert test failed:', error.message);
  }
}

// Run the test
testInsertSimple().catch(console.error);
