<!-- <template>
  <div class="page-content container">
      <div class="page-header text-blue-d2">
          <h1 class="page-title text-secondary-d1">
             {{ companyData ? companyData.company_name : 'Loading...' }}
              <small class="page-info">
                  <i class="fa fa-angle-double-right text-80"></i>
              
              </small>
          </h1>

          <div class="page-tools">
              <div class="action-buttons">
                  <a class="btn bg-white btn-light mx-1px text-95" href="#" data-title="Print">
                      <i class="mr-1 fa fa-print text-primary-m1 text-120 w-2"></i>
                      Print
                  </a>
                  <a class="btn bg-white btn-light mx-1px text-95" href="#" data-title="PDF">
                      <i class="mr-1 fa fa-file-pdf-o text-danger-m1 text-120 w-2"></i>
                      Export
                  </a>
              </div>
          </div>
      </div>

      <div class="container px-0">
          <div class="row mt-4">
              <div class="col-12 col-lg-12">
                  <div class="row">
                      <div class="col-12">
                          <div class="text-center text-150">
                              <i class="fa fa-book fa-2x text-success-m2 mr-1"></i>
                              <span class="text-default-d3">{{ companyData ? companyData.company_name : 'Loading...' }}-{{ companyData ? companyData.profession : 'Loading...' }}{{ companyData ? companyData.name : 'Loading...' }}{{ companyData ? companyData.surname : 'Loading...' }},{{ companyData ? companyData.street : 'Loading...' }}.{{ companyData ? companyData.street_number : 'Loading...' }}{{ companyData ? companyData.postal_code : 'Loading...' }}{{ companyData ? companyData.place : 'Loading...' }}</span>
                          </div>
                      </div>
                  </div>
         

                  <hr class="row brc-default-l1 mx-n1 mb-4" />

                  <div class="row">
                      <div class="col-sm-6 mt-3">
                          <div>
                              <span class="text-sm text-grey-m2 align-middle">{{ customerData ? customerData.name : 'Loading...' }}</span>
                              <span class="text-sm text-grey-m2 align-middle">KundeVorname</span>
                          </div>
                          <div class="text-grey-m2">
                              <div class="my-1">
                                  Street, straasen nummer
                              </div>
                              <div class="my-1">
                                  Plz, Ort
                              </div>
                              <div class="my-1 mt-5 pt-5"><i
                                      class="fa fa-phone fa-flip-horizontal text-secondary fw-3"></i> <b
                                      class="text-600">Rechnung-Nr.</b><b class="text-600 ms-3">Rechnungnummer</b></div>
                              <div class="my-1 mt-5">
                                  Sehr Geehrter Herr Name
                              </div>
                              <div class="my-1 mt-3">
                                  Vielen Dank für den Auftrag, Ich erlaube mir, Ihnen folgende Rechnung zu unterbreiten.
                              </div>
                          </div>
                      </div>
                 

                      <div class="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end pe-5">
                          <hr class="d-sm-none" />
                          <div class="text-grey-m2 my-3">
                              <div class="my-2 d-flex justify-content-between">
                                  <div class="col-6"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span
                                          class="text-600 text-90">Rechnung - Nr:</span></div>
                                  <div class="col-9 text-end">{{ invoice_number }}</div>
                              </div>

                              <div class="my-2 d-flex justify-content-between">
                                  <div class="col-6"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span
                                          class="text-600 text-90">Datum:</span></div>
                                  <div class="col-9 text-end">Oct 12, 2019</div>
                              </div>

                              <div class="my-2 d-flex justify-content-between">
                                  <div class="col-6"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span
                                          class="text-600 text-90">UiD:</span></div>
                                  <div class="col-9 text-end">UiD nummer</div>
                              </div>

                              <div class="my-2 d-flex justify-content-between">
                                  <div class="col-6"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span
                                          class="text-600 text-90">MwSt:</span></div>
                                  <div class="col-9 text-end">MwSt nummer MWST</div>
                              </div>
                          </div>
                      </div>
             
                  </div>

                  <div class="mt-4">
                    <div class="row text-600 text-dark bg-secondary-subtle py-25">
                          <div class="d-none d-sm-block col-1">Pos</div>
                          <div class="col-9 col-sm-5">Bezeichnung/Beschreibung</div>
                          <div class="d-none d-sm-block col-4 col-sm-2">Menge</div>
                          <div class="d-none d-sm-block col-sm-2">Preis/stück</div>
                          <div class="col-2">Positionspreis</div>
                      </div>

                      <div class="text-95 text-secondary-d3">
                          <div class="row mb-2 mb-sm-0 py-25">
                              <div class="d-none d-sm-block col-1">{{ row.position }}</div>
                              <div class="col-9 col-sm-5">line1 bezeichnung</div>
                              <div class="d-none d-sm-block col-2">2</div>
                              <div class="d-none d-sm-block col-2 text-95">$10</div>
                              <div class="col-2 text-secondary-d2">$20</div>
                          </div>

                          <div class="row mb-2 mb-sm-0 py-25 bgc-default-l4">
                              <div class="d-none d-sm-block col-1">2</div>
                              <div class="col-9 col-sm-5">Web hosting</div>
                              <div class="d-none d-sm-block col-2">1</div>
                              <div class="d-none d-sm-block col-2 text-95">$15</div>
                              <div class="col-2 text-secondary-d2">$15</div>
                          </div>

                          <div class="row mb-2 mb-sm-0 py-25">
                              <div class="d-none d-sm-block col-1">3</div>
                              <div class="col-9 col-sm-5">Software development</div>
                              <div class="d-none d-sm-block col-2">--</div>
                              <div class="d-none d-sm-block col-2 text-95">$1,000</div>
                              <div class="col-2 text-secondary-d2">$1,000</div>
                          </div>

                          <div class="row mb-2 mb-sm-0 py-25 bgc-default-l4">
                              <div class="d-none d-sm-block col-1">4</div>
                              <div class="col-9 col-sm-5">Consulting</div>
                              <div class="d-none d-sm-block col-2">1 Year</div>
                              <div class="d-none d-sm-block col-2 text-95">$500</div>
                              <div class="col-2 text-secondary-d2">$500</div>
                          </div> 
                               <table class="table table-borderless border-0 border-b-2" v-if="selectedInvoiceNumber !== '' || generateInvoiceNumber !== ''">

      <thead>
        <tr>
          <th class="text-dark bg-light"></th>

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

          <td>{{ row.position }}</td>
          <td>{{ row.invoice_number }}</td>
          <td>

              {{ row.description }}

          </td>
          <td>

              {{ row.quantity }}

          </td>
          <td class="text-95">

              {{ row.price_per_unit }}

          </td>
          <td class="text-secondary-d2">{{ total }}</td>
        </tr>
      </tbody>
    </table>
                  

                      <div class="row border-b-2 brc-default-l2"></div>

                      <div class="container text-start mt-5">
                          <div class="row align-items-end">
                              <div class="col">
                                  Zwischensumme
                              </div>
                              <div class="col text-end">

                              </div>
                              <div class="col text-end">
                                  Amount list
                              </div>
                          </div>
                          <div class="row align-items-end">
                              <div class="col">
                                  Mehrwertsteuer
                              </div>
                              <div class="col text-end">
                                  7,7%
                              </div>
                              <div class="col text-end">
                                  with Tax
                              </div>
                          </div>
                          <div class="row align-items-end">
                              <div class="col">
                                  <p class="fw-bold mb-0">Rechnugsbetrag</p>ink.Material
                              </div>
                              <div class="col text-end">
                                  <p class="fw-bold">inkl.MwSt.</p>
                              </div>
                              <div class="col text-end">
                                  <p class="fw-bold">Gesamtbetrag</p>
                              </div>
                          </div>
                      </div>
                      <div class="container mt-5">
                          <div class="row">

                              <div class="col-3">Rechnungsbetrag zahlbar bis</div>
                              <div class="col-3 text-start">
                                  <p class="fw-bold mb-0">date + 30days</p>
                              </div>
                          </div>
                      </div>
                      <div class="container mt-5">
                          <div class="row">
                              <div class="col-4">Freundliche Grüsse</div>
                          </div>
                          <div class="row mt-5">
                              <div class="col-4">Name company worker name</div>
                          </div>


                          <br>
                          <div class="row">
                              <div class="col-sm-3 mt-3 ">
                                  <div>
                                      <span class="text-sm text-secondary align-middle">Company Name</span>
                                      <span class="text-sm text-secondary align-middle">Company Vorname</span>
                                  </div>
                                  <div class="text-secondary">
                                      <div class="my-1">
                                          Street, straasen nummer
                                      </div>
                                      <div class="my-1">
                                          Plz, Ort
                                      </div>
                                  </div>

                              </div>
                              <div class="col-sm-3 mt-3">
                                  <div>
                                      <span class="text-sm text-grey-m2 align-middle">GLKB</span>
                                      <span class="text-sm text-grey-m2 align-middle"></span>
                                  </div>
                                  <div>
                                      <span class="text-sm text-dark align-middle">Company Account:</span>
                                      <span class="text-sm text-dark align-middle">0939894:</span>
                                  </div>
                                  <div>
                                      <span class="text-sm text-dark align-middle">IBAN:</span>
                                      <span class="text-sm text-dark align-middle">0939894:</span>
                                  </div>
                                  <div>
                                      <span class="text-sm text-dark align-middle">MwSt:</span>
                                      <span class="text-sm text-dark align-middle">0939894:</span>
                                  </div>

                                  <div>
                                  </div>
                              </div>
                              <div class="col-sm-3 mt-3">
                                  <div>
                                      <span class="text-sm text-grey-m2 align-middle">Tel:</span>
                                      <span class="text-sm text-grey-m2 align-middle">Phonenumber</span>
                                  </div>
                                  <div>
                                      <span class="text-sm text-grey-m2 align-middle">Web:</span>
                                      <span class="text-sm text-grey-m2 align-middle">WebPage</span>
                                  </div>
                                  <div>
                                      <span class="text-sm text-grey-m2 align-middle">Mail:</span>
                                      <span class="text-sm text-grey-m2 align-middle">Email</span>
                                  </div>
                                  <div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template> -->

