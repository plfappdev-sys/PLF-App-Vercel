import { supabase } from '../config/supabase';
import { Member, FundStatistics } from '../types/index';

export class SupabaseMemberService {
  /**
   * Helper function to parse JSON strings from database fields
   */
  private static parseJsonField(field: any): any {
    if (!field) return {};
    if (typeof field === 'string') {
      try {
        return JSON.parse(field);
      } catch (error) {
        console.warn('Error parsing JSON field:', error);
        return {};
      }
    }
    return field;
  }

  /**
   * Get member by member number
   */
  static async getMemberByNumber(memberNumber: string): Promise<Member | null> {
    try {
      // Get member basic info
      const { data: memberData, error: memberError } = await supabase
        .from('members')
        .select('*')
        .eq('member_number', memberNumber)
        .single();

      if (memberError) {
        console.error('Error fetching member:', memberError);
        return null;
      }

      // Get member balance from member_balances table
      const { data: balanceData, error: balanceError } = await supabase
        .from('member_balances')
        .select('*')
        .eq('member_id', memberData.id)
        .single();

      if (balanceError) {
        console.warn('No balance data found for member:', memberNumber, balanceError);
        // Continue with default financial info if no balance data
      }

      // Convert database snake_case to TypeScript camelCase
      if (memberData) {
        // FIX: Parse financial_info if it's a JSON string
        const financialInfoData = this.parseJsonField(memberData.financial_info);
        
        // FIX: Calculate outstanding amount - only use catch_up_fee since unpaid_contributions and penalties columns don't exist
        // Also check financial_info.outstanding_amount as fallback
        const outstandingAmount = (memberData.catch_up_fee || 0) + (financialInfoData.outstanding_amount || 0);
        
        // FIX: Use net_balance for currentBalance when available, otherwise use savings_balance
        // net_balance represents the actual current balance (savings - loans)
        const currentBalance = balanceData ? 
          (balanceData.net_balance !== undefined && balanceData.net_balance !== null ? 
            balanceData.net_balance : balanceData.savings_balance || 0) : 
          (financialInfoData.current_balance !== undefined ? 
            financialInfoData.current_balance : 0);
        
        // Use actual balance data if available, otherwise use financial_info as fallback
        const financialInfo = balanceData ? {
          totalContributions: balanceData.savings_balance || 0,
          currentBalance: currentBalance,
          outstandingAmount: outstandingAmount,
          percentageOutstanding: outstandingAmount > 0 ? (outstandingAmount / 16600 * 100) : 0,
          balanceBroughtForward: 0,
          plannedContributions: 0,
          actualContributions: 0,
          currentInterestEarned: 0,
          totalInterestEarned: 0,
          currentInterestCharged: 0,
          totalInterestCharged: 0,
          lastInterestCalculation: new Date(),
          interestRate: 5.5 // Default interest rate
        } : financialInfoData ? {
          totalContributions: financialInfoData.total_contributions || 0,
          currentBalance: financialInfoData.current_balance || 0,
          outstandingAmount: financialInfoData.outstanding_amount || 0,
          percentageOutstanding: financialInfoData.percentage_outstanding || 0,
          balanceBroughtForward: financialInfoData.balance_brought_forward || 0,
          plannedContributions: financialInfoData.planned_contributions || 0,
          actualContributions: financialInfoData.actual_contributions || 0,
          currentInterestEarned: financialInfoData.current_interest_earned || 0,
          totalInterestEarned: financialInfoData.total_interest_earned || 0,
          currentInterestCharged: financialInfoData.current_interest_charged || 0,
          totalInterestCharged: financialInfoData.total_interest_charged || 0,
          lastInterestCalculation: financialInfoData.last_interest_calculation ? new Date(financialInfoData.last_interest_calculation) : new Date(),
          interestRate: financialInfoData.interest_rate || 0
        } : {
          totalContributions: 0,
          currentBalance: 0,
          outstandingAmount: 0,
          percentageOutstanding: 0,
          balanceBroughtForward: 0,
          plannedContributions: 0,
          actualContributions: 0,
          currentInterestEarned: 0,
          totalInterestEarned: 0,
          currentInterestCharged: 0,
          totalInterestCharged: 0,
          lastInterestCalculation: new Date(),
          interestRate: 0
        };

        // Parse personal_info if it's a JSON string
        const personalInfoData = this.parseJsonField(memberData.personal_info);
        
        // Use the name column if available, otherwise fall back to personal_info
        const personalInfo = memberData.name ? {
          firstName: memberData.name.split(' ')[0] || '',
          lastName: memberData.name.split(' ').slice(1).join(' ') || '',
          fullName: memberData.name
        } : personalInfoData;

        // Parse other JSON fields
        const membershipStatus = this.parseJsonField(memberData.membership_status);
        const interestSettings = this.parseJsonField(memberData.interest_settings);
        const contributionHistory = this.parseJsonField(memberData.contribution_history) || [];
        const loanHistory = this.parseJsonField(memberData.loan_history) || [];
        const interestHistory = this.parseJsonField(memberData.interest_history) || [];

        return {
          memberNumber: memberData.member_number,
          userId: memberData.user_id,
          personalInfo: personalInfo,
          financialInfo: financialInfo,
          contributionHistory: contributionHistory,
          loanHistory: loanHistory,
          interestHistory: interestHistory,
          membershipStatus: membershipStatus,
          interestSettings: interestSettings,
          lastUpdated: new Date(memberData.last_updated)
        } as Member;
      }

      return null;
    } catch (error) {
      console.error('Exception in getMemberByNumber:', error);
      return null;
    }
  }

