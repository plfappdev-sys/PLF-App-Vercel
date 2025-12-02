import { supabase } from '../config/supabase';
import { Member, FundStatistics } from '../types/index';

export class SupabaseMemberService {
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
        // FIX: Calculate outstanding amount - only use catch_up_fee since unpaid_contributions and penalties columns don't exist
        // Also check financial_info.outstanding_amount as fallback
        const financialInfoData = memberData.financial_info || {};
        const outstandingAmount = (memberData.catch_up_fee || 0) + (financialInfoData.outstanding_amount || 0);
        
        // Use actual balance data if available, otherwise use financial_info as fallback
        const financialInfo = balanceData ? {
          totalContributions: balanceData.savings_balance || 0,
          currentBalance: balanceData.savings_balance || 0,
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
        } : memberData.financial_info ? {
          totalContributions: memberData.financial_info.total_contributions || 0,
          currentBalance: memberData.financial_info.current_balance || 0,
          outstandingAmount: memberData.financial_info.outstanding_amount || 0,
          percentageOutstanding: memberData.financial_info.percentage_outstanding || 0,
          balanceBroughtForward: memberData.financial_info.balance_brought_forward || 0,
          plannedContributions: memberData.financial_info.planned_contributions || 0,
          actualContributions: memberData.financial_info.actual_contributions || 0,
          currentInterestEarned: memberData.financial_info.current_interest_earned || 0,
          totalInterestEarned: memberData.financial_info.total_interest_earned || 0,
          currentInterestCharged: memberData.financial_info.current_interest_charged || 0,
          totalInterestCharged: memberData.financial_info.total_interest_charged || 0,
          lastInterestCalculation: memberData.financial_info.last_interest_calculation ? new Date(memberData.financial_info.last_interest_calculation) : new Date(),
          interestRate: memberData.financial_info.interest_rate || 0
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

        // Use the name column if available, otherwise fall back to personal_info
        const personalInfo = memberData.name ? {
          firstName: memberData.name.split(' ')[0] || '',
          lastName: memberData.name.split(' ').slice(1).join(' ') || '',
          fullName: memberData.name
        } : memberData.personal_info;

        return {
          memberNumber: memberData.member_number,
          userId: memberData.user_id,
          personalInfo: personalInfo,
          financialInfo: financialInfo,
          contributionHistory: memberData.contribution_history || [],
          loanHistory: memberData.loan_history || [],
          interestHistory: memberData.interest_history || [],
          membershipStatus: memberData.membership_status,
          interestSettings: memberData.interest_settings,
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
   * FIXED: Total Fund Value now calculates sum of actual contributions by members
   * IMPROVED: Better fallback logic and data validation
   * UPDATED: If member_balances is empty, try to calculate from members table financial_info
   */
  static async getFundStatistics(): Promise<FundStatistics> {
    console.log('DEBUG: getFundStatistics() called');
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

      // Calculate statistics from member_balances table with robust validation
      let validBalanceCount = 0;
      balances.forEach((balance: any) => {
        // Validate balance object
        if (!balance || typeof balance !== 'object') {
          return; // Skip invalid entries
        }

        // Extract values with comprehensive null/undefined checks
        const totalContributions = typeof balance?.total_contributions === 'number'
          ? balance.total_contributions
          : 0;
        
        const savingsBalance = typeof balance?.savings_balance === 'number' 
          ? balance.savings_balance 
          : (typeof balance?.total_contributions === 'number' ? balance.total_contributions : 0);
        
        const netBalance = typeof balance?.net_balance === 'number'
          ? balance.net_balance
          : savingsBalance;
        
        // Only count valid balances
        if (typeof savingsBalance === 'number' && !isNaN(savingsBalance)) {
          totalFundValue += savingsBalance;
          validBalanceCount++;
        }
        
        // Calculate outstanding amount based on negative net balance
        if (typeof netBalance === 'number' && netBalance < 0) {
          totalOutstanding += Math.abs(netBalance);
        }

        // Categorize members based on their net balance status
        if (typeof netBalance === 'number') {
          if (netBalance >= 0) {
            membersByStanding.good++;
          } else {
            // Calculate percentage of outstanding based on expected contributions
            // Expected contributions: 83 months * R200 = R16,600
            const expectedContributions = 16600;
            const outstandingPercentage = Math.abs(netBalance) / expectedContributions * 100;
            
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

      // Return statistics with guaranteed valid values
      return {
        totalMembers,
        totalFundValue: Math.max(0, totalFundValue), // Ensure non-negative
        totalLoansOutstanding: Math.max(0, totalOutstanding), // Ensure non-negative
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
        // Safe access to nested properties with fallback defaults
        const financialInfo = member?.financial_info || {};
        const currentBalance = typeof financialInfo?.current_balance === 'number' 
          ? financialInfo.current_balance 
          : 0;
        
        const outstandingAmount = typeof financialInfo?.outstanding_amount === 'number'
          ? financialInfo.outstanding_amount
          : 0;
        
        totalFundValue += currentBalance;
        totalOutstanding += outstandingAmount;

        // Safe access to membership status with comprehensive null checking
        const membershipStatus = member?.membership_status || {};
        const standingCategory = typeof membershipStatus?.standingCategory === 'string'
          ? membershipStatus.standingCategory
          : 'good';
        
        // Safe categorization with fallback
        if (standingCategory && membersByStanding.hasOwnProperty(standingCategory)) {
          membersByStanding[standingCategory as keyof typeof membersByStanding]++;
        } else {
          membersByStanding.good++; // Default to good if unknown category
        }
      });

      // Return statistics with guaranteed valid values
      return {
        totalMembers: members.length,
        totalFundValue,
        totalLoansOutstanding: totalOutstanding,
        totalContributionsThisMonth: 0, // This would need actual transaction data
        membersByStanding
      };
    } catch (error) {
      console.error('Exception in getFundStatisticsFallback:', error);
      return this.getDefaultFundStatistics();
    }
  }

  /**
   * Calculate fund statistics directly from members table when member_balances is empty
   */
  private static async calculateFundStatisticsFromMembers(): Promise<FundStatistics> {
    try {
      // Get all members with their financial info
      const { data: members, error } = await supabase
        .from('members')
        .select('*');

      if (error) {
        console.error('Error fetching members for statistics calculation:', error);
        return this.getDefaultFundStatistics();
      }

      // Handle case where members data is null or undefined
      if (!members || !Array.isArray(members)) {
        console.warn('No members data found for statistics calculation');
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

      // Calculate statistics from members table
      members.forEach((member: any) => {
        // Calculate current balance from various fields
        // Use savings_balance if available in financial_info, otherwise use total_contributions
        const financialInfo = member?.financial_info || {};
        const currentBalance = typeof financialInfo?.current_balance === 'number'
          ? financialInfo.current_balance
          : (typeof financialInfo?.savings_balance === 'number'
            ? financialInfo.savings_balance
            : (typeof financialInfo?.total_contributions === 'number'
              ? financialInfo.total_contributions
              : 0));

        // Calculate outstanding amount - only use catch_up_fee since unpaid_contributions and penalties columns don't exist
        // Also check financial_info.outstanding_amount as fallback
        const outstandingAmount = (member.catch_up_fee || 0) + 
                                 (financialInfo.outstanding_amount || 0);

        totalFundValue += currentBalance;
        totalOutstanding += outstandingAmount;

        // Categorize members based on outstanding percentage
        const expectedContributions = 16600; // 83 months * R200
        const outstandingPercentage = outstandingAmount > 0 ? (outstandingAmount / expectedContributions * 100) : 0;

        if (outstandingPercentage === 0) {
          membersByStanding.good++;
        } else if (outstandingPercentage <= 10) {
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
      });

      // Return calculated statistics
      return {
        totalMembers: members.length,
        totalFundValue: Math.max(0, totalFundValue),
        totalLoansOutstanding: Math.max(0, totalOutstanding),
        totalContributionsThisMonth: 0,
        membersByStanding
      };
    } catch (error) {
      console.error('Exception in calculateFundStatisticsFromMembers:', error);
      return this.getDefaultFundStatistics();
    }
  }

  /**
   * Returns safe default fund statistics to prevent undefined property errors
   */
  private static getDefaultFundStatistics(): FundStatistics {
    return {
      totalMembers: 0,
      totalFundValue: 0,
      totalLoansOutstanding: 0,
      totalContributionsThisMonth: 0,
      membersByStanding: {
        good: 0,
        owing_10: 0,
        owing_20: 0,
        owing_30: 0,
        owing_50: 0,
        owing_65: 0,
        owing_65_plus: 0
      }
    };
  }

  /**
   * Get member by member number - alias for getMemberByNumber to match RealMemberService API
   */
  static async getMember(memberNumber: string): Promise<Member | null> {
    return this.getMemberByNumber(memberNumber);
  }

  /**
   * Verify member number exists - matches RealMemberService API
   */
  static async verifyMemberNumber(memberNumber: string): Promise<boolean> {
    try {
      const member = await this.getMemberByNumber(memberNumber);
      return !!member;
    } catch (error) {
      console.error('Error verifying member number:', error);
      return false;
    }
  }

  /**
   * Get all members in expected format - matches RealMemberService API
   * FIXED: Numeric ordering and outstanding amount calculation
   */
  static async getAllMembers(): Promise<Member[]> {
    try {
      // Get all members WITHOUT ordering (we'll sort numerically on client side)
      const { data: members, error } = await supabase
        .from('members')
        .select('*');

      if (error) {
        console.error('Error fetching members:', error);
        return [];
      }

      // Get all member balances
      const { data: balances, error: balancesError } = await supabase
        .from('member_balances')
        .select('*');

      if (balancesError) {
        console.warn('Error fetching member balances:', balancesError);
        // Continue without balances
      }

      // Create a lookup for balances by member_id
      const balanceLookup: { [key: number]: any } = {};
      if (balances && Array.isArray(balances)) {
        balances.forEach(balance => {
          balanceLookup[balance.member_id] = balance;
        });
      }

      // Convert database format to Member interface
      const membersList = members.map((member: any) => {
        const balanceData = balanceLookup[member.id];
        
        // Use actual balance data if available, otherwise use financial_info as fallback
        // FIX: Calculate outstanding amount - only use catch_up_fee since unpaid_contributions and penalties columns don't exist
        // Also check financial_info.outstanding_amount as fallback
        const financialInfoData = member.financial_info || {};
        const outstandingAmount = (member.catch_up_fee || 0) + (financialInfoData.outstanding_amount || 0);
        
        const financialInfo = balanceData ? {
          totalContributions: balanceData.total_contributions || 0,
          currentBalance: balanceData.savings_balance || 0,
          outstandingAmount: outstandingAmount,
          percentageOutstanding: outstandingAmount > 0 ? (outstandingAmount / 16600 * 100) : 0,
          balanceBroughtForward: 0,
          plannedContributions: 0,
          actualContributions: balanceData.total_contributions || 0,
          currentInterestEarned: 0,
          totalInterestEarned: balanceData.total_interest_earned || 0,
          currentInterestCharged: 0,
          totalInterestCharged: 0,
          lastInterestCalculation: new Date(),
          interestRate: 5.5 // Default interest rate
        } : member.financial_info ? {
          totalContributions: member.financial_info.total_contributions || 0,
          currentBalance: member.financial_info.current_balance || 0,
          outstandingAmount: member.financial_info.outstanding_amount || 0,
          percentageOutstanding: member.financial_info.percentage_outstanding || 0,
          balanceBroughtForward: member.financial_info.balance_brought_forward || 0,
          plannedContributions: member.financial_info.planned_contributions || 0,
          actualContributions: member.financial_info.actual_contributions || 0,
          currentInterestEarned: member.financial_info.current_interest_earned || 0,
          totalInterestEarned: member.financial_info.total_interest_earned || 0,
          currentInterestCharged: member.financial_info.current_interest_charged || 0,
          totalInterestCharged: member.financial_info.total_interest_charged || 0,
          lastInterestCalculation: member.financial_info.last_interest_calculation ? new Date(member.financial_info.last_interest_calculation) : new Date(),
          interestRate: member.financial_info.interest_rate || 0
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

        // Determine membership status based on net balance
        let standingCategory = 'good';
        if (balanceData && balanceData.net_balance < 0) {
          const outstandingPercentage = Math.abs(balanceData.net_balance) / 16600 * 100;
          if (outstandingPercentage <= 10) {
            standingCategory = 'owing_10';
          } else if (outstandingPercentage <= 20) {
            standingCategory = 'owing_20';
          } else if (outstandingPercentage <= 30) {
            standingCategory = 'owing_30';
          } else if (outstandingPercentage <= 50) {
            standingCategory = 'owing_50';
          } else if (outstandingPercentage <= 65) {
            standingCategory = 'owing_65';
          } else {
            standingCategory = 'owing_65_plus';
          }
        }

        // Use the name column if available, otherwise fall back to personal_info
        // Enhanced name handling with comprehensive fallbacks
        let personalInfo;
        
        if (member.name && member.name.trim() !== '') {
          // Use the name column if it exists and is not empty
          const nameParts = member.name.trim().split(' ');
          personalInfo = {
            firstName: nameParts[0] || '',
            lastName: nameParts.slice(1).join(' ') || '',
            fullName: member.name.trim()
          };
        } else if (member.personal_info && typeof member.personal_info === 'object') {
          // Use personal_info if it exists and is an object
          personalInfo = {
            firstName: member.personal_info.firstName || member.personal_info.first_name || '',
            lastName: member.personal_info.lastName || member.personal_info.last_name || '',
            fullName: member.personal_info.fullName || member.personal_info.full_name || 
                     `${member.personal_info.firstName || member.personal_info.first_name || ''} ${member.personal_info.lastName || member.personal_info.last_name || ''}`.trim() || 
                     `Member ${member.member_number}`
          };
        } else {
          // Fallback to member number if no name data is available
          personalInfo = {
            firstName: '',
            lastName: '',
            fullName: `Member ${member.member_number}`
          };
        }

        return {
          memberNumber: member.member_number,
          userId: member.user_id,
          personalInfo: personalInfo,
          financialInfo: financialInfo,
          contributionHistory: member.contribution_history || [],
          loanHistory: member.loan_history || [],
          interestHistory: member.interest_history || [],
          membershipStatus: {
            isActive: true,
            standingCategory: standingCategory
          },
          interestSettings: member.interest_settings,
          lastUpdated: new Date(member.last_updated)
        } as Member;
      });

      // FIX: Sort members by numeric value instead of string
      const sortedMembers = membersList.sort((a, b) => {
        const numA = parseInt(a.memberNumber);
        const numB = parseInt(b.memberNumber);
        return numA - numB;
      });

      return sortedMembers;
    } catch (error) {
      console.error('Exception in getAllMembers:', error);
      return [];
    }
  }

  /**
   * Get user ID by member number - matches MemberService API
   */
  static async getUserByMemberNumber(memberNumber: string): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('uid')
        .eq('membernumber', memberNumber)
        .single();

      if (error) {
        console.error('Error getting user by member number:', error);
        return null;
      }

      return data?.uid || null;
    } catch (error) {
      console.error('Exception in getUserByMemberNumber:', error);
      return null;
    }
  }
}

// Fallback to mock data if Supabase is not available
export class MockMemberService {
  static async getMemberByNumber(memberNumber: string): Promise<Member | null> {
    // This would be replaced with actual mock data logic
    return null;
  }

  static async validateMemberNumber(memberNumber: string): Promise<{
    isValid: boolean;
    memberData?: Partial<Member>;
    error?: string;
  }> {
    return {
      isValid: false,
      error: 'Mock service - member validation not implemented'
    };
  }

  static async isMemberNumberLinked(memberNumber: string): Promise<boolean> {
    return false;
  }
}

// Export the appropriate service based on environment
export const MemberService = process.env.NODE_ENV === 'test' ? MockMemberService : SupabaseMemberService;
