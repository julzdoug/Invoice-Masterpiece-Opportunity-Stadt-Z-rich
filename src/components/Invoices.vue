<template>
  <Header />
  <!--Seten Information-->
  <div class="page-content container mb-5" style="width: 21cm; height: 29.7cm; margin: 0 auto;">
    <div class="page-header text-blue-d2">
      <h1 class="page-title text-secondary-d1">
        {{ invoiceData.invoice_number }}
        <small class="page-info">
          <i class="fa fa-angle-double-right text-80"></i>
          {{ companyData ? companyData.company_name : 'Loading...' }}
        </small>
      </h1>
      <div class="page-tools">
        <a class="btn bg-white btn-light mx-1px text-95" ref="content" data-title="PDF" @click="printInvoice">
          <i class="mr-1 fa fa-print text-primary-m1 text-120 w-2"></i>
          Drucken
        </a>
      </div>
    </div>
    <!--Firmen Daten-->
    <div id="invoice-section" class="container invoice-section px-0 mt-0">
      <div class="row">

        <div class="col-12 col-lg-12">
          <div class="row">
            <div class="col-12">
              <div class="text-center text-150 print-text-100">
                <img  class="img" width="180" height="80" v-if="companyData && companyData.logo" :src="companyData.logo" alt="Company Logo" />
                 <span v-else>Loading...</span>
                 <br>
                 <br>
                <span class="text-default-d3 fs-6 mt-2 fw-bold">
                  {{ companyData ? `${companyData.company_name}-${companyData.profession} ${companyData.name}
                                    ${companyData.surname},
                                    ${companyData.street},${companyData.street_number},${companyData.postal_code},${companyData.place}` :
                    'Loading...' }}
                </span>
              </div>
            </div>
          </div>

          <div id="invoice-section" class="row align-item d-flex ms-5">
            <div class="col-sm mt-4">
              <!-- Kunden Daten -->
              <div v-if="customerData">
                <span class="text-sm text-dark-m2 align-middle">{{ customerData ? customerData.name : 'Loading...'
                }}</span>&nbsp;
                <span class="text-sm text-dark-m2 align-middle">{{ customerData ? customerData.surname : 'Loading...'
                }}</span>
                <div class="my-1">{{ customerData ? customerData.street : 'Loading...' }} {{ customerData ?
                  customerData.streetnumber : 'Loading...' }}</div>
                <div class="my-1" v-if="customerData">{{ customerData ? customerData.postcode : 'Loading...' }} {{
                  customerData ? customerData.place : 'Loading...' }}</div>
                <div class="my-1 mt-0 pt-5" v-if="invoiceData">
                  <div class="ansprechung"></div>
                  <b class="text-600">Rechnung-Nr.</b><b class="text-600 ms-3">{{ invoiceData.invoice_number }}</b>
                </div>
                <div class="col-sm-12">
                  <div class="my-1 mt-5" v-if="customerData">Sehr Geehrter {{ customerData ? customerData.gender :
                    'Loading...' }} {{ customerData ? customerData.name :
                    'Loading...' }}</div>
                  <div class="my-1 mt-3">Vielen Dank für den Auftrag, Ich erlaube mir, <br>Ihnen folgende Rechnung zu
                    unterbreiten.</div>
                </div>
              </div>
            </div>

            <div class="col-sm-4 me-5 be-1 mt-3">
              <!-- RechnungsDaten -->
              <div class="col-sm pe-5 text-dark-m2 text-sm my-3 mt-3">
                <div class="my-2 d-flex justify-content-between">
                  <div class="col-7 texts-end"> <span class="">Rechnung - Nr:</span></div>
                  <div class="col-10 pe-5 text-end" v-if="invoiceData">{{ invoiceData.invoice_number }}</div>
                </div>
                <div class="my-2 d-flex justify-content-between">
                  <div class="col-7 texts-end"> <span class="">Datum:</span></div>
                  <div class="col-10 pe-5 text-end" v-if="invoiceData">{{ invoiceData.invoice_date }}</div>
                </div>
                <div class="my-2 d-flex justify-content-between">
                  <div class="col-7 texts-end"> <span class="">UiD:</span></div>
                  <div class="col-10 pe-5 text-end" v-if="customerData">{{ companyData ? companyData.uid_number :
                    'Loading...' }}</div>
                </div>
                <div class="my-2 d-flex justify-content-between">
                  <div class="col-7 texts-end"> <span class="">MwSt:</span></div>
                  <div class="col-10 pe-5 text-end" v-if="companyData">{{ companyData ? companyData.mwst : 'Loading...' }}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div class="row">
                <div id="billhead" class="col-sm-11 d-flex">
                  <table class="table-responsive col table-borderless border-0 border-b-2" aria-label="">
                    <!-- Rechnungsangaben -->
                    <thead>
                      <tr class="row text-600 py-25">
                        <th class="text-dark bg-light col-2 col-sm-1">Pos.</th>
                        <th class="text-dark bg-light col-8 col-sm-5">Bezeichnung/Beschreibung</th>
                        <th class="text-dark bg-light d-none d-sm-block col-sm-2">Menge</th>
                        <th class="text-dark bg-light d-none d-sm-block col-sm-2">Preis/Stück</th>
                        <th class="text-dark bg-light col-2 col-sm-2 text-end">PositionPreis</th>
                      </tr>
                    </thead>
                    <tbody class="text-95 text-secondary-d3">
                      <tr class="row text-300 py-25" v-for="(row, index) in invoiceData.invoice_rows" :key="index">
                        <td class="text-dark col-2 col-sm-1">{{ index + 1 }}</td>
                        <td class="col-8 col-sm-5">{{ row.description }}</td>
                        <td class="d-none d-sm-block col-sm-2">{{ row.quantity }}</td>
                        <td class="d-none d-sm-block col-sm-2 text-95">{{ row.price_per_unit }}</td>          
                        <td class="col-2 col-sm-2 text-secondary-d2 text-end">{{ row.total }}.-CHF</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- Kalkulation-->
                <div class="row brc-default-l2 text-start">
                  <div id="bill" class="col-sm-12 text-start mt-5">
                    <div class="row">
                      <div class="col-3">
                        Zwischensumme
                      </div>
                      <div class="col text-end">
                      </div>
                      <div class="col-2 text-end me-4">
                        {{ invoiceTotal }}
                      </div>
                    </div>
                    <div class="row align-items">
                      <div class="col-5">
                        Mehrwertsteuer
                      </div>
                      <div class="col text-center">
                        7,7%
                      </div>
                      <div class="col-2 text-end me-4">
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
                      <div class="col-2 text-end me-4">
                        <u>
                          <p class="fw-bold text-end">{{ finalCalculation }}</p>
                        </u>
                      </div>
                    </div>
                  </div>
                  

                   <!-- Rechnungs end sätze -->


                  <hr class="row brc-default-l1 mx-n1 mb-4 mt-5" />
                  <div class="col-sm-12 donwpart">
                    <div class="row">
                      <div class="col-3">Rechnungsbetrag zahlbar bis</div>
                      <div class="col-3 text-start" v-if="invoiceData">
                        <p class="fw-bold mb-0">{{ invoiceData.invoice_date }} + 30days</p>
                      </div>
                    </div>
                  </div>
                  <div class=" mt-5">
                    <div class="row">
                      <div class="col-4 mt-5">Freundliche Grüsse</div>
                    </div>
                    <div class="row mt-5">
                      <div class="col-4" v-if="companyData">{{ companyData ? companyData.name : 'Loading...' }}{{
                        companyData ?
                        companyData.surname :
                        'Loading...' }}</div>
                    </div>
                  </div>
                  <br>
                                  </div>
                <div class="">
                  <div id="footer" class="row mt-5 align-items-end">
                    <div class="col adress mt-3 mb-2 justify-content-start">
                      <!-- Firmen Angaben Fussnote -->
                      <div>
                        <span class="text-sm text-dark align-middle">{{ companyData ? companyData.company_name :
                          'Loading...' }}</span>
                        <span class="text-sm text-dark align-middle">{{ companyData ? companyData.name : 'Loading...' }}{{
                          companyData ? companyData.surname : 'Loading...' }}</span>
                      </div>
                      <div class="text-dark">
                        <div class="my-1">
                          {{ companyData ? companyData.street : 'Loading...' }}, {{ companyData ?
                            companyData.street_number :
                            'Loading...' }}
                        </div>
                        <div class="my-1">
                          {{ companyData ? companyData.postal_code : 'Loading...' }}, {{ companyData ? companyData.place :
                            'Loading...' }}
                        </div>
                      </div>
                    </div>
                    <div class="col mt-3 adress mb-2 justify-content-end">
                      <!-- Second column aligned at the center -->
                      <div class="row">
                        <div class="col-10 text-center">
                          <div class="row">
                            <div class="col text-start">
                              <div class="text-sm-3 text-dark-m2">GLKB</div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-2">
                              <div class="text-sm ps-6 text-start text-dark">Konto:</div>
                            </div>
                            <div class="col-7 text-end">
                              <div class="text-sm text-dark">{{ companyData ? companyData.account : 'Loading...' }}</div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-2">
                              <div class="text-sm ps-6 text-start text-dark">IBAN:</div>
                            </div>
                            <div class="col-7 text-end">
                              <div class="text-sm text-dark">{{ companyData ? companyData.iban_number : 'Loading...' }}</div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-2">
                              <div class="text-sm ps-6 text-start text-dark">MwSt:</div>
                            </div>
                            <div class="col-7 text-end">
                              <div class="text-sm text-dark">{{ companyData ? companyData.mwst : 'Loading...' }}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col mt-3 me-0 mb-4 adress justify-content-end">
                      <!-- Third column aligned at the end -->
                      <div class="row">
                        <div class="col-10">
                          <div class="row">
                            <div class="col">
                              <div class="text-sm text-start text-dark">Telefon:</div>
                            </div>
                            <div class="col-8 text-end">
                              <div class="text-sm text-dark">{{ companyData ? companyData.phone_number : 'Loading...' }}
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col">
                              <div class="text-sm text-start text-dark">Website:</div>
                            </div>
                            <div class="col-7 text-end">
                              <div class="text-sm text-dark">{{ companyData ? companyData.webpage : 'Loading...' }}</div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col">
                              <div class="text-sm text-start text-dark">E-Mail:</div>
                            </div>
                            <div class="col-7 text-end">
                              <div class="text-sm text-dark">{{ companyData ? companyData.email : 'Loading...' }}</div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col">
                              <div class="text-sm text-start text-dark"></div>
                            </div>
                            <div class="col-7 text-end">
                              <div class="text-sm text-dark"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
  <div class="fixed-bottom">
