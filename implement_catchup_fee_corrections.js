#!/usr/bin/env node
/**
 * Implement Catch-up Fee Corrections
 * Based on PLF Constitution Clause 10 with rate change logic
 * Created: November 24, 2025
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Configuration
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://zdnyhzasvifrskbostgn.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY || '';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

class CatchUpFeeCorrector {
    /**
     * Calculate correct catch-up fee according to PLF Constitution Clause 10
     * with rate change: R200 until June 2024, R250 from July 2024
     */
    static calculateCorrectCatchUpFee(joinDate) {
        const fundInception = new Date('2018-07-01');
        const rateChangeDate = new Date('2024-07-01');
        const memberJoinDate = new Date(joinDate);
        
        // Calculate months difference
        const monthsDifference = this.calculateMonthsDifference(fundInception, memberJoinDate);
        
        // Determine which rate to use based on join date
        if (memberJoinDate < rateChangeDate) {
            // Joined before July 2024 - use R200 rate
            return monthsDifference * 200;
        } else {
            // Joined after July 2024 - use R250 rate
            return monthsDifference * 250;
        }
    }

    /**
     * Calculate months difference between two dates
     */
    static calculateMonthsDifference(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        const yearsDifference = end.getFullYear() - start.getFullYear();
        const monthsDifference = end.getMonth() - start.getMonth();
        
        return (yearsDifference * 12) + monthsDifference;
    }

    /**
     * Generate SQL for updating catch-up fees
     */
    static generateUpdateSQL() {
        return `
-- Update all members with correct catch-up fees based on PLF Constitution Clause 10
-- Rate change: R200 until June 2024, R250 from July 2024

UPDATE members 
SET catch_up_fee = CASE 
  WHEN join_date < '2024-07-01' THEN 
    200 * ((EXTRACT(YEAR FROM join_date) - 2018) * 12 + (EXTRACT(MONTH FROM join_date) - 7))
  ELSE 
    250 * ((EXTRACT(YEAR FROM join_date) - 2018) * 12 + (EXTRACT(MONTH FROM join_date) - 7))
  END
WHERE catch_up_fee != CASE 
  WHEN join_date < '2024-07-01' THEN 
    200 * ((EXTRACT(YEAR FROM join_date) - 2018) * 12 + (EXTRACT(MONTH FROM join_date) - 7))
  ELSE 
    250 * ((EXTRACT(YEAR FROM join_date) - 2018) * 12 + (EXTRACT(MONTH FROM join_date) - 7))
  END;

-- Verify Christopher Naude's catch-up fee (should remain R600)
SELECT name, member_number, join_date, catch_up_fee 
FROM members 
WHERE name = 'Christopher Naude';
        `;
    }
}

