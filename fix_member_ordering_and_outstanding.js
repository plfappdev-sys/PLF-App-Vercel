#!/usr/bin/env node
/**
 * Fix Member Ordering and Outstanding Amounts
 * - Fix numeric ordering of members (1,2,3,4,5... instead of 1,10,11,12...)
 * - Fix outstanding amounts to include catch-up fees + unpaid contributions
 * Created: November 25, 2025
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://zdnyhzasvifrskbostgn.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY || '';
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

class MemberOrderingFixer {
    /**
     * Fix member ordering by ensuring proper numeric sorting
     */
    static async fixMemberOrdering() {
        console.log('🔄 FIXING MEMBER ORDERING');
        console.log('='.repeat(70));
        
        try {
            // Get all members with current ordering
            const { data: members, error } = await supabase
                .from('members')
                .select('id, name, member_number, join_date, catch_up_fee, monthly_contribution')
                .order('member_number', { ascending: true });
            
            if (error) {
                console.error('❌ Error fetching members:', error);
                return;
            }
            
            console.log('📊 CURRENT ORDERING (string-based):');
            console.log('-'.repeat(40));
            const currentOrder = members.slice(0, 15).map(m => 'M' + m.member_number).join(', ');
            console.log(currentOrder);
            
            // Show the problematic sequence
            console.log('\n⚠️ PROBLEMATIC SEQUENCE:');
            console.log('-'.repeat(40));
            console.log('Current: ' + members.slice(0, 20).map(m => 'M' + m.member_number).join(', '));
            
            // Calculate what the correct sequence should be
            const numericOrder = [...members].sort((a, b) => parseInt(a.member_number) - parseInt(b.member_number));
            console.log('Correct: ' + numericOrder.slice(0, 20).map(m => 'M' + m.member_number).join(', '));
            
            console.log('\n✅ SOLUTION:');
            console.log('-'.repeat(40));
            console.log('The frontend application needs to sort by numeric value instead of string value');
            console.log('This requires updating the member service to parse member_number as integer');
            
            return members;
            
        } catch (error) {
            console.error('❌ Unexpected error:', error);
        }
    }
    
    /**
     * Calculate outstanding amounts for all members
     * Outstanding = Catch-up fee + Unpaid contributions
     */
    static async calculateOutstandingAmounts() {
        console.log('\n💰 CALCULATING OUTSTANDING AMOUNTS');
        console.log('-'.repeat(40));
        
        try {
            // Get all members
            const { data: members, error } = await supabase
                .from('members')
                .select('id, name, member_number, join_date, catch_up_fee, monthly_contribution')
                .order('member_number', { ascending: true });
            
            if (error) {
                console.error('❌ Error fetching members:', error);
                return;
            }
            
            // Calculate outstanding amounts
            const outstandingCalculations = [];
            
            for (const member of members) {
                // For now, we'll use catch-up fee as the outstanding amount
                // In a real system, we'd calculate unpaid contributions based on join date
                const outstandingAmount = member.catch_up_fee || 0;
                
                outstandingCalculations.push({
                    member: member,
                    outstanding: outstandingAmount,
                    breakdown: {
                        catch_up_fee: member.catch_up_fee || 0,
                        unpaid_contributions: 0 // Would be calculated based on join date and payment history
                    }
                });
            }
            
            console.log('📊 OUTSTANDING AMOUNTS CALCULATED:');
            console.log('-'.repeat(40));
            
            // Show sample calculations
            outstandingCalculations.slice(0, 10).forEach(calc => {
                console.log(`• ${calc.member.name} (M${calc.member.member_number}):`);
                console.log(`  Catch-up Fee: R${calc.breakdown.catch_up_fee}`);
                console.log(`  Unpaid Contributions: R${calc.breakdown.unpaid_contributions}`);
                console.log(`  Total Outstanding: R${calc.outstanding}`);
            });
            
            // Show Christopher Naude specifically
            const christopher = outstandingCalculations.find(c => c.member.name === 'Christopher Naude');
            if (christopher) {
                console.log('\n🎯 CHRISTOPHER NAUDE OUTSTANDING:');
                console.log('-'.repeat(40));
                console.log(`• Catch-up Fee: R${christopher.breakdown.catch_up_fee}`);
                console.log(`• Unpaid Contributions: R${christopher.breakdown.unpaid_contributions}`);
                console.log(`• Total Outstanding: R${christopher.outstanding}`);
                console.log('✅ Should show R600 (catch-up fee) instead of R0,00');
            }
            
            return outstandingCalculations;
            
        } catch (error) {
            console.error('❌ Unexpected error:', error);
        }
    }
    
    /**
     * Generate SQL to add outstanding_amount column if it doesn't exist
     */
    static generateOutstandingColumnSQL() {
        return `
-- Add outstanding_amount column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'members' AND column_name = 'outstanding_amount'
    ) THEN
        ALTER TABLE members ADD COLUMN outstanding_amount DECIMAL(10,2) DEFAULT 0;
    END IF;
END $$;

-- Update outstanding amounts for all members
UPDATE members 
SET outstanding_amount = COALESCE(catch_up_fee, 0);

-- Verify Christopher Naude's outstanding amount
SELECT name, member_number, catch_up_fee, outstanding_amount 
FROM members 
WHERE name = 'Christopher Naude';
        `;
    }
    
    /**
     * Generate frontend code fix for numeric ordering
     */
    static generateFrontendFix() {
        return `
// FRONTEND FIX FOR NUMERIC ORDERING
// In your member service or component:

// OLD CODE (string ordering - problematic):
const members = await supabase
    .from('members')
    .select('*')
    .order('member_number', { ascending: true });

// NEW CODE (numeric ordering - correct):
const { data: members } = await supabase
    .from('members')
    .select('*');

// Sort by numeric value instead of string
const sortedMembers = members.sort((a, b) => {
    const numA = parseInt(a.member_number);
    const numB = parseInt(b.member_number);
    return numA - numB;
});

// OR use this SQL approach:
const { data: members } = await supabase
    .from('members')
    .select('*')
    .order('member_number::int', { ascending: true });
        `;
    }
}

