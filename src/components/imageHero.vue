<template>
  <section>
    <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 bg-primary bg-opacity-30">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-8 order-md-2 mx-auto"> <!-- Updated class to center the carousel -->
            <div
              id="carouselExampleAutoplaying"
              class="carousel slide"
              data-bs-ride="carousel"
              style="height: 500px; overflow: hidden;"
            >
                <div class="carousel-item active">
      <img src="../assets/hero/company.png" class="d-block w-100" alt="companyForm">
    </div>
    <div class="carousel-item">
      <img src="../assets/hero/customer.png" class="d-block w-100" alt="customerform">
    </div>
    <div class="carousel-item">
      <img src="../assets/hero/number.png" class="d-block w-100" alt="invoicenumber">
      <img src="../assets/hero/order.png" class="d-block w-100" alt="order">
    </div>
        <div class="carousel-item">
      <img src="../assets/hero/form.png" class="d-block w-100" alt="order">
    </div>
  </div>
  <button class="carousel-control-prev image" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next image" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
            </div>
          </div>
        </div>

  </section>
</template>



<script>
export default {
    methods: {
    // Jump to a specific section when the button is clicked
    jumpToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
  }
}
</script>