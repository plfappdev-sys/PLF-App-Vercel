# PLF App: Implementation Guide & Data Migration Plan

**Author:** Manus AI
**Date:** September 19, 2025
**Version:** 1.0

## 1. Introduction

This document provides a step-by-step guide for implementing the People's Liberator Fund (PLF) application, including setting up the Supabase backend, migrating historical data from the provided Excel file, and integrating the defined business logic into the application.




## 2. Supabase Backend Setup

### Step 1: Create a New Supabase Project
1. Go to [Supabase](https://supabase.com/) and create a new project.
2. Name your project (e.g., "PLF-App") and choose a region.
3. Once the project is created, navigate to the **SQL Editor**.

### Step 2: Execute the Database Schema SQL
1. Open the `PLF_Database_Schema_Design.md` document.
2. Copy the SQL code for creating the tables (`users`, `members`, `contributions`, etc.).
3. Paste the SQL into the Supabase SQL Editor and run it. This will create all the necessary tables and relationships.

### Step 3: Configure Row Level Security (RLS)
1. Copy the RLS policy SQL from the schema design document.
2. Execute this SQL in the Supabase SQL Editor to apply the security policies to your tables.

### Step 4: Obtain API Keys
1. Go to **Project Settings > API**.
2. Copy the **Project URL** and the **`anon` public key**. These will be used in your application to connect to Supabase.




## 3. Data Migration Plan

This section outlines the process for migrating the historical data from the Excel file into your new Supabase database. This will be done using a series of Python scripts that read the CSV files and insert the data into the appropriate tables.

### Prerequisites
- Python 3 installed.
- `pandas` and `supabase-client` Python libraries installed (`pip install pandas supabase-client`).

### Step 1: Migrate Members
1. **Script**: `migrate_members.py`
2. **Data Source**: `plf_data_2024-2025.csv`
3. **Logic**:
   - Read each row from the CSV.
   - Create a new record in the `members` table.
   - Map the columns from the CSV to the `members` table fields (e.g., "Member" to `member_number`, "Date Join" to `date_joined`).
   - Handle data cleaning, such as converting date formats.

### Step 2: Migrate Contributions and Transactions
1. **Script**: `migrate_contributions.py`
2. **Data Sources**: The annual contribution CSV files (e.g., `plf_data_2023-2024.csv`, `plf_data_2022-2023.csv`, etc.).
3. **Logic**:
   - For each member, iterate through the monthly contribution columns in the CSVs.
   - For each month, create a record in the `contributions` table.
   - Create a corresponding transaction in the `transactions` table with type `contribution`.
   - Import any penalties or bank charges as separate transactions.

### Step 3: Calculate and Set Initial Balances
1. **Script**: `calculate_initial_balances.py`
2. **Logic**:
   - After all historical data is migrated, this script will run for each member.
   - It will aggregate all their contributions, fees, and interest from the `transactions` table.
   - It will then populate the `member_balances` table with the correct initial values for `total_contributions`, `total_interest_earned`, etc.

### Step 4: Migrate Other Data
- **Catch-up Fees**: Migrate data from `plf_data_Catch_up_Fee.csv` to update the `catch_up_fee` in the `members` table.
- **Terminations**: Use `plf_data_Terminations.csv` to update the status of terminated members.




## 4. Business Logic Implementation (Supabase Functions)

The core business logic, especially the scheduled calculations, will be implemented using Supabase Edge Functions (written in TypeScript/Deno).

### Function 1: Daily Interest Calculation
- **Trigger**: Scheduled to run once every day.
- **Logic**:
  1. Fetches the current savings interest rate from the `system_settings` table.
  2. Iterates through all `active` members.
  3. For each member, calculates the daily savings interest based on their `net_balance`.
  4. Calculates daily loan interest for all `active` or `overdue` loans.
  5. Records the calculated interest in the `interest_accruals` table.

### Function 2: Monthly Interest & Fee Processing
- **Trigger**: Scheduled to run on the 1st of every month.
- **Logic**:
  1. Aggregates the daily interest from `interest_accruals` for the previous month.
  2. Creates `interest_earned` and `interest_charged` transactions.
  3. Updates the `total_interest_earned` and `outstanding_loans` in the `member_balances` table.

- **Trigger**: Scheduled to run on the 8th of every month.
- **Logic**:
  1. Scans for overdue contributions and loans.
  2. Calculates the 7% late fee based on the outstanding amounts.
  3. Creates `late_fee` transactions.
  4. Updates the `outstanding_fees` in the `member_balances` table.




## 5. Application Integration

### Frontend (React Native App)
- **Supabase Client**: Initialize the Supabase client in your app using the API keys obtained in Step 2.
- **Authentication**: Use the `supabase-js` library to handle user signup, login, and session management. The `SupabaseAuthContext` provided in the app notes is a good starting point.
- **Data Display**: Fetch data for the screens from your Supabase tables using the client. For example, the Member Dashboard will fetch data from the `member_balances` table.
- **Real-time Updates**: Utilize Supabase real-time subscriptions to keep the app data updated automatically (e.g., when a new transaction is added).

### Backend (Supabase)
- **RLS**: The Row Level Security policies you set up will automatically handle data access control, so you don't need to write complex authorization logic in your app.
- **Functions**: The Supabase Edge Functions will handle all the heavy lifting for financial calculations, ensuring consistency and accuracy.

## 6. Testing and Deployment

- **Testing**: Thoroughly test all aspects of the application, including:
  - User authentication and role-based access.
  - Data migration accuracy.
  - Financial calculations (compare with the Excel file for verification).
  - Reporting functionality.
- **Deployment**: Once testing is complete, the application can be deployed. The Supabase backend is already live. For the frontend app, follow the standard procedures for building and deploying a React Native application to the app stores.


