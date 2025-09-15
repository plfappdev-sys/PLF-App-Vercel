import React from 'react';
import { View, Text } from 'react-native';
import { auth } from './firebase.config';

const MinimalTest = () => {
  try {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Firebase Test</Text>
        <Text>Auth initialized: {auth ? 'Yes' : 'No'}</Text>
      </View>
    );
  } catch (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error: {error.message}</Text>
        <Text>Stack: {error.stack}</Text>
      </View>
    );
  }
};

export default MinimalTest;
