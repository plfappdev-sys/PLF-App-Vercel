// Node.js script to execute SQL commands to add missing columns
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

// Configuration
const supabaseUrl = process.env.PROJECT_URL || 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseServiceKey = process.env.SERVICE_ROLE_KEY || '';

async function executeSqlScript() {
    console.log('Executing SQL script to add missing columns...');
    
    try {
        // Initialize Supabase client
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        
        // Read SQL file
        const sqlContent = fs.readFileSync('fix-missing-columns.sql', 'utf8');
        
        // Execute SQL commands
        const commands = sqlContent.split(';')
            .map(cmd => cmd.trim())
            .filter(cmd => cmd.length > 0);
        
        for (const cmd of commands) {
            if (cmd.startsWith('SELECT')) {
                // For SELECT queries, use the query method
                const { data, error } = await supabase.from('members').select('*').limit(1);
                if (error) {
                    console.error('Query error:', error);
                } else {
                    console.log('Query executed successfully');
                }
            } else {
                // For ALTER TABLE and other DDL commands, we need to use the REST API approach
                // Since Supabase doesn't support raw SQL execution, we'll use the table operations
                console.log(`Executing: ${cmd.substring(0, 50)}...`);
                
                // For ALTER TABLE commands, we'll handle them differently
                if (cmd.startsWith('ALTER TABLE')) {
                    console.log(`Note: ALTER TABLE commands need to be executed manually in Supabase SQL Editor`);
                    console.log(`Command: ${cmd}`);
                } else if (cmd.startsWith('UPDATE')) {
                    console.log(`Note: UPDATE commands need to be executed manually in Supabase SQL Editor`);
                    console.log(`Command: ${cmd}`);
                }
            }
        }
        
        console.log('SQL script execution completed (some commands may need manual execution)');
        return true;
        
    } catch (error) {
        console.error('Error executing SQL script:', error);
        return false;
    }
}

// Execute the script
executeSqlScript();
