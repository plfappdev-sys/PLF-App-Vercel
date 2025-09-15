import { Loan, LoanRecord, RepaymentScheduleItem, Guarantor } from '../types/index';

// Mock loan data
const mockLoans: Loan[] = [
  {
    loanId: 'LOAN001',
    memberNumber: 'member 1',
    applicationDetails: {
      requestedAmount: 15000,
      loanTerm: 12,
      purpose: 'Home renovations',
      applicationDate: new Date('2025-08-15'),
      supportingDocuments: ['document1.pdf', 'document2.pdf'],
      guarantors: [
        {
          memberNumber: 'member 2',
          guaranteeAmount: 5000,
          status: 'confirmed'
        },
        {
          memberNumber: 'member 3', 
          guaranteeAmount: 3000,
          status: 'pending'
        }
      ],
      employmentInfo: {
        employerName: 'ABC Manufacturing',
        position: 'Production Supervisor',
        salaryDate: '25th of each month',
        employmentDate: '2020-03-15',
        employerAddress: '123 Industrial Park, Johannesburg',
        employerContact: '011-555-1234'
      },
      bankingDetails: {
        bankName: 'FNB',
        accountNumber: '62123456789',
        branchCode: '250655',
        accountHolder: 'John Doe'
      },
      nextOfKin: {
        name: 'Jane Doe',
        contactNumber: '082-555-6789',
        relationship: 'Spouse'
      }
    },
    approvalProcess: {
      status: 'approved',
      reviewedBy: 'admin@plf.com',
      reviewDate: new Date('2025-08-18'),
      approvalNotes: 'Application meets all requirements. Guarantors confirmed.',
      conditions: [
        'Monthly repayments must be made on time',
        'Provide updated proof of income quarterly'
      ]
    },
    disbursementDetails: {
      approvedAmount: 15000,
      disbursementDate: new Date('2025-08-20'),
      disbursementMethod: 'Bank transfer',
      disbursedBy: 'superuser@plf.com'
    },
    repaymentSchedule: {
      totalAmount: 16500,
      interestRate: 10,
      repaymentPeriod: 12,
      monthlyPayment: 1375,
      schedule: [
        {
          installmentNumber: 1,
          dueDate: new Date('2025-09-20'),
          principalAmount: 1250,
          interestAmount: 125,
          totalAmount: 1375,
          status: 'paid'
        },
        {
          installmentNumber: 2,
          dueDate: new Date('2025-10-20'),
          principalAmount: 1260,
          interestAmount: 115,
          totalAmount: 1375,
          status: 'pending'
        },
        // ... more installments
      ]
    },
    currentStatus: {
      outstandingBalance: 15250,
      totalPaid: 1375,
      lastPaymentDate: new Date('2025-09-19'),
      nextDueDate: new Date('2025-10-20'),
      isInDefault: false
    }
  },
  {
    loanId: 'LOAN002',
    memberNumber: 'member 4',
    applicationDetails: {
      requestedAmount: 8000,
      loanTerm: 6,
      purpose: 'Education fees',
      applicationDate: new Date('2025-09-01'),
      supportingDocuments: ['tuition_invoice.pdf'],
      guarantors: [
        {
          memberNumber: 'member 5',
          guaranteeAmount: 4000,
          status: 'confirmed'
        }
      ],
      employmentInfo: {
        employerName: 'City University',
        position: 'Lecturer',
        salaryDate: 'Last day of month',
        employmentDate: '2018-08-01',
        employerAddress: '456 Academic Street, Pretoria',
        employerContact: '012-555-9876'
      },
      bankingDetails: {
        bankName: 'Standard Bank',
        accountNumber: '10123456789',
        branchCode: '051001',
        accountHolder: 'Sarah Johnson'
      },
      nextOfKin: {
        name: 'Michael Johnson',
        contactNumber: '083-555-4321',
        relationship: 'Spouse'
      }
    },
    approvalProcess: {
      status: 'pending',
      reviewedBy: undefined,
      reviewDate: undefined,
      approvalNotes: undefined,
      conditions: []
    },
    disbursementDetails: undefined,
    repaymentSchedule: undefined,
    currentStatus: {
      outstandingBalance: 0,
      totalPaid: 0,
      lastPaymentDate: undefined,
      nextDueDate: undefined,
      isInDefault: false
    }
  },
  {
    loanId: 'LOAN003',
    memberNumber: 'member 6',
    applicationDetails: {
      requestedAmount: 25000,
      loanTerm: 24,
      purpose: 'Business expansion',
      applicationDate: new Date('2025-08-10'),
      supportingDocuments: ['business_plan.pdf', 'financials.pdf'],
      guarantors: [
        {
          memberNumber: 'member 7',
          guaranteeAmount: 10000,
          status: 'confirmed'
        },
        {
          memberNumber: 'member 8',
          guaranteeAmount: 7500,
          status: 'confirmed'
        }
      ],
      employmentInfo: {
        employerName: 'Self-Employed',
        position: 'Business Owner',
        salaryDate: 'Variable',
        employmentDate: '2015-01-15',
        employerAddress: '789 Business Park, Cape Town',
        employerContact: '021-555-2468'
      },
      bankingDetails: {
        bankName: 'Nedbank',
        accountNumber: '12345678901',
        branchCode: '198765',
        accountHolder: 'David Wilson'
      },
      nextOfKin: {
        name: 'Emily Wilson',
        contactNumber: '084-555-1357',
        relationship: 'Spouse'
      }
    },
    approvalProcess: {
      status: 'under_review',
      reviewedBy: 'admin@plf.com',
      reviewDate: new Date('2025-08-12'),
      approvalNotes: 'Additional financial documentation required',
      conditions: [
        'Provide 3 years of financial statements',
        'Submit business registration documents'
      ]
    },
    disbursementDetails: undefined,
    repaymentSchedule: undefined,
    currentStatus: {
      outstandingBalance: 0,
      totalPaid: 0,
      lastPaymentDate: undefined,
      nextDueDate: undefined,
      isInDefault: false
    }
  }
];

