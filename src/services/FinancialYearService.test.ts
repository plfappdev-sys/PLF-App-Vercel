import { FinancialYearService, InterestRates } from './FinancialYearService';

// Mock the supabase client
jest.mock('../config/supabase', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    lte: jest.fn().mockReturnThis(),
    gte: jest.fn().mockReturnThis(),
    single: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis()
  }
}));

describe('FinancialYearService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    FinancialYearService.clearCache();
  });

  describe('getCurrentInterestRates', () => {
    it('should return hardcoded rates when database is unavailable', async () => {
      const mockSupabase = require('../config/supabase').supabase;
      mockSupabase.from.mockImplementation(() => ({
        select: () => ({
          eq: () => ({
            single: () => ({
              error: new Error('Database connection failed'),
              data: null
            })
          })
        })
      }));

      const rates = await FinancialYearService.getCurrentInterestRates();

      expect(rates).toEqual({
        savingsRate: 0.05,
        loanRate: 0.20,
        penaltyRate: 0.40
      });
    });

    it('should return database rates when available', async () => {
      const mockSupabase = require('../config/supabase').supabase;
      mockSupabase.from.mockImplementation(() => ({
        select: () => ({
          eq: () => ({
            single: () => ({
              error: null,
              data: {
                savings_interest_rate: 0.06,
                loan_interest_rate: 0.22,
                penalty_interest_rate: 0.45
              }
            })
          })
        })
      }));

      const rates = await FinancialYearService.getCurrentInterestRates();

      expect(rates).toEqual({
        savingsRate: 0.06,
        loanRate: 0.22,
        penaltyRate: 0.45
      });
    });

    it('should use cache for subsequent calls', async () => {
      const mockSupabase = require('../config/supabase').supabase;
      mockSupabase.from.mockImplementation(() => ({
        select: () => ({
          eq: () => ({
            single: () => ({
              error: null,
              data: {
                savings_interest_rate: 0.06,
                loan_interest_rate: 0.22,
                penalty_interest_rate: 0.45
              }
            })
          })
        })
      }));

      // First call - should hit database
      const rates1 = await FinancialYearService.getCurrentInterestRates();
      
      // Second call - should use cache
      const rates2 = await FinancialYearService.getCurrentInterestRates();

      expect(rates1).toEqual(rates2);
      // Database should only be called once due to caching
      expect(mockSupabase.from).toHaveBeenCalledTimes(1);
    });
  });

  describe('getRatesForYear', () => {
    it('should return rates for specific year', async () => {
      const mockSupabase = require('../config/supabase').supabase;
      mockSupabase.from.mockImplementation(() => ({
        select: () => ({
          eq: () => ({
            single: () => ({
              error: null,
              data: {
                savings_interest_rate: 0.055,
                loan_interest_rate: 0.21,
                penalty_interest_rate: 0.42
              }
            })
          })
        })
      }));

      const rates = await FinancialYearService.getRatesForYear(1);

      expect(rates).toEqual({
        savingsRate: 0.055,
        loanRate: 0.21,
        penaltyRate: 0.42
      });
    });

    it('should return null when year not found', async () => {
      const mockSupabase = require('../config/supabase').supabase;
      mockSupabase.from.mockImplementation(() => ({
        select: () => ({
          eq: () => ({
            single: () => ({
              error: new Error('Year not found'),
              data: null
            })
          })
        })
      }));

      const rates = await FinancialYearService.getRatesForYear(999);

      expect(rates).toBeNull();
    });
  });

  describe('getRatesForDate', () => {
    it('should return rates for specific date', async () => {
      const mockSupabase = require('../config/supabase').supabase;
      mockSupabase.from.mockImplementation(() => ({
        select: () => ({
          lte: () => ({
            gte: () => ({
              single: () => ({
                error: null,
                data: {
                  savings_interest_rate: 0.057,
                  loan_interest_rate: 0.23,
                  penalty_interest_rate: 0.46
                }
              })
            })
          })
        })
      }));

      const testDate = new Date('2024-01-15');
      const rates = await FinancialYearService.getRatesForDate(testDate);

      expect(rates).toEqual({
        savingsRate: 0.057,
        loanRate: 0.23,
        penaltyRate: 0.46
      });
    });
  });

  describe('getHardcodedRates', () => {
    it('should return the correct hardcoded rates', () => {
      // Access private method through any cast for testing
      const rates = (FinancialYearService as any).getHardcodedRates();

      expect(rates).toEqual({
        savingsRate: 0.05,
        loanRate: 0.20,
        penaltyRate: 0.40
      });
    });
  });

  describe('clearCache', () => {
    it('should clear the cached rates', async () => {
      const mockSupabase = require('../config/supabase').supabase;
      mockSupabase.from.mockImplementation(() => ({
        select: () => ({
          eq: () => ({
            single: () => ({
              error: null,
              data: {
                savings_interest_rate: 0.06,
                loan_interest_rate: 0.22,
                penalty_interest_rate: 0.45
              }
            })
          })
        })
      }));

      // First call - populate cache
      await FinancialYearService.getCurrentInterestRates();
      
      // Clear cache
      FinancialYearService.clearCache();

      // Second call - should hit database again
      await FinancialYearService.getCurrentInterestRates();

      // Database should be called twice (once before clear, once after)
      expect(mockSupabase.from).toHaveBeenCalledTimes(2);
    });
  });

  describe('isDatabaseAvailable', () => {
    it('should return true when database is available', async () => {
      const mockSupabase = require('../config/supabase').supabase;
      mockSupabase.from.mockImplementation(() => ({
        select: () => ({
          limit: () => ({
            error: null
          })
        })
      }));

      const isAvailable = await FinancialYearService.isDatabaseAvailable();
      expect(isAvailable).toBe(true);
    });

    it('should return false when database is unavailable', async () => {
      const mockSupabase = require('../config/supabase').supabase;
      mockSupabase.from.mockImplementation(() => ({
        select: () => ({
          limit: () => ({
            error: new Error('Connection failed')
          })
        })
      }));

      const isAvailable = await FinancialYearService.isDatabaseAvailable();
      expect(isAvailable).toBe(false);
    });
  });
});
