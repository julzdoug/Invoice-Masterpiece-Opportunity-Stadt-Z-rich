<template>
  <div class="modal-header">Head</div>
   <div class="modal-body">
    <form class="container mt-5 smaller-form" novalidate @submit.prevent="updateCompanyDataInDatabase">
      <div class="row">
        <div class="form-group col-md-6 col-sm-12 mb-3">
          <div class="row">
            <div class="col-8 d-flex justify-content-start">
            </div>
            <div class="col-8 d-flex ms-3 justify-content-center">
              <button class="btn btn-primary btn-md" v-if="companyData" @click="toggleEditMode">{{
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
              <div class="form-control-static" v-if="companyData.company_name">{{ companyData.company_name }}</div>
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
              <div class="form-control-static" v-if="companyData.street_number">{{ companyData.street_number }}</div>
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
              <div class="form-control-static" v-if="companyData.postal_code">{{ companyData.postal_code }}</div>
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
              <input type="text" class="form-control" pattern="^(https?:\/\/)?([\w\d]+\.)?[\w-]+(\.[\w-]+)+([/?#]\S*)?$"
                placeholder="Webpage" v-model="companyData.webpage">
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
              <div class="form-control-static" v-if="companyData.phone_number">{{ companyData.phone_number }}</div>
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
              <div class="form-control-static" v-if="companyData.iban_number">{{ companyData.iban_number }}</div>
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
              <button class="btn btn-success btn-md" v-if="companyData" @click="updateCompanyDataInDatabase">{{
                isEditing ? 'Cancel' : 'Speichern' }}</button>
            </div>
    </form>
   </div>
     <div class="modal-footer">

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
  customerData: { type: Object, required: true },
  isEditingInvoice: { type: Boolean, required: true },
},
  methods: {
    // ... your existing methods ...

    // Method to close the modal and emit the "close" event
    closeEditMode() {
      this.isEditingInvoice = false;
      this.$emit('close'); // Emit the custom "close" event to close the modal in myInvoice.vue
    },

    // Method to save changes and close the modal
    async updateInvoiceData() {
 try {
        const { data, error } = await supabase
          .from('invoice')
          .update(invoiceData.value)
          .eq('id', invoiceData.value.id);

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
      this.closeEditMode();
    },
  },
  setup(props) {
  const isEditingInvoice = ref(false);
    const invoiceData = ref(props.selectedInvoice);
    const companyData = ref({});
    const selectedEntry = ref(null);

    // Function to update invoice data
    async function updateInvoiceData() {
      try {
        const { data, error } = await supabase
          .from('invoice')
          .update(invoiceData.value)
          .eq('id', invoiceData.value.id);

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
      emit('close');
    };

// Update company data in the database
async function updateCompanyDataInDatabase() {
  try {
    const { data, error } = await supabase
      .from('company')
      .update(companyData.value)
      .eq('id', companyId.value);

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
};

async function submitCompanyForm() {
  try {
    const { data, error } = await supabase.from('company').insert([companyData.value]);
    if (error) {
      console.error('Failed to submit company form:', error);
      return;
    }

    // If necessary, you can add more logic here after submitting the form

    console.log('Company form submitted successfully!');
    // Clear form input fields
    companyData.value = {
      logo: '',
      company_name: '',
      profession: '',
      name: '',
      surname: '',
      street: '',
      street_number: '',
      postal_code: '',
      place: '',
      uid_number: '',
      account: '',
      iban_number: '',
      phone_number: '',
      webpage: '',
      email: '',
      mwst: '',
      bank: '',
    };
    // Clear selected entry
    selectedEntry.value = null;
  } catch (error) {
    console.error('Failed to submit company form:', error);
  }
};


const toggleEditMode = () => {
  isEditingInvoice.value = !isEditingInvoice.value;
};

const logoUrl = ref(null);
    // Rechnungsdaten Laden
    const fetchInvoiceData = async () => {
      try {
        const { data, error } = await supabase
          .from('invoice')
          .select('*')
          .eq('invoice_number', props.invoiceNumber)
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
          .eq('id', companyId)
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

    function byteaToBase64(bytea) {
  const byteArray = new Uint8Array(bytea.data);
  let binary = '';
  for (let i = 0; i < byteArray.byteLength; i++) {
    binary += String.fromCharCode(byteArray[i]);
  }
  return 'data:image/png;base64,' + window.btoa(binary);
};

    onMounted(async () => {
      await fetchInvoiceData();
      await fetchCompanyData();
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
   watch(
      () => props.selectedInvoice,
      (newValue) => {
        invoiceData.value = newValue;
      }
    );

    return {
      companyData,
      isEditingInvoice,
      toggleEditMode,
      updateInvoiceData,
      invoiceData,
      submitInvoiceForm,
      submitCompanyForm,
      updateCompanyDataInDatabase,
      fetchCompanyData,
      fetchInvoiceData,
      logoUrl,
      selectedEntry,
      updateInvoiceData,
    };
  },
};
</script>