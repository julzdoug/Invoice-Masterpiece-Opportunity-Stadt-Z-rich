<template>
  <div v-if="customerData">
    <div class="container-lg">
      <!-- Customer data section -->
      <div class="mt-5">
        <div class="col-3 text-start fs-4"><strong>Customer:</strong></div>
        <select v-model="selectedCustomer" class="col-4 form-select" @change="loadCustomerData">
          <option disabled value="">Select a customer</option>
          <option v-for="customer in customers" :key="customer.id" :value="customer.id">
            {{ customer.name }}
          </option>
        </select>
        <form>
          <h2 class="text-center mb-4 col-4">Customer Information</h2>
          <div class="row align-items-start">
            <div class="col-3 text-start fs-4"><strong>Name:</strong></div>
            <p class="col-2 fs-4">
              <template v-if="isEditing">
                <input v-model="customerData.name" />
              </template>
              <template v-else>
                {{ customerData.name }}
              </template>
            </p>
            <div class="w-100 d-none d-md-block"></div>
            <div class="col-3 text-start fs-4"><strong>Surname:</strong></div>
            <p class="col-2 fs-4">
              <template v-if="isEditing">
                <input v-model="customerData.surname" />
              </template>
              <template v-else>
                {{ customerData.surname }}
              </template>
            </p>
            <div class="w-100 d-none d-md-block"></div>
            <div class="col-3 text-start fs-4"><strong>Street:</strong></div>
            <p class="col-2 fs-4">
              <template v-if="isEditing">
                <input v-model="customerData.street" />
              </template>
              <template v-else>
                {{ customerData.street }}
              </template>
            </p>
            <div class="w-100 d-none d-md-block"></div>
            <div class="col-3 text-start fs-4"><strong>Street:</strong></div>
            <p class="col-2 fs-4">
              <template v-if="isEditing">
                <input v-model="customerData.streetnumber" />
              </template>
              <template v-else>
                {{ customerData.streetnumber }}
              </template>
            </p>
            <div class="w-100 d-none d-md-block"></div>
            <div class="col-3 text-start fs-4"><strong>Postal Code:</strong></div>
            <p class="col-2 fs-4">
              <template v-if="isEditing">
                <input v-model="customerData.postcode" />
              </template>
              <template v-else>
                {{ customerData.postcode }}
              </template>
            </p>
            <div class="w-100 d-none d-md-block"></div>
            <div class="col-3 text-start fs-4"><strong>Place:</strong></div>
            <p class="col-2 fs-4">
              <template v-if="isEditing">
                <input v-model="customerData.place" />
              </template>
              <template v-else>
                {{ customerData.place }}
              </template>
            </p>
            <div class="w-100 d-none d-md-block"></div>
            <div class="col-3 text-start fs-4"><strong>Email:</strong></div>
            <p class="col-2 fs-4">
              <template v-if="isEditing">
                <input v-model="customerData.email" />
              </template>
              <template v-else>
                {{ customerData.email }}
              </template>
            </p>
            <div class="w-100 d-none d-md-block"></div>
            <div class="col-3 text-start fs-4"><strong>Invoice Number:</strong></div>
            <p class="col-2 fs-4">
              <template v-if="isEditing">
                <input v-model="customerData.invoice_number" />
              </template>
              <template v-else>
                {{ customerData.invoice_number }}
              </template>
            </p>
          </div><div class="col-2">
            <a href="#" class="btn btn-primary" @click="toggleEditMode">{{ isEditing ? 'Cancel' : 'Edit Customer' }}</a>
          </div>
          <div class="col-2" v-if="isEditing">
            <button class="btn btn-primary" @click="saveChanges">Save Changes</button>
          </div>
        </form>
        <div>
          <button class="btn btn-primary mt-3" @click="handleNewCustomer">New Customer</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default {
  setup() {
    const router = useRouter();
    const user = ref(null);
    const customerData = ref({
      name: '',
      surname: '',
      street: '',
      streetnumber: '',
      postcode: '',
      place: '',
      email: '',
      invoice_number: '',
    });
    const customerId = ref(null);
    const isEditing = ref(false);
    const selectedCustomer = ref(null);
    const customers = ref([]);

    function toggleEditMode() {
      if (selectedCustomer.value || isEmptyForm()) {
        isEditing.value = !isEditing.value;
      }
    }

    function isEmptyForm() {
      const { name, surname, street, streetnumber, postcode, place, email, invoice_number } = customerData.value;
      return (
        name === '' &&
        surname === '' &&
        street === '' &&
        streetnumber === '' &&
        postcode === '' &&
        place === '' &&
        email === '' &&
        invoice_number === ''
      );
    }

    async function saveChanges() {
      try {
        if (customerId.value) {
          // Update existing customer
          const { data, error } = await supabase
            .from('customer')
            .update(getCustomerData())
            .match({ id: customerId.value });

          if (error) {
            console.error('Failed to save changes:', error);
          } else {
            isEditing.value = false;
          }
        } else {
          // Create new customer
          const { data, error } = await supabase
            .from('customer')
            .insert([getCustomerData()]);

          if (error) {
            console.error('Failed to create a new customer:', error);
          } else {
            customerId.value = data[0].id;
            selectedCustomer.value = data[0].id; // Select the newly created customer
            isEditing.value = false;
          }
        }
      } catch (error) {
        console.error('Failed to update/create data:', error);
      }
    }

    function getCustomerData() {
      return {
        name: customerData.value.name,
        surname: customerData.value.surname,
        street: customerData.value.street,
        streetnumber: customerData.value.streetnumber,
        postcode: customerData.value.postcode,
        place: customerData.value.place,
        email: customerData.value.email,
        invoice_number: customerData.value.invoice_number,
      };
    }

    async function handleNewCustomer() {
      if (isEmptyForm()) {
        customerData.value = {
          name: '',
          surname: '',
          street: '',
          streetnumber: '',
          postcode: '',
          place: '',
          email: '',
          invoice_number: '',
        };
        customerId.value = null;
        isEditing.value = true;
      }
    }

    async function loadCustomerData() {
      if (!selectedCustomer.value) {
        // Clear the form when no customer is selected
        customerData.value = {
          name: '',
          surname: '',
          street: '',
          streetnumber: '',
          postcode: '',
          place: '',
          email: '',
          invoice_number: '',
        };
        customerId.value = null;
        return;
      }

      try {
        const { data, error } = await supabase
          .from('customer')
          .select('*')
          .eq('id', selectedCustomer.value)
          .single();

        if (error) {
          console.error('Failed to fetch customer data:', error);
        } else {
          customerData.value = data;
          customerId.value = data.id;
        }
      } catch (error) {
        console.error('Failed to fetch customer data:', error);
      }
    }

    async function createNewCustomer() {
      try {
        const { data, error } = await supabase
          .from('customer')
          .insert([
            {
              name: '',
              surname: '',
              street: '',
              streetnumber: '',
              postcode: '',
              place: '',
              email: '',
              invoice_number: '',
            },
          ]);

        if (error) {
          console.error('Failed to create a new customer:', error);
        } else {
          customerId.value = data[0].id;
          selectedCustomer.value = data[0].id; // Select the newly created customer
          isEditing.value = true;
          await loadCustomerList(); // Reload the customer list after creating a new customer
        }
      } catch (error) {
        console.error('Failed to create a new customer:', error);
      }
    }

    async function loadCustomerList() {
      try {
        const { data, error } = await supabase
          .from('customer')
          .select('id, name')
          .order('name');

        if (error) {
          console.error('Failed to fetch customer list:', error);
        } else {
          customers.value = data;
        }
      } catch (error) {
        console.error('Failed to fetch customer list:', error);
      }
    }

    // Call loadCustomerData on selectedCustomer change
    watch(selectedCustomer, loadCustomerData);

    // Load customer list on component mount
    onMounted(loadCustomerList);

    return {
      selectedCustomer,
      customers,
      customerData,
      isEditing,
      toggleEditMode,
      saveChanges,
      handleNewCustomer,
    };
  },
};
</script>

  
<style scoped>
.container-lg {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.company-info-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.company-info-list li {
  margin-bottom: 10px;
}
</style>