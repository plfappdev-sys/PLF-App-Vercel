/**
 * Simple Migration Runner
 * =======================
 * This script provides instructions for running the SQL migration
 * and verifies if the columns were added successfully.
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

class SimpleMigrationRunner {
  constructor() {
    // Supabase configuration
    this.supabaseUrl = process.env.SUPABASE_URL;
    this.supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!this.supabaseUrl || !this.supabaseKey) {
      console.error('❌ ERROR: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env file');
      console.error('   Please check your .env file and ensure these variables are set.');
      process.exit(1);
    }
    
    // Initialize Supabase client
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    
    // Migration file path
    this.migrationFile = path.join(__dirname, 'simple_migration.sql');
  }
  
  async testConnection() {
    console.log('🔌 Testing database connection...');
    try {
      const { data, error } = await this.supabase
        .from('members')
        .select('count')
        .limit(1);
      
      if (error) {
        throw error;
      }
      
      console.log('✅ Database connection successful');
      return true;
    } catch (error) {
      console.error('❌ Database connection failed:', error.message);
      return false;
    }
  }
  
  async checkCurrentSchema() {
    console.log('\n📋 Checking current members table schema...');
    try {
      // Get a sample member to see current columns
      const { data: sampleMember, error } = await this.supabase
        .from('members')
        .select('*')
        .limit(1)
        .single();
      
      if (error) {
        console.log(`  ⚠️  Cannot get sample member: ${error.message}`);
        return [];
      }
      
      const columns = Object.keys(sampleMember);
      console.log(`  📊 Found ${columns.length} columns in members table`);
      
      // Check for missing columns
      const requiredColumns = [
        'expected_contribution',
        'outstanding_amount',
        'outstanding_contributions',
        'total_penalties',
        'balance_brought_forward',
        'total_bank_charges',
        'capped_penalties',
        'estimated_annual_contribution'
      ];
      
      const existingColumns = columns.filter(col => requiredColumns.includes(col));
      const missingColumns = requiredColumns.filter(col => !columns.includes(col));
      
      console.log(`  ✅ Existing new columns: ${existingColumns.length}`);
      existingColumns.forEach(col => console.log(`    - ${col}`));
      
      console.log(`  ❌ Missing columns: ${missingColumns.length}`);
      missingColumns.forEach(col => console.log(`    - ${col}`));
      
      return {
        totalColumns: columns.length,
        existingColumns,
        missingColumns
      };
    } catch (error) {
      console.error(`  ❌ Error checking schema: ${error.message}`);
      return { totalColumns: 0, existingColumns: [], missingColumns: [] };
    }
  }
  
  displayMigrationInstructions() {
    console.log('\n' + '='.repeat(70));
    console.log('🚀 MIGRATION INSTRUCTIONS');
    console.log('='.repeat(70));
    
    console.log('\n📝 Since Supabase does not allow direct SQL execution via the client,');
    console.log('   you need to execute the migration manually in the Supabase SQL Editor.');
    
    console.log('\n🔧 Steps to execute the migration:');
    console.log('   1. Go to https://app.supabase.com/project/_/sql');
    console.log('   2. Copy the SQL from: NewBusLogic/FineTuningApp/simple_migration.sql');
    console.log('   3. Paste it into the SQL Editor');
    console.log('   4. Click "Run" to execute the migration');
    
    console.log('\n📄 SQL Migration File Location:');
    console.log(`   ${this.migrationFile}`);
    
    console.log('\n⚠️  IMPORTANT NOTES:');
    console.log('   - Make sure you have a database backup before running the migration');
    console.log('   - The script uses "IF NOT EXISTS" so it won\'t fail if columns already exist');
    console.log('   - After running, verify the columns were added using the verification step');
    
    console.log('\n✅ After migration, run this script again to verify:');
    console.log('   node NewBusLogic/FineTuningApp/run_simple_migration.js --verify');
  }
  
  async verifyMigration() {
    console.log('\n' + '='.repeat(70));
    console.log('🔍 VERIFYING MIGRATION');
    console.log('='.repeat(70));
    
    const schemaInfo = await this.checkCurrentSchema();
    
    if (schemaInfo.missingColumns.length === 0) {
      console.log('\n🎉 SUCCESS: All required columns are present in the members table!');
      console.log('\n🚀 Next steps:');
      console.log('   1. Run the Excel data import script:');
      console.log('      python NewBusLogic/FineTuningApp/import_missing_excel_data.py --import');
      console.log('   2. Update MyFundsScreen to use the new data columns');
      console.log('   3. Test the implementation');
    } else {
      console.log('\n⚠️  WARNING: Some columns are still missing.');
      console.log(`   Missing: ${schemaInfo.missingColumns.length} columns`);
      console.log('\n💡 Please execute the migration script in the Supabase SQL Editor.');
      console.log('   See instructions above.');
    }
  }
  
  async run() {
    console.log('='.repeat(70));
    console.log('📊 SIMPLE MIGRATION RUNNER');
    console.log('='.repeat(70));
    
    // Check command line arguments
    const args = process.argv.slice(2);
    const verifyOnly = args.includes('--verify');
    
    // Step 1: Test connection
    const connectionOk = await this.testConnection();
    if (!connectionOk) {
      console.error('\n❌ Cannot proceed without database connection');
      return;
    }
    
    if (verifyOnly) {
      await this.verifyMigration();
      return;
    }
    
    // Step 2: Check current schema
    await this.checkCurrentSchema();
    
    // Step 3: Display instructions
    this.displayMigrationInstructions();
    
    // Step 4: Show SQL content preview
    console.log('\n' + '='.repeat(70));
    console.log('📄 SQL MIGRATION CONTENT PREVIEW');
    console.log('='.repeat(70));
    
    try {
      const sqlContent = fs.readFileSync(this.migrationFile, 'utf8');
      const lines = sqlContent.split('\n').slice(0, 20); // Show first 20 lines
      console.log('\n' + lines.join('\n'));
      console.log('\n... (truncated)');
      console.log('\n📋 Full SQL file: ' + this.migrationFile);
    } catch (error) {
      console.error(`\n❌ Error reading migration file: ${error.message}`);
    }
  }
}

// Run the migration runner
async function main() {
  const runner = new SimpleMigrationRunner();
  await runner.run();
}

// Handle command line arguments
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Unhandled error:', error);
    process.exit(1);
  });
}

module.exports = SimpleMigrationRunner;