// Mock pending loans for approval
const mockPendingLoans: Loan[] = mockLoans.filter(loan => 
  loan.approvalProcess.status === 'pending' || loan.approvalProcess.status === 'under_review'
);

// Mock loan records for member history
const mockLoanRecords: LoanRecord[] = [
  {
    loanId: 'LOAN001',
    amount: 15000,
    applicationDate: new Date('2025-08-15'),
    status: 'disbursed',
    approvedBy: 'admin@plf.com',
    approvalDate: new Date('2025-08-18'),
    disbursementDate: new Date('2025-08-20'),
    repaymentSchedule: [
      {
        dueDate: new Date('2025-09-20'),
        amount: 1375,
        status: 'paid'
      },
      {
        dueDate: new Date('2025-10-20'),
        amount: 1375,
        status: 'pending'
      },
      // ... more installments
    ]
  },
  {
    loanId: 'LOAN004',
    amount: 5000,
    applicationDate: new Date('2025-07-01'),
    status: 'repaid',
    approvedBy: 'admin@plf.com',
    approvalDate: new Date('2025-07-05'),
    disbursementDate: new Date('2025-07-10'),
    repaymentSchedule: [
      {
        dueDate: new Date('2025-08-10'),
        amount: 875,
        status: 'paid'
      },
      {
        dueDate: new Date('2025-09-10'),
        amount: 875,
        status: 'paid'
      },
      // ... all installments paid
    ]
  }
];

