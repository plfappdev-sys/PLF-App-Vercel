const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Supabase configuration
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function runDisableRLS() {
    console.log('🔓 Running disable RLS SQL commands...');
    
    try {
        // Read the SQL file
        const sqlContent = fs.readFileSync('disable-rls-members.sql', 'utf8');
        
        // Split into commands
        const commands = sqlContent.split(';')
            .map(cmd => cmd.trim())
            .filter(cmd => cmd.length > 0);
        
        console.log(`📋 Found ${commands.length} SQL commands to execute`);
        
        // Execute each command
        for (const cmd of commands) {
            console.log(`\n🔧 Executing: ${cmd.substring(0, 80)}...`);
            
            if (cmd.startsWith('SELECT')) {
                // For SELECT queries, we can use the query method
                const { data, error } = await supabase.from('members').select('*').limit(1);
                if (error) {
                    console.error('❌ Query error:', error);
                } else {
                    console.log('✅ Query executed successfully');
                }
            } else if (cmd.startsWith('ALTER TABLE')) {
                console.log('⚠️  ALTER TABLE commands need to be executed manually in Supabase SQL Editor');
                console.log(`   Command: ${cmd}`);
            } else if (cmd.startsWith('UPDATE')) {
                console.log('⚠️  UPDATE commands need to be executed manually in Supabase SQL Editor');
                console.log(`   Command: ${cmd}`);
            } else {
                console.log('⚠️  Unsupported command type, needs manual execution');
                console.log(`   Command: ${cmd}`);
            }
        }
        
        console.log('\n📋 IMPORTANT: To disable RLS, you need to:');
        console.log('1. Go to Supabase Dashboard → SQL Editor');
        console.log('2. Copy and paste the ALTER TABLE command from disable-rls-members.sql');
        console.log('3. Execute the command to disable RLS');
        console.log('4. Then run the member name update scripts');
        
    } catch (error) {
        console.error('❌ Error running SQL commands:', error);
    }
}

// Run the script
runDisableRLS();
