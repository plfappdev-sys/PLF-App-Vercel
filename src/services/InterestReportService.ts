import { Member, InterestAccrual, Transaction } from '../types/index';
import { InterestCalculationService } from './InterestCalculationService';

export class InterestReportService {
  // Generate comprehensive interest report for a member
  static generateMemberInterestReport(
    member: Member,
    startDate: Date,
    endDate: Date
  ): MemberInterestReport {
    const periodDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Calculate projected interest
    const projectedEarned = InterestCalculationService.calculateInterestForPeriod(
      Math.max(0, member.financialInfo.currentBalance),
      member.financialInfo.interestRate,
      startDate,
      endDate,
      member.interestSettings.compounding
    );

    const projectedCharged = InterestCalculationService.calculateInterestForPeriod(
      Math.max(0, member.financialInfo.outstandingAmount),
      member.financialInfo.interestRate * 2, // Higher rate for loans
      startDate,
      endDate,
      member.interestSettings.compounding
    );

    // Calculate actual interest from history
    const actualInterest = this.calculateActualInterestFromHistory(
      member.interestHistory,
      startDate,
      endDate
    );

    return {
      memberNumber: member.memberNumber,
      period: {
        startDate,
        endDate,
        days: periodDays
      },
      currentBalance: member.financialInfo.currentBalance,
      outstandingAmount: member.financialInfo.outstandingAmount,
      interestRate: member.financialInfo.interestRate,
      projectedInterestEarned: projectedEarned,
      projectedInterestCharged: projectedCharged,
      actualInterestEarned: actualInterest.earned,
      actualInterestCharged: actualInterest.charged,
      netProjectedInterest: projectedEarned - projectedCharged,
      netActualInterest: actualInterest.earned - actualInterest.charged,
      calculationMethod: member.interestSettings.calculationMethod,
      compounding: member.interestSettings.compounding,
      taxDeduction: member.interestSettings.taxDeduction,
      taxAdjustedInterest: (projectedEarned - projectedCharged) * (1 - member.interestSettings.taxDeduction / 100)
    };
  }

  // Calculate actual interest from accrual history
  private static calculateActualInterestFromHistory(
    interestHistory: InterestAccrual[],
    startDate: Date,
    endDate: Date
  ): { earned: number; charged: number } {
    const relevantAccruals = interestHistory.filter(accrual => 
      accrual.calculationDate >= startDate && 
      accrual.calculationDate <= endDate &&
      accrual.status === 'applied'
    );

    let earned = 0;
    let charged = 0;

    relevantAccruals.forEach(accrual => {
      if (accrual.interestType === 'earned') {
        earned += accrual.interestAmount;
      } else {
        charged += accrual.interestAmount;
      }
    });

    return { earned, charged };
  }

  // Generate fund-wide interest summary report
  static generateFundInterestSummary(
    members: Member[],
    startDate: Date,
    endDate: Date
  ): FundInterestSummary {
    let totalProjectedEarned = 0;
    let totalProjectedCharged = 0;
    let totalActualEarned = 0;
    let totalActualCharged = 0;
    let membersWithSavings = 0;
    let membersWithLoans = 0;

    const memberReports = members.map(member => {
      const report = this.generateMemberInterestReport(member, startDate, endDate);
      
      totalProjectedEarned += report.projectedInterestEarned;
      totalProjectedCharged += report.projectedInterestCharged;
      totalActualEarned += report.actualInterestEarned;
      totalActualCharged += report.actualInterestCharged;

      if (member.financialInfo.currentBalance > 0) {
        membersWithSavings++;
      }
      if (member.financialInfo.outstandingAmount > 0) {
        membersWithLoans++;
      }

      return report;
    });

    return {
      period: {
        startDate,
        endDate,
        days: Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
      },
      totalMembers: members.length,
      membersWithSavings,
      membersWithLoans,
      totalProjectedInterestEarned: totalProjectedEarned,
      totalProjectedInterestCharged: totalProjectedCharged,
      totalActualInterestEarned: totalActualEarned,
      totalActualInterestCharged: totalActualCharged,
      netProjectedInterest: totalProjectedEarned - totalProjectedCharged,
      netActualInterest: totalActualEarned - totalActualCharged,
      averageInterestRate: members.reduce((sum, member) => sum + member.financialInfo.interestRate, 0) / members.length,
      memberReports
    };
  }

