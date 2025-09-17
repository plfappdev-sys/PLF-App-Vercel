import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  Title, 
  Card, 
  Text, 
  Button, 
  ActivityIndicator,
  Chip,
  Divider,
  TextInput,
  List,
  IconButton
} from 'react-native-paper';
import { useAuth } from '../contexts/SupabaseAuthContext';
import MockLoanService from '../services/MockLoanService';
import { Loan } from '../types/index';

const LoanApprovalScreen: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [pendingLoans, setPendingLoans] = useState<Loan[]>([]);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [approvalNotes, setApprovalNotes] = useState('');
  const [conditions, setConditions] = useState<string[]>(['']);
  const [rejectionReason, setRejectionReason] = useState('');

  const loadPendingLoans = async () => {
    try {
      const loans = await MockLoanService.getPendingLoans();
      setPendingLoans(loans);
    } catch (error) {
      console.error('Error loading pending loans:', error);
      Alert.alert('Error', 'Failed to load pending loans');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadPendingLoans();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadPendingLoans();
  };

  const formatCurrency = (amount: number) => {
    return `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#FF9800';
      case 'under_review': return '#2196F3';
      case 'approved': return '#4CAF50';
      case 'rejected': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'under_review': return 'Under Review';
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
      default: return status;
    }
  };

  const handleApproveLoan = async () => {
    if (!selectedLoan || !currentUser?.email) return;

    try {
      const result = await MockLoanService.approveLoan(
        selectedLoan.loanId,
        currentUser.email,
        approvalNotes,
        conditions.filter(cond => cond.trim())
      );

      if (result.success) {
        Alert.alert('Success', 'Loan approved successfully');
        setSelectedLoan(null);
        setApprovalNotes('');
        setConditions(['']);
        loadPendingLoans();
      } else {
        Alert.alert('Error', result.error || 'Failed to approve loan');
      }
    } catch (error) {
      console.error('Error approving loan:', error);
      Alert.alert('Error', 'Failed to approve loan');
    }
  };

  const handleRejectLoan = async () => {
    if (!selectedLoan || !currentUser?.email || !rejectionReason.trim()) {
      Alert.alert('Error', 'Please provide a rejection reason');
      return;
    }

    try {
      const result = await MockLoanService.rejectLoan(
        selectedLoan.loanId,
        currentUser.email,
        rejectionReason
      );

      if (result.success) {
        Alert.alert('Success', 'Loan rejected successfully');
        setSelectedLoan(null);
        setRejectionReason('');
        loadPendingLoans();
      } else {
        Alert.alert('Error', result.error || 'Failed to reject loan');
      }
    } catch (error) {
      console.error('Error rejecting loan:', error);
      Alert.alert('Error', 'Failed to reject loan');
    }
  };

  const addCondition = () => {
    setConditions([...conditions, '']);
  };

  const updateCondition = (index: number, value: string) => {
    const newConditions = [...conditions];
    newConditions[index] = value;
    setConditions(newConditions);
  };

  const removeCondition = (index: number) => {
    if (conditions.length > 1) {
      const newConditions = conditions.filter((_, i) => i !== index);
      setConditions(newConditions);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#228B22" />
        <Text style={styles.loadingText}>Loading loan applications...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <Title style={styles.headerTitle}>Loan Approval</Title>
          <Text style={styles.headerSubtitle}>
            Review and approve/reject pending loan applications
          </Text>
          <Text style={styles.loanCount}>
            {pendingLoans.length} pending loan{pendingLoans.length !== 1 ? 's' : ''}
          </Text>
        </Card.Content>
      </Card>

      {/* Pending Loans List */}
      {pendingLoans.length > 0 ? (
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Pending Applications</Title>
            {pendingLoans.map((loan) => (
              <View key={loan.loanId} style={styles.loanItem}>
                <View style={styles.loanInfo}>
                  <Text style={styles.loanId}>{loan.loanId}</Text>
                  <Text style={styles.memberNumber}>
                    Member: {loan.memberNumber}
                  </Text>
                  <Text style={styles.loanAmount}>
                    Amount: {formatCurrency(loan.applicationDetails.requestedAmount)}
                  </Text>
                  <Text style={styles.loanPurpose}>
                    Purpose: {loan.applicationDetails.purpose}
                  </Text>
                  <View style={styles.statusContainer}>
                    <Chip 
                      style={[styles.statusChip, { backgroundColor: getStatusColor(loan.approvalProcess.status) }]}
                      textStyle={styles.statusChipText}
                    >
                      {getStatusText(loan.approvalProcess.status)}
                    </Chip>
                  </View>
                </View>
                <Button 
                  mode="outlined" 
                  onPress={() => setSelectedLoan(loan)}
                  style={styles.reviewButton}
                >
                  Review
                </Button>
              </View>
            ))}
          </Card.Content>
        </Card>
      ) : (
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>No Pending Applications</Title>
            <Text style={styles.emptyText}>
              There are currently no loan applications pending approval.
            </Text>
          </Card.Content>
        </Card>
      )}

      {/* Loan Review Modal (simulated with conditional rendering) */}
      {selectedLoan && (
        <Card style={[styles.card, styles.reviewCard]}>
          <Card.Content>
            <View style={styles.reviewHeader}>
              <Title style={styles.reviewTitle}>Review Loan Application</Title>
              <IconButton
                icon="close"
                size={20}
                onPress={() => setSelectedLoan(null)}
                style={styles.closeButton}
              />
            </View>

            <Text style={styles.loanDetail}>Loan ID: {selectedLoan.loanId}</Text>
            <Text style={styles.loanDetail}>Member: {selectedLoan.memberNumber}</Text>
            <Text style={styles.loanDetail}>
              Requested Amount: {formatCurrency(selectedLoan.applicationDetails.requestedAmount)}
            </Text>
            <Text style={styles.loanDetail}>
              Purpose: {selectedLoan.applicationDetails.purpose}
            </Text>

            <Divider style={styles.divider} />

            {/* Guarantors */}
            <Title style={styles.sectionTitle}>Guarantors</Title>
            {selectedLoan.applicationDetails.guarantors.map((guarantor, index) => (
              <View key={index} style={styles.guarantorItem}>
                <Text style={styles.guarantorText}>
                  Member {guarantor.memberNumber} - {formatCurrency(guarantor.guaranteeAmount)}
                </Text>
                <Chip 
                  style={[styles.guarantorStatus, { 
                    backgroundColor: guarantor.status === 'confirmed' ? '#4CAF50' : 
                                    guarantor.status === 'pending' ? '#FF9800' : '#F44336'
                  }]}
                  textStyle={styles.guarantorStatusText}
                >
                  {guarantor.status}
                </Chip>
              </View>
            ))}

            <Divider style={styles.divider} />

            {/* Approval Section */}
            <Title style={styles.sectionTitle}>Approval Decision</Title>
            
            <TextInput
              label="Approval Notes (Optional)"
              value={approvalNotes}
              onChangeText={setApprovalNotes}
              style={styles.input}
              multiline
              numberOfLines={3}
              placeholder="Add any notes about this approval..."
            />

            <Title style={styles.conditionsTitle}>Conditions</Title>
            {conditions.map((condition, index) => (
              <View key={index} style={styles.conditionRow}>
                <TextInput
                  value={condition}
                  onChangeText={(text) => updateCondition(index, text)}
                  style={styles.conditionInput}
                  placeholder={`Condition ${index + 1}`}
                />
                {conditions.length > 1 && (
                  <IconButton
                    icon="delete"
                    size={20}
                    onPress={() => removeCondition(index)}
                    style={styles.deleteConditionButton}
                  />
                )}
              </View>
            ))}
            <Button mode="outlined" onPress={addCondition} style={styles.addConditionButton}>
              Add Condition
            </Button>

            <View style={styles.approvalButtons}>
              <Button 
                mode="contained" 
                onPress={handleApproveLoan}
                style={styles.approveButton}
                icon="check"
              >
                Approve Loan
              </Button>
            </View>

            <Divider style={styles.divider} />

            {/* Rejection Section */}
            <Title style={styles.sectionTitle}>Rejection</Title>
            <TextInput
              label="Rejection Reason *"
              value={rejectionReason}
              onChangeText={setRejectionReason}
              style={styles.input}
              multiline
              numberOfLines={3}
              placeholder="Provide reason for rejection..."
            />

            <View style={styles.rejectionButtons}>
              <Button 
                mode="contained" 
                onPress={handleRejectLoan}
                style={styles.rejectButton}
                icon="close"
                disabled={!rejectionReason.trim()}
              >
                Reject Loan
              </Button>
            </View>
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
  loanCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#228B22',
    marginTop: 10,
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
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  loanItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
  },
  loanInfo: {
    flex: 1,
  },
  loanId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  memberNumber: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  loanAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#228B22',
    marginTop: 2,
  },
  loanPurpose: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    fontStyle: 'italic',
  },
  statusContainer: {
    marginTop: 5,
  },
  statusChip: {
    alignSelf: 'flex-start',
  },
  statusChipText: {
    color: 'white',
    fontSize: 10,
  },
  reviewButton: {
    marginLeft: 10,
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderColor: '#228B22',
    borderWidth: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    margin: 0,
  },
  loanDetail: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  divider: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  guarantorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    marginBottom: 5,
  },
  guarantorText: {
    fontSize: 12,
    color: '#333',
  },
  guarantorStatus: {
    height: 24,
  },
  guarantorStatusText: {
    fontSize: 10,
    color: 'white',
  },
  input: {
    marginBottom: 15,
  },
  conditionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    marginTop: 15,
  },
  conditionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  conditionInput: {
    flex: 1,
    marginRight: 10,
  },
  deleteConditionButton: {
    margin: 0,
  },
  addConditionButton: {
    marginBottom: 20,
  },
  approvalButtons: {
    marginTop: 15,
  },
  approveButton: {
    backgroundColor: '#4CAF50',
  },
  rejectionButtons: {
    marginTop: 15,
  },
  rejectButton: {
    backgroundColor: '#F44336',
  },
});

export default LoanApprovalScreen;
