<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 fs-4">
          <li class="nav-item">
            <a class="nav-link active" @click="handleMenuClick('Firma_Kunde')">Firma & Kunden</a>
          </li>
          <li class="nav-item">
            <a class="nav-link ms-5" @click="handleMenuClick('createInvoice')">Rechnung Erstellen</a>
          </li>
          <li class="nav-item">
            <!-- <a class="nav-link" @click="handleMenuClick('editInvoice')">Rechnung Ändern</a> -->
          </li>
          <li class="nav-item">
            <!-- <a class="nav-link" @click="handleMenuClick('Invoices')">Rechnungen</a> -->
          </li>
        </ul>
        <span class="navbar-text Zachnung me-3">Zachnung</span>
        <ul class="navbar-nav mb-2 mb-lg-0 fs-4">
          <li class="nav-item">
            <a class="logout nav-item me-2" @click="signOut">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { supabase } from '../supabase';

const route = useRoute();
const router = useRouter();



function signOut() {
  supabase.auth.signOut();
}

function handleMenuClick(componentName) {
  const helloWorldComponent = document.querySelector(".hello-world");
  if (helloWorldComponent) {
    helloWorldComponent.activeComponent = componentName;
  }
  router.push({ name: componentName });
}



</script>

<style scoped>
nav {
  background-color: aqua;
  color: white;
  height: 20vh;
}
.logout {
    display: block;
    padding: var(--bs-nav-link-padding-y) var(--bs-nav-link-padding-x);
  
  
    color: var(--bs-nav-link-color);
    text-decoration: none;
    background: 0 0;
    border: 0;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out;
}

.Zachnung {
  font-size: larger;
  font-weight: bold;
  border-color: black;
}
</style>
