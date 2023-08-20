<template>
<section class="position-relative overflow-hidden p-3 p-md-5 m-md-3  bg-primary bg-opacity-50">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8 order-md-2">
       
        <div class="product-device shadow-sm d-md-none"></div>
        <div class="product-device product-device-2 shadow-sm d-md-none"></div>
      </div>
      <div class="col-md-6 order-md-1">
        <h1 class="display-3 fw-bold">Wie funktionert es</h1>
        <h3 class="fw-normal text-muted mb-3">Einleitung<br>
Sie können eine Rechnung in PDF-Format exportieren, indem Sie die folgenden Schritte ausführen:
<br>
Öffnen Sie die Rechnung, die Sie exportieren möchten.
Klicken Sie auf die Schaltfläche "Exportieren nach PDF".
Wählen Sie den Ort aus, an dem Sie die PDF-Datei speichern möchten.
Klicken Sie auf die Schaltfläche "Speichern".
Ich hoffe, dieses Handbuch war hilfreich. Wenn Sie Fragen haben, können Sie sich gerne an mich wenden.
</h3>
        <div class="d-flex gap-3 justify-content-center lead fw-normal">
<button class="btn btn-primary btn-block" @click="jumpToSection('form')">Start</button>
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