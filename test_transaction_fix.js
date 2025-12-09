const { SupabaseTransactionServiceFixed } = require('./src/services/supabaseTransactionService_fixed');
const SupabaseLoanService = require('./src/services/SupabaseLoanService');

async function testDepositFunctionality() {
  console.log('Testing deposit functionality...');
  
  try {
    // Test creating a deposit
    const depositData = {
      memberNumber: 'member 1', // Use an existing member number
      amount: 1000,
      description: 'Test deposit',
      proofOfPayment: 'https://example.com/proof.jpg'
    };

    console.log('Creating deposit with data:', depositData);
    
    const transaction = await SupabaseTransactionServiceFixed.createDeposit(depositData);
    console.log('✅ Deposit created successfully!');
    console.log('Transaction ID:', transaction.transactionId);
    console.log('Status:', transaction.status);
    console.log('Amount:', transaction.amount);
    
    return { success: true, transaction };
  } catch (error) {
    console.error('❌ Error creating deposit:', error.message);
    console.error('Full error:', error);
    return { success: false, error: error.message };
  }
}

async function testLoanFunctionality() {
  console.log('\nTesting loan functionality...');
  
  try {
    // Test creating a loan application
    const loanData = {
      memberNumber: 'member 1', // Use an existing member number
      requestedAmount: 5000,
      loanTerm: 12,
      purpose: 'Test loan application',
      guarantors: [
        { memberNumber: 'member 2', guaranteeAmount: 2500 }
      ],
      employmentInfo: {
        employerName: 'Test Company',
        position: 'Test Position',
        salaryDate: '25th of each month',
        employmentDate: '2020-01-01',
        employerAddress: '123 Test Street',
        employerContact: '011-555-1234'
      },
      bankingDetails: {
        bankName: 'Test Bank',
        accountNumber: '123456789',
        branchCode: '123456',
        accountHolder: 'Test Account Holder'
      },
      nextOfKin: {
        name: 'Test Next of Kin',
        contactNumber: '082-555-6789',
        relationship: 'Spouse'
      }
    };

    console.log('Creating loan application with data:', loanData);
    
    const result = await SupabaseLoanService.applyForLoan(loanData);
    
    if (result.success) {
      console.log('✅ Loan application created successfully!');
      console.log('Loan ID:', result.loanId);
    } else {
      console.error('❌ Error creating loan application:', result.error);
    }
    
    return result;
  } catch (error) {
    console.error('❌ Error creating loan application:', error.message);
    console.error('Full error:', error);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log('=== Testing Transaction Fixes ===\n');
  
  // Test deposit functionality
  const depositResult = await testDepositFunctionality();
  
  // Test loan functionality
  const loanResult = await testLoanFunctionality();
  
  console.log('\n=== Test Summary ===');
  console.log('Deposit test:', depositResult.success ? '✅ PASSED' : '❌ FAILED');
  console.log('Loan test:', loanResult.success ? '✅ PASSED' : '❌ FAILED');
  
  if (depositResult.success && loanResult.success) {
    console.log('\n🎉 All tests passed! Deposit and loan buttons should now work.');
  } else {
    console.log('\n⚠️ Some tests failed. Check the errors above.');
  }
}

// Run tests
runTests().catch(console.error);
