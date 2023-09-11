<template>
<section class="position-relative overflow-hidden p-3 p-md-5 m-md-3  bg-primary bg-opacity-50">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8 order-md-2">
       
        <div class="product-device shadow-sm d-md-none"></div>
        <div class="product-device product-device-2 shadow-sm d-md-none"></div>
      </div>
      <div class="col-md-12 order-md-1">
<div class="container">
    <h2 class="display-3 fw-bold">Wie funktioniert es?</h2>
    
    <div class="section">
        <h3 class="fw-bold">Startseite</h3>
        <p class="fw-normal text-muted mb-3">
            Hier können Sie eine Rechnung im PDF-Format erstellen, indem Sie die folgenden Schritte ausführen:
        </p>
        <ul>
            <li>Eingabe von Rechnungsinformationen, Kreditoren- und Debitoreninformationen, sowie Rechnungsnummer und Positionen.</li>
            <li>Anschließend können Sie die Rechnung erstellen und oben einen Button zum Herunterladen der PDF-Rechnung finden.</li>
        </ul>
    </div>

    <div class="section">
        <h3 class="fw-bold">Meine Rechnungen</h3>
        <p class="fw-normal text-muted mb-3">
            In diesem Abschnitt können Sie alle erstellten Rechnungen anzeigen, bearbeiten oder löschen. Sie können auch eine erstellte Rechnung erneut einsehen und herunterladen.
        </p>
    </div>

    <div class="section">
        <h3 class="fw-bold">Angaben</h3>
        <p class="fw-normal text-muted mb-3">
            Hier können Sie Informationen zu Kreditoren und Debitoren anzeigen oder bearbeiten. Sie haben die Möglichkeit, neue Einträge zu erstellen oder bestehende zu ändern.
        </p>
    </div>

    <div class="section">
        <h3 class="fw-bold">Neue Rechnung erstellen</h3>
        <p class="fw-normal text-muted mb-3">
            In diesem Abschnitt können Sie neue Rechnungen erstellen, wobei Sie auf vorhandene Kreditoren und Debitoren zugreifen können. Alternativ können Sie auch völlig neue Rechnungen erstellen und neue Einträge für Kreditoren und Debitoren hinzufügen. Befolgen Sie die Schritte und am Ende erhalten Sie eine PDF-Rechnung, die Sie herunterladen können.
        </p>
    </div>

    <div class="section">
        <h3 class="fw-bold">Benutzerkonto</h3>
        <p class="fw-normal text-muted mb-3">
            In diesem Abschnitt haben Sie die Möglichkeit, mit einem Klick alle vorhandenen Rechnungen und Einträge zu löschen. Sie können auch Ihr Benutzerkonto löschen und sich mit der Logout-Funktion ausloggen.
        </p>
    </div>

    <div class="d-grid gap-2 col-6 mx-auto">
        <button class="btn btn-outline-light btn-primary" type="button" @click="jumpToSection('form')">Start</button>
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