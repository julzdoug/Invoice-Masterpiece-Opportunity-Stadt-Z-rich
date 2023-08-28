import { ref } from 'vue';
import { supabase } from './supabase.js';
import router from './router';

// Supabase Angaben für die Authentiefierung
export const isAuthenticated = ref(false);
export const user = ref(JSON.parse(localStorage.getItem('user')) || null);


/* supabase.auth.onAuthStateChange(async (event, session) => {
  isAuthenticated.value = session !== null;
  if (session && session.user_metadata) {
    if (session.user_metadata.provider === 'google') {
      const userData = await fetchUserDataFromSupabase(session.user.email, session.user.id);
      if (userData) {
        user.value = { ...session.user, ...userData };
      } else {
        user.value = session.user;
      }
    }
  }
});

export const googleSignIn = async () => {
try {
    const { user, error: googleSignInError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/userinfo.email'
      }
    });

    if (googleSignInError) {
      throw googleSignInError;
    }

    if (user) {
      // Fetch user data from Supabase based on the email
      const { data: userData, error: userDataError } = await supabase
        .from('users')
        .select('*')
        .eq('email', user.email)
        .limit(1);

      if (userDataError) {
        throw userDataError;
      }

      if (userData && userData.length > 0) {
        // User already exists in Supabase table
        isAuthenticated.value = true;
        localStorage.setItem('user', JSON.stringify(user));

        // Emit the login-success event with the signed-in user
        emit('login-success', user);

        // Redirect after successful sign-in
        router.push('/');
      } else {
        // User is signing in for the first time using Google
        const { error: createUserError } = await supabase
          .from('users')
          .upsert([
            {
              email: user.email,
              // You can set additional metadata here if needed
              // For example, provider information
              app_metadata: {
                provider: 'google',
                providers: [{ provider_id: user.id }],
              },
            },
          ]);

        if (createUserError) {
          throw createUserError;
        }

        isAuthenticated.value = true;
        localStorage.setItem('user', JSON.stringify(user));

        // Redirect after successful sign-in
        router.push('/');
      }
    }
  } catch (error) {
    console.error('Error during Google sign-in:', error.message);
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
}; */




 supabase.auth.onAuthStateChange((event, session) => {
  isAuthenticated.value = session !== null;

  if (session && session.user_metadata) {
    const { provider } = session.user_metadata;
    if (provider === 'google') {
      // User signed in with Google
      localStorage.setItem('user', JSON.stringify(session.user));
      
    }
  }
});


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
   user.value = userToStore; // Update the ref

// Trigger events or navigation
isAuthenticated.value = true;
router.push("/");
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
 