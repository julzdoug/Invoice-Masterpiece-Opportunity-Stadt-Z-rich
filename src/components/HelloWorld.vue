<template>

   
      <div class="container">
        <component :is="activeComponent" v-if="user" />
      </div>
 

</template>

<script>
import { ref } from 'vue';
import Company from "./Company.vue";
import Customer from "./Customer.vue";
import Create_Invoice from './createInvoice.vue';
import Inovice from './Invoices.vue';
import Firma_Kunde from "./Firma_Kunde.vue";

export default {
  components: {
    Company,
    Customer,
    Create_Invoice,
    Inovice,
    Firma_Kunde,

  },
  setup() {
    const user = ref(null);
    const activeComponent = ref(""); // Default active component is empty

    return {
      user,
      activeComponent,
    };
  },
};
</script>


