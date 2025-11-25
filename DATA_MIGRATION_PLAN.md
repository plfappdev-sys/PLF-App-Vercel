# Data Migration Plan for New Business Logic Activation
## Created: November 19, 2025
## Objective: Migrate historical member data to activate new business logic

## OVERVIEW
This plan outlines the data migration process to populate the new database tables with historical member data, enabling the full functionality of the new business logic.

## CURRENT STATE
✅ New database schema deployed (contributions, member_balances, financial_years, system_settings, audit_logs)
✅ Business logic services implemented and tested
✅ Edge Functions deployed and active
✅ UI integration completed
✅ Member names display issue resolved

## MIGRATION OBJECTIVES
1. Import historical contributions from Excel data
2. Calculate and apply catch-up fees for existing members
3. Populate member_balances table with initial balances
4. Validate data consistency and accuracy
5. Activate new business logic with migrated data

## MIGRATION PHASES

### PHASE 1: PREPARATION & BACKUP
**Duration**: 1-2 hours

#### Tasks:
- [ ] Create database backup before migration
- [ ] Verify Excel data structure and availability
- [ ] Set up migration environment and scripts
- [ ] Create rollback procedures

#### Files Needed:
- Historical Excel files with member contributions
- Member data export from current system
- Transaction history records

### PHASE 2: HISTORICAL CONTRIBUTION IMPORT
**Duration**: 4-6 hours

#### Tasks:
- [ ] Analyze Excel data structure for contributions
- [ ] Create mapping between Excel columns and database schema
- [ ] Import historical contributions to `contributions` table
- [ ] Validate imported data against source
- [ ] Handle data inconsistencies and edge cases

#### Key Data Points:
- Member number
- Contribution amount (R200 standard)
- Contribution date
- Payment status (paid, pending, overdue)
- Late fees applied (if any)

### PHASE 3: CATCH-UP FEE CALCULATION
**Duration**: 2-3 hours

#### Tasks:
- [ ] Identify members who joined after July 2018
- [ ] Calculate catch-up fees based on membership start date
- [ ] Apply catch-up fees to member records
- [ ] Update `members.catch_up_fee` column
- [ ] Create audit trail for fee calculations

#### Calculation Logic:
- Members joining after July 2018 owe catch-up fees
- Fee amount based on months missed before joining
- Standard R200 monthly contribution rate

### PHASE 4: INITIAL BALANCE POPULATION
**Duration**: 3-4 hours

#### Tasks:
- [ ] Calculate initial savings balances for all members
- [ ] Calculate outstanding loan amounts
- [ ] Populate `member_balances` table with net balances
- [ ] Verify balance accuracy against transaction history
- [ ] Create balance reconciliation report

#### Balance Components:
- Savings balance (total contributions + interest earned)
- Loan balance (outstanding principal + interest)
- Net balance (savings - loans)
- Total contributions to date

### PHASE 5: VALIDATION & ACTIVATION
**Duration**: 2-3 hours

#### Tasks:
- [ ] Run data consistency checks
- [ ] Verify member balances match transaction history
- [ ] Test new business logic with migrated data
- [ ] Activate new contribution tracking system
- [ ] Monitor Edge Functions with real data

## MIGRATION SCRIPTS AVAILABLE

### Existing Scripts:
1. **`data-migration-script.py`** - Main Python migration script
2. **`excel-data-extractor.py`** - Excel data extraction
3. **`import_members_to_supabase.py`** - Member import template
4. **`test-data-migration.py`** - Migration testing
5. **`data-migration.js`** - JavaScript migration alternative

### Scripts to Create/Enhance:
1. **`historical-contributions-import.py`** - Dedicated contribution import
2. **`catch-up-fee-calculator.py`** - Automated fee calculation
3. **`balance-initializer.py`** - Initial balance population
4. **`migration-validator.py`** - Data validation and verification

## RISK MITIGATION

### Data Safety:
- ✅ Comprehensive database backup before migration
- ✅ Transaction-based migration (rollback capability)
- ✅ Validation at each migration step
- ✅ Test migration on subset of data first

### Business Continuity:
- ✅ Existing functionality remains operational
- ✅ Gradual rollout with feature flags
- ✅ Real-time monitoring during migration
- ✅ Quick rollback procedures

## SUCCESS CRITERIA

### Technical:
- [ ] All historical contributions imported successfully
- [ ] Catch-up fees calculated and applied correctly
- [ ] Member balances populated accurately
- [ ] Data consistency validation passes
- [ ] New business logic functions with migrated data

### Business:
- [ ] Members can view their complete contribution history
- [ ] Catch-up fees properly reflected in member accounts
- [ ] Real-time balance calculations work correctly
- [ ] Automated contribution tracking functions as expected
- [ ] Late fee processing operates on schedule

## TIMELINE ESTIMATE
**Total Duration**: 1-2 days
- Preparation: 1-2 hours
- Contribution Import: 4-6 hours
- Catch-up Fees: 2-3 hours
- Balance Population: 3-4 hours
- Validation: 2-3 hours

## NEXT STEPS

### Immediate Actions:
1. **Verify Excel Data Availability** - Confirm access to historical contribution data
2. **Create Database Backup** - Ensure data safety before migration
3. **Test Migration Scripts** - Run on small data subset first
4. **Schedule Migration Window** - Plan for minimal business impact

### Post-Migration:
1. **Monitor System Performance** - Watch for any issues
2. **Validate Member Data** - Confirm accuracy with sample members
3. **Update Documentation** - Document migration process and outcomes
4. **Train Users** - Educate on new features and data views

## CONTINGENCY PLANS

### Rollback Procedure:
1. Restore database from pre-migration backup
2. Disable new business logic features
3. Revert to previous data structures
4. Communicate status to stakeholders

### Partial Migration:
1. Migrate subset of members first
2. Validate results before full migration
3. Address issues incrementally
4. Scale up migration as confidence increases

## SUPPORT & RESOURCES

### Required Resources:
- Access to historical Excel files
- Database backup capabilities
- Development environment for script testing
- Communication channels for status updates

### Key Contacts:
- Database Administrator (backup/restore)
- Business Analyst (data validation)
- Development Team (script execution)
- Stakeholders (status communication)

## CONCLUSION
This data migration will activate the full functionality of the new business logic, enabling automated contribution tracking, fee calculations, and real-time balance updates. The phased approach ensures data safety and business continuity throughout the process.

**Ready to proceed with Phase 1: Preparation & Backup**
