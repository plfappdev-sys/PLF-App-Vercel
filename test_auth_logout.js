// Test auth logout/refresh issue
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAuthSession() {
  console.log('Testing auth session persistence...');
  
  try {
    // Try to get current session
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error getting session:', error.message);
      return;
    }
    
    if (session) {
      console.log('Session found:');
      console.log('User:', session.user.email);
      console.log('Expires at:', new Date(session.expires_at * 1000).toLocaleString());
      console.log('Refresh token exists:', !!session.refresh_token);
      
      // Check token refresh
      const now = Math.floor(Date.now() / 1000);
      const expiresIn = session.expires_at - now;
      console.log('Token expires in:', expiresIn, 'seconds');
      
      if (expiresIn < 300) { // Less than 5 minutes
        console.log('Token needs refresh soon');
      }
    } else {
      console.log('No active session found');
    }
    
    // Check storage
    console.log('\nChecking AsyncStorage simulation...');
    console.log('Note: In React Native, AsyncStorage would be used');
    console.log('In Node.js, we can check if session is being persisted');
    
  } catch (error) {
    console.error('Error in test:', error.message);
  }
}

// Run test
testAuthSession();