import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { useMockAuth } from '../contexts/MockAuthContext';
import { RootStackParamList, UserRole } from '../types/index';
import { PLFTheme } from '../theme/colors';

// Import screens
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import MembersScreen from '../screens/MembersScreen';
import ReportsScreen from '../screens/ReportsScreen';
import LoanApplicationScreen from '../screens/LoanApplicationScreen';
import LoanApprovalScreen from '../screens/LoanApprovalScreen';
import DepositApprovalScreen from '../screens/transactions/DepositApprovalScreen';
import MemberApprovalScreen from '../screens/MemberApprovalScreen'; // Will create this screen

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

  // Add executive-specific tabs
  if (role === 'executive') {
    baseTabs.splice(2, 0, {
      name: 'Approvals',
      component: MemberApprovalScreen,
      icon: 'check-circle',
      label: 'Approvals'
    });
  }

  return baseTabs;
};

// Main tab navigator
const MainTabNavigator: React.FC = () => {
  const { currentUser } = useMockAuth();
  
  if (!currentUser) return null;

  const tabs = getTabsForRole(currentUser.role);

  return (
    <Tab.Navigator
      id={undefined}
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
        tabBarActiveTintColor: PLFTheme.colors.primaryGreen,
        tabBarInactiveTintColor: PLFTheme.colors.darkGray,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: PLFTheme.colors.white,
          borderTopColor: PLFTheme.colors.mediumGray,
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
const AppNavigator: React.FC = () => {
  const { currentUser, loading } = useMockAuth();

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
        {currentUser ? (
          <>
            <Stack.Screen name="MainTabs" component={MainTabNavigator} />
            <Stack.Screen 
              name="LoanApplication" 
              component={LoanApplicationScreen}
              options={{
                presentation: 'modal',
                headerShown: true,
                title: 'Apply for Loan'
              }}
            />
            <Stack.Screen 
              name="LoanApproval" 
              component={LoanApprovalScreen}
              options={{
                presentation: 'modal',
                headerShown: true,
                title: 'Loan Approval'
              }}
            />
            <Stack.Screen 
              name="DepositApproval" 
              component={DepositApprovalScreen}
              options={{
                presentation: 'modal',
                headerShown: true,
                title: 'Deposit Approvals'
              }}
            />
            <Stack.Screen 
              name="MemberApproval" 
              component={MemberApprovalScreen}
              options={{
                presentation: 'modal',
                headerShown: true,
                title: 'Member Approvals'
              }}
            />
          </>
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
    padding: PLFTheme.spacing.lg,
    backgroundColor: PLFTheme.colors.lightGray,
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: PLFTheme.spacing.sm,
    color: PLFTheme.colors.primaryGold,
  },
  placeholderText: {
    fontSize: 16,
    color: PLFTheme.colors.darkGray,
    textAlign: 'center',
  },
});

export default AppNavigator;
