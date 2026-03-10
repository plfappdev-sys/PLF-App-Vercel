import { supabase } from '../config/supabase';
import { Member, FundStatistics } from '../types/index';
import { createClient } from '@supabase/supabase-js';

export class SupabaseMemberService {
  // Service role client for admin queries (bypasses RLS)
  private static supabaseAdmin = createClient(
    'https://zdnyhzasvifrskbostgn.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAyNDQ4NCwiZXhwIjoyMDczNjAwNDg0fQ.kOpqoycVNdJXC-fqqxwHPVof6e8JlJ60_J7WWF-1AHU'
  );
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
        
        // FIX: Calculate outstanding amount as Expected Contribution - Total Contribution
        // According to requirements: Outstanding Contributions = Expected Contribution - Total Contribution
        const expectedContribution = financialInfoData.expected_contribution || 0;
        const totalContributions = financialInfoData.total_contributions || 0;
        const outstandingAmount = Math.max(0, expectedContribution - totalContributions);
        const totalPenalties = memberData.total_penalties || 0;
        
        // FIX: Use net_balance for currentBalance when available, otherwise use savings_balance
        // net_balance represents the actual current balance (savings - loans)
        const currentBalance = balanceData ? 
          (balanceData.net_balance !== undefined && balanceData.net_balance !== null ? 
            balanceData.net_balance : balanceData.savings_balance || 0) : 
          (financialInfoData.current_balance !== undefined ? 
            financialInfoData.current_balance : 0);
        
