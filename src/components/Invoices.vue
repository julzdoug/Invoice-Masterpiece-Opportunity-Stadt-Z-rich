
<template>
  <Header :headerClass="noPrintClass" />
  <!--Seten Information-->
  <div class="page-content container" style="width: 21cm; height: 29.7cm;">
    <div class="page-header text-blue-d2 no-print">
      <h1 class="page-title text-secondary-d1">
        {{ invoiceData.invoice_number }}
        <small class="page-info">
          <i class="fa fa-angle-double-right text-80"></i>
          {{ companyData ? companyData.company_name : 'Loading...' }}
        </small>
        
      </h1>
      <div class="page-tools">
        <a type="button" class="btn btn-outline-primary btn-light mx-1px text-95" ref="content" data-title="PDF" @click="printInvoice">
          <i class="mr-1 fa fa-print text-primary-m1 text-120 w-2"></i>
          PDF Speichern
        </a>
      </div>
    </div>
    <!--Firmen Daten-->
    <div id="invoice-section" class="invoice-section px-0 mt-0 ms-1 me-4">
      <div class="row">

        <div class="col-12 col-lg-12">
          <div class="row mb-5">
            <div class="col-12">
              <div class="text-center text-150 print-text-100">
                <img  class="img" v-if="companyData && companyData.logo" :src="companyData.logo" alt="Company Logo" width="150" height="150" />
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

          <div id="invoice-section" class="row align-item d-flex">
            <div class="col-8 mt-3">
              <!-- Kunden Daten -->
              <div v-if="customerData">
                <span class="text-sm text-dark-m2 align-middle date-element">{{ customerData ? customerData.name : 'Loading...'
                }}</span>&nbsp;
                <span class="text-sm text-dark-m2 align-middle date-element">{{ customerData ? customerData.surname : 'Loading...'
                }}</span>
                <div class="my-1" date-element>{{ customerData ? customerData.street : 'Loading...' }} {{ customerData ?
                  customerData.streetnumber : 'Loading...' }}</div>
                <div class="my-1 date-element" v-if="customerData">{{ customerData ? customerData.postcode : 'Loading...' }} {{
                  customerData ? customerData.place : 'Loading...' }}</div>

                </div>
              </div>
          

 <div class="col-4">
    <!-- RechnungsDaten -->
    <div class="text-dark-m2 text-sm my-3">
      <div class="my-1 d-flex justify-content-between">
        <div class="col-6 texts-end"> <span class="">Rechnung - Nr:</span></div>
        <div class="col-6 text-end" v-if="invoiceData">{{ invoiceData.invoice_number }}</div>
      </div>
      <div class="my-1 d-flex justify-content-between">
        <div class=" texts-end"> <span class="">Datum:</span></div>
        <!-- Apply CSS styles to the date element -->
        <div class="text-end date-element" v-if="invoiceData">{{ new Date(invoiceData.invoice_date).getDate() }}.{{ new Date(invoiceData.invoice_date).getMonth() + 1 }}.{{ new Date(invoiceData.invoice_date).getFullYear() }}</div>
      </div>
                <div class="my-1 d-flex justify-content-between">
                  <div class=" texts-end"> <span class="">UiD:</span></div>
                  <div class="text-end  text-end date-element" v-if="customerData">{{ companyData ? companyData.uid_number :
                    'Loading...' }}</div>
                </div>
                <div class="my-1 d-flex justify-content-between">
                  <div class=" texts-end"> <span class="">MwSt:</span></div>
                  <div class="text-end  text-end date-element" v-if="companyData">{{ companyData ? companyData.mwst : 'Loading...' }}
                  </div>
                </div>
              </div>
            </div>
  </div>

                <div class="my-1 mt-0 pt-5 date-element" v-if="invoiceData">
                  <div class="ansprechung"></div>
                  <b class="text-600 date-element mt-2">Rechnung-Nr.</b><b class="text-600 ms-3">{{ invoiceData.invoice_number }}</b>
                </div>
                <div class="col-sm-12">
                  <div class="my-1 mt-2 date-elements" v-if="customerData">Sehr Geehrter {{ customerData ? customerData.gender :
                    'Loading...' }} {{ customerData ? customerData.name :
                    'Loading...' }}</div>
                  <div class="my-1 mt-2 date-elements">Vielen Dank für den Auftrag, Ich erlaube mir, Ihnen folgende Rechnung zu
                    unterbreiten.</div>




              <div class="row">
                <div id="billhead" class="col-sm-12 mt-5 d-flex">
                  <table class="table-responsive col table-borderless mb-5" aria-label="">
                    <!-- Rechnungsangaben -->
                    <thead>
                      <tr class="row text-600 py-10 mb-3">
                        <th class="text-dark bg-light col-2 col-sm-1">Pos.</th>
                        <th class="text-dark bg-light col-8 col-sm-5">Bezeichnung/Beschreibung</th>
                        <th class="text-dark bg-light d-none d-sm-block col-sm-2">Menge</th>
                        <th class="text-dark bg-light d-none d-sm-block col-sm-2">Preis/Stück</th>
                        <th class="text-dark bg-light col-2 col-sm-2 text-end">PositionPreis</th>
                      </tr>
                    </thead>
                    <tbody class="text-95 text-secondary-d3">
                      <tr class="row text-300 py-10" v-for="(row, index) in invoiceData.invoice_rows" :key="index">
                        <td class="text-dark col-2 col-sm-1">{{ index + 1 }}</td>
                        <td class="col-8 col-sm-5">{{ row.description }}</td>
                        <td class="d-none d-sm-block col-sm-2">{{ row.quantity }}</td>
                        <td class="d-none d-sm-block col-sm-2 text-95">{{ row.price_per_unit }}</td>          
                        <td class="col-2 col-sm-2 text-secondary-d2 text-end">{{ row.total }}.-CHF</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                </div>
                <!-- Kalkulation-->
   
            
                    <div class="row">
                      <div class="col-6">
                        Zwischensumme
                      </div>

                      <div class="col-6 text-end">
                        {{ invoiceTotal }}
                      </div>
                    </div>
                    <div class="row align-items">
                      <div class="col-4">
                        Mehrwertsteuer
                      </div>
                      <div class="col-4 ps-5 text-center">
                        7,7%
                      </div>
                      <div class="col-4 text-end">
                        {{ invoiceTotalWithTax }}
                      </div>
                    </div>
                    <div class="row align-items-end">
                      <hr class="col-12">
                      <div class="col-4">
                        <p class="fw-bold mb-0">Rechnugsbetrag</p>ink.Material
                      </div>
                      <div class="col-4 text-center">
                        <p class="fw-bold">inkl.MwSt.</p>
                      </div>
                      <div class="col-4 text-end">
                        <u class="double-underline">
                          <p class="fw-bold text-end">{{ finalCalculation }}</p>                       
                        </u>                        
                      </div>                    
                    </div>              
                  

                   <!-- Rechnungs end sätze -->


                 
                  <div class="col-sm-12 donwpart mt-5">
                    <div class="row">
                      <div class="col-3">Rechnungsbetrag zahlbar bis</div>
                      <div class="col-3 text-start" v-if="invoiceData">
                        <p class="fw-bold mb-0">{{ new Date(invoiceData.invoice_date).getDate() }}.{{ new Date(invoiceData.invoice_date).getMonth() + 1 }}.{{ new Date(invoiceData.invoice_date).getFullYear() }} + 30days</p>
                      </div>
                    </div>
                  </div>
                  <div class="mt-3">
                    <div class="row">
                      <div class="col-4 mt-3">Freundliche Grüsse</div>
                    </div>
                    <div class="row mt-5">
                      <div class="col-4" v-if="companyData">{{ companyData ? companyData.name : 'Loading...' }}{{
                        companyData ?
                        companyData.surname :
                        'Loading...' }}</div>
                    </div>
                  </div>
                  <br>
                            
      
                  <div id="footer" class="mt-5 align-items-end">
                    <div class="row">
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
                    <div class="col mt-3 adress mb-2 justify-content-center">
                      <!-- Second column aligned at the center -->
               
                        
                          <div class="row">
                            <div class="text-start">
                              <div class="text-sm-3 text-dark-m2">GLKB</div>
                            </div>
                          </div>
                          <div class="row">
                           
                              <div class="col-2 text-sm ps-6 text-start text-dark">Konto:</div>
                     
                            <div class="col-6 text-end">
                              <div class="text-sm text-dark">{{ companyData ? companyData.account : 'Loading...' }}</div>
                            </div>
                          </div>
                          <div class="row">
                           
                              <div class="col-2 text-sm ps-6 text-start text-dark">IBAN:</div>
                            
                            <div class="col-6 text-end">
                              <div class="text-sm text-dark">{{ companyData ? companyData.iban_number : 'Loading...' }}</div>
                            </div>
                          </div>
                          <div class="row">
           <div class="col-2 text-sm ps-6 text-start text-dark">MwSt:</div>
                         
                            <div class="col-6 text-end">
                              <div class="text-sm text-dark">{{ companyData ? companyData.mwst : 'Loading...' }}</div>
                            </div>
                          </div>
                        
                   
                    </div>
                    <div class="col-4  mt-3 mb-4 adress justify-content-end date-element">
                      <!-- Third column aligned at the end -->
                 
                                            <div class="row">                       
                              <div class="col-6 text-sm text-start text-dark">Telefon:</div>                                     
                              <div class="col-6 text-sm text-dark text-end">{{ companyData ? companyData.phone_number : 'Loading...' }}
                              </div>                          
                          </div>
