<template>
  <div class="modal-header">Head</div>
   <div class="modal-body">
    <form class="container mt-5" @submit.prevent="updateCustomerDataInDatabase">
      <div class="row">
        <div class="col-8 d-flex justify-content-start">
        </div>
        <div class="col-8 d-flex justify-content-center">
          <button class="btn btn-primary btn-md" v-if="companyData" @click="toggleEditMode">{{
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
              <input type="text" class="form-control" placeholder="Vorname" required v-model="customerData.name">
            </template>
            <template v-else>
              <div class="form-control-static" v-if="customerData && customerData.name">{{ customerData.name }}</div>
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
              <div class="form-control-static" v-if="customerData && customerData.surname">{{ customerData.surname }}</div>
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
              <div class="form-control-static" v-if="customerData.streetnumber">{{ customerData.streetnumber }}</div>
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
              <div class="form-control-static" v-if="customerData && customerData.postcode">{{ customerData.postcode }}</div>
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
              <div class="form-control-static" v-if="customerData && customerData.place">{{ customerData.place }}</div>
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
              <input type="email" class="form-control" placeholder="Email" required v-model="customerData.email">
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
          <button class="btn btn-primary btn-md" v-if="customerData" @click="updateCustomerDataInDatabase">{{
            isEditing ? 'Cancel' :
            'Speichern'
          }}</button>
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
    const customerData = ref({});
    const selectedEntry = ref(null);

        // Fetch invoice data from the 'invoice' table


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


// Update customer data in the database
async function updateCustomerDataInDatabase() {
  try {
    const { data, error } = await supabase
      .from('customer')
      .update(customerData.value)
      .eq('id', customerId.value);

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
};


  async function submitCustomerForm() {
      try {
        const { data, error } = await supabase.from('customer').insert([customerData.value]);
        if (error) {
          console.error('Failed to submit customer form:', error);
          return;        }

        console.log('Customer form submitted successfully!');
        // Formularfelder bereitstellen
        customerData.value = {
            gender: '',
          name: '',
          surname: '',
          street: '',
          streetnumber: '',
          postcode: '',
          place: '',
          email: '',
        };
        // Ausgewählt leeren
        selectedEntry.value = null;
      } catch (error) {
        console.error('Failed to submit customer form:', error);
      }
    };


const submitInvoiceForm = async () => {
  if (isEditingInvoice.value) {
    // If editing mode is on, save the updated invoice data
    await updateInvoiceData();
  }
  // Toggle editing mode to exit it after saving/canceling changes
  toggleEditMode();
};


const toggleEditMode = () => {
  isEditingInvoice.value = !isEditingInvoice.value;
};

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


    const fetchCustomerData = async () => {
      const customerId = invoiceData.value?.customer_id;

      if (!customerId) {
        return;
      }

      try {
        const { data, error } = await supabase
          .from('customer')
          .select('*')
          .eq('id', customerId)
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
 

    onMounted(async () => {
      await fetchInvoiceData();
      await fetchCustomerData();
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
   watch(
      () => props.selectedInvoice,
      (newValue) => {
        invoiceData.value = newValue;
      }
    );

    return {

      customerData,
      isEditingInvoice,
      toggleEditMode,
      updateInvoiceData,
      invoiceData,
      submitInvoiceForm,

      submitCustomerForm,

      updateCustomerDataInDatabase,

      fetchCustomerData,
      fetchInvoiceData,
      logoUrl,
      selectedEntry,
      updateInvoiceData,
    };
  },
};
</script>