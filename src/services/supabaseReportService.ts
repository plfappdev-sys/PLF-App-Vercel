import { Member, Transaction, FundStatistics } from '../types/index';
import { SupabaseMemberService } from './supabaseMemberService';
import { SupabaseUserService } from './supabaseUserService';
import { InterestReportService } from './InterestReportService';
import { supabase } from '../../supabase.config';

export interface ReportData {
  title: string;
  generatedDate: Date;
  generatedBy: string;
  reportType: string;
  data: any;
  summary: any;
}

export class SupabaseReportService {
  // Generate Fund Status Report using Supabase data
  static async generateFundStatusReport(generatedBy: string): Promise<ReportData> {
    try {
      // Get data from Supabase
      const members = await SupabaseMemberService.getAllMembers();
      const users = await SupabaseUserService.getAllUsers();
      
      // Calculate fund statistics from real data
      const fundStats = await this.calculateFundStatistics(members, users);
      
      // Get recent transactions (placeholder - would need transaction service)
      const recentTransactions = await this.getRecentTransactions();

      // Calculate fund overview using real data
      const totalFundValue = fundStats.totalFundValue;
      const totalMembers = fundStats.totalMembers;
      const activeMembers = members.filter(m => m.status === 'active').length;
      const totalContributions = members.reduce((sum, m) => sum + (m.total_contributions || 0), 0);
      const totalDisbursements = members.reduce((sum, m) => sum + (m.total_loans || 0), 0);
      const availableFunds = totalFundValue;
      const netCashFlow = totalContributions - totalDisbursements;

      // Calculate member breakdown from real data
      const memberBreakdown = this.calculateMemberStandingBreakdown(members);

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

      // Calculate financial trends
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

  // Generate Member Statement Report using Supabase data
  static async generateMemberStatementReport(memberNumber: string, generatedBy: string): Promise<ReportData> {
    try {
      const member = await SupabaseMemberService.getMember(memberNumber);
      if (!member) {
        throw new Error(`Member ${memberNumber} not found`);
      }

      // Get user data for this member
      const userId = await SupabaseMemberService.getUserByMemberNumber(memberNumber);
      const user = userId ? await SupabaseUserService.getUserById(userId) : null;

      // Get transactions for this member (placeholder)
      const recentTransactions = await this.getMemberTransactions(memberNumber);

      // Extract member data
      const personalInfo = {
        fullName: user ? `${user.personalInfo?.firstName} ${user.personalInfo?.lastName}` : `Member ${memberNumber}`,
        memberNumber: member.member_number || memberNumber,
        contactInfo: user?.personalInfo?.phoneNumber || 'N/A',
        joinDate: member.join_date ? new Date(member.join_date) : new Date(),
      };

      const financialSummary = {
        currentBalance: member.current_balance || 0,
        totalContributions: member.total_contributions || 0,
        totalDisbursements: member.total_loans || 0,
        outstandingAmount: member.outstanding_amount || 0,
        percentageOutstanding: member.total_contributions > 0 ? 
          ((member.outstanding_amount || 0) / member.total_contributions) * 100 : 0,
        standingCategory: member.status || 'active',
      };

      // Calculate contribution history (placeholder)
      const contributionHistory = await this.getMemberContributionHistory(memberNumber);

      // Standing history
      const standingHistory = [
        {
          date: personalInfo.joinDate,
          standing: 'active',
          notes: 'Member joined fund',
        },
        {
          date: new Date(),
          standing: financialSummary.standingCategory,
          notes: 'Current standing',
        },
      ];

      return {
        title: `Member Statement - ${personalInfo.fullName}`,
        generatedDate: new Date(),
        generatedBy,
        reportType: 'member_statement',
        data: {
          member,
          personalInfo,
          financialSummary,
          transactionHistory: recentTransactions,
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

  // Generate Transaction Report using Supabase data
  static async generateTransactionReport(
    startDate: Date,
    endDate: Date,
    transactionType?: string,
    generatedBy?: string
  ): Promise<ReportData> {
    try {
      const allTransactions = await this.getRecentTransactions();
      
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

  // Helper method to calculate fund statistics from real data
  private static async calculateFundStatistics(members: any[], users: any[]): Promise<FundStatistics> {
    const totalMembers = members.length;
    const totalFundValue = members.reduce((sum, m) => sum + (m.current_balance || 0), 0);
    const totalLoansOutstanding = members.reduce((sum, m) => sum + (m.outstanding_amount || 0), 0);
    const totalContributionsThisMonth = 0; // Would need transaction data

    // Calculate member standing breakdown
    const membersByStanding = {
      good: members.filter(m => m.status === 'active' && (m.outstanding_amount || 0) === 0).length,
      owing_10: members.filter(m => {
        const outstanding = m.outstanding_amount || 0;
        const contributions = m.total_contributions || 1;
        return outstanding > 0 && (outstanding / contributions) <= 0.1;
      }).length,
      owing_20: members.filter(m => {
        const outstanding = m.outstanding_amount || 0;
        const contributions = m.total_contributions || 1;
        return outstanding > 0 && (outstanding / contributions) > 0.1 && (outstanding / contributions) <= 0.2;
      }).length,
      owing_30: members.filter(m => {
        const outstanding = m.outstanding_amount || 0;
        const contributions = m.total_contributions || 1;
        return outstanding > 0 && (outstanding / contributions) > 0.2 && (outstanding / contributions) <= 0.3;
      }).length,
      owing_50: members.filter(m => {
        const outstanding = m.outstanding_amount || 0;
        const contributions = m.total_contributions || 1;
        return outstanding > 0 && (outstanding / contributions) > 0.3 && (outstanding / contributions) <= 0.5;
      }).length,
      owing_65: members.filter(m => {
        const outstanding = m.outstanding_amount || 0;
        const contributions = m.total_contributions || 1;
        return outstanding > 0 && (outstanding / contributions) > 0.5 && (outstanding / contributions) <= 0.65;
      }).length,
      owing_65_plus: members.filter(m => {
        const outstanding = m.outstanding_amount || 0;
        const contributions = m.total_contributions || 1;
        return outstanding > 0 && (outstanding / contributions) > 0.65;
      }).length,
    };

    return {
      totalMembers,
      totalFundValue,
      totalLoansOutstanding,
      totalContributionsThisMonth,
      membersByStanding,
    };
  }

  // Helper method to calculate member standing breakdown
  private static calculateMemberStandingBreakdown(members: any[]): any {
    return {
      goodStanding: members.filter(m => m.status === 'active' && (m.outstanding_amount || 0) === 0).length,
      owing10Percent: members.filter(m => {
        const outstanding = m.outstanding_amount || 0;
        const contributions = m.total_contributions || 1;
        return outstanding > 0 && (outstanding / contributions) <= 0.1;
      }).length,
      owing20Percent: members.filter(m => {
        const outstanding = m.outstanding_amount || 0;
        const contributions = m.total_contributions || 1;
        return outstanding > 0 && (outstanding / contributions) > 0.1 && (outstanding / contributions) <= 0.2;
      }).length,
      owing30Percent: members.filter(m => {
        const outstanding = m.outstanding_amount || 0;
        const contributions = m.total_contributions || 1;
        return outstanding > 0 && (outstanding / contributions) > 0.2 && (outstanding / contributions) <= 0.3;
      }).length,
      owing50Percent: members.filter(m => {
        const outstanding = m.outstanding_amount || 0;
        const contributions = m.total_contributions || 1;
        return outstanding > 0 && (outstanding / contributions) > 0.3 && (outstanding / contributions) <= 0.5;
      }).length,
      owing65Percent: members.filter(m => {
        const outstanding = m.outstanding_amount || 0;
        const contributions = m.total_contributions || 1;
        return outstanding > 0 && (outstanding / contributions) > 0.5 && (outstanding / contributions) <= 0.65;
      }).length,
      owing65Plus: members.filter(m => {
        const outstanding = m.outstanding_amount || 0;
        const contributions = m.total_contributions || 1;
        return outstanding > 0 && (outstanding / contributions) > 0.65;
      }).length,
    };
  }

  // Placeholder methods for transaction data (would need proper transaction service)
  private static async getRecentTransactions(): Promise<any[]> {
    try {
      // This would be replaced with actual transaction service
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error getting transactions:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error getting transactions:', error);
      return [];
    }
  }

  private static async getMemberTransactions(memberNumber: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('member_number', memberNumber)
        .order('date', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Error getting member transactions:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error getting member transactions:', error);
      return [];
    }
  }

  private static async getMemberContributionHistory(memberNumber: string): Promise<any[]> {
    try {
      const transactions = await this.getMemberTransactions(memberNumber);
      return transactions
        .filter(t => t.type === 'deposit' && t.status === 'approved')
        .map((t, index, arr) => {
          const cumulativeTotal = arr.slice(0, index + 1).reduce((sum, transaction) => sum + transaction.amount, 0);
          return {
            date: new Date(t.date),
            amount: t.amount,
            cumulativeTotal,
          };
        });
    } catch (error) {
      console.error('Error getting contribution history:', error);
      return [];
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
  private static calculateMemberGrowthTrends(members: any[]): Array<{ month: string; count: number }> {
    const monthlyData: Record<string, number> = {};
    
    // Get last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = date.toISOString().substring(0, 7); // YYYY-MM
      monthlyData[monthKey] = 0;
    }

    // Count members by join month
    members.forEach(member => {
      if (member.join_date) {
        const joinDate = new Date(member.join_date);
        const monthKey = joinDate.toISOString().substring(0, 7);
        if (monthlyData.hasOwnProperty(monthKey)) {
          monthlyData[monthKey]++;
        }
      }
    });

    // Calculate cumulative counts
    let cumulativeCount = 0;
    return Object.entries(monthlyData).map(([month, count]) => {
      cumulativeCount += count;
      return {
        month: new Date(month + '-01').toLocaleDateString('en-ZA', { year: 'numeric', month: 'short' }),
        count: cumulativeCount,
      };
    });
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
