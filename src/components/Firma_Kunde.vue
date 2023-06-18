<template>
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



  <div v-if="selectedTable === 'company'">
    <form class="container mt-5" novalidate @submit.prevent="submitCompanyForm">
      <div class="row">
        <div class="form-group col-md-6 mb-3">
               <div class="row">
  <div class="col-2 d-flex justify-content-start">
      </div>
  <div class="col-8 d-flex ms-3 justify-content-center">
    <button class="btn btn-primary btn-md" v-if="selectedTable && !selectedEntry"  @click="toggleEditMode">{{ isEditing ? 'Cancel' : 'Neu' }}</button>
    <button class="btn btn-primary btn-md" v-if="selectedTable && selectedEntry" @click="toggleEditMode">{{ isEditing ? 'Cancel' :
        'Ändern'
      }}</button>
  </div>
  <div class="col-2 d-flex justify-content-end">
  </div>
</div>
          <label for="logoInput">Company Logo</label>
          <div class="text-center col-4">
            <div class="input-with-image">
              <template v-if="isEditing">
                <input type="file" class="form-control" id="logoInput" @change="handleLogoChange($event)" />
                <div class="image-preview" v-if="companyData.logo">
                  <img :src="companyData.logo" alt="Logo Preview" class="preview-image">
                </div>
              </template>
              <template v-else>
                <div class="image-preview">
                  <img :src="companyData.logo || '/malertapsen.jpg'" alt="Company Logo" class="preview-image">
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="validation3">Unternehmen:</label>
          <div class="input-container">
            <template v-if="isEditing">
              <input type="text" class="form-control text-start" placeholder="Unternehmen" required
                v-model="companyData.profession">
            </template>
            <template v-else>
              <div class="form-control-static">{{ companyData.profession }}</div>
            </template>
          </div>
          <div class="invalid-feedback">
            Enter Unternehmen.
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <label for="validation3">Firma:</label>
          <div class="input-container">
            <template v-if="isEditing">
              <input type="text" class="form-control text-start" placeholder="Firma" required
                v-model="companyData.company_name">
            </template>
            <template v-else>
              <div class="form-control-static">{{ companyData.company_name }}</div>
            </template>
          </div>
          <div class="invalid-feedback">
            Enter Firma.
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="validation3">Vorname:</label>
          <div class="input-container">
            <template v-if="isEditing">
              <input type="text" class="form-control" placeholder="Vorname" required v-model="companyData.name">
            </template>
            <template v-else>
              <div class="form-control-static">{{ companyData.name }}</div>
            </template>
          </div>
          <div class="invalid-feedback">
            Enter Vorname.
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <label for="validation3">Name:</label>
          <div class="input-container">
            <template v-if="isEditing">
              <input type="text" class="form-control" placeholder="Name" required v-model="companyData.surname">
            </template>
            <template v-else>
              <div class="form-control-static">{{ companyData.surname }}</div>
            </template>
          </div>
          <div class="invalid-feedback">
            Enter Name.
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="validation3">Strasse:</label>
          <div class="input-container">
            <template v-if="isEditing">
              <input type="text" class="form-control" placeholder="Strasse" required v-model="companyData.street">
            </template>
            <template v-else>
              <div class="form-control-static">{{ companyData.street }}</div>
            </template>
          </div>
          <div class="invalid-feedback">
            Enter Strasse.
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <label for="validation3">Nummer:</label>
          <div class="input-container">
            <template v-if="isEditing">
              <input type="text" class="form-control" pattern="[0-9]*" placeholder="Nummer" required
                v-model="companyData.street_number">
            </template>
            <template v-else>
              <div class="form-control-static">{{ companyData.street_number }}</div>
            </template>
          </div>
          <div class="invalid-feedback">
            Enter Nummer.
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="validation3">Postleitzahl:</label>
          <div class="input-container">
            <template v-if="isEditing">
              <input type="text" class="form-control" pattern="[0-9]*" placeholder="Postleitzahl" required
                v-model="companyData.postal_code">
            </template>
            <template v-else>
              <div class="form-control-static">{{ companyData.postal_code }}</div>
            </template>
          </div>
          <div class="invalid-feedback">
            Enter Postleitzahl.
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <label for="validation3">Ort:</label>
          <div class="input-container">
            <template v-if="isEditing">
              <input type="text" class="form-control" placeholder="Ort" required v-model="companyData.place">
            </template>
            <template v-else>
              <div class="form-control-static">{{ companyData.place }}</div>
            </template>
          </div>
          <div class="invalid-feedback">
            Enter Ort.
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="validation3">Email:</label>
          <div class="input-container">
            <template v-if="isEditing">
              <input type="email" class="form-control" placeholder="Email" required v-model="companyData.email">
            </template>
            <template v-else>
              <div class="form-control-static">{{ companyData.email }}</div>
            </template>
          </div>
          <div class="invalid-feedback">
            Enter Email.
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <label for="validation3">Webpage:</label>
          <div class="input-container">
            <template v-if="isEditing">
              <input type="text" class="form-control" pattern="^(https?:\/\/)?([\w\d]+\.)?[\w-]+(\.[\w-]+)+([/?#]\S*)?$"
                placeholder="Webpage" v-model="companyData.webpage">
            </template>
            <template v-else>
              <div class="form-control-static">{{ companyData.webpage }}</div>
            </template>
          </div>
          <div class="invalid-feedback">
            Enter Webpage.
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="validation3">Telefon Nummer:</label>
          <div class="input-container">
            <template v-if="isEditing">
              <input type="text" class="form-control" pattern="[0-9]*" placeholder="Telefon Nummer"
                v-model="companyData.phone_number">
            </template>
            <template v-else>
              <div class="form-control-static">{{ companyData.phone_number }}</div>
            </template>
          </div>
          <div class="invalid-feedback">
            Enter Telefon Nummer.
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <label for="validation3">UiD Nummer:</label>
          <div class="input-container">
            <template v-if="isEditing">
              <input type="text" class="form-control" pattern="[0-9]*" placeholder="UiD Nummer" required
                v-model="companyData.uid_number">
            </template>
            <template v-else>
              <div class="form-control-static">{{ companyData.uid_number }}</div>
            </template>
          </div>
          <div class="invalid-feedback">
            Enter UiD Nummer.
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="validation3">IBAN:</label>
          <div class="input-container">
            <template v-if="isEditing">
              <input type="text" class="form-control" placeholder="IBAN" v-model="companyData.iban">
            </template>
            <template v-else>
              <div class="form-control-static">{{ companyData.iban }}</div>
            </template>
          </div>
          <div class="invalid-feedback">
            Enter IBAN.
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <label for="validation3">Mehrwertsteuer:</label>
          <div class="input-container">
            <template v-if="isEditing">
              <input type="text" class="form-control" placeholder="Mehrwertsteuer" v-model="companyData.MwSt">
            </template>
            <template v-else>
              <div class="form-control-static">{{ companyData.MwSt }}</div>
            </template>
          </div>
          <class class="invalid-feedback">
            Enter Mehrwertsteuer.
          </class>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="validation3">Bank:</label>
          <div class="input-container">
            <template v-if="isEditing">
              <input type="text" class="form-control" placeholder="Bank" v-model="companyData.bank">
            </template>
            <template v-else>
              <div class="form-control-static">{{ companyData.bank }}</div>
            </template>
          </div>
          <div class="invalid-feedback">
            Enter Bank.
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <label for="validation3">Konto Nummer:</label>
          <div class="input-container">
            <template v-if="isEditing">
              <input type="text" class="form-control" pattern="[0-9]*" placeholder="Konto Nummer"
                v-model="companyData.account">
            </template>
            <template v-else>
              <div class="form-control-static">{{ companyData.account }}</div>
            </template>
          </div>
          <div class="invalid-feedback">
            Konto Nummer.
          </div>
        </div>
      </div>
     <div class="row">
  <div class="col-2 d-flex justify-content-start">
    <button class="btn btn-danger btn-lg" v-if="selectedTable && selectedEntry" @click="deleteCompany">löschen</button> 
  </div>
  <div class="col-8 d-flex justify-content-center">

  </div>
  <div class="col-2 d-flex justify-content-end">
    <button class="btn btn-success btn-lg" v-if="selectedTable && !selectedEntry" @click="createNewCompany">Erstellen</button>
    <button class="btn btn-success btn-lg" v-if="selectedTable && selectedEntry" @click="saveChanges">Speichern</button>
  </div>
