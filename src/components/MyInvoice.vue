<template>
  <Header />
  <!--Titel und Aushwal-->
  <section>
    <div class="row">
      <hr class="mt-3">
      <!--Kunden Daten-->
      <div class="cols-sm-12 col-md-9text-secondary">
        <div class="my-1">Meine Angaben:<br>
        </div>
      </div>
    </div>
    <div class="table-responsive d-flex justify-content-center align-items-center">
      <table class=" table table-striped text-center" v-if="invoiceRows.length > 0" aria-label="">
        <thead>
          <tr>
            <th class="text-dark bg-light"></th>
            <th class="text-dark bg-light">Kunde.</th>
            <th class="text-dark bg-light">Rechnungsteller</th>
            <th class="text-dark bg-light">Rechnungsnummer</th>
            <th class="text-dark bg-light">Rechnungs Datum</th>
            <th class="text-dark bg-light">Betrag</th>
            <th class="text-dark bg-light text-center"><span><i class="bi bi-pencil"></i></span></th>
            <th class="text-dark bg-light text-center"><span><i class="bi bi-trash3"></i></span></th>
          </tr>
        </thead>
        <tbody class=" table text-95 text-secondary-d3 text-start">
          <tr v-for="(row, index) in invoiceRows" :key="row.id">
            <td>
              <input type="checkbox" v-model="row.checked" />
            </td>
            <td class="text-center">{{ getCustomerName(row.customer_id) }}</td>
            <td class="text-center">{{ getCompanyName(row.company_id) }}</td>
            <td class="text-center">{{ row.invoice_number }}</td>
            <td class="text-center">{{ row.invoice_date }}</td>
            <td class="text-center">{{ row.total }}</td>
            <td class="text-center">
              <button class="btn btn-warning m-1"  @click="toggleEditMode(row)">
                <i class="bi bi-pencil"></i>
              </button>
            </td>
            <td class="text-center">
              <button class="btn btn-warning m-1" @click="deleteRow(index)">
                <i class="bi bi-trash3"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>


<section>
<div v-if="isEditingInvoice">
  
      <editInvoice
      :selectedInvoice="selectedInvoice"
      :invoiceData="invoiceData"
      :companyData="companyData"
      :customerData="customerData"
      :isEditingInvoice="isEditingInvoice"
      
    />
</div>

  </section> 
  <Footer />
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
import { isAuthenticated } from '../auth.js';
import editInvoice from './editInvoice.vue'; 
import Header from "./Header.vue";
import Footer from "./footer.vue";

export default {
  components: {
    Header,
    Footer,
editInvoice, 
  },
  data() {
    return {
      // Your data properties
      invoiceData: {},
      isEditingInvoice: false, // Set the initial value of isEditingInvoice
    };
  },


  setup() {
    const isEditing = ref(false);
    const invoiceRows = ref([]);
    const invoiceData = ref({});
    const companyData = ref({});
    const customerData = ref({});
    const isEditingInvoice = ref(false);
    const selectedInvoice = ref(null);


    const editRow = (invoiceNumber) => {
      selectedInvoice.value = invoiceRows.value.find((row) => row.invoice_number === invoiceNumber);
      isEditingInvoice.value = true;
    };
    // Fetch invoice data from the 'invoice' table
    const fetchInvoiceData = async () => {
      try {
        const { data, error } = await supabase.from('invoice').select('*');
        if (error) {
          console.error('Failed to fetch invoice data:', error);
          return;
        }

        if (data && data.length > 0) {
          invoiceRows.value = data;
        } else {
          console.error('No invoice data found.');
        }
      } catch (error) {
        console.error('Failed to fetch invoice data:', error);
      }
    };
    // Fetch customer data from the 'customer' table
    const fetchCustomerData = async () => {
      try {
        const { data, error } = await supabase.from('customer').select('*');
        if (error) {
          console.error('Failed to fetch customer data:', error);
          return;
        }

        if (data) {
          customerData.value = data;
        } else {
          console.error('No customer data found.');
        }
      } catch (error) {
        console.error('Failed to fetch customer data:', error);
      }
    };

    // Fetch company data from the 'company' table
    const fetchCompanyData = async () => {

      try {
        const { data, error } = await supabase
          .from('company')
          .select('*')


        if (error) {
          console.error('Failed to fetch company data:', error);
          return;
        }

        if (data) {
          companyData.value = data;

          if (data.logo_name && data.bucket_id) {
            // Fetch the company logo from the storage bucket and set the logo URL
            const logoResponse = await supabase.storage.from(data.bucket_id).download(data.logo_name);

            if (logoResponse.error) {
              console.error('Error fetching company logo:', logoResponse.error.message);
              return;
            }

            const logoBlob = logoResponse.data;
            const logoUrl = URL.createObjectURL(new Blob([logoBlob]));

            companyData.value.logo = logoUrl;
          }
        }
      } catch (error) {
        console.error('Failed to fetch company data:', error);
      }
    };

    function byteaToBase64(bytea) {
      const byteArray = new Uint8Array(bytea.data);
      let binary = '';
      for (let i = 0; i < byteArray.byteLength; i++) {
        binary += String.fromCharCode(byteArray[i]);
      }
      return 'data:image/png;base64,' + window.btoa(binary);
    };

    // Fetch the data when the component is mounted
    onMounted(async () => {
      await fetchInvoiceData();
      await fetchCustomerData();
      await fetchCompanyData();
    });

    // Helper function to get customer name from customerData
    const getCustomerName = (customerId) => {
      const customer = customerData.value.find((c) => c.id === customerId);
      return customer ? customer.name : 'Unknown Customer';
    };

    // Helper function to get company name from companyData
    const getCompanyName = (companyId) => {
      const company = companyData.value.find((c) => c.id === companyId);
      return company ? company.company_name : 'Unknown Company';
    };

    // Computed property to filter out unique invoices based on invoice_number
    const uniqueInvoices = computed(() => {
      const invoiceMap = new Map();
      invoiceRows.value.forEach((invoice) => {
        if (!invoiceMap.has(invoice.invoice_number)) {
          invoiceMap.set(invoice.invoice_number, invoice);
        }
      });
      return Array.from(invoiceMap.values());
    });
    const showFormComponent = () => {
      isEditing.value = true; // Set isEditing to true when the button is clicked
    };
    const toggleEditMode = (row) => {
      if (row) {
        selectedInvoice.value = row;
      }
      isEditingInvoice.value = !isEditingInvoice.value;
      
    };


    return {
      invoiceRows: uniqueInvoices,
      getCustomerName,
      getCompanyName,
      invoiceData,
      selectedInvoice,
      toggleEditMode,
      editRow,
      isEditing,
      isEditingInvoice,
      showFormComponent,
    };
  },
};
</script>


<style scoped>.custom-select {
  height: 38px;
  width: 50%;
}


.table-responsive {
  overflow-x: auto;
}

/* .footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #f5f5f5;
  color: #333;
  text-align: center;
  padding: 10px 0;
  margin-top: 1%;
} */</style>
