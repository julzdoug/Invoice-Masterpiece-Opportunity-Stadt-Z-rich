<script setup>
import { ref } from 'vue';
import useAuthUser from "../auth";

const { isLoggedIn, loginWithSocialProvider } = useAuthUser();

const handleLogin = async () => {
  try {
    await loginWithSocialProvider("google"); // Or whatever login method you want to use
    // Since we've set up router navigation, you don't need to handle this here
  } catch (error) {
    console.error("Login error:", error);
  }
};
</script>

<template>
  <div>
    <!-- Show the MainLayout if logged in -->
    <router-view v-if="isLoggedIn()" />
    
    <!-- Show the Login page if not logged in -->
    <Login v-else @login="handleLogin" />
  </div>
</template>