  /**
   * Validate if a member number exists and return member data
   */
  static async validateMemberNumber(memberNumber: string): Promise<{
    isValid: boolean;
    memberData?: Partial<Member>;
    error?: string;
  }> {
    try {
      const member = await this.getMemberByNumber(memberNumber);
      
      if (!member) {
        return {
          isValid: false,
          error: 'Member number not found'
        };
      }

      return {
        isValid: true,
        memberData: {
          memberNumber: member.memberNumber,
          personalInfo: member.personalInfo,
          financialInfo: member.financialInfo,
          membershipStatus: member.membershipStatus
        }
      };
    } catch (error) {
      console.error('Error validating member number:', error);
      return {
        isValid: false,
        error: 'Error validating member number'
      };
    }
  }

  /**
   * Link user account to existing member
   */
  static async linkUserToMember(userId: string, memberNumber: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      // First check if member exists
      const member = await this.getMemberByNumber(memberNumber);
      if (!member) {
        return {
          success: false,
          error: 'Member not found'
        };
      }

      // Update user record with member number
      const { error } = await supabase
        .from('users')
        .update({ 
          membernumber: memberNumber,
          updated_at: new Date().toISOString()
        })
        .eq('uid', userId);

      if (error) {
        console.error('Error linking user to member:', error);
        return {
          success: false,
          error: 'Failed to link user account'
        };
      }

      return { success: true };
    } catch (error) {
      console.error('Exception in linkUserToMember:', error);
      return {
        success: false,
        error: 'Unexpected error occurred'
      };
    }
  }

  /**
   * Check if member number is already linked to a user
   */
  static async isMemberNumberLinked(memberNumber: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('uid')
        .eq('membernumber', memberNumber)
        .single();

      if (error) {
        // No user found with this member number
        return false;
      }

      return !!data;
    } catch (error) {
      console.error('Error checking member number link:', error);
      return false;
    }
  }


  /**
   * Update member financial information
   */
  static async updateMemberFinancials(
    memberNumber: string, 
    updates: Partial<Member['financialInfo']>
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('members')
        .update({ 
          financial_info: updates,
          last_updated: new Date().toISOString()
        })
        .eq('member_number', memberNumber);

      if (error) {
        console.error('Error updating member financials:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Exception in updateMemberFinancials:', error);
      return false;
    }
  }

  /**
   * Search members by name or number
   */
  static async searchMembers(query: string): Promise<Member[]> {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .or(`member_number.ilike.%${query}%,personal_info->>fullName.ilike.%${query}%`)
        .limit(10);

      if (error) {
        console.error('Error searching members:', error);
        return [];
      }

      return data as Member[];
    } catch (error) {
      console.error('Exception in searchMembers:', error);
      return [];
    }
  }

  /**
   * Get fund statistics - matches RealMemberService API
   * Enhanced with comprehensive null checks and error handling
   * UPDATED: New business logic implementation
   * 1. Total Fund Contributions = Sum of all actual contributions received (savings_balance)
   * 2. Total Outstanding Contributions = Sum of all positive net balances (money owed)
   * 3. Good standing = Members with negative net balances (have credit)
   * 4. Owing categories = Based on positive net balance amounts
   */
  static async getFundStatistics(): Promise<FundStatistics> {
    console.log('DEBUG: getFundStatistics() called with NEW business logic');
    try {
      // Try to get data from member_balances table first
      console.log('DEBUG: Fetching member_balances table...');
      const { data: balances, error: balancesError } = await supabase
        .from('member_balances')
        .select('*');

      if (balancesError) {
        console.warn('Error fetching member balances for statistics:', balancesError.message);
        // Fallback to old method if member_balances table doesn't exist or has errors
        console.log('DEBUG: Falling back to getFundStatisticsFallback()');
        return await this.getFundStatisticsFallback();
      }

      // Handle case where balances data is null, undefined, or empty array
      if (!balances || !Array.isArray(balances) || balances.length === 0) {
        console.warn('No member balances data found, trying to calculate from members table');
        console.log('DEBUG: member_balances table is empty, calling calculateFundStatisticsFromMembers()');
        // Instead of falling back immediately, try to calculate from members table
        return await this.calculateFundStatisticsFromMembers();
      }

      let totalFundContributions = 0; // Sum of all actual contributions received (savings_balance)
      let totalOutstandingContributions = 0; // Sum of all positive net balances (money owed)
      const membersByStanding = {
        good: 0, // Members with negative net balances (have credit)
        owing_10: 0,
        owing_20: 0,
        owing_30: 0,
        owing_50: 0,
        owing_65: 0,
        owing_65_plus: 0
      };

      // Calculate statistics from member_balances table with robust validation
      let validBalanceCount = 0;
      balances.forEach((balance: any) => {
        // Validate balance object
        if (!balance || typeof balance !== 'object') {
          return; // Skip invalid entries
        }

        // Extract values with comprehensive null/undefined checks
        const savingsBalance = typeof balance?.savings_balance === 'number' 
          ? balance.savings_balance 
          : 0;
        
        const loanBalance = typeof balance?.loan_balance === 'number'
          ? balance.loan_balance
          : 0;
        
        const netBalance = typeof balance?.net_balance === 'number'
          ? balance.net_balance
          : (savingsBalance - loanBalance);
        
        // Only count valid balances
        if (typeof netBalance === 'number' && !isNaN(netBalance)) {
          // NEW: Add to total fund contributions (actual money received)
          totalFundContributions += savingsBalance;
          validBalanceCount++;
        }
        
        // NEW: Calculate outstanding contributions based on POSITIVE net balance (money owed)
        if (typeof netBalance === 'number' && netBalance > 0) {
          totalOutstandingContributions += netBalance;
        }

        // NEW: Categorize members based on NEW business logic
        if (typeof netBalance === 'number') {
          if (netBalance < 0) {
            // NEW: Negative balance = Good standing (has credit)
            membersByStanding.good++;
          } else if (netBalance > 0) {
            // NEW: Positive balance = Owing money, categorize by amount
            // Expected contributions: 83 months * R200 = R16,600
            const expectedContributions = 16600;
            const outstandingPercentage = netBalance / expectedContributions * 100;
            
            if (outstandingPercentage <= 10) {
              membersByStanding.owing_10++;
            } else if (outstandingPercentage <= 20) {
              membersByStanding.owing_20++;
            } else if (outstandingPercentage <= 30) {
              membersByStanding.owing_30++;
            } else if (outstandingPercentage <= 50) {
              membersByStanding.owing_50++;
            } else if (outstandingPercentage <= 65) {
              membersByStanding.owing_65++;
            } else {
              membersByStanding.owing_65_plus++;
            }
          } else {
            // Zero balance - treat as good standing (no money owed)
            membersByStanding.good++;
          }
        }
      });

      // If no valid balances were found, try to calculate from members table
      if (validBalanceCount === 0) {
        console.warn('No valid balance data found, calculating from members table');
        return await this.calculateFundStatisticsFromMembers();
      }

      // Get total member count from members table
      const { data: members, error: membersError } = await supabase
        .from('members')
        .select('id');

      const totalMembers = members && Array.isArray(members) ? members.length : validBalanceCount;

      // Return statistics with NEW business logic
      return {
        totalMembers,
        totalFundValue: Math.max(0, totalFundContributions), // Renamed to totalFundContributions
        totalLoansOutstanding: Math.max(0, totalOutstandingContributions), // Renamed to totalOutstandingContributions
        totalContributionsThisMonth: 0, // This would need actual transaction data
        membersByStanding
      };
    } catch (error) {
      console.error('Exception in getFundStatistics:', error);
      // Return safe default values instead of throwing to prevent app crashes
      return this.getDefaultFundStatistics();
    }
  }

  /**
   * Fallback method to get fund statistics from old financial_info field
   */
  private static async getFundStatisticsFallback(): Promise<FundStatistics> {
    try {
      // Get all members to calculate statistics
      const { data: members, error } = await supabase
        .from('members')
        .select('*');

      if (error) {
        console.error('Error fetching members for fallback statistics:', error);
        return this.getDefaultFundStatistics();
      }

      // Handle case where members data is null or undefined
      if (!members || !Array.isArray(members)) {
        console.warn('No members data found in fallback, returning default statistics');
        return this.getDefaultFundStatistics();
      }

      let totalFundValue = 0;
      let totalOutstanding = 0;
      const membersByStanding = {
        good: 0,
        owing_10: 0,
        owing_20: 0,
        owing_30: 0,
        owing_50: 0,
        owing_65: 0,
        owing_65_plus: 0
      };

      // Calculate statistics from database data with comprehensive null checks
      members.forEach((member: any) => {
        // Parse financial_info if it's a JSON string
        const financialInfo = this.parseJsonField(member?.financial_info);
        const actualContributions = typeof financialInfo?.actual_contributions === 'number'
          ? financialInfo.actual_contributions
          : (typeof financialInfo?.total_contributions === 'number'
            ? financialInfo.total_contributions
            : 0);
        
        const outstandingAmount = typeof financialInfo?.outstanding_amount === 'number'
          ? financialInfo.outstanding_amount
          : 0;
        
        totalFundValue += actualContributions;
        totalOutstanding += outstandingAmount