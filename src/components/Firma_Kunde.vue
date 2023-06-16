<template>
  <div class="container shadow min-vh-100 py-2">
    <div class="row">
      <div class="col">
        <h2 class="font-weight-light">Basic Example</h2>
        <select v-model="selectedTable" class="form-select" aria-label="Default select example">
          <option disabled value="">Select a table</option>
          <option value="customer">Customer</option>
          <option value="company">Company</option>
        </select>
        <select v-if="selectedTable && entries[selectedTable]" v-model="selectedEntry" class="form-select mt-3"
          aria-label="Default select example">
          <option disabled value="">Select an entry</option>
          <option v-for="entry in entries[selectedTable]" :key="entry.id" :value="entry">
            {{ entry.name }}
          </option>
        </select>
      </div>
      <div v-if="selectedTable === 'company'">
        <form @submit.prevent="submitCompanyForm">

          <div class="text-center col-4">
            <img :src="isEditing ? companyData.logo : '/malertapsen.jpg'" alt="Company Logo" class="img-fluid logo">
            <input v-if="isEditing" @change="handleLogoChange($event)" type="file">
          </div>
          <h2 class="text-center mb-4 col-4">MalerTapsen</h2>
          <div class="row align-items-start">
            <div class="col-3 text-start fs-4"><strong>Profession:</strong></div>
            <p class="col-2 fs-4">
              <template v-if="isEditing">
                <input v-model="companyData.profession" />
              </template>
              <template v-else>
                {{ companyData.profession }}
              </template>
            </p>
            <div class="w-100 d-none d-md-block"></div>
            <div class="col-3 text-start fs-4"><strong>Name:</strong></div>
            <p class="col-2 fs-4">
              <template v-if="isEditing">
                <input v-model="companyData.name" />
              </template>
              <template v-else>
                {{ companyData.name }}
              </template>
            </p>
            <div class="w-100 d-none d-md-block"></div>
            <div class="col-3 text-start fs-4"><strong>Surname:</strong></div>
            <p class="col-2 fs-4">
              <template v-if="isEditing">
                <input v-model="companyData.surname" />
              </template>
              <template v-else>
                {{ companyData.surname }}
              </template>
            </p>
            <div class="w-100 d-none d-md-block"></div>
            <div class="col-3 text-start fs-4"><strong>Street:</strong></div>
            <p class="col-2 fs-4">
              <template v-if="isEditing">
                <input v-model="companyData.street" />
              </template>
              <template v-else>
                {{ companyData.street }}
              </template>
            </p>
            <div class="w-100 d-none d-md-block"></div>
            <div class="col-3 text-start fs-4"><strong>Street Number:</strong></div>
            <p class="col-2 fs-4">
              <template v-if="isEditing">
                <input v-model="companyData.street_number" />
              </template>
              <template v-else>
                {{ companyData.street_number }}
              </template>
            </p>
            <div class="w-100 d-none d-md-block"></div>
            <div class="col-3 text-start fs-4"><strong>Postal Code:</strong></div>
            <p class="col-2 fs-4">
              <template v-if="isEditing">
                <input v-model="companyData.postal_code" />
              </template>
              <template v-else>
                {{ companyData.postal_code }}
              </template>
            </p>
            <div class="w-100 d-none d-md-block"></div>
            <div class="col-3 text-start fs-4"><strong>Place:</strong></div>
            <p class="col-2 fs-4">
              <template v-if="isEditing">
                <input v-model="companyData.place" />
              </template>
              <template v-else>
                {{ companyData.place }}
              </template>
            </p>
            <div class="w-100 d-none d-md-block"></div>
            <div class="col-3 text-start fs-4"><strong>UID Number:</strong></div>
            <p class="col-2 fs-4">
              <template v-if="isEditing">
                <input v-model="companyData.uid_number" />
              </template>
              <template v-else>
                {{ companyData.uid_number }}
              </template>
            </p>
            <div class="w-100 d-none d-md-block"></div>
            <div class="col-3 text-start fs-4"><strong>Account:</strong></div>
            <p class="col-2 fs-4">
              <template v-if="isEditing">
                <input v-model="companyData.account" />
              </template>
              <template v-else>
                {{ companyData.account }}
              </template>
            </p>
            <div class="w-100 d-none d-md-block"></div>
            <div class="col-3 text-start fs-4"><strong>IBAN Number:</strong></div>
            <p class="col-2 fs-4">
              <template v-if="isEditing">
                <input v-model="companyData.iban_number" />
              </template>
              <template v-else>
                {{ companyData.iban_number }}
              </template>
            </p>
            <div class="w-100 d-none d-md-block"></div>
            <div class="col-3 text-start fs-4"><strong>Phone Number:</strong></div>
            <p class="col-2 fs-4">
              <template v-if="isEditing">
                <input v-model="companyData.phone_number" />
              </template>
              <template v-else>
                {{ companyData.phone_number }}
              </template>
            </p>
            <div class="w-100 d-none d-md-block"></div>
            <div class="col-3 text-start fs-4"><strong>Webpage:</strong></div>
            <p class="col-2 fs-4">
              <template v-if="isEditing">
                <input v-model="companyData.webpage" />
              </template>
              <template v-else>
                {{ companyData.webpage }}
              </template>
            </p>
            <div class="w-100 d-none d-md-block"></div>
            <div class="col-3 text-start fs-4"><strong>Email:</strong></div>
            <p class="col-2 fs-4">
              <template v-if="isEditing">
                <input v-model="companyData.email" />
              </template>
              <template v-else>
                {{ companyData.email }}
              </template>
            </p>
          </div>
           <div class="col-2">
            <a class="btn btn-primary" @click="deleteCompany">löschen</a>
          </div>
          <div class="col-2">
            <a class="btn btn-primary" @click="toggleEditMode">{{ isEditing ? 'Cancel' : 'Edit Company' }}</a>
          </div>
          <div class="col-2" v-if="isEditing">
            <a class="btn btn-primary" @click="saveChanges">Save Changes</a>
          </div>
        </form>
          <div class="col-2">
            <a class="btn btn-primary" @click="toggleEditMode">{{ isEditing ? 'Cancel' : 'Edit Company' }}Neu erstellen</a>
          </div>
                        <div>
          <button class="btn btn-primary mt-3" @click="createNewCompany">Speichern</button>
        </div>
      </div>
      <div v-else-if="selectedTable === 'customer'">
        <form @submit.prevent="submitCustomerForm">
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
            <div class="col-3 text-start fs-4"><strong>Street Number:</strong></div>
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

          </div>
                    <div class="col-2">
            <a class="btn btn-primary" @click="deleteCustomer">Löschen</a>
          </div>
          <div class="col-2">
            <a class="btn btn-primary" @click="toggleEditMode">{{ isEditing ? 'Cancel' : 'Edit Customer' }}</a>
          </div>
          <div class="col-2" v-if="isEditing">
            <a class="btn btn-primary" @click="saveChanges">Save Changes</a>
          </div>

        </form>
                  <div class="col-2">
            <a class="btn btn-primary" @click="toggleEditMode">{{ isEditing ? 'Cancel' : 'Edit Customer' }}Neu erstellen</a>
          </div>
          <div>
          <button class="btn btn-primary mt-3" @click="createNewCustomer">Speichern</button>
        </div>
      </div>

      
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function getFormData(selectedTable, customerData, companyData) {
  if (selectedTable === 'customer') {
    return {
      name: customerData.name,
      surname: customerData.surname,
      street: customerData.street,
      streetnumber: customerData.streetnumber,
      postcode: customerData.postcode,
      place: customerData.place,
      email: customerData.email,

    };
  } else if (selectedTable === 'company') {
    return {
      logo: companyData.logo,
      company_name: companyData.company_name,
      profession: companyData.profession,
      name: companyData.name,
      surname: companyData.surname,
      street: companyData.street,
      street_number: companyData.street_number,
      postal_code: companyData.postal_code,
      place: companyData.place,
      uid_number: companyData.uid_number,
      account: companyData.account,
      iban_number: companyData.iban_number,
      phone_number: companyData.phone_number,
      webpage: companyData.webpage,
      email: companyData.email,
      MwSt: companyData.MwSt,
    };
  }
}


