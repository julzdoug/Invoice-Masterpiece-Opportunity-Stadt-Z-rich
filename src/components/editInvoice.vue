

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

<select v-if="selectedTable && entries[selectedTable]" v-model="selectedEntry" class="form-select mt-3" aria-label="Default select example">
  <option disabled value="">Select an invoice number</option>
  <option v-for="entry in entries[selectedTable]" :key="entry.id" :value="entry">
    {{ selectedEntry.invoice_number }}
  </option>
</select>
      </div>
      <div class="text-secondary">
        <div class="my-1">
          Kunden Nummer:<br>
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
        <div class="my-1">
          Invoice Number:<br>
          {{ selectedInvoiceNumber }}
        </div>
      </div>
    </div>
    <table class="table table-borderless border-0 border-b-2">
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
        <tr v-for="(row, index) in invoiceRows" :key="row.id">
          <td>
            <input type="checkbox" v-model="row.checked" />
          </td>
          <td class="text-center">
            <button class="btn btn-warning m-1" v-if="!isEditing[index]" @click="editRow(index)">
              <i class="bi bi-pencil"></i>
            </button>
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
import { ref, reactive, onMounted, toRefs } from 'vue';

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
    const selectedEntry = ref({});
    const invoiceData = ref([]);
    const invoiceRows = ref([]);
    const invoiceList = ref([]);
 const { invoice_number } = toRefs(props);
    const selectedInvoiceNumber = ref(invoice_number.value);

    const isEditing = ref([]);

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
              invoice_number: selectedEntry.invoice_number, // Add the invoice number
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

    async function addNewRow() {
      if (!selectedEntry.value || !selectedEntry.value.invoice_number) {
        console.error('No invoice number selected for the customer.');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('invoice')
          .select('*')
          .eq('invoice_number', selectedEntry.invoice_number)
          .single();

        if (error) {
          console.error('Failed to fetch invoice details:', error);
          return;
        }

        if (data) {
          invoiceRows.value.push({
            description: data.description,
            quantity: data.quantity,
            price_per_unit: data.price_per_unit,
            invoice_number: selectedEntry.invoice_number,
          });
          isEditing.value.push(true);
        } else {
          console.error('No invoice data found for the selected invoice number.');
        }
      } catch (error) {
        console.error('Failed to fetch invoice details:', error);
      }
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
      const selectedCustomer = entries.value[selectedTable.value][0];

      // Fetch the invoice data for the selected customer
      await checkUserAndFetchData(); // Remove the argument here

      // Assign the invoice number from the first invoice to selectedEntry
      selectedEntry.value = { ...selectedCustomer, invoice_number: selectedCustomer.invoice_number };
    } else {
      console.error('No customer data found.');
    }
  } catch (error) {
    console.error('Failed to fetch customer data:', error);
  }
}


async function checkUserAndFetchData() {
  if (!selectedEntry.value || !selectedEntry.value.id) {
    console.error('No customer selected.');
    return;
  }

  try {
    const { data: customerData, error: customerError } = await supabase
      .from('customer')
      .select('id, name, surname, street, postcode, place, email, streetnumber')
      .eq('id', selectedEntry.value.id)
      .single();

    if (customerError) {
      console.error('Failed to fetch customer data:', customerError);
      return;
    }

    const { data: invoices, error: invoiceError } = await supabase
      .from('invoice')
      .select('id, invoice_number, description, quantity, price_per_unit')
      .eq('customer_id', selectedEntry.value.id);

    if (invoiceError) {
      console.error('Failed to fetch invoice data:', invoiceError);
      return;
    }

    invoiceList.value = invoices.map((invoice) => invoice.invoice_number);
    invoiceRows.value = invoices.map((invoice) => ({
      description: invoice.description,
      quantity: invoice.quantity,
      price_per_unit: invoice.price_per_unit,
      invoice_number: invoice.invoice_number,
    }));

    // Update the customerData reactive object
    customerData.value = customerData;

    await fetchInvoiceData();
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

async function fetchInvoiceData() {
  if (selectedEntry.value && selectedEntry.value.id) {
    try {
      const { data: invoices, error: invoiceError } = await supabase
        .from('invoice')
        .select('invoice_number')
        .eq('customer_id', selectedEntry.value.id);

      if (invoiceError) {
        console.error('Error fetching invoices:', invoiceError);
        return;
      }

      invoiceList.value = invoices.map((invoice) => invoice.invoice_number);
    } catch (error) {
      console.error('Failed to fetch invoice data:', error);
    }
  }
}

    onMounted(async () => {
      await fetchCustomerData();
 await fetchInvoiceData();
    });

    const customerData = reactive({
      value: null,
    });

return {
  entries,
  selectedTable,
  selectedEntry,
  invoiceRows,
  invoiceList,
  selectedInvoiceNumber, // Add this line to include selectedInvoiceNumber
  isEditing,
  invoiceData,
  invoice_number,
  editRow,
  deleteRow,
  saveChanges,
  addNewRow,
  customerData,
  checkUserAndFetchData,
};

  },
};
</script> 
