import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { auth } from './firebase.rn.config';

const ExpoFirebaseTest = () => {
  const [firebaseAuth, setFirebaseAuth] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Use the pre-configured auth instance from React Native config
      setFirebaseAuth(auth);
      console.log('Firebase auth loaded from React Native config');
    } catch (err) {
      console.error('Firebase auth loading error:', err);
      setError(err.message);
    }
  }, []);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Expo Firebase Test</Text>
      <Text>Auth available: {auth ? 'Yes' : 'No'}</Text>
      <Text>Auth current user: {auth?.currentUser ? auth.currentUser.email : 'None'}</Text>
    </View>
  );
};

export default ExpoFirebaseTest;
