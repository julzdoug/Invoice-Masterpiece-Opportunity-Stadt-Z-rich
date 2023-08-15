import { ref } from 'vue';
import { supabase } from './supabase.js';

// Supabase Angaben für die Authentiefierung
export const isAuthenticated = ref(false);
export const checkAuth = () => {
  const session = JSON.parse(localStorage.getItem('session'));
  if (session && session.user) {
    isAuthenticated.value = true;
    return session.user;
  } else {
    isAuthenticated.value = false;
    return null;
  }
};
export const login = async (email, password) => {
  try {
    const { error, session } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) throw error;

    console.log('Stored Session:', session);

    const user = session.user;
    isAuthenticated.value = true;
    localStorage.setItem('session', JSON.stringify(session));
    return user;
  } catch (error) {
    throw error.message;
  }
};


export const logout = () => {
  localStorage.removeItem('session');
  isAuthenticated.value = false;
};

