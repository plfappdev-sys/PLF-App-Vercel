# Vercel Deployment Instructions - Step by Step

## 🚀 Quick Start for PLF App Deployment

### Step 1: Create Required Configuration Files

**1. Create `vercel.json` in project root:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "web-build"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/web-build/$1"
    }
  ],
  "env": {
    "EXPO_PUBLIC_SUPABASE_URL": "@expo_public_supabase_url",
    "EXPO_PUBLIC_SUPABASE_ANON_KEY": "@expo_public_supabase_anon_key"
  }
}
```

**2. Update `package.json` scripts section:**
```json
{
  "scripts": {
    "vercel-build": "expo build:web",
    "build": "expo build:web",
    "dev": "expo start --web",
    "start": "expo start --web"
  }
}
```

**3. Create `webpack.config.js` for web compatibility:**
```javascript
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Customize the config before returning it.
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    vm: require.resolve('vm-browserify')
  };
  
  return config;
};
```

### Step 2: Environment Variables You Need to Configure

**Required Environment Variables for Vercel:**

1. **EXPO_PUBLIC_SUPABASE_URL**
   - Value: `https://zdnyhzasvifrskbostgn.supabase.co`
   - This is your Supabase project URL

2. **EXPO_PUBLIC_SUPABASE_ANON_KEY**
   - Value: Get this from your Supabase dashboard
   - Go to: Supabase Dashboard → Settings → API → Project API keys → `anon` public key

**How to get your Supabase credentials:**

1. Go to https://zdnyhzasvifrskbostgn.supabase.co
2. Login to your Supabase account
3. Navigate to Settings → API
4. Copy:
   - **Project URL**: Already provided above
   - **anon public**: Your public API key

### Step 3: Deploy to Vercel

**Option A: Using Vercel CLI (Recommended)**
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel --prod
```

**Option B: Using GitHub Integration (Easier)**
1. Push your code to GitHub
2. Go to https://vercel.com
3. Sign up/login with GitHub
4. Click "New Project"
5. Import your GitHub repository
6. Configure environment variables (see Step 4)

### Step 4: Configure Environment Variables in Vercel Dashboard

After creating your Vercel project:

1. Go to your project in Vercel dashboard
2. Click **Settings** → **Environment Variables**
3. Add these variables:
   - **EXPO_PUBLIC_SUPABASE_URL** = `https://zdnyhzasvifrskbostgn.supabase.co`
   - **EXPO_PUBLIC_SUPABASE_ANON_KEY** = `[your_supabase_anon_key]`

4. **IMPORTANT**: Make sure these are added to **Production** environment

### Step 5: Test the Deployment

After deployment, Vercel will provide you with a URL like:
- `https://your-project-name.vercel.app`

**Test these features:**
- ✅ Login with superuser account
- ✅ View member list with real names
- ✅ Check dashboard with R674,552.71 total fund value
- ✅ Verify Christopher Naude shows as member #6

## 🔧 Required Credentials Summary

**What I need from you:**

1. **Supabase Anon Key** (from Supabase dashboard)
   - Go to: Supabase → Settings → API → Project API keys
   - Copy the `anon` public key

2. **Vercel Account** (if using GitHub integration)
   - Sign up at https://vercel.com
   - Connect your GitHub account

## 🛠️ Pre-Deployment Checklist

**Before deploying, verify:**

- [ ] `vercel.json` file created
- [ ] `package.json` scripts updated
- [ ] `webpack.config.js` created
- [ ] Supabase credentials available
- [ ] Test build locally: `npm run build`
- [ ] All 89 members show proper names
- [ ] Dashboard shows R674,552.71 total fund value

## 📱 Testing the Deployed App

**Test Accounts:**
- **Superuser**: Use your existing superuser credentials
- **Member View**: Login and verify all 89 members show real names

**Expected Results:**
- ✅ All members show real names (not "Member 1", "Member 2")
- ✅ Christopher Naude appears as member #6
- ✅ Total Fund Value: R674,552.71
- ✅ Catch-up fees correctly calculated
- ✅ Join dates properly imported

## 🚨 Troubleshooting

**Common Issues:**

1. **Build Fails**
   - Check Vercel deployment logs
   - Verify all configuration files are present
   - Ensure environment variables are set

2. **Supabase Connection Issues**
   - Verify Supabase URL and Anon Key
   - Check Supabase project is active
   - Verify RLS policies allow web access

3. **Missing Dependencies**
   - Vercel should install all dependencies automatically
   - Check `package.json` includes all required packages

## 📞 Support

If you encounter issues during deployment:

1. **Check Vercel logs** in the deployment dashboard
2. **Verify Supabase connection** using the test script:
   ```bash
   node test-supabase-connection.js
   ```
3. **Test locally first**:
   ```bash
   npm run build
   npm start
   ```

## 🎯 Next Steps After Deployment

1. **Set up custom domain** (optional)
2. **Configure SSL certificates** (automatic with Vercel)
3. **Set up monitoring** and analytics
4. **Configure backups** for Supabase database
5. **Test on multiple devices** and browsers

## 💡 Important Notes

- **Database is already configured** with all 89 members and real data
- **Edge Functions are deployed** and running on Supabase
- **All business logic is implemented** and tested
- **The app is production-ready** once deployed to Vercel

**Ready to deploy!** Follow the steps above and let me know if you need any assistance with the configuration.
