# New Calculation Methodology Deployment Guide

## Overview
This guide outlines the steps to deploy the new calculation methodology to both Supabase (database) and Vercel (frontend).

## Files Created
1. `database-migration-new-calculation.sql` - SQL migration script
2. `run-database-migration.js` - Migration runner script
3. `deploy-to-vercel.sh` - Vercel deployment script
4. `verify-deployment.js` - Verification script
5. `deploy-new-calculation-methodology.js` - This deployment script

## Prerequisites
- Node.js installed
- Vercel CLI installed (`npm i -g vercel`)
- Supabase project configured
- .env file with Supabase credentials

## Deployment Steps

### Step 1: Database Migration (Supabase)
1. **Manual Method (Recommended)**:
   - Go to Supabase dashboard: https://app.supabase.com
   - Select your project
   - Go to SQL Editor
   - Copy and paste the contents of `database-migration-new-calculation.sql`
   - Run the SQL script

2. **CLI Method**:
   - Install Supabase CLI: `npm i -g supabase`
   - Run: `supabase db push --db-url="your-database-url"`

### Step 2: Vercel Deployment
1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**:
   ```bash
   # Make the script executable
   chmod +x deploy-to-vercel.sh
   
   # Run the deployment script
   ./deploy-to-vercel.sh
   ```

   Or manually:
   ```bash
   vercel --prod
   ```

### Step 3: Verification
1. **Run verification script**:
   ```bash
   node verify-deployment.js
   ```

2. **Test with real data**:
   - Log into the application
   - Check member calculations
   - Verify penalty rate is 5.5%
   - Test Christopher Naude (M006) example

## What the Migration Does

### Database Changes
1. **Updates penalty interest rate** from 7% to 5.5%
2. **Adds new columns to members table**:
   - `expected_contribution_total`
   - `months_at_200_rate`
   - `months_at_250_rate`
   - `estimated_12_months_contribution`
   - `total_12_months_contribution`
   - `total_outstanding`
   - `penalty_for_year`
   - `penalties_capped`
   - `calculation_methodology_version`

3. **Updates system configuration** with new rates and dates

### Application Changes
1. **Updated `ContributionService.ts`** - Uses 5.5% penalty rate
2. **Created `NewCalculationService.ts`** - Comprehensive new methodology
3. **Updated `InterestConstants.ts`** - New penalty rate constant

## Testing
After deployment, test the following:

1. **Expected contributions**: R200 × 72 months + R250 × 19 months
2. **Monthly penalty**: (balance + current month) × 5.5%
3. **Penalty capping**: Should be capped from 2018 to November 2024
4. **Christopher Naude example**: Should match documented values

## Rollback Plan
If issues occur, you can rollback:

1. **Database rollback**:
   ```sql
   -- Revert penalty rate
   UPDATE system_settings SET value = '7' WHERE key = 'penalty_interest_rate';
   
   -- Remove new columns (if needed)
   ALTER TABLE members DROP COLUMN IF EXISTS expected_contribution_total;
   -- ... repeat for other new columns
   ```

2. **Application rollback**:
   - Revert to previous version in Vercel
   - Or update `ContributionService.ts` back to 7%

## Support
If you encounter issues:
1. Check the audit logs in Supabase
2. Verify .env configuration
3. Test calculations manually
4. Contact development team

## Last Updated
2026-02-12T12:53:01.197Z
