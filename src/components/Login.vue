<template>
  <div class="container mt-5" id="containerf">
        <div class="row">
      <div class="col-md-6 col-lg-5 mx-auto">
    <div class="form-container sign-up-container">
      <form @submit.prevent="handleSignup">
        <!-- Sign-Up Form -->
        <h1>Mach einen Konto</h1>
    <div class="social-container">
  
      <a href="#" class="social" @click="handleLinkedInSignup"><i class="bi bi-linkedin"></i></a>
    </div>
        <span>Registriere dich mit E-mail</span>
        <input type="text" v-model="name" placeholder="Name" class="form-control form-control-lg" />
        <input type="email" v-model="signupEmail" placeholder="Email" autocomplete="username" class="form-control form-control-lg" />
        <input type="password" v-model="signupPassword" autocomplete="new-password" placeholder="Passwort" class="form-control form-control-lg" />
        <button type="submit" class="btn btn-primary btn-block">Registrieren</button>
      </form>
    </div>
    <div class="form-container sign-in-container">
      <form @submit.prevent="handleSignin">
        <!-- Sign-In Form -->
        <h1>Anmelden</h1>
        <div class="social-container">

      <a href="#" class="social" @click="handleLinkedInSignin">
        <i class="bi bi-linkedin"></i>
      </a>
        </div>
        <span>Benutze dein Konto</span>
        <input type="email" v-model="signinEmail" placeholder="Email" autocomplete="Benutzer Name" class="form-control" />
        <input type="password" v-model="signinPassword" autocomplete="new-password" placeholder="Passwort" class="form-control" />
        <a href="#">Passowrt vergessen?</a>
        <button type="submit" class="btn btn-primary btn-block">Sign In</button>
      </form>
    </div>
   </div>
    </div>

    <!-- Sign-Up/Sign-In Panel -->
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Wilkommen bei Zachnung!</h1>
          <p>Bitte Anmelden mit deinen Angaben</p>
          <button class="btn btn-outline-primary btn-block ghost" @click="showSigninPanel">Anmelden</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Hallo Freund</h1>
          <p>Trage deine Angaben Ein</p>
          <button class="btn btn-outline-primary btn-block ghost" @click="showSignupPanel">Neu Amnelden</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { supabase } from "../supabase.js";

import { isAuthenticated, login } from '../auth.js';


export default {
  emits: ['login-success'], 
  setup(_, { emit }) {
    const router = useRouter();
    const user = ref(isAuthenticated.value ? JSON.parse(localStorage.getItem('user')) : null);
    const signupEmail = ref("");
    const signupPassword = ref("");
    const signinEmail = ref("");
    const signinPassword = ref("");
    const name = ref("");


const handleSignup = async () => {
  try {
    const { user, error } = await supabase.auth.signUp({
      email: signupEmail.value,
      password: signupPassword.value,
    });

    if (error) throw error;

    console.log("User signed up successfully:", user);

    // Show message to check email for verification
    alert("Du hast ein E-mail erhalten bestätigen.");

    // Redirect to home page after successful sign-up
    router.push("/");
  } catch (error) {
    alert(error.message);
  }
};

const handleGoogleSignup = async () => {
  try {
    const { user, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      redirect_to: 'https://enqqwgaongvfodzdlgmu.supabase.co/auth/v1/callback',
    });

    if (error) throw error;

    console.log("User signed up with Google:", user);

    // Show message to check email or continue with Google
    alert("Please check your email to complete the sign-up process or continue with Google.");

    // Redirect to home page after successful sign-up
    router.push("/");
  } catch (error) {
    alert(error.message);
  }
};

const handleLinkedInSignup = async () => {
  try {
    const { user, error } = await supabase.auth.signInWithOAuth({
      provider: 'linkedin',
    redirect_to: ' https://enqqwgaongvfodzdlgmu.supabase.co/auth/v1/callback',
    });
    if (error) throw error;

    console.log("User signed up with LinkedIn:", user);

    // Show message to check email or continue with LinkedIn
    alert("Please check your email to complete the sign-up process or continue with LinkedIn.");

    // Redirect to home page after successful sign-up
    router.push("/");
  } catch (error) {
    alert(error.message);
  }
};


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
        emit('login-success', signedInUser); // Emit the 'login-success' event with the signedInUser object
        router.push("/"); // Redirect to home page after successful sign-in
      } catch (error) {
        alert(error.message);
      } 
 
      
    };

    const showSigninPanel = () => {
      const container = document.getElementById("containerf");
      container.classList.remove("right-panel-active");
    };

    const showSignupPanel = () => {
      const container = document.getElementById("containerf");
      container.classList.add("right-panel-active");
    };

    const fetchUser = async () => {
      const { user: authUser } = await supabase.auth.getSession();
      user.value = authUser;
    };

    onMounted(async () => {
      await fetchUser();
    });

    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        user.value = null;
      } else {
        user.value = session?.user;
      }
    });

        const handleGoogleSignin = async () => {
      try {
    const { user, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      redirect_to: 'https://enqqwgaongvfodzdlgmu.supabase.co/auth/v1/callback',
    });

   
        if (error) throw error;

        console.log("User signed in with Google:", user);

        // Show message or perform any additional logic after successful sign-in

        // Redirect to home page after successful sign-in
        router.push("/");
      } catch (error) {
        alert(error.message);
      }
    };

    const handleLinkedInSignin = async () => {
      try {
        const { user, error } = await supabase.auth.signInWithOAuth({
          provider: 'linkedin',
        redirect_to: ' https://enqqwgaongvfodzdlgmu.supabase.co/auth/v1/callback',
    });

        if (error) throw error;

        console.log("User signed in with LinkedIn:", user);

        // Show message or perform any additional logic after successful sign-in

        // Redirect to home page after successful sign-in
        router.push("/");
      } catch (error) {
        alert(error.message);
      }
    };


    return {
          handleGoogleSignin,
      handleLinkedInSignin,
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
    handleGoogleSignup,
      handleLinkedInSignup,
      isAuthenticated,

    };
  },
};
</script>
  
  <style scoped>
  @import 'bootstrap/dist/css/bootstrap.css';
/* Login */

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
}
</style>