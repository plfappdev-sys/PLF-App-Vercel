import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth, db, app, isFirebaseInitialized } from '../../firebase.rn.config';
import { User, UserRole } from '../types/index';
import MemberService from '../services/memberService';
import { UserService } from '../services/UserService';
import { User as FirebaseUser, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { isFirebaseAuthAvailable, withFirebaseAuthCheck, safeFirebaseOperation } from '../utils/firebaseUtils';
import { Alert } from 'react-native';

interface AuthContextType {
  currentUser: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, userData: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (userData: Partial<User>) => Promise<void>;
  verifyMemberNumber: (memberNumber: string) => Promise<boolean>;
  
  // Role-based permission checks
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
  isSuperUser: () => boolean;
  isAdmin: () => boolean;
  isExecutive: () => boolean;
  isMember: () => boolean;
  
  // Executive functions
  getPendingApprovals: () => Promise<User[]>;
  approveUser: (userId: string, notes?: string) => Promise<void>;
  rejectUser: (userId: string, notes?: string) => Promise<void>;
  updateUserRole: (userId: string, newRole: UserRole) => Promise<void>;
  
  // User management
  getAllUsers: () => Promise<User[]>;
  getUserStatistics: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize SuperUser account and member data
  const initializeSystemData = async () => {
    try {
      // Initialize member data first
      await MemberService.initializeMemberData();
      
      // Check if SuperUser exists - handle permission errors gracefully
      try {
        const superUserDoc = await db.collection('users').doc('superuser@plf.com').get();
        if (!superUserDoc.exists) {
          // Create SuperUser account data in Firestore
          const superUserData: User = {
            uid: 'superuser-uid',
            email: 'superuser@plf.com',
            role: 'superuser',
            personalInfo: {
              firstName: 'Super',
              lastName: 'User',
              idNumber: '0000000000000',
              dateOfBirth: new Date('1980-01-01'),
              phoneNumber: '+27000000000',
              address: {
                street: 'System Admin',
                city: 'System',
                province: 'System',
                postalCode: '0000'
              }
            },
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

          await db.collection('users').doc('superuser@plf.com').set(superUserData);
          console.log('SuperUser account initialized');
        }
      } catch (firestoreError) {
        console.warn('Firestore permissions issue - this is normal during development without proper security rules');
        console.warn('You need to set up Firestore security rules in the Firebase console');
      }
    } catch (error) {
      console.error('Error initializing system data:', error);
    }
  };

  // Fetch user profile from Firestore
  const fetchUserProfile = async (firebaseUser: FirebaseUser): Promise<User | null> => {
    try {
      const userDoc = await db.collection('users').doc(firebaseUser.email || firebaseUser.uid).get();
      if (userDoc.exists) {
        const userData = userDoc.data() as User;
        // Convert Firestore timestamps to Date objects
        return {
          ...userData,
          personalInfo: {
            ...userData.personalInfo,
            dateOfBirth: userData.personalInfo.dateOfBirth instanceof Date 
              ? userData.personalInfo.dateOfBirth 
              : new Date(userData.personalInfo.dateOfBirth)
          },
          createdAt: userData.createdAt instanceof Date 
            ? userData.createdAt 
            : new Date(userData.createdAt),
          updatedAt: userData.updatedAt instanceof Date 
            ? userData.updatedAt 
            : new Date(userData.updatedAt),
          membershipInfo: userData.membershipInfo ? {
            ...userData.membershipInfo,
            joinDate: userData.membershipInfo.joinDate instanceof Date 
              ? userData.membershipInfo.joinDate 
              : new Date(userData.membershipInfo.joinDate)
          } : undefined
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  // Verify member number
  const verifyMemberNumber = async (memberNumber: string): Promise<boolean> => {
    try {
      const exists = await MemberService.verifyMemberNumber(memberNumber);
      if (!exists) return false;
      
      const isTaken = await MemberService.isMemberNumberTaken(memberNumber);
      return !isTaken;
    } catch (error) {
      console.error('Error verifying member number:', error);
      return false;
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    try {
      // Special handling for SuperUser (since we can't create Firebase auth for demo)
      if (email === 'superuser@plf.com' && password === 'Wawa@PLF2025') {
        const superUserDoc = await db.collection('users').doc('superuser@plf.com').get();
        if (superUserDoc.exists) {
          setCurrentUser(superUserDoc.data() as User);
          return;
        }
      }
      
      // Check if Firebase auth is available
      if (!isFirebaseAuthAvailable(auth)) {
        throw new Error('Firebase authentication is not available. Please check your internet connection and try again.');
      }
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userProfile = await fetchUserProfile(userCredential.user);
      setCurrentUser(userProfile);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Signup function
  const signup = async (email: string, password: string, userData: Partial<User>): Promise<void> => {
    try {
      // Verify member number if it's an existing member
      if (userData.membershipInfo?.membershipType === 'existing' && userData.memberNumber) {
        const isValid = await verifyMemberNumber(userData.memberNumber);
        if (!isValid) {
          throw new Error('Invalid member number or member number already in use');
        }
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      const newUser: User = {
        uid: userCredential.user.uid,
        email: email,
        role: 'member', // Default role
        personalInfo: userData.personalInfo!,
        accountStatus: {
          isActive: true,
          isVerified: false,
          verificationDocuments: {
            verificationStatus: 'pending'
          }
        },
        membershipInfo: userData.membershipInfo,
        memberNumber: userData.memberNumber,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: userCredential.user.uid
      };

      // Save user profile to Firestore
      await db.collection('users').doc(email).set(newUser);
      
      // Link to existing member if applicable
      if (userData.memberNumber && userData.membershipInfo?.membershipType === 'existing') {
        await MemberService.linkMemberToUser(userData.memberNumber, userCredential.user.uid);
      }
      
      setCurrentUser(newUser);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      // Special handling for SuperUser
      if (currentUser?.email === 'superuser@plf.com') {
        setCurrentUser(null);
        setFirebaseUser(null);
        return;
      }
      
      await signOut(auth);
      setCurrentUser(null);
      setFirebaseUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = async (userData: Partial<User>): Promise<void> => {
    if (!currentUser) throw new Error('No user logged in');
    
    try {
      const updatedUser = {
        ...currentUser,
        ...userData,
        updatedAt: new Date()
      };
      
      await db.collection('users').doc(currentUser.email).set(updatedUser, { merge: true });
      setCurrentUser(updatedUser);
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        const userProfile = await fetchUserProfile(firebaseUser);
        setCurrentUser(userProfile);
      } else {
        // Check if we have a SuperUser session
        if (!currentUser || currentUser.email !== 'superuser@plf.com') {
          setCurrentUser(null);
        }
      }
      
      setLoading(false);
    });

    // Initialize system data
    initializeSystemData();

    return unsubscribe;
  }, []);

  // Role-based permission checks
  const hasRole = (role: UserRole): boolean => {
    return currentUser?.role === role;
  };

  const hasAnyRole = (roles: UserRole[]): boolean => {
    return roles.includes(currentUser?.role as UserRole);
  };

  const isSuperUser = (): boolean => hasRole('superuser');
  const isAdmin = (): boolean => hasRole('admin');
  const isExecutive = (): boolean => hasRole('executive');
  const isMember = (): boolean => hasRole('member');

  // Executive functions
  const getPendingApprovals = async (): Promise<User[]> => {
    if (!isSuperUser() && !isAdmin() && !isExecutive()) {
      throw new Error('Insufficient permissions');
    }
    return UserService.getPendingApprovals();
  };

  const approveUser = async (userId: string, notes?: string): Promise<void> => {
    if (!isSuperUser() && !isAdmin() && !isExecutive()) {
      throw new Error('Insufficient permissions');
    }
    await UserService.updateApprovalStatus(userId, true, currentUser?.email || 'system', notes);
  };

  const rejectUser = async (userId: string, notes?: string): Promise<void> => {
    if (!isSuperUser() && !isAdmin() && !isExecutive()) {
      throw new Error('Insufficient permissions');
    }
    await UserService.updateApprovalStatus(userId, false, currentUser?.email || 'system', notes);
  };

  const updateUserRole = async (userId: string, newRole: UserRole): Promise<void> => {
    if (!isSuperUser()) {
      throw new Error('Only SuperUser can update user roles');
    }
    await UserService.updateUserRole(userId, newRole, currentUser?.email || 'system');
  };

  // User management
  const getAllUsers = async (): Promise<User[]> => {
    if (!isSuperUser() && !isAdmin()) {
      throw new Error('Insufficient permissions');
    }
    return UserService.getAllUsers();
  };

  const getUserStatistics = async (): Promise<any> => {
    if (!isSuperUser() && !isAdmin()) {
      throw new Error('Insufficient permissions');
    }
    return UserService.getUserStatistics();
  };

  const value: AuthContextType = {
    currentUser,
    firebaseUser,
    loading,
    login,
    signup,
    logout,
    updateUserProfile,
    verifyMemberNumber,
    hasRole,
    hasAnyRole,
    isSuperUser,
    isAdmin,
    isExecutive,
    isMember,
    getPendingApprovals,
    approveUser,
    rejectUser,
    updateUserRole,
    getAllUsers,
    getUserStatistics
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
