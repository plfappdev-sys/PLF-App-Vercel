import React, { useState } from 'react';
import { View, StyleSheet, Image, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { SignUpForm } from '../../types';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../AppSimple';

const SignUpScreen: React.FC = () => {
  const [formData, setFormData] = useState<SignUpForm>({
    email: '',
    password: '',
    confirmPassword: '',
    membershipType: 'new',
    memberNumber: '',
    firstName: '',
    lastName: '',
    idNumber: '',
    phoneNumber: '',
    address: {
      street: '',
      city: '',
      province: '',
      postalCode: ''
    },
    beneficiary: {
      name: '',
      relationship: '',
      contactInfo: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigation = useNavigation();

  const handleSignUp = async () => {
    // Basic validation
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await signup(formData.email, formData.password, {
        personalInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          idNumber: formData.idNumber,
          dateOfBirth: new Date(), // Should be from date picker
          phoneNumber: formData.phoneNumber,
          address: formData.address
        },
        membershipInfo: {
          membershipType: formData.membershipType,
          joinDate: new Date(),
        },
        memberNumber: formData.membershipType === 'existing' ? formData.memberNumber : undefined
      });
      
      Alert.alert('Success', 'Account created successfully! Please wait for verification.');
    } catch (error: any) {
      Alert.alert('Signup Failed', error.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateNestedFormData = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof SignUpForm] as any,
        [field]: value
      }
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back to Login</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>Join People's Liberator Fund</Text>
        
        {/* Basic Information */}
        <Text style={styles.sectionTitle}>Account Information</Text>
        <TextInput
          label="Email *"
          value={formData.email}
          onChangeText={(value) => updateFormData('email', value)}
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          disabled={loading}
        />
        
        <TextInput
          label="Password *"
          value={formData.password}
          onChangeText={(value) => updateFormData('password', value)}
          mode="outlined"
          style={styles.input}
          secureTextEntry
          disabled={loading}
        />
        
        <TextInput
          label="Confirm Password *"
          value={formData.confirmPassword}
          onChangeText={(value) => updateFormData('confirmPassword', value)}
          mode="outlined"
          style={styles.input}
          secureTextEntry
          disabled={loading}
        />

        {/* Membership Type Selection */}
        <Text style={styles.sectionTitle}>Membership Type</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity 
            style={styles.radioOption}
            onPress={() => updateFormData('membershipType', 'new')}
          >
            <View style={styles.radioCircle}>
              {formData.membershipType === 'new' && <View style={styles.radioSelected} />}
            </View>
            <Text style={styles.radioLabel}>New Account</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.radioOption}
            onPress={() => updateFormData('membershipType', 'existing')}
          >
            <View style={styles.radioCircle}>
              {formData.membershipType === 'existing' && <View style={styles.radioSelected} />}
            </View>
            <Text style={styles.radioLabel}>Existing Member</Text>
          </TouchableOpacity>
        </View>

        {formData.membershipType === 'existing' && (
          <TextInput
            label="Member Number *"
            value={formData.memberNumber}
            onChangeText={(value) => updateFormData('memberNumber', value)}
            mode="outlined"
            style={styles.input}
            disabled={loading}
            placeholder="Enter your existing member number"
          />
        )}

        {/* Personal Information */}
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <TextInput
          label="First Name *"
          value={formData.firstName}
          onChangeText={(value) => updateFormData('firstName', value)}
          mode="outlined"
          style={styles.input}
          disabled={loading}
        />
        
        <TextInput
          label="Last Name *"
          value={formData.lastName}
          onChangeText={(value) => updateFormData('lastName', value)}
          mode="outlined"
          style={styles.input}
          disabled={loading}
        />
        
        <TextInput
          label="ID Number"
          value={formData.idNumber}
          onChangeText={(value) => updateFormData('idNumber', value)}
          mode="outlined"
          style={styles.input}
          disabled={loading}
        />
        
        <TextInput
          label="Phone Number"
          value={formData.phoneNumber}
          onChangeText={(value) => updateFormData('phoneNumber', value)}
          mode="outlined"
          style={styles.input}
          keyboardType="phone-pad"
          disabled={loading}
        />

        <Button
          mode="contained"
          onPress={handleSignUp}
          style={styles.button}
          disabled={loading}
          loading={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>

        <Text style={styles.helpText}>
          * Required fields
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  formContainer: {
    padding: 20,
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    color: '#228B22',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B8860B',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#228B22',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 20,
    paddingVertical: 5,
    backgroundColor: '#228B22',
  },
  helpText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 12,
    color: '#666',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#228B22',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#228B22',
  },
  radioLabel: {
    fontSize: 14,
    color: '#333',
  },
});

export default SignUpScreen;
