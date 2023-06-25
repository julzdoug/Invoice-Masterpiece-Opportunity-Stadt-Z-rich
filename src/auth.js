// auth.js
import { ref } from 'vue';
import { supabase } from './supabase.js';

// Create a reactive variable to track the authentication state
export const isAuthenticated = ref(false);

// Function to perform login
export const login = async (email, password) => {
  try {
    const { error, data } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) throw error;
    const user = data.user;
    isAuthenticated.value = true; // Update the authentication state
    localStorage.setItem('user', JSON.stringify(user)); // Store the user object in local storage
    return user; // Return the authenticated user object
  } catch (error) {
    throw error.message; // Throw an error message if login fails
  }
};

// Function to check for stored authentication token during app initialization
export const checkAuth = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    isAuthenticated.value = true;
    return user;
  } else {
    isAuthenticated.value = false;
    return null;
  }
};

// Function to clear authentication token and reset the authentication state
export const logout = () => {
  
  localStorage.removeItem('user');
  isAuthenticated.value = false;
};
