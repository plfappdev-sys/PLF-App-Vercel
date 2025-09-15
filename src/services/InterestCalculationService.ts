import { Member, InterestAccrual, Transaction } from '../types/index';
import Decimal from 'decimal.js';

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

  // Calculate interest for a member based on their balance and settings
  static calculateMemberInterest(
    member: Member,
    daysSinceLastCalculation: number = 1
  ): { interestEarned: number; interestCharged: number } {
    const financialInfo = member.financialInfo;
    const settings = member.interestSettings;
    
    // Calculate interest earned on positive balance (savings)
    let interestEarned = 0;
    if (financialInfo.currentBalance > 0) {
      interestEarned = this.calculateDailyInterest(
        financialInfo.currentBalance,
        financialInfo.interestRate,
        daysSinceLastCalculation,
        settings.compounding
      );
    }

    // Calculate interest charged on outstanding amount (loans)
    let interestCharged = 0;
    if (financialInfo.outstandingAmount > 0) {
      // Loan interest rate is typically higher - using 2x savings rate for demo
      const loanRate = financialInfo.interestRate * 2;
      interestCharged = this.calculateDailyInterest(
        financialInfo.outstandingAmount,
        loanRate,
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
    calculationDate: Date = new Date()
  ): InterestAccrual {
    const accrualId = `accrual_${memberNumber}_${calculationDate.getTime()}`;
    
    return {
      accrualId,
      memberNumber,
      calculationDate,
      periodStart: new Date(calculationDate.getTime() - 24 * 60 * 60 * 1000), // Previous day
      periodEnd: calculationDate,
      principalAmount: 0, // Will be set by caller based on context
      interestRate: 0,    // Will be set by caller based on context
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
    calculationDate: Date = new Date()
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
        principalAmount: 0, // Will be set by caller
        interestRate: 0,    // Will be set by caller
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

    for (const member of members) {
      try {
        // Calculate interest for this member
        const { interestEarned, interestCharged } = this.calculateMemberInterest(member);
        
        if (interestEarned === 0 && interestCharged === 0) {
          // No interest to calculate for this member
          updatedMembers.push(member);
          continue;
        }

        // Create accrual record
        const accrual = this.createInterestAccrual(
          member.memberNumber,
          interestEarned,
          interestCharged,
          calculationDate
        );
        accruals.push(accrual);

        // Create transactions for earned and charged interest
        if (interestEarned > 0) {
          const earnedTransaction = this.createInterestTransaction(
            member.memberNumber,
            interestEarned,
            'earned',
            accrual.accrualId,
            calculationDate
          );
          transactions.push(earnedTransaction);
        }

        if (interestCharged > 0) {
          const chargedTransaction = this.createInterestTransaction(
            member.memberNumber,
            interestCharged,
            'charged',
            accrual.accrualId,
            calculationDate
          );
          transactions.push(chargedTransaction);
        }

        // Update member balances
        const updatedMember = this.updateMemberBalances(member, interestEarned, interestCharged);
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
  static calculateInterestForPeriod(
    principal: number,
    annualRate: number,
    startDate: Date,
    endDate: Date,
    compounding: boolean = true
  ): number {
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return this.calculateDailyInterest(principal, annualRate, days, compounding);
  }

  // Generate interest report for a member
  static generateInterestReport(member: Member, startDate: Date, endDate: Date): any {
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const projectedEarned = this.calculateDailyInterest(
      member.financialInfo.currentBalance,
      member.financialInfo.interestRate,
      days,
      member.interestSettings.compounding
    );

    const projectedCharged = this.calculateDailyInterest(
      member.financialInfo.outstandingAmount,
      member.financialInfo.interestRate * 2, // Higher rate for loans
      days,
      member.interestSettings.compounding
    );

    return {
      memberNumber: member.memberNumber,
      period: { startDate, endDate, days },
      currentBalance: member.financialInfo.currentBalance,
      outstandingAmount: member.financialInfo.outstandingAmount,
      interestRate: member.financialInfo.interestRate,
      projectedInterestEarned: projectedEarned,
      projectedInterestCharged: projectedCharged,
      netProjectedInterest: projectedEarned - projectedCharged,
      calculationMethod: member.interestSettings.calculationMethod,
      compounding: member.interestSettings.compounding
    };
  }
}
