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
  isAuthenticated.value = session !== null; // Update Auhtentiefierung von Session 
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated.value) {
    next({ name: 'Login' }); // Umleitung wenn nicht angemeldet
  } else if (to.name === 'Login' && isAuthenticated.value) {
    next({ name: 'HelloWorld' }); // Um leitung zum Hauptmenu HelloWorld
  } else {
    next(); // Weiter leiten zu nächste Route
  }
});

app.mount('#app');

