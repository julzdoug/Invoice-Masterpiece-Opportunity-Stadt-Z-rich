
<template>

      <div>

<div class="row">
  <div class="col-3">
    <h1 class="fs-5">Firma:</h1>
    <select v-model="selectedCompany" class="form-select mt-4 custom-select" aria-label="Select a company">
      <option disabled value="">Select a company</option>
      <option v-for="company in companies" :key="company.id" :value="company">
        {{ company.profession }}
      </option>
    </select>
  </div>

  <div class="col-3 d-flex justify-content-center">
    <h1 class="fs-5">Kunde:</h1>
    <select v-model="selectedCustomer" class="form-select mt-5 custom-select" aria-label="Select a customer">
      <option disabled value="">Select a customer</option>
      <option v-for="customer in customers" :key="customer.id" :value="customer">
        {{ customer.name }}
      </option>
    </select>
  </div>

  <div class="col-3 ms-5 d-flex text-center justify-content-end">
   <h1 class="fs-5">Rechnungsnummer:</h1>
    <select v-model="selectedInvoiceNumber" class="form-select mt-5 custom-select col-7" v-if="selectedCustomer && !isGeneratingInvoice && !invoiceNumber" aria-label="Select Invoice Number">
      
      <option disabled value="">Select Invoice Number</option>
      <option value="" selected>Show All</option>
      <option v-for="invoice in filteredInvoiceNumbers" :value="invoice" :key="invoice">
        {{ invoice }}
      </option>
    </select>
  </div>
</div>



  <div class="row">
    <hr class="mt-3">
    <div class="col-sm-3 mt-3">
<div v-if="selectedCustomer && !selectedInvoiceNumber">
        <input v-model="invoiceNumber" type="text" class="form-control mt-3" placeholder="Rechnungsnummer Number">
        <button @click="generateInvoiceNumber" class="btn btn-primary mt-2" >Rechnungsnummer Generieren</button>
      </div>
      </div>
      <div class="text-secondary">
        <div class="my-1">Kunden Nummer:<br>
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
      </div>
    </div>
     <table class="table table-borderless border-0 border-b-2" v-if="selectedInvoiceNumber !== '' || generateInvoiceNumber !== ''">

      <thead>
        <tr>
          <th class="text-dark bg-light"></th>
          <th class="text-dark bg-light text-center"><span><i class="bi bi-pencil"></i></span></th>
          <th class="text-dark bg-light text-center"><span><i class="bi bi-wrench"></i></span></th>
          <th class="text-dark bg-light">Pos.</th>
       
          <th class="text-dark bg-light">InvoiceNumber</th>
          <th class="text-dark bg-light">Description</th>
          <th class="text-dark bg-light">Qty</th>
          <th class="text-dark bg-light">Unit Price</th>
          <th class="width=140 text-dark bg-light">Amount</th>
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
    <button class="btn btn-primary mt-3" @click="addNewRow">Add New Row</button>
    <button class="btn btn-primary ms-5 mt-3" @click="saveChanges">Zur Rechnugng</button>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'vue-router';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default {
  setup() {
    const router = useRouter();

    const customers = ref([]);
    const selectedCustomer = ref(null);
    const selectedInvoiceNumber = ref('');
const selectedCompany = ref(null);
    const companies = ref([]);
    const invoiceRows = ref([]);
    const isEditing = ref([]);
    const invoiceNumber = ref('');


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
        if (row.customer_id === selectedCustomer.value.id) {
          invoiceNumbers.add(row.invoice_number);
        }
      }
      return ['', ...Array.from(invoiceNumbers)];
    });

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

    const editRow = (index) => {
      isEditing.value[index] = true;
    };

    const deleteRow = async (index) => {
      const invoice = filteredInvoiceRows.value[index];
      if (!invoice.id) {
        invoiceRows.value.splice(index, 1);
        return;
      }
      try {
        await supabase.from('invoice').delete().match({ id: invoice.id });
        // Update isEditing for the deleted row
        invoiceRows.value.splice(index, 1);
      } catch (error) {
        console.error('Failed to delete row:', error);
      }
    };

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

    const generateInvoiceNumber = () => {
      // Generate a new invoice number logic goes here
      // You can use a random number generator or any other logic you prefer
      invoiceNumber.value = 'INV-' + Math.floor(Math.random() * 100000);
    };

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

          // Query for the selected invoice number
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

          // Query for the table or row where the selected invoice number and customer are used
          // Replace `tableName` and `rowId` with the appropriate values for your scenario
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

          // Process the fetched data as needed
          console.log('Selected customer data:', customerData);
          console.log('Selected invoice data:', invoiceData);
          console.log('Selected data:', selectedData);
        }
      } catch (error) {
        console.error('Failed to fetch selected data:', error);
      }
    };

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
};
</script>

