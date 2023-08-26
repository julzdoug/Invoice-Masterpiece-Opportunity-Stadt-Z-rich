<template> 
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 fs-4">
          <li class="nav-item">
            <a class="nav-link active" @click="handleMenuClick('Firma_Kunde')">Startseite</a>
          </li>
          <li class="nav-item">
            <a class="nav-link ms-5" @click="handleMenuClick('MyInvoice')">Meine Rechnungen</a>
          </li>
                    <li class="nav-item">
            <a class="nav-link ms-5" @click="handleMenuClick('NewInvoice')">Neue Rechnung</a>
          </li>
        </ul>
        <span class="navbar-text Zachnung me-3">Zachnung</span>
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" v-if="userEmail">
    Willkommen: {{ userEmail }}
  </button>


  <ul class="dropdown-menu">
    <li><a class="dropdown-item" @click="signOut">Logout</a></li>
  </ul>
</div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { supabase } from '../supabase';
import { isAuthenticated, fetchUser, fetchUserDataFromSupabase, googleSignIn } from '../auth.js';

const route = useRoute();
const router = useRouter();
const userEmail = ref('');

const user = ref(isAuthenticated.value ? JSON.parse(localStorage.getItem('user')) : null);
const googleUser = ref({ session: { access_token: null } });

async function fetchSupabaseUser() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    userEmail.value = user.email; // Update userEmail with the fetched email
  } catch (error) {
    console.error('Error fetching Supabase user:', error.message);
  }
}

async function signOut() {
  await supabase.auth.signOut();
  router.push({ name: 'Login' }); // Redirect to Login component after logout
}


function handleMenuClick(componentName) {
  const helloWorldComponent = document.querySelector(".hello-world");
  if (helloWorldComponent) {
    helloWorldComponent.activeComponent = componentName;
  }
  router.push({ name: componentName });
}

onMounted(async () => {
  if (isAuthenticated.value) {
    await fetchUser();
    const sessionData = JSON.parse(localStorage.getItem('session'));
    if (sessionData && sessionData.user) {
      googleUser.value.session.access_token = sessionData.user.access_token; // Update the access token
    }

    await fetchSupabaseUser(); // Fetch user data from Supabase
  }
});
</script>



<style scoped>
nav {
  background-color: rgb(174, 255, 255);
  color: white;
  
}

.logout {
  display: block;
  padding: var(--bs-nav-link-padding-y) var(--bs-nav-link-padding-x);


  color: var(--bs-nav-link-color);
  text-decoration: none;
  background: 0 0;
  border: 0;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out;
}

.Zachnung {
  font-size: larger;
  font-weight: bold;
  border-color: black;
}
</style>