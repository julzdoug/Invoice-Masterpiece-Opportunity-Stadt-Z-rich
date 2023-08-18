<template class="position-relative overflow-hidden p-3 p-md-5 m-md-3 bg-body-light">
<div v-if="step === 1" class="justify-content-center align-items-center">
  <h1 class="fs-5">Rechnungsteller wählen:</h1>
  <div>
    <ul class="list-group">
      <li class="list-group-item " :aria-current="selectedCompany === null">Rechnungsteller</li>
      <li
        class="list-group-item list-group-item-info "
        v-for="company in companies"
        :key="company.id"
        :class="{ 'active': selectedCompany === company }"
        @click="selectCompany(company)"
      >
        <button class="d-flex ms-5 btn btn-info" @click="nextStep()">{{ company.profession }}</button>
      </li>
    </ul>
  </div>
  <div class="justify-content-center mt-3">
    <button class="ms-5 btn btn-primary" @click="nextStep()">Weiter</button>
  </div>
</div>

  <!-- Step 3: Customer Form -->
<div v-if="step === 2" class="justify-content-center align-items-center">
  <div>
    <h1 class="fs-5">Empfänger wählen:</h1>
    <div>
      <ul class="list-group">
        <li class="list-group-item active" :aria-current="selectedCustomer === null">Empfänger</li>
        <li
          class="list-group-item"
          v-for="customer in customers"
          :key="customer.id"
          :class="{ 'active': selectedCustomer === customer }"
          @click="selectCustomer(customer)"
        >
          {{ customer.name }}
        </li>
      </ul>
    </div>
  </div>
  <div class="justify-content-center mt-3">
    <button class="btn btn-primary" @click="nextStep()">Next</button>
  </div>
</div>


  <div v-if="step === 3" class="justify-content-center align-items-center">
     <div class="row">
          <div class="col text-secondary">
        <div class="my-1">Empfänger:<br>
          {{ selectedCustomer && selectedCustomer.id }}
        </div>
        <div class="my-1">
          {{ selectedCustomer && selectedCustomer.name }}, {{ selectedCustomer && selectedCustomer.surname }}
        </div>
        <div class="my-1">
          {{ selectedCustomer && selectedCustomer.street }}, {{ selectedCustomer && selectedCustomer.streetnumber }}
        </div>
        <div class="my-1">
          {{ selectedCustomer && selectedCustomer.postcode }}, {{ selectedCustomer && selectedCustomer.place }}
        </div>
        <div class="my-1">
          {{ selectedCustomer && selectedCustomer.email }}
        </div>
      </div>      <div class="col text-secondary">
        <div class="my-1">Rechnungsteller:<br>
          {{ selectedCompany && selectedCompany.id }}
        </div>
        <div class="my-1">
          {{ selectedCompany && selectedCompany.company_name }}, {{ selectedCompany && selectedCompany.surname }}
        </div>
        <div class="my-1">
          {{ selectedCompany && selectedCompany.street }}, {{ selectedCustomer && selectedCompany.street_number }}
        </div>
        <div class="my-1">
          {{ selectedCompany && selectedCompany.postal_code }}, {{ selectedCompany && selectedCompany.place }}
        </div>
                <div class="my-1">
          {{ selectedCompany && selectedCompany.email }}
        </div>
      </div>
      </div>
      <div class=" mt-3">
        <div v-if="selectedCustomer && !selectedInvoiceNumber">
          <input v-model="invoiceNumber" type="text" class="form-control mt-3" placeholder="Rechnungsnummer Number">
          <button @click="generateInvoiceNumber" class="btn btn-primary mt-2">Rechnungsnummer Generieren</button>
        </div>
      </div>