<Footer />
</div>
</template> 

<script>
import { ref, onMounted, computed, watch } from 'vue';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import useAuthUser from "../auth";
import { supabase } from "../supabase";
import Header from './Header.vue';
import Footer from './footer.vue';



const authUser = useAuthUser();
export default {
    components: {
    Header,
    Footer,
  },
  // Angaben der Zahlen und wie man sie Speichert 
  name: 'Invoices',
  props: ['invoiceNumber'],
  setup(props) {
    const invoiceTotal = ref('0.00.-CHF');
    const invoiceTotalWithTax = ref('0.00.-CHF');
    const finalCalculation = ref('0.00.-CHF');
    const isInvoiceLoaded = ref(false);
    const invoiceData = ref({});
    const companyData = ref(null);
    const customerData = ref(null);
    const showPageNumbers = ref(false);
    const logoUrl = ref(null);
    // Rechnungsdaten Laden
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
   // Firmen Daten Laden
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

      if (data.logo_name && data.bucket_id) {
        // Fetch the company logo from the storage bucket and set the logo URL
        const logoResponse = await supabase.storage.from(data.bucket_id).download(data.logo_name);

        if (logoResponse.error) {
          console.error('Error fetching company logo:', logoResponse.error.message);
          return;
        }

        const logoBlob = logoResponse.data;
        const logoUrl = URL.createObjectURL(new Blob([logoBlob]));

        companyData.value.logo = logoUrl;
      }
    }
  } catch (error) {
    console.error('Failed to fetch company data:', error);
  }
    };

