import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';

// Import only the essential screens
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';

const Stack = createStackNavigator();

// Simple placeholder screens
const DashboardPlaceholder = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Dashboard Placeholder</Text>
  </View>
);

// Auth stack navigator
const AuthStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AuthLogin" component={LoginScreen} />
      <Stack.Screen name="AuthSignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

// Main app navigator
const AppNavigatorSimple: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthStackNavigator} />
        <Stack.Screen name="Dashboard" component={DashboardPlaceholder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigatorSimple;