<style>
.custom-select {
  height: 38px;
  width: 50%; /* Adjust the height as needed */
}

</style>


<!-- <script>
import { ref, computed, onMounted, watch } from 'vue';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);


export default {
  setup() {
    const customers = ref([]);
    const selectedCustomer = ref(null);
    const selectedInvoiceNumber = ref('');
const selectedCompany = ref(null);
const companies = ref([]);

    const invoiceRows = ref([]);
    const isEditing = ref([]);
    const invoiceNumber = ref('');

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
    if (row.customer_id === selectedCustomer.value.id) {
      invoiceNumbers.add(row.invoice_number);
    }
  }
  return ['', ...Array.from(invoiceNumbers)];
});


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




const editRow = (index) => {
  isEditing.value[index] = true;
};


const deleteRow = async (index) => {
  const invoice = filteredInvoiceRows.value[index];
  if (!invoice.id) {
    invoiceRows.value.splice(index, 1);
    return;
  }
  try {
    await supabase.from('invoice').delete().match({ id: invoice.id });
   // Update isEditing for the deleted row
    invoiceRows.value.splice(index, 1);
  } catch (error) {
    console.error('Failed to delete row:', error);
  }
};


const saveChanges = async () => {
  try {
    const companyData = selectedCompany.value;
    if (!companyData) {
      console.error('No company selected.');
      return;
    }

    const { logo, company_name,proffesion,name,surname,street,street_number,postal_code,place,uid_number,account,iban_number,phone_number,webpage,email,MwSt,bank } = companyData;

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
  } catch (error) {
    console.error('Failed to update data:', error);
  }
};



const addNewRow = () => {
  const newRow = {
    description: '',
    quantity: 0,
    price_per_unit: 0,
    company_id: selectedCompany.value.profesion,
    customer_id: selectedCustomer.value.id,
    invoice_number: selectedInvoiceNumber.value || generateInvoiceNumber.value,
  };

  invoiceRows.value.push(newRow);
};

    const generateInvoiceNumber = () => {
      // Generate a new invoice number logic goes here
      // You can use a random number generator or any other logic you prefer
      invoiceNumber.value = 'INV-' + Math.floor(Math.random() * 100000);
    };

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
          const { data: company, error: companyError } = await supabase
            .from('company')
            .select('*')
            .eq ('id', selectedCompany.value.id)
            .single();

          if (companyError) {
            console.error('Failed to fetch customer data:', compaynError);
            return;
          }
       

          // Query for the selected invoice number
          const { data: invoiceData, error: invoiceError } = await supabase
            .from('invoice')
            .select('*')
            .eq('invoice_number', selectedInvoiceNumber.value)
            .eq('customer_id', customerData.id)
            .eq('company_id',companyData.id)
            .single();

          if (invoiceError) {
            console.error('Failed to fetch invoice data:', invoiceError);
            return;
          }

          // Query for the table or row where the selected invoice number and customer are used
          // Replace `tableName` and `rowId` with the appropriate values for your scenario
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

          // Process the fetched data as needed
          console.log('Selected customer data:', customerData);
          console.log('Selected invoice data:', invoiceData);
          console.log('Selected data:', selectedData);
        }
      } catch (error) {
        console.error('Failed to fetch selected data:', error);
      }
    };

onMounted(async () => {
  await fetchCustomers();
  fetchSelectedData();
  fetchInvoiceData()
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
    };
  },
};
</script>  -->



