// Global type declarations for the application

// Type information for MemberService - this provides declarations
// without causing duplicate identifier conflicts
interface IMemberService {
  initializeMemberData(): Promise<void>;
  verifyMemberNumber(memberNumber: string): Promise<boolean>;
  isMemberNumberTaken(memberNumber: string): Promise<boolean>;
  linkMemberToUser(memberNumber: string, userId: string): Promise<void>;
  getUserByMemberNumber(memberNumber: string): Promise<string | null>;
  createMember(memberData: {
    memberNumber: string;
    firstName: string;
    lastName: string;
    idNumber: string;
    joinDate: Date;
  }): Promise<void>;
  getMember(memberNumber: string): Promise<any>;
}

// Export the interface for use elsewhere
export type { IMemberService };

// Fallback auth type for when Firebase is not available
interface FallbackAuth {
  app: any;
  name: string;
  config: any;
  currentUser: any;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<any>;
  createUserWithEmailAndPassword: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  onAuthStateChanged: (callback: (user: any) => void) => () => void;
  setPersistence: (persistence: any) => Promise<void>;
  signInAnonymously: () => Promise<any>;
  signInWithPopup: (provider: any) => Promise<any>;
  signInWithRedirect: (provider: any) => Promise<void>;
  getRedirectResult: () => Promise<any>;
  updateCurrentUser: (user: any) => Promise<void>;
  useDeviceLanguage: () => void;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  confirmPasswordReset: (code: string, newPassword: string) => Promise<void>;
  verifyPasswordResetCode: (code: string) => Promise<string>;
  applyActionCode: (code: string) => Promise<void>;
  checkActionCode: (code: string) => Promise<any>;
}

declare global {
  var __FALLBACK_AUTH__: FallbackAuth;
}
