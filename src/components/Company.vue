<template>
<select v-model="selectedEntry" class="form-select mt-3" aria-label="Default select example">
  <option disabled value="">Select an entry</option>
  
  <option v-for="entry in entries.company" :key="entry.id" :value="entry">
    {{ entry.company_name }}
  </option>
</select>

  <div v-if="selectedTable === 'company'">
    <form class="container mt-5 smaller-form" novalidate @submit.prevent="submitCompanyForm">
      <div class="row">
        <div class="form-group col-md-6 mb-3">
               <div class="row">
  <div class="col-2 d-flex justify-content-start">
      </div>
  <div class="col-8 d-flex ms-3 justify-content-center">
    <button class="btn btn-primary btn-md" v-if="!selectedEntry"  @click="toggleEditMode">{{ isEditing ? 'Cancel' : 'Neu' }}</button>
    <button class="btn btn-primary btn-md" v-if="selectedEntry" @click="toggleEditMode">{{ isEditing ? 'Cancel' :
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
    <button class="btn btn-danger btn-lg" v-if="selectedEntry" @click="deleteCompany">löschen</button> 
  </div>
  <div class="col-8 d-flex justify-content-center">

  </div>
  <div class="col-2 d-flex justify-content-end">
    <button class="btn btn-success btn-lg" :disabled="isCompanySelected" @click="createNewCompany">Erstellen</button>

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
  isCompanySelected() {
    const isSelected = !!this.selectedEntry;
    console.log('isCompanySelected:', isSelected);
    return isSelected;
  },
},

  setup() {
    const selectedTable = ref('company');
     const selectedEntry = ref(null);
        const entries = ref({
      company: [], // Initialize with an empty array
    });
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
    const isEditing = ref(false);

    async function saveChanges() {
      try {
        if (selectedTable.value === 'company' && companyId.value) {
          // Update existing company
          const { data, error } = await supabase
            .from('company')
            .update(companyData.value)
            .eq('id', companyId.value);

          if (error) {
            throw new Error(error.message);
          }
          location.reload();
          console.log('Company data updated successfully!');
        } else {
          // Handle the case when the selected table or entry ID is not available
          throw new Error('Invalid table or entry ID');
        }
      } catch (error) {
        console.error('Error saving changes:', error.message);
      }
    }

async function createNewCompany() {
  try {
    if (!selectedEntry.value) {
      // Create a new company
      const { data, error } = await supabase
        .from('company')
        .insert([companyData.value]);

      if (error) {
        console.error('Failed to create a new company:', error);
      } else {
        companyId.value = data[0].id;
        isEditing.value = true;
        clearFormData(); // Clear the form data after creating a new company
        location.reload();
      }
    } else {
      // Update the selected entry (This part is for editing an existing entry)
      const { data, error } = await supabase
        .from('company')
        .update(companyData.value)
        .eq('id', companyId.value);

      if (error) {
        console.error('Failed to update company:', error);
      } else {
        location.reload();
      }
    }
  } catch (error) {
    console.error('Error creating/updating company:', error);
  }
}


async function loadCompanyData() {
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
        entries.value.company = data; 
        companyData.value = { ...data[0] }; // Pre-fill form fields with selected entry
      }
    }

    // Add debugging statement to check the data
    console.log('Loaded company data:', data);

    // Add a console.log statement here to check entries.company
    console.log('Entries.company:', entries.company);
  } catch (error) {
    console.error(`Failed to fetch ${selectedTable.value} data:`, error);
  }
}

function clearFormData() {
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
}

    async function deleteCompany() {
      const companyIdToDelete = companyId.value;
      if (companyIdToDelete) {
        try {
          const { data, error } = await supabase
            .from('company')
            .delete()
            .match({ id: companyIdToDelete });

          if (error) {
            console.error('Failed to delete company:', error);
          } else {
            companyId.value = null;
            location.reload();
          }
        } catch (error) {
          console.error('Failed to delete company:', error);
        }
      } else {
        console.error('No company selected to delete');
      }
    }

function toggleEditMode() {
  if (selectedTable.value === 'company') {
    if (companyData.value) {
      isEditing.value = !isEditing.value;
      if (!isEditing.value) {
        clearFormData(); // Clear the form data when exiting edit mode
      }
    }
  }
}   

    onMounted(async () => {
      await loadCompanyData();
    });

    watch(selectedTable, loadCompanyData);

        watch(selectedEntry, (newSelectedEntry) => {
      if (newSelectedEntry) {
        companyData.value = { ...newSelectedEntry };
      }
    });

    

    return {
      selectedTable,
      companyData,
      companyId,
      isEditing,
      toggleEditMode,
      saveChanges,
      createNewCompany,
      deleteCompany,
      entries,
      selectedEntry,
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