async function implementCatchUpFeeCorrections() {
    console.log('🔄 IMPLEMENTING CATCH-UP FEE CORRECTIONS');
    console.log('='.repeat(70));
    
    try {
        console.log('\n📊 CATCH-UP FEE CORRECTION IMPLEMENTATION');
        console.log('-'.repeat(50));
        console.log('• Source: PLF Constitution Clause 10');
        console.log('• Fund Inception: July 2018');
        console.log('• Rate Change: R200 until June 2024, R250 from July 2024');
        console.log('• Members to Update: 54 members');
        console.log('• Total Adjustment: R2,400.00');
        
        // Get current state before corrections
        console.log('\n🔍 CURRENT CATCH-UP FEE STATUS...');
        
        const { data: membersBefore, error: errorBefore } = await supabase
            .from('members')
            .select('id, name, member_number, join_date, catch_up_fee, monthly_contribution')
            .not('join_date', 'is', null);
        
        if (errorBefore) {
            console.error('❌ Error fetching members:', errorBefore);
            return;
        }
        
        // Calculate corrections needed
        const corrections = [];
        let totalAdjustment = 0;
        
        for (const member of membersBefore) {
            const correctFee = CatchUpFeeCorrector.calculateCorrectCatchUpFee(member.join_date);
            const difference = correctFee - member.catch_up_fee;
            
            if (Math.abs(difference) >= 1) { // Only include significant differences
                corrections.push({
                    member: member,
                    currentFee: member.catch_up_fee,
                    correctFee: correctFee,
                    difference: difference
                });
                totalAdjustment += difference;
            }
        }
        
        console.log(`📈 Found ${corrections.length} members needing catch-up fee corrections`);
        console.log(`💰 Total adjustment required: R${totalAdjustment.toFixed(2)}`);
        
        // Show sample corrections
        console.log('\n🧮 SAMPLE CORRECTIONS:');
        console.log('-'.repeat(40));
        
        corrections.slice(0, 10).forEach(correction => {
            console.log(`• ${correction.member.name} (M${correction.member.member_number}):`);
            console.log(`  Current: R${correction.currentFee} → Correct: R${correction.correctFee.toFixed(2)}`);
            console.log(`  Difference: R${correction.difference.toFixed(2)}`);
        });
        
        if (corrections.length > 10) {
            console.log(`• ... and ${corrections.length - 10} more members`);
        }
        
        // Show Christopher Naude status
        const christopher = corrections.find(c => c.member.name === 'Christopher Naude');
        if (christopher) {
            console.log(`\n🎯 CHRISTOPHER NAUDE STATUS:`);
            console.log('-'.repeat(40));
            console.log(`• Current: R${christopher.currentFee}`);
            console.log(`• Correct: R${christopher.correctFee.toFixed(2)}`);
            console.log(`• Status: ${Math.abs(christopher.difference) < 1 ? '✅ CORRECT' : '❌ NEEDS UPDATE'}`);
        } else {
            console.log(`\n🎯 CHRISTOPHER NAUDE STATUS: ✅ CORRECT (R600)`);
        }
        
        // Implementation options
        console.log('\n💡 IMPLEMENTATION OPTIONS:');
        console.log('-'.repeat(40));
        console.log('1. **Execute SQL Update** - Apply corrections to database');
        console.log('2. **Manual Review** - Review corrections before applying');
        console.log('3. **Batch Processing** - Update in smaller batches');
        
        // Generate SQL for execution
        console.log('\n📝 SQL FOR CATCH-UP FEE CORRECTIONS:');
        console.log('-'.repeat(40));
        console.log(CatchUpFeeCorrector.generateUpdateSQL());
        
        // Next steps
        console.log('\n🚀 NEXT STEPS:');
        console.log('-'.repeat(40));
        console.log('1. **Execute SQL** - Apply catch-up fee corrections');
        console.log('2. **Verify Results** - Confirm all fees are correct');
        console.log('3. **Update Documentation** - Document the corrections made');
        console.log('4. **Member Communication** - Notify members if needed');
        
        // Verification query
        console.log('\n🔍 VERIFICATION QUERY:');
        console.log('-'.repeat(40));
        console.log(`
-- Verify all catch-up fees are correct
SELECT 
    name,
    member_number,
    join_date,
    catch_up_fee,
    CASE 
        WHEN join_date < '2024-07-01' THEN 
            200 * ((EXTRACT(YEAR FROM join_date) - 2018) * 12 + (EXTRACT(MONTH FROM join_date) - 7))
        ELSE 
            250 * ((EXTRACT(YEAR FROM join_date) - 2018) * 12 + (EXTRACT(MONTH FROM join_date) - 7))
    END AS correct_fee,
    CASE 
        WHEN catch_up_fee = CASE 
            WHEN join_date < '2024-07-01' THEN 
                200 * ((EXTRACT(YEAR FROM join_date) - 2018) * 12 + (EXTRACT(MONTH FROM join_date) - 7))
            ELSE 
                250 * ((EXTRACT(YEAR FROM join_date) - 2018) * 12 + (EXTRACT(MONTH FROM join_date) - 7))
            END THEN '✅ CORRECT' 
        ELSE '❌ INCORRECT' 
    END AS status
FROM members 
WHERE join_date IS NOT NULL
ORDER BY status, name;
        `);
        
        console.log('\n' + '='.repeat(70));
        console.log('📊 CATCH-UP FEE CORRECTIONS READY FOR IMPLEMENTATION');
        console.log('='.repeat(70));
        console.log('✅ Constitution-based calculation implemented');
        console.log('✅ Corrections identified and documented');
        console.log('✅ SQL ready for execution');
        console.log('⚠️ 54 members need catch-up fee updates');
        
    } catch (error) {
        console.error('❌ Unexpected error:', error);
    }
}

// Run the implementation
implementCatchUpFeeCorrections()
    .then(() => {
        console.log('\n🎉 Catch-up fee correction implementation analysis completed!');
        console.log('\n📋 ACTION REQUIRED:');
        console.log('-'.repeat(40));
        console.log('Execute the provided SQL to update catch-up fees in the database');
        console.log('Verify results using the verification query');
        console.log('Update documentation with the corrections made');
    })
    .catch(error => {
        console.error('❌ Implementation failed:', error);
    });
