# Quick Guide: Add Missing Name Column
## Created: October 22, 2025

## Problem
The data replacement script is failing because the `name` column is missing from the members table.

## Solution
Execute this single SQL command in the Supabase SQL Editor:

```sql
ALTER TABLE members ADD COLUMN IF NOT EXISTS name VARCHAR(255);
```

## Steps
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project: `zdnyhzasvifrskbostgn`
3. Navigate to **SQL Editor** in the left sidebar
4. Copy and paste the SQL command above
5. Execute the command
6. Verify it worked by running the data replacement script again

## Verification
After executing the command, you can verify the column was added by running this query:
```sql
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'members' AND column_name = 'name';
```

## Expected Result
You should see the `name` column listed in the members table structure.

## Next Step
After adding the column, run the data replacement script:
```bash
python complete-data-replacement.py
```

## Estimated Time
- **SQL Execution**: 1 minute
- **Verification**: 30 seconds
- **Total**: 2 minutes
