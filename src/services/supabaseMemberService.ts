import { supabase } from '../../supabase.config';

export class SupabaseMemberService {
  // Initialize member data (placeholder for now)
  static async initializeMemberData(): Promise<void> {
    console.log('Member data initialization placeholder');
  }

  // Verify if a member number exists in the system
  static async verifyMemberNumber(memberNumber: string): Promise<boolean> {
    try {
      // This would typically check against a members table
      // For now, we'll simulate some validation
      if (!memberNumber || memberNumber.trim() === '') {
        return false;
      }
      
      // Simple validation - member numbers should start with "member" followed by numbers
      const memberRegex = /^member\d+$/i;
      return memberRegex.test(memberNumber);
    } catch (error) {
      console.error('Error verifying member number:', error);
      return false;
    }
  }

  // Check if a member number is already taken by a user
  static async isMemberNumberTaken(memberNumber: string): Promise<boolean> {
    try {
      // Check if any user has this member number
      const { data, error } = await supabase
        .from('users')
        .select('member_number')
        .eq('member_number', memberNumber)
        .single();

      if (error) {
        // If no user found with this member number, it's available
        if (error.code === 'PGRST116') {
          return false;
        }
        console.error('Error checking if member number is taken:', error);
        return false;
      }

      // Member number exists and is taken
      return true;
    } catch (error) {
      console.error('Error checking if member number is taken:', error);
      return false;
    }
  }

  // Link a member number to a user
  static async linkMemberToUser(memberNumber: string, userId: string): Promise<void> {
    try {
      // Update user record with member number
      const { error } = await supabase
        .from('users')
        .update({
          member_number: memberNumber,
          updated_at: new Date().toISOString(),
        })
        .eq('uid', userId);

      if (error) {
        throw error;
      }

      // Also create a record in member_numbers table if it exists
      const { error: memberNumberError } = await supabase
        .from('member_numbers')
        .insert({
          member_number: memberNumber,
          user_id: userId,
          linked_at: new Date().toISOString()
        });

      if (memberNumberError && !memberNumberError.message.includes('relation "member_numbers" does not exist')) {
        console.error('Error creating member number record:', memberNumberError);
      }
    } catch (error) {
      console.error('Error linking member to user:', error);
      throw error;
    }
  }

  // Get user by member number
  static async getUserByMemberNumber(memberNumber: string): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('uid')
        .eq('member_number', memberNumber)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // No user found with this member number
        }
        console.error('Error getting user by member number:', error);
        return null;
      }

      return data.uid;
    } catch (error) {
      console.error('Error getting user by member number:', error);
      return null;
    }
  }

  // Create a new member record
  static async createMember(memberData: {
    memberNumber: string;
    firstName: string;
    lastName: string;
    idNumber: string;
    joinDate: Date;
  }): Promise<void> {
    try {
      const { error } = await supabase
        .from('members')
        .insert({
          member_number: memberData.memberNumber,
          first_name: memberData.firstName,
          last_name: memberData.lastName,
          id_number: memberData.idNumber,
          join_date: memberData.joinDate.toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          status: 'active'
        });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error creating member:', error);
      throw error;
    }
  }

  // Get member details
  static async getMember(memberNumber: string): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('member_number', memberNumber)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Member not found
        }
        console.error('Error getting member:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error getting member:', error);
      return null;
    }
  }

  // Get all members
  static async getAllMembers(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error getting all members:', error);
        return [];
      }

      return data;
    } catch (error) {
      console.error('Error getting all members:', error);
      return [];
    }
  }

  // Update member information
  static async updateMember(memberNumber: string, updates: any): Promise<void> {
    try {
      const { error } = await supabase
        .from('members')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('member_number', memberNumber);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error updating member:', error);
      throw error;
    }
  }

  // Delete member
  static async deleteMember(memberNumber: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('members')
        .delete()
        .eq('member_number', memberNumber);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error deleting member:', error);
      throw error;
    }
  }

  // Search members by name or member number
  static async searchMembers(query: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,member_number.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error searching members:', error);
        return [];
      }

      return data;
    } catch (error) {
      console.error('Error searching members:', error);
      return [];
    }
  }

  // Get member statistics
  static async getMemberStatistics(): Promise<{
    totalMembers: number;
    activeMembers: number;
    inactiveMembers: number;
    membersByStatus: Record<string, number>;
  }> {
    try {
      const members = await this.getAllMembers();
      
      const stats = {
        totalMembers: members.length,
        activeMembers: members.filter(m => m.status === 'active').length,
        inactiveMembers: members.filter(m => m.status === 'inactive').length,
        membersByStatus: {
          active: members.filter(m => m.status === 'active').length,
          inactive: members.filter(m => m.status === 'inactive').length,
          pending: members.filter(m => m.status === 'pending').length,
        },
      };

      return stats;
    } catch (error) {
      console.error('Error getting member statistics:', error);
      return {
        totalMembers: 0,
        activeMembers: 0,
        inactiveMembers: 0,
        membersByStatus: { active: 0, inactive: 0, pending: 0 },
      };
    }
  }

  // Get fund statistics (similar to RealMemberService.getFundStatistics)
  static async getFundStatistics(): Promise<{
    totalMembers: number;
    totalFundValue: number;
    totalLoansOutstanding: number;
    totalContributionsThisMonth: number;
    membersByStanding: Record<string, number>;
  }> {
    try {
      const members = await this.getAllMembers();
      
      // Calculate statistics from real data
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

      // Calculate values from member data
      members.forEach((member: any) => {
        const closingBalance = member.current_balance || 0;
        const outstanding = member.outstanding_amount || 0;
        
        totalFundValue += closingBalance;
        totalOutstanding += outstanding;

        // Categorize by outstanding percentage (simplified)
        const standing = this.getStandingCategory(outstanding);
        membersByStanding[standing as keyof typeof membersByStanding]++;
      });

      return {
        totalMembers: members.length,
        totalFundValue,
        totalLoansOutstanding: totalOutstanding,
        totalContributionsThisMonth: 0, // TODO: Implement actual calculation
        membersByStanding
      };
    } catch (error) {
      console.error('Error getting fund statistics:', error);
      // Return empty statistics on error
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
  }

  // Helper to determine standing category
  private static getStandingCategory(outstanding: number): string {
    if (outstanding === 0) return 'good';
    if (outstanding <= 240) return 'owing_10';
    if (outstanding <= 480) return 'owing_20';
    if (outstanding <= 720) return 'owing_30';
    if (outstanding <= 1200) return 'owing_50';
    if (outstanding <= 1560) return 'owing_65';
    return 'owing_65_plus';
  }
}
