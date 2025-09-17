import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Title, 
  Card, 
  Text, 
  Button,
  List,
  ActivityIndicator,
  Chip,
  Searchbar
} from 'react-native-paper';
import { useAuth } from '../contexts/SupabaseAuthContext';
import RealMemberService from '../services/RealMemberService';
import { Member } from '../types/index';

const MembersScreen: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'good' | 'owing'>('all');

  const loadMembers = async () => {
    try {
      const allMembers = await RealMemberService.getAllMembers();
      setMembers(allMembers);
      setFilteredMembers(allMembers);
    } catch (error) {
      console.error('Error loading members:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
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

  const formatCurrency = (amount: number) => {
    return `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
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
            filteredMembers.map((member, index) => (
              <List.Item
                key={member.memberNumber}
                title={`${member.personalInfo?.fullName || `Member ${member.memberNumber}`} (${member.memberNumber})`}
                description={`Balance: ${formatCurrency(member.financialInfo.currentBalance)} • Outstanding: ${formatCurrency(member.financialInfo.outstandingAmount)}`}
                left={props => (
                  <List.Icon 
                    {...props} 
                    icon="account" 
                    color="#228B22"
                  />
                )}
                right={props => (
                  <View style={styles.memberRight}>
                    <Chip 
                      style={[styles.standingChip, { backgroundColor: getStandingColor(member.membershipStatus.standingCategory) }]}
                      textStyle={styles.standingChipText}
                    >
                      {getStandingText(member.membershipStatus.standingCategory)}
                    </Chip>
                  </View>
                )}
                style={[
                  styles.memberItem,
                  index < filteredMembers.length - 1 && styles.memberItemBorder
                ]}
              />
            ))
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
  standingChip: {
    height: 24,
  },
  standingChipText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
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
});

export default MembersScreen;
