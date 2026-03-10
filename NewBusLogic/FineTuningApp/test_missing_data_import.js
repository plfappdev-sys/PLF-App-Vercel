/**
 * Test Script for Missing Excel Data Import
 * ==========================================
 * This script tests the database schema and data import process
 * for the missing Excel columns required by MyFundsScreen.
 * 
 * Created: March 9, 2026
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

class MissingDataTest {
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
    
    // Required columns for MyFundsScreen
    this.requiredColumns = [
      // High Priority (MyFundsScreen display)
      'expected_contribution',      // Position 2
      'outstanding_amount',         // Position 4
      'outstanding_contributions',  // Position 5
      'total_penalties',            // Position 6
      
      // Medium Priority (Calculations)
      'balance_brought_forward',
      'catch_up_fee',
      
      // Low Priority (Additional data)
      'total_bank_charges',
      'share_value',
      'capped_penalties',
      'estimated_annual_contribution'
    ];
    
    // Existing columns that should already be there
    this.existingColumns = [
      'total_contributions',        // Position 3
      'current_balance',            // Position 1 (Balance/Balance Due)
      'total_interest_earned',
      'total_interest_charged'
    ];
  }
  
  async testDatabaseConnection() {
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
  
  async checkTableSchema() {
    console.log('\n📊 Checking members table schema...');
    
    try {
      // Get a sample member to see available columns
      const { data: sampleMember, error } = await this.supabase
        .from('members')
        .select('*')
        .limit(1)
        .single();
      
      if (error) {
        console.error('❌ Error fetching sample member:', error.message);
        return false;
      }
      
      if (!sampleMember) {
        console.log('⚠️  No members found in database');
        return false;
      }
      
      const availableColumns = Object.keys(sampleMember);
      console.log(`📋 Found ${availableColumns.length} columns in members table`);
      
      // Check required columns
      console.log('\n🔍 Checking required columns for MyFundsScreen:');
      const missingColumns = [];
      const existingColumns = [];
      
      for (const column of this.requiredColumns) {
        if (availableColumns.includes(column)) {
          console.log(`  ✅ ${column}`);
          existingColumns.push(column);
        } else {
          console.log(`  ❌ ${column} (MISSING)`);
          missingColumns.push(column);
        }
      }
      
      // Check existing columns
      console.log('\n🔍 Checking existing columns:');
      for (const column of this.existingColumns) {
        if (availableColumns.includes(column)) {
          console.log(`  ✅ ${column}`);
        } else {
          console.log(`  ⚠️  ${column} (MISSING - but should exist)`);
        }
      }
      
      // Summary
      console.log('\n📈 Schema Check Summary:');
      console.log(`  ✅ Existing columns: ${existingColumns.length}/${this.requiredColumns.length}`);
      console.log(`  ❌ Missing columns: ${missingColumns.length}/${this.requiredColumns.length}`);
      
      if (missingColumns.length > 0) {
        console.log('\n⚠️  Missing columns that need to be added:');
        missingColumns.forEach(col => console.log(`    - ${col}`));
        console.log('\n💡 Run the SQL migration script to add missing columns:');
        console.log('   node execute-sql-fix.js add_missing_member_columns.sql');
      }
      
      return {
        success: missingColumns.length === 0,
        totalColumns: availableColumns.length,
        existingRequired: existingColumns.length,
        missingRequired: missingColumns.length,
        missingColumns
      };
      
    } catch (error) {
      console.error('❌ Error checking table schema:', error.message);
      return { success: false, error: error.message };
    }
  }
  
  async testSampleData() {
    console.log('\n🧪 Testing sample member data...');
    
    try {
      // Get a few sample members
      const { data: members, error } = await this.supabase
        .from('members')
        .select(`
          member_number,
          first_name,
          last_name,
          total_contributions,
          current_balance,
          expected_contribution,
          outstanding_amount,
          outstanding_contributions,
          total_penalties
        `)
        .limit(5);
      
      if (error) {
        throw error;
      }
      
      if (!members || members.length === 0) {
        console.log('⚠️  No members found for testing');
        return false;
      }
      
      console.log(`📋 Found ${members.length} sample members:`);
      
      members.forEach((member, index) => {
        console.log(`\n  Member ${index + 1}: ${member.first_name} ${member.last_name} (${member.member_number})`);
        console.log(`    Total Contributions: R ${member.total_contributions || 0}`);
        console.log(`    Current Balance: R ${member.current_balance || 0}`);
        console.log(`    Expected Contribution: R ${member.expected_contribution || 'Not set'}`);
        console.log(`    Outstanding Amount: R ${member.outstanding_amount || 'Not set'}`);
        console.log(`    Outstanding Contributions: R ${member.outstanding_contributions || 'Not set'}`);
        console.log(`    Total Penalties: R ${member.total_penalties || 'Not set'}`);
        
        // Check if Outstanding Amount = Outstanding Contributions + Penalties
        if (member.outstanding_amount !== null && 
            member.outstanding_contributions !== null && 
            member.total_penalties !== null) {
          const calculated = (member.outstanding_contributions || 0) + (member.total_penalties || 0);
          if (Math.abs(member.outstanding_amount - calculated) > 0.01) {
            console.log(`    ⚠️  Data inconsistency: Outstanding Amount (${member.outstanding_amount}) != Outstanding Contributions (${member.outstanding_contributions}) + Penalties (${member.total_penalties}) = ${calculated}`);
          } else {
            console.log(`    ✅ Data consistency check passed`);
          }
        }
      });
      
      return true;
      
    } catch (error) {
      console.error('❌ Error testing sample data:', error.message);
      return false;
    }
  }
  
  async testMyFundsScreenData() {
    console.log('\n📱 Testing MyFundsScreen data requirements...');
    
    // MyFundsScreen display order requirements
    const displayOrder = [
      { position: 1, label: 'Balance / Balance Due', column: 'current_balance' },
      { position: 2, label: 'Expected Contribution', column: 'expected_contribution' },
      { position: 3, label: 'Total Contribution', column: 'total_contributions' },
      { position: 4, label: 'Outstanding Amount', column: 'outstanding_amount' },
      { position: 5, label: 'Outstanding Contributions', column: 'outstanding_contributions' },
      { position: 6, label: 'Penalties', column: 'total_penalties' }
    ];
    
    console.log('📋 MyFundsScreen Display Order Requirements:');
    
    let allDataAvailable = true;
    
    for (const item of displayOrder) {
      try {
        // Check if column exists and has data
        const { data, error } = await this.supabase
          .from('members')
          .select(item.column)
          .not(item.column, 'is', null)
          .limit(1);
        
        const hasData = !error && data && data.length > 0;
        
        if (hasData) {
          console.log(`  ✅ Position ${item.position}: ${item.label} (${item.column}) - Data available`);
        } else {
          console.log(`  ❌ Position ${item.position}: ${item.label} (${item.column}) - NO DATA`);
          allDataAvailable = false;
        }
      } catch (error) {
        console.log(`  ❌ Position ${item.position}: ${item.label} (${item.column}) - ERROR: ${error.message}`);
        allDataAvailable = false;
      }
    }
    
    if (allDataAvailable) {
      console.log('\n🎉 All MyFundsScreen data requirements are met!');
    } else {
      console.log('\n⚠️  Some MyFundsScreen data is missing. Need to import Excel data.');
    }
    
    return allDataAvailable;
  }
  
  async runAllTests() {
    console.log('='.repeat(60));
    console.log('🧪 MISSING EXCEL DATA IMPORT TEST SUITE');
    console.log('='.repeat(60));
    
    const results = {
      connection: false,
      schema: false,
      sampleData: false,
      myFundsScreen: false
    };
    
    // Test 1: Database Connection
    results.connection = await this.testDatabaseConnection();
    if (!results.connection) {
      console.error('❌ Cannot proceed without database connection');
      return results;
    }
    
    // Test 2: Table Schema
    const schemaResult = await this.checkTableSchema();
    results.schema = schemaResult.success;
    
    // Test 3: Sample Data
    results.sampleData = await this.testSampleData();
    
    // Test 4: MyFundsScreen Data
    results.myFundsScreen = await this.testMyFundsScreenData();
    
    // Final Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST RESULTS SUMMARY');
    console.log('='.repeat(60));
    
    console.log(`🔌 Database Connection: ${results.connection ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`📊 Table Schema: ${results.schema ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`🧪 Sample Data: ${results.sampleData ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`📱 MyFundsScreen Data: ${results.myFundsScreen ? '✅ PASS' : '❌ FAIL'}`);
    
    if (!results.schema && schemaResult.missingColumns) {
      console.log('\n🚨 ACTION REQUIRED:');
      console.log('1. Run the SQL migration script to add missing columns:');
      console.log('   node execute-sql-fix.js NewBusLogic/FineTuningApp/add_missing_member_columns.sql');
      console.log('\n2. Then run the Excel data import:');
      console.log('   python NewBusLogic/FineTuningApp/import_missing_excel_data.py --import');
    }
    
    if (results.schema && !results.myFundsScreen) {
      console.log('\n🚨 ACTION REQUIRED:');
      console.log('1. Run the Excel data import script:');
      console.log('   python NewBusLogic/FineTuningApp/import_missing_excel_data.py --import');
    }
    
    const allPassed = Object.values(results).every(result => result === true);
    
    if (allPassed) {
      console.log('\n🎉 ALL TESTS PASSED! MyFundsScreen is ready with all required data.');
    } else {
      console.log('\n⚠️  Some tests failed. Follow the action steps above.');
    }
    
    return results;
  }
}

// Run the tests
async function main() {
  const tester = new MissingDataTest();
  await tester.runAllTests();
}

// Handle command line arguments
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Unhandled error:', error);
    process.exit(1);
  });
}

module.exports = MissingDataTest;