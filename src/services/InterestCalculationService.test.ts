import { InterestCalculationService } from './InterestCalculationService';
import { Member } from '../types/index';

describe('InterestCalculationService', () => {
  // Test member with positive balance (savings)
  const testMemberWithSavings: Member = {
    memberNumber: 'MEM001',
    userId: 'user123',
    financialInfo: {
      totalContributions: 12000,
      currentBalance: 50000, // R50,000 savings
      outstandingAmount: 0, // No loans
      percentageOutstanding: 0,
      balanceBroughtForward: 0,
      plannedContributions: 1000,
      actualContributions: 1000,
      currentInterestEarned: 0,
      totalInterestEarned: 0,
      currentInterestCharged: 0,
      totalInterestCharged: 0,
      lastInterestCalculation: new Date('2024-01-14'),
      interestRate: 0.05 // 5% annual interest
    },
    contributionHistory: [],
    loanHistory: [],
    interestHistory: [],
    membershipStatus: {
      isActive: true,
      standingCategory: 'good'
    },
    interestSettings: {
      calculationMethod: 'daily',
      compounding: true,
      taxDeduction: 0
    },
    lastUpdated: new Date('2024-01-15')
  };

  // Test member with outstanding loan
  const testMemberWithLoan: Member = {
    ...testMemberWithSavings,
    memberNumber: 'MEM002',
    financialInfo: {
      ...testMemberWithSavings.financialInfo,
      currentBalance: -25000, // R25,000 loan outstanding
      outstandingAmount: 25000,
      interestRate: 0.10 // 10% annual interest on loans
    }
  };

  describe('calculateDailyInterest', () => {
    it('should calculate compound interest correctly', () => {
      const principal = 10000; // R10,000
      const annualRate = 0.05; // 5%
      const days = 365; // 1 year
      
      const interest = InterestCalculationService.calculateDailyInterest(principal, annualRate, days, true);
      
      // Compound interest: 10000 * (1 + 0.05/365)^365 - 10000 ≈ 512.68
      expect(interest).toBeCloseTo(512.68, 2);
    });

    it('should calculate simple interest correctly', () => {
      const principal = 10000; // R10,000
      const annualRate = 0.05; // 5%
      const days = 365; // 1 year
      
      const interest = InterestCalculationService.calculateDailyInterest(principal, annualRate, days, false);
      
      // Simple interest: 10000 * 0.05 * 1 = 500
      expect(interest).toBeCloseTo(500, 2);
    });

    it('should handle zero principal', () => {
      const interest = InterestCalculationService.calculateDailyInterest(0, 0.05, 365, true);
      expect(interest).toBe(0);
    });

    it('should handle zero interest rate', () => {
      const interest = InterestCalculationService.calculateDailyInterest(10000, 0, 365, true);
      expect(interest).toBe(0);
    });
  });

  describe('calculateMemberInterest', () => {
    it('should calculate interest earned on savings', () => {
      const { interestEarned, interestCharged } = InterestCalculationService.calculateMemberInterest(
        testMemberWithSavings,
        1 // 1 day
      );

      // Daily interest on R50,000 at 5%: 50000 * (1 + 0.05/365)^1 - 50000 ≈ 6.85
      expect(interestEarned).toBeCloseTo(6.85, 2);
      expect(interestCharged).toBe(0);
    });

    it('should calculate interest charged on loans', () => {
      const { interestEarned, interestCharged } = InterestCalculationService.calculateMemberInterest(
        testMemberWithLoan,
        1 // 1 day
      );

      // Daily interest on R25,000 at 10%: 25000 * (1 + 0.10/365)^1 - 25000 ≈ 6.85
      expect(interestCharged).toBeCloseTo(6.85, 2);
      expect(interestEarned).toBe(0);
    });

    it('should handle member with both savings and loan', () => {
      const memberWithBoth: Member = {
        ...testMemberWithSavings,
        financialInfo: {
          ...testMemberWithSavings.financialInfo,
          currentBalance: 25000, // R25,000 savings
          outstandingAmount: 10000 // R10,000 loan
        }
      };

      const { interestEarned, interestCharged } = InterestCalculationService.calculateMemberInterest(
        memberWithBoth,
        1
      );

      // Interest earned on R25,000 at 5%: ~3.42
      // Interest charged on R10,000 at 10%: ~2.74
      expect(interestEarned).toBeCloseTo(3.42, 2);
      expect(interestCharged).toBeCloseTo(2.74, 2);
    });
  });

  describe('createInterestAccrual', () => {
    it('should create a valid interest accrual record', () => {
      const accrual = InterestCalculationService.createInterestAccrual(
        'MEM001',
        6.85,
        0,
        new Date('2024-01-15')
      );

      expect(accrual.memberNumber).toBe('MEM001');
      expect(accrual.interestAmount).toBe(6.85);
      expect(accrual.interestType).toBe('earned');
      expect(accrual.status).toBe('calculated');
      expect(accrual.accrualId).toMatch(/^accrual_MEM001_\d+$/);
    });
  });

  describe('createInterestTransaction', () => {
    it('should create an interest earned transaction', () => {
      const transaction = InterestCalculationService.createInterestTransaction(
        'MEM001',
        6.85,
        'earned',
        'accrual_123',
        new Date('2024-01-15')
      );

      expect(transaction.memberNumber).toBe('MEM001');
      expect(transaction.type).toBe('interest_earned');
      expect(transaction.amount).toBe(6.85);
      expect(transaction.description).toContain('Interest earned');
    });

    it('should create an interest charged transaction', () => {
      const transaction = InterestCalculationService.createInterestTransaction(
        'MEM001',
        6.85,
        'charged',
        'accrual_123',
        new Date('2024-01-15')
      );

      expect(transaction.memberNumber).toBe('MEM001');
      expect(transaction.type).toBe('interest_charged');
      expect(transaction.amount).toBe(6.85);
      expect(transaction.description).toContain('Interest charged');
    });
  });

  describe('updateMemberBalances', () => {
    it('should update member balances with earned interest', () => {
      const updatedMember = InterestCalculationService.updateMemberBalances(
        testMemberWithSavings,
        6.85,
        0
      );

      expect(updatedMember.financialInfo.currentInterestEarned).toBe(6.85);
      expect(updatedMember.financialInfo.totalInterestEarned).toBe(6.85);
      expect(updatedMember.financialInfo.currentBalance).toBe(50006.85);
      expect(updatedMember.financialInfo.lastInterestCalculation).toBeInstanceOf(Date);
    });

    it('should update member balances with charged interest', () => {
      const updatedMember = InterestCalculationService.updateMemberBalances(
        testMemberWithLoan,
        0,
        6.85
      );

      expect(updatedMember.financialInfo.currentInterestCharged).toBe(6.85);
      expect(updatedMember.financialInfo.totalInterestCharged).toBe(6.85);
      expect(updatedMember.financialInfo.currentBalance).toBe(-25006.85);
    });
  });

  describe('calculateInterestForPeriod', () => {
    it('should calculate interest for a specific period', () => {
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-01-31'); // 30 days
      
      const interest = InterestCalculationService.calculateInterestForPeriod(
        10000, // R10,000
        0.05,  // 5%
        startDate,
        endDate,
        true
      );

      // 30 days compound interest: ~41.10
      expect(interest).toBeCloseTo(41.10, 2);
    });
  });

  describe('generateInterestReport', () => {
    it('should generate a comprehensive interest report', () => {
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-01-31'); // 30 days
      
      const report = InterestCalculationService.generateInterestReport(
        testMemberWithSavings,
        startDate,
        endDate
      );

      expect(report.memberNumber).toBe('MEM001');
      expect(report.period.days).toBe(30);
      expect(report.currentBalance).toBe(50000);
      expect(report.projectedInterestEarned).toBeCloseTo(205.50, 2); // 30 days interest on R50,000
      expect(report.calculationMethod).toBe('daily');
    });
  });

  describe('calculateDailyInterestForAllMembers', () => {
    it('should process multiple members correctly', async () => {
      const members = [testMemberWithSavings, testMemberWithLoan];
      
      const result = await InterestCalculationService.calculateDailyInterestForAllMembers(members);
      
      expect(result.updatedMembers).toHaveLength(2);
      expect(result.accruals).toHaveLength(2);
      expect(result.transactions).toHaveLength(2);
      
      // Check that balances were updated
      const savingsMember = result.updatedMembers.find(m => m.memberNumber === 'MEM001');
      const loanMember = result.updatedMembers.find(m => m.memberNumber === 'MEM002');
      
      expect(savingsMember?.financialInfo.currentInterestEarned).toBeGreaterThan(0);
      expect(loanMember?.financialInfo.currentInterestCharged).toBeGreaterThan(0);
    });

    it('should handle members with no interest to calculate', async () => {
      const memberWithZeroBalance: Member = {
        ...testMemberWithSavings,
        memberNumber: 'MEM003',
        financialInfo: {
          ...testMemberWithSavings.financialInfo,
          currentBalance: 0,
          outstandingAmount: 0
        }
      };
      
      const result = await InterestCalculationService.calculateDailyInterestForAllMembers([
        memberWithZeroBalance
      ]);
      
      expect(result.updatedMembers).toHaveLength(1);
      expect(result.accruals).toHaveLength(0);
      expect(result.transactions).toHaveLength(0);
    });
  });
});
