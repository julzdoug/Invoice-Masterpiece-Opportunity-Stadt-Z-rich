<template class="position-relative overflow-hidden p-3 p-md-5 m-md-3 bg-body-light">

  <div v-if="step === 1" class="d-flex justify-content-center align-items-center">
    <div class="row">
    <h1 class="justify-content-center">Rechnungsteller:</h1>
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
          <label for="validation3">Branche:</label>
          <div class="input-container">
            <input type="text" class="form-control text-start" placeholder="Branche" required v-model="companyData.profession">
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
            <input type="text" class="form-control" placeholder="Mehrwertsteuer" v-model="companyData.mwst">
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
      <div class="d-flex justify-content-center mt-3">
    <button class="btn btn-primary mb-5" @click="submitCompanyForm">Next</button>

    </div>
  </div>
</div>
  <!-- Step 3: Customer Form -->
  <div v-if="step === 2" class="d-flex justify-content-center align-items-center">
    <div class="row">
    <h1 class="justify-content-center">2. Kunde</h1>
    <form class="container mt-5 smaller-form" novalidate @submit.prevent="submitCustomerForm">
            <div class="row">
<div class="col-md-6 mb-3 col-sm-12">
  <label>Gender:</label>
  <div class="form-check">
    <input
      class="form-check-input"
      type="radio"
      id="mrRadio"
      value="Herr"
      v-model="customerData.gender"
    />
    <label class="form-check-label" for="mrRadio">Herr</label>
  </div>
  <div class="form-check">
    <input
      class="form-check-input"
      type="radio"
      id="mrsRadio"
      value="Frau"
      v-model="customerData.gender"
    />
    <label class="form-check-label" for="mrsRadio">Frau</label>
  </div>
  <div class="form-check">
    <input
      class="form-check-input"
      type="radio"
      id="noneRadio"
      value=""
      v-model="customerData.gender"
    />
    <label class="form-check-label" for="noneRadio">None</label>
  </div>
  <div class="invalid-feedback">
    Ansprache.
  </div>
</div>

        <div class="col-md-6 mb-3 col-sm-12">
        </div>
      </div>
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
    </form>
          <div class="d-flex justify-content-center mt-3">
    <button class="btn btn-primary mb-5" @click="submitCustomerForm">Next</button>
    <button class="btn btn-secondary me-3 mb-5" @click="previousStep">Previous</button>

    </div>
  </div>
  </div>

<div v-if="step === 3" class="d-flex justify-content-center align-items-center">
     <div class="row">
  <div class="col-md-8 text-center">
    <h1 class="fs-5">3. Rechnungsnummer:</h1>
    <input v-model="invoiceNumber" type="text" class="form-control mt-3" placeholder="Rechnungsnummer">
    <hr class="mt-3">
    <button @click="generateInvoiceNumber" class="btn btn-primary mt-2">Rechnungsnummer Generieren</button>
    <div>
    <button class="col btn btn-primary mt-3 mb-5" @click="nextStep()">Next</button>
    <button class="col btn btn-secondary mt-3 me-3 mb-5" @click="previousStep">Previous</button>
</div>
  </div>
  
</div>
</div>

<div v-if="step === 4" class="d-flex justify-content-center align-items-center">
  <div class="col-md-10">
    <h1 class="text-center">4. Rechnung</h1>
    <div class="table-responsive">
      <table class="table table-borderless border-0 border-b-2 col-md-6"
          v-if="invoiceNumber !== '' || generateInvoiceNumber !== ''" aria-label="">
          <thead>
            <tr>
              <th class="text-dark bg-light"></th>
              <th class="text-dark bg-light text-center"><span><i class="bi bi-pencil"></i></span></th>
              <th class="text-dark bg-light text-center"><span><i class="bi bi-trash3"></i></span></th>
              <th class="text-dark bg-light">Pos.</th>
              <th class="text-dark bg-light">Rechnungsnummer</th>
              <th class="text-dark bg-light">Bezeichnung</th>
              <th class="text-dark bg-light">Menge</th>
              <th class="text-dark bg-light">Preis/Stück</th>
              <th class="width=140 text-dark bg-light">Positionspreis</th>
            </tr>
          </thead>
          <tbody class="text-95 text-secondary-d3">
            <tr v-for="(row, index) in invoiceRows" :key="row.id">
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
              <td class="text-secondary-d2">{{ calculateRowTotal(row) }}</td>
            </tr>
          </tbody>
   </table>
    </div>
    <button class="btn btn-primary d-block mx-auto my-3 mb-5" @click="addNewRow">Add New Row</button>
    <button class="btn btn-primary d-block mx-auto my-3 mb-5" @click="saveChanges">Save Invoice</button>
    <button class="btn btn-secondary ms-3 mb-5" @click="previousStep">Previous</button>
  </div>
</div>

      
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const storage = supabase.storage;



export default {

  data() {
    return {
      step: 1,
      invoiceNumber: '',
      showNextForm: false,
      companyData: {},
      customerData: {},
      invoiceRows: [],
      isEditing: [],
      companyId: null,
      customerId: null,
    };
  },
  methods: {

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
    const companyId = this.companyData.id; // Replace with the actual company ID
    await supabase
      .from('company')
      .update({
        logo: data,
        bucket_id: 'bucket', // Replace 'bucket' with your actual bucket_id
        logo_name: fileName,
      })
      .eq('id', companyId);
  } catch (error) {
    console.error('Error handling logo change:', error);
  }
},

    async submitCompanyForm() {
      try {
        // Save the company data to the company table
        const { data, error } = await supabase
          .from('company')
          .insert([this.companyData])
          .single();

        if (error) {
          console.error('Failed to save company:', error);
          return;
        }

        console.log('Company saved:', data);

        const { data: fetchedCompanyData, error: fetchError } = await supabase
          .from('company')
          .select('id')
          .eq('company_name', this.companyData.company_name)
          .single();

        if (fetchError) {
          console.error('Failed to fetch company data:', fetchError);
          return;
        }

        this.companyId = fetchedCompanyData.id; // Save the inserted company ID
        this.step++;
      } catch (error) {
        console.error('Failed to save company:', error);
      }
    },

