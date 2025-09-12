import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../AppSimple';
import { RootStackParamList, UserRole } from '../types/index';

// Import screens
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import MembersScreen from '../screens/MembersScreen';
import ReportsScreen from '../screens/ReportsScreen';

// Placeholder screens for other tabs
import { View, Text, StyleSheet } from 'react-native';

const AnnouncementsScreen = () => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderTitle}>Announcements Screen</Text>
    <Text style={styles.placeholderText}>Announcements functionality coming soon</Text>
  </View>
);

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Define tab configurations for different roles
const getTabsForRole = (role: UserRole) => {
  const baseTabs = [
    {
      name: 'Dashboard',
      component: DashboardScreen,
      icon: 'dashboard',
      label: 'Dashboard'
    },
    {
      name: 'Transactions',
      component: TransactionsScreen,
      icon: 'account-balance-wallet',
      label: 'Transactions'
    },
    {
      name: 'Announcements',
      component: AnnouncementsScreen,
      icon: 'announcement',
      label: 'Announcements'
    },
    {
      name: 'Reports',
      component: ReportsScreen,
      icon: 'bar-chart',
      label: 'Reports'
    },
    {
      name: 'Profile',
      component: ProfileScreen,
      icon: 'person',
      label: 'Profile'
    }
  ];

  // Add role-specific tabs
  if (role === 'superuser' || role === 'admin') {
    baseTabs.splice(2, 0, {
      name: 'Members',
      component: MembersScreen,
      icon: 'people',
      label: 'Members'
    });
  }

  return baseTabs;
};

// Main tab navigator
const MainTabNavigator: React.FC = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser) return null;

  const tabs = getTabsForRole(currentUser.role);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const tab = tabs.find(t => t.name === route.name);
          const iconName = tab?.icon || 'help';
          
          return (
            <MaterialIcons 
              name={iconName as any} 
              size={size} 
              color={color} 
            />
          );
        },
        tabBarActiveTintColor: '#228B22',
        tabBarInactiveTintColor: '#999999',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E0E0E0',
          paddingBottom: 8,
          height: 60,
        },
      })}
    >
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarLabel: tab.label,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

// Auth stack navigator
const AuthStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
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
const AppNavigator: React.FC = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {currentUser ? (
          <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStackNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default AppNavigator;
