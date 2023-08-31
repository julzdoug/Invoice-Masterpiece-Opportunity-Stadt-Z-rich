<template>
  <div>
    <header>
<nav class="navbar bg-body-tertiary">
  <div class="container-fluid">
    <row>
    <div class="container-fluid text-start">
  <div class="row align-items-center">
    <div class="col">
      <img src="src/assets/logo.svg" alt="Logo" width="30" height="24" class="d-inline-block align-text-top mb-3">
    </div>
        <div class="col">
<div class="button" type="button" @click="toggleLogin">{{ showLandingPage ? 'Rechnung Erstellen' : 'Zurück' }}</div>
    </div>
  </div>
    </div>
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
        <img src="../assets/sectionlogo.png" class="d-block w-100 h-auto mx-auto mb-4" alt="formToPdf" />
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
<div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 bg-body-light">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8 order-md-2">
        <img src="../assets/5900_5_10.jpg" class="d-block w-100 h-auto mx-auto mb-4" alt="formToPdf" />
        <div class="product-device shadow-sm d-md-none"></div>
        <div class="product-device product-device-2 shadow-sm d-md-none"></div>
      </div>
      <div class="col-md-4 order-md-1">
        <h1 class="display-3 fw-bold">In wenigen Schritte eine Rechnung machen</h1>
        <h3 class="fw-normal text-muted mb-3">Tragen Sie Ihe Daten ein und Bestellungen<br>mit einem Knopfdruck zur fertigen PDF Rechnung</h3>
        <div class="d-flex gap-3 justify-content-center lead fw-normal">
<button type="button" class="btn btn-outline-secondary" @click="toggleLogin">Start</button>
        </div>
      </div>
    </div>
  </div>
</div>
    </section>
    <section v-show="!showLandingPage">
  <div class="container mt-3 mb-2" id="containerf">
    <div class="row">
      <div class="col-md-6 col-lg-5 mx-auto">
        <div class="form-container sign-up-container">
          <form @submit.prevent="handleSignup">
            <!--Anmeldung-->
            <h1>Mach dein Konto</h1>
            <div class="social-container">
            </div>
            <span>Registriere dich mit E-mail</span>
            <input type="text" v-model="name" placeholder="Name" class="form-control form-control-lg" />
            <input type="email" v-model="signupEmail" placeholder="Email" autocomplete="username"
              class="form-control form-control-lg" />
            <input type="password" v-model="signupPassword" autocomplete="new-password" placeholder="Passwort"
              class="form-control form-control-lg" />
            <button type="submit" class="btn btn-primary btn-block">Registrieren</button>
            <button class="btn btn-primary" @click="handleGoogleSignup">Sign Up with Google</button>
          </form>
        </div>
        <div class="form-container sign-in-container">
          <form @submit.prevent="handleSignin">
            <!-- Anmelde Formular-->
            <h1>Anmelden</h1>
            <div class="social-container">
            </div>
            <span>Benutze dein Konto</span>
            <input type="email" v-model="signinEmail" placeholder="Email" autocomplete="Benutzer Name"
              class="form-control" />
            <input type="password" v-model="signinPassword" autocomplete="new-password" placeholder="Passwort"
              class="form-control" />
            <a href="#">Passwort vergessen?</a>
            <button type="submit" class="btn btn-primary btn-block">Einloggen</button>
             <button class="btn btn-primary" @click="handleGoogleSignIn">Login with Google</button>
          </form>
        </div>
      </div>
    </div>
    <!-- Anmelde Fäche -->
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Wilkommen bei Zachnung!</h1>
          <p>Bitte Anmelden</p>
          <button class="btn btn-outline-primary btn-block ghost" @click="showSigninPanel">Anmelden</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Hallo Freund</h1>

          <p>Neu</p>
          <button class="btn btn-outline-primary btn-block ghost" @click="showSignupPanel">Neu Amnelden</button>
        </div>
      </div>
    </div>
  </div>
      </section>
  </div>
        <div class="scroll-back-to-top" @click="scrollToTop" v-if="!user" ref="scrollButton">
    <button class="btn btn-primary btn-sm">Nach Oben</button>
  </div>
    <Footer />

</template>