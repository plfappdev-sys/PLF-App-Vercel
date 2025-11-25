import { supabase } from '../config/supabase';
import { Transaction, DepositForm } from '../types/index';

export class SupabaseTransactionService {
  
  // Get all transactions with optional filtering
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
      let query = supabase
        .from('transactions')
        .select(`
          *,
          members:member_id (
            member_number,
            first_name,
            last_name
          )
        `)
        .order('created_at', { ascending: false })
        .limit(limit)
        .range(offset, offset + limit - 1);

      // Apply filters
      if (filters?.memberNumber) {
        // First get member ID from member number
        const { data: memberData } = await supabase
          .from('members')
          .select('id')
          .eq('member_number', filters.memberNumber)
          .single();

        if (memberData) {
          query = query.eq('member_id', memberData.id);
        }
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

  // Get transactions for a specific member
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
      // First get member ID from member number
      const { data: memberData } = await supabase
        .from('members')
        .select('id')
        .eq('member_number', memberNumber)
        .single();

      if (!memberData) {
        throw new Error(`Member ${memberNumber} not found`);
      }

      let query = supabase
        .from('transactions')
        .select(`
          *,
          members:member_id (
            member_number,
            first_name,
            last_name
          )
        `)
        .eq('member_id', memberData.id)
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

  // Get transaction by ID
  static async getTransactionById(transactionId: string): Promise<Transaction | null> {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          *,
          members:member_id (
            member_number,
            first_name,
            last_name
          )
        `)
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

  // Create a new deposit transaction
  static async createDeposit(depositData: DepositForm & { memberNumber: string }): Promise<Transaction> {
    try {
      // First get member ID from member number
      const { data: memberData } = await supabase
        .from('members')
        .select('id')
        .eq('member_number', depositData.memberNumber)
        .single();

      if (!memberData) {
        throw new Error(`Member ${depositData.memberNumber} not found`);
      }

      const transactionData = {
        member_id: memberData.id,
        transaction_type: 'deposit',
        amount: depositData.amount,
        description: depositData.description,
        proof_of_payment_url: depositData.proofOfPayment,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('transactions')
        .insert(transactionData)
        .select(`
          *,
          members:member_id (
            member_number,
            first_name,
            last_name
          )
        `)
        .single();

      if (error) {
        console.error('Error creating deposit:', error);
        throw error;
      }

      return this.mapDbTransactionToInterface(data);
    } catch (error) {
      console.error('Error in createDeposit:', error);
      throw error;
    }
  }

  // Approve a deposit transaction
  static async approveDeposit(transactionId: string, approvedBy: string): Promise<Transaction> {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .update({
          status: 'approved',
          deposit_approved_by: approvedBy,
          deposit_approved_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', transactionId)
        .select(`
          *,
          members:member_id (
            member_number,
            first_name,
            last_name
          )
        `)
        .single();

      if (error) {
        console.error('Error approving deposit:', error);
        throw error;
      }

      // Update member's balance
      await this.updateMemberBalance(data.member_id, data.amount, 'deposit');

      return this.mapDbTransactionToInterface(data);
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
        .eq('id', transactionId)
        .select(`
          *,
          members:member_id (
            member_number,
            first_name,
            last_name
          )
        `)
        .single();

      if (error) {
        console.error('Error rejecting deposit:', error);
        throw error;
      }

      return this.mapDbTransactionToInterface(data);
    } catch (error) {
      console.error('Error in rejectDeposit:', error);
      throw error;
    }
  }

  // Create a loan repayment transaction
  static async createLoanRepayment(
    memberNumber: string,
    amount: number,
    loanId?: string,
    description?: string
  ): Promise<Transaction> {
    try {
      // First get member ID from member number
      const { data: memberData } = await supabase
        .from('members')
        .select('id')
        .eq('member_number', memberNumber)
        .single();

      if (!memberData) {
        throw new Error(`Member ${memberNumber} not found`);
      }

      const transactionData = {
        member_id: memberData.id,
        transaction_type: 'loan_repayment',
        amount: amount,
        description: description || 'Loan repayment',
        loan_id: loanId,
        status: 'completed',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('transactions')
        .insert(transactionData)
        .select(`
          *,
          members:member_id (
            member_number,
            first_name,
            last_name
          )
        `)
        .single();

      if (error) {
        console.error('Error creating loan repayment:', error);
        throw error;
      }

      // Update member's balance and loan outstanding amount
      await this.updateMemberBalance(memberData.id, amount, 'repayment');
      if (loanId) {
        await this.updateLoanBalance(loanId, amount);
      }

      return this.mapDbTransactionToInterface(data);
    } catch (error) {
      console.error('Error in createLoanRepayment:', error);
      throw error;
    }
  }

  // Get recent transactions (last 30 days by default)
  static async getRecentTransactions(limit: number = 50): Promise<any[]> {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data, error } = await supabase
        .from('transactions')
        .select(`
          *,
          members:member_id (
            member_number,
            first_name,
            last_name
          )
        `)
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
        memberNumber: transaction.members?.member_number || 'Unknown',
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
        .from('transactions')
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

  // Helper method to update member balance
  private static async updateMemberBalance(memberId: string, amount: number, type: 'deposit' | 'repayment'): Promise<void> {
    try {
      const { data: member } = await supabase
        .from('members')
        .select('current_balance, total_contributions, total_repayments')
        .eq('id', memberId)
        .single();

      if (!member) return;

      // Safely handle null values with proper defaults
      const currentBalance = member.current_balance !== null ? member.current_balance : 0;
      const totalContributions = member.total_contributions !== null ? member.total_contributions : 0;
      const totalRepayments = member.total_repayments !== null ? member.total_repayments : 0;

      let updateData: any = {};
      
      if (type === 'deposit') {
        updateData = {
          current_balance: currentBalance + amount,
          total_contributions: totalContributions + amount,
          updated_at: new Date().toISOString()
        };
      } else if (type === 'repayment') {
        updateData = {
          current_balance: currentBalance - amount,
          total_repayments: totalRepayments + amount,
          updated_at: new Date().toISOString()
        };
      }

      const { error } = await supabase
        .from('members')
        .update(updateData)
        .eq('id', memberId);

      if (error) {
        console.error('Error updating member balance:', error);
      }
    } catch (error) {
      console.error('Error in updateMemberBalance:', error);
    }
  }

  // Helper method to update loan balance
  private static async updateLoanBalance(loanId: string, amount: number): Promise<void> {
    try {
      const { data: loan } = await supabase
        .from('loans')
        .select('remaining_balance, total_paid')
        .eq('id', loanId)
        .single();

      if (!loan) return;

      // Safely handle null values with proper defaults
      const remainingBalance = loan.remaining_balance !== null ? loan.remaining_balance : 0;
      const totalPaid = loan.total_paid !== null ? loan.total_paid : 0;

      const updateData = {
        remaining_balance: Math.max(0, remainingBalance - amount),
        total_paid: totalPaid + amount,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('loans')
        .update(updateData)
        .eq('id', loanId);

      if (error) {
        console.error('Error updating loan balance:', error);
      }
    } catch (error) {
      console.error('Error in updateLoanBalance:', error);
    }
  }

  // Helper method to map database transaction to interface
  private static mapDbTransactionToInterface(dbTransaction: any): Transaction {
    return {
      transactionId: dbTransaction.id,
      memberNumber: dbTransaction.members?.member_number || 'Unknown',
      type: this.mapTransactionType(dbTransaction.transaction_type),
      amount: parseFloat(dbTransaction.amount) || 0,
      description: dbTransaction.description || '',
      date: new Date(dbTransaction.created_at),
      status: this.mapTransactionStatus(dbTransaction.status),
      approvalWorkflow: {
        submittedBy: 'system', // Would need to track this properly
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
      'withdrawal': 'deposit', // Map to deposit for now
      'loan_disbursement': 'loan_disbursement',
      'loan_repayment': 'loan_repayment',
      'interest_earned': 'interest_earned',
      'interest_charged': 'interest_charged',
      'fee': 'penalty',
      'adjustment': 'deposit'
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
