
// Database migration runner for new calculation methodology
const { execSync } = require('child_process');
const fs = require('fs');
require('dotenv').config();

console.log('=== Running Database Migration for New Calculation Methodology ===\n');

// Check if Supabase connection is configured
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env file');
  console.error('Please configure your Supabase connection first.');
  process.exit(1);
}

// Read migration SQL
const migrationSQL = fs.readFileSync('database-migration-new-calculation.sql', 'utf8');

console.log('Migration SQL loaded successfully');
console.log('SQL file size:', migrationSQL.length, 'bytes');
console.log('\nIMPORTANT: This migration will:');
console.log('1. Update penalty interest rate to 5.5%');
console.log('2. Add new columns to members table');
console.log('3. Update system configuration');
console.log('4. Create audit log entry');
console.log('\nTo execute this migration manually:');
console.log('1. Go to Supabase dashboard: https://app.supabase.com');
console.log('2. Select your project');
console.log('3. Go to SQL Editor');
console.log('4. Copy and paste the contents of database-migration-new-calculation.sql');
console.log('5. Run the SQL script');
console.log('\nAlternatively, you can use the Supabase CLI:');
console.log('supabase db push --db-url="postgresql://..."');
console.log('\nMigration script saved to: database-migration-new-calculation.sql');
console.log('\n=== Migration Ready ===');
console.log('Please execute the migration manually in Supabase SQL Editor.');
