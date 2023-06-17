import { ref, onMounted, watch } from 'vue';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'vue-router';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);





export default function MyFunction() {

 
    const router = useRouter();







    function isEmptyForm() {
      const {
        name,
        surname,
        street,
        streetnumber,
        postcode,
        place,
        email,
      } = customerData.value;
      return (
        name === '' &&
        surname === '' &&
        street === '' &&
        streetnumber === '' &&
        postcode === '' &&
        place === '' &&
        email === ''
      );
    }



    async function submitCustomerForm() {
      try {
        const { data, error } = await supabase.from('customer').insert([getCustomerData()]);

        if (error) {
          console.error('Failed to submit customer form:', error);
          return;
        }

        console.log('Customer form submitted successfully!');
        // Clear form fields
        customerData.value = {
          name: '',
          surname: '',
          street: '',
          streetnumber: '',
          postcode: '',
          place: '',
          email: '',

        };
        // Clear selected entry
        selectedEntry.value = null;
      } catch (error) {
        console.error('Failed to submit customer form:', error);
      }
    }

    async function submitCompanyForm() {
      try {
        const { data, error } = await supabase.from('company').insert([getCompanyData()]);

        if (error) {
          console.error('Failed to submit company form:', error);
          return;
        }

        console.log('Company form submitted successfully!');
        // Clear form fields
        companyData.value = {
          logo: '',
          company_name: '',
          profession: '',
          name: '',
          surname: '',
          street: '',
          street_number: '',
          postal_code: '',
          place: '',
          uid_number: '',
          account: '',
          iban_number: '',
          phone_number: '',
          webpage: '',
          email: '',
          MwSt: '',
          bank: '',
        };
        // Clear selected entry
        selectedEntry.value = null;
      } catch (error) {
        console.error('Failed to submit company form:', error);
      }
    }



    return {

    
      isEmptyForm,

   
      submitCustomerForm,
      submitCompanyForm,

    };
  }
  


export { MyFunction };