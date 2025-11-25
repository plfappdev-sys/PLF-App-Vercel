# PLF Database Backup Guide
## Before Data Migration - September 21, 2025

## IMPORTANT: BACKUP BEFORE MIGRATION
**Always create a backup before running data migration scripts.** The migration will modify your database structure and data. A backup ensures you can restore your data if anything goes wrong.

## Backup Methods

### Method 1: Supabase Dashboard Backup (Recommended)
1. Go to your Supabase project: https://zdnyhzasvifrskbostgn.supabase.co
2. Navigate to **Settings > Database**
3. Scroll down to **Backups** section
4. Click **"Create backup"** button
5. Provide a descriptive name: `pre-data-migration-backup-sep-21-2025`
6. Wait for backup to complete (may take several minutes)

### Method 2: SQL Dump via Supabase CLI
```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Create backup SQL dump
supabase db dump --data-only --file backup-pre-migration.sql
```

### Method 3: pg_dump (Advanced)
```bash
# Using pg_dump with connection string
pg_dump "postgresql://postgres:[YOUR-PASSWORD]@db.zdnyhzasvifrskbostgn.supabase.co:5432/postgres" \
  --file=backup-pre-migration.sql \
  --format=plain \
  --verbose
```

## Verification Steps

After creating backup, verify it was successful:

1. **Check backup file size**: Should be > 0 bytes
2. **Verify backup content**: Open the SQL file and check it contains your data
3. **Test restore** (optional): Create a test database and restore the backup to verify it works

## Migration Preparation Checklist

- [ ] Database backup completed and verified
- [ ] SUPABASE_SERVICE_ROLE_KEY environment variable set
- [ ] Test script run successfully: `python test-data-migration.py`
- [ ] Review migration plan in `TryingNewLogicForPLF.txt`
- [ ] Notify team members about scheduled maintenance window

## Running the Migration

Once backup is complete, run the migration:

```bash
# Set environment variable (Windows)
set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Set environment variable (Linux/Mac)
export SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Run the migration
python data-migration-script.py
```

## Post-Migration Verification

After migration completes, verify:

1. **Check contributions table**: Should have historical contributions
2. **Check member_balances table**: Should have initial balances for all members
3. **Check members table**: Should have catch_up_fee and monthly_contribution values
4. **Verify data consistency**: Compare with original transaction data
5. **Test application functionality**: Ensure UI works with new data

## Rollback Procedure

If migration fails or causes issues:

1. **Stop all application traffic**
2. **Restore from backup** using Supabase dashboard or CLI
3. **Verify restore completed successfully**
4. **Investigate and fix migration issues**
5. **Retry migration after fixes**

## Emergency Contacts

- **Database Admin**: [Your Name/Team]
- **Technical Support**: [Contact Information]
- **Backup Location**: [Where backups are stored]

## Migration Timeline

- **Estimated Duration**: 15-30 minutes for 6 members
- **Best Time**: During low-traffic hours
- **Monitoring**: Watch Supabase logs during migration

## Success Criteria

- ✅ All historical contributions migrated correctly
- ✅ Catch-up fees calculated accurately
- ✅ Initial balances populated correctly
- ✅ No data loss or corruption
- ✅ Application functions normally post-migration
