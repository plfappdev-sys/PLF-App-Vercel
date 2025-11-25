import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../../config/supabase';
import { useAuth } from '../../contexts/SupabaseAuthContext';
import { PLFTheme } from '../../theme/colors';

interface SystemSetting {
  id: number;
  key: string;
  value: string;
  type: 'string' | 'number' | 'boolean' | 'json';
  category: 'general' | 'interest' | 'contributions' | 'fees' | 'loans';
  description: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

const SystemSettingsScreen: React.FC = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<SystemSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSetting, setEditingSetting] = useState<SystemSetting | null>(null);
  const [editValue, setEditValue] = useState('');

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (isAdmin) {
      loadSettings();
    }
  }, [isAdmin]);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('system_settings')
        .select('*')
        .order('category')
        .order('key');

      if (error) {
        console.error('Error loading settings:', error);
        Alert.alert('Error', 'Failed to load system settings');
        return;
      }

      setSettings(data || []);
    } catch (error) {
      console.error('Error loading settings:', error);
      Alert.alert('Error', 'Failed to load system settings');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (setting: SystemSetting) => {
    setEditingSetting(setting);
    setEditValue(setting.value);
  };

  const handleSave = async () => {
    if (!editingSetting) return;

    try {
      // Validate based on type
      let validatedValue = editValue;
      
      if (editingSetting.type === 'number') {
        const num = parseFloat(editValue);
        if (isNaN(num)) {
          Alert.alert('Error', 'Please enter a valid number');
          return;
        }
        validatedValue = num.toString();
      } else if (editingSetting.type === 'boolean') {
        validatedValue = editValue.toLowerCase() === 'true' ? 'true' : 'false';
      } else if (editingSetting.type === 'json') {
        try {
          JSON.parse(editValue);
        } catch {
          Alert.alert('Error', 'Please enter valid JSON');
          return;
        }
      }

      const { error } = await supabase
        .from('system_settings')
        .update({ 
          value: validatedValue,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingSetting.id);

      if (error) {
        console.error('Error updating setting:', error);
        Alert.alert('Error', 'Failed to update setting');
        return;
      }

      Alert.alert('Success', 'Setting updated successfully');
      setEditingSetting(null);
      loadSettings();
    } catch (error) {
      console.error('Error updating setting:', error);
      Alert.alert('Error', 'Failed to update setting');
    }
  };

  const handleCancelEdit = () => {
    setEditingSetting(null);
    setEditValue('');
  };

  const getCategoryDisplayName = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      general: 'General Settings',
      interest: 'Interest Rates',
      contributions: 'Contributions',
      fees: 'Fees',
      loans: 'Loans'
    };
    return categoryMap[category] || category;
  };

  const getTypeDisplayName = (type: string) => {
    const typeMap: { [key: string]: string } = {
      string: 'Text',
      number: 'Number',
      boolean: 'True/False',
      json: 'JSON'
    };
    return typeMap[type] || type;
  };

  const formatValue = (setting: SystemSetting) => {
    if (setting.type === 'boolean') {
      return setting.value === 'true' ? 'Yes' : 'No';
    }
    if (setting.type === 'json') {
      return 'JSON Object';
    }
    return setting.value;
  };

  const groupByCategory = (settings: SystemSetting[]) => {
    return settings.reduce((groups, setting) => {
      const category = setting.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(setting);
      return groups;
    }, {} as { [key: string]: SystemSetting[] });
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
        <Text>Loading settings...</Text>
      </View>
    );
  }

  const groupedSettings = groupByCategory(settings);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>System Settings</Text>
        <Text style={styles.subtitle}>Configure application settings and parameters</Text>
      </View>

      {Object.entries(groupedSettings).map(([category, categorySettings]) => (
        <View key={category} style={styles.categorySection}>
          <Text style={styles.categoryTitle}>{getCategoryDisplayName(category)}</Text>
          
          {categorySettings.map((setting) => (
            <View key={setting.id} style={styles.settingCard}>
              <View style={styles.settingHeader}>
                <Text style={styles.settingKey}>{setting.key}</Text>
                <Text style={styles.settingType}>{getTypeDisplayName(setting.type)}</Text>
              </View>
              
              <Text style={styles.settingDescription}>{setting.description}</Text>
              
              {editingSetting?.id === setting.id ? (
                <View style={styles.editContainer}>
                  <Text style={styles.settingLabel}>Value:</Text>
                  <Text style={styles.settingValue}>{formatValue(setting)}</Text>
                  
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>New Value:</Text>
                    <Text style={styles.input}>
                      {editValue}
                    </Text>
                  </View>
                  
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
                <View style={styles.valueContainer}>
                  <Text style={styles.settingLabel}>Value:</Text>
                  <Text style={styles.settingValue}>{formatValue(setting)}</Text>
                  
                  <TouchableOpacity 
                    style={styles.editButton}
                    onPress={() => handleEdit(setting)}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>
      ))}

      {settings.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No system settings found.</Text>
          <Text style={styles.emptySubtext}>
            System settings will be automatically created when the application starts.
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
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: PLFTheme.colors.primaryGold,
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: PLFTheme.colors.secondaryLightGold,
  },
  settingCard: {
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
  settingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  settingKey: {
    fontSize: 16,
    fontWeight: '600',
    color: PLFTheme.colors.black,
  },
  settingType: {
    fontSize: 12,
    color: PLFTheme.colors.mediumGray,
    backgroundColor: PLFTheme.colors.lightGray,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  settingDescription: {
    fontSize: 14,
    color: PLFTheme.colors.darkGray,
    marginBottom: 12,
    lineHeight: 20,
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: PLFTheme.colors.black,
    marginRight: 8,
  },
  settingValue: {
    fontSize: 14,
    color: PLFTheme.colors.primaryGold,
    flex: 1,
  },
  editButton: {
    backgroundColor: PLFTheme.colors.primaryGold,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  editContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: PLFTheme.colors.lightGray,
  },
  inputContainer: {
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
  editButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
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
});

export default SystemSettingsScreen;
