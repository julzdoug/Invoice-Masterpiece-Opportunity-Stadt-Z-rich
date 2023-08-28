<template>

  <Header />
  <!--Titel und Aushwal-->
   <section>
      <!--Kunden Daten-->


    <div class="justify-content-center align-items-center">
              <div class="my-1 ms-2 back">Meine Angaben:<br>       
      </div>
      <table class="table table-hover text-center ms-1 me-1" v-if="invoiceRows.length > 0" aria-label="">
        <thead class="table-light">
          <tr>        
            <th class="text-dark bg-light">Kunde.</th>
            <th class="text-dark bg-light">Rechnungsteller</th>
            <th class="text-dark bg-light">Rechnungsnummer</th>
            <th class="text-dark bg-light">Rechnungs Datum</th>
            <th class="text-dark bg-light">Betrag</th>
                <th class="text-dark bg-light text-center"><span><i class="bi bi-trash3"></i></span></th>
            <th class="text-dark bg-light text-center"><span><i class="bi bi-printer"></i></span></th>
            <th class="text-dark bg-light text-center"><span><i class="bi bi-pencil"></i></span></th>
          </tr>
        </thead>
        <tbody class="table text-95 text-secondary-d3 text-start">
          <tr v-for="(row, index) in invoiceRows" :key="row.id">          
            <td class="text-center">{{ getCustomerName(row.customer_id) }}</td>
            <td class="text-center">{{ getCompanyName(row.company_id) }}</td>
            <td class="text-center">{{ row.invoice_number }}</td>
            <td class="text-center">{{ row.invoice_date }}</td>
            <td class="text-center">{{ row.total }}</td>
              <td class="text-center">
              <button class="btn btn-warning m-1" @click="deleteRow(row)">
                <i class="bi bi-trash3"></i>
              </button>
            </td>
             <td class="text-center">
              <button class="btn btn-warning m-1" @click="navigateToInvoice(row)">
                <i class="bi bi-printer"></i>
              </button>
            </td>
            <td class="text-center">
              <button class="btn btn-warning m-1" @click="toggleEditMode(row)">
                <i class="bi bi-pencil"></i>
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
          @modal-closed-reload="reloadPage"
        />
    </div>
  </section>

  <section>
<Footer />
</section>

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
      showInvoiceForm: false, 
    };
  },
  methods: {
    async navigateToInvoice(row) {
      await this.$router.push({
        name: 'Invoices',  // Make sure the route name is correct
        params: { invoiceNumber: row.invoice_number }
      });
    },
      reloadPage() {
      location.reload(); // Reload the page
    },
  },


  setup() {
    const isEditing = ref(false);
    const invoiceRows = ref([]);
    const invoiceData = ref({});
    const companyData = ref({});
    const customerData = ref({});
    const isEditingInvoice = ref(false);
    const selectedInvoice = ref(null);
const showInvoiceForm = ref(false);

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
      return company ? company.profession : 'Unknown Company';
    };


    // Computed property to calculate the total for each unique invoice number
    const uniqueInvoices = computed(() => {
      const invoiceMap = new Map();
      invoiceRows.value.forEach((invoice) => {
        if (!invoiceMap.has(invoice.invoice_number)) {
          invoiceMap.set(invoice.invoice_number, {
            ...invoice,
            total: invoiceRows.value
              .filter((row) => row.invoice_number === invoice.invoice_number)
              .reduce((total, row) => total + row.total, 0),
          });
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

    const deleteRow = async (row) => {
      try {
        const { data, error } = await supabase
          .from('invoice')
          .delete()
          .eq('invoice_number', row.invoice_number);

        if (error) {
          console.error('Failed to delete invoice:', error);
          return;
        }

        // Remove the deleted row from the invoiceRows array
        invoiceRows.value = invoiceRows.value.filter((r) => r.id !== row.id);

        await fetchInvoiceData();
      } catch (error) {
        console.error('Failed to delete invoice:', error);
      }
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
      deleteRow,
      showInvoiceForm, 
    };
  },
};
</script>


<style scoped>
.custom-select {
  height: 38px;
  width: 50%;
  
}

.back {
  background-color: rgb(192, 212, 249);
}



/* Adjust styles for mobile devices */
@media (max-width: 576px) {

  .table {
    
    font-size: 12px; /* Adjust font size for mobile devices */
  }
  th, td {
    min-width: 80px; /* Adjust as needed to prevent squished content */
  }
}

#app {
  height: 100vh;
}
.fit {
  height:auto;
}
.scroll-back-to-top {
  position: fixed;
  bottom: 100px;
  right: 20px;
}
.scroll-back-to-top button {
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

</style>