</div>



    </form>
  </div>
  <div v-else-if="selectedTable === 'customer'">
    <form class="container mt-5" @submit.prevent="submitCustomerForm">

                               <div class="row">
  <div class="col-2 d-flex justify-content-start">

  </div>
  <div class="col-8 d-flex justify-content-center">
    <button class="btn btn-primary btn-md" v-if="selectedTable && !selectedEntry" @click="toggleEditMode">{{ isEditing ? 'Cancel' : 'Neu' }}</button>
    <button class="btn btn-primary btn-md" v-if="selectedTable && selectedEntry" @click="toggleEditMode">{{ isEditing ? 'Cancel' :
        'Ändern'
      }}</button>
  </div>
  <div class="col-2 d-flex justify-content-end">

  </div>
</div>

 <div class="row">
        <div class="col-md-6 mb-3">
          <label for="validation3">Vorname:</label>
          <div class="input-container">
            <template v-if="isEditing">
              <input type="text" class="form-control" placeholder="Vorname" required v-model="customerData.name">
            </template>
            <template v-else>
              <div class="form-control-static">{{ customerData.name }}</div>
            </template>
          </div>
          <div class="invalid-feedback">
            Enter Vorname.
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <label for="validation3">Name:</label>
          <div class="input-container">
            <template v-if="isEditing">
              <input type="text" class="form-control" placeholder="Name" required v-model="customerData.surname">
            </template>
            <template v-else>
              <div class="form-control-static">{{ customerData.surname }}</div>
            </template>
          </div>
          <div class="invalid-feedback">
            Enter Name.
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="validation3">Strasse:</label>
          <div class="input-container">
            <template v-if="isEditing">
              <input type="text" class="form-control" placeholder="Strasse" required v-model="customerData.street">
            </template>
            <template v-else>
              <div class="form-control-static">{{ customerData.street }}</div>
            </template>
          </div>
          <div class="invalid-feedback">
            Enter Strasse.
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
              <div class="form-control-static">{{ customerData.streetnumber }}</div>
            </template>
          </div>
          <div class="invalid-feedback">
            Enter Nummer.
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
              <div class="form-control-static">{{ customerData.postcode }}</div>
            </template>
          </div>
          <div class="invalid-feedback">
            Enter Postleitzahl.
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <label for="validation3">Ort:</label>
          <div class="input-container">
            <template v-if="isEditing">
              <input type="text" class="form-control" placeholder="Ort" required v-model="customerData.place">
            </template>
            <template v-else>
              <div class="form-control-static">{{ customerData.place }}</div>
            </template>
          </div>
          <div class="invalid-feedback">
            Enter Ort.
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="validation3">Email:</label>
          <div class="input-container">
            <template v-if="isEditing">
              <input type="email" class="form-control" placeholder="Email" required v-model="customerData.email">
            </template>
            <template v-else>
              <div class="form-control-static">{{ customerData.email }}</div>
            </template>
          </div>
          <div class="invalid-feedback">
            Enter Email.
          </div>
        </div>
      </div>
      <div class="row">
  <div class="col-2 d-flex justify-content-start">
    <button class="btn btn-danger btn-lg" v-if="selectedTable && selectedEntry" @click="deleteCustomer">löschen</button>
  </div>
  <div class="col-8 d-flex justify-content-center">

  </div>
  <div class="col-2 d-flex justify-content-end">
    <button class="btn btn-success btn-lg" v-if="selectedTable && !selectedEntry" @click="createNewCustomer">Erstellen</button>
    <button class="btn btn-success btn-lg" v-if="selectedTable && selectedEntry" @click="saveChanges">Speichern</button>
  </div>
