import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { supabase } from '../../config/supabase';
import { useAuth } from '../../contexts/SupabaseAuthContext';
import { PLFTheme } from '../../theme/colors';

interface SystemSetting {
  id: number;
  key: string;
  value: any;
  type: string;
  category: string;
  description: string;
  is_public: boolean;
}

interface FeeStatistics {
  totalLateFeesCollected: number;
  totalCatchUpFeesCollected: number;
  outstandingLateFees: number;
  outstandingCatchUpFees: number;
  membersWithLateFees: number;
  membersWithCatchUpFees: number;
}

const FeeManagementScreen: React.FC = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<SystemSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [feeStats, setFeeStats] = useState<FeeStatistics | null>(null);
  const [isLateFeeEnabled, setIsLateFeeEnabled] = useState(true);
  const [isCatchUpFeeEnabled, setIsCatchUpFeeEnabled] = useState(true);

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (isAdmin) {
      loadSettings();
      loadFeeStatistics();
    }
  }, [isAdmin]);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('system_settings')
        .select('*')
        .in('category', ['fees', 'general'])
        .order('key');

      if (error) {
        console.error('Error loading settings:', error);
        Alert.alert('Error', 'Failed to load system settings');
        return;
      }

      setSettings(data || []);

      // Set initial toggle states
      const lateFeeSetting = data?.find(s => s.key === 'late_fee_enabled');
      const catchUpFeeSetting = data?.find(s => s.key === 'catch_up_fee_enabled');
      
      setIsLateFeeEnabled(lateFeeSetting ? lateFeeSetting.value === true : true);
      setIsCatchUpFeeEnabled(catchUpFeeSetting ? catchUpFeeSetting.value === true : true);
    } catch (error) {
      console.error('Error loading settings:', error);
      Alert.alert('Error', 'Failed to load system settings');
    } finally {
      setLoading(false);
    }
  };

  const loadFeeStatistics = async () => {
    try {
      // Get late fee statistics
      const { data: lateFeeData, error: lateFeeError } = await supabase
        .from('members')
        .select('catch_up_fee')
        .gt('catch_up_fee', 0);

      // Get catch-up fee statistics
      const { data: contributionsData, error: contributionsError } = await supabase
        .from('contributions')
        .select('late_fee_amount, late_fee_paid')
        .gt('late_fee_amount', 0);

      if (lateFeeError || contributionsError) {
        console.error('Error loading fee statistics:', lateFeeError || contributionsError);
        return;
      }

      const totalCatchUpFees = lateFeeData?.reduce((sum, member) => sum + (member.catch_up_fee || 0), 0) || 0;
      const outstandingCatchUpFees = totalCatchUpFees; // Assuming catch-up fees are not paid yet

      const lateFeeStats = contributionsData?.reduce((stats, contribution) => {
        stats.total += contribution.late_fee_amount || 0;
        stats.paid += contribution.late_fee_paid || 0;
        return stats;
      }, { total: 0, paid: 0 });

      const statistics: FeeStatistics = {
        totalLateFeesCollected: lateFeeStats?.paid || 0,
        totalCatchUpFeesCollected: 0, // Catch-up fees are not collected yet in current implementation
        outstandingLateFees: (lateFeeStats?.total || 0) - (lateFeeStats?.paid || 0),
        outstandingCatchUpFees: outstandingCatchUpFees,
        membersWithLateFees: new Set(contributionsData?.map(c => c.late_fee_amount > 0)).size,
        membersWithCatchUpFees: lateFeeData?.length || 0
      };

      setFeeStats(statistics);
    } catch (error) {
      console.error('Error loading fee statistics:', error);
    }
  };

  const updateSetting = async (key: string, value: any) => {
    try {
      const { error } = await supabase
        .from('system_settings')
        .update({ 
          value: value,
          updated_at: new Date().toISOString()
        })
        .eq('key', key);

      if (error) {
        console.error('Error updating setting:', error);
        Alert.alert('Error', `Failed to update ${key}`);
        return false;
      }

      Alert.alert('Success', `${key} updated successfully`);
      loadSettings(); // Reload settings to reflect changes
      return true;
    } catch (error) {
      console.error('Error updating setting:', error);
      Alert.alert('Error', `Failed to update ${key}`);
      return false;
    }
  };

  const handleLateFeeToggle = async (value: boolean) => {
    const success = await updateSetting('late_fee_enabled', value);
    if (success) {
      setIsLateFeeEnabled(value);
    }
  };

  const handleCatchUpFeeToggle = async (value: boolean) => {
    const success = await updateSetting('catch_up_fee_enabled', value);
    if (success) {
      setIsCatchUpFeeEnabled(value);
    }
  };

  const processAllCatchUpFees = async () => {
    try {
      Alert.alert(
        'Process Catch-up Fees',
        'This will calculate and apply catch-up fees for all eligible members. Continue?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Process', 
            onPress: async () => {
              // This would call the CatchUpFeeService in a real implementation
              Alert.alert('Info', 'Catch-up fee processing would be implemented here. This feature requires backend processing.');
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error processing catch-up fees:', error);
      Alert.alert('Error', 'Failed to process catch-up fees');
    }
  };

  const waiveAllLateFees = async () => {
    try {
      Alert.alert(
        'Waive All Late Fees',
        'This will waive all outstanding late fees for all members. This action cannot be undone. Continue?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Waive All', 
            style: 'destructive',
            onPress: async () => {
              // This would call the LateFeeService in a real implementation
              Alert.alert('Info', 'Late fee waiver would be implemented here. This feature requires backend processing.');
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error waiving late fees:', error);
      Alert.alert('Error', 'Failed to waive late fees');
    }
  };

  const formatCurrency = (amount: number | null | undefined) => {
    const safeAmount = amount || 0;
    return `R ${safeAmount.toFixed(2)}`;
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
        <Text>Loading fee settings...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fee Management</Text>
        <Text style={styles.subtitle}>Manage late fees and catch-up fees</Text>
      </View>

      {/* Fee Statistics */}
      {feeStats && (
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Fee Statistics</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Late Fees Collected</Text>
              <Text style={styles.statValue}>{formatCurrency(feeStats.totalLateFeesCollected)}</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Outstanding Late Fees</Text>
              <Text style={[styles.statValue, styles.outstanding]}>
                {formatCurrency(feeStats.outstandingLateFees)}
              </Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Catch-up Fees</Text>
              <Text style={styles.statValue}>{formatCurrency(feeStats.outstandingCatchUpFees)}</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Affected Members</Text>
              <Text style={styles.statValue}>
                {feeStats.membersWithLateFees + feeStats.membersWithCatchUpFees}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Fee Configuration */}
      <View style={styles.configCard}>
        <Text style={styles.configTitle}>Fee Configuration</Text>

        <View style={styles.toggleRow}>
          <View style={styles.toggleInfo}>
            <Text style={styles.toggleLabel}>Late Fees (7%)</Text>
            <Text style={styles.toggleDescription}>
              Automatically applied on the 8th of each month for overdue contributions
            </Text>
          </View>
          <Switch
            value={isLateFeeEnabled}
            onValueChange={handleLateFeeToggle}
            trackColor={{ false: PLFTheme.colors.mediumGray, true: PLFTheme.colors.success }}
          />
        </View>

        <View style={styles.toggleRow}>
          <View style={styles.toggleInfo}>
            <Text style={styles.toggleLabel}>Catch-up Fees</Text>
            <Text style={styles.toggleDescription}>
              For members who joined after July 2018, calculated based on months missed
            </Text>
          </View>
          <Switch
            value={isCatchUpFeeEnabled}
            onValueChange={handleCatchUpFeeToggle}
            trackColor={{ false: PLFTheme.colors.mediumGray, true: PLFTheme.colors.success }}
          />
        </View>
      </View>

      {/* Fee Actions */}
      <View style={styles.actionsCard}>
        <Text style={styles.actionsTitle}>Fee Actions</Text>

        <TouchableOpacity 
          style={[styles.actionButton, styles.processButton]}
          onPress={processAllCatchUpFees}
          disabled={!isCatchUpFeeEnabled}
        >
          <Text style={styles.actionButtonText}>Process Catch-up Fees</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.waiveButton]}
          onPress={waiveAllLateFees}
          disabled={!isLateFeeEnabled}
        >
          <Text style={styles.actionButtonText}>Waive All Late Fees</Text>
        </TouchableOpacity>

        <Text style={styles.actionNote}>
          Note: These actions affect all members and should be used carefully.
        </Text>
      </View>

      {/* Current Fee Settings */}
      <View style={styles.settingsCard}>
        <Text style={styles.settingsTitle}>Current Fee Settings</Text>
        
        {settings
          .filter(setting => setting.category === 'fees')
          .map((setting) => (
            <View key={setting.id} style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingKey}>{setting.key}</Text>
                <Text style={styles.settingDescription}>{setting.description}</Text>
              </View>
              <Text style={styles.settingValue}>
                {typeof setting.value === 'boolean' 
                  ? setting.value ? 'Enabled' : 'Disabled'
                  : setting.value.toString()
                }
              </Text>
            </View>
          ))
        }
      </View>
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
  statsCard: {
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
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: PLFTheme.colors.primaryGold,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    width: '48%',
    backgroundColor: PLFTheme.colors.lightGray,
    padding: 12,
    borderRadius: 8,
  },
  statLabel: {
    fontSize: 12,
    color: PLFTheme.colors.darkGray,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: PLFTheme.colors.primaryGold,
  },
  outstanding: {
    color: PLFTheme.colors.error,
  },
  configCard: {
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
  configTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: PLFTheme.colors.primaryGold,
    marginBottom: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: PLFTheme.colors.lightGray,
  },
  toggleInfo: {
    flex: 1,
    marginRight: 16,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: PLFTheme.colors.black,
    marginBottom: 4,
  },
  toggleDescription: {
    fontSize: 12,
    color: PLFTheme.colors.darkGray,
  },
  actionsCard: {
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
  actionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: PLFTheme.colors.primaryGold,
    marginBottom: 16,
  },
  actionButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  processButton: {
    backgroundColor: PLFTheme.colors.primaryGold,
  },
  waiveButton: {
    backgroundColor: PLFTheme.colors.warning,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  actionNote: {
    fontSize: 12,
    color: PLFTheme.colors.darkGray,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  settingsCard: {
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
  settingsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: PLFTheme.colors.primaryGold,
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: PLFTheme.colors.lightGray,
  },
  settingInfo: {
    flex: 1,
  },
  settingKey: {
    fontSize: 14,
    fontWeight: '500',
    color: PLFTheme.colors.black,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    color: PLFTheme.colors.darkGray,
  },
  settingValue: {
    fontSize: 14,
    fontWeight: '600',
    color: PLFTheme.colors.primaryGold,
  },
  errorText: {
    fontSize: 16,
    color: PLFTheme.colors.error,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default FeeManagementScreen;
