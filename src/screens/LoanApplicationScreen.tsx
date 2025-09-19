import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  Title, 
  Card, 
  Text, 
  Button,
  TextInput,
  HelperText,
  ActivityIndicator,
  List,
  Chip
} from 'react-native-paper';
import { useAuth } from '../contexts/SupabaseAuthContext';
import MockLoanService from '../services/MockLoanService';
import RealMemberService from '../services/RealMemberService';
import { Member } from '../types/index';

const LoanApplicationScreen: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [memberFinancialInfo, setMemberFinancialInfo] = useState<{
    currentBalance: number;
    totalContributions: number;
  } | null>(null);
  const [formData, setFormData] = useState({
    requestedAmount: '',
    loanTerm: '12',
    purpose: '',
    guarantors: [] as { memberNumber: string; guaranteeAmount: string }[],
    employmentInfo: {
      employerName: '',
      position: '',
      salaryDate: '',
      employmentDate: '',
      employerAddress: '',
      employerContact: ''
    },
    bankingDetails: {
      bankName: '',
      accountNumber: '',
      branchCode: '',
      accountHolder: ''
    },
    nextOfKin: {
      name: '',
      contactNumber: '',
      relationship: ''
    }
  });
  const [currentGuarantor, setCurrentGuarantor] = useState({
    memberNumber: '',
    guaranteeAmount: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load available members for guarantors and current member's financial info
  React.useEffect(() => {
    const loadData = async () => {
      try {
        // Load all members for guarantor selection
        const allMembers = await RealMemberService.getAllMembers();
        // Filter out current user and members who are already added as guarantors
        const availableMembers = allMembers.filter(member => 
          member.memberNumber !== currentUser?.memberNumber &&
          !formData.guarantors.some(g => g.memberNumber === member.memberNumber)
        );
        setMembers(availableMembers);

        // Load current member's financial information if they have a member number
        if (currentUser?.memberNumber) {
          const memberData = await RealMemberService.getMemberByNumber(currentUser.memberNumber);
          if (memberData) {
            setMemberFinancialInfo({
              currentBalance: memberData.financialInfo.currentBalance,
              totalContributions: memberData.financialInfo.totalContributions
            });
          }
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, [formData.guarantors, currentUser?.memberNumber]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.requestedAmount || parseFloat(formData.requestedAmount) <= 0) {
      newErrors.requestedAmount = 'Please enter a valid loan amount';
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose = 'Please specify the purpose of the loan';
    }

    if (formData.guarantors.length === 0) {
      newErrors.guarantors = 'At least one guarantor is required';
    }

    // Validate employment information
    if (!formData.employmentInfo.employerName.trim()) {
      newErrors.employerName = 'Employer name is required';
    }
    if (!formData.employmentInfo.position.trim()) {
      newErrors.position = 'Position is required';
    }
    if (!formData.employmentInfo.salaryDate.trim()) {
      newErrors.salaryDate = 'Salary date is required';
    }
    if (!formData.employmentInfo.employmentDate.trim()) {
      newErrors.employmentDate = 'Employment date is required';
    }
    if (!formData.employmentInfo.employerAddress.trim()) {
      newErrors.employerAddress = 'Employer address is required';
    }
    if (!formData.employmentInfo.employerContact.trim()) {
      newErrors.employerContact = 'Employer contact is required';
    }

    // Validate banking details
    if (!formData.bankingDetails.bankName.trim()) {
      newErrors.bankName = 'Bank name is required';
    }
    if (!formData.bankingDetails.accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required';
    }
    if (!formData.bankingDetails.branchCode.trim()) {
      newErrors.branchCode = 'Branch code is required';
    }
    if (!formData.bankingDetails.accountHolder.trim()) {
      newErrors.accountHolder = 'Account holder name is required';
    }

    // Validate next of kin
    if (!formData.nextOfKin.name.trim()) {
      newErrors.nextOfKinName = 'Next of kin name is required';
    }
    if (!formData.nextOfKin.contactNumber.trim()) {
      newErrors.nextOfKinContact = 'Next of kin contact number is required';
    }
    if (!formData.nextOfKin.relationship.trim()) {
      newErrors.nextOfKinRelationship = 'Relationship is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddGuarantor = () => {
    if (!currentGuarantor.memberNumber || !currentGuarantor.guaranteeAmount) {
      Alert.alert('Error', 'Please fill in all guarantor fields');
      return;
    }

    const guaranteeAmount = parseFloat(currentGuarantor.guaranteeAmount);
    if (guaranteeAmount <= 0) {
      Alert.alert('Error', 'Guarantee amount must be positive');
      return;
    }

    setFormData(prev => ({
      ...prev,
      guarantors: [
        ...prev.guarantors,
        {
          memberNumber: currentGuarantor.memberNumber,
          guaranteeAmount: currentGuarantor.guaranteeAmount
        }
      ]
    }));

    setCurrentGuarantor({ memberNumber: '', guaranteeAmount: '' });
  };

  const handleRemoveGuarantor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      guarantors: prev.guarantors.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    if (!currentUser?.memberNumber) {
      Alert.alert('Error', 'Member number not found');
      return;
    }

    setLoading(true);
    try {
      const result = await MockLoanService.applyForLoan({
        memberNumber: currentUser.memberNumber,
        requestedAmount: parseFloat(formData.requestedAmount),
        loanTerm: parseInt(formData.loanTerm),
        purpose: formData.purpose,
        guarantors: formData.guarantors.map(g => ({
          memberNumber: g.memberNumber,
          guaranteeAmount: parseFloat(g.guaranteeAmount)
        })),
        employmentInfo: formData.employmentInfo,
        bankingDetails: formData.bankingDetails,
        nextOfKin: formData.nextOfKin
      });

      if (result.success) {
        Alert.alert(
          'Success', 
          'Loan application submitted successfully! It will be reviewed by an administrator.',
          [{ text: 'OK', onPress: () => {
            // Reset form
            setFormData({
              requestedAmount: '',
              loanTerm: '12',
              purpose: '',
              guarantors: [],
              employmentInfo: {
                employerName: '',
                position: '',
                salaryDate: '',
                employmentDate: '',
                employerAddress: '',
                employerContact: ''
              },
              bankingDetails: {
                bankName: '',
                accountNumber: '',
                branchCode: '',
                accountHolder: ''
              },
              nextOfKin: {
                name: '',
                contactNumber: '',
                relationship: ''
              }
            });
          }}]
        );
      } else {
        Alert.alert('Error', result.error || 'Failed to submit loan application');
      }
    } catch (error) {
      console.error('Error submitting loan application:', error);
      Alert.alert('Error', 'Failed to submit loan application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number | undefined | null) => {
    const safeAmount = amount || 0;
    return `R ${safeAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
  };


  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <Title style={styles.headerTitle}>Apply for a Loan</Title>
          <Text style={styles.headerSubtitle}>
            Complete this form to apply for a loan from the fund
          </Text>
          
          {memberFinancialInfo && (
            <View style={styles.loanInfo}>
              <Text style={styles.loanInfoText}>
                Current Balance: {formatCurrency(memberFinancialInfo.currentBalance)}
              </Text>
              <Text style={styles.loanInfoText}>
                Maximum Loan Eligibility: {formatCurrency(memberFinancialInfo.currentBalance * 0.7)}
              </Text>
            </View>
          )}
        </Card.Content>
      </Card>

      {/* Loan Details */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Loan Details</Title>
          
          <TextInput
            label="Requested Loan Amount *"
            value={formData.requestedAmount}
            onChangeText={(text) => setFormData(prev => ({ ...prev, requestedAmount: text }))}
            keyboardType="numeric"
            style={styles.input}
            error={!!errors.requestedAmount}
            left={<TextInput.Affix text="R " />}
          />
          {errors.requestedAmount && (
            <HelperText type="error">{errors.requestedAmount}</HelperText>
          )}

          <TextInput
            label="Loan Term (months) *"
            value={formData.loanTerm}
            onChangeText={(text) => setFormData(prev => ({ ...prev, loanTerm: text }))}
            keyboardType="numeric"
            style={styles.input}
            placeholder="e.g., 12"
          />

          <TextInput
            label="Purpose of Loan *"
            value={formData.purpose}
            onChangeText={(text) => setFormData(prev => ({ ...prev, purpose: text }))}
            style={styles.input}
            multiline
            numberOfLines={3}
            error={!!errors.purpose}
            placeholder="Describe what the loan will be used for..."
          />
          {errors.purpose && (
            <HelperText type="error">{errors.purpose}</HelperText>
          )}
        </Card.Content>
      </Card>

      {/* Employment Information */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Employment Information</Title>
          
          <TextInput
            label="Employer Name *"
            value={formData.employmentInfo.employerName}
            onChangeText={(text) => setFormData(prev => ({ 
              ...prev, 
              employmentInfo: { ...prev.employmentInfo, employerName: text } 
            }))}
            style={styles.input}
            placeholder="Enter your employer's name"
            error={!!errors.employerName}
          />
          {errors.employerName && (
            <HelperText type="error">{errors.employerName}</HelperText>
          )}

          <TextInput
            label="Position *"
            value={formData.employmentInfo.position}
            onChangeText={(text) => setFormData(prev => ({ 
              ...prev, 
              employmentInfo: { ...prev.employmentInfo, position: text } 
            }))}
            style={styles.input}
            placeholder="Enter your job position"
            error={!!errors.position}
          />
          {errors.position && (
            <HelperText type="error">{errors.position}</HelperText>
          )}

          <TextInput
            label="Salary Date *"
            value={formData.employmentInfo.salaryDate}
            onChangeText={(text) => setFormData(prev => ({ 
              ...prev, 
              employmentInfo: { ...prev.employmentInfo, salaryDate: text } 
            }))}
            style={styles.input}
            placeholder="e.g., 25th of each month"
            error={!!errors.salaryDate}
          />
          {errors.salaryDate && (
            <HelperText type="error">{errors.salaryDate}</HelperText>
          )}

          <TextInput
            label="Employment Date *"
            value={formData.employmentInfo.employmentDate}
            onChangeText={(text) => setFormData(prev => ({ 
              ...prev, 
              employmentInfo: { ...prev.employmentInfo, employmentDate: text } 
            }))}
            style={styles.input}
            placeholder="e.g., 2020-03-15"
            error={!!errors.employmentDate}
          />
          {errors.employmentDate && (
            <HelperText type="error">{errors.employmentDate}</HelperText>
          )}

          <TextInput
            label="Employer Address *"
            value={formData.employmentInfo.employerAddress}
            onChangeText={(text) => setFormData(prev => ({ 
              ...prev, 
              employmentInfo: { ...prev.employmentInfo, employerAddress: text } 
            }))}
            style={styles.input}
            multiline
            numberOfLines={2}
            placeholder="Enter employer's address"
            error={!!errors.employerAddress}
          />
          {errors.employerAddress && (
            <HelperText type="error">{errors.employerAddress}</HelperText>
          )}

          <TextInput
            label="Employer Contact *"
            value={formData.employmentInfo.employerContact}
            onChangeText={(text) => setFormData(prev => ({ 
              ...prev, 
              employmentInfo: { ...prev.employmentInfo, employerContact: text } 
            }))}
            style={styles.input}
            placeholder="e.g., 011-555-1234"
            error={!!errors.employerContact}
          />
          {errors.employerContact && (
            <HelperText type="error">{errors.employerContact}</HelperText>
          )}
        </Card.Content>
      </Card>

      {/* Banking Details */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Banking Details</Title>
          
          <TextInput
            label="Bank Name *"
            value={formData.bankingDetails.bankName}
            onChangeText={(text) => setFormData(prev => ({ 
              ...prev, 
              bankingDetails: { ...prev.bankingDetails, bankName: text } 
            }))}
            style={styles.input}
            placeholder="e.g., FNB, Standard Bank, etc."
            error={!!errors.bankName}
          />
          {errors.bankName && (
            <HelperText type="error">{errors.bankName}</HelperText>
          )}

          <TextInput
            label="Account Number *"
            value={formData.bankingDetails.accountNumber}
            onChangeText={(text) => setFormData(prev => ({ 
              ...prev, 
              bankingDetails: { ...prev.bankingDetails, accountNumber: text } 
            }))}
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter your account number"
            error={!!errors.accountNumber}
          />
          {errors.accountNumber && (
            <HelperText type="error">{errors.accountNumber}</HelperText>
          )}

          <TextInput
            label="Branch Code *"
            value={formData.bankingDetails.branchCode}
            onChangeText={(text) => setFormData(prev => ({ 
              ...prev, 
              bankingDetails: { ...prev.bankingDetails, branchCode: text } 
            }))}
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter branch code"
            error={!!errors.branchCode}
          />
          {errors.branchCode && (
            <HelperText type="error">{errors.branchCode}</HelperText>
          )}

          <TextInput
            label="Account Holder Name *"
            value={formData.bankingDetails.accountHolder}
            onChangeText={(text) => setFormData(prev => ({ 
              ...prev, 
              bankingDetails: { ...prev.bankingDetails, accountHolder: text } 
            }))}
            style={styles.input}
            placeholder="Name as it appears on bank account"
            error={!!errors.accountHolder}
          />
          {errors.accountHolder && (
            <HelperText type="error">{errors.accountHolder}</HelperText>
          )}
        </Card.Content>
      </Card>

      {/* Next of Kin */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Next of Kin Information</Title>
          
          <TextInput
            label="Next of Kin Name *"
            value={formData.nextOfKin.name}
            onChangeText={(text) => setFormData(prev => ({ 
              ...prev, 
              nextOfKin: { ...prev.nextOfKin, name: text } 
            }))}
            style={styles.input}
            placeholder="Full name of next of kin"
            error={!!errors.nextOfKinName}
          />
          {errors.nextOfKinName && (
            <HelperText type="error">{errors.nextOfKinName}</HelperText>
          )}

          <TextInput
            label="Contact Number *"
            value={formData.nextOfKin.contactNumber}
            onChangeText={(text) => setFormData(prev => ({ 
              ...prev, 
              nextOfKin: { ...prev.nextOfKin, contactNumber: text } 
            }))}
            style={styles.input}
            keyboardType="phone-pad"
            placeholder="e.g., 082-555-6789"
            error={!!errors.nextOfKinContact}
          />
          {errors.nextOfKinContact && (
            <HelperText type="error">{errors.nextOfKinContact}</HelperText>
          )}

          <TextInput
            label="Relationship *"
            value={formData.nextOfKin.relationship}
            onChangeText={(text) => setFormData(prev => ({ 
              ...prev, 
              nextOfKin: { ...prev.nextOfKin, relationship: text } 
            }))}
            style={styles.input}
            placeholder="e.g., Spouse, Parent, Sibling"
            error={!!errors.nextOfKinRelationship}
          />
          {errors.nextOfKinRelationship && (
            <HelperText type="error">{errors.nextOfKinRelationship}</HelperText>
          )}
        </Card.Content>
      </Card>

      {/* Guarantors */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Guarantors</Title>
          <Text style={styles.sectionDescription}>
            Add at least one member who will guarantee your loan. Each guarantor must agree to cover 
            a portion of the loan amount if you are unable to repay.
          </Text>

          {/* Current Guarantor Input */}
          <View style={styles.guarantorInput}>
            <TextInput
              label="Guarantor Member Number"
              value={currentGuarantor.memberNumber}
              onChangeText={(text) => setCurrentGuarantor(prev => ({ ...prev, memberNumber: text }))}
              style={styles.guarantorInputField}
              placeholder="e.g., member 2"
            />
            <TextInput
              label="Guarantee Amount"
              value={currentGuarantor.guaranteeAmount}
              onChangeText={(text) => setCurrentGuarantor(prev => ({ ...prev, guaranteeAmount: text }))}
              keyboardType="numeric"
              style={styles.guarantorInputField}
              left={<TextInput.Affix text="R " />}
              placeholder="Amount"
            />
            <Button 
              mode="outlined" 
              onPress={handleAddGuarantor}
              style={styles.addButton}
              disabled={!currentGuarantor.memberNumber || !currentGuarantor.guaranteeAmount}
            >
              Add
            </Button>
          </View>

          {/* Guarantors List */}
          {formData.guarantors.length > 0 ? (
            <View style={styles.guarantorsList}>
              <Text style={styles.guarantorsTitle}>Added Guarantors:</Text>
              {formData.guarantors.map((guarantor, index) => {
                const member = members.find(m => m.memberNumber === guarantor.memberNumber);
                return (
                  <View key={index} style={styles.guarantorItem}>
                    <View style={styles.guarantorInfo}>
                      <Text style={styles.guarantorName}>
                        {member ? `Member ${guarantor.memberNumber}` : `Member ${guarantor.memberNumber}`}
                      </Text>
                      <Text style={styles.guarantorAmount}>
                        Guarantee: R {(parseFloat(guarantor.guaranteeAmount) || 0).toLocaleString('en-ZA')}
                      </Text>
                    </View>
                    <Button 
                      mode="text" 
                      onPress={() => handleRemoveGuarantor(index)}
                      textColor="#F44336"
                    >
                      Remove
                    </Button>
                  </View>
                );
              })}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No guarantors added yet</Text>
            </View>
          )}

          {errors.guarantors && (
            <HelperText type="error">{errors.guarantors}</HelperText>
          )}
        </Card.Content>
      </Card>

      {/* Available Members for Reference */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Available Members</Title>
          <Text style={styles.sectionDescription}>
            These members are available to be added as guarantors:
          </Text>

          {members.length > 0 ? (
            <View style={styles.membersList}>
              {members.slice(0, 5).map((member) => (
                <Chip
                  key={member.memberNumber}
                  style={styles.memberChip}
                  onPress={() => setCurrentGuarantor(prev => ({ 
                    ...prev, 
                    memberNumber: member.memberNumber 
                  }))}
                >
                  Member {member.memberNumber} - {formatCurrency(member.financialInfo.currentBalance)}
                </Chip>
              ))}
              {members.length > 5 && (
                <Text style={styles.moreMembersText}>
                  + {members.length - 5} more members available...
                </Text>
              )}
            </View>
          ) : (
            <Text style={styles.noMembersText}>
              No available members found for guarantor selection
            </Text>
          )}
        </Card.Content>
      </Card>

      {/* Submit Button */}
      <Card style={styles.card}>
        <Card.Content>
          <Button 
            mode="contained" 
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            style={styles.submitButton}
            icon="send"
          >
            Submit Loan Application
          </Button>

          <Text style={styles.termsText}>
            By submitting this application, you agree to the terms and conditions of the fund. 
            Loan approval is subject to executive committee review and available funds.
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerCard: {
    margin: 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  loanInfo: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#e8f5e8',
    borderRadius: 8,
  },
  loanInfoText: {
    fontSize: 14,
    color: '#2e7d32',
    marginBottom: 4,
  },
  card: {
    margin: 20,
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 15,
    color: '#333',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  input: {
    marginBottom: 15,
  },
  guarantorInput: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  guarantorInputField: {
    flex: 1,
  },
  addButton: {
    alignSelf: 'flex-end',
  },
  guarantorsList: {
    marginTop: 10,
  },
  guarantorsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  guarantorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
  },
  guarantorInfo: {
    flex: 1,
  },
  guarantorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  guarantorAmount: {
    fontSize: 12,
    color: '#666',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  membersList: {
    gap: 8,
  },
  memberChip: {
    marginBottom: 5,
  },
  moreMembersText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  noMembersText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  submitButton: {
    marginBottom: 15,
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default LoanApplicationScreen;
