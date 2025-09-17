import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Title, 
  Card, 
  Text, 
  Button,
  List,
  Avatar
} from 'react-native-paper';
import { useAuth } from '../contexts/SupabaseAuthContext';

const ProfileScreen: React.FC = () => {
  const { user: currentUser, signOut } = useAuth();

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text>Please log in to view your profile</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <Card style={styles.profileCard}>
        <Card.Content style={styles.profileContent}>
          <Avatar.Text 
            size={80} 
            label={currentUser.email[0].toUpperCase()}
            style={styles.avatar}
          />
          <Title style={styles.profileName}>
            {currentUser.email.split('@')[0]}
          </Title>
          <Text style={styles.profileRole}>{currentUser.role.toUpperCase()}</Text>
          <Text style={styles.profileEmail}>{currentUser.email}</Text>
        </Card.Content>
      </Card>

      {/* Personal Information */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Personal Information</Title>
          <List.Item
            title="Email"
            description={currentUser.email}
            left={props => <List.Icon {...props} icon="email" />}
          />
          <List.Item
            title="User ID"
            description={currentUser.id}
            left={props => <List.Icon {...props} icon="identifier" />}
          />
          <List.Item
            title="Role"
            description={currentUser.role}
            left={props => <List.Icon {...props} icon="account-key" />}
          />
        </Card.Content>
      </Card>

      {/* Account Information */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Account Information</Title>
          <List.Item
            title="Account Created"
            description={new Date(currentUser.created_at).toLocaleDateString()}
            left={props => <List.Icon {...props} icon="calendar" />}
          />
          <List.Item
            title="User Role"
            description={currentUser.role.toUpperCase()}
            left={props => <List.Icon {...props} icon="shield-account" />}
          />
        </Card.Content>
      </Card>

      {/* Membership Information */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Membership Information</Title>
          <List.Item
            title="Member Status"
            description="Basic Member"
            left={props => <List.Icon {...props} icon="account-group" />}
          />
          <List.Item
            title="Account Type"
            description="Standard Account"
            left={props => <List.Icon {...props} icon="badge-account" />}
          />
        </Card.Content>
      </Card>

      {/* Actions */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Actions</Title>
          <Button 
            mode="contained" 
            style={styles.actionButton}
            icon="lock-reset"
          >
            Change Password
          </Button>
          <Button 
            mode="outlined" 
            style={styles.actionButton}
            icon="account-edit"
          >
            Edit Profile
          </Button>
          <Button 
            mode="outlined" 
            style={styles.actionButton}
            icon="logout"
            onPress={() => signOut()}
            textColor="#F44336"
          >
            Logout
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileCard: {
    margin: 20,
    marginBottom: 10,
  },
  profileContent: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatar: {
    backgroundColor: '#6200EE',
    marginBottom: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileRole: {
    fontSize: 16,
    color: '#6200EE',
    marginBottom: 5,
    fontWeight: '600',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  card: {
    margin: 20,
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 15,
    color: '#333',
  },
  actionButton: {
    marginBottom: 10,
  },
});

export default ProfileScreen;
