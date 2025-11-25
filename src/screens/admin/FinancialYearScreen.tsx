import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { supabase } from '../../config/supabase';
import { useAuth } from '../../contexts/SupabaseAuthContext';
import { PLFTheme } from '../../theme/colors';
import { FinancialYear, FinancialYearService } from '../../services/FinancialYearService';

const FinancialYearScreen: React.FC = () => {
  const { user } = useAuth();
  const [financialYears, setFinancialYears] = useState<FinancialYear[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingYear, setEditingYear] = useState<FinancialYear | null>(null);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    savingsRate: '',
    loanRate: '',
    penaltyRate: '',
    isCurrent: false
  });

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (isAdmin) {
      loadFinancialYears();
    }
  }, [isAdmin]);

  const loadFinancialYears = async () => {
    try {
      const years = await FinancialYearService.getAllFinancialYears();
      setFinancialYears(years);
    } catch (error) {
      console.error('Error loading financial years:', error);
      Alert.alert('Error', 'Failed to load financial years');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setFormData({
      startDate: '',
      endDate: '',
      savingsRate: '0.05',
      loanRate: '0.20',
      penaltyRate: '0.40',
      isCurrent: false
    });
    setShowCreateModal(true);
  };

  const handleEdit = (year: FinancialYear) => {
    setEditingYear(year);
    setFormData({
      startDate: year.start_date.toISOString().split('T')[0],
      endDate: year.end_date.toISOString().split('T')[0],
      savingsRate: year.savings_interest_rate.toString(),
      loanRate: year.loan_interest_rate.toString(),
      penaltyRate: year.penalty_interest_rate.toString(),
      isCurrent: year.is_current
    });
    setShowEditModal(true);
  };

  const handleSaveCreate = async () => {
    if (!user?.id) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    try {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      
      if (startDate >= endDate) {
        Alert.alert('Error', 'End date must be after start date');
        return;
      }

      const savingsRate = parseFloat(formData.savingsRate);
      const loanRate = parseFloat(formData.loanRate);
      const penaltyRate = parseFloat(formData.penaltyRate);

      if (isNaN(savingsRate) || isNaN(loanRate) || isNaN(penaltyRate)) {
        Alert.alert('Error', 'Please enter valid interest rates');
        return;
      }

      if (savingsRate < 0 || loanRate < 0 || penaltyRate < 0) {
        Alert.alert('Error', 'Interest rates cannot be negative');
        return;
      }

      const newYear = await FinancialYearService.createFinancialYear(
        startDate,
        endDate,
        savingsRate,
        loanRate,
        penaltyRate,
        formData.isCurrent,
        user.id
      );

      if (!newYear) {
        Alert.alert('Error', 'Failed to create financial year');
        return;
      }

      Alert.alert('Success', 'Financial year created successfully');
      setShowCreateModal(false);
      loadFinancialYears();
    } catch (error) {
      console.error('Error creating financial year:', error);
      Alert.alert('Error', 'Failed to create financial year');
    }
  };

  const handleSaveEdit = async () => {
    if (!editingYear || !user?.id) {
      Alert.alert('Error', 'Invalid operation');
      return;
    }

    try {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      
      if (startDate >= endDate) {
        Alert.alert('Error', 'End date must be after start date');
        return;
      }

      const savingsRate = parseFloat(formData.savingsRate);
      const loanRate = parseFloat(formData.loanRate);
      const penaltyRate = parseFloat(formData.penaltyRate);

      if (isNaN(savingsRate) || isNaN(loanRate) || isNaN(penaltyRate)) {
        Alert.alert('Error', 'Please enter valid interest rates');
        return;
      }

      if (savingsRate < 0 || loanRate < 0 || penaltyRate < 0) {
        Alert.alert('Error', 'Interest rates cannot be negative');
        return;
      }

      const { error } = await supabase
        .from('financial_years')
        .update({
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          savings_interest_rate: savingsRate,
          loan_interest_rate: loanRate,
          penalty_interest_rate: penaltyRate,
          is_current: formData.isCurrent,
          updated_by: user.id,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingYear.id);

      if (error) {
        console.error('Error updating financial year:', error);
        Alert.alert('Error', 'Failed to update financial year');
        return;
      }

      Alert.alert('Success', 'Financial year updated successfully');
      setShowEditModal(false);
      setEditingYear(null);
      FinancialYearService.clearCache();
      loadFinancialYears();
    } catch (error) {
      console.error('Error updating financial year:', error);
      Alert.alert('Error', 'Failed to update financial year');
    }
  };

  const handleSetCurrent = async (year: FinancialYear) => {
    if (!user?.id) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    try {
      // First, unset current flag from all years
      const { error: unsetError } = await supabase
        .from('financial_years')
        .update({ 
          is_current: false,
          updated_by: user.id,
          updated_at: new Date().toISOString()
        })
        .eq('is_current', true);

      if (unsetError) {
        console.error('Error unsetting current year:', unsetError);
        Alert.alert('Error', 'Failed to set current financial year');
        return;
      }

      // Then set the selected year as current
      const { error: setError } = await supabase
        .from('financial_years')
        .update({ 
          is_current: true,
          updated_by: user.id,
          updated_at: new Date().toISOString()
        })
        .eq('id', year.id);

      if (setError) {
        console.error('Error setting current year:', setError);
        Alert.alert('Error', 'Failed to set current financial year');
        return;
      }

      Alert.alert('Success', 'Current financial year set successfully');
      FinancialYearService.clearCache();
      loadFinancialYears();
    } catch (error) {
      console.error('Error setting current financial year:', error);
      Alert.alert('Error', 'Failed to set current financial year');
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatRate = (rate: number) => {
    return `${(rate * 100).toFixed(2)}%`;
  };

  if (!isAdmin) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Access denied. Admin privileges required.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading financial years...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Financial Year Management</Text>
        <Text style={styles.subtitle}>Manage financial years and interest rates</Text>
        
        <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
          <Text style={styles.createButtonText}>+ Create New Financial Year</Text>
        </TouchableOpacity>
      </View>

      {financialYears.map((year) => (
        <View key={year.id} style={[
          styles.yearCard,
          year.is_current && styles.currentYearCard
        ]}>
          <View style={styles.yearHeader}>
            <View style={styles.yearTitleContainer}>
              <Text style={styles.yearTitle}>
                {formatDate(year.start_date)} - {formatDate(year.end_date)}
              </Text>
              {year.is_current && (
                <View style={styles.currentBadge}>
                  <Text style={styles.currentBadgeText}>Current</Text>
                </View>
              )}
            </View>
            
            <View style={styles.yearActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleEdit(year)}
              >
                <Text style={styles.actionButtonText}>Edit</Text>
              </TouchableOpacity>
              
              {!year.is_current && (
                <TouchableOpacity 
                  style={[styles.actionButton, styles.setCurrentButton]}
                  onPress={() => handleSetCurrent(year)}
                >
                  <Text style={styles.actionButtonText}>Set Current</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.ratesContainer}>
            <View style={styles.rateItem}>
              <Text style={styles.rateLabel}>Savings Rate:</Text>
              <Text style={styles.rateValue}>{formatRate(year.savings_interest_rate)}</Text>
            </View>
            
            <View style={styles.rateItem}>
              <Text style={styles.rateLabel}>Loan Rate:</Text>
              <Text style={styles.rateValue}>{formatRate(year.loan_interest_rate)}</Text>
            </View>
            
            <View style={styles.rateItem}>
              <Text style={styles.rateLabel}>Penalty Rate:</Text>
              <Text style={styles.rateValue}>{formatRate(year.penalty_interest_rate)}</Text>
            </View>
          </View>

          <View style={styles.metaContainer}>
            <Text style={styles.metaText}>
              Created: {formatDate(year.created_at)} • Updated: {formatDate(year.updated_at)}
            </Text>
          </View>
        </View>
      ))}

      {financialYears.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No financial years found.</Text>
          <Text style={styles.emptySubtext}>
            Create your first financial year to start managing interest rates.
          </Text>
        </View>
      )}

      {/* Create Modal */}
      <Modal
        visible={showCreateModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Financial Year</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Start Date</Text>
              <TextInput
                style={styles.input}
                value={formData.startDate}
                onChangeText={(text) => setFormData({ ...formData, startDate: text })}
                placeholder="YYYY-MM-DD"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>End Date</Text>
              <TextInput
                style={styles.input}
                value={formData.endDate}
                onChangeText={(text) => setFormData({ ...formData, endDate: text })}
                placeholder="YYYY-MM-DD"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Savings Interest Rate</Text>
              <TextInput
                style={styles.input}
                value={formData.savingsRate}
                onChangeText={(text) => setFormData({ ...formData, savingsRate: text })}
                keyboardType="decimal-pad"
                placeholder="0.05"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Loan Interest Rate</Text>
              <TextInput
                style={styles.input}
                value={formData.loanRate}
                onChangeText={(text) => setFormData({ ...formData, loanRate: text })}
                keyboardType="decimal-pad"
                placeholder="0.20"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Penalty Interest Rate</Text>
              <TextInput
                style={styles.input}
                value={formData.penaltyRate}
                onChangeText={(text) => setFormData({ ...formData, penaltyRate: text })}
                keyboardType="decimal-pad"
                placeholder="0.40"
              />
            </View>

            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setFormData({ ...formData, isCurrent: !formData.isCurrent })}
              >
                <View style={[
                  styles.checkboxInner,
                  formData.isCurrent && styles.checkboxChecked
                ]}>
                  {formData.isCurrent && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxLabel}>Set as current financial year</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowCreateModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveCreate}
              >
                <Text style={styles.modalButtonText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Financial Year</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Start Date</Text>
              <TextInput
                style={styles.input}
                value={formData.startDate}
                onChangeText={(text) => setFormData({ ...formData, startDate: text })}
                placeholder="YYYY-MM-DD"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>End Date</Text>
              <TextInput
                style={styles.input}
                value={formData.endDate}
                onChangeText={(text) => setFormData({ ...formData, endDate: text })}
                placeholder="YYYY-MM-DD"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Savings Interest Rate</Text>
              <TextInput
                style={styles.input}
                value={formData.savingsRate}
                onChangeText={(text) => setFormData({ ...formData, savingsRate: text })}
                keyboardType="decimal-pad"
                placeholder="0.05"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Loan Interest Rate</Text>
              <TextInput
                style={styles.input}
                value={formData.loanRate}
                onChangeText={(text) => setFormData({ ...formData, loanRate: text })}
                keyboardType="decimal-pad"
                placeholder="0.20"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Penalty Interest Rate</Text>
              <TextInput
                style={styles.input}
                value={formData.penaltyRate}
                onChangeText={(text) => setFormData({ ...formData, penaltyRate: text })}
                keyboardType="decimal-pad"
                placeholder="0.40"
              />
            </View>

            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setFormData({ ...formData, isCurrent: !formData.isCurrent })}
              >
                <View style={[
                  styles.checkboxInner,
                  formData.isCurrent && styles.checkboxChecked
                ]}>
                  {formData.isCurrent && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxLabel}>Set as current financial year</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowEditModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveEdit}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PLFTheme.colors.lightGray,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: PLFTheme.colors.primaryGold,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: PLFTheme.colors.darkGray,
    marginBottom: 16,
  },
  createButton: {
    backgroundColor: PLFTheme.colors.primaryGold,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  yearCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentYearCard: {
    borderWidth: 2,
    borderColor: PLFTheme.colors.primaryGold,
  },
  yearHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  yearTitleContainer: {
    flex: 1,
  },
  yearTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: PLFTheme.colors.black,
    marginBottom: 8,
  },
  currentBadge: {
    backgroundColor: PLFTheme.colors.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  currentBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  yearActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    backgroundColor: PLFTheme.colors.primaryGold,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  setCurrentButton: {
    backgroundColor: PLFTheme.colors.success,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  ratesContainer: {
    marginBottom: 12,
  },
  rateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  rateLabel: {
    fontSize: 14,
    color: PLFTheme.colors.darkGray,
    fontWeight: '500',
  },
  rateValue: {
    fontSize: 14,
    color: PLFTheme.colors.primaryGold,
    fontWeight: '600',
  },
  metaContainer: {
    borderTopWidth: 1,
    borderTopColor: PLFTheme.colors.lightGray,
    paddingTop: 12,
  },
  metaText: {
    fontSize: 12,
    color: PLFTheme.colors.mediumGray,
    fontStyle: 'italic',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: PLFTheme.colors.darkGray,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: PLFTheme.colors.mediumGray,
    textAlign: 'center',
    lineHeight: 20,
  },
  errorText: {
    fontSize: 16,
    color: PLFTheme.colors.error,
    textAlign: 'center',
    marginTop: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: PLFTheme.colors.primaryGold,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: PLFTheme.colors.black,
    marginBottom: 8,
  },
  input: {
    backgroundColor: PLFTheme.colors.lightGray,
    borderWidth: 1,
    borderColor: PLFTheme.colors.mediumGray,
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
    color: PLFTheme.colors.black,
  },
  checkboxContainer: {
    marginBottom: 20,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: PLFTheme.colors.primaryGold,
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: PLFTheme.colors.primaryGold,
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
    color: PLFTheme.colors.black,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: PLFTheme.colors.mediumGray,
  },
  saveButton: {
    backgroundColor: PLFTheme.colors.primaryGold,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FinancialYearScreen;
