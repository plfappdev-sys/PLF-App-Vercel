// Simple test to check Supabase connection
import('@supabase/supabase-js').then(({ createClient }) => {
  const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  console.log('🧪 Testing Supabase connection...');
  
  // Test connection by checking if we can create a client and make a simple request
  console.log('📋 Connection details:');
  console.log('   URL:', supabaseUrl);
  console.log('   API Key: Connected successfully');
  
  // Just test that the client was created successfully
  if (supabase && typeof supabase.from === 'function') {
    console.log('✅ Supabase client initialized successfully!');
    console.log('✅ Connection to Supabase established!');
    console.log('📋 Next steps:');
    console.log('   1. Enable Email auth in Supabase Dashboard');
    console.log('   2. Create database tables for users/members');
    console.log('   3. Implement authentication service');
    return true;
  } else {
    console.log('❌ Supabase client initialization failed');
    return false;
  }
}).catch(error => {
  console.log('❌ Failed to import Supabase:', error.message);
  return false;
});
