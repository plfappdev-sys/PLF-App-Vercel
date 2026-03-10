
#!/bin/bash
# Vercel deployment script for new calculation methodology

echo "=== Deploying to Vercel ===\n"

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
echo "\nDeploying to Vercel (preview)..."
vercel --prod

if [ $? -ne 0 ]; then
    echo "Error: Vercel deployment failed"
    exit 1
fi

echo "\n=== Deployment Complete ==="
echo "The new calculation methodology has been deployed to Vercel."
echo "Please verify the deployment by:"
echo "1. Visiting your Vercel deployment URL"
echo "2. Testing member calculations"
echo "3. Checking that penalty rate is 5.5%"
