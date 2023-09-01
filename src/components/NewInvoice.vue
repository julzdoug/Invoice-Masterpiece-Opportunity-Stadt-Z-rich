<template>
   <div class="container">
    <Header />
    <section class="content">
<div class="d-grid gap-2 col-6 mx-auto">
        <button class="btn btn-outline-light m-2" @click="toggleComponent">
      {{ showVorhandeneComponent ? 'Neue Einträge Erstellen' : 'Vorhandene Einträge' }}
    </button>
    </div>
    <div class="row">
    <div class="" v-if="showVorhandeneComponent">
      <hr>
      <h1 class="fs-4 mt-3 text-light text-center fw-3">Vorhandene Einträge</h1>
      <selectInvoiceForm />
    </div>

    <div v-else>
      <h1 class="fs-5 text-center">Neue Einträge Erstellen</h1>
      <InvoiceForm />
    </div>
  </div>
   </section>
    </div>
   
    <Footer />

</template>

<script>
import { ref } from 'vue';
import selectInvoiceForm from './selectInvoiceForm.vue';
import InvoiceForm from './InvoiceForm.vue';
import Header from "./Header.vue";
import Footer from "./footer.vue";

export default {
  components: {
    selectInvoiceForm,
    InvoiceForm,
    Header,
    Footer,
  },
  
  data() {
    return {
      showVorhandeneComponent: true, // Show Vorhandene Einträge component by default
    };
  },
  methods: {
    toggleComponent() {
      this.showVorhandeneComponent = !this.showVorhandeneComponent;
    },
  },

}
</script>



<style>

.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: rgb(101, 172, 212);
}

Header {
  position: fixed;
  width: 90%;
  top: 0;
  z-index: 1; /* Ensure the header is above other content */
}

.content {
  margin-top: 60px; /* Adjust this margin to match your header's height */
  padding: 20px;
  flex-grow: 1;
}

.table-container {
  overflow-x: auto;
  max-width: 100%;
}

/* Adjust styles for mobile devices */
@media (max-width: 576px) {
  .container {
    margin-top: 20%;
    min-height: 100vh;
  }
}
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


</style>
