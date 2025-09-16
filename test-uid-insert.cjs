// Test inserting with just uid to see current table structure
const { supabase } = require('./supabase.config');

async function testUidInsert() {
  console.log('🧪 Testing insert with just uid column...');
  
  try {
    // Test with just uid (which we know exists now)
    const uidData = {
      uid: 'test-uid-001'
    };

    console.log('\n1. Testing uid-only insert...');
    const { data, error } = await supabase
      .from('users')
      .insert(uidData)
      .select()
      .single();

    if (error) {
      console.log('❌ Uid insert error:', error.message);
      
      // Try to see what columns we can actually insert
      console.log('\n2. Testing what columns we can insert...');
      
      // Test different column combinations
      const testCases = [
        { uid: 'test-uid-002' },
        { uid: 'test-uid-003', created_at: new Date() },
        { id: 999, uid: 'test-uid-004' }
      ];

      for (let i = 0; i < testCases.length; i++) {
        const testData = testCases[i];
        console.log(`   Testing: ${Object.keys(testData).join(', ')}`);
        
        try {
          const { data: testResult, error: testError } = await supabase
            .from('users')
            .insert(testData)
            .select()
            .single();

          if (testError) {
            console.log(`   ❌ Error: ${testError.message}`);
          } else {
            console.log(`   ✅ Success! Inserted:`, testResult);
            break;
          }
        } catch (err) {
          console.log(`   ❌ Exception: ${err.message}`);
        }
      }
      
      return;
    } else {
      console.log('✅ Uid insert successful:', data);
    }

  } catch (error) {
    console.error('❌ Uid insert test failed:', error.message);
  }
}

// Run the test
testUidInsert().catch(console.error);
