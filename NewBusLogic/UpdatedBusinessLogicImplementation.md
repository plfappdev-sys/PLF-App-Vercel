# Updated PLF Business Logic Implementation
## Based on "LOGICAL CALCULATION 2025-11-11.docx"

## Key Changes from Current Implementation

### 1. Contribution Structure Update
**Current**: R200 × 83 months = R16,600 total
**Updated**: 
- R200 × 72 months (2018/6 to 2024/6) = R14,400.00
- R250 × 12 months (2024/7 to 2025/11) = R3,000.00
- **Total**: R17,400.00 for 84 months

### 2. Penalty Calculation Update
**Current**: 20% loan interest + 40% penalty interest + 7% late fee
**Updated**: 
- **5.5% monthly interest** for late payments
- Formula: `(balance brought forward + current month contribution) × 5.5%`
- Next month penalty: `(amount due + current month contribution) × 5.5%`

### 3. Interest on Savings
**Current**: 5.5% annual interest on positive balances
**Updated**: 5.5% annual interest on positive balances (remains the same)

### 4. Key Principles (Unchanged)
- Negative Balance = Member owes money
- Positive Balance = Member has savings
- Outstanding Amount = |Negative Balance|

## Implementation Plan

### 1. Update Contribution Service
- Implement new contribution structure with rate change from R200 to R250
- Track contributions by financial year with different rates

### 2. Update Penalty Calculation Service
- Replace current penalty system with 5.5% monthly interest
- Implement rolling penalty calculation based on outstanding amounts

### 3. Update Interest Constants
- Update penalty rates to reflect 5.5% monthly interest
- Keep savings interest at 5.5% annual

### 4. Update Member Balance Calculations
- Recalculate member balances based on new penalty logic
- Ensure proper handling of balance brought forward

## Example Member Calculation (Christopher Naude - M006)

### Excel Data (2018/07/01 to June 2025)
- **Expected Contribution**: R200 × 72 months + R250 × 12 months = R17,400.00
- **Balance Brought Forward 2023/24**: R23,667.52
  - Outstanding contribution 2023/24: R2,400.00
  - Penalty 2023/24: R11,469.58
  - Balance brought forward 2022/23: R9,797.52
- **Actual Contribution**: R5,600.00
- **Closing Balance**: R51,965.10
  - 2024/25 outstanding contribution: R2,400.00
  - 2024/25 penalties: R25,897.59

### System Implementation
The updated system will:
1. Calculate expected contributions using the new rate structure
2. Apply 5.5% monthly penalties on outstanding amounts
3. Maintain 5.5% annual interest on positive balances
4. Provide accurate member standing calculations

## Files to Update

1. `src/services/InterestConstants.ts` - Update penalty rates
2. `src/services/InterestCalculationService.ts` - Update penalty calculation logic
3. `src/services/ContributionService.ts` - Update contribution structure
4. `src/services/LateFeeService.ts` - Update late fee calculation
5. `src/services/MemberBalanceService.ts` - Update balance calculations

## Next Steps
1. Update the InterestConstants with new penalty rates
2. Modify the InterestCalculationService to use monthly penalty calculation
3. Update the ContributionService to handle rate changes
4. Test with sample member data
5. Deploy updated logic
