import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import FirebaseSimpleTest from './FirebaseSimpleTest';

// Main Test App component
const App = () => {
  return (
    <PaperProvider>
      <StatusBar style="auto" />
      <FirebaseSimpleTest />
    </PaperProvider>
  );
};

export default App;
