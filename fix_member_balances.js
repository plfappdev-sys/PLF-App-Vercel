const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixMemberBalances() {
  console.log('Fixing member balances for Lesego Bokaba...\n');
  
  // First, let's find Lesego Bokaba in the members table
  const { data: members, error } = await supabase
    .from('members')
    .select('*')
    .ilike('name', '%Lesego%Bokaba%');

  if (error) {
    console.error('Error fetching member:', error);
    return;
  }

  if (members && members.length > 0) {
    const member = members[0];
    console.log('Found Lesego Bokaba:');
    console.log('Member ID:', member.id);
    console.log('Member Number:', member.member_number);
    console.log('Name:', member.name);
    console.log('Monthly Contribution:', member.monthly_contribution);
    console.log('Catch Up Fee:', member.catch_up_fee);
    
    // Calculate estimated balance based on join date and monthly contributions
    const joinDate = new Date(member.join_date);
    const now = new Date();
    const monthsSinceJoin = Math.floor((now - joinDate) / (1000 * 60 * 60 * 24 * 30));
    
    // Estimated total contributions (assuming regular payments)
    const estimatedTotalContributions = monthsSinceJoin * member.monthly_contribution;
    
    console.log(`\nCalculated financial data:`);
    console.log('Join Date:', member.join_date);
    console.log('Months since join:', monthsSinceJoin);
    console.log('Estimated Total Contributions:', estimatedTotalContributions);
    
    // Create financial_info object
    const financialInfo = {
      total_contributions: estimatedTotalContributions,
      current_balance: estimatedTotalContributions,
      outstanding_amount: member.catch_up_fee || 0,
      percentage_outstanding: member.catch_up_fee > 0 ? (member.catch_up_fee / 16600 * 100) : 0,
      balance_brought_forward: 0,
      planned_contributions: member.monthly_contribution,
      actual_contributions: estimatedTotalContributions,
      current_interest_earned: 0,
      total_interest_earned: 0,
      current_interest_charged: 0,
      total_interest_charged: 0,
      last_interest_calculation: new Date().toISOString(),
      interest_rate: 5.5
    };
    
    // Update the member with financial info
    const { data: updateData, error: updateError } = await supabase
      .from('members')
      .update({ 
        financial_info: financialInfo,
        closing_balance: estimatedTotalContributions,
        last_updated: new Date().toISOString()
      })
      .eq('id', member.id);
    
    if (updateError) {
      console.error('Error updating member:', updateError);
    } else {
      console.log('\n✅ Successfully updated Lesego Bokaba with financial data!');
      console.log('New Closing Balance:', estimatedTotalContributions);
      console.log('Financial Info:', JSON.stringify(financialInfo, null, 2));
    }
    
    // Also create a member_balances record
    const { data: balanceData, error: balanceError } = await supabase
      .from('member_balances')
      .upsert({
        member_id: member.id,
        savings_balance: estimatedTotalContributions,
        total_contributions: estimatedTotalContributions,
        net_balance: estimatedTotalContributions - (member.catch_up_fee || 0),
        total_interest_earned: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    
    if (balanceError) {
      console.error('Error creating member balance:', balanceError);
    } else {
      console.log('✅ Successfully created member_balances record!');
    }
    
  } else {
    console.log('Lesego Bokaba not found in members table');
  }
}

fixMemberBalances().catch(console.error);
