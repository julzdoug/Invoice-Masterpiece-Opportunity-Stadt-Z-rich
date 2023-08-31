import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { supabase } from './supabase.js';
import  useAuthUser  from './auth.js';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import Modal from "vue-bs-modal";
const app = createApp(App);

createApp(App).use(router).mount("#app");


