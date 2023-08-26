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
        scopes: 'https://www.googleapis.com/auth/userinfo.email'
      }
    });
    console.log('User data retrieved:', user); // Corrected logging

    if (googleSignInError) {
      throw googleSignInError;
    }

if (user) {
  const userToStore = {
    id: user.id,
    aud: user.aud,
    role: user.role,
    // ... add other necessary properties
    
  };

  localStorage.setItem('user', JSON.stringify(userToStore));
  router.push('/');
}

  } catch (error) {
    console.error('Error during Google sign-in:', error.message);
  }
};

export const fetchUser = async () => {
  try {
    const { user: authUser } = await supabase.auth.getSession();
    console.log('Stored User:', authUser);
    localStorage.setItem('session', JSON.stringify({ user: authUser }));
    user.value = authUser; // Update the user state

    // Fetch additional user data from Supabase and update the user state
    const userData = await fetchUserDataFromSupabase(authUser.email, authUser.id);
    if (userData) {
      user.value = { ...authUser, ...userData }; // Merge authUser and userData
    }
  } catch (error) {
    console.error('Error fetching user:', error.message);
  }
};

export const fetchUserDataFromSupabase = async (email, userId) => {
  try {
    const { data: userData, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email) // Fetch user data by email
      .single(); // Retrieve a single row

    if (error) {
      throw error;
    }

    return userData;
  } catch (error) {
    throw error;
  }
};
  localStorage.removeItem('session');


supabase.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_IN") {
    isAuthenticated.value = true;
  } else if (event === "SIGNED_OUT") {
    isAuthenticated.value = false;
  }
});

