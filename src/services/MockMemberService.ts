// Mock member service for demo purposes
import { Member, FundStatistics } from '../types/index';

// Mock fund statistics data
export const mockFundStatistics: FundStatistics = {
  totalMembers: 150,
  totalFundValue: 1250000,
  totalLoansOutstanding: 375000,
  totalContributionsThisMonth: 45000,
  membersByStanding: {
    good: 85,
    owing_10: 25,
    owing_20: 18,
    owing_30: 12,
    owing_50: 6,
    owing_65: 3,
    owing_65_plus: 1
  }
};

// Mock member data
export const mockMemberData: Member = {
  memberNumber: 'MEMBER001',
  userId: 'user-123',
  financialInfo: {
    totalContributions: 25000,
    currentBalance: 18000,
    outstandingAmount: 0,
    percentageOutstanding: 0,
    balanceBroughtForward: 0,
    plannedContributions: 2000,
    actualContributions: 2000
  },
  contributionHistory: [
    {
      amount: 2000,
      date: new Date('2025-09-01'),
      type: 'monthly',
      status: 'approved'
    },
    {
      amount: 2000,
      date: new Date('2025-08-01'),
      type: 'monthly',
      status: 'approved'
    },
    {
      amount: 2000,
      date: new Date('2025-07-01'),
      type: 'monthly',
      status: 'approved'
    }
  ],
  loanHistory: [],
  membershipStatus: {
    isActive: true,
    standingCategory: 'good'
  },
  lastUpdated: new Date()
};

class MockMemberService {
  // Get fund statistics
  static async getFundStatistics(): Promise<FundStatistics> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('MockMemberService.getFundStatistics() returning:', mockFundStatistics);
    return mockFundStatistics;
  }

  // Get member by user ID
  static async getMemberByUserId(userId: string): Promise<Member | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockMemberData;
  }

  // Get all members (for admin views)
  static async getAllMembers(): Promise<Member[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate some mock members with different standings
    const members: Member[] = [
      { ...mockMemberData, memberNumber: 'MEMBER001', financialInfo: { ...mockMemberData.financialInfo, outstandingAmount: 0 } },
      { ...mockMemberData, memberNumber: 'MEMBER002', financialInfo: { ...mockMemberData.financialInfo, outstandingAmount: 2500, percentageOutstanding: 12.5 }, membershipStatus: { isActive: true, standingCategory: 'owing_10' } },
      { ...mockMemberData, memberNumber: 'MEMBER003', financialInfo: { ...mockMemberData.financialInfo, outstandingAmount: 4000, percentageOutstanding: 20 }, membershipStatus: { isActive: true, standingCategory: 'owing_20' } },
      { ...mockMemberData, memberNumber: 'MEMBER004', financialInfo: { ...mockMemberData.financialInfo, outstandingAmount: 6000, percentageOutstanding: 30 }, membershipStatus: { isActive: true, standingCategory: 'owing_30' } },
      { ...mockMemberData, memberNumber: 'MEMBER005', financialInfo: { ...mockMemberData.financialInfo, outstandingAmount: 10000, percentageOutstanding: 50 }, membershipStatus: { isActive: true, standingCategory: 'owing_50' } }
    ];
    
    return members;
  }

  // Get member by member number
  static async getMemberByNumber(memberNumber: string): Promise<Member | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (memberNumber === 'MEMBER001') {
      return mockMemberData;
    }
    
    return null;
  }

  // Update member standing
  static async updateMemberStanding(memberNumber: string, standing: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 400));
    console.log(`Updated member ${memberNumber} standing to ${standing}`);
    return true;
  }

  // Get member contribution history
  static async getMemberContributions(memberNumber: string): Promise<any[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockMemberData.contributionHistory;
  }

  // Get recent transactions
  static async getRecentTransactions(): Promise<any[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        transactionId: 'TXN001',
        memberNumber: 'MEMBER001',
        type: 'deposit',
        amount: 2000,
        description: 'Monthly contribution',
        date: new Date('2025-09-01'),
        status: 'approved'
      },
      {
        transactionId: 'TXN002',
        memberNumber: 'MEMBER002',
        type: 'deposit',
        amount: 1500,
        description: 'Monthly contribution',
        date: new Date('2025-09-01'),
        status: 'approved'
      },
      {
        transactionId: 'TXN003',
        memberNumber: 'MEMBER003',
        type: 'loan_repayment',
        amount: 500,
        description: 'Loan repayment',
        date: new Date('2025-08-30'),
        status: 'approved'
      }
    ];
  }
}

export default MockMemberService;