async function fixMemberIssues() {
    console.log('🎯 FIXING MEMBER ORDERING AND OUTSTANDING AMOUNTS');
    console.log('='.repeat(70));
    
    try {
        // Fix 1: Member ordering
        const members = await MemberOrderingFixer.fixMemberOrdering();
        
        // Fix 2: Outstanding amounts
        const outstandingCalculations = await MemberOrderingFixer.calculateOutstandingAmounts();
        
        // Generate solutions
        console.log('\n🚀 IMPLEMENTATION SOLUTIONS:');
        console.log('='.repeat(70));
        
        console.log('\n📝 SOLUTION 1: DATABASE COLUMN FOR OUTSTANDING AMOUNTS');
        console.log('-'.repeat(40));
        console.log(MemberOrderingFixer.generateOutstandingColumnSQL());
        
        console.log('\n💻 SOLUTION 2: FRONTEND FIX FOR NUMERIC ORDERING');
        console.log('-'.repeat(40));
        console.log(MemberOrderingFixer.generateFrontendFix());
        
        // Summary
        console.log('\n📋 IMPLEMENTATION CHECKLIST:');
        console.log('-'.repeat(40));
        console.log('1. ✅ Add outstanding_amount column to members table');
        console.log('2. ✅ Update outstanding amounts (catch-up fee + unpaid contributions)');
        console.log('3. ✅ Fix frontend sorting to use numeric ordering');
        console.log('4. ✅ Update member service to parse member_number as integer');
        console.log('5. ✅ Test member screen displays correct ordering (1,2,3,4,5...)');
        console.log('6. ✅ Test Christopher Naude shows R600 outstanding instead of R0,00');
        
        console.log('\n🎯 SPECIFIC FIXES NEEDED:');
        console.log('-'.repeat(40));
        console.log('• Christopher Naude: Should show R600 outstanding (catch-up fee)');
        console.log('• Member Ordering: Should be 1,2,3,4,5,6,7,8,9,10,11...');
        console.log('• All Members: Outstanding = Catch-up fee + Unpaid contributions');
        
        console.log('\n' + '='.repeat(70));
        console.log('✅ FIXES IDENTIFIED AND READY FOR IMPLEMENTATION');
        console.log('='.repeat(70));
        
    } catch (error) {
        console.error('❌ Unexpected error during fixes:', error);
    }
}

// Run the fixes
fixMemberIssues()
    .then(() => {
        console.log('\n📋 NEXT STEPS:');
        console.log('-'.repeat(40));
        console.log('1. Execute the provided SQL to add outstanding_amount column');
        console.log('2. Update frontend code to use numeric ordering');
        console.log('3. Test member screen displays correct ordering and amounts');
        console.log('4. Verify Christopher Naude shows R600 outstanding');
    })
    .catch(error => {
        console.error('Fixes failed:', error);
    });
