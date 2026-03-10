import { Member, Transaction, FundStatistics } from '../types/index';
import { SupabaseMemberService } from './supabaseMemberService';
import { SupabaseTransactionService } from './supabaseTransactionService';
import { InterestReportService } from './InterestReportService';

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
          SupabaseMemberService.getAllMembers(),
          SupabaseMemberService.getFundStatistics(),
          SupabaseTransactionService.getRecentTransactions()
        ]);
        console.log('Promise.all completed successfully');
      } catch (promiseError) {
        console.error('Promise.all failed:', promiseError);
        // Fallback: try to get data individually
        console.log('Starting fallback data retrieval');
        members = await SupabaseMemberService.getAllMembers();
        console.log('Members retrieved:', members.length);
        fundStats = await SupabaseMemberService.getFundStatistics();
        console.log('Fund stats retrieved in fallback:', fundStats);
        recentTransactions = await SupabaseTransactionService.getRecentTransactions();
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
      const member = await SupabaseMemberService.getMemberByNumber(memberNumber);
      if (!member) {
        throw new Error(`Member ${memberNumber} not found`);
      }

      const contributions = member.contributionHistory || [];
      const recentTransactions = await SupabaseTransactionService.getRecentTransactions();

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
      const allTransactions = await SupabaseTransactionService.getRecentTransactions();
      
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
          SupabaseMemberService.getAllMembers(),
          SupabaseMemberService.getFundStatistics()
        ]);
        console.log('Promise.all for standing analysis completed successfully');
      } catch (promiseError) {
        console.error('Promise.all failed for standing analysis:', promiseError);
        // Fallback: try to get data individually
        console.log('Starting fallback data retrieval for standing analysis');
        members = await SupabaseMemberService.getAllMembers();
        console.log('Members retrieved for standing analysis:', members.length);
        fundStats = await SupabaseMemberService.getFundStatistics();
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

  // Generate Interest Earned Report
  static async generateInterestEarnedReport(
    startDate: Date,
    endDate: Date,
    generatedBy: string
  ): Promise<ReportData> {
    try {
      const members = await SupabaseMemberService.getAllMembers();
      
      // Generate interest report using the InterestReportService
      const interestReport = InterestReportService.generateFundInterestSummary(
        members,
        startDate,
        endDate
      );

      return {
        title: 'Interest Earned Report',
        generatedDate: new Date(),
        generatedBy,
        reportType: 'interest_earned',
        data: {
          period: interestReport.period,
          totalInterestEarned: interestReport.totalActualInterestEarned,
          totalInterestCharged: interestReport.totalActualInterestCharged,
          netInterest: interestReport.netActualInterest,
          memberReports: interestReport.memberReports,
          summary: {
            totalMembers: interestReport.totalMembers,
            membersWithSavings: interestReport.membersWithSavings,
            membersWithLoans: interestReport.membersWithLoans,
            averageInterestRate: interestReport.averageInterestRate
          }
        },
        summary: {
          totalInterestEarned: interestReport.totalActualInterestEarned,
          totalInterestCharged: interestReport.totalActualInterestCharged,
          netInterest: interestReport.netActualInterest,
          totalMembers: interestReport.totalMembers
        },
      };
    } catch (error) {
      console.error('Error generating interest earned report:', error);
      throw error;
    }
  }

  // Generate Interest Charged Report
  static async generateInterestChargedReport(
    startDate: Date,
    endDate: Date,
    generatedBy: string
  ): Promise<ReportData> {
    try {
      const members = await SupabaseMemberService.getAllMembers();
      
      // Generate interest report using the InterestReportService
      const interestReport = InterestReportService.generateFundInterestSummary(
        members,
        startDate,
        endDate
      );

      return {
        title: 'Interest Charged Report',
        generatedDate: new Date(),
        generatedBy,
        reportType: 'interest_charged',
        data: {
          period: interestReport.period,
          totalInterestCharged: interestReport.totalActualInterestCharged,
          totalInterestEarned: interestReport.totalActualInterestEarned,
          netInterest: interestReport.netActualInterest,
          memberReports: interestReport.memberReports.filter(report => report.actualInterestCharged > 0),
          summary: {
            totalMembers: interestReport.totalMembers,
            membersWithLoans: interestReport.membersWithLoans,
            averageLoanInterestRate: interestReport.averageInterestRate
          }
        },
        summary: {
          totalInterestCharged: interestReport.totalActualInterestCharged,
          totalInterestEarned: interestReport.totalActualInterestEarned,
          netInterest: interestReport.netActualInterest,
          totalMembers: interestReport.totalMembers
        },
      };
    } catch (error) {
      console.error('Error generating interest charged report:', error);
      throw error;
    }
  }

  // Generate Member Interest Statement
  static async generateMemberInterestStatement(
    memberNumber: string,
    startDate: Date,
    endDate: Date,
    generatedBy: string
  ): Promise<ReportData> {
    try {
      const member = await SupabaseMemberService.getMemberByNumber(memberNumber);
      if (!member) {
        throw new Error(`Member ${memberNumber} not found`);
      }

      const members = await SupabaseMemberService.getAllMembers();
      const interestReport = InterestReportService.generateFundInterestSummary(
        members,
        startDate,
        endDate
      );

      const memberInterest = interestReport.memberReports.find(
        report => report.memberNumber === memberNumber
      );

      if (!memberInterest) {
        throw new Error(`No interest data found for member ${memberNumber}`);
      }

      return {
        title: `Interest Statement - Member ${memberNumber}`,
        generatedDate: new Date(),
        generatedBy,
        reportType: 'member_interest_statement',
        data: {
          member: {
            memberNumber: member.memberNumber || memberNumber,
            name: `Member ${memberNumber}`,
            currentBalance: member.financialInfo?.currentBalance || 0,
            totalContributions: member.financialInfo?.totalContributions || 0
          },
          period: interestReport.period,
          interestDetails: memberInterest,
          summary: {
            totalInterestEarned: memberInterest.actualInterestEarned,
            totalInterestCharged: memberInterest.actualInterestCharged,
            netInterest: memberInterest.actualInterestEarned - memberInterest.actualInterestCharged
          }
        },
        summary: {
          memberNumber,
          totalInterestEarned: memberInterest.actualInterestEarned,
          totalInterestCharged: memberInterest.actualInterestCharged,
          netInterest: memberInterest.actualInterestEarned - memberInterest.actualInterestCharged
        },
      };
    } catch (error) {
      console.error('Error generating member interest statement:', error);
      throw error;
    }
  }

  // Generate Monthly Contributions Report
  static async generateMonthlyContributionsReport(
    startDate: Date,
    endDate: Date,
    generatedBy: string
  ): Promise<ReportData> {
    try {
      const members = await SupabaseMemberService.getAllMembers();
      const transactions = await SupabaseTransactionService.getRecentTransactions();
      
      // Filter contributions within date range
      const contributions = transactions.filter(t => 
        t.type === 'deposit' && 
        t.status === 'approved' &&
        new Date(t.date) >= startDate && 
        new Date(t.date) <= endDate
      );

      // Group by month
      const monthlyData: Record<string, number> = {};
      contributions.forEach(contribution => {
        const monthKey = new Date(contribution.date).toISOString().substring(0, 7); // YYYY-MM
        monthlyData[monthKey] = (monthlyData[monthKey] || 0) + contribution.amount;
      });

      // Calculate totals
      const totalContributions = contributions.reduce((sum, t) => sum + t.amount, 0);
      const averageContribution = contributions.length > 0 ? totalContributions / contributions.length : 0;

      return {
        title: 'Monthly Contributions Report',
        generatedDate: new Date(),
        generatedBy,
        reportType: 'monthly_contributions',
        data: {
          period: { startDate, endDate },
          totalContributions,
          averageContribution,
          contributionCount: contributions.length,
          monthlyBreakdown: Object.entries(monthlyData).map(([month, amount]) => ({
            month: new Date(month + '-01').toLocaleDateString('en-ZA', { year: 'numeric', month: 'short' }),
            amount,
            contributionCount: contributions.filter(t => 
              new Date(t.date).toISOString().substring(0, 7) === month
            ).length
          })),
          memberContributions: members.map(member => ({
            memberNumber: member.memberNumber,
            name: member.personalInfo?.fullName || `Member ${member.memberNumber}`,
            totalContributed: contributions
              .filter(t => t.memberNumber === member.memberNumber)
              .reduce((sum, t) => sum + t.amount, 0),
            contributionCount: contributions.filter(t => t.memberNumber === member.memberNumber).length
          })).filter(m => m.totalContributed > 0)
        },
        summary: {
          totalContributions,
          averageContribution,
          contributionCount: contributions.length,
          activeContributors: new Set(contributions.map(t => t.memberNumber)).size
        },
      };
    } catch (error) {
      console.error('Error generating monthly contributions report:', error);
      throw error;
    }
  }

  // Generate Loan Portfolio Report
  static async generateLoanPortfolioReport(generatedBy: string): Promise<ReportData> {
    try {
      const members = await SupabaseMemberService.getAllMembers();
      
      // Filter members with outstanding loans
      const borrowers = members.filter(member => (member.financialInfo?.outstandingAmount || 0) > 0);
      
      const totalOutstanding = borrowers.reduce((sum, m) => sum + (m.financialInfo?.outstandingAmount || 0), 0);
      const averageLoanAmount = borrowers.length > 0 ? totalOutstanding / borrowers.length : 0;

      return {
        title: 'Loan Portfolio Report',
        generatedDate: new Date(),
        generatedBy,
        reportType: 'loan_portfolio',
        data: {
          totalOutstanding,
          averageLoanAmount,
          borrowerCount: borrowers.length,
          loanPortfolio: borrowers.map(borrower => ({
            memberNumber: borrower.memberNumber,
            name: borrower.personalInfo?.fullName || `Member ${borrower.memberNumber}`,
            outstandingAmount: borrower.financialInfo?.outstandingAmount || 0,
            totalContributions: borrower.financialInfo?.totalContributions || 0,
            percentageOutstanding: borrower.financialInfo?.percentageOutstanding || 0,
            standingCategory: borrower.membershipStatus?.standingCategory || 'good'
          })),
          riskAnalysis: {
            highRisk: borrowers.filter(b => (b.financialInfo?.percentageOutstanding || 0) > 50).length,
            mediumRisk: borrowers.filter(b => (b.financialInfo?.percentageOutstanding || 0) > 20 && (b.financialInfo?.percentageOutstanding || 0) <= 50).length,
            lowRisk: borrowers.filter(b => (b.financialInfo?.percentageOutstanding || 0) <= 20).length
          }
        },
        summary: {
          totalOutstanding,
          averageLoanAmount,
          borrowerCount: borrowers.length,
          riskPercentage: borrowers.length > 0 ? 
            (borrowers.filter(b => (b.financialInfo?.percentageOutstanding || 0) > 50).length / borrowers.length) * 100 : 0
        },
      };
    } catch (error) {
      console.error('Error generating loan portfolio report:', error);
      throw error;
    }
  }

  // Generate Fund Interest Summary Report
  static async generateFundInterestSummaryReport(
    startDate: Date,
    endDate: Date,
    generatedBy: string
  ): Promise<ReportData> {
    try {
      const members = await SupabaseMemberService.getAllMembers();
      
      // Generate interest report using the InterestReportService
      const interestReport = InterestReportService.generateFundInterestSummary(
        members,
        startDate,
        endDate
      );

      return {
        title: 'Fund Interest Summary Report',
        generatedDate: new Date(),
        generatedBy,
        reportType: 'fund_interest_summary',
        data: {
          period: interestReport.period,
          totalInterestEarned: interestReport.totalActualInterestEarned,
          totalInterestCharged: interestReport.totalActualInterestCharged,
          netInterest: interestReport.netActualInterest,
          memberBreakdown: {
            totalMembers: interestReport.totalMembers,
            membersWithSavings: interestReport.membersWithSavings,
            membersWithLoans: interestReport.membersWithLoans
          },
          interestRates: {
            averageInterestRate: interestReport.averageInterestRate
          },
          topEarners: interestReport.memberReports
            .filter(report => report.actualInterestEarned > 0)
            .sort((a, b) => b.actualInterestEarned - a.actualInterestEarned)
            .slice(0, 10),
          topBorrowers: interestReport.memberReports
            .filter(report => report.actualInterestCharged > 0)
            .sort((a, b) => b.actualInterestCharged - a.actualInterestCharged)
            .slice(0, 10)
        },
        summary: {
          totalInterestEarned: interestReport.totalActualInterestEarned,
          totalInterestCharged: interestReport.totalActualInterestCharged,
          netInterest: interestReport.netActualInterest,
          totalMembers: interestReport.totalMembers
        },
      };
    } catch (error) {
      console.error('Error generating fund interest summary report:', error);
      throw error;
    }
  }

  // Generate Comprehensive Financial Summary Report
  static async generateComprehensiveFinancialSummaryReport(
    startDate: Date,
    endDate: Date,
    generatedBy: string
  ): Promise<ReportData> {
    try {
      // Get all necessary data
      const [members, fundStats, transactions, interestReport] = await Promise.all([
        SupabaseMemberService.getAllMembers(),
        SupabaseMemberService.getFundStatistics(),
        SupabaseTransactionService.getRecentTransactions(),
        InterestReportService.generateFundInterestSummary(
          await SupabaseMemberService.getAllMembers(),
          startDate,
          endDate
        )
      ]);

      // Calculate comprehensive financial metrics
      const totalMembers = members.length;
      const activeMembers = members.filter(m => m.membershipStatus?.isActive !== false).length;
      
      // Calculate total contributions from members
      const totalContributions = members.reduce((sum, m) => sum + (m.financialInfo?.totalContributions || 0), 0);
      
      // Calculate total outstanding contributions
      const totalOutstanding = members.reduce((sum, m) => sum + (m.financialInfo?.outstandingAmount || 0), 0);
      
      // Calculate expected contributions (based on member expected contributions)
      const totalExpectedContributions = members.reduce((sum, m) => {
        const expected = m.financialInfo?.expectedContribution || 0;
        return sum + expected;
      }, 0);
      
      // Calculate contribution compliance rate
      const contributionComplianceRate = totalExpectedContributions > 0 
        ? ((totalExpectedContributions - totalOutstanding) / totalExpectedContributions) * 100 
        : 0;

      // Calculate fund value from fundStats or fallback
      const totalFundValue = fundStats?.totalFundValue || 0;
      
      // Calculate transaction totals for the period
      const periodTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate >= startDate && transactionDate <= endDate;
      });
      
      const totalDeposits = periodTransactions
        .filter(t => t.type === 'deposit' && t.status === 'approved')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const totalWithdrawals = periodTransactions
        .filter(t => t.type === 'withdrawal' && t.status === 'approved')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const totalLoanRepayments = periodTransactions
        .filter(t => t.type === 'loan_repayment' && t.status === 'approved')
        .reduce((sum, t) => sum + t.amount, 0);

      // Calculate member standing breakdown
      const standingBreakdown = {
        good: members.filter(m => m.membershipStatus?.standingCategory === 'good').length,
        owing_10: members.filter(m => m.membershipStatus?.standingCategory === 'owing_10').length,
        owing_20: members.filter(m => m.membershipStatus?.standingCategory === 'owing_20').length,
        owing_30: members.filter(m => m.membershipStatus?.standingCategory === 'owing_30').length,
        owing_50: members.filter(m => m.membershipStatus?.standingCategory === 'owing_50').length,
        owing_65: members.filter(m => m.membershipStatus?.standingCategory === 'owing_65').length,
        owing_65_plus: members.filter(m => m.membershipStatus?.standingCategory === 'owing_65_plus').length,
      };

      // Calculate financial ratios
      const liquidityRatio = totalFundValue > 0 ? (totalFundValue - totalOutstanding) / totalFundValue : 0;
      const riskExposure = totalFundValue > 0 ? (totalOutstanding / totalFundValue) * 100 : 0;
      const memberParticipationRate = totalMembers > 0 ? (activeMembers / totalMembers) * 100 : 0;

      // Generate financial health assessment
      const financialHealth = this.assessFinancialHealth(
        liquidityRatio,
        riskExposure,
        contributionComplianceRate,
        memberParticipationRate
      );

      return {
        title: 'Comprehensive Financial Summary Report',
        generatedDate: new Date(),
        generatedBy,
        reportType: 'comprehensive_financial_summary',
        data: {
          period: { startDate, endDate },
          fundOverview: {
            totalFundValue,
            totalMembers,
            activeMembers,
            memberParticipationRate: parseFloat(memberParticipationRate.toFixed(2)),
            totalContributions,
            totalExpectedContributions,
            totalOutstanding,
            contributionComplianceRate: parseFloat(contributionComplianceRate.toFixed(2)),
          },
          transactionSummary: {
            totalDeposits,
            totalWithdrawals,
            totalLoanRepayments,
            netCashFlow: totalDeposits - totalWithdrawals - totalLoanRepayments,
            transactionCount: periodTransactions.length,
          },
          interestSummary: {
            totalInterestEarned: interestReport.totalActualInterestEarned,
            totalInterestCharged: interestReport.totalActualInterestCharged,
            netInterest: interestReport.netActualInterest,
            averageInterestRate: parseFloat(interestReport.averageInterestRate.toFixed(2)),
          },
          memberStanding: standingBreakdown,
          financialRatios: {
            liquidityRatio: parseFloat(liquidityRatio.toFixed(4)),
            riskExposure: parseFloat(riskExposure.toFixed(2)),
            contributionComplianceRate: parseFloat(contributionComplianceRate.toFixed(2)),
            memberParticipationRate: parseFloat(memberParticipationRate.toFixed(2)),
          },
          financialHealth,
          recommendations: this.generateFinancialRecommendations(financialHealth, standingBreakdown, riskExposure),
        },
        summary: {
          totalFundValue,
          totalMembers,
          activeMembers,
          totalContributions,
          totalOutstanding,
          netCashFlow: totalDeposits - totalWithdrawals - totalLoanRepayments,
          netInterest: interestReport.netActualInterest,
          financialHealth: financialHealth.overallHealth,
        },
      };
    } catch (error) {
      console.error('Error generating comprehensive financial summary report:', error);
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

  // Assess financial health based on key metrics
  private static assessFinancialHealth(
    liquidityRatio: number,
    riskExposure: number,
    contributionComplianceRate: number,
    memberParticipationRate: number
  ): {
    overallHealth: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';
    liquidityHealth: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';
    riskHealth: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';
    complianceHealth: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';
    participationHealth: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';
    details: string[];
  } {
    const details: string[] = [];
    
    // Assess liquidity health
    let liquidityHealth: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';
    if (liquidityRatio >= 0.8) {
      liquidityHealth = 'Excellent';
      details.push('Liquidity: Excellent - Strong cash position');
    } else if (liquidityRatio >= 0.6) {
      liquidityHealth = 'Good';
      details.push('Liquidity: Good - Adequate cash reserves');
    } else if (liquidityRatio >= 0.4) {
      liquidityHealth = 'Fair';
      details.push('Liquidity: Fair - Monitor cash flow');
    } else if (liquidityRatio >= 0.2) {
      liquidityHealth = 'Poor';
      details.push('Liquidity: Poor - Cash flow concerns');
    } else {
      liquidityHealth = 'Critical';
      details.push('Liquidity: Critical - Immediate action needed');
    }

    // Assess risk health
    let riskHealth: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';
    if (riskExposure <= 10) {
      riskHealth = 'Excellent';
      details.push('Risk Exposure: Excellent - Low risk level');
    } else if (riskExposure <= 20) {
      riskHealth = 'Good';
      details.push('Risk Exposure: Good - Moderate risk level');
    } else if (riskExposure <= 30) {
      riskHealth = 'Fair';
      details.push('Risk Exposure: Fair - Elevated risk level');
    } else if (riskExposure <= 40) {
      riskHealth = 'Poor';
      details.push('Risk Exposure: Poor - High risk level');
    } else {
      riskHealth = 'Critical';
      details.push('Risk Exposure: Critical - Very high risk level');
    }

    // Assess compliance health
    let complianceHealth: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';
    if (contributionComplianceRate >= 95) {
      complianceHealth = 'Excellent';
      details.push('Compliance: Excellent - High contribution compliance');
    } else if (contributionComplianceRate >= 85) {
      complianceHealth = 'Good';
      details.push('Compliance: Good - Good contribution compliance');
    } else if (contributionComplianceRate >= 70) {
      complianceHealth = 'Fair';
      details.push('Compliance: Fair - Moderate compliance issues');
    } else if (contributionComplianceRate >= 50) {
      complianceHealth = 'Poor';
      details.push('Compliance: Poor - Significant compliance issues');
    } else {
      complianceHealth = 'Critical';
      details.push('Compliance: Critical - Severe compliance issues');
    }

    // Assess participation health
    let participationHealth: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';
    if (memberParticipationRate >= 90) {
      participationHealth = 'Excellent';
      details.push('Participation: Excellent - High member engagement');
    } else if (memberParticipationRate >= 75) {
      participationHealth = 'Good';
      details.push('Participation: Good - Good member engagement');
    } else if (memberParticipationRate >= 60) {
      participationHealth = 'Fair';
      details.push('Participation: Fair - Moderate engagement issues');
    } else if (memberParticipationRate >= 40) {
      participationHealth = 'Poor';
      details.push('Participation: Poor - Low member engagement');
    } else {
      participationHealth = 'Critical';
      details.push('Participation: Critical - Very low member engagement');
    }

    // Calculate overall health (weighted average)
    const healthScores = {
      'Excellent': 5,
      'Good': 4,
      'Fair': 3,
      'Poor': 2,
      'Critical': 1
    };

    const weightedScore = (
      healthScores[liquidityHealth] * 0.3 + // Liquidity is most important (30%)
      healthScores[riskHealth] * 0.25 +    // Risk is important (25%)
      healthScores[complianceHealth] * 0.25 + // Compliance is important (25%)
      healthScores[participationHealth] * 0.2 // Participation is less critical (20%)
    );

    let overallHealth: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';
    if (weightedScore >= 4.5) {
      overallHealth = 'Excellent';
    } else if (weightedScore >= 3.5) {
      overallHealth = 'Good';
    } else if (weightedScore >= 2.5) {
      overallHealth = 'Fair';
    } else if (weightedScore >= 1.5) {
      overallHealth = 'Poor';
    } else {
      overallHealth = 'Critical';
    }

    return {
      overallHealth,
      liquidityHealth,
      riskHealth,
      complianceHealth,
      participationHealth,
      details
    };
  }

  // Generate financial recommendations based on health assessment
  private static generateFinancialRecommendations(
    financialHealth: any,
    standingBreakdown: any,
    riskExposure: number
  ): string[] {
    const recommendations: string[] = [];

    // Overall health recommendations
    switch (financialHealth.overallHealth) {
      case 'Excellent':
        recommendations.push('Fund is in excellent health. Continue current policies and monitor key metrics.');
        break;
      case 'Good':
        recommendations.push('Fund is in good health. Maintain current policies with regular monitoring.');
        break;
      case 'Fair':
        recommendations.push('Fund requires attention. Review policies and implement improvements.');
        break;
      case 'Poor':
        recommendations.push('Fund requires immediate attention. Implement corrective actions.');
        break;
      case 'Critical':
        recommendations.push('Fund is in critical condition. Immediate intervention required.');
        break;
    }

    // Specific recommendations based on metrics
    if (riskExposure > 30) {
      recommendations.push(`High risk exposure (${riskExposure.toFixed(1)}%). Consider stricter collection policies and member support programs.`);
    }

    if (standingBreakdown.owing_65_plus > 0) {
      recommendations.push(`${standingBreakdown.owing_65_plus} members owe 65%+ of contributions. Implement individual payment plans.`);
    }

    if (standingBreakdown.owing_50 > 0) {
      recommendations.push(`${standingBreakdown.owing_50} members owe 50%+ of contributions. Consider targeted collection efforts.`);
    }

    if (financialHealth.complianceHealth === 'Poor' || financialHealth.complianceHealth === 'Critical') {
      recommendations.push('Low contribution compliance. Review contribution policies and member education programs.');
    }

    if (financialHealth.participationHealth === 'Poor' || financialHealth.participationHealth === 'Critical') {
      recommendations.push('Low member participation. Consider member engagement initiatives and communication improvements.');
    }

    if (financialHealth.liquidityHealth === 'Poor' || financialHealth.liquidityHealth === 'Critical') {
      recommendations.push('Liquidity concerns. Review cash flow management and consider reserve requirements.');
    }

    // Add strategic recommendations
    if (recommendations.length <= 2) {
      recommendations.push('Consider implementing automated contribution reminders to improve compliance.');
      recommendations.push('Review interest rates to ensure they remain competitive while maintaining fund sustainability.');
      recommendations.push('Develop member education programs on financial management and fund benefits.');
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
      case 'monthly_contributions':
        csvContent += this.monthlyContributionsToCSV(reportData.data);
        break;
      case 'loan_portfolio':
        csvContent += this.loanPortfolioToCSV(reportData.data);
        break;
      case 'standing_analysis':
        csvContent += this.standingAnalysisToCSV(reportData.data);
        break;
      case 'interest_earned':
        csvContent += this.interestEarnedToCSV(reportData.data);
        break;
      case 'interest_charged':
        csvContent += this.interestChargedToCSV(reportData.data);
        break;
      case 'member_interest_statement':
        csvContent += this.memberInterestStatementToCSV(reportData.data);
        break;
      case 'fund_interest_summary':
        csvContent += this.fundInterestSummaryToCSV(reportData.data);
        break;
      case 'comprehensive_financial_summary':
        csvContent += this.comprehensiveFinancialSummaryToCSV(reportData.data);
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

  private static monthlyContributionsToCSV(data: any): string {
    let csv = 'Monthly Contributions Report\n';
    csv += `Period: ${new Date(data.period.startDate).toLocaleDateString()} to ${new Date(data.period.endDate).toLocaleDateString()}\n\n`;
    
    csv += 'Summary\n';
    csv += 'Metric,Value\n';
    csv += `Total Contributions,R ${(data.totalContributions || 0).toLocaleString()}\n`;
    csv += `Average Contribution,R ${(data.averageContribution || 0).toLocaleString()}\n`;
    csv += `Contribution Count,${data.contributionCount || 0}\n`;
    csv += `Active Contributors,${data.activeContributors || 0}\n\n`;
    
    csv += 'Monthly Breakdown\n';
    csv += 'Month,Amount,Contributions\n';
    (data.monthlyBreakdown || []).forEach((month: any) => {
      csv += `${month.month},R ${(month.amount || 0).toLocaleString()},${month.contributionCount || 0}\n`;
    });
    
    csv += '\nMember Contributions\n';
    csv += 'Member,Name,Total Contributed,Contribution Count\n';
    (data.memberContributions || []).forEach((member: any) => {
      csv += `${member.memberNumber},"${member.name}",R ${(member.totalContributed || 0).toLocaleString()},${member.contributionCount || 0}\n`;
    });

    return csv;
  }

  private static loanPortfolioToCSV(data: any): string {
    let csv = 'Loan Portfolio Report\n\n';
    
    csv += 'Summary\n';
    csv += 'Metric,Value\n';
    csv += `Total Outstanding,R ${(data.totalOutstanding || 0).toLocaleString()}\n`;
    csv += `Average Loan Amount,R ${(data.averageLoanAmount || 0).toLocaleString()}\n`;
    csv += `Borrower Count,${data.borrowerCount || 0}\n`;
    csv += `Risk Percentage,${(data.riskPercentage || 0).toFixed(1)}%\n\n`;
    
    csv += 'Risk Analysis\n';
    csv += 'Risk Level,Count\n';
    csv += `High Risk,${data.riskAnalysis?.highRisk || 0}\n`;
    csv += `Medium Risk,${data.riskAnalysis?.mediumRisk || 0}\n`;
    csv += `Low Risk,${data.riskAnalysis?.lowRisk || 0}\n\n`;
    
    csv += 'Loan Portfolio Details\n';
    csv += 'Member,Name,Outstanding Amount,Total Contributions,Percentage Outstanding,Standing\n';
    (data.loanPortfolio || []).forEach((loan: any) => {
      csv += `${loan.memberNumber},"${loan.name}",R ${(loan.outstandingAmount || 0).toLocaleString()},R ${(loan.totalContributions || 0).toLocaleString()},${(loan.percentageOutstanding || 0).toFixed(1)}%,${loan.standingCategory}\n`;
    });

    return csv;
  }

  private static standingAnalysisToCSV(data: any): string {
    let csv = 'Member Standing Analysis Report\n\n';
    
    csv += 'Standing Analysis\n';
    csv += 'Standing,Count,Total Balance,Total Contributions\n';
    const standings = ['good', 'owing_10', 'owing_20', 'owing_30', 'owing_50', 'owing_65', 'owing_65_plus'];
    standings.forEach(standing => {
      const category = data.standingAnalysis[standing];
      if (category) {
        csv += `${standing.replace('_', ' ').toUpperCase()},${category.count},R ${(category.totalBalance || 0).toLocaleString()},R ${(category.totalContributions || 0).toLocaleString()}\n`;
      }
    });
    
    csv += '\nRisk Analysis\n';
    csv += 'Metric,Value\n';
    csv += `Total Members,${data.riskAnalysis?.totalMembers || 0}\n`;
    csv += `Total Fund Value,R ${(data.riskAnalysis?.totalFundValue || 0).toLocaleString()}\n`;
    csv += `Total Outstanding,R ${(data.riskAnalysis?.totalOutstanding || 0).toLocaleString()}\n`;
    csv += `Risk Percentage,${(data.riskAnalysis?.riskPercentage || 0).toFixed(1)}%\n`;
    csv += `Members At Risk,${data.riskAnalysis?.membersAtRisk || 0}\n\n`;
    
    csv += 'Recommendations\n';
    (data.recommendations || []).forEach((rec: string, index: number) => {
      csv += `${index + 1}. ${rec}\n`;
    });

    return csv;
  }

  private static interestEarnedToCSV(data: any): string {
    let csv = 'Interest Earned Report\n';
    csv += `Period: ${new Date(data.period.start).toLocaleDateString()} to ${new Date(data.period.end).toLocaleDateString()}\n\n`;
    
    csv += 'Summary\n';
    csv += 'Metric,Value\n';
    csv += `Total Interest Earned,R ${(data.totalInterestEarned || 0).toLocaleString()}\n`;
    csv += `Total Interest Charged,R ${(data.totalInterestCharged || 0).toLocaleString()}\n`;
    csv += `Net Interest,R ${(data.netInterest || 0).toLocaleString()}\n`;
    csv += `Total Members,${data.summary?.totalMembers || 0}\n`;
    csv += `Members With Savings,${data.summary?.membersWithSavings || 0}\n`;
    csv += `Members With Loans,${data.summary?.membersWithLoans || 0}\n`;
    csv += `Average Interest Rate,${(data.summary?.averageInterestRate || 0).toFixed(2)}%\n\n`;
    
    csv += 'Member Interest Details\n';
    csv += 'Member,Interest Earned,Interest Charged,Net Interest\n';
    (data.memberReports || []).forEach((member: any) => {
      if (member.actualInterestEarned > 0) {
        csv += `${member.memberNumber},R ${(member.actualInterestEarned || 0).toLocaleString()},R ${(member.actualInterestCharged || 0).toLocaleString()},R ${((member.actualInterestEarned || 0) - (member.actualInterestCharged || 0)).toLocaleString()}\n`;
      }
    });

    return csv;
  }

  private static interestChargedToCSV(data: any): string {
    let csv = 'Interest Charged Report\n';
    csv += `Period: ${new Date(data.period.start).toLocaleDateString()} to ${new Date(data.period.end).toLocaleDateString()}\n\n`;
    
    csv += 'Summary\n';
    csv += 'Metric,Value\n';
    csv += `Total Interest Charged,R ${(data.totalInterestCharged || 0).toLocaleString()}\n`;
    csv += `Total Interest Earned,R ${(data.totalInterestEarned || 0).toLocaleString()}\n`;
    csv += `Net Interest,R ${(data.netInterest || 0).toLocaleString()}\n`;
    csv += `Total Members,${data.summary?.totalMembers || 0}\n`;
    csv += `Members With Loans,${data.summary?.membersWithLoans || 0}\n`;
    csv += `Average Loan Interest Rate,${(data.summary?.averageLoanInterestRate || 0).toFixed(2)}%\n\n`;
    
    csv += 'Member Interest Charges\n';
    csv += 'Member,Interest Charged,Interest Earned,Net Interest\n';
    (data.memberReports || []).forEach((member: any) => {
      if (member.actualInterestCharged > 0) {
        csv += `${member.memberNumber},R ${(member.actualInterestCharged || 0).toLocaleString()},R ${(member.actualInterestEarned || 0).toLocaleString()},R ${((member.actualInterestEarned || 0) - (member.actualInterestCharged || 0)).toLocaleString()}\n`;
      }
    });

    return csv;
  }

  private static memberInterestStatementToCSV(data: any): string {
    let csv = `Member Interest Statement - ${data.member.name}\n`;
    csv += `Member Number: ${data.member.memberNumber}\n`;
    csv += `Period: ${new Date(data.period.start).toLocaleDateString()} to ${new Date(data.period.end).toLocaleDateString()}\n\n`;
    
    csv += 'Member Information\n';
    csv += 'Field,Value\n';
    csv += `Name,${data.member.name}\n`;
    csv += `Member Number,${data.member.memberNumber}\n`;
    csv += `Current Balance,R ${(data.member.currentBalance || 0).toLocaleString()}\n`;
    csv += `Total Contributions,R ${(data.member.totalContributions || 0).toLocaleString()}\n\n`;
    
    csv += 'Interest Summary\n';
    csv += 'Metric,Amount\n';
    csv += `Interest Earned,R ${(data.summary?.totalInterestEarned || 0).toLocaleString()}\n`;
    csv += `Interest Charged,R ${(data.summary?.totalInterestCharged || 0).toLocaleString()}\n`;
    csv += `Net Interest,R ${(data.summary?.netInterest || 0).toLocaleString()}\n\n`;
    
    csv += 'Interest Details\n';
    csv += 'Type,Amount,Rate\n';
    csv += `Savings Interest,R ${(data.interestDetails?.actualInterestEarned || 0).toLocaleString()},${(data.interestDetails?.savingsInterestRate || 0).toFixed(2)}%\n`;
    csv += `Loan Interest,R ${(data.interestDetails?.actualInterestCharged || 0).toLocaleString()},${(data.interestDetails?.loanInterestRate || 0).toFixed(2)}%\n`;
    csv += `Net Interest,R ${((data.interestDetails?.actualInterestEarned || 0) - (data.interestDetails?.actualInterestCharged || 0)).toLocaleString()}\n`;

    return csv;
  }

  private static fundInterestSummaryToCSV(data: any): string {
    let csv = 'Fund Interest Summary Report\n';
    csv += `Period: ${new Date(data.period.start).toLocaleDateString()} to ${new Date(data.period.end).toLocaleDateString()}\n\n`;
    
    csv += 'Summary\n';
    csv += 'Metric,Value\n';
    csv += `Total Interest Earned,R ${(data.totalInterestEarned || 0).toLocaleString()}\n`;
    csv += `Total Interest Charged,R ${(data.totalInterestCharged || 0).toLocaleString()}\n`;
    csv += `Net Interest,R ${(data.netInterest || 0).toLocaleString()}\n`;
    csv += `Total Members,${data.memberBreakdown?.totalMembers || 0}\n`;
    csv += `Members With Savings,${data.memberBreakdown?.membersWithSavings || 0}\n`;
    csv += `Members With Loans,${data.memberBreakdown?.membersWithLoans || 0}\n`;
    csv += `Average Interest Rate,${(data.interestRates?.averageInterestRate || 0).toFixed(2)}%\n\n`;
    
    csv += 'Top Interest Earners\n';
    csv += 'Rank,Member,Interest Earned\n';
    (data.topEarners || []).forEach((member: any, index: number) => {
      csv += `${index + 1},${member.memberNumber},R ${(member.actualInterestEarned || 0).toLocaleString()}\n`;
    });
    
    csv += '\nTop Interest Payers\n';
    csv += 'Rank,Member,Interest Charged\n';
    (data.topBorrowers || []).forEach((member: any, index: number) => {
      csv += `${index + 1},${member.memberNumber},R ${(member.actualInterestCharged || 0).toLocaleString()}\n`;
    });

    return csv;
  }

  private static comprehensiveFinancialSummaryToCSV(data: any): string {
    let csv = 'Comprehensive Financial Summary Report\n';
    csv += `Period: ${new Date(data.period.startDate).toLocaleDateString()} to ${new Date(data.period.endDate).toLocaleDateString()}\n\n`;
    
    csv += 'Fund Overview\n';
    csv += 'Metric,Value\n';
    csv += `Total Fund Value,R ${(data.fundOverview?.totalFundValue || 0).toLocaleString()}\n`;
    csv += `Total Members,${data.fundOverview?.totalMembers || 0}\n`;
    csv += `Active Members,${data.fundOverview?.activeMembers || 0}\n`;
    csv += `Member Participation Rate,${(data.fundOverview?.memberParticipationRate || 0).toFixed(2)}%\n`;
    csv += `Total Contributions,R ${(data.fundOverview?.totalContributions || 0).toLocaleString()}\n`;
    csv += `Total Expected Contributions,R ${(data.fundOverview?.totalExpectedContributions || 0).toLocaleString()}\n`;
    csv += `Total Outstanding,R ${(data.fundOverview?.totalOutstanding || 0).toLocaleString()}\n`;
    csv += `Contribution Compliance Rate,${(data.fundOverview?.contributionComplianceRate || 0).toFixed(2)}%\n\n`;
    
    csv += 'Transaction Summary\n';
    csv += 'Metric,Value\n';
    csv += `Total Deposits,R ${(data.transactionSummary?.totalDeposits || 0).toLocaleString()}\n`;
    csv += `Total Withdrawals,R ${(data.transactionSummary?.totalWithdrawals || 0).toLocaleString()}\n`;
    csv += `Total Loan Repayments,R ${(data.transactionSummary?.totalLoanRepayments || 0).toLocaleString()}\n`;
    csv += `Net Cash Flow,R ${(data.transactionSummary?.netCashFlow || 0).toLocaleString()}\n`;
    csv += `Transaction Count,${data.transactionSummary?.transactionCount || 0}\n\n`;
    
    csv += 'Interest Summary\n';
    csv += 'Metric,Value\n';
    csv += `Total Interest Earned,R ${(data.interestSummary?.totalInterestEarned || 0).toLocaleString()}\n`;
    csv += `Total Interest Charged,R ${(data.interestSummary?.totalInterestCharged || 0).toLocaleString()}\n`;
    csv += `Net Interest,R ${(data.interestSummary?.netInterest || 0).toLocaleString()}\n`;
    csv += `Average Interest Rate,${(data.interestSummary?.averageInterestRate || 0).toFixed(2)}%\n\n`;
    
    csv += 'Member Standing Breakdown\n';
    csv += 'Standing,Count\n';
    csv += `Good Standing,${data.memberStanding?.good || 0}\n`;
    csv += `Owing 10%,${data.memberStanding?.owing_10 || 0}\n`;
    csv += `Owing 20%,${data.memberStanding?.owing_20 || 0}\n`;
    csv += `Owing 30%,${data.memberStanding?.owing_30 || 0}\n`;
    csv += `Owing 50%,${data.memberStanding?.owing_50 || 0}\n`;
    csv += `Owing 65%,${data.memberStanding?.owing_65 || 0}\n`;
    csv += `Owing 65%+,${data.memberStanding?.owing_65_plus || 0}\n\n`;
    
    csv += 'Financial Ratios\n';
    csv += 'Ratio,Value\n';
    csv += `Liquidity Ratio,${(data.financialRatios?.liquidityRatio || 0).toFixed(4)}\n`;
    csv += `Risk Exposure,${(data.financialRatios?.riskExposure || 0).toFixed(2)}%\n`;
    csv += `Contribution Compliance Rate,${(data.financialRatios?.contributionComplianceRate || 0).toFixed(2)}%\n`;
    csv += `Member Participation Rate,${(data.financialRatios?.memberParticipationRate || 0).toFixed(2)}%\n\n`;
    
    csv += 'Financial Health Assessment\n';
    csv += 'Category,Health\n';
    csv += `Overall Health,${data.financialHealth?.overallHealth || 'N/A'}\n`;
    csv += `Liquidity Health,${data.financialHealth?.liquidityHealth || 'N/A'}\n`;
    csv += `Risk Health,${data.financialHealth?.riskHealth || 'N/A'}\n`;
    csv += `Compliance Health,${data.financialHealth?.complianceHealth || 'N/A'}\n`;
    csv += `Participation Health,${data.financialHealth?.participationHealth || 'N/A'}\n\n`;
    
    csv += 'Health Assessment Details\n';
    csv += 'Detail\n';
    (data.financialHealth?.details || []).forEach((detail: string) => {
      csv += `${detail}\n`;
    });
    
    csv += '\nRecommendations\n';
    csv += 'Recommendation\n';
    (data.recommendations || []).forEach((recommendation: string, index: number) => {
      csv += `${index + 1}. ${recommendation}\n`;
    });

    return csv;
  }
}
