import { PLF_INTEREST_RATES } from './InterestConstants';
import Decimal from 'decimal.js';

// Configure decimal.js for financial precision
Decimal.set({ precision: 10, rounding: Decimal.ROUND_HALF_UP });

export interface ContributionPeriod {
  startDate: Date;
  endDate: Date;
  monthlyRate: number;
  months: number;
  totalExpected: number;
}

export interface MemberContributionSummary {
  memberNumber: string;
  totalExpected: number;
  totalActual: number;
  outstanding: number;
  penalties: number;
  balanceBroughtForward: number;
  currentBalance: number;
  contributionPeriods: ContributionPeriod[];
}

export class UpdatedContributionService {
  // Define contribution periods based on updated business logic
  static getContributionPeriods(): ContributionPeriod[] {
    return [
      {
        startDate: new Date('2018-06-01'),
        endDate: new Date('2024-06-30'),
        monthlyRate: PLF_INTEREST_RATES.CONTRIBUTION_RATE_2018_2024,
        months: 72,
        totalExpected: PLF_INTEREST_RATES.CONTRIBUTION_RATE_2018_2024 * 72
      },
      {
        startDate: new Date('2024-07-01'),
        endDate: new Date('2025-11-30'),
        monthlyRate: PLF_INTEREST_RATES.CONTRIBUTION_RATE_2024_2025,
        months: 12,
        totalExpected: PLF_INTEREST_RATES.CONTRIBUTION_RATE_2024_2025 * 12
      }
    ];
  }

  // Calculate total expected contribution for a member
  static calculateTotalExpected(): number {
    const periods = this.getContributionPeriods();
    return periods.reduce((total, period) => total + period.totalExpected, 0);
  }

  // Calculate expected contribution for a specific period
  static calculateExpectedForPeriod(startDate: Date, endDate: Date): number {
    const periods = this.getContributionPeriods();
    let totalExpected = 0;
    
    for (const period of periods) {
      if (startDate >= period.startDate && endDate <= period.endDate) {
        // Calculate months within this period
        const months = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
        totalExpected += period.monthlyRate * months;
      }
    }
    
    return totalExpected;
  }

  // Calculate penalties based on updated business logic (5.5% monthly)
  static calculatePenalties(
    balanceBroughtForward: number,
    currentMonthContribution: number,
    monthsOverdue: number = 1
  ): number {
    const totalAmount = new Decimal(balanceBroughtForward).plus(currentMonthContribution);
    
    if (monthsOverdue === 1) {
      // First month penalty: (balance brought forward + current month) × 5.5%
      return totalAmount.times(PLF_INTEREST_RATES.LATE_PENALTY_RATE).toNumber();
    } else {
      // Compound penalty for multiple months: P * (1 + r)^n - P
      const penaltyRate = new Decimal(PLF_INTEREST_RATES.LATE_PENALTY_RATE);
      const factor = new Decimal(1).plus(penaltyRate);
      const totalAmountWithPenalty = totalAmount.times(factor.pow(monthsOverdue));
      return totalAmountWithPenalty.minus(totalAmount).toNumber();
    }
  }

  // Calculate next month penalty (amount due + current month contribution) × 5.5%
  static calculateNextMonthPenalty(
    amountDue: number,
    currentMonthContribution: number
  ): number {
    const totalAmount = new Decimal(amountDue).plus(currentMonthContribution);
    return totalAmount.times(PLF_INTEREST_RATES.LATE_PENALTY_RATE).toNumber();
  }

  // Calculate member standing based on updated business logic
  static calculateMemberStanding(
    currentBalance: number,
    outstandingAmount: number
  ): 'good' | 'owing_10' | 'owing_20' | 'owing_30' | 'owing_50' | 'owing_65' | 'owing_65_plus' {
    if (currentBalance >= 0) {
      return 'good';
    }
    
    const percentageOutstanding = Math.abs(currentBalance) / outstandingAmount;
    
    if (percentageOutstanding <= 0.1) return 'owing_10';
    if (percentageOutstanding <= 0.2) return 'owing_20';
    if (percentageOutstanding <= 0.3) return 'owing_30';
    if (percentageOutstanding <= 0.5) return 'owing_50';
    if (percentageOutstanding <= 0.65) return 'owing_65';
    return 'owing_65_plus';
  }

  // Generate comprehensive member contribution summary
  static generateMemberContributionSummary(
    memberNumber: string,
    actualContributions: number,
    balanceBroughtForward: number = 0,
    monthsOverdue: number = 0
  ): MemberContributionSummary {
    const totalExpected = this.calculateTotalExpected();
    const outstanding = Math.max(0, totalExpected - actualContributions);
    
    // Calculate penalties based on business logic
    let penalties = 0;
    if (outstanding > 0 && monthsOverdue > 0) {
      penalties = this.calculatePenalties(balanceBroughtForward, outstanding, monthsOverdue);
    }
    
    const currentBalance = actualContributions - totalExpected - penalties + balanceBroughtForward;
    
    return {
      memberNumber,
      totalExpected,
      totalActual: actualContributions,
      outstanding,
      penalties,
      balanceBroughtForward,
      currentBalance,
      contributionPeriods: this.getContributionPeriods()
    };
  }

  // Calculate interest on savings (5.5% annual)
  static calculateSavingsInterest(
    currentBalance: number,
    days: number = 365
  ): number {
    if (currentBalance <= 0) return 0;
    
    const principalDec = new Decimal(currentBalance);
    const dailyRate = new Decimal(PLF_INTEREST_RATES.SAVINGS_INTEREST_RATE).dividedBy(365);
    
    // Compound interest: A = P(1 + r)^n - P
    const factor = new Decimal(1).plus(dailyRate);
    const amount = principalDec.times(factor.pow(days));
    return amount.minus(principalDec).toNumber();
  }

  // Calculate joining fee
  static getJoiningFee(): number {
    return PLF_INTEREST_RATES.JOINING_FEE;
  }

  // Validate member contribution data
  static validateMemberData(
    memberNumber: string,
    actualContributions: number,
    balanceBroughtForward: number
  ): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!memberNumber || memberNumber.trim() === '') {
      errors.push('Member number is required');
    }
    
    if (actualContributions < 0) {
      errors.push('Actual contributions cannot be negative');
    }
    
    if (isNaN(actualContributions)) {
      errors.push('Actual contributions must be a valid number');
    }
    
    if (isNaN(balanceBroughtForward)) {
      errors.push('Balance brought forward must be a valid number');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Generate contribution report for a member
  static generateContributionReport(
    memberNumber: string,
    actualContributions: number,
    balanceBroughtForward: number,
    monthsOverdue: number = 0
  ) {
    const summary = this.generateMemberContributionSummary(
      memberNumber,
      actualContributions,
      balanceBroughtForward,
      monthsOverdue
    );
    
    const savingsInterest = this.calculateSavingsInterest(summary.currentBalance);
    const joiningFee = this.getJoiningFee();
    
    return {
      ...summary,
      savingsInterest,
      joiningFee,
      netBalance: summary.currentBalance + savingsInterest,
      reportDate: new Date(),
      standing: this.calculateMemberStanding(summary.currentBalance, summary.outstanding)
    };
  }
}
