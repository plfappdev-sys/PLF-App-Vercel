import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  Title, 
  Card, 
  Text, 
  Button,
  List,
  ActivityIndicator,
  Chip,
  Searchbar,
  Menu,
  Dialog,
  Portal,
  Paragraph,
  TextInput
} from 'react-native-paper';
import { useAuth } from '../contexts/SupabaseAuthContext';
import { SupabaseMemberService } from '../services/supabaseMemberService';
import { SupabaseUserService } from '../services/supabaseUserService';
import { Member, User, UserRole } from '../types/index';

const MembersScreen: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'good' | 'owing'>('all');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [roleDialogVisible, setRoleDialogVisible] = useState(false);
  const [linkDialogVisible, setLinkDialogVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>('member');
  const [selectedMemberNumber, setSelectedMemberNumber] = useState('');
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedMemberForMenu, setSelectedMemberForMenu] = useState<Member | null>(null);

  const loadMembers = async () => {
    console.log('DEBUG: loadMembers() started');
    try {
      console.log('DEBUG: Calling SupabaseMemberService.getAllMembers()');
      const allMembers = await SupabaseMemberService.getAllMembers();
      console.log(`DEBUG: getAllMembers() returned ${allMembers?.length || 0} members`);
      
      // Add null/undefined checks for member data
      const safeMembers = allMembers.map(member => {
        // Preserve the actual financial info if it exists, including negative balances
        const financialInfo = member.financialInfo ? {
          totalContributions: member.financialInfo.totalContributions || 0,
          currentBalance: member.financialInfo.currentBalance || 0, // This preserves negative values
          outstandingAmount: member.financialInfo.outstandingAmount || 0,
          percentageOutstanding: member.financialInfo.percentageOutstanding || 0,
          balanceBroughtForward: member.financialInfo.balanceBroughtForward || 0,
          plannedContributions: member.financialInfo.plannedContributions || 0,
          actualContributions: member.financialInfo.actualContributions || 0,
          currentInterestEarned: member.financialInfo.currentInterestEarned || 0,
          totalInterestEarned: member.financialInfo.totalInterestEarned || 0,
          currentInterestCharged: member.financialInfo.currentInterestCharged || 0,
          totalInterestCharged: member.financialInfo.totalInterestCharged || 0,
          lastInterestCalculation: member.financialInfo.lastInterestCalculation || new Date(),
          interestRate: member.financialInfo.interestRate || 0
        } : { 
          totalContributions: 0,
          currentBalance: 0, 
          outstandingAmount: 0,
          percentageOutstanding: 0,
          balanceBroughtForward: 0,
          plannedContributions: 0,
          actualContributions: 0,
          currentInterestEarned: 0,
          totalInterestEarned: 0,
          currentInterestCharged: 0,
          totalInterestCharged: 0,
          lastInterestCalculation: new Date(),
          interestRate: 0
        };
        
        return {
          ...member,
          memberNumber: member.memberNumber || '',
          personalInfo: member.personalInfo || { 
            firstName: '', 
            lastName: '', 
            fullName: 'Unknown Member' 
          },
          financialInfo: financialInfo,
          membershipStatus: member.membershipStatus || { 
            isActive: true, 
            standingCategory: 'good' 
          },
          interestSettings: member.interestSettings || {
            calculationMethod: 'daily',
            compounding: true,
            taxDeduction: 0
          },
          contributionHistory: member.contributionHistory || [],
          loanHistory: member.loanHistory || [],
          interestHistory: member.interestHistory || [],
          lastUpdated: member.lastUpdated || new Date()
        };
      });
      
      console.log('DEBUG: Setting members state');
      setMembers(safeMembers);
      setFilteredMembers(safeMembers);
      console.log('DEBUG: Members loaded successfully');
    } catch (error) {
      console.error('Error loading members:', error);
      // Fallback to empty array if Supabase fails
      setMembers([]);
      setFilteredMembers([]);
    } finally {
      console.log('DEBUG: Setting loading to false');
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    
    const loadMembersWithTimeout = async () => {
      try {
        await loadMembers();
      } catch (error) {
        console.error('Error in loadMembers:', error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Set a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (isMounted && loading) {
        console.warn('Members loading timeout - forcing loading to false');
        setLoading(false);
        // Optionally set an error state or show a message
        Alert.alert(
          'Loading Timeout',
          'Members list is taking longer than expected. Please try again.',
          [{ text: 'OK', onPress: () => {} }]
        );
      }
    }, 10000); // 10 second timeout

    loadMembersWithTimeout();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    let filtered = members;
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(member => 
        member.memberNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (member.personalInfo?.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.financialInfo.outstandingAmount.toString().includes(searchQuery)
      );
    }
    
    // Apply standing filter
    if (filter === 'good') {
      filtered = filtered.filter(member => member.membershipStatus.standingCategory === 'good');
    } else if (filter === 'owing') {
      filtered = filtered.filter(member => member.membershipStatus.standingCategory !== 'good');
    }
    
    setFilteredMembers(filtered);
  }, [searchQuery, filter, members]);

  const formatCurrency = (amount: number | undefined | null) => {
    // Handle null, undefined, or NaN by converting to 0
    // Note: Negative values are preserved (e.g., -5934.26 remains -5934.26)
    const safeAmount = amount === null || amount === undefined || isNaN(amount) ? 0 : amount;
    return `R ${safeAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
  };

  // NEW: Format balance display based on new business logic
  const formatBalanceDisplay = (balance: number | undefined | null) => {
    const safeBalance = balance === null || balance === undefined || isNaN(balance) ? 0 : balance;
    
    if (safeBalance > 0) {
      // Positive balance = Balance Due (member owes money)
      return {
        label: 'Balance Due',
        amount: safeBalance,
        color: '#F44336', // Red for owing
        isPositive: true
      };
    } else if (safeBalance < 0) {
      // Negative balance = Balance (member has credit)
      return {
        label: 'Balance',
        amount: Math.abs(safeBalance), // Show absolute value
        color: '#4CAF50', // Green for credit
        isPositive: false
      };
    } else {
      // Zero balance
      return {
        label: 'Balance',
        amount: 0,
        color: '#666666', // Gray for zero
        isPositive: false
      };
    }
  };

  const getStandingColor = (standing: string) => {
    switch (standing) {
      case 'good': return '#4CAF50';
      case 'owing_10': return '#FF9800';
      case 'owing_20': return '#FF5722';
      default: return '#F44336';
    }
  };

  const getStandingText = (standing: string) => {
    switch (standing) {
      case 'good': return 'Good Standing';
      case 'owing_10': return 'Owing 10%';
      case 'owing_20': return 'Owing 20%';
      case 'owing_30': return 'Owing 30%';
      case 'owing_50': return 'Owing 50%';
      case 'owing_65': return 'Owing 65%';
      case 'owing_65_plus': return 'Owing 65%+';
      default: return 'Unknown';
    }
  };

  // Load all users for role assignment
  const loadUsers = async () => {
    if (!currentUser || currentUser.role !== 'superuser') return;
    
    setLoadingUsers(true);
    try {
      const allUsers = await SupabaseUserService.getAllUsers();
      setUsers(allUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      Alert.alert('Error', 'Failed to load users');
    } finally {
      setLoadingUsers(false);
    }
  };

  // Assign role to user
  const assignRole = async (userId: string, newRole: UserRole) => {
    if (!currentUser || currentUser.role !== 'superuser') {
      Alert.alert('Permission Denied', 'Only superusers can assign roles');
      return;
    }

    try {
      await SupabaseUserService.updateUserRole(userId, newRole, currentUser.uid);
      Alert.alert('Success', `Role updated to ${newRole}`);
      setRoleDialogVisible(false);
      loadUsers(); // Refresh users list
    } catch (error) {
      console.error('Error assigning role:', error);
      Alert.alert('Error', 'Failed to assign role');
    }
  };

  // Link user to member
  const linkUserToMember = async (userId: string, memberNumber: string) => {
    if (!currentUser || currentUser.role !== 'superuser') {
      Alert.alert('Permission Denied', 'Only superusers can link users to members');
      return;
    }

    try {
      await SupabaseUserService.linkUserToMember(userId, memberNumber);
      Alert.alert('Success', `User linked to member ${memberNumber}`);
      setLinkDialogVisible(false);
      loadUsers(); // Refresh users list
    } catch (error) {
      console.error('Error linking user to member:', error);
      Alert.alert('Error', 'Failed to link user to member');
    }
  };

  // Open role assignment dialog
  const openRoleDialog = (user: User) => {
    if (currentUser?.role !== 'superuser') return;
    
    setSelectedUser(user);
    setSelectedRole(user.role);
    setRoleDialogVisible(true);
  };

  // Open member linking dialog
  const openLinkDialog = (user: User) => {
    if (currentUser?.role !== 'superuser') return;
    
    setSelectedUser(user);
    setSelectedMemberNumber(user.memberNumber || '');
    setLinkDialogVisible(true);
  };

  // Check if current user is superuser
  const isSuperUser = currentUser?.role === 'superuser';

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#228B22" />
        <Text style={styles.loadingText}>Loading members...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <Title style={styles.headerTitle}>Member Management</Title>
          <Text style={styles.headerSubtitle}>
            Manage and monitor member accounts and standings
          </Text>
        </Card.Content>
      </Card>

      {/* Search and Filters */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Search & Filter</Title>
          
          <Searchbar
            placeholder="Search by name, member number, or amount..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchBar}
          />
          
          <View style={styles.filterContainer}>
            <Chip
              selected={filter === 'all'}
              onPress={() => setFilter('all')}
              style={styles.filterChip}
              selectedColor={filter === 'all' ? 'white' : '#228B22'}
            >
              All Members
            </Chip>
            <Chip
              selected={filter === 'good'}
              onPress={() => setFilter('good')}
              style={styles.filterChip}
              selectedColor={filter === 'good' ? 'white' : '#228B22'}
            >
              Good Standing
            </Chip>
            <Chip
              selected={filter === 'owing'}
              onPress={() => setFilter('owing')}
              style={styles.filterChip}
              selectedColor={filter === 'owing' ? 'white' : '#228B22'}
            >
              Owing Members
            </Chip>
          </View>
        </Card.Content>
      </Card>

      {/* Member Statistics */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Member Statistics</Title>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{members.length}</Text>
              <Text style={styles.statLabel}>Total Members</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {members.filter(m => m.membershipStatus.standingCategory === 'good').length}
              </Text>
              <Text style={styles.statLabel}>Good Standing</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {members.filter(m => m.membershipStatus.standingCategory !== 'good').length}
              </Text>
              <Text style={styles.statLabel}>Owing</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Member List */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>
            {filteredMembers.length} {filter !== 'all' ? filter : ''} Members
          </Title>
          
            {filteredMembers.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  No members found matching your criteria
                </Text>
              </View>
            ) : (
              filteredMembers.map((member, index) => {
                // Ensure we have proper member name display
                const memberName = member.personalInfo?.fullName || 
                                 (member.personalInfo?.firstName && member.personalInfo?.lastName 
                                  ? `${member.personalInfo.firstName} ${member.personalInfo.lastName}`
                                  : `Member ${member.memberNumber}`);
                
                // Get balance display info
                const balanceDisplay = formatBalanceDisplay(member.financialInfo.currentBalance);
                
                return (
                  <View key={member.memberNumber}>
                    <List.Item
                      title={memberName}
                      description={`${member.memberNumber} • ${balanceDisplay.label}: ${formatCurrency(balanceDisplay.amount)} • Outstanding: ${formatCurrency(member.financialInfo.outstandingAmount)}`}
                      left={props => (
                        <List.Icon 
                          {...props} 
                          icon="account" 
                          color="#228B22"
                        />
                      )}
                      style={[
                        styles.memberItem,
                        index < filteredMembers.length - 1 && styles.memberItemBorder
                      ]}
                    />
                    <View style={styles.standingContainer}>
                      <Chip 
                        style={[styles.standingChip, { backgroundColor: getStandingColor(member.membershipStatus.standingCategory) }]}
                        textStyle={styles.standingChipText}
                      >
                        {getStandingText(member.membershipStatus.standingCategory)}
                      </Chip>
                    </View>
                  </View>
                );
              })
            )}
        </Card.Content>
      </Card>

      {/* Management Actions */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Management Actions</Title>
          <Button 
            mode="contained" 
            style={styles.actionButton}
            icon="account-plus"
          >
            Add New Member
          </Button>
          <Button 
            mode="outlined" 
            style={styles.actionButton}
            icon="file-export"
          >
            Export Member List
          </Button>
          <Button 
            mode="outlined" 
            style={styles.actionButton}
            icon="chart-bar"
          >
            View Member Analytics
          </Button>
        </Card.Content>
      </Card>

      {/* Superuser Management Section - Only visible to superusers */}
      {isSuperUser && (
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Superuser Management</Title>
            <Text style={styles.superuserSubtitle}>
              Advanced user management features
            </Text>
            
            <Button 
              mode="contained" 
              style={styles.actionButton}
              icon="account-multiple"
              onPress={loadUsers}
              loading={loadingUsers}
            >
              Manage User Roles
            </Button>
            <Button 
              mode="outlined" 
              style={styles.actionButton}
              icon="link"
              onPress={() => {
                loadUsers();
                Alert.alert('Info', 'Use the "Manage User Roles" button first to load users, then use the action menu on each user to link to members');
              }}
            >
              Link Users to Members
            </Button>
          </Card.Content>
        </Card>
      )}

      {/* User List for Superuser Management */}
      {isSuperUser && users.length > 0 && (
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>User Management ({users.length} users)</Title>
            
            {users.map((user, index) => (
              <List.Item
                key={user.uid}
                title={`${user.email} (${user.role})`}
                description={`Member: ${user.memberNumber || 'Not linked'} • Created: ${user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown date'}`}
                left={props => (
                  <List.Icon 
                    {...props} 
                    icon="account" 
                    color={user.role === 'superuser' ? '#FF5722' : user.role === 'admin' ? '#2196F3' : '#4CAF50'}
                  />
                )}
                right={props => (
                  <View style={styles.userActions}>
                    <Button 
                      mode="outlined" 
                      compact
                      onPress={() => openRoleDialog(user)}
                      style={styles.smallButton}
                    >
                      Change Role
                    </Button>
                    <Button 
                      mode="outlined" 
                      compact
                      onPress={() => openLinkDialog(user)}
                      style={styles.smallButton}
                    >
                      Link Member
                    </Button>
                  </View>
                )}
                style={[
                  styles.memberItem,
                  index < users.length - 1 && styles.memberItemBorder
                ]}
              />
            ))}
          </Card.Content>
        </Card>
      )}

      {/* Role Assignment Dialog */}
      <Portal>
        <Dialog visible={roleDialogVisible} onDismiss={() => setRoleDialogVisible(false)}>
          <Dialog.Title>Assign User Role</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Select a new role for {selectedUser?.email}</Paragraph>
            <View style={styles.roleOptions}>
              {(['superuser', 'admin', 'executive', 'member'] as UserRole[]).map(role => (
                <Chip
                  key={role}
                  selected={selectedRole === role}
                  onPress={() => setSelectedRole(role)}
                  style={styles.roleChip}
                  selectedColor="white"
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </Chip>
              ))}
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setRoleDialogVisible(false)}>Cancel</Button>
            <Button 
              onPress={() => selectedUser && assignRole(selectedUser.uid, selectedRole)}
              mode="contained"
            >
              Assign Role
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Member Linking Dialog */}
      <Portal>
        <Dialog visible={linkDialogVisible} onDismiss={() => setLinkDialogVisible(false)}>
          <Dialog.Title>Link User to Member</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Link {selectedUser?.email} to a member number</Paragraph>
            <TextInput
              label="Member Number"
              value={selectedMemberNumber}
              onChangeText={setSelectedMemberNumber}
              style={styles.memberInput}
              placeholder="e.g., M031, M041, 031, 041"
              autoCapitalize="characters"
            />
            <Paragraph style={styles.helpText}>
              Enter the member number this user should be linked to
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setLinkDialogVisible(false)}>Cancel</Button>
            <Button 
              onPress={() => selectedUser && linkUserToMember(selectedUser.uid, selectedMemberNumber)}
              mode="contained"
              disabled={!selectedMemberNumber}
            >
              Link Member
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  headerCard: {
    margin: 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
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
  searchBar: {
    marginBottom: 15,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterChip: {
    backgroundColor: '#f0f0f0',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#228B22',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  memberItem: {
    paddingVertical: 12,
  },
  memberItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  memberRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  standingContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  standingChip: {
    height: 28,
    minWidth: 80,
    justifyContent: 'center',
  },
  standingChipText: {
    fontSize: 11,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  actionButton: {
    marginBottom: 10,
  },
  superuserSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  userActions: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  smallButton: {
    minWidth: 0,
    paddingHorizontal: 8,
  },
  roleOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  roleChip: {
    backgroundColor: '#f0f0f0',
  },
  memberInput: {
    marginTop: 10,
  },
  helpText: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
  },
});

export default MembersScreen;
