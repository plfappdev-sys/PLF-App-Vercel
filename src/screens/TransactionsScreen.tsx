import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Title, 
  Card, 
  Text, 
  Button,
  List,
  ActivityIndicator,
  Chip
} from 'react-native-paper';
import { useAuth } from '../../AppSimple';
import MockMemberService from '../services/MockMemberService';

interface Transaction {
  transactionId: string;
  memberNumber: string;
  type: 'deposit' | 'loan_disbursement' | 'loan_repayment' | 'penalty' | 'interest';
  amount: number;
  description: string;
  date: Date;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
}

const TransactionsScreen: React.FC = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');

  const loadTransactions = async () => {
    try {
      const recentTransactions = await MockMemberService.getRecentTransactions();
      setTransactions(recentTransactions);
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const formatCurrency = (amount: number) => {
    return `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#4CAF50';
      case 'pending': return '#FF9800';
      case 'rejected': return '#F44336';
      default: return '#666';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit': return 'cash-plus';
      case 'loan_disbursement': return 'bank-transfer-out';
      case 'loan_repayment': return 'bank-transfer-in';
      case 'penalty': return 'alert-circle';
      case 'interest': return 'percent';
      default: return 'cash';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true;
    return transaction.status === filter;
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#228B22" />
        <Text style={styles.loadingText}>Loading transactions...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <Title style={styles.headerTitle}>Transaction History</Title>
          <Text style={styles.headerSubtitle}>
            View and manage your financial transactions
          </Text>
        </Card.Content>
      </Card>

      {/* Filter Options */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Filter Transactions</Title>
          <View style={styles.filterContainer}>
            <Chip
              selected={filter === 'all'}
              onPress={() => setFilter('all')}
              style={styles.filterChip}
              selectedColor={filter === 'all' ? 'white' : '#228B22'}
            >
              All
            </Chip>
            <Chip
              selected={filter === 'pending'}
              onPress={() => setFilter('pending')}
              style={styles.filterChip}
              selectedColor={filter === 'pending' ? 'white' : '#228B22'}
            >
              Pending
            </Chip>
            <Chip
              selected={filter === 'approved'}
              onPress={() => setFilter('approved')}
              style={styles.filterChip}
              selectedColor={filter === 'approved' ? 'white' : '#228B22'}
            >
              Approved
            </Chip>
          </View>
        </Card.Content>
      </Card>

      {/* Transaction List */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>
            {filter === 'all' ? 'All Transactions' : 
             filter === 'pending' ? 'Pending Transactions' : 'Approved Transactions'}
          </Title>
          
          {filteredTransactions.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No {filter !== 'all' ? filter : ''} transactions found
              </Text>
            </View>
          ) : (
            filteredTransactions.map((transaction, index) => (
              <List.Item
                key={transaction.transactionId}
                title={transaction.description}
                description={`${formatDate(transaction.date)} • ${transaction.memberNumber}`}
                left={props => (
                  <List.Icon 
                    {...props} 
                    icon={getTypeIcon(transaction.type)} 
                    color="#228B22"
                  />
                )}
                right={props => (
                  <View style={styles.transactionRight}>
                    <Text style={styles.amountText}>
                      {formatCurrency(transaction.amount)}
                    </Text>
                    <Chip 
                      style={[styles.statusChip, { backgroundColor: getStatusColor(transaction.status) }]}
                      textStyle={styles.statusChipText}
                    >
                      {transaction.status.toUpperCase()}
                    </Chip>
                  </View>
                )}
                style={[
                  styles.transactionItem,
                  index < filteredTransactions.length - 1 && styles.transactionItemBorder
                ]}
              />
            ))
          )}
        </Card.Content>
      </Card>

      {/* Quick Actions */}
      {currentUser?.role === 'member' && (
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Quick Actions</Title>
            <Button 
              mode="contained" 
              style={styles.actionButton}
              icon="cash-plus"
            >
              Make New Deposit
            </Button>
            <Button 
              mode="outlined" 
              style={styles.actionButton}
              icon="bank-transfer-out"
            >
              Request Loan
            </Button>
          </Card.Content>
        </Card>
      )}

      {/* Admin Actions */}
      {(currentUser?.role === 'superuser' || currentUser?.role === 'admin') && (
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Admin Actions</Title>
            <Button 
              mode="contained" 
              style={styles.actionButton}
              icon="check-circle"
            >
              Review Pending Transactions
            </Button>
            <Button 
              mode="outlined" 
              style={styles.actionButton}
              icon="file-document"
            >
              Generate Transaction Report
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
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterChip: {
    backgroundColor: '#f0f0f0',
  },
  transactionItem: {
    paddingVertical: 12,
  },
  transactionItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transactionRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusChip: {
    height: 24,
  },
  statusChipText: {
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

export default TransactionsScreen;