<button class="btn btn-primary" @click="nextStep()">Next</button>
</div>




  <div v-if="step === 4" class="justify-content-center align-items-center">
    <div class="table-responsive">
      <table class="table table-borderless border-0 border-b-2"
        v-if="selectedInvoiceNumber !== '' || generateInvoiceNumber !== ''" aria-label="">

        <thead>
          <tr>
            <th class="text-dark bg-light"></th>
            <th class="text-dark bg-light text-center"><span><i class="bi bi-pencil"></i></span></th>
            <th class="text-dark bg-light text-center"><span><i class="bi bi-wrench"></i></span></th>
            <th class="text-dark bg-light">Pos.</th>

            <th class="text-dark bg-light">Rechnungsnummer</th>
            <th class="text-dark bg-light">Bezeichnung</th>
            <th class="text-dark bg-light">Menge</th>
            <th class="text-dark bg-light">Preis/Stück</th>
            <th class="width=140 text-dark bg-light">Positionspreis</th>
          </tr>
        </thead>
        <tbody class="text-95 text-secondary-d3">
          <tr v-for="(row, index) in filteredInvoiceRows" :key="row.id">
            <td>
              <input type="checkbox" v-model="row.checked" />
            </td>
            <td class="text-center">
              <button class="btn btn-warning m-1" @click="editRow(index)">
                <i class="bi bi-pencil"></i>
              </button>
            </td>
            <td class="text-center">
              <button class="btn btn-warning m-1" @click="deleteRow(index)">
                <i class="bi bi-trash3"></i>
              </button>

            </td>
            <td>{{ row.position }}</td>
            <td>{{ row.invoice_number }}</td>
            <td>
              <template v-if="isEditing[index]">
                <input v-model="row.description" />
              </template>
              <template v-else>
                {{ row.description }}
              </template>
            </td>
            <td>
              <template v-if="isEditing[index]">
                <input v-model="row.quantity" type="number" />
              </template>
              <template v-else>
                {{ row.quantity }}
              </template>
            </td>
            <td class="text-95">
              <template v-if="isEditing[index]">
                <input v-model="row.price_per_unit" type="number" />
              </template>
              <template v-else>
                {{ row.price_per_unit }}
              </template>
            </td>
            <td class="text-secondary-d2">{{ row.quantity * row.price_per_unit }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <button class="btn btn-primary mt-3" @click="addNewRow">Hinzufügen</button>
    <button class="btn btn-primary ms-5 mt-3" @click="saveChanges">Zur Rechnung</button>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const storage = supabase.storage;
import Header from "./Header.vue";
import Footer from "./footer.vue";

export default {
  components: {
    Header,
    Footer,
 

  },
  setup() {
    const router = useRouter();
    const customers = ref([]);
    const selectedInvoiceNumber = ref('');
    const companies = ref([]);
    const invoiceRows = ref([]);
    const isEditing = ref([]);
    const invoiceNumber = ref('');
      const selectedCompany = ref(null);
  const selectedCustomer = ref(null);

  const selectCompany = (company) => {
    selectedCompany.value = company;
  };

  const selectCustomer = (customer) => {
    selectedCustomer.value = customer;
  };
    //FirmenDaten Laden
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
    //KundenDatenLaden
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
    // RechnugsDaten Laden
    const fetchInvoiceData = async () => {
      try {
        const { data, error } = await supabase.from('invoice').select('*');
        if (error) {
          console.error('Failed to fetch invoice data:', error);
          return;
        }

        if (data && data.length > 0) {
          invoiceRows.value = data.map((invoice) => ({
            ...invoice,
            isEditing: false,
          }));
        } else {
          console.error('No invoice data found.');
        }
      } catch (error) {
        console.error('Failed to fetch invoice data:', error);
      }
    };
    //Rechnungsnummern Fltern
    const filteredInvoiceNumber = computed(() => {
      if (!selectedInvoiceNumber.value || selectedInvoiceNumber.value === '') {
        return '';
      }
      return selectedInvoiceNumber.value;
    });
    const filteredInvoiceNumbers = computed(() => {
      if (!selectedCustomer.value) {
        return [];
      }
      const invoiceNumbers = new Set();
      for (const row of invoiceRows.value) {
        if (row.customer_id === selectedCustomer.value.id && row.company_id === selectedCompany.value.id) {
          invoiceNumbers.add(row.invoice_number);
        }
      }
      return ['', ...Array.from(invoiceNumbers)];
    });
    // Bestell Rechnungen angaben Filtern
    const filteredInvoiceRows = computed(() => {
      if (!selectedCustomer.value) {
        return [];
      }
      if (selectedInvoiceNumber.value === '' && generateInvoiceNumber.value === '') {
        return [];
      }
      if (selectedInvoiceNumber.value === '') {
        return invoiceRows.value.filter((row) => row.customer_id === selectedCustomer.value.id && row.invoice_number === generateInvoiceNumber.value);
      }
      return invoiceRows.value.filter((row) => row.customer_id === selectedCustomer.value.id && row.invoice_number === selectedInvoiceNumber.value);
    });
    // Bestellung eintragen
    const editRow = (index) => {
      isEditing.value[index] = true;
    };
    // Bestellung löschen
    const deleteRow = async (index) => {
      const invoice = filteredInvoiceRows.value[index];
      if (!invoice.id) {
        invoiceRows.value.splice(index, 1);
        return;
      }
      try {
        await supabase.from('invoice').delete().match({ id: invoice.id });
        invoiceRows.value.splice(index, 1);
      } catch (error) {
        console.error('Failed to delete row:', error);
      }
    };
    // Eingabe Sichern
    const saveChanges = async () => {
      try {
        const companyData = selectedCompany.value;
        if (!companyData) {
          console.error('No company selected.');
          return;
        }
        const { logo, company_name, proffesion, name, surname, street, street_number, postal_code, place, uid_number, account, iban_number, phone_number, webpage, email, MwSt, bank } = companyData;
        for (let i = 0; i < filteredInvoiceRows.value.length; i++) {
          const invoice = filteredInvoiceRows.value[i];
          if (!invoice) continue;
          const { description, price_per_unit, quantity } = invoice;
          const total = quantity * price_per_unit;
          if (invoice.id) {
            await supabase
              .from('invoice')
              .update({ description, price_per_unit, quantity, total })
              .match({ id: invoice.id });
            isEditing.value[invoice.id] = false;
          } else {
            const newRow = {
              description,
              price_per_unit,
              quantity,
              total,
              company_id: selectedCompany.value.id,
              customer_id: selectedCustomer.value.id,
              invoice_number: invoice.invoice_number || invoiceNumber.value,
            };
            const { data, error } = await supabase.from('invoice').insert([newRow]);
            if (error) {
              console.error('Failed to insert new row:', error);
              return;
            }
            if (data && data.length > 0) {
              invoice.id = data[0].id;
              isEditing.value[invoice.id] = false;
            } else {
              console.error('No invoice data returned after insert.');
            }
          }
        }
        navigateToInvoice();
      } catch (error) {
        console.error('Failed to update data:', error);
      }
    };
    //Neue Bestellung position
    const addNewRow = () => {
      const newRow = {
        description: '',
        quantity: 0,
        price_per_unit: 0,
        company_id: selectedCompany.value,
        customer_id: selectedCustomer.value.id,
        invoice_number: selectedInvoiceNumber.value || generateInvoiceNumber.value,
      };
      invoiceRows.value.push(newRow);
    };
    // Rechnungsnummer Generieren
    const generateInvoiceNumber = () => {
      // Generate a new invoice number logic goes here
      // You can use a random number generator or any other logic you prefer
      invoiceNumber.value = 'INV-' + Math.floor(Math.random() * 100000);
    };
    // Ausgewählte daten Laden
    const fetchSelectedData = async () => {
      try {
        if (selectedCompany.value && selectedCustomer.value && selectedInvoiceNumber.value) {
          // Query for the selected customer
          const { data: customerData, error: customerError } = await supabase
            .from('customer')
            .select('*')
            .eq('id', selectedCustomer.value.id)
            .single();
          if (customerError) {
            console.error('Failed to fetch customer data:', customerError);
            return;
          }
          const { data: companyData, error: companyError } = await supabase
            .from('company')
            .select('*')
            .eq('id', selectedCompany.value.id)
            .single();
          if (companyError) {
            console.error('Failed to fetch customer data:', companyError);
            return;
          }
          const { data: invoiceData, error: invoiceError } = await supabase
            .from('invoice')
            .select('*')
            .eq('invoice_number', selectedInvoiceNumber.value)
            .eq('customer_id', customerData.id)
            .eq('company_id', companyData.id)
            .single();
          if (invoiceError) {
            console.error('Failed to fetch invoice data:', invoiceError);
            return;
          }
          const { data: selectedData, error: selectedDataError } = await supabase
            .from('invoice')
            .select('*')
            .eq('invoice_number', invoiceData.id)
            .eq('customer_id', customerData.id)
            .eq('company_id', companyData.id)
            .single();
          if (selectedDataError) {
            console.error('Failed to fetch selected data:', selectedDataError);
            return;
          }
          console.log('Selected customer data:', customerData);
          console.log('Selected invoice data:', invoiceData);
          console.log('Selected data:', selectedData);
        }
      } catch (error) {
        console.error('Failed to fetch selected data:', error);
      }
    };
    // Zur Rechnung umleiten
    const navigateToInvoice = () => {
      router.push({ name: 'Invoices', params: { invoiceNumber: selectedInvoiceNumber.value || invoiceNumber.value } });
    };

    onMounted(async () => {
      await fetchCustomers();
      fetchSelectedData();
      fetchInvoiceData();
      await fetchCompanies();
    });

    watch(selectedInvoiceNumber, () => {
      fetchInvoiceData();
    });

    return {
      customers,
      companies,
  selectedCompany,
    selectedCustomer,
    selectCompany,
    selectCustomer,
      selectedInvoiceNumber,
      invoiceRows,
      isEditing,
      invoiceNumber,
      filteredInvoiceNumber,
      filteredInvoiceNumbers,
      filteredInvoiceRows,
      editRow,
      deleteRow,
      saveChanges,
      addNewRow,
      generateInvoiceNumber,
      fetchSelectedData,
      navigateToInvoice,
    };
  },

  data() {
    return {
      step: 1,
      showNextForm: false,

    };
  },
  methods: {

    nextStep() {
      this.step++;
    },

  },
};
</script>

<style css>
</style>