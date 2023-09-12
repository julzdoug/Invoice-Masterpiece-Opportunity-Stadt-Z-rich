import { createRouter, createWebHistory } from 'vue-router';
import useAuthUser from './auth';
import MyInvoice from '../src/components/MyInvoice.vue';
import editInvoice from '../src/components/editInvoice.vue';
import Home from '../src/components/Login.vue';
import Me from '../src/components/MainLayout.vue';
import Email from '../src/components/EmailConfirmation.vue';
import Invoices from '../src/components/Invoices.vue';
import NewInvoice from '../src/components/NewInvoice.vue';
import Password from '../src/components/ForgotPassword.vue';
import Company from '../src/components/Company.vue';
import Customer from '../src/components/Customer.vue';
import Delete from '../src/components/account-deleted.vue';
import Update from '../src/components/passwordupdate.vue';
import Selected from '../src/components/selectInvoiceForm.vue';


const routes = [

  {
    name: 'Home',
    path: '/',
    component: Home , // Initial route is Login
  },
    {
    name: 'Me',
    path: '/Me',
    meta: {
      requiresAuth: true,
    },
    component: Me ,
  },
 {
    path: '/MyInvoice',
    name: 'MyInvoice',
    component: MyInvoice,
    requiresAuth: true,
    props: true,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'edit-invoice/:invoiceNumber',
        name: 'editInvoice',
        props: true,
        meta: { requiresAuth: true },
        component: editInvoice,
      }
    ]
  },
      {
    path: '/Customer',
    name: 'Customer',
    props: true,
    meta: { requiresAuth: true },
    component: Customer,
  },

    {
    path: '/Company',
    name: 'Company',
    props: true,
    meta: { requiresAuth: true },
    component: Company,
  },
  // Route for the Invoices component
  {
    path: '/invoices/:invoiceNumber',
    name: 'Invoices',
    props: true,
    meta: { requiresAuth: true },
    component: Invoices,
  },
 {
    path: '/Selected',
    name: 'Selected',
    meta: { requiresAuth: true },
    component: Selected,
  },
  // Route for the NewInvoice component
  {
    path: '/NewInvoice',
    name: 'NewInvoice',
    meta: { requiresAuth: true },
    component: NewInvoice,
  },
    {
    name: 'EmailConfirmation',
    path: '/EmailConfirmation',
    component: Email,
  },
      {
    name: 'Update',
    path: '/Update',
    component: Update,
  },
  {
    name: 'ForgotPassword',
    path: '/forgotPassword',
    component: Password,
  },
  {
      name: 'Delete',
    path: '/Delete',
    component: Delete,
  },
  {
    name: 'Logout',
    path: '/logout',
    beforeEnter: async () => {
      const { logout } = useAuthUser();
      await logout();
      return { name: 'Home' };
    },
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
const authUser = useAuthUser(router);



router.beforeEach(async (to, from, next) => {
  const { isLoggedIn } = useAuthUser();
  if (to.meta.requiresAuth && !isLoggedIn()) {
    next({ name: 'Home' });
  } else {
    next();
  }
});
export default router;