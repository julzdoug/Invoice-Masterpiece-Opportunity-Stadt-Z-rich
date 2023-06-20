<template>
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
              customer_id: selectedEntry.id, // Add the selected customer's ID
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
</script>

