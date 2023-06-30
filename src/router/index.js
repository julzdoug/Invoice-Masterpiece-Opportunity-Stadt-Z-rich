import { createRouter, createWebHistory } from 'vue-router';

import HelloWorld from "../components/HelloWorld.vue";
import Firma_Kunde from "../components/Firma_Kunde.vue";
import createInvoice from '../components/createInvoice.vue';
import Invoices from '../components/Invoices.vue';


const routes = [
  {
    path: "/",
    name: "HelloWorld",
    component: HelloWorld,
  },
  {
    path: '/Firma_Kunde',
    name: 'Firma_Kunde',
    component: Firma_Kunde,
    meta: { requiresAuth: true },
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
    component: Invoices,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;