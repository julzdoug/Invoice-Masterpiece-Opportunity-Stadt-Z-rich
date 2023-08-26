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
export const googleSignIn = async () => {
  try {

    console.log('handleGoogleSignIn function started');
    const { user, error: googleSignInError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/userinfo.email',
      },
    });
    if (error) throw error;

    console.log('Google Sign-in Data:', data);

    // Handle the signed-in user data or navigate to the appropriate page
    if (data.user) {
      // Set the authentication state
      isAuthenticated.value = true;
      // Store session in localStorage or use it as needed
      localStorage.setItem('session', JSON.stringify(data.session));
      return data.user;
    }
  } catch (error) {
    console.error('Error during Google sign-in:', error.message);
    throw error.message;
  }
};
export const logout = () => {
  localStorage.removeItem('session');


supabase.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_IN") {
    isAuthenticated.value = true;
  } else if (event === "SIGNED_OUT") {
    isAuthenticated.value = false;
  }
});

