import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { supabase } from './supabase.js';
import { isAuthenticated } from './auth.js';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

const app = createApp(App);

app.use(router);

supabase.auth.onAuthStateChange((event, session) => {
  isAuthenticated.value = session !== null; // Update isAuthenticated based on the session state
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated.value) {
    next({ name: 'Login' }); // Redirect to the login page if not authenticated
  } else if (to.name === 'Login' && isAuthenticated.value) {
    next({ name: 'HelloWorld' }); // Redirect to the HelloWorld page if already authenticated and trying to access the login page
  } else {
    next(); // Continue to the next route
  }
});

app.mount('#app');

