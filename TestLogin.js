import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';

const TestLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      console.log('Test login with:', email, password);
      // Simulate login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'superuser@plf.com' && password === 'Wawa@PLF2025') {
        Alert.alert('Success', 'SuperUser login successful!');
      } else {
        Alert.alert('Success', 'Login successful!');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 20 }}>
        Test Login
      </Text>
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        keyboardType="email-address"
      />
      
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
        secureTextEntry
      />
      
      <Button
        title={loading ? "Logging in..." : "Login"}
        onPress={handleLogin}
        disabled={loading}
      />
      
      <Text style={{ marginTop: 20, textAlign: 'center' }}>
        Test: superuser@plf.com / Wawa@PLF2025
      </Text>
    </View>
  );
};

export default TestLogin;
