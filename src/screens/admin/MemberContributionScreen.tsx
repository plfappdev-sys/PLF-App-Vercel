import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { supabase } from '../../config/supabase';
import { useAuth } from '../../contexts/SupabaseAuthContext';
import { PLFTheme } from '../../theme/colors';

interface Member {
  id: number;
  member_number: string;
  first_name: string;
  last_name: string;
  monthly_contribution: number;
  catch_up_fee: number;
  status: string;
  join_date: string;
}

const MemberContributionScreen: React.FC = () => {
  const { user } = useAuth();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [editContribution, setEditContribution] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (isAdmin) {
      loadMembers();
    }
  }, [isAdmin]);

  const loadMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('id, member_number, first_name, last_name, monthly_contribution, catch_up_fee, status, join_date')
        .order('member_number');

      if (error) {
        console.error('Error loading members:', error);
        Alert.alert('Error', 'Failed to load members');
        return;
      }

      setMembers(data || []);
    } catch (error) {
      console.error('Error loading members:', error);
      Alert.alert('Error', 'Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member: Member) => {
    setEditingMember(member);
    setEditContribution(member.monthly_contribution?.toString() || '200');
  };

  const handleSave = async () => {
    if (!editingMember) return;

    try {
      const contributionAmount = parseFloat(editContribution);
      if (isNaN(contributionAmount) || contributionAmount < 0) {
        Alert.alert('Error', 'Please enter a valid contribution amount');
        return;
      }

      const { error } = await supabase
        .from('members')
        .update({ 
          monthly_contribution: contributionAmount,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingMember.id);

      if (error) {
        console.error('Error updating member contribution:', error);
        Alert.alert('Error', 'Failed to update contribution amount');
        return;
      }

      Alert.alert('Success', 'Contribution amount updated successfully');
      setEditingMember(null);
      setEditContribution('');
      loadMembers();
    } catch (error) {
      console.error('Error updating member contribution:', error);
      Alert.alert('Error', 'Failed to update contribution amount');
    }
  };

  const handleCancelEdit = () => {
    setEditingMember(null);
    setEditContribution('');
  };

  const resetToDefault = async (memberId: number) => {
    try {
      const { error } = await supabase
        .from('members')
        .update({ 
          monthly_contribution: 200.00,
          updated_at: new Date().toISOString()
        })
        .eq('id', memberId);

      if (error) {
        console.error('Error resetting contribution:', error);
        Alert.alert('Error', 'Failed to reset contribution amount');
        return;
      }

      Alert.alert('Success', 'Contribution amount reset to default R200');
      loadMembers();
    } catch (error) {
      console.error('Error resetting contribution:', error);
      Alert.alert('Error', 'Failed to reset contribution amount');
    }
  };

  const filteredMembers = members.filter(member =>
    member.member_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.last_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (amount: number | null | undefined) => {
    const safeAmount = amount || 0;
    return `R ${safeAmount.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA');
  };

  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      active: PLFTheme.colors.success,
      pending: PLFTheme.colors.warning,
      inactive: PLFTheme.colors.error,
      suspended: PLFTheme.colors.error,
    };
    return statusColors[status.toLowerCase()] || PLFTheme.colors.mediumGray;
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
        <Text>Loading members...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Member Contribution Configuration</Text>
        <Text style={styles.subtitle}>Customize monthly contribution amounts per member</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by member number or name..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Members:</Text>
          <Text style={styles.summaryValue}>{members.length}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Custom Contributions:</Text>
          <Text style={styles.summaryValue}>
            {members.filter(m => m.monthly_contribution !== 200).length}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Default (R200):</Text>
          <Text style={styles.summaryValue}>
            {members.filter(m => m.monthly_contribution === 200).length}
          </Text>
        </View>
      </View>

      {filteredMembers.map((member) => (
        <View key={member.id} style={styles.memberCard}>
          <View style={styles.memberHeader}>
            <View>
              <Text style={styles.memberNumber}>{member.member_number}</Text>
              <Text style={styles.memberName}>
                {member.first_name} {member.last_name}
              </Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(member.status) }]}>
              <Text style={styles.statusText}>{member.status}</Text>
            </View>
          </View>

          <View style={styles.memberDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Join Date:</Text>
              <Text style={styles.detailValue}>{formatDate(member.join_date)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Current Contribution:</Text>
              <Text style={[
                styles.contributionValue,
                member.monthly_contribution !== 200 && styles.customContribution
              ]}>
                {formatCurrency(member.monthly_contribution)}
                {member.monthly_contribution !== 200 && ' (Custom)'}
              </Text>
            </View>
            {member.catch_up_fee > 0 && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Catch-up Fee:</Text>
                <Text style={styles.catchUpFee}>{formatCurrency(member.catch_up_fee)}</Text>
              </View>
            )}
          </View>

          {editingMember?.id === member.id ? (
            <View style={styles.editContainer}>
              <Text style={styles.editLabel}>New Monthly Contribution:</Text>
              <TextInput
                style={styles.contributionInput}
                value={editContribution}
                onChangeText={setEditContribution}
                keyboardType="numeric"
                placeholder="Enter amount (e.g., 200.00)"
              />
              
              <View style={styles.editButtons}>
                <TouchableOpacity 
                  style={[styles.button, styles.saveButton]} 
                  onPress={handleSave}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.button, styles.cancelButton]} 
                  onPress={handleCancelEdit}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={[styles.button, styles.editButton]}
                onPress={() => handleEdit(member)}
              >
                <Text style={styles.buttonText}>Edit Contribution</Text>
              </TouchableOpacity>
              
              {member.monthly_contribution !== 200 && (
                <TouchableOpacity 
                  style={[styles.button, styles.resetButton]}
                  onPress={() => resetToDefault(member.id)}
                >
                  <Text style={styles.buttonText}>Reset to R200</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      ))}

      {filteredMembers.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            {searchQuery ? 'No members found matching your search' : 'No members found'}
          </Text>
        </View>
      )}
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
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: PLFTheme.colors.mediumGray,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: PLFTheme.colors.primaryGold,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: PLFTheme.colors.darkGray,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: PLFTheme.colors.primaryGold,
  },
  memberCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  memberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  memberNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PLFTheme.colors.black,
  },
  memberName: {
    fontSize: 14,
    color: PLFTheme.colors.darkGray,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  memberDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: PLFTheme.colors.darkGray,
  },
  detailValue: {
    fontSize: 14,
    color: PLFTheme.colors.black,
    fontWeight: '500',
  },
  contributionValue: {
    fontSize: 14,
    color: PLFTheme.colors.primaryGold,
    fontWeight: '600',
  },
  customContribution: {
    color: PLFTheme.colors.success,
  },
  catchUpFee: {
    fontSize: 14,
    color: PLFTheme.colors.error,
    fontWeight: '500',
  },
  editContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: PLFTheme.colors.lightGray,
  },
  editLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: PLFTheme.colors.black,
    marginBottom: 8,
  },
  contributionInput: {
    backgroundColor: PLFTheme.colors.lightGray,
    borderWidth: 1,
    borderColor: PLFTheme.colors.mediumGray,
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    color: PLFTheme.colors.black,
    marginBottom: 16,
  },
  editButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: PLFTheme.colors.primaryGold,
  },
  resetButton: {
    backgroundColor: PLFTheme.colors.mediumGray,
  },
  saveButton: {
    backgroundColor: PLFTheme.colors.success,
  },
  cancelButton: {
    backgroundColor: PLFTheme.colors.mediumGray,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: PLFTheme.colors.darkGray,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: PLFTheme.colors.error,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default MemberContributionScreen;
