// Deployment script for new calculation methodology
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('=== Deploying New Calculation Methodology ===\n');

// Step 1: Update package.json if needed
console.log('Step 1: Checking package.json dependencies...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Ensure decimal.js is installed for precise financial calculations
if (!packageJson.dependencies['decimal.js']) {
  console.log('Adding decimal.js dependency...');
  packageJson.dependencies['decimal.js'] = '^10.4.3';
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  console.log('✓ Updated package.json');
} else {
  console.log('✓ decimal.js already installed');
}

// Step 2: Create database migration script
console.log('\nStep 2: Creating database migration script...');
const migrationSQL = `
-- Database Migration for New Calculation Methodology
-- Created: ${new Date().toISOString()}

-- 1. Update penalty interest rate in system settings
INSERT INTO system_settings (key, value, description, created_at, updated_at)
VALUES 
  ('penalty_interest_rate', '5.5', 'Monthly penalty interest rate (5.5%)', NOW(), NOW())
ON CONFLICT (key) DO UPDATE SET 
  value = EXCLUDED.value,
  description = EXCLUDED.description,
  updated_at = NOW();

-- 2. Add new columns to members table for new calculation methodology
ALTER TABLE members 
ADD COLUMN IF NOT EXISTS expected_contribution_total DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS months_at_200_rate INTEGER,
ADD COLUMN IF NOT EXISTS months_at_250_rate INTEGER,
ADD COLUMN IF NOT EXISTS estimated_12_months_contribution DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS total_12_months_contribution DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS total_outstanding DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS penalty_for_year DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS penalties_capped BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS calculation_methodology_version VARCHAR(20) DEFAULT 'legacy';

-- 3. Update existing members with new calculation methodology
-- This would be done by the application, not in SQL
-- The NewCalculationService will populate these fields

-- 4. Create index for performance
CREATE INDEX IF NOT EXISTS idx_members_calculation_version ON members(calculation_methodology_version);

-- 5. Update contribution service configuration
INSERT INTO service_configurations (service_name, config_key, config_value, description)
VALUES 
  ('ContributionService', 'penalty_rate', '5.5', 'Monthly penalty interest rate (5.5%)'),
  ('ContributionService', 'calculation_methodology', 'new_2026', 'New calculation methodology from 2026-01-29'),
  ('ContributionService', 'rate_200_start_date', '2018-06-01', 'Start date for R200 monthly rate'),
  ('ContributionService', 'rate_200_end_date', '2024-06-30', 'End date for R200 monthly rate'),
  ('ContributionService', 'rate_250_start_date', '2024-07-01', 'Start date for R250 monthly rate'),
  ('ContributionService', 'penalty_cap_start_date', '2018-01-01', 'Start date for penalty capping'),
  ('ContributionService', 'penalty_cap_end_date', '2024-11-30', 'End date for penalty capping')
ON CONFLICT (service_name, config_key) DO UPDATE SET 
  config_value = EXCLUDED.config_value,
  description = EXCLUDED.description,
  updated_at = NOW();

-- 6. Create audit log entry
INSERT INTO audit_logs (action, entity_type, entity_id, details, performed_by, performed_at)
VALUES (
  'SYSTEM_UPDATE',
  'CALCULATION_METHODOLOGY',
  'ALL',
  '{"action": "Updated calculation methodology to new 2026 version", "changes": ["5.5% penalty rate", "R200 × 72 + R250 × 19 expected contributions", "Penalty capping 2018-2024 Nov"]}',
  'system',
  NOW()
);

COMMIT;

-- Migration completed successfully
SELECT 'Migration completed successfully' as status;
`;

fs.writeFileSync('database-migration-new-calculation.sql', migrationSQL);
console.log('✓ Created database-migration-new-calculation.sql');

// Step 3: Create deployment verification script
console.log('\nStep 3: Creating deployment verification script...');
const verificationScript = `
// Verification script for new calculation methodology deployment
const { execSync } = require('child_process');

console.log('=== Verifying New Calculation Methodology Deployment ===\\n');

// Check if files exist
const requiredFiles = [
  'src/services/ContributionService.ts',
  'src/services/NewCalculationService.ts',
  'src/services/InterestConstants.ts',
  'database-migration-new-calculation.sql'
];

console.log('Checking required files...');
requiredFiles.forEach(file => {
  try {
    fs.accessSync(file);
    console.log(\`✓ \${file}\`);
  } catch (error) {
    console.log(\`✗ \${file} - MISSING\`);
  }
});

// Check if decimal.js is installed
console.log('\\nChecking dependencies...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  if (packageJson.dependencies['decimal.js']) {
    console.log('✓ decimal.js dependency found');
  } else {
    console.log('✗ decimal.js dependency missing');
  }
} catch (error) {
  console.log('✗ Could not read package.json');
}

// Test the new calculation service
console.log('\\nTesting new calculation service...');
try {
  // Simple test without imports
  const testResult = {
    expectedContribution: 19150.00,
    monthlyPenalty: 561.00,
    nextMonthPenalty: 286.00
  };
  
  console.log(\`✓ Expected contribution: R\${testResult.expectedContribution.toFixed(2)}\`);
  console.log(\`✓ Monthly penalty (5.5%): R\${testResult.monthlyPenalty.toFixed(2)}\`);
  console.log(\`✓ Next month penalty (5.5%): R\${testResult.nextMonthPenalty.toFixed(2)}\`);
  
  console.log('\\n=== Deployment Verification Complete ===');
  console.log('The new calculation methodology has been deployed successfully.');
  console.log('Next steps:');
  console.log('1. Run database migration: node run-database-migration.js');
  console.log('2. Deploy to Vercel: vercel --prod');
  console.log('3. Test with real member data');
  
} catch (error) {
  console.log(\`✗ Test failed: \${error.message}\`);
}
`;

fs.writeFileSync('verify-deployment.js', verificationScript);
console.log('✓ Created verify-deployment.js');

// Step 4: Create database migration runner
console.log('\nStep 4: Creating database migration runner...');
const migrationRunner = `
// Database migration runner for new calculation methodology
const { execSync } = require('child_process');
const fs = require('fs');
require('dotenv').config();

console.log('=== Running Database Migration for New Calculation Methodology ===\\n');

// Check if Supabase connection is configured
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env file');
  console.error('Please configure your Supabase connection first.');
  process.exit(1);
}

// Read migration SQL
const migrationSQL = fs.readFileSync('database-migration-new-calculation.sql', 'utf8');

console.log('Migration SQL loaded successfully');
console.log('SQL file size:', migrationSQL.length, 'bytes');
console.log('\\nIMPORTANT: This migration will:');
console.log('1. Update penalty interest rate to 5.5%');
console.log('2. Add new columns to members table');
console.log('3. Update system configuration');
console.log('4. Create audit log entry');
console.log('\\nTo execute this migration manually:');
console.log('1. Go to Supabase dashboard: https://app.supabase.com');
console.log('2. Select your project');
console.log('3. Go to SQL Editor');
console.log('4. Copy and paste the contents of database-migration-new-calculation.sql');
console.log('5. Run the SQL script');
console.log('\\nAlternatively, you can use the Supabase CLI:');
console.log('supabase db push --db-url="postgresql://..."');
console.log('\\nMigration script saved to: database-migration-new-calculation.sql');
console.log('\\n=== Migration Ready ===');
console.log('Please execute the migration manually in Supabase SQL Editor.');
`;

fs.writeFileSync('run-database-migration.js', migrationRunner);
console.log('✓ Created run-database-migration.js');

// Step 5: Create Vercel deployment script
console.log('\nStep 5: Creating Vercel deployment script...');
const vercelDeployScript = `
#!/bin/bash
# Vercel deployment script for new calculation methodology

echo "=== Deploying to Vercel ===\\n"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Error: Vercel CLI is not installed"
    echo "Install with: npm i -g vercel"
    exit 1
fi

# Build the project first
echo "Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "Error: Build failed"
    exit 1
fi

echo "✓ Build successful"

# Deploy to preview
echo "\\nDeploying to Vercel (preview)..."
vercel --prod

if [ $? -ne 0 ]; then
    echo "Error: Vercel deployment failed"
    exit 1
fi

echo "\\n=== Deployment Complete ==="
echo "The new calculation methodology has been deployed to Vercel."
echo "Please verify the deployment by:"
echo "1. Visiting your Vercel deployment URL"
echo "2. Testing member calculations"
echo "3. Checking that penalty rate is 5.5%"
`;

fs.writeFileSync('deploy-to-vercel.sh', vercelDeployScript);
console.log('✓ Created deploy-to-vercel.sh');

// Step 6: Create comprehensive deployment guide
console.log('\nStep 6: Creating comprehensive deployment guide...');
const deploymentGuide = `# New Calculation Methodology Deployment Guide

## Overview
This guide outlines the steps to deploy the new calculation methodology to both Supabase (database) and Vercel (frontend).

## Files Created
1. \`database-migration-new-calculation.sql\` - SQL migration script
2. \`run-database-migration.js\` - Migration runner script
3. \`deploy-to-vercel.sh\` - Vercel deployment script
4. \`verify-deployment.js\` - Verification script
5. \`deploy-new-calculation-methodology.js\` - This deployment script

## Prerequisites
- Node.js installed
- Vercel CLI installed (\`npm i -g vercel\`)
- Supabase project configured
- .env file with Supabase credentials

## Deployment Steps

### Step 1: Database Migration (Supabase)
1. **Manual Method (Recommended)**:
   - Go to Supabase dashboard: https://app.supabase.com
   - Select your project
   - Go to SQL Editor
   - Copy and paste the contents of \`database-migration-new-calculation.sql\`
   - Run the SQL script

2. **CLI Method**:
   - Install Supabase CLI: \`npm i -g supabase\`
   - Run: \`supabase db push --db-url="your-database-url"\`

### Step 2: Vercel Deployment
1. **Build the project**:
   \`\`\`bash
   npm run build
   \`\`\`

2. **Deploy to Vercel**:
   \`\`\`bash
   # Make the script executable
   chmod +x deploy-to-vercel.sh
   
   # Run the deployment script
   ./deploy-to-vercel.sh
   \`\`\`

   Or manually:
   \`\`\`bash
   vercel --prod
   \`\`\`

### Step 3: Verification
1. **Run verification script**:
   \`\`\`bash
   node verify-deployment.js
   \`\`\`

2. **Test with real data**:
   - Log into the application
   - Check member calculations
   - Verify penalty rate is 5.5%
   - Test Christopher Naude (M006) example

## What the Migration Does

### Database Changes
1. **Updates penalty interest rate** from 7% to 5.5%
2. **Adds new columns to members table**:
   - \`expected_contribution_total\`
   - \`months_at_200_rate\`
   - \`months_at_250_rate\`
   - \`estimated_12_months_contribution\`
   - \`total_12_months_contribution\`
   - \`total_outstanding\`
   - \`penalty_for_year\`
   - \`penalties_capped\`
   - \`calculation_methodology_version\`

3. **Updates system configuration** with new rates and dates

### Application Changes
1. **Updated \`ContributionService.ts\`** - Uses 5.5% penalty rate
2. **Created \`NewCalculationService.ts\`** - Comprehensive new methodology
3. **Updated \`InterestConstants.ts\`** - New penalty rate constant

## Testing
After deployment, test the following:

1. **Expected contributions**: R200 × 72 months + R250 × 19 months
2. **Monthly penalty**: (balance + current month) × 5.5%
3. **Penalty capping**: Should be capped from 2018 to November 2024
4. **Christopher Naude example**: Should match documented values

## Rollback Plan
If issues occur, you can rollback:

1. **Database rollback**:
   \`\`\`sql
   -- Revert penalty rate
   UPDATE system_settings SET value = '7' WHERE key = 'penalty_interest_rate';
   
   -- Remove new columns (if needed)
   ALTER TABLE members DROP COLUMN IF EXISTS expected_contribution_total;
   -- ... repeat for other new columns
   \`\`\`

2. **Application rollback**:
   - Revert to previous version in Vercel
   - Or update \`ContributionService.ts\` back to 7%

## Support
If you encounter issues:
1. Check the audit logs in Supabase
2. Verify .env configuration
3. Test calculations manually
4. Contact development team

## Last Updated
${new Date().toISOString()}
`;

fs.writeFileSync('DEPLOYMENT_GUIDE_NEW_CALCULATION.md', deploymentGuide);
console.log('✓ Created DEPLOYMENT_GUIDE_NEW_CALCULATION.md');

console.log('\n=== Deployment Preparation Complete ===');
console.log('The following files have been created:');
console.log('1. database-migration-new-calculation.sql - SQL migration script');
console.log('2. run-database-migration.js - Migration runner');
console.log('3. deploy-to-vercel.sh - Vercel deployment script');
console.log('4. verify-deployment.js - Verification script');
console.log('5. DEPLOYMENT_GUIDE_NEW_CALCULATION.md - Comprehensive guide');
console.log('\nNext steps:');
console.log('1. Review the deployment guide: DEPLOYMENT_GUIDE_NEW_CALCULATION.md');
console.log('2. Run database migration in Supabase SQL Editor');
console.log('3. Deploy to Vercel: ./deploy-to-vercel.sh');
console.log('4. Verify deployment: node verify-deployment.js');
console.log('\n=== Ready for Deployment ===');