async submitCustomerForm() {
  try {
    const { data, error } = await supabase
      .from('customer')
      .insert([{ ...this.customerData, company_id: this.companyId }])
      .single();

    if (error) {
      console.error('Failed to save customer:', error);
      return;
    }

    console.log('Customer saved:', data);

    // Fetch the inserted customer data to get the customer ID
    const { data: fetchedCustomerData, error: fetchError } = await supabase
      .from('customer')
      .select('id')
      .eq('name', this.customerData.name)
      .single();

    if (fetchError) {
      console.error('Failed to fetch customer data:', fetchError);
      return;
    }

    this.customerId = fetchedCustomerData.id; // Save the inserted customer ID

    // Proceed to the next step
    this.step++;
  } catch (error) {
    console.error('Failed to save customer:', error);
  }
},

generateInvoiceNumber() {
  const currentYear = new Date().getFullYear();
  const randomNum = Math.floor(Math.random() * 100000);

  // Combine the current year and the random number to form the invoice number
  this.invoiceNumber = `${currentYear}-${randomNum}`;
},


    nextStep() {
      this.step++;
    },

    addNewRow() {
      const newRow = {
        invoice_number: this.invoiceNumber,
        description: '',
        quantity: 0,
        price_per_unit: 0.0,
        customer_id: this.customerId,
        company_id: this.companyId, 
      };
      this.invoiceRows.push(newRow);
      this.isEditing.push(true);
    },

    editRow(index) {
      this.isEditing[index] = true;
    },

    deleteRow(index) {
      this.invoiceRows.splice(index, 1);
      this.isEditing.splice(index, 1);
    },

    calculateRowTotal(row) {
      return row.quantity * row.price_per_unit;
    },

async submitInvoiceForm() {
  try {
    const { data, error } = await supabase
      .from('invoice')
      .insert([{ ...this.invoiceData, company_id: this.companyId, customer_id: this.customerId }])
      .single();

    if (error) {
      console.error('Failed to save invoice:', error);
      return;
    }

    console.log('Invoice saved:', data);

    // Proceed to the next step or perform any other actions
    this.step++;
  } catch (error) {
    console.error('Failed to save invoice:', error);
  }
},

    async saveChanges() {
      try {
        const invoicePromises = this.invoiceRows.map(async (invoice) => {
          const { description, price_per_unit, quantity } = invoice;
          const total = quantity * price_per_unit;
          const customer_id = this.customerId;
          const company_id = this.companyId;

          if (invoice.id) {
            await supabase
              .from('invoice')
              .update({ description, price_per_unit, quantity, total, customer_id, company_id })
              .match({ id: invoice.id });
            this.isEditing[invoice.id] = false;
          } else {
            const newRow = {
              description,
              price_per_unit,
              quantity,
              total,
              customer_id,
              company_id,
              invoice_number: this.invoiceNumber,
            };

            const { data, error } = await supabase.from('invoice').insert([newRow]);
            if (error) {
              console.error('Failed to insert new row:', error);
              return;
            }
            if (data && data.length > 0) {
              invoice.id = data[0].id;
              invoice.customer_id = data[0].customer_id;
              invoice.company_id = data[0].company_id;
              this.isEditing[invoice.id] = false;
            } else {
              console.error('No invoice data returned after insert.');
            }
          }
        });

        await Promise.all(invoicePromises);

        // Update the selected company and customer with the new data
        this.companyData = { ...this.companyData };
        this.customerData = { ...this.customerData };
       
        this.navigateToInvoice(); // Navigate to invoice after saving changes
      } catch (error) {
        console.error('Failed to save changes:', error);
      }
    },

  navigateToInvoice() {
      this.$router.push({ name: 'Invoices', params: { invoiceNumber: this.invoiceNumber } });
    },


async previousStep() {
  if (this.step === 3) {

    await this.deleteCustomer(); 
  } else if (this.step === 2) {
await this.deleteCompany();
  }

  if (this.step === 3 || this.step === 2 || this.step === 1) {
    
   
  }
 this.step--;
  
},

        async deleteCompany() {
      try {
        if (this.companyId) {
          const { data, error } = await supabase
            .from('company')
            .delete()
            .eq('id', this.companyId);

          if (error) {
            console.error('Failed to delete company:', error);
            return;
          }

          console.log('Company deleted:', data);
          this.companyId = null; // Reset the company ID
        }
      } catch (error) {
        console.error('Failed to delete company:', error);
      }
    },


async deleteCustomer() {
  try {
    if (this.customerId) {
      const { data, error } = await supabase
        .from('customer')
        .delete()
        .eq('id', this.customerId);

      if (error) {
        console.error('Failed to delete customer:', error);
        return;
      }

      console.log('Customer deleted:', data);
      this.customerId = null; // Reset the customerId
    }
  } catch (error) {
    console.error('Failed to delete customer:', error);
  }
},

    async deleteInvoice() {
      if (this.invoiceNumber) {
        await supabase
          .from('invoice')
          .delete()
          .eq('invoice_number', this.invoiceNumber);
      }
    },

  },
};
</script>