<template>
<!--   <form class="max-w-lg m-auto" @submit.prevent="handlePasswordReset()">
    <h1 class="text-3xl mb-5">Forgot Password?</h1>
    <label>Email <input v-model="email" type="email" /></label>
    <button>Send Reset Email</button>
  </form> -->
    <nav class="navbar navbar-expand-lg bg-body-light">
    <div class="container-fluid bg-light">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse bg-light custom-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 fs-4">
          <li class="nav-item">
            <button type="button" class="btn" @click="handleMenuClick('Me')">Startseite</button>
          </li>
        </ul>
        <span class="navbar-text Zachnung me-3">Zachnung</span>
      </div>
    </div>
  </nav>
    <div class="container d-flex flex-column">
      <div class="row align-items-center justify-content-center
          min-vh-100">
        <div class="col-12 col-md-8 col-lg-4">
          <div class="card shadow-sm">
            <div class="card-body">
              <div class="mb-4">
                <h5>Forgot Password?</h5>
                <p class="mb-2">Enter your registered email ID to reset the password
                </p>
              </div>
              <form class="max-w-lg m-auto" @submit.prevent="handlePasswordReset()">
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" class="form-control" name="email" placeholder="Enter Your Email"
                    v-model="email">
                </div>
                <div class="mb-3 d-grid">
                  <button class="btn btn-primary">
                    Reset Password
                  </button>
                </div>
                <button type="button" class="btn text-primary" @click="handleMenuClick('Me')">sign in</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer py-2 bg-body-tertiary">
  <div class="container-fluid text-start">
    <div class="row align-items-center">
      <div class="col">
        <img src="../assets/vue.svg" alt="Logo" width="16" height="10" class="footer-image align-text-top">
      </div>
      <div class="col">
        <h3 class="footer-title">Zachnung mach Deine Rechnung</h3>
      </div>
      <div class="col text-end align-item-end">
        <span class="footer-copyright text-body-secondary copyright">© 2023 Jules Schwarz</span>
      </div>
    </div>
  </div>
</footer>
</template>


<script setup>
import useAuthUser from "../auth";
import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();
// use necessary composables
const { sendPasswordRestEmail } = useAuthUser();

// keep up with email
const email = ref("");

// function to call on submit of the form
// triggers sending the reset email to the user
const handlePasswordReset = async () => {
  await sendPasswordRestEmail(email.value);
  alert(`Password reset email sent to: ${email.value}`);
};
function handleMenuClick(componentName) {
  router.push({ name: componentName });
};

</script>

<style>
@import 'bootstrap/dist/css/bootstrap.css';

.footer {
  height:auto;
}

  .footer-image {
    width: 20%;
    height: 20%;
  }
 
  .footer-title {
    font-size: 80%;
    margin-bottom: 0;
    padding-left: 25%;
  }

  .footer-copyright {
    font-size: 60%;
  }


@media (max-width: 767px) {
  .footer-image {
    width: 20%;
    height: 20%;
  }
 
  .footer-title {
    font-size: 40%;
    margin-bottom: 0;
  }

  .footer-copyright {
    font-size: 30%;
    padding-top: 30%;
  }
  
}

</style> 


