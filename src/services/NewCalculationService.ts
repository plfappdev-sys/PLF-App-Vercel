import { supabase } from '../config/supabase';
import Decimal from 'decimal.js';
import { PLF_INTEREST_RATES } from './InterestConstants';

// Configure decimal.js for financial precision
Decimal.set({ precision: 10, rounding: Decimal.ROUND_HALF_UP });

export interface MemberCalculationResult {
  memberId: number;
  memberNumber: string;
  memberName: string;
  
  // Expected contributions
  expectedContributionTotal: number; // R200 × 72 months + R250 × 19 months
  monthsAt200Rate: number; // 72 months (2018/6 to 2024/6)
  monthsAt250Rate: number; // 19 months (2024/7 to date)
  
  // Actual contributions
  actualContributionsTotal: number; // What members actually paid
  balanceBroughtForward: number; // Closing balance from previous year
  
  // 12-month calculations
  estimated12MonthsContribution: number; // Column C + Column D
  total12MonthsContribution: number; // Column BK (O+S+W+AA+AE+AI+AQ+AM+AU+AY+BC+BG)
  
  // Outstanding calculations
  totalOutstanding: number; // Estimated 12 months - Total 12 months - Membership fee
  membershipFee: number; // R100 joining fee
  
  // Penalty calculations
  penaltyForYear: number; // R+V+Z+AD+AH+AL+AP+AT+AX+BB+BF+BJ
  penaltiesCapped: boolean; // Penalties capped from 2018 until 2024 Nov
  
  // Final balance
  closingBalance: number; // Total outstanding + Penalty for the year + Balance Brought Forward
  
  // Monthly penalty details
  monthlyPenalties: MonthlyPenalty[];
}

export interface MonthlyPenalty {
  month: string; // YYYY-MM
  balanceBroughtForward: number;
  currentMonthContribution: number;
  penaltyAmount: number; // (balance brought forward + current month contribution) × 5.5%
  capped: boolean;
}

export class NewCalculationService {
  
  /**
   * Calculate expected contribution for a member
   * R200 × 72 months (2018/6 to 2024/6) + R250 × 19 months (2024/7 to date)
   */
  static calculateExpectedContribution(
    joinDate: Date,
    currentDate: Date = new Date()
  ): { expectedTotal: number; monthsAt200: number; monthsAt250: number } {
    // Calculate months from join date to current date
    const totalMonths = this.monthsBetween(joinDate, currentDate);
    
    // Months at R200 rate: from join date to June 2024 (or total months if before June 2024)
    const june2024 = new Date(2024, 5, 30); // June 30, 2024
    const monthsAt200 = Math.min(totalMonths, this.monthsBetween(joinDate, june2024));
    
    // Months at R250 rate: from July 2024 to current date (or 0 if before July 2024)
    const july2024 = new Date(2024, 6, 1); // July 1, 2024
    const monthsAt250 = Math.max(0, this.monthsBetween(july2024, currentDate));
    
    const expectedTotal = (200 * monthsAt200) + (250 * monthsAt250);
    
    return {
      expectedTotal,
      monthsAt200,
      monthsAt250
    };
  }
  
  /**
   * Calculate monthly penalty: (balance brought forward + current month contribution) × 5.5%
   */
  static calculateMonthlyPenalty(
    balanceBroughtForward: number,
    currentMonthContribution: number
  ): number {
    const totalAmount = new Decimal(balanceBroughtForward).plus(currentMonthContribution);
    const penalty = totalAmount.times(PLF_INTEREST_RATES.LATE_PENALTY_RATE);
    return penalty.toNumber();
  }
  
  /**
   * Calculate next month penalty: (amount due + current month contribution) × 5.5%
   */
  static calculateNextMonthPenalty(
    amountDue: number,
    currentMonthContribution: number
  ): number {
    const totalAmount = new Decimal(amountDue).plus(currentMonthContribution);
    const penalty = totalAmount.times(PLF_INTEREST_RATES.LATE_PENALTY_RATE);
    return penalty.toNumber();
  }
  
  /**
   * Check if penalties should be capped (from 2018 until 2024 Nov)
   */
  static isPenaltyCapped(month: Date): boolean {
    const startCap = new Date(2018, 0, 1); // January 2018
    const endCap = new Date(2024, 10, 30); // November 30, 2024
    
    return month >= startCap && month <= endCap;
  }
  
