import { supabase } from '../config/supabase';
import { MemberBalanceService } from './MemberBalanceService';

export interface CatchUpFeeCalculationResult {
  member_id: number;
  member_number: string;
  join_date: Date;
  months_missed: number;
  catch_up_fee_amount: number;
  calculated_date: Date;
}

export interface CatchUpFeeProcessingResult {
  successCount: number;
  failureCount: number;
  totalFeesApplied: number;
  processedMembers: number[];
  errors: Array<{ memberId: number; error: string }>;
}

export class CatchUpFeeService {
  // Reference date for catch-up fee calculation (July 2018)
  private static readonly CATCH_UP_REFERENCE_DATE = new Date('2018-07-01');
  private static readonly MONTHLY_CONTRIBUTION_AMOUNT = 200.00;

  /**
   * Calculate catch-up fee for a member who joined after July 2018
   */
  static async calculateCatchUpFee(memberId: number): Promise<CatchUpFeeCalculationResult | null> {
    try {
      // Get member details including join date
      const { data: memberData, error: memberError } = await supabase
        .from('members')
        .select('id, member_number, join_date, catch_up_fee')
        .eq('id', memberId)
        .single();

      if (memberError) {
        console.error('Error getting member details:', memberError);
        throw memberError;
      }

      // Check if member already has catch-up fee applied
      if (memberData.catch_up_fee && memberData.catch_up_fee > 0) {
        console.log(`Member ${memberId} already has catch-up fee applied: R${memberData.catch_up_fee}`);
        return null;
      }

      const joinDate = new Date(memberData.join_date);
      
      // Only calculate for members who joined after July 2018
      if (joinDate <= this.CATCH_UP_REFERENCE_DATE) {
        console.log(`Member ${memberId} joined before July 2018, no catch-up fee required`);
        return null;
      }

      // Calculate months missed (from July 2018 to join date)
      const monthsMissed = this.calculateMonthsMissed(joinDate);
      
      if (monthsMissed <= 0) {
        console.log(`Member ${memberId} joined in or after July 2018 but no months missed`);
        return null;
      }

      const catchUpFeeAmount = monthsMissed * this.MONTHLY_CONTRIBUTION_AMOUNT;

      const result: CatchUpFeeCalculationResult = {
        member_id: memberId,
        member_number: memberData.member_number,
        join_date: joinDate,
        months_missed: monthsMissed,
        catch_up_fee_amount: catchUpFeeAmount,
        calculated_date: new Date()
      };

      console.log(`Calculated catch-up fee for member ${memberId}: R${catchUpFeeAmount} (${monthsMissed} months)`);
      
      return result;

    } catch (error) {
      console.error(`Error calculating catch-up fee for member ${memberId}:`, error);
      throw error;
    }
  }