<!-- <template>
  <div class="row">
    <hr class="mt-3">
    <div class="col-sm-3 mt-3">
      <div>
        <select v-if="selectedTable && entries[selectedTable]" v-model="selectedEntry" class="form-select mt-3" aria-label="Default select example">
          <option disabled value="">Select a customer</option>
          <option v-for="entry in entries[selectedTable]" :key="entry.id" :value="entry">
            {{ entry.name }}
          </option>
        </select>
        <input v-model="invoiceNumber" type="text" class="form-control mt-3" placeholder="Invoice Number">
        <button @click="generateInvoiceNumber" class="btn btn-primary mt-2">Generate</button>
      </div>
<div class="text-secondary">
    <div class="my-1">Kunden Nummer:<br>
    {{ selectedEntry && selectedEntry.id }}
  </div>
    <div class="my-1">
    {{ selectedEntry && selectedEntry.name }}, {{ selectedEntry && selectedEntry.surname }}
  </div>
  <div class="my-1">
    {{ selectedEntry && selectedEntry.street }}, {{ selectedEntry && selectedEntry.streetnumber }}
  </div>
  <div class="my-1">
    {{ selectedEntry && selectedEntry.postcode }}, {{ selectedEntry && selectedEntry.place }}
  </div>
      <div class="my-1">
    {{ selectedEntry && selectedEntry.email }}
  </div>
</div>

    </div>

    <table class="table table-borderless border-0 border-b-2" aria-label="">
      <thead>
        <tr>
          <th class="text-dark bg-light"></th>
          <th class="text-dark bg-light text-center"><span><i class="bi bi-pencil"></i></span></th>
          <th class="text-dark bg-light text-center"><span><i class="bi bi-wrench"></i></span></th>
          <th class="text-dark bg-light">Pos.</th>
          <th class="text-dark bg-light">InvoiceNumber</th>
          <th class="text-dark bg-light">Description</th>
          <th class="text-dark bg-light">Qty</th>
          <th class="text-dark bg-light">Unit Price</th>
          <th class="width=140 text-dark bg-light">Amount</th>
        </tr>
      </thead>
      <tbody class="text-95 text-secondary-d3">
        <tr v-for="(row, index) in invoiceRows" :key="row.id">
          <td>
            <input type="checkbox" v-model="row.checked" />
          </td>
          <td class="text-center">
            <button class="btn btn-warning m-1" @click="editRow(index)">
              <i class="bi bi-pencil"></i>
            </button>
             </td>
             <td class="text-center">
            <button class="btn btn-warning m-1"  @click="deleteRow(index)">
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
              <input v-model="row.quantity" />
            </template>
            <template v-else>
              {{ row.quantity }}
            </template>
          </td>
          <td class="text-95">
            <template v-if="isEditing[index]">
              <input v-model="row.price_per_unit" />
            </template>
            <template v-else>
              {{ row.price_per_unit }}
            </template>
          </td>
          <td class="text-secondary-d2">{{ row.quantity * row.price_per_unit }}</td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-primary mt-3" @click="addNewRow">Add New Row</button>
    <button class="btn btn-primary mt-3" @click="saveChanges">Save Changes</button>
  </div>
