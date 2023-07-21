<template>
  <Header />
  <!--Titel und Aushwal-->
    <div class="row">
      <hr class="mt-3">
      <!--Kunden Daten-->
      <div class="cols-sm-12 col-md-9text-secondary">
        <div class="my-1">Meine Angaben:<br>

        </div>
      </div>
    </div>
    <!--Bestellformular-->
    <div class="table-responsive">
<table class="col-sm-12 table table-borderless border-0 border-b-2" v-if="invoiceRows.length > 0" aria-label="">
  <thead>
    <tr>
      <th class="text-dark bg-light"></th>
      <th class="text-dark bg-light">Pos.</th>
      <th class="text-dark bg-light">Rechnungsnummer</th>
      <th class="text-dark bg-light">Bezeichnung</th>
      <th class="text-dark bg-light">Menge</th>
      <th class="text-dark bg-light">Preis/Stück</th>
      <th class="width=140 text-dark bg-light">Positionspreis</th>
    </tr>
  </thead>
  <tbody class="text-95 text-secondary-d3">
    <tr v-for="(row, index) in invoiceRows" :key="row.id">
      <td>
        <input type="checkbox" v-model="row.checked" />
      </td>
      <td class="text-center">
        <!-- No need for edit button -->
      </td>
      <td class="text-center">
        <!-- No need for delete button -->
      </td>
      <td>{{ companies.find(company => company.id === row.company_id)?.company_name }}</td>
      <td>{{ customers.find(customer => customer.id === row.customer_id)?.name }}</td>
      <td>{{ row.invoice_number }}</td>
      <td>{{ row.invoice_date }}</td>
      <td class="text-secondary-d2">{{ row.total }}</td>
    </tr>
  </tbody>
</table>

    </div>
  <Footer />
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'vue-router';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);


import Header from "./Header.vue";
import Footer from "./footer.vue";
//Funktionangaben
export default {
    components: {
    Header,
    Footer,
  },

    props: {
    userUid: {
      type: String,
      required: true,
    },
  },

setup() {
    const userUid = ref('');

    const router = useRouter();
    const customers = ref([]);
    const companies = ref([]);
    const invoiceRows = ref([]);

    const fetchCompanies = async () => {
      try {
        const { data, error } = await supabase.from('company').select('*');
        if (error) {
          console.error('Failed to fetch companies:', error);
          return;
        }
        if (data && data.length > 0) {
          companies.value = data;
        } else {
          console.error('No companies found.');
        }
      } catch (error) {
        console.error('Failed to fetch companies:', error);
      }
    };

    const fetchCustomers = async () => {
      try {
        const { data, error } = await supabase.from('customer').select('*');
        if (error) {
          console.error('Failed to fetch customers:', error);
          return;
        }
        if (data && data.length > 0) {
          customers.value = data;
        } else {
          console.error('No customers found.');
        }
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      }
    };

    const fetchInvoiceData = async () => {
      try {
        const { data, error } = await supabase
          .from('invoice')
          .select('*')
          .eq('user_id', userUid);
        // ... (rest of the function implementation)
      } catch (error) {
        console.error('Failed to fetch invoice data:', error);
      }
    };

   onMounted(async () => {
      fetchInvoiceData();
      await fetchCustomers();
      await fetchCompanies();
    });

    return {
      customers,
      companies,
      invoiceRows,
    };
  },
};
</script>

<style>
.custom-select {
  height: 38px;
  width: 50%;
}

.table-responsive {
  overflow-x: auto;
}</style>