export default {
  setup() {
    const router = useRouter();
    const selectedTable = ref('');


    const entries = {
      customer: [],
      company: [],
    };
    const selectedEntry = ref(null);
    const companyData = ref({
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
      MwSt: '',
    });
    const companyId = ref(null);
    const user = ref(null);
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
    const selectedCustomer = ref(null);
    const customer = ref([]);
    /*     const company = ref([]); */

function toggleEditMode() {
  if (selectedTable.value === 'customer') {
    if (customerData.value || isEmptyForm()) {
      isEditing.value = !isEditing.value;
    }
  } else if (selectedTable.value === 'company') {
    if (companyData.value || isEmptyForm()) {
      isEditing.value = !isEditing.value;
    }
  }
}



function isEmptyForm() {
  const {
    name,
    surname,
    street,
    streetnumber,
    postcode,
    place,
    email,
  } = customerData.value;
  return (
    name === '' &&
    surname === '' &&
    street === '' &&
    streetnumber === '' &&
    postcode === '' &&
    place === '' &&
    email === ''
  );
}


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

      // Handle success or show appropriate message to the user
      console.log('Customer data updated successfully!');
    } else if (selectedTable.value === 'company' && companyId.value) {
      // Update existing company
      const { data, error } = await supabase
        .from('company')
        .update(getFormData(selectedTable.value, customerData.value, companyData.value))
        .eq('id', companyId.value);

      if (error) {
        throw new Error(error.message);
      }

      // Handle success or show appropriate message to the user
      console.log('Company data updated successfully!');
    } else {
      // Handle the case when the selected table or entry ID is not available
      throw new Error('Invalid table or entry ID');
    }
  } catch (error) {
    console.error('Error saving changes:', error.message);
    // Show an error message to the user or handle the error appropriately
  }
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

        };
        customerId.value = null;
        isEditing.value = true;
      }
    }

    async function loadCustomerList() {
      try {
        const { data: customerData, error: customerError } = await supabase
          .from('customer')
          .select('id, name, surname, street, postcode, place, email, streetnumber')
          .order('name');

        const { data: companyData, error: companyError } = await supabase
          .from('company')
          .select('id, logo, company_name, profession, name, surname, street, street_number, postal_code, place, uid_number, account, iban_number, phone_number, webpage, email')
          .order('name');

        if (customerError) {
          console.error('Failed to fetch customer list:', customerError);
        } else {
          entries.customer = customerData;
        }

        if (companyError) {
          console.error('Failed to fetch company list:', companyError);
        } else {
          entries.company = companyData;
        }
      } catch (error) {
        console.error('Failed to fetch customer and company lists:', error);
      }
    }

    async function createNewCompany() {
      try {
        const { data, error } = await supabase
          .from('company')
          .insert([
            {
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
      MwSt: '',

            },
          ]);

        if (error) {
          console.error('Failed to create a new customer:', error);
        } else {
          companyId.value = data[0].id;
          selectedCompany.value = data[0].id; // Select the newly created customer
          isEditing.value = true;
          await loadCustomerList(); // Reload the customer list after creating a new customer
        }
      } catch (error) {
        console.error('Failed to create a new customer:', error);
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

    async function loadCustomerData() {
      if (!selectedTable.value || !selectedEntry.value) {
        clearFormData();
        return;
      }

      try {
        const { data, error } = await supabase
          .from(selectedTable.value)
          .select('*')
          .eq('id', selectedEntry.value)
          .single();

        if (error) {
          console.error(`Failed to fetch ${selectedTable.value} data:`, error);
        } else {
          if (selectedTable.value === 'customer') {
            customerData.value = data;
            customerId.value = data.id;
          } else if (selectedTable.value === 'company') {
            companyData.value = data;
            companyId.value = data.id;
          }
        }
      } catch (error) {
        console.error(`Failed to fetch ${selectedTable.value} data:`, error);
      }
    }
  async function deleteCompany() {
   const customerIdToDelete = companyId.value;
    if (customerIdToDelete) {
      try {
        const { data, error } = await supabase
          .from('company')
          .delete()
          .match({ id: customerIdToDelete });

        if (error) {
          console.error('Failed to delete customer:', error);
        } else {
          // Remove the deleted customer from the form
          selectedCustomer.value = null;
          // Optionally, you can reload the customer list after deleting the customer
          await loadCustomerList();
        }
      } catch (error) {
        console.error('Failed to delete customer:', error);
      }
    } else {
      console.error('No customer selected to delete');
    }
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
          selectedCustomer.value = null;
          // Optionally, you can reload the customer list after deleting the customer
          await loadCustomerList();
        }
      } catch (error) {
        console.error('Failed to delete customer:', error);
      }
    } else {
      console.error('No customer selected to delete');
    }
  }

    function clearFormData() {
      customerData.value = {
        name: '',
        surname: '',
        street: '',
        streetnumber: '',
        postcode: '',
        place: '',
        email: '',

      };
      companyId.value = null;
    }

    function handleCustomerData(data) {
      if (Array.isArray(data)) {
        customerData.value = data[0];
        customerId.value = data[0].id;
      } else {
        customerData.value = data;
        customerId.value = data.id;
      }
    }

    function handleCompanyData(data) {
      if (Array.isArray(data)) {
        companyData.value = data[0];
        companyId.value = data[0].id;
      } else {
        companyData.value = data;
        companyId.value = data.id;
      }
    }


