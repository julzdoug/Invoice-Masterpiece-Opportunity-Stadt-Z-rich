<template>
  <div class="page-content container mb-5">
      <div class="page-header text-blue-d2">
          <h1 class="page-title text-secondary-d1">
              <!--Invoice-->
              <small class="page-info">
                  <i class="fa fa-angle-double-right text-80"></i>
                  <!--ID: #111-222-->
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
                              <span class="text-default-d3">{{ companyData ? companyData.logo : 'Loading...' }}</span></div>
                          <div class="text-center text-150">
                              <i class="fa fa-book fa-2x text-success-m2 mr-1"></i>
                              <span class="text-default-d3">{{ companyData ? companyData.company_name : 'Loading...' }}-{{ companyData ?
                  companyData.profession : 'Loading...' }}{{ companyData ? companyData.name : 'Loading...' }}{{
    companyData ? companyData.surname : 'Loading...' }},{{ companyData ? companyData.street : 'Loading...'
  }}.{{ companyData ? companyData.street_number : 'Loading...' }}{{ companyData ? companyData.postal_code
  : 'Loading...' }}{{ companyData ? companyData.place : 'Loading...' }}</span>
              </div>
            </div>
          </div>

          <hr class="row brc-default-l1 mx-n1 mb-4" />
          
          <div class="row">
            <div class="col-sm-6 mt-3">
              <div v-if="customerData">
                <span class="text-sm text-dark-m2 align-middle">{{ customerData ? customerData.name : 'Loading...'
                }}</span>
                <span class="text-sm text-dark-m2 align-middle">{{ customerData ? customerData.surname : 'Loading...'
                }}</span>
              </div>
              <div class="text-dark-m2" v-if="customerData">
                <div class="my-1">
                  {{ customerData ? customerData.street : 'Loading...' }}, {{ customerData ? customerData.streetnumber :
                    'Loading...' }}
                </div>
                <div class="my-1" v-if="customerData">
                  {{ customerData ? customerData.postcode : 'Loading...' }}, {{ customerData ? customerData.place :
                    'Loading...' }}
                </div>
                <div class="my-1 mt-5 pt-5" v-if="invoiceData"><i class="fa fa-phone fa-flip-horizontal text-secondary fw-3"></i> 
                  <b class="text-600">Rechnung-Nr.</b><b class="text-600 ms-3">{{ invoiceData.invoice_number }}</b>
                  </div>
                <div class="my-1 mt-5" v-if="customerData">
                  Sehr Geehrter Herr Name {{ customerData ? customerData.name : 'Loading...' }}
                </div>
                <div class="my-1 mt-3">
                  Vielen Dank für den Auftrag, Ich erlaube mir, Ihnen folgende Rechnung zu unterbreiten.
                </div>
              </div>
            </div>
            <div class=" col-sm-5 align-self-start d-sm-flex justify-content-end pe-5">
              <hr class="d-sm-none" />
              <div class="text-dark-m2 text-sm my-3">
                <div class="my-2 d-flex justify-content-between">
                  <div class="col-9"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span
                      class="">Rechnung - Nr:</span></div>
                  <div class="col-9 text-end"  v-if="invoiceData">{{ invoiceData.invoice_number }}</div>
                </div>

                <div class="my-2 d-flex justify-content-between">
                  <div class="col-9"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span
                      class="">Datum:</span></div>
                  <div class="col-9 text-end" v-if="invoiceData">{{ invoiceData.invoice_date }}</div>
                </div>

                <div class="my-2 d-flex justify-content-between">
                  <div class="col-9"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span
                      class="">UiD:</span></div>
                  <div class="col-9 text-end" v-if="customerData">{{ companyData ? companyData.uid_number : 'Loading...' }}</div>
                </div>

                <div class="my-2 d-flex justify-content-between">
                  <div class="col-9"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span
                      class="">MwSt:</span></div>
                  <div class="col-9 text-end" v-if="companyData">{{ companyData ? companyData.MwSt : 'Loading...' }}</div>
                </div>
              </div>
            </div>
          </div>
           <div class="mt-4">
