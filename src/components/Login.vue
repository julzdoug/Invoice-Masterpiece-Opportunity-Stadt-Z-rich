<template>
  <div>
    <header>
<nav class="navbar bg-body-tertiary">
  <div class="container-fluid">
    <row>
    <a class="navbar-brand col" href="#">
      <img src="src/assets/logo.svg" alt="Logo" width="30" height="24" class="d-inline-block align-text-top mb-3">
    </a>
<button class="btn btn-outline-secondary col b-5 topButton" type="button" @click="toggleLogin">Rechnung Erstellen</button>
</row>
  </div>
</nav>
    </header>
    <section v-show="showLandingPage">
      
<main>
<div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 bg-body-light">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8 order-md-2">
        <img src="src/assets/sectionlogo.png" class="d-block w-100 h-auto mx-auto mb-4" alt="formToPdf" />
        <div class="product-device shadow-sm d-md-none"></div>
        <div class="product-device product-device-2 shadow-sm d-md-none"></div>
      </div>
      <div class="col-md-4 order-md-1">
        <h1 class="display-3 fw-bold">Zachnung</h1>
        <h3 class="fw-normal text-muted mb-3">Mach deine Rechnung</h3>
        <h3 class="fw-normal text-muted mb-3">danach zu einem PDF</h3>
        <div class="d-flex gap-3 justify-content-center lead fw-normal">
<button type="button" class="btn btn-outline-secondary" @click="toggleLogin">Los gehts</button>
        </div>
      </div>
    </div>
  </div>
</div>


</main>
      <h1>Ich interessiere mich leidenschaftlich dafür, neue Technologien zu lernen und kreative Lösungen für Probleme zu finden. Ich habe diese Projekt mir vorgenommen um mein erlerntes Wissen</h1>
      <!-- Other landing page content -->
      <button @click="toggleLogin">Register</button>
    </section>
    <section v-show="!showLandingPage">
  <div class="container mt-5" id="containerf">
    <div class="row">
      <div class="col-md-6 col-lg-5 mx-auto">
        <div class="form-container sign-up-container">
          <form @submit.prevent="handleSignup">
            <!--Anmeldung-->
            <h1>Mach einen Konto</h1>
            <div class="social-container">
            </div>
            <span>Registriere dich mit E-mail</span>
            <input type="text" v-model="name" placeholder="Name" class="form-control form-control-lg" />
            <input type="email" v-model="signupEmail" placeholder="Email" autocomplete="username"
              class="form-control form-control-lg" />
            <input type="password" v-model="signupPassword" autocomplete="new-password" placeholder="Passwort"
              class="form-control form-control-lg" />
            <button type="submit" class="btn btn-primary btn-block">Registrieren</button>
          </form>
        </div>
        <div class="form-container sign-in-container">
          <form @submit.prevent="handleSignin">
            <!-- Anmelde Formular-->
            <h1>Anmelden</h1>
            <img src="../assets/vue.svg" alt="">
            <div class="social-container">
            </div>
            <span>Benutze dein Konto</span>
            <input type="email" v-model="signinEmail" placeholder="Email" autocomplete="Benutzer Name"
              class="form-control" />
            <input type="password" v-model="signinPassword" autocomplete="new-password" placeholder="Passwort"
              class="form-control" />
            <a href="#">Passowrt vergessen?</a>
            <button type="submit" class="btn btn-primary btn-block">Sign In</button>
          </form>
        </div>
      </div>
    </div>
    <!-- Anmelde Fäche -->
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Wilkommen bei Zachnung!</h1>
          <p>Bitte Anmelden mit deinen Angaben</p>
          <button class="btn btn-outline-primary btn-block ghost" @click="showSigninPanel">Anmelden</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Hallo Freund</h1>
          <img src="../assets/logo.jpg" alt="">
          <p>Trage deine Angaben Ein</p>
          <button class="btn btn-outline-primary btn-block ghost" @click="showSignupPanel">Neu Amnelden</button>
        </div>
      </div>
    </div>
  </div>
      </section>
        <footer class="container py-5">
  <div class="row">
    <div class="col-12 col-md">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="d-block mb-2" role="img" viewBox="0 0 24 24"><title>Product</title><circle cx="12" cy="12" r="10"></circle><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"></path></svg>
      <small class="d-block mb-3 text-body-secondary">© 2023 Jules Schwarz</small>
    </div>
    <div class="col-6 col-md">
      <h5>Features</h5>
      <ul class="list-unstyled text-small">
        <li><a class="link-secondary text-decoration-none" href="#">Cool stuff</a></li>
        <li><a class="link-secondary text-decoration-none" href="#">Random feature</a></li>
        <li><a class="link-secondary text-decoration-none" href="#">Team feature</a></li>
        <li><a class="link-secondary text-decoration-none" href="#">Stuff for developers</a></li>
        <li><a class="link-secondary text-decoration-none" href="#">Another one</a></li>
        <li><a class="link-secondary text-decoration-none" href="#">Last time</a></li>
      </ul>
    </div>
    <div class="col-6 col-md">
      <h5>Resources</h5>
      <ul class="list-unstyled text-small">
        <li><a class="link-secondary text-decoration-none" href="#">Resource name</a></li>
        <li><a class="link-secondary text-decoration-none" href="#">Resource</a></li>
        <li><a class="link-secondary text-decoration-none" href="#">Another resource</a></li>
        <li><a class="link-secondary text-decoration-none" href="#">Final resource</a></li>
      </ul>
    </div>
    <div class="col-6 col-md">
      <h5>Resources</h5>
      <ul class="list-unstyled text-small">
        <li><a class="link-secondary text-decoration-none" href="#">Business</a></li>
        <li><a class="link-secondary text-decoration-none" href="#">Education</a></li>
        <li><a class="link-secondary text-decoration-none" href="#">Government</a></li>
        <li><a class="link-secondary text-decoration-none" href="#">Gaming</a></li>
      </ul>
    </div>
    <div class="col-6 col-md">
      <h5>About</h5>
      <ul class="list-unstyled text-small">
        <li><a class="link-secondary text-decoration-none" href="#">Team</a></li>
        <li><a class="link-secondary text-decoration-none" href="#">Locations</a></li>
        <li><a class="link-secondary text-decoration-none" href="#">Privacy</a></li>
        <li><a class="link-secondary text-decoration-none" href="#">Terms</a></li>
      </ul>
    </div>
  </div>
