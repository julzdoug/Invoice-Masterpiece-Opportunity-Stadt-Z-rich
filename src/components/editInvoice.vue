<template>
  <div class="page-content container">
      <div class="page-header text-blue-d2">
          <h1 class="page-title text-secondary-d1">
              <!--Invoice-->
              <small class="page-info">
                  <i class="fa fa-angle-double-right text-80"></i>
                  <!--ID: #111-222-->
              </small>
          </h1>

          <div class="page-tools">
              <div class="action-buttons">
                  <a class="btn bg-white btn-light mx-1px text-95" href="#" data-title="Print">
                      <i class="mr-1 fa fa-print text-primary-m1 text-120 w-2"></i>
                      Print
                  </a>
                  <a class="btn bg-white btn-light mx-1px text-95" href="#" data-title="PDF">
                      <i class="mr-1 fa fa-file-pdf-o text-danger-m1 text-120 w-2"></i>
                      Export
                  </a>
              </div>
          </div>
      </div>

      <div class="container px-0">
          <div class="row mt-4">
              <div class="col-12 col-lg-12">
                  <div class="row">
                      <div class="col-12">
                          <div class="text-center text-150">
                              <i class="fa fa-book fa-2x text-success-m2 mr-1"></i>
                              <span class="text-default-d3">company</span>
                          </div>
                      </div>
                  </div>
                  <!-- .row -->

                  <hr class="row brc-default-l1 mx-n1 mb-4" />

                  <div class="row">
                      <div class="col-sm-6 mt-3">
                          <div>
                              <span class="text-sm text-grey-m2 align-middle">Kunde Name</span>
                              <span class="text-sm text-grey-m2 align-middle">KundeVorname</span>
                          </div>
                          <div class="text-grey-m2">
                              <div class="my-1">
                                  Street, straasen nummer
                              </div>
                              <div class="my-1">
                                  Plz, Ort
                              </div>
                              <div class="my-1 mt-5 pt-5"><i
                                      class="fa fa-phone fa-flip-horizontal text-secondary fw-3"></i> <b
                                      class="text-600">Rechnung-Nr.</b><b class="text-600 ms-3">Rechnungnummer</b></div>
                              <div class="my-1 mt-5">
                                  Sehr Geehrter Herr Name
                              </div>
                              <div class="my-1 mt-3">
                                  Vielen Dank für den Auftrag, Ich erlaube mir, Ihnen folgende Rechnung zu unterbreiten.
                              </div>
                          </div>
                      </div>
                      <!-- /.col -->

                      <div class="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end pe-5">
                          <hr class="d-sm-none" />
                          <div class="text-grey-m2 my-3">
                              <div class="my-2 d-flex justify-content-between">
                                  <div class="col-6"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span
                                          class="text-600 text-90 text-start">Rechnung - Nr:</span></div>
                                  <div class="col-9 text-end">rechnungsnummer</div>
                              </div>

                              <div class="my-2 d-flex justify-content-between">
                                  <div class="col-6"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span
                                          class="text-600 text-90 text-start">Datum:</span></div>
                                  <div class="col-9 text-end">Oct 12, 2019</div>
                              </div>

                              <div class="my-2 d-flex justify-content-between">
                                  <div class="col-6"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span
                                          class="text-600 text-90 text-start">UiD:</span></div>
                                  <div class="col-9 text-end">UiD nummer</div>
                              </div>

                              <div class="my-2 d-flex justify-content-between">
                                  <div class="col-6"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span
                                          class="text-600 text-90 text-start">MwSt:</span></div>
                                  <div class="col-9 text-end">MwSt nummer MWST</div>
                              </div>
                          </div>
                      </div>
                      <!-- /.col -->
                  </div>

                  <div class="mt-4">
                      <div class="row text-600 text-dark bg-secondary-subtle py-25">
                          <div class="d-none d-sm-block col-1">Pos</div>
                          <div class="col-9 col-sm-5">Bezeichnung/Beschreibung</div>
                          <div class="d-none d-sm-block col-4 col-sm-2">Menge</div>
                          <div class="d-none d-sm-block col-sm-2">Preis/stück</div>
                          <div class="col-2">Positionspreis</div>
                      </div>

                      <div class="text-95 text-secondary-d3">
                          <div class="row mb-2 mb-sm-0 py-25">
                              <div class="d-none d-sm-block col-1">1</div>
                              <div class="col-9 col-sm-5">line1 bezeichnung</div>
                              <div class="d-none d-sm-block col-2">2</div>
                              <div class="d-none d-sm-block col-2 text-95">$10</div>
                              <div class="col-2 text-secondary-d2">$20</div>
                          </div>

                          <div class="row mb-2 mb-sm-0 py-25 bgc-default-l4">
                              <div class="d-none d-sm-block col-1">2</div>
                              <div class="col-9 col-sm-5">Web hosting</div>
                              <div class="d-none d-sm-block col-2">1</div>
                              <div class="d-none d-sm-block col-2 text-95">$15</div>
                              <div class="col-2 text-secondary-d2">$15</div>
                          </div>

                          <div class="row mb-2 mb-sm-0 py-25">
                              <div class="d-none d-sm-block col-1">3</div>
                              <div class="col-9 col-sm-5">Software development</div>
                              <div class="d-none d-sm-block col-2">--</div>
                              <div class="d-none d-sm-block col-2 text-95">$1,000</div>
                              <div class="col-2 text-secondary-d2">$1,000</div>
                          </div>

                          <div class="row mb-2 mb-sm-0 py-25 bgc-default-l4">
                              <div class="d-none d-sm-block col-1">4</div>
                              <div class="col-9 col-sm-5">Consulting</div>
                              <div class="d-none d-sm-block col-2">1 Year</div>
                              <div class="d-none d-sm-block col-2 text-95">$500</div>
                              <div class="col-2 text-secondary-d2">$500</div>
                          </div>
                      </div>

                      <div class="row border-b-2 brc-default-l2"></div>

                      <div class="container text-start mt-5">
                          <div class="row align-items-end">
                              <div class="col">
                                  Zwischensumme
                              </div>
                              <div class="col text-end">

                              </div>
                              <div class="col text-end">
                                  Amount list
                              </div>
                          </div>
                          <div class="row align-items-end">
                              <div class="col">
                                  Mehrwertsteuer
                              </div>
                              <div class="col text-end">
                                  7,7%
                              </div>
                              <div class="col text-end">
                                  with Tax
                              </div>
                          </div>
                          <div class="row align-items-end">
                              <div class="col">
                                  <p class="fw-bold mb-0">Rechnugsbetrag</p>ink.Material
                              </div>
                              <div class="col text-end">
                                  <p class="fw-bold">inkl.MwSt.</p>
                              </div>
                              <div class="col text-end">
                                  <p class="fw-bold">Gesamtbetrag</p>
                              </div>
                          </div>
                      </div>
                      <div class="container mt-5">
                          <div class="row">

                              <div class="col-3">Rechnungsbetrag zahlbar bis</div>
                              <div class="col-3 text-start">
                                  <p class="fw-bold mb-0">date + 30days</p>
                              </div>
                          </div>
                      </div>
                      <div class="container mt-5">
                          <div class="row">
                              <div class="col-4">Freundliche Grüsse</div>
                          </div>
                          <div class="row mt-5">
                              <div class="col-4">Name company worker name</div>
                          </div>


                          <br>
                          <div class="row">
                              <div class="col-sm-3 mt-3 ">
                                  <div>
                                      <span class="text-sm text-secondary align-middle">Company Name</span>
                                      <span class="text-sm text-secondary align-middle">Company Vorname</span>
                                  </div>
                                  <div class="text-secondary">
                                      <div class="my-1">
                                          Street, straasen nummer
                                      </div>
                                      <div class="my-1">
                                          Plz, Ort
                                      </div>
                                  </div>

                              </div>
                              <div class="col-sm-3 mt-3">
                                  <div>
                                      <span class="text-sm text-grey-m2 align-middle">GLKB</span>
                                      <span class="text-sm text-grey-m2 align-middle"></span>
                                  </div>
                                  <div>
                                      <span class="text-sm text-dark align-middle">Company Account:</span>
                                      <span class="text-sm text-dark align-middle">0939894:</span>
                                  </div>
                                  <div>
                                      <span class="text-sm text-dark align-middle">IBAN:</span>
                                      <span class="text-sm text-dark align-middle">0939894:</span>
                                  </div>
                                  <div>
                                      <span class="text-sm text-dark align-middle">MwSt:</span>
                                      <span class="text-sm text-dark align-middle">0939894:</span>
                                  </div>

                                  <div>
                                  </div>
                              </div>
                              <div class="col-sm-3 mt-3">
                                  <div>
                                      <span class="text-sm text-grey-m2 align-middle">Tel:</span>
                                      <span class="text-sm text-grey-m2 align-middle">Phonenumber</span>
                                  </div>
                                  <div>
                                      <span class="text-sm text-grey-m2 align-middle">Web:</span>
                                      <span class="text-sm text-grey-m2 align-middle">WebPage</span>
                                  </div>
                                  <div>
                                      <span class="text-sm text-grey-m2 align-middle">Mail:</span>
                                      <span class="text-sm text-grey-m2 align-middle">Email</span>
                                  </div>
                                  <div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>

