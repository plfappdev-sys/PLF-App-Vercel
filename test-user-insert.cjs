// Test inserting a user and checking memberNumber functionality
const { supabase } = require('./supabase.config');

async function testUserInsert() {
  console.log('🧪 Testing user insertion and memberNumber functionality...');
  
  try {
    // Test 1: Try to insert a test user with memberNumber
    console.log('\n1. Testing user insertion with memberNumber...');
    
    const testUser = {
      email: 'testuser@example.com',
      role: 'member',
      personal_info: {
        firstName: 'Test',
        lastName: 'User',
        idNumber: '1234567890123',
        dateOfBirth: new Date('1990-01-01'),
        phoneNumber: '+27123456789',
        address: {
          street: '123 Test St',
          city: 'Testville',
          province: 'Gauteng',
          postalCode: '2000'
        }
      },
      account_status: {
        isActive: true,
        isVerified: false,
        verificationDocuments: {
          verificationStatus: 'pending'
        }
      },
      membership_info: {
        membershipType: 'new',
        joinDate: new Date()
      },
      memberNumber: 'TEST001',
      created_at: new Date(),
      updated_at: new Date(),
      created_by: 'test-system'
    };

    const { data: insertedUser, error: insertError } = await supabase
      .from('users')
      .insert(testUser)
      .select()
      .single();

    if (insertError) {
      if (insertError.code === '23505') { // Unique violation
        console.log('✅ User already exists (unique constraint working)');
      } else if (insertError.message.includes('memberNumber')) {
        console.log('❌ memberNumber column missing:', insertError.message);
        console.log('💡 Run the add-missing-columns.sql script in Supabase SQL Editor');
        return;
      } else {
        console.log('❌ Insert error:', insertError.message);
        return;
      }
    } else {
      console.log('✅ User inserted successfully:', insertedUser.email);
    }

    // Test 2: Test member number verification
    console.log('\n2. Testing member number verification...');
    
    const { data: memberCheck, error: memberError } = await supabase
      .from('users')
      .select('memberNumber')
      .eq('memberNumber', 'TEST001')
      .single();

    if (memberError) {
      if (memberError.code === 'PGRST116') { // No rows found
        console.log('✅ Member number TEST001: Available');
      } else {
        console.log('❌ Member number check error:', memberError.message);
      }
    } else {
      console.log('✅ Member number TEST001: Taken');
    }

    // Test 3: Test available member number
    console.log('\n3. Testing available member number...');
    
    const { data: availableCheck, error: availableError } = await supabase
      .from('users')
      .select('memberNumber')
      .eq('memberNumber', 'NONEXISTENT123')
      .single();

    if (availableError) {
      if (availableError.code === 'PGRST116') { // No rows found
        console.log('✅ Member number NONEXISTENT123: Available');
      } else {
        console.log('❌ Available check error:', availableError.message);
      }
    } else {
      console.log('✅ Member number NONEXISTENT123: Taken');
    }

    console.log('\n🎉 User insertion test completed!');
    console.log('📋 Next steps:');
    console.log('   1. If memberNumber column is missing, run add-missing-columns.sql');
    console.log('   2. Update App.js to use SupabaseAuthProvider');
    console.log('   3. Test authentication with real users');

  } catch (error) {
    console.error('❌ User insertion test failed:', error.message);
  }
}

// Run the test
testUserInsert().catch(console.error);
