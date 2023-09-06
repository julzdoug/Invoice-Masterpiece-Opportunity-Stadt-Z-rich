<template>
  <div class="page-container">
    <Header />
    <div class="content-fluid bg-primary bg-opacity-25 ms-3 me-3">
      <div class="container top">
        <select v-model="selectedEntry" class="form-select mt-3" aria-label="Default select example">
          <option selected>Select an entry</option>
          <option v-for="entry in entries.customer" :key="entry.id" :value="entry">
            {{ entry.name }}
          </option>
        </select>
        <div v-if="selectedTable === 'customer'">
        </div>
        <form class="container mt-5 smaller-form bg-body" @submit.prevent="submitCustomerForm">
          <div class="row">
            <div class="form-group col-md-6 mb-3">
              <div class="row">
                <div class="d-flex justify-content-start"></div>
                <div class="col-8 d-flex justify-content-start mt-5 mb-5">

<!--                   <button class="btn btn-primary" @click="toggleEditMode" v-if="selectedEntry" ><i
                      class="bi bi-pencil">Drücke mich</i></button> -->

                </div>
              </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3 col-sm-12">
                  <label>Gender:</label>
                  <div class="form-check" v-if="isEditing">
                    <input class="form-check-input" type="radio" id="mrRadio" value="Herr"
                      v-model="customerData.gender" />
                    <label class="form-check-label" for="mrRadio">Herr</label>
                  </div>
                  <div class="form-check" v-if="isEditing">
                    <input class="form-check-input" type="radio" id="mrsRadio" value="Frau"
                      v-model="customerData.gender" />
                    <label class="form-check-label" for="mrsRadio">Frau</label>
                  </div>
                  <div class="form-check" v-if="isEditing">
                    <input class="form-check-input" type="radio" id="noneRadio" value="" v-model="customerData.gender" />
                    <label class="form-check-label" for="noneRadio">None</label>
                  </div>
                  <div v-else>
                    <div class="form-control-static" v-if="customerData && customerData.name">{{ customerData.gender ||
                      'None' }}</div>
                  </div>
                </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-3">
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
                  <div class="col-md-6 mb-3">
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
                  <div class="col-md-6 mb-3">
                    <label for="validation3">Strasse:</label>
                    <div class="input-container">
                      <template v-if="isEditing">
                        <input type="text" class="form-control" placeholder="Strasse" required
                          v-model="customerData.street">
                      </template>
                      <template v-else>
                        <div class="form-control-static" v-if="customerData && customerData.street">{{ customerData.street
                        }}</div>
                      </template>
                    </div>
                    <div class="invalid-feedback">
                      Strasse Bitte eintragen.
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="validation3">Nummer:</label>
                    <div class="input-container">
                      <template v-if="isEditing">
                        <input type="text" class="form-control" pattern="[0-9]*" placeholder="Nummer" required
                          v-model="customerData.streetnumber">
                      </template>
                      <template v-else>
                        <div class="form-control-static" v-if="customerData && customerData.streetnumber">{{
                          customerData.streetnumber }}
                        </div>
                      </template>
                    </div>
                    <div class="invalid-feedback">
                      Nummer Bitte eintragen.
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-3">
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
                  <div class="col-md-6 mb-3">
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
                  <div class="col-md-6 mb-3">
                    <label for="validation3">Email:</label>
                    <div class="input-container">
                      <template v-if="isEditing">
                        <input type="email" class="form-control" placeholder="Email" required
                          v-model="customerData.email">
                      </template>
                      <template v-else>
                        <div class="form-control-static" v-if="customerData && customerData">{{ customerData.email }}</div>
                      </template>
                    </div>
                    <div class="invalid-feedback">
                      Email Bitte eingeben.
                    </div>
                  </div>
                </div>
                <!-- Save and Delete buttons -->
                <div class="row">
                  <div class="col-2 d-flex justify-content-start">
                    <button class="btn btn-danger btn-lg mt-3 mb-5"  v-if="customerData.id" 
                      @click="deleteCustomer">Löschen</button>
                  </div>
                  <div class="col-8 d-flex justify-content-center">
                                        
                  </div>
                  <div class="col-2 d-flex justify-content-end">
