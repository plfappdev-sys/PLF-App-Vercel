// Script to verify if the new business logic schema has been deployed
const { supabase } = require('./supabase.config');

async function checkNewSchemaDeployment() {
  console.log('🔍 Checking if new business logic schema has been deployed...');
  console.log('='.repeat(60));
  
  // New tables that should exist if schema was deployed
  const newTablesToCheck = [
    'contributions',
    'member_balances', 
    'financial_years',
    'system_settings',
    'audit_logs'
  ];

  // New columns that should exist in existing tables
  const newColumnsToCheck = {
    'members': ['catch_up_fee', 'monthly_contribution', 'user_id'],
    'loans': ['penalty_interest_rate', 'penalty_interest_applied', 'penalty_start_date', 'total_penalty_interest']
  };

  let allTablesExist = true;
  let allColumnsExist = true;

  console.log('\n📋 Checking NEW tables:');
  console.log('-'.repeat(40));
  
  for (const tableName of newTablesToCheck) {
    try {
      // Try to select from the table - if it exists, this will work
      const { error } = await supabase
        .from(tableName)
        .select('count')
        .limit(1);

      if (error) {
        if (error.code === '42P01') { // Table doesn't exist
          console.log(`❌ ${tableName}: Does NOT exist`);
          allTablesExist = false;
        } else {
          console.log(`❌ ${tableName}: Error (${error.code}) - ${error.message}`);
          allTablesExist = false;
        }
      } else {
        console.log(`✅ ${tableName}: EXISTS`);
      }
    } catch (error) {
      console.log(`❌ ${tableName}: Failed to check - ${error.message}`);
      allTablesExist = false;
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n📋 Checking NEW columns in existing tables:');
  console.log('-'.repeat(40));

  for (const [tableName, columns] of Object.entries(newColumnsToCheck)) {
    console.log(`\nTable: ${tableName}`);
    
    // First check if the table exists
    const { error: tableError } = await supabase
      .from(tableName)
      .select('count')
      .limit(1);

    if (tableError) {
      console.log(`   ❌ Table ${tableName} does not exist or is inaccessible`);
      allColumnsExist = false;
      continue;
    }

    // For each column, try to query it specifically
    for (const columnName of columns) {
      try {
        // Try to query the specific column
        const { error: columnError } = await supabase
          .from(tableName)
          .select(columnName)
          .limit(1);

        if (columnError) {
          if (columnError.code === '42703') { // Column doesn't exist
            console.log(`   ❌ ${columnName}: Does NOT exist`);
            allColumnsExist = false;
          } else {
            console.log(`   ❌ ${columnName}: Error (${columnError.code}) - ${columnError.message}`);
            allColumnsExist = false;
          }
        } else {
          console.log(`   ✅ ${columnName}: EXISTS`);
        }
      } catch (error) {
        console.log(`   ❌ ${columnName}: Failed to check - ${error.message}`);
        allColumnsExist = false;
      }
      
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 DEPLOYMENT STATUS SUMMARY:');
  console.log('='.repeat(60));
  
  if (allTablesExist && allColumnsExist) {
    console.log('✅ SUCCESS: New business logic schema appears to be fully deployed!');
    console.log('   All new tables and columns are present in the database.');
  } else if (!allTablesExist && !allColumnsExist) {
    console.log('❌ NOT DEPLOYED: New business logic schema has NOT been deployed.');
    console.log('   None of the new tables or columns were found.');
  } else {
    console.log('⚠️  PARTIALLY DEPLOYED: Some components are missing.');
    if (!allTablesExist) {
      console.log('   - Some new tables are missing');
    }
    if (!allColumnsExist) {
      console.log('   - Some new columns are missing');
    }
  }

  console.log('\n💡 Next Steps:');
  if (!allTablesExist || !allColumnsExist) {
    console.log('   1. Deploy the schema using: new-business-logic-schema.sql');
    console.log('   2. Run: node execute-schema-changes.js for instructions');
    console.log('   3. Or use the safe schema: supabase-schema-safe.sql');
  } else {
    console.log('   1. Schema deployment is complete!');
    console.log('   2. Proceed with data migration and testing');
    console.log('   3. Deploy Edge Functions for automated processing');
  }

  return { allTablesExist, allColumnsExist };
}

// Run the check if this script is executed directly
if (require.main === module) {
  checkNewSchemaDeployment()
    .then(({ allTablesExist, allColumnsExist }) => {
      console.log('\n🎯 Deployment check completed.');
      process.exit(allTablesExist && allColumnsExist ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Error running deployment check:', error.message);
      process.exit(1);
    });
}

module.exports = { checkNewSchemaDeployment };
