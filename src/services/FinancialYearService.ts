import { supabase } from '../config/supabase';
import { PLF_INTEREST_RATES } from './InterestConstants';

export interface FinancialYear {
  id: number;
  start_date: Date;
  end_date: Date;
  savings_interest_rate: number;
  loan_interest_rate: number;
  penalty_interest_rate: number;
  is_current: boolean;
  created_at: Date;
  updated_at: Date;
  created_by: number;
  updated_by: number;
}

export interface InterestRates {
  savingsRate: number;
  loanRate: number;
  penaltyRate: number;
}

export class FinancialYearService {
  private static currentRates: InterestRates | null = null;
  private static lastFetchTime: Date | null = null;
  private static CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

  /**
   * Get current interest rates from financial_years table
   * Falls back to hardcoded rates if database is unavailable
   */
  static async getCurrentInterestRates(): Promise<InterestRates> {
    // Check cache first
    if (this.currentRates && this.lastFetchTime) {
      const cacheAge = Date.now() - this.lastFetchTime.getTime();
      if (cacheAge < this.CACHE_DURATION) {
        return this.currentRates;
      }
    }

    try {
      // Fetch current financial year from database
      const { data, error } = await supabase
        .from('financial_years')
        .select('*')
        .eq('is_current', true)
        .single();

      if (error) {
        console.warn('Failed to fetch current financial year from database:', error.message);
        console.log('Falling back to hardcoded interest rates');
        return this.getHardcodedRates();
      }

      if (!data) {
        console.warn('No current financial year found in database');
        return this.getHardcodedRates();
      }

      const rates: InterestRates = {
        savingsRate: data.savings_interest_rate,
        loanRate: data.loan_interest_rate,
        penaltyRate: data.penalty_interest_rate
      };

      // Update cache
      this.currentRates = rates;
      this.lastFetchTime = new Date();

      return rates;

    } catch (error) {
      console.error('Error fetching interest rates from database:', error);
      return this.getHardcodedRates();
    }
  }

  /**
   * Get hardcoded rates as fallback
   */
  private static getHardcodedRates(): InterestRates {
    return {
      savingsRate: 0.05, // 5%
      loanRate: PLF_INTEREST_RATES.LOAN_INTEREST_RATE, // 20%
      penaltyRate: PLF_INTEREST_RATES.PENALTY_INTEREST_RATE // 40%
    };
  }

  /**
   * Get rates for a specific financial year
   */
  static async getRatesForYear(yearId: number): Promise<InterestRates | null> {
    try {
      const { data, error } = await supabase
        .from('financial_years')
        .select('savings_interest_rate, loan_interest_rate, penalty_interest_rate')
        .eq('id', yearId)
        .single();

      if (error || !data) {
        console.warn(`Failed to fetch rates for financial year ${yearId}:`, error?.message);
        return null;
      }

      return {
        savingsRate: data.savings_interest_rate,
        loanRate: data.loan_interest_rate,
        penaltyRate: data.penalty_interest_rate
      };

    } catch (error) {
      console.error(`Error fetching rates for year ${yearId}:`, error);
      return null;
    }
  }

  /**
   * Get rates for a specific date
   */
  static async getRatesForDate(date: Date): Promise<InterestRates | null> {
    try {
      const { data, error } = await supabase
        .from('financial_years')
        .select('savings_interest_rate, loan_interest_rate, penalty_interest_rate')
        .lte('start_date', date.toISOString())
        .gte('end_date', date.toISOString())
        .single();

      if (error || !data) {
        console.warn(`Failed to fetch rates for date ${date.toISOString()}:`, error?.message);
        return null;
      }

      return {
        savingsRate: data.savings_interest_rate,
        loanRate: data.loan_interest_rate,
        penaltyRate: data.penalty_interest_rate
      };

    } catch (error) {
      console.error(`Error fetching rates for date ${date.toISOString()}:`, error);
      return null;
    }
  }

  /**
   * Clear the rates cache
   */
  static clearCache(): void {
    this.currentRates = null;
    this.lastFetchTime = null;
  }

  /**
   * Check if database rates are available
   */
  static async isDatabaseAvailable(): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('financial_years')
        .select('count')
        .limit(1);

      return !error;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get all financial years for admin purposes
   */
  static async getAllFinancialYears(): Promise<FinancialYear[]> {
    try {
      const { data, error } = await supabase
        .from('financial_years')
        .select('*')
        .order('start_date', { ascending: false });

      if (error) {
        console.error('Failed to fetch financial years:', error.message);
        return [];
      }

      return data.map(row => ({
        ...row,
        start_date: new Date(row.start_date),
        end_date: new Date(row.end_date),
        created_at: new Date(row.created_at),
        updated_at: new Date(row.updated_at)
      }));

    } catch (error) {
      console.error('Error fetching financial years:', error);
      return [];
    }
  }

  /**
   * Create a new financial year
   */
  static async createFinancialYear(
    startDate: Date,
    endDate: Date,
    savingsRate: number,
    loanRate: number,
    penaltyRate: number,
    isCurrent: boolean = false,
    userId: number
  ): Promise<FinancialYear | null> {
    try {
      const { data, error } = await supabase
        .from('financial_years')
        .insert({
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          savings_interest_rate: savingsRate,
          loan_interest_rate: loanRate,
          penalty_interest_rate: penaltyRate,
          is_current: isCurrent,
          created_by: userId,
          updated_by: userId
        })
        .select()
        .single();

      if (error) {
        console.error('Failed to create financial year:', error.message);
        return null;
      }

      // Clear cache since rates may have changed
      this.clearCache();

      return {
        ...data,
        start_date: new Date(data.start_date),
        end_date: new Date(data.end_date),
        created_at: new Date(data.created_at),
        updated_at: new Date(data.updated_at)
      };

    } catch (error) {
      console.error('Error creating financial year:', error);
      return null;
    }
  }
}
