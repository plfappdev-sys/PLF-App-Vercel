# Supabase Edge Functions Deployment Guide

## Overview
This guide covers the deployment of scheduled Edge Functions for the PLF application's automated business logic processing.

## Functions Created

### 1. Daily Interest Calculation (`daily-interest-calculation`)
- **Purpose**: Calculates daily interest for savings and loans, applies penalty interest for overdue loans
- **Schedule**: Runs daily at 2:00 AM UTC (4:00 AM SAST)
- **Features**:
  - Daily compounding interest calculation
  - 90-day overdue loan detection with 40% penalty interest
  - Real-time balance updates
  - Comprehensive audit logging
  - Idempotent design (safe to rerun)

### 2. Monthly Contribution Processing (`monthly-contribution-processing`)
- **Purpose**: Creates new monthly contributions and marks previous month contributions as overdue
- **Schedule**: Runs on the 1st of each month at 3:00 AM UTC (5:00 AM SAST)
- **Features**:
  - Creates R200 contributions for all active members
  - Sets due dates to 1st of current month
  - Marks previous month unpaid contributions as overdue
  - Prevents duplicate creation

### 3. Monthly Late Fee Processing (`monthly-late-fee-processing`)
- **Purpose**: Applies 7% late fees to overdue contributions
- **Schedule**: Runs on the 8th of each month at 3:00 AM UTC (5:00 AM SAST)
- **Features**:
  - 7% late fee calculation on outstanding amounts
  - Automatic deduction from member balances
  - Comprehensive audit logging
  - Grace period respect (1st-7th no fees)

## Prerequisites

1. **Supabase Project**: Ensure your Supabase project is accessible
2. **Service Role Key**: Obtain the service role key from Supabase dashboard
3. **Database Schema**: Ensure the new business logic schema has been deployed
4. **Environment Variables**: Set up required environment variables

## Deployment Steps

### Step 1: Install Supabase CLI
```bash
npm install -g supabase
```

### Step 2: Login to Supabase
```bash
supabase login
```

### Step 3: Link Your Project
```bash
supabase link --project-ref your-project-ref
```

### Step 4: Deploy Functions
```bash
# Deploy all functions
supabase functions deploy daily-interest-calculation
supabase functions deploy monthly-contribution-processing  
supabase functions deploy monthly-late-fee-processing

# Or deploy all at once
supabase functions deploy
```

### Step 5: Set Environment Variables
```bash
# Set required environment variables
supabase secrets set SUPABASE_URL=your-project-url
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Step 6: Schedule the Functions

#### Daily Interest Calculation (runs daily at 2:00 AM UTC)
```bash
supabase functions cron create "0 2 * * *" daily-interest-calculation
```

#### Monthly Contribution Processing (runs 1st of month at 3:00 AM UTC)
```bash
supabase functions cron create "0 3 1 * *" monthly-contribution-processing
```

#### Monthly Late Fee Processing (runs 8th of month at 3:00 AM UTC)
```bash
supabase functions cron create "0 3 8 * *" monthly-late-fee-processing
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_URL` | Your Supabase project URL | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key for admin access | Yes |

## Testing the Functions

### Local Testing
```bash
# Test locally with mock data
supabase functions serve daily-interest-calculation

# Test with specific payload
curl -X POST http://localhost:54321/functions/v1/daily-interest-calculation \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Production Testing
```bash
# Invoke function directly
curl -X POST https://your-project-ref.supabase.co/functions/v1/daily-interest-calculation \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```

## Monitoring and Logs

### View Function Logs
```bash
supabase functions logs daily-interest-calculation
```

### Monitor Execution
- Check Supabase Dashboard → Edge Functions
- View audit logs in `audit_logs` table
- Monitor `interest_accruals` table for daily calculations

## Error Handling

All functions include comprehensive error handling:
- Automatic retry for transient errors
- Detailed logging for debugging
- Audit trail for all operations
- Graceful degradation for individual member failures

## Security Considerations

1. **Service Role Key**: Functions use service role key for necessary admin operations
2. **RLS Compatibility**: All operations respect RLS policies where appropriate
3. **Input Validation**: All inputs are validated and sanitized
4. **Rate Limiting**: Built-in protection against excessive executions

## Rollback Procedure

If issues arise:
1. Disable cron jobs in Supabase dashboard
2. Redeploy previous version if needed
3. Check audit logs for error details
4. Manually verify data consistency

## Performance Considerations

- Functions are optimized for batch processing
- Database operations use efficient queries
- Memory usage is monitored and optimized
- Processing time scales linearly with member count

## Support

For issues with Edge Functions:
1. Check function logs first
2. Verify environment variables
3. Confirm database schema compatibility
4. Test with small data subsets

## Version History

- **v1.0.0** (2025-09-19): Initial release with all three scheduled functions
