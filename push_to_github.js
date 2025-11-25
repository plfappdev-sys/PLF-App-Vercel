const { execSync } = require('child_process');

console.log('🚀 Attempting to push PLF App to GitHub...');

try {
  // Check git status
  console.log('📊 Checking git status...');
  const status = execSync('git status --porcelain').toString();
  if (status.trim()) {
    console.log('⚠️  There are uncommitted changes. Please commit them first.');
    process.exit(1);
  }

  // Check remote
  console.log('🔗 Checking remote configuration...');
  const remote = execSync('git remote -v').toString();
  console.log('Remote:', remote);

  // Try pushing
  console.log('📤 Pushing to GitHub...');
  execSync('git push -u origin main', { stdio: 'inherit' });
  
  console.log('✅ Successfully pushed to GitHub!');
  console.log('🎉 Your PLF App is now on GitHub and ready for Vercel deployment.');
  
} catch (error) {
  console.error('❌ Failed to push to GitHub:', error.message);
  console.log('\n🔧 Troubleshooting steps:');
  console.log('1. Make sure you have accepted the collaborator invitation');
  console.log('2. Try using a Personal Access Token:');
  console.log('   - Go to GitHub Settings → Developer settings → Personal access tokens');
  console.log('   - Generate a new token with "repo" permissions');
  console.log('   - Use: git remote set-url origin https://YOUR_TOKEN@github.com/plfappdev-sys/PLF-App-Vercel.git');
  console.log('3. Or try the Vercel CLI directly: npm install -g vercel && vercel --prod');
}
