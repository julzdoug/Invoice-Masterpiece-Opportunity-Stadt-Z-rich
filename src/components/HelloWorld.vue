<template>
  <div class="container">
    <component :is="activeComponent" v-if="user" />
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue';


import Inovice from './Invoices.vue';

import useAuthUser from "../auth";

export default {

  components: {


    Inovice,

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




