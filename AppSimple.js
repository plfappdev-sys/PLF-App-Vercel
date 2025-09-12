import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { MockAuthProvider, useMockAuth } from './src/contexts/MockAuthContext';
import AppNavigator from './src/navigation/AppNavigator';

// Export useAuth for compatibility with existing screens
export const useAuth = () => {
  return useMockAuth();
};

// Main App component
const App = () => {
  return (
    <MockAuthProvider>
      <StatusBar style="auto" />
      <AppNavigator />
    </MockAuthProvider>
  );
};

export default App;
