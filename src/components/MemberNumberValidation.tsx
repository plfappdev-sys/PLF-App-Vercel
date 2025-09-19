import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { MemberService } from '../services/supabaseMemberService';
import { Member } from '../types/index';

interface MemberNumberValidationProps {
  onMemberValidated: (memberData: Partial<Member>) => void;
  onMemberNotFound: () => void;
  initialMemberNumber?: string;
}

export const MemberNumberValidation: React.FC<MemberNumberValidationProps> = ({
  onMemberValidated,
  onMemberNotFound,
  initialMemberNumber = ''
}) => {
  const [memberNumber, setMemberNumber] = useState(initialMemberNumber);
  const [isLoading, setIsLoading] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    message?: string;
    memberData?: Partial<Member>;
  } | null>(null);

  const validateMemberNumber = async () => {
    if (!memberNumber.trim()) {
      Alert.alert('Error', 'Please enter a member number');
      return;
    }

    setIsLoading(true);
    setValidationResult(null);

    try {
      const result = await MemberService.validateMemberNumber(memberNumber.trim());

      if (result.isValid && result.memberData) {
        setValidationResult({
          isValid: true,
          message: 'Member number validated successfully!',
          memberData: result.memberData
        });
        onMemberValidated(result.memberData);
      } else {
        setValidationResult({
          isValid: false,
          message: result.error || 'Member number not found'
        });
        onMemberNotFound();
      }
    } catch (error) {
      console.error('Error validating member number:', error);
      setValidationResult({
        isValid: false,
        message: 'Error validating member number. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const checkIfMemberLinked = async () => {
    if (!memberNumber.trim()) return;

    try {
      const isLinked = await MemberService.isMemberNumberLinked(memberNumber.trim());
      if (isLinked) {
        Alert.alert(
          'Account Exists',
          'This member number is already linked to an existing account. Please sign in instead.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error checking member link:', error);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' }}>
        Existing Member Validation
      </Text>
      
      <Text style={{ fontSize: 14, color: '#666', marginBottom: 16 }}>
        If you're an existing member, enter your member number to link your account
      </Text>

      <TextInput
        value={memberNumber}
        onChangeText={setMemberNumber}
        placeholder="Enter your member number (e.g., 123)"
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 8,
          padding: 12,
          fontSize: 16,
          marginBottom: 12,
          backgroundColor: '#fff'
        }}
        keyboardType="numeric"
        onBlur={checkIfMemberLinked}
      />

      <TouchableOpacity
        onPress={validateMemberNumber}
        disabled={isLoading || !memberNumber.trim()}
        style={{
          backgroundColor: isLoading || !memberNumber.trim() ? '#ccc' : '#007AFF',
          padding: 16,
          borderRadius: 8,
          alignItems: 'center'
        }}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>
            Validate Member Number
          </Text>
        )}
      </TouchableOpacity>

      {validationResult && (
        <View
          style={{
            marginTop: 16,
            padding: 12,
            borderRadius: 8,
            backgroundColor: validationResult.isValid ? '#d4edda' : '#f8d7da',
            borderWidth: 1,
            borderColor: validationResult.isValid ? '#c3e6cb' : '#f5c6cb'
          }}
        >
          <Text
            style={{
              color: validationResult.isValid ? '#155724' : '#721c24',
              fontSize: 14
            }}
          >
            {validationResult.message}
          </Text>

          {validationResult.isValid && validationResult.memberData && (
            <View style={{ marginTop: 8 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#155724' }}>
                Member Details:
              </Text>
              <Text style={{ fontSize: 12, color: '#155724' }}>
                Name: {validationResult.memberData.personalInfo?.fullName}
              </Text>
              <Text style={{ fontSize: 12, color: '#155724' }}>
                Balance: R{validationResult.memberData.financialInfo?.currentBalance?.toFixed(2)}
              </Text>
              <Text style={{ fontSize: 12, color: '#155724' }}>
                Status: {validationResult.memberData.membershipStatus?.standingCategory?.replace('_', ' ')}
              </Text>
            </View>
          )}
        </View>
      )}

      {!validationResult && memberNumber.trim() && (
        <Text style={{ fontSize: 12, color: '#666', marginTop: 8, fontStyle: 'italic' }}>
          Press validate to check your member number
        </Text>
      )}
    </View>
  );
};
