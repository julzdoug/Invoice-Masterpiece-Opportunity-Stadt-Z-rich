<template>


  <div v-if="selectedTable === 'company'">
    <form class="container mt-2" novalidate @submit.prevent="submitCompanyForm">
      <div class="row">



        <div class="form-group col-md-6 col-sm-12 mb-3">
<div class="row">
          <label for="logoInput">Firma Logo</label>
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
                  <img :src="companyData.logo" alt="Company Logo" class="preview-image">
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3 col-sm-12">
          <label for="validation3">Branche:</label>
          <div class="input-container">
            <template v-if="isEditing">
              <input type="text" class="form-control text-start" placeholder="Branche" required
                v-model="companyData.profession">
            </template>
            <template v-else>
              <div class="form-control-static" v-if="companyData">{{ companyData.profession }}</div>
            </template>
          </div>
          <div class="invalid-feedback">
            Branche Bitte eintragen.
          </div>
        </div>
        <div class="col-md-6 mb-3 col-sm-12">
          <label for="validation3">Name der Firma:</label>
          <div class="input-container">
            <template v-if="isEditing">
              <input type="text" class="form-control text-start" placeholder="Name der Firma" required
                v-model="companyData.company_name">
            </template>
            <template v-else>
              <div class="form-control-static" v-if="companyData">{{ companyData.company_name }}</div>
            </template>
          </div>
          <div class="invalid-feedback">
            Name der Firma Bitte eintragen.
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
              <div class="form-control-static" v-if="companyData">{{ companyData.name }}</div>
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
              <div class="form-control-static" v-if="companyData">{{ companyData.surname }}</div>
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
              <div class="form-control-static" v-if="companyData">{{ companyData.street }}</div>
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
              <div class="form-control-static" v-if="companyData">{{ companyData.street_number }}</div>
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
              <div class="form-control-static" v-if="companyData">{{ companyData.postal_code }}</div>
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
              <div class="form-control-static" v-if="companyData">{{ companyData.place }}</div>
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
              <div class="form-control-static" v-if="companyData">{{ companyData.email }}</div>
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
              <div class="form-control-static" v-if="companyData">{{ companyData.webpage }}</div>
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
              <div class="form-control-static" v-if="companyData">{{ companyData.phone_number }}</div>
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
              <div class="form-control-static" v-if="companyData">{{ companyData.uid_number }}</div>
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
              <div class="form-control-static" v-if="companyData">{{ companyData.iban_number }}</div>
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
              <div class="form-control-static" v-if="companyData">{{ companyData.mwst }}</div>
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
              <div class="form-control-static" v-if="companyData">{{ companyData.bank }}</div>
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
              <div class="form-control-static" v-if="companyData">{{ companyData.account }}</div>
            </template>
          </div>
          <div class="invalid-feedback">
            Konto Nummer Bitte eintragen.
          </div>
        </div>
      </div>

  <div class="d-flex justify-content-end">
    <button class="btn btn-success btn-lg" :disabled="isCompanySelected" @click="createNewCompany(companyData)">Erstellen</button>
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
      mwst: '',
      bank: '',
    });
    const companyId = ref(null);
    const isEditing = ref(false);

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


async function handleLogoChange(event) {
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
}

async function saveChanges() {
  try {
    if (selectedTable.value === 'company' && companyData.value.id) {
      // Update existing company
      const { data, error } = await supabase
        .from('company')
        .update(companyData.value)
        .eq('id', companyData.value.id);

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


    async function createNewCompany(companyData) {
  try {
    // Save the company data to the company table
    const { data, error } = await supabase
      .from('company')
      .upsert([companyData]); // Pass an array with a single object

    if (error) {
      console.error('Failed to create a new company:', error);
      return;
    }

    console.log('New company created:', data);

    // You can choose to handle the success or further actions here

  } catch (error) {
    console.error('Error creating a new company:', error);
  }
}



  async function loadCompanyData() {
    if (!selectedTable.value) {
      clearFormData(); // Clear the form data when no company is selected
      return;
    }

    try {
      clearFormData(); // Clear the form data before loading any data

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

/*     async function deleteCompany() {
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
    } */
    async function deleteCompany() {
  const companyIdToDelete = companyId.value;
  if (companyIdToDelete) {
    // Show a confirmation dialog before proceeding with the delete
    const confirmed = window.confirm('Sind sie sicher das sie den Kreditor löschen?');
    
    if (confirmed) {
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
      console.log('Deletion canceled.');
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
  clearFormData();
  toggleEditMode();
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
      handleLogoChange,
     
    };
  },
  
  
};
</script>