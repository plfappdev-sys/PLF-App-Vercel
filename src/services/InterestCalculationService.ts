import { Member, InterestAccrual, Transaction } from '../types/index';
import Decimal from 'decimal.js';
import { FinancialYearService, InterestRates } from './FinancialYearService';
import { MemberBalanceService } from './MemberBalanceService';
import { PLF_INTEREST_RATES } from './InterestConstants';

// Configure decimal.js for financial precision
Decimal.set({ precision: 10, rounding: Decimal.ROUND_HALF_UP });

export class InterestCalculationService {
  // Calculate daily interest (compound or simple)
  static calculateDailyInterest(
    principal: number,
    annualRate: number,
    days: number,
    compounding: boolean = true
  ): number {
    const principalDec = new Decimal(principal);
    const dailyRate = new Decimal(annualRate).dividedBy(365);
    
    if (compounding) {
      // Compound interest: A = P(1 + r)^n
      const factor = new Decimal(1).plus(dailyRate);
      const amount = principalDec.times(factor.pow(days));
      return amount.minus(principalDec).toNumber();
    } else {
      // Simple interest: I = P * r * n
      return principalDec.times(dailyRate).times(days).toNumber();
    }
  }

  // Get current interest rates from database or fallback to hardcoded rates
  static async getCurrentInterestRates(): Promise<InterestRates> {
    return FinancialYearService.getCurrentInterestRates();
  }

  // Calculate interest for a member based on their balance and settings
  static async calculateMemberInterest(
    member: Member,
    daysSinceLastCalculation: number = 1
  ): Promise<{ interestEarned: number; interestCharged: number }> {
    const financialInfo = member.financialInfo;
    const settings = member.interestSettings;
    
    // Get current interest rates from database
    const rates = await this.getCurrentInterestRates();
    
    // Calculate interest earned on positive balance (savings)
    let interestEarned = 0;
    if (financialInfo.currentBalance > 0) {
      interestEarned = this.calculateDailyInterest(
        financialInfo.currentBalance,
        rates.savingsRate, // Use configurable savings rate
        daysSinceLastCalculation,
        settings.compounding
      );
    }

    // Calculate interest charged on outstanding amount (loans)
    let interestCharged = 0;
    if (financialInfo.outstandingAmount > 0) {
      // Use configurable loan interest rate
      interestCharged = this.calculateDailyInterest(
        financialInfo.outstandingAmount,
        rates.loanRate, // Use configurable loan rate
        daysSinceLastCalculation,
        settings.compounding
      );
    }

    return { interestEarned, interestCharged };
  }

  // Create interest accrual record for audit trail
  static createInterestAccrual(
    memberNumber: string,
    interestEarned: number,
    interestCharged: number,
    calculationDate: Date = new Date(),
    interestRate?: number,
    principalAmount?: number
  ): InterestAccrual {
    const accrualId = `accrual_${memberNumber}_${calculationDate.getTime()}`;
    
    return {
      accrualId,
      memberNumber,
      calculationDate,
      periodStart: new Date(calculationDate.getTime() - 24 * 60 * 60 * 1000), // Previous day
      periodEnd: calculationDate,
      principalAmount: principalAmount || 0,
      interestRate: interestRate || 0,
      interestAmount: interestEarned + interestCharged,
      interestType: interestEarned > 0 ? 'earned' : 'charged',
      compounding: true,
      daysInPeriod: 1,
      status: 'calculated',
      appliedDate: undefined,
      transactionId: undefined
    };
  }

  // Generate interest transaction
  static createInterestTransaction(
    memberNumber: string,
    amount: number,
    interestType: 'earned' | 'charged',
    accrualId: string,
    calculationDate: Date = new Date(),
    interestRate?: number,
    principalAmount?: number
  ): Transaction {
    const transactionId = `interest_${interestType}_${memberNumber}_${calculationDate.getTime()}`;
    
    return {
      transactionId,
      memberNumber,
      type: interestType === 'earned' ? 'interest_earned' : 'interest_charged',
      amount: Math.abs(amount),
      description: interestType === 'earned' 
        ? `Interest earned on savings` 
        : `Interest charged on outstanding balance`,
      date: calculationDate,
      status: 'completed',
      approvalWorkflow: {
        submittedBy: 'system',
        submissionDate: calculationDate,
        reviewedBy: 'system',
        reviewDate: calculationDate,
        approvalNotes: 'Automated interest calculation'
      },
      supportingDocuments: [],
      relatedTransactions: [],
      auditTrail: [{
        action: 'interest_calculation',
        performedBy: 'system',
        timestamp: calculationDate,
        details: { accrualId, calculationMethod: 'daily_compound' }
      }],
      interestDetails: {
        principalAmount: principalAmount || 0,
        interestRate: interestRate || 0,
        period: 1,          // 1 day
        calculationDate,
        accrualId,
        compounding: true
      }
    };
  }

