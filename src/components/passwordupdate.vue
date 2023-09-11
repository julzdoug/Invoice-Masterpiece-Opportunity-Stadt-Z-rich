<template>
  <div class="container d-flex flex-column">
    <div class="row align-items-center justify-content-center min-vh-100">
      <div class="col-12 col-md-8 col-lg-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="mb-4">
              <h5>Passwort zurücksetzen</h5>
              <p class="mb-2">
                Geben Sie Ihre E-Mail-Adresse ein, um Ihr Passwort zurückzusetzen. Sie erhalten eine E-Mail mit Anweisungen.
              </p>
            </div>
            <form class="max-w-lg m-auto" @submit.prevent="handlePasswordUpdate()">
              <div class="mb-3">
                <label for="new-password" class="form-label">Neues Passwort</label>
                <input type="password" class="form-control" name="new-password" placeholder="Neues Passwort" v-model="newPassword">
              </div>
              <div class="mb-3">
                <label for="confirm-password" class="form-label">Passwort bestätigen</label>
                <input type="password" class="form-control" name="confirm-password" placeholder="Passwort bestätigen" v-model="confirmPassword">
              </div>
              <div class="mb-3 d-grid">
                <button class="btn btn-primary">
                  Passwort aktualisieren
                </button>
              </div>
              <button type="button" class="btn text-primary" @click="handleMenuClick('Me')">Anmelden</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useAuthUser from "../auth";
import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const { updateUser } = useAuthUser();

const newPassword = ref("");
const confirmPassword = ref("");

function handleMenuClick(componentName) {
  router.push({ name: componentName });
}

const handlePasswordUpdate = async () => {
  if (newPassword.value !== confirmPassword.value) {
    alert("Passwörter stimmen nicht überein.");
    return;
  }

  try {
    // Call Supabase to update the user's password
    await updateUser({ password: newPassword.value });

    // Redirect the user to a success page or log them in
    // You can customize this part based on your application's logic
    alert("Passwort erfolgreich aktualisiert.");
    // Redirect to a success page or log the user in, etc.
  } catch (error) {
    alert("Fehler beim Aktualisieren des Passworts: " + error.message);
  }
};
</script>
