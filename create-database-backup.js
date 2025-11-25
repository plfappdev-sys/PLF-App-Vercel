const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase configuration
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Backup directory
const backupDir = path.join(__dirname, 'database-backup');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupPath = path.join(backupDir, `backup-${timestamp}`);

// Ensure backup directory exists
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}
if (!fs.existsSync(backupPath)) {
  fs.mkdirSync(backupPath, { recursive: true });
}

// Tables to backup
const tables = [
  'users',
  'members',
  'transactions',
  'loans',
  'interest_accruals',
  'contributions',
  'member_balances',
  'financial_years',
  'system_settings',
  'audit_logs'
];

async function backupTable(tableName) {
  try {
    console.log(`📊 Backing up table: ${tableName}`);
    
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error(`❌ Error backing up ${tableName}:`, error.message);
      return null;
    }

    if (data && data.length > 0) {
      // Save as JSON
      const jsonFile = path.join(backupPath, `${tableName}.json`);
      fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2));
      
      // Save as SQL insert statements
      const sqlFile = path.join(backupPath, `${tableName}.sql`);
      const sqlStatements = generateSQLInsertStatements(tableName, data);
      fs.writeFileSync(sqlFile, sqlStatements);
      
      console.log(`✅ ${tableName}: ${data.length} records backed up`);
      return data.length;
    } else {
      console.log(`ℹ️  ${tableName}: No data to backup`);
      return 0;
    }
  } catch (error) {
    console.error(`❌ Error backing up ${tableName}:`, error.message);
    return null;
  }
}

function generateSQLInsertStatements(tableName, data) {
  if (!data || data.length === 0) return '-- No data to insert\n';

  const columns = Object.keys(data[0]);
  const sqlStatements = [];

  // Generate INSERT statements
  data.forEach(row => {
    const values = columns.map(col => {
      const value = row[col];
      if (value === null) return 'NULL';
      if (typeof value === 'string') return `'${value.replace(/'/g, "''")}'`;
      if (typeof value === 'boolean') return value ? 'TRUE' : 'FALSE';
      if (value instanceof Date) return `'${value.toISOString()}'`;
      return value;
    });

    const insertStatement = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${values.join(', ')});`;
    sqlStatements.push(insertStatement);
  });

  return sqlStatements.join('\n');
}

async function createBackupSummary() {
  const summary = {
    timestamp: new Date().toISOString(),
    supabaseUrl: supabaseUrl,
    tables: {}
  };

  let totalRecords = 0;
  let successfulTables = 0;

  for (const table of tables) {
    const recordCount = await backupTable(table);
    if (recordCount !== null) {
      summary.tables[table] = {
        recordCount: recordCount,
        status: 'success'
      };
      totalRecords += recordCount;
      successfulTables++;
    } else {
      summary.tables[table] = {
        recordCount: 0,
        status: 'failed'
      };
    }
  }

  summary.totalRecords = totalRecords;
  summary.successfulTables = successfulTables;
  summary.totalTables = tables.length;

  // Save summary
  const summaryFile = path.join(backupPath, 'backup-summary.json');
  fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2));

  // Create README file
  const readmeContent = `# Database Backup

## Backup Information
- **Date**: ${new Date().toISOString()}
- **Supabase Project**: ${supabaseUrl}
- **Total Tables**: ${tables.length}
- **Successful Tables**: ${successfulTables}
- **Total Records**: ${totalRecords}

## Files Included
- \`.json\` files: Raw data in JSON format
- \`.sql\` files: SQL INSERT statements for data restoration
- \`backup-summary.json\`: Summary of backup operation

## Tables Backed Up
${tables.map(table => `- ${table}: ${summary.tables[table].recordCount} records (${summary.tables[table].status})`).join('\n')}

## Restoration Instructions
1. Use the SQL files to restore data to a new database
2. Run the INSERT statements in the order they appear
3. Verify data integrity after restoration

## Notes
- This backup was created using the Supabase JavaScript client
- Timestamp format: YYYY-MM-DDTHH-MM-SS-SSSZ
- Backup location: ${backupPath}
`;
  
  const readmeFile = path.join(backupPath, 'README.md');
  fs.writeFileSync(readmeFile, readmeContent);

  return summary;
}

async function main() {
  console.log('🚀 Starting database backup...');
  console.log(`📁 Backup location: ${backupPath}`);
  console.log(`📋 Tables to backup: ${tables.join(', ')}`);
  console.log('---');

  const summary = await createBackupSummary();

  console.log('---');
  console.log('📊 BACKUP SUMMARY:');
  console.log(`✅ Successful tables: ${summary.successfulTables}/${summary.totalTables}`);
  console.log(`📝 Total records: ${summary.totalRecords}`);
  console.log(`📁 Backup saved to: ${backupPath}`);
  console.log('🎉 Database backup completed!');

  // List backup files
  const files = fs.readdirSync(backupPath);
  console.log('\n📄 Backup files created:');
  files.forEach(file => {
    const filePath = path.join(backupPath, file);
    const stats = fs.statSync(filePath);
    console.log(`   - ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
  });
}

// Run backup
main().catch(error => {
  console.error('❌ Backup failed:', error);
  process.exit(1);
});
