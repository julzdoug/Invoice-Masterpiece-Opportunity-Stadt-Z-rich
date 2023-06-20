<template>
  <div class="row">
    <hr class="mt-3">
    <div class="col-sm-3 mt-3">
      <div>
<select v-if="selectedTable && entries[selectedTable]" v-model="selectedCustomer" class="form-select mt-3" aria-label="Default select example" @change="fetchInvoiceData">
  <option disabled value="">Select a customer</option>
  <option v-for="customer in entries[selectedTable]" :key="customer.id" :value="customer">
    {{ customer.name }}
  </option>
</select>

<select class="form-select mt-3" aria-label="Default select example" v-model="selectedInvoiceNumber">
  <option disabled value="">Select Invoice Number</option>
  <option v-for="invoice in selectedInvoicesByCustomer" :value="invoice.invoice_number" :key="invoice.id">
    {{ invoice.invoice_number }}
  </option>
</select>






      </div>
      <div class="text-secondary">
        <div class="my-1">Kunden Nummer:<br>{{ selectedCustomer && selectedCustomer.id }}</div>
        <div class="my-1">{{ selectedCustomer && selectedCustomer.name }}, {{ selectedCustomer && selectedCustomer.surname
        }}</div>
        <div class="my-1">{{ selectedCustomer && selectedCustomer.street }}, {{ selectedCustomer &&
          selectedCustomer.streetnumber }}</div>
        <div class="my-1">{{ selectedCustomer && selectedCustomer.postcode }}, {{ selectedCustomer &&
          selectedCustomer.place }}</div>
        <div class="my-1">{{ selectedCustomer && selectedCustomer.email }}</div>
        <div class="my-1">{{ selectedCustomer && invoice_number }}</div>
      </div>
    </div>

    <table class="table table-borderless border-0 border-b-2">
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
        <tr v-for="(row, index) in filteredRows" :key="row.id">
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
import { ref, reactive, onMounted, computed, watch } from 'vue';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default {
  props: {
    invoice_number: String,
    customerData: Object,
  },
  setup(props) {
  const entries = ref(null);
    const selectedTable = ref(null);
    const selectedEntry = ref(null);
    const invoiceRows = ref([]);
    const isEditing = ref([]);
    const invoiceList = ref([]);
    const selectedInvoices = ref([]);
    const selectedInvoiceNumber = ref(null);
    const selectedCustomer = ref(null);


watch(selectedCustomer, async (newCustomer) => {
  if (newCustomer && newCustomer.id) {
    await fetchInvoiceData(); // Fetch the invoices for the selected customer
  }
});


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
              customer_id: selectedCustomer.value.id, // Add the selected customer's ID
              invoice_number: props.invoice_number, // Use the invoice number from the prop
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

          selectedCustomer.value = data[0];
          selectedTable.value = Object.keys(entries.value)[0];
          selectedEntry.value = entries.value[selectedTable.value][0];

          // Check if the selected customer exists in the customer table
          const { data: customers, error: customerError } = await supabase
            .from('customer')
            .select('id')
            .eq('id', selectedCustomer.value.id);

          if (customerError) {
            console.error('Error fetching customers:', customerError);
            return;
          }

          if (customers.length === 0) {
            console.error('Selected customer does not exist');
            return;
          }

          await checkUserAndFetchData(); // Call checkUserAndFetchData to populate customerData
        } else {
          console.error('No customer data found.');
        }
      } catch (error) {
        console.error('Failed to fetch customer data:', error);
      }
    }

    async function checkUserAndFetchData() {
      if (props.customerData) {
        try {
          // Check if the selected customer exists in the customer table
          const { data: customers, error: customerError } = await supabase
            .from('customer')
            .select('id')
            .eq('id', props.customerData.id);

          if (customerError) {
            console.error('Error fetching customers:', customerError);
            return;
          }

          if (customers.length === 0) {
            console.error('Selected customer does not exist');
            return;
          }

          selectedCustomer.value = props.customerData; // Reuse the fetched customerData object from the prop
        } catch (error) {
          console.log('Failed to fetch customer data:', error.message);
        }
      }
    }

async function fetchInvoiceData() {
  if (selectedCustomer.value && selectedCustomer.value.id) {
    try {
      // Check if the selected customer exists in the customer table
      const { data: customers, error: customerError } = await supabase
        .from('customer')
        .select('id')
        .eq('id', selectedCustomer.value.id);

      if (customerError) {
        console.error('Error fetching customers:', customerError);
        return;
      }

      if (customers.length === 0) {
        console.error('Selected customer does not exist');
        return;
      }

      // Fetch the invoices for the selected customer
      const { data: invoices, error: invoiceError } = await supabase
        .from('invoice')
        .select('id, invoice_number')
        .eq('customer_id', selectedCustomer.value.id);

      if (invoiceError) {
        console.error('Error fetching invoices:', invoiceError);
        return;
      }

      selectedInvoices.value = invoices;
      selectedInvoiceNumber.value = null; // Reset the selected invoice number

      if (invoices.length > 0) {
        selectedInvoiceNumber.value = invoices[0].invoice_number; // Set the default selected invoice number
      }
    } catch (error) {
      console.error('Failed to fetch invoice data:', error);
    }
  }
}



    onMounted(async () => {
      await fetchCustomerData();
      await fetchInvoiceData();
    });

    const selectedInvoicesByCustomer = computed(() => {
      if (selectedCustomer.value && selectedCustomer.value.id) {
        return selectedInvoices.value.filter(
          (invoice) => invoice.customer_id === selectedCustomer.value.id
        );
      }
      return [];
    });

    return {
      selectedInvoiceNumber,
      invoiceList,
      entries,
      selectedTable,
      selectedEntry,
      invoiceRows,
      isEditing,
      editRow,
      deleteRow,
      saveChanges,
      addNewRow,
      selectedCustomer,
      selectedInvoices,
      selectedInvoicesByCustomer,
    };
  },
};
</script>
