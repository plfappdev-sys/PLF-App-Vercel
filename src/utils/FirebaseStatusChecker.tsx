import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { auth, isFirebaseInitialized } from '../../firebase.rn.config';
import { isFirebaseAuthAvailable } from './firebaseUtils';

const FirebaseStatusChecker: React.FC = () => {
  const [status, setStatus] = useState<string>('Checking...');
  const [authAvailable, setAuthAvailable] = useState<boolean>(false);

  useEffect(() => {
    checkFirebaseStatus();
  }, []);

  const checkFirebaseStatus = () => {
    const initialized = isFirebaseInitialized;
    const authCheck = isFirebaseAuthAvailable(auth);
    
    setAuthAvailable(authCheck);
    
    if (initialized && authCheck) {
      setStatus('✅ Firebase initialized and auth available');
    } else if (initialized && !authCheck) {
      setStatus('⚠️ Firebase initialized but auth not available');
    } else {
      setStatus('❌ Firebase not initialized');
    }
  };

  const testAuth = async () => {
    try {
      setStatus('Testing auth...');
      // Try a simple auth operation
      if (isFirebaseAuthAvailable(auth)) {
        setStatus('✅ Auth operations available');
      } else {
        setStatus('❌ Auth operations not available');
      }
    } catch (error) {
      setStatus(`❌ Auth test failed: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firebase Status Check</Text>
      <Text style={styles.status}>{status}</Text>
      <Text style={styles.detail}>
        Initialized: {isFirebaseInitialized ? '✅' : '❌'}
        {'\n'}
        Auth Available: {authAvailable ? '✅' : '❌'}
      </Text>
      <Button title="Check Status" onPress={checkFirebaseStatus} />
      <Button title="Test Auth" onPress={testAuth} disabled={!authAvailable} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  status: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  detail: {
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
    color: '#666',
  },
});

export default FirebaseStatusChecker;
