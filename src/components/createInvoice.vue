<template>
  <div class="row">
    <div class="col-sm-3 mt-3">
      <div>
        <span class="text-sm text-secondary align-middle">{{ customerData.name }}</span>
        <span class="text-sm text-secondary align-middle">{{ customerData.surname }}</span>
      </div>
      <div class="text-secondary">
        <div class="my-1">
          {{ customerData.street }}, {{ customerData.streetnumber }}
        </div>
        <div class="my-1">
          {{ customerData.postcode }}, {{ customerData.place }}
        </div>
      </div>
    </div>
    <hr class="mt-3">
    <div class="table-responsive mt-3">

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
            <td>{{ invoice_number }}</td>
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

    async function fetchInvoiceData() {
      try {
        const { data, error } = await supabase.from('invoice').select('*');
        if (error) {
          console.error('Failed to fetch invoice data:', error);
          return;
        }

        if (data && data.length > 0) {
          invoiceRows.value = data;
          isEditing.value = Array(data.length).fill(false);
        } else {
          console.error('No invoice data found.');
        }
      } catch (error) {
        console.error('Failed to fetch invoice data:', error);
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

//Information to who





    onMounted(async () => {
      await fetchInvoiceData();
    });

    return {
      invoiceNumber,
      invoiceRows,
      isEditing,
      saveChanges,
      addNewRow,
      editRow,
      deleteRow,
    };
  },
};
</script><!-- 
<template>
  <div class="row">
<div class="col-sm-3 mt-3">
  <select v-model="selectedCustomer" class="col-4 form-select" @change="loadCustomerData">
    <option disabled value="">Select a customer</option>
    <option v-for="customer in customers" :key="customer.invoice_number" :value="customer.invoice_number">
      {{ customer.name }}
    </option>
  </select>

  <div class="text-secondary">
    <div class="my-1" v-if="customerData.street || customerData.streetnumber">
      {{ customerData.street }}, {{ customerData.streetnumber }}
    </div>
    <div class="my-1" v-if="customerData.postcode || customerData.place">
      {{ customerData.postcode }}, {{ customerData.place }}
    </div>
  </div>

  <div class="my-1" v-if="invoiceNumber">
    {{ invoiceNumber }}
  </div>


      <div class="my-1">
        {{ invoice_number }}
      </div>
      </div>
      <hr class="mt-3">
      <div class="table-responsive mt-3">

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
              <td>{{ invoice_number }}</td>
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
    </div>
</template>


<script>
import { ref, onMounted, watch, reactive } from 'vue';
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
    const invoiceRows = ref([]);
    const isEditing = ref([]);
    const customers = ref([]);
    const selectedCustomer = ref('');
    const customerId = ref(null);
    const invoiceNumber = ref('');
    const customerData = reactive({
      street: '',
      streetnumber: '',
      postcode: '',
      place: '',
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

    async function fetchInvoiceData() {
      try {
        const { data, error } = await supabase.from('invoice').select('*');
        if (error) {
          console.error('Failed to fetch invoice data:', error);
          return;
        }

        if (data && data.length > 0) {
          invoiceRows.value = data;
          isEditing.value = Array(data.length).fill(false);
        } else {
          console.error('No invoice data found.');
        }
      } catch (error) {
        console.error('Failed to fetch invoice data:', error);
      }
    }
async function loadCustomerData() {
  if (!selectedCustomer.value) {
    // Clear the form when no customer is selected
    customerData.street = '';
    customerData.streetnumber = '';
    customerData.postcode = '';
    customerData.place = '';
    customerId.value = '';
    return;
  }

try {
  const { data, error } = await supabase
    .from('customer')
    .select('*')
    .eq('id', selectedCustomer.value)
    .single();

  console.log('Fetched customer data:', data); 

    if (error) {
      console.error('Failed to fetch customer data:', error);
    } else {
      customerData.street = data.street;
      customerData.streetnumber = data.streetnumber;
      customerData.postcode = data.postcode;
      customerData.place = data.place;
      customerId.value = data.id;
    }
} catch (error) {
  console.error('Failed to fetch customer data:', error);
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

    onMounted(async () => {
      await fetchInvoiceData();

      try {
        const { data, error } = await supabase.from('customer').select('*');
        if (error) {
          console.error('Failed to fetch customer data:', error);
          return;
        }

        customers.value = data;
      } catch (error) {
        console.error('Failed to fetch customer data:', error);
      }
    });
    return {
      invoiceNumber,
      customerData,
      invoiceRows,
      isEditing,
      saveChanges,
      addNewRow,
      editRow,
      deleteRow,
      loadCustomerData,
      customerId,
      customers,
      selectedCustomer,
    };
  },
};
</script> -->

<!-- <script>
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
    const invoiceRows = ref([]);
    const isEditing = ref([]);
    const invoiceNumber = ref('');
const customers = ref([]);
const selectedCustomer = ref('');

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

    async function fetchInvoiceData() {
      try {
        const { data, error } = await supabase.from('invoice').select('*');
        if (error) {
          console.error('Failed to fetch invoice data:', error);
          return;
        }

        if (data && data.length > 0) {
          invoiceRows.value = data;
          isEditing.value = Array(data.length).fill(false);
        } else {
          console.error('No invoice data found.');
        }
      } catch (error) {
        console.error('Failed to fetch invoice data:', error);
      }
    }

    async function loadCustomerData() {
      if (!selectedCustomer.value) {
        // Clear the form when no customer is selected
        customerData.value = {
          name: '',
          surname: '',
          street: '',
          streetnumber: '',
          postcode: '',
          place: '',
          email: '',
          invoice_number: '',
        };
        customerId.value = null;
        return;
      }

      try {
        const { data, error } = await supabase
          .from('customer')
          .select('*')
          .eq('invoice_number', selectedCustomer.value)
          .single();

        if (error) {
          console.error('Failed to fetch customer data:', error);
        } else {
          customerData.value = data;
          customerId.value = data.id;
        }
      } catch (error) {
        console.error('Failed to fetch customer data:', error);
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

     onMounted(async () => {
      await fetchInvoiceData();

      try {
        const { data, error } = await supabase.from('customer').select('*');
        if (error) {
          console.error('Failed to fetch customer data:', error);
          return;
        }

        customers.value = data;
      } catch (error) {
        console.error('Failed to fetch customer data:', error);
      }
    });

    return {
      invoiceNumber,
      invoiceRows,
      isEditing,
      saveChanges,
      addNewRow,
      editRow,
      deleteRow,
      loadCustomerData,
      customers,
      selectedCustomer,
     
    };
  },
};
</script> -->