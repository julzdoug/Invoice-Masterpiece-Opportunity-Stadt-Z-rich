<template>
     <Header /> 
      <div class="container mt-2 ">
    <component :is="activeComponent" />
  </div>
<Hero  />
  <div class="button-section-jumper" >
    
  </div>
<Discription  />
<!-- <editInvoice v-if="user" /> -->
  <div class="button-section-jumper" >

  </div>

<div id="form" class="fit">
  <InvoiceForm />
<Footer />
  <!--   <Login v-if="!user" @login-success="handleLoginSuccess" /> -->
</div>
  <div class="scroll-back-to-top" @click="scrollToTop"  ref="scrollButton">
    <button class="btn btn-primary btn-sm">Scroll To Top</button>
  </div>
</template>

<script>
import { ref } from 'vue';

 import Header from "./Header.vue"; 
/* import Login from "./Login.vue"; */
import Hero from "./heroSection.vue";
import Discription from "./discription.vue";
import Footer from "./footer.vue";
import InvoiceForm from './InvoiceForm.vue';
import MyInvoice from './MyInvoice.vue';

export default {
  components: {
     Header, 
/*     Login, */
    Hero,
    Discription,
    Footer,
    InvoiceForm,
    MyInvoice,
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
