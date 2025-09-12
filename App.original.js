import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import LoginScreen from './src/screens/auth/LoginScreen';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

// Main App Component with Authentication
const AppContent = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#228B22" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (currentUser) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.welcomeText}>Welcome, {currentUser.personalInfo.firstName}!</Text>
        <Text style={styles.userInfo}>Email: {currentUser.email}</Text>
        <Text style={styles.userInfo}>Role: {currentUser.role}</Text>
      </View>
    );
  }

  return <LoginScreen />;
};

// App Wrapper with AuthProvider
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#228B22',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B8860B',
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
});
