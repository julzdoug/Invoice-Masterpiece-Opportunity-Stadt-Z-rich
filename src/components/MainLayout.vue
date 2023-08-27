<template>
  <div>
    <Header v-if="!isAuthenticated" />
    <div class="container">
      <component :is="activeComponent" v-if="!isAuthenticated" />
    </div>
    <Hero v-if="!isAuthenticated" />
    <div class="button-section-jumper" v-if="!isAuthenticated">
      <!-- Content specific to unauthenticated users -->
    </div>
    <Discription v-if="isAuthenticated" />
    <div class="button-section-jumper" v-if="isAuthenticated">
      <!-- Content specific to authenticated users -->
    </div>

    <div id="form" class="fit">
      <InvoiceForm v-if="!isAuthenticated" />
      <Footer v-if="!isAuthenticated" />
      <Login v-if="isLoginVisible" @login-success="handleLoginSuccess" />
      <MyInvoice v-if="isAuthenticated" :user="user" />
    </div>
    <div class="scroll-back-to-top" @click="scrollToTop" v-if="isAuthenticated" ref="scrollButton">
      <button class="btn btn-primary btn-sm">Scroll To Top</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { isAuthenticated } from '../auth.js';
import Header from "./Header.vue";
import Login from "./Login.vue";
import Hero from "./heroSection.vue";
import Discription from "./discription.vue";
import Footer from "./footer.vue";
import InvoiceForm from './InvoiceForm.vue';
import MyInvoice from './MyInvoice.vue';

export default {
  components: {
    Header,
    Login,
    Hero,
    Discription,
    Footer,
    InvoiceForm,
    MyInvoice,
  },

  setup(_, { emit }) {
    const user = ref(isAuthenticated.value ? JSON.parse(localStorage.getItem('user')) : null);
    const activeComponent = ref("");
    const isLoginVisible = ref(false);
     // Control whether the Login component is visible
/*   provide('user', user); */
    // After login
    const handleLoginSuccess = (loggedInUser) => {
      user.value = loggedInUser;
      isLoginVisible.value = false; // Hide the login component
    };

    const scrollToTop = () => {
      // Scroll logic here
    };

    onMounted(() => {
      isAuthenticated.value = !!user.value;
      // Additional logic
    });

    return {
      user,
      handleLoginSuccess,
      activeComponent,
      isLoginVisible,
      scrollToTop,
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
.scroll-back-to-top {
  position: fixed;
  bottom: 100px;
  right: 20px;
}
.scroll-back-to-top button {
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
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
