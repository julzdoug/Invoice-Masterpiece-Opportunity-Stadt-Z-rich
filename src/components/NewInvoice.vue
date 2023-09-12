<template>
  <div class="page-container back">
    <Header />
    <section class="content ms-3 me-3 back">
      <selectInvoiceForm />

  </section>
    <Footer />
</div>
</template>

<script>
import { ref } from 'vue';
import selectInvoiceForm from './selectInvoiceForm.vue';

import Header from "./Header.vue";
import Footer from "./footer.vue";

export default {
  components: {
    selectInvoiceForm,
    
    Header,
    Footer,
  },
  


}
</script>



<style>
/* Style your modal overlay */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Style your modal content */
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}


.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the page takes at least the full viewport height */
}

.content {
  border-top: 1px solid #ccc; /* You can adjust the border style and color */
  padding-top: 20vh; 
}





.custom-select {
  height: 38px;
  width: 50%;
  
}

.back {
  background-color: rgb(192, 212, 249);
}


</style>