</template>
<script>
import { ref, reactive, onMounted } from 'vue';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default {
  props: {
    invoice_number: String,
    customerData: Object,
  },
  setup() {
    const entries = ref(null);
    const selectedTable = ref(null);
    const selectedEntry = ref(null);
    const invoiceRows = ref([]);
    const isEditing = ref([]);
    const invoiceNumber = ref('');

    const editRow = (index) => {
      isEditing.value[index] = true;
    };

    const deleteRow = async (index) => {
      const row = invoiceRows.value[index];
      if (row.id) {
        try {
          await supabase.from('invoice').delete().match({ id: row.id });
          invoiceRows.value.splice(index, 1);
          isEditing.value.splice(index, 1);
        } catch (error) {
          console.error('Failed to delete row:', error);
        }
      } else {
        invoiceRows.value.splice(index, 1);
        isEditing.value.splice(index, 1);
      }
    };

    async function saveChanges() {
      try {
        for (const [index, row] of invoiceRows.value.entries()) {
          if (row.id) {
            const { description, price_per_unit, quantity } = row;
            const total = quantity * price_per_unit;
            
            await supabase
              .from('invoice')
              .update({ description, price_per_unit, quantity, total })
              .match({ id: row.id });

            isEditing.value[index] = false;
          } else {
           
            const newRow = {
              description: row.description,
              price_per_unit: row.price_per_unit,
              quantity: row.quantity,
              total: row.price_per_unit * row.quantity,
              customer_id: selectedEntry.value.id, // Add the selected customer's ID
              invoice_number: invoiceNumber.value, // Add the invoice number
            };

            const { data, error } = await supabase.from('invoice').insert([newRow]);
            if (error) {
              console.error('Failed to insert new row:', error);
              return;
            }

            if (data && data.length > 0) {
              invoiceRows.value[index].id = data[0].id;
              isEditing.value[index] = false;
            } else {
              console.error('No invoice data returned after insert.');
            }
          }
        }
      } catch (error) {
        console.error('Failed to update data:', error);
      }
    }

    function addNewRow() {
      invoiceRows.value.push({
        description: '',
        quantity: 0,
        price_per_unit: 0,
      });
      isEditing.value.push(true);
    }

    function generateInvoiceNumber() {
      // Generate a new invoice number logic goes here
      // You can use a random number generator or any other logic you prefer
      invoiceNumber.value = 'INV-' + Math.floor(Math.random() * 100000);
    }

async function fetchCustomerData() {
  try {
    const { data, error } = await supabase.from('customer').select('*');
    if (error) {
      console.error('Failed to fetch customer data:', error);
      return;
    }

    if (data && data.length > 0) {
      entries.value = data.reduce((acc, cur) => {
        if (!acc[cur.table]) {
          acc[cur.table] = [];
        }
        acc[cur.table].push(cur);
        return acc;
      }, {});

      selectedTable.value = Object.keys(entries.value)[0];
      selectedEntry.value = entries.value[selectedTable.value][0];
    } else {
      console.error('No customer data found.');
    }

    await checkUserAndFetchData(); // Call checkUserAndFetchData to populate customerData
  } catch (error) {
    console.error('Failed to fetch customer data:', error);
  }
}


async function checkUserAndFetchData() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Failed to fetch user data:', error);
    return;
  }

  if (data) {
    try {
      const { data: customerData, error: customerError } = await supabase
        .from('customer')
        .select('*')
        .eq('id', selectedEntry.id) // Fetch the selected customer's data by ID
        .single();

      if (customerError) {
        console.error('Failed to fetch customer data:', customerError);
        return;
      }

      customerData.value = customerData; // Assign fetched customer data to customerData object
    } catch (error) {
      console.log('Failed to fetch customer data:', error.message);
    }
  }
}



    onMounted(async () => {
      await fetchCustomerData();
    });

    return {
      entries,
      selectedTable,
      selectedEntry,
      invoiceRows,
      isEditing,
      invoiceNumber,
      editRow,
      deleteRow,
      saveChanges,
      addNewRow,
      generateInvoiceNumber,
    };
  },
};
</script> -->


<!-- 
<template>
  <div class="row">
    <hr class="mt-3">
    <div class="col-sm-3 mt-3">
      <div>
<select v-model="selectedCustomer" class="form-select mt-3" aria-label="Select a customer">
  <option disabled value="">Select a customer</option>
  <option v-for="customer in customers" :key="customer.id" :value="customer">
    {{ customer.name }}
  </option>
</select>
<select v-model="selectedInvoiceNumber" class="form-select mt-3" v-if="selectedCustomer" aria-label="Select Invoice Number">
  <option disabled value="">Select Invoice Number</option>
  <option value="" selected>Show All</option>
  <option v-for="invoice in filteredInvoiceNumbers" :value="invoice" :key="invoice">
    {{ invoice }}
  </option>
</select>

        <input v-model="invoiceNumber" type="text" class="form-control mt-3" placeholder="Invoice Number">
        <button @click="generateInvoiceNumber" class="btn btn-primary mt-2">Generate</button>
      </div>
      <div class="text-secondary">
        <div class="my-1">Kunden Nummer:<br>
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
      </div>
    </div>
    <table class="table table-borderless border-0 border-b-2" aria-label="">
      <thead>
        <tr>
          <th class="text-dark bg-light"></th>
          <th class="text-dark bg-light text-center"><span><i class="bi bi-pencil"></i></span></th>
          <th class="text-dark bg-light text-center"><span><i class="bi bi-wrench"></i></span></th>
          <th class="text-dark bg-light">Pos.</th>
          <th class="text-dark bg-light">InvoiceNumber</th>
          <th class="text-dark bg-light">Description</th>
          <th class="text-dark bg-light">Qty</th>
          <th class="text-dark bg-light">Unit Price</th>
          <th class="width=140 text-dark bg-light">Amount</th>
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
    <button class="btn btn-primary mt-3" @click="addNewRow">Add New Row</button>
    <button class="btn btn-primary mt-3" @click="saveChanges">Save Changes</button>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);


