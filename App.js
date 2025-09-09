import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';

export default function App() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    alert('Login functionality will be implemented');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* PLF Logo */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('./assets/plf-logo.png')} 
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.tagline}>TOGETHER WE RISE</Text>
      </View>

      {/* Login Form */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>People's Liberator Fund</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        
        <Text style={styles.testCredentials}>
          Test: superuser@plf.com / Wawa@PLF2025
        </Text>
      </View>
    </View>
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#228B22',
    marginTop: 10,
    fontWeight: '600',
  },
  formContainer: {
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B8860B',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderColor: '#228B22',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: 'white',
    fontSize: 16,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#228B22',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  testCredentials: {
    marginTop: 20,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
