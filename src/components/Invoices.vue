<template>
  <div  class="page-content container mb-5" style="width: 21cm; height: 29.7cm;">
    <div class="page-header text-blue-d2">

      <h1 class="page-title text-secondary-d1">
        {{ invoiceData.invoice_number }}
        <small class="page-info">
          <i class="fa fa-angle-double-right text-80"></i>
          {{ companyData ? companyData.company_name : 'Loading...' }}
        </small>
      </h1>
<div class="page-tools">
  <a class="btn bg-white btn-light mx-1px text-95" ref="content" data-title="PDF" @click="exportToPDF">
    <i class="mr-1 fa fa-print text-primary-m1 text-120 w-2"></i>
    PDF
  </a>
</div>
    </div>
 
  <div id="invoice-section" class="container invoice-section px-0" >
    <div class="row mt-4">
      <div class="col-12 col-lg-12">
        <header id="header-section" class="row page-header">
          <div class="col-12">
            <div class="text-center text-150 print-text-100">
  <!-- Content -->
              <i class="fa fa-book fa-2x text-success-m2 mr-1"></i>
              <span class="text-default-d3">{{ companyData ? companyData.logo : 'Loading...' }}</span>
            </div>
            <div class="text-center text-150 print-text-100 mb-5">
  <!-- Content -->
              <i class="fa fa-book fa-2x text-success-m2 mr-1"></i>
<span class="text-default-d3 fs-6">
  {{ companyData ? `${companyData.company_name}-${companyData.profession} ${companyData.name} ${companyData.surname}, ${companyData.street},${companyData.street_number},${companyData.postal_code},${companyData.place}` : 'Loading...' }}
</span>

            </div>
          </div>
        </header>


<div class="row align-item d-flex ms-5">
  <div class="col-sm mt-4">
    <!-- Customer Data -->
    <div v-if="customerData">
      <span class="text-sm text-dark-m2 align-middle">{{ customerData ? customerData.name : 'Loading...' }}</span>
      <span class="text-sm text-dark-m2 align-middle">{{ customerData ? customerData.surname : 'Loading...' }}</span>
      <div class="my-1">{{ customerData ? customerData.street : 'Loading...' }}, {{ customerData ? customerData.streetnumber : 'Loading...' }}</div>
      <div class="my-1" v-if="customerData">{{ customerData ? customerData.postcode : 'Loading...' }}, {{ customerData ? customerData.place : 'Loading...' }}</div>
      <div class="my-1 mt-5 pt-5" v-if="invoiceData">
       <div class="ansprechung"></div>
        <b class="text-600">Rechnung-Nr.</b><b class="text-600 ms-3">{{ invoiceData.invoice_number }}</b>
      </div>
  <div class="col-sm-12">      
    <div class="my-1 mt-5" v-if="customerData">Sehr Geehrter Herr Name {{ customerData ? customerData.name : 'Loading...' }}</div>
      <div class="my-1 mt-3">Vielen Dank für den Auftrag, Ich erlaube mir, <br>Ihnen folgende Rechnung zu unterbreiten.</div></div> 
    </div>
  </div>


  <div class="col-sm-4 me-5 be-1 mt-3">
    <!-- Invoice Data -->
    <div class="col-sm pe-5 text-dark-m2 text-sm my-3">
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
        <div class="col-10 pe-5 text-end" v-if="customerData">{{ companyData ? companyData.uid_number : 'Loading...' }}</div>
      </div>
      <div class="my-2 d-flex justify-content-between">
        <div class="col-7 texts-end"> <span class="">MwSt:</span></div>
        <div class="col-10 pe-5 text-end" v-if="companyData">{{ companyData ? companyData.MwSt : 'Loading...' }}</div>
      </div>
    </div>
 </div>
 <div class="container">
 <div class="row">
  <div class="col-sm-11 d-flex">
<table class="table-responsive col table-borderless border-0 border-b-2" aria-label="">
  <!-- Table content -->
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
          <div class="row brc-default-l2 text-start">

          <div class="col-sm-12 container text-start mt-5">
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
                <p class="fw-bold text-end"><u>{{ finalCalculation }}</u></p>
              </div>
            </div>
          </div>
               <hr class="row brc-default-l1 mx-n1 mb-4 mt-5" />
          <div class="col-sm-12 container donwpart">
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
              <div class="col-4" v-if="companyData">{{ companyData ? companyData.name : 'Loading...' }}{{ companyData ?
                companyData.surname :
                'Loading...' }}</div>
            </div>
