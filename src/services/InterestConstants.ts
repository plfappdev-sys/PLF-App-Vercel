// Official PLF interest rates as per updated business logic (2025-11-11)
// These are used as fallback rates when database is unavailable

export const PLF_INTEREST_RATES = {
  // Savings interest rate: 5.5% p.a. on positive balances
  SAVINGS_INTEREST_RATE: 0.055,
  // Late payment penalty: 5.5% monthly interest on outstanding amounts
  // Formula: (balance brought forward + current month contribution) × 5.5%
  LATE_PENALTY_RATE: 0.055,
  // Loan interest rate: 20% p.a. as per Resolution PLF-AGM/2023/007 (for loans)
  LOAN_INTEREST_RATE: 0.20,
  // Contribution rates (updated per 2025-11-11 document)
  CONTRIBUTION_RATE_2018_2024: 200, // R200 per month (2018/6 to 2024/6)
  CONTRIBUTION_RATE_2024_2025: 250, // R250 per month (2024/7 to 2025/11)
  // Joining fee
  JOINING_FEE: 100
};
