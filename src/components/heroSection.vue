<template>
  <section>
    <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 bg-primary bg-opacity-25">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12 text-center"> <!-- Updated class to col-md-12 for centering -->
            <h1 class="display-3 fs-1 fw-bold">Rechnungs Generator</h1>
            <h3 class="fw-normal fs-3 text-muted mb-3">Erstelle deine Rechnung</h3>
            <h3 class="fw-normal fs-3 text-muted mb-3">zu einem PDF</h3>
            <div class="d-grid gap-2 col-6 mx-auto mt-3 mb-3">
              <button class="btn btn-outline-light btn-primary btn-lg" type="button" @click="jumpToSection('form')">Start</button>
            </div>
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