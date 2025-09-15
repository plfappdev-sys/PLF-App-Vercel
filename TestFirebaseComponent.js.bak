import React from 'react';
import { View, Text } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const TestFirebaseComponent = () => {
  try {
    // Your existing working Firebase project configuration
    const firebaseConfig = {
      apiKey: "AIzaSyAUbhQUhoxn3z4N_2SrZwTA50QBNz1LodI",
      authDomain: "plf-app-27194.firebaseapp.com",
      projectId: "plf-app-27194",
      storageBucket: "plf-app-27194.firebasestorage.app",
      messagingSenderId: "759024350817",
      appId: "1:759024350817:web:10218bc66fc43b90e51c20",
      measurementId: "G-1DYECZ3HPX"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Firebase Auth
    const auth = getAuth(app);

    return (
      <View>
        <Text>Firebase initialized successfully!</Text>
        <Text>Auth object: {auth ? 'Available' : 'Not available'}</Text>
      </View>
    );
  } catch (error) {
    return (
      <View>
        <Text>Firebase initialization failed:</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }
};

export default TestFirebaseComponent;