  // Generate interest statement for a member (PDF-ready format)
  static generateInterestStatement(
    member: Member,
    startDate: Date,
    endDate: Date
  ): InterestStatement {
    const report = this.generateMemberInterestReport(member, startDate, endDate);
    
    return {
      statementId: `stmt_${member.memberNumber}_${startDate.getTime()}_${endDate.getTime()}`,
      memberNumber: member.memberNumber,
      period: report.period,
      openingBalance: member.financialInfo.currentBalance - report.netActualInterest,
      closingBalance: member.financialInfo.currentBalance,
      interestEarned: report.actualInterestEarned,
      interestCharged: report.actualInterestCharged,
      netInterest: report.netActualInterest,
      transactions: this.getInterestTransactionsForPeriod(member, startDate, endDate),
      taxInformation: {
        taxableAmount: report.actualInterestEarned,
        taxDeduction: member.interestSettings.taxDeduction,
        taxAmount: report.actualInterestEarned * (member.interestSettings.taxDeduction / 100)
      },
      generatedDate: new Date(),
      notes: 'This statement is generated for informational purposes only. Please contact administration for official statements.'
    };
  }

  // Get interest transactions for a specific period
  private static getInterestTransactionsForPeriod(
    member: Member,
    startDate: Date,
    endDate: Date
  ): Transaction[] {
    // This would typically query the database for transactions
    // For now, we'll return an empty array as this would be implemented with actual data access
    return [];
  }

  // Generate interest forecast for multiple periods
  static generateInterestForecast(
    member: Member,
    principal: number,
    annualRate: number,
    periods: number,
    periodType: 'days' | 'months' | 'years' = 'months'
  ): InterestForecast {
    const forecast: InterestForecastItem[] = [];
    let currentPrincipal = principal;
    const dailyRate = annualRate / 365;

    for (let i = 1; i <= periods; i++) {
      let daysInPeriod = 0;
      let periodLabel = '';

      switch (periodType) {
        case 'days':
          daysInPeriod = 1;
          periodLabel = `Day ${i}`;
          break;
        case 'months':
          daysInPeriod = 30; // Approximation
          periodLabel = `Month ${i}`;
          break;
        case 'years':
          daysInPeriod = 365;
          periodLabel = `Year ${i}`;
          break;
      }

      const interest = InterestCalculationService.calculateDailyInterest(
        currentPrincipal,
        annualRate,
        daysInPeriod,
        member.interestSettings.compounding
      );

      const newPrincipal = currentPrincipal + interest;

      forecast.push({
        period: i,
        periodLabel,
        startingPrincipal: currentPrincipal,
        interestEarned: interest,
        endingPrincipal: newPrincipal,
        cumulativeInterest: forecast.reduce((sum, item) => sum + item.interestEarned, 0) + interest
      });

      currentPrincipal = newPrincipal;
    }

    return {
      memberNumber: member.memberNumber,
      originalPrincipal: principal,
      annualInterestRate: annualRate,
      compounding: member.interestSettings.compounding,
      periodType,
      totalPeriods: periods,
      forecast,
      totalInterest: forecast.reduce((sum, item) => sum + item.interestEarned, 0),
      finalAmount: principal + forecast.reduce((sum, item) => sum + item.interestEarned, 0)
    };
  }
}

// Interface definitions for reports
export interface MemberInterestReport {
  memberNumber: string;
  period: {
    startDate: Date;
    endDate: Date;
    days: number;
  };
  currentBalance: number;
  outstandingAmount: number;
  interestRate: number;
  projectedInterestEarned: number;
  projectedInterestCharged: number;
  actualInterestEarned: number;
  actualInterestCharged: number;
  netProjectedInterest: number;
  netActualInterest: number;
  calculationMethod: string;
  compounding: boolean;
  taxDeduction: number;
  taxAdjustedInterest: number;
}

export interface FundInterestSummary {
  period: {
    startDate: Date;
    endDate: Date;
    days: number;
  };
  totalMembers: number;
  membersWithSavings: number;
  membersWithLoans: number;
  totalProjectedInterestEarned: number;
  totalProjectedInterestCharged: number;
  totalActualInterestEarned: number;
  totalActualInterestCharged: number;
  netProjectedInterest: number;
  netActualInterest: number;
  averageInterestRate: number;
  memberReports: MemberInterestReport[];
}

export interface InterestStatement {
  statementId: string;
  memberNumber: string;
  period: {
    startDate: Date;
    endDate: Date;
    days: number;
  };
  openingBalance: number;
  closingBalance: number;
  interestEarned: number;
  interestCharged: number;
  netInterest: number;
  transactions: Transaction[];
  taxInformation: {
    taxableAmount: number;
    taxDeduction: number;
    taxAmount: number;
  };
  generatedDate: Date;
  notes: string;
}

export interface InterestForecast {
  memberNumber: string;
  originalPrincipal: number;
  annualInterestRate: number;
  compounding: boolean;
  periodType: string;
  totalPeriods: number;
  forecast: InterestForecastItem[];
  totalInterest: number;
  finalAmount: number;
}

export interface InterestForecastItem {
  period: number;
  periodLabel: string;
  startingPrincipal: number;
  interestEarned: number;
  endingPrincipal: number;
  cumulativeInterest: number;
}