<div class="row">
                              <div class="col-6 text-sm text-start text-dark">Website:</div>
                              <div class="col-6 text-sm text-dark text-end">{{ companyData ? companyData.webpage : 'Loading...' }}</div>
</div>
                          <div class="row">                    
                              <div class="col-6 text-sm text-start text-dark">E-Mail:</div>                      
                              <div class="col-6 text-sm text-dark text-end">{{ companyData ? companyData.email : 'Loading...' }}</div>
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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import useAuthUser from "../auth";
import { supabase } from "../supabase";
import Header from './Header.vue';
const storage = supabase.storage;


const authUser = useAuthUser();
export default {
    components: {
    Header,

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
  const config = {
    margin: [10, 10, 10, 10],
    filename: 'invoice.pdf',
    image: { type: 'png', quality: 1 },
    html2canvas: { scale: 1.5, useCORS: true }, // Add useCORS option
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };

  // Get the logo URL from companyData
  const logoUrl = companyData.value.logo;

  // Check if logoUrl is available
  if (logoUrl) {
    const logoImg = document.createElement('img');
    logoImg.src = logoUrl;

    // Wait for the image to load before generating the PDF
    await new Promise((resolve) => {
      logoImg.onload = resolve;
    });

    // Set the logo image in the PDF
    config.image.src = logoUrl;
  }

  // Generate and save the PDF
  await html2pdf().set(config).from(document.getElementById('invoice-section')).save();

  // Reset the src attribute of the logoImg if it was set
  if (config.image.src) {
    config.image.src = '';
  }
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



<style>

.double-underline {
  text-decoration: underline double;
}


hr {
  border: none;
  height: 2px;
  /* Set the hr color */
  color: #000000;  /* old IE */
  background-color:#000000;  /* Modern Browsers */
}

.date-element {
  max-width: 150px; /* Adjust the max width as per your design */
  overflow-wrap: break-word; /* Allow word wrapping */
}
.date-elements {
  max-width: 80%; /* Adjust the max width as per your design */
  overflow-wrap: break-word; /* Allow word wrapping */
}

Footer {
  margin-top: 10%;
}

body {
  size: 0;
  margin-top: 0;
  color: #ffffff;
}

.invoice-section {
  width: 210;
  height: 197;
  font-size: 70%;
  margin-top: auto;
  background-color: #ffffff;
  padding: 20px;
  border: 5px solid #ffffff;
  border-radius: 5px;
  margin-bottom: 50%;
  margin-top: 5%;

  
}

.img {
  max-width: 20%;
  height: 20%;
}
.adress {
  font-size: xx-small;
  
}

.downpart {
  margin-top: 20%;
}

.ansprechung {
  margin-top: 10%;
}

.text-secondary-d1 {
  color: #728299 !important;
}

.page-header {
  margin:10%;
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



@media screen and (max-width: 768px) {
 .date-element {
  max-width: 150px;
  overflow-wrap: break-word;
}
.date-elements {
  max-width: 80%;
  overflow-wrap: break-word;
}

Footer {
  margin-top: 10%;
}

body {
  size: 0;
  margin-top: 0;
  color: #ffffff;
  font-size: 14px; /* Adjust font size for mobile */
}

.invoice-section {
  width: auto;
  height: auto;
  font-size: medium;
  margin-top: auto;
  background-color: #ffffff;
  padding: 2%;
  border: 2px solid #ffffff;
  border-radius: 2px;
  
  margin-bottom: 5%;
  margin-top: 5%;
}

.img {
  max-width: 20%;
  height: 20%;
}

.adress {
  font-size: xx-small;
}

.downpart {
  margin-top: 20%;
}

.ansprechung {
  margin-top: 10%;
}

.text-secondary-d1 {
  color: #999999 !important;
}

.page-header {
  margin: 10%;
  padding-bottom: 2%;
  padding-top: content;
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
  font-size: 1.5rem; /* Adjust font size for mobile */
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
  margin: 0 !important;
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
}

@media print {
  .no-print {
    display: none;
  }
}
</style>
