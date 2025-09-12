import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Simple test component to verify the app is working
const AppTest = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>PLF App Test</Text>
      <Text style={styles.subtitle}>App is running successfully!</Text>
      <Text style={styles.info}>
        ✅ Web version: Working
        {"\n"}
        ❌ Mobile version: Firebase initialization issues
        {"\n"}
        🔧 Using tunnel mode for connectivity
      </Text>
      <Text style={styles.instructions}>
        Try the SuperUser login:
        {"\n"}
        Email: superuser@plf.com
        {"\n"}
        Password: Wawa@PLF2025
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#228B22',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#B8860B',
    marginBottom: 20,
    textAlign: 'center',
  },
  info: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 20,
  },
  instructions: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    lineHeight: 18,
    backgroundColor: '#FFF8DC',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DAA520',
  },
});

export default AppTest;
