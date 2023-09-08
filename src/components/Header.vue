<template> 
  <nav class="navbar navbar-expand-lg fixed-top bg-light ms-3 me-3 mt-0">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse custom-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 fs-4">
          <li class="nav-item">
            <button class="nav-link active" @click="handleMenuClick('Me')">Startseite</button>
          </li>
          <li class="nav-item">
            <button class="nav-link ms-5" @click="handleMenuClick('MyInvoice')">Meine Rechnungen</button>
          </li>
              <li class="nav-item dropdown ms-5" data-bs-toggle="dropdown" aria-expanded="false">
            <div class="nav-link">Angaben</div>
   
          <ul class="dropdown-menu">
            <li><button class="nav-link" @click="handleMenuClick('Customer')">Empfänger</button></li>
            <li><button class="nav-link" @click="handleMenuClick('Company')">Rechnungsteller</button></li>

          </ul>
              </li>
          <li class="nav-item">
            <button class="nav-link ms-5" @click="handleMenuClick('NewInvoice')">Rechnung erstellen</button>
          </li>
        </ul>
        <span class="navbar-text Zachnung me-3">Benutzerkonto</span>
        
  <div class="dropdown me-3">
    <button
      class="btn btn-outline-primary dropdown-toggle"
      type="button"
      id="userDropdown"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {{ user.email }}
    </button>
    <ul class="dropdown-menu" aria-labelledby="userDropdown">
   

              <li class="nav-link">
          <button
            class="dropdown-item bg-light text-danger"
            @click="deleteUser(user.id)" :disabled="loading"
          >
            Alles Löschen
          </button>
        </li>
                                          <li class="nav-link">
            <button class="nav-link ms-3 text-danger" @click="handleMenuClick('Delete')">Konto Löschen</button>
          </li>
             <li class="nav-link">
        <router-link
          :to="{ name: 'Logout' }"
          class="dropdown-item bg-light text-dark"
        >
          Logout
        </router-link>
      </li>
    </ul>
  </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase,fetchUserIdFromSupabase } from '../supabase';
import useAuthUser from "../auth";



const { user } = useAuthUser();
const router = useRouter();
const loading = ref(false);

function handleMenuClick(componentName) {
  router.push({ name: componentName });
}

onMounted(async () => {
  if (authUser.isLoggedIn()) {
    user.value = JSON.parse(localStorage.getItem('user'));
  }
  fetchUserIdFromSupabase();
  });



async function deleteUser(userId) {
  try {
    if (!userId) {
      throw new Error('No user ID provided');
    }

    // Show a confirmation dialog
    const shouldDelete = confirm('Are you sure you want to delete this user?');

    if (!shouldDelete) {
      return; // If the user cancels the confirmation, do nothing
    }

    // Delete all entries associated with the user in each table
    await supabase.from('invoice').delete().eq('user_id', userId);
    await supabase.from('customer').delete().eq('user_id', userId);
    await supabase.from('company').delete().eq('user_id', userId);

    // Delete the user account
    await supabase.from('auth.users').delete().eq('id', userId);

    // Optionally, perform any other cleanup or actions after deletion

  } catch (error) {
    alert(error.message);
  }
}



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


.dropdown-menu li:hover {
  background-color:rgb(232, 231, 231); /* Change 'your-color' to the desired background color */
}
</style>
