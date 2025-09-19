const { createClient } = require('@supabase/supabase-js');

// Supabase project configuration with service role key
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAyNDQ4NCwiZXhwIjoyMDczNjAwNDg0fQ.kOpqoycVNdJXC-fqqxwHPVof6e8JlJ60_J7WWF-1AHU';

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Test function to check member access
const testMemberAccess = async () => {
  try {
    console.log('Testing member access with service role key...');
    
    // Test count
    const { data: countData, error: countError } = await supabase.from('members').select('count');
    if (countError) {
      console.error('Count error:', countError.message);
      return;
    }
    console.log('Member count:', countData[0].count);
    
    // Test data access
    const { data: memberData, error: memberError } = await supabase.from('members').select('member_number, financial_info').limit(3);
    if (memberError) {
      console.error('Member data error:', memberError.message);
      return;
    }
    
    console.log('Member data access successful!');
    console.log('Sample members:', JSON.stringify(memberData, null, 2));
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
};

testMemberAccess();
