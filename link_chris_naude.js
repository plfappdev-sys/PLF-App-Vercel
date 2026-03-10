const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function linkChrisNaude() {
  console.log('=== LINKING CHRIS NAUDE ===\n');
  
  const userEmail = 'naudec4@gmail.com';
  const memberNumber = '6'; // Based on "Christopher Naude who is member 6"
  
  try {
    // First, let's check the structure of the users table
    console.log('1. Checking users table structure...');
    const { data: userColumns, error: columnsError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (columnsError) {
      console.error('Error checking users table:', columnsError.message);
    } else if (userColumns && userColumns.length > 0) {
      console.log('Users table columns:', Object.keys(userColumns[0]));
    }
    
    // Step 1: Find the user by email
    console.log(`\n2. Searching for user with email: ${userEmail}`);
    const { data: users, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', userEmail);
    
    if (userError) {
      console.error('Error searching for user:', userError.message);
      return;
    }
    
    if (!users || users.length === 0) {
      console.log(`❌ User with email ${userEmail} not found in users table`);
      return;
    }
    
    const user = users[0];
    console.log(`✅ Found user: ${user.email} (UID: ${user.uid})`);
    console.log('   User data:', JSON.stringify(user, null, 2));
    
    // Step 2: Check if member 6 exists
    console.log(`\n2. Checking if member number '${memberNumber}' exists`);
    const { data: member, error: memberError } = await supabase
      .from('members')
      .select('member_number, name')
      .eq('member_number', memberNumber)
      .single();
    
    if (memberError) {
      if (memberError.code === 'PGRST116') {
        console.log(`❌ Member number '${memberNumber}' not found in members table`);
        
        // Let's search for Christopher Naude in members
        console.log('\nSearching for Christopher Naude in members table...');
        const { data: allMembers, error: searchError } = await supabase
          .from('members')
          .select('member_number, name')
          .or('name.ilike.%christopher%,name.ilike.%naude%');
        
        if (searchError) {
          console.error('Error searching members:', searchError.message);
        } else if (allMembers && allMembers.length > 0) {
          console.log('Found potential matches:');
          allMembers.forEach(m => {
            console.log(`   - Member ${m.member_number}: ${m.name}`);
          });
        } else {
          console.log('No members found with name containing Christopher or Naude');
        }
        return;
      } else {
        console.error('Error checking member:', memberError.message);
        return;
      }
    }
    
    console.log(`✅ Found member: ${member.name} (Member Number: ${member.member_number})`);
    
    // Step 3: Update user with member number (using correct column name 'membernumber')
    console.log(`\n3. Linking user ${user.email} to member ${member.member_number}`);
    console.log(`   Current user membernumber: ${user.membernumber}`);
    console.log(`   Updating to: ${member.member_number}`);
    
    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update({ membernumber: member.member_number })
      .eq('uid', user.uid)
      .select();
    
    if (updateError) {
      console.error('❌ Error linking user to member:', updateError.message);
      return;
    }
    
    console.log(`✅ Successfully linked ${user.email} to member ${member.member_number}`);
    console.log(`   Updated user:`, updatedUser[0]);
    
    // Step 4: Verify the update
    console.log('\n4. Verifying the update...');
    const { data: verifiedUser, error: verifyError } = await supabase
      .from('users')
      .select('uid, email, membernumber, role')
      .eq('email', userEmail)
      .single();
    
    if (verifyError) {
      console.error('Error verifying update:', verifyError.message);
    } else {
      console.log(`✅ Verification successful:`);
      console.log(`   Email: ${verifiedUser.email}`);
      console.log(`   Member Number: ${verifiedUser.membernumber || 'Not linked'}`);
      console.log(`   Role: ${verifiedUser.role}`);
    }
    
  } catch (err) {
    console.error('Exception:', err.message);
  }
}

linkChrisNaude().catch(console.error);
