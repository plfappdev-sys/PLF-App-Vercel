const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function linkNicholasMolale() {
  console.log('=== LINKING NICHOLAS MOLALE ===\n');
  
  // We need to find Nicholas Molale's email and member number
  // Member number is M041 based on our previous tests
  const memberNumber = 'M041';
  
  try {
    // Step 1: Check if member M041 exists
    console.log(`1. Checking if member '${memberNumber}' exists...`);
    const { data: member, error: memberError } = await supabase
      .from('members')
      .select('id, member_number, personal_info')
      .eq('member_number', memberNumber)
      .single();
    
    if (memberError) {
      if (memberError.code === 'PGRST116') {
        console.log(`❌ Member '${memberNumber}' not found. Let's search for Nicholas Molale...`);
        
        // Search for Nicholas Molale in members
        const { data: searchResults, error: searchError } = await supabase
          .from('members')
          .select('id, member_number, personal_info')
          .or('personal_info->>fullName.ilike.%nicholas%,personal_info->>fullName.ilike.%molale%');
        
        if (searchError) {
          console.error('Error searching members:', searchError.message);
        } else if (searchResults && searchResults.length > 0) {
          console.log('Found potential matches:');
          searchResults.forEach(m => {
            const name = m.personal_info?.fullName || 'Unknown Name';
            console.log(`   - Member ${m.member_number}: ${name}`);
          });
        } else {
          console.log('No members found with name containing Nicholas or Molale');
        }
        return;
      } else {
        console.error('Error checking member:', memberError.message);
        return;
      }
    }
    
    const memberName = member.personal_info?.fullName || 'Unknown Name';
    console.log(`✅ Found member: ${memberName} (Member Number: ${member.member_number})`);
    
    // Step 2: List all available users to find Nicholas Molale's email
    console.log('\n2. Listing all available users...');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('uid, email, membernumber, role')
      .order('email');
    
    if (usersError) {
      console.error('Error fetching users:', usersError.message);
      return;
    }
    
    if (!users || users.length === 0) {
      console.log('❌ No users found in the database');
      return;
    }
    
    console.log(`Found ${users.length} users:`);
    users.forEach((user, index) => {
      const status = user.membernumber ? `(Linked to: ${user.membernumber})` : '(Not linked)';
      console.log(`${index + 1}. ${user.email} ${status} - Role: ${user.role}`);
    });
    
    // Step 3: Try to find Nicholas Molale's email
    console.log('\n3. Searching for Nicholas Molale email...');
    
    // Nicholas Molale's email is bluez.nm@gmail.com
    const userEmail = 'bluez.nm@gmail.com';
    let userToLink = users.find(u => u.email.toLowerCase() === userEmail.toLowerCase());
    
    if (!userToLink) {
      console.log(`❌ User with email ${userEmail} not found in users table`);
      return;
    }
    
    console.log(`✅ Found user: ${userToLink.email} (UID: ${userToLink.uid})`);
    console.log(`   Current membernumber: ${userToLink.membernumber || 'Not linked'}`);
    
    // Check if already linked to M041 (with or without M prefix)
    const currentMemberNumber = userToLink.membernumber;
    if (currentMemberNumber === memberNumber || currentMemberNumber === '041') {
      console.log(`ℹ️  User is already linked to member ${currentMemberNumber}`);
      console.log(`   This should be updated to ${memberNumber} for consistency`);
    }
    
    // Step 4: Link the user to member M041
    console.log(`\n4. Linking ${userToLink.email} to member ${memberNumber}...`);
    
    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update({ membernumber: memberNumber })
      .eq('uid', userToLink.uid)
      .select();
    
    if (updateError) {
      console.error('❌ Error linking user to member:', updateError.message);
      return;
    }
    
    console.log(`✅ Successfully linked ${userToLink.email} to member ${memberNumber}`);
    console.log(`   Updated user:`, updatedUser[0]);
    
    // Step 5: Verify the update
    console.log('\n5. Verifying the update...');
    const { data: verifiedUser, error: verifyError } = await supabase
      .from('users')
      .select('uid, email, membernumber, role')
      .eq('email', userToLink.email)
      .single();
    
    if (verifyError) {
      console.error('Error verifying update:', verifyError.message);
    } else {
      console.log(`✅ Verification successful:`);
      console.log(`   Email: ${verifiedUser.email}`);
      console.log(`   Member Number: ${verifiedUser.membernumber || 'Not linked'}`);
      console.log(`   Role: ${verifiedUser.role}`);
    }
    
    console.log('\n🎉 Nicholas Molale should now be able to:');
    console.log('   - Access his member dashboard');
    console.log('   - View his financial information');
    console.log('   - Generate member statements');
    console.log('   - See his negative balance of R -5,934.26');
    
  } catch (err) {
    console.error('Exception:', err.message);
  }
}

// Interactive version - ask for email if not found
async function interactiveLink() {
  console.log('=== INTERACTIVE USER-MEMBER LINKING ===\n');
  
  try {
    // Get all users
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('uid, email, membernumber, role')
      .order('email');
    
    if (usersError) {
      console.error('Error fetching users:', usersError.message);
      return;
    }
    
    console.log('Available users:');
    users.forEach((user, index) => {
      const status = user.membernumber ? `(Linked to: ${user.membernumber})` : '(Not linked)';
      console.log(`${index + 1}. ${user.email} ${status} - Role: ${user.role}`);
    });
    
    // Get all members
    const { data: members, error: membersError } = await supabase
      .from('members')
      .select('member_number, personal_info')
      .order('member_number');
    
    if (membersError) {
      console.error('Error fetching members:', membersError.message);
      return;
    }
    
    console.log('\nAvailable members:');
    members.forEach((member, index) => {
      const name = member.personal_info?.fullName || 'Unknown Name';
      console.log(`${index + 1}. ${member.member_number} - ${name}`);
    });
    
    console.log('\n📝 To link Nicholas Molale:');
    console.log('1. Find his email in the users list above');
    console.log('2. Note that his member number is M041');
    console.log('3. Update the link_nicholas_molale.js script with his email');
    console.log('4. Run: node link_nicholas_molale.js');
    
  } catch (err) {
    console.error('Exception:', err.message);
  }
}

// Run the appropriate function
if (process.argv.includes('--interactive')) {
  interactiveLink().catch(console.error);
} else {
  linkNicholasMolale().catch(console.error);
}