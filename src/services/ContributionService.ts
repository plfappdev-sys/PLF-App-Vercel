import { supabase } from '../config/supabase';
import { MemberBalanceService } from './MemberBalanceService';

export interface ContributionRecord {
  id: string;
  member_id: number;
  member_number: string;
  contribution_month: Date;
  due_date: Date;
  amount_due: number;
  amount_paid: number;
  status: 'pending' | 'paid' | 'partial' | 'overdue' | 'waived';
  late_fee_applied: boolean;
  late_fee_amount: number;
  late_fee_applied_date: Date | null;
  payment_date: Date | null;
  payment_reference: string | null;
  payment_method: 'cash' | 'bank_transfer' | 'debit_order' | 'other' | null;
  created_at: Date;
  updated_at: Date;
}

export interface ContributionStats {
  total_due: number;
  total_paid: number;
  total_outstanding: number;
  total_late_fees: number;
  pending_count: number;
  paid_count: number;
  partial_count: number;
  overdue_count: number;
  waived_count: number;
}

export class ContributionService {
  private static CACHE_DURATION = 2 * 60 * 1000; // 2 minutes cache
  private static currentMonthContributions: Map<number, ContributionRecord> = new Map();
  private static lastFetchTime: Date | null = null;

  /**
   * Get contribution by ID
   */
  static async getContributionById(contributionId: string): Promise<ContributionRecord | null> {
    try {
      const { data, error } = await supabase
        .from('contributions')
        .select('*')
        .eq('id', contributionId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') { // No rows found
          return null;
        }
        console.error('Error getting contribution:', error);
        throw error;
      }

      return this.mapDbContributionToRecord(data);
    } catch (error) {
      console.error('Error in getContributionById:', error);
      throw error;
    }
  }

  /**
   * Get contributions for a specific member
   */
  static async getContributionsByMemberId(
    memberId: number, 
    limit: number = 100, 
    offset: number = 0
  ): Promise<ContributionRecord[]> {
    try {
      const { data, error } = await supabase
        .from('contributions')
        .select('*')
        .eq('member_id', memberId)
        .order('contribution_month', { ascending: false })
        .limit(limit)
        .range(offset, offset + limit - 1);

      if (error) {
        console.error('Error getting member contributions:', error);
        throw error;
      }

      return data.map(this.mapDbContributionToRecord);
    } catch (error) {
      console.error('Error in getContributionsByMemberId:', error);
      throw error;
    }
  }

  /**
   * Get contribution for a specific member and month
   */
  static async getContributionByMemberAndMonth(
    memberId: number, 
    year: number, 
    month: number
  ): Promise<ContributionRecord | null> {
    try {
      const contributionMonth = new Date(year, month - 1, 1); // First day of the month
      
      const { data, error } = await supabase
        .from('contributions')
        .select('*')
        .eq('member_id', memberId)
        .eq('contribution_month', contributionMonth.toISOString().split('T')[0])
        .single();

      if (error) {
        if (error.code === 'PGRST116') { // No rows found
          return null;
        }
        console.error('Error getting contribution by month:', error);
        throw error;
      }

      return this.mapDbContributionToRecord(data);
    } catch (error) {
      console.error('Error in getContributionByMemberAndMonth:', error);
      throw error;
    }
  }

  /**
   * Get current month's contribution for a member (with caching)
   */
  static async getCurrentMonthContribution(memberId: number): Promise<ContributionRecord | null> {
    // Check cache first
    if (this.currentMonthContributions.has(memberId) && this.lastFetchTime) {
      const cacheAge = Date.now() - this.lastFetchTime.getTime();
      if (cacheAge < this.CACHE_DURATION) {
        return this.currentMonthContributions.get(memberId) || null;
      }
    }

    try {
      const currentDate = new Date();
      const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      
      const { data, error } = await supabase
        .from('contributions')
        .select('*')
        .eq('member_id', memberId)
        .eq('contribution_month', currentMonth.toISOString().split('T')[0])
        .single();

      if (error) {
        if (error.code === 'PGRST116') { // No rows found
          // Create a new contribution record if none exists
          return await this.createMonthlyContribution(memberId);
        }
        console.error('Error getting current month contribution:', error);
        throw error;
      }

      const contribution = this.mapDbContributionToRecord(data);
      
      // Update cache
      this.currentMonthContributions.set(memberId, contribution);
      this.lastFetchTime = new Date();

      return contribution;
    } catch (error) {
      console.error('Error in getCurrentMonthContribution:', error);
      throw error;
    }
  }

  /**
   * Create monthly contribution record for a member
   */
  static async createMonthlyContribution(memberId: number): Promise<ContributionRecord> {
    try {
      // Get member details to get member number and contribution amount
      const { data: memberData, error: memberError } = await supabase
        .from('members')
        .select('member_number, monthly_contribution')
        .eq('id', memberId)
        .single();

      if (memberError) {
        console.error('Error getting member details:', memberError);
        throw memberError;
      }

      const currentDate = new Date();
      const contributionMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const dueDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // 1st of month

      const amountDue = memberData.monthly_contribution || 200.00;

      const { data, error } = await supabase
        .from('contributions')
        .insert({
          member_id: memberId,
          member_number: memberData.member_number,
          contribution_month: contributionMonth.toISOString().split('T')[0],
          due_date: dueDate.toISOString().split('T')[0],
          amount_due: amountDue,
          amount_paid: 0,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating monthly contribution:', error);
        throw error;
      }

      const contribution = this.mapDbContributionToRecord(data);
      
      // Update cache
      this.currentMonthContributions.set(memberId, contribution);
      this.lastFetchTime = new Date();

      return contribution;
    } catch (error) {
      console.error('Error in createMonthlyContribution:', error);
      throw error;
    }
  }

  /**
   * Record a payment against a contribution
   */
  static async recordPayment(
    contributionId: string,
    amount: number,
    paymentMethod: 'cash' | 'bank_transfer' | 'debit_order' | 'other',
    paymentReference?: string
  ): Promise<ContributionRecord> {
    try {
      // Get current contribution
      const currentContribution = await this.getContributionById(contributionId);
      if (!currentContribution) {
        throw new Error('Contribution not found');
      }

      const newAmountPaid = (currentContribution.amount_paid || 0) + amount;
      const amountDue = currentContribution.amount_due;

      let newStatus: typeof currentContribution.status = currentContribution.status;
      
      if (newAmountPaid >= amountDue) {
        newStatus = 'paid';
      } else if (newAmountPaid > 0) {
        newStatus = 'partial';
      }

      const { data, error } = await supabase
        .from('contributions')
        .upsert({
          id: contributionId,
          amount_paid: newAmountPaid,
          status: newStatus,
          payment_date: new Date().toISOString(),
          payment_method: paymentMethod,
          payment_reference: paymentReference,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Error recording payment:', error);
        throw error;
      }

      // Update member balance
      await MemberBalanceService.updateBalanceWithContribution(
        currentContribution.member_id,
        amount
      );

      const updatedContribution = this.mapDbContributionToRecord(data);
      
      // Update cache
      this.currentMonthContributions.set(currentContribution.member_id, updatedContribution);

      return updatedContribution;
    } catch (error) {
      console.error('Error in recordPayment:', error);
      throw error;
    }
  }

  /**
   * Apply late fee to overdue contributions
   */
  static async applyLateFee(contributionId: string): Promise<ContributionRecord> {
    try {
      const contribution = await this.getContributionById(contributionId);
      if (!contribution) {
        throw new Error('Contribution not found');
      }

      if (contribution.late_fee_applied) {
        return contribution; // Late fee already applied
      }

      if (contribution.status !== 'overdue') {
        throw new Error('Cannot apply late fee to non-overdue contribution');
      }

      // Get late fee percentage from system settings or use default 7%
      const lateFeePercentage = 0.07; // Default, could be fetched from system_settings
      const lateFeeAmount = contribution.amount_due * lateFeePercentage;

      const { data, error } = await supabase
        .from('contributions')
        .upsert({
          id: contributionId,
          late_fee_applied: true,
          late_fee_amount: lateFeeAmount,
          late_fee_applied_date: new Date().toISOString(),
          amount_due: contribution.amount_due + lateFeeAmount,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Error applying late fee:', error);
        throw error;
      }

      return this.mapDbContributionToRecord(data);
    } catch (error) {
      console.error('Error in applyLateFee:', error);
      throw error;
    }
  }

  /**
   * Mark contribution as waived
   */
  static async waiveContribution(contributionId: string, reason?: string): Promise<ContributionRecord> {
    try {
      const { data, error } = await supabase
        .from('contributions')
        .upsert({
          id: contributionId,
          status: 'waived',
          amount_paid: 0,
          payment_date: new Date().toISOString(),
          payment_reference: reason || 'Waived by admin',
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Error waiving contribution:', error);
        throw error;
      }

      return this.mapDbContributionToRecord(data);
    } catch (error) {
      console.error('Error in waiveContribution:', error);
      throw error;
    }
  }

  /**
   * Get contribution statistics for a member
   */
  static async getMemberContributionStats(memberId: number): Promise<ContributionStats> {
    try {
      const { data, error } = await supabase
        .from('contributions')
        .select('amount_due, amount_paid, status, late_fee_amount')
        .eq('member_id', memberId);

      if (error) {
        console.error('Error getting contribution stats:', error);
        throw error;
      }

      const stats: ContributionStats = {
        total_due: 0,
        total_paid: 0,
        total_outstanding: 0,
        total_late_fees: 0,
        pending_count: 0,
        paid_count: 0,
        partial_count: 0,
        overdue_count: 0,
        waived_count: 0
      };

      data.forEach(contribution => {
        stats.total_due += parseFloat(contribution.amount_due) || 0;
        stats.total_paid += parseFloat(contribution.amount_paid) || 0;
        stats.total_late_fees += parseFloat(contribution.late_fee_amount) || 0;

        switch (contribution.status) {
          case 'pending':
            stats.pending_count++;
            break;
          case 'paid':
            stats.paid_count++;
            break;
          case 'partial':
            stats.partial_count++;
            break;
          case 'overdue':
            stats.overdue_count++;
            break;
          case 'waived':
            stats.waived_count++;
            break;
        }
      });

      stats.total_outstanding = stats.total_due - stats.total_paid;

      return stats;
    } catch (error) {
      console.error('Error in getMemberContributionStats:', error);
      throw error;
    }
  }

  /**
   * Get overdue contributions (for scheduled processing)
   */
  static async getOverdueContributions(): Promise<ContributionRecord[]> {
    try {
      const today = new Date();
      const { data, error } = await supabase
        .from('contributions')
        .select('*')
        .lte('due_date', today.toISOString().split('T')[0])
        .neq('status', 'paid')
        .neq('status', 'waived');

      if (error) {
        console.error('Error getting overdue contributions:', error);
        throw error;
      }

      return data.map(this.mapDbContributionToRecord);
    } catch (error) {
      console.error('Error in getOverdueContributions:', error);
      throw error;
    }
  }

  /**
   * Mark overdue contributions (to be called by scheduled function)
   */
  static async markOverdueContributions(): Promise<number> {
    try {
      const overdueContributions = await this.getOverdueContributions();
      let updatedCount = 0;

      for (const contribution of overdueContributions) {
        if (contribution.status !== 'overdue') {
          const { error } = await supabase
            .from('contributions')
            .update({
              status: 'overdue',
              updated_at: new Date().toISOString()
            })
            .eq('id', contribution.id);

          if (!error) {
            updatedCount++;
          }
        }
      }

      return updatedCount;
    } catch (error) {
      console.error('Error in markOverdueContributions:', error);
      throw error;
    }
  }

  /**
   * Check if database is available
   */
  static async isDatabaseAvailable(): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('contributions')
        .select('count')
        .limit(1);

      return !error;
    } catch (error) {
      console.warn('Contributions database not available:', error);
      return false;
    }
  }

  /**
   * Clear the contribution cache
   */
  static clearCache(): void {
    this.currentMonthContributions.clear();
    this.lastFetchTime = null;
  }

  /**
   * Helper method to map database record to interface
   */
  private static mapDbContributionToRecord(dbContribution: any): ContributionRecord {
    return {
      id: dbContribution.id,
      member_id: dbContribution.member_id,
      member_number: dbContribution.member_number,
      contribution_month: new Date(dbContribution.contribution_month),
      due_date: new Date(dbContribution.due_date),
      amount_due: parseFloat(dbContribution.amount_due) || 0,
      amount_paid: parseFloat(dbContribution.amount_paid) || 0,
      status: dbContribution.status,
      late_fee_applied: dbContribution.late_fee_applied || false,
      late_fee_amount: parseFloat(dbContribution.late_fee_amount) || 0,
      late_fee_applied_date: dbContribution.late_fee_applied_date ? new Date(dbContribution.late_fee_applied_date) : null,
      payment_date: dbContribution.payment_date ? new Date(dbContribution.payment_date) : null,
      payment_reference: dbContribution.payment_reference,
      payment_method: dbContribution.payment_method,
      created_at: new Date(dbContribution.created_at),
      updated_at: new Date(dbContribution.updated_at),
    };
  }
}
