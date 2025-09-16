// Test inserting with essential columns only
const { supabase } = require('./supabase.config');

async function testEssentialInsert() {
  console.log('🧪 Testing insert with essential columns...');
  
  try {
    // Test with just the essential columns
    const essentialData = {
      email: 'essential@test.com',
      role: 'member'
    };

    console.log('\n1. Testing essential insert...');
    const { data, error } = await supabase
      .from('users')
      .insert(essentialData)
      .select()
      .single();

    if (error) {
      console.log('❌ Essential insert error:', error.message);
      
      // Check what specific columns are missing
      if (error.message.includes('email')) {
        console.log('💡 email column is still missing');
      }
      if (error.message.includes('role')) {
        console.log('💡 role column is still missing');
      }
      
      console.log('\n📋 Please run the add-essential-columns.sql script in Supabase SQL Editor');
      return;
    } else {
      console.log('✅ Essential insert successful:', data);
      
      // Test member number functionality
      console.log('\n2. Testing member number check...');
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
        console.log('❌ Member number test failed - column may not exist yet');
      }
    }

  } catch (error) {
    console.error('❌ Essential insert test failed:', error.message);
  }
}

// Run the test
testEssentialInsert().catch(console.error);
