import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { 
  Title, 
  Card, 
  Text, 
  Button, 
  ActivityIndicator,
  Chip,
  Divider
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useMockAuth } from '../contexts/MockAuthContext';
import RealMemberService from '../services/RealMemberService';
import { Member } from '../types/index';
import { PLFTheme } from '../theme/colors';

const DashboardScreen: React.FC = () => {
  const { currentUser, logout } = useMockAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [memberData, setMemberData] = useState<Member | null>(null);
  const [fundStats, setFundStats] = useState<any>(null);

  const loadDashboardData = async () => {
    try {
      // Load fund statistics for all roles
      const stats = await RealMemberService.getFundStatistics();
      setFundStats(stats);

      // Load member-specific data if user is a member
      if (currentUser?.role === 'member' && currentUser.memberNumber) {
        const member = await RealMemberService.getMemberByNumber(currentUser.memberNumber);
        setMemberData(member);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleApplyForLoan = () => {
    navigation.navigate('LoanApplication' as never);
  };

  const handleReviewLoans = () => {
    navigation.navigate('LoanApproval' as never);
  };

  useEffect(() => {
    loadDashboardData();
  }, [currentUser]);

  const onRefresh = () => {
    setRefreshing(true);
    loadDashboardData();
  };

  const formatCurrency = (amount: number) => {
    return `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
  };

  const getStandingColor = (standing: string) => {
    switch (standing) {
      case 'good': return PLFTheme.colors.success;
      case 'owing_10': return PLFTheme.colors.warning;
      case 'owing_20': return '#FF5722'; // Keeping orange-red for owing_20
      default: return PLFTheme.colors.error;
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
        <ActivityIndicator size="large" color={PLFTheme.colors.primaryGreen} />
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Welcome Section */}
      <Card style={styles.welcomeCard}>
        <Card.Content>
          <Title style={styles.welcomeTitle}>
            Welcome, {currentUser?.personalInfo.firstName}!
          </Title>
          <Text style={styles.roleText}>
            Role: {currentUser?.role?.toUpperCase()}
          </Text>
          <Text style={styles.roleText}>
            Email: {currentUser?.email}
          </Text>
          <Button 
            mode="outlined" 
            onPress={logout}
            style={styles.logoutButton}
            labelStyle={styles.logoutButtonText}
          >
            Logout
          </Button>
        </Card.Content>
      </Card>

      {/* Fund Overview - Visible to all roles */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Fund Overview</Title>
          {fundStats && (
            <>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Total Members:</Text>
                <Text style={styles.statValue}>{fundStats.totalMembers}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Total Fund Value:</Text>
                <Text style={styles.statValue}>{formatCurrency(fundStats.totalFundValue)}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Outstanding Loans:</Text>
                <Text style={styles.statValue}>{formatCurrency(fundStats.totalLoansOutstanding)}</Text>
              </View>
            </>
          )}
        </Card.Content>
      </Card>

      {/* Member-specific information */}
      {currentUser?.role === 'member' && memberData && (
        <>
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>My Membership</Title>
              <View style={styles.membershipInfo}>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Member Number:</Text>
                  <Text style={styles.statValue}>{memberData.memberNumber}</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Standing:</Text>
                  <Chip 
                    style={[styles.standingChip, { backgroundColor: getStandingColor(memberData.membershipStatus.standingCategory) }]}
                    textStyle={styles.standingChipText}
                  >
                    {getStandingText(memberData.membershipStatus.standingCategory)}
                  </Chip>
                </View>
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>My Financial Summary</Title>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Current Balance:</Text>
                <Text style={styles.statValue}>{formatCurrency(memberData.financialInfo.currentBalance)}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Total Contributions:</Text>
                <Text style={styles.statValue}>{formatCurrency(memberData.financialInfo.totalContributions)}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Outstanding Amount:</Text>
                <Text style={[styles.statValue, { color: PLFTheme.colors.error }]}>
                  {formatCurrency(memberData.financialInfo.outstandingAmount)}
                </Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Planned Contributions:</Text>
                <Text style={styles.statValue}>{formatCurrency(memberData.financialInfo.plannedContributions)}</Text>
              </View>
            </Card.Content>
          </Card>
        </>
      )}

      {/* SuperUser/Admin specific information */}
      {(currentUser?.role === 'superuser' || currentUser?.role === 'admin') && fundStats && (
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Member Standing Summary</Title>
            <View style={styles.standingSummary}>
              <View style={styles.standingRow}>
                <Text style={styles.standingLabel}>Good Standing:</Text>
                <Text style={styles.standingCount}>{fundStats.membersByStanding.good}</Text>
              </View>
              <View style={styles.standingRow}>
                <Text style={styles.standingLabel}>Owing 10%:</Text>
                <Text style={styles.standingCount}>{fundStats.membersByStanding.owing_10}</Text>
              </View>
              <View style={styles.standingRow}>
                <Text style={styles.standingLabel}>Owing 20%:</Text>
                <Text style={styles.standingCount}>{fundStats.membersByStanding.owing_20}</Text>
              </View>
              <View style={styles.standingRow}>
                <Text style={styles.standingLabel}>Owing 30%:</Text>
                <Text style={styles.standingCount}>{fundStats.membersByStanding.owing_30}</Text>
              </View>
              <View style={styles.standingRow}>
                <Text style={styles.standingLabel}>Owing 50%:</Text>
                <Text style={styles.standingCount}>{fundStats.membersByStanding.owing_50}</Text>
              </View>
              <View style={styles.standingRow}>
                <Text style={styles.standingLabel}>Owing 65%:</Text>
                <Text style={styles.standingCount}>{fundStats.membersByStanding.owing_65}</Text>
              </View>
              <View style={styles.standingRow}>
                <Text style={styles.standingLabel}>Owing 65%+:</Text>
                <Text style={styles.standingCount}>{fundStats.membersByStanding.owing_65_plus}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Quick Actions */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Quick Actions</Title>
          <View style={styles.actionButtons}>
            {currentUser?.role === 'member' && (
              <>
                <Button mode="contained" style={styles.actionButton}>
                  Make Deposit
                </Button>
                <Button mode="outlined" style={styles.actionButton} onPress={handleApplyForLoan}>
                  Request Loan
                </Button>
                <Button mode="outlined" style={styles.actionButton}>
                  View Statements
                </Button>
              </>
            )}
            
            {(currentUser?.role === 'superuser' || currentUser?.role === 'admin') && (
              <>
                <Button mode="contained" style={styles.actionButton} onPress={() => navigation.navigate('DepositApproval' as never)}>
                  Approve Deposits
                </Button>
                <Button mode="outlined" style={styles.actionButton} onPress={handleReviewLoans}>
                  Review Loans
                </Button>
                <Button mode="outlined" style={styles.actionButton}>
                  Member Management
                </Button>
              </>
            )}
            
            {currentUser?.role === 'superuser' && (
              <>
                <Button mode="outlined" style={styles.actionButton}>
                  User Management
                </Button>
                <Button mode="outlined" style={styles.actionButton}>
                  System Reports
                </Button>
              </>
            )}
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PLFTheme.colors.lightGray,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PLFTheme.colors.lightGray,
  },
  loadingText: {
    marginTop: PLFTheme.spacing.sm,
    fontSize: 16,
    color: PLFTheme.colors.darkGray,
  },
  welcomeCard: {
    margin: PLFTheme.spacing.lg,
    marginBottom: PLFTheme.spacing.sm,
    backgroundColor: PLFTheme.colors.primaryGreen,
  },
  welcomeTitle: {
    color: PLFTheme.colors.white,
    fontSize: 24,
  },
  roleText: {
    color: PLFTheme.colors.white,
    fontSize: 14,
    opacity: 0.9,
  },
  logoutButton: {
    marginTop: PLFTheme.spacing.md,
    borderColor: PLFTheme.colors.white,
  },
  logoutButtonText: {
    color: PLFTheme.colors.white,
  },
  card: {
    margin: PLFTheme.spacing.lg,
    marginTop: PLFTheme.spacing.sm,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: PLFTheme.spacing.md,
    color: PLFTheme.colors.primaryGold,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: PLFTheme.spacing.sm,
  },
  statLabel: {
    fontSize: 14,
    color: PLFTheme.colors.darkGray,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PLFTheme.colors.black,
  },
  membershipInfo: {
    marginTop: PLFTheme.spacing.sm,
  },
  standingChip: {
    alignSelf: 'flex-start',
  },
  standingChipText: {
    color: PLFTheme.colors.white,
    fontSize: 12,
  },
  standingSummary: {
    marginTop: PLFTheme.spacing.sm,
  },
  standingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  standingLabel: {
    fontSize: 14,
    color: PLFTheme.colors.darkGray,
  },
  standingCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PLFTheme.colors.black,
  },
  actionButtons: {
    marginTop: PLFTheme.spacing.md,
  },
  actionButton: {
    marginBottom: PLFTheme.spacing.sm,
  },
});

export default DashboardScreen;
