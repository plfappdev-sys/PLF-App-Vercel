import { supabase } from '../config/supabase';

export interface MemberBalanceRecord {
  id: string;
  member_id: number;
  member_number: string;
  total_contributions: number;
  total_interest_earned: number;
  total_loans_taken: number;
  total_loan_repayments: number;
  total_interest_charged: number;
  total_fees_paid: number;
  savings_balance: number;
  loan_balance: number;
  net_balance: number;
  available_for_withdrawal: number;
  available_for_loan: number;
  last_balance_update: string;
  last_transaction_id?: string;
  created_at: string;
  updated_at: string;
}

export class MemberBalanceService {
  // Get member balance by member ID
  static async getBalanceByMemberId(memberId: number): Promise<MemberBalanceRecord | null> {
    try {
      const { data, error } = await supabase
        .from('member_balances')
        .select('*')
        .eq('member_id', memberId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') { // No rows found
          return null;
        }
        console.error('Error getting member balance:', error);
        throw error;
      }

      return this.mapDbBalanceToRecord(data);
    } catch (error) {
      console.error('Error in getBalanceByMemberId:', error);
      throw error;
    }
  }

  // Get member balance by member number
  static async getBalanceByMemberNumber(memberNumber: string): Promise<MemberBalanceRecord | null> {
    try {
      const { data, error } = await supabase
        .from('member_balances')
        .select('*')
        .eq('member_number', memberNumber)
        .single();

      if (error) {
        if (error.code === 'PGRST116') { // No rows found
          return null;
        }
        console.error('Error getting member balance:', error);
        throw error;
      }

      return this.mapDbBalanceToRecord(data);
    } catch (error) {
      console.error('Error in getBalanceByMemberNumber:', error);
      throw error;
    }
  }

  // Create or update member balance
  static async upsertBalance(balanceData: Partial<MemberBalanceRecord>): Promise<MemberBalanceRecord> {
    try {
      const { data, error } = await supabase
        .from('member_balances')
        .upsert({
          ...balanceData,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error('Error upserting member balance:', error);
        throw error;
      }

      return this.mapDbBalanceToRecord(data);
    } catch (error) {
      console.error('Error in upsertBalance:', error);
      throw error;
    }
  }

  // Update member balance with interest calculations
  static async updateBalanceWithInterest(
    memberId: number,
    interestEarned: number,
    interestCharged: number,
    transactionId?: string
  ): Promise<MemberBalanceRecord> {
    try {
      // Get current balance
      const currentBalance = await this.getBalanceByMemberId(memberId);
      
      const updateData: Partial<MemberBalanceRecord> = {
        member_id: memberId,
        total_interest_earned: (currentBalance?.total_interest_earned || 0) + interestEarned,
        total_interest_charged: (currentBalance?.total_interest_charged || 0) + interestCharged,
        savings_balance: (currentBalance?.savings_balance || 0) + interestEarned,
        loan_balance: (currentBalance?.loan_balance || 0) + interestCharged,
        net_balance: ((currentBalance?.savings_balance || 0) + interestEarned) - 
                     ((currentBalance?.loan_balance || 0) + interestCharged),
        last_balance_update: new Date().toISOString(),
        last_transaction_id: transactionId,
      };

      // Recalculate available funds
      updateData.available_for_withdrawal = Math.max(0, updateData.savings_balance! - (updateData.loan_balance! * 0.5));
      updateData.available_for_loan = Math.max(0, updateData.savings_balance! * 3 - updateData.loan_balance!);

      return await this.upsertBalance(updateData);
    } catch (error) {
      console.error('Error in updateBalanceWithInterest:', error);
      throw error;
    }
  }

  // Update balance with contribution
  static async updateBalanceWithContribution(
    memberId: number,
    amount: number,
    transactionId?: string
  ): Promise<MemberBalanceRecord> {
    try {
      const currentBalance = await this.getBalanceByMemberId(memberId);
      
      const updateData: Partial<MemberBalanceRecord> = {
        member_id: memberId,
        total_contributions: (currentBalance?.total_contributions || 0) + amount,
        savings_balance: (currentBalance?.savings_balance || 0) + amount,
        net_balance: ((currentBalance?.net_balance || 0) + amount),
        last_balance_update: new Date().toISOString(),
        last_transaction_id: transactionId,
      };

      // Recalculate available funds
      updateData.available_for_withdrawal = Math.max(0, updateData.savings_balance! - (updateData.loan_balance! * 0.5));
      updateData.available_for_loan = Math.max(0, updateData.savings_balance! * 3 - updateData.loan_balance!);

      return await this.upsertBalance(updateData);
    } catch (error) {
      console.error('Error in updateBalanceWithContribution:', error);
      throw error;
    }
  }

  // Update balance with loan disbursement
  static async updateBalanceWithLoanDisbursement(
    memberId: number,
    amount: number,
    transactionId?: string
  ): Promise<MemberBalanceRecord> {
    try {
      const currentBalance = await this.getBalanceByMemberId(memberId);
      
      const updateData: Partial<MemberBalanceRecord> = {
        member_id: memberId,
        total_loans_taken: (currentBalance?.total_loans_taken || 0) + amount,
        loan_balance: (currentBalance?.loan_balance || 0) + amount,
        net_balance: ((currentBalance?.net_balance || 0) - amount),
        last_balance_update: new Date().toISOString(),
        last_transaction_id: transactionId,
      };

      // Recalculate available funds
      updateData.available_for_withdrawal = Math.max(0, updateData.savings_balance! - (updateData.loan_balance! * 0.5));
      updateData.available_for_loan = Math.max(0, updateData.savings_balance! * 3 - updateData.loan_balance!);

      return await this.upsertBalance(updateData);
    } catch (error) {
      console.error('Error in updateBalanceWithLoanDisbursement:', error);
      throw error;
    }
  }

  // Update balance with loan repayment
  static async updateBalanceWithLoanRepayment(
    memberId: number,
    amount: number,
    transactionId?: string
  ): Promise<MemberBalanceRecord> {
    try {
      const currentBalance = await this.getBalanceByMemberId(memberId);
      
      const updateData: Partial<MemberBalanceRecord> = {
        member_id: memberId,
        total_loan_repayments: (currentBalance?.total_loan_repayments || 0) + amount,
        loan_balance: Math.max(0, (currentBalance?.loan_balance || 0) - amount),
        net_balance: ((currentBalance?.net_balance || 0) + amount),
        last_balance_update: new Date().toISOString(),
        last_transaction_id: transactionId,
      };

      // Recalculate available funds
      updateData.available_for_withdrawal = Math.max(0, updateData.savings_balance! - (updateData.loan_balance! * 0.5));
      updateData.available_for_loan = Math.max(0, updateData.savings_balance! * 3 - updateData.loan_balance!);

      return await this.upsertBalance(updateData);
    } catch (error) {
      console.error('Error in updateBalanceWithLoanRepayment:', error);
      throw error;
    }
  }

  // Update balance with fee payment
  static async updateBalanceWithFee(
    memberId: number,
    amount: number,
    transactionId?: string
  ): Promise<MemberBalanceRecord> {
    try {
      const currentBalance = await this.getBalanceByMemberId(memberId);
      
      const updateData: Partial<MemberBalanceRecord> = {
        member_id: memberId,
        total_fees_paid: (currentBalance?.total_fees_paid || 0) + amount,
        savings_balance: Math.max(0, (currentBalance?.savings_balance || 0) - amount),
        net_balance: ((currentBalance?.net_balance || 0) - amount),
        last_balance_update: new Date().toISOString(),
        last_transaction_id: transactionId,
      };

      // Recalculate available funds
      updateData.available_for_withdrawal = Math.max(0, updateData.savings_balance! - (updateData.loan_balance! * 0.5));
      updateData.available_for_loan = Math.max(0, updateData.savings_balance! * 3 - updateData.loan_balance!);

      return await this.upsertBalance(updateData);
    } catch (error) {
      console.error('Error in updateBalanceWithFee:', error);
      throw error;
    }
  }

  // Get all member balances (admin only)
  static async getAllBalances(limit: number = 100, offset: number = 0): Promise<MemberBalanceRecord[]> {
    try {
      const { data, error } = await supabase
        .from('member_balances')
        .select('*')
        .order('member_number')
        .limit(limit)
        .range(offset, offset + limit - 1);

      if (error) {
        console.error('Error getting all balances:', error);
        throw error;
      }

      return data.map(this.mapDbBalanceToRecord);
    } catch (error) {
      console.error('Error in getAllBalances:', error);
      throw error;
    }
  }

  // Initialize member balance record
  static async initializeMemberBalance(
    memberId: number,
    memberNumber: string,
    initialBalance: number = 0
  ): Promise<MemberBalanceRecord> {
    try {
      const balanceData: Partial<MemberBalanceRecord> = {
        member_id: memberId,
        member_number: memberNumber,
        total_contributions: initialBalance,
        savings_balance: initialBalance,
        net_balance: initialBalance,
        available_for_withdrawal: Math.max(0, initialBalance),
        available_for_loan: Math.max(0, initialBalance * 3),
        last_balance_update: new Date().toISOString(),
      };

      return await this.upsertBalance(balanceData);
    } catch (error) {
      console.error('Error in initializeMemberBalance:', error);
      throw error;
    }
  }

  // Helper method to map database record to interface
  private static mapDbBalanceToRecord(dbBalance: any): MemberBalanceRecord {
    return {
      id: dbBalance.id,
      member_id: dbBalance.member_id,
      member_number: dbBalance.member_number,
      total_contributions: parseFloat(dbBalance.total_contributions) || 0,
      total_interest_earned: parseFloat(dbBalance.total_interest_earned) || 0,
      total_loans_taken: parseFloat(dbBalance.total_loans_taken) || 0,
      total_loan_repayments: parseFloat(dbBalance.total_loan_repayments) || 0,
      total_interest_charged: parseFloat(dbBalance.total_interest_charged) || 0,
      total_fees_paid: parseFloat(dbBalance.total_fees_paid) || 0,
      savings_balance: parseFloat(dbBalance.savings_balance) || 0,
      loan_balance: parseFloat(dbBalance.loan_balance) || 0,
      net_balance: parseFloat(dbBalance.net_balance) || 0,
      available_for_withdrawal: parseFloat(dbBalance.available_for_withdrawal) || 0,
      available_for_loan: parseFloat(dbBalance.available_for_loan) || 0,
      last_balance_update: dbBalance.last_balance_update,
      last_transaction_id: dbBalance.last_transaction_id,
      created_at: dbBalance.created_at,
      updated_at: dbBalance.updated_at,
    };
  }

  // Check if database is available
  static async isDatabaseAvailable(): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('member_balances')
        .select('count')
        .limit(1);

      return !error;
    } catch (error) {
      console.warn('Member balances database not available:', error);
      return false;
    }
  }
}
