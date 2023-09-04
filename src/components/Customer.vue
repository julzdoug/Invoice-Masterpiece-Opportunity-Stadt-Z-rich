<template>
<select v-model="selectedEntry" class="form-select mt-3" aria-label="Default select example">
  <option disabled value="">Select an entry</option>
  
  <option v-for="entry in entries.customer" :key="entry.id" :value="entry">
    {{ entry.name }}
  </option>
</select>


  <div v-if="selectedTable === 'customer'">
    <form class="container mt-5" @submit.prevent="submitCustomerForm">

                               <div class="row">
  <div class="col-2 d-flex justify-content-start">

  </div>
  <div class="col-8 d-flex justify-content-center">
    <button class="btn btn- btn-md" v-if="!selectedEntry" @click="toggleEditMode">{{ isEditing ? 'Cancel' : 'Neu' }}</button>
    <button class="btn btn- btn-md" v-if="selectedEntry" @click="toggleEditMode">{{ isEditing ? 'Cancel' :
        'Ändern'
      }}</button>
  </div>
  <div class="col-2 d-flex justify-content-end">

  </div>
</div>
            <div class="col-md-6 mb-3 col-sm-12">
              <label>Gender:</label>
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
                <label class="form-check-label" for="noneRadio">None</label>
              </div>
              <div v-else>
                <div class="form-control-static" v-if="customerData && customerData.name">{{ customerData.gender || 'None' }}</div>
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
            
  <div class="col-2 d-flex justify-content-start">
    <button class="btn btn-danger btn-lg" v-if="selectedEntry" @click="deleteCustomer">löschen</button>
  </div>
  <div class="col-8 d-flex justify-content-center">

  </div>
  <div class="col-2 d-flex justify-content-end">
    <button class="btn btn-success btn-lg" :disabled="isCustomerSelected" @click="createNewCustomer">Erstellen</button>
    <button class="btn btn-success btn-lg" v-if="selectedEntry" @click="saveChanges">Speichern</button>
  </div>
</div>
    </form>
</div>
</template>

<script>

import { ref, onMounted, watch } from 'vue';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);


export default {
        computed: {
  isCustomerSelected() {
    const isSelected = !!this.selectedEntry;
    console.log('isCustomerSelected:', isSelected);
    return isSelected;
  },
},
  setup() {

    const selectedTable = ref('customer');
        const entries = ref({
      customer: [], // Initialize with an empty array
    });
    const selectedEntry = ref(null);

    const customerData = ref({
      name: '',
      surname: '',
      street: '',
      streetnumber: '',
      postcode: '',
      place: '',
      email: '',

    });
    const customerId = ref(null);
    const isEditing = ref(false);


    async function saveChanges() {
      try {
        if (selectedTable.value === 'customer' && customerId.value) {
          // Update existing customer
          const { data, error } = await supabase
            .from('customer')
            .update(getFormData(selectedTable.value, customerData.value, companyData.value))
            .eq('id', customerId.value);

          if (error) {
            throw new Error(error.message);
          }
          location.reload();
          // Handle success or show appropriate message to the user
          console.log('Customer data updated successfully!');
        } else {
          // Handle the case when the selected table or entry ID is not available
          throw new Error('Invalid table or entry ID');
        }
      } catch (error) {
        console.error('Error saving changes:', error.message);
        // Show an error message to the user or handle the error appropriately
      }
    }

    async function createNewCustomer() {
  try {
    if (!selectedEntry.value) {
      // Create a new company
      const { data, error } = await supabase
        .from('customer')
        .insert([customerData.value]);

      if (error) {
        console.error('Failed to create a new customer:', error);
      } else {
        customerId.value = data[0].id;
        isEditing.value = true;
        clearFormData(); // Clear the form data after creating a new company
        location.reload();
      }
    } else {
      // Update the selected entry (This part is for editing an existing entry)
      const { data, error } = await supabase
        .from('customer')
        .update(customerData.value)
        .eq('id', customerId.value);

      if (error) {
        console.error('Failed to update customer:', error);
      } else {
        location.reload();
      }
    }
  } catch (error) {
    console.error('Error creating/updating customer:', error);
  }
}

async function loadCustomerData() {
  if (!selectedTable.value) {
    clearFormData();
    return;
  }

  try {
    const { data, error } = await supabase
      .from(selectedTable.value)
      .select('*');

    if (error) {
      console.error(`Failed to fetch ${selectedTable.value} data:`, error);
    } else {
      // Assign data to entries.company
      if (data.length > 0) {
        // Set the selected entry to the first entry in the array
        selectedEntry.value = null;
        entries.value.customer = data; 
        customerData.value = { ...data[0] }; // Pre-fill form fields with selected entry
      }
    }

    // Add debugging statement to check the data
    console.log('Loaded customer data:', data);

    // Add a console.log statement here to check entries.company
    console.log('Entries.customer:', entries.customer);
  } catch (error) {
    console.error(`Failed to fetch ${selectedTable.value} data:`, error);
  }
}


function clearFormData() {
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
}


    async function deleteCustomer() {
      const customerIdToDelete = customerId.value;
      if (customerIdToDelete) {
        try {
          const { data, error } = await supabase
            .from('customer')
            .delete()
            .match({ id: customerIdToDelete });

          if (error) {
            console.error('Failed to delete customer:', error);
          } else {
            // Remove the deleted customer from the form
            customerId.value = null;
             location.reload();// Optionally, you can reload the customer list after deleting the customer
            await loadCustomerList();
          }
        } catch (error) {
          console.error('Failed to delete customer:', error);
        }
      } else {
        console.error('No customer selected to delete');
      }
    }


    function toggleEditMode() {
      if (selectedTable.value === 'customer') {
        if (customerData.value) {
          isEditing.value = !isEditing.value;
        
        if (!ifEditing.value) {
            clearFormData();
        }
    }
      }
    }

    onMounted(async () => {
await loadCustomerData();
    });

    watch(selectedTable, loadCustomerData);

          watch(selectedEntry, (newSelectedEntry) => {
      if (newSelectedEntry) {
        customerData.value = { ...newSelectedEntry };
      }
    });

    

    return {
      selectedTable,
      selectedEntry,
      customerId,
      customerData,
      isEditing,
      toggleEditMode,
      saveChanges,
      createNewCustomer,
      deleteCustomer,
      entries,

    };
  },
};
</script>

<style>
.input-container {
  position: relative;
}

.form-control-static {
  padding: 0.375rem 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  line-height: 2.0;
  min-height: 38px;
  /* Add a fixed height */
}

.smaller-form {
  display:flexbox; /* Adjust the value as needed */
  margin-bottom: 10%;/* Enable vertical scrolling if necessary */
}

img {
  height: 50%;
  width: 50%;
}


</style>