const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Configuration
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://zdnyhzasvifrskbostgn.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY;

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function clearMembersAndRunReplacement() {
  console.log('Starting member clearing and data replacement...');
  
  try {
    // Step 1: Get superuser IDs
    console.log('1. Getting superuser IDs...');
    const { data: superusers, error: superuserError } = await supabase
      .from('users')
      .select('id')
      .eq('role', 'superuser');
    
    if (superuserError) {
      console.error('Error getting superusers:', superuserError);
      return;
    }
    
    const superuserIds = superusers.map(user => user.id);
    console.log(`Found ${superuserIds.length} superusers`);
    
    // Step 2: Clear ALL members (including those linked to superusers)
    console.log('2. Clearing ALL members from the database...');
    
    // Get all member IDs first
    const { data: allMembers, error: fetchError } = await supabase
      .from('members')
      .select('id');
    
    if (fetchError) {
      console.error('Error fetching members:', fetchError);
      return;
    }
    
    console.log(`Found ${allMembers.length} members to delete`);
    
    // Delete members one by one to avoid query issues
    let deletedCount = 0;
    for (const member of allMembers) {
      const { error: deleteError } = await supabase
        .from('members')
        .delete()
        .eq('id', member.id);
      
      if (deleteError) {
        console.error(`Error deleting member ${member.id}:`, deleteError);
      } else {
        deletedCount++;
      }
    }
    
    console.log(`✅ Successfully deleted ${deletedCount} members`);
    
    console.log('✅ All members cleared successfully');
    
    // Step 3: Verify members table is empty
    console.log('3. Verifying members table is empty...');
    const { data: remainingMembers, error: countError } = await supabase
      .from('members')
      .select('*', { count: 'exact' });
    
    if (countError) {
      console.error('Error counting members:', countError);
      return;
    }
    
    console.log(`Members table count: ${remainingMembers.length}`);
    
    if (remainingMembers.length === 0) {
      console.log('✅ Members table is now empty. Ready for data replacement.');
      console.log('\nNow run: python complete-data-replacement.py');
    } else {
      console.log('❌ Members table still has data. Manual intervention required.');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

clearMembersAndRunReplacement();