  // Update member balances with interest
  static updateMemberBalances(
    member: Member,
    interestEarned: number,
    interestCharged: number
  ): Member {
    const updatedFinancialInfo = {
      ...member.financialInfo,
      currentInterestEarned: member.financialInfo.currentInterestEarned + interestEarned,
      totalInterestEarned: member.financialInfo.totalInterestEarned + interestEarned,
      currentInterestCharged: member.financialInfo.currentInterestCharged + interestCharged,
      totalInterestCharged: member.financialInfo.totalInterestCharged + interestCharged,
      currentBalance: member.financialInfo.currentBalance + interestEarned - interestCharged,
      lastInterestCalculation: new Date()
    };

    return {
      ...member,
      financialInfo: updatedFinancialInfo
    };
  }

  // Comprehensive daily interest calculation for all members
  static async calculateDailyInterestForAllMembers(
    members: Member[]
  ): Promise<{
    updatedMembers: Member[];
    accruals: InterestAccrual[];
    transactions: Transaction[];
  }> {
    const updatedMembers: Member[] = [];
    const accruals: InterestAccrual[] = [];
    const transactions: Transaction[] = [];
    const calculationDate = new Date();

    // Get current rates once for all members
    const rates = await this.getCurrentInterestRates();

    for (const member of members) {
      try {
        // Calculate interest for this member
        const { interestEarned, interestCharged } = await this.calculateMemberInterest(member);
        
        if (interestEarned === 0 && interestCharged === 0) {
          // No interest to calculate for this member
          updatedMembers.push(member);
          continue;
        }

        // Create accrual record with rate information
        const accrual = this.createInterestAccrual(
          member.memberNumber,
          interestEarned,
          interestCharged,
          calculationDate,
          interestEarned > 0 ? rates.savingsRate : rates.loanRate,
          interestEarned > 0 ? member.financialInfo.currentBalance : member.financialInfo.outstandingAmount
        );
        accruals.push(accrual);

        // Create transactions for earned and charged interest
        if (interestEarned > 0) {
          const earnedTransaction = this.createInterestTransaction(
            member.memberNumber,
            interestEarned,
            'earned',
            accrual.accrualId,
            calculationDate,
            rates.savingsRate,
            member.financialInfo.currentBalance
          );
          transactions.push(earnedTransaction);
        }

        if (interestCharged > 0) {
          const chargedTransaction = this.createInterestTransaction(
            member.memberNumber,
            interestCharged,
            'charged',
            accrual.accrualId,
            calculationDate,
            rates.loanRate,
            member.financialInfo.outstandingAmount
          );
          transactions.push(chargedTransaction);
        }

        // Update member balances in memory
        const updatedMember = this.updateMemberBalances(member, interestEarned, interestCharged);
        
        // Persist balance changes to database if available
        try {
          if (await MemberBalanceService.isDatabaseAvailable()) {
            // Get member ID (assuming member has an id field)
            const memberId = (member as any).id || await this.getMemberIdFromNumber(member.memberNumber);
            if (memberId) {
              await MemberBalanceService.updateBalanceWithInterest(
                memberId,
                interestEarned,
                interestCharged,
                accrual.accrualId
              );
            }
          }
        } catch (dbError) {
          console.warn(`Failed to persist balance changes for member ${member.memberNumber}:`, dbError);
          // Continue with in-memory updates even if database persistence fails
        }
        
        updatedMembers.push(updatedMember);

      } catch (error) {
        console.error(`Error calculating interest for member ${member.memberNumber}:`, error);
        // Keep original member data if calculation fails
        updatedMembers.push(member);
      }
    }

    return { updatedMembers, accruals, transactions };
  }