</div>

            <br>
<footer  id="footer-section" class="row col mt-5 align justify-content-start page-footer ">
  <div class="col-sm adress mt-3 mb-2">
    <!-- First column aligned at the start -->
    <div>
      <span class="text-sm text-dark align-middle">{{ companyData ? companyData.company_name : 'Loading...' }}</span>
      <span class="text-sm text-dark align-middle">{{ companyData ? companyData.name : 'Loading...' }}{{
        companyData ? companyData.surname : 'Loading...' }}</span>
    </div>
    <div class="text-dark">
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
  
  <div class="col-sm  mt-3 adress mb-2 ps-5 justify-content-center">
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
            <div class="text-sm text-dark">{{ companyData ? companyData.iban : 'Loading...' }}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-2">
            <div class="text-sm ps-6 text-start text-dark">MwSt:</div>
          </div>
          <div class="col-7 text-end">
            <div class="text-sm text-dark">{{ companyData ? companyData.MwSt : 'Loading...' }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="col-sm mt-3 mb-2 adress justify-content-end">
    <!-- Third column aligned at the end -->
    <div class="row">
      <div class="col-10">
        <div class="row">
          <div class="col text-start">
            <div class="text-sm-3 text-dark-m2"></div>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="text-sm text-start text-dark">Telefon:</div>
          </div>
          <div class="col-7 text-end">
            <div class="text-sm text-dark">{{ companyData ? companyData.phone_number : 'Loading...' }}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="text-sm text-start text-dark">Website:</div>
          </div>
          <div class="col-7 text-end">
            <div class="text-sm text-dark">{{ companyData ? companyData.webpage : 'Loading...' }}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="text-sm text-start text-dark">E-Mail:</div>
          </div>
          <div class="col-7 text-end">
            <div class="text-sm text-dark">{{ companyData ? companyData.email : 'Loading...' }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>




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
import html2pdf from 'html2pdf.js';
import { createClient } from '@supabase/supabase-js';
import { useRoute } from 'vue-router';


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default {
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


const exportToPDF = async () => {
  // Get the HTML content of the invoice section
  const invoiceSection = document.getElementById('invoice-section');

  // Create a new jsPDF instance
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Convert HTML to canvas
  const canvas = await html2canvas(invoiceSection);

  // Convert canvas to base64 image
  const imgData = canvas.toDataURL('image/png');

  // Set the initial values for the first page
  let marginTop = 0;
  let remainingHeight = 297;

  // Define the header and footer content
  const headerContent = document.getElementById('header-section').innerHTML;
  const footerContent = document.getElementById('footer-section').innerHTML;

  // Iterate over each page
  while (remainingHeight > 0) {
    // Add a new page
    doc.addPage();

    // Add the header
    doc.setFontSize(12);
    doc.text(headerContent, 10, 10);

    // Add the footer
    doc.setFontSize(10);
    doc.text(footerContent, 10, doc.internal.pageSize.getHeight() - 10);

    // Add the image to the page
    doc.addImage(imgData, 'PNG', 10, marginTop + 20, 190, 250);

    // Calculate the remaining height and adjust the marginTop
    remainingHeight = doc.internal.pageSize.getHeight() - (marginTop + 20 + 250);
    marginTop += 250;

    // Check if there is enough space for another image
    if (remainingHeight > 0) {
      // Add a page break
      doc.addPage();
    }
  }

  // Save the PDF
  doc.save('invoice.pdf');
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
        pageNumber: ref(1)
    };
  },
methods: {
  printInvoice() {
    const content = document.getElementById('header-section');
    const opt = {
      filename: 'invoice.pdf',
      pagebreak: { mode: 'avoid-all', before: '.page-break' },
      margin: { top: 10, right: 10, bottom: 10, left: 10 },
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, logging: true },
      jsPDF: { unit: 'px', format: 'a4', orientation: 'portrait' },
      page: {
        callback: () => {
          this.pageNumber++; // Increment the page number
        }
      }
    };
    html2pdf().from(content).set(opt).save();
  }
}


};

</script>



<style>



body {
  size: 0;
  margin-top: 0;
  color: #ffffff;
}

.invoice-section {
 width:210;
 height:197;
 font-size:70%;
  /* Example styles */
  background-color: #ffffff;
  padding: 20px;
  border: 5px solid #ffffff;
  border-radius: 5px;
}

.adress {
  font-size:xx-small;
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