  /**
   * Apply catch-up fee to a member
   */
  static async applyCatchUpFee(memberId: number): Promise<CatchUpFeeProcessingResult> {
    const result: CatchUpFeeProcessingResult = {
      successCount: 0,
      failureCount: 0,
      totalFeesApplied: 0,
      processedMembers: [],
      errors: []
    };

    try {
      const calculation = await this.calculateCatchUpFee(memberId);
      
      if (!calculation) {
        // No catch-up fee to apply
        return result;
      }

      // Update member record with catch-up fee
      const { error: updateError } = await supabase
        .from('members')
        .update({
          catch_up_fee: calculation.catch_up_fee_amount,
          updated_at: new Date().toISOString()
        })
        .eq('id', memberId);

      if (updateError) {
        throw updateError;
      }

      // Update member balance with the catch-up fee
      await MemberBalanceService.updateBalanceWithFee(
        memberId,
        calculation.catch_up_fee_amount,
        `catch_up_fee_${memberId}_${Date.now()}`
      );

      result.successCount = 1;
      result.totalFeesApplied = calculation.catch_up_fee_amount;
      result.processedMembers.push(memberId);

      console.log(`Successfully applied catch-up fee of R${calculation.catch_up_fee_amount} to member ${memberId}`);

    } catch (error) {
      result.failureCount = 1;
      result.errors.push({
        memberId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      console.error(`Failed to apply catch-up fee to member ${memberId}:`, error);
    }

    return result;
  }

  /**
   * Process catch-up fees for all eligible members
   */
  static async processCatchUpFeesForAllMembers(): Promise<CatchUpFeeProcessingResult> {
    const result: CatchUpFeeProcessingResult = {
      successCount: 0,
      failureCount: 0,
      totalFeesApplied: 0,
      processedMembers: [],
      errors: []
    };

    try {
      // Get all members who joined after July 2018 and don't have catch-up fees applied
      const { data: eligibleMembers, error } = await supabase
        .from('members')
        .select('id, join_date, catch_up_fee')
        .gt('join_date', this.CATCH_UP_REFERENCE_DATE.toISOString().split('T')[0])
        .or(`catch_up_fee.is.null,catch_up_fee.eq.0`);

      if (error) {
        console.error('Error getting eligible members:', error);
        throw error;
      }

      console.log(`Found ${eligibleMembers.length} members eligible for catch-up fees`);

      for (const member of eligibleMembers) {
        try {
          const memberResult = await this.applyCatchUpFee(member.id);
          
          result.successCount += memberResult.successCount;
          result.failureCount += memberResult.failureCount;
          result.totalFeesApplied += memberResult.totalFeesApplied;
          result.processedMembers.push(...memberResult.processedMembers);
          result.errors.push(...memberResult.errors);

        } catch (error) {
          result.failureCount++;
          result.errors.push({
            memberId: member.id,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
          console.error(`Failed to process catch-up fee for member ${member.id}:`, error);
        }
      }

      return result;

    } catch (error) {
      console.error('Error in processCatchUpFeesForAllMembers:', error);
      throw error;
    }
  }

  /**
   * Calculate months missed from July 2018 to join date
   */
  private static calculateMonthsMissed(joinDate: Date): number {
    const referenceDate = new Date(this.CATCH_UP_REFERENCE_DATE);
    referenceDate.setDate(1); // Ensure we're comparing month starts
    
    const joinMonthStart = new Date(joinDate);
    joinMonthStart.setDate(1);
    
    let months = 0;
    let currentDate = new Date(referenceDate);
    
    // Count months from July 2018 to the month before join date
    while (currentDate < joinMonthStart) {
      months++;
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    return months;
  }

  /**
   * Get catch-up fee statistics
   */
  static async getCatchUpFeeStatistics(): Promise<{
    total_fees_collected: number;
    total_members_with_fees: number;
    average_fee_amount: number;
    max_fee_amount: number;
    min_fee_amount: number;
  }> {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('catch_up_fee')
        .gt('catch_up_fee', 0);

      if (error) {
        console.error('Error getting catch-up fee statistics:', error);
        throw error;
      }

      const fees = data.map(item => parseFloat(item.catch_up_fee) || 0).filter(fee => fee > 0);
      const total_fees_collected = fees.reduce((sum, fee) => sum + fee, 0);
      const total_members_with_fees = fees.length;
      const average_fee_amount = total_members_with_fees > 0 ? total_fees_collected / total_members_with_fees : 0;
      const max_fee_amount = fees.length > 0 ? Math.max(...fees) : 0;
      const min_fee_amount = fees.length > 0 ? Math.min(...fees) : 0;

      return {
        total_fees_collected,
        total_members_with_fees,
        average_fee_amount,
        max_fee_amount,
        min_fee_amount
      };

    } catch (error) {
      console.error('Error in getCatchUpFeeStatistics:', error);
      throw error;
    }
  }

  /**
   * Get members with catch-up fees applied
   */
  static async getMembersWithCatchUpFees(): Promise<Array<{
    member_id: number;
    member_number: string;
    join_date: Date;
    catch_up_fee: number;
    months_missed: number;
  }>> {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('id, member_number, join_date, catch_up_fee')
        .gt('catch_up_fee', 0)
        .order('catch_up_fee', { ascending: false });

      if (error) {
        console.error('Error getting members with catch-up fees:', error);
        throw error;
      }

      return data.map(member => ({
        member_id: member.id,
        member_number: member.member_number,
        join_date: new Date(member.join_date),
        catch_up_fee: parseFloat(member.catch_up_fee) || 0,
        months_missed: Math.round((parseFloat(member.catch_up_fee) || 0) / this.MONTHLY_CONTRIBUTION_AMOUNT)
      }));

    } catch (error) {
      console.error('Error in getMembersWithCatchUpFees:', error);
      throw error;
    }
  }

  /**
   * Check if database is available
   */
  static async isDatabaseAvailable(): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('count')
        .limit(1);

      return !error;
    } catch (error) {
      console.warn('Catch-up fee database not available:', error);
      return false;
    }
  }
}
