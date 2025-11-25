const { createClient } = require('@supabase/supabase-js');
const XLSX = require('xlsx');

// Supabase configuration - using service role key for admin access
const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
