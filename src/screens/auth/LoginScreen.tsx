import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useMockAuth } from '../../contexts/MockAuthContext';
import { PLFTheme } from '../../theme/colors';
import { RootStackParamList } from '../../types/index';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState('');
  const { login } = useMockAuth();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    if (!email || !password) {
      setLoginStatus('Please fill in all fields');
      return;
    }

    setLoading(true);
    setLoginStatus('');
    try {
      console.log('Attempting login with:', email);
      await login(email, password);
      console.log('Login successful, current user should be set');
      setLoginStatus('Login successful! Redirecting...');
      // Navigation will be handled by the auth state change in AuthContext
    } catch (error: any) {
      console.error('Login error:', error);
      setLoginStatus(error.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* PLF Logo and Branding */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../../assets/plf-logo.png')} 
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.title}>People's Liberator Fund</Text>
        <Text style={styles.tagline}>TOGETHER WE RISE</Text>
      </View>

      {/* Login Form */}
      <View style={styles.formContainer}>
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
        
        {loginStatus ? (
          <Text style={[
            styles.statusText,
            { color: loginStatus.includes('successful') ? PLFTheme.colors.primaryGreen : PLFTheme.colors.error }
          ]}>
            {loginStatus}
          </Text>
        ) : null}
        
        <Text style={styles.helpText}>
          SuperUser Login: superuser@plf.com / Wawa@PLF2025
        </Text>
        
        <TouchableOpacity onPress={() => navigation.navigate('AuthSignUp')}>
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
    backgroundColor: PLFTheme.colors.primaryBeige,
    alignItems: 'center',
    justifyContent: 'center',
    padding: PLFTheme.spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: PLFTheme.spacing.xl,
  },
  logoImage: {
    width: 200,
    height: 200,
    marginBottom: PLFTheme.spacing.sm,
  },
  tagline: {
    fontSize: 16,
    color: PLFTheme.colors.primaryGreen,
    marginTop: PLFTheme.spacing.sm,
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
    color: PLFTheme.colors.primaryGold,
    marginBottom: PLFTheme.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: PLFTheme.colors.darkGray,
    marginBottom: PLFTheme.spacing.xl,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: PLFTheme.spacing.md,
    backgroundColor: PLFTheme.colors.white,
  },
  button: {
    width: '100%',
    marginTop: PLFTheme.spacing.sm,
    paddingVertical: 5,
    backgroundColor: PLFTheme.colors.primaryGreen,
  },
  helpText: {
    textAlign: 'center',
    marginTop: PLFTheme.spacing.lg,
    fontSize: 12,
    color: PLFTheme.colors.darkGray,
  },
  linkText: {
    textAlign: 'center',
    marginTop: PLFTheme.spacing.sm,
    color: PLFTheme.colors.primaryGreen,
    textDecorationLine: 'underline',
  },
  statusText: {
    textAlign: 'center',
    marginTop: PLFTheme.spacing.md,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default LoginScreen;