  // Calculate interest for a specific date range
  static async calculateInterestForPeriod(
    principal: number,
    annualRate: number,
    startDate: Date,
    endDate: Date,
    compounding: boolean = true
  ): Promise<number> {
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return this.calculateDailyInterest(principal, annualRate, days, compounding);
  }

  // Generate interest report for a member
  static async generateInterestReport(member: Member, startDate: Date, endDate: Date): Promise<any> {
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Get current rates for accurate reporting
    const rates = await this.getCurrentInterestRates();
    
    const projectedEarned = this.calculateDailyInterest(
      member.financialInfo.currentBalance,
      rates.savingsRate, // Use configurable savings rate
      days,
      member.interestSettings.compounding
    );

    const projectedCharged = this.calculateDailyInterest(
      member.financialInfo.outstandingAmount,
      rates.loanRate, // Use configurable loan rate
      days,
      member.interestSettings.compounding
    );

    return {
      memberNumber: member.memberNumber,
      period: { startDate, endDate, days },
      currentBalance: member.financialInfo.currentBalance,
      outstandingAmount: member.financialInfo.outstandingAmount,
      savingsInterestRate: rates.savingsRate,
      loanInterestRate: rates.loanRate,
      projectedInterestEarned: projectedEarned,
      projectedInterestCharged: projectedCharged,
      netProjectedInterest: projectedEarned - projectedCharged,
      calculationMethod: member.interestSettings.calculationMethod,
      compounding: member.interestSettings.compounding
    };
  }

  // Calculate late payment penalty (5.5% monthly as per updated business logic)
  static calculateLatePenalty(
    balanceBroughtForward: number,
    currentMonthContribution: number
  ): number {
    const totalAmount = new Decimal(balanceBroughtForward).plus(currentMonthContribution);
    const penalty = totalAmount.times(PLF_INTEREST_RATES.LATE_PENALTY_RATE);
    return penalty.toNumber();
  }

  // Calculate next month penalty (5.5% monthly as per updated business logic)
  static calculateNextMonthPenalty(
    amountDue: number,
    currentMonthContribution: number
  ): number {
    const totalAmount = new Decimal(amountDue).plus(currentMonthContribution);
    const penalty = totalAmount.times(PLF_INTEREST_RATES.LATE_PENALTY_RATE);
    return penalty.toNumber();
  }

  // Calculate monthly penalty for outstanding contributions
  static calculateMonthlyPenalty(
    outstandingAmount: number,
    monthsOverdue: number
  ): number {
    const outstandingDec = new Decimal(outstandingAmount);
    const penaltyRate = new Decimal(PLF_INTEREST_RATES.LATE_PENALTY_RATE);
    
    // Calculate compound penalty: P * (1 + r)^n - P
    const factor = new Decimal(1).plus(penaltyRate);
    const totalAmount = outstandingDec.times(factor.pow(monthsOverdue));
    return totalAmount.minus(outstandingDec).toNumber();
  }

  // Calculate penalty interest for overdue loans using configurable penalty rate
  static async calculatePenaltyInterest(
    outstandingAmount: number,
    daysOverdue: number,
    compounding: boolean = true
  ): Promise<number> {
    const rates = await this.getCurrentInterestRates();
    return this.calculateDailyInterest(
      outstandingAmount,
      rates.penaltyRate, // Use configurable penalty rate
      daysOverdue,
      compounding
    );
  }

  // Check if loan is overdue for penalty interest (more than 90 days)
  static isLoanOverdue(loanDate: Date): boolean {
    const today = new Date();
    const daysDifference = Math.ceil((today.getTime() - loanDate.getTime()) / (1000 * 60 * 60 * 24));
    return daysDifference > 90;
  }

  // Get days overdue for penalty calculation
  static getDaysOverdue(loanDate: Date): number {
    const today = new Date();
    const daysDifference = Math.ceil((today.getTime() - loanDate.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, daysDifference - 90); // Only count days beyond 90 days
  }

  // Helper method to get member ID from member number
  private static async getMemberIdFromNumber(memberNumber: string): Promise<number | null> {
    try {
      // This would typically query the database to get member ID from member number
      // For now, we'll return null and handle it gracefully
      console.warn(`Member ID lookup not implemented for member number: ${memberNumber}`);
      return null;
    } catch (error) {
      console.error(`Error getting member ID for ${memberNumber}:`, error);
      return null;
    }
  }
}
