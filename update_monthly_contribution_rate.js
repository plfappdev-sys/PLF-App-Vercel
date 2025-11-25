#!/usr/bin/env node
/**
 * Update Monthly Contribution Rate from R200 to R250
 * Based on LOGICAL CALCULATION 2025-11-11.docx
 * Created: November 24, 2025
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Configuration
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://zdnyhzasvifrskbostgn.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY || '';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function updateMonthlyContributionRate() {
    console.log('🔄 UPDATING MONTHLY CONTRIBUTION RATE FROM R200 TO R250');
    console.log('='.repeat(60));
    
    try {
        // Get all members with current monthly_contribution
        console.log('\n📊 Checking current monthly contribution rates...');
        
        const { data: members, error } = await supabase
            .from('members')
            .select('id, name, member_number, monthly_contribution')
            .eq('monthly_contribution', 200);
        
        if (error) {
            console.error('❌ Error fetching members:', error);
            return;
        }
        
        console.log(`📈 Found ${members.length} members with R200 monthly contribution`);
        
        if (members.length === 0) {
            console.log('✅ No members found with R200 monthly contribution - already updated?');
            return;
        }
        
        // Display sample of members to be updated
        console.log('\n👥 Sample members to be updated:');
        members.slice(0, 10).forEach(member => {
            console.log(`   - ${member.name} (M${member.member_number})`);
        });
        
        if (members.length > 10) {
            console.log(`   ... and ${members.length - 10} more members`);
        }
        
        // Update monthly contribution rate
        console.log('\n🔄 Updating monthly contribution rate to R250...');
        
        const { data: updateResult, error: updateError } = await supabase
            .from('members')
            .update({ monthly_contribution: 250 })
            .eq('monthly_contribution', 200);
        
        if (updateError) {
            console.error('❌ Error updating monthly contribution rate:', updateError);
            return;
        }
        
        console.log('✅ Monthly contribution rate updated successfully!');
        
        // Verify the update
        console.log('\n🔍 Verifying update...');
        
        const { data: updatedMembers, error: verifyError } = await supabase
            .from('members')
            .select('id, name, member_number, monthly_contribution')
            .eq('monthly_contribution', 250);
        
        if (verifyError) {
            console.error('❌ Error verifying update:', verifyError);
            return;
        }
        
        console.log(`✅ Verified: ${updatedMembers.length} members now have R250 monthly contribution`);
        
        // Show Christopher Naude specifically
        const { data: christopher, error: christopherError } = await supabase
            .from('members')
            .select('id, name, member_number, monthly_contribution')
            .eq('name', 'Christopher Naude');
        
        if (!christopherError && christopher.length > 0) {
            console.log(`\n🎯 Christopher Naude (M${christopher[0].member_number}):`);
            console.log(`   Monthly contribution: R${christopher[0].monthly_contribution}`);
        }
        
        console.log('\n' + '='.repeat(60));
        console.log('📊 UPDATE SUMMARY');
        console.log('='.repeat(60));
        console.log(`• Members updated: ${members.length}`);
        console.log('• New monthly contribution rate: R250');
        console.log('• Previous monthly contribution rate: R200');
        console.log('• Update status: ✅ COMPLETED');
        
    } catch (error) {
        console.error('❌ Unexpected error:', error);
    }
}

// Run the update
updateMonthlyContributionRate()
    .then(() => {
        console.log('\n🎉 Monthly contribution rate update completed!');
    })
    .catch(error => {
        console.error('❌ Update failed:', error);
    });
