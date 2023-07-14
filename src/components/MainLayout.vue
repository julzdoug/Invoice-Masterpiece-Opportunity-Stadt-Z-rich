<template>
    <Header v-if="user" />
<Hero v-if="user" />
<Discription v-if="user" />
<div class="fit">
<section class="position-relative overflow-hidden p-3 p-md-5 m-md-3 bg-body-light">

  <div v-if="step === 1">
    <h1>Step 2: Company Form</h1>
    <form class="container mt-5 smaller-form" novalidate @submit.prevent="submitCompanyForm">
      <div class="row">
        <div class="form-group col-md-6 col-sm-12 mb-3">
          <div class="row">
            <label for="logoInput">Company Logo</label>
            <div class="text-center col-4">
              <div class="input-with-image">
                <input type="file" class="form-control" id="logoInput" @change="handleLogoChange($event)" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3 col-sm-12">
          <label for="validation3">Unternehmen:</label>
          <div class="input-container">
            <input type="text" class="form-control text-start" placeholder="Unternehmen" required v-model="companyData.profession">
          </div>
          <div class="invalid-feedback">
            Unternehmen Bitte eintragen.
          </div>
        </div>
        <div class="col-md-6 mb-3 col-sm-12">
          <label for="validation3">Firma:</label>
          <div class="input-container">
            <input type="text" class="form-control text-start" placeholder="Firma" v-model="companyData.company_name" required >
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
            <input type="text" class="form-control" placeholder="Vorname" required v-model="companyData.surname">
          </div>
          <div class="invalid-feedback">
            Vorname Bitte eintragen.
          </div>
        </div>
        <div class="col-md-6 mb-3 col-sm-12">
          <label for="validation3">Name:</label>
          <div class="input-container">
            <input type="text" class="form-control" placeholder="Name" required v-model="companyData.name">
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
            <input type="text" class="form-control" placeholder="Strasse" required v-model="companyData.street">
          </div>
          <div class="invalid-feedback">
            Strasse Bitte eintragen.
          </div>
        </div>
        <div class="col-md-6 mb-3 col-sm-12">
          <label for="validation3">Nummer:</label>
          <div class="input-container">
            <input type="text" class="form-control" pattern="[0-9]*" placeholder="Nummer" v-model="companyData.street_number" required >
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
            <input type="text" class="form-control" pattern="[0-9]*" placeholder="Postleitzahl" v-model="companyData.postal_code" required >
          </div>
          <div class="invalid-feedback">
            Postleitzahl Bitte eintragen.
          </div>
        </div>
        <div class="col-md-6 mb-3 col-sm-12">
          <label for="validation3">Ort:</label>
          <div class="input-container">
            <input type="text" class="form-control" placeholder="Ort" required v-model="companyData.place">
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
            <input type="email" class="form-control" placeholder="Email" required v-model="companyData.email">
          </div>
          <div class="invalid-feedback">
            Email Bitte eintragen.
          </div>
        </div>
        <div class="col-md-6 mb-3 col-sm-12">
          <label for="validation3">Webpage:</label>
          <div class="input-container">
            <input type="text" class="form-control" pattern="^(https?:\/\/)?([\w\d]+\.)?[\w-]+(\.[\w-]+)+([/?#]\S*)?$"
              placeholder="Webpage" v-model="companyData.webpage">
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
            <input type="text" class="form-control" pattern="[0-9]*" placeholder="Telefon Nummer"
              v-model="companyData.phone_number">
          </div>
          <div class="invalid-feedback">
            Telefon Nummer Bitte eintragen.
          </div>
        </div>
        <div class="col-md-6 mb-3 col-sm-12">
          <label for="validation3">UiD Nummer:</label>
          <div class="input-container">
            <input type="text" class="form-control" pattern="[0-9]*" placeholder="UiD Nummer" required
              v-model="companyData.uid_number">
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
            <input type="text" class="form-control" placeholder="IBAN" v-model="companyData.iban_number">
          </div>
          <div class="invalid-feedback">
            IBAN Bitte eintragen.
          </div>
        </div>
        <div class="col-md-6 mb-3 col-sm-12">
          <label for="validation3">Mehrwertsteuer:</label>
          <div class="input-container">
            <input type="text" class="form-control" placeholder="Mehrwertsteuer" v-model="companyData.MwSt">
          </div>
          <div class="invalid-feedback">
            Mehrwertsteuer Bitte eintragen.
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3 col-sm-12">
          <label for="validation3">Bank:</label>
          <div class="input-container">
            <input type="text" class="form-control" placeholder="Bank" v-model="companyData.bank">
          </div>
          <div class="invalid-feedback">
            Bank Bitte eintragen.
          </div>
        </div>
        <div class="col-md-6 mb-3 col-sm-12">
          <label for="validation3">Konto Nummer:</label>
          <div class="input-container">
            <input type="text" class="form-control" pattern="[0-9]*" placeholder="Konto Nummer"
              v-model="companyData.account">
          </div>
          <div class="invalid-feedback">
            Konto Nummer Bitte eintragen.
          </div>
        </div>
      </div>
    </form>
    <button @click="submitCompanyForm">Next</button>
  </div>

  <!-- Step 3: Customer Form -->
  <div v-if="step === 2">
    <h1>Step 3: Customer Form</h1>
    <form class="container mt-5 smaller-form" novalidate @submit.prevent="submitCustomerForm">
      <div class="row">
        <div class="col-md-6 mb-3 col-sm-12">
          <label for="validation3">Vorname:</label>
          <div class="input-container">
            <input type="text" class="form-control" placeholder="Vorname" required v-model="customerData.name">
          </div>
          <div class="invalid-feedback">
            Vorname Bitte eintragen.
          </div>
        </div>
        <div class="col-md-6 mb-3 col-sm-12">
          <label for="validation3">Name:</label>
          <div class="input-container">
            <input type="text" class="form-control" placeholder="Name" required v-model="customerData.surname">
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
            <input type="text" class="form-control" placeholder="Strasse" required v-model="customerData.street">
          </div>
          <div class="invalid-feedback">
            Strasse Bitte eintragen.
          </div>
        </div>
        <div class="col-md-6 mb-3 col-sm-12">
          <label for="validation3">Nummer:</label>
          <div class="input-container">
            <input type="text" class="form-control" pattern="[0-9]*" placeholder="Nummer" required
              v-model="customerData.streetnumber">
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
            <input type="text" class="form-control" pattern="[0-9]*" placeholder="Postleitzahl" required
              v-model="customerData.postcode">
          </div>
          <div class="invalid-feedback">
            Postleitzahl Bitte eintragen.
          </div>
        </div>
        <div class="col-md-6 mb-3 col-sm-12">
          <label for="validation3">Ort:</label>
          <div class="input-container">
            <input type="text" class="form-control" placeholder="Ort" required v-model="customerData.place">
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
            <input type="email" class="form-control" placeholder="Email" required v-model="customerData.email">
          </div>
          <div class="invalid-feedback">
            Email Bitte eingeben.
          </div>
        </div>
      </div>
