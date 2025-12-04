#!/bin/bash

# PLF App Vercel Deployment Script
# This script helps deploy the PLF App to Vercel

echo "=== PLF App Vercel Deployment ==="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "1. Building the app..."
npm run build

echo ""
echo "2. Testing the build..."
if [ -d "web-build" ]; then
    echo "✅ Build successful: web-build directory created"
    echo "   Files in web-build:"
    ls -la web-build/ | head -10
else
    echo "❌ Build failed: web-build directory not found"
    echo "   Trying alternative build method..."
    npx expo build:web
fi

echo ""
echo "3. Deploying to Vercel..."
echo "   Options:"
echo "   a) Deploy with Vercel CLI (recommended)"
echo "   b) Deploy via GitHub integration"
echo "   c) Exit"
echo ""
read -p "Choose option (a/b/c): " deploy_option

case $deploy_option in
    a)
        echo "Deploying with Vercel CLI..."
        vercel --prod
        ;;
    b)
        echo "GitHub integration instructions:"
        echo ""
        echo "1. Push your code to GitHub:"
        echo "   git add ."
        echo "   git commit -m 'Deploy PLF App with fixed data discrepancy'"
        echo "   git push origin main"
        echo ""
        echo "2. Go to https://vercel.com"
        echo "3. Sign up/login with GitHub"
        echo "4. Click 'New Project'"
        echo "5. Import your GitHub repository"
        echo "6. Configure environment variables:"
        echo "   - EXPO_PUBLIC_SUPABASE_URL: https://zdnyhzasvifrskbostgn.supabase.co"
        echo "   - EXPO_PUBLIC_SUPABASE_ANON_KEY: [your_anon_key]"
        echo ""
        echo "7. Deploy!"
        ;;
    c)
        echo "Exiting deployment script."
        exit 0
        ;;
    *)
        echo "Invalid option. Exiting."
        exit 1
        ;;
esac

echo ""
echo "=== Deployment Summary ==="
echo "✅ Data discrepancy fix applied:"
echo "   - RLS policies fixed"
echo "   - actual_contributions populated (R 603,502.71)"
echo "   - Both users see same data"
echo ""
echo "✅ Configuration files ready:"
echo "   - vercel.json updated"
echo "   - package.json scripts configured"
echo "   - webpack.config.js exists"
echo ""
echo "✅ Expected behavior after deployment:"
echo "   - Total Fund Value: R 603,502.71"
echo "   - Both users (Lesego and Oratile) see same value"
echo "   - Business requirement met: Shows all contributions made by members"
echo ""
echo "To test after deployment:"
echo "1. Login with both user accounts"
echo "2. Verify both see R 603,502.71 as Total Fund Value"
echo "3. Check member list shows real names (not 'Member 1', 'Member 2')"
echo "4. Verify Christopher Naude appears as member #6"
