// Firebase v8 AsyncStorage Patch for React Native
// This file must be imported BEFORE any Firebase imports in your app

// Patch React Native's AsyncStorage to use the correct package
if (typeof window === 'undefined') {
  // This is React Native environment
  try {
    const ReactNative = require('react-native');
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    
    // Only patch if AsyncStorage is not already available in react-native
    if (!ReactNative.AsyncStorage) {
      ReactNative.AsyncStorage = AsyncStorage;
      console.log('Patched React Native AsyncStorage for Firebase v8 compatibility');
    }
  } catch (error) {
    console.warn('Could not patch AsyncStorage for Firebase v8:', error);
  }
}

export default {};
