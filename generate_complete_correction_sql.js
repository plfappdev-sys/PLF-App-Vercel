const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Load corrected balances from JSON
const correctedBalances = JSON.parse(fs.readFileSync('corrected_member_balances.json', 'utf8'));

async function generateCompleteCorrectionSQL() {
  try {
    console.log('🔍 Mapping member names to IDs...');
    
    // Get all members from the database
    const { data: members, error } = await supabase
      .from('members')
      .select('id, name, member_number');
    
    if (error) {
      console.error('❌ Error fetching members:', error.message);
      return;
    }
    
    console.log(`📊 Found ${members.length} members in database`);
    
    // Create mapping of member names to IDs
    const memberMap = {};
    members.forEach(member => {
      if (member.name) {
        // Normalize names for matching
        const normalizedName = member.name.toLowerCase().trim();
        memberMap[normalizedName] = {
          id: member.id,
          member_number: member.member_number
        };
      }
    });
    
    // Generate SQL updates
    let sqlUpdates = [];
    let matchedCount = 0;
    let unmatchedCount = 0;
    
    console.log('\n🔧 Generating SQL updates...');
    
    correctedBalances.forEach(correctedBalance => {
      const memberName = correctedBalance.member_name.toLowerCase().trim();
      
      if (memberMap[memberName]) {
        const memberInfo = memberMap[memberName];
        const correctedBalanceValue = correctedBalance.correct_balance;
        
        // Convert actual_contributions to number if it's a string
        const actualContributions = typeof correctedBalance.actual_contributions === 'string' 
          ? parseFloat(correctedBalance.actual_contributions) 
          : correctedBalance.actual_contributions;
        
        const sql = `-- ${correctedBalance.member_name} (${memberInfo.member_number || 'No number'})
UPDATE member_balances 
SET 
    total_contributions = ${actualContributions.toFixed(2)},
    total_interest_earned = ${correctedBalance.total_interest_earned.toFixed(2)},
    savings_balance = ${correctedBalanceValue.toFixed(2)},
    net_balance = ${correctedBalanceValue.toFixed(2)},
    available_funds = ${correctedBalanceValue.toFixed(2)},
    updated_at = NOW()
WHERE member_id = ${memberInfo.id};`;
        
        sqlUpdates.push(sql);
        matchedCount++;
      } else {
        console.log(`⚠️  No match found for: ${correctedBalance.member_name}`);
        unmatchedCount++;
      }
    });
    
    console.log(`\n📊 Matching Results:`);
    console.log(`✅ Matched: ${matchedCount} members`);
    console.log(`❌ Unmatched: ${unmatchedCount} members`);
    
    // Create complete SQL file
    const sqlContent = `-- PLF Complete Member Balance Correction SQL
-- Generated automatically on ${new Date().toISOString()}
-- This script updates ALL member balances with corrected calculations

-- First, let's check the current state
SELECT COUNT(*) as existing_records FROM member_balances;

-- Update all member balances with corrected calculations
${sqlUpdates.join('\n\n')}

-- Verification queries
SELECT 
    m.name,
    mb.member_number,
    mb.total_contributions,
    mb.total_interest_earned,
    mb.savings_balance,
    mb.net_balance
FROM member_balances mb
JOIN members m ON mb.member_id = m.id
WHERE mb.updated_at > NOW() - INTERVAL '1 hour'
ORDER BY m.name;

-- Show members with negative balances (outstanding payments)
SELECT 
    m.name,
    mb.savings_balance,
    mb.net_balance
FROM member_balances mb
JOIN members m ON mb.member_id = m.id
WHERE mb.net_balance < 0
ORDER BY mb.net_balance ASC;

-- Show members with positive balances
SELECT 
    m.name,
    mb.savings_balance,
    mb.net_balance
FROM member_balances mb
JOIN members m ON mb.member_id = m.id
WHERE mb.net_balance >= 0
ORDER BY mb.net_balance DESC;

-- Summary statistics
SELECT 
    COUNT(*) as total_members,
    COUNT(CASE WHEN mb.net_balance < 0 THEN 1 END) as members_with_negative_balance,
    COUNT(CASE WHEN mb.net_balance >= 0 THEN 1 END) as members_with_positive_balance,
    SUM(CASE WHEN mb.savings_balance > 0 THEN mb.savings_balance ELSE 0 END) as total_fund_value,
    AVG(mb.savings_balance) as average_balance
FROM member_balances mb;

-- Check Babotshedi Malibe specifically
SELECT 
    m.name,
    mb.total_contributions,
    mb.total_interest_earned,
    mb.savings_balance,
    mb.net_balance
FROM member_balances mb
JOIN members m ON mb.member_id = m.id
WHERE m.name LIKE '%Babotshedi Malibe%';`;
    
    // Write SQL file
    fs.writeFileSync('complete_member_correction_final.sql', sqlContent);
    console.log(`\n✅ Complete SQL file generated: complete_member_correction_final.sql`);
    console.log(`📊 Contains ${sqlUpdates.length} UPDATE statements`);
    
    // Show sample of what will be updated
    console.log('\n📋 Sample updates:');
    sqlUpdates.slice(0, 3).forEach(update => {
      console.log(update.split('\n')[0]); // Show first line of each update
    });
    if (sqlUpdates.length > 3) {
      console.log(`... and ${sqlUpdates.length - 3} more updates`);
    }
    
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
  }
}

generateCompleteCorrectionSQL();
