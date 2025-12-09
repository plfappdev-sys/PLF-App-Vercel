import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, Modal } from 'react-native';
import { 
  Title, 
  Card, 
  Text, 
  Button,
  List,
  ActivityIndicator,
  Chip,
  TextInput,
  HelperText,
  Portal,
  Dialog
} from 'react-native-paper';
import { useAuth } from '../contexts/SupabaseAuthContext';
import RealMemberService from '../services/RealMemberService';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/index';
import { SupabaseTransactionServiceFixed } from '../services/supabaseTransactionService_fixed';

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
  const { user: currentUser } = useAuth();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');
  const [depositModalVisible, setDepositModalVisible] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [depositDescription, setDepositDescription] = useState('');
  const [depositProof, setDepositProof] = useState('');
  const [submittingDeposit, setSubmittingDeposit] = useState(false);
  const [depositError, setDepositError] = useState('');

  const loadTransactions = async () => {
    try {
      const recentTransactions = await RealMemberService.getRecentTransactions();
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

  const handleRequestLoan = () => {
    navigation.navigate('LoanApplication');
  };

  const handleMakeDeposit = () => {
    setDepositModalVisible(true);
  };

  const handleSubmitDeposit = async () => {
    if (!currentUser?.memberNumber) {
      Alert.alert('Error', 'Member number not found');
      return;
    }

    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      setDepositError('Please enter a valid deposit amount');
      return;
    }

    if (!depositDescription.trim()) {
      setDepositError('Please enter a description for the deposit');
      return;
    }

    setSubmittingDeposit(true);
    setDepositError('');

    try {
      await SupabaseTransactionServiceFixed.createDeposit({
        memberNumber: currentUser.memberNumber,
        amount: amount,
        description: depositDescription,
        proofOfPayment: depositProof || undefined
      });

      Alert.alert(
        'Success',
        'Deposit request submitted successfully! It will be reviewed by an administrator.',
        [
          {
            text: 'OK',
            onPress: () => {
              setDepositModalVisible(false);
              setDepositAmount('');
              setDepositDescription('');
              setDepositProof('');
              loadTransactions(); // Refresh transactions
            }
          }
        ]
      );
    } catch (error: any) {
      console.error('Error submitting deposit:', error);
      setDepositError(error.message || 'Failed to submit deposit. Please try again.');
    } finally {
      setSubmittingDeposit(false);
    }
  };

  const handleReviewPendingTransactions = () => {
    navigation.navigate('DepositApproval');
  };

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
              onPress={handleMakeDeposit}
            >
              Make New Deposit
            </Button>
            <Button 
              mode="outlined" 
              style={styles.actionButton}
              icon="bank-transfer-out"
              onPress={handleRequestLoan}
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
              onPress={handleReviewPendingTransactions}
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

      {/* Deposit Modal */}
      <Portal>
        <Modal
          visible={depositModalVisible}
          onDismiss={() => setDepositModalVisible(false)}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContainer}>
            <Card style={styles.modalCard}>
              <Card.Content>
                <Title style={styles.modalTitle}>Make New Deposit</Title>
                
                <TextInput
                  label="Amount *"
                  value={depositAmount}
                  onChangeText={setDepositAmount}
                  keyboardType="numeric"
                  style={styles.modalInput}
                  left={<TextInput.Affix text="R " />}
                  placeholder="Enter deposit amount"
                />
                
                <TextInput
                  label="Description *"
                  value={depositDescription}
                  onChangeText={setDepositDescription}
                  style={styles.modalInput}
                  multiline
                  numberOfLines={2}
                  placeholder="Describe the purpose of this deposit"
                />
                
                <TextInput
                  label="Proof of Payment URL (Optional)"
                  value={depositProof}
                  onChangeText={setDepositProof}
                  style={styles.modalInput}
                  placeholder="Link to proof of payment (e.g., bank statement screenshot)"
                />
                
                {depositError ? (
                  <HelperText type="error" style={styles.errorText}>
                    {depositError}
                  </HelperText>
                ) : null}
                
                <View style={styles.modalButtons}>
                  <Button
                    mode="outlined"
                    onPress={() => setDepositModalVisible(false)}
                    style={styles.modalButton}
                    disabled={submittingDeposit}
                  >
                    Cancel
                  </Button>
                  <Button
                    mode="contained"
                    onPress={handleSubmitDeposit}
                    style={styles.modalButton}
                    loading={submittingDeposit}
                    disabled={submittingDeposit}
                  >
                    Submit Deposit
                  </Button>
                </View>
                
                <Text style={styles.modalNote}>
                  Note: All deposits require approval from an executive committee member or superuser.
                  Please ensure you provide proof of payment for faster processing.
                </Text>
              </Card.Content>
            </Card>
          </View>
        </Modal>
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 400,
  },
  modalCard: {
    padding: 0,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  modalInput: {
    marginBottom: 15,
  },
  errorText: {
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 15,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  modalNote: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default TransactionsScreen;
