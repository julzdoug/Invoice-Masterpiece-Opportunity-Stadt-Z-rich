<template>
  <div class="page-container">
    <Header />
    <div class="content-fluid bg-primary bg-opacity-25 ms-3 me-3">
      <div class="container top">
        <select v-model="selectedEntry" class="form-select mt-3" aria-label="Default select example">
          <option disabled value="">Select an entry</option>

          <option v-for="entry in entries.company" :key="entry.id" :value="entry">
            {{ entry.company_name }}
          </option>
        </select>
        <div v-if="selectedTable === 'company'">
        </div>
        <form class="container mt-5 smaller-form bg-body" novalidate @submit.prevent="submitCompanyForm">
          <div class="row">
            <div class="form-group col-md-6 mb-3">
              <div class="row">
                <div class="d-flex justify-content-start">
                </div>
                <div class="col-8 d-flex justify-content-start mt-5 mb-5">
                  <button class="btn btn-primary btn-md" v-if="!selectedEntry" @click="toggleEditMode"><i
                      class="bi bi-pencil">Drücke mich</i></button>
                  <button class="btn btn-primary btn-md" v-if="selectedEntry" @click="toggleEditMode"><i
                      class="bi bi-pencil">Drücke mich</i></button>
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
                      <img :src="companyData.logo" alt="Company Logo" class="preview-image">
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
                  <div class="form-control-static" v-if="companyData">{{ companyData.profession }}</div>
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
                  <div class="form-control-static" v-if="companyData">{{ companyData.company_name }}</div>
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
                  <div class="form-control-static" v-if="companyData">{{ companyData.name }}</div>
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
                  <div class="form-control-static" v-if="companyData">{{ companyData.surname }}</div>
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
                  <div class="form-control-static" v-if="companyData">{{ companyData.street }}</div>
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
                  <div class="form-control-static" v-if="companyData">{{ companyData.street_number }}</div>
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
                  <div class="form-control-static" v-if="companyData">{{ companyData.postal_code }}</div>
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
                  <div class="form-control-static" v-if="companyData">{{ companyData.place }}</div>
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
                  <div class="form-control-static" v-if="companyData">{{ companyData.email }}</div>
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
                  <input type="text" class="form-control"
                    pattern="^(https?:\/\/)?([\w\d]+\.)?[\w-]+(\.[\w-]+)+([/?#]\S*)?$" placeholder="Webpage"
                    v-model="companyData.webpage">
                </template>
                <template v-else>
                  <div class="form-control-static" v-if="companyData">{{ companyData.webpage }}</div>
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
                  <div class="form-control-static" v-if="companyData">{{ companyData.phone_number }}</div>
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
                  <div class="form-control-static" v-if="companyData">{{ companyData.uid_number }}</div>
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
                  <input type="text" class="form-control" placeholder="IBAN" v-model="companyData.iban_number">
                </template>
                <template v-else>
                  <div class="form-control-static" v-if="companyData">{{ companyData.iban_number }}</div>
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
                  <input type="text" class="form-control" placeholder="Mehrwertsteuer" v-model="companyData.mwst">
                </template>
                <template v-else>
                  <div class="form-control-static" v-if="companyData">{{ companyData.mwst }}</div>
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
                  <div class="form-control-static" v-if="companyData">{{ companyData.bank }}</div>
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
                  <div class="form-control-static" v-if="companyData">{{ companyData.account }}</div>
                </template>
              </div>
              <div class="invalid-feedback">
                Konto Nummer.
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-2 d-flex justify-content-start">
              <button class="btn btn-danger btn-lg mt-3 mb-5" v-if="selectedEntry" @click="deleteCompany">löschen</button>
            </div>
            <div class="col-8 d-flex justify-content-center">
            </div>
            <div class="col-2 d-flex justify-content-end">
              <button class="btn btn-success btn-lg mb-5 mt-3" v-if="!selectedEntry" :disabled="isCompanySelected"
                @click="createNewCompany(companyData)">Erstellen</button>
              <button class="btn btn-success btn-lg mb-5 mt-3" v-if="selectedEntry"
                @click="saveChanges">Speichern</button>
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

    async function deleteCompany() {
      try {
        if (selectedTable.value === 'company' && companyData.value.id) {
          // Delete existing company
          const { data, error } = await supabase
            .from('company')
            .delete()
            .eq('id', companyData.value.id);

          if (error) {
            throw new Error(error.message);
          }
          location.reload();
          console.log('Company data deleted successfully!');
        } else {
          // Handle the case when the selected table or company ID is not available
          throw new Error('Invalid table or company ID');
        }
      } catch (error) {
        console.error('Error deleting company:', error.message);
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