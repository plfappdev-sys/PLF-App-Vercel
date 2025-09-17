import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  Modal,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useAuth } from '../../contexts/SupabaseAuthContext';
import { Transaction } from '../../types/index';

// Mock transaction service for deposit approvals
const MockTransactionService = {
  async getPendingDeposits(): Promise<Transaction[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return [
      {
        transactionId: '1',
        memberNumber: 'PLF001',
        type: 'deposit',
        amount: 5000,
        description: 'Monthly contribution - September 2025',
        date: new Date(),
        status: 'pending',
        approvalWorkflow: {
          submittedBy: 'member@example.com',
          submissionDate: new Date(),
        },
        supportingDocuments: [
          {
            documentType: 'proof_of_payment',
            documentUrl: 'https://via.placeholder.com/300x200?text=Proof+of+Payment',
            uploadDate: new Date(),
          },
        ],
        relatedTransactions: [],
        auditTrail: [],
      },
      {
        transactionId: '2',
        memberNumber: 'PLF002',
        type: 'deposit',
        amount: 3000,
        description: 'Catch-up payment',
        date: new Date(Date.now() - 86400000), // Yesterday
        status: 'pending',
        approvalWorkflow: {
          submittedBy: 'member2@example.com',
          submissionDate: new Date(Date.now() - 86400000),
        },
        supportingDocuments: [
          {
            documentType: 'proof_of_payment',
            documentUrl: 'https://via.placeholder.com/300x200?text=Bank+Receipt',
            uploadDate: new Date(Date.now() - 86400000),
          },
        ],
        relatedTransactions: [],
        auditTrail: [],
      },
      {
        transactionId: '3',
        memberNumber: 'PLF003',
        type: 'deposit',
        amount: 7500,
        description: 'Additional contribution for loan eligibility',
        date: new Date(Date.now() - 172800000), // 2 days ago
        status: 'pending',
        approvalWorkflow: {
          submittedBy: 'member3@example.com',
          submissionDate: new Date(Date.now() - 172800000),
        },
        supportingDocuments: [
          {
            documentType: 'proof_of_payment',
            documentUrl: 'https://via.placeholder.com/300x200?text=EFT+Confirmation',
            uploadDate: new Date(Date.now() - 172800000),
          },
        ],
        relatedTransactions: [],
        auditTrail: [],
      },
    ];
  },

  async approveDeposit(transactionId: string, approvedBy: string, notes?: string): Promise<void> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(`Approving deposit ${transactionId} by ${approvedBy}`, notes);
    // In a real implementation, this would update the transaction status
  },

  async rejectDeposit(transactionId: string, rejectedBy: string, reason: string): Promise<void> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(`Rejecting deposit ${transactionId} by ${rejectedBy}:`, reason);
    // In a real implementation, this would update the transaction status
  },
};

