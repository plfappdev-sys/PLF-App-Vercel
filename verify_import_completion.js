const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyImportCompletion() {
  try {
    console.log('🔍 Verifying import completion...');
    
    // Check a few sample members to verify data was imported
    const sampleMembers = [
      { name: 'Christopher Naude', member_number: 'M004' },
      { name: 'Lesego Bokaba', member_number: 'M031' },
      { name: 'Collin Oliphant', member_number: 'M005' },
      { name: 'Daniel Moepeng', member_number: 'M006' }
    ];
    
    console.log('\n📋 Checking imported data for sample members:');
    
    for (const member of sampleMembers) {
      const { data, error } = await supabase
        .from('members')
        .select('member_number, name, expected_contribution, outstanding_contributions, total_penalties, balance_brought_forward, total_bank_charges, share_value, capped_penalties, estimated_annual_contribution')
        .eq('member_number', member.member_number)
        .single();
      
      if (error) {
        console.log(`❌ Error fetching ${member.name} (${member.member_number}):`, error.message);
        continue;
      }
      
      if (data) {
        console.log(`\n✅ ${member.name} (${member.member_number}):`);
        console.log(`   Expected Contribution: ${data.expected_contribution}`);
        console.log(`   Outstanding Contributions: ${data.outstanding_contributions}`);
        console.log(`   Total Penalties: ${data.total_penalties}`);
        console.log(`   Balance Brought Forward: ${data.balance_brought_forward}`);
        console.log(`   Total Bank Charges: ${data.total_bank_charges}`);
        console.log(`   Share Value: ${data.share_value}`);
        console.log(`   Capped Penalties: ${data.capped_penalties}`);
        console.log(`   Estimated Annual Contribution: ${data.estimated_annual_contribution}`);
      } else {
        console.log(`⚠️  ${member.name} (${member.member_number}) not found`);
      }
    }
    
    // Count total members with imported data
    const { data: allMembers, error: countError } = await supabase
      .from('members')
      .select('member_number, name, expected_contribution')
      .not('expected_contribution', 'is', null);
    
    if (countError) {
      console.log('\n❌ Error counting members:', countError.message);
    } else {
      console.log(`\n📊 Total members with imported data: ${allMembers.length}`);
      
      // Show first 5 members with data
      console.log('\n📋 First 5 members with imported data:');
      allMembers.slice(0, 5).forEach(member => {
        console.log(`  ${member.member_number}: ${member.name} - Expected: ${member.expected_contribution}`);
      });
    }
    
    // Check for any members still missing data
    const { data: missingData, error: missingError } = await supabase
      .from('members')
      .select('member_number, name')
      .or('expected_contribution.is.null,outstanding_contributions.is.null,total_penalties.is.null')
      .limit(10);
    
    if (missingError) {
      console.log('\n❌ Error checking for missing data:', missingError.message);
    } else if (missingData.length > 0) {
      console.log(`\n⚠️  Members still missing some data (first ${missingData.length}):`);
      missingData.forEach(member => {
        console.log(`  ${member.member_number}: ${member.name}`);
      });
    } else {
      console.log('\n✅ All members have the imported data fields populated!');
    }
    
    console.log('\n🎉 Verification complete!');
    
  } catch (err) {
    console.log('❌ Exception:', err.message);
  }
}

verifyImportCompletion();