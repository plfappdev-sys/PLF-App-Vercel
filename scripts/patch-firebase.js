// Script to patch Firebase v8 AsyncStorage issue for React Native
const fs = require('fs');
const path = require('path');

const firebaseAuthPath = path.join(__dirname, '..', 'node_modules', 'firebase', 'firebase-auth.js');

console.log('Patching Firebase v8 AsyncStorage issue...');

try {
  // Read the firebase-auth.js file
  let content = fs.readFileSync(firebaseAuthPath, 'utf8');
  
  // Add a patch at the beginning of the file to handle AsyncStorage
  const patch = `
// Firebase v8 AsyncStorage Patch for React Native
if (typeof window === 'undefined' && typeof global !== 'undefined') {
  // This is React Native environment
  const ReactNative = require('react-native');
  if (!ReactNative.AsyncStorage) {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      ReactNative.AsyncStorage = AsyncStorage;
      console.log('Patched React Native AsyncStorage for Firebase v8 compatibility');
    } catch (error) {
      console.warn('Could not patch AsyncStorage for Firebase v8:', error);
    }
  }
}
`;

  // Insert the patch at the beginning of the file
  content = patch + content;
  
  // Write the patched file back
  fs.writeFileSync(firebaseAuthPath, content, 'utf8');
  
  console.log('Firebase v8 AsyncStorage patch applied successfully!');
} catch (error) {
  console.error('Failed to patch Firebase v8:', error);
  process.exit(1);
}
