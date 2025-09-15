import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const LoginTest = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setLoginStatus('Please fill in all fields');
      return;
    }

    setLoading(true);
    setLoginStatus('');
    
    try {
      console.log('Login attempt with:', email, password);
      // Simulate login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'superuser@plf.com' && password === 'Wawa@PLF2025') {
        setLoginStatus('SUCCESS: SuperUser login successful!');
        console.log('SuperUser login successful');
      } else {
        setLoginStatus('SUCCESS: Login successful!');
        console.log('Regular login successful');
      }
    } catch (error) {
      setLoginStatus('ERROR: Login failed');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 20 }}>
        Login Test
      </Text>
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 }}
        secureTextEntry
      />
      
      <Button
        title={loading ? "Logging in..." : "Login"}
        onPress={handleLogin}
        disabled={loading}
      />
      
      {loginStatus ? (
        <Text style={{ 
          marginTop: 20, 
          textAlign: 'center',
          color: loginStatus.startsWith('SUCCESS') ? 'green' : 'red',
          fontWeight: 'bold'
        }}>
          {loginStatus}
        </Text>
      ) : null}
      
      <Text style={{ marginTop: 20, textAlign: 'center', fontSize: 12 }}>
        Test: superuser@plf.com / Wawa@PLF2025
      </Text>
    </View>
  );
};

export default LoginTest;
