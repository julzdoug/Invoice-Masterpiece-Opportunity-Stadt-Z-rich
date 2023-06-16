<template>

<div v-if="companyData">
  <div class="container-lg">
   
    <div class="mt-5">
      <form>
       
        <div class="text-center col-4">
          <img :src="isEditing ? companyData.logo : '/malertapsen.jpg'" alt="Company Logo" class="img-fluid logo">
          <input v-if="isEditing" @change="handleLogoChange" type="file">
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
          <a href="#" class="btn btn-primary" @click="toggleEditMode">{{ isEditing ? 'Cancel' : 'Edit Company' }}</a>
        </div>
        <div class="col-2" v-if="isEditing">
          <button class="btn btn-primary" @click="saveChanges">Save Changes</button>
        </div>
      </form>
    </div>
  </div>
  </div>
  <div v-else>
    Loading...
  </div> 
</template>


<script>


import { ref, onMounted } from 'vue';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default {

  
  setup() {


    const user = ref(null);
    const companyData = ref(null);
    const companyId = ref(null);
    const isEditing = ref(false);

    function toggleEditMode() {
      isEditing.value = !isEditing.value;
    }

    function handleLogoChange(event) {
      companyData.value.logo = event.target.files[0];
    }

async function saveChanges() {
  try {
    const { data, error } = await supabase
      .from('company')
      .update({
        logo: companyData.value.logo,
        company_name: companyData.value.companyName,
        profession: companyData.value.profession,
        name: companyData.value.name,
        surname: companyData.value.surname,
        street: companyData.value.street,
        street_number: companyData.value.streetNumber,
        postal_code: companyData.value.postalCode,
        place: companyData.value.place,
        uid_number: companyData.value.uidNumber,
        account: companyData.value.account,
        iban_number: companyData.value.ibanNumber,
        phone_number: companyData.value.phoneNumber,
        webpage: companyData.value.webpage,
        email: companyData.value.email,
        MwSt: companyData.value.MwSt,
      })
      .match({ id: companyId.value });

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

    function getCompanyData() {
  return {
    id: companyId.value,
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
    logo: companyData.logo,
  };
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

    // Call checkUserAndFetchData on component mount
    onMounted(async () => {
      await checkUserAndFetchData();
    });

    

    return {
      user,
      companyData,
      toggleEditMode,
      handleLogoChange,
      saveChanges,
      isEditing,

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

.logo {
  max-width: 200px;
  height: auto;
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