import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import TestComponent from './TestComponent';

// Main App component
const App = () => {
  return (
    <PaperProvider>
      <StatusBar style="auto" />
      <TestComponent />
    </PaperProvider>
  );
};

export default App;
