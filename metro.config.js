// Metro configuration for React Native
// This config helps resolve the Firebase v8 AsyncStorage issue

const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add resolver for AsyncStorage to fix Firebase v8 issue
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  // Map AsyncStorage requests to the correct package
  '@react-native-async-storage/async-storage': require.resolve('@react-native-async-storage/async-storage'),
};

module.exports = config;
