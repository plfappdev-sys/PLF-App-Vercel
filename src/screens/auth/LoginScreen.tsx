import React, { useState } from 'react';
import { View, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../AppSimple';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      // Navigation will be handled by the auth state change in AuthContext
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* PLF Logo */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../../assets/plf-logo.png')} 
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.tagline}>TOGETHER WE RISE</Text>
      </View>

      {/* Login Form */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>People's Liberator Fund</Text>
        <Text style={styles.subtitle}>Member Login</Text>
        
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          disabled={loading}
        />
        
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          style={styles.input}
          secureTextEntry
          disabled={loading}
        />
        
        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          disabled={loading}
          loading={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        
        <Text style={styles.helpText}>
          SuperUser Login: superuser@plf.com / Wawa@PLF2025
        </Text>
        
        <TouchableOpacity onPress={() => navigation.navigate('SignUp' as never)}>
          <Text style={styles.linkText}>
            Don't have an account? Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC', // Beige background
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
    color: '#228B22', // Forest green
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
    color: '#B8860B', // Dark goldenrod
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: 'white',
  },
  button: {
    width: '100%',
    marginTop: 10,
    paddingVertical: 5,
    backgroundColor: '#228B22', // Forest green
  },
  helpText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 12,
    color: '#666',
  },
  linkText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#228B22', // Forest green
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