</div>
    </form>
  </div>
</template>

<script>
import { MyFunction } from './MyFunction';
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
      bank: companyData.bank,
    };
  }
}
MyFunction();
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
      bank: '',
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
        } else if (selectedTable.value === 'company' && companyId.value) {
          // Update existing company
          const { data, error } = await supabase
            .from('company')
            .update(getFormData(selectedTable.value, customerData.value, companyData.value))
            .eq('id', companyId.value);

          if (error) {
            throw new Error(error.message);
          }
          location.reload();
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
          .select('id, logo, company_name, profession, name, surname, street, street_number, postal_code, place, uid_number, account, iban_number, phone_number, webpage, email, bank')
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
              logo: companyData.value.logo,
              company_name: companyData.value.company_name,
              profession: companyData.value.profession,
              name: companyData.value.name,
              surname: companyData.value.surname,
              street: companyData.value.street,
              street_number: companyData.value.street_number,
              postal_code: companyData.value.postal_code,
              place: companyData.value.place,
              uid_number: companyData.value.uid_number,
              account: companyData.value.account,
              iban_number: companyData.value.iban_number,
              phone_number: companyData.value.phone_number,
              webpage: companyData.value.webpage,
              email: companyData.value.email,
              MwSt: companyData.value.MwSt,
              bank: companyData.value.bank,
            },
          ]);

        if (error) {
          console.error('Failed to create a new customer:', error);
        } else {
          companyId.value = data[0].id;
          selectedCompany.value = data[0].id; // Select the newly created customer
          isEditing.value = true;
          location.reload();
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
              name: customerData.value.name,
              surname: customerData.value.surname,
              street: customerData.value.street,
              streetnumber: customerData.value.streetnumber,
              postcode: customerData.value.postcode,
              place: customerData.value.place,
              email: customerData.value.email,
            },
          ]);

        if (error) {
          console.error('Failed to create a new customer:', error);
        } else {
          customerId.value = data[0].id;
          selectedCustomer.value = data[0].id; // Select the newly created customer
          isEditing.value = true;
               location.reload();
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
           location.reload(); // Optionally, you can reload the customer list after deleting the customer
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

    function clearFormData() {
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
          bank: '',
        };
      }
    }
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

    onMounted(async () => {
      onMounted(fetchData);

      await loadCustomerList();
      await checkUserAndFetchData();
    });

    watch(selectedTable, loadCustomerData);


    

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
      saveChanges,
      getFormData,
      clearFormData,
      handleNewCustomer,
      updateCustomerData,
      saveCompanyChanges,
      handleLogoChange,
      handleCompanyData,
      handleCustomerData,
      createNewCustomer,
      createNewCompany,
      deleteCompany,
      deleteCustomer,
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
</style>