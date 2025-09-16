// Test with service role key to bypass RLS
// This requires getting the service role key from Supabase Dashboard > Settings > API

const { createClient } = require('@supabase/supabase-js');

async function testWithServiceRole() {
  console.log('🧪 Testing with service role key (bypasses RLS)...');
  
  // You need to get the service role key from:
  // Supabase Dashboard > Settings > API > service_role (secret)
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!serviceRoleKey) {
    console.log('❌ Service role key not found in environment variables');
    console.log('📋 Get it from: Supabase Dashboard > Settings > API > service_role (secret)');
    console.log('💡 Then set it as: SUPABASE_SERVICE_ROLE_KEY=your_key_here');
    return;
  }

  const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
  
  try {
    // Create client with service role key (bypasses RLS)
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
    
    console.log('\n1. Testing insert with service role...');
    
    const testUser = {
      email: 'testuser@example.com',
      role: 'member'
    };

    const { data, error } = await supabaseAdmin
      .from('users')
      .insert(testUser)
      .select()
      .single();

    if (error) {
      console.log('❌ Service role insert error:', error.message);
      
      // Try with all required fields
      console.log('\n2. Testing with complete user data...');
      const completeUser = {
        email: 'complete@example.com',
        role: 'member',
        uid: '12345678-1234-5678-9abc-def012345678'
      };

      const { data: completeData, error: completeError } = await supabaseAdmin
        .from('users')
        .insert(completeUser)
        .select()
        .single();

      if (completeError) {
        console.log('❌ Complete user error:', completeError.message);
      } else {
        console.log('✅ Complete user inserted:', completeData);
      }
      
      return;
    } else {
      console.log('✅ Service role insert successful:', data);
    }

  } catch (error) {
    console.error('❌ Service role test failed:', error.message);
  }
}

// Run the test
testWithServiceRole().catch(console.error);