function byteaToBase64(bytea) {
  const byteArray = new Uint8Array(bytea.data);
  let binary = '';
  for (let i = 0; i < byteArray.byteLength; i++) {
    binary += String.fromCharCode(byteArray[i]);
  }
  return 'data:image/png;base64,' + window.btoa(binary);
};

    // Kunden Daten Laden
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
    // Bestellungs positionen sammeln
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
    // Nummer Anpassen
    const formatNumber = (number) => {
      const parts = number.toFixed(2).split('.');
      const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "'");
      return integerPart + '.' + parts[1] + '.-CHF';
    };
    // PDF Expotiern
const exportToPDF = async () => {
  const logoImg = document.querySelector('.img');

  if (!logoImg) {
    console.error('Logo image element not found.');
    return;
  }

  // Get the logoUrl from companyData
  const logoUrl = companyData.value.logo;

  // Set the src attribute of the logoImg
  logoImg.src = logoUrl;

  const config = {
    margin: [10, 0, 10, 0],
    filename: 'invoice.pdf',
    image: { type: 'png', quality: 1 },
    html2canvas: { scale: 3, useCORS: true }, // Add useCORS option
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };
 
  // Wait for the image to load before generating the PDF
  await new Promise((resolve) => {
    logoImg.onload = resolve;
  });

  await html2pdf().set(config).from(document.getElementById('invoice-section')).save();

  // Reset the src attribute of the logoImg after generating the PDF
  logoImg.src = '';
};



    const printInvoice = () => {
      if (isReadyToPrint.value) {
        exportToPDF();
      } else {
        alert('Invoice data is not loaded. Please wait for the data to load before printing.');
      }
    };

    const isReadyToPrint = computed(() => {
      return isInvoiceLoaded.value && invoiceData.value.invoice_rows;
    });

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
          isInvoiceLoaded.value = true;
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
      exportToPDF,
      printInvoice,
      isReadyToPrint,
      showPageNumbers,
      logoUrl,
    };
  },
};

