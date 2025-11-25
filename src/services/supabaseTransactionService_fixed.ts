import { supabase } from '../config/supabase';
import { Transaction, DepositForm } from '../types/index';

export class SupabaseTransactionServiceFixed {
  
  // Get all transactions with optional filtering (fixed for BIGINT member IDs)
  static async getAllTransactions(
    filters?: {
      memberNumber?: string;
      type?: string;
      status?: string;
      startDate?: Date;
      endDate?: Date;
    },
    limit: number = 100,
    offset: number = 0
  ): Promise<Transaction[]> {
    try {
      // Use the UUID-compatible view
      let query = supabase
        .from('transactions_with_uuid')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)
        .range(offset, offset + limit - 1);

      // Apply filters
      if (filters?.memberNumber) {
        query = query.eq('member_number', filters.memberNumber);
      }

      if (filters?.type) {
        query = query.eq('transaction_type', filters.type);
      }

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      if (filters?.startDate) {
        query = query.gte('created_at', filters.startDate.toISOString());
      }

      if (filters?.endDate) {
        query = query.lte('created_at', filters.endDate.toISOString());
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error getting transactions:', error);
        throw error;
      }

      // Map database data to Transaction interface
      return data.map(this.mapDbTransactionToInterface);
    } catch (error) {
      console.error('Error in getAllTransactions:', error);
      throw error;
    }
  }

  // Get transactions for a specific member (fixed for BIGINT member IDs)
  static async getMemberTransactions(
    memberNumber: string,
    filters?: {
      type?: string;
      status?: string;
      startDate?: Date;
      endDate?: Date;
    },
    limit: number = 50,
    offset: number = 0
  ): Promise<Transaction[]> {
    try {
      let query = supabase
        .from('transactions_with_uuid')
        .select('*')
        .eq('member_number', memberNumber)
        .order('created_at', { ascending: false })
        .limit(limit)
        .range(offset, offset + limit - 1);

      // Apply additional filters
      if (filters?.type) {
        query = query.eq('transaction_type', filters.type);
      }

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      if (filters?.startDate) {
        query = query.gte('created_at', filters.startDate.toISOString());
      }

      if (filters?.endDate) {
        query = query.lte('created_at', filters.endDate.toISOString());
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error getting member transactions:', error);
        throw error;
      }

      return data.map(this.mapDbTransactionToInterface);
    } catch (error) {
      console.error('Error in getMemberTransactions:', error);
      throw error;
    }
  }

  // Get transaction by ID (fixed for BIGINT IDs)
  static async getTransactionById(transactionId: string): Promise<Transaction | null> {
    try {
      const { data, error } = await supabase
        .from('transactions_with_uuid')
        .select('*')
        .eq('id', transactionId)
        .single();

      if (error) {
        console.error('Error getting transaction:', error);
        return null;
      }

      return this.mapDbTransactionToInterface(data);
    } catch (error) {
      console.error('Error in getTransactionById:', error);
      return null;
    }
  }

  // Create a new deposit transaction (using the helper function)
  static async createDeposit(depositData: DepositForm & { memberNumber: string }): Promise<Transaction> {
    try {
      // Use the helper function for compatibility
      const { data, error } = await supabase.rpc('create_deposit_transaction', {
        p_member_number: depositData.memberNumber,
        p_amount: depositData.amount,
        p_description: depositData.description,
        p_proof_of_payment_url: depositData.proofOfPayment
      });

      if (error) {
        console.error('Error creating deposit:', error);
        throw error;
      }

      // The RPC function returns the transaction data directly
      return this.mapDbTransactionToInterface(data[0]);
    } catch (error) {
      console.error('Error in createDeposit:', error);
      throw error;
    }
  }

  // Approve a deposit transaction
  static async approveDeposit(transactionId: string, approvedBy: string): Promise<Transaction> {
    try {
      // First get the transaction to verify it exists
      const transaction = await this.getTransactionById(transactionId);
      if (!transaction) {
        throw new Error(`Transaction ${transactionId} not found`);
      }

      // Update the transaction status
      const { data, error } = await supabase
        .from('transactions')
        .update({
          status: 'approved',
          deposit_approved_by: approvedBy,
          deposit_approved_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', parseInt(transactionId)) // Convert back to BIGINT for update
        .select('*')
        .single();

      if (error) {
        console.error('Error approving deposit:', error);
        throw error;
      }

      // Get the updated transaction with member info
      const updatedTransaction = await this.getTransactionById(transactionId);
      if (!updatedTransaction) {
        throw new Error('Failed to retrieve updated transaction');
      }

      return updatedTransaction;
    } catch (error) {
      console.error('Error in approveDeposit:', error);
      throw error;
    }
  }

  // Reject a deposit transaction
  static async rejectDeposit(transactionId: string, rejectedBy: string, reason: string): Promise<Transaction> {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .update({
          status: 'rejected',
          deposit_rejection_reason: reason,
          updated_at: new Date().toISOString()
        })
        .eq('id', parseInt(transactionId)) // Convert back to BIGINT for update
        .select('*')
        .single();

      if (error) {
        console.error('Error rejecting deposit:', error);
        throw error;
      }

      // Get the updated transaction with member info
      const updatedTransaction = await this.getTransactionById(transactionId);
      if (!updatedTransaction) {
        throw new Error('Failed to retrieve updated transaction');
      }

      return updatedTransaction;
    } catch (error) {
      console.error('Error in rejectDeposit:', error);
      throw error;
    }
  }

  // Get recent transactions (last 30 days by default)
  static async getRecentTransactions(limit: number = 50): Promise<any[]> {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data, error } = await supabase
        .from('transactions_with_uuid')
        .select('*')
        .gte('created_at', thirtyDaysAgo.toISOString())
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error getting recent transactions:', error);
        return [];
      }

      // Map to the expected format for ReportService
      return data.map(transaction => ({
        transactionId: transaction.id,
        memberNumber: transaction.member_number || 'Unknown',
        type: this.mapTransactionType(transaction.transaction_type),
        amount: parseFloat(transaction.amount) || 0,
        description: transaction.description || '',
        date: new Date(transaction.created_at),
        status: this.mapTransactionStatus(transaction.status)
      }));
    } catch (error) {
      console.error('Error in getRecentTransactions:', error);
      return [];
    }
  }

  // Get transaction statistics
  static async getTransactionStatistics(
    startDate?: Date,
    endDate?: Date
  ): Promise<{
    totalTransactions: number;
    totalAmount: number;
    approvedTransactions: number;
    approvedAmount: number;
    pendingTransactions: number;
    pendingAmount: number;
    rejectedTransactions: number;
    byType: Record<string, { count: number; amount: number }>;
  }> {
    try {
      let query = supabase
        .from('transactions_with_uuid')
        .select('*');

      if (startDate) {
        query = query.gte('created_at', startDate.toISOString());
      }

      if (endDate) {
        query = query.lte('created_at', endDate.toISOString());
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error getting transaction statistics:', error);
        throw error;
      }

      const statistics = {
        totalTransactions: data.length,
        totalAmount: 0,
        approvedTransactions: 0,
        approvedAmount: 0,
        pendingTransactions: 0,
        pendingAmount: 0,
        rejectedTransactions: 0,
        byType: {} as Record<string, { count: number; amount: number }>
      };

      data.forEach(transaction => {
        statistics.totalAmount += transaction.amount;

        if (transaction.status === 'approved' || transaction.status === 'completed') {
          statistics.approvedTransactions++;
          statistics.approvedAmount += transaction.amount;
        } else if (transaction.status === 'pending') {
          statistics.pendingTransactions++;
          statistics.pendingAmount += transaction.amount;
        } else if (transaction.status === 'rejected') {
          statistics.rejectedTransactions++;
        }

        // Group by type
        const type = transaction.transaction_type;
        if (!statistics.byType[type]) {
          statistics.byType[type] = { count: 0, amount: 0 };
        }
        statistics.byType[type].count++;
        statistics.byType[type].amount += transaction.amount;
      });

      return statistics;
    } catch (error) {
      console.error('Error in getTransactionStatistics:', error);
      throw error;
    }
  }

  // Helper method to map database transaction to interface
  private static mapDbTransactionToInterface(dbTransaction: any): Transaction {
    return {
      transactionId: dbTransaction.id,
      memberNumber: dbTransaction.member_number || 'Unknown',
      type: this.mapTransactionType(dbTransaction.transaction_type),
      amount: parseFloat(dbTransaction.amount) || 0,
      description: dbTransaction.description || '',
      date: new Date(dbTransaction.created_at),
      status: this.mapTransactionStatus(dbTransaction.status),
      approvalWorkflow: {
        submittedBy: 'system',
        submissionDate: new Date(dbTransaction.created_at),
        reviewedBy: dbTransaction.deposit_approved_by || undefined,
        reviewDate: dbTransaction.deposit_approved_at ? new Date(dbTransaction.deposit_approved_at) : undefined,
        approvalNotes: dbTransaction.deposit_rejection_reason || undefined
      },
      supportingDocuments: dbTransaction.proof_of_payment_url ? [{
        documentType: 'proof_of_payment',
        documentUrl: dbTransaction.proof_of_payment_url,
        uploadDate: new Date(dbTransaction.created_at)
      }] : [],
      relatedTransactions: [],
      auditTrail: []
    };
  }

  // Helper method to map database transaction type to interface type
  private static mapTransactionType(dbType: string): Transaction['type'] {
    const typeMap: Record<string, Transaction['type']> = {
      'deposit': 'deposit',
      'withdrawal': 'deposit',
      'loan_disbursement': 'loan_disbursement',
      'loan_repayment': 'loan_repayment',
      'interest_earned': 'interest_earned',
      'interest_charged': 'interest_charged',
      'fee': 'penalty',
      'adjustment': 'deposit',
      'catch_up_fee': 'penalty'
    };
    return typeMap[dbType] || 'deposit';
  }

  // Helper method to map database status to interface status
  private static mapTransactionStatus(dbStatus: string): Transaction['status'] {
    const statusMap: Record<string, Transaction['status']> = {
      'pending': 'pending',
      'approved': 'approved',
      'rejected': 'rejected',
      'completed': 'completed',
      'failed': 'rejected'
    };
    return statusMap[dbStatus] || 'pending';
  }
}
