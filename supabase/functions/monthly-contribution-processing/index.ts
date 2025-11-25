// Monthly Contribution Processing Edge Function
// This function runs on the 1st of each month to create new contributions

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

    console.log('Starting monthly contribution processing...')

    // Get current month and year in South Africa timezone (UTC+2)
    const now = new Date()
    const today = new Date(now.getTime() + (2 * 60 * 60 * 1000)) // Add 2 hours for SAST
    const currentMonth = today.getMonth() + 1 // 1-12
    const currentYear = today.getFullYear()
    const processingMonth = `${currentYear}-${currentMonth.toString().padStart(2, '0')}`

    console.log(`Processing month: ${processingMonth}`)

    // Check if contributions were already created for this month
    const { data: existingContributions, error: checkError } = await supabase
      .from('audit_logs')
      .select('id')
      .eq('action_type', 'system')
      .eq('details->>action', 'monthly_contribution_processing')
      .eq('details->>processing_month', processingMonth)
      .single()

    if (existingContributions && !checkError) {
      console.log('Contributions already created for this month')
      return new Response(
        JSON.stringify({ message: 'Contributions already created for this month' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )
    }

    // Get all active members
    const { data: members, error: membersError } = await supabase
      .from('members')
      .select('id, monthly_contribution')
      .eq('active', true)

    if (membersError) {
      console.error('Error fetching active members:', membersError)
      throw new Error('Could not fetch active members')
    }

    console.log(`Processing ${members?.length || 0} active members`)

    let createdContributions = 0
    let skippedContributions = 0

    // Create contributions for each active member
    for (const member of members || []) {
      try {
        // Check if contribution already exists for this member and month
        const { data: existingContribution } = await supabase
          .from('contributions')
          .select('id')
          .eq('member_id', member.id)
          .eq('contribution_month', processingMonth)
          .single()

        if (existingContribution) {
          console.log(`Contribution already exists for member ${member.id} for ${processingMonth}`)
          skippedContributions++
          continue
        }

        // Calculate due date (1st of current month)
        const dueDate = new Date(currentYear, currentMonth - 1, 1)
        dueDate.setHours(2, 0, 0, 0) // Set to 2:00 AM SAST

        // Create new contribution
        const { error: createError } = await supabase
          .from('contributions')
          .insert({
            member_id: member.id,
            contribution_month: processingMonth,
            due_date: dueDate.toISOString(),
            amount_due: member.monthly_contribution || 200.00,
            amount_paid: 0,
            status: 'pending',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })

        if (createError) {
          console.error(`Error creating contribution for member ${member.id}:`, createError)
          continue
        }

        createdContributions++
        console.log(`Created contribution for member ${member.id} for ${processingMonth}`)

      } catch (memberError) {
        console.error(`Error processing member ${member.id}:`, memberError)
        // Continue with next member
      }
    }

    // Mark previous month contributions as overdue if unpaid
    const previousMonth = new Date(currentYear, currentMonth - 2, 1)
    const previousMonthFormatted = `${previousMonth.getFullYear()}-${(previousMonth.getMonth() + 1).toString().padStart(2, '0')}`

    const { count: overdueCount, error: overdueError } = await supabase
      .from('contributions')
      .update({ 
        status: 'overdue',
        updated_at: new Date().toISOString()
      })
      .eq('contribution_month', previousMonthFormatted)
      .eq('status', 'pending')

    if (overdueError) {
      console.error('Error marking overdue contributions:', overdueError)
    } else {
      console.log(`Marked ${overdueCount || 0} contributions from ${previousMonthFormatted} as overdue`)
    }

    // Create audit log entry
    await supabase
      .from('audit_logs')
      .insert({
        action_type: 'system',
        details: {
          action: 'monthly_contribution_processing',
          processing_month: processingMonth,
          created_contributions: createdContributions,
          skipped_contributions: skippedContributions,
          marked_overdue: overdueCount || 0,
          timestamp: new Date().toISOString()
        },
        created_at: new Date().toISOString()
      })

    console.log(`Monthly contribution processing completed. Created ${createdContributions} contributions, skipped ${skippedContributions}.`)

    return new Response(
      JSON.stringify({
        message: 'Monthly contribution processing completed successfully',
        created_contributions: createdContributions,
        skipped_contributions: skippedContributions,
        marked_overdue: overdueCount || 0
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error) {
    console.error('Error in monthly contribution processing:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
