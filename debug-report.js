// Debug script to test Member Statement report generation
console.log('Debugging Member Statement Report Generation...');

// Simple test to check if the download functionality works
function testDownload() {
  console.log('Testing download functionality...');
  
  // Create a simple test download
  const testContent = 'Test Member Statement Report Content';
  const testFilename = 'test_report.html';
  
  // Simulate the downloadFile function logic
  if (typeof document !== 'undefined') {
    console.log('Web environment detected');
    
    try {
      const blob = new Blob([testContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = testFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      setTimeout(() => URL.revokeObjectURL(url), 100);
      
      console.log('✅ Download test successful - file should download');
      return true;
    } catch (error) {
      console.error('❌ Download test failed:', error);
      return false;
    }
  } else {
    console.log('Not in web environment - cannot test download');
    return false;
  }
}

// Test the download functionality
const downloadSuccess = testDownload();

if (downloadSuccess) {
  console.log('\n🎉 Download functionality works correctly!');
  console.log('The issue might be in report generation or error handling.');
} else {
  console.log('\n💥 Download functionality test failed!');
  console.log('This could indicate a browser compatibility issue.');
}

console.log('\nNext steps:');
console.log('1. Check browser console for any JavaScript errors');
console.log('2. Verify that the report generation completes successfully');
console.log('3. Ensure no exceptions are thrown during report generation');
console.log('4. Check if the downloadFile function is being called correctly');
