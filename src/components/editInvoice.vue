<template>
  <div class="row">
    <hr class="mt-3">
    <div class="col-sm-3 mt-3">
      <div>
        <select v-model="selectedCustomer" class="form-select mt-3" aria-label="Default select example">
          <option disabled value="">Select a customer</option>
          <option v-for="customer in customers" :key="customer.id" :value="customer">
            {{ customer.name }}
          </option>
        </select>
      </div>
<select class="form-select mt-3" v-model="selectedInvoiceNumber" v-if="selectedCustomer" aria-label="Default select example">
  <option disabled value="">Select Invoice Number</option>
  <option value="" selected>Show All</option>
  <option v-for="invoice in filteredInvoiceRows" :value="invoice.invoice_number" :key="invoice.invoice_number">
    {{ invoice.invoice_number }}
  </option>
</select>


    </div>
    <div class="row">
 <div class="col-sm-3 mt-3">
    <div v-if="selectedCustomer">
      <span class="text-sm text-secondary align-middle">{{ selectedCustomer.name }}</span>
      <span class="text-sm text-secondary align-middle">{{ selectedCustomer.surname }}</span>
    </div>
    <div class="text-secondary" v-if="selectedCustomer">
      <div>
        {{ selectedCustomer.street }}, {{ selectedCustomer.streetnumber }}
      </div>
      <div>
        {{ selectedCustomer.postcode }}, {{ selectedCustomer.place }}
      </div>
    </div>
  </div>
      <hr class="mt-3">
      <div class="table-responsive mt-3">
        <table class="table table-borderless border-0 border-b-2" aria-label="">
          <thead>
            <tr>
              <th class="text-dark bg-light"></th>
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
    <tr v-for="(invoice, index) in filteredInvoiceRows" :key="invoice.id">
      <td>
        <input type="checkbox" v-model="invoice.checked" />
      </td>
      <td class="text-center">
        <button class="btn btn-warning m-1" v-if="!isEditing[index]" @click="editRow(index)">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="btn btn-warning m-1" @click="deleteRow(index)">
          <i class="bi bi-trash3"></i>
        </button>
      </td>
      <td>{{ invoice.customer_id }}</td>
      <td>
        <template v-if="!isEditing[index]">
          {{ invoice.description }}
        </template>
        <template v-else>
          <input v-model="invoice.description" />
        </template>
      </td>
      <td>
        <template v-if="!isEditing[index]">
          {{ invoice.quantity }}
        </template>
        <template v-else>
          <input v-model="invoice.quantity" />
        </template>
      </td>
      <td class="text-95">
        <template v-if="!isEditing[index]">
          {{ invoice.price_per_unit }}
        </template>
        <template v-else>
          <input v-model="invoice.price_per_unit" />
        </template>
      </td>
      <td class="text-secondary-d2">{{ invoice.quantity * invoice.price_per_unit }}</td>
    </tr>
  </tbody>

        </table>
        <button class="btn btn-primary mt-3" @click="addNewRow">Add New Row</button>
        <button class="btn btn-primary mt-3" @click="saveChanges">Save Changes</button>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, computed } from 'vue';
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default {
  setup() {
    const invoiceRows = ref([]);
    const selectedCustomer = ref(null);
    const isEditing = ref(invoiceRows.value.map(() => false));
    const selectedInvoiceNumber = ref('');

    const customers = ref([]);

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


const filteredInvoiceRows = computed(() => {
  if (!selectedCustomer.value) {
    return invoiceRows.value;
  }
  if (!selectedInvoiceNumber.value) {
    return invoiceRows.value.filter(
      (row) => row.customer_id === selectedCustomer.value.id
    );
  }
  return invoiceRows.value.filter(
    (row) =>
      row.customer_id === selectedCustomer.value.id &&
      row.invoice_number === selectedInvoiceNumber.value
  );
});


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
            .eq('invoice_id', invoiceData.id)
            .eq('customer_id', customerData.id)
            .single();

          if (selectedDataError) {
            console.error('Failed to fetch selected data:', selectedDataError);
            return;
          }

          // Process the fetched data as needed
          console.log('Selected Customer Data:', customerData);
          console.log('Selected Invoice Data:', invoiceData);
          console.log('Selected Data:', selectedData);
        }
      } catch (error) {
        console.error('Failed to fetch selected data:', error);
      }
    };

const editRow = (index) => {
  isEditing.value[index] = !isEditing.value[index];
};


const deleteRow = async (index) => {
  const invoice = invoiceRows.value[index];
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
const addNewRow = () => {
  const newRow = {
    description: '',
    quantity: 0,
    price_per_unit: 0,
    customer_id: selectedCustomer.value.id,
    invoice_number: selectedInvoiceNumber.value,
    isEditing: true,
  };

  invoiceRows.value.unshift(newRow);
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

        isEditing[i] = false;
      } else {
        const newRow = {
          description,
          price_per_unit,
          quantity,
          total,
          customer_id: selectedCustomer.value.id,
          invoice_number: selectedInvoiceNumber.value,
        };

        const { data, error } = await supabase.from('invoice').insert([newRow]);
        if (error) {
          console.error('Failed to insert new row:', error);
          return;
        }

        if (data && data.length > 0) {
          invoiceRows.value[i].id = data[0].id;
          isEditing.value[i] = false;
        } else {
          console.error('No invoice data returned after insert.');
        }
      }
    }
  } catch (error) {
    console.error('Failed to update data:', error);
  }
};


    onMounted(() => {
      fetchCustomers();
      fetchInvoiceData();
      fetchSelectedData();
    });

return {
  customers,
  invoiceRows,
  selectedCustomer,
  selectedInvoiceNumber,
  filteredInvoiceRows,
  deleteRow,
  saveChanges,
  editRow,
  isEditing,
  addNewRow, // Add this line
};

  },
};
</script>
