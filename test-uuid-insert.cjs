// Test inserting with proper UUID format
const { supabase } = require('./supabase.config');

async function testUuidInsert() {
  console.log('🧪 Testing insert with proper UUID format...');
  
  try {
    // Generate proper UUID format (v4 style)
    const testUuid = '12345678-1234-5678-9abc-def012345678';
    
    // Test with just uid (proper UUID format)
    const uidData = {
      uid: testUuid
    };

    console.log('\n1. Testing UUID insert...');
    const { data, error } = await supabase
      .from('users')
      .insert(uidData)
      .select()
      .single();

    if (error) {
      console.log('❌ UUID insert error:', error.message);
      
      // Try with auto-generated UUID (let PostgreSQL generate it)
      console.log('\n2. Testing with auto-generated UUID...');
      const autoUuidData = {
        uid: null // Let PostgreSQL generate the UUID
      };

      try {
        const { data: autoData, error: autoError } = await supabase
          .from('users')
          .insert(autoUuidData)
          .select()
          .single();

        if (autoError) {
          console.log('❌ Auto UUID error:', autoError.message);
        } else {
          console.log('✅ Auto UUID successful:', autoData);
        }
      } catch (autoErr) {
        console.log('❌ Auto UUID exception:', autoErr.message);
      }
      
      return;
    } else {
      console.log('✅ UUID insert successful:', data);
    }

  } catch (error) {
    console.error('❌ UUID insert test failed:', error.message);
  }
}

// Run the test
testUuidInsert().catch(console.error);
