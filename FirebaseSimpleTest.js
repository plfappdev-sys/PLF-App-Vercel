import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { auth, isFirebaseInitialized } from './firebase.rn.config';

const FirebaseSimpleTest = () => {
  const [status, setStatus] = useState('Testing Firebase initialization...');
  const [firebaseReady, setFirebaseReady] = useState(false);

  useEffect(() => {
    const testFirebase = async () => {
      try {
        setStatus('Checking Firebase initialization status...');
        
        // Wait for Firebase to be ready
        let attempts = 0;
        const maxAttempts = 10;
        
        while (attempts < maxAttempts) {
          if (isFirebaseInitialized) {
            setFirebaseReady(true);
            setStatus('Firebase is initialized! Testing auth service...');
            break;
          }
          attempts++;
          setStatus(`Waiting for Firebase... Attempt ${attempts}/${maxAttempts}`);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        if (!isFirebaseInitialized) {
          setStatus('❌ Firebase initialization timed out');
          return;
        }

        // Test auth service
        try {
          setStatus('Testing auth service...');
          // Just check if auth object exists and has expected properties
          if (auth && typeof auth.signInWithEmailAndPassword === 'function') {
            setStatus('✅ Auth service is available!');
          } else {
            setStatus('❌ Auth service not properly initialized');
          }
        } catch (authError) {
          setStatus(`❌ Auth service error: ${authError.message}`);
        }

      } catch (error) {
        setStatus(`❌ Error: ${error.message}`);
      }
    };

    testFirebase();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firebase Initialization Test</Text>
      <Text style={styles.status}>{status}</Text>
      <Text style={styles.info}>
        Firebase Ready: {firebaseReady ? '✅ Yes' : '❌ No'}
      </Text>
      <Text style={styles.info}>
        Is Initialized: {isFirebaseInitialized ? '✅ Yes' : '❌ No'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  status: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#666',
  },
  info: {
    fontSize: 14,
    marginBottom: 5,
    color: '#444',
  },
});

export default FirebaseSimpleTest;
