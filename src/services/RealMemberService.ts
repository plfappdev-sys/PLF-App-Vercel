import { Member, FundStatistics } from '../types/index';

// Import the real member data
const realMemberData = require('../../selected_members_2024_2025.json');

class RealMemberService {
  // Get fund statistics based on real data
  static async getFundStatistics(): Promise<FundStatistics> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Calculate statistics from real data
    let totalFundValue = 0;
    let totalOutstanding = 0;
    const membersByStanding = {
      good: 0,
      owing_10: 0,
      owing_20: 0,
      owing_30: 0,
      owing_50: 0,
      owing_65: 0,
      owing_65_plus: 0
    };

    Object.values(realMemberData.members).forEach((member: any) => {
      const closingBalance = member.data["Closing Balance"] || 0;
      const outstanding = member.data["Total outstanding contribution for 12 Months "] || 0;
      
      totalFundValue += closingBalance;
      totalOutstanding += outstanding;

      // Categorize by outstanding percentage (simplified)
      const standing = RealMemberService.getStandingCategory(outstanding);
      membersByStanding[standing as keyof typeof membersByStanding]++;
    });

    return {
      totalMembers: Object.keys(realMemberData.members).length,
      totalFundValue,
      totalLoansOutstanding: totalOutstanding,
      totalContributionsThisMonth: 0,
      membersByStanding
    };
  }

  // Get all members in the expected format
  static async getAllMembers(): Promise<Member[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const members: Member[] = [];
    let memberCount = 1;

    Object.entries(realMemberData.members).forEach(([name, memberData]: [string, any]) => {
      const outstanding = memberData.data["Total outstanding contribution for 12 Months "] || 0;
      const standing = RealMemberService.getStandingCategory(outstanding);
      
      // Extract first and last name from the key
      const nameParts = name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      const member: Member = {
        memberNumber: memberData.data.Member,
        userId: `user-real-${memberCount++}`,
        personalInfo: {
          firstName,
          lastName,
          fullName: name
        },
        financialInfo: {
          totalContributions: memberData.data["Total Contribution for  4 Years (2018-24)"] || 0,
          currentBalance: memberData.data["Closing Balance"] || 0,
          outstandingAmount: outstanding,
          percentageOutstanding: outstanding / 2400 * 100 || 0,
          balanceBroughtForward: memberData.data["Balance Brought Forward "] || 0,
          plannedContributions: 2400,
          actualContributions: memberData.data["Total Contribution for 12 Months"] || 0,
          currentInterestEarned: memberData.data["Total Interest Earned @ 5,5%"] || 0,
          totalInterestEarned: memberData.data["Total Interest Earned @ 5,5%"] || 0,
          currentInterestCharged: 0,
          totalInterestCharged: 0,
          lastInterestCalculation: new Date(),
          interestRate: 0.055
        },
        contributionHistory: RealMemberService.generateContributionHistory(memberData.data),
        loanHistory: [],
        interestHistory: [],
        membershipStatus: {
          isActive: true,
          standingCategory: standing as any
        },
        interestSettings: {
          calculationMethod: 'monthly',
          compounding: true,
          taxDeduction: 0
        },
        lastUpdated: new Date()
      };
      members.push(member);
    });

    return members;
  }

  // Get member by member number
  static async getMemberByNumber(memberNumber: string): Promise<Member | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let memberCount = 1;
    for (const [name, memberData] of Object.entries(realMemberData.members)) {
      const data = (memberData as any).data;
      if (data.Member === memberNumber) {
        const outstanding = data["Total outstanding contribution for 12 Months "] || 0;
        const standing = RealMemberService.getStandingCategory(outstanding);
        
        // Extract first and last name from the key
        const nameParts = name.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        
        return {
          memberNumber: data.Member,
          userId: `user-real-${memberCount}`,
          personalInfo: {
            firstName,
            lastName,
            fullName: name
          },
          financialInfo: {
            totalContributions: data["Total Contribution for  4 Years (2018-24)"] || 0,
            currentBalance: data["Closing Balance"] || 0,
            outstandingAmount: outstanding,
            percentageOutstanding: outstanding / 2400 * 100 || 0,
            balanceBroughtForward: data["Balance Brought Forward "] || 0,
            plannedContributions: 2400,
            actualContributions: data["Total Contribution for 12 Months"] || 0,
            currentInterestEarned: data["Total Interest Earned @ 5,5%"] || 0,
            totalInterestEarned: data["Total Interest Earned @ 5,5%"] || 0,
            currentInterestCharged: 0,
            totalInterestCharged: 0,
            lastInterestCalculation: new Date(),
            interestRate: 0.055
          },
          contributionHistory: RealMemberService.generateContributionHistory(data),
          loanHistory: [],
          interestHistory: [],
          membershipStatus: {
            isActive: true,
            standingCategory: standing as any
          },
          interestSettings: {
            calculationMethod: 'monthly',
            compounding: true,
            taxDeduction: 0
          },
          lastUpdated: new Date()
        };
      }
      memberCount++;
    }
    
    return null;
  }

  // Verify member number exists
  static async verifyMemberNumber(memberNumber: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    for (const memberData of Object.values(realMemberData.members)) {
      const member = memberData as { data: { Member: string } };
      if (member.data.Member === memberNumber) {
        return true;
      }
    }
    return false;
  }

  // Helper to generate contribution history from monthly data
  private static generateContributionHistory(data: any): any[] {
    const history: any[] = [];
    const currentYear = new Date().getFullYear();
    
    // Add contributions from monthly data if available
    for (let i = 0; i < 12; i++) {
      const monthKey = `${currentYear}-${String(i + 1).padStart(2, '0')}-01 00:00:00`;
      const amount = data[monthKey] || 0;
      
      if (amount > 0) {
        history.push({
          amount,
          date: new Date(currentYear, i, 1),
          type: 'monthly',
          status: 'approved'
        });
      }
    }
    
    return history;
  }

  // Helper to determine standing category
  private static getStandingCategory(outstanding: number): string {
    if (outstanding === 0) return 'good';
    if (outstanding <= 240) return 'owing_10';
    if (outstanding <= 480) return 'owing_20';
    if (outstanding <= 720) return 'owing_30';
    if (outstanding <= 1200) return 'owing_50';
    if (outstanding <= 1560) return 'owing_65';
    return 'owing_65_plus';
  }

  // Get recent transactions (placeholder)
  static async getRecentTransactions(): Promise<any[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [];
  }
}

export default RealMemberService;