        // Use actual balance data if available, otherwise use financial_info as fallback
        const financialInfo = balanceData ? {
          totalContributions: financialInfoData.total_contributions || 0,  // FIXED: Extract from JSON, not savings_balance
          currentBalance: currentBalance,
          outstandingAmount: outstandingAmount,
          percentageOutstanding: outstandingAmount > 0 ? (outstandingAmount / 16600 * 100) : 0,
          balanceBroughtForward: 0,
          plannedContributions: 0,
          actualContributions: financialInfoData.total_contributions || 0,  // FIXED: Use total_contributions for actual contributions
          currentInterestEarned: 0,
          totalInterestEarned: balanceData.total_interest_earned || 0,
          currentInterestCharged: 0,
          totalInterestCharged: 0,
          lastInterestCalculation: new Date(),
          interestRate: 5.5, // Default interest rate
          expectedContribution: financialInfoData.expected_contribution || 0,
          // New fields imported from Excel
          outstandingContributions: outstandingAmount,
          totalPenalties: totalPenalties
        } : financialInfoData ? {
          totalContributions: financialInfoData.total_contributions || 0,
          currentBalance: financialInfoData.current_balance || 0,
          outstandingAmount: outstandingAmount,
          percentageOutstanding: outstandingAmount > 0 ? (outstandingAmount / 16600 * 100) : 0,
          balanceBroughtForward: financialInfoData.balance_brought_forward || 0,
          plannedContributions: financialInfoData.planned_contributions || 0,
          actualContributions: financialInfoData.actual_contributions || 0,
          currentInterestEarned: financialInfoData.current_interest_earned || 0,
          totalInterestEarned: financialInfoData.total_interest_earned || 0,
          currentInterestCharged: financialInfoData.current_interest_charged || 0,
          totalInterestCharged: financialInfoData.total_interest_charged || 0,
          lastInterestCalculation: financialInfoData.last_interest_calculation ? new Date(financialInfoData.last_interest_calculation) : new Date(),
          interestRate: financialInfoData.interest_rate || 0,
          expectedContribution: financialInfoData.expected_contribution || 0,
          // New fields imported from Excel
          outstandingContributions: outstandingAmount,
          totalPenalties: totalPenalties
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
          interestRate: 0,
          expectedContribution: 0,
          // New fields imported from Excel
          outstandingContributions: 0,
          totalPenalties: 0
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
        const interestSettings = this.parseJsonField(memberData.interest_settings);
        const contributionHistory = this.parseJsonField(memberData.contribution_history) || [];
        const loanHistory = this.parseJsonField(memberData.loan_history) || [];
        const interestHistory = this.parseJsonField(memberData.interest_history) || [];

        // Determine membership status based on net balance - NEW BUSINESS LOGIC (same as getAllMembers)
        let standingCategory = 'good';
        if (balanceData && typeof balanceData.net_balance === 'number') {
          if (balanceData.net_balance > 0) {
            // Positive balance = member owes money, calculate outstanding percentage
            const outstandingPercentage = balanceData.net_balance / 16600 * 100;
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
          } else if (balanceData.net_balance < 0) {
            // Negative balance = member has credit = good standing
            standingCategory = 'good';
          } else {
            // Zero balance = good standing
            standingCategory = 'good';
          }
        }

        return {
          memberNumber: memberData.member_number,
          userId: memberData.user_id,
          personalInfo: personalInfo,
          financialInfo: financialInfo,
          contributionHistory: contributionHistory,
          loanHistory: loanHistory,
          interestHistory: interestHistory,
          membershipStatus: {
            isActive: true,
            standingCategory: standingCategory
          },
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
   * 1. Total Fund Contributions = Sum of all total_contributions from Excel (financial_info.total_contributions)
   * 2. Total Outstanding Contributions = Sum of all outstanding_contributions from database columns
   * 3. Good standing = Members with negative net balances (have credit) or zero outstanding
   * 4. Owing categories = Based on positive net balance amounts
   */
  static async getFundStatistics(): Promise<FundStatistics> {
    console.log('DEBUG: getFundStatistics() called with FIXED business logic');
    try {
      // Always calculate from members table to get correct Excel data
      console.log('DEBUG: Calculating fund statistics from members table (to get correct Excel data)...');
      return await this.calculateFundStatisticsFromMembers();
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
      // Get all members to calculate statistics using admin client (bypasses RLS)
      const { data: members, error } = await this.supabaseAdmin
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
        // Parse JSON fields
        const financialInfo = this.parseJsonField(member?.financial_info);
        const membershipStatus = this.parseJsonField(member?.membership_status);
        
        const actualContributions = typeof financialInfo?.actual_contributions === 'number'
          ? financialInfo.actual_contributions
          : (typeof financialInfo?.total_contributions === 'number'
            ? financialInfo.total_contributions
            : 0);
        
        const outstandingAmount = typeof financialInfo?.outstanding_amount === 'number'
          ? financialInfo.outstanding_amount
          : 0;
        
        totalFundValue += actualContributions;
        totalOutstanding += outstandingAmount;

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
      // Get all members with their financial info using admin client (bypasses RLS)
      const { data: members, error } = await this.supabaseAdmin
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
        // Parse JSON fields
        const financialInfo = this.parseJsonField(member?.financial_info);
        
        // Calculate actual contributions made by member
        // Use actual_contributions if available, otherwise fall back to total_contributions
        const actualContributions = typeof financialInfo?.actual_contributions === 'number'
          ? financialInfo.actual_contributions
          : (typeof financialInfo?.total_contributions === 'number'
            ? financialInfo.total_contributions
            : 0);

        // Calculate outstanding amount as Expected Contribution - Total Contribution
        // According to requirements: Outstanding Contributions = Expected Contribution - Total Contribution
        const expectedContribution = financialInfo.expected_contribution || 0;
        const totalContributions = financialInfo.total_contributions || 0;
        const outstandingAmount = Math.max(0, expectedContribution - totalContributions);
        const totalPenalties = member.total_penalties || 0;

        totalFundValue += actualContributions;
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
   * ADDED: Timeout mechanism to prevent hanging
   */
  static async getAllMembers(): Promise<Member[]> {
    console.log('DEBUG: getAllMembers() started');
    try {
      // Add timeout to prevent hanging queries
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Database query timeout after 8 seconds')), 8000)
      );

      console.log('DEBUG: Querying members table');
      // Get all members WITHOUT ordering (we'll sort numerically on client side)
      const queryPromise = supabase
        .from('members')
        .select('*');

      const { data: members, error } = await Promise.race([queryPromise, timeoutPromise]) as any;

      if (error) {
        console.error('Error fetching members:', error);
        return [];
      }

      console.log(`DEBUG: Found ${members?.length || 0} members in database`);

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
        // FIX: Calculate outstanding amount as Expected Contribution - Total Contribution
        // According to requirements: Outstanding Contributions = Expected Contribution - Total Contribution
        const financialInfoData = this.parseJsonField(member.financial_info);
        const expectedContribution = financialInfoData.expected_contribution || 0;
        const totalContributions = financialInfoData.total_contributions || 0;
        const outstandingAmount = Math.max(0, expectedContribution - totalContributions);
        const totalPenalties = member.total_penalties || 0;
        
        // FIX: Use net_balance for currentBalance when available, otherwise use savings_balance
        // net_balance represents the actual current balance (savings - loans)
        const currentBalance = balanceData ? 
          (balanceData.net_balance !== undefined && balanceData.net_balance !== null ? 
            balanceData.net_balance : balanceData.savings_balance || 0) : 
          (financialInfoData.current_balance !== undefined ? 
            financialInfoData.current_balance : 0);
        
        const financialInfo = balanceData ? {
          totalContributions: financialInfoData.total_contributions || 0,  // FIXED: Extract from JSON, not balanceData
          currentBalance: currentBalance,
          outstandingAmount: outstandingAmount,
          percentageOutstanding: outstandingAmount > 0 ? (outstandingAmount / 16600 * 100) : 0,
          balanceBroughtForward: 0,
          plannedContributions: 0,
          actualContributions: financialInfoData.total_contributions || 0,  // FIXED: Use total_contributions from JSON
          currentInterestEarned: 0,
          totalInterestEarned: balanceData.total_interest_earned || 0,
          currentInterestCharged: 0,
          totalInterestCharged: 0,
          lastInterestCalculation: new Date(),
          interestRate: 5.5, // Default interest rate
          expectedContribution: financialInfoData.expected_contribution || 0,
          // New fields imported from Excel
          outstandingContributions: outstandingAmount,
          totalPenalties: totalPenalties
        } : financialInfoData ? {
          totalContributions: financialInfoData.total_contributions || 0,
          currentBalance: financialInfoData.current_balance || 0,
          outstandingAmount: outstandingAmount,
          percentageOutstanding: outstandingAmount > 0 ? (outstandingAmount / 16600 * 100) : 0,
          balanceBroughtForward: financialInfoData.balance_brought_forward || 0,
          plannedContributions: financialInfoData.planned_contributions || 0,
          actualContributions: financialInfoData.actual_contributions || 0,
          currentInterestEarned: financialInfoData.current_interest_earned || 0,
          totalInterestEarned: financialInfoData.total_interest_earned || 0,
          currentInterestCharged: financialInfoData.current_interest_charged || 0,
          totalInterestCharged: financialInfoData.total_interest_charged || 0,
          lastInterestCalculation: financialInfoData.last_interest_calculation ? new Date(financialInfoData.last_interest_calculation) : new Date(),
          interestRate: financialInfoData.interest_rate || 0,
          expectedContribution: financialInfoData.expected_contribution || 0,
          // New fields imported from Excel
          outstandingContributions: outstandingAmount,
          totalPenalties: totalPenalties
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
          interestRate: 0,
          expectedContribution: 0,
          // New fields imported from Excel
          outstandingContributions: 0,
          totalPenalties: 0
        };

        // Determine membership status based on net balance - NEW BUSINESS LOGIC
        let standingCategory = 'good';
        if (balanceData && typeof balanceData.net_balance === 'number') {
          if (balanceData.net_balance > 0) {
            // Positive balance = member owes money, calculate outstanding percentage
            const outstandingPercentage = balanceData.net_balance / 16600 * 100;
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
          } else if (balanceData.net_balance < 0) {
            // Negative balance = member has credit = good standing
            standingCategory = 'good';
          } else {
            // Zero balance = good standing
            standingCategory = 'good';
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
