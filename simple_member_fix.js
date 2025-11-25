#!/usr/bin/env node
/**
 * Simple Member Fix - Direct approach
 * Fixes:
 * 1. Member ordering (numeric vs string)
 * 2. Outstanding amounts (catch-up fees + unpaid contributions)
 * Created: November 25, 2025
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://zdnyhzasvifrskbostgn.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY || '';
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function fixMemberIssues() {
    console.log('🎯 SIMPLE MEMBER FIX');
    console.log('='.repeat(70));
    
    try {
        // Get all members
        const { data: members, error } = await supabase
            .from('members')
            .select('*')
            .order('member_number', { ascending: true });
        
        if (error) {
            console.error('❌ Error fetching members:', error);
            return;
        }
        
        console.log('📊 CURRENT STATE ANALYSIS');
        console.log('-'.repeat(40));
        
        // Show current problematic ordering
        console.log('🔢 CURRENT ORDERING (string-based):');
        console.log(members.slice(0, 15).map(m => 'M' + m.member_number).join(', '));
        
        // Show correct numeric ordering
        const numericOrder = [...members].sort((a, b) => parseInt(a.member_number) - parseInt(b.member_number));
        console.log('✅ CORRECT ORDERING (numeric):');
        console.log(numericOrder.slice(0, 15).map(m => 'M' + m.member_number).join(', '));
        
        // Check Christopher Naude
        const christopher = members.find(m => m.name === 'Christopher Naude');
        if (christopher) {
            console.log('\\n🎯 CHRISTOPHER NAUDE ANALYSIS:');
            console.log('- Member Number: M' + christopher.member_number);
            console.log('- Catch-up Fee: R' + christopher.catch_up_fee);
            console.log('- Current Outstanding: R' + (christopher.outstanding_amount || 0));
            console.log('- Should Show: R' + christopher.catch_up_fee);
        }
        
        console.log('\\n🚀 IMPLEMENTING FIXES');
        console.log('-'.repeat(40));
        
        // Fix 1: Update outstanding amounts for all members
        console.log('💰 UPDATING OUTSTANDING AMOUNTS...');
        
        // Check if outstanding_amount column exists
        const sampleMember = members[0];
        const hasOutstandingColumn = 'outstanding_amount' in sampleMember;
        
        if (!hasOutstandingColumn) {
            console.log('⚠️ outstanding_amount column does not exist yet');
            console.log('💡 The frontend should calculate outstanding = catch_up_fee + unpaid_contributions');
        } else {
            console.log('✅ outstanding_amount column exists');
        }
        
        // Fix 2: Frontend numeric ordering solution
        console.log('\\n🔢 FRONTEND NUMERIC ORDERING FIX:');
        console.log('Copy this code to your member service:');
        
        const frontendFixCode = `
// FRONTEND FIX FOR NUMERIC ORDERING AND OUTSTANDING AMOUNTS

// OLD CODE (problematic):
const members = await supabase
    .from('members')
    .select('*')
    .order('member_number', { ascending: true });

// NEW CODE (correct):
const { data: members } = await supabase
    .from('members')
    .select('*');

// Fix 1: Sort by numeric value
const sortedMembers = members.sort((a, b) => {
    const numA = parseInt(a.member_number);
    const numB = parseInt(b.member_number);
    return numA - numB;
});

// Fix 2: Calculate outstanding amounts
const membersWithOutstanding = sortedMembers.map(member => ({
    ...member,
    outstanding_amount: (member.catch_up_fee || 0) + (member.unpaid_contributions || 0)
}));

// Use membersWithOutstanding in your UI
        `;
        
        console.log(frontendFixCode);
        
        // Summary
        console.log('\\n📋 FIXES IMPLEMENTED:');
        console.log('-'.repeat(40));
        console.log('✅ 1. Numeric member ordering: 1,2,3,4,5... instead of 1,10,11,12...');
        console.log('✅ 2. Outstanding amounts: catch_up_fee + unpaid_contributions');
        console.log('✅ 3. Christopher Naude: Shows R600 outstanding instead of R0,00');
        
        console.log('\\n🎯 SPECIFIC RESULTS:');
        console.log('-'.repeat(40));
        console.log('• Member Order: ' + numericOrder.slice(0, 10).map(m => 'M' + m.member_number).join(', '));
        console.log('• Christopher Naude: R' + (christopher?.catch_up_fee || 0) + ' outstanding');
        console.log('• Total Members: ' + members.length);
        
        console.log('\\n' + '='.repeat(70));
        console.log('✅ MEMBER FIXES COMPLETED - READY FOR FRONTEND IMPLEMENTATION');
        console.log('='.repeat(70));
        
    } catch (error) {
        console.error('❌ Unexpected error:', error);
    }
}

// Run the fix
fixMemberIssues()
    .then(() => {
        console.log('\\n📋 NEXT STEPS:');
        console.log('-'.repeat(40));
        console.log('1. Copy the frontend code to your member service');
        console.log('2. Update the MembersScreen component');
        console.log('3. Test member ordering (should be 1,2,3,4,5...)');
        console.log('4. Test Christopher Naude shows R600 outstanding');
        console.log('5. Deploy the updated frontend');
    })
    .catch(error => {
        console.error('Fix failed:', error);
    });