<template>
  <div>
    <h1>Invoice Details</h1>

    <div v-if="invoiceData">
      <h2>Invoice Information</h2>
      <p>Invoice Number: {{ invoiceData.invoice_number }}</p>
      <p>Invoice Amount: {{ invoiceData.description }}</p>
    </div>

    <div v-if="companyData">
      <h2>Company Information</h2>
      <p>Company Name: {{ companyData ? companyData.name : 'Loading...' }}</p>
      <p>Company Address: {{ companyData ? companyData.place : 'Loading...' }}</p>
    </div>

    <div v-if="customerData">
      <h2>Customer Information</h2>
      <p>Customer Name: {{ customerData ? customerData.name : 'Loading...' }}</p>
      <p>Customer Email: {{ customerData ? customerData.email : 'Loading...' }}</p>
    </div>

    <div v-if="!invoiceData && !companyData && !customerData">
      <p>Loading...</p>
    </div>
  </div>
</template>



<script>
import { ref, onMounted } from 'vue';
import { createClient } from '@supabase/supabase-js';
import { useRoute } from 'vue-router';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default {
  name: 'Invoices',
  props: ['invoiceNumber'],

  setup(props) {
    const route = useRoute();

    const invoiceData = ref(null);
    const companyData = ref(null);
    const customerData = ref(null);

    const fetchInvoiceData = async () => {
      try {
        const { data, error } = await supabase
          .from('invoice')
          .select('*')
          .eq('invoice_number', props.invoiceNumber)
          .limit(1);

        if (error) {
          console.error('Failed to fetch invoice data:', error);
          return;
        }

        if (data && data.length > 0) {
          invoiceData.value = data[0];
          await fetchCompanyData();
          await fetchCustomerData();
        } else {
          console.error('No data found for invoice number:', props.invoiceNumber);
        }
      } catch (error) {
        console.error('Failed to fetch invoice data:', error);
      }
    };

    const fetchCompanyData = async () => {
      const companyId = invoiceData.value?.company_id;

      if (!companyId) {
        return;
      }

      try {
        const { data, error } = await supabase
          .from('company')
          .select('*')
          .eq('id', companyId)
          .single();

        if (error) {
          console.error('Failed to fetch company data:', error);
          return;
        }

        if (data) {
          companyData.value = data;
        }
      } catch (error) {
        console.error('Failed to fetch company data:', error);
      }
    };

    const fetchCustomerData = async () => {
      const customerId = invoiceData.value?.customer_id;

      if (!customerId) {
        return;
      }

      try {
        const { data, error } = await supabase
          .from('customer')
          .select('*')
          .eq('id', customerId)
          .single();

        if (error) {
          console.error('Failed to fetch customer data:', error);
          return;
        }

        if (data) {
          customerData.value = data;
        }
      } catch (error) {
        console.error('Failed to fetch customer data:', error);
      }
    };

    onMounted(() => {
      fetchInvoiceData();
    });

    return {
      invoiceData,
      companyData,
      customerData,
    };
  },
};
</script>









