import { ref } from 'vue';
import { supabase } from './supabase.js';

// Supabase Angaben für die Authentiefierung
export const isAuthenticated = ref(false);

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
export const login = async (email, password) => {
  try {
    const { error, data } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) throw error;
    const user = data.user;
    isAuthenticated.value = true;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    throw error.message;
  }
};
export const logout = () => {
  localStorage.removeItem('user');
  isAuthenticated.value = false;
};
