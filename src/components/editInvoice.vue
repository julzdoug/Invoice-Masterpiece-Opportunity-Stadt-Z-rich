<template>
  <div class="modal fade" id="exampleModalToggle3" aria-hidden="false" aria-labelledby="exampleModalToggleLabel"
    tabindex="-1">
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header back">
          <h1 class="modal-title fs-5" id="exampleModalToggleLabel3">Kreditor</h1>
          <button ref="modalButton" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            data-bs-toggle="modal"></button>
        </div>
        <div class="row m-2">
          <div class="col-8 d-flex justify-content-start m-2">
            <div class="d-flex flex-wrap">
            <button class="btn btn-outline-primary m-2" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal"
              @close="closeEditModal">Rechnungspositionen</button>
            <button class="btn btn-outline-primary m-2" data-bs-target="#exampleModalToggle" data-bs-toggle="modal"
              >Debitor</button>
              <button class="btn btn-outline-primary m-2" v-if="companyData" @click="toggleEditModeCompany"><span><i class="bi bi-pencil"></i>Ändern</span></button>   
          </div>
          </div>
        </div>
        <div class="modal-body modal-dialog-scrollable">
          <form class="container mt-5 smaller-form" novalidate @submit.prevent="submitCompanyForm">
            <div class="row">
              <div class="form-group col-md-6 col-sm-12 mb-3">           
                                
                <label for="logoInput">Firma Logo</label>
                <div class="text-center col-4">
                  <div class="input-with-image">
                    <template v-if="isEditing">
                      <input type="file" class="form-control" id="logoInput" @change="handleLogoChange($event)" />
                      <div class="image-preview" v-if="companyData && companyData.logo">
                        <img :src="companyData.logo" alt="Logo Preview" class="preview-image">
                      </div>
                    </template>
                    <template v-else>
                      <div class="image-preview" v-if="companyData && companyData.logo">
                        <img :src="companyData.logo" alt="Logo Preview" class="preview-image" width="100" height="100">
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3 col-sm-12">
                <label for="validation3">Unternehmen:</label>
                <div class="input-container">
                  <template v-if="isEditing">
                    <input type="text" class="form-control text-start" placeholder="Unternehmen" required
                      v-model="companyData.profession">
                  </template>
                  <template v-else>
                    <div class="form-control-static" v-if="companyData.profession">{{ companyData.profession }}</div>
                  </template>
                </div>
                <div class="invalid-feedback">
                  Unternehmen Bitte eintragen.
                </div>
              </div>
              <div class="col-md-6 mb-3 col-sm-12">
                <label for="validation3">Firma:</label>
                <div class="input-container">
                  <template v-if="isEditing">
                    <input type="text" class="form-control text-start" placeholder="Firma" required
                      v-model="companyData.company_name">
                  </template>
                  <template v-else>
                    <div class="form-control-static" v-if="companyData.company_name">{{ companyData.company_name }}
                    </div>
                  </template>
                </div>
                <div class="invalid-feedback">
                  Firma Bitte eintragen.
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3 col-sm-12">
                <label for="validation3">Vorname:</label>
                <div class="input-container">
                  <template v-if="isEditing">
                    <input type="text" class="form-control" placeholder="Vorname" required v-model="companyData.name">
                  </template>
                  <template v-else>
                    <div class="form-control-static" v-if="companyData.name">{{ companyData.name }}</div>
                  </template>
                </div>
                <div class="invalid-feedback">
                  Vorname Bitte eintragen.
                </div>
              </div>
              <div class="col-md-6 mb-3 col-sm-12">
                <label for="validation3">Name:</label>
                <div class="input-container">
                  <template v-if="isEditing">
                    <input type="text" class="form-control" placeholder="Name" required v-model="companyData.surname">
                  </template>
                  <template v-else>
                    <div class="form-control-static" v-if="companyData.surname">{{ companyData.surname }}</div>
                  </template>
                </div>
                <div class="invalid-feedback">
                  Name Bitte eintragen.
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3 col-sm-12">
                <label for="validation3">Strasse:</label>
                <div class="input-container">
                  <template v-if="isEditing">
                    <input type="text" class="form-control" placeholder="Strasse" required v-model="companyData.street">
                  </template>
                  <template v-else>
                    <div class="form-control-static" v-if="companyData.street">{{ companyData.street }}</div>
                  </template>
                </div>
                <div class="invalid-feedback">
                  Strasse Bitte eintragen.
                </div>
              </div>
              <div class="col-md-6 mb-3 col-sm-12">
                <label for="validation3">Nummer:</label>
                <div class="input-container">
                  <template v-if="isEditing">
                    <input type="text" class="form-control" pattern="[0-9]*" placeholder="Nummer" required
                      v-model="companyData.street_number">
                  </template>
                  <template v-else>
                    <div class="form-control-static" v-if="companyData.street_number">{{ companyData.street_number }}
                    </div>
                  </template>
                </div>
                <div class="invalid-feedback">
                  Nummer Bitte eintragen.
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3 col-sm-12">
                <label for="validation3">Postleitzahl:</label>
                <div class="input-container">
                  <template v-if="isEditing">
                    <input type="text" class="form-control" pattern="[0-9]*" placeholder="Postleitzahl" required
                      v-model="companyData.postal_code">
                  </template>
                  <template v-else>
                    <div class="form-control-static" v-if="companyData.postal_code">{{ companyData.postal_code }}
                    </div>
                  </template>
                </div>
                <div class="invalid-feedback">
                  Postleitzahl Bitte eintragen.
                </div>
              </div>
              <div class="col-md-6 mb-3 col-sm-12">
                <label for="validation3">Ort:</label>
                <div class="input-container">
                  <template v-if="isEditing">
                    <input type="text" class="form-control" placeholder="Ort" required v-model="companyData.place">
                  </template>
                  <template v-else>
                    <div class="form-control-static" v-if="companyData.place">{{ companyData.place }}</div>
                  </template>
                </div>
                <div class="invalid-feedback">
                  Ort Bitte eintragen.
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3 col-sm-12">
                <label for="validation3">E-mail:</label>
                <div class="input-container">
                  <template v-if="isEditing">
                    <input type="email" class="form-control" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" placeholder="E-mail" required v-model="companyData.email">
                  </template>
                  <template v-else>
                    <div class="form-control-static" v-if="companyData.email">{{ companyData.email }}</div>
                  </template>
                </div>
                <div class="invalid-feedback">
                  E-mail Bitte eintragen.
                </div>
              </div>
              <div class="col-md-6 mb-3 col-sm-12">
                <label for="validation3">Webpage:</label>
                <div class="input-container">
                  <template v-if="isEditing">
                    <input type="text" class="form-control"
                      pattern="^(https?:\/\/)?([\w\d]+\.)?[\w-]+(\.[\w-]+)+([/?#]\S*)?$" placeholder="Webpage"
                      v-model="companyData.webpage">
                  </template>
                  <template v-else>
                    <div class="form-control-static" v-if="companyData.webpage">{{ companyData.webpage }}</div>
                  </template>
                </div>
                <div class="invalid-feedback">
                  Webpage Bitte eintragen.
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3 col-sm-12">
                <label for="validation3">Telefon Nummer:</label>
                <div class="input-container">
                  <template v-if="isEditing">
                    <input type="text" class="form-control" pattern="[0-9]*" placeholder="Telefon Nummer"
                      v-model="companyData.phone_number">
                  </template>
                  <template v-else>
                    <div class="form-control-static" v-if="companyData.phone_number">{{ companyData.phone_number }}
                    </div>
                  </template>
                </div>
                <div class="invalid-feedback">
                  Telefon Nummer Bitte eintragen.
                </div>
              </div>
              <div class="col-md-6 mb-3 col-sm-12">
                <label for="validation3">UiD Nummer:</label>
                <div class="input-container">
                  <template v-if="isEditing">
                    <input type="text" class="form-control" pattern="[0-9]*" placeholder="UiD Nummer" required
                      v-model="companyData.uid_number">
                  </template>
                  <template v-else>
                    <div class="form-control-static" v-if="companyData.uid_number">{{ companyData.uid_number }}</div>
                  </template>
                </div>
                <div class="invalid-feedback">
                  UiD Nummer Bitte eintragen.
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3 col-sm-12">
                <label for="validation3">IBAN:</label>
                <div class="input-container">
                  <template v-if="isEditing">
                    <input type="text" class="form-control" placeholder="IBAN" pattern="[0-9]*" v-model="companyData.iban_number">
                  </template>
                  <template v-else>
                    <div class="form-control-static" v-if="companyData.iban_number">{{ companyData.iban_number }}
                    </div>
                  </template>
                </div>
                <div class="invalid-feedback">
                  IBAN Bitte eintragen.
                </div>
              </div>
              <div class="col-md-6 mb-3 col-sm-12">
                <label for="validation3">Mehrwertsteuer:</label>
                <div class="input-container">
                  <template v-if="isEditing">
                    <input type="text" class="form-control" placeholder="Mehrwertsteuer" pattern="[0-9]*" v-model="companyData.mwst">
                  </template>
                  <template v-else>
                    <div class="form-control-static" v-if="companyData.mwst">{{ companyData.mwst }}</div>
                  </template>
                </div>
                <class class="invalid-feedback">
                  Mehrwertsteuer Bitte eintragen.
                </class>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3 col-sm-12">
                <label for="validation3">Bank:</label>
                <div class="input-container">
                  <template v-if="isEditing">
                    <input type="text" class="form-control" placeholder="Bank" v-model="companyData.bank">
                  </template>
                  <template v-else>
                    <div class="form-control-static" v-if="companyData.bank">{{ companyData.bank }}</div>
                  </template>
                </div>
                <div class="invalid-feedback">
                  Bank Bitte eintragen.
                </div>
              </div>
              <div class="col-md-6 mb-3 col-sm-12">
                <label for="validation3">Konto Nummer:</label>
                <div class="input-container">
                  <template v-if="isEditing">
                    <input type="text" class="form-control" pattern="[0-9]*" placeholder="Konto Nummer"
                      v-model="companyData.account">
                  </template>
                  <template v-else>
                    <div class="form-control-static" v-if="companyData.account">{{ companyData.account }}</div>
                  </template>
                </div>
                <div class="invalid-feedback">
                  Konto Nummer Bitte eintragen.
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer  bg-primary bg-opacity-25">
          <button type="submit" @click="updateCompanyDataInDatabase(companyData.value)"
            class="btn btn-outline-primary">Speichern</button>
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" @click="closeModalAndReloadParent">
            Schliessen
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel3"
    tabindex="-1">
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header  back">
          <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Debitor</h1>
          <button ref="modalButton" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            data-bs-target="#exampleModalToggle" data-bs-toggle="modal"></button>
        </div>
        <div class="row m-2">
          <div class="col-8 d-flex justify-content-start m-2">
            <div class="d-flex flex-wrap">
            <button class="btn btn-outline-primary m-2" data-bs-target="#exampleModalToggle2"
              data-bs-toggle="modal">Rechnungspositionen</button>
            <button class="btn btn-outline-primary m-2" data-bs-target="#exampleModalToggle3" data-bs-toggle="modal"
              @close="closeEditModal">Kreditor</button>
              <button class="btn btn-outline-primary m-2" v-if="customerData" @click="toggleEditModeCustomer"><span><i class="bi bi-pencil">Ändern</i></span></button> 
          </div>
        </div>
        </div>
        <div class="modal-body modal-dialog-scrollable">
          <form class="container mt-2" @submit.prevent="submitCustomerForm">
            
            <div class="col-md-6 mb-3 col-sm-12">
              <label>Geschlecht:</label>
              <div class="form-check" v-if="isEditing">
                <input class="form-check-input" type="radio" id="mrRadio" value="Herr" v-model="customerData.gender" />
                <label class="form-check-label" for="mrRadio">Herr</label>
              </div>
              <div class="form-check" v-if="isEditing">
                <input class="form-check-input" type="radio" id="mrsRadio" value="Frau" v-model="customerData.gender" />
                <label class="form-check-label" for="mrsRadio">Frau</label>
              </div>
              <div class="form-check" v-if="isEditing">
                <input class="form-check-input" type="radio" id="noneRadio" value="" v-model="customerData.gender" />
                <label class="form-check-label" for="noneRadio">Keine Angaben</label>
              </div>
              <div v-else>
                <div class="form-control-static" v-if="customerData && customerData.name">{{ customerData.gender }}</div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3 col-sm-12">
                <label for="validation3">Vorname:</label>
                <div class="input-container">
                  <template v-if="isEditing">
                    <input type="text" class="form-control" placeholder="Vorname" required v-model="customerData.name">
                  </template>
                  <template v-else>
                    <div class="form-control-static" v-if="customerData && customerData.name">{{ customerData.name }}
                    </div>
                  </template>
                </div>
                <div class="invalid-feedback">
                  Vorname Bitte eintragen.
                </div>
              </div>
              <div class="col-md-6 mb-3 col-sm-12">
                <label for="validation3">Name:</label>
                <div class="input-container">
                  <template v-if="isEditing">
                    <input type="text" class="form-control" placeholder="Name" required v-model="customerData.surname">
                  </template>
                  <template v-else>
                    <div class="form-control-static" v-if="customerData && customerData.surname">{{
                      customerData.surname }}</div>
                  </template>
                </div>
                <div class="invalid-feedback">
                  Name Bitte eintragen.
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3 col-sm-12">
                <label for="validation3">Strasse:</label>
                <div class="input-container">
                  <template v-if="isEditing">
                    <input type="text" class="form-control" placeholder="Strasse" required v-model="customerData.street">
                  </template>
                  <template v-else>
                    <div class="form-control-static" v-if="customerData.street">{{ customerData.street }}</div>
                  </template>
                </div>
                <div class="invalid-feedback">
                  Strasse Bitte eintragen.
                </div>
              </div>
              <div class="col-md-6 mb-3 col-sm-12">
                <label for="validation3">Nummer:</label>
                <div class="input-container">
                  <template v-if="isEditing">
                    <input type="text" class="form-control" pattern="[0-9]*" placeholder="Nummer" required
                      v-model="customerData.streetnumber">
                  </template>
                  <template v-else>
                    <div class="form-control-static" v-if="customerData.streetnumber">{{ customerData.streetnumber }}
                    </div>
                  </template>
                </div>
                <div class="invalid-feedback">
                  Nummer Bitte eintragen.
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3 col-sm-12">
                <label for="validation3">Postleitzahl:</label>
                <div class="input-container">
                  <template v-if="isEditing">
                    <input type="text" class="form-control" pattern="[0-9]*" placeholder="Postleitzahl" required
                      v-model="customerData.postcode">
                  </template>
                  <template v-else>
                    <div class="form-control-static" v-if="customerData && customerData.postcode">{{
                      customerData.postcode }}</div>
                  </template>
                </div>
                <div class="invalid-feedback">
                  Postleitzahl Bitte eintragen.
                </div>
              </div>
              <div class="col-md-6 mb-3 col-sm-12">
                <label for="validation3">Ort:</label>
                <div class="input-container">
                  <template v-if="isEditing">
                    <input type="text" class="form-control" placeholder="Ort" required v-model="customerData.place">
                  </template>
                  <template v-else>
                    <div class="form-control-static" v-if="customerData && customerData.place">{{ customerData.place
                    }}</div>
                  </template>
                </div>
                <div class="invalid-feedback">
                  Ort Bitte eintragen.
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3 col-sm-12">
                <label for="validation3">E-mail:</label>
                <div class="input-container">
                  <template v-if="isEditing">
                    <input type="email" class="form-control" placeholder="E-mail" required v-model="customerData.email">
                  </template>
                  <template v-else>
                    <div class="form-control-static" v-if="customerData">{{ customerData.email }}</div>
                  </template>
                </div>
                <div class="invalid-feedback">
                  E-mail Bitte eingeben.
                </div>
              </div>
            </div>

          </form>
        </div>
        <div class="modal-footer  bg-primary bg-opacity-25">

          <button type="submit" @click="updateCustomerDataInDatabase(customerData.value)"
            class="btn btn-outline-primary">Speichern</button>
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" @click="closeModalAndReloadParent">
            Schliessen
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2"
    tabindex="-1">
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header back">
          <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">Rechnungspositionen</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" @click="closeModalAndReloadParent">
          </button>
        </div>
        <div class="row m-2">
          <div class="col-8 d-flex justify-content-start m-2">
            <div class="d-flex flex-wrap">
            <button class="btn btn-outline-primary m-2" data-bs-target="#exampleModalToggle3"
              data-bs-toggle="modal">Kreditor</button>
            <button class="btn btn-outline-primary m-2" data-bs-target="#exampleModalToggle"
              data-bs-toggle="modal">Debitor</button>
          </div>
        </div>
        </div>
        <div class="modal-body modal-dialog-scrollable">
          <form @submit.prevent="submitInvoiceForm">

            <div class="table-responsive table-container">
              <table class="table table-hover text-center fit" aria-label="" v-if="selectedInvoice !== ''">
                <thead>
                  <tr>
                    <th class="text-dark bg-light text-center"><span><i class="bi bi-pencil"></i></span></th>
                    <th class="text-dark bg-light text-center"><span><i class="bi bi-wrench"></i></span></th>
                    <th class="text-dark bg-light">Rechnungsnummer</th>
                    <th class="text-dark bg-light">Bezeichnung</th>
                    <th class="text-dark bg-light">Menge</th>
                    <th class="text-dark bg-light">Preis/Stück</th>
                    <th class="width=140 text-dark bg-light">Positionspreis</th>
                  </tr>
                </thead>
                <tbody class="table align-middle">
                  <tr v-for="(row, index) in filteredInvoiceRows" :key="row.id">
                    <td class="text-center">
                      <button class="btn btn-warning m-1 text-dark" @click="toggleEditRow(index)">
                        <i class="bi bi-pencil">Drücke mich</i>
                      </button>
                    </td>
                    <td class="text-center">
                      <button class="btn btn-warning m-1 text-dark" @click="deleteRow(index)">
                        <i class="bi bi-trash3"></i>
                      </button>
                    </td>
                    <td>{{ row.invoice_number }}</td>
                    <td>
                      <template v-if="isEditingRow[index]">
                        <input class="form-control" v-model="row.description" />
                      </template>
                      <template v-else>
                        {{ row.description }}
                      </template>
                    </td>
                    <td>
                      <template v-if="isEditingRow[index]">
                        <input class="form-control" v-model="row.quantity" type="number" />
                      </template>
                      <template v-else>
                        {{ row.quantity }}
                      </template>
                    </td>
                    <td class="">
                      <template v-if="isEditingRow[index]">
                        <input class="form-control" v-model="row.price_per_unit" type="number" />
                      </template>
                      <template v-else>
                        {{ row.price_per_unit }}
                      </template>
                    </td>
                    <td class="fw-bold">{{ row.quantity * row.price_per_unit }}</td>
                  </tr>
                </tbody>
              </table>
                  </div>
       <div class="total-container"> <!-- Add a class to the container -->
      <div class="total text-center">Gesamt Betrag: {{ calculateTotal() }}</div>
    </div>
  
              <div class="d-grid gap-2 col-6 mx-auto">
                <button class="btn btn-primary mt-3" @click="addNewRow">Hinzufügen</button>
                </div>
            
          </form>
        </div>
        <div class="modal-footer bg-primary bg-opacity-25">
          <button class="btn btn-outline-primary" v-if="isEditingCurrentRow" @click="saveNewRow">Speichern</button>
          <button class="btn btn-outline-primary" v-else @click="updateRows">Speichern</button>
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" @click="closeModalAndReloadParent">
            Schliessen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default {
  props: {
    selectedInvoice: { type: Object, required: true },
    invoiceData: { type: Object, required: true },
    companyData: { type: Object, required: true },
    customerData: { type: Object, required: true },
    isEditingInvoice: { type: Boolean, required: true },
  },
  methods: {
    closeModalAndReloadParent() {
      // Emit an event to notify the parent component to reload the page
      this.$emit('modal-closed-reload');
    },

    async handleLogoChange(event) {
      const file = event.target.files[0];
      const fileName = file.name; // Use the original filename of the uploaded image

      try {
        // Upload the file to the "bucket" storage with the dynamic filename
        const { data, error } = await supabase.storage.from('bucket').upload(fileName, file);

        if (error) {
          console.log('Error uploading logo:', error.message);
          return;
        }

        console.log('Logo uploaded successfully:', data);

        // Update the companyData.logo with the image URL
        const logoUrl = URL.createObjectURL(file);
        this.companyData.logo = logoUrl;
        this.companyData.bucket_id = 'bucket';
        this.companyData.logo_name = fileName;

        // Save the logo information to the "company" table
        const companyId = this.invoiceData.company_id; // Replace with the actual company ID
        await supabase
          .from('company')
          .update({
            logo: data,
            bucket_id: 'bucket', // Replace 'bucket' with your actual bucket_id
            logo_name: fileName,
          })
          .eq('id', companyId);

        // Refresh the companyData to reflect the updated logo
        await this.fetchCompanyData();
      } catch (error) {
        console.error('Error handling logo change:', error);
      }
    },
        calculateTotal() {
      let total = 0;
      for (const row of this.filteredInvoiceRows) {
        total += row.quantity * row.price_per_unit;
      }
      return total;
    },
  },

  setup(props) {

    const customerId = ref(null);
    const companyId = ref(null);
    const isEditing = ref(false);
    const invoiceRows = ref([]);
    const isEditingInvoice = ref(false);
    const invoiceData = ref({});
    const filteredInvoiceRows = ref([]);
    const companyData = ref({});
    const customerData = ref({});
    const isEditingRow = ref([]);
    const modalButton = ref(null);
    const logoUrl = ref(null);
    const selectedEntry = ref(null);
    const isEditingCurrentRow = ref(false);

    // Initialize reactive variables
    for (let i = 0; i < filteredInvoiceRows.value.length; i++) {
      isEditingRow[i] = false;
    }


    async function updateInvoiceData(invoiceDataToUpdate) {

      try {
        const { data, error } = await supabase
          .from('invoice')
          .update([invoiceData.value])
          .eq('invoice_number', props.selectedInvoice.invoice_number)

        if (error) {
          console.error('Failed to update invoice data:', error);
          return;
        }

        if (data) {
          console.log('Invoice data updated successfully:', data);
        }


      } catch (error) {
        console.error('Failed to update invoice data:', error);
      }

    }

    async function updateInvoiceNumber(newInvoiceNumber) {
      try {
        await supabase
          .from('invoice')
          .update({ invoice_number: newInvoiceNumber })
          .eq('invoice_number', props.selectedInvoice.invoice_number);

        // Update local invoiceData if it matches the selectedInvoice
        if (invoiceData.value.invoice_number === props.selectedInvoice.invoice_number) {
          invoiceData.value.invoice_number = newInvoiceNumber;
        }

        // Update other invoice rows with the same invoice number
        const otherInvoiceRows = filteredInvoiceRows.value.filter(
          row => row.invoice_number === props.selectedInvoice.invoice_number
        );
        for (const row of otherInvoiceRows) {
          row.invoice_number = newInvoiceNumber;
        }
      } catch (error) {
        console.error('Failed to update invoice number:', error);
      }
    }

    async function updateCustomerDataInDatabase(customerDataToUpdate) {
      try {
        const { data, error } = await supabase
          .from('customer')
          .update([this.customerData])
          .eq('id', props.selectedInvoice.customer_id)

        if (error) {
          console.error('Failed to update customer data:', error);
          return;
        }

        if (data) {
          console.log('Customer data updated successfully:', data);
        }
      } catch (error) {
        console.error('Failed to update customer data:', error);
      }
      toggleEditModeCustomer();
    }

    async function updateCompanyDataInDatabase(companyDataToUpdate) {
      try {
        const { data, error } = await supabase
          .from('company')
          .update([this.companyData])
          .eq('id', props.selectedInvoice.company_id)

        if (error) {
          console.error('Failed to update company data:', error);
          return;
        }

        if (data) {
          console.log('Company data updated successfully:', data);
        }
      } catch (error) {
        console.error('Failed to update company data:', error);
      }

    toggleEditModeCompany();
    }


    async function submitCompanyForm() {
      if (isEditingInvoice.value) {
        // If editing mode is on, save the updated invoice data
        await updatecompanyDataInDatabase();
      }
      // Toggle editing mode to exit it after saving/canceling changes
      toggleEditMode();
    };

    async function submitCustomerForm() {
      if (isEditingInvoice.value) {
        // If editing mode is on, save the updated invoice data
        await updatecustomerDataInDatabase();
      }
      // Toggle editing mode to exit it after saving/canceling changes
      toggleEditMode();
    };


    const submitInvoiceForm = async () => {
      if (isEditingInvoice.value) {
        // If editing mode is on, save the updated invoice data
        await updateInvoiceData();

      }
      // Toggle editing mode to exit it after saving/canceling changes
      toggleEditModeInvoice();
    };


    const toggleEditModeForm = () => {
      isEditingInvoice.value = !isEditingInvoice.value;
    };


    const fetchInvoiceData = async () => {
      try {
        const { data, error } = await supabase
          .from('invoice')
          .select('*')
          .eq('invoice_number', props.selectedInvoice.invoice_number)
          .limit(1);

        if (error) {
          console.error('Failed to fetch invoice data:', error);
          return;
        }

        if (data && data.length > 0) {
          invoiceData.value = data[0];
          await fetchCompanyData();
          await fetchCustomerData();
          await fetchInvoiceRowsByNumber(props.invoiceNumber);
        } else {
          console.error('No data found for invoice number:', props.invoiceNumber);
        }
      } catch (error) {
        console.error('Failed to fetch invoice data:', error);
      }
    };

    const fetchCompanyData = async () => {
      const companyId = invoiceData.value?.company_id;

      if (!companyId) {
        return;
      }

      try {
        const { data, error } = await supabase
          .from('company')
          .select('*')
          .eq('id', props.selectedInvoice.company_id)
          .single();

        if (error) {
          console.error('Failed to fetch company data:', error);
          return;
        }

        if (data) {
          companyData.value = data;

          if (data.logo_name && data.bucket_id) {
            // Fetch the company logo from the storage bucket and set the logo URL
            const logoResponse = await supabase.storage.from(data.bucket_id).download(data.logo_name);

            if (logoResponse.error) {
              console.error('Error fetching company logo:', logoResponse.error.message);
              return;
            }

            const logoBlob = logoResponse.data;
            const logoUrl = URL.createObjectURL(new Blob([logoBlob]));

            companyData.value.logo = logoUrl;
          }
        }
      } catch (error) {
        console.error('Failed to fetch company data:', error);
      }
    };

    const fetchCustomerData = async () => {
      const customerId = invoiceData.value?.customer_id;

      if (!customerId) {
        return;
      }

      try {
        const { data, error } = await supabase
          .from('customer')
          .select('*')
          .eq('id', props.selectedInvoice.customer_id)
          .single();

        if (error) {
          console.error('Failed to fetch customer data:', error);
          return;
        }

        if (data) {
          customerData.value = data;
        }
      } catch (error) {
        console.error('Failed to fetch customer data:', error);
      }
    };
    // Bestellungs positionen sammeln
    const fetchInvoiceRowsByNumber = async (invoiceNumber) => {
      try {
        const { data, error } = await supabase
          .from('invoice')
          .select('*')
          .eq('invoice_number', props.selectedInvoice.invoice_number);

        if (error) {
          console.error('Failed to fetch invoice rows:', error);
          return;
        }

        if (data) {
          invoiceData.value.invoice_rows = data;
        }
      } catch (error) {
        console.error('Failed to fetch invoice rows:', error);
      }
    };

    function byteaToBase64(bytea) {
      const byteArray = new Uint8Array(bytea.data);
      let binary = '';
      for (let i = 0; i < byteArray.byteLength; i++) {
        binary += String.fromCharCode(byteArray[i]);
      }
      return 'data:image/png;base64,' + window.btoa(binary);
    };

    // Fetch invoice rows data from the 'invoice' table
    const fetchInvoiceRows = async () => {
      try {
        const { data, error } = await supabase
          .from('invoice')
          .select('*')
          .eq('invoice_number', props.selectedInvoice.invoice_number);

        if (error) {
          console.error('Failed to fetch invoice rows:', error);
          return;
        }

        if (data) {
          filteredInvoiceRows.value = data;
        }
      } catch (error) {
        console.error('Failed to fetch invoice rows:', error);
      }
    };

    const editRow = (index) => {
      isEditingRow[index] = true;
      isEditing.value = true;
    };

    async function updateRows() {
      try {
        for (const [index, row] of filteredInvoiceRows.value.entries()) {
          if (row.id) {
            // Recalculate the total before updating
            row.total = row.quantity * row.price_per_unit;

            await supabase
              .from('invoice')
              .update(row)
              .eq('id', row.id);
          }
        }
        console.log('Rows updated successfully');
      } catch (error) {
        console.error('Failed to update rows:', error);
      }
    };

    const addNewRow = async () => {
      const newRow = {
        invoice_number: props.selectedInvoice.invoice_number,
        company_id: props.selectedInvoice.company_id,
        customer_id: props.selectedInvoice.customer_id,
        description: '',
        quantity: 0,
        price_per_unit: 0,
        total: 0, // Initialize total to 0
      };
      filteredInvoiceRows.value.push(newRow);

      // Start editing the newly added row
      const newIndex = filteredInvoiceRows.value.length - 1;
      toggleEditRow(newIndex);
      isEditingCurrentRow.value = true;

    };

    const saveRow = async (index) => {
      const updatedRow = filteredInvoiceRows.value[index];

      // Calculate the total based on updated quantity and price_per_unit
      updatedRow.total = updatedRow.quantity * updatedRow.price_per_unit;

      // Perform update logic here, e.g., update the row in the database
      try {
        if (!updatedRow.id) {
          const { data, error } = await supabase
            .from('invoice')
            .insert([updatedRow]);

          if (error) {
            console.error('Failed to insert new row:', error);
            return;
          }

          if (data) {
            console.log('New row inserted successfully:', data);
            // Update the new row's id from the inserted data
            updatedRow.id = data[0].id;
          }
        } else {
          await supabase
            .from('invoice')
            .update(updatedRow)
            .eq('id', updatedRow.id);
          console.log('Row updated successfully');
        }
      } catch (error) {
        console.error('Failed to update row:', error);
      }

      isEditingRow[index] = false;
      isEditing.value = false;
      isEditingCurrentRow.value = false;
    };

    const saveNewRow = async () => {
      const newIndex = filteredInvoiceRows.value.length - 1;
      await saveRow(newIndex);
    };

    const cancelEdit = (index) => {
      isEditingRow[index] = false;
      isEditing.value = false;
      isEditingCurrentRow.value = false;
    };

    const deleteRow = (index) => {
      const rowToDelete = filteredInvoiceRows.value[index];

      // Delete the row from the database
      if (rowToDelete.id) { // Assuming each row has an 'id' property
        deleteRowFromDatabase(rowToDelete.id); // You need to implement this function
      }

      // Remove the row from the filteredInvoiceRows array
      filteredInvoiceRows.value.splice(index, 1);

      // Update the position field in the remaining rows after deletion
      for (let i = index; i < filteredInvoiceRows.value.length; i++) {
        filteredInvoiceRows.value[i].position = i + 1;
      }
    };

    async function deleteRowFromDatabase(rowId) {
      try {
        const { data, error } = await supabase
          .from('invoice')
          .delete()
          .eq('id', rowId);

        if (error) {
          console.error('Failed to delete row:', error);
          return;
        }

        if (data) {
          console.log('Row deleted successfully:', data);
        }
      } catch (error) {
        console.error('Failed to delete row:', error);
      }
    };

    onMounted(async () => {
      await fetchInvoiceData();
      await fetchCustomerData();
      await fetchCompanyData();
      await fetchInvoiceRows();
    });

    watch(companyData, (newValue, oldValue) => {
      // Check if the companyData has been fetched and has all the necessary properties
      const hasNecessaryProperties =
        newValue &&
        newValue.profession &&
        newValue.company_name &&
        newValue.name &&
        newValue.surname &&
        newValue.street &&
        newValue.street_number &&
        newValue.postal_code &&
        newValue.place &&
        newValue.uid_number &&
        newValue.account &&
        newValue.iban_number &&
        newValue.phone_number &&
        newValue.webpage &&
        newValue.email &&
        newValue.mwst &&
        newValue.bank &&
        newValue.logo; // Make sure the "logo" property is also present in the object

      if (hasNecessaryProperties) {
        // Render the template with the fetched companyData
        // You can update the template logic here if needed
      }
    });

    // Watch the customerData object for changes
    watch(customerData, (newValue, oldValue) => {
      // Check if the customerData has been fetched and has all the necessary properties
      const hasNecessaryProperties =
        newValue &&
        newValue.name &&
        newValue.surname &&
        newValue.street &&
        newValue.postcode &&
        newValue.place &&
        newValue.email &&
        newValue.streetnumber &&
        newValue.company_id; // Make sure the "company_id" property is also present in the object

      if (hasNecessaryProperties) {
        // Render the template with the fetched customerData
        // You can update the template logic here if needed
      }
    });

    // Watch the invoiceData object for changes
    watch(invoiceData, (newValue, oldValue) => {
      // Check if the invoiceData has been fetched and has all the necessary properties
      const hasNecessaryProperties =
        newValue &&
        newValue.invoice_number &&
        newValue.description &&
        newValue.price_per_unit &&
        newValue.quantity &&
        newValue.customer_id &&
        newValue.company_id; // Make sure the "customer_id" and "company_id" properties are also present in the object

      if (hasNecessaryProperties) {
        // Render the template with the fetched invoiceData
        // You can update the template logic here if needed
      }
      if (newValue.invoice_number !== oldValue.invoice_number) {
        updateInvoiceNumber(newValue.invoice_number);
      }
    });


    onMounted(() => {
      if (modalButton.value) {
        modalButton.value.click();

      }
    });


    // Function to toggle editing mode for Invoice
    function toggleEditModeInvoice() {
      isEditing.value = !isEditing.value;
    }

    // Function to toggle editing mode for Customer
    function toggleEditModeCustomer() {
      isEditing.value = !isEditing.value;
    }

    // Function to toggle editing mode for Company
    function toggleEditModeCompany() {
      isEditing.value = !isEditing.value;
    }

    const toggleEditMode = () => {
      isEditingInvoice.value = !isEditingInvoice.value;
    };

    const toggleEditRow = (index) => {
      isEditingRow.value[index] = !isEditingRow.value[index];
    };

    return {
      toggleEditMode,
      toggleEditModeInvoice,
      toggleEditModeCustomer,
      toggleEditModeCompany,
      companyData,
      customerData,
      isEditingInvoice,
      toggleEditModeForm,
      updateInvoiceData,
      invoiceData,
      submitInvoiceForm,
      submitCompanyForm,
      submitCustomerForm,
      updateCompanyDataInDatabase,
      updateCustomerDataInDatabase,
      updateRows,
      fetchCompanyData,
      fetchCustomerData,
      fetchInvoiceData,
      logoUrl,
      selectedEntry,
      isEditing,
      filteredInvoiceRows,
      addNewRow,
      deleteRow,
      modalButton,
      editRow,
      updateInvoiceNumber,
      saveRow,
      cancelEdit,
      isEditingRow,
      toggleEditRow,
      saveNewRow,
      isEditingCurrentRow,
    };
  },
};
</script>


<style>
.back {
  background-color: rgb(192, 212, 249);
}

.total-container {
  margin-right: 15%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  font-weight: bold;
}
.table-container {
  overflow-x: auto;
  max-width: 100%;
}
/* 
.table {
  table-layout: fixed;
  width: 100%;
}

.table td,
.table th {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
 */

</style>