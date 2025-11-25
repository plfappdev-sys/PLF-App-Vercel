// Monthly Late Fee Processing Edge Function
// This function runs on the 8th of each month to apply late fees

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

    console.log('Starting monthly late fee processing...')

    // Get current date in South Africa timezone (UTC+2)
    const now = new Date()
    const today = new Date(now.getTime() + (2 * 60 * 60 * 1000)) // Add 2 hours for SAST
    const processingDate = today.toISOString().split('T')[0]

    console.log(`Processing date: ${processingDate}`)

    // Check if late fees were already processed for this month
    const { data: existingProcessing, error: checkError } = await supabase
      .from('audit_logs')
      .select('id')
      .eq('action_type', 'system')
      .eq('details->>action', 'monthly_late_fee_processing')
      .eq('details->>processing_date', processingDate)
      .single()

    if (existingProcessing && !checkError) {
      console.log('Late fees already processed for this month')
      return new Response(
        JSON.stringify({ message: 'Late fees already processed for this month' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )
    }

    // Get current financial year penalty rate
    const { data: financialYear, error: fyError } = await supabase
      .from('financial_years')
      .select('penalty_interest_rate')
      .eq('is_current', true)
      .single()

    if (fyError || !financialYear) {
      console.error('Error fetching financial year rates:', fyError)
      throw new Error('Could not fetch current financial year penalty rate')
    }

    const penaltyRate = financialYear.penalty_interest_rate
    console.log(`Penalty rate: ${penaltyRate}`)

    // Get all overdue contributions (status = 'overdue')
    const { data: overdueContributions, error: contributionsError } = await supabase
      .from('contributions')
      .select(`
        id,
        member_id,
        amount_due,
        amount_paid,
        contribution_month,
        members!inner(active, monthly_contribution)
      `)
      .eq('status', 'overdue')
      .eq('members.active', true)

    if (contributionsError) {
      console.error('Error fetching overdue contributions:', contributionsError)
      throw new Error('Could not fetch overdue contributions')
    }

    console.log(`Processing ${overdueContributions?.length || 0} overdue contributions`)

    let processedContributions = 0
    let totalLateFees = 0
    let skippedContributions = 0

    // Process each overdue contribution
    for (const contribution of overdueContributions || []) {
      try {
        // Calculate outstanding amount
        const outstandingAmount = contribution.amount_due - contribution.amount_paid
        
        if (outstandingAmount <= 0) {
          console.log(`Skipping contribution ${contribution.id} - no outstanding amount`)
          skippedContributions++
          continue
        }

        // Calculate 7% late fee on outstanding amount
        const lateFeeAmount = outstandingAmount * penaltyRate
        const roundedLateFee = Math.round(lateFeeAmount * 100) / 100

        console.log(`Applying R${roundedLateFee.toFixed(2)} late fee to contribution ${contribution.id}`)

        // Update contribution with late fee
        const { error: updateError } = await supabase
          .from('contributions')
          .update({
            late_fee_amount: roundedLateFee,
            updated_at: new Date().toISOString()
          })
          .eq('id', contribution.id)

        if (updateError) {
          console.error(`Error updating contribution ${contribution.id}:`, updateError)
          continue
        }

        // Deduct late fee from member balance
        const { data: memberBalance, error: balanceError } = await supabase
          .from('member_balances')
          .select('savings_balance, net_balance')
          .eq('member_id', contribution.member_id)
          .single()

        if (balanceError) {
          console.error(`Error fetching member balance for ${contribution.member_id}:`, balanceError)
          continue
        }

        // Update member balance with late fee deduction
        const { error: balanceUpdateError } = await supabase
          .from('member_balances')
          .update({
            savings_balance: memberBalance.savings_balance - roundedLateFee,
            net_balance: memberBalance.net_balance - roundedLateFee,
            updated_at: new Date().toISOString()
          })
          .eq('member_id', contribution.member_id)

        if (balanceUpdateError) {
          console.error(`Error updating member balance for ${contribution.member_id}:`, balanceUpdateError)
          continue
        }

        // Create audit log for late fee application
        await supabase
          .from('audit_logs')
          .insert({
            action_type: 'system',
            details: {
              action: 'late_fee_application',
              member_id: contribution.member_id,
              contribution_id: contribution.id,
              contribution_month: contribution.contribution_month,
              late_fee_amount: roundedLateFee,
              outstanding_amount: outstandingAmount,
              penalty_rate: penaltyRate,
              timestamp: new Date().toISOString()
            },
            created_at: new Date().toISOString()
          })

        processedContributions++
        totalLateFees += roundedLateFee

        console.log(`Successfully applied R${roundedLateFee.toFixed(2)} late fee to contribution ${contribution.id}`)

      } catch (contributionError) {
        console.error(`Error processing contribution ${contribution.id}:`, contributionError)
        // Continue with next contribution
      }
    }

    // Create main audit log entry
    await supabase
      .from('audit_logs')
      .insert({
        action_type: 'system',
        details: {
          action: 'monthly_late_fee_processing',
          processing_date: processingDate,
          processed_contributions: processedContributions,
          skipped_contributions: skippedContributions,
          total_late_fees: totalLateFees,
          penalty_rate: penaltyRate,
          timestamp: new Date().toISOString()
        },
        created_at: new Date().toISOString()
      })

    console.log(`Monthly late fee processing completed. Processed ${processedContributions} contributions, collected R${totalLateFees.toFixed(2)} in late fees.`)

    return new Response(
      JSON.stringify({
        message: 'Monthly late fee processing completed successfully',
        processed_contributions: processedContributions,
        skipped_contributions: skippedContributions,
        total_late_fees: totalLateFees
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error) {
    console.error('Error in monthly late fee processing:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
