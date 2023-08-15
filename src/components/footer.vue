<template>
<footer class="footer mt-5 py-2 bg-body-tertiary">
  <div class="container-fluid text-start">
    <div class="row align-items-center m-1">
      <div class="col">
        <img src="src/assets/vue.svg" alt="Logo" width="16" height="10" class="footer-image align-text-top">
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

<style>
@import 'bootstrap/dist/css/bootstrap.css';

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
    padding-top: 60%;
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