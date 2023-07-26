<template>
  
  <div class="modal fade" id="exampleModalToggle3" aria-hidden="false" aria-labelledby="exampleModalToggleLabel"
        tabindex="-1">
        <div class="modal-dialog modal-xl modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalToggleLabel3">Modal 1</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form class="container mt-5 smaller-form" novalidate @submit.prevent="submitCompanyForm">
                <div class="row">
                  <div class="form-group col-md-6 col-sm-12 mb-3">
                    <div class="row">
                      <div class="col-8 d-flex justify-content-start">
                      </div>
                      <div class="col-8 d-flex ms-3 justify-content-center">
                        <button class="btn btn-primary btn-md" v-if="companyData" @click="toggleEditModeCompany">{{
                          isEditing ? 'Cancel' : 'Ändern' }}</button>
                      </div>
                      <div class="col-8 d-flex justify-content-end">
                      </div>
                    </div>
                    <label for="logoInput">Company Logo</label>
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
                            <img :src="companyData.logo" alt="Logo Preview" class="preview-image">
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
                        <input type="text" class="form-control" placeholder="Strasse" required
                          v-model="companyData.street">
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
                    <label for="validation3">Email:</label>
                    <div class="input-container">
                      <template v-if="isEditing">
                        <input type="email" class="form-control" placeholder="Email" required v-model="companyData.email">
                      </template>
                      <template v-else>
                        <div class="form-control-static" v-if="companyData.email">{{ companyData.email }}</div>
                      </template>
                    </div>
                    <div class="invalid-feedback">
                      Email Bitte eintragen.
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
                        <input type="text" class="form-control" placeholder="IBAN" v-model="companyData.iban_number">
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
                        <input type="text" class="form-control" placeholder="Mehrwertsteuer" v-model="companyData.mwst">
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
                <div class="col-8 d-flex ms-3 justify-content-center">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal"
                @close="closeEditModal">invoice</button>
                <button class="btn btn-primary" data-bs-target="#exampleModalToggle"
                data-bs-toggle="modal">customer</button>
              <button type="submit" @click="updateCompanyDataInDatabase(companyData.value)" class="btn btn-primary">Save</button>
              </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel3"
        tabindex="-1">
        <div class="modal-dialog modal-xl modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Modal 1</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form class="container mt-5" @submit.prevent="submitCustomerForm">
                <div class="row">
                  <div class="col-8 d-flex justify-content-start">
                  </div>
                  <div class="col-8 d-flex justify-content-center">
                    <button class="btn btn-primary btn-md" v-if="customerData" @click="toggleEditModeCustomer">{{
                      isEditing ? 'Cancel' :
                      'Ändern'
                    }}</button>
                  </div>
                  <div class="col-8 d-flex justify-content-end">
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-3 col-sm-12">
                    <label for="validation3">Vorname:</label>
                    <div class="input-container">
                      <template v-if="isEditing">
                        <input type="text" class="form-control" placeholder="Vorname" required
                          v-model="customerData.name">
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
                        <input type="text" class="form-control" placeholder="Name" required
                          v-model="customerData.surname">
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
                        <input type="text" class="form-control" placeholder="Strasse" required
                          v-model="customerData.street">
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
                    <label for="validation3">Email:</label>
                    <div class="input-container">
                      <template v-if="isEditing">
                        <input type="email" class="form-control" placeholder="Email" required
                          v-model="customerData.email">
                      </template>
                      <template v-else>
                        <div class="form-control-static" v-if="customerData">{{ customerData.email }}</div>
                      </template>
                    </div>
                    <div class="invalid-feedback">
                      Email Bitte eingeben.
                    </div>
                  </div>
                </div>
                <div class="col-8 d-flex justify-content-center">
                </div>
     
              </form>
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" data-bs-target="#exampleModalToggle3" data-bs-toggle="modal"
                @close="closeEditModal">Company</button>
              <button class="btn btn-primary" data-bs-target="#exampleModalToggle2"
                data-bs-toggle="modal">Invoice</button>
