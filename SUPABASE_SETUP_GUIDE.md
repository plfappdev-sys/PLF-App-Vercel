# Supabase Setup Guide for PLF App

## Step 1: Database Schema Setup

### Run the Schema in Supabase SQL Editor
1. Go to your Supabase Dashboard: https://zdnyhzasvifrskbostgn.supabase.co
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the entire contents of `supabase-schema.sql`
5. Click **Run** to execute the SQL

### Verify Schema Creation
After running the schema, verify the tables were created:
1. Go to **Table Editor** in the left sidebar
2. You should see these tables:
   - `users`
   - `members` 
   - `transactions`
   - `loans`
   - `interest_accruals`

## Step 2: Authentication Setup

### Enable Email Authentication
1. Go to **Authentication** > **Providers** in Supabase Dashboard
2. Enable **Email** provider
3. Configure settings as needed:
   - Confirm email: Recommended for production
   - Enable confirm email: Yes
   - Enable secure email change: Yes

### Create Test Users (Optional)
1. Go to **Authentication** > **Users**
2. Click **Invite User** to create test accounts
3. Recommended test users:
   - `superuser@plf.com` (role: superuser)
   - `admin@plf.com` (role: admin) 
   - `testmember@plf.com` (role: member)

## Step 3: Test Database Connection

Run the table test to verify everything is working:
```bash
node test-supabase-tables.cjs
```

Expected output after successful schema creation:
```
✅ Users table accessible
✅ Members table accessible  
✅ Transactions table accessible
✅ Loans table accessible
```

## Step 4: Update Application Code

### Update AuthContext to Use Supabase
The next step is to modify `src/contexts/AuthContext.tsx` to use the Supabase authentication service instead of Firebase.

### Key Changes Needed:
1. Replace Firebase imports with Supabase imports
2. Update authentication methods to use `SupabaseAuthService`
3. Modify auth state listeners for Supabase
4. Update user profile handling

### Test Authentication Flow
After updating the AuthContext, test:
1. Login functionality
2. Signup functionality  
3. Session persistence
4. Logout functionality

## Step 5: Migrate Member Services

### Update MemberService
Modify `src/services/memberService.ts` to use Supabase instead of Firebase:
- Replace Firestore queries with Supabase SQL queries
- Update real-time listeners
- Modify data structures as needed

### Test Member Operations
Verify these functions work:
- Member registration
- Member data retrieval
- Financial transactions
- Loan applications

## Step 6: Environment Configuration

### Environment Variables (Recommended)
Create a `.env` file for sensitive configuration:
```
SUPABASE_URL=https://zdnyhzasvifrskbostgn.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
```

### Update Configuration Files
Modify `supabase.config.ts` to use environment variables:
```typescript
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;
```

## Step 7: Testing

### Comprehensive Testing Checklist
- [ ] Database connection working
- [ ] Authentication working (login/signup)
- [ ] User roles functioning correctly
- [ ] Member data accessible
- [ ] Transactions working
- [ ] Loan applications functional
- [ ] Real-time updates working
- [ ] Error handling proper

### Test on Different Platforms
- [ ] Web browser
- [ ] Android device (Expo Go)
- [ ] iOS device (if applicable)

## Troubleshooting

### Common Issues

1. **Table Not Found Errors**
   - Verify schema was executed correctly
   - Check table names match exactly

2. **Authentication Errors**
   - Verify email provider is enabled
   - Check email confirmation settings

3. **Permission Errors**
   - Review Row Level Security (RLS) policies
   - Check user roles and permissions

4. **Connection Issues**
   - Verify Supabase project URL and API key
   - Check network connectivity

### Debugging Tips

1. Use Supabase Dashboard logs
2. Enable detailed logging in your app
3. Test individual Supabase queries
4. Check browser developer console for errors

## Next Steps After Setup

1. **Data Migration** (if needed)
   - Import existing member data
   - Migrate transaction history

2. **Performance Optimization**
   - Add database indexes
   - Optimize queries
   - Implement caching

3. **Security Hardening**
   - Review RLS policies
   - Implement rate limiting
   - Set up monitoring

4. **Production Deployment**
   - Set up production environment
   - Configure backups
   - Implement monitoring

## Support Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord Community](https://discord.supabase.com)
- [React Native Supabase Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-react-native)

## File Reference

### Created Files:
- `supabase-schema.sql` - Database schema
- `supabase.config.ts` - TypeScript configuration
- `supabase.config.js` - JavaScript configuration
- `src/services/supabaseAuthService.ts` - Authentication service

### Test Files:
- `test-supabase-connection.js` - Connection test
- `test-supabase-simple.cjs` - Simple connection test
- `test-supabase-tables.cjs` - Table access test

## Version History

- **2025-09-16**: Initial Supabase migration setup
- **2025-09-16**: Database schema created
- **2025-09-16**: Authentication service implemented
- **2025-09-16**: Testing utilities created
