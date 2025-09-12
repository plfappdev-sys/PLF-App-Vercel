export interface User {
  uid: string;
  email: string;
  role: UserRole;
  personalInfo: PersonalInfo;
  accountStatus: AccountStatus;
  membershipInfo?: MembershipInfo;
  memberNumber?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export type UserRole = 'superuser' | 'admin' | 'member';

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  idNumber: string;
  dateOfBirth: Date;
  phoneNumber: string;
  address: Address;
}

export interface Address {
  street: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface AccountStatus {
  isActive: boolean;
  isVerified: boolean;
  verificationDocuments: VerificationDocuments;
}

export interface VerificationDocuments {
  verificationStatus: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
}

export interface MembershipInfo {
  membershipType: 'new' | 'existing';
  joinDate: Date;
  nominatedBeneficiary?: Beneficiary;
}

export interface Beneficiary {
  name: string;
  relationship: string;
  contactInfo: string;
}

export interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
  membershipType: 'new' | 'existing';
  memberNumber: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  phoneNumber: string;
  address: Address;
  beneficiary: Beneficiary;
}

export interface RootStackParamList {
  Login: undefined;
  SignUp: undefined;
  Dashboard: undefined;
  Profile: undefined;
  Transactions: undefined;
  Members: undefined;
  Reports: undefined;
  Announcements: undefined;
  DepositApproval: undefined;
  LoanApproval: undefined;
  MemberManagement: undefined;
  Main: undefined;
}

// Member financial information (from reference project)
export interface Member {
  memberNumber: string;
  userId: string;
  financialInfo: {
    totalContributions: number;
    currentBalance: number;
    outstandingAmount: number;
    percentageOutstanding: number;
    balanceBroughtForward: number;
    plannedContributions: number;
    actualContributions: number;
  };
  contributionHistory: ContributionRecord[];
  loanHistory: LoanRecord[];
  membershipStatus: {
    isActive: boolean;
    standingCategory: 'good' | 'owing_10' | 'owing_20' | 'owing_30' | 'owing_50' | 'owing_65' | 'owing_65_plus';
  };
  lastUpdated: Date;
}

// Contribution record
export interface ContributionRecord {
  amount: number;
  date: Date;
  type: 'monthly' | 'additional' | 'penalty';
  status: 'pending' | 'approved' | 'rejected';
  proofOfPayment?: string;
  approvedBy?: string;
  approvalDate?: Date;
}

// Loan record
export interface LoanRecord {
  loanId: string;
  amount: number;
  applicationDate: Date;
  status: 'pending' | 'approved' | 'rejected' | 'disbursed' | 'repaid';
  approvedBy?: string;
  approvalDate?: Date;
  disbursementDate?: Date;
  repaymentSchedule: RepaymentInstallment[];
}

// Repayment installment
export interface RepaymentInstallment {
  dueDate: Date;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
}

// Fund statistics
export interface FundStatistics {
  totalMembers: number;
  totalFundValue: number;
  totalLoansOutstanding: number;
  totalContributionsThisMonth: number;
  membersByStanding: {
    good: number;
    owing_10: number;
    owing_20: number;
    owing_30: number;
    owing_50: number;
    owing_65: number;
    owing_65_plus: number;
  };
}
