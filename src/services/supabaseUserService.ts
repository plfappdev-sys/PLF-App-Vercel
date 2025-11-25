import { supabase } from '../config/supabase';
import { User, UserRole } from '../types/index';

export class SupabaseUserService {
  // Safe date conversion helper
  static safeToDate(dateValue: any): Date {
    if (!dateValue) return new Date();
    
    // If it's already a Date object
    if (dateValue instanceof Date) return dateValue;
    
    // If it's a string or number, try to parse it
    if (typeof dateValue === 'string' || typeof dateValue === 'number') {
      const parsed = new Date(dateValue);
      return isNaN(parsed.getTime()) ? new Date() : parsed;
    }
    
    // Default fallback
    return new Date();
  }

  // Safe user data extraction
  static extractUserData(row: any): User {
    return {
      uid: row.uid,
      email: row.email || '',
      role: row.role || 'member',
      personalInfo: {
        firstName: row.personal_info?.first_name || '',
        lastName: row.personal_info?.last_name || '',
        idNumber: row.personal_info?.id_number || '',
        dateOfBirth: this.safeToDate(row.personal_info?.date_of_birth),
        phoneNumber: row.personal_info?.phone_number || '',
        address: row.personal_info?.address || {
          street: '',
          city: '',
          province: '',
          postalCode: ''
        }
      },
      accountStatus: {
        isActive: row.account_status?.is_active !== false,
        isVerified: row.account_status?.is_verified || false,
        verificationDocuments: {
          verificationStatus: row.account_status?.verification_documents?.verification_status || 'pending'
        }
      },
      memberNumber: row.membernumber || '',
      createdAt: this.safeToDate(row.created_at),
      updatedAt: this.safeToDate(row.updated_at),
      createdBy: row.created_by || ''
    };
  }