<!--       <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-primary" @click="showNextForm = false">Back</button>
        <button type="submit" class="btn btn-primary">Submit</button>
      </div> -->
    </form>
    <button @click="submitCustomerForm">Next</button>
  </div>

      <div v-if="step === 3">
      <div class="col-md-3 col-sm-12 ms-5 d-flex text-center justify-content-end">
        <h1 class="fs-5">Rechnungsnummer:</h1>
        <input v-model="invoiceNumber" type="text" class="form-control mt-3" placeholder="Rechnungsnummer">
      </div>
      <div class="row">
        <hr class="mt-3">
        <div class="col-sm-3 col-sm-12 mt-3">
          <button @click="generateInvoiceNumber" class="btn btn-primary mt-2">Rechnungsnummer Generieren</button>
        </div>
      </div>
      <button @click="nextStep">Next</button>
    </div>

  <div v-if="step === 4">
    <h1>Step 4: Invoice Table</h1>
    <div class="table-responsive">
      <table class="col-sm-12 table table-borderless border-0 border-b-2"
        v-if="invoiceNumber !== '' || generateInvoiceNumber !== ''" aria-label="">
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
              <button class="btn btn-warning m-1" @click="editRow(index)">
                <i class="bi bi-pencil"></i>
              </button>
            </td>
            <td class="text-center">
              <button class="btn btn-warning m-1" @click="deleteRow(index)">
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
    </div>
    <button class="btn btn-primary mt-3" @click="addNewRow">Hinzufügen</button>
    <button class="btn btn-primary ms-5 mt-3" @click="saveChanges">Zur Rechnung</button>
  </div>

    <div v-if="!showNextForm" class="d-flex justify-content-center mt-3">
      <button type="button" class="btn btn-primary" @click="showNextForm = true">Next</button>
    </div>
