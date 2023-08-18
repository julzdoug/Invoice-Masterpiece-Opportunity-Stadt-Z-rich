<template>
  <div>
    <Header />

<div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
  <div class="modal-dialog modal-fullscreen modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Vorhandene Einträge</h1>
        
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Neue Einträge Ertsellen</button>
      <div class="modal-body">
         <selectInvoiceForm />
       
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-bs-dismiss="modal" aria-label="Close">Schliessen</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
  <div class="modal-dialog modal-fullscreen modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">Neue Einträge</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <InvoiceForm />
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Vorhandene</button>
      </div>
    </div>
  </div>
</div>
<button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Rechnung Erstellen</button>

    <Footer />
  </div>
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
  
  mounted() {
    const myModal = document.getElementById('exampleModalToggle');
    const myInput = document.getElementById('myInput');
    
    myModal.addEventListener('shown.bs.modal', () => {
      myInput.focus();
    });
  }

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

/* Style your buttons or any other elements if needed */
button {
  margin-right: 10px;
}
</style>
