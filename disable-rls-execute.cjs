// Script to disable RLS on users table for development
const { supabase } = require('./supabase.config');

async function disableRLS() {
  console.log('🔧 Disabling RLS on users table for development...');
  
  try {
    // Execute the SQL to disable RLS
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE users DISABLE ROW LEVEL SECURITY;'
    });

    if (error) {
      console.error('❌ Error disabling RLS:', error.message);
      
      // Try alternative approach using direct SQL execution
      console.log('⚠️ Trying alternative approach...');
      
      // This might require using the service role key or running directly in Supabase SQL editor
      console.log('💡 Please run this SQL in Supabase SQL Editor:');
      console.log('ALTER TABLE users DISABLE ROW LEVEL SECURITY;');
      console.log('\n📋 Or visit: https://zdnyhzasvifrskbostgn.supabase.co/project/default/sql');
      
      return;
    }

    console.log('✅ RLS disabled successfully on users table');
    console.log('📋 Verification query:');
    console.log('SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = \'public\' AND tablename = \'users\';');

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    console.log('💡 Please run the SQL manually in Supabase SQL Editor:');
    console.log('ALTER TABLE users DISABLE ROW LEVEL SECURITY;');
  }
}

// Run the function
disableRLS().catch(console.error);