export class MockLoanService {
  // Get all loans (for admin/superuser)
  static async getAllLoans(): Promise<Loan[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockLoans];
  }

  // Get loans for a specific member
  static async getLoansByMember(memberNumber: string): Promise<Loan[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockLoans.filter(loan => loan.memberNumber === memberNumber);
  }

  // Get pending loans for approval
  static async getPendingLoans(): Promise<Loan[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [...mockPendingLoans];
  }

  // Get loan by ID
  static async getLoanById(loanId: string): Promise<Loan | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockLoans.find(loan => loan.loanId === loanId) || null;
  }

  // Get loan history for member
  static async getLoanHistory(memberNumber: string): Promise<LoanRecord[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockLoanRecords.filter(record => {
      const loan = mockLoans.find(l => l.loanId === record.loanId);
      return loan?.memberNumber === memberNumber;
    });
  }

  // Apply for a new loan
  static async applyForLoan(application: {
    memberNumber: string;
    requestedAmount: number;
    loanTerm: number;
    purpose: string;
    guarantors: { memberNumber: string; guaranteeAmount: number }[];
    employmentInfo: {
      employerName: string;
      position: string;
      salaryDate: string;
      employmentDate: string;
      employerAddress: string;
      employerContact: string;
    };
    bankingDetails: {
      bankName: string;
      accountNumber: string;
      branchCode: string;
      accountHolder: string;
    };
    nextOfKin: {
      name: string;
      contactNumber: string;
      relationship: string;
    };
  }): Promise<{ success: boolean; loanId?: string; error?: string }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate validation
    if (application.requestedAmount <= 0) {
      return { success: false, error: 'Loan amount must be positive' };
    }

    if (application.guarantors.length === 0) {
      return { success: false, error: 'At least one guarantor is required' };
    }

    // Generate new loan ID
    const newLoanId = `LOAN${String(mockLoans.length + 1).padStart(3, '0')}`;
    
    // Create new loan
    const newLoan: Loan = {
      loanId: newLoanId,
      memberNumber: application.memberNumber,
      applicationDetails: {
        requestedAmount: application.requestedAmount,
        loanTerm: application.loanTerm,
        purpose: application.purpose,
        applicationDate: new Date(),
        supportingDocuments: [],
        guarantors: application.guarantors.map(g => ({
          ...g,
          status: 'pending' as const
        })),
        employmentInfo: application.employmentInfo,
        bankingDetails: application.bankingDetails,
        nextOfKin: application.nextOfKin
      },
      approvalProcess: {
        status: 'pending',
        conditions: []
      },
      currentStatus: {
        outstandingBalance: 0,
        totalPaid: 0,
        isInDefault: false
      }
    };

    mockLoans.push(newLoan);
    mockPendingLoans.push(newLoan);

    return { success: true, loanId: newLoanId };
  }

  // Approve a loan
  static async approveLoan(loanId: string, approvedBy: string, notes?: string, conditions?: string[]): Promise<{ success: boolean; error?: string }> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const loan = mockLoans.find(l => l.loanId === loanId);
    if (!loan) {
      return { success: false, error: 'Loan not found' };
    }

    if (loan.approvalProcess.status !== 'pending' && loan.approvalProcess.status !== 'under_review') {
      return { success: false, error: 'Loan is not pending approval' };
    }

    // Update loan status
    loan.approvalProcess = {
      status: 'approved',
      reviewedBy: approvedBy,
      reviewDate: new Date(),
      approvalNotes: notes,
      conditions: conditions || []
    };

    // Remove from pending list
    const pendingIndex = mockPendingLoans.findIndex(l => l.loanId === loanId);
    if (pendingIndex !== -1) {
      mockPendingLoans.splice(pendingIndex, 1);
    }

    return { success: true };
  }

  // Reject a loan
  static async rejectLoan(loanId: string, rejectedBy: string, reason: string): Promise<{ success: boolean; error?: string }> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const loan = mockLoans.find(l => l.loanId === loanId);
    if (!loan) {
      return { success: false, error: 'Loan not found' };
    }

    if (loan.approvalProcess.status !== 'pending' && loan.approvalProcess.status !== 'under_review') {
      return { success: false, error: 'Loan is not pending approval' };
    }

    // Update loan status
    loan.approvalProcess = {
      status: 'rejected',
      reviewedBy: rejectedBy,
      reviewDate: new Date(),
      approvalNotes: `Rejected: ${reason}`,
      conditions: []
    };

    // Remove from pending list
    const pendingIndex = mockPendingLoans.findIndex(l => l.loanId === loanId);
    if (pendingIndex !== -1) {
      mockPendingLoans.splice(pendingIndex, 1);
    }

    return { success: true };
  }

  // Get loan statistics
  static async getLoanStatistics(): Promise<{
    totalLoans: number;
    pendingApproval: number;
    totalDisbursed: number;
    totalOutstanding: number;
    defaultRate: number;
  }> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const totalLoans = mockLoans.length;
    const pendingApproval = mockPendingLoans.length;
    const totalDisbursed = mockLoans.filter(l => l.disbursementDetails).length;
    const totalOutstanding = mockLoans.reduce((sum, loan) => sum + (loan.currentStatus?.outstandingBalance || 0), 0);
    const defaultRate = mockLoans.filter(l => l.currentStatus?.isInDefault).length / totalLoans * 100;

    return {
      totalLoans,
      pendingApproval,
      totalDisbursed,
      totalOutstanding,
      defaultRate: isNaN(defaultRate) ? 0 : defaultRate
    };
  }

  // Simulate loan repayment
  static async makeRepayment(loanId: string, amount: number, paymentDate: Date = new Date()): Promise<{ success: boolean; error?: string }> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const loan = mockLoans.find(l => l.loanId === loanId);
    if (!loan) {
      return { success: false, error: 'Loan not found' };
    }

    if (!loan.currentStatus || !loan.repaymentSchedule) {
      return { success: false, error: 'Loan not disbursed yet' };
    }

    if (amount <= 0) {
      return { success: false, error: 'Payment amount must be positive' };
    }

    // Update loan status
    loan.currentStatus.outstandingBalance = Math.max(0, loan.currentStatus.outstandingBalance - amount);
    loan.currentStatus.totalPaid += amount;
    loan.currentStatus.lastPaymentDate = paymentDate;

    // Update repayment schedule
    if (loan.repaymentSchedule) {
      const nextInstallment = loan.repaymentSchedule.schedule.find(installment => installment.status === 'pending');
      if (nextInstallment && amount >= nextInstallment.totalAmount) {
        nextInstallment.status = 'paid';
      }
    }

    return { success: true };
  }
}

export default MockLoanService;
