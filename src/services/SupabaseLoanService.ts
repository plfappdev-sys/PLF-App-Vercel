import { supabase } from '../config/supabase';
import { Loan, Guarantor, EmploymentInfo, BankingDetails, NextOfKin } from '../types/index';

interface LoanApplication {
  memberNumber: string;
  requestedAmount: number;
  loanTerm: number;
  purpose: string;
  guarantors: { memberNumber: string; guaranteeAmount: number }[];
  employmentInfo: EmploymentInfo;
  bankingDetails: BankingDetails;
  nextOfKin: NextOfKin;
}

export class SupabaseLoanService {
  
  // Apply for a new loan
  static async applyForLoan(application: LoanApplication): Promise<{ success: boolean; loanId?: string; error?: string }> {
    try {
      // First, get the member ID from the member number
      const { data: memberData, error: memberError } = await supabase
        .from('members')
        .select('id')
        .eq('member_number', application.memberNumber)
        .single();

      if (memberError) {
        console.error('Error finding member:', memberError);
        return { success: false, error: `Member ${application.memberNumber} not found` };
      }

      // Validate loan amount
      if (application.requestedAmount <= 0) {
        return { success: false, error: 'Loan amount must be positive' };
      }

      // Validate guarantors
      if (application.guarantors.length === 0) {
        return { success: false, error: 'At least one guarantor is required' };
      }

      // Create the loan application
      const { data: loanData, error: loanError } = await supabase
        .from('loans')
        .insert({
          member_id: memberData.id,
          requested_amount: application.requestedAmount,
          loan_term: application.loanTerm,
          purpose: application.purpose,
          status: 'pending',
          employment_info: application.employmentInfo,
          banking_details: application.bankingDetails,
          next_of_kin: application.nextOfKin,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select('id')
        .single();

      if (loanError) {
        console.error('Error creating loan application:', loanError);
        return { success: false, error: 'Failed to create loan application' };
      }

      // Create guarantor records
      const guarantorPromises = application.guarantors.map(async (guarantor) => {
        // Get guarantor member ID
        const { data: guarantorMemberData } = await supabase
          .from('members')
          .select('id')
          .eq('member_number', guarantor.memberNumber)
          .single();

        if (guarantorMemberData) {
          await supabase
            .from('loan_guarantors')
            .insert({
              loan_id: loanData.id,
              guarantor_member_id: guarantorMemberData.id,
              guarantee_amount: guarantor.guaranteeAmount,
              status: 'pending',
              created_at: new Date().toISOString()
            });
        }
      });

      await Promise.all(guarantorPromises);

      // Also create a transaction record for the loan application
      await supabase
        .from('transactions')
        .insert({
          member_id: memberData.id,
          transaction_type: 'loan_application',
          amount: application.requestedAmount,
          description: `Loan application: ${application.purpose}`,
          status: 'pending',
          related_loan_id: loanData.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      return { success: true, loanId: loanData.id.toString() };
    } catch (error) {
      console.error('Error in applyForLoan:', error);
      return { success: false, error: 'Failed to submit loan application' };
    }
  }

  // Get loans for a specific member
  static async getLoansByMember(memberNumber: string): Promise<Loan[]> {
    try {
      const { data, error } = await supabase
        .from('loans_with_member_info')
        .select('*')
        .eq('member_number', memberNumber)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error getting member loans:', error);
        return [];
      }

      return data.map(this.mapDbLoanToInterface);
    } catch (error) {
      console.error('Error in getLoansByMember:', error);
      return [];
    }
  }

  // Get pending loans for approval
  static async getPendingLoans(): Promise<Loan[]> {
    try {
      const { data, error } = await supabase
        .from('loans_with_member_info')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error getting pending loans:', error);
        return [];
      }

      return data.map(this.mapDbLoanToInterface);
    } catch (error) {
      console.error('Error in getPendingLoans:', error);
      return [];
    }
  }

  // Get loan by ID
  static async getLoanById(loanId: string): Promise<Loan | null> {
    try {
      const { data, error } = await supabase
        .from('loans_with_member_info')
        .select('*')
        .eq('id', loanId)
        .single();

      if (error) {
        console.error('Error getting loan:', error);
        return null;
      }

      return this.mapDbLoanToInterface(data);
    } catch (error) {
      console.error('Error in getLoanById:', error);
      return null;
    }
  }

  // Approve a loan
  static async approveLoan(loanId: string, approvedBy: string, notes?: string, conditions?: string[]): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('loans')
        .update({
          status: 'approved',
          approved_by: approvedBy,
          approval_date: new Date().toISOString(),
          approval_notes: notes,
          conditions: conditions || [],
          updated_at: new Date().toISOString()
        })
        .eq('id', parseInt(loanId));

      if (error) {
        console.error('Error approving loan:', error);
        return { success: false, error: 'Failed to approve loan' };
      }

      return { success: true };
    } catch (error) {
      console.error('Error in approveLoan:', error);
      return { success: false, error: 'Failed to approve loan' };
    }
  }

