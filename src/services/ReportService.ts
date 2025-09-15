import { Member, Transaction, FundStatistics } from '../types/index';
import MockMemberService from './MockMemberService';

export interface ReportData {
  title: string;
  generatedDate: Date;
  generatedBy: string;
  reportType: string;
  data: any;
  summary: any;
}

export class ReportService {
  // Generate Fund Status Report
  static async generateFundStatusReport(generatedBy: string): Promise<ReportData> {
    try {
      let members: Member[] = [];
      let fundStats: FundStatistics | null = null;
      let recentTransactions: any[] = [];

      try {
        console.log('Starting Promise.all for fund status report');
        [members, fundStats, recentTransactions] = await Promise.all([
          MockMemberService.getAllMembers(),
          MockMemberService.getFundStatistics(),
          MockMemberService.getRecentTransactions()
        ]);
        console.log('Promise.all completed successfully');
      } catch (promiseError) {
        console.error('Promise.all failed:', promiseError);
        // Fallback: try to get data individually
        console.log('Starting fallback data retrieval');
        members = await MockMemberService.getAllMembers();
        console.log('Members retrieved:', members.length);
        fundStats = await MockMemberService.getFundStatistics();
        console.log('Fund stats retrieved in fallback:', fundStats);
        recentTransactions = await MockMemberService.getRecentTransactions();
        console.log('Transactions retrieved:', recentTransactions.length);
      }
      
      // Debug: Check what getFundStatistics returns
      console.log('Final fundStats value:', fundStats);
      console.log('Type of fundStats:', typeof fundStats);
      console.log('Is fundStats null/undefined?', fundStats === null || fundStats === undefined);

      // Debug logging to check if data is being returned
      console.log('Fund stats received:', fundStats);
      console.log('Members received:', members.length);
      console.log('Transactions received:', recentTransactions.length);
      
      // Check if fundStats is undefined
      if (!fundStats) {
        console.warn('Fund statistics is undefined, using fallback mock data');
        fundStats = {
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
      }

      // Calculate fund overview using mock data - with safety checks
      const totalFundValue = fundStats?.totalFundValue || 0;
      const totalMembers = fundStats?.totalMembers || 0;
      const activeMembers = members.filter(m => m.membershipStatus?.isActive !== false).length;
      const totalContributions = members.reduce((sum, m) => sum + (m.financialInfo?.totalContributions || 0), 0);
      const totalDisbursements = 0; // Not tracked in current mock data
      const availableFunds = totalFundValue;
      const netCashFlow = totalContributions - totalDisbursements;

      // Use mock fund statistics for member breakdown with safety checks
      const memberBreakdown = {
        goodStanding: fundStats?.membersByStanding?.good || 0,
        owing10Percent: fundStats?.membersByStanding?.owing_10 || 0,
        owing20Percent: fundStats?.membersByStanding?.owing_20 || 0,
        owing30Percent: fundStats?.membersByStanding?.owing_30 || 0,
        owing50Percent: fundStats?.membersByStanding?.owing_50 || 0,
        owing65Percent: fundStats?.membersByStanding?.owing_65 || 0,
        owing65Plus: fundStats?.membersByStanding?.owing_65_plus || 0,
      };

      // Get recent activity from transactions
      const recentDeposits = recentTransactions
        .filter(t => t.type === 'deposit' && t.status === 'approved')
        .slice(0, 10);

      const recentDisbursements = recentTransactions
        .filter(t => t.type === 'loan_repayment' && t.status === 'approved')
        .slice(0, 10);

      const pendingTransactions = recentTransactions
        .filter(t => t.status === 'pending')
        .slice(0, 5);

      // Mock financial trends (last 6 months)
      const monthlyContributions = this.calculateMonthlyTrends(recentTransactions, 'deposit');
      const memberGrowth = this.calculateMemberGrowthTrends(members);

      return {
        title: 'People\'s Liberator Fund - Status Report',
        generatedDate: new Date(),
        generatedBy,
        reportType: 'fund_status',
        data: {
          fundOverview: {
            totalFundValue,
            totalMembers,
            activeMembers,
            totalContributions,
            totalDisbursements,
            availableFunds,
            netCashFlow,
          },
          memberBreakdown,
          recentActivity: {
            recentDeposits,
            recentDisbursements,
            pendingTransactions,
          },
          financialTrends: {
            monthlyContributions,
            memberGrowth,
          },
        },
        summary: {
          totalFundValue,
          totalMembers,
          netCashFlow,
          pendingTransactions: pendingTransactions.length,
        },
      };
    } catch (error) {
      console.error('Error generating fund status report:', error);
      throw error;
    }
  }

  // Generate Member Statement Report
  static async generateMemberStatementReport(memberNumber: string, generatedBy: string): Promise<ReportData> {
    try {
      const member = await MockMemberService.getMemberByNumber(memberNumber);
      if (!member) {
        throw new Error(`Member ${memberNumber} not found`);
      }

      const contributions = await MockMemberService.getMemberContributions(memberNumber);
      const recentTransactions = await MockMemberService.getRecentTransactions();

      // Extract member data
      const personalInfo = {
        fullName: `Member ${memberNumber}`, // Mock name since we don't have personal info
        memberNumber: member.memberNumber || memberNumber,
        contactInfo: 'N/A', // Not available in current mock data
        joinDate: new Date('2025-01-01'), // Mock join date
      };

      const financialSummary = {
        currentBalance: member.financialInfo?.currentBalance || 0,
        totalContributions: member.financialInfo?.totalContributions || 0,
        totalDisbursements: 0, // Not tracked
        outstandingAmount: member.financialInfo?.outstandingAmount || 0,
        percentageOutstanding: member.financialInfo?.percentageOutstanding || 0,
        standingCategory: member.membershipStatus?.standingCategory || 'good',
      };

      // Calculate contribution history
      const contributionHistory = contributions.map((contribution, index, arr) => {
        const cumulativeTotal = arr.slice(0, index + 1).reduce((sum, c) => sum + c.amount, 0);
        return {
          date: new Date(contribution.date),
          amount: contribution.amount,
          cumulativeTotal,
        };
      });

      // Mock standing history
      const standingHistory = [
        {
          date: personalInfo.joinDate,
          standing: 'good',
          notes: 'Member joined fund',
        },
        {
          date: new Date(),
          standing: financialSummary.standingCategory,
          notes: 'Current standing',
        },
      ];

      // Filter transactions for this member
      const memberTransactions = recentTransactions.filter(t => t.memberNumber === memberNumber);

      return {
        title: `Member Statement - ${personalInfo.fullName}`,
        generatedDate: new Date(),
        generatedBy,
        reportType: 'member_statement',
        data: {
          member,
          personalInfo,
          financialSummary,
          transactionHistory: memberTransactions,
          contributionHistory,
          standingHistory,
        },
        summary: {
          memberNumber,
          currentBalance: financialSummary.currentBalance,
          totalContributions: financialSummary.totalContributions,
          standingCategory: financialSummary.standingCategory,
        },
      };
    } catch (error) {
      console.error('Error generating member statement report:', error);
      throw error;
    }
  }

  // Generate Transaction Report
  static async generateTransactionReport(
    startDate: Date,
    endDate: Date,
    transactionType?: string,
    generatedBy?: string
  ): Promise<ReportData> {
    try {
      const allTransactions = await MockMemberService.getRecentTransactions();
      
      // Filter transactions by date range and type
      let filteredTransactions = allTransactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate >= startDate && transactionDate <= endDate;
      });

      if (transactionType && transactionType !== 'all') {
        filteredTransactions = filteredTransactions.filter(t => t.type === transactionType);
      }

      // Calculate summary statistics
      const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
      const approvedTransactions = filteredTransactions.filter(t => t.status === 'approved');
      const pendingTransactions = filteredTransactions.filter(t => t.status === 'pending');
      const rejectedTransactions = filteredTransactions.filter(t => t.status === 'rejected');

      const approvedAmount = approvedTransactions.reduce((sum, t) => sum + t.amount, 0);
      const pendingAmount = pendingTransactions.reduce((sum, t) => sum + t.amount, 0);

      return {
        title: `Transaction Report - ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`,
        generatedDate: new Date(),
        generatedBy: generatedBy || 'System',
        reportType: 'transaction_report',
        data: {
          dateRange: { startDate, endDate },
          transactionType: transactionType || 'all',
          transactions: filteredTransactions,
          summary: {
            totalTransactions: filteredTransactions.length,
            totalAmount,
            approvedTransactions: approvedTransactions.length,
            approvedAmount,
            pendingTransactions: pendingTransactions.length,
            pendingAmount,
            rejectedTransactions: rejectedTransactions.length,
          },
        },
        summary: {
          totalTransactions: filteredTransactions.length,
          totalAmount,
          approvedAmount,
          pendingAmount,
        },
      };
    } catch (error) {
      console.error('Error generating transaction report:', error);
      throw error;
    }
  }

  // Generate Standing Analysis Report
  static async generateStandingAnalysisReport(generatedBy: string): Promise<ReportData> {
    try {
      let members: Member[] = [];
      let fundStats: FundStatistics | null = null;

      try {
        console.log('Starting Promise.all for standing analysis report');
        [members, fundStats] = await Promise.all([
          MockMemberService.getAllMembers(),
          MockMemberService.getFundStatistics()
        ]);
        console.log('Promise.all for standing analysis completed successfully');
      } catch (promiseError) {
        console.error('Promise.all failed for standing analysis:', promiseError);
        // Fallback: try to get data individually
        console.log('Starting fallback data retrieval for standing analysis');
        members = await MockMemberService.getAllMembers();
        console.log('Members retrieved for standing analysis:', members.length);
        fundStats = await MockMemberService.getFundStatistics();
        console.log('Fund stats retrieved in fallback for standing analysis:', fundStats);
      }
      
      // Debug: Check what getFundStatistics returns for standing analysis
      console.log('Standing analysis - getFundStatistics result:', fundStats);
      console.log('Standing analysis - Type of fundStats:', typeof fundStats);

      // Debug logging to check if data is being returned
      console.log('Standing analysis - Fund stats received:', fundStats);
      console.log('Standing analysis - Members received:', members.length);
      
      // Check if fundStats is undefined
      if (!fundStats) {
        console.warn('Fund statistics is undefined for standing analysis, using fallback mock data');
        fundStats = {
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
      }

      // Use mock fund statistics for standing analysis with safety checks
      const standingAnalysis = {
        good: { count: fundStats?.membersByStanding?.good || 0, totalBalance: 0, totalContributions: 0, members: [] as Member[] },
        owing_10: { count: fundStats?.membersByStanding?.owing_10 || 0, totalBalance: 0, totalContributions: 0, members: [] as Member[] },
        owing_20: { count: fundStats?.membersByStanding?.owing_20 || 0, totalBalance: 0, totalContributions: 0, members: [] as Member[] },
        owing_30: { count: fundStats?.membersByStanding?.owing_30 || 0, totalBalance: 0, totalContributions: 0, members: [] as Member[] },
        owing_50: { count: fundStats?.membersByStanding?.owing_50 || 0, totalBalance: 0, totalContributions: 0, members: [] as Member[] },
        owing_65: { count: fundStats?.membersByStanding?.owing_65 || 0, totalBalance: 0, totalContributions: 0, members: [] as Member[] },
        owing_65_plus: { count: fundStats?.membersByStanding?.owing_65_plus || 0, totalBalance: 0, totalContributions: 0, members: [] as Member[] },
      };

      // Calculate actual balances from members
      members.forEach(member => {
        const standing = member.membershipStatus?.standingCategory || 'good';
        const balance = member.financialInfo?.currentBalance || 0;
        const contributions = member.financialInfo?.totalContributions || 0;

        if (standingAnalysis[standing as keyof typeof standingAnalysis]) {
          const category = standingAnalysis[standing as keyof typeof standingAnalysis];
          category.totalBalance += balance;
          category.totalContributions += contributions;
          category.members.push(member);
        }
      });

      // Calculate risk analysis with safety checks
      const totalFundValue = fundStats?.totalFundValue || 0;
      const totalOutstanding = members.reduce((sum, m) => sum + (m.financialInfo?.outstandingAmount || 0), 0);

      const riskAnalysis = {
        totalMembers: members.length,
        totalFundValue,
        totalOutstanding,
        riskPercentage: totalFundValue > 0 ? (totalOutstanding / totalFundValue) * 100 : 0,
        membersAtRisk: members.filter(m => {
          const standing = m.membershipStatus?.standingCategory || 'good';
          return standing !== 'good';
        }).length,
      };

      return {
        title: 'Member Standing Analysis Report',
        generatedDate: new Date(),
        generatedBy,
        reportType: 'standing_analysis',
        data: {
          standingAnalysis,
          riskAnalysis,
          recommendations: this.generateStandingRecommendations(standingAnalysis, riskAnalysis),
        },
        summary: {
          totalMembers: members.length,
          membersInGoodStanding: standingAnalysis.good.count,
          membersAtRisk: riskAnalysis.membersAtRisk,
          riskPercentage: riskAnalysis.riskPercentage,
        },
      };
    } catch (error) {
      console.error('Error generating standing analysis report:', error);
      throw error;
    }
  }

  // Helper method to calculate monthly trends
  private static calculateMonthlyTrends(transactions: any[], type: string): Array<{ month: string; amount: number }> {
    const monthlyData: Record<string, number> = {};
    
    // Get last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = date.toISOString().substring(0, 7); // YYYY-MM
      monthlyData[monthKey] = 0;
    }

    // Aggregate transaction amounts by month
    transactions
      .filter(t => t.type === type && t.status === 'approved')
      .forEach(t => {
        const monthKey = new Date(t.date).toISOString().substring(0, 7);
        if (monthlyData.hasOwnProperty(monthKey)) {
          monthlyData[monthKey] += t.amount;
        }
      });

    return Object.entries(monthlyData).map(([month, amount]) => ({
      month: new Date(month + '-01').toLocaleDateString('en-ZA', { year: 'numeric', month: 'short' }),
      amount,
    }));
  }

  // Helper method to calculate member growth trends
  private static calculateMemberGrowthTrends(members: Member[]): Array<{ month: string; count: number }> {
    const monthlyData: Record<string, number> = {};
    
    // Get last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = date.toISOString().substring(0, 7); // YYYY-MM
      monthlyData[monthKey] = 0;
    }

    // Mock member growth (since we don't have join dates)
    let cumulativeCount = 0;
    return Object.entries(monthlyData).map(([month]) => {
      cumulativeCount += 5; // Mock growth of 5 members per month
      return {
        month: new Date(month + '-01').toLocaleDateString('en-ZA', { year: 'numeric', month: 'short' }),
        count: cumulativeCount,
      };
    });
  }

  // Generate recommendations based on standing analysis
  private static generateStandingRecommendations(standingAnalysis: any, riskAnalysis: any): string[] {
    const recommendations: string[] = [];

    if (riskAnalysis.riskPercentage > 20) {
      recommendations.push('High risk detected: Consider implementing stricter contribution enforcement policies.');
    }

    if (standingAnalysis.owing_65_plus.count > 0) {
      recommendations.push(`${standingAnalysis.owing_65_plus.count} members owe 65%+ of contributions. Immediate action required.`);
    }

    if (standingAnalysis.owing_50.count > 0) {
      recommendations.push(`${standingAnalysis.owing_50.count} members owe 50%+ of contributions. Consider payment plans.`);
    }

    if (riskAnalysis.membersAtRisk > riskAnalysis.totalMembers * 0.3) {
      recommendations.push('Over 30% of members are not in good standing. Review fund policies and member support.');
    }

    if (recommendations.length === 0) {
      recommendations.push('Fund is in good health with low risk levels. Continue current policies.');
    }

    return recommendations;
  }

  // Export report data to CSV format
  static exportToCSV(reportData: ReportData): string {
    let csvContent = '';
    
    // Add header
    csvContent += `Report: ${reportData.title}\n`;
    csvContent += `Generated: ${reportData.generatedDate.toLocaleDateString()}\n`;
    csvContent += `Generated By: ${reportData.generatedBy}\n\n`;

    // Add data based on report type
    switch (reportData.reportType) {
      case 'fund_status':
        csvContent += this.fundStatusToCSV(reportData.data);
        break;
      case 'member_statement':
        csvContent += this.memberStatementToCSV(reportData.data);
        break;
      case 'transaction_report':
        csvContent += this.transactionReportToCSV(reportData.data);
        break;
      default:
        csvContent += 'CSV export not available for this report type\n';
    }

    return csvContent;
  }

  private static fundStatusToCSV(data: any): string {
    let csv = 'Fund Overview\n';
    csv += 'Metric,Value\n';
    csv += `Total Fund Value,R ${(data.fundOverview?.totalFundValue || 0).toLocaleString()}\n`;
    csv += `Total Members,${data.fundOverview?.totalMembers || 0}\n`;
    csv += `Active Members,${data.fundOverview?.activeMembers || 0}\n`;
    csv += `Total Contributions,R ${(data.fundOverview?.totalContributions || 0).toLocaleString()}\n`;
    csv += `Total Disbursements,R ${(data.fundOverview?.totalDisbursements || 0).toLocaleString()}\n`;
    csv += `Net Cash Flow,R ${(data.fundOverview?.netCashFlow || 0).toLocaleString()}\n\n`;

    csv += 'Member Standing Breakdown\n';
    csv += 'Standing,Count\n';
    csv += `Good Standing,${data.memberBreakdown?.goodStanding || 0}\n`;
    csv += `Owing 10%,${data.memberBreakdown?.owing10Percent || 0}\n`;
    csv += `Owing 20%,${data.memberBreakdown?.owing20Percent || 0}\n`;
    csv += `Owing 30%,${data.memberBreakdown?.owing30Percent || 0}\n`;
    csv += `Owing 50%,${data.memberBreakdown?.owing50Percent || 0}\n`;
    csv += `Owing 65%,${data.memberBreakdown?.owing65Percent || 0}\n`;
    csv += `Owing 65%+,${data.memberBreakdown?.owing65Plus || 0}\n`;

    return csv;
  }

  private static memberStatementToCSV(data: any): string {
    let csv = 'Member Information\n';
    csv += 'Field,Value\n';
    csv += `Name,${data.personalInfo?.fullName || 'N/A'}\n`;
    csv += `Member Number,${data.personalInfo?.memberNumber || 'N/A'}\n`;
    csv += `Contact,${data.personalInfo?.contactInfo || 'N/A'}\n`;
    csv += `Join Date,${data.personalInfo?.joinDate ? new Date(data.personalInfo.joinDate).toLocaleDateString() : 'N/A'}\n\n`;

    csv += 'Financial Summary\n';
    csv += 'Metric,Amount\n';
    csv += `Current Balance,R ${(data.financialSummary?.currentBalance || 0).toLocaleString()}\n`;
    csv += `Total Contributions,R ${(data.financialSummary?.totalContributions || 0).toLocaleString()}\n`;
    csv += `Outstanding Amount,R ${(data.financialSummary?.outstandingAmount || 0).toLocaleString()}\n`;
    csv += `Percentage Outstanding,${(data.financialSummary?.percentageOutstanding || 0).toFixed(1)}%\n`;
    csv += `Standing,${data.financialSummary?.standingCategory || 'N/A'}\n\n`;

    csv += 'Transaction History\n';
    csv += 'Date,Type,Amount,Status,Description\n';
    (data.transactionHistory || []).forEach((t: any) => {
      csv += `${new Date(t.date).toLocaleDateString()},${t.type},R ${t.amount.toLocaleString()},${t.status},"${t.description}"\n`;
    });

    return csv;
  }

  private static transactionReportToCSV(data: any): string {
    let csv = 'Transaction Report\n';
    csv += 'Date,Member,Type,Amount,Status,Description\n';
    
    (data.transactions || []).forEach((t: any) => {
      csv += `${new Date(t.date).toLocaleDateString()},${t.memberNumber},${t.type},R ${t.amount.toLocaleString()},${t.status},"${t.description}"\n`;
    });

    return csv;
  }
}