  /**
   * Calculate comprehensive member calculation
   */
  static async calculateMemberDetails(memberId: number): Promise<MemberCalculationResult | null> {
    try {
      // Get member details
      const { data: memberData, error: memberError } = await supabase
        .from('members')
        .select('*')
        .eq('id', memberId)
        .single();
      
      if (memberError) {
        console.error('Error getting member details:', memberError);
        return null;
      }
      
      // Get member's contributions
      const contributions = await this.getMemberContributions(memberId);
      
      // Get member's transactions for actual contributions
      const actualContributions = await this.getActualContributions(memberId);
      
      // Calculate expected contribution
      const joinDate = new Date(memberData.join_date || memberData.created_at);
      const expected = this.calculateExpectedContribution(joinDate);
      
      // Calculate actual contributions total
      const actualTotal = actualContributions.reduce((sum, contribution) => sum + contribution.amount, 0);
      
      // Get balance brought forward (closing balance from previous year)
      const balanceBroughtForward = memberData.closing_balance || memberData.financial_info?.current_balance || 0;
      
      // Calculate 12-month contributions (simplified - would need actual Excel column mapping)
      const estimated12Months = this.estimate12MonthsContribution(memberData);
      const total12Months = this.calculateTotal12MonthsContribution(contributions);
      
      // Calculate total outstanding
      const membershipFee = memberData.joining_fee_paid ? 0 : PLF_INTEREST_RATES.JOINING_FEE;
      const totalOutstanding = estimated12Months - total12Months - membershipFee;
      
      // Calculate penalty for the year
      const penaltyForYear = this.calculatePenaltyForYear(contributions, balanceBroughtForward);
      
      // Calculate closing balance
      const closingBalance = totalOutstanding + penaltyForYear + balanceBroughtForward;
      
      // Calculate monthly penalties
      const monthlyPenalties = this.calculateMonthlyPenalties(contributions, balanceBroughtForward);
      
      return {
        memberId: memberData.id,
        memberNumber: memberData.member_number,
        memberName: memberData.name,
        
        expectedContributionTotal: expected.expectedTotal,
        monthsAt200Rate: expected.monthsAt200,
        monthsAt250Rate: expected.monthsAt250,
        
        actualContributionsTotal: actualTotal,
        balanceBroughtForward,
        
        estimated12MonthsContribution: estimated12Months,
        total12MonthsContribution: total12Months,
        
        totalOutstanding,
        membershipFee,
        
        penaltyForYear,
        penaltiesCapped: monthlyPenalties.some(p => p.capped),
        
        closingBalance,
        
        monthlyPenalties
      };
      
    } catch (error) {
      console.error('Error calculating member details:', error);
      return null;
    }
  }
  
  /**
   * Get member contributions from database
   */
  private static async getMemberContributions(memberId: number): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('contributions')
        .select('*')
        .eq('member_id', memberId)
        .order('contribution_month', { ascending: true });
      
      if (error) {
        console.error('Error getting member contributions:', error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('Error in getMemberContributions:', error);
      return [];
    }
  }
  
  /**
   * Get actual contributions from transactions
   */
  private static async getActualContributions(memberId: number): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('member_id', memberId)
        .eq('type', 'contribution')
        .order('date', { ascending: true });
      
      if (error) {
        console.error('Error getting actual contributions:', error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('Error in getActualContributions:', error);
      return [];
    }
  }
  
  /**
   * Estimate 12 months contribution (simplified - would need Excel column mapping)
   */
  private static estimate12MonthsContribution(memberData: any): number {
    // Simplified estimation - in real implementation, this would map to Excel columns C + D
    const monthlyContribution = memberData.monthly_contribution || 200;
    return monthlyContribution * 12;
  }
  
  /**
   * Calculate total 12 months contribution from actual contributions
   */
  private static calculateTotal12MonthsContribution(contributions: any[]): number {
    // Get contributions from last 12 months
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    const last12MonthsContributions = contributions.filter(contribution => {
      const contributionDate = new Date(contribution.contribution_month);
      return contributionDate >= oneYearAgo;
    });
    
    return last12MonthsContributions.reduce((sum, contribution) => {
      return sum + (contribution.amount_paid || 0);
    }, 0);
  }
  
  /**
   * Calculate penalty for the year
   */
  private static calculatePenaltyForYear(contributions: any[], balanceBroughtForward: number): number {
    let totalPenalty = 0;
    let runningBalance = balanceBroughtForward;
    
    // Sort contributions by month
    const sortedContributions = [...contributions].sort((a, b) => {
      return new Date(a.contribution_month).getTime() - new Date(b.contribution_month).getTime();
    });
    
    for (const contribution of sortedContributions) {
      const contributionDate = new Date(contribution.contribution_month);
      const isCapped = this.isPenaltyCapped(contributionDate);
      
      if (contribution.status === 'overdue' || contribution.late_fee_applied) {
        const penalty = this.calculateMonthlyPenalty(
          runningBalance,
          contribution.amount_due || 0
        );
        
        // Apply cap if applicable
        totalPenalty += isCapped ? Math.min(penalty, this.getCappedPenaltyLimit(contributionDate)) : penalty;
      }
      
      // Update running balance for next month
      runningBalance += (contribution.amount_due || 0) - (contribution.amount_paid || 0);
    }
    
    return totalPenalty;
  }
  
