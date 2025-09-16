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

export type UserRole = 'superuser' | 'admin' | 'executive' | 'member';

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
  [key: string]: undefined;
  Auth: undefined;
  AuthLogin: undefined;
  AuthSignUp: undefined;
  MainTabs: undefined;
  Dashboard: undefined;
  Profile: undefined;
  Transactions: undefined;
  Members: undefined;
  Reports: undefined;
  Announcements: undefined;
  DepositApproval: undefined;
  MemberManagement: undefined;
  Main: undefined;
  LoanApplication: undefined;
  LoanApproval: undefined;
  MemberApproval: undefined;
}

// Member financial information (from reference project)
export interface Member {
  memberNumber: string;
  userId: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    fullName: string;
  };
  financialInfo: {
    totalContributions: number;
    currentBalance: number;
    outstandingAmount: number;
    percentageOutstanding: number;
    balanceBroughtForward: number;
    plannedContributions: number;
    actualContributions: number;
    // Interest tracking fields
    currentInterestEarned: number;
    totalInterestEarned: number;
    currentInterestCharged: number;
    totalInterestCharged: number;
    lastInterestCalculation: Date;
    interestRate: number; // Member-specific interest rate
  };
  contributionHistory: ContributionRecord[];
  loanHistory: LoanRecord[];
  interestHistory: InterestAccrual[];
  membershipStatus: {
    isActive: boolean;
    standingCategory: 'good' | 'owing_10' | 'owing_20' | 'owing_30' | 'owing_50' | 'owing_65' | 'owing_65_plus';
  };
  interestSettings: {
    calculationMethod: 'daily' | 'monthly' | 'annual';
    compounding: boolean;
    taxDeduction: number;
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

// Transaction interface
export interface Transaction {
  transactionId: string;
  memberNumber: string;
  type: 'deposit' | 'loan_disbursement' | 'loan_repayment' | 'penalty' | 'interest_earned' | 'interest_charged';
  amount: number;
  description: string;
  date: Date;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  approvalWorkflow: {
    submittedBy: string;
    submissionDate: Date;
    reviewedBy?: string;
    reviewDate?: Date;
    approvalNotes?: string;
  };
  supportingDocuments: SupportingDocument[];
  relatedTransactions: string[];
  auditTrail: AuditEntry[];
  interestDetails?: {
    principalAmount: number;
    interestRate: number;
    period: number; // days
    calculationDate: Date;
    accrualId?: string; // Reference to interestAccruals
    compounding: boolean;
  };
}

// Supporting document
export interface SupportingDocument {
  documentType: 'proof_of_payment' | 'loan_application' | 'other';
  documentUrl: string;
  uploadDate: Date;
}

// Audit entry
export interface AuditEntry {
  action: string;
  performedBy: string;
  timestamp: Date;
  details: Record<string, any>;
}

// Deposit form
export interface DepositForm {
  amount: number;
  description: string;
  proofOfPayment: string;
}

// Repayment installment
export interface RepaymentInstallment {
  dueDate: Date;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
}

// Interest accrual record
export interface InterestAccrual {
  accrualId: string;
  memberNumber: string;
  calculationDate: Date;
  periodStart: Date;
  periodEnd: Date;
  principalAmount: number;
  interestRate: number;
  interestAmount: number;
  interestType: 'earned' | 'charged';
  compounding: boolean;
  daysInPeriod: number;
  status: 'calculated' | 'applied' | 'reversed';
  appliedDate?: Date;
  transactionId?: string; // Reference to interest transaction
}

// Loan interface
export interface Loan {
  loanId: string;
  memberNumber: string;
  applicationDetails: {
    requestedAmount: number;
    loanTerm: number; // in months
    purpose: string;
    applicationDate: Date;
    supportingDocuments: string[];
    guarantors: Guarantor[];
    employmentInfo: EmploymentInfo;
    bankingDetails: BankingDetails;
    nextOfKin: NextOfKin;
  };
  approvalProcess: {
    status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'disbursed';
    reviewedBy?: string;
    reviewDate?: Date;
    approvalNotes?: string;
    conditions: string[];
  };
  disbursementDetails?: {
    approvedAmount: number;
    disbursementDate: Date;
    disbursementMethod: string;
    disbursedBy: string;
  };
  repaymentSchedule?: {
    totalAmount: number;
    interestRate: number;
    repaymentPeriod: number;
    monthlyPayment: number;
    schedule: RepaymentScheduleItem[];
  };
  currentStatus: {
    outstandingBalance: number;
    totalPaid: number;
    lastPaymentDate?: Date;
    nextDueDate?: Date;
    isInDefault: boolean;
  };
}

// Guarantor
export interface Guarantor {
  memberNumber: string;
  guaranteeAmount: number;
  status: 'pending' | 'confirmed' | 'declined';
}

// Repayment schedule item
export interface RepaymentScheduleItem {
  installmentNumber: number;
  dueDate: Date;
  principalAmount: number;
  interestAmount: number;
  totalAmount: number;
  status: 'pending' | 'paid' | 'overdue' | 'partial';
}

// Employment information
export interface EmploymentInfo {
  employerName: string;
  position: string;
  salaryDate: string;
  employmentDate: string;
  employerAddress: string;
  employerContact: string;
}

// Banking details
export interface BankingDetails {
  bankName: string;
  accountNumber: string;
  branchCode: string;
  accountHolder: string;
}

// Next of kin information
export interface NextOfKin {
  name: string;
  contactNumber: string;
  relationship: string;
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
