import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  email: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    idNumber?: string;
    dateOfBirth?: Date;
    phoneNumber?: string;
    address?: {
      street: string;
      city: string;
      province: string;
      postalCode: string;
    };
  };
  role: 'superuser' | 'admin' | 'member';
  accountStatus: {
    isVerified: boolean;
  };
  memberNumber?: string;
  membershipInfo?: {
    membershipType: 'new' | 'existing';
    joinDate: Date;
  };
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, userData: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
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
      // Mock login - always succeed for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'superuser@plf.com' && password === 'Wawa@PLF2025') {
        setCurrentUser({
          email: 'superuser@plf.com',
          personalInfo: {
            firstName: 'Super',
            lastName: 'User'
          },
          role: 'superuser',
          accountStatus: {
            isVerified: true
          }
        });
      } else {
        setCurrentUser({
          email: email,
          personalInfo: {
            firstName: 'Demo',
            lastName: 'User'
          },
          role: 'member',
          accountStatus: {
            isVerified: false
          }
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
        email: email,
        personalInfo: userData.personalInfo!,
        role: 'member',
        accountStatus: {
          isVerified: false
        },
        memberNumber: userData.memberNumber,
        membershipInfo: userData.membershipInfo
      });
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setCurrentUser(null);
  };

  const value: AuthContextType = {
    currentUser,
    loading,
    login,
    signup,
    logout
  };

  return (
    <MockAuthContext.Provider value={value}>
      {children}
    </MockAuthContext.Provider>
  );
};
