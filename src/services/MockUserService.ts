import { User, UserRole } from '../types/index';

// Mock user data for testing
const mockUsers: User[] = [
  {
    uid: '1',
    email: 'superuser@plf.com',
    role: 'superuser',
    personalInfo: {
      firstName: 'Super',
      lastName: 'User',
      idNumber: '1234567890123',
      dateOfBirth: new Date('1980-01-01'),
      phoneNumber: '0123456789',
      address: {
        street: '123 Admin St',
        city: 'Johannesburg',
        province: 'Gauteng',
        postalCode: '2000'
      }
    },
    accountStatus: {
      isActive: true,
      isVerified: true,
      verificationDocuments: {
        verificationStatus: 'approved'
      }
    },
    memberNumber: 'SUPER001',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    createdBy: 'system'
  },
  {
    uid: '2',
    email: 'admin@plf.com',
    role: 'admin',
    personalInfo: {
      firstName: 'Admin',
      lastName: 'User',
      idNumber: '1234567890124',
      dateOfBirth: new Date('1985-01-01'),
      phoneNumber: '0123456780',
      address: {
        street: '456 Admin Ave',
        city: 'Pretoria',
        province: 'Gauteng',
        postalCode: '0001'
      }
    },
    accountStatus: {
      isActive: true,
      isVerified: true,
      verificationDocuments: {
        verificationStatus: 'approved'
      }
    },
    memberNumber: 'ADMIN001',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    createdBy: 'superuser@plf.com'
  },
  {
    uid: '3',
    email: 'executive@plf.com',
    role: 'executive',
    personalInfo: {
      firstName: 'Executive',
      lastName: 'User',
      idNumber: '1234567890125',
      dateOfBirth: new Date('1990-01-01'),
      phoneNumber: '0123456781',
      address: {
        street: '789 Exec Blvd',
        city: 'Cape Town',
        province: 'Western Cape',
        postalCode: '8000'
      }
    },
    accountStatus: {
      isActive: true,
      isVerified: true,
      verificationDocuments: {
        verificationStatus: 'approved'
      }
    },
    memberNumber: 'EXEC001',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
    createdBy: 'admin@plf.com'
  },
  {
    uid: '4',
    email: 'member1@plf.com',
    role: 'member',
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      idNumber: '1234567890126',
      dateOfBirth: new Date('1995-01-01'),
      phoneNumber: '0123456782',
      address: {
        street: '101 Member St',
        city: 'Durban',
        province: 'KwaZulu-Natal',
        postalCode: '4000'
      }
    },
    accountStatus: {
      isActive: true,
      isVerified: true,
      verificationDocuments: {
        verificationStatus: 'approved'
      }
    },
    memberNumber: 'M001',
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-04'),
    createdBy: 'executive@plf.com'
  },
  {
    uid: '5',
    email: 'pending@plf.com',
    role: 'member',
    personalInfo: {
      firstName: 'Pending',
      lastName: 'User',
      idNumber: '1234567890127',
      dateOfBirth: new Date('2000-01-01'),
      phoneNumber: '0123456783',
      address: {
        street: '202 Pending Ave',
        city: 'Port Elizabeth',
        province: 'Eastern Cape',
        postalCode: '6000'
      }
    },
    accountStatus: {
      isActive: true,
      isVerified: false,
      verificationDocuments: {
        verificationStatus: 'pending'
      }
    },
    memberNumber: 'P001',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    createdBy: 'system'
  }
];

export class MockUserService {
  // Get all users with their roles and status
  static async getAllUsers(): Promise<User[]> {
    return [...mockUsers];
  }

  // Get users by role
  static async getUsersByRole(role: UserRole): Promise<User[]> {
    return mockUsers.filter(user => user.role === role);
  }

  // Get user by email/ID
  static async getUserById(userId: string): Promise<User | null> {
    return mockUsers.find(user => user.uid === userId) || null;
  }

  // Update user role
  static async updateUserRole(
    userId: string,
    newRole: UserRole,
    updatedBy: string
  ): Promise<void> {
    const user = mockUsers.find(u => u.uid === userId);
    if (user) {
      user.role = newRole;
      user.updatedAt = new Date();
    }
  }

  // Activate/Deactivate user account
  static async updateAccountStatus(
    userId: string,
    isActive: boolean,
    updatedBy: string,
    reason?: string
  ): Promise<void> {
    const user = mockUsers.find(u => u.uid === userId);
    if (user && user.accountStatus) {
      user.accountStatus.isActive = isActive;
      user.updatedAt = new Date();
    }
  }

  // Approve/Reject user (for member signups)
  static async updateApprovalStatus(
    userId: string,
    isApproved: boolean,
    approvedBy: string,
    notes?: string
  ): Promise<void> {
    const user = mockUsers.find(u => u.uid === userId);
    if (user && user.accountStatus && user.accountStatus.verificationDocuments) {
      user.accountStatus.isVerified = isApproved;
      user.accountStatus.verificationDocuments.verificationStatus = isApproved ? 'approved' : 'rejected';
      user.updatedAt = new Date();
    }
  }

  // Reset user password
  static async resetUserPassword(email: string): Promise<void> {
    // Mock implementation - no actual email sent
    console.log(`Password reset email would be sent to: ${email}`);
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
    const user = mockUsers.find(u => u.uid === userId);
    if (user) {
      if (updates.personalInfo) {
        user.personalInfo = { ...user.personalInfo, ...updates.personalInfo };
      }
      if (updates.memberNumber !== undefined) {
        user.memberNumber = updates.memberNumber;
      }
      user.updatedAt = new Date();
    }
  }

  // Get pending user approvals
  static async getPendingApprovals(): Promise<User[]> {
    return mockUsers.filter(user => 
      user.accountStatus?.verificationDocuments?.verificationStatus === 'pending' && 
      user.role === 'member'
    );
  }

  // Link user account to member record
  static async linkUserToMember(userId: string, memberNumber: string): Promise<void> {
    const user = mockUsers.find(u => u.uid === userId);
    if (user) {
      user.memberNumber = memberNumber;
      user.updatedAt = new Date();
    }
  }

  // Get user activity logs
  static async getUserActivityLogs(userId: string, limit: number = 50): Promise<any[]> {
    // Mock activity logs
    return [
      {
        id: '1',
        userId,
        action: 'login',
        description: 'User logged in',
        performedBy: 'system',
        timestamp: new Date(),
        ipAddress: '192.168.1.1'
      }
    ];
  }

  // Log user actions for audit trail
  static async logUserAction(
    userId: string,
    action: string,
    description: string,
    performedBy: string
  ): Promise<void> {
    // Mock logging - just console.log for now
    console.log(`User action logged: ${action} - ${description} by ${performedBy} for user ${userId}`);
  }

  // Get user statistics
  static async getUserStatistics(): Promise<{
    totalUsers: number;
    activeUsers: number;
    pendingApprovals: number;
    usersByRole: Record<string, number>;
    recentSignups: number;
  }> {
    const users = mockUsers;
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    return {
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
      recentSignups: users.filter(u => new Date(u.createdAt) > weekAgo).length,
    };
  }

  // Bulk operations
  static async bulkUpdateUsers(
    userIds: string[],
    updates: Partial<User>,
    updatedBy: string
  ): Promise<void> {
    mockUsers.forEach(user => {
      if (userIds.includes(user.uid)) {
        Object.assign(user, updates);
        user.updatedAt = new Date();
      }
    });
  }
}
