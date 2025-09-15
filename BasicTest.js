import React from 'react';
import { View, Text, Button, Alert } from 'react-native';

const BasicTest = () => {
  const handleTest = () => {
    Alert.alert('Test', 'Button clicked! This is working.');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Basic Test</Text>
      <Button title="Test Button" onPress={handleTest} />
      <Text style={{ marginTop: 20 }}>If this works, React Native is working</Text>
    </View>
  );
};

export default BasicTest;