export default function DepositApprovalScreen() {
  const { user: currentUser } = useAuth();
  const [pendingDeposits, setPendingDeposits] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState<Transaction | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve');
  const [notes, setNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadPendingDeposits();
  }, []);

  const loadPendingDeposits = async () => {
    try {
      setLoading(true);
      const deposits = await MockTransactionService.getPendingDeposits();
      setPendingDeposits(deposits);
    } catch (error) {
      console.error('Error loading pending deposits:', error);
      Alert.alert('Error', 'Failed to load pending deposits. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPendingDeposits();
    setRefreshing(false);
  };

  const handleDepositAction = (deposit: Transaction, action: 'approve' | 'reject') => {
    setSelectedDeposit(deposit);
    setActionType(action);
    setNotes('');
    setRejectionReason('');
    setShowModal(true);
  };

  const processDepositAction = async () => {
    if (!selectedDeposit || !currentUser) return;

    if (actionType === 'reject' && !rejectionReason.trim()) {
      Alert.alert('Rejection Reason Required', 'Please provide a reason for rejecting this deposit.');
      return;
    }

    setProcessing(true);
    try {
      if (actionType === 'approve') {
        await MockTransactionService.approveDeposit(selectedDeposit.transactionId, currentUser.email, notes);
        Alert.alert('Success', 'Deposit has been approved successfully.');
      } else {
        await MockTransactionService.rejectDeposit(selectedDeposit.transactionId, currentUser.email, rejectionReason);
        Alert.alert('Success', 'Deposit has been rejected.');
      }

      setShowModal(false);
      await loadPendingDeposits(); // Refresh the list
    } catch (error) {
      console.error('Error processing deposit action:', error);
      Alert.alert('Error', 'Failed to process the deposit action. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderDepositCard = (deposit: Transaction) => (
    <View key={deposit.transactionId} style={styles.depositCard}>
      <View style={styles.depositHeader}>
        <View style={styles.memberInfo}>
          <Text style={styles.memberNumber}>Member: {deposit.memberNumber}</Text>
          <Text style={styles.depositAmount}>{formatCurrency(deposit.amount)}</Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, styles.pendingBadge]}>
            <Text style={styles.statusText}>PENDING</Text>
          </View>
        </View>
      </View>

      <Text style={styles.depositDescription}>
        {deposit.description}
      </Text>
      
      <Text style={styles.depositDate}>
        Submitted: {formatDate(deposit.date)}
      </Text>

      {deposit.supportingDocuments.length > 0 && (
        <View style={styles.proofSection}>
          <Text style={styles.proofLabel}>Proof of Payment:</Text>
          <Image 
            source={{ uri: deposit.supportingDocuments[0].documentUrl }} 
            style={styles.proofImage}
            resizeMode="cover"
          />
        </View>
      )}

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.rejectButton]}
          onPress={() => handleDepositAction(deposit, 'reject')}
        >
          <Text style={styles.rejectButtonText}>❌ Reject</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.approveButton]}
          onPress={() => handleDepositAction(deposit, 'approve')}
        >
          <Text style={styles.approveButtonText}>✅ Approve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderActionModal = () => (
    <Modal
      visible={showModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {actionType === 'approve' ? '✅ Approve Deposit' : '❌ Reject Deposit'}
          </Text>
          
          {selectedDeposit && (
            <View style={styles.depositSummary}>
              <Text style={styles.summaryText}>
                Member: {selectedDeposit.memberNumber}
              </Text>
              <Text style={styles.summaryText}>
                Amount: {formatCurrency(selectedDeposit.amount)}
              </Text>
              <Text style={styles.summaryText}>
                Date: {formatDate(selectedDeposit.date)}
              </Text>
              <Text style={styles.summaryText}>
                Description: {selectedDeposit.description}
              </Text>
            </View>
          )}

          {actionType === 'approve' ? (
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Approval Notes (Optional):</Text>
              <TextInput
                style={styles.textInput}
                value={notes}
                onChangeText={setNotes}
                placeholder="Add any notes about this approval..."
                multiline
                numberOfLines={3}
              />
            </View>
          ) : (
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Rejection Reason (Required):</Text>
              <TextInput
                style={styles.textInput}
                value={rejectionReason}
                onChangeText={setRejectionReason}
                placeholder="Please provide a reason for rejection..."
                multiline
                numberOfLines={3}
              />
            </View>
          )}

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.modalButton,
                actionType === 'approve' ? styles.approveButtonModal : styles.rejectButtonModal
              ]}
              onPress={processDepositAction}
              disabled={processing}
            >
              {processing ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.actionButtonText}>
                  {actionType === 'approve' ? 'Approve' : 'Reject'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text style={styles.loadingText}>Loading pending deposits...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>💰 Deposit Approvals</Text>
        <Text style={styles.subtitle}>
          Review and approve member deposit submissions
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{pendingDeposits.length}</Text>
          <Text style={styles.statLabel}>Pending Deposits</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {formatCurrency(pendingDeposits.reduce((sum, d) => sum + d.amount, 0))}
          </Text>
          <Text style={styles.statLabel}>Total Amount</Text>
        </View>
      </View>

      <ScrollView
        style={styles.depositsContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {pendingDeposits.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🎉</Text>
            <Text style={styles.emptyTitle}>No Pending Deposits</Text>
            <Text style={styles.emptyText}>
              All deposit submissions have been processed. New submissions will appear here.
            </Text>
          </View>
        ) : (
          pendingDeposits.map(renderDepositCard)
        )}
      </ScrollView>

      {renderActionModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6200EE',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  depositsContainer: {
    flex: 1,
    padding: 20,
  },
  depositCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  depositHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  memberInfo: {
    flex: 1,
  },
  memberNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  depositAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pendingBadge: {
    backgroundColor: '#FF9800',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  depositDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  depositDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 15,
  },
  proofSection: {
    marginBottom: 15,
  },
  proofLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  proofImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  approveButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#f44336',
  },
  approveButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  rejectButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
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
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 15,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  depositSummary: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  summaryText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    textAlignVertical: 'top',
    backgroundColor: '#f9f9f9',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  approveButtonModal: {
    backgroundColor: '#4CAF50',
  },
  rejectButtonModal: {
    backgroundColor: '#f44336',
  },
  actionButtonText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
  },
});