</section>
<Footer />
    <main class="d-flex">
      <!-- Das Hauptmenu HelloWorld -->
      <section class="main-content flex-grow-1 d-flex align-items-center justify-content-center">
        <div class="container">
          <router-view v-if="user" :customerData="customerData" :selectedTable="selectedTable" />
        </div>
      </section>
    </main>
    <!--Ausloggen prozess-->
    <Login v-if="!user" @login-success="handleLoginSuccess" />
</div>
</template>

<script>
import { provide, ref, onMounted } from 'vue';

import { createClient } from '@supabase/supabase-js';
import { isAuthenticated } from '../auth.js';
import Header from "./Header.vue";
import Login from "./Login.vue";
import Hero from "./heroSection.vue";
import Discription from "./discription.vue";
import Footer from "./footer.vue";
// Your Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);



export default {
  components: {
    Header,
    Login,
    Hero,
    Discription,
    Footer,
  },
    data() {
    return {
      step: 1,
      invoiceNumber: ''
    };
  },
  methods: {
        nextStep() {      
      this.step++;
    },
    submitCompanyForm() {
      // Prepare the data to be saved
      const data = {
        ...this.companyData
      };

      // Save the data to Supabase
      supabase
        .from('company')
        .insert([data])
        .then((response) => {
          // Data saved successfully
          console.log('Data saved to Supabase:', response);
          this.step++;
        })
        .catch((error) => {
          // Error occurred while saving data
          console.error('Error saving data to Supabase:', error);
        });
    },
    submitCustomerForm() {
      // Prepare the data to be saved
      const data = {
        ...this.customerData
      };

      // Save the data to Supabase
      supabase
        .from('customer')
        .insert([data])
        .then((response) => {
          // Data saved successfully
          console.log('Data saved to Supabase:', response);
          this.step++;
        })
        .catch((error) => {
          // Error occurred while saving data
          console.error('Error saving data to Supabase:', error);
        });
    },
    saveData() {
      // Prepare the data to be saved
      const invoiceData = {
        invoiceNumber: this.invoiceNumber,
        companyData: this.companyData,
        customerData: this.customerData,
        invoiceRows: this.invoiceRows,
      };

      // Save the data to Supabase
      supabase
        .from('invoice')
        .insert([invoiceData])
        .then((response) => {
          // Data saved successfully
          console.log('Data saved to Supabase:', response);
        })
        .catch((error) => {
          // Error occurred while saving data
          console.error('Error saving data to Supabase:', error);
        });
    },
    // Other methods...
  },
  setup(_, { emit }) {
    const user = ref(isAuthenticated.value ? JSON.parse(localStorage.getItem('user')) : null);
    const selectedTable = ref('');
    provide('user', user);

    // After login
    const handleLoginSuccess = (loggedInUser) => {
      user.value = loggedInUser;
    };

    onMounted(() => {
      isAuthenticated.value = !!localStorage.getItem('user');
    });

    // Data variables
    const companyData = ref({
      profession: '',
      company_name: '',
      name: '',
      surname: '',
      street: '',
      street_number: '',
      postal_code: '',
      place: '',
      email: '',
      webpage: '',
      phone_number: '',
      uid_number: '',
      iban_number: '',
      MwSt: '',
      bank: '',
      account: '',
    });

    const customerData = ref({
      name: '',
      surname: '',
      street: '',
      streetnumber: '',
      postcode: '',
      place: '',
      email: '',
      
    });

    return {
      user,
      handleLoginSuccess,
      invoiceNumber: '',
      companyData,
      customerData,
      selectedTable,
    };
  },
};
</script>


<style scoped>
#app {
  height: 100vh;
}
.fit {
  height:auto;
}




/* .main-content {
  flex: 1;
  height: 100%;
} */

/* .container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
} */
</style>
