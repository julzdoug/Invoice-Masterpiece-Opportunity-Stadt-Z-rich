<template>
  <div class="">
    <Header />
<div class="d-grid gap-2 col-11 mx-auto bg-primary bg-opacity-25 topper">
      <hr>
      <selectInvoiceForm />
  </div>
    </div>
  
    <Footer />

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

.topper {
    flex-grow: 1; /* Allow the content section to grow and take remaining vertical space */
  overflow-y: auto; /* Add vertical scroll if content overflows */
  margin-top:15vh;
}
.back {
  background-color: rgb(192, 212, 249);
}

</style>