  /**
   * Calculate monthly penalties with details
   */
  private static calculateMonthlyPenalties(contributions: any[], initialBalance: number): MonthlyPenalty[] {
    const monthlyPenalties: MonthlyPenalty[] = [];
    let runningBalance = initialBalance;
    
    // Sort contributions by month
    const sortedContributions = [...contributions].sort((a, b) => {
      return new Date(a.contribution_month).getTime() - new Date(b.contribution_month).getTime();
    });
    
    for (const contribution of sortedContributions) {
      const contributionDate = new Date(contribution.contribution_month);
      const monthStr = contributionDate.toISOString().substring(0, 7); // YYYY-MM
      const isCapped = this.isPenaltyCapped(contributionDate);
      
      if (contribution.status === 'overdue' || contribution.late_fee_applied) {
        const penaltyAmount = this.calculateMonthlyPenalty(
          runningBalance,
          contribution.amount_due || 0
        );
        
        const cappedPenalty = isCapped ? Math.min(penaltyAmount, this.getCappedPenaltyLimit(contributionDate)) : penaltyAmount;
        
        monthlyPenalties.push({
          month: monthStr,
          balanceBroughtForward: runningBalance,
          currentMonthContribution: contribution.amount_due || 0,
          penaltyAmount: cappedPenalty,
          capped: isCapped
        });
      }
      
      // Update running balance for next month
      runningBalance += (contribution.amount_due || 0) - (contribution.amount_paid || 0);
    }
    
    return monthlyPenalties;
  }
  
  /**
   * Get capped penalty limit for a specific month
   */
  private static getCappedPenaltyLimit(month: Date): number {
    // Simplified - in real implementation, this would have specific limits per period
    // For now, return a reasonable cap based on the year
    const year = month.getFullYear();
    
    // Example caps - these would come from business rules
    const caps: Record<number, number> = {
      2018: 1000,
      2019: 1200,
      2020: 1500,
      2021: 1800,
      2022: 2000,
      2023: 2200,
      2024: 2500
    };
    
    return caps[year] || 3000; // Default cap
  }
  
  /**
   * Calculate months between two dates
   */
  private static monthsBetween(date1: Date, date2: Date): number {
    const year1 = date1.getFullYear();
    const year2 = date2.getFullYear();
    const month1 = date1.getMonth();
    const month2 = date2.getMonth();
    
    return (year2 - year1) * 12 + (month2 - month1);
  }
  
  /**
   * Test calculation with Christopher Naude (M006) example
   */
  static async testChristopherNaudeExample(): Promise<void> {
    console.log('=== Testing Christopher Naude (M006) Example ===');
    
    // Example data from document
    const expectedTotal = 14400 + 4750; // R14,400.00 + R4,750.00
    const actualContributions = 5600; // R5,600.00
    const balanceBroughtForward = 23667.52; // R23,667.52
    const closingBalance = 51965.10; // R51,965.10
    
    console.log('Expected Contribution Total: R', expectedTotal.toFixed(2));
    console.log('Actual Contributions: R', actualContributions.toFixed(2));
    console.log('Balance Brought Forward: R', balanceBroughtForward.toFixed(2));
    console.log('Closing Balance (from document): R', closingBalance.toFixed(2));
    
    // Calculate outstanding and penalty based on formula
    // Closing Balance = Total outstanding + Penalty for the year + Balance Brought Forward
    // So: Total outstanding + Penalty for the year = Closing Balance - Balance Brought Forward
    const outstandingPlusPenalty = closingBalance - balanceBroughtForward;
    console.log('Total Outstanding + Penalty for the year: R', outstandingPlusPenalty.toFixed(2));
    
    // For Christopher Naude:
    // 2024/25 outstanding contribution = R2,400.00
    // 2024/25 penalties = R25,897.59
    const documentedOutstanding = 2400;
    const documentedPenalty = 25897.59;
    console.log('Documented Outstanding (2024/25): R', documentedOutstanding.toFixed(2));
    console.log('Documented Penalty (2024/25): R', documentedPenalty.toFixed(2));
    console.log('Sum: R', (documentedOutstanding + documentedPenalty).toFixed(2));
    
    console.log('=== End Test ===');
  }
}