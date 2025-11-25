# PLF App: Business Logic & Calculation Rules

**Author:** Manus AI
**Date:** September 19, 2025
**Version:** 1.0

## 1. Introduction

This document defines the core business logic, calculation rules, and data processing workflows for the People's Liberator Fund (PLF) application. It is based on the official fund constitution, AGM resolutions, and the provided Excel data. This logic will govern all financial calculations, member interactions, and reporting within the Supabase-powered application.

The primary goal is to create a transparent, accurate, and automated system that reflects the fund's rules and ensures fair treatment for all members. All calculations are designed to be auditable and traceable back to the source rules.




## 2. Member Management

Member management is the cornerstone of the PLF app. The system must handle both the onboarding of new members and the integration of existing members from the Excel data.

### 2.1. Member Onboarding

**New Members:**
- A new user signs up through the app, providing their email and creating a password.
- Upon successful authentication, a new record is created in the `users` table in Supabase.
- The user is then prompted to complete their member profile, filling in all the required information in the `members` table.
- A new, unique `member_number` is generated for the new member.

**Existing Members (Data Import):**
- Existing members from the Excel file will be pre-populated in the `members` table during the data migration process.
- When an existing member signs up, they will use their email address. The system will check if this email exists in the `members` table.
- If a match is found, the new `auth.users` record will be linked to the existing `members` profile via the `user_id`.
- This ensures that all historical data from the Excel file is correctly associated with the authenticated user.

### 2.2. Member Status

A member's status can be one of the following:
- **`active`**: The member is in good standing.
- **`suspended`**: The member has outstanding contributions or other issues. Their account may have limited access.
- **`terminated`**: The member has left the fund. Their account is inactive.

The logic for changing a member's status will be based on rules defined in the constitution, such as non-payment of contributions for a specified period.




## 3. Contribution & Payment Logic

This section details the rules governing monthly contributions, catch-up fees for new members, and the process for handling payments and arrears.

### 3.1. Monthly Contributions

- **Standard Contribution**: Each active member is expected to contribute a standard amount of **R200.00 per month**, as observed in the `Monthly Contr` column of the `Catch_up_Fee.csv` data.
- **Due Date**: Contributions are due on the 1st of each month.
- **Tracking**: A new record will be created in the `contributions` table for each member at the beginning of every month, with the `expected_amount` set to R200.00 and the status as `pending`.

### 3.2. Catch-Up Fees

- **Purpose**: New members who join after the fund's start date (`01/07/2018`) are required to pay a "catch-up fee" to ensure their total contribution is aligned with founding members.
- **Calculation**: The fee is calculated as `(Number of months between fund start date and member join date) * R200.00`.
- **Example**: Based on `plf_data_Catch_up_Fee.csv`, "Member 2" joined in February 2019, 8 months after the July 2018 start, resulting in a `1600.0` catch-up fee (8 * 200).
- **Implementation**: This fee will be calculated upon member registration and stored in the `members.catch_up_fee` field. A corresponding transaction will be created in the `transactions` table.

### 3.3. Payment Processing

- When a member makes a payment, a transaction is recorded in the `transactions` table with the type `contribution`.
- The system will then allocate this payment to the oldest outstanding contribution in the `contributions` table.
- The `actual_amount` will be updated, and the status will change to `paid` or `partial` depending on the amount.

### 3.4. Late Payment & Penalties

- **Late Fee**: As per Clause 12 of the Constitution and the `CalculationsLogic.docx`, a **7% late fee** is applied to any outstanding contribution balance.
- **Trigger**: A scheduled function will run on the **8th of each month**.
- **Logic**: The function will scan the `contributions` table for any records with a status of `overdue` or `partial`. It will calculate 7% of the `outstanding_amount` and create a new transaction in the `transactions` table with the type `late_fee`. This amount will also be added to the member's `outstanding_fees` in the `member_balances` table.




## 4. Interest Calculation Logic

Interest calculations are a critical component of the PLF financial engine. The system will perform daily compounding for accuracy, as specified in the `CalculationsLogic.docx`. All interest rates are sourced from the official governing documents to ensure compliance.

### 4.1. Savings Interest

- **Rate**: The savings interest rate is **variable** and determined by the Executive Committee based on the fund's investment performance (e.g., FNB 32 Days Notice Account). It is not a fixed 5%.
- **Configuration**: The rate will be stored in the `system_settings` table and can be updated by authorized administrators. This avoids hardcoding the rate in the application.
- **Calculation**: A daily scheduled function will calculate the savings interest for each member based on their `net_balance` in the `member_balances` table.
- **Formula**: `Daily Interest = net_balance * (annual_savings_rate / 365)`
- **Posting**: The accumulated daily interest will be posted to the member's account on the 1st of each month by creating a transaction of type `interest_earned` in the `transactions` table and updating the `total_interest_earned` in `member_balances`.

