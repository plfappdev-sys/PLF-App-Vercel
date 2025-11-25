import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { 
  Title, 
  Card, 
  Text, 
  Button, 
  ActivityIndicator,
  Chip,
  Divider,
  List,
  IconButton
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/SupabaseAuthContext';
import { SupabaseMemberService } from '../services/supabaseMemberService';
import { SupabaseTransactionService } from '../services/supabaseTransactionService';
import { Member, Transaction } from '../types/index';
import { PLFTheme } from '../theme/colors';

const MyFundsScreen: React.FC = () => {
  const { user: currentUser } = useAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [memberData, setMemberData] = useState<Member | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  const loadMyFundsData = async () => {
    try {
      setLoading(true);
      
      // Get member data if user has a member number
      if (currentUser?.memberNumber) {
        const member = await SupabaseMemberService.getMemberByNumber(currentUser.memberNumber);
        setMemberData(member);
        
        // Get recent transactions for this member
        const memberTransactions = await SupabaseTransactionService.getMemberTransactions(
          currentUser.memberNumber,
          undefined, // no filters
          20 // limit to 20 transactions
        );
        setTransactions(memberTransactions);
      }
    } catch (error) {
      console.error('Error loading My Funds data:', error);
      // Fallback to mock data or handle error appropriately
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadMyFundsData();
  }, [currentUser]);

  const onRefresh = () => {
    setRefreshing(true);
    loadMyFundsData();
  };

  const formatCurrency = (amount: number | undefined | null) => {
    const safeAmount = amount || 0;
    return `R ${safeAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit': return 'arrow-down-circle';
      case 'loan_disbursement': return 'cash';
      case 'loan_repayment': return 'arrow-up-circle';
      case 'interest_earned': return 'trending-up';
      case 'interest_charged': return 'trending-down';
      case 'penalty': return 'alert-circle';
      default: return 'help-circle';
    }
  };

  const getTransactionColor = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
      case 'interest_earned':
        return PLFTheme.colors.success;
      case 'loan_repayment':
        return PLFTheme.colors.primaryGold;
      case 'loan_disbursement':
      case 'interest_charged':
      case 'penalty':
        return PLFTheme.colors.error;
      default:
        return PLFTheme.colors.darkGray;
    }
  };

  const getStandingColor = (standing: string) => {
    switch (standing) {
      case 'good': return PLFTheme.colors.success;
      case 'owing_10': return PLFTheme.colors.warning;
      case 'owing_20': return '#FF5722';
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

  const handleApplyForLoan = () => {
    navigation.navigate('LoanApplication' as never);
  };

  const handleMakeDeposit = () => {
    // TODO: Implement deposit functionality
    console.log('Make deposit clicked');
  };

  const handleViewStatement = () => {
    // TODO: Implement statement view functionality
    console.log('View statement clicked');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={PLFTheme.colors.primaryGreen} />
        <Text style={styles.loadingText}>Loading your funds...</Text>
      </View>
    );
  }

  if (!currentUser?.memberNumber) {
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>My Funds</Title>
            <Text style={styles.noMemberText}>
              You are not linked to a member account. Please contact administration to link your account.
            </Text>
          </Card.Content>
        </Card>
      </View>
    );
  }

  const displayedTransactions = showAllTransactions ? transactions : transactions.slice(0, 5);

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Welcome Header */}
      <Card style={styles.welcomeCard}>
        <Card.Content>
          <Title style={styles.welcomeTitle}>My Funds</Title>
          <Text style={styles.welcomeSubtitle}>
            Overview of your financial position with PLF
          </Text>
        </Card.Content>
      </Card>

      {/* Membership Status */}
      {memberData && (
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Membership Status</Title>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Member Number:</Text>
              <Text style={styles.statValue}>{memberData.memberNumber}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Standing:</Text>
              <Chip 
                style={[styles.standingChip, { 
                  backgroundColor: getStandingColor(memberData.membershipStatus.standingCategory) 
                }]}
                textStyle={styles.standingChipText}
              >
                {getStandingText(memberData.membershipStatus.standingCategory)}
              </Chip>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Account Status:</Text>
              <Text style={[
                styles.statValue, 
                { color: memberData.membershipStatus.isActive ? PLFTheme.colors.success : PLFTheme.colors.error }
              ]}>
                {memberData.membershipStatus.isActive ? 'Active' : 'Inactive'}
              </Text>
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Financial Summary */}
      {memberData && (
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Financial Summary</Title>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Current Balance:</Text>
              <Text style={[styles.statValue, { color: PLFTheme.colors.primaryGreen }]}>
                {formatCurrency(memberData.financialInfo.currentBalance)}
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Total Contributions:</Text>
              <Text style={styles.statValue}>
                {formatCurrency(memberData.financialInfo.totalContributions)}
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Outstanding Amount:</Text>
              <Text style={[styles.statValue, { color: PLFTheme.colors.error }]}>
                {formatCurrency(memberData.financialInfo.outstandingAmount)}
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Planned Contributions:</Text>
              <Text style={styles.statValue}>
                {formatCurrency(memberData.financialInfo.plannedContributions)}
              </Text>
            </View>
            
            {/* Interest Information */}
            <Divider style={styles.divider} />
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Interest Earned:</Text>
              <Text style={[styles.statValue, { color: PLFTheme.colors.success }]}>
                {formatCurrency(memberData.financialInfo.totalInterestEarned || 0)}
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Interest Charged:</Text>
              <Text style={[styles.statValue, { color: PLFTheme.colors.error }]}>
                {formatCurrency(memberData.financialInfo.totalInterestCharged || 0)}
              </Text>
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Quick Actions */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Quick Actions</Title>
          <View style={styles.actionButtons}>
            <Button 
              mode="contained" 
              style={styles.actionButton}
              onPress={handleMakeDeposit}
              icon="bank-transfer-in"
            >
              Make Deposit
            </Button>
            <Button 
              mode="outlined" 
              style={styles.actionButton}
              onPress={handleApplyForLoan}
              icon="cash"
            >
              Apply for Loan
            </Button>
            <Button 
              mode="outlined" 
              style={styles.actionButton}
              onPress={handleViewStatement}
              icon="file-document"
            >
              View Statement
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* Recent Transactions */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.transactionHeader}>
            <Title style={styles.cardTitle}>Recent Transactions</Title>
            {transactions.length > 5 && (
              <Button 
                mode="text" 
                onPress={() => setShowAllTransactions(!showAllTransactions)}
                style={styles.viewAllButton}
              >
                {showAllTransactions ? 'Show Less' : `View All (${transactions.length})`}
              </Button>
            )}
          </View>
          
          {displayedTransactions.length === 0 ? (
            <Text style={styles.noTransactionsText}>No transactions found</Text>
          ) : (
            displayedTransactions.map((transaction, index) => (
              <View key={transaction.transactionId || index}>
                <List.Item
                  title={transaction.description}
                  description={formatDate(transaction.date)}
                  left={props => (
                    <List.Icon 
                      {...props} 
                      icon={getTransactionIcon(transaction.type)} 
                      color={getTransactionColor(transaction.type)}
                    />
                  )}
                  right={props => (
                    <Text 
                      style={[
                        styles.transactionAmount,
                        { color: getTransactionColor(transaction.type) }
                      ]}
                    >
                      {formatCurrency(transaction.amount)}
                    </Text>
                  )}
                  style={styles.transactionItem}
                />
                {index < displayedTransactions.length - 1 && <Divider />}
              </View>
            ))
          )}
        </Card.Content>
      </Card>

      {/* Overdue Alerts */}
      {memberData && memberData.financialInfo.outstandingAmount > 0 && (
        <Card style={[styles.card, styles.alertCard]}>
          <Card.Content>
            <View style={styles.alertHeader}>
              <List.Icon icon="alert" color={PLFTheme.colors.error} />
              <Title style={[styles.cardTitle, { color: PLFTheme.colors.error }]}>
                Attention Required
              </Title>
            </View>
            <Text style={styles.alertText}>
              You have an outstanding amount of {formatCurrency(memberData.financialInfo.outstandingAmount)}. 
              Please make arrangements to settle this amount.
            </Text>
            <Button 
              mode="contained" 
              style={styles.alertButton}
              onPress={handleMakeDeposit}
              buttonColor={PLFTheme.colors.error}
            >
              Make Payment
            </Button>
          </Card.Content>
        </Card>
      )}
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
  welcomeSubtitle: {
    color: PLFTheme.colors.white,
    fontSize: 14,
    opacity: 0.9,
  },
  card: {
    margin: PLFTheme.spacing.lg,
    marginTop: PLFTheme.spacing.sm,
  },
  alertCard: {
    borderColor: PLFTheme.colors.error,
    borderWidth: 1,
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
  standingChip: {
    alignSelf: 'flex-start',
  },
  standingChipText: {
    color: PLFTheme.colors.white,
    fontSize: 12,
  },
  divider: {
    marginVertical: PLFTheme.spacing.md,
  },
  actionButtons: {
    marginTop: PLFTheme.spacing.md,
  },
  actionButton: {
    marginBottom: PLFTheme.spacing.sm,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: PLFTheme.spacing.md,
  },
  viewAllButton: {
    alignSelf: 'flex-start',
  },
  transactionItem: {
    paddingVertical: PLFTheme.spacing.sm,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  noTransactionsText: {
    textAlign: 'center',
    color: PLFTheme.colors.darkGray,
    fontStyle: 'italic',
    marginVertical: PLFTheme.spacing.lg,
  },
  noMemberText: {
    textAlign: 'center',
    color: PLFTheme.colors.darkGray,
    marginVertical: PLFTheme.spacing.lg,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: PLFTheme.spacing.sm,
  },
  alertText: {
    color: PLFTheme.colors.darkGray,
    marginBottom: PLFTheme.spacing.md,
  },
  alertButton: {
    alignSelf: 'flex-start',
  },
});

export default MyFundsScreen;
