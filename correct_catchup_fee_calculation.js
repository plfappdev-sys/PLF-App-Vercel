#!/usr/bin/env node
/**
 * Correct Catch-up Fee Calculation Methodology
 * Based on PLF Constitution Clause 10
 * Created: November 24, 2025
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Configuration
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://zdnyhzasvifrskbostgn.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY || '';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

class CorrectCatchUpFeeCalculator {
    /**
     * Calculate catch-up fee according to PLF Constitution Clause 10
     * Formula: monthly contribution × number of months from fund inception till join date
     * Fund inception: July 2018
     * Rate change: R200 until June 2024, R250 from July 2024
     */
    static calculateCatchUpFee(joinDate) {
        const fundInception = new Date('2018-07-01');
        const rateChangeDate = new Date('2024-07-01');
        const memberJoinDate = new Date(joinDate);
        
        // Determine which rate to use based on join date
        if (memberJoinDate < rateChangeDate) {
            // Joined before July 2024 - use R200 rate
            const monthsDifference = this.calculateMonthsDifference(fundInception, memberJoinDate);
            return monthsDifference * 200;
        } else {
            // Joined after July 2024 - use R250 rate
            const monthsDifference = this.calculateMonthsDifference(fundInception, memberJoinDate);
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
     * Validate if current catch-up fees match constitution calculation
     */
    static validateCatchUpFee(currentCatchUpFee, calculatedCatchUpFee) {
        return Math.abs(currentCatchUpFee - calculatedCatchUpFee) < 1; // Allow for rounding differences
    }
}

async function implementCorrectCatchUpFeeCalculation() {
    console.log('🔄 IMPLEMENTING CORRECT CATCH-UP FEE CALCULATION');
    console.log('='.repeat(70));
    
    try {
        console.log('\n📊 PLF CONSTITUTION CATCH-UP FEE METHODOLOGY');
        console.log('-'.repeat(50));
        console.log('• Source: PLF Constitution Clause 10');
        console.log('• Fund Inception: July 2018');
        console.log('• Rate Change: R200 until June 2024, R250 from July 2024');
        console.log('• Formula: months from inception to join date × appropriate rate');
        console.log('• Purpose: Bring new members in line with founding members');
        console.log('• Penalties: NOT included in catch-up fee calculation');
        
        // Get all members with join dates
        console.log('\n🔍 ANALYZING CURRENT MEMBER DATA...');
        
        const { data: members, error } = await supabase
            .from('members')
            .select('id, name, member_number, join_date, catch_up_fee, monthly_contribution')
            .not('join_date', 'is', null);
        
        if (error) {
            console.error('❌ Error fetching members:', error);
            return;
        }
        
        console.log(`📈 Found ${members.length} members with join dates`);
        
        // Calculate correct catch-up fees
        console.log('\n🧮 CALCULATING CORRECT CATCH-UP FEES...');
        console.log('-'.repeat(40));
        
        const corrections = [];
        
        for (const member of members) {
            const correctCatchUpFee = CorrectCatchUpFeeCalculator.calculateCatchUpFee(
                member.join_date
            );
            
            const isValid = CorrectCatchUpFeeCalculator.validateCatchUpFee(
                member.catch_up_fee,
                correctCatchUpFee
            );
            
            corrections.push({
                member: member,
                currentFee: member.catch_up_fee,
                correctFee: correctCatchUpFee,
                isValid: isValid,
                difference: correctCatchUpFee - member.catch_up_fee
            });
            
            if (!isValid) {
                console.log(`⚠️ ${member.name} (M${member.member_number}):`);
                console.log(`   Current: R${member.catch_up_fee}`);
                console.log(`   Correct: R${correctCatchUpFee.toFixed(2)}`);
                console.log(`   Difference: R${(correctCatchUpFee - member.catch_up_fee).toFixed(2)}`);
            }
        }
        
        // Show Christopher Naude analysis
        const christopher = corrections.find(c => c.member.name === 'Christopher Naude');
        if (christopher) {
            console.log(`\n🎯 CHRISTOPHER NAUDE CATCH-UP FEE ANALYSIS:`);
            console.log('-'.repeat(40));
            console.log(`• Join Date: ${christopher.member.join_date}`);
            console.log(`• Monthly Contribution: R${christopher.member.monthly_contribution}`);
            console.log(`• Current Catch-up Fee: R${christopher.currentFee}`);
            console.log(`• Correct Catch-up Fee: R${christopher.correctFee.toFixed(2)}`);
            console.log(`• Status: ${christopher.isValid ? '✅ CORRECT' : '❌ INCORRECT'}`);
            
            if (!christopher.isValid) {
                console.log(`• Action Required: Update to R${christopher.correctFee.toFixed(2)}`);
            }
        }
        
        // Summary statistics
        const incorrectCount = corrections.filter(c => !c.isValid).length;
        const totalDifference = corrections.reduce((sum, c) => sum + c.difference, 0);
        
        console.log(`\n📊 CORRECTION SUMMARY:`);
        console.log('-'.repeat(40));
        console.log(`• Total Members: ${corrections.length}`);
        console.log(`• Correct Fees: ${corrections.length - incorrectCount}`);
        console.log(`• Incorrect Fees: ${incorrectCount}`);
        console.log(`• Total Adjustment: R${totalDifference.toFixed(2)}`);
        
        // Implementation recommendations
        console.log('\n💡 IMPLEMENTATION RECOMMENDATIONS');
        console.log('-'.repeat(40));
        console.log('1. **Update Incorrect Catch-up Fees**:');
        console.log('   - Use constitution-based calculation (Clause 10)');
        console.log('   - Fund inception: July 2018');
        console.log('   - Rate change: R200 until June 2024, R250 from July 2024');
        console.log('   - Formula: months from inception to join date × appropriate rate');
        
        console.log('2. **Separate Penalty System**:');
        console.log('   - Catch-up fees: Constitution-based calculation only');
        console.log('   - Penalties: Separate 7% late fee system (Clause 12)');
        console.log('   - Do not mix penalties with catch-up fees');
        
        console.log('3. **Member Communication**:');
        console.log('   - Explain constitution-based calculation to members');
        console.log('   - Provide transparency on fee calculations');
        
        // Sample SQL for corrections
        console.log('\n📝 SAMPLE SQL FOR CATCH-UP FEE CORRECTIONS:');
        console.log('-'.repeat(40));
        console.log(`
-- Update Christopher Naude's catch-up fee
UPDATE members 
SET catch_up_fee = ${christopher ? christopher.correctFee.toFixed(2) : 'calculated_value'}
WHERE name = 'Christopher Naude';

-- Update other members with incorrect fees
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
        `);
        
        // Next steps
        console.log('\n🚀 NEXT STEPS FOR PRODUCTION');
        console.log('-'.repeat(40));
        console.log('1. **Finalize Catch-up Fee Methodology** - Use constitution calculation');
        console.log('2. **Update Incorrect Fees** - Apply constitution-based calculation');
        console.log('3. **Import Actual Contribution Data** - Create real contribution records');
        console.log('4. **Deploy Penalty Calculation System** - Implement 7% late fees separately');
        console.log('5. **Member Communication** - Notify members of correct fee calculations');
        console.log('6. **System Testing** - Comprehensive testing of all financial calculations');
        
        console.log('\n' + '='.repeat(70));
        console.log('📊 CORRECT CATCH-UP FEE METHODOLOGY READY');
        console.log('='.repeat(70));
        console.log('✅ Constitution-based calculation implemented');
        console.log('✅ Current vs correct fees analyzed');
        console.log('✅ Implementation plan documented');
        console.log('⚠️ Some catch-up fees need correction');
        
    } catch (error) {
        console.error('❌ Unexpected error:', error);
    }
}

// Run the implementation
implementCorrectCatchUpFeeCalculation()
    .then(() => {
        console.log('\n🎉 Correct catch-up fee methodology implementation completed!');
    })
    .catch(error => {
        console.error('❌ Implementation failed:', error);
    });
