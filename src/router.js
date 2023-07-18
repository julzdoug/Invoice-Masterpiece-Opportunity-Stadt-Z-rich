import { createRouter, createWebHistory } from 'vue-router';

import Login from '../src/components/Login.vue';
import HelloWorld from '../src/components/HelloWorld.vue';
import createInvoice from '../src/components/createInvoice.vue';
import Invoices from '../src/components/Invoices.vue';
import Firma_Kunde from '../src/components/Firma_Kunde.vue';
import MainLayout from '../src/components/MainLayout.vue';

import { isAuthenticated } from '../src/auth.js';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/HelloWorld',
        name: 'HelloWorld',
        component: HelloWorld,
        meta: { requiresAuth: true },
      },
      {
        path: '/createInvoice',
        name: 'createInvoice',
        component: createInvoice,
        meta: { requiresAuth: true },
      },

      {
        path: '/Firma_Kunde',
        name: 'Firma_Kunde',
        component: Firma_Kunde,
        meta: { requiresAuth: true },
      },
    ],
  },
        {
        path: '/Invoices/:invoiceNumber',
        name: 'Invoices',
        component: Invoices,
        props: true,
        meta: { requiresAuth: true },
      },


  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: 'HelloWorld' });
  } else {
    next();
  }
});

export default router;








