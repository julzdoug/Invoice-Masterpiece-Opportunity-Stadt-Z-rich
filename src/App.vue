<template>
  <div>
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from './supabase.js';
import { isAuthenticated } from './auth.js';

const user = ref(isAuthenticated.value ? JSON.parse(localStorage.getItem('user')) : null);

onMounted(() => {
  if (isAuthenticated.value) {
    // Fetch and update user data if needed
  }
});

// Other setup code
</script>