### 4.2. Loan Interest

- **Standard Rate**: As per Resolution PLF-AGM/2023/007, the standard loan interest rate is **20% per annum**.
- **Calculation**: Interest is calculated daily on the outstanding loan balance.
- **Formula**: `Daily Interest = outstanding_loan_balance * (0.20 / 365)`
- **Accrual**: The calculated interest is recorded daily in the `interest_accruals` table to maintain a clear audit trail.
- **Posting**: The total accrued interest is added to the loan's outstanding balance monthly.

### 4.3. Penalty Interest on Loans

- **Trigger**: If a loan is not fully repaid within the **3-month (90-day) term**, penalty interest is applied.
- **Penalty Rate**: An **additional 20% per annum** is charged, making the effective rate **40% per annum** on the overdue balance (Resolution PLF-AGM/2023/007).
- **Implementation**: A daily scheduled job will check for loans where `CURRENT_DATE > due_date`. For these loans, the interest calculation will use the 40% penalty rate.
- **Formula**: `Daily Penalty Interest = outstanding_loan_balance * (0.40 / 365)`




## 5. Loan Management Logic

The loan management system will handle the entire lifecycle of a loan, from application to repayment and closure, strictly following the fund's rules.

### 5.1. Loan Application

- **Eligibility**: The system will need to incorporate rules for loan eligibility (e.g., active member status, contribution history). This logic will be defined in consultation with the PLF Executive Committee.
- **Application Process**: Members can apply for a loan through the app, providing all the necessary information as outlined in the `members` table schema (employment, banking, etc.).
- **Submission**: Upon submission, a new record is created in the `loans` table with a status of `pending`.

### 5.2. Loan Approval and Disbursement

- **Approval Workflow**: The loan application will be routed to authorized personnel (e.g., Executive Committee) for approval. The app will provide an interface for them to review the application and approve or reject it.
- **Disbursement**: Once a loan is approved, the status is updated to `approved`. After the funds are transferred to the member, the status changes to `disbursed`, and a `loan_disbursement` transaction is created.

### 5.3. Loan Repayment

- **Repayment Schedule**: The system will generate a repayment schedule based on the 3-month term.
- **Payment Allocation**: When a member makes a payment designated as a loan repayment, the system will update the `amount_paid` in the `loans` table and create a `loan_repayment` transaction.
- **Overdue Loans**: If the loan is not paid by the `due_date`, its status will be changed to `overdue`, triggering the penalty interest calculations as described in the previous section.




## 6. Reporting & Data Logic

The app will provide comprehensive reporting for both members and administrators, drawing data from the structured Supabase tables.

### 6.1. Member-Facing Reports

- **Member Statement**: Each member will be able to view their own statement, which will include:
    - A summary of their `member_balances` (total contributions, interest earned, etc.).
    - A detailed list of all their transactions from the `transactions` table.
    - Their current contribution status from the `contributions` table.
    - Details of any active or past loans from the `loans` table.
- **Data Access**: RLS policies will ensure that members can only view their own data.

### 6.2. Admin and Executive Reports

- **Fund Status Report**: A high-level report for administrators showing the overall financial health of the fund, including total contributions, total loans outstanding, and total interest earned.
- **Member Reports**: Reports on all members, including their contribution status, outstanding balances, and loan performance.
- **Transaction Reports**: Detailed reports of all transactions within a specified period, with filtering options by transaction type, member, etc.
- **Role-Based Access**: Access to these reports will be restricted based on the user's role (`superuser`, `admin`, `executive`).

### 6.3. Data Migration Logic

- **Data Source**: The primary source for historical data is the set of CSV files generated from the `PeoplesLiberatorFundContributions2025App.xlsx` file.
- **Process**: A series of scripts will be developed to migrate this data into the new Supabase schema:
    1. **Members**: Create `members` records from the `plf_data_2024-2025.csv` file, which contains the most up-to-date list of members.
    2. **Contributions**: Iterate through the annual contribution CSVs (e.g., `plf_data_2023-2024.csv`, `plf_data_2022-2023.csv`) to populate the `contributions` and `transactions` tables.
    3. **Balances**: After importing all historical data, a final script will run to calculate and populate the initial `member_balances` for each member.
- **Data Cleansing**: The migration scripts will include logic to handle inconsistencies and data cleaning, such as standardizing date formats and member names.


