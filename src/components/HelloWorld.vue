<template>
  <div class="container">
    <component :is="activeComponent" v-if="user" />
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import editInvoice from './editInvoice.vue';

import Inovice from './Invoices.vue';
import Firma_Kunde from './Firma_Kunde.vue';
import { isAuthenticated } from '../auth.js';

export default {

  components: {
    editInvoice,

    Inovice,
    Firma_Kunde,
  },

  setup() {
    const user = ref(null);
    const activeComponent = ref("");

    onBeforeMount(() => {
      user.value = isAuthenticated.value ? JSON.parse(localStorage.getItem('user')) : null;
      activeComponent.value = ""; // Default active component is empty
    });

    return {
      user,
      activeComponent,
    };
  },
};
</script>




