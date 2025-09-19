import { supabase } from '../../supabase.config';
import { Member, FundStatistics } from '../types/index';

export class SupabaseMemberService {
  /**
   * Get member by member number
   */
  static async getMemberByNumber(memberNumber: string): Promise<Member | null> {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('member_number', memberNumber)
        .single();

      if (error) {
        console.error('Error fetching member:', error);
        return null;
      }

      // Convert database snake_case to TypeScript camelCase
      if (data) {
        return {
          memberNumber: data.member_number,
          userId: data.user_id,
          personalInfo: data.personal_info,
          financialInfo: data.financial_info,
          contributionHistory: data.contribution_history || [],
          loanHistory: data.loan_history || [],
          interestHistory: data.interest_history || [],
          membershipStatus: data.membership_status,
          interestSettings: data.interest_settings,
          lastUpdated: new Date(data.last_updated)
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
   */
  static async getFundStatistics(): Promise<FundStatistics> {
    try {
      // Get all members to calculate statistics
      const { data: members, error } = await supabase
        .from('members')
        .select('*');

      if (error) {
        console.error('Error fetching members for statistics:', error);
        // Return safe default values instead of throwing
        return this.getDefaultFundStatistics();
      }

      // Handle case where members data is null or undefined
      if (!members || !Array.isArray(members)) {
        console.warn('No members data found, returning default statistics');
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
      console.error('Exception in getFundStatistics:', error);
      // Return safe default values instead of throwing to prevent app crashes
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
   */
  static async getAllMembers(): Promise<Member[]> {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('member_number');

      if (error) {
        console.error('Error fetching members:', error);
        return [];
      }

      // Convert database format to Member interface
      return data.map((member: any) => ({
        memberNumber: member.member_number,
        userId: member.user_id,
        personalInfo: member.personal_info,
        financialInfo: member.financial_info,
        contributionHistory: member.contribution_history || [],
        loanHistory: member.loan_history || [],
        interestHistory: member.interest_history || [],
        membershipStatus: member.membership_status,
        interestSettings: member.interest_settings,
        lastUpdated: new Date(member.last_updated)
      })) as Member[];
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