</footer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { supabase } from "../supabase.js";
import { isAuthenticated } from '../auth.js';

export default {
  data() {
    return {
      showLandingPage: true,
    };
  },
  methods: {
    toggleLogin() {
      this.showLandingPage = !this.showLandingPage;
    },
  },

  emits: ['login-success'],
  setup(_, { emit }) {
    //Eintellungen Allgemein 
    const router = useRouter();
    const user = ref(isAuthenticated.value ? JSON.parse(localStorage.getItem('user')) : null);
    const signupEmail = ref("");
    const signupPassword = ref("");
    const signinEmail = ref("");
    const signinPassword = ref("");
    const name = ref("");
    //Neu Registrieren 
    const handleSignup = async () => {
      try {
        const { user, error } = await supabase.auth.signUp({
          email: signupEmail.value,
          password: signupPassword.value,
        });
        if (error) throw error;
        console.log("User signed up successfully:", user);
        // Meldung 
        alert("Du hast ein E-mail erhalten bestätigen.");
        // Umleitung zum Login
        router.push("/");
      } catch (error) {
        alert(error.message);
      }
    };
    // Anmelde einstellung
    const handleSignin = async () => {
      try {
        const { error, data } = await supabase.auth.signInWithPassword({
          email: signinEmail.value,
          password: signinPassword.value,
        });
        if (error) throw error;
        const signedInUser = data.user;
        console.log("User signed in successfully:", signedInUser);
        isAuthenticated.value = true;
        localStorage.setItem('user', JSON.stringify(signedInUser));
        emit('login-success', signedInUser);
        //Erfolgreiches login Umgan
        router.push("/");
        // Weiterleitung Zum Hauptmenu HelloWorld
      } catch (error) {
        alert(error.message);
      }
    };
    //Anmelde Fläche
    const showSigninPanel = () => {
      const container = document.getElementById("containerf");
      container.classList.remove("right-panel-active");
    };
    // Registrierung Fläche
    const showSignupPanel = () => {
      const container = document.getElementById("containerf");
      container.classList.add("right-panel-active");
    };
    // Benutzer Information Sammeln
    const fetchUser = async () => {
      const { user: authUser } = await supabase.auth.getSession();
      user.value = authUser;
    };
    onMounted(async () => {
      await fetchUser();
    });
    // Authoriesurng vorgang via SupaBase
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        user.value = null;
      } else {
        user.value = session?.user;
      }
    });

    return {
      signupEmail,
      signupPassword,
      signinEmail,
      signinPassword,
      name,
      handleSignup,
      handleSignin,
      showSigninPanel,
      showSignupPanel,
      user,
      isAuthenticated,
    };
  },
};
</script>
  
<style scoped>
@import 'bootstrap/dist/css/bootstrap.css';
/* Login */
.header { 
  background-color: aliceblue;
}
.topButton {
  margin-top: 20%;
}


img {
  height: 15vh;
  width: 15vh;
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}

form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.container {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {

  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}</style>