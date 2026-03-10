# DATABASE CLEAN AND REIMPORT PLAN
## Task: Remove all data in the database except superusers, and replace it with updated data from the final Excel document

## Analysis Summary

### 1. Current State Assessment
- **Supabase Project**: zdnyhzasvifrskbostgn.supabase.co (now unpaused)
- **Database Schema**: 
  - Original schema with users, members, transactions, loans, interest_accruals tables
  - New business logic schema with contributions, member_balances, financial_years, system_settings, audit_logs tables
- **Excel Data Source**: "Peoples Liberator Fund Contributions 30 June 2025 26-2-16 FINAL.xlsx"
  - 24 sheets containing financial data from 2018-2019 to 2025-26
  - Member information including names, join dates, balances, contributions, fees, etc.
  - Monthly contribution data with penalties and bank charges

### 2. Task Requirements
1. Remove all data from database tables EXCEPT superusers
2. Import updated data from the final Excel document
3. Maintain referential integrity between tables
4. Preserve authentication and user accounts for superusers
5. Ensure new business logic tables are properly populated

## Detailed Implementation Plan

### PHASE 1: PREPARATION AND BACKUP
**Objective**: Ensure data safety and prepare for cleanup

#### Task 1.1: Create Database Backup
- [ ] Create backup script for all tables
- [ ] Export current data to JSON/CSV files
- [ ] Verify backup integrity

#### Task 1.2: Identify Superusers
- [ ] Query users table to identify superusers (role = 'superuser')
- [ ] Document superuser emails and UIDs
- [ ] Verify superuser authentication accounts exist

#### Task 1.3: Analyze Excel Data Structure
- [x] Complete - Excel has 24 sheets with member financial data
- [ ] Map Excel columns to database schema
- [ ] Identify data transformation requirements

### PHASE 2: DATABASE CLEANUP
**Objective**: Remove all non-superuser data while preserving schema

#### Task 2.1: Disable Foreign Key Constraints
- [ ] Temporarily disable foreign key constraints
- [ ] Document constraint relationships

#### Task 2.2: Delete Data in Correct Order
**Delete Order (to maintain referential integrity):**
1. [ ] audit_logs (no dependencies)
2. [ ] interest_accruals (depends on members)
3. [ ] transactions (depends on members, loans)
4. [ ] loans (depends on members)
5. [ ] contributions (depends on members)
6. [ ] member_balances (depends on members)
7. [ ] members (depends on users)
8. [ ] users (except superusers)
9. [ ] financial_years (keep default data)
10. [ ] system_settings (keep default data)

#### Task 2.3: Preserve Superuser Data
- [ ] Backup superuser records before deletion
- [ ] Restore superuser records after cleanup
- [ ] Verify superuser authentication still works

### PHASE 3: EXCEL DATA EXTRACTION AND TRANSFORMATION
**Objective**: Extract and transform Excel data for database import

#### Task 3.1: Extract Member Information
- [ ] Identify primary member data sheet (likely "Recon" or "2024-2025")
- [ ] Extract member names, join dates, contact information
- [ ] Generate unique member numbers if needed

#### Task 3.2: Extract Financial Data
- [ ] Extract contribution history from monthly sheets
- [ ] Extract balance information
- [ ] Extract fee and penalty data
- [ ] Calculate catch-up fees for members joining after July 2018

#### Task 3.3: Data Transformation
- [ ] Map Excel column names to database column names
- [ ] Convert date formats
- [ ] Handle currency and numeric conversions
- [ ] Generate UUIDs for new records
- [ ] Create user accounts for members

### PHASE 4: DATA IMPORT
**Objective**: Import transformed data into database

#### Task 4.1: Create User Accounts
- [ ] Generate email addresses for members (if not in Excel)
- [ ] Create authentication accounts
- [ ] Set default passwords/reset mechanisms

#### Task 4.2: Import Member Data
- [ ] Insert users records
- [ ] Insert members records with user_id relationships
- [ ] Set member financial information

#### Task 4.3: Import Financial Data
- [ ] Insert contribution records
- [ ] Calculate and insert member balances
- [ ] Create transaction history
- [ ] Set up financial years and system settings

### PHASE 5: VERIFICATION AND TESTING
**Objective**: Ensure data integrity and system functionality

#### Task 5.1: Data Integrity Checks
- [ ] Verify referential integrity
- [ ] Check for orphaned records
- [ ] Validate financial calculations
- [ ] Compare total fund value with Excel

#### Task 5.2: System Testing
- [ ] Test superuser login
- [ ] Test member data access
- [ ] Test financial calculations
- [ ] Test contribution tracking
- [ ] Test reporting functionality

#### Task 5.3: Documentation
- [ ] Document all steps taken
- [ ] Create data migration report
- [ ] Update project documentation

## Technical Implementation Details

### 1. Database Cleanup Script
Will need to:
- Use service role key for administrative operations
- Handle RLS policies (may need to temporarily disable)
- Use transaction blocks for data integrity
- Log all operations for audit trail

### 2. Excel Data Processing
Will need to:
- Use pandas for Excel processing
- Handle multiple sheets and complex data structures
- Transform dates and financial data
- Generate missing data (emails, passwords)

### 3. Data Import Strategy
Will need to:
- Use batch inserts for performance
- Handle UUID generation
- Maintain relationships between tables
- Provide progress reporting

## Risk Mitigation

### 1. Data Loss Prevention
- Comprehensive backup before any operations
- Transaction-based operations with rollback capability
- Step-by-step verification

### 2. System Stability
- Test in staging environment first if available
- Gradual rollout with monitoring
- Rollback plan prepared

### 3. Data Integrity
- Referential integrity checks
- Financial reconciliation
- Audit trail of all changes

## Estimated Timeline
- Phase 1: 1-2 hours
- Phase 2: 1 hour
- Phase 3: 2-3 hours
- Phase 4: 2-3 hours
- Phase 5: 1-2 hours
- **Total**: 7-11 hours

## Success Criteria
1. All non-superuser data removed from database
2. All Excel data successfully imported
3. Superuser accounts remain functional
4. Financial calculations match Excel data
5. System reports show correct fund values
6. All database relationships maintained

## Next Immediate Steps
1. Create and test database backup script
2. Identify superusers in current database
3. Create Excel data extraction prototype