import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://xfcyfgduhwcuftrcijta.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmY3lmZ2R1aHdjdWZ0cmNpanRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxMDE4MTcsImV4cCI6MjAyODY3NzgxN30.sTOrXGoSclTtSVIMOSbPWTgHUpwh0wryqhH7vxRmvf0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
