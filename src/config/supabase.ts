import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Supabase project configuration
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ0ODQsImV4cCI6MjA3MzYwMDQ4NH0.s_AXhoRM9tV4F166Bhd5fG7Z14kLA0iz0l08dlzZvnM';

// Create Supabase client with session persistence using AsyncStorage for React Native
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false, // Disable URL detection for React Native
    storage: {
      getItem: async (key) => {
        try {
          const value = await AsyncStorage.getItem(key);
          return value;
        } catch (error) {
          console.warn('AsyncStorage get error:', error);
          return null;
        }
      },
      setItem: async (key, value) => {
        try {
          await AsyncStorage.setItem(key, value);
        } catch (error) {
          console.warn('AsyncStorage set error:', error);
        }
      },
      removeItem: async (key) => {
        try {
          await AsyncStorage.removeItem(key);
        } catch (error) {
          console.warn('AsyncStorage remove error:', error);
        }
      },
    },
  },
});

// Test connection function
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('_test_connection').select('count').limit(1);
    
    if (error) {
      // Table doesn't exist, but that's okay - we just want to test the connection
      if (error.code === '42P01') {
        console.log('✅ Supabase connection successful (table not found expected)');
        return true;
      }
      console.error('❌ Supabase connection error:', error.message);
      return false;
    }
    
    console.log('✅ Supabase connection successful');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection failed:', error);
    return false;
  }
};