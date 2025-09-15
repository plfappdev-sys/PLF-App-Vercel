import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  uid: string;
  email: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    idNumber: string;
    dateOfBirth: Date;
    phoneNumber: string;
    address: {
      street: string;
      city: string;
      province: string;
      postalCode: string;
    };
  };
  role: 'superuser' | 'admin' | 'executive' | 'member';
  accountStatus: {
    isActive: boolean;
    isVerified: boolean;
    verificationDocuments: {
      verificationStatus: 'pending' | 'approved' | 'rejected';
      rejectionReason?: string;
    };
  };
  memberNumber?: string;
  membershipInfo?: {
    membershipType: 'new' | 'existing';
    joinDate: Date;
    nominatedBeneficiary?: {
      name: string;
      relationship: string;
      contactInfo: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, userData: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
  getPendingApprovals: () => Promise<User[]>;
  approveUser: (userId: string, notes: string) => Promise<void>;
  rejectUser: (userId: string, notes: string) => Promise<void>;
  isSuperUser: () => boolean;
  isAdmin: () => boolean;
  isExecutive: () => boolean;
}

const MockAuthContext = createContext<AuthContextType | undefined>(undefined);

export const useMockAuth = () => {
  const context = useContext(MockAuthContext);
  if (context === undefined) {
    throw new Error('useMockAuth must be used within a MockAuthProvider');
  }
  return context;
};

interface MockAuthProviderProps {
  children: ReactNode;
}

export const MockAuthProvider: React.FC<MockAuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      console.log('MockAuthContext: Login attempt with', email);
      // Mock login - always succeed for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Predefined users for testing different roles
      if (email === 'superuser@plf.com' && password === 'Wawa@PLF2025') {
        console.log('MockAuthContext: SuperUser login successful');
        const user: User = {
          uid: 'superuser-001',
          email: 'superuser@plf.com',
          personalInfo: {
            firstName: 'Super',
            lastName: 'User',
            idNumber: '1234567890123',
            dateOfBirth: new Date('1980-01-01'),
            phoneNumber: '0123456789',
            address: {
              street: '123 Main St',
              city: 'Johannesburg',
              province: 'Gauteng',
              postalCode: '2000'
            }
          },
          role: 'superuser',
          accountStatus: {
            isActive: true,
            isVerified: true,
            verificationDocuments: {
              verificationStatus: 'approved'
            }
          },
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'system'
        };
        setCurrentUser(user);
      } else if (email === 'admin@plf.com' && password === 'Admin@PLF2025') {
        setCurrentUser({
          uid: 'admin-001',
          email: 'admin@plf.com',
          personalInfo: {
            firstName: 'Admin',
            lastName: 'User',
            idNumber: '1234567890124',
            dateOfBirth: new Date('1985-01-01'),
            phoneNumber: '0123456789',
            address: {
              street: '456 Admin St',
              city: 'Johannesburg',
              province: 'Gauteng',
              postalCode: '2000'
            }
          },
          role: 'admin',
          accountStatus: {
            isActive: true,
            isVerified: true,
            verificationDocuments: {
              verificationStatus: 'approved'
            }
          },
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'system'
        });
      } else if (email === 'executive@plf.com' && password === 'Exec@PLF2025') {
        setCurrentUser({
          uid: 'executive-001',
          email: 'executive@plf.com',
          personalInfo: {
            firstName: 'Executive',
            lastName: 'User',
            idNumber: '1234567890125',
            dateOfBirth: new Date('1990-01-01'),
            phoneNumber: '0123456789',
            address: {
              street: '789 Executive St',
              city: 'Johannesburg',
              province: 'Gauteng',
              postalCode: '2000'
            }
          },
          role: 'executive',
          accountStatus: {
            isActive: true,
            isVerified: true,
            verificationDocuments: {
              verificationStatus: 'approved'
            }
          },
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'system'
        });
      } else {
        setCurrentUser({
          uid: 'member-001',
          email: email,
          personalInfo: {
            firstName: 'Demo',
            lastName: 'User',
            idNumber: '1234567890126',
            dateOfBirth: new Date('1995-01-01'),
            phoneNumber: '0123456789',
            address: {
              street: '321 Demo St',
              city: 'Johannesburg',
              province: 'Gauteng',
              postalCode: '2000'
            }
          },
          role: 'member',
          accountStatus: {
            isActive: true,
            isVerified: false,
            verificationDocuments: {
              verificationStatus: 'pending'
            }
          },
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'system'
        });
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, userData: Partial<User>): Promise<void> => {
    setLoading(true);
    try {
      // Mock signup - always succeed for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCurrentUser({
        uid: `user-${Date.now()}`,
        email: email,
        personalInfo: userData.personalInfo!,
        role: 'member',
        accountStatus: {
          isActive: true,
          isVerified: false,
          verificationDocuments: {
            verificationStatus: 'pending'
          }
        },
        memberNumber: userData.memberNumber,
        membershipInfo: userData.membershipInfo,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'self'
      } as User);
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setCurrentUser(null);
  };

  // Mock functions for member approval
  const getPendingApprovals = async (): Promise<User[]> => {
    // Return mock pending users
    return [
      {
        uid: 'pending-001',
        email: 'pending@plf.com',
        personalInfo: {
          firstName: 'Pending',
          lastName: 'User',
          idNumber: '1234567890127',
          dateOfBirth: new Date('1990-01-01'),
          phoneNumber: '0123456789',
          address: {
            street: '123 Pending St',
            city: 'Johannesburg',
            province: 'Gauteng',
            postalCode: '2000'
          }
        },
        role: 'member',
        accountStatus: {
          isActive: true,
          isVerified: false,
          verificationDocuments: {
            verificationStatus: 'pending'
          }
        },
        memberNumber: 'P001',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'self'
      } as User
    ];
  };

  const approveUser = async (userId: string, notes: string): Promise<void> => {
    // Mock approval - just log for now
    console.log(`User ${userId} approved with notes: ${notes}`);
  };

  const rejectUser = async (userId: string, notes: string): Promise<void> => {
    // Mock rejection - just log for now
    console.log(`User ${userId} rejected with notes: ${notes}`);
  };

  const isSuperUser = (): boolean => {
    return currentUser?.role === 'superuser';
  };

  const isAdmin = (): boolean => {
    return currentUser?.role === 'admin' || currentUser?.role === 'superuser';
  };

  const isExecutive = (): boolean => {
    return currentUser?.role === 'executive' || currentUser?.role === 'admin' || currentUser?.role === 'superuser';
  };

  const value: AuthContextType = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    getPendingApprovals,
    approveUser,
    rejectUser,
    isSuperUser,
    isAdmin,
    isExecutive
  };

  return (
    <MockAuthContext.Provider value={value}>
      {children}
    </MockAuthContext.Provider>
  );
};