</script>

<style>
body {
  margin-top: 20px;
  color: #484b51;
}

.text-secondary-d1 {
  color: #728299 !important;
}

.page-header {
  margin: 0 0 1rem;
  padding-bottom: 1rem;
  padding-top: .5rem;
  border-bottom: 1px dotted #e2e2e2;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-align: center;
  align-items: center;
}

.page-title {
  padding: 0;
  margin: 0;
  font-size: 1.75rem;
  font-weight: 300;
}

.brc-default-l1 {
  border-color: #dce9f0 !important;
}

.ml-n1,
.mx-n1 {
  margin-left: -.25rem !important;
}

.mr-n1,
.mx-n1 {
  margin-right: -.25rem !important;
}

.mb-4,
.my-4 {
  margin-bottom: 1.5rem !important;
}

hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, .1);
}

.text-grey-m2 {
  color: #888a8d !important;
}

.text-success-m2 {
  color: #86bd68 !important;
}

.font-bolder,
.text-600 {
  font-weight: 600 !important;
}

.text-110 {
  font-size: 110% !important;
}

.text-blue {
  color: #478fcc !important;
}

.pb-25,
.py-25 {
  padding-bottom: .75rem !important;
}

.pt-25,
.py-25 {
  padding-top: .75rem !important;
}

.bgc-default-tp1 {
  background-color: rgba(121, 169, 197, .92) !important;
}

.bgc-default-l4,
.bgc-h-default-l4:hover {
  background-color: #f3f8fa !important;
}

.page-header .page-tools {
  -ms-flex-item-align: end;
  align-self: flex-end;
}

.btn-light {
  color: #757984;
  background-color: #f5f6f9;
  border-color: #dddfe4;
}

.w-2 {
  width: 1rem;
}

.text-120 {
  font-size: 120% !important;
}

.text-primary-m1 {
  color: #4087d4 !important;
}

.text-danger-m1 {
  color: #dd4949 !important;
}

.text-blue-m2 {
  color: #68a3d5 !important;
}

.text-150 {
  font-size: 150% !important;
}

.text-60 {
  font-size: 60% !important;
}

.text-grey-m1 {
  color: #7b7d81 !important;
}

.align-bottom {
  vertical-align: bottom !important;
}
</style>