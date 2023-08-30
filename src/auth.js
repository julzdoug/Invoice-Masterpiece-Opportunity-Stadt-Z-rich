import useSupabase from "./supabase";
import { ref } from "vue";
import { useRouter } from "vue-router";

// Use necessary composables

// user is set outside of the useAuthUser function
// so that it will act as global state and always refer to a single user
const user = ref(null);
  const { supabase } = useSupabase();

export default function useAuthUser() {
const router = useRouter();


  /**
   * Login with email and password
   */
  const login = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return user;

  };

  /**
   * Login with refresh token
   * Useful for logging in after email confirmations
   */
  const loginWithRefreshToken = async (token) => {
    const { user, error } = await supabase.auth.signInWithOtp({ refreshToken: token });
    if (error) throw error;

    return user;  
  };

  /**
   * Login with google, github, etc
   */
// auth.js
// ...

const loginWithSocialProvider = async (provider) => {
  console.log(`Logging in with ${provider}...`);
  try {
    await supabase.auth.signInWithOAuth({ provider });
  } catch (error) {
    console.error(error);
  }
};




  /**
   * Logout
   */
  const logout = async () => {
    const { error } = supabase.auth.signOut();
    if (error) throw error;
  };

  /**
   * Check if the user is logged in or not
   */
  const isLoggedIn = () => {
    return !!user.value;
  };

  /**
   * Register*/
   
  const register = async ({ email, password, ...meta }) => {
    const { user, error } = await supabase.auth.signUp(
      { email, password },
      {
        //arbitrary meta data is passed as the second argument under a data key
        // to the Supabase signUp method
        data: meta,
        // the to redirect to after the user confirms their email
        redirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation"`,
      }
    );
    if (error) throw error;
    return user;
  };
 
  /**
   * Update user email, password, or meta data
   */
  const update = async (data) => {
    const { user, error } = await supabase.auth.updateUser(data);
    if (error) throw error;
    return user;
  };

  /**
   * Send user an email to reset their password
   * (ie. support "Forgot Password?")
   */
  const sendPasswordRestEmail = async (email) => {
    const { user, error } = await supabase.auth.resetPasswordForEmail(
      email
    );
    if (error) throw error;
    return user;
  };

  /**
   * Will be useful for informing the application what to do
   * when Supabase redirects a user back to app
   * after confirming email address
   */
  const maybeHandleEmailConfirmation = async (route) => {};
  
    supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
      // User successfully signed in
      user.value = session.user;
      router.push({ name: 'Me' }); // Navigate to the 'Me' page
    }
  });

  return {
    user,
    login,
    loginWithSocialProvider,
    loginWithRefreshToken,
    isLoggedIn,
    logout,
    register,
    update,
    sendPasswordRestEmail,
    maybeHandleEmailConfirmation,
  };
}