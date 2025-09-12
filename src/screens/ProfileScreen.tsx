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
import { useAuth } from '../../AppSimple';

const ProfileScreen: React.FC = () => {
  const { currentUser, logout } = useAuth();

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
            label={`${currentUser.personalInfo.firstName[0]}${currentUser.personalInfo.lastName[0]}`}
            style={styles.avatar}
          />
          <Title style={styles.profileName}>
            {currentUser.personalInfo.firstName} {currentUser.personalInfo.lastName}
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
            title="Full Name"
            description={`${currentUser.personalInfo.firstName} ${currentUser.personalInfo.lastName}`}
            left={props => <List.Icon {...props} icon="account" />}
          />
          <List.Item
            title="ID Number"
            description={currentUser.personalInfo.idNumber || 'Not provided'}
            left={props => <List.Icon {...props} icon="card-account-details" />}
          />
          <List.Item
            title="Phone Number"
            description={currentUser.personalInfo.phoneNumber || 'Not provided'}
            left={props => <List.Icon {...props} icon="phone" />}
          />
          <List.Item
            title="Date of Birth"
            description={currentUser.personalInfo.dateOfBirth?.toLocaleDateString() || 'Not provided'}
            left={props => <List.Icon {...props} icon="cake" />}
          />
        </Card.Content>
      </Card>

      {/* Address Information */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Address</Title>
          <List.Item
            title="Street"
            description={currentUser.personalInfo.address?.street || 'Not provided'}
            left={props => <List.Icon {...props} icon="home" />}
          />
          <List.Item
            title="City"
            description={currentUser.personalInfo.address?.city || 'Not provided'}
            left={props => <List.Icon {...props} icon="city" />}
          />
          <List.Item
            title="Province"
            description={currentUser.personalInfo.address?.province || 'Not provided'}
            left={props => <List.Icon {...props} icon="map-marker" />}
          />
          <List.Item
            title="Postal Code"
            description={currentUser.personalInfo.address?.postalCode || 'Not provided'}
            left={props => <List.Icon {...props} icon="email" />}
          />
        </Card.Content>
      </Card>

      {/* Account Information */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Account Information</Title>
          <List.Item
            title="Member Number"
            description={currentUser.memberNumber || 'Not assigned'}
            left={props => <List.Icon {...props} icon="identifier" />}
          />
          <List.Item
            title="Account Status"
            description={currentUser.accountStatus.isVerified ? 'Verified' : 'Pending Verification'}
            left={props => <List.Icon {...props} icon={currentUser.accountStatus.isVerified ? 'check-circle' : 'clock'} />}
          />
          <List.Item
            title="Member Since"
            description="Not available"
            left={props => <List.Icon {...props} icon="calendar" />}
          />
        </Card.Content>
      </Card>

      {/* Membership Information */}
      {currentUser.membershipInfo && (
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Membership Information</Title>
            <List.Item
              title="Membership Type"
              description={currentUser.membershipInfo.membershipType}
              left={props => <List.Icon {...props} icon="account-group" />}
            />
            <List.Item
              title="Join Date"
              description={currentUser.membershipInfo.joinDate?.toLocaleDateString()}
              left={props => <List.Icon {...props} icon="calendar-plus" />}
            />
          </Card.Content>
        </Card>
      )}

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
            onPress={logout}
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
