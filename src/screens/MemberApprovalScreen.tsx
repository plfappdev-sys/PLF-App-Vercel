import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Card, Button, ActivityIndicator, Divider } from 'react-native-paper';
import { useAuth } from '../contexts/SupabaseAuthContext';
import { User } from '../types/index';
import { PLFTheme } from '../theme/colors';

const MemberApprovalScreen: React.FC = () => {
  const { getPendingApprovals, approveUser, rejectUser, isSuperUser, isAdmin, isExecutive } = useAuth();
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  const canApprove = isSuperUser() || isAdmin() || isExecutive();

  useEffect(() => {
    if (canApprove) {
      loadPendingApprovals();
    }
  }, [canApprove]);

  const loadPendingApprovals = async () => {
    try {
      setLoading(true);
      const users = await getPendingApprovals();
      setPendingUsers(users);
    } catch (error) {
      console.error('Error loading pending approvals:', error);
      Alert.alert('Error', 'Failed to load pending approvals');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (user: User) => {
    try {
      setProcessing(user.uid);
      await approveUser(user.uid, 'Approved by executive');
      Alert.alert('Success', `${user.email} has been approved`);
      loadPendingApprovals();
    } catch (error) {
      console.error('Error approving user:', error);
      Alert.alert('Error', 'Failed to approve user');
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (user: User) => {
    try {
      setProcessing(user.uid);
      await rejectUser(user.uid, 'Rejected by executive');
      Alert.alert('Success', `${user.email} has been rejected`);
      loadPendingApprovals();
    } catch (error) {
      console.error('Error rejecting user:', error);
      Alert.alert('Error', 'Failed to reject user');
    } finally {
      setProcessing(null);
    }
  };

  const renderUserCard = ({ item }: { item: User }) => (
    <Card style={styles.userCard}>
      <Card.Content>
        <Text style={styles.userName}>
          {item.personalInfo.firstName} {item.personalInfo.lastName}
        </Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <Text style={styles.userMemberNumber}>
          Member #: {item.memberNumber || 'N/A'}
        </Text>
        <Text style={styles.userPhone}>
          Phone: {item.personalInfo.phoneNumber}
        </Text>
        <Text style={styles.userCreated}>
          Applied: {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          onPress={() => handleApprove(item)}
          disabled={processing === item.uid}
          loading={processing === item.uid}
          style={styles.approveButton}
        >
          Approve
        </Button>
        <Button
          mode="outlined"
          onPress={() => handleReject(item)}
          disabled={processing === item.uid}
          style={styles.rejectButton}
        >
          Reject
        </Button>
      </Card.Actions>
    </Card>
  );

  if (!canApprove) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>
          You don't have permission to access this screen
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={PLFTheme.colors.primaryGreen} />
        <Text style={styles.loadingText}>Loading pending approvals...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Member Approvals</Text>
        <Text style={styles.headerSubtitle}>
          {pendingUsers.length} pending approval(s)
        </Text>
      </View>

      <Divider style={styles.divider} />

      {pendingUsers.length === 0 ? (
        <View style={styles.centeredContainer}>
          <Text style={styles.emptyText}>No pending approvals</Text>
          <Button
            mode="contained"
            onPress={loadPendingApprovals}
            style={styles.refreshButton}
          >
            Refresh
          </Button>
        </View>
      ) : (
        <FlatList
          data={pendingUsers}
          renderItem={renderUserCard}
          keyExtractor={(item) => item.uid}
          contentContainerStyle={styles.listContent}
          refreshing={loading}
          onRefresh={loadPendingApprovals}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PLFTheme.colors.lightGray,
  },
  header: {
    padding: PLFTheme.spacing.lg,
    backgroundColor: PLFTheme.colors.white,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: PLFTheme.colors.primaryGreen,
    marginBottom: PLFTheme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: 16,
    color: PLFTheme.colors.darkGray,
  },
  divider: {
    backgroundColor: PLFTheme.colors.mediumGray,
  },
  listContent: {
    padding: PLFTheme.spacing.md,
  },
  userCard: {
    marginBottom: PLFTheme.spacing.md,
    backgroundColor: PLFTheme.colors.white,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PLFTheme.colors.primaryGreen,
    marginBottom: PLFTheme.spacing.xs,
  },
  userEmail: {
    fontSize: 14,
    color: PLFTheme.colors.darkGray,
    marginBottom: PLFTheme.spacing.xs,
  },
  userMemberNumber: {
    fontSize: 14,
    color: PLFTheme.colors.darkGray,
    marginBottom: PLFTheme.spacing.xs,
  },
  userPhone: {
    fontSize: 14,
    color: PLFTheme.colors.darkGray,
    marginBottom: PLFTheme.spacing.xs,
  },
  userCreated: {
    fontSize: 12,
    color: PLFTheme.colors.mediumGray,
    fontStyle: 'italic',
  },
  approveButton: {
    marginRight: PLFTheme.spacing.sm,
    backgroundColor: PLFTheme.colors.primaryGreen,
  },
  rejectButton: {
    borderColor: PLFTheme.colors.error,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: PLFTheme.spacing.lg,
  },
  loadingText: {
    marginTop: PLFTheme.spacing.md,
    color: PLFTheme.colors.darkGray,
  },
  emptyText: {
    fontSize: 18,
    color: PLFTheme.colors.mediumGray,
    marginBottom: PLFTheme.spacing.md,
    textAlign: 'center',
  },
  refreshButton: {
    backgroundColor: PLFTheme.colors.primaryGreen,
  },
  errorText: {
    fontSize: 18,
    color: PLFTheme.colors.error,
    textAlign: 'center',
  },
});

export default MemberApprovalScreen;
