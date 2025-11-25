// Daily Interest Calculation Edge Function
// This function runs daily to calculate interest for all members

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client with service role key for admin access
    const supabaseUrl = Deno.env.get('PROJECT_URL')!
    const supabaseServiceKey = Deno.env.get('SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    console.log('Starting daily interest calculation...')

    // Get current date in South Africa timezone (UTC+2)
    const now = new Date()
    const today = new Date(now.getTime() + (2 * 60 * 60 * 1000)) // Add 2 hours for SAST
    const processingDate = today.toISOString().split('T')[0]

    console.log(`Processing date: ${processingDate}`)

    // Check if interest was already calculated for today
    const { data: existingCalculation, error: checkError } = await supabase
      .from('audit_logs')
      .select('id')
      .eq('action_type', 'system')
      .eq('details->>action', 'daily_interest_calculation')
      .eq('details->>processing_date', processingDate)
      .single()

    if (existingCalculation && !checkError) {
      console.log('Interest already calculated for today')
      return new Response(
        JSON.stringify({ message: 'Interest already calculated for today' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )
    }

    // Get current financial year interest rates
    const { data: financialYear, error: fyError } = await supabase
      .from('financial_years')
      .select('savings_interest_rate, loan_interest_rate, penalty_interest_rate')
      .eq('is_current', true)
      .single()

    if (fyError || !financialYear) {
      console.error('Error fetching financial year rates:', fyError)
      throw new Error('Could not fetch current financial year interest rates')
    }

    const savingsRate = financialYear.savings_interest_rate
    const loanRate = financialYear.loan_interest_rate
    const penaltyRate = financialYear.penalty_interest_rate

    console.log(`Rates - Savings: ${savingsRate}, Loans: ${loanRate}, Penalty: ${penaltyRate}`)

    // Get all active members with balances
    const { data: members, error: membersError } = await supabase
      .from('member_balances')
      .select(`
        id,
        member_id,
        savings_balance,
        loan_balance,
        net_balance,
        members!inner(active)
      `)
      .eq('members.active', true)

    if (membersError) {
      console.error('Error fetching members:', membersError)
      throw new Error('Could not fetch member balances')
    }

    console.log(`Processing ${members?.length || 0} active members`)

    let totalSavingsInterest = 0
    let totalLoanInterest = 0
    let totalPenaltyInterest = 0
    let processedMembers = 0

    // Process each member's interest
    for (const member of members || []) {
      try {
        let savingsInterest = 0
        let loanInterest = 0
        let penaltyInterest = 0

        // Calculate savings interest (daily compounding)
        if (member.savings_balance > 0) {
          savingsInterest = member.savings_balance * (savingsRate / 365)
          savingsInterest = Math.round(savingsInterest * 100) / 100 // Round to 2 decimal places
          totalSavingsInterest += savingsInterest
        }

        // Calculate loan interest (daily compounding)
        if (member.loan_balance > 0) {
          loanInterest = member.loan_balance * (loanRate / 365)
          loanInterest = Math.round(loanInterest * 100) / 100
          totalLoanInterest += loanInterest

          // Check for overdue loans and apply penalty interest
          const { data: overdueLoan } = await supabase
            .from('loans')
            .select('id, created_at, penalty_interest_applied')
            .eq('member_id', member.member_id)
            .eq('status', 'active')
            .lt('created_at', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()) // Older than 90 days
            .is('penalty_interest_applied', false)
            .single()

          if (overdueLoan) {
            penaltyInterest = member.loan_balance * (penaltyRate / 365)
            penaltyInterest = Math.round(penaltyInterest * 100) / 100
            totalPenaltyInterest += penaltyInterest

            // Mark loan as having penalty applied
            await supabase
              .from('loans')
              .update({ 
                penalty_interest_applied: true,
                penalty_start_date: new Date().toISOString()
              })
              .eq('id', overdueLoan.id)
          }
        }

        // Update member balance with accrued interest
        const totalInterest = savingsInterest + loanInterest + penaltyInterest
        
        if (totalInterest > 0) {
          await supabase
            .from('member_balances')
            .update({
              savings_balance: member.savings_balance + savingsInterest,
              loan_balance: member.loan_balance + loanInterest + penaltyInterest,
              net_balance: member.net_balance + (savingsInterest - loanInterest - penaltyInterest),
              updated_at: new Date().toISOString()
            })
            .eq('id', member.id)

          // Create interest accrual record
          await supabase
            .from('interest_accruals')
            .insert({
              member_id: member.member_id,
              accrual_date: processingDate,
              savings_interest: savingsInterest,
              loan_interest: loanInterest,
              penalty_interest: penaltyInterest,
              total_interest: totalInterest,
              savings_rate: savingsRate,
              loan_rate: loanRate,
              penalty_rate: penaltyRate
            })

          processedMembers++
        }
      } catch (memberError) {
        console.error(`Error processing member ${member.member_id}:`, memberError)
        // Continue with next member
      }
    }

    // Create audit log entry
    await supabase
      .from('audit_logs')
      .insert({
        action_type: 'system',
        details: {
          action: 'daily_interest_calculation',
          processing_date: processingDate,
          processed_members: processedMembers,
          total_savings_interest: totalSavingsInterest,
          total_loan_interest: totalLoanInterest,
          total_penalty_interest: totalPenaltyInterest,
          timestamp: new Date().toISOString()
        },
        created_at: new Date().toISOString()
      })

    console.log(`Daily interest calculation completed. Processed ${processedMembers} members.`)
    console.log(`Total Savings Interest: R${totalSavingsInterest.toFixed(2)}`)
    console.log(`Total Loan Interest: R${totalLoanInterest.toFixed(2)}`)
    console.log(`Total Penalty Interest: R${totalPenaltyInterest.toFixed(2)}`)

    return new Response(
      JSON.stringify({
        message: 'Daily interest calculation completed successfully',
        processed_members: processedMembers,
        total_savings_interest: totalSavingsInterest,
        total_loan_interest: totalLoanInterest,
        total_penalty_interest: totalPenaltyInterest
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error) {
    console.error('Error in daily interest calculation:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
