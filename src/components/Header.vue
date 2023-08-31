<template> 
  <nav class="navbar navbar-expand-lg bg-body-light">
    <div class="container-fluid bg-light">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse bg-light custom-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 fs-4">
          <li class="nav-item">
            <a class="nav-link active bg-light" @click="handleMenuClick('Me')">Startseite</a>
          </li>
          <li class="nav-item">
            <a class="nav-link ms-5 bg-light" @click="handleMenuClick('MyInvoice')">Meine Rechnungen</a>
          </li>
          <li class="nav-item">
            <a class="nav-link ms-5 bg-light" @click="handleMenuClick('NewInvoice')">Neue Rechnung</a>
          </li>
        </ul>
        <span class="navbar-text Zachnung me-3">Zachnung</span>
        
  <div class="dropdown me-3" >
    <button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      {{ user.email }}
    </button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item bg-light"><router-link :to="{ name: 'Logout' }">Logout</router-link></a></li>
    </ul>
  </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../supabase';
import useAuthUser from "../auth";

const { user } = useAuthUser();
const router = useRouter();


function handleMenuClick(componentName) {
  router.push({ name: componentName });
}

onMounted(async () => {
  if (authUser.isLoggedIn()) {
    user.value = JSON.parse(localStorage.getItem('user'));
  }
  });
</script>



<style scoped>



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
