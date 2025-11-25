const fs = require('fs');
const path = require('path');

// Find the latest backup directory
const backupDir = path.join(__dirname, 'database-backup');
const backupFolders = fs.readdirSync(backupDir)
  .filter(folder => folder.startsWith('backup-'))
  .sort()
  .reverse();

if (backupFolders.length === 0) {
  console.log('❌ No backup folders found');
  process.exit(1);
}

const latestBackup = path.join(backupDir, backupFolders[0]);
console.log(`🔍 Verifying latest backup: ${latestBackup}`);

// Read backup summary
const summaryFile = path.join(latestBackup, 'backup-summary.json');
if (!fs.existsSync(summaryFile)) {
  console.log('❌ Backup summary file not found');
  process.exit(1);
}

const summary = JSON.parse(fs.readFileSync(summaryFile, 'utf8'));

console.log('\n📊 BACKUP VERIFICATION REPORT');
console.log('============================');
console.log(`📅 Backup Date: ${new Date(summary.timestamp).toLocaleString()}`);
console.log(`🌐 Supabase Project: ${summary.supabaseUrl}`);
console.log(`📋 Total Tables: ${summary.totalTables}`);
console.log(`✅ Successful Tables: ${summary.successfulTables}`);
console.log(`📝 Total Records: ${summary.totalRecords}`);

console.log('\n📋 TABLE DETAILS:');
console.log('================');
Object.entries(summary.tables).forEach(([table, info]) => {
  const statusIcon = info.status === 'success' ? '✅' : '❌';
  console.log(`${statusIcon} ${table}: ${info.recordCount} records (${info.status})`);
});

// Verify file existence
console.log('\n📄 FILE VERIFICATION:');
console.log('===================');
const expectedFiles = [
  'backup-summary.json',
  'README.md'
];

// Add expected table files - only for tables with data
Object.keys(summary.tables).forEach(table => {
  if (summary.tables[table].recordCount > 0) {
    expectedFiles.push(`${table}.json`);
    expectedFiles.push(`${table}.sql`);
  }
});

let allFilesExist = true;
expectedFiles.forEach(file => {
  const filePath = path.join(latestBackup, file);
  const exists = fs.existsSync(filePath);
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${file}`);
  if (!exists) allFilesExist = false;
});

// Show empty tables
console.log('\n📭 EMPTY TABLES (No backup files created):');
console.log('========================================');
Object.keys(summary.tables).forEach(table => {
  if (summary.tables[table].recordCount === 0) {
    console.log(`ℹ️  ${table}: 0 records (no backup files created)`);
  }
});

console.log('\n📈 VERIFICATION SUMMARY:');
console.log('======================');
if (allFilesExist && summary.successfulTables === summary.totalTables) {
  console.log('🎉 BACKUP VERIFICATION: SUCCESS');
  console.log('✅ All files are present and accounted for');
  console.log('✅ All tables were successfully backed up');
  console.log('✅ Backup is ready for restoration if needed');
} else {
  console.log('⚠️  BACKUP VERIFICATION: WARNING');
  if (!allFilesExist) {
    console.log('❌ Some backup files are missing');
  }
  if (summary.successfulTables < summary.totalTables) {
    console.log('❌ Some tables failed to backup');
  }
}

console.log(`\n📁 Backup location: ${latestBackup}`);
console.log('🔒 Backup verification completed');
