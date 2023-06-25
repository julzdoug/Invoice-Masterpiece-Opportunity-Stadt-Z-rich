<!-- <template>
  <div class="hello-world">
    <Header v-if="user" />
    <main class="d-flex">
      <SideMenu v-if="user" @menu-click="handleMenuClick" />
      <section class="main-content flex-grow-1 d-flex align-items-center justify-content-center">
        <div class="container">
          <router-view v-if="user" />
        </div>
      </section>
    </main>
    <Login v-if="!user" @login-success="handleLoginSuccess" />
  </div>
</template>

<script>
import { provide, ref } from 'vue';
import Header from "./Header.vue";
import SideMenu from "./SideMenu.vue";
import Login from "./Login.vue";
import { isAuthenticated } from '../auth.js';

export default {
  components: {
    Header,
    SideMenu,
    Login,
  },
  setup(_, { emit }) {
     const user = ref(isAuthenticated.value ? JSON.parse(localStorage.getItem('user')) : null); // Set the initial value of user based on isAuthenticated
// Define the 'user' variable using ref

    provide('user', user);

    // Event handler for successful login
    const handleLoginSuccess = (loggedInUser) => {
      user.value = loggedInUser;
    };

    

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

.hello-world {
  width: 100vw;
  height: 100%;
}

.main-content {
  flex: 1;
  height: 100%;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style> -->
<template>
  <div class="hello-world">
    <Header v-if="user" />
    <main class="d-flex">
      <SideMenu v-if="user" @menu-click="handleMenuClick" />
      <section class="main-content flex-grow-1 d-flex align-items-center justify-content-center">
        <div class="container">
          <router-view v-if="user" :customerData="customerData" :selectedTable="selectedTable" />
        </div>
      </section>
    </main>
    <Login v-if="!user" @login-success="handleLoginSuccess" />
  </div>
</template>

<script>
import { provide, ref, onMounted } from 'vue';
import Header from "./Header.vue";
import SideMenu from "./SideMenu.vue";
import Login from "./Login.vue";

import { isAuthenticated } from '../auth.js';
import { createClient } from '@supabase/supabase-js';

// Your Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default {
  components: {
    Header,
    SideMenu,
    Login,
  },
  setup(_, { emit }) {
    const user = ref(isAuthenticated.value ? JSON.parse(localStorage.getItem('user')) : null);
    const selectedTable = ref('');

    provide('user', user);




    // Event handler for successful login
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
/* 
.hello-world {
  width: 100vw;
  height: 100%;
} */

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
