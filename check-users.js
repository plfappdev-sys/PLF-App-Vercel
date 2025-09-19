// Script to check what users exist in the database and their member numbers
const { supabase } = require('./supabase.config');

async function checkUsers() {
  console.log('🔍 Checking users in database...');
  
  try {
    // Check if users table exists and has data
    const { data: users, error } = await supabase
      .from('users')
      .select('uid, email, membernumber, created_at')
      .order('created_at');

    if (error) {
      console.error('❌ Error accessing users table:', error.message);
      return;
    }

    if (!users || users.length === 0) {
      console.log('❌ No users found in the database');
      console.log('\n💡 You need to create users first:');
      console.log('1. Sign up through the app interface');
      console.log('2. Or manually create users in Supabase Auth');
      return;
    }

    console.log(`✅ Found ${users.length} users in database:`);
    console.log('\nAvailable Users:');
    users.forEach((user, index) => {
      const memberInfo = user.membernumber ? `(Member: ${user.membernumber})` : '(No member linked)';
      console.log(`${index + 1}. ${user.email} ${memberInfo}`);
    });

    console.log('\n📋 For Member Statement reports:');
    console.log('   Users need to be linked to members using their member numbers');
    console.log('   The error occurs when a user tries to generate a report but');
    console.log('   their user account is not linked to a member number');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

// Run the check
checkUsers().catch(console.error);
