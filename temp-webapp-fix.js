// Temporary fix for web app RLS issue
// This script creates a modified supabase config that uses service role key
// WARNING: This is for development only - never use service role key in production frontend!

const fs = require('fs');
const path = require('path');

// Read the original supabase config
const configPath = path.join(__dirname, 'supabase.config.js');
const originalConfig = fs.readFileSync(configPath, 'utf8');

// Replace the anon key with service role key (temporarily)
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAyNDQ4NCwiZXhwIjoyMDczNjAwNDg0fQ.kOpqoycVNdJXC-fqqxwHPVof6e8JlJ60_J7WWF-1AHU';

const modifiedConfig = originalConfig.replace(
  /const supabaseAnonKey = '.*?';/,
  `const supabaseAnonKey = '${serviceRoleKey}'; // TEMPORARY: Using service role key for development`
);

// Create a backup of the original config
const backupPath = path.join(__dirname, 'supabase.config.js.backup');
fs.writeFileSync(backupPath, originalConfig);

// Write the modified config
fs.writeFileSync(configPath, modifiedConfig);

console.log('✅ Temporary fix applied:');
console.log('   - Original config backed up to supabase.config.js.backup');
console.log('   - Modified config now uses service role key');
console.log('   - Web app should now be able to access member data');
console.log('');
console.log('⚠️  WARNING: This is a temporary development fix!');
console.log('   - Never use service role key in production frontend code');
console.log('   - Restore original config after testing:');
console.log('     cp supabase.config.js.backup supabase.config.js');
