<template>
  <div class="">
    <Header />
<div class="d-grid gap-2 col-6 mx-auto bg-primary bg-opacity-25">
        <button class="btn btn-outline-primary m-2" @click="toggleComponent">
      {{ showVorhandeneComponent ? 'Neue Einträge Erstellen' : 'Vorhandene Einträge' }}
    </button>
    </div>
    <div class="row bg-primary bg-opacity-25 mt-3 me-3 ms-3">
    <div class="" v-if="showVorhandeneComponent">
      <hr>
      <h1 class="fs-4 mt-3 text-center">Vorhandene Einträge</h1>
      <selectInvoiceForm />
    </div>

    <div v-else>
      <h1 class="fs-5 text-center">Neue Einträge Erstellen</h1>
      <InvoiceForm />
    </div>
  </div>
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
