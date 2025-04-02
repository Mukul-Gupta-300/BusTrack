// src/services/authService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://yjscptkgnpsoherhiuqr.supabase.co'; // Replace with your URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlqc2NwdGtnbnBzb2hlcmhpdXFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0Mzg0MzIsImV4cCI6MjA1OTAxNDQzMn0.YuNDYm6nIBf5u_am-USkhwOxa3wlmwOAP25uZEkJ4tc'; // Replace with your key
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const signUpUser = async (email, username, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { username } },
  });
  
  if (error) throw error;
  
  // Check if session exists before trying to store the token
  // By default, Supabase might require email verification before creating a session
  if (data.session) {
    await AsyncStorage.setItem('userToken', data.session.access_token);
    return { ...data, emailConfirmationRequired: false };
  } else {
    // Email confirmation is required
    return { ...data, emailConfirmationRequired: true };
  }
};

export const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  
  if (!data.session) {
    throw new Error('Login failed. Please verify your email first.');
  }
  
  await AsyncStorage.setItem('userToken', data.session.access_token);
  return data;
};

export const logoutUser = async () => {
  await supabase.auth.signOut();
  await AsyncStorage.removeItem('userToken');
  return true;
};

export const getToken = async () => {
  return await AsyncStorage.getItem('userToken');
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
};

export const checkSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  
  if (data.session) {
    await AsyncStorage.setItem('userToken', data.session.access_token);
    return true;
  }
  
  return false;
};

export const resetPassword = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'bustrackingapp://reset-password',
  });
  
  if (error) throw error;
  return data;
};