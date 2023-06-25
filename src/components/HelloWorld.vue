<template>

   
      <div class="container">
        <component :is="activeComponent" v-if="user" />
      </div>
 

</template>

<script>
import { ref } from 'vue';
import editInvoice from './editInvoice.vue';
import Create_Invoice from './createInvoice.vue';
import Inovice from './Invoices.vue';
import Firma_Kunde from "./Firma_Kunde.vue";
import { isAuthenticated } from '../auth.js';

export default {
  components: {
    editInvoice,
    Create_Invoice,
    Inovice,
    Firma_Kunde,

  },
  setup() {
   const user = ref(isAuthenticated.value ? JSON.parse(localStorage.getItem('user')) : null);
    const activeComponent = ref(""); // Default active component is empty

  checkAuth();
    return {
      user,
      activeComponent,
    };
  },
};
</script>


