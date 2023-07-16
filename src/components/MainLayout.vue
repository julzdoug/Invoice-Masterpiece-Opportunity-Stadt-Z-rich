<template>
    <Header v-if="user" />
<Hero v-if="user" />
<Discription v-if="user" />
<div class="fit">
  <InvoiceForm />
<Footer />
    <Login v-if="!user" @login-success="handleLoginSuccess" />
</div>
</template>

<script>
import { provide, ref, onMounted } from 'vue';

import { createClient } from '@supabase/supabase-js';
import { isAuthenticated } from '../auth.js';
import Header from "./Header.vue";
import Login from "./Login.vue";
import Hero from "./heroSection.vue";
import Discription from "./discription.vue";
import Footer from "./footer.vue";
import InvoiceForm from './InvoiceForm.vue';
// Your Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);



export default {
  components: {
    Header,
    Login,
    Hero,
    Discription,
    Footer,
    InvoiceForm,
  },

  setup(_, { emit }) {
    const user = ref(isAuthenticated.value ? JSON.parse(localStorage.getItem('user')) : null);
    const selectedTable = ref('');
    provide('user', user);

    // After login
    const handleLoginSuccess = (loggedInUser) => {
      user.value = loggedInUser;
    };

    onMounted(() => {
      isAuthenticated.value = !!localStorage.getItem('user');
    });



    return {
      user,
      handleLoginSuccess,

    };
  },
};
</script>


<style scoped>
#app {
  height: 100vh;
}
.fit {
  height:auto;
}




/* .main-content {
  flex: 1;
  height: 100%;
} */

/* .container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
} */
</style>
