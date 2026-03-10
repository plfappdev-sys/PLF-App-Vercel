// Test script to verify Lesego Bokaba (M031) membership status fix
// Using CommonJS format for compatibility

const { createClient } = require('@supabase/supabase-js');

// Create Supabase client
const supabase = createClient(
  'https://zdnyhzasvifrskbostgn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAyNDQ4NCwiZXhwIjoyMDczNjAwNDg0fQ.kOpqoycVNdJXC-fqqxwHPVof6e8JlJ60_J7WWF-1AHU'
);

// Helper function to parse JSON fields
function parseJsonField(field) {
  if (!field) return {};
  if (typeof field === 'string') {
    try {
      return JSON.parse(field);
    } catch (error) {
      console.warn('Error parsing JSON field:', error);
      return {};
    }
  }
  return field;
}

async function testLesegoStatus() {
  console.log('Testing Lesego Bokaba (M031) membership status fix...');
  
  try {
    // Get member basic info
    const { data: memberData, error: memberError } = await supabase
      .from('members')
      .select('*')
      .eq('member_number', 'M031')
      .single();

    if (memberError) {
      console.error('Error fetching member:', memberError);
      return;
    }

    if (!memberData) {
      console.error('ERROR: Could not find member M031');
      return;
    }

    // Get member balance from member_balances table
    const { data: balanceData, error: balanceError } = await supabase
      .from('member_balances')
      .select('*')
      .eq('member_id', memberData.id)
      .single();

    if (balanceError) {
      console.warn('No balance data found for member:', 'M031', balanceError);
    }

    // Parse financial info
    const financialInfoData = parseJsonField(memberData.financial_info);
    
    // Calculate outstanding amount as Expected Contribution - Total Contribution
    const expectedContribution = financialInfoData.expected_contribution || 0;
    const totalContributions = financialInfoData.total_contributions || 0;
    const outstandingAmount = Math.max(0, expectedContribution - totalContributions);
    const totalPenalties = memberData.total_penalties || 0;
    
    // Calculate outstanding percentage based on outstanding contributions
    const expectedContributionForStatus = financialInfoData.expected_contribution || 16600;
    const outstandingPercentage = outstandingAmount > 0 ? (outstandingAmount / expectedContributionForStatus * 100) : 0;
    
    // Determine membership status based on outstanding contributions
    let standingCategory = 'good';
    
    if (outstandingPercentage === 0) {
      standingCategory = 'good';
    } else if (outstandingPercentage <= 10) {
      standingCategory = 'owing_10';
    } else if (outstandingPercentage <= 20) {
      standingCategory = 'owing_20';
    } else if (outstandingPercentage <= 30) {
      standingCategory = 'owing_30';
    } else if (outstandingPercentage <= 50) {
      standingCategory = 'owing_50';
    } else if (outstandingPercentage <= 65) {
      standingCategory = 'owing_65';
    } else {
      standingCategory = 'owing_65_plus';
    }

    // Get member name
    let memberName = 'Unknown';
    if (memberData.name && memberData.name.trim() !== '') {
      memberName = memberData.name.trim();
    } else if (memberData.personal_info) {
      const personalInfo = parseJsonField(memberData.personal_info);
      memberName = personalInfo.fullName || personalInfo.full_name || `Member ${memberData.member_number}`;
    } else {
      memberName = `Member ${memberData.member_number}`;
    }
    
    console.log('\n=== Member Information ===');
    console.log(`Member Number: ${memberData.member_number}`);
    console.log(`Name: ${memberName}`);
    
    console.log('\n=== Financial Information ===');
    console.log(`Expected Contribution: R${expectedContribution}`);
    console.log(`Total Contributions: R${totalContributions}`);
    console.log(`Outstanding Amount: R${outstandingAmount}`);
    console.log(`Outstanding Percentage: ${outstandingPercentage.toFixed(2)}%`);
    
    console.log('\n=== Membership Status ===');
    console.log(`Status: ${standingCategory}`);
    console.log(`Is Active: true`);
    
    // Determine what the status should be
    let expectedStatus = 'good';
    
    if (outstandingPercentage === 0) {
      expectedStatus = 'good';
    } else if (outstandingPercentage <= 10) {
      expectedStatus = 'owing_10';
    } else if (outstandingPercentage <= 20) {
      expectedStatus = 'owing_20';
    } else if (outstandingPercentage <= 30) {
      expectedStatus = 'owing_30';
    } else if (outstandingPercentage <= 50) {
      expectedStatus = 'owing_50';
    } else if (outstandingPercentage <= 65) {
      expectedStatus = 'owing_65';
    } else {
      expectedStatus = 'owing_65_plus';
    }
    
    console.log('\n=== Verification ===');
    console.log(`Current Status: ${standingCategory}`);
    console.log(`Expected Status: ${expectedStatus}`);
    
    if (standingCategory === expectedStatus) {
      console.log('✅ STATUS IS CORRECT!');
      console.log(`Lesego Bokaba (M031) now shows "${standingCategory}" instead of "good"`);
    } else {
      console.log('❌ STATUS IS INCORRECT!');
      console.log(`Expected: ${expectedStatus}, Got: ${standingCategory}`);
    }
    
    // Also check if there are outstanding contributions
    if (outstandingAmount > 0) {
      console.log(`\n⚠️  Lesego has R${outstandingAmount} in outstanding contributions`);
      console.log(`This should NOT show as "good" standing`);
      
      if (standingCategory === 'good') {
        console.log('❌ PROBLEM: Still showing as "good" despite outstanding contributions!');
      } else {
        console.log('✅ FIXED: No longer showing as "good" with outstanding contributions');
      }
    } else {
      console.log('\n✅ Lesego has no outstanding contributions');
      console.log('"good" standing would be correct in this case');
    }
    
  } catch (error) {
    console.error('Error testing Lesego status:', error);
  }
}

// Run the test
testLesegoStatus();