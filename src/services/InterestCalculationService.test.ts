import { InterestCalculationService } from './InterestCalculationService';
import { FinancialYearService } from './FinancialYearService';
import { Member } from '../types/index';

// Mock the FinancialYearService
jest.mock('./FinancialYearService', () => ({
  FinancialYearService: {
    getCurrentInterestRates: jest.fn()
  }
}));

describe('InterestCalculationService', () => {
  // Test member with positive balance (savings)
  const testMemberWithSavings: Member = {
    memberNumber: 'MEM001',
    userId: 'user123',
    personalInfo: {
      firstName: 'Test',
      lastName: 'Member',
      fullName: 'Test Member'
    },
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
      interestRate: 0.05 // 5% annual interest (legacy field, now uses configurable rates)
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
      interestRate: 0.20 // 20% annual interest on loans (legacy field)
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock default rates (5% savings, 20% loans, 40% penalty)
    (FinancialYearService.getCurrentInterestRates as jest.Mock).mockResolvedValue({
      savingsRate: 0.05,
      loanRate: 0.20,
      penaltyRate: 0.40
    });
  });

  describe('calculateDailyInterest', () => {
    it('should calculate compound interest correctly', () => {
      const principal = 10000; // R10,000
      const annualRate = 0.05; // 5%
      const days = 365; // 1 year
      
      const interest = InterestCalculationService.calculateDailyInterest(principal, annualRate, days, true);
      
      // Compound interest: 10000 * (1 + 0.05/365)^365 - 10000 ≈ 512.67
      expect(interest).toBeCloseTo(512.67, 2);
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

  describe('getCurrentInterestRates', () => {
    it('should return rates from FinancialYearService', async () => {
      const rates = await InterestCalculationService.getCurrentInterestRates();
      expect(rates).toEqual({
        savingsRate: 0.05,
        loanRate: 0.20,
        penaltyRate: 0.40
      });
      expect(FinancialYearService.getCurrentInterestRates).toHaveBeenCalled();
    });
  });

  describe('calculateMemberInterest', () => {
    it('should calculate interest earned on savings using configurable rates', async () => {
      // Mock different rates for testing
      (FinancialYearService.getCurrentInterestRates as jest.Mock).mockResolvedValue({
        savingsRate: 0.06, // 6% instead of 5%
        loanRate: 0.20,
        penaltyRate: 0.40
      });

      const { interestEarned, interestCharged } = await InterestCalculationService.calculateMemberInterest(
        testMemberWithSavings,
        1 // 1 day
      );

      // Daily interest on R50,000 at 6%: 50000 * (1 + 0.06/365)^1 - 50000 ≈ 8.22
      expect(interestEarned).toBeCloseTo(8.22, 2);
      expect(interestCharged).toBe(0);
    });

    it('should calculate interest charged on loans using configurable rates', async () => {
      // Mock different rates for testing
      (FinancialYearService.getCurrentInterestRates as jest.Mock).mockResolvedValue({
        savingsRate: 0.05,
        loanRate: 0.22, // 22% instead of 20%
        penaltyRate: 0.40
      });

      const { interestEarned, interestCharged } = await InterestCalculationService.calculateMemberInterest(
        testMemberWithLoan,
        1 // 1 day
      );

      // Daily interest on R25,000 at 22%: 25000 * (1 + 0.22/365)^1 - 25000 ≈ 15.07
      expect(interestCharged).toBeCloseTo(15.07, 2);
      expect(interestEarned).toBe(0);
    });

    it('should handle member with both savings and loan', async () => {
      const memberWithBoth: Member = {
        ...testMemberWithSavings,
        financialInfo: {
          ...testMemberWithSavings.financialInfo,
          currentBalance: 25000, // R25,000 savings
          outstandingAmount: 10000 // R10,000 loan
        }
      };

      const { interestEarned, interestCharged } = await InterestCalculationService.calculateMemberInterest(
        memberWithBoth,
        1
      );

      // Interest earned on R25,000 at 5%: ~3.42
      // Interest charged on R10,000 at 20%: ~5.48
      expect(interestEarned).toBeCloseTo(3.42, 2);
      expect(interestCharged).toBeCloseTo(5.48, 2);
    });
  });

  describe('createInterestAccrual', () => {
    it('should create a valid interest accrual record with rate information', () => {
      const accrual = InterestCalculationService.createInterestAccrual(
        'MEM001',
        6.85,
        0,
        new Date('2024-01-15'),
        0.05, // interest rate
        50000 // principal amount
      );

      expect(accrual.memberNumber).toBe('MEM001');
      expect(accrual.interestAmount).toBe(6.85);
      expect(accrual.interestType).toBe('earned');
      expect(accrual.status).toBe('calculated');
      expect(accrual.interestRate).toBe(0.05);
      expect(accrual.principalAmount).toBe(50000);
      expect(accrual.accrualId).toMatch(/^accrual_MEM001_\d+$/);
    });
  });

  describe('createInterestTransaction', () => {
    it('should create an interest earned transaction with rate information', () => {
      const transaction = InterestCalculationService.createInterestTransaction(
        'MEM001',
        6.85,
        'earned',
        'accrual_123',
        new Date('2024-01-15'),
        0.05, // interest rate
        50000 // principal amount
      );

      expect(transaction.memberNumber).toBe('MEM001');
      expect(transaction.type).toBe('interest_earned');
      expect(transaction.amount).toBe(6.85);
      expect(transaction.description).toContain('Interest earned');
      expect(transaction.interestDetails.interestRate).toBe(0.05);
      expect(transaction.interestDetails.principalAmount).toBe(50000);
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
  });

  describe('calculateDailyInterestForAllMembers', () => {
    it('should process multiple members correctly with configurable rates', async () => {
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
      
      // Check that rates were fetched (may be called multiple times due to database integration)
      expect(FinancialYearService.getCurrentInterestRates).toHaveBeenCalled();
    });
  });

  describe('generateInterestReport', () => {
    it('should generate a comprehensive interest report with configurable rates', async () => {
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-01-31'); // 30 days
      
      const report = await InterestCalculationService.generateInterestReport(
        testMemberWithSavings,
        startDate,
        endDate
      );

      expect(report.memberNumber).toBe('MEM001');
      expect(report.period.days).toBe(30);
      expect(report.currentBalance).toBe(50000);
      expect(report.savingsInterestRate).toBe(0.05);
      expect(report.loanInterestRate).toBe(0.20);
      expect(report.projectedInterestEarned).toBeCloseTo(205.89, 2); // 30 days interest on R50,000 at 5%
      expect(report.calculationMethod).toBe('daily');
    });
  });

  describe('calculatePenaltyInterest', () => {
    it('should calculate penalty interest using configurable penalty rate', async () => {
      // Mock different penalty rate for testing
      (FinancialYearService.getCurrentInterestRates as jest.Mock).mockResolvedValue({
        savingsRate: 0.05,
        loanRate: 0.20,
        penaltyRate: 0.45 // 45% instead of 40%
      });

      const penaltyInterest = await InterestCalculationService.calculatePenaltyInterest(
        10000, // R10,000
        30,    // 30 days overdue
        true   // compounding
      );

      // Should use the configurable penalty rate of 45%
      expect(penaltyInterest).toBeGreaterThan(0);
      expect(FinancialYearService.getCurrentInterestRates).toHaveBeenCalled();
    });
  });

  describe('isLoanOverdue and getDaysOverdue', () => {
    beforeEach(() => {
      // Mock the current date to be consistent for tests
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-09-30'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should correctly identify overdue loans', () => {
      const loanDate = new Date('2024-01-01'); // More than 90 days ago
      
      expect(InterestCalculationService.isLoanOverdue(loanDate)).toBe(true);
      expect(InterestCalculationService.getDaysOverdue(loanDate)).toBeGreaterThan(90);
    });

    it('should correctly identify non-overdue loans', () => {
      const loanDate = new Date('2024-09-01'); // Less than 90 days ago (29 days)
      
      expect(InterestCalculationService.isLoanOverdue(loanDate)).toBe(false);
      expect(InterestCalculationService.getDaysOverdue(loanDate)).toBe(0);
    });
  });

  describe('calculateLateFee', () => {
    it('should calculate late fee correctly (7% of outstanding balance)', () => {
      const lateFee = InterestCalculationService.calculateLateFee(1000); // R1,000
      expect(lateFee).toBe(70); // 7% of 1000 = 70
    });
  });
});