</script>



<style scoped>
body {
  font-size: 12px;
  margin: 0;
  color: #000; /* Set your desired text color */
}

.container.invoice-section {
  width: 100%;
  max-width: 800px; /* Adjust this value as needed */
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.img {
  max-width: 100%;
  height: auto;
}

.text-default-d3 {
  font-size: 14px;
}

.adress {
  font-size: 10px; /* Adjust the font size as needed */
}

.downpart {
  margin-top: 20px;
}

.ansprechung {
  margin-top: 10px;
}

.text-secondary-d1 {
  color: #728299 !important;
}

.page-header {
  margin: 0;
  padding: 10px 0;
  border-bottom: 1px dotted #e2e2e2;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.brc-default-l1 {
  border-color: #dce9f0 !important;
}

.ml-n1,
.mx-n1 {
  margin-left: 0 !important;
}

.mr-n1,
.mx-n1 {
  margin-right: 0 !important;
}

.mb-4,
.my-4 {
  margin-bottom: 0 !important;
}

hr {
  margin-top: 10px;
  margin-bottom: 10px;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
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
  padding-bottom: 5px !important;
}

.pt-25,
.py-25 {
  padding-top: 5px !important;
}

.bgc-default-tp1 {
  background-color: rgba(121, 169, 197, 0.92) !important;
}

.bgc-default-l4,
.bgc-h-default-l4:hover {
  background-color: #f3f8fa !important;
}

.page-header .page-tools {
  align-self: flex-end;
}

.btn-light {
  color: #757984;
  background-color: #f5f6f9;
  border-color: #dddfe4;
}

.w-2 {
  width: 10px;
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

@media screen and (max-width: 768px) {
  body {
    font-size: 12px;
  }

  .container.invoice-section {
    max-width: none;
    width: 100%;
    font-size: 12px;
    padding: 2%;
    border: 1px solid #ccc;
    border-radius: 2px;
  }

  .page-title {
    font-size: 16px;
  }

  .text-secondary-d1 {
    color: #999999 !important;
  }

  .page-header {
    padding: 5px 0;
  }

  .mb-4,
  .my-4 {
    margin: 0 !important;
  }
}

</style>