<button class="btn btn-success btn-lg mb-5 mt-3"  v-if="customerData.id" @click="saveChanges">Speichern</button>
                    <button class="btn btn-success btn-lg mb-5 mt-3"  v-if="!customerData.id" 
                      @click="createNewCustomer">Erstellen</button>
                  </div>
                </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
import Header from './Header.vue';
import Footer from './footer.vue';

export default {
  components: {
    Header,
    Footer,
  },

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
    const isEditing = ref(true);


    async function saveChanges() {
      try {
        if (selectedTable.value === 'customer' && customerId.value) {
          // Update existing customer
          const { data, error } = await supabase
            .from('customer')
            .update(this.customerData.value) // Use customerData directly


          if (error) {
            throw new Error(error.message);
          }
          location.reload();
          // Handle success or show an appropriate message to the user
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


    // Function to create a new customer
    async function createNewCustomer(customerData) {
      try {
        const { data, error } = await supabase
          .from('customer')
          .upsert([{ ...this.customerData }])

        if (error) {
          console.error('Failed to create a new customer:', error);
        } else {
          // Handle success, e.g., show a success message
          console.log('New customer created successfully!', data);
          location.reload();
        }
      } catch (error) {
        console.error('Error creating a new customer:', error);
      }
    }


    async function loadCustomerData() {
      if (!selectedTable.value) {
        clearFormData();
        return;
      }

      try {
        clearFormData();
        const { data, error } = await supabase
          .from(selectedTable.value)
          .select('*');

        if (error) {
          console.error(`Failed to fetch ${selectedTable.value} data:`, error);
        } else {
          // Assign data to entries.company
          if (data.length > 0) {
            entries.value.customer = data;
            customerData.value = { ...data[0] }; // Pre-fill form fields with selected entry
            selectedEntry.value = data[0]; // Set selectedEntry to the first entry
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
  const customerNameToDelete = customerData.value.name; // Get the name of the customer to delete

  if (customerNameToDelete) {
    // Display a confirmation dialog
    const confirmDelete = window.confirm(`Are you sure you want to delete customer ${customerNameToDelete}?`);

    if (confirmDelete) {
      try {
        console.log('Deleting customer with name:', customerNameToDelete); // Debugging

        const { data, error } = await supabase
          .from('customer')
          .delete()
          .eq('name', customerNameToDelete); // Match customers by name

        if (error) {
          console.error('Failed to delete customer:', error);
        } else {
          // Remove the deleted customer from the form
          customerId.value = null;
          console.log('Customer deleted successfully'); // Debugging
          location.reload(); // Optionally, you can reload the customer list after deleting the customer
          await loadCustomerList(); // You may need to define loadCustomerList() if it's not in your current code.
        }
      } catch (error) {
        console.error('Failed to delete customer:', error);
      }
    } else {
      console.log('Delete action canceled.');
    }
  } else {
    console.error('No customer selected to delete');
  }
}


/*     async function deleteCustomer() {
      const customerNameToDelete = customerData.value.name; // Get the name of the customer to delete
      if (customerNameToDelete) {

        try {
          console.log('Deleting customer with name:', customerNameToDelete); // Debugging

          const { data, error } = await supabase
            .from('customer')
            .delete()
            .eq('name', customerNameToDelete); // Match customers by name

          if (error) {
            console.error('Failed to delete customer:', error);
          } else {
            // Remove the deleted customer from the form
            customerId.value = null;
            console.log('Customer deleted successfully'); // Debugging
            location.reload(); // Optionally, you can reload the customer list after deleting the customer
            await loadCustomerList(); // You may need to define loadCustomerList() if it's not in your current code.
          }
        } catch (error) {
          console.error('Failed to delete customer:', error);
        }
      } else {
        console.error('No customer selected to delete');
      }
    } */




    function toggleEditMode() {
      if (selectedTable.value === 'customer') {
        if (customerData.value) {
          isEditing.value = !isEditing.value;
          if (!isEditing.value) {
            clearFormData(); // Clear the form data when exiting edit mode
          }
        }
      }
    }




    onMounted(async () => {
      await loadCustomerData();
      clearFormData();
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
  display: flexbox;
  /* Adjust the value as needed */
  margin-bottom: 10%;
  /* Enable vertical scrolling if necessary */
}

img {
  height: 50%;
  width: 50%;
}

.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* Ensure the page takes at least the full viewport height */
}

.top {
  margin-top: 15vh;
}</style>