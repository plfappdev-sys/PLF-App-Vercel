import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { SupabaseAuthProvider } from './src/contexts/SupabaseAuthContext';
import AppNavigator from './src/navigation/AppNavigator';

// Main App component
const App = () => {
  return (
    <PaperProvider>
      <SupabaseAuthProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </SupabaseAuthProvider>
    </PaperProvider>
  );
};

export default App;