export default {
  setup() {
    const customers = ref([]);
    const selectedCustomer = ref(null);
    const selectedInvoiceNumber = ref('');

    const invoiceRows = ref([]);
    const isEditing = ref([]);
    const invoiceNumber = ref('');

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
    if (row.customer_id === selectedCustomer.value.id) {
      invoiceNumbers.add(row.invoice_number);
    }
  }
  return ['', ...Array.from(invoiceNumbers)];
});


const filteredInvoiceRows = computed(() => {
  if (!selectedCustomer.value) {
    return invoiceRows.value;
  }
  if (!selectedInvoiceNumber.value || selectedInvoiceNumber.value === '') {
    return invoiceRows.value.filter(
      (row) => row.customer_id === selectedCustomer.value.id
    );
  }
  return invoiceRows.value.filter(
    (row) =>
     
      row.invoice_number === selectedInvoiceNumber.value
  );
});



const editRow = (index) => {
  isEditing.value[index] = true;
};


const deleteRow = async (index) => {
  const invoice = filteredInvoiceRows.value[index];
  if (!invoice.id) {
    invoiceRows.value.splice(index, 1);
    return;
  }
  try {
    await supabase.from('invoice').delete().match({ id: invoice.id });
   // Update isEditing for the deleted row
    invoiceRows.value.splice(index, 1);
  } catch (error) {
    console.error('Failed to delete row:', error);
  }
};


const saveChanges = async () => {
  try {
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
        if (!selectedInvoiceNumber.value) {
          // Generate a new invoice number if none is selected
          generateInvoiceNumber();
        }

        const newRow = {
          description,
          price_per_unit,
          quantity,
          total,
          customer_id: selectedCustomer.value.id,
          invoice_number: selectedInvoiceNumber.value || invoiceNumber.value,
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
  } catch (error) {
    console.error('Failed to update data:', error);
  }
};


    const addNewRow = () => {
      const newRow = {
    description: '',
    quantity: 0,
    price_per_unit: 0,
    customer_id: selectedCustomer.value.id,
    invoice_number: selectedInvoiceNumber.value,
   
      };

      invoiceRows.value.push(newRow);
    };

    const generateInvoiceNumber = () => {
      // Generate a new invoice number logic goes here
      // You can use a random number generator or any other logic you prefer
      invoiceNumber.value = 'INV-' + Math.floor(Math.random() * 100000);
    };

    const fetchSelectedData = async () => {
      try {
        if (selectedCustomer.value && selectedInvoiceNumber.value) {
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

          // Query for the selected invoice number
          const { data: invoiceData, error: invoiceError } = await supabase
            .from('invoice')
            .select('*')
            .eq('invoice_number', selectedInvoiceNumber.value)
            .eq('customer_id', customerData.id)
            .single();

          if (invoiceError) {
            console.error('Failed to fetch invoice data:', invoiceError);
            return;
          }

          // Query for the table or row where the selected invoice number and customer are used
          // Replace `tableName` and `rowId` with the appropriate values for your scenario
          const { data: selectedData, error: selectedDataError } = await supabase
            .from('invoice')
            .select('*')
            .eq('invoice_number', invoiceData.id)
            .eq('customer_id', customerData.id)
            .single();

          if (selectedDataError) {
            console.error('Failed to fetch selected data:', selectedDataError);
            return;
          }

          // Process the fetched data as needed
          console.log('Selected customer data:', customerData);
          console.log('Selected invoice data:', invoiceData);
          console.log('Selected data:', selectedData);
        }
      } catch (error) {
        console.error('Failed to fetch selected data:', error);
      }
    };

onMounted(async () => {
  await fetchCustomers();
  fetchSelectedData();
  fetchInvoiceData()

  
});

    watch(selectedInvoiceNumber, () => {
      fetchInvoiceData();
    });

    return {
      customers,
      selectedCustomer,
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
    };
  },
};
</script>  -->