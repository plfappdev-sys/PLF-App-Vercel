import React from 'react';
import { View, Text } from 'react-native';
import { auth } from './firebase.config';

const FirebaseTest = () => {
  try {
    // Test if auth is available
    console.log('Auth object:', auth);
    
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Firebase Test</Text>
        <Text>Auth available: {auth ? 'Yes' : 'No'}</Text>
        <Text>Auth current user: {auth.currentUser ? auth.currentUser.email : 'None'}</Text>
      </View>
    );
  } catch (error) {
    console.error('Firebase test error:', error);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error: {error.message}</Text>
        <Text>Stack: {error.stack}</Text>
      </View>
    );
  }
};

export default FirebaseTest;