  // Reject a loan
  static async rejectLoan(loanId: string, rejectedBy: string, reason: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('loans')
        .update({
          status: 'rejected',
          rejected_by: rejectedBy,
          rejection_reason: reason,
          updated_at: new Date().toISOString()
        })
        .eq('id', parseInt(loanId));

      if (error) {
        console.error('Error rejecting loan:', error);
        return { success: false, error: 'Failed to reject loan' };
      }

      return { success: true };
    } catch (error) {
      console.error('Error in rejectLoan:', error);
      return { success: false, error: 'Failed to reject loan' };
    }
  }

  // Get loan statistics
  static async getLoanStatistics(): Promise<{
    totalLoans: number;
    pendingApproval: number;
    totalDisbursed: number;
    totalOutstanding: number;
    defaultRate: number;
  }> {
    try {
      const { data, error } = await supabase
        .from('loans_with_member_info')
        .select('*');

      if (error) {
        console.error('Error getting loan statistics:', error);
        throw error;
      }

      const totalLoans = data.length;
      const pendingApproval = data.filter(loan => loan.status === 'pending').length;
      const totalDisbursed = data.filter(loan => loan.status === 'disbursed').length;
      const totalOutstanding = data.reduce((sum, loan) => sum + (loan.outstanding_balance || 0), 0);
      const defaultRate = data.filter(loan => loan.is_in_default).length / totalLoans * 100;

      return {
        totalLoans,
        pendingApproval,
        totalDisbursed,
        totalOutstanding,
        defaultRate: isNaN(defaultRate) ? 0 : defaultRate
      };
    } catch (error) {
      console.error('Error in getLoanStatistics:', error);
      throw error;
    }
  }

  // Helper method to map database loan to interface
  private static mapDbLoanToInterface(dbLoan: any): Loan {
    return {
      loanId: dbLoan.id.toString(),
      memberNumber: dbLoan.member_number || 'Unknown',
      applicationDetails: {
        requestedAmount: dbLoan.requested_amount || 0,
        loanTerm: dbLoan.loan_term || 0,
        purpose: dbLoan.purpose || '',
        applicationDate: new Date(dbLoan.created_at),
        supportingDocuments: [],
        guarantors: dbLoan.guarantors || [],
        employmentInfo: dbLoan.employment_info || {},
        bankingDetails: dbLoan.banking_details || {},
        nextOfKin: dbLoan.next_of_kin || {}
      },
      approvalProcess: {
        status: dbLoan.status || 'pending',
        reviewedBy: dbLoan.approved_by || undefined,
        reviewDate: dbLoan.approval_date ? new Date(dbLoan.approval_date) : undefined,
        approvalNotes: dbLoan.approval_notes || undefined,
        conditions: dbLoan.conditions || []
      },
      disbursementDetails: dbLoan.disbursement_date ? {
        approvedAmount: dbLoan.approved_amount || dbLoan.requested_amount,
        disbursementDate: new Date(dbLoan.disbursement_date),
        disbursementMethod: dbLoan.disbursement_method || 'Bank transfer',
        disbursedBy: dbLoan.disbursed_by || undefined
      } : undefined,
      repaymentSchedule: dbLoan.repayment_schedule ? {
        totalAmount: dbLoan.total_amount || 0,
        interestRate: dbLoan.interest_rate || 0,
        repaymentPeriod: dbLoan.repayment_period || 0,
        monthlyPayment: dbLoan.monthly_payment || 0,
        schedule: dbLoan.repayment_schedule_schedule || []
      } : undefined,
      currentStatus: {
        outstandingBalance: dbLoan.outstanding_balance || 0,
        totalPaid: dbLoan.total_paid || 0,
        lastPaymentDate: dbLoan.last_payment_date ? new Date(dbLoan.last_payment_date) : undefined,
        nextDueDate: dbLoan.next_due_date ? new Date(dbLoan.next_due_date) : undefined,
        isInDefault: dbLoan.is_in_default || false
      }
    };
  }
}

export default SupabaseLoanService;