<style>
body {
  margin-top: 20px;
  color: #484b51;
}

.text-secondary-d1 {
  color: #728299 !important;
}

.page-header {
  margin: 0 0 1rem;
  padding-bottom: 1rem;
  padding-top: .5rem;
  border-bottom: 1px dotted #e2e2e2;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-align: center;
  align-items: center;
}

.page-title {
  padding: 0;
  margin: 0;
  font-size: 1.75rem;
  font-weight: 300;
}

.brc-default-l1 {
  border-color: #dce9f0 !important;
}

.ml-n1,
.mx-n1 {
  margin-left: -.25rem !important;
}

.mr-n1,
.mx-n1 {
  margin-right: -.25rem !important;
}

.mb-4,
.my-4 {
  margin-bottom: 1.5rem !important;
}

hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, .1);
}

.text-grey-m2 {
  color: #888a8d !important;
}

.text-success-m2 {
  color: #86bd68 !important;
}

.font-bolder,
.text-600 {
  font-weight: 600 !important;
}

.text-110 {
  font-size: 110% !important;
}

.text-blue {
  color: #478fcc !important;
}

.pb-25,
.py-25 {
  padding-bottom: .75rem !important;
}

.pt-25,
.py-25 {
  padding-top: .75rem !important;
}

.bgc-default-tp1 {
  background-color: rgba(121, 169, 197, .92) !important;
}

.bgc-default-l4,
.bgc-h-default-l4:hover {
  background-color: #f3f8fa !important;
}

.page-header .page-tools {
  -ms-flex-item-align: end;
  align-self: flex-end;
}

.btn-light {
  color: #757984;
  background-color: #f5f6f9;
  border-color: #dddfe4;
}

.w-2 {
  width: 1rem;
}

.text-120 {
  font-size: 120% !important;
}

.text-primary-m1 {
  color: #4087d4 !important;
}

.text-danger-m1 {
  color: #dd4949 !important;
}

.text-blue-m2 {
  color: #68a3d5 !important;
}

.text-150 {
  font-size: 150% !important;
}

.text-60 {
  font-size: 60% !important;
}

.text-grey-m1 {
  color: #7b7d81 !important;
}

.align-bottom {
  vertical-align: bottom !important;
}
</style>