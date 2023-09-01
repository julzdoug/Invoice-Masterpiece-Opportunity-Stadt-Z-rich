<template>
  <div class="app-container">
    <Header />
    <main class="content">
      <Hero />
      <div class="button-section-jumper" ></div>
<Discription  />
<div class="button-section-jumper" ></div>

    </main>
    <div id="form" class="fit mt-2 bg-opacity-25 bg-primary">
  <InvoiceForm />
                      <div class="row text-center">
                    <i class="col bi bi-star"></i>
                    <i class="col bi bi-star"></i>
                    <i class="col bi bi-star"></i>
                    </div>
  </div>
    <Footer />
    <div class="scroll-back-to-top" @click="scrollToTop" ref="scrollButton">
      <button class="btn btn-primary btn-sm">Scroll To Top</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
 import Header from "./Header.vue"; 
import Hero from "./heroSection.vue";
import Discription from "./discription.vue";
import Footer from "./footer.vue";
import InvoiceForm from './InvoiceForm.vue';
import MyInvoice from './MyInvoice.vue';

export default {
  components: {
     Header, 
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
  margin:5vh ;

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

</style>
