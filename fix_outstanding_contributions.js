// Fix Outstanding Contributions based on Excel data
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAyNDQ4NCwiZXhwIjoyMDczNjAwNDg0fQ.kOpqoycVNdJXC-fqqxwHPVof6e8JlJ60_J7WWF-1AHU';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixOutstandingContributions() {
  try {
    console.log('Fixing outstanding contributions based on Excel data...');
    
    // First, let's check M031 specifically
    const { data: m031, error: m031Error } = await supabase
      .from('members')
      .select('member_number, name, expected_contribution, outstanding_contributions, closing_balance, total_penalties')
      .eq('member_number', 'M031')
      .single();
    
    if (m031Error) {
      console.error('Error fetching M031:', m031Error.message);
      return;
    }
    
    console.log('\nM031 Current Data:');
    console.log('Expected Contribution:', m031.expected_contribution);
    console.log('Outstanding Contributions:', m031.outstanding_contributions);
    console.log('Total Penalties:', m031.total_penalties);
    console.log('Closing Balance:', m031.closing_balance);
    
    // According to Excel: Total Contribution = 5300
    // So Outstanding Contributions = Expected - Total Contribution = 17400 - 5300 = 12100
    const totalContribution = 5300;
    const correctOutstanding = m031.expected_contribution - totalContribution;
    
    console.log('\nBased on Excel (Total Contribution = 5300):');
    console.log('Correct Outstanding Contributions:', correctOutstanding);
    console.log('Difference from current:', correctOutstanding - m031.outstanding_contributions);
    
    // Update M031
    const { error: updateError } = await supabase
      .from('members')
      .update({ 
        outstanding_contributions: correctOutstanding,
        outstanding_amount: correctOutstanding // Also update outstanding_amount
      })
      .eq('member_number', 'M031');
    
    if (updateError) {
      console.error('Error updating M031:', updateError.message);
    } else {
      console.log('Successfully updated M031 outstanding contributions to', correctOutstanding);
    }
    
    // Now let's check a few other members to see if they need similar fixes
    console.log('\nChecking other members...');
    
    const { data: sampleMembers, error: sampleError } = await supabase
      .from('members')
      .select('member_number, name, expected_contribution, outstanding_contributions, total_penalties, closing_balance')
      .order('member_number')
      .limit(15);
    
    if (sampleError) {
      console.error('Error fetching sample members:', sampleError.message);
    } else {
      console.log('\nSample members (first 15):');
      console.log('Member# | Name | Expected | Outstanding | Penalties | Closing Balance | Total Contribution (calc)');
      console.log('---------------------------------------------------------------------------------------------------');
      
      sampleMembers.forEach(member => {
        const totalContributionCalc = member.expected_contribution - member.outstanding_contributions;
        console.log(
          `${member.member_number.padEnd(6)} | ${member.name.substring(0, 15).padEnd(15)} | ${member.expected_contribution.toString().padEnd(8)} | ${member.outstanding_contributions.toString().padEnd(11)} | ${member.total_penalties?.toString().padEnd(9) || '0'.padEnd(9)} | ${member.closing_balance?.toString().padEnd(14) || '0'.padEnd(14)} | ${totalContributionCalc}`
        );
      });
    }
    
    // Check for members with negative outstanding contributions (like M059)
    console.log('\nChecking for members with negative outstanding contributions...');
    
    const { data: negativeMembers, error: negativeError } = await supabase
      .from('members')
      .select('member_number, name, expected_contribution, outstanding_contributions')
      .lt('outstanding_contributions', 0);
    
    if (negativeError) {
      console.error('Error fetching negative members:', negativeError.message);
    } else if (negativeMembers.length > 0) {
      console.log(`Found ${negativeMembers.length} members with negative outstanding contributions:`);
      negativeMembers.forEach(m => {
        console.log(`${m.member_number} (${m.name}): Expected=${m.expected_contribution}, Outstanding=${m.outstanding_contributions}`);
      });
    } else {
      console.log('No members with negative outstanding contributions found.');
    }
    
    // Check for members with 0 expected contribution (should all be 17400 now)
    console.log('\nChecking for members with incorrect expected contribution...');
    
    const { data: zeroExpected, error: zeroError } = await supabase
      .from('members')
      .select('member_number, name, expected_contribution')
      .neq('expected_contribution', 17400);
    
    if (zeroError) {
      console.error('Error checking expected contributions:', zeroError.message);
    } else if (zeroExpected.length > 0) {
      console.log(`Found ${zeroExpected.length} members with incorrect expected contribution:`);
      zeroExpected.forEach(m => {
        console.log(`${m.member_number} (${m.name}): Expected=${m.expected_contribution} (should be 17400)`);
      });
    } else {
      console.log('All members have correct expected contribution (17400).');
    }
    
  } catch (error) {
    console.error('Error in fixOutstandingContributions:', error.message);
  }
}

// Run the fix
fixOutstandingContributions();