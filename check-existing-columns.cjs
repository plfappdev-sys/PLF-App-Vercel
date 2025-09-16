// Check what columns actually exist in the users table
const { supabase } = require('./supabase.config');

async function checkExistingColumns() {
  console.log('🔍 Checking existing columns in users table...');
  
  try {
    // Try to insert a minimal user to see what columns are accepted
    const minimalUser = {
      email: 'minimal@example.com',
      role: 'member'
    };

    console.log('\n1. Testing minimal user insertion...');
    const { data: insertedUser, error: insertError } = await supabase
      .from('users')
      .insert(minimalUser)
      .select()
      .single();

    if (insertError) {
      console.log('❌ Minimal insert error:', insertError.message);
      
      // Try to get just the email to see what works
      console.log('\n2. Testing simple query...');
      const { data: simpleData, error: simpleError } = await supabase
        .from('users')
        .select('email')
        .limit(1);

      if (simpleError) {
        console.log('❌ Simple query error:', simpleError.message);
      } else {
        console.log('✅ Simple query successful');
        console.log('   Data:', simpleData);
      }
      
      return;
    } else {
      console.log('✅ Minimal user inserted successfully');
      console.log('   User:', insertedUser.email);
    }

    // Test what columns we can actually query
    console.log('\n3. Testing available columns...');
    
    // Test common column names
    const testColumns = ['email', 'role', 'memberNumber', 'personal_info', 'account_status', 'membership_info', 'created_at'];
    
    for (const column of testColumns) {
      try {
        const { data, error } = await supabase
          .from('users')
          .select(column)
          .limit(1);

        if (error) {
          console.log(`   ❌ ${column}: ${error.message}`);
        } else {
          console.log(`   ✅ ${column}: Accessible`);
        }
      } catch (err) {
        console.log(`   ❌ ${column}: ${err.message}`);
      }
    }

  } catch (error) {
    console.error('❌ Column check failed:', error.message);
  }
}

// Run the check
checkExistingColumns().catch(console.error);
