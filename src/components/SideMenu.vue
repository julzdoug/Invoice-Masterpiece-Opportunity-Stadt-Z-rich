<template>
  <div class="side-menu">
    <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
      Toggle Sidebar
    </button>

    <div class="offcanvas offcanvas-start" data-bs-backdrop="static" tabindex="-1" id="sidebar" aria-labelledby="sidebarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="sidebarLabel">Sidebar</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul>
          <li><a @click="handleMenuClick('Company')">Company</a></li>
          <li><a @click="handleMenuClick('Customer')">Customer</a></li>
          <li><a @click="handleMenuClick('createInvoice')">Create Invoice</a></li>
          <li><a @click="handleMenuClick('Invoices')">Invoice</a></li>
          <li><a href="#" @click="signOut">Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { supabase } from '../supabase';

const route = useRoute();
const router = useRouter();

onMounted(() => {
  console.log('SideMenu mounted');
});

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
.side-menu {
  display: flex;
  flex-direction: column;
}

.offcanvas {
  background-color: #f0f0f0;
  width: 200px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 10px;
}

a {
  text-decoration: none;
  color: #333;
}
</style>

