#!/usr/bin/env node
/**
 * PLF Data Migration Script (JavaScript Version)
 * Purpose: Migrate historical data to new business logic schema
 * Created: November 19, 2025
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Configuration
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://zdnyhzasvifrskbostgn.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY || '';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

class PLFDataMigrator {
    constructor() {
        this.membersData = [];
        this.transactionsData = [];
        this.contributionsData = [];
        this.memberBalancesData = [];
    }

    async loadMemberData() {
        try {
            console.log("Loading member data from Supabase...");
            const { data, error } = await supabase
                .from('members')
                .select('*');
            
            if (error) throw error;
            
            this.membersData = data;
            console.log(`Loaded ${this.membersData.length} members`);
            return true;
        } catch (error) {
            console.log(`Error loading member data: ${error.message}`);
            return false;
        }
    }

    async loadTransactionData() {
        try {
            console.log("Loading transaction data from Supabase...");
            const { data, error } = await supabase
                .from('transactions')
                .select('*');
            
            if (error) throw error;
            
            this.transactionsData = data;
            console.log(`Loaded ${this.transactionsData.length} transactions`);
            return true;
        } catch (error) {
            console.log(`Error loading transaction data: ${error.message}`);
            return false;
        }
    }

    calculateMonthsMissed(joinDate) {
        const july2018 = new Date('2018-07-01');
        const joinDateObj = new Date(joinDate);
        
        // Calculate total months difference
        let totalMonths = (joinDateObj.getFullYear() - july2018.getFullYear()) * 12 + 
                         (joinDateObj.getMonth() - july2018.getMonth());
        
        // If join date is after the 15th, count that month as missed
        if (joinDateObj.getDate() > 15) {
            totalMonths += 1;
        }
        
        return Math.max(0, totalMonths);
    }

    async calculateCatchUpFees() {
        console.log("Calculating catch-up fees...");
        const july2018 = new Date('2018-07-01');
        
        for (const member of this.membersData) {
            if (member.created_at) {
                const joinDate = new Date(member.created_at);
                
                if (joinDate > july2018) {
                    // Calculate months from July 2018 to join date
                    const monthsMissed = this.calculateMonthsMissed(member.created_at);
                    
                    // Calculate catch-up fee: R200 per missed month
                    const catchUpFee = monthsMissed * 200;
                    
                    // Update member record
                    try {
                        const { error } = await supabase
                            .from('members')
                            .update({
                                catch_up_fee: catchUpFee,
                                monthly_contribution: 200.00
                            })
                            .eq('id', member.id);
                        
                        if (error) throw error;
                        
                        console.log(`Member ${member.id}: ${monthsMissed} months missed, catch-up fee: R${catchUpFee}`);
                        
                    } catch (error) {
                        console.log(`Error updating member ${member.id}: ${error.message}`);
                    }
                }
            }
        }
    }

    async createHistoricalContributions() {
        console.log("Creating historical contributions...");
        
        // Group transactions by member and month
        const memberMonthlyDeposits = {};
        
        for (const transaction of this.transactionsData) {
            if (transaction.transaction_type === 'deposit' && 
                transaction.status === 'completed' &&
                transaction.member_id) {
                
                try {
                    const transactionDate = new Date(transaction.created_at);
                    const monthKey = `${transaction.member_id}-${transactionDate.getFullYear()}-${String(transactionDate.getMonth() + 1).padStart(2, '0')}`;
                    
                    if (!memberMonthlyDeposits[monthKey]) {
                        memberMonthlyDeposits[monthKey] = {
                            member_id: transaction.member_id,
                            year: transactionDate.getFullYear(),
                            month: transactionDate.getMonth() + 1,
                            total_amount: 0,
                            transaction_count: 0
                        };
                    }
                    
                    memberMonthlyDeposits[monthKey].total_amount += parseFloat(transaction.amount || 0);
                    memberMonthlyDeposits[monthKey].transaction_count += 1;
                    
                } catch (error) {
                    console.log(`Error processing transaction ${transaction.id}: ${error.message}`);
                }
            }
        }
        
        // Create contributions from monthly deposits
        for (const [key, monthlyData] of Object.entries(memberMonthlyDeposits)) {
            try {
                const contributionData = {
                    member_id: monthlyData.member_id,
                    contribution_month: `${monthlyData.year}-${String(monthlyData.month).padStart(2, '0')}-01`,
                    due_date: `${monthlyData.year}-${String(monthlyData.month).padStart(2, '0')}-01`,
                    amount_due: 200.00,
                    amount_paid: Math.min(monthlyData.total_amount, 200.00),
                    status: monthlyData.total_amount >= 200.00 ? 'paid' : 'partial',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };
                
                // Insert contribution
                const { error } = await supabase
                    .from('contributions')
                    .insert(contributionData);
                
                if (error) throw error;
                
                console.log(`Created contribution for member ${monthlyData.member_id} - ${monthlyData.year}-${String(monthlyData.month).padStart(2, '0')}: R${monthlyData.total_amount}`);
                
            } catch (error) {
                console.log(`Error creating contribution for ${key}: ${error.message}`);
            }
        }
    }

    async calculateInitialBalances() {
        console.log("Calculating initial member balances...");
        
        for (const member of this.membersData) {
            try {
                // Get all transactions for this member
                const memberTransactions = this.transactionsData.filter(t => t.member_id === member.id);
                
                // Calculate total deposits and withdrawals
                const totalDeposits = memberTransactions
                    .filter(t => t.transaction_type === 'deposit' && t.status === 'completed')
                    .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
                
                const totalWithdrawals = memberTransactions
                    .filter(t => t.transaction_type === 'withdrawal' && t.status === 'completed')
                    .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
                
                // Get total loan amount (simplified calculation)
                const totalLoans = memberTransactions
                    .filter(t => t.transaction_type === 'loan_disbursement' && t.status === 'completed')
                    .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
                
                // Calculate net balance
                const netBalance = totalDeposits - totalWithdrawals - totalLoans;
                
                // Create member balance record
                const balanceData = {
                    member_id: member.id,
                    savings_balance: Math.max(0, totalDeposits - totalWithdrawals),
                    loan_balance: totalLoans,
                    net_balance: netBalance,
                    available_funds: Math.max(0, totalDeposits - totalWithdrawals),
                    last_updated: new Date().toISOString(),
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };
                
                // Insert member balance
                const { error } = await supabase
                    .from('member_balances')
                    .insert(balanceData);
                
                if (error) throw error;
                
                console.log(`Member ${member.id}: Savings R${balanceData.savings_balance}, Loans R${balanceData.loan_balance}, Net R${balanceData.net_balance}`);
                
            } catch (error) {
                console.log(`Error calculating balance for member ${member.id}: ${error.message}`);
            }
        }
    }

    async runMigration() {
        console.log("Starting PLF Data Migration...");
        console.log("=".repeat(50));
        
        // Load existing data
        if (!(await this.loadMemberData())) {
            console.log("Failed to load member data. Exiting.");
            return false;
        }
            
        if (!(await this.loadTransactionData())) {
            console.log("Failed to load transaction data. Exiting.");
            return false;
        }
        
        // Step 1: Calculate and apply catch-up fees
        console.log("\n1. Calculating catch-up fees...");
        await this.calculateCatchUpFees();
        
        // Step 2: Create historical contributions
        console.log("\n2. Creating historical contributions...");
        await this.createHistoricalContributions();
        
        // Step 3: Calculate initial balances
        console.log("\n3. Calculating initial balances...");
        await this.calculateInitialBalances();
        
        console.log("\n" + "=".repeat(50));
        console.log("Data migration completed successfully!");
        console.log("Please verify the data in the following tables:");
        console.log("- members (catch_up_fee, monthly_contribution)");
        console.log("- contributions (historical contributions)");
        console.log("- member_balances (initial balances)");
        
        return true;
    }
}

async function main() {
    // Check if Supabase credentials are available
    if (!SUPABASE_SERVICE_ROLE_KEY) {
        console.log("Error: SERVICE_ROLE_KEY environment variable is required");
        console.log("Please set it before running this script:");
        console.log("export SERVICE_ROLE_KEY='your-service-role-key'");
        return;
    }
    
    // Create migrator instance
    const migrator = new PLFDataMigrator();
    
    // Run migration
    const success = await migrator.runMigration();
    
    if (success) {
        console.log("\nMigration completed successfully!");
    } else {
        console.log("\nMigration failed. Please check the errors above.");
    }
}

// Run the migration
main().catch(console.error);