  // Get all users with their roles and status
  static async getAllUsers(): Promise<User[]> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error getting all users:', error);
        return [];
      }

      const users = data.map(row => this.extractUserData(row));
      return users;
    } catch (error) {
      console.error('Error getting all users:', error);
      return [];
    }
  }

  // Get users by role
  static async getUsersByRole(role: UserRole): Promise<User[]> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('role', role)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error getting users by role:', error);
        return [];
      }

      const users = data.map(row => this.extractUserData(row));
      return users;
    } catch (error) {
      console.error('Error getting users by role:', error);
      return [];
    }
  }

  // Get user by ID
  static async getUserById(userId: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('uid', userId)
        .single();

      if (error) {
        console.error('Error getting user by ID:', error);
        return null;
      }

      return this.extractUserData(data);
    } catch (error) {
      console.error('Error getting user by ID:', error);
      return null;
    }
  }

  // Update user role
  static async updateUserRole(
    userId: string,
    newRole: UserRole,
    updatedBy: string
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('users')
        .update({
          role: newRole,
        })
        .eq('uid', userId);

      if (error) {
        throw error;
      }

      // Log the role change
      await this.logUserAction(userId, 'role_change', `Role changed to ${newRole}`, updatedBy);
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  }

  // Activate/Deactivate user account
  static async updateAccountStatus(
    userId: string,
    isActive: boolean,
    updatedBy: string,
    reason?: string
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('users')
        .update({
          account_status: { is_active: isActive },
        })
        .eq('uid', userId);

      if (error) {
        throw error;
      }

      // Log the status change
      const action = isActive ? 'account_activated' : 'account_deactivated';
      const description = `Account ${isActive ? 'activated' : 'deactivated'}${reason ? `: ${reason}` : ''}`;
      await this.logUserAction(userId, action, description, updatedBy);
    } catch (error) {
      console.error('Error updating account status:', error);
      throw error;
    }
  }

  // Approve/Reject user (for member signups)
  static async updateApprovalStatus(
    userId: string,
    isApproved: boolean,
    approvedBy: string,
    notes?: string
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('users')
        .update({
          account_status: { 
            is_verified: isApproved,
            verification_documents: { verification_status: isApproved ? 'approved' : 'rejected' }
          },
        })
        .eq('uid', userId);

      if (error) {
        throw error;
      }

      // Log the approval/rejection
      const action = isApproved ? 'user_approved' : 'user_rejected';
      const description = `User ${isApproved ? 'approved' : 'rejected'}${notes ? `: ${notes}` : ''}`;
      await this.logUserAction(userId, action, description, approvedBy);
    } catch (error) {
      console.error('Error updating approval status:', error);
      throw error;
    }
  }

  // Update user personal information
  static async updateUserInfo(
    userId: string,
    updates: {
      personalInfo?: Partial<User['personalInfo']>;
      memberNumber?: string;
    },
    updatedBy: string
  ): Promise<void> {
    try {
      const updateData: any = {};

      if (updates.personalInfo) {
        updateData.personal_info = {
          first_name: updates.personalInfo.firstName,
          last_name: updates.personalInfo.lastName,
          id_number: updates.personalInfo.idNumber,
          date_of_birth: updates.personalInfo.dateOfBirth,
          phone_number: updates.personalInfo.phoneNumber,
          address: updates.personalInfo.address
        };
      }

      if (updates.memberNumber !== undefined) {
        updateData.membernumber = updates.memberNumber;
      }

      const { error } = await supabase
        .from('users')
        .update(updateData)
        .eq('uid', userId);

      if (error) {
        throw error;
      }

      // Log the info update
      await this.logUserAction(userId, 'info_updated', 'User information updated', updatedBy);
    } catch (error) {
      console.error('Error updating user info:', error);
      throw error;
    }
  }

  // Get pending user approvals
  static async getPendingApprovals(): Promise<User[]> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('account_status->verification_documents->>verification_status', 'pending')
        .eq('role', 'member')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error getting pending approvals:', error);
        return [];
      }

      const users = data.map(row => this.extractUserData(row));
      return users;
    } catch (error) {
      console.error('Error getting pending approvals:', error);
      return [];
    }
  }

  // Link user account to member record
  static async linkUserToMember(userId: string, memberNumber: string): Promise<void> {
    try {
      // Update user record with member link
      const { error: userError } = await supabase
        .from('users')
        .update({
          membernumber: memberNumber,
        })
        .eq('uid', userId);

      if (userError) {
        throw userError;
      }

      // Note: Members table update is commented out since the schema doesn't have user_id column
      // This will be implemented once the members table schema is properly updated
      console.log(`User ${userId} linked to member number ${memberNumber}`);
    } catch (error) {
      console.error('Error linking user to member:', error);
      throw error;
    }
  }

  // Get user activity logs
  static async getUserActivityLogs(userId: string, limit: number = 50): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('user_activity_logs')
        .select('*')
        .eq('user_id', userId)
        .order('timestamp', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error getting user activity logs:', error);
        return [];
      }

      const logs = data.map(log => ({
        id: log.id,
        ...log,
        timestamp: this.safeToDate(log.timestamp),
      }));

      return logs;
    } catch (error) {
      console.error('Error getting user activity logs:', error);
      return [];
    }
  }

  // Log user actions for audit trail
  static async logUserAction(
    userId: string,
    action: string,
    description: string,
    performedBy: string
  ): Promise<void> {
    try {
      const logData = {
        user_id: userId,
        action,
        description,
        performed_by: performedBy,
        timestamp: new Date().toISOString(),
        ip_address: 'N/A', // Could be enhanced to capture actual IP
      };

      const { error } = await supabase
        .from('user_activity_logs')
        .insert(logData);

      if (error) {
        console.error('Error logging user action:', error);
        // Don't throw error for logging failures
      }
    } catch (error) {
      console.error('Error logging user action:', error);
      // Don't throw error for logging failures
    }
  }

  // Get user statistics
  static async getUserStatistics(): Promise<{
    totalUsers: number;
    activeUsers: number;
    pendingApprovals: number;
    usersByRole: Record<string, number>;
    recentSignups: number;
  }> {
    try {
      const users = await this.getAllUsers();
      
      const stats = {
        totalUsers: users.length,
        activeUsers: users.filter(u => u.accountStatus?.isActive).length,
        pendingApprovals: users.filter(u => 
          u.accountStatus?.verificationDocuments?.verificationStatus === 'pending' && 
          u.role === 'member'
        ).length,
        usersByRole: {
          superuser: users.filter(u => u.role === 'superuser').length,
          admin: users.filter(u => u.role === 'admin').length,
          executive: users.filter(u => u.role === 'executive').length,
          member: users.filter(u => u.role === 'member').length,
        },
        recentSignups: users.filter(u => {
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return new Date(u.createdAt) > weekAgo;
        }).length,
      };

      return stats;
    } catch (error) {
      console.error('Error getting user statistics:', error);
      return {
        totalUsers: 0,
        activeUsers: 0,
        pendingApprovals: 0,
        usersByRole: { superuser: 0, admin: 0, executive: 0, member: 0 },
        recentSignups: 0,
      };
    }
  }
}