<button type="submit"  @click="updateCustomerDataInDatabase(customerData.value)" class="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2"
        tabindex="-1">
        <div class="modal-dialog modal-xl modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">Modal 2</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="submitInvoiceForm">
                <div class="container mt-5 col-md-8 text-center d-flex justify-content-center align-items-center">
                  <div class="row">
                    <div class="col-8 d-flex justify-content-center">
                    </div>
                                      <div class="col-8 d-flex justify-content-center">
                    <button class="btn btn-primary btn-md" v-if="invoiceData" @click="toggleEditModeInvoice">{{
                      isEditing ? 'Cancel' :
                      'Ändern'
                    }}</button>
                  </div>
                    <h1 class="fs-5">3. Rechnungsnummer:</h1>
                      <template v-if="isEditing">
                        <input type="text" class="form-control mt-3" placeholder="Rechnungsnummer" required
                          v-model="invoiceData.invoice_number">
                      </template>
                      <template v-else>
                        <div class="form-control-static" v-if="invoiceData.invoice_number">{{ invoiceData.invoice_number }}</div>
                      </template>

                    <hr class="mt-3">
                    <table class="col-sm-12 table table-borderless border-0 border-b-2" aria-label="">
                      <thead>
                        <tr>
                          <th class="text-dark bg-light"></th>
                          <th class="text-dark bg-light text-center"><span><i class="bi bi-pencil"></i></span></th>
                          <th class="text-dark bg-light text-center"><span><i class="bi bi-wrench"></i></span></th>
                          <th class="text-dark bg-light">Pos.</th>
                          <th class="text-dark bg-light">Rechnungsnummer</th>
                          <th class="text-dark bg-light">Bezeichnung</th>
                          <th class="text-dark bg-light">Menge</th>
                          <th class="text-dark bg-light">Preis/Stück</th>
                          <th class="width=140 text-dark bg-light">Positionspreis</th>
                        </tr>
                      </thead>
                      <tbody class="text-95 text-secondary-d3">
                        <tr v-for="(row, index) in filteredInvoiceRows" :key="row.id">
                          <td>
                            <input type="checkbox" v-model="row.checked" />
                          </td>
                          <td class="text-center">
                            <button class="btn btn-warning m-1" v-if="invoiceData" @click="editRow(index)">
                              <i class="bi bi-pencil"></i>
                            </button>
                          </td>
                          <td class="text-center">
                            <button class="btn btn-warning m-1" v-if="invoiceData" @click="deleteRow(index)">
                              <i class="bi bi-trash3"></i>
                            </button>
                          </td>
                          <td>{{ row.position }}</td>
                          <td>{{ row.invoice_number }}</td>
   <td>
      <template v-if="isEditing[index]">
        <input v-model="row.description" />
      </template>
      <template v-else>
        {{ row.description }}
      </template>
    </td>
    <td>
      <template v-if="isEditing[index]">
        <input v-model="row.quantity" type="number" />
      </template>
      <template v-else>
        {{ row.quantity }}
      </template>
    </td>
    <td class="text-95">
      <template v-if="isEditing[index]">
        <input v-model="row.price_per_unit" type="number" />
      </template>
      <template v-else>
        {{ row.price_per_unit }}
      </template>
    </td>
                          <td class="text-secondary-d2">{{ row.quantity * row.price_per_unit }}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="col-8 d-flex justify-content-center">
                      <button class="col btn btn-success mt-3" @click="addNewRow">Hinzufügen</button>
                    </div>                   
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" data-bs-target="#exampleModalToggle3" data-bs-toggle="modal"
               >company</button>
              <button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Customer</button>
                <button type="submit" @click="updateInvoiceData(invoiceData.value)" class="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
<button ref="modalButton" class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Invoice</button> 
 

</template>

<script>

import { ref, onMounted, watch, } from 'vue';
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



  setup(props) {
  const isEditingInvoice = ref(false);
    const invoiceData = ref({});
    const companyData = ref({});
    const customerData = ref({});
    const selectedEntry = ref(null);
    const customerId = ref(null);
const companyId = ref(null);
const isEditing = ref(false);
const modalButton = ref(null);

        // Fetch invoice data from the 'invoice' table


    // Function to update invoice data
async function updateInvoiceData(invoiceDataToUpdate) {
  
  try {
    const { data, error } = await supabase
      .from('invoice')
      .update([this.invoiceData])
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
  toggleEditMode();
};


const toggleEditModeForm = () => {
  isEditingInvoice.value = !isEditingInvoice.value;
};



const logoUrl = ref(null);
    // Rechnungsdaten Laden
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
   const filteredInvoiceRows = ref([]);

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
  isEditing.value[index] = !isEditing.value[index];
};

   const addNewRow = () => {
      filteredInvoiceRows.value.push({
        position: filteredInvoiceRows.value.length + 1,
        invoice_number: '',
        description: '',
        quantity: 0,
        price_per_unit: 0,
      });
    };

   const deleteRow = (index) => {
      filteredInvoiceRows.value.splice(index, 1);
      // If you want to update the 'position' field in the remaining rows after deletion, you can do it here
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
        newValue.MwSt &&
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
        newValue.postal_code &&
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



    return {
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
    };
  },
};
</script>


<style>
</style>