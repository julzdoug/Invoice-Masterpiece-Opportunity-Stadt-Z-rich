<template>
    <Header v-if="user" />
      <div class="container">
    <component :is="activeComponent" v-if="user" />
  </div>
<Hero v-if="user" />
  <div class="button-section-jumper" v-if="user">
    
  </div>
<Discription v-if="user" />
<!-- <editInvoice v-if="user" /> -->
  <div class="button-section-jumper" v-if="user">

  </div>

<div id="form" class="fit">
  <InvoiceForm v-if="user" />
<Footer v-if="user" />
    <Login v-if="!user" @login-success="handleLoginSuccess" />
</div>
  <div class="scroll-back-to-top" @click="scrollToTop" v-if="user" ref="scrollButton">
    <button class="btn btn-primary btn-sm">Scroll To Top</button>
  </div>
  
</template>

<script>
import { provide, ref,  onMounted  } from 'vue';

import { isAuthenticated } from '../auth.js';
import Header from "./Header.vue";
import Login from "./Login.vue";
import Hero from "./heroSection.vue";
import Discription from "./discription.vue";
import Footer from "./footer.vue";
import InvoiceForm from './InvoiceForm.vue';
import MyInvoice from './MyInvoice.vue';
/* import editInvoice from './editInvoice.vue'; */
// Your Supabase configuration




export default {
  components: {
    Header,
    Login,
    Hero,
    Discription,
    Footer,
    InvoiceForm,
    MyInvoice,
/*     editInvoice, */
  },
    methods: {
 // Scroll to top when the button is clicked
    scrollToTop() {
      const scrollButton = this.$refs.scrollButton;
      if (scrollButton) {
        scrollButton.style.display = "none"; // Initially hide the button
      }

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      // Add a scroll event listener to show/hide the button after scrolling
      const handleScroll = () => {
        if (scrollButton) {
          if (window.scrollY > 40) { // Adjust the value as needed
            scrollButton.style.display = "block";
          } else {
            scrollButton.style.display = "none";
          }
        }
      };

      window.addEventListener('scroll', handleScroll);

      // Remove the scroll event listener after scrolling to top
      const handleScrollEnd = () => {
        if (scrollButton) {
          if (window.scrollY === 0) {
            scrollButton.style.display = "block";
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', handleScrollEnd);
          }
        }
      };

      window.addEventListener('scroll', handleScrollEnd);
    },
  },
  

  setup(_, { emit }) {
    const user = ref(isAuthenticated.value ? JSON.parse(localStorage.getItem('user')) : null);
    const selectedTable = ref('');
     const activeComponent = ref("");
    provide('user', user);

    // After login
    const handleLoginSuccess = (loggedInUser) => {
      user.value = loggedInUser;
    };

    
 onMounted(() => {
    isAuthenticated.value = !!user.value;  
  /*  isAuthenticated.value = !!localStorage.getItem('user');  */
  if (isAuthenticated.value) {
    user.value = JSON.parse(localStorage.getItem('user'));
    
  }
});  


    return {
      user,
      handleLoginSuccess,
  activeComponent,
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
