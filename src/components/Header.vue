<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">

    <div class="collapse navbar-collapse text m-5 fw-bold" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 fs-5 ">
        <li class="nav-item">
          <a class="nav-link active me-5 ms-5" aria-current="page" @click="handleMenuClick('Firma_Kunde')">Firma & Kunden</a>
        </li>
        <li class="nav-item">
          <a class="nav-link ms-5 me-5" @click="handleMenuClick('createInvoice')">Rechnung Erstellen</a>
        </li>
<!--                 <li class="nav-item">
          <a class="nav-link ms-5 me-5" @click="handleMenuClick('editInvoice')">Rechnung Ändern</a>
        </li> -->
        <li class="nav-item">
          <a class="nav-link ms-5" @click="handleMenuClick('Invoices')">Rechnungen</a>
        </li>
        <li class="nav-item">
          <a class="logout nav-item ms-5" @click="signOut">Logout</a>
        </li>
      </ul>
      <span class="navbar-text">
        Zachnung
      </span>
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
    font-size: var(--bs-nav-link-font-size);
    font-weight: var(--bs-nav-link-font-weight);
    color: var(--bs-nav-link-color);
    text-decoration: none;
    background: 0 0;
    border: 0;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out;
}
</style>