watch(selectedEntry, (newEntry) => {
  if (newEntry) {
    if (selectedTable.value === 'customer') {
      customerData.value = { ...newEntry };
      customerId.value = newEntry.id;
    } else if (selectedTable.value === 'company') {
      companyData.value = { ...newEntry };
      companyId.value = newEntry.id;
    }
  }
});



    function handleLogoChange(event) {
      companyData.value.logo = event.target.files[0];
    }

    async function saveCompanyChanges() {
      try {
        const { data, error } = await updateCompanyData();

        if (error) {
          console.error('Failed to save changes:', error);
        } else {
          isEditing.value = false;
        }
      } catch (error) {
        console.error('Failed to update data:', error);
      }
    }

    async function updateCompanyData() {

      return await supabase
        .from('company')
        .update(getCompanyData())
        .eq('id', companyId.value);
    }

    async function updateCustomerData() {
      return await supabase
        .from('customer')
        .update(getCustomerData())
        .eq('id', customerId.value);
    }

async function fetchData() {
  const { data: customers, error: customerError } = await supabase
    .from('customer')
    .select('*')
    .order('id', { ascending: true });
  if (customerError) {
    console.error('Error fetching customers:', customerError.message);
    return;
  }
  entries.customer = customers;

  const { data: companies, error: companyError } = await supabase
    .from('company')
    .select('*')
    .order('id', { ascending: true });
  if (companyError) {
    console.error('Error fetching companies:', companyError.message);
    return;
  }
  entries.company = companies;
}


    async function checkUserAndFetchData() {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Failed to fetch user data:', error);
        return;
      }

      if (data) {
        try {
          const { data, error } = await supabase
            .from('company')
            .select('*')
            .single();

          if (error) {
            console.error('Failed to fetch data:', error);
            return;
          }

          companyData.value = data;
          companyId.value = data.id;
        } catch (error) {
          console.log('Failed to fetch data:', error.message);
        }
      }
    }

    onMounted(async () => {
onMounted(fetchData);

      await loadCustomerList();
      await checkUserAndFetchData();
    });


    watch(selectedTable, loadCustomerData);

    async function submitCompanyForm() {
      try {
        const { data, error } = await supabase.from('company').insert([getCompanyData()]);

        if (error) {
          console.error('Failed to submit company form:', error);
          return;
        }

        console.log('Company form submitted successfully!');
        // Clear form fields
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
          MwSt: '',
        };
        // Clear selected entry
        selectedEntry.value = null;
      } catch (error) {
        console.error('Failed to submit company form:', error);
      }
    }

    async function submitCustomerForm() {
      try {
        const { data, error } = await supabase.from('customer').insert([getCustomerData()]);

        if (error) {
          console.error('Failed to submit customer form:', error);
          return;
        }

        console.log('Customer form submitted successfully!');
        // Clear form fields
        customerData.value = {
          name: '',
          surname: '',
          street: '',
          streetnumber: '',
          postcode: '',
          place: '',
          email: '',

        };
        // Clear selected entry
        selectedEntry.value = null;
      } catch (error) {
        console.error('Failed to submit customer form:', error);
      }
    }


/* 
    return {
      selectedTable,
      entries,
      selectedEntry,
      companyData,
      customerId,
      customerData,
      isEditing,
      selectedCustomer,
      customer,
      toggleEditMode,
      isEmptyForm,
      saveChanges,
      getFormData,
    } */
        return {
      selectedTable,
      entries,
      selectedEntry,
      companyData,
      customerId,
      customerData,
      isEditing,
      selectedCustomer,
      customer,
      toggleEditMode,
      isEmptyForm,
      saveChanges,
      getFormData,
      submitCustomerForm,
      submitCompanyForm,
      updateCustomerData,
      saveCompanyChanges,
      handleLogoChange,
      handleCompanyData,
      handleCustomerData,
      createNewCustomer,
      createNewCompany,
      deleteCompany,
      deleteCustomer,
    }
      ;
  },

};

</script>



