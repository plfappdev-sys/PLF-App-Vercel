import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  getDocs, 
  deleteDoc,
  writeBatch
} from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword, 
  updatePassword, 
  deleteUser,
  sendPasswordResetEmail,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, db } from '../../firebase.rn.config';
import { User, UserRole } from '../types/index';

export class UserService {
  // Safe date conversion helper
  static safeToDate(dateValue: any): Date {
    if (!dateValue) return new Date();
    
    // If it's already a Date object
    if (dateValue instanceof Date) return dateValue;
    
    // If it's a Firestore Timestamp with toDate method
    if (dateValue && typeof dateValue.toDate === 'function') {
      return dateValue.toDate();
    }
    
    // If it's a string or number, try to parse it
    if (typeof dateValue === 'string' || typeof dateValue === 'number') {
      const parsed = new Date(dateValue);
      return isNaN(parsed.getTime()) ? new Date() : parsed;
    }
    
    // Default fallback
    return new Date();
  }

  // Safe user data extraction
  static extractUserData(doc: any): User {
    const data = doc.data();
    
    return {
      uid: doc.id,
      email: data.email || '',
      role: data.role || 'member',
      personalInfo: {
        firstName: data.personalInfo?.firstName || '',
        lastName: data.personalInfo?.lastName || '',
        idNumber: data.personalInfo?.idNumber || '',
        dateOfBirth: this.safeToDate(data.personalInfo?.dateOfBirth),
        phoneNumber: data.personalInfo?.phoneNumber || '',
        address: data.personalInfo?.address || {
          street: '',
          city: '',
          province: '',
          postalCode: ''
        }
      },
      accountStatus: {
        isActive: data.accountStatus?.isActive !== false,
        isVerified: data.accountStatus?.isVerified || false,
        verificationDocuments: {
          verificationStatus: data.accountStatus?.verificationDocuments?.verificationStatus || 'pending'
        }
      },
      memberNumber: data.memberNumber || '',
      createdAt: this.safeToDate(data.createdAt),
      updatedAt: this.safeToDate(data.updatedAt),
      createdBy: data.createdBy || ''
    };
  }

  // Get all users with their roles and status
  static async getAllUsers(): Promise<User[]> {
    try {
      const usersRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersRef);
      
      const users = querySnapshot.docs.map(doc => this.extractUserData(doc));

      // Sort by creation date (newest first)
      return users.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      console.error('Error getting all users:', error);
      return [];
    }
  }

  // Get users by role
  static async getUsersByRole(role: UserRole): Promise<User[]> {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('role', '==', role));
      const querySnapshot = await getDocs(q);
      
      const users = querySnapshot.docs.map(doc => this.extractUserData(doc));

      return users.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      console.error('Error getting users by role:', error);
      return [];
    }
  }

  // Get user by email/ID
  static async getUserById(userId: string): Promise<User | null> {
    try {
      const userRef = doc(db, 'users', userId);
      const docSnap = await getDoc(userRef);
      
      if (docSnap.exists()) {
        return this.extractUserData(docSnap);
      }
      
      return null;
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
      const userRef = doc(db, 'users', userId);
      
      await updateDoc(userRef, {
        role: newRole,
        updatedAt: new Date(),
        lastUpdatedBy: updatedBy,
      });

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
      const userRef = doc(db, 'users', userId);
      
      await updateDoc(userRef, {
        'accountStatus.isActive': isActive,
        updatedAt: new Date(),
        lastUpdatedBy: updatedBy,
      });

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
      const userRef = doc(db, 'users', userId);
      
      await updateDoc(userRef, {
        'accountStatus.isVerified': isApproved,
        'accountStatus.verificationDocuments.verificationStatus': isApproved ? 'approved' : 'rejected',
        updatedAt: new Date(),
        approvedBy: isApproved ? approvedBy : null,
        approvalNotes: notes || '',
      });

      // Log the approval/rejection
      const action = isApproved ? 'user_approved' : 'user_rejected';
      const description = `User ${isApproved ? 'approved' : 'rejected'}${notes ? `: ${notes}` : ''}`;
      await this.logUserAction(userId, action, description, approvedBy);
    } catch (error) {
      console.error('Error updating approval status:', error);
      throw error;
    }
  }

  // Reset user password
  static async resetUserPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
      
      // Log the password reset request
      await this.logUserAction(email, 'password_reset_requested', 'Password reset email sent', 'system');
    } catch (error) {
      console.error('Error sending password reset email:', error);
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
      const userRef = doc(db, 'users', userId);
      const updateData: any = {
        updatedAt: new Date(),
        lastUpdatedBy: updatedBy,
      };

      if (updates.personalInfo) {
        Object.keys(updates.personalInfo).forEach(key => {
          updateData[`personalInfo.${key}`] = updates.personalInfo![key as keyof User['personalInfo']];
        });
      }

      if (updates.memberNumber !== undefined) {
        updateData.memberNumber = updates.memberNumber;
      }

      await updateDoc(userRef, updateData);

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
      const usersRef = collection(db, 'users');
      const q = query(
        usersRef, 
        where('accountStatus.verificationDocuments.verificationStatus', '==', 'pending'),
        where('role', '==', 'member')
      );
      const querySnapshot = await getDocs(q);
      
      const users = querySnapshot.docs.map(doc => this.extractUserData(doc));

      return users.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      console.error('Error getting pending approvals:', error);
      return [];
    }
  }

  // Link user account to member record
  static async linkUserToMember(userId: string, memberNumber: string): Promise<void> {
    try {
      const memberRef = doc(db, 'members', memberNumber);
      const memberSnap = await getDoc(memberRef);

      if (memberSnap.exists()) {
        // Update member record with user link
        await updateDoc(memberRef, {
          userId: userId,
          lastUpdated: new Date(),
        });

        // Update user record with member link
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
          memberNumber: memberNumber,
          updatedAt: new Date(),
        });
      }
    } catch (error) {
      console.error('Error linking user to member:', error);
      throw error;
    }
  }

  // Get user activity logs
  static async getUserActivityLogs(userId: string, limit: number = 50): Promise<any[]> {
    try {
      const logsRef = collection(db, 'userActivityLogs');
      const q = query(
        logsRef,
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      
      const logs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: this.safeToDate(doc.data().timestamp),
      }));

      return logs
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, limit);
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
        userId,
        action,
        description,
        performedBy,
        timestamp: new Date(),
        ipAddress: 'N/A', // Could be enhanced to capture actual IP
      };

      await setDoc(doc(collection(db, 'userActivityLogs')), logData);
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

  // Bulk operations
  static async bulkUpdateUsers(
    userIds: string[],
    updates: Partial<User>,
    updatedBy: string
  ): Promise<void> {
    try {
      const batch = writeBatch(db);

      userIds.forEach(userId => {
        const userRef = doc(db, 'users', userId);
        batch.update(userRef, {
          ...updates,
          updatedAt: new Date(),
          lastUpdatedBy: updatedBy,
        });
      });

      await batch.commit();

      // Log bulk operation
      await this.logUserAction(
        'bulk_operation',
        'bulk_update',
        `Bulk update applied to ${userIds.length} users`,
        updatedBy
      );
    } catch (error) {
      console.error('Error in bulk update:', error);
      throw error;
    }
  }
}
