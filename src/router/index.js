import { createRouter, createWebHistory } from 'vue-router';
import Company from "../components/Company.vue";
import Customer from "../components/Customer.vue";
import HelloWorld from "../components/HelloWorld.vue"
import createInvoice from '../components/createInvoice.vue';
import Invoices from '../components/Invoices.vue';


const routes = [
    {
    path: "/",
    name: "HelloWorld",
    component: HelloWorld,
  },
  {
    path: '/customer',
    name: 'Customer',
    component: Customer
  },
  {
    path: '/company',
    name: 'Company',
    component: Company
  },
  {
        path: '/createInvoice',
        name: 'createInvoice',
        component: createInvoice,
        meta: { requiresAuth: true },
      },
      {
              path: '/Invoices',
        name: 'Invoices ',
        component: Invoices ,
        meta: { requiresAuth: true },
      },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;