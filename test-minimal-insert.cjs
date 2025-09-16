// Test minimal insert to understand current table structure
const { supabase } = require('./supabase.config');

async function testMinimalInsert() {
  console.log('🧪 Testing minimal insert to understand current table structure...');
  
  try {
    // Try the most basic insert possible
    console.log('\n1. Testing absolute minimal insert...');
    
    // Try with just uid and email (most basic required fields)
    const minimalData = {
      uid: 'test-minimal-001',
      email: 'minimal@test.com'
    };

    const { data, error } = await supabase
      .from('users')
      .insert(minimalData)
      .select()
      .single();

    if (error) {
      console.log('❌ Minimal insert error:', error.message);
      
      // Try to understand what columns DO exist
      console.log('\n2. Testing what we can select...');
      
      // Try to select just the primary key or basic columns
      const testSelects = ['id', 'uid', 'email', 'created_at'];
      
      for (const column of testSelects) {
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
      
      return;
    } else {
      console.log('✅ Minimal insert successful:', data);
    }

  } catch (error) {
    console.error('❌ Minimal insert test failed:', error.message);
    console.log('💡 The table schema is still not matching expectations');
    console.log('📋 Please run the add-missing-columns.sql script in Supabase SQL Editor');
  }
}

// Run the test
testMinimalInsert().catch(console.error);