<table class="row table table-borderless border-0 border-b-2">
  <thead>
    <tr class="row text-600 py-25">
      <th class="text-dark bg-light sm-block col-1">Pos.</th>
   
      <th class="text-dark bg-light col-9 col-sm-5">Bezeichnung/Beschreibung</th>
      <th class="text-dark bg-light d-none d-sm-block col-4 col-sm-2">Menge</th>
      <th class="text-dark bg-light d-none d-sm-block col-sm-2">Preis/Stück</th>

      <th class="text-dark bg-light col-2 text-end">PositionPreis</th>
    </tr>
  </thead>
  <tbody class="text-95 text-secondary-d3">
    <tr class="row text-300 py-25" v-for="(row, index) in invoiceData.invoice_rows" :key="index">
      <td class="text-dark sm-block col-1">{{ index + 1 }}</td>
 
      <td class="col-9 col-sm-5">{{ row.description }}</td>
      <td class="d-none d-sm-block col-2">{{ row.quantity }}</td>
      <td class="d-none d-sm-block col-2 text-95">{{ row.price_per_unit }}</td>
  
      <td class="col-2 text-secondary-d2 text-end">{{ row.total }}.-CHF</td>
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
              <div class="col-2 text-end">
               {{ invoiceTotal }}
              </div>
            </div>
            <div class="row align-items-end">
              <div class="col-5">
                Mehrwertsteuer
              </div>
              <div class="col text-center">
                7,7%
              </div>
              <div class="col-2 text-end">
                {{ invoiceTotalWithTax }} 
              </div>
            </div>
            <div class="row align-items-end">
              <div class="col">
                <p class="fw-bold mb-0">Rechnugsbetrag</p>ink.Material
              </div>
              <div class="col text-center">
                <p class="fw-bold">inkl.MwSt.</p>
              </div>
              <div class="col-2 text-center">
                <p class="fw-bold text-end"><u>{{  finalCalculation }}</u></p>
              </div>
            </div>
          </div>
          <div class="container mt-5">
            <div class="row">
              <div class="col-3">Rechnungsbetrag zahlbar bis</div>
              <div class="col-3 text-start" v-if="invoiceData">
                <p class="fw-bold mb-0">{{ invoiceData.invoice_date }} + 30days</p>
              </div>
            </div>
          </div>
          <div class="container mt-5">
            <div class="row">
              <div class="col-4 mt-5">Freundliche Grüsse</div>
            </div>
            <div class="row mt-5">
              <div class="col-4" v-if="companyData">{{ companyData ? companyData.name : 'Loading...' }}{{ companyData ? companyData.surname :
                'Loading...' }}</div>
            </div>


            <br>
            <div class="row mt-5">
              <div class="col-sm-5 mt-3 mb-2">
                <div >
                  <span class="text-sm text-dark align-middle">{{ companyData ? companyData.company_name :
                    'Loading...' }}</span>
                  <span class="text-sm text-dark align-middle">{{ companyData ? companyData.name : 'Loading...' }}{{
                    companyData ? companyData.surname : 'Loading...' }}</span>
                </div>
                <div class="text-dark" >
                  <div class="my-1">
                    {{ companyData ? companyData.street : 'Loading...' }}, {{ companyData ? companyData.street_number :
                      'Loading...' }}
                  </div>
                  <div class="my-1">
                    {{ companyData ? companyData.postal_code : 'Loading...' }}, {{ companyData ? companyData.place :
                      'Loading...' }}
                  </div>
                </div>

              </div>
              <div class="col-sm-4 mt-3 mb-2">
                <div>
                  <span class="text-sm text-dark-m2 align-middle">GLKB</span>
          
                </div>
                <div>
                  <span class="text-sm text-dark align-middle">Konto:</span>
                  <span class="text-sm text-dark align-middle">{{ companyData ? companyData.account : 'Loading...'
                  }}</span>
                </div>
                <div>
                  <span class="text-sm text-dark align-middle">IBAN:</span>
                  <span class="text-sm text-dark align-middle">{{ companyData ? companyData.iban : 'Loading...' }}</span>
                </div>
                <div>
                  <span class="text-sm text-dark align-middle">MwSt:</span>
                  <span class="text-sm text-dark align-middle">{{ companyData ? companyData.MwSt : 'Loading...' }}</span>
                </div>

                <div>
                </div>
              </div>
              <div class="col-sm-3 mt-3 mb-2 text-end">
                <div >
                  <span class="text-sm text-dark-m2 align-middle">Tel:</span>
                  <span class="text-sm text-dark-m2 align-middle">{{ companyData ? companyData.phone_number : 'Loading...'
                  }}</span>
                </div>
                <div>
                  <span class="text-sm text-dark-m2 align-middle">Web:</span>
                  <span class="text-sm text-dark-m2 align-middle">{{ companyData ? companyData.webpage : 'Loading...'
                  }}</span>
                </div>
                <div>
                  <span class="text-sm text-dark-m2 align-middle">Mail:</span>
                  <span class="text-sm text-dark-m2 align-middle">{{ companyData ? companyData.email : 'Loading...'
                  }}</span>
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
</template> 

<script>
import { ref, onMounted, computed, watch } from 'vue';
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

    const invoiceTotal = ref('0.00.-CHF');
    const invoiceTotalWithTax = ref('0.00.-CHF');
    const finalCalculation = ref('0.00.-CHF');

    const invoiceData = ref({});
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
          await fetchInvoiceRowsByNumber(props.invoiceNumber);
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

    const fetchInvoiceRowsByNumber = async (invoiceNumber) => {
      try {
        const { data, error } = await supabase
          .from('invoice')
          .select('*')
          .eq('invoice_number', invoiceNumber);

        if (error) {
          console.error('Failed to fetch invoice rows:', error);
          return;
        }

        if (data) {
          invoiceData.value.invoice_rows = data;
        }
      } catch (error) {
        console.error('Failed to fetch invoice rows:', error);
      }
    };

    const formatNumber = (number) => {
      const parts = number.toFixed(2).split('.');
      const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "'");
      return integerPart + '.' + parts[1] + '.-CHF';
    };

    watch(
      invoiceData,
      (newValue) => {
        if (newValue.invoice_rows) {
          const total = newValue.invoice_rows.reduce((acc, row) => acc + row.total, 0);
          invoiceTotal.value = formatNumber(total);
          const totalWithTax = total * 7.7 / 100;
          invoiceTotalWithTax.value = formatNumber(totalWithTax);
          const finalCalculationValue = total + totalWithTax;
          finalCalculation.value = formatNumber(finalCalculationValue);
        } else {
          invoiceTotal.value = '0.00.-CHF';
          invoiceTotalWithTax.value = '0.00.-CHF';
          finalCalculation.value = '0.00.-CHF';
        }
      },
      { deep: true }
    );

    onMounted(() => {
      fetchInvoiceData();
    });

    return {
      invoiceData,
      companyData,
      customerData,
      fetchInvoiceData,
      fetchCompanyData,
      fetchCustomerData,
      invoiceTotal,
      invoiceTotalWithTax,
      finalCalculation,
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