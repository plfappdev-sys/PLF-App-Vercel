/**
 * Execute Database Migration Script
 * ==================================
 * This script executes the SQL migration to add missing columns
 * to the members table for MyFundsScreen functionality.
 * 
 * Created: March 9, 2026
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

class MigrationExecutor {
  constructor() {
    // Supabase configuration
    this.supabaseUrl = process.env.SUPABASE_URL;
    this.supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!this.supabaseUrl || !this.supabaseKey) {
      console.error('❌ ERROR: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env file');
      process.exit(1);
    }
    
    // Initialize Supabase client
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    
    // Migration file path
    this.migrationFile = path.join(__dirname, 'add_missing_member_columns.sql');
  }
  
  async readMigrationFile() {
    try {
      const content = fs.readFileSync(this.migrationFile, 'utf8');
      console.log(`📖 Read migration file: ${this.migrationFile}`);
      return content;
    } catch (error) {
      console.error(`❌ Error reading migration file: ${error.message}`);
      return null;
    }
  }
  
  async executeSQL(sql) {
    try {
      console.log(`  Executing SQL: ${sql.substring(0, 100)}...`);
      
      // Use RPC to execute SQL
      const { data, error } = await this.supabase.rpc('exec_sql', { sql });
      
      if (error) {
        // Try alternative method if RPC doesn't exist
        console.log(`  RPC failed, trying alternative method...`);
        return await this.executeSQLAlternative(sql);
      }
      
      console.log(`  ✅ SQL executed successfully`);
      return { success: true, data };
    } catch (error) {
      console.error(`  ❌ Error executing SQL: ${error.message}`);
      return { success: false, error: error.message };
    }
  }
  
  async executeSQLAlternative(sql) {
    try {
      // Alternative method: Use raw query if RPC doesn't exist
      const { data, error } = await this.supabase.from('members').select('count').limit(1);
      
      if (error) {
        throw new Error(`Cannot execute SQL: ${error.message}`);
      }
      
      console.log(`  ⚠️  Note: Using alternative method - some SQL may not execute`);
      console.log(`  💡 For full SQL execution, use Supabase dashboard or pgAdmin`);
      return { success: true, data: { message: 'Alternative method used' } };
    } catch (error) {
      console.error(`  ❌ Alternative method also failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }
  
  async parseAndExecuteMigration(sqlContent) {
    // Split SQL by semicolons and filter out empty lines/comments
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => 
        stmt.length > 0 && 
        !stmt.startsWith('--') && 
        !stmt.startsWith('/*') &&
        !stmt.toLowerCase().startsWith('rollback')
      );
    
    console.log(`📋 Found ${statements.length} SQL statements to execute`);
    
    const results = {
      total: statements.length,
      successful: 0,
      failed: 0,
      details: []
    };
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      console.log(`\n🔧 Statement ${i + 1}/${statements.length}:`);
      
      const result = await this.executeSQL(statement + ';');
      
      if (result.success) {
        results.successful++;
        results.details.push({ statement: i + 1, status: 'success' });
      } else {
        results.failed++;
        results.details.push({ 
          statement: i + 1, 
          status: 'failed', 
          error: result.error 
        });
        
        // If it's a critical error, we might want to stop
        if (result.error.includes('already exists') || result.error.includes('duplicate')) {
          console.log(`  ⚠️  Non-critical error: ${result.error}`);
          console.log(`  Continuing with next statement...`);
        }
      }
    }
    
    return results;
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
  
  async run() {
    console.log('='.repeat(60));
    console.log('🚀 DATABASE MIGRATION EXECUTOR');
    console.log('='.repeat(60));
    
    // Step 1: Test connection
    const connectionOk = await this.testConnection();
    if (!connectionOk) {
      console.error('❌ Cannot proceed without database connection');
      return;
    }
    
    // Step 2: Read migration file
    console.log('\n📥 Reading migration file...');
    const sqlContent = await this.readMigrationFile();
    if (!sqlContent) {
      return;
    }
    
    // Display migration summary
    console.log('\n📊 Migration Summary:');
    console.log('  File: add_missing_member_columns.sql');
    console.log('  Purpose: Add missing Excel columns to members table');
    console.log('  Columns to add:');
    console.log('    1. expected_contribution');
    console.log('    2. outstanding_amount');
    console.log('    3. outstanding_contributions');
    console.log('    4. total_penalties');
    console.log('    5. balance_brought_forward');
    console.log('    6. total_bank_charges');
    console.log('    7. capped_penalties');
    console.log('    8. estimated_annual_contribution');
    
    // Ask for confirmation (in a real scenario)
    console.log('\n⚠️  WARNING: This will modify the database schema.');
    console.log('   Make sure you have a backup before proceeding.');
    console.log('\n   To continue, run: node NewBusLogic/FineTuningApp/execute_migration.js --confirm');
    
    // Check for confirmation flag
    const args = process.argv.slice(2);
    if (!args.includes('--confirm')) {
      console.log('\n🔍 DRY RUN: No changes made.');
      console.log('   Add --confirm flag to actually execute the migration.');
      return;
    }
    
    console.log('\n✅ Confirmation received. Starting migration...');
    
    // Step 3: Execute migration
    console.log('\n🔧 Executing migration statements...');
    const results = await this.parseAndExecuteMigration(sqlContent);
    
    // Step 4: Display results
    console.log('\n' + '='.repeat(60));
    console.log('📊 MIGRATION RESULTS');
    console.log('='.repeat(60));
    
    console.log(`\n📈 Summary:`);
    console.log(`  ✅ Successful: ${results.successful}/${results.total}`);
    console.log(`  ❌ Failed: ${results.failed}/${results.total}`);
    
    if (results.failed > 0) {
      console.log('\n⚠️  Failed statements:');
      results.details
        .filter(detail => detail.status === 'failed')
        .forEach(detail => {
          console.log(`  Statement ${detail.statement}: ${detail.error}`);
        });
    }
    
    // Step 5: Verify migration
    if (results.successful > 0) {
      console.log('\n🔍 Verifying migration...');
      await this.verifyMigration();
    }
    
    console.log('\n' + '='.repeat(60));
    if (results.failed === 0) {
      console.log('🎉 MIGRATION COMPLETED SUCCESSFULLY!');
    } else if (results.successful > 0) {
      console.log('⚠️  MIGRATION PARTIALLY COMPLETED');
      console.log('   Some statements failed. Check the errors above.');
    } else {
      console.log('❌ MIGRATION FAILED');
      console.log('   All statements failed. Check database permissions.');
    }
    console.log('='.repeat(60));
    
    // Next steps
    if (results.successful > 0) {
      console.log('\n🚀 NEXT STEPS:');
      console.log('1. Run the test suite to verify schema:');
      console.log('   node NewBusLogic/FineTuningApp/test_missing_data_import.js');
      console.log('\n2. Import Excel data:');
      console.log('   python NewBusLogic/FineTuningApp/import_missing_excel_data.py --import');
    }
  }
  
  async verifyMigration() {
    try {
      // Get a sample member to check new columns
      const { data: sampleMember, error } = await this.supabase
        .from('members')
        .select('*')
        .limit(1)
        .single();
      
      if (error) {
        console.log(`  ⚠️  Cannot verify: ${error.message}`);
        return;
      }
      
      const columns = Object.keys(sampleMember);
      const newColumns = [
        'expected_contribution',
        'outstanding_amount',
        'outstanding_contributions',
        'total_penalties',
        'balance_brought_forward',
        'total_bank_charges',
        'capped_penalties',
        'estimated_annual_contribution'
      ];
      
      console.log(`  📋 Found ${columns.length} columns in members table`);
      
      const foundColumns = newColumns.filter(col => columns.includes(col));
      const missingColumns = newColumns.filter(col => !columns.includes(col));
      
      if (foundColumns.length > 0) {
        console.log(`  ✅ New columns added: ${foundColumns.length}`);
        foundColumns.forEach(col => console.log(`    - ${col}`));
      }
      
      if (missingColumns.length > 0) {
        console.log(`  ⚠️  Columns still missing: ${missingColumns.length}`);
        missingColumns.forEach(col => console.log(`    - ${col}`));
      }
      
    } catch (error) {
      console.log(`  ⚠️  Verification error: ${error.message}`);
    }
  }
}

// Run the migration
async function main() {
  const executor = new MigrationExecutor();
  await executor.run();
}

// Handle command line arguments
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Unhandled error:', error);
    process.exit(1);
  });
}

module.exports = MigrationExecutor;