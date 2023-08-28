import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { supabase } from './supabase.js';
import { isAuthenticated } from './auth.js';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import Modal from "vue-bs-modal";
const app = createApp(App);

app.use(router);

supabase.auth.onAuthStateChange(async (event, session) => {
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


supabase.auth.onAuthStateChange((event, session) => {
  isAuthenticated.value = session !== null;
});

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

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: 'Login' }); // Redirect to Login if not authenticated
  } else {
    next(); // Continue to the requested route
  }
});




app.use(Modal).mount("#app");


