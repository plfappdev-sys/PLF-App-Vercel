import { supabase } from '../config/supabase';
import { ContributionService } from './ContributionService';
import { MemberBalanceService } from './MemberBalanceService';
import { InterestCalculationService } from './InterestCalculationService';

export interface LateFeeProcessingResult {
  successCount: number;
  failureCount: number;
  totalFeesApplied: number;
  processedContributions: string[];
  errors: Array<{ contributionId: string; error: string }>;
}

export class LateFeeService {
  /**
   * Process late fees for all overdue contributions (to be called on 8th of each month)
   */
  static async processLateFeesForOverdueContributions(): Promise<LateFeeProcessingResult> {
    const result: LateFeeProcessingResult = {
      successCount: 0,
      failureCount: 0,
      totalFeesApplied: 0,
      processedContributions: [],
      errors: []
    };

    try {
      // Get all overdue contributions
      const overdueContributions = await ContributionService.getOverdueContributions();
      
      console.log(`Found ${overdueContributions.length} overdue contributions for late fee processing`);

      for (const contribution of overdueContributions) {
        try {
          // Skip if late fee already applied
          if (contribution.late_fee_applied) {
            console.log(`Skipping contribution ${contribution.id} - late fee already applied`);
            continue;
          }

          // Apply late fee
          const updatedContribution = await ContributionService.applyLateFee(contribution.id);
          
          // Update member balance with the late fee amount
          await MemberBalanceService.updateBalanceWithFee(
            contribution.member_id,
            updatedContribution.late_fee_amount
          );

          result.successCount++;
          result.totalFeesApplied += updatedContribution.late_fee_amount;
          result.processedContributions.push(contribution.id);

          console.log(`Applied late fee of R${updatedContribution.late_fee_amount.toFixed(2)} to contribution ${contribution.id}`);

        } catch (error) {
          result.failureCount++;
          result.errors.push({
            contributionId: contribution.id,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
          console.error(`Failed to process late fee for contribution ${contribution.id}:`, error);
        }
      }

      return result;

    } catch (error) {
      console.error('Error in processLateFeesForOverdueContributions:', error);
      throw error;
    }
  }

  /**
   * Check if today is the 8th of the month (when late fees should be applied)
   */
  static isLateFeeProcessingDay(): boolean {
    const today = new Date();
    return today.getDate() === 8;
  }

  /**
   * Check if a contribution is eligible for late fee (overdue and past grace period)
   */
  static isEligibleForLateFee(contributionDueDate: Date): boolean {
    const today = new Date();
    const dueDate = new Date(contributionDueDate);
    
    // Check if it's past the 7th of the month (grace period ends on 7th)
    return today.getDate() > 7 && today > dueDate;
  }

  /**
   * Calculate late fee amount for a contribution
   */
  static calculateLateFeeAmount(amountDue: number): number {
    return InterestCalculationService.calculateLateFee(amountDue);
  }

  /**
   * Get late fee statistics for reporting
   */
  static async getLateFeeStatistics(
    startDate?: Date,
    endDate?: Date
  ): Promise<{
    totalFeesCollected: number;
    totalContributionsWithFees: number;
    averageLateFee: number;
    monthlyBreakdown: Array<{ month: string; fees: number; count: number }>;
  }> {
    try {
      let query = supabase
        .from('contributions')
        .select('late_fee_amount, late_fee_applied_date, contribution_month')
        .eq('late_fee_applied', true);

      if (startDate) {
        query = query.gte('late_fee_applied_date', startDate.toISOString().split('T')[0]);
      }
      if (endDate) {
        query = query.lte('late_fee_applied_date', endDate.toISOString().split('T')[0]);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error getting late fee statistics:', error);
        throw error;
      }

      const totalFeesCollected = data.reduce((sum, item) => sum + (parseFloat(item.late_fee_amount) || 0), 0);
      const totalContributionsWithFees = data.length;
      const averageLateFee = totalContributionsWithFees > 0 ? totalFeesCollected / totalContributionsWithFees : 0;

      // Group by month for breakdown
      const monthlyBreakdown: Record<string, { fees: number; count: number }> = {};
      
      data.forEach(item => {
        if (item.late_fee_applied_date) {
          const month = new Date(item.late_fee_applied_date).toISOString().slice(0, 7); // YYYY-MM
          if (!monthlyBreakdown[month]) {
            monthlyBreakdown[month] = { fees: 0, count: 0 };
          }
          monthlyBreakdown[month].fees += parseFloat(item.late_fee_amount) || 0;
          monthlyBreakdown[month].count++;
        }
      });

      const monthlyArray = Object.entries(monthlyBreakdown).map(([month, stats]) => ({
        month,
        fees: stats.fees,
        count: stats.count
      })).sort((a, b) => a.month.localeCompare(b.month));

      return {
        totalFeesCollected,
        totalContributionsWithFees,
        averageLateFee,
        monthlyBreakdown: monthlyArray
      };

    } catch (error) {
      console.error('Error in getLateFeeStatistics:', error);
      throw error;
    }
  }

  /**
   * Get members with outstanding late fees
   */
  static async getMembersWithOutstandingLateFees(): Promise<Array<{
    member_id: number;
    member_number: string;
    total_late_fees: number;
    contribution_count: number;
    last_contribution_date: Date | null;
  }>> {
    try {
      const { data, error } = await supabase
        .from('contributions')
        .select('member_id, member_number, late_fee_amount, contribution_month')
        .eq('late_fee_applied', true)
        .eq('status', 'overdue');

      if (error) {
        console.error('Error getting members with outstanding late fees:', error);
        throw error;
      }

      // Group by member and calculate totals
      const memberMap = new Map<number, {
        member_id: number;
        member_number: string;
        total_late_fees: number;
        contribution_count: number;
        last_contribution_date: Date | null;
      }>();

      data.forEach(item => {
        const memberId = item.member_id;
        if (!memberMap.has(memberId)) {
          memberMap.set(memberId, {
            member_id: memberId,
            member_number: item.member_number,
            total_late_fees: 0,
            contribution_count: 0,
            last_contribution_date: null
          });
        }

        const memberData = memberMap.get(memberId)!;
        memberData.total_late_fees += parseFloat(item.late_fee_amount) || 0;
        memberData.contribution_count++;

        const contributionDate = new Date(item.contribution_month);
        if (!memberData.last_contribution_date || contributionDate > memberData.last_contribution_date) {
          memberData.last_contribution_date = contributionDate;
        }
      });

      return Array.from(memberMap.values());
    } catch (error) {
      console.error('Error in getMembersWithOutstandingLateFees:', error);
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
      console.warn('Late fee database not available:', error);
      return false;
    }
  